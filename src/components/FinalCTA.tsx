import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })

  const orbScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.6])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.3, 0.6, 0.85])
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -20])

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden px-6 py-32"
    >
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="pointer-events-none absolute h-[70vw] w-[70vw] max-h-[720px] max-w-[720px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #f1ebdd 0%, #8a6e52 35%, #171717 70%, #050505 100%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 max-w-xl text-center">
        <h2 className="font-display text-4xl font-light text-cream sm:text-6xl">
          Ready to challenge your mind?
        </h2>
        <p className="mt-5 text-silver">Your next question is waiting.</p>
        <a
          href="#quiz-arena"
          className="mt-10 inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-medium text-void transition-colors duration-300 hover:bg-cream"
        >
          Start exploring
        </a>
      </motion.div>
    </section>
  )
}
