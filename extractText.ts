import * as pdfjsLib from 'pdfjs-dist'
// Vite resolves this to a hashed worker URL at build time.
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export async function extractTextFromFile(file: File): Promise<string> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

  if (isPdf) {
    const buffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
    const pageTexts: string[] = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const text = content.items.map((item: any) => ('str' in item ? item.str : '')).join(' ')
      pageTexts.push(text)
    }

    return pageTexts.join('\n\n')
  }

  // plain text / markdown / anything readable as text
  return file.text()
}
