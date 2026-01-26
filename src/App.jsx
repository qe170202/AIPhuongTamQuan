import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import { trackPageVisit } from './utils/analytics'

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return true
      }
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }
  }, [isDark])

  // Scroll to top on mount and prevent scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Track page visit
  useEffect(() => {
    trackPageVisit()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="font-Outfit leading-8 dark:bg-darkTheme dark:text-white min-h-screen">
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <img src="/assets/header-bg-color.png" alt="" className="w-full" />
      </div>
      
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Home />
      <About />
      <Work />
      <Contact />
    </div>
  )
}

export default App
