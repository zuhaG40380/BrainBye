import { ReactNode, HTMLAttributes } from 'react'

interface LiquidGlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  strong?: boolean
  className?: string
}

export default function LiquidGlassPanel({
  children,
  strong = false,
  className = '',
  ...rest
}: LiquidGlassPanelProps) {
  return (
    <div
      className={`${strong ? 'liquid-glass-strong' : 'liquid-glass'} rounded-[28px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
