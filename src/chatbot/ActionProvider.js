import qaData from '../data/chatbot_qa.json';
import { createChatBotMessage } from 'react-chatbot-kit';
import Fuse from 'fuse.js'; // Import Fuse

class ActionProvider {
  constructor(createChatBotMessageFunc, setStateFunc, createClientMessage, setMessagesFunc) {
    this.createChatBotMessageFunc = createChatBotMessageFunc;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.setMessages = setMessagesFunc;
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

    let responseText = "Xin lỗi, tôi không tìm thấy câu trả lời phù hợp. Bạn có thể thử hỏi cách khác hoặc liên hệ bộ phận hỗ trợ.";

    if (results.length > 0) {
      // Lấy câu trả lời từ kết quả phù hợp nhất
      responseText = results[0].item.answer;
    } else {
      // Nếu không tìm thấy kết quả từ câu hỏi, thử tìm trong câu trả lời (cũng là một lựa chọn)
      // Để đơn giản, hiện tại chúng ta chỉ tìm trong 'question'.
      // Nếu muốn tìm trong cả 'answer', có thể thêm 'answer' vào `keys` hoặc tạo một Fuse instance thứ hai.
    }

    const message = this.createChatBotMessageFunc(responseText);
    this.addMessageToBotState(message);
  };

  addMessageToBotState = (message) => {
    this.setMessages((prev) => [...prev, {
      id: Date.now() + Math.random(),
      text: message.message,
      sender: 'assistant',
      timestamp: new Date()
    }]);
  };
}

export default ActionProvider;