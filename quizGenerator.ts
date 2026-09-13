export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export interface StudySet {
  id: string
  title: string
  sourceExcerpt: string
  createdAt: number
  flashcards: Flashcard[]
  questions: QuizQuestion[]
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'and',
  'or', 'but', 'if', 'then', 'so', 'of', 'in', 'on', 'at', 'to', 'for', 'with',
  'as', 'by', 'from', 'that', 'this', 'these', 'those', 'it', 'its', 'has',
  'have', 'had', 'not', 'can', 'will', 'would', 'could', 'should', 'also',
  'into', 'than', 'which', 'who', 'whom', 'their', 'there', 'here', 'such',
])

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && s.length < 240 && /[a-zA-Z]/.test(s))
}

/** Picks a reasonable "key term" in a sentence to blank out: prefers a
 * capitalized word/number/longer noun-like token that isn't sentence-initial. */
function pickKeyTerm(sentence: string): string | null {
  const words = sentence.split(/\s+/)
  const candidates: { word: string; score: number }[] = []

  words.forEach((raw, i) => {
    const word = raw.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')
    if (word.length < 4) return
    const lower = word.toLowerCase()
    if (STOPWORDS.has(lower)) return

    let score = word.length
    if (i > 0 && /^[A-Z]/.test(word) && !/^[A-Z]+$/.test(word)) score += 6 // proper noun, not start-of-sentence
    if (/\d/.test(word)) score += 4
    if (word.length > 8) score += 3

    candidates.push({ word, score })
  })

  if (candidates.length === 0) return null
  candidates.sort((a, b) => b.score - a.score)
  return candidates[0].word
}

function buildDistractors(term: string, pool: string[]): string[] {
  const sameCase = /^[A-Z]/.test(term)
  const filtered = pool
    .filter((w) => w.toLowerCase() !== term.toLowerCase() && w.length >= 4)
    .filter((w, i, arr) => arr.findIndex((x) => x.toLowerCase() === w.toLowerCase()) === i)

  // prefer similar-length words for plausible-looking wrong answers
  filtered.sort((a, b) => Math.abs(a.length - term.length) - Math.abs(b.length - term.length))

  const picks: string[] = []
  for (const w of filtered) {
    if (picks.length >= 3) break
    const cased = sameCase ? w[0].toUpperCase() + w.slice(1) : w
    picks.push(cased)
  }

  // pad with generic fallbacks if the source text was short
  const fallbacks = ['None of these', 'Not mentioned', 'Unclear from the text']
  while (picks.length < 3) picks.push(fallbacks[picks.length % fallbacks.length])
  return picks
}

function extractVocab(text: string): string[] {
  const words = text.match(/[A-Za-z][A-Za-z'-]{3,}/g) || []
  const freq = new Map<string, number>()
  for (const w of words) {
    const lower = w.toLowerCase()
    if (STOPWORDS.has(lower)) continue
    freq.set(w, (freq.get(w) || 0) + 1)
  }
  return [...freq.keys()]
}

/** Naive "X is/are Y" definition extraction, for flashcards. */
function extractDefinitions(sentences: string[]): Flashcard[] {
  const defPattern = /^(.{3,60}?)\s+(?:is|are|refers to|means|was|were)\s+(.{10,180})$/i
  const cards: Flashcard[] = []

  sentences.forEach((s, i) => {
    const match = s.match(defPattern)
    if (!match) return
    const [, term, definition] = match
    const cleanTerm = term.replace(/^(the|a|an)\s+/i, '').trim()
    if (cleanTerm.split(' ').length > 6) return // likely not a clean term
    cards.push({
      id: `def-${i}`,
      front: cleanTerm.charAt(0).toUpperCase() + cleanTerm.slice(1),
      back: definition.replace(/\.$/, '').trim(),
    })
  })

  return cards
}

export function generateStudySet(rawText: string, title: string): StudySet {
  const text = rawText.trim()
  const sentences = splitSentences(text)
  const vocab = extractVocab(text)

  // Flashcards: prefer real "X is Y" definitions; fall back to cloze cards.
  let flashcards = extractDefinitions(sentences).slice(0, 12)

  if (flashcards.length < 6) {
    const clozeCards: Flashcard[] = sentences.slice(0, 16).map((sentence, i) => {
      const term = pickKeyTerm(sentence)
      if (!term) return null
      const blanked = sentence.replace(term, '_____')
      return { id: `cloze-${i}`, front: blanked, back: term }
    }).filter((c): c is Flashcard => !!c)
    flashcards = [...flashcards, ...clozeCards].slice(0, 12)
  }

  // Quiz questions: cloze multiple-choice built from other sentences.
  const questions: QuizQuestion[] = []
  const usedSentences = new Set<string>()

  for (const sentence of sentences) {
    if (questions.length >= 10) break
    if (usedSentences.has(sentence)) continue
    const term = pickKeyTerm(sentence)
    if (!term) continue

    const distractors = buildDistractors(term, vocab)
    const options = [term, ...distractors]
    // shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    questions.push({
      id: `q-${questions.length}`,
      prompt: sentence.replace(term, '_____'),
      options,
      correctIndex: options.indexOf(term),
    })
    usedSentences.add(sentence)
  }

  return {
    id: `set-${Date.now()}`,
    title: title || 'Untitled study set',
    sourceExcerpt: text.slice(0, 220),
    createdAt: Date.now(),
    flashcards,
    questions,
  }
}
