import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl().replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The legal pages are deliberately absent: they carry `noindex` in their
        // own metadata, and blocking them here would stop Google from ever
        // crawling the page to read that directive — leaving them eligible to be
        // indexed from external links instead.
        disallow: [
          '/api/',
          '/dashboard',
          '/dashboard/',
          '/login',
          '/register',
          '/reset-password',
          '/verify',
          '/sentry-example-page',
          '/premium-purchase/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
