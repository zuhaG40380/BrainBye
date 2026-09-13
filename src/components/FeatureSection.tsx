import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import LiquidGlassPanel from './LiquidGlassPanel'
import QuizPreview from './QuizPreview'

const subjects = ['Science', 'Mathematics', 'History', 'Technology', 'General Knowledge']

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function FeatureSection() {
  return (
    <section id="quizzes" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          custom={0}
          variants={fadeUp}
          className="max-w-xl"
        >
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            More than a quiz.
          </h2>
          <p className="mt-4 text-silver">
            A space to explore, challenge, and expand the way you think.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-6 md:grid-rows-2">
          {/* Feature 01 — Quiz Arena, large */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
            variants={fadeUp}
            id="quiz-arena"
            className="md:col-span-4 md:row-span-2"
          >
            <TiltCard className="h-full" intensity={6}>
              <LiquidGlassPanel className="flex h-full flex-col justify-between gap-10 p-8 sm:p-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-bronze">Quiz Arena</p>
                  <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
                    Challenge your thinking.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-silver">
                    Explore questions, test your knowledge, and discover how far your
                    understanding goes.
                  </p>
                </div>
                <LiquidGlassPanel strong className="p-5 sm:p-6">
                  <QuizPreview />
                </LiquidGlassPanel>
              </LiquidGlassPanel>
            </TiltCard>
          </motion.div>

          {/* Feature 02 — Knowledge Lab */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
            variants={fadeUp}
            id="categories"
            className="md:col-span-2"
          >
            <TiltCard className="h-full" intensity={6}>
              <LiquidGlassPanel className="flex h-full flex-col gap-6 p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-bronze">Knowledge Lab</p>
                  <h3 className="mt-3 font-display text-xl text-cream">Explore every subject.</h3>
                  <p className="mt-2 text-sm text-silver">
                    Move across subjects, discover new ideas, and build a stronger foundation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-ivory/10 bg-white/[0.02] px-3 py-1.5 text-xs text-silver"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </LiquidGlassPanel>
            </TiltCard>
          </motion.div>

          {/* Feature 03 — Track your progress */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={3}
            variants={fadeUp}
            className="md:col-span-2"
          >
            <TiltCard className="h-full" intensity={6}>
              <LiquidGlassPanel className="flex h-full flex-col gap-6 p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-bronze">
                    Track your progress
                  </p>
                  <h3 className="mt-3 font-display text-xl text-cream">See your growth.</h3>
                  <p className="mt-2 text-sm text-silver">
                    Follow your scores, revisit challenges, and keep moving forward.
                  </p>
                </div>
                <svg viewBox="0 0 200 60" className="w-full">
                  <polyline
                    points="0,50 30,42 60,44 90,26 120,30 150,12 180,16 200,4"
                    fill="none"
                    stroke="#D8D1C2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </LiquidGlassPanel>
            </TiltCard>
          </motion.div>
        </div>

        {/* Feature 04 — Daily Challenge, distinct wide banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={4}
          variants={fadeUp}
          className="mt-6"
        >
          <TiltCard intensity={3}>
            <LiquidGlassPanel
              strong
              className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row sm:p-10"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-bronze">Daily Challenge</p>
                <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
                  Give your mind a challenge.
                </h3>
                <p className="mt-3 max-w-sm text-sm text-silver">
                  Return every day for something new to solve.
                </p>
              </div>
              <span className="font-display text-7xl font-light text-gradient-metal sm:text-8xl">
                24h
              </span>
            </LiquidGlassPanel>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
