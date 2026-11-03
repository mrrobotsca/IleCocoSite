'use client'

import { useEffect, useState } from 'react'
import { LazyIframe } from '@/components/ui/lazy-iframe'
import { trackLeadEvent } from '@/lib/analytics/google-ads'

const CALENDLY_ORIGIN = 'https://calendly.com'

type CalendlyMessage = { event?: string }

/**
 * Inline Calendly scheduler. Calendly only posts `calendly.*` events to the
 * parent page when the embed URL carries `embed_domain` and `embed_type`, so the
 * URL is built here rather than linking out — that is what lets a booked tour
 * count as a `book_tour` conversion.
 */
export const CalendlyEmbed = ({ url, title }: { url: string; title: string }) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const embedUrl = new URL(url)
    embedUrl.searchParams.set('embed_domain', window.location.host)
    embedUrl.searchParams.set('embed_type', 'Inline')
    setSrc(embedUrl.toString())

    const handleMessage = (e: MessageEvent<CalendlyMessage>) => {
      if (e.origin !== CALENDLY_ORIGIN) return
      if (e.data?.event === 'calendly.event_scheduled') trackLeadEvent('book_tour')
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [url])

  if (!src) return <div className='h-[1000px] rounded-[24px] bg-charcoal-deep/[0.04] md:h-[720px]' />

  return (
    <LazyIframe
      src={src}
      title={title}
      className='h-[1000px] overflow-hidden rounded-[24px] bg-white md:h-[720px]'
    />
  )
}
