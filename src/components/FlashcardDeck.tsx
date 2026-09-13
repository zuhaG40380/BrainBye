import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import type { Flashcard } from '../lib/quizGenerator'

interface FlashcardDeckProps {
  cards: Flashcard[]
}

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (cards.length === 0) {
    return <p className="text-sm text-silver">This set doesn't have any flashcards yet.</p>
  }

  const card = cards[index]

  const go = (dir: 1 | -1) => {
    setFlipped(false)
    setIndex((i) => (i + dir + cards.length) % cards.length)
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xs uppercase tracking-[0.14em] text-silver">
        Card {index + 1} of {cards.length}
      </p>

      <div className="relative h-72 w-full max-w-md" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={card.id + (flipped ? '-back' : '-front')}
            onClick={() => setFlipped((f) => !f)}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass-strong absolute inset-0 flex w-full flex-col items-center justify-center gap-3 rounded-[28px] p-8 text-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-[11px] uppercase tracking-[0.14em] text-bronze">
              {flipped ? 'Answer' : 'Question'}
            </span>
            <p className="font-display text-xl text-cream sm:text-2xl">
              {flipped ? card.back : card.front}
            </p>
            <span className="mt-2 flex items-center gap-1.5 text-xs text-gray">
              <RotateCw size={12} /> tap to flip
            </span>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 text-silver hover:text-cream"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next card"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 text-silver hover:text-cream"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
