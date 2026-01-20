import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const CAROUSEL_IMAGES = [
  { src: '/assets/baucu4.jpg', alt: 'AI Hỏi đáp bầu cử' },
  { src: '/assets/baucu5.jpeg', alt: 'Bầu cử phường Tam Quan' },
  { src: '/assets/baucu3.jpg', alt: 'Bầu cử' },
]

const About = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [carouselRef, isCarouselVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20 lg:[zoom:0.92]"
    >
      {/* Header giữ trên, canh giữa */}
      <div 
        ref={headerRef}
        className={`animate-on-scroll ${isHeaderVisible ? 'animate-fade-in-down' : ''}`}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo text-gray-600 dark:text-gray-400">
          Giới Thiệu
        </h4>
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo text-gray-900 dark:text-white mx-auto max-w-max md:max-w-full text-balance">
          AI HỎI ĐÁP BẦU CỬ <span className="whitespace-nowrap">PHƯỜNG TAM QUAN</span>
        </h2>
      </div>

      {/* Hai cột 30/70: bên trái carousel (chỗ khung đỏ), bên phải đoạn văn + 3 thẻ */}
      <div className="flex w-full flex-col lg:flex-row items-stretch gap-8 lg:gap-10 my-16">
        {/* Cột 50% - Carousel cao bằng cột 50%, có khung viền */}
        <div 
          ref={carouselRef}
          className={`w-full lg:w-1/2 shrink-0 flex flex-col min-h-0 animate-on-scroll ${isCarouselVisible ? 'animate-fade-in-right' : ''}`}
        >
          <div className="relative w-full aspect-video lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/30 shadow-xl">
            {CAROUSEL_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-white scale-125 shadow'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Xem ảnh ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cột 50% - Chỉ đoạn văn + 4 thẻ (2x2) */}
        <div 
          ref={contentRef}
          className={`w-full lg:w-1/2 min-w-0 flex flex-col justify-center animate-on-scroll ${isContentVisible ? 'animate-fade-in-left' : ''}`}
        >
          <p className="mb-8 max-w-2xl font-Ovo text-gray-700 dark:text-gray-300">
            Toàn Đảng, toàn dân, toàn quân thi đua lập thành tích chào mừng cuộc
            bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các
            cấp nhiệm kỳ 2026 - 2031!
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                src="/assets/code-icon.png"
                alt=""
                className="w-7 mt-3 dark:hidden"
              />
              <img
                src="/assets/code-icon-dark.png"
                alt=""
                className="w-7 mt-3 hidden dark:block"
              />
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base">
                ĐƠN VỊ BẦU CỬ SỐ 1
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 5
              </p>
            </li>
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                src="/assets/edu-icon.png"
                alt=""
                className="w-7 mt-3 dark:hidden"
              />
              <img
                src="/assets/edu-icon-dark.png"
                alt=""
                className="w-7 mt-3 hidden dark:block"
              />
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base">
                ĐƠN VỊ BẦU CỬ SỐ 2
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 5
              </p>
            </li>
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                src="/assets/project-icon.png"
                alt=""
                className="w-7 mt-3 dark:hidden"
              />
              <img
                src="/assets/project-icon-dark.png"
                alt=""
                className="w-7 mt-3 hidden dark:block"
              />
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base">
                ĐƠN VỊ BẦU CỬ SỐ 3
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 5
              </p>
            </li>
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                src="/assets/project-icon.png"
                alt=""
                className="w-7 mt-3 dark:hidden"
              />
              <img
                src="/assets/project-icon-dark.png"
                alt=""
                className="w-7 mt-3 hidden dark:block"
              />
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base">
                ĐƠN VỊ BẦU CỬ SỐ 4
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 5
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
