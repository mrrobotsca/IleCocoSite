'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackLeadEvent, trackPageView } from '@/lib/analytics/google-ads'

/**
 * Site-wide tracking that doesn't belong to any one component:
 *  - phone_click / email_click for every tel: and mailto: link, wherever it is
 *    rendered (delegated, so links added later are covered automatically);
 *  - page_view on client-side navigations, which gtag can't see on its own.
 */
export const AnalyticsListeners = () => {
  const pathname = usePathname()
  const lastPathname = useRef(pathname)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('tel:')) trackLeadEvent('phone_click')
      else if (href.startsWith('mailto:')) trackLeadEvent('email_click')
    }
    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  useEffect(() => {
    // The initial page_view comes from gtag('config') in <head>.
    if (lastPathname.current === pathname) return
    lastPathname.current = pathname
    trackPageView()
  }, [pathname])

  return null
}
