import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, UploadCloud } from 'lucide-react'

interface FileDropzoneProps {
  onFiles: (files: File[]) => void
  accept?: string
}

export default function FileDropzone({
  onFiles,
  accept = '.txt,.md,.pdf,text/plain,application/pdf',
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      onFiles(Array.from(fileList))
    },
    [onFiles]
  )

  return (
    <motion.button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      animate={{
        borderColor: dragging ? 'rgba(241,235,221,0.5)' : 'rgba(216,209,194,0.14)',
        scale: dragging ? 1.01 : 1,
      }}
      className="liquid-glass flex w-full flex-col items-center gap-4 rounded-[28px] border border-dashed px-6 py-14 text-center transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        {dragging ? <FileText size={24} className="text-cream" /> : <UploadCloud size={24} className="text-cream" />}
      </div>
      <div>
        <p className="font-display text-lg text-cream">
          {dragging ? 'Drop it here' : 'Drag a file here, or click to browse'}
        </p>
        <p className="mt-1 text-sm text-silver">Supports .txt, .md, and .pdf</p>
      </div>
    </motion.button>
  )
}
