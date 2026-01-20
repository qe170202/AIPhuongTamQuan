import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import LearningOptions from './widgets/LearningOptions'; // Import widget mới
import SuggestionOptions from './widgets/SuggestionOptions'; // Import widget gợi ý

const config = {
  initialMessages: [
    createChatBotMessage(`Xin chào! Tôi là AI hỏi đáp bầu cử của Phường Tam Quan. Bạn có câu hỏi nào không?`, {
      widget: "learningOptions", // Hiển thị widget các câu hỏi gợi ý
    }),
  ],
  botName: "Trợ lý ảo Phường Tam Quan",
  lang: "vi",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#5C2D91',
    },
    chatButton: {
      backgroundColor: '#5C2D91',
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
      mapStateToProps: ["gist"], // Có thể truyền state của bot vào widget nếu cần
    },
    {
      widgetName: "suggestionOptions",
      widgetFunc: (props) => <SuggestionOptions {...props} />,
      mapStateToProps: ["gist"],
    },
  ],
};

export default config;