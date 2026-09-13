import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiquidMetalScene from './LiquidMetalScene'
import BrainByteLogo from './BrainByteLogo'
import { usePrefersReducedMotion, useIsMobile } from '../hooks'

const title = 'BrainByte'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.4 : 2.1])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[220vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <LiquidMetalScene scrollProgress={scrollYProgress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* radial vignette to keep type legible over the scene */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(5,5,5,0.35)_55%,rgba(5,5,5,0.85)_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 2.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8"
          >
            <motion.div style={{ opacity: logoOpacity, y: logoY }}>
              <BrainByteLogo size={40} showWordmark={false} />
            </motion.div>
          </motion.div>

          <motion.h1
            style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
            className="font-display font-light text-[16vw] sm:text-[12vw] md:text-[9vw] leading-[0.92] tracking-tight text-gradient-metal"
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 1.7 + i * 0.045,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div style={{ opacity: contentOpacity, y: contentY }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-xl sm:text-2xl text-cream"
            >
              Think deeper. Play smarter.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 2.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-3 max-w-md text-sm sm:text-base text-silver"
            >
              A new way to challenge your mind, explore ideas, and discover what you know.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 2.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
            >
              <a
                href="#world"
                className="rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-void transition-colors duration-300 hover:bg-cream"
              >
                Explore BrainByte
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-silver underline-offset-4 transition-colors duration-300 hover:text-cream hover:underline"
              >
                Discover the experience →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
