import { useState, useEffect } from 'react'

const Navbar = ({ toggleTheme, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
      isScrolled ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20' : ''
    }`}>
      <p className="bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20 sr-only">
        Hidden
      </p>
      
      <a href="#!">
        <img src="/assets/logovn.png" alt="Logo" className="w-20 cursor-pointer mr-10 dark:hidden" />
        <img src="/assets/logovn.png" alt="Logo" className="w-20 cursor-pointer mr-10 hidden dark:block" />
      </a>

      <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 font-Ovo ${
        isScrolled 
          ? '' 
          : 'bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/30 dark:bg-transparent'
      }`}>
        <li>
          <a 
            className='hover:text-gray-500 dark:hover:text-gray-300 transition' 
            href="#top"
            onClick={(e) => scrollToSection(e, 'top')}
          >
            AI Chat
          </a>
        </li>
        <li>
          <a 
            className='hover:text-gray-500 dark:hover:text-gray-300 transition' 
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
          >
            Thông tin
          </a>
        </li>
      
        <li>
          <a 
            className='hover:text-gray-500 dark:hover:text-gray-300 transition' 
            href="#work"
            onClick={(e) => scrollToSection(e, 'work')}
          >
            Lịch Trình
          </a>
        </li>
        <li>
          <a 
            className='hover:text-gray-500 dark:hover:text-gray-300 transition' 
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
          Kết nối 
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          <img src="/assets/moon_icon.png" alt="" className="w-5 dark:hidden" />
          <img src="/assets/sun_icon.png" alt="" className="w-5 hidden dark:block" />
        </button>

        <a 
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          className="hidden lg:flex items-center gap-3 px-8 py-1.5 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full ml-4 font-Ovo dark:border-white/30"
        >
          Bầu Cử
          <img src="/assets/arrow-icon.png" alt="" className="w-3 dark:hidden" />
          <img src="/assets/arrow-icon-dark.png" alt="" className="w-3 hidden dark:block" />
        </a>

        <button 
          className="block md:hidden ml-3" 
          onClick={() => setIsMenuOpen(true)}
        >
          <img src="/assets/menu-black.png" alt="" className="w-6 dark:hidden" />
          <img src="/assets/menu-white.png" alt="" className="w-6 hidden dark:block" />
        </button>
      </div>

      {/* Mobile Menu */}
      <ul 
        className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 font-Ovo dark:bg-darkHover dark:text-white ${
          isMenuOpen ? 'right-0' : '-right-64'
        }`}
      >
        <div 
          className="absolute right-6 top-6" 
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/assets/close-black.png" alt="" className="w-5 cursor-pointer dark:hidden" />
          <img src="/assets/close-white.png" alt="" className="w-5 cursor-pointer hidden dark:block" />
        </div>

        <li>
          <a href="#top" onClick={(e) => scrollToSection(e, 'top')}>AI CHAT</a>
        </li>
        <li>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>Thông tin</a>
        </li>
        <li>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
        </li>
        <li>
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')}>My Work</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact me</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
