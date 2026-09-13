import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'
import type { QuizQuestion } from '../lib/quizGenerator'
import LiquidGlassPanel from './LiquidGlassPanel'

interface QuizPlayerProps {
  questions: QuizQuestion[]
}

export default function QuizPlayer({ questions }: QuizPlayerProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const isCorrect = selected !== null && question && selected === question.correctIndex

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const choose = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === question.correctIndex) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  const progress = useMemo(() => ((index + (finished ? 1 : 0)) / questions.length) * 100, [index, finished, questions.length])

  if (questions.length === 0) {
    return <p className="text-sm text-silver">This set doesn't have any quiz questions yet.</p>
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <LiquidGlassPanel strong className="flex flex-col items-center gap-4 p-10 text-center">
        <span className="font-display text-6xl text-gradient-metal">{pct}%</span>
        <p className="text-cream">
          You got {score} out of {questions.length} right.
        </p>
        <button
          onClick={restart}
          className="mt-2 flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-medium text-void hover:bg-cream"
        >
          <RotateCcw size={15} />
          Try again
        </button>
      </LiquidGlassPanel>
    )
  }

  return (
    <div>
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-bronze via-cream to-ivory"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.14em] text-silver">
            Question {index + 1} of {questions.length}
          </p>
          <p className="mt-3 font-display text-xl text-cream sm:text-2xl">{question.prompt}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const showState = selected !== null
              const isThisCorrect = i === question.correctIndex
              const isThisSelected = i === selected

              let stateClasses = 'border-ivory/10 bg-white/[0.02] text-silver hover:border-ivory/25'
              if (showState && isThisCorrect) stateClasses = 'border-cream/50 bg-cream/10 text-cream'
              else if (showState && isThisSelected && !isThisCorrect) stateClasses = 'border-[#c98a6b]/50 bg-[#c98a6b]/10 text-[#e3b9a4]'

              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={showState}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm transition-colors ${stateClasses}`}
                >
                  {opt}
                  {showState && isThisCorrect && <Check size={16} />}
                  {showState && isThisSelected && !isThisCorrect && <X size={16} />}
                </button>
              )
            })}
          </div>

          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-between"
            >
              <p className={`text-sm ${isCorrect ? 'text-cream' : 'text-[#e3b9a4]'}`}>
                {isCorrect ? 'Correct.' : `Not quite — the answer was "${question.options[question.correctIndex]}".`}
              </p>
              <button
                onClick={next}
                className="rounded-full bg-ivory px-5 py-2.5 text-xs font-medium text-void hover:bg-cream"
              >
                {index + 1 >= questions.length ? 'See results' : 'Next question'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
