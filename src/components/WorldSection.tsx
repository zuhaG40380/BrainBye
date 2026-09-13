import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import LiquidGlassPanel from './LiquidGlassPanel'

const fragments = [
  { text: 'Can you solve this?', top: '12%', left: '8%', depth: 1, fadeOut: 0 },
  { text: 'Question 01', top: '68%', left: '10%', depth: 0.6, fadeOut: 0.3 },
  { text: 'Choose your answer', top: '20%', left: '78%', depth: 0.8, fadeOut: 0 },
  { text: 'Knowledge level', top: '72%', left: '76%', depth: 1.1, fadeOut: 0.3 },
  { text: 'New challenge detected', top: '46%', left: '86%', depth: 0.5, fadeOut: 0 },
]

function OrbitFragment({
  fragment,
  progress,
}: {
  fragment: (typeof fragments)[number]
  progress: MotionValue<number>
}) {
  const y = useTransform(progress, [0, 1], [30 * fragment.depth, -60 * fragment.depth])
  const opacity = useTransform(
    progress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, fragment.fadeOut || 0]
  )

  return (
    <motion.div style={{ top: fragment.top, left: fragment.left, y, opacity }} className="absolute z-10 hidden sm:block">
      <LiquidGlassPanel className="px-4 py-2.5">
        <span className="whitespace-nowrap text-xs text-cream">{fragment.text}</span>
      </LiquidGlassPanel>
    </motion.div>
  )
}

export default function WorldSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.08, 0.85])
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="explore" ref={ref} className="relative min-h-[140vh] w-full py-40">
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ rotate: orbRotate, scale: orbScale }}
          className="pointer-events-none absolute h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #f1ebdd 0%, #a8a39a 30%, #2a2825 65%, #050505 100%)',
              boxShadow: '0 0 120px 20px rgba(216,209,194,0.08), inset 0 0 80px rgba(0,0,0,0.6)',
            }}
          />
        </motion.div>

        {fragments.map((f) => (
          <OrbitFragment key={f.text} fragment={f} progress={scrollYProgress} />
        ))}

        <motion.div style={{ y: headingY }} className="relative z-20 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-light leading-tight text-cream sm:text-6xl">
            Your mind. A universe of possibilities.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
