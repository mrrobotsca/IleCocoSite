import { useMemo, type CSSProperties } from 'react'

const STROKE = '#3a3a3a'

type DoodleProps = { size?: number; color?: string; style?: CSSProperties; className?: string }

export const SeedScatter = ({ count = 20, color = STROKE, style }: { count?: number; color?: string; style?: CSSProperties }) => {
  const seeds = useMemo(() => {
    const arr: { x: number; y: number; r: number; rot: number }[] = []
    let seed = 1
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < count; i++) {
      arr.push({ x: rand() * 100, y: rand() * 100, r: 1 + rand() * 2, rot: rand() * 360 })
    }
    return arr
  }, [count])
  return (
    <svg viewBox="0 0 100 100" style={style} preserveAspectRatio="none" aria-hidden="true">
      {seeds.map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx={s.r * 1.1} ry={s.r * 0.5} fill={color} transform={`rotate(${s.rot} ${s.x} ${s.y})`} />
      ))}
    </svg>
  )
}

export const Rocket = ({ size = 110, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 110 110" style={style} className={className} aria-hidden="true">
    <g fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 12 C 62 18, 72 32, 70 56 L 56 78 C 50 80, 44 80, 38 78 L 24 56 C 22 32, 32 18, 44 12 C 46 10, 48 10, 50 12 Z" fill="#cfd8c4" />
      <circle cx="47" cy="36" r="7" fill="#faf8f2" />
      <circle cx="47" cy="36" r="3.5" fill="#b9c4b1" />
      <path d="M22 56 L 10 72 L 24 70 Z" fill="#e2b56a" />
      <path d="M70 56 L 84 72 L 70 70 Z" fill="#e7b08a" />
      <path d="M40 80 C 42 88, 50 92, 47 100 M 54 80 C 56 88, 50 92, 53 100" />
      <path d="M88 22 L 92 18 M 90 20 L 90 14 M 90 20 L 96 20" />
      <path d="M14 36 L 10 32 M 12 34 L 6 34 M 12 34 L 12 28" />
    </g>
  </svg>
)

export const CloudHen = ({ size = 130, style, className }: DoodleProps) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 130 100" style={style} className={className} aria-hidden="true">
    <g fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 60 C 18 60, 12 50, 18 40 C 18 28, 30 22, 42 28 C 50 18, 70 18, 78 30 C 92 28, 102 38, 98 50 C 110 52, 112 64, 100 70 C 100 76, 90 80, 78 76 C 70 84, 50 84, 40 76 C 28 78, 22 70, 30 60 Z" fill="#faf8f2" />
      <circle cx="86" cy="46" r="1.5" fill={STROKE} />
      <path d="M96 50 L 102 52 L 96 54" />
      <path d="M52 80 L 50 90 M 56 80 L 56 90 M 70 80 L 68 90 M 74 80 L 74 90" />
    </g>
  </svg>
)

export const Squiggle = ({ width = 280, height = 60, style, dashed = true, color = STROKE }: { width?: number; height?: number; style?: CSSProperties; dashed?: boolean; color?: string }) => (
  <svg width={width} height={height} viewBox="0 0 280 60" style={style} aria-hidden="true">
    <path d="M5 30 C 50 5, 90 55, 140 30 S 230 5, 275 30" fill="none" stroke={color} strokeWidth="1.6" strokeDasharray={dashed ? '4 6' : 'none'} strokeLinecap="round" />
  </svg>
)

export const Sparkle = ({ size = 24, color = STROKE, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
    <path d="M12 2 L 13.5 10 L 22 12 L 13.5 14 L 12 22 L 10.5 14 L 2 12 L 10.5 10 Z" fill={color} />
  </svg>
)

export const Blob = ({ size = 200, fill = '#b9c4b1', style }: { size?: number; fill?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={style} aria-hidden="true">
    <path d="M40 80 C 30 50, 60 20, 100 25 C 145 30, 175 60, 170 105 C 165 150, 130 175, 85 170 C 45 165, 20 130, 30 100 C 32 92, 36 86, 40 80 Z" fill={fill} />
  </svg>
)

export const Bloom = ({ size = 36, color = STROKE, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 36 36" style={style} className={className} aria-hidden="true">
    <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
      <path d="M18 6 L 18 12 M 18 24 L 18 30 M 6 18 L 12 18 M 24 18 L 30 18 M 9 9 L 13 13 M 23 23 L 27 27 M 27 9 L 23 13 M 13 23 L 9 27" />
      <circle cx="18" cy="18" r="3" fill={color} />
    </g>
  </svg>
)

export const Spiral = ({ size = 50, color = STROKE, style }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={style} aria-hidden="true">
    <path d="M25 25 C 27 23, 30 25, 28 28 C 25 32, 18 30, 18 23 C 18 13, 30 10, 36 18 C 44 28, 36 42, 22 42" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const WaveDivider = ({ fill = 'var(--color-ash-green)', flip = false, height = 60 }: { fill?: string; flip?: boolean; height?: number }) => (
  <svg className="block w-full leading-none" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height, transform: flip ? 'scaleY(-1)' : 'none' }} aria-hidden="true">
    <path d="M0 30 C 120 0, 240 60, 360 30 S 600 0, 720 30 S 960 60, 1080 30 S 1320 0, 1440 30 L 1440 60 L 0 60 Z" fill={fill} />
  </svg>
)

export const QuoteMark = ({ size = 36, color = 'var(--color-sunlit-clay)', style }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 36 36" style={style} aria-hidden="true">
    <path d="M8 22 C 6 12, 12 6, 18 6 L 18 12 C 14 12, 12 14, 12 18 L 16 18 L 16 26 L 8 26 Z M 22 22 C 20 12, 26 6, 32 6 L 32 12 C 28 12, 26 14, 26 18 L 30 18 L 30 26 L 22 26 Z" fill={color} />
  </svg>
)

export const StarBurst = ({ size = 30, color = STROKE, style }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 30 30" style={style} aria-hidden="true">
    <g stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none">
      <path d="M15 4 L 15 9 M 15 21 L 15 26 M 4 15 L 9 15 M 21 15 L 26 15 M 7 7 L 10 10 M 20 20 L 23 23 M 23 7 L 20 10 M 10 20 L 7 23" />
    </g>
  </svg>
)

export const HandUnderline = ({ width = 200, color = 'var(--color-sunlit-clay)', style }: { width?: number; color?: string; style?: CSSProperties }) => (
  <svg width={width} height="14" viewBox="0 0 200 14" style={style} aria-hidden="true" preserveAspectRatio="none">
    <path d="M3 8 C 50 4, 100 11, 150 6 S 195 9, 197 7" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)

export const CurlyArrow = ({ width = 90, height = 60, color = STROKE, style, flip = false }: { width?: number; height?: number; color?: string; style?: CSSProperties; flip?: boolean }) => (
  <svg width={width} height={height} viewBox="0 0 90 60" style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10 C 25 5, 45 15, 50 30 C 53 40, 65 45, 78 38" strokeDasharray="3 5" />
      <path d="M70 32 L 80 38 L 72 45" />
    </g>
  </svg>
)

export const CocoTree = ({ size = 40, color = STROKE, style }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={style} aria-hidden="true">
    <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 36 C 18 28, 19 20, 20 12" />
      <path d="M20 12 C 14 10, 8 8, 4 10 M 20 12 C 14 14, 8 18, 6 22 M 20 12 C 26 10, 32 8, 36 10 M 20 12 C 26 14, 32 18, 34 22 M 20 12 C 22 8, 22 4, 20 2" />
      <circle cx="18" cy="14" r="1.2" fill={color} />
      <circle cx="22" cy="14" r="1.2" fill={color} />
      <path d="M14 36 C 18 34, 22 34, 26 36" />
    </g>
  </svg>
)

export const IleCocoLogo = ({ size = 46, mono = false, style }: { size?: number; mono?: boolean; style?: CSSProperties }) => {
  const sun = mono ? 'currentColor' : '#e2b56a'
  const palm = mono ? 'currentColor' : '#3a3a3a'
  const island = mono ? 'currentColor' : '#93a48a'
  const child1 = mono ? 'currentColor' : '#e7b08a'
  const child2 = mono ? 'currentColor' : '#e2b56a'
  const child3 = mono ? 'currentColor' : '#b9c4b1'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} aria-hidden="true">
      <circle cx="32" cy="30" r="26" fill={sun} opacity={mono ? 0.15 : 1} />
      <path d="M8 44 Q 32 38, 56 44 Q 56 50, 32 50 Q 8 50, 8 44 Z" fill={island} />
      <g fill={palm}>
        <path d="M19 44 C 18 36, 19 28, 21 18" stroke={palm} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M21 18 C 14 14, 8 14, 5 17 C 9 18, 14 19, 21 18 Z" />
        <path d="M21 18 C 14 22, 9 26, 7 30 C 12 28, 17 23, 21 18 Z" />
        <path d="M21 18 C 28 14, 34 14, 36 17 C 32 18, 27 19, 21 18 Z" />
        <path d="M21 18 C 26 22, 30 25, 31 28 C 27 26, 23 22, 21 18 Z" />
        <path d="M21 18 C 21 14, 22 11, 24 9 C 23 13, 22 16, 21 18 Z" />
      </g>
      <g fill={palm}>
        <path d="M48 44 C 48 38, 47 32, 46 24" stroke={palm} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M46 24 C 41 22, 36 22, 34 24 C 38 25, 42 25, 46 24 Z" />
        <path d="M46 24 C 41 26, 38 30, 37 32 C 41 30, 44 28, 46 24 Z" />
        <path d="M46 24 C 51 22, 56 22, 58 24 C 54 25, 50 25, 46 24 Z" />
        <path d="M46 24 C 50 27, 54 30, 55 32 C 51 30, 48 27, 46 24 Z" />
      </g>
      <g>
        <circle cx="27" cy="42" r="2.2" fill={child1} />
        <rect x="25" y="44" width="4" height="5" rx="1" fill={child1} />
        <circle cx="33" cy="42" r="2.2" fill={child2} />
        <rect x="31" y="44" width="4" height="5" rx="1" fill={child2} />
        <circle cx="39" cy="42" r="2.2" fill={child3} />
        <rect x="37" y="44" width="4" height="5" rx="1" fill={child3} />
      </g>
      <g fill={palm}>
        <circle cx="17" cy="32" r="2" />
        <circle cx="16.2" cy="31.5" r="0.4" fill={mono ? sun : '#faf8f2'} />
        <circle cx="17.8" cy="31.5" r="0.4" fill={mono ? sun : '#faf8f2'} />
        <circle cx="17" cy="32.6" r="0.6" fill={mono ? sun : '#e7b08a'} />
      </g>
    </svg>
  )
}
