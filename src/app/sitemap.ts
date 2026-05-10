import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'
import { LOCALES, getLocaleHref, type Locale } from '@/lib/seo'

type Route = {
  path: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const ROUTES: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/locations/somerled', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/locations/lachine', changeFrequency: 'weekly', priority: 0.9 },
]

const abs = (path: string) => `${getBaseUrl().replace(/\/$/, '')}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const url = abs(getLocaleHref(locale, route.path))
      const alternates: Record<string, string> = {}
      for (const alt of LOCALES) {
        alternates[alt === 'en' ? 'en-CA' : 'fr-CA'] = abs(getLocaleHref(alt, route.path))
      }
      alternates['x-default'] = abs(getLocaleHref('en' as Locale, route.path))

      entries.push({
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
