import { getBaseUrl } from '@/lib/utils'
import { getBrandConfig, type DaycareLocation } from '@/config/branding'
import { siteConfig, getLocaleHref, type Locale } from '@/lib/seo'

const abs = (path: string): string => {
  if (/^https?:\/\//i.test(path) || path.startsWith('//')) return path
  const baseUrl = getBaseUrl().replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

const dayMap: Record<string, string> = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
  Sunday: 'Su',
}

const formatOpeningHours = (hours: DaycareLocation['openingHours']) =>
  hours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.days.map((d) => `https://schema.org/${d}`),
    opens: slot.opens,
    closes: slot.closes,
  }))

// Compact textual form, useful when search engines look for `openingHours` strings.
export const formatOpeningHoursText = (hours: DaycareLocation['openingHours']) =>
  hours.map(
    (slot) => `${slot.days.map((d) => dayMap[d]).join(',')} ${slot.opens}-${slot.closes}`
  )

/**
 * LocalBusiness + ChildCare schema for one daycare location.
 * Drop into the per-location landing page so Google can match the URL to a
 * Google Business Profile and render the local 3-pack snippet.
 */
export const getDaycareLocationSchema = (location: DaycareLocation, locale: Locale) => {
  const pageUrl = abs(getLocaleHref(locale, `/locations/${location.slug}`))
  const sameAs = [location.googleMapsUrl]
  const brand = getBrandConfig()
  if (brand.social?.facebook) sameAs.push(brand.social.facebook)
  if (brand.social?.instagram) sameAs.push(brand.social.instagram)

  return {
    '@context': 'https://schema.org',
    '@type': ['ChildCare', 'LocalBusiness'],
    '@id': `${pageUrl}#business`,
    name: location.name,
    legalName: location.legalName,
    image: abs(location.photo),
    logo: abs('/image.png'),
    url: pageUrl,
    telephone: location.phone,
    email: location.email,
    priceRange: '$$',
    description:
      locale === 'fr'
        ? `Garderie bilingue à ${location.neighbourhood}, Montréal. Petits groupes, repas maison, sans écrans. Pour enfants de 18 mois à 5 ans.`
        : `Bilingual daycare in ${location.neighbourhood}, Montréal. Small groups, house-made meals, screen-free. For children 18 months to 5 years.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.addressLine,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    hasMap: location.googleMapsUrl,
    openingHoursSpecification: formatOpeningHours(location.openingHours),
    openingHours: formatOpeningHoursText(location.openingHours),
    foundingDate: `${location.yearOpened}-01-01`,
    areaServed: location.areaServed.map((a) => ({
      '@type': 'AdministrativeArea',
      name: a,
    })),
    availableLanguage: ['en', 'fr'],
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 1.5,
      suggestedMaxAge: 5,
    },
    knowsLanguage: ['en', 'fr'],
    sameAs,
    ...(location.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: location.rating.value,
        reviewCount: location.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }
}

/**
 * EducationalOrganization schema for the brand as a whole.
 * Drop into the locale layout so every page carries it sitewide.
 */
export const getOrganizationSchema = (locale: Locale) => {
  const brand = getBrandConfig()
  const sameAs: string[] = []
  if (brand.social?.facebook) sameAs.push(brand.social.facebook)
  if (brand.social?.instagram) sameAs.push(brand.social.instagram)
  brand.locations.forEach((l) => sameAs.push(l.googleMapsUrl))

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${abs('/')}#organization`,
    name: brand.name,
    legalName: brand.legalName,
    url: abs(getLocaleHref(locale, '/')),
    logo: abs('/image.png'),
    image: abs('/opengraph-image.png'),
    description: siteConfig.description[locale],
    telephone: brand.phone,
    email: brand.supportEmail,
    sameAs,
    location: brand.locations.map((l) => ({
      '@type': 'Place',
      name: l.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.addressLine,
        addressLocality: l.locality,
        addressRegion: l.region,
        postalCode: l.postalCode,
        addressCountry: l.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: l.geo.latitude,
        longitude: l.geo.longitude,
      },
    })),
    areaServed: Array.from(new Set(brand.locations.flatMap((l) => l.areaServed))).map((a) => ({
      '@type': 'AdministrativeArea',
      name: a,
    })),
  }
}

/**
 * WebSite schema — sitewide, attached to the locale layout.
 */
export const getWebsiteSchema = (locale: Locale) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${abs('/')}#website`,
    name: siteConfig.name,
    description: siteConfig.description[locale],
    url: abs(getLocaleHref(locale, '/')),
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    publisher: {
      '@id': `${abs('/')}#organization`,
    },
  }
}

/**
 * FAQPage schema — drop into the homepage where the FAQ section is rendered.
 * Unlocks the FAQ rich-result snippet on Google.
 */
export const getFaqSchema = (items: ReadonlyArray<{ q: string; a: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/**
 * Service schema — represents each program (toddler, preschool, etc.) tied to
 * the daycare provider. Drop on location pages to enrich the LocalBusiness
 * entity with a structured offering list.
 */
export const getServiceSchema = (options: {
  locale: Locale
  location: DaycareLocation
  name: string
  description: string
  ageMin: number
  ageMax: number
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'ChildCare',
    name: options.name,
    description: options.description,
    provider: {
      '@type': 'ChildCare',
      name: options.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: options.location.addressLine,
        addressLocality: options.location.locality,
        addressRegion: options.location.region,
        postalCode: options.location.postalCode,
        addressCountry: options.location.country,
      },
    },
    areaServed: options.location.areaServed.map((a) => ({
      '@type': 'AdministrativeArea',
      name: a,
    })),
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: options.ageMin,
      suggestedMaxAge: options.ageMax,
    },
    availableLanguage: ['en', 'fr'],
  }
}
