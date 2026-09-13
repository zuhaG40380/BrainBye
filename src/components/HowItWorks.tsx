import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  { label: '01', title: 'Choose', text: 'Select a subject or challenge.' },
  { label: '02', title: 'Think', text: 'Solve questions and test your understanding.' },
  { label: '03', title: 'Grow', text: 'Review your results and improve.' },
]

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / steps.length
  const end = (index + 1) / steps.length
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.25, 1, 0.25])
  const scale = useTransform(progress, [start, (start + end) / 2, end], [0.94, 1, 0.94])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-baseline sm:gap-6 sm:text-left"
    >
      <span className="font-display text-2xl text-bronze">{step.label}</span>
      <div>
        <h3 className="font-display text-3xl text-cream sm:text-4xl">{step.title}</h3>
        <p className="mt-2 max-w-xs text-sm text-silver">{step.text}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id="how-it-works" ref={ref} className="relative w-full px-6 py-32 sm:py-44">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
          Enter. Explore. Evolve.
        </h2>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-graphite sm:block" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-cream via-bronze to-transparent sm:block"
          />
          <div className="flex flex-col gap-16 sm:gap-24">
            {steps.map((s, i) => (
              <Step key={s.label} step={s} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
