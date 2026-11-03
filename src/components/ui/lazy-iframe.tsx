'use client'

import { useEffect, useRef, useState, type IframeHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/css'

type LazyIframeProps = Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'src'> & {
  src: string
  title: string
}

/**
 * Iframe that only starts loading when it is about to scroll into view.
 *
 * Native `loading="lazy"` isn't enough for Google Maps or Calendly: Chrome starts
 * lazy iframes more than a screen away, so on mobile they still compete with the
 * page's own CSS, fonts and images during the first load.
 */
export const LazyIframe = ({ src, title, className, ...rest }: LazyIframeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('bg-charcoal-deep/[0.04]', className)}>
      {visible && <iframe src={src} title={title} className='h-full w-full border-0' {...rest} />}
    </div>
  )
}
