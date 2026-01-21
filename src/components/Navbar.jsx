import { useMemo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const navLinks = [
  { href: 'top', label: 'AI Chat' },
  { href: 'about', label: 'Thông tin' },
  { href: 'work', label: 'Lịch Trình' },
  { href: 'contact', label: 'Kết nối' },
]

const Navbar = ({ toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  const sectionIds = useMemo(() => navLinks.map((l) => l.href), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isMenuOpen])

  // Close on ESC
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    const getSectionIdFromHash = () => (window.location.hash || '#top').replace('#', '')

    // Init from current hash (if user reloads at a section)
    setActiveSection(getSectionIdFromHash())

    const handleHashChange = () => setActiveSection(getSectionIdFromHash())
    window.addEventListener('hashchange', handleHashChange)

    // Track current section while scrolling
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    // If sections are missing, just rely on hashchange/click.
    if (elements.length === 0) {
      return () => window.removeEventListener('hashchange', handleHashChange)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        const topEntry = visible[0]
        if (topEntry?.target?.id) setActiveSection(topEntry.target.id)
      },
      {
        root: null,
        // Consider a section active when it's around the middle of viewport
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      observer.disconnect()
    }
  }, [sectionIds])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(sectionId)
    window.history.replaceState(null, '', `#${sectionId}`)
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`w-full fixed left-0 right-0 top-0 z-50 px-4 sm:px-6 lg:px-10 xl:px-[8%] py-3 sm:py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-darkTheme/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5 border-b border-gray-200/60 dark:border-white/10'
            : 'bg-transparent'
        }`}
        aria-label="Điều hướng chính"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, 'top')}
          className="flex items-center gap-3 sm:gap-3.5 shrink-0 group rounded-2xl px-2 py-1.5 transition-all duration-200 hover:bg-white/60 hover:shadow-sm dark:hover:bg-white/5"
          title="Về đầu trang"
        >
          <img
            src="/assets/logobaucu.jpg"
            alt="Logo Phường Tam Quan"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-Ovo font-semibold text-gray-800 dark:text-white leading-tight tracking-tight text-[22px] sm:text-[24px] lg:text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-[#b820e6] to-[#da7d20] drop-shadow-sm">
            Phường Tam Quan
          </span>
        </a>

        {/* Desktop: Nav links */}
        <ul
          className={`hidden md:flex items-center gap-1 rounded-full font-Ovo text-[15px] ${
            isScrolled
              ? 'text-gray-600 dark:text-gray-300'
              : 'bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200/80 dark:border-white/20 text-gray-700 dark:text-gray-200 shadow-sm'
          }`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                onClick={(e) => scrollToSection(e, href)}
                className={`relative px-5 py-2.5 rounded-full text-inherit transition-colors duration-200 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:bg-gradient-to-r after:from-[#b820e6] after:to-[#da7d20] after:rounded-full after:transition-all after:duration-200 ${
                  activeSection === href
                    ? 'text-[#b820e6] dark:text-[#da7d20] after:w-4'
                    : 'hover:text-[#b820e6] dark:hover:text-[#da7d20] after:w-0 hover:after:w-4'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle, CTA, mobile menu btn */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Chuyển giao diện sáng / tối"
            className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <img src="/assets/moon_icon.png" alt="" className="w-5 h-5 dark:hidden" />
            <img src="/assets/sun_icon.png" alt="" className="w-5 h-5 hidden dark:block" />
          </button>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white text-[15px] font-Ovo font-medium shadow-md shadow-[#b820e6]/25 hover:shadow-lg hover:shadow-[#b820e6]/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Bầu Cử
          
          </a>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Mở menu"
            className="md:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <img src="/assets/menu-black.png" alt="" className="w-6 h-6 dark:hidden" />
            <img src="/assets/menu-white.png" alt="" className="w-6 h-6 hidden dark:block" />
          </button>
        </div>
      </div>

      </nav>

      {/* Mobile Menu (Portal to body to avoid stacking/overflow issues) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isMenuOpen}
          >
            <div
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Đóng menu"
            />
            <aside
              role="dialog"
              aria-modal="true"
              className={`absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-darkTheme border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 dark:border-white/10">
                <span className="font-Ovo font-semibold text-gray-800 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Đóng"
                >
                  <img src="/assets/close-black.png" alt="" className="w-5 h-5 dark:hidden" />
                  <img src="/assets/close-white.png" alt="" className="w-5 h-5 hidden dark:block" />
                </button>
              </div>
              <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={`#${href}`}
                    onClick={(e) => scrollToSection(e, href)}
                    className={`py-3.5 px-4 rounded-xl font-Ovo transition-colors break-words ${
                      activeSection === href
                        ? 'bg-gray-50 dark:bg-white/5 text-[#b820e6] dark:text-[#da7d20]'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#b820e6] dark:hover:text-[#da7d20]'
                    }`}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="mt-4 mx-4 py-3.5 px-4 rounded-xl font-Ovo font-medium text-center bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white hover:opacity-95 transition-opacity"
                >
                  Bầu Cử
                </a>
              </nav>
            </aside>
          </div>,
          document.body
        )}
    </>
  )
}

export default Navbar
