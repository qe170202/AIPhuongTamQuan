// src/chatbot/MessageParser.js
// Very simple parser: route every user message into ActionProvider.handleUserQuery
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const text = String(message || "").trim();
    if (!text) return;

    // Basic greeting detection (optional)
    const lower = text.toLowerCase();
    if (["hi", "hello", "xin chao", "chao", "alo"].includes(lower) || 
        lower.includes("xin chào") || lower.includes("chào")) {
      this.actionProvider.greet();
      return;
    }

    this.actionProvider.handleUserQuery(text);
  }
}

export default MessageParser;