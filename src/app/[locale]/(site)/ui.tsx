'use client'

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/css'
import { useWizard } from './wizard-context'
import { BOOKING_URL } from './links'

const PILL_BASE =
  'inline-flex items-center gap-2.5 rounded-full font-display font-semibold text-[15px] tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-deep focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain'

const VARIANTS = {
  dark: 'bg-charcoal-deep text-porcelain hover:bg-black hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  clay: 'bg-sunlit-clay text-charcoal-deep hover:bg-sunlit-clay-soft',
  ghost:
    'bg-transparent text-charcoal-deep border-[1.5px] border-charcoal-deep hover:bg-charcoal-deep hover:text-porcelain',
  ghostLight:
    'bg-transparent text-porcelain border-[1.5px] border-porcelain/30 hover:bg-porcelain hover:text-charcoal-deep',
} as const

type Variant = keyof typeof VARIANTS

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
}

const SIZES = {
  sm: 'px-[18px] py-2.5 text-[13px]',
  md: 'px-7 py-4 text-[15px]',
  lg: 'px-7 py-4 text-[15px]',
}

export const PillButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'dark', size = 'md', withArrow = false, className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(PILL_BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowChip variant={variant} />}
    </button>
  )
)
PillButton.displayName = 'PillButton'

type LinkPillProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
}

export const PillLink = forwardRef<HTMLAnchorElement, LinkPillProps>(
  ({ variant = 'dark', size = 'md', withArrow = false, className, children, ...rest }, ref) => (
    <a ref={ref} className={cn(PILL_BASE, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
      {withArrow && <ArrowChip variant={variant} />}
    </a>
  )
)
PillLink.displayName = 'PillLink'

const ArrowChip = ({ variant }: { variant: Variant }) => (
  <span
    aria-hidden
    className={cn(
      'inline-flex h-7 w-7 items-center justify-center rounded-full text-[13px]',
      variant === 'clay' ? 'bg-charcoal-deep text-porcelain' : 'bg-porcelain text-charcoal-deep'
    )}
  >
    →
  </span>
)

export const Eyebrow = ({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode
  className?: string
  light?: boolean
}) => (
  <span
    className={cn(
      'inline-block rounded-full border-[1.5px] px-4 py-1.5 font-display text-[12px] font-semibold tracking-[0.04em]',
      light ? 'border-porcelain text-porcelain' : 'border-charcoal-deep text-charcoal-deep',
      className
    )}
  >
    {children}
  </span>
)

/**
 * Button that opens the waitlist wizard. Use this for any "Join waitlist" CTA so we never
 * have to remember the wiring twice.
 */
/**
 * Anchor pill that opens Calendly in a new tab. Use for any "Book a visit / tour" CTA.
 */
export const BookButton = forwardRef<
  HTMLAnchorElement,
  Omit<LinkPillProps, 'href' | 'target' | 'rel'>
>(({ variant = 'dark', size = 'md', withArrow = false, className, children, ...rest }, ref) => (
  <a
    ref={ref}
    href={BOOKING_URL}
    target='_blank'
    rel='noopener noreferrer'
    className={cn(PILL_BASE, VARIANTS[variant], SIZES[size], className)}
    {...rest}
  >
    {children}
    {withArrow && <ArrowChip variant={variant} />}
  </a>
))
BookButton.displayName = 'BookButton'

export const WaitlistButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'onClick'> & { onClick?: () => void }
>(
  (
    { variant = 'dark', size = 'md', withArrow = false, className, children, onClick, ...rest },
    ref
  ) => {
    const { openWaitlist } = useWizard()
    return (
      <button
        ref={ref}
        onClick={() => {
          openWaitlist()
          onClick?.()
        }}
        className={cn(PILL_BASE, VARIANTS[variant], SIZES[size], className)}
        {...rest}
      >
        {children}
        {withArrow && <ArrowChip variant={variant} />}
      </button>
    )
  }
)
WaitlistButton.displayName = 'WaitlistButton'

export const SectionTitle = ({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode
  className?: string
  light?: boolean
}) => (
  <h2
    className={cn(
      'font-display text-[clamp(34px,4.4vw,58px)] font-medium leading-[1.05] tracking-[-0.01em]',
      light ? 'text-porcelain' : 'text-charcoal-deep',
      className
    )}
  >
    {children}
  </h2>
)
