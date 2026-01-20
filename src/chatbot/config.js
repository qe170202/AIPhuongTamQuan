import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage(`Xin chào! Tôi là trợ lý ảo của Phường Tam Quan. Bạn có câu hỏi nào không?`)
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
  widgets: [],
};

export default config;