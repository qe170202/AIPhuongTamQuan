import qaData from '../data/chatbot_qa.json';
import { createChatBotMessage } from 'react-chatbot-kit';
import Fuse from 'fuse.js'; // Import Fuse
import config from './config.jsx'; // Import config để lấy widget

class ActionProvider {
  constructor(createChatBotMessageFunc, setStateFunc, createClientMessage, setMessagesFunc, setIsTypingFunc) {
    this.createChatBotMessageFunc = createChatBotMessageFunc;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.setMessages = setMessagesFunc;
    this.setIsTyping = setIsTypingFunc;
  }

  greet = () => {
    const message = this.createChatBotMessageFunc("Xin chào! Tôi có thể giúp gì cho bạn?");
    this.addMessageToBotState(message);
  };

  handleUserQuery = (userQuery) => {
    const fuseOptions = {
      keys: ['question'], // Tìm kiếm trong trường 'question' của dữ liệu Q&A
      threshold: 0.3, // Độ nhạy của fuzzy matching (0 = khớp chính xác, 1 = khớp mọi thứ)
      includeScore: true, // Bao gồm điểm số để đánh giá độ phù hợp
      ignoreLocation: true, // Bỏ qua vị trí của từ khớp
      minMatchCharLength: 3 // Chỉ khớp nếu có ít nhất 3 ký tự trùng khớp
    };

    const fuse = new Fuse(qaData, fuseOptions);
    const results = fuse.search(userQuery);

    let responseText = "Xin lỗi, tôi không tìm thấy câu trả lời phù hợp. Bạn tham khảo một vài gợi ý !!";

    if (results.length > 0) {
      // Lấy câu trả lời từ kết quả phù hợp nhất
      responseText = results[0].item.answer;
    } else {
      // Nếu không tìm thấy kết quả phù hợp, tìm kiếm các câu hỏi gợi ý liên quan
      const suggestionFuseOptions = {
        keys: ['question'],
        threshold: 0.5, // Giảm ngưỡng để tìm kiếm rộng hơn
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      };
      const suggestionFuse = new Fuse(qaData, suggestionFuseOptions);
      const suggestionResults = suggestionFuse.search(userQuery).slice(0, 3); // Lấy tối đa 3 gợi ý

      if (suggestionResults.length > 0) {
        const suggestionWidget = config.widgets.find(w => w.widgetName === "suggestionOptions");
        if (suggestionWidget) {
          const messageWithSuggestions = this.createChatBotMessageFunc(responseText, {
            widget: "suggestionOptions",
            payload: { suggestions: suggestionResults }
          });
          this.addMessageToBotState(messageWithSuggestions);
          return; // Quan trọng: Return để không tạo tin nhắn lỗi thông thường
        }
      }
    }

    const message = this.createChatBotMessageFunc(responseText);
    this.addMessageToBotState(message);
  };

  addMessageToBotState = (message) => {
    this.setMessages((prev) => [...prev, {
      id: Date.now() + Math.random(),
      text: message.message,
      sender: 'assistant',
      timestamp: new Date(),
      widget: message.widget, // Đảm bảo thuộc tính widget được giữ lại
      payload: message.payload, // Đảm bảo thuộc tính payload được giữ lại
    }]);
    this.setIsTyping(false); // Tắt dấu nháy đang nhập sau khi bot trả lời
  };
}

export default ActionProvider;