import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl().replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
          '/privacy',
          '/terms',
          '/licenses',
          '/en/privacy',
          '/en/terms',
          '/en/licenses',
          '/fr/privacy',
          '/fr/terms',
          '/fr/licenses',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
