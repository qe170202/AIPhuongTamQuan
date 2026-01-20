import { useState, useRef, useEffect } from 'react'
import { createChatBotMessage } from 'react-chatbot-kit'
import MessageParser from '../chatbot/MessageParser'
import ActionProvider from '../chatbot/ActionProvider'
import config from '../chatbot/config.jsx' // Cập nhật đường dẫn
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Home = () => {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [messages, setMessages] = useState(() => {
    // Initialize messages with initialMessages from config, formatted for your UI
    return config.initialMessages.map(msg => ({
      id: Date.now() + Math.random(),
      text: msg.message,
      sender: 'assistant',
      timestamp: new Date(),
      widget: msg.widget, // Giữ lại thuộc tính widget nếu có
    }));
  });
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [leftBannerIndex, setLeftBannerIndex] = useState(0)
  const [rightBannerIndex, setRightBannerIndex] = useState(0)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)

  const actionProviderRef = useRef(null);
  const messageParserRef = useRef(null);

  // Danh sách banner - trái: 1,2 | phải: 3,4
  const leftBanners = [
    '/assets/bannertuong1.JPG',
    '/assets/bannertuong2.JPG'
  ];

  const rightBanners = [
    '/assets/bannertuong3.JPG',
    '/assets/bannertuong4.JPG'
  ];

  // Carousel tự động đồng bộ cho cả 2 banner
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftBannerIndex((prev) => (prev + 1) % leftBanners.length);
      setRightBannerIndex((prev) => (prev + 1) % rightBanners.length);
    }, 3000); // Chuyển slide mỗi 3 giây, đồng bộ cả 2 bên

    return () => clearInterval(interval);
  }, [leftBanners.length, rightBanners.length]);

  useEffect(() => {
    // Pass your setMessages to ActionProvider
    actionProviderRef.current = new ActionProvider(
      createChatBotMessage,
      (stateUpdater) => { /* no-op, state handled by Home component */ },
      () => { /* no-op, client messages handled by Home component */ },
      setMessages,
      setIsTyping
    );
    messageParserRef.current = new MessageParser(actionProviderRef.current, { messages });
  }, [setMessages]); // Re-run if setMessages changes (though it typically won't)

  useEffect(() => {
    // Update state in MessageParser whenever messages change in Home
    if (messageParserRef.current) {
      messageParserRef.current.state = { messages };
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now() + Math.random(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to your UI first
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Let MessageParser handle the user input after a small delay
    // to ensure user message is rendered before bot responds
    setTimeout(() => {
      if (messageParserRef.current) {
        messageParserRef.current.parse(inputValue);
      }
    }, 300); // Adjust delay as needed
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div id="top" className="w-full pt-24 pb-6">
      <div className="flex gap-4 justify-center items-start px-4">
        {/* Banner trái - Carousel tự động (hình 1,2) */}
        <div className="hidden xl:block flex-shrink-0 w-32 sticky top-32">
          <div className="rounded-lg overflow-hidden shadow-md relative">
            <img 
              src={leftBanners[leftBannerIndex]} 
              alt={`Banner trái ${leftBannerIndex + 1}`} 
              className="w-full h-auto object-contain max-h-[80vh] transition-opacity duration-500"
              key={leftBannerIndex}
            />
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {leftBanners.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === leftBannerIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="w-full max-w-6xl">
          <div 
            ref={containerRef}
            className={`h-[calc(110vh-200px)] rounded-2xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-darkTheme/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 overflow-hidden flex flex-col font-[Inter] animate-on-scroll ${isVisible ? 'animate-fade-in-scale' : ''}`}
          >
          {/* Header */}
          <div className="py-5 px-6 bg-gradient-to-r from-white via-gray-50/60 to-gray-100/70 dark:from-darkTheme/80 dark:via-darkHover/40 dark:to-darkHover/60 backdrop-blur-lg flex-shrink-0 relative border-b-2 border-gray-200 dark:border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#b820e6]/10 via-transparent to-[#da7d20]/10 pointer-events-none"></div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
              
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-Montserrat font-extrabold bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">
                      AI hỏi đáp bầu cử Phường Tam Quan
                    </h1>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white shadow-sm">
                      AI
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Kênh hỗ trợ & cung cấp thông tin chính thức của Phường Tam Quan.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <div className="px-3 py-2 rounded-xl border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-darkHover/50 shadow-sm">
                  ⚡ Hỗ trợ nhanh
                </div>
                <div className="px-3 py-2 rounded-xl border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-darkHover/50 shadow-sm">
                  🛡️ Thông tin xác thực
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container - overscroll-contain: khóa scroll chuột trong khung chat, không kéo trang */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-4 bg-gray-50/30 dark:bg-darkTheme/20">
        {messages.map((message) => {
            const WidgetComponent = message.widget && config.widgets.find(w => w.widgetName === message.widget)?.widgetFunc;
            const botState = { // Tạo một đối tượng state giả lập cho widget nếu cần
              messages: messages,
              gist: {} // Thêm các state khác nếu cần, ví dụ: state từ mapStateToProps của widget
            };

            return (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-br-sm'
                      : 'bg-white dark:bg-darkHover/50 text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  {WidgetComponent && (
                    <div className="mt-2">
                      <WidgetComponent
                        actionProvider={actionProviderRef.current}
                        state={botState}
                        suggestions={message.payload?.suggestions || []} // Truyền suggestions từ payload
                      />
                    </div>
                  )}
                  <span
                    className={`text-xs mt-1 block ${
                      message.sender === 'user'
                        ? 'text-white/70'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-darkHover/50 border border-gray-200 dark:border-white/20 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
          <div ref={messagesEndRef} />
        </div>

          {/* Input Area */}
          <div className="border-t-2 border-gray-200 dark:border-white/20 bg-gradient-to-r from-white to-gray-50/50 dark:from-darkTheme/80 dark:to-darkHover/30 backdrop-blur-lg p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-white/30 focus:ring-2 focus:ring-[#b820e6] focus:outline-none bg-white dark:bg-darkHover/30 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              disabled={inputValue.trim() === ''}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </form>
        </div>
          </div>
        </div>

        {/* Banner phải - Carousel tự động (hình 3,4) */}
        <div className="hidden xl:block flex-shrink-0 w-32 sticky top-32">
          <div className="rounded-lg overflow-hidden shadow-md relative">
            <img 
              src={rightBanners[rightBannerIndex]} 
              alt={`Banner phải ${rightBannerIndex + 1}`} 
              className="w-full h-auto object-contain max-h-[80vh] transition-opacity duration-500"
              key={rightBannerIndex}
            />
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {rightBanners.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === rightBannerIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home