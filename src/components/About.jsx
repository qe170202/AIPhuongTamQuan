const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">Giới Thiệu</h4>
      <h2 className="text-center text-5xl font-Ovo">AI HỎI ĐÁP BẦU CỬ PHƯỜNG TAM QUAN</h2>
      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <div className="max-w-max mx-auto relative">
          <img src="/assets/robot.jpg" alt="" className="w-64 sm:w-80 rounded-3xl max-w-none" />
          <div className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center">
            <img src="/assets/baucu1.png" alt="" className="w-full animate-spin_slow" />
         </div>
        </div>
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-Ovo">
          Toàn Đảng, toàn dân, toàn quân thi đua lập thành tích chào mừng cuộc bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026 - 2031!
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img src="/assets/code-icon.png" alt="" className="w-7 mt-3 dark:hidden" />
              <img src="/assets/code-icon-dark.png" alt="" className="w-7 mt-3 hidden dark:block" />
              <h3 className="my-4 font-semibold text-gray-700 dark:text-white">ĐƠN VỊ BẦU CỬ SỐ 1</h3>
              <p className="text-gray-600 text-sm dark:text-white/80">Số đại biểu được bầu: 3</p>
            </li>
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img src="/assets/edu-icon.png" alt="" className="w-7 mt-3 dark:hidden" />
              <img src="/assets/edu-icon-dark.png" alt="" className="w-7 mt-3 hidden dark:block" />
              <h3 className="my-4 font-semibold text-gray-700 dark:text-white">ĐƠN VỊ BẦU CỬ SỐ 2</h3>
              <p className="text-gray-600 text-sm dark:text-white/80">Số đại biểu được bầu: 2</p>
            </li>
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img src="/assets/project-icon.png" alt="" className="w-7 mt-3 dark:hidden" />
              <img src="/assets/project-icon-dark.png" alt="" className="w-7 mt-3 hidden dark:block" />
              <h3 className="my-4 font-semibold text-gray-700 dark:text-white">ĐƠN VỊ BẦU CỬ SỐ 3</h3>
              <p className="text-gray-600 text-sm dark:text-white/80">Số đại biểu được bầu: 2</p>
            </li>
          </ul>
          
          
        </div>
      </div>
    </div>
  )
}

export default About
