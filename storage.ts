import type { StudySet } from './quizGenerator'

const KEY = 'brainbyte:study-sets'
const ACTIVE_KEY = 'brainbyte:active-set-id'

export function loadStudySets(): StudySet[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StudySet[]) : []
  } catch {
    return []
  }
}

export function saveStudySet(set: StudySet) {
  try {
    const existing = loadStudySets()
    const next = [set, ...existing].slice(0, 20)
    localStorage.setItem(KEY, JSON.stringify(next))
    localStorage.setItem(ACTIVE_KEY, set.id)
  } catch {
    // storage unavailable (private browsing, quota, etc) — fail silently
  }
}

export function getActiveSetId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_KEY)
  } catch {
    return null
  }
}

export function setActiveSetId(id: string) {
  try {
    localStorage.setItem(ACTIVE_KEY, id)
  } catch {
    // ignore
  }
}
