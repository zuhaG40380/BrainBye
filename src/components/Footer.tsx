import BrainByteLogo from './BrainByteLogo'

export default function Footer() {
  return (
    <footer className="border-t border-graphite px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <BrainByteLogo size={26} />
        <p className="text-xs text-gray">© {new Date().getFullYear()} BrainByte. A student project.</p>
        <div className="flex gap-6 text-xs text-silver">
          <a href="#hero" className="hover:text-cream transition-colors">Home</a>
          <a href="#quizzes" className="hover:text-cream transition-colors">Quizzes</a>
          <a href="#how-it-works" className="hover:text-cream transition-colors">About</a>
        </div>
      </div>
    </footer>
  )
}
