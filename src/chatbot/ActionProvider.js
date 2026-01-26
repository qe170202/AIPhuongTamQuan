// src/chatbot/ActionProvider.js
import Fuse from "fuse.js";
import qaDataRaw from "../data/chatbot_qa_enriched.json";
import config from "./config.jsx";
import { normalizeVI, expandAbbr, toKeywords } from "./utils/searchUtils";
import { trackQuestion } from "../utils/analytics";

// --- Build index once (fast + consistent scoring) ---
const qaIndex = qaDataRaw.map((item, idx) => {
  const questions = item.questions?.length ? item.questions : [item.question];
  const variantsNorm = questions.map((q) => expandAbbr(normalizeVI(q)));

  const _q = variantsNorm.join(" | ");
  const _kw = toKeywords(_q);

  return {
    ...item,
    id: item.id ?? `q${idx + 1}`,
    questions,
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
const fuseLocal = new Fuse(
  qaIndex.filter((x) => x.topic === "local_tamquan"),
  fuseOptions
);
const fuseTimeline = new Fuse(
  qaIndex.filter((x) => x.topic === "timeline"),
  fuseOptions
);

function chooseFuse(queryNorm = "", lastTopic = null) {
  const s = String(queryNorm);
  if (s.includes("tam quan") || s.includes("khu pho")) return fuseLocal;
  if (s.includes("moc thoi gian") || s.includes("ngay bau cu") || /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(s)) return fuseTimeline;
  if (lastTopic === "timeline") return fuseTimeline;
  if (lastTopic === "local_tamquan") return fuseLocal;
  return fuseAll;
}

function decide(results) {
  if (!results.length) return "none";
  const best = results[0];
  const second = results[1];
  const bestScore = best.score ?? 1;
  const gap = second ? ( (second.score ?? 1) - bestScore ) : 1;

  // score: smaller is better in Fuse
  if (bestScore <= 0.22) return "answer";
  if (bestScore <= 0.30 && gap >= 0.06) return "answer";
  if (bestScore <= 0.38) return "answer_with_suggestions";
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

    const fuse = chooseFuse(queryForSearch, this.lastTopic);
    let results = fuse.search(queryForSearch, { limit: 8 });

    // Fallback to global search if topic-filtered search returns nothing
    if (!results.length && fuse !== fuseAll) {
      results = fuseAll.search(queryForSearch, { limit: 8 });
    }

    const decision = decide(results);

    const suggestions = results.slice(0, 3).map((r) => ({
      id: r.item.id,
      question: r.item.question,
      questionShort: r.item.displayQuestion,
      score: r.score,
    }));

    if (decision === "answer") {
      const best = results[0].item;
      this.lastTopic = best.topic ?? null;

      const message = this.createChatBotMessageFunc(best.answer);
      this.addMessageToBotState(message);
      return;
    }

    if (decision === "answer_with_suggestions") {
      const best = results[0].item;
      this.lastTopic = best.topic ?? null;

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
    trackQuestion(suggestionQuestion);

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