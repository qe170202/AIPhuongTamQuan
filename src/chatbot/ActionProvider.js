// src/chatbot/ActionProvider.js
import Fuse from "fuse.js";
import qaDataRaw from "../data/chatbot_qa_enriched.json";
import config from "./config.jsx";
import { normalizeVI, expandAbbr, toKeywords, shortText, extractQueryKeywords, calculateKeywordOverlap, diversifySuggestions } from "./utils/searchUtils";

// --- Build index once (fast + consistent scoring) ---
const qaIndex = qaDataRaw.map((item, idx) => {
  // Always include main question + all variants (dedupe)
  const allQuestions = [
    item.question,
    ...(item.questions?.length ? item.questions : []),
  ].filter(Boolean);
  const questions = [...new Set(allQuestions)]; // dedupe
  const variantsNorm = questions.map((q) => expandAbbr(normalizeVI(q)));

  const _q = variantsNorm.join(" | ");
  const _kw = toKeywords(_q);

  return {
    ...item,
    id: item.id ?? `q${idx + 1}`,
    questions,
    variantsNorm,
    _q,
    _kw,
    displayQuestion: item.question, // for UI
  };
});

const fuseOptions = {
  includeScore: true,
  shouldSort: true,
  ignoreLocation: true,
  threshold: 0.45, // wide-ish; we gate by score below
  distance: 140,
  minMatchCharLength: 2,
  keys: [
    { name: "_q", weight: 0.8 },
    { name: "_kw", weight: 0.2 },
  ],
};

const fuseAll = new Fuse(qaIndex, fuseOptions);

// Include both local_tamquan and local_tamquan_tasks topics
const fuseLocal = new Fuse(
  qaIndex.filter((x) => x.topic?.startsWith("local_tamquan")),
  fuseOptions
);
const trackQuestionSafely = (question) => {
  if (typeof window !== "undefined" && typeof window.trackQuestion === "function") {
    window.trackQuestion(question);
  }
};

const fuseTimeline = new Fuse(
  qaIndex.filter((x) => x.topic === "timeline"),
  fuseOptions
);

function chooseFuse(queryNorm = "", lastTopic = null) {
  const s = String(queryNorm);
  if (s.includes("tam quan") || s.includes("khu pho") || s.includes("phuong tam quan")) return fuseLocal;
  if (s.includes("moc thoi gian") || s.includes("ngay bau cu") || /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(s)) return fuseTimeline;
  if (lastTopic === "timeline") return fuseTimeline;
  if (lastTopic?.startsWith("local_tamquan")) return fuseLocal;
  return fuseAll;
}

/** Find QA item whose normalized question variants exactly match user query (after normalize). */
function findExactMatch(qNorm) {
  const s = String(qNorm).trim();
  if (!s) return null;
  return qaIndex.find((item) =>
    (item.variantsNorm || []).some((v) => String(v).trim() === s)
  ) ?? null;
}

function decide(results) {
  if (!results.length) return "none";
  const best = results[0];
  const second = results[1];
  const bestScore = best.score ?? 1;
  const gap = second ? ((second.score ?? 1) - bestScore) : 1;

  // score: smaller is better in Fuse
  if (bestScore <= 0.22) return "answer";
  if (bestScore <= 0.30 && gap >= 0.06) return "answer";
  if (bestScore <= 0.38) return "answer_with_suggestions";
  // bestScore in (0.38, 0.45]: still reasonable match (e.g. question in JSON, long _q dilutes score) → answer with suggestions instead of suggest-only
  if (bestScore <= 0.45) return "answer_with_suggestions";
  return "suggestions_only";
}

class ActionProvider {
  constructor(createChatBotMessageFunc, setStateFunc, createClientMessage, setMessagesFunc, setIsTypingFunc) {
    this.createChatBotMessageFunc = createChatBotMessageFunc;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.setMessages = setMessagesFunc;
    this.setIsTyping = setIsTypingFunc;

    // Light context: keep last topic to help follow-up questions
    this.lastTopic = null;
  }

  greet = () => {
    const message = this.createChatBotMessageFunc(
      "Xin chào! Tôi là AI hỏi đáp bầu cử Phường Tam Quan, hỗ trợ thông tin về bầu cử."
    );
    this.addMessageToBotState(message);
  };

  handleUserQuery = (userQuery) => {
    this.setIsTyping?.(true);

    const qNorm = expandAbbr(normalizeVI(userQuery));
    const qKw = toKeywords(qNorm);
    const queryForSearch = qKw || qNorm;

    // Exact match: user query (normalized) equals one of the item's question variants → always answer, never suggest
    const exactItem = findExactMatch(qNorm);
    if (exactItem) {
      this.lastTopic = exactItem.topic ?? null;
      const message = this.createChatBotMessageFunc(exactItem.answer);
      this.addMessageToBotState(message);
      return;
    }

    const fuse = chooseFuse(queryForSearch, this.lastTopic);
    let results = fuse.search(queryForSearch, { limit: 8 });

    // Fallback to global search if topic-filtered search returns nothing
    if (!results.length && fuse !== fuseAll) {
      results = fuseAll.search(queryForSearch, { limit: 8 });
    }

    const decision = decide(results);
    const best = results[0]?.item;

    // Find the best matching question variant from item's questions array
    const findBestMatchingQuestion = (item, queryNormalized) => {
      if (!item.questions?.length) return item.question;

      const qNormLower = String(queryNormalized).toLowerCase();
      let bestMatch = item.question;
      let bestScore = 0;

      // Check each question variant for keyword overlap with user query
      for (const variant of item.questions) {
        const variantNorm = normalizeVI(variant).toLowerCase();

        // Simple word overlap scoring
        const queryWords = qNormLower.split(" ").filter(w => w.length >= 2);
        const variantWords = variantNorm.split(" ").filter(w => w.length >= 2);

        let matchCount = 0;
        for (const qw of queryWords) {
          for (const vw of variantWords) {
            if (vw.includes(qw) || qw.includes(vw)) {
              matchCount++;
              break;
            }
          }
        }

        const score = queryWords.length > 0 ? matchCount / queryWords.length : 0;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = variant;
        }
      }

      return bestMatch;
    };

    // Build suggestions: top 3 related, with smart ranking based on topic + keywords
    const buildSuggestions = (resultList, excludeId = null, currentTopic = null, queryKeywords = new Set()) => {
      // 1. Filter out excluded item (the one we're answering)
      let candidates = excludeId
        ? resultList.filter((r) => r.item.id !== excludeId)
        : resultList;

      if (!candidates.length) return [];

      // 2. Calculate adjusted scores with topic bonus + keyword overlap
      candidates = candidates.map((r) => {
        let adjustedScore = r.score ?? 1;

        // Topic bonus: same topic as current answer gets -0.08 (lower = better in Fuse)
        if (currentTopic && r.item.topic === currentTopic) {
          adjustedScore -= 0.08;
        }

        // Keyword overlap bonus: more overlap = better match
        const keywordOverlap = calculateKeywordOverlap(
          r.item.keywords || [],
          queryKeywords
        );
        // Up to -0.12 bonus for full keyword match
        adjustedScore -= keywordOverlap * 0.12;

        return { ...r, adjustedScore };
      });

      // 3. Sort by adjusted score (lower = better)
      candidates.sort((a, b) => a.adjustedScore - b.adjustedScore);

      // 4. Diversify: avoid 3 suggestions from exact same topic
      const diversified = diversifySuggestions(candidates, 3);

      return diversified.map((r) => {
        // Find the best matching question variant for display
        const displayQuestion = findBestMatchingQuestion(r.item, qNorm);
        return {
          id: r.item.id,
          question: displayQuestion,
          questionShort: shortText(displayQuestion, 90),
          score: r.adjustedScore,
          topic: r.item.topic,
        };
      });
    };

    // Extract keywords from user query for smart matching
    const queryKeywords = extractQueryKeywords(qNorm);
    const currentTopic = best?.topic ?? this.lastTopic;

    const suggestions =
      decision === "answer_with_suggestions" && best
        ? buildSuggestions(results, best.id, currentTopic, queryKeywords)
        : buildSuggestions(results, null, currentTopic, queryKeywords);

    if (decision === "answer") {
      this.lastTopic = best?.topic ?? null;
      const message = this.createChatBotMessageFunc(best.answer);
      this.addMessageToBotState(message);
      return;
    }

    if (decision === "answer_with_suggestions") {
      this.lastTopic = best?.topic ?? null;
      const message = this.createChatBotMessageFunc(best.answer, {
        widget: "suggestionOptions",
        payload: { suggestions },
      });
      this.addMessageToBotState(message);
      return;
    }

    // suggestions_only or none
    const fallbackText =
      suggestions.length > 0
        ? "Mình chưa chắc bạn đang hỏi ý nào. Bạn chọn 1 gợi ý dưới đây nhé:"
        : "Xin lỗi, mình chưa tìm thấy câu trả lời phù hợp. Bạn thử diễn đạt khác hoặc hỏi ngắn gọn hơn nhé.";

    const suggestionWidget = config.widgets.find((w) => w.widgetName === "suggestionOptions");
    if (suggestionWidget && suggestions.length > 0) {
      const msg = this.createChatBotMessageFunc(fallbackText, {
        widget: "suggestionOptions",
        payload: { suggestions },
      });
      this.addMessageToBotState(msg);
      return;
    }

    const msg = this.createChatBotMessageFunc(fallbackText);
    this.addMessageToBotState(msg);
  };

  // Handle suggestion click: add user message first, then process query
  // If suggestionId is provided, find answer directly by ID to ensure we get the answer
  handleSuggestionClick = (suggestionQuestion, suggestionId = null) => {
    // First, add user message to UI
    const userMessage = {
      id: Date.now() + Math.random(),
      text: suggestionQuestion,
      sender: "user",
      timestamp: new Date(),
    };
    this.setMessages((prev) => [...prev, userMessage]);

    // Track question
    trackQuestionSafely(suggestionQuestion);

    // If we have an ID, find the answer directly by ID
    if (suggestionId) {
      const item = qaIndex.find((x) => x.id === suggestionId);
      if (item) {
        this.setIsTyping?.(true);
        this.lastTopic = item.topic ?? null;

        // Small delay to show typing indicator
        setTimeout(() => {
          const message = this.createChatBotMessageFunc(item.answer);
          this.addMessageToBotState(message);
        }, 300);
        return;
      }
    }

    // Otherwise, search but always return answer if results exist (don't show suggestions again)
    this.setIsTyping?.(true);
    setTimeout(() => {
      const qNorm = expandAbbr(normalizeVI(suggestionQuestion));
      const qKw = toKeywords(qNorm);
      const queryForSearch = qKw || qNorm;

      const fuse = chooseFuse(queryForSearch, this.lastTopic);
      let results = fuse.search(queryForSearch, { limit: 8 });

      // Fallback to global search if topic-filtered search returns nothing
      if (!results.length && fuse !== fuseAll) {
        results = fuseAll.search(queryForSearch, { limit: 8 });
      }

      // If we have results, always return the answer (user clicked a suggestion, so they want an answer)
      if (results.length > 0) {
        const best = results[0].item;
        this.lastTopic = best.topic ?? null;
        const message = this.createChatBotMessageFunc(best.answer);
        this.addMessageToBotState(message);
      } else {
        // No results found
        const msg = this.createChatBotMessageFunc(
          "Xin lỗi, mình chưa tìm thấy câu trả lời phù hợp. Bạn thử diễn đạt khác hoặc hỏi ngắn gọn hơn nhé."
        );
        this.addMessageToBotState(msg);
      }
    }, 300);
  };

  addMessageToBotState = (message) => {
    this.setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text: message.message,
        sender: "assistant",
        timestamp: new Date(),
        widget: message.widget,
        payload: message.payload,
      },
    ]);
    this.setIsTyping?.(false);
  };
}

export default ActionProvider;