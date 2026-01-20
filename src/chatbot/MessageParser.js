class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("xin chào") || lowerCaseMessage.includes("chào")) {
      this.actionProvider.greet();
    } else {
      this.actionProvider.handleUserQuery(lowerCaseMessage);
    }
  }
}

export default MessageParser;