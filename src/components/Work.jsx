import { useEffect, useMemo, useRef, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const AUTO_SLIDE_MS = 2000
const INNER_SLIDE_MS = 2000

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

const shouldUseInnerCarousel = (items = []) => {
  if (!Array.isArray(items)) return false
  if (items.length >= 2) return true
  const t = String(items[0] ?? '').trim()
  return t.length > 120
}

const MilestoneContent = ({ items, special, isOuterPaused }) => {
  const useCarousel = shouldUseInnerCarousel(items)
  const slides = useMemo(() => {
    if (!Array.isArray(items)) return []
    if (!useCarousel) return [String(items[0] ?? '')]
    return items.map((s) => String(s ?? ''))
  }, [items, useCarousel])

  const [idx, setIdx] = useState(0)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    setIdx(0)
  }, [slides.length])

  useEffect(() => {
    if (!useCarousel) return
    if (slides.length <= 1) return
    if (isOuterPaused || isHover) return

    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % slides.length)
    }, INNER_SLIDE_MS)

    return () => window.clearInterval(id)
  }, [isOuterPaused, isHover, slides.length, useCarousel])

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="h-full flex flex-col">
      <div
        className={`font-Ovo antialiased text-sm leading-relaxed ${special
          ? 'font-semibold bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent'
          : 'text-gray-700 dark:text-gray-100 group-hover:text-white'
          }`}
      >
        {/* Text content - Fixed 64px for 3 lines with breathing room */}
        <div className="h-[64px] overflow-hidden">
          <p className="line-clamp-3">{slides[idx] || ''}</p>
        </div>

        {/* Carousel controls - ~28px */}
        {useCarousel && slides.length > 1 && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {slides.slice(0, 8).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === idx
                    ? 'w-5 bg-[#da7d20] group-hover:bg-white'
                    : 'w-1.5 bg-gray-300/70 dark:bg-white/20 group-hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300 font-Montserrat group-hover:text-white/80">
              {idx + 1}/{slides.length}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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

  const milestones = useMemo(() => {
    const flat = []
    for (const phase of timelineData) {
      for (const event of phase.events) {
        flat.push({
          date: event.date,
          items: event.items,
          special: Boolean(event.special),
          phaseTitle: phase.title
        })
      }
    }
    return flat
  }, [timelineData])

  const scrollerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollTimeoutRef = useRef(null)
  const isManualScrollRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const outerPaused = isPaused

  const scrollToIndex = (idx, smooth = true) => {
    const clampedIdx = clamp(idx, 0, milestones.length - 1)
    setActiveIndex(clampedIdx)
    isManualScrollRef.current = true

    const scroller = scrollerRef.current
    const el = scroller?.querySelector?.(`[data-milestone-index="${clampedIdx}"]`)

    // Only scroll if the element exists AND the timeline is currently visible
    if (el && isTimelineVisible && scroller) {
      // Calculate scroll position manually to avoid page-level scrolling
      const scrollerRect = scroller.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const scrollerCenter = scrollerRect.width / 2
      const elCenter = elRect.left - scrollerRect.left + elRect.width / 2
      const scrollOffset = elCenter - scrollerCenter

      scroller.scrollBy({
        left: scrollOffset,
        behavior: smooth ? 'smooth' : 'auto'
      })

      // Reset manual scroll flag after animation
      setTimeout(() => {
        isManualScrollRef.current = false
      }, smooth ? 600 : 0)
    } else {
      // If not visible, still reset the flag
      isManualScrollRef.current = false
    }
  }

  // Sync active index based on scroll position (like Slick's afterChange)
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      if (isManualScrollRef.current) return

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Debounce to detect which slide is most centered
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollerRect = scroller.getBoundingClientRect()
        const scrollerCenter = scrollerRect.left + scrollerRect.width / 2

        let closestIndex = 0
        let closestDistance = Infinity

        const slides = scroller.querySelectorAll('[data-milestone-index]')
        slides.forEach((slide) => {
          const slideRect = slide.getBoundingClientRect()
          const slideCenter = slideRect.left + slideRect.width / 2
          const distance = Math.abs(slideCenter - scrollerCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = parseInt(slide.getAttribute('data-milestone-index'), 10)
          }
        })

        if (closestIndex !== activeIndex && !isManualScrollRef.current) {
          setActiveIndex(closestIndex)
        }
      }, 100)
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeIndex])

  // Auto-scroll effect (like Slick's autoplay)
  useEffect(() => {
    if (!isTimelineVisible) return
    if (outerPaused) return
    if (milestones.length <= 1) return

    const id = window.setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % milestones.length
        scrollToIndex(nextIndex, true)
        return nextIndex
      })
    }, AUTO_SLIDE_MS)

    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerPaused, isTimelineVisible, milestones.length])

  // Navigation handlers
  const goToPrev = () => {
    const newIndex = activeIndex === 0 ? milestones.length - 1 : activeIndex - 1
    scrollToIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = (activeIndex + 1) % milestones.length
    scrollToIndex(newIndex)
  }

  // Drag-to-scroll handlers
  const handleMouseDown = (e) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    isDraggingRef.current = true
    dragStartXRef.current = e.pageX - scroller.offsetLeft
    scrollLeftRef.current = scroller.scrollLeft
    scroller.style.cursor = 'grabbing'
    scroller.style.userSelect = 'none'
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return

    e.preventDefault()
    const scroller = scrollerRef.current
    if (!scroller) return

    const x = e.pageX - scroller.offsetLeft
    const walk = (x - dragStartXRef.current) * 1.5 // Scroll speed multiplier
    scroller.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    const scroller = scrollerRef.current
    if (!scroller) return

    isDraggingRef.current = false
    scroller.style.cursor = 'grab'
    scroller.style.userSelect = ''
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp()
    }
  }


  return (
    <div id="work" className="w-full px-[12%] py-20 scroll-mt-20">
      <div
        ref={headerRef}
        className={`animate-on-scroll ${isHeaderVisible ? 'animate-fade-in-down' : ''}`}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo hidden sm:block">Lịch trình</h4>
        <h2 className="text-center text-4xl sm:text-5xl font-Ovo mb-4"><span className="hidden sm:inline">Timeline </span>Bầu Cử 2026</h2>

      </div>

      <div
        ref={timelineRef}
        className="max-w-6xl mx-auto"
      >
        <div
          className={`animate-on-scroll ${isTimelineVisible ? 'animate-fade-in-left' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/15"
            style={{
              backgroundColor: '#8B5A2B'
            }}
          >
            {/* Background image with 50% opacity overlay */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/assets/anhnencaro.jpeg)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 0.5
              }}
            />
            {/* top dots like sample */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 z-20 flex items-center gap-1.5">
              {milestones.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Chuyển tới mốc ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-7 bg-white/90' : 'w-2 bg-white/35 hover:bg-white/55'
                    }`}
                />
              ))}
            </div>

            {/* scroll area */}
            <div className="px-5 sm:px-10 lg:px-16 pt-16 pb-8">
              <div
                ref={scrollerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 flex gap-0 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
              >
                <style>{`
                  .timeline-scroll::-webkit-scrollbar { display: none; }
                  
                  /* Phase title marquee - scrolls RIGHT to LEFT on hover, faster speed */
                  @keyframes phase-marquee {
                    0%, 10% { 
                      transform: translateX(calc(100% - 190px)); 
                    }
                    90%, 100% { 
                      transform: translateX(0);
                    }
                  }
                  
                  .group:hover .phase-title-animated {
                    animation: phase-marquee 3s linear infinite;
                  }
                `}</style>

                <div className="shrink-0 w-[8vw] min-w-[8px]" />

                {milestones.map((m, i) => (
                  <div
                    key={`${m.date}-${i}`}
                    data-milestone-index={i}
                    className="shrink-0 w-[206px] snap-center px-2"
                  >
                    <div className="grid grid-rows-[150px_48px_48px]">
                      {/* Card (fixed height for uniform layout) */}
                      <div
                        className={`group h-[150px] rounded-xl bg-white/95 dark:bg-darkHover/35 border transition-all duration-300 shadow-sm hover:bg-[#b58a2a]/90 hover:border-white/60 ${i === activeIndex
                          ? 'border-white/70 dark:border-white/25 shadow-xl ring-1 ring-white/40 dark:ring-white/15'
                          : 'border-white/45 dark:border-white/15 hover:shadow-xl hover:border-white/70 dark:hover:border-white/25 hover:ring-1 hover:ring-white/35 dark:hover:ring-white/15 hover:scale-[1.01]'
                          }`}
                      >
                        <div className="h-full p-4 flex flex-col">
                          {/* Phase Title - Fixed 18px + 8px margin = 26px */}
                          <div className="w-full h-[18px] mb-2 overflow-hidden relative">
                            <span className="absolute left-0 top-0 text-xs text-gray-500 dark:text-gray-300 font-Montserrat tracking-wide leading-[18px] group-hover:text-white/90 whitespace-nowrap will-change-transform phase-title-animated">
                              {m.phaseTitle}
                            </span>
                          </div>
                          {/* Content area - Fixed 92px (150 - 32 padding - 26 header) */}
                          <div className="h-[92px] font-Ovo antialiased">
                            <MilestoneContent items={m.items} special={m.special} isOuterPaused={outerPaused} />
                          </div>
                        </div>
                      </div>

                      {/* Line + dot row */}
                      <div className="relative flex items-center">
                        <div className="-mx-2 w-[calc(100%+16px)] h-[3px] bg-white/55 dark:bg-white/25" />
                        <div className="absolute left-1/2 -translate-x-1/2">
                          <div className="w-6 h-6 rounded-full bg-[#da7d20] shadow-md flex items-center justify-center ring-2 ring-white/70 dark:ring-white/20">
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>

                      {/* Date pill row */}
                      <div className="flex items-start justify-center pt-2">
                        <div
                          className={`px-6 py-2 rounded-full text-sm font-Montserrat shadow-md border whitespace-nowrap ${m.special
                            ? 'bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white border-white/25'
                            : 'bg-white/95 text-[#7a3f10] border-white/60'
                            }`}
                        >
                          {m.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="shrink-0 w-[8vw] min-w-[8px]" />
              </div>




            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Work
