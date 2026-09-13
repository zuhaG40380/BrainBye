import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, Sparkles, X, Loader2 } from 'lucide-react'
import FileDropzone from '../components/FileDropzone'
import LiquidGlassPanel from '../components/LiquidGlassPanel'
import { extractTextFromFile } from '../lib/extractText'
import { generateStudySet } from '../lib/quizGenerator'
import { saveStudySet } from '../lib/storage'

type Stage = 'idle' | 'reading' | 'generating' | 'error'

const steps = [
  { icon: '📄', title: 'Add your material', text: 'Upload a PDF or text file, or paste notes directly.' },
  { icon: '⚡', title: 'BrainByte reads it', text: 'Your material is scanned for key terms and ideas, right in your browser.' },
  { icon: '🧠', title: 'Study instantly', text: 'Get a flashcard deck and a practice quiz built from your own material.' },
]

export default function CreatePage() {
  const navigate = useNavigate()
  const [pastedText, setPastedText] = useState('')
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [title, setTitle] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    setAttachedFiles((prev) => [...prev, ...files])
    if (!title && files[0]) setTitle(files[0].name.replace(/\.[^.]+$/, ''))
  }

  const removeFile = (name: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.name !== name))
  }

  const handleGenerate = async () => {
    setError(null)
    setStage('reading')
    try {
      const fileTexts = await Promise.all(attachedFiles.map(extractTextFromFile))
      const combined = [pastedText, ...fileTexts].join('\n\n').trim()

      if (combined.length < 60) {
        setError('Add a bit more material — at least a few sentences — so BrainByte has something to work with.')
        setStage('idle')
        return
      }

      setStage('generating')
      // brief pause so the "generating" state actually reads as a step, not a flash
      await new Promise((r) => setTimeout(r, 500))

      const set = generateStudySet(combined, title || 'My study set')
      saveStudySet(set)
      navigate('/quizzes')
    } catch (err) {
      console.error(err)
      setError('Something went wrong reading that file. Try a different PDF or paste the text instead.')
      setStage('error')
    }
  }

  const canGenerate = (pastedText.trim().length > 0 || attachedFiles.length > 0) && stage === 'idle'

  return (
    <section className="relative min-h-screen w-full px-6 pb-32 pt-36 sm:pt-44">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.14em] text-bronze">Create</p>
        <h1 className="mt-3 font-display text-4xl font-light text-cream sm:text-5xl">
          Turn your notes into a quiz.
        </h1>
        <p className="mt-4 max-w-xl text-silver">
          Drop in a PDF, a text file, or paste your notes below. BrainByte reads it locally in
          your browser and builds a flashcard deck and a practice quiz from it — no upload to a
          server required.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <LiquidGlassPanel key={s.title} className="p-5">
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-3 text-xs uppercase tracking-[0.1em] text-bronze">Step {i + 1}</p>
              <p className="mt-1 font-display text-base text-cream">{s.title}</p>
              <p className="mt-1 text-xs text-silver">{s.text}</p>
            </LiquidGlassPanel>
          ))}
        </div>

        <div className="mt-14 space-y-6">
          <FileDropzone onFiles={handleFiles} />

          <AnimatePresence>
            {attachedFiles.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 overflow-hidden"
              >
                {attachedFiles.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-2 rounded-full border border-ivory/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream"
                  >
                    <FileText size={13} />
                    {f.name}
                    <button
                      onClick={() => removeFile(f.name)}
                      aria-label={`Remove ${f.name}`}
                      className="text-silver hover:text-cream"
                    >
                      <X size={13} />
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="text-center text-xs uppercase tracking-[0.14em] text-gray">or</div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your notes, an article, or a textbook passage here…"
            rows={8}
            className="liquid-glass w-full resize-none rounded-[28px] px-6 py-5 text-sm text-cream placeholder:text-gray focus:outline-none"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this study set a name (optional)"
            className="liquid-glass w-full rounded-full px-6 py-3.5 text-sm text-cream placeholder:text-gray focus:outline-none"
          />

          {error && <p className="text-sm text-[#c98a6b]">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-medium text-void transition-opacity duration-300 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
          >
            {stage === 'reading' || stage === 'generating' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {stage === 'reading' ? 'Reading your material…' : 'Building your study set…'}
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate flashcards & quiz
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray">
            This demo builds study sets with lightweight in-browser text analysis — plug in a
            language model on a backend to make the questions smarter.
          </p>
        </div>
      </div>
    </section>
  )
}
