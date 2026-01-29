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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const [isModalOpen4, setIsModalOpen4] = useState(false)
  const [isModalOpen5, setIsModalOpen5] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Prevent body scroll when ANY modal is open
  useEffect(() => {
    const isAnyModalOpen =
      isModalOpen || isModalOpen2 || isModalOpen3 || isModalOpen4 || isModalOpen5

    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, isModalOpen2, isModalOpen3, isModalOpen4, isModalOpen5])

  return (
    <div
      id="about"
      className="w-full px-[12%] pt-16 pb-10 scroll-mt-28 [zoom:0.86]"
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <li 
              onClick={() => setIsModalOpen(true)}
              className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50 transition-all"
            >
              <div className="flex justify-center">
                <img
                  src="/assets/project-icon.png"
                  alt="Đơn vị bầu cử số 1"
                  className="w-7 mt-3 dark:hidden"
                />
                <img
                  src="/assets/project-icon-dark.png"
                  alt="Đơn vị bầu cử số 1"
                  className="w-7 mt-3 hidden dark:block"
                />
              </div>
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base text-center">
                <span className="block">ĐƠN VỊ BẦU CỬ </span>
                <span className="block">SỐ 1</span>
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 4
              </p>
            </li>
            <li
              onClick={() => setIsModalOpen2(true)}
              className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50 transition-all"
            >
              <div className="flex justify-center">
                <img
                  src="/assets/project-icon.png"
                  alt="Đơn vị bầu cử số 2"
                  className="w-7 mt-3 dark:hidden"
                />
                <img
                  src="/assets/project-icon-dark.png"
                  alt="Đơn vị bầu cử số 2"
                  className="w-7 mt-3 hidden dark:block"
                />
              </div>
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base text-center">
                <span className="block">ĐƠN VỊ BẦU CỬ</span>
                <span className="block">SỐ 2</span>
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 4
              </p>
            </li>
            <li
              onClick={() => setIsModalOpen3(true)}
              className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50 transition-all"
            >
              <div className="flex justify-center">
                <img
                  src="/assets/project-icon.png"
                  alt="Đơn vị bầu cử số 3"
                  className="w-7 mt-3 dark:hidden"
                />
                <img
                  src="/assets/project-icon-dark.png"
                  alt="Đơn vị bầu cử số 3"
                  className="w-7 mt-3 hidden dark:block"
                />
              </div>
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base text-center">
                <span className="block">ĐƠN VỊ BẦU CỬ</span>
                <span className="block">SỐ 3</span>
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 4
              </p>
            </li>
            <li
              onClick={() => setIsModalOpen4(true)}
              className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50 transition-all lg:col-span-2"
            >
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
                Số đại biểu được bầu: 4
              </p>
            </li>

            <li
              onClick={() => setIsModalOpen5(true)}
              className="border border-gray-300 dark:border-white/30 rounded-xl p-5 sm:p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50 transition-all"
            >
              <div className="flex justify-center">
                <img
                  src="/assets/project-icon.png"
                  alt="Đơn vị bầu cử số 5"
                  className="w-7 mt-3 dark:hidden"
                />
                <img
                  src="/assets/project-icon-dark.png"
                  alt="Đơn vị bầu cử số 5"
                  className="w-7 mt-3 hidden dark:block"
                />
              </div>
              <h3 className="my-3 sm:my-4 font-semibold text-gray-700 dark:text-white text-sm sm:text-base text-center">
                <span className="block">ĐƠN VỊ BẦU CỬ</span>
                <span className="block">SỐ 5</span>
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80">
                Số đại biểu được bầu: 4
              </p>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Modal chi tiết Đơn vị bầu cử số 1 */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-darkTheme rounded-2xl shadow-2xl border border-gray-200 dark:border-white/20 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#b820e6] via-[#c94ae0] to-[#da7d20] p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    ĐƠN VỊ BẦU CỬ SỐ 1
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Thông tin chi tiết
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 space-y-4">
              {/* Thông tin tổng quan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Cử Tri
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    3441  <span className="text-lg text-gray-600 dark:text-gray-400">Cử Tri</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Số đại biểu được bầu
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    04 <span className="text-lg text-gray-600 dark:text-gray-400">đại biểu</span>
                  </p>
                </div>
              </div>

              {/* Danh sách khu phố */}
              <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Gồm 03 khu phố
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 1</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1418 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 2</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1102 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 9</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">921 Cử Tri</span>
                  </div>
                
                </div>
              </div>

              {/* Thông tin bầu cử */}
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#b820e6]/5 to-[#da7d20]/5 dark:from-[#b820e6]/10 dark:to-[#da7d20]/10 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1">
                        Địa điểm diễn ra bầu cử
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        Nhà văn hóa khu phố 1,2,9
                      </p>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal chi tiết Đơn vị bầu cử số 2 */}
      {isModalOpen2 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen2(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-darkTheme rounded-2xl shadow-2xl border border-gray-200 dark:border-white/20 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#b820e6] via-[#c94ae0] to-[#da7d20] p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    ĐƠN VỊ BẦU CỬ SỐ 2
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Thông tin chi tiết
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen2(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 space-y-4">
              {/* Thông tin tổng quan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Cử Tri
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    3552 <span className="text-lg text-gray-600 dark:text-gray-400">Cử Tri</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Số đại biểu được bầu
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    4 <span className="text-lg text-gray-600 dark:text-gray-400">đại biểu</span>
                  </p>
                </div>
              </div>

              {/* Danh sách khu phố */}
              <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Gồm 03 khu phố
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 3</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1239 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 4</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1138 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 5</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1175 Cử Tri</span>
                  </div>
                </div>
              </div>

              {/* Thông tin bầu cử */}
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#b820e6]/5 to-[#da7d20]/5 dark:from-[#b820e6]/10 dark:to-[#da7d20]/10 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1">
                        Địa điểm diễn ra bầu cử
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        Nhà văn hóa khu phố 3,4,5
                      </p>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal chi tiết Đơn vị bầu cử số 3 */}
      {isModalOpen3 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen3(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-darkTheme rounded-2xl shadow-2xl border border-gray-200 dark:border-white/20 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#b820e6] via-[#c94ae0] to-[#da7d20] p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    ĐƠN VỊ BẦU CỬ SỐ 3
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Thông tin chi tiết
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen3(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 space-y-4">
              {/* Thông tin tổng quan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Cử Tri
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    3704 <span className="text-lg text-gray-600 dark:text-gray-400">Cử Tri</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Số đại biểu được bầu
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    04 <span className="text-lg text-gray-600 dark:text-gray-400">đại biểu</span>
                  </p>
                </div>
              </div>

              {/* Danh sách khu phố */}
              <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Gồm 03 khu phố
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 6</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1142 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 7</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1081 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố 8</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1481 Cử Tri</span>
                  </div>
                </div>
              </div>

              {/* Thông tin bầu cử */}
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#b820e6]/5 to-[#da7d20]/5 dark:from-[#b820e6]/10 dark:to-[#da7d20]/10 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1">
                        Địa điểm diễn ra bầu cử
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                       Nhà văn hóa khu phố 6,7,8
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal chi tiết Đơn vị bầu cử số 4 */}
      {isModalOpen4 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen4(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-darkTheme rounded-2xl shadow-2xl border border-gray-200 dark:border-white/20 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#b820e6] via-[#c94ae0] to-[#da7d20] p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    ĐƠN VỊ BẦU CỬ SỐ 4
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Thông tin chi tiết
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen4(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 space-y-4">
              {/* Thông tin tổng quan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Cử Tri
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    4148 <span className="text-lg text-gray-600 dark:text-gray-400">Cử Tri</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Số đại biểu được bầu
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  04 <span className="text-lg text-gray-600 dark:text-gray-400">đại biểu</span>
                  </p>
                </div>
              </div>

              {/* Danh sách khu phố */}
              <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Gồm 03 khu phố
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố An Quý Bắc</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1351 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố An Quý Nam</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1042 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố An Sơn</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1755 Cử Tri</span>
                  </div>

                </div>
              </div>

              {/* Thông tin bầu cử */}
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#b820e6]/5 to-[#da7d20]/5 dark:from-[#b820e6]/10 dark:to-[#da7d20]/10 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1">
                      Địa điểm diễn ra bầu cử
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        Nhà văn hóa khu phố An Quý Bắc, An Quý Nam, An Sơn
                      </p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal chi tiết Đơn vị bầu cử số 5 */}
      {isModalOpen5 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen5(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-darkTheme rounded-2xl shadow-2xl border border-gray-200 dark:border-white/20 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#b820e6] via-[#c94ae0] to-[#da7d20] p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    ĐƠN VỊ BẦU CỬ SỐ 5
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">Thông tin chi tiết</p>
                </div>
                <button
                  onClick={() => setIsModalOpen5(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 space-y-4">
              {/* Thông tin tổng quan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Cử Tri
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    4226{' '}
                    <span className="text-lg text-gray-600 dark:text-gray-400">Cử Tri</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      Số đại biểu được bầu
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    04{' '}
                    <span className="text-lg text-gray-600 dark:text-gray-400">đại biểu</span>
                  </p>
                </div>
              </div>

              {/* Danh sách khu phố */}
              <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20]">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gồm 06 khu phố</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Tân An</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">732 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Hội An Tây</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">586 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Tân Trung</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">724 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Thành Sơn Tây</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">785 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Thành Sơn </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">661 Cử Tri</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-darkTheme rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Khu phố Hội An </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">738 Cử Tri</span>
                  </div>
                </div>
              </div>

              {/* Thông tin bầu cử */}
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#b820e6]/5 to-[#da7d20]/5 dark:from-[#b820e6]/10 dark:to-[#da7d20]/10 rounded-xl p-3 border border-[#b820e6]/20 dark:border-[#b820e6]/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#b820e6] to-[#da7d20] flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1">
                        Địa điểm diễn ra bầu cử
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">Nhà văn hóa khu phố Tân An, Hội An Tây, Tân Trung, Thành Sơn Tây, Thành Sơn, Hội An</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
