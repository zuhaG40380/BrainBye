import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BrainByteLogo from './BrainByteLogo'

const LINKS = ['Home', 'Explore', 'Quizzes', 'Categories', 'About']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6"
    >
      <motion.nav
        animate={{
          marginTop: scrolled ? 14 : 0,
          width: scrolled ? 'min(920px, 100%)' : '100%',
          borderRadius: scrolled ? 999 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between px-5 sm:px-7 py-3.5 transition-colors duration-500 ${
          scrolled ? 'liquid-glass' : 'bg-transparent border border-transparent'
        }`}
      >
        <a href="#hero" aria-label="BrainByte home">
          <BrainByteLogo size={32} />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-silver">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:text-cream transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#quiz-arena"
          className="hidden md:inline-flex items-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-2.5 hover:bg-cream transition-colors duration-300"
        >
          Start a quiz
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-ivory"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="liquid-glass-strong absolute top-20 left-4 right-4 rounded-3xl p-6 md:hidden"
          >
            <ul className="flex flex-col gap-5 text-lg text-ivory">
              {LINKS.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#quiz-arena"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-3"
            >
              Start a quiz
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
