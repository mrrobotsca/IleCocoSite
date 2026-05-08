'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY } from './copy'
import { Sparkle, Spiral } from './doodles'
import { Eyebrow, SectionTitle } from './ui'
import { useSubmitNewsletter } from '@/lib/waitlist/hooks'

export const Newsletter = () => {
  const { lang } = useLang()
  const c = COPY.newsletter[lang]
  const [email, setEmail] = useState('')
  const subscribe = useSubmitNewsletter()
  const submitted = subscribe.isSuccess

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return
    subscribe.mutate({ email: value, lang, source: 'newsletter-band' })
  }

  return (
    <section className="relative overflow-hidden bg-charcoal-deep py-28 text-porcelain">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--color-sunlit-clay) 0%, transparent 70%)', opacity: 0.35 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] -left-[15%] h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--color-ash-green) 0%, transparent 70%)', opacity: 0.18 }}
      />

      <svg
        width="60"
        height="44"
        viewBox="0 0 60 44"
        className="animate-float-slow"
        style={{ position: 'absolute', top: 70, left: '12%', opacity: 0.85 }}
        aria-hidden
      >
        <rect x="2" y="4" width="56" height="36" rx="3" fill="var(--color-porcelain)" stroke="var(--color-sunlit-clay)" strokeWidth="2" />
        <path d="M2 6 L30 24 L58 6" stroke="var(--color-charcoal-deep)" strokeWidth="2" fill="none" />
        <circle cx="50" cy="6" r="5" fill="var(--color-sunlit-clay)" />
      </svg>
      <Sparkle size={22} color="var(--color-sunlit-clay)" style={{ position: 'absolute', top: 100, right: '18%' }} />
      <Spiral size={36} color="var(--color-ash-green)" style={{ position: 'absolute', bottom: 80, left: '20%', opacity: 0.6 }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-[720px] text-center"
        >
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <SectionTitle light className="mt-6 mb-4">
            {c.title1}
            <br />
            <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
          </SectionTitle>
          <p className="mx-auto mb-10 max-w-[520px] text-[17px] leading-[1.6] text-porcelain/80">{c.sub}</p>

          {!submitted ? (
            <>
              <form
                onSubmit={onSubmit}
                className="mx-auto flex max-w-[520px] gap-2 rounded-full border border-porcelain/20 bg-porcelain/10 p-1.5 backdrop-blur-md"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.placeholder}
                  aria-label={c.eyebrow}
                  disabled={subscribe.isPending}
                  className="flex-1 bg-transparent px-4 py-2.5 font-display text-[15px] text-porcelain outline-none placeholder:text-porcelain/55 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-sunlit-clay px-5 py-3 font-display text-[14px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:bg-sunlit-clay-soft disabled:opacity-70"
                >
                  {subscribe.isPending ? '…' : c.cta}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-deep text-[13px] text-porcelain">→</span>
                </button>
              </form>
              {subscribe.isError && (
                <p className="mt-3 text-[13px] text-sunlit-clay-soft">{subscribe.error?.message}</p>
              )}
            </>
          ) : (
            <div className="inline-flex items-center gap-2.5 rounded-full bg-ash-green px-7 py-4 font-display font-semibold text-charcoal-deep">
              <span className="text-[18px]" aria-hidden>
                ✓
              </span>
              {c.success}
            </div>
          )}

          <p className="mt-7 font-hand text-[22px] text-sunlit-clay-soft" style={{ transform: 'rotate(-1deg)' }}>
            {c.promise}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
