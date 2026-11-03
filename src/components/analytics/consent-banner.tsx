'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type ConsentChoice } from '@/lib/analytics/consent'

type Lang = 'en' | 'fr'

const COPY: Record<Lang, { title: string; body: string; privacy: string; accept: string; decline: string }> = {
  fr: {
    title: 'Témoins (cookies)',
    body: 'Avec votre accord, nous utilisons des témoins de Google pour mesurer l’efficacité de nos publicités. Rien n’est activé tant que vous n’acceptez pas, et vous pouvez changer d’avis en tout temps au bas de la page.',
    privacy: 'Politique de confidentialité',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  en: {
    title: 'Cookies',
    body: 'With your permission, we use Google cookies to measure how well our ads work. Nothing is turned on until you accept, and you can change your mind any time at the bottom of the page.',
    privacy: 'Privacy policy',
    accept: 'Accept',
    decline: 'Decline',
  },
}

// Refusing must be as easy as accepting (Law 25), so both buttons share one style.
const BUTTON_CLASS =
  'flex-1 rounded-full px-6 py-3 font-display text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-deep focus-visible:ring-offset-2 sm:flex-none bg-charcoal-deep text-porcelain hover:bg-black'

export const ConsentBanner = ({ lang }: { lang: Lang }) => {
  const [open, setOpen] = useState(false)
  const c = COPY[lang]

  useEffect(() => {
    if (readConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  const handleChoice = (choice: ConsentChoice) => {
    saveConsent(choice)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role='dialog'
      aria-live='polite'
      aria-labelledby='consent-title'
      className='fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[720px] rounded-[24px] bg-porcelain p-5 font-display text-charcoal-deep shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-charcoal-deep/10 sm:bottom-5 sm:p-6'
    >
      <h2 id='consent-title' className='text-[16px] font-bold'>
        {c.title}
      </h2>
      <p className='mt-1.5 text-[14px] leading-[1.55] text-charcoal-deep/80'>
        {c.body}{' '}
        <Link href={`/${lang}/privacy`} className='underline underline-offset-2'>
          {c.privacy}
        </Link>
      </p>
      <div className='mt-4 flex gap-3'>
        <button
          type='button'
          onClick={() => handleChoice('denied')}
          className={BUTTON_CLASS}
        >
          {c.decline}
        </button>
        <button
          type='button'
          onClick={() => handleChoice('granted')}
          className={BUTTON_CLASS}
        >
          {c.accept}
        </button>
      </div>
    </div>
  )
}

/** Footer link that reopens the banner so visitors can withdraw or give consent later. */
export const ConsentSettingsLink = ({ label, className }: { label: string; className?: string }) => (
  <button
    type='button'
    onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    className={className}
  >
    {label}
  </button>
)
