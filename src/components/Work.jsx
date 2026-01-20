import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Work = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [timelineRef, isTimelineVisible] = useIntersectionObserver({ threshold: 0.1 })
  
  const timelineData = [
    {
      phase: 2,
      title: "NHÂN SỰ – HỒ SƠ ỨNG CỬ",
      icon: "📋",
      events: [
        { date: "31/01/2026", items: ["Kết thúc Đại hội Đảng", "Thành lập các Tổ bầu cử"] },
        { date: "01/02/2026", items: ["Hạn cuối nộp hồ sơ ứng cử"] },
        { date: "03/02/2026", items: ["Hoàn thành Hiệp thương lần 2", "Lập danh sách sơ bộ người ứng cử", "Lấy ý kiến cử tri nơi cư trú", "Niêm yết danh sách cử tri"] },
        { date: "05/02/2026", items: ["Điều chỉnh cơ cấu, số lượng ứng cử (lần 2 – ĐBQH)"] },
        { date: "08/02/2026", items: ["Hoàn thành xác minh, trả lời ý kiến cử tri về người ứng cử"] }
      ]
    },
    {
      phase: 3,
      title: "CHỐT DANH SÁCH – VẬN ĐỘNG BẦU CỬ",
      icon: "📝",
      events: [
        { date: "20/02/2026", items: ["Hoàn thành Hiệp thương lần 3", "Lập danh sách người đủ tiêu chuẩn ứng cử"] },
        { date: "22/02/2026", items: ["Gửi biên bản hiệp thương và hồ sơ ứng cử"] },
        { date: "26/02/2026", items: ["Công bố danh sách chính thức người ứng cử", "Phân phối tài liệu, phiếu bầu"] },
        { date: "27/02/2026", items: ["Niêm yết danh sách ứng cử tại khu vực bỏ phiếu", "Bắt đầu vận động bầu cử (15 ngày)"] }
      ]
    },
    {
      phase: 4,
      title: "BẦU CỬ – KIỂM PHIẾU – CÔNG BỐ",
      icon: "🗳️",
      highlight: true,
      events: [
        { date: "15/03/2026", items: ["🗳️ NGÀY BẦU CỬ"], special: true },
        { date: "18/03/2026", items: ["Tổ bầu cử gửi biên bản kiểm phiếu"] },
        { date: "20/03/2026", items: ["Ban bầu cử gửi biên bản xác định kết quả"] },
        { date: "22/03/2026", items: ["UBBC tỉnh gửi kết quả bầu cử ĐBQH", "Hạn cuối bầu cử thêm/bầu cử lại (nếu có)"] },
        { date: "25/03/2026", items: ["Công bố kết quả bầu cử và danh sách trúng cử", "Giải quyết khiếu nại kết quả bầu cử"] }
      ]
    },
    {
      phase: 5,
      title: "SAU BẦU CỬ",
      icon: "🎯",
      events: [
        { date: "06/04/2026", items: ["Có thể khai mạc kỳ họp thứ nhất Quốc hội khóa mới / HĐND nhiệm kỳ mới"] }
      ]
    }
  ]

  return (
    <div id="work" className="w-full px-[12%] py-20 scroll-mt-20">
      <div 
        ref={headerRef}
        className={`animate-on-scroll ${isHeaderVisible ? 'animate-fade-in-down' : ''}`}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo">Lịch trình</h4>
        <h2 className="text-center text-5xl font-Ovo mb-4">Timeline Bầu Cử 2026</h2>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
         Các mốc thời gian quan trọng trong quá trình bầu cử đại biểu Quốc hội và HĐND các cấp
        </p>
      </div>

      <div 
        ref={timelineRef}
        className="max-w-5xl mx-auto"
      >
        {timelineData.map((phase, phaseIndex) => (
          <div 
            key={phase.phase} 
            className={`mb-16 last:mb-0 animate-on-scroll ${isTimelineVisible ? 'animate-fade-in-left' : ''}`}
            style={{ animationDelay: `${phaseIndex * 0.15}s` }}
          >
            {/* Phase Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl">{phase.icon}</div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-Montserrat">
                  GIAI ĐOẠN 
                </h3>
                <h2 className={`text-2xl font-bold font-Montserrat ${
                  phase.highlight 
                    ? 'bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent'
                    : 'text-gray-800 dark:text-white'
                }`}>
                  {phase.title}
                </h2>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="relative pl-8 border-l-4 border-gray-200 dark:border-white/20">
              {phase.events.map((event, eventIndex) => (
                <div 
                  key={eventIndex}
                  className="mb-8 last:mb-0 relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[42px] w-8 h-8 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Event Card */}
                  <div className="ml-6 p-6 bg-white dark:bg-darkHover/30 rounded-xl border-2 border-gray-200 dark:border-white/20 hover:border-[#b820e6] dark:hover:border-[#da7d20] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    {/* Date */}
                    <div className={`inline-block px-4 py-1.5 rounded-full mb-4 ${
                      event.special
                        ? 'bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white font-bold'
                        : 'bg-gray-100 dark:bg-darkTheme/50 text-gray-700 dark:text-gray-300'
                    }`}>
                      📅 {event.date}
                    </div>

                    {/* Event Items */}
                    <ul className="space-y-2">
                      {event.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex}
                          className={`flex items-start gap-2 font-Ovo ${
                            event.special 
                              ? 'text-lg font-bold bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent'
                              : 'text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {!event.special && <span className="text-[#b820e6] mt-1">•</span>}
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

     
    </div>
  )
}

export default Work
