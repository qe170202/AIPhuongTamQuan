// src/chatbot/utils/searchUtils.js
// Utilities to make Vietnamese fuzzy search much more accurate (no-diacritics, abbrev expansion, stopwords, variants)

export function normalizeVI(input = "") {
  return String(input)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/đ/g, "d")
    .replace(/[.\-]/g, "/") // normalize dates: 25-12-2025 -> 25/12/2025
    .replace(/[^a-z0-9\s/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Election-domain abbreviations seen in the dataset (feel free to extend)
export const ABBR = {
  dbqh: "dai bieu quoc hoi",
  dbhđnd: "dai bieu hoi dong nhan dan",
  dbhdd: "dai bieu hoi dong nhan dan",
  hdnd: "hoi dong nhan dan",
  ubnd: "uy ban nhan dan",
  ubtvqh: "uy ban thuong vu quoc hoi",
  hdbcqg: "hoi dong bau cu quoc gia",
  ubbc: "uy ban bau cu",
  dvbc: "don vi bau cu",
  vneid: "vneid",
  cccd: "can cuoc cong dan",
  cmnd: "can cuoc cong dan",
};

export function expandAbbr(normText = "") {
  return String(normText)
    .split(" ")
    .map((t) => (ABBR[t] ? ABBR[t] : t))
    .join(" ");
}

export const STOPWORDS = new Set([
  "cho",
  "toi",
  "minh",
  "hoi",
  "xin",
  "voi",
  "nhe",
  "la",
  "gi",
  "khong",
  "the",
  "nao",
  "o",
  "dau",
  "ve",
  "vui",
  "long",
  "hay",
  "giup",
  "a",
  "ad",
]);

export function toKeywords(normText = "") {
  return String(normText)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w))
    .join(" ");
}

// Many questions contain 2+ clauses like: "A là gì? B là gì?".
// Users often ask only one clause, so index them as variants.
export function buildQuestionVariants(q = "") {
  const base = String(q).trim();
  if (!base) return [];
  const parts = base
    .split("?")
    .map((s) => s.trim())
    .filter(Boolean);

  const variants = [base];
  if (parts.length >= 2) {
    for (const p of parts) variants.push(p.endsWith("?") ? p : `${p}?`);
  }

  // unique
  return [...new Set(variants)];
}

export function detectTopic(qNorm = "") {
  const s = String(qNorm);
  // Local Tam Quan patterns (based on your dataset content)
  const localHits = ["phuong tam quan", "khu pho", "an quy", "thanh son", "tan an", "hoi an", "tan trung", "an son"];
  if (localHits.some((k) => s.includes(k))) return "local_tamquan";

  // Timeline patterns (dates / "mốc thời gian")
  if (s.includes("moc thoi gian") || s.includes("ngay bau cu") || /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(s)) {
    return "timeline";
  }
  return "general";
}

export function shortText(s = "", max = 110) {
  const str = String(s);
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}
