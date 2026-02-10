import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

// Parse DD/MM/YYYY → Date object (midnight local)
const parseDate = (str) => {
  const [d, m, y] = str.split('/').map(Number)
  return new Date(y, m - 1, d)
}

// Number of days between two dates
const daysBetween = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24))

// How many days before a milestone we start showing the progress bar
const NEAR_FUTURE_DAYS = 20

const Work = () => {
  const rawTimeline = [
    {
      phase: 'Mốc 1',
      date: '31/01/2026',
      title: 'Nhân sự – Hồ sơ ứng cử',
      description: 'Kết thúc Đại hội Đảng. Chuẩn bị nhân sự và hồ sơ ứng cử viên các cấp theo quy định của Luật Bầu cử.',
      color: 'primary',
    },
    {
      phase: 'Mốc 2',
      date: '01/02/2026',
      title: 'Hạn cuối nộp hồ sơ',
      description: 'Thời hạn cuối cùng để Ủy ban Bầu cử tiếp nhận hồ sơ ứng cử đại biểu Quốc hội và HĐND các cấp.',
      color: 'sky',
    },
    {
      phase: 'Mốc 3',
      date: '03/02/2026',
      title: 'Hiệp thương lần 2 & Niêm yết cử tri',
      description: 'UBTWMTTQVN và UBMTTQVN cấp tỉnh, cấp xã tổ chức hội nghị hiệp thương lần thứ hai. Niêm yết danh sách cử tri. Cử tri khiếu nại về việc lập danh sách cử tri trong vòng 30 ngày kể từ ngày niêm yết.',
      color: 'primary',
    },
    {
      phase: 'Mốc 4',
      date: '05/02/2026',
      title: 'Điều chỉnh cơ cấu ứng cử ĐBQH',
      description: 'UBTVQH điều chỉnh lần thứ hai cơ cấu, thành phần, số lượng người của cơ quan, tổ chức, đơn vị ở trung ương và địa phương được giới thiệu ứng cử ĐBQH.',
      color: 'sky',
    },
    {
      phase: 'Mốc 5',
      date: '20/02/2026',
      title: 'Hiệp thương lần 3',
      description: 'UBTWMTTQVN và UBMTTQVN cấp tỉnh, cấp xã tổ chức hội nghị hiệp thương lần thứ ba. Lập danh sách chính thức người đủ tiêu chuẩn ứng cử.',
      color: 'primary',
    },
    {
      phase: 'Mốc 6',
      date: '22/02/2026',
      title: 'Gửi biên bản hiệp thương',
      description: 'Ban thường trực UBTWMTTQVN, Ban thường trực UBMTTQVN các cấp gửi biên bản hội nghị hiệp thương lần thứ ba và danh sách những người đủ tiêu chuẩn ứng cử đến HĐBCQG và các cơ quan, tổ chức theo quy định.',
      color: 'sky',
    },
    {
      phase: 'Mốc 7',
      date: '26/02/2026',
      title: 'Công bố danh sách chính thức',
      description: 'HĐBCQG lập và công bố danh sách chính thức những người ứng cử ĐBQH theo từng đơn vị bầu cử. Ủy ban bầu cử lập và công bố danh sách chính thức những người ứng cử ĐBQH, đại biểu HĐND theo từng đơn vị bầu cử.',
      color: 'primary',
    },
    {
      phase: 'Mốc 8',
      date: '27/02/2026',
      title: 'Niêm yết danh sách ứng cử',
      description: 'Tổ bầu cử niêm yết danh sách chính thức những người ứng cử ĐBQH, người ứng cử đại biểu HĐND tại khu vực bỏ phiếu.',
      color: 'sky',
    },
    {
      phase: 'Mốc 9',
      date: '02/03/2026',
      title: 'Phân phối tài liệu & phiếu bầu',
      description: 'Ban bầu cử nhận và phân phối tài liệu, phiếu bầu cử cho Tổ bầu cử.',
      color: 'primary',
    },
    {
      phase: 'Mốc 10',
      date: '03/03/2026',
      title: 'Bắt đầu vận động bầu cử',
      description: 'Thời gian vận động bầu cử được bắt đầu từ ngày công bố danh sách chính thức ứng cử và kết thúc trước thời điểm bắt đầu bỏ phiếu 24 giờ.',
      color: 'sky',
    },
    {
      phase: 'Mốc 11',
      date: '05/03/2026',
      title: 'Điều chỉnh cơ cấu bổ sung',
      description: 'UBTVQH điều chỉnh lần thứ hai cơ cấu, thành phần, số lượng người của cơ quan, tổ chức, đơn vị ở trung ương và địa phương được giới thiệu ứng cử ĐBQH.',
      color: 'primary',
    },
    {
      phase: 'Mốc 12',
      date: '10/03/2026',
      title: 'Giải quyết khiếu nại danh sách cử tri',
      description: 'Cơ quan lập danh sách cử tri giải quyết khiếu nại về bổ sung danh sách cử tri.',
      color: 'sky',
    },
    {
      phase: 'Mốc 13',
      date: '15/03/2026',
      title: '🗳️ NGÀY BẦU CỬ TOÀN QUỐC',
      description: 'Ngày Bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026–2031.',
      highlight: true,
      color: 'primary',
    },
  ]

  // Auto-compute progress & urgent based on current date
  const timelineData = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return rawTimeline.map((item) => {
      const target = parseDate(item.date)
      const daysLeft = daysBetween(today, target)

      let progress = null
      let urgent = false

      if (daysLeft <= 0) {
        progress = 100
      } else if (daysLeft <= NEAR_FUTURE_DAYS) {
        progress = Math.round(((NEAR_FUTURE_DAYS - daysLeft) / NEAR_FUTURE_DAYS) * 100)
        if (daysLeft <= 5) urgent = true
      }

      return { ...item, progress, urgent }
    })
  }, [])

  // Find current active milestone index (first one not yet completed)
  const currentIndex = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const idx = timelineData.findIndex((item) => {
      const target = parseDate(item.date)
      return target > today
    })
    // If all are past, show the last one; if none past, show first
    return idx === -1 ? timelineData.length - 1 : Math.max(0, idx)
  }, [timelineData])

  const scrollContainerRef = useRef(null)
  const itemRefs = useRef([])
  const sectionRef = useRef(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const hasScrolledRef = useRef(false)

  // Section visibility observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Auto-scroll to current milestone on first render
  useLayoutEffect(() => {
    if (hasScrolledRef.current) return
    hasScrolledRef.current = true

    // Use rAF to ensure DOM is fully laid out (zoom:0.8 affects getBoundingClientRect)
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current
      const targetEl = itemRefs.current[currentIndex]
      if (!container || !targetEl) return

      // Use offsetTop which is not affected by CSS zoom
      // Walk up the offset parents until we reach the scroll container
      let offsetSum = 0
      let el = targetEl
      while (el && el !== container) {
        offsetSum += el.offsetTop
        el = el.offsetParent
      }

      // Place the current milestone flush at the top of the scroll container
      container.scrollTop = offsetSum
    })
  }, [currentIndex, timelineData])

  // Scroll-reveal for items inside the scroll container
  // Items animate IN when entering viewport, and reset when leaving so the animation replays
  const [visibleItems, setVisibleItems] = useState(new Set())

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const idx = Number(entry.target.dataset.idx)
            if (entry.isIntersecting) {
              next.add(idx)
            } else {
              next.delete(idx) // Remove so animation replays on re-enter
            }
          })
          return next
        })
      },
      { root: container, threshold: 0.1, rootMargin: '20px 0px' }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [timelineData])

  const borderColor = (color) =>
    color === 'sky' ? 'border-sky-400' : 'border-[#007BFF]'
  const hoverBorderColor = () => 'hover:border-l-sky-500'
  const phaseTextColor = (color) =>
    color === 'sky' ? 'text-sky-600' : 'text-[#007BFF]'
  const titleHoverColor = (color) =>
    color === 'sky' ? 'group-hover:text-sky-500' : 'group-hover:text-[#007BFF]'
  const dotBorder = (color) =>
    color === 'sky' ? 'border-sky-400' : 'border-[#007BFF]'
  const dotBg = (color) =>
    color === 'sky' ? 'bg-sky-400' : 'bg-[#007BFF]'

  // Scroll navigation
  const scrollByItems = (dir) => {
    const container = scrollContainerRef.current
    if (!container) return
    // Each item is roughly 1/3 of the container height
    const amount = container.clientHeight * 0.85
    container.scrollBy({ top: dir * amount, behavior: 'smooth' })
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 scroll-mt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF, #F0F9FF)',
        zoom: 0.8,
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #007BFF 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${sectionVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-sky-600 font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            Lộ trình thực hiện
          </span>
          <h2 className="mt-2 font-Ovo text-3xl sm:text-4xl lg:text-5xl text-gray-900">
            Timeline Bầu Cử 2026
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-300 to-[#007BFF] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm text-slate-400">
            Kéo lên xuống để xem các mốc thời gian • Đang ở{' '}
            <span className="text-[#007BFF] font-semibold">{timelineData[currentIndex]?.phase}</span>
          </p>
        </div>

        {/* Scrollable Timeline Container */}
        <div className="relative">
          {/* Scroll Up Button */}
          <button
            onClick={() => scrollByItems(-1)}
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-sky-50 hover:border-sky-300 hover:shadow-xl transition-all group"
            aria-label="Cuộn lên"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#007BFF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Top / Bottom fade masks */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-20 bg-gradient-to-b from-white to-transparent rounded-t-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-20 bg-gradient-to-t from-[#F0F9FF] to-transparent rounded-b-2xl" />

          {/* Scroll container — shows ~3 items */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto scroll-smooth relative rounded-2xl tl-scroll-hide"
            style={{
              height: '680px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >

            <div className="relative py-8 timeline-scroll-container">
              {/* Center vertical line (desktop) */}
              <div
                className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] z-0 rounded-sm"
                style={{
                  top: '2rem',
                  bottom: '2rem',
                  background:
                    'linear-gradient(to bottom, #BAE6FD, #007BFF, #BAE6FD)',
                }}
              />

              {/* Mobile left line */}
              <div
                className="md:hidden absolute left-6 w-[3px] z-0 rounded-sm"
                style={{
                  top: '2rem',
                  bottom: '2rem',
                  background:
                    'linear-gradient(to bottom, #BAE6FD, #007BFF, #BAE6FD)',
                }}
              />

              <div className="space-y-10 md:space-y-14">
                {timelineData.map((item, i) => {
                  const isLeft = i % 2 === 0
                  const visible = visibleItems.has(i)
                  const isCurrent = i === currentIndex
                  const delay = `${i * 120}ms`

                  return (
                    <div
                      key={i}
                      ref={(el) => (itemRefs.current[i] = el)}
                      data-idx={i}
                      className="flex flex-col md:flex-row items-center justify-between group relative"
                    >
                      {/* Left content or spacer */}
                      {isLeft ? (
                        <div
                          className={`w-full md:w-5/12 order-2 md:order-1 pl-14 md:pl-0 ${visible ? 'tl-card-left' : 'tl-hidden'
                            }`}
                          style={{ '--tl-delay': delay }}
                        >
                          <TimelineCard
                            item={item}
                            isCurrent={isCurrent}
                            borderColor={borderColor}
                            hoverBorderColor={hoverBorderColor}
                            phaseTextColor={phaseTextColor}
                            titleHoverColor={titleHoverColor}
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-full md:w-5/12 order-3 md:order-1 text-center md:text-right md:pr-10 hidden md:block ${visible ? 'tl-number-anim' : 'tl-hidden'
                            }`}
                          style={{ '--tl-delay': `${parseInt(delay) + 200}ms` }}
                        >
                          <span className="text-5xl font-bold text-slate-200/80 group-hover:text-sky-200 transition-colors duration-500 select-none">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      )}

                      {/* Center dot */}
                      <div
                        className={`
                          w-10 h-10 rounded-full bg-white border-4 z-10 order-1 md:order-2 my-3 md:my-0
                          flex items-center justify-center group-hover:scale-110
                          absolute left-1 md:relative md:left-auto
                          ${dotBorder(item.color)}
                          ${isCurrent ? 'ring-4 ring-sky-100 scale-110 tl-glow-current' : 'shadow-lg shadow-sky-200'}
                          ${visible ? 'tl-dot-anim' : 'tl-hidden'}
                        `}
                        style={{ '--tl-delay': `${parseInt(delay) + 100}ms` }}
                      >
                        <div
                          className={`w-3 h-3 ${dotBg(item.color)} rounded-full ${isCurrent || item.highlight || item.urgent ? 'animate-pulse' : ''
                            }`}
                        />
                      </div>

                      {/* Right content or spacer */}
                      {isLeft ? (
                        <div
                          className={`w-full md:w-5/12 order-3 md:order-3 text-center md:text-left md:pl-10 hidden md:block ${visible ? 'tl-number-anim' : 'tl-hidden'
                            }`}
                          style={{ '--tl-delay': `${parseInt(delay) + 200}ms` }}
                        >
                          <span className="text-5xl font-bold text-slate-200/80 group-hover:text-sky-200 transition-colors duration-500 select-none">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`w-full md:w-5/12 order-2 md:order-3 pl-14 md:pl-0 ${visible ? 'tl-card-right' : 'tl-hidden'
                            }`}
                          style={{ '--tl-delay': delay }}
                        >
                          <TimelineCard
                            item={item}
                            isCurrent={isCurrent}
                            borderColor={borderColor}
                            hoverBorderColor={hoverBorderColor}
                            phaseTextColor={phaseTextColor}
                            titleHoverColor={titleHoverColor}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Scroll Down Button */}
          <button
            onClick={() => scrollByItems(1)}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-sky-50 hover:border-sky-300 hover:shadow-xl transition-all group"
            aria-label="Cuộn xuống"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#007BFF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Timeline Card ─── */
const TimelineCard = ({ item, isCurrent, borderColor, hoverBorderColor, phaseTextColor, titleHoverColor }) => (
  <div
    className={`
      bg-white p-5 rounded-2xl shadow-lg border-l-4 border-y border-r border-slate-100
      tl-card-hover
      ${borderColor(item.color)} ${hoverBorderColor()}
      ${isCurrent ? 'ring-2 ring-sky-200 shadow-sky-100 shadow-xl' : ''}
    `}
  >
    {/* Current indicator */}
    {isCurrent && (
      <div className="flex items-center gap-1.5 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007BFF] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007BFF]" />
        </span>
        <span className="text-[10px] font-bold text-[#007BFF] uppercase tracking-wider">Đang diễn ra</span>
      </div>
    )}

    {/* Header */}
    <div className="flex justify-between items-start mb-2">
      <span
        className={`text-xs font-bold ${phaseTextColor(item.color)} uppercase tracking-wider bg-sky-50 px-2 py-1 rounded`}
      >
        {item.phase}
      </span>
      <span className="text-xs text-slate-400 font-mono">{item.date}</span>
    </div>

    {/* Title */}
    <h3
      className={`font-Outfit font-bold text-lg mb-1.5 text-slate-800 ${titleHoverColor(item.color)} transition-colors`}
    >
      {item.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>

    {/* Progress bar — only shown when progress is not null */}
    {typeof item.progress === 'number' && (
      <>
        <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full relative overflow-hidden transition-all duration-700 ${item.progress >= 100 ? 'bg-emerald-500' : 'bg-[#007BFF]'
              }`}
            style={{ width: `${item.progress}%` }}
          >
            {item.progress < 100 && (
              <div
                className="absolute inset-0 bg-white/30 w-full h-full"
                style={{ animation: 'shimmer 2s infinite' }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-slate-400 uppercase font-bold">
          <span>Tiến độ</span>
          {item.progress >= 100 ? (
            <span className="text-emerald-500">✓ Hoàn thành</span>
          ) : (
            <span className="text-[#007BFF]">{item.progress}%</span>
          )}
        </div>
      </>
    )}

    {/* Urgent badge */}
    {item.urgent && (
      <div className="mt-3 flex items-center space-x-2 text-xs text-sky-600 font-bold bg-sky-50 p-2 rounded border border-sky-100">
        <span className="text-sm animate-bounce">⚠️</span>
        <span>Sắp hết hạn - Ưu tiên xử lý</span>
      </div>
    )}

    {/* Highlight glow for election day */}
    {item.highlight && (
      <div className="mt-3 flex items-center space-x-2 text-xs text-white font-bold bg-gradient-to-r from-[#007BFF] to-sky-400 p-2.5 rounded-lg shadow-md">
        <span className="text-sm">🗳️</span>
        <span>Ngày Bầu cử toàn quốc</span>
      </div>
    )}
  </div>
)

export default Work
