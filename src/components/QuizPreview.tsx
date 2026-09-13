const options = ['Neptune', 'Saturn', 'Uranus', 'Jupiter']

export default function QuizPreview() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-[0.14em] text-silver">Question 07 · Science</p>
      <p className="mt-3 font-display text-lg text-cream sm:text-xl">
        Which planet has the strongest winds in the solar system?
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {options.map((opt, i) => (
          <div
            key={opt}
            className={`rounded-2xl border px-3.5 py-2.5 text-sm transition-colors ${
              i === 0
                ? 'border-cream/40 bg-cream/10 text-cream'
                : 'border-ivory/10 bg-white/[0.02] text-silver'
            }`}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}
