import { motion } from 'framer-motion'

interface BrainByteLogoProps {
  size?: number
  showWordmark?: boolean
  className?: string
}

/**
 * Original BrainByte mark.
 * Two symmetrical flowing metallic strokes form an abstract brain silhouette;
 * a small negative-space square (the "byte") sits at the seam between them,
 * and a thin circuit line threads through the lower-right lobe.
 */
export default function BrainByteLogo({
  size = 40,
  showWordmark = true,
  className = '',
}: BrainByteLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={false}
        whileHover="hover"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="bb-metal" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F1EBDD" />
            <stop offset="35%" stopColor="#D8D1C2" />
            <stop offset="60%" stopColor="#A8A39A" />
            <stop offset="100%" stopColor="#8A6E52" />
          </linearGradient>
          <linearGradient id="bb-metal-soft" x1="60" y1="4" x2="4" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#77736D" />
            <stop offset="50%" stopColor="#D8D1C2" />
            <stop offset="100%" stopColor="#F1EBDD" />
          </linearGradient>
        </defs>

        {/* Left lobe */}
        <motion.path
          d="M30 8C19 7 10 15 9 25c-1 8 3 13 3 19 0 6 4 10 10 10 5 0 8-3 9-7"
          stroke="url(#bb-metal)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          variants={{ hover: { pathLength: [1, 0.85, 1] } }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        {/* Right lobe */}
        <motion.path
          d="M34 8c11-1 20 7 21 17 1 8-3 13-3 19 0 6-4 10-10 10-5 0-8-3-9-7"
          stroke="url(#bb-metal-soft)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          variants={{ hover: { pathLength: [1, 0.85, 1] } }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.05 }}
        />
        {/* inner circuit thread, lower-right lobe */}
        <motion.path
          d="M35 40h6v-6h5"
          stroke="#F1EBDD"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.85}
          variants={{ hover: { opacity: [0.85, 0.35, 0.85] } }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <circle cx="46" cy="34" r="1.4" fill="#F1EBDD" />
        {/* negative-space byte square at the seam */}
        <motion.rect
          x="28.5"
          y="24.5"
          width="7"
          height="7"
          rx="1.4"
          fill="#050505"
          stroke="url(#bb-metal)"
          strokeWidth="1.2"
          variants={{ hover: { rotate: 90 } }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformOrigin: '32px 28px' }}
        />
      </motion.svg>

      {showWordmark && (
        <span className="font-display text-xl tracking-[0.02em] text-gradient-metal">
          Brain<span className="font-normal">Byte</span>
        </span>
      )}
    </div>
  )
}
