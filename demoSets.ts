import type { StudySet } from './quizGenerator'

export const demoSets: StudySet[] = [
  {
    id: 'demo-science',
    title: 'Cell Biology Basics',
    sourceExcerpt: 'Mitochondria, DNA replication, and cell division.',
    createdAt: 0,
    flashcards: [
      { id: 'sci-1', front: 'Mitochondria', back: 'The organelle that generates most of a cell\'s ATP through respiration.' },
      { id: 'sci-2', front: 'Nucleus', back: 'The organelle that houses a cell\'s DNA and controls gene expression.' },
      { id: 'sci-3', front: 'Mitosis', back: 'Cell division that produces two genetically identical daughter cells.' },
      { id: 'sci-4', front: 'Ribosome', back: 'The structure where proteins are synthesized from mRNA.' },
      { id: 'sci-5', front: 'Cell membrane', back: 'The selectively permeable barrier that controls what enters and exits a cell.' },
    ],
    questions: [
      {
        id: 'sci-q1',
        prompt: 'Which organelle is often called the "powerhouse of the cell"?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctIndex: 1,
      },
      {
        id: 'sci-q2',
        prompt: 'What process produces two genetically identical daughter cells?',
        options: ['Meiosis', 'Photosynthesis', 'Mitosis', 'Diffusion'],
        correctIndex: 2,
      },
      {
        id: 'sci-q3',
        prompt: 'Where does protein synthesis take place?',
        options: ['Ribosome', 'Nucleus', 'Cell membrane', 'Vacuole'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'demo-math',
    title: 'Algebra Fundamentals',
    sourceExcerpt: 'Linear equations, functions, and problem solving.',
    createdAt: 0,
    flashcards: [
      { id: 'math-1', front: 'Slope', back: 'The rate of change of a line, calculated as rise over run.' },
      { id: 'math-2', front: 'Function', back: 'A relation where every input has exactly one output.' },
      { id: 'math-3', front: 'y-intercept', back: 'The point where a line crosses the y-axis.' },
      { id: 'math-4', front: 'Quadratic equation', back: 'An equation of the form ax² + bx + c = 0.' },
    ],
    questions: [
      {
        id: 'math-q1',
        prompt: 'In y = mx + b, what does m represent?',
        options: ['The y-intercept', 'The slope', 'The x-intercept', 'A constant'],
        correctIndex: 1,
      },
      {
        id: 'math-q2',
        prompt: 'A function can have how many outputs for a single input?',
        options: ['Zero', 'Exactly one', 'Two', 'As many as needed'],
        correctIndex: 1,
      },
      {
        id: 'math-q3',
        prompt: 'What is the standard form of a quadratic equation?',
        options: ['y = mx + b', 'ax² + bx + c = 0', 'a² + b² = c²', 'y = a/x'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'demo-history',
    title: 'World War II: Key Events',
    sourceExcerpt: 'Major turning points from 1939 to 1945.',
    createdAt: 0,
    flashcards: [
      { id: 'hist-1', front: 'D-Day', back: 'The June 6, 1944 Allied invasion of Normandy, France.' },
      { id: 'hist-2', front: 'Pearl Harbor', back: 'The December 7, 1941 surprise attack that brought the US into WWII.' },
      { id: 'hist-3', front: 'V-E Day', back: 'May 8, 1945 — the day Germany surrendered, ending the war in Europe.' },
    ],
    questions: [
      {
        id: 'hist-q1',
        prompt: 'What event brought the United States into World War II?',
        options: ['D-Day', 'The invasion of Poland', 'The attack on Pearl Harbor', 'V-E Day'],
        correctIndex: 2,
      },
      {
        id: 'hist-q2',
        prompt: 'What did D-Day refer to?',
        options: [
          'The bombing of Hiroshima',
          'The Allied invasion of Normandy',
          "Germany's surrender",
          'The signing of the Treaty of Versailles',
        ],
        correctIndex: 1,
      },
    ],
  },
]
