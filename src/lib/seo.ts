import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/utils'
import { getBrandConfig } from '@/config/branding'

export type Locale = 'en' | 'fr'
export const LOCALES: ReadonlyArray<Locale> = ['en', 'fr'] as const
export const DEFAULT_LOCALE: Locale = 'en'

const brandConfig = getBrandConfig()

export const siteConfig = {
  name: brandConfig.name,
  legalName: brandConfig.legalName,
  description: {
    en: 'Ile Coco is a small, bilingual daycare with two homes in Montréal — NDG (Somerled) and Lachine — for children 18 months to 5 years. House-made meals, small groups, no screens, French + English.',
    fr: 'Ile Coco est une petite garderie bilingue avec deux foyers à Montréal — NDG (Somerled) et Lachine — pour les enfants de 18 mois à 5 ans. Repas maison, petits groupes, sans écrans, en français et en anglais.',
  },
  url: getBaseUrl(),
  twitterHandle: undefined as string | undefined,
  creator: brandConfig.legalName,
  keywords: {
    en: [
      'daycare NDG',
      'daycare Notre-Dame-de-Grâce',
      'daycare Somerled',
      'daycare Lachine',
      'bilingual daycare Montreal',
      'French immersion daycare NDG',
      'toddler daycare NDG',
      'preschool Lachine',
      'private daycare Montreal',
      'garderie NDG',
      'garderie Lachine',
      'Ile Coco',
    ],
    fr: [
      'garderie NDG',
      'garderie Notre-Dame-de-Grâce',
      'garderie Somerled',
      'garderie Lachine',
      'garderie bilingue Montréal',
      'garderie privée NDG',
      'garderie 18 mois Lachine',
      'prématernelle Lachine',
      'garderie Côte-des-Neiges',
      'daycare NDG',
      'daycare Lachine',
      'Ile Coco',
    ],
  },
} as const

export type SEOOptions = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
  isRootLayout?: boolean
  allowCanonicalQuery?: boolean
  locale?: Locale
  /**
   * Path (without locale prefix) — when provided alongside `locale`, used to
   * compute the canonical URL and the en/fr alternates for hreflang.
   * Example: `/locations/somerled`
   */
  path?: string
}

const getAbsoluteUrl = (path: string): string => {
  const trimmed = path.trim()
  const isAbsolute = /^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')
  if (isAbsolute) return trimmed

  const baseUrl = getBaseUrl().replace(/\/$/, '')
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${baseUrl}${cleanPath}`
}

export const getLocaleHref = (locale: Locale, path = '/'): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  // Locale-only homepage: /en, /fr (not /en/)
  if (cleanPath === '/') return `/${locale}`
  return `/${locale}${cleanPath}`
}

const normalizeCanonicalPath = (canonicalPath?: string, allowQuery?: boolean) => {
  if (!canonicalPath) return canonicalPath
  const [withoutHash] = canonicalPath.split('#')
  if (allowQuery) return withoutHash
  const [withoutQuery] = withoutHash.split('?')
  return withoutQuery
}

const ogLocale: Record<Locale, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
}

const getOpenGraph = (options: SEOOptions, canonicalUrl: string) => {
  const imageUrl = options.image || '/opengraph-image.png'
  const description = options.description || siteConfig.description[options.locale || DEFAULT_LOCALE]

  return {
    type: options.type || 'website',
    url: canonicalUrl,
    title: options.title || siteConfig.name,
    description,
    siteName: siteConfig.name,
    locale: ogLocale[options.locale || DEFAULT_LOCALE],
    alternateLocale: LOCALES.filter((l) => l !== (options.locale || DEFAULT_LOCALE)).map(
      (l) => ogLocale[l]
    ),
    images: [
      {
        url: imageUrl,
        ...(options.imageAlt && { alt: options.imageAlt }),
      },
    ],
    ...(options.publishedTime && { publishedTime: options.publishedTime }),
    ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    ...(options.authors && { authors: options.authors }),
  }
}

const getTwitterCard = (options: SEOOptions) => {
  const imageUrl = options.image || '/twitter-image.png'
  const description = options.description || siteConfig.description[options.locale || DEFAULT_LOCALE]

  return {
    card: 'summary_large_image' as const,
    title: options.title || siteConfig.name,
    description,
    ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    images: [imageUrl],
  }
}

export const generateMetadata = (options: SEOOptions = {}): Metadata => {
  const locale = options.locale ?? DEFAULT_LOCALE
  const description = options.description || siteConfig.description[locale]
  const keywords = options.keywords || siteConfig.keywords[locale]

  // Compute canonical URL — prefer (locale + path), then explicit canonical, then site root.
  const normalizedCanonicalPath = normalizeCanonicalPath(
    options.canonical,
    options.allowCanonicalQuery
  )
  let canonicalUrl: string
  if (options.path !== undefined) {
    canonicalUrl = getAbsoluteUrl(getLocaleHref(locale, options.path))
  } else if (normalizedCanonicalPath) {
    canonicalUrl = getAbsoluteUrl(normalizedCanonicalPath)
  } else {
    canonicalUrl = siteConfig.url
  }

  // hreflang alternates — only emit when we know the path
  const languages: Record<string, string> | undefined =
    options.path !== undefined
      ? {
          'en-CA': getAbsoluteUrl(getLocaleHref('en', options.path)),
          'fr-CA': getAbsoluteUrl(getLocaleHref('fr', options.path)),
          'x-default': getAbsoluteUrl(getLocaleHref(DEFAULT_LOCALE, options.path)),
        }
      : undefined

  const titleMetadata = options.isRootLayout
    ? {
        absolute: options.title || siteConfig.name,
        template: `%s · ${siteConfig.name}`,
      }
    : options.title || siteConfig.name

  return {
    title: titleMetadata,
    description,
    keywords: keywords.join(', '),
    authors: options.authors
      ? options.authors.map((author) => ({ name: author }))
      : [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      ...(languages && { languages }),
    },
    openGraph: getOpenGraph(options, canonicalUrl),
    twitter: getTwitterCard(options),
    robots: {
      index: !options.noindex,
      follow: !options.nofollow,
      googleBot: {
        index: !options.noindex,
        follow: !options.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  }
}

export { getAbsoluteUrl }
