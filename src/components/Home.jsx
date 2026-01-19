import { useState, useRef, useEffect } from 'react'

const Home = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý ảo của Phường Tam Quan. Tôi có thể giúp gì cho bạn?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Ensure page stays at top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate assistant response
    setTimeout(() => {
      setIsTyping(false)
      const assistantMessage = {
        id: messages.length + 2,
        text: 'Cảm ơn bạn đã liên hệ. Tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể. Nếu bạn có câu hỏi cụ thể về các dịch vụ của Phường Tam Quan, vui lòng cho tôi biết!',
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1500)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div id="top" className="w-full max-w-6xl mx-auto px-4 pt-24 pb-6">
      <div className="h-[calc(110vh-200px)] rounded-2xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-darkTheme/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="py-4 px-6 bg-gradient-to-r from-white to-gray-50/50 dark:from-darkTheme/80 dark:to-darkHover/30 backdrop-blur-lg flex-shrink-0 relative border-b-2 border-gray-200 dark:border-white/20">
            <h1 className="text-2xl md:text-3xl font-Ovo font-extrabold text-center bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">
              Trợ lý ảo Phường Tam Quan
            </h1>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50/30 dark:bg-darkTheme/20">
        {messages.map((message) => (
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
        ))}
        
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
  )
}

export default Home
