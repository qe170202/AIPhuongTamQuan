import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Contact = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [cardsRef, isCardsVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [infoRef, isInfoVisible] = useIntersectionObserver({ threshold: 0.2 })
  const contacts = [
    {
      id: 1,
      title: "Website Phường Tam Quan",
      description: "Cổng thông tin điện tử chính thức của Phường Tam Quan",
      icon: "🌐",
      url: "https://tamquan.gialai.gov.vn/",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      id: 2,
      title: "Facebook",
      description: "Theo dõi tin tức và hoạt động của phường trên Facebook",
      icon: "📘",
      url: "https://www.facebook.com/profile.php?id=61577776962364",
      color: "from-[#b820e6] to-[#da7d20]",
      hoverColor: "hover:from-[#a010d6] hover:to-[#ca6d10]"
    },
    {
      id: 3,
      title: "Zalo OA Phường Tam Quan",
      description: "Kết nối và liên hệ qua Zalo Official Account",
      icon: "💬",
      url: "https://zalo.me/phuongtamquan",
      color: "from-blue-600 to-blue-400",
      hoverColor: "hover:from-blue-700 hover:to-blue-500"
    }
  ]

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-20 scroll-mt-20"
    >
      <div 
        ref={headerRef}
        className={`animate-on-scroll ${isHeaderVisible ? 'animate-fade-in-down' : ''}`}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo">Kết nối với chúng tôi</h4>
        <h2 className="text-center text-4xl sm:text-5xl font-Ovo mb-4">Cổng Thông Tin <span className="hidden sm:inline">Phường Tam Quan</span></h2>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-16 font-Ovo text-gray-600 dark:text-gray-300">
          Truy cập kênh thông tin chính thức để cập nhật tin tức, liên hệ với Phường Tam Quan
        </p>
      </div>

      <div 
        ref={cardsRef}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {contacts.map((contact, index) => (
          <a
            key={contact.id}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden animate-on-scroll ${isCardsVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Card */}
            <div className="relative p-8 bg-white dark:bg-darkHover/50 rounded-2xl border-2 border-gray-200 dark:border-white/20 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-Ovo mb-3 text-gray-800 dark:text-white group-hover:text-white transition-colors duration-300">
                  {contact.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300 mb-6">
                  {contact.description}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300">
                  <span className="font-medium">Truy cập ngay</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-100 dark:to-darkTheme/50 rounded-bl-full group-hover:opacity-0 transition-opacity duration-300"></div>
            </div>
          </a>
        ))}
      </div>

      {/* Additional Info */}
      <div 
        ref={infoRef}
        className={`mt-16 max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-2xl border-2 border-[#b820e6]/30 dark:border-[#da7d20]/30 animate-on-scroll ${isInfoVisible ? 'animate-fade-in-scale' : ''}`}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold font-Ovo mb-3 text-gray-800 dark:text-white">
            UBND Phường Tam Quan, Tỉnh Gia Lai
          </h3>
          <p className="text-gray-700 dark:text-gray-200 font-Ovo">
            Để biết thêm thông tin chi tiết, vui lòng truy cập các kênh thông tin chính thức của phường
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
