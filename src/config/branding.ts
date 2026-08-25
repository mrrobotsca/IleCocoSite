export interface ThemeColors {
  primaryColor?: string
  primaryHoverColor?: string
  accentColor?: string
  accentHoverColor?: string
  backgroundColor?: string
}

export interface DaycareLocation {
  slug: 'somerled' | 'lachine'
  name: string
  neighbourhood: string
  legalName: string
  addressLine: string
  locality: string
  region: 'QC'
  postalCode: string
  country: 'CA'
  phone: string
  email: string
  geo: { latitude: number; longitude: number }
  openingHours: Array<{ days: string[]; opens: string; closes: string }>
  googleMapsUrl: string
  photo: string
  yearOpened: number
  rating?: { value: number; count: number }
  areaServed: string[]
}

export interface BrandConfig {
  name: string
  legalName: string
  logoUrl?: string
  faviconUrl?: string
  customCssUrl?: string
  supportEmail?: string
  documentationUrl?: string
  termsUrl?: string
  privacyUrl?: string
  /** Calendly link parents use to book a visit + registration */
  bookingUrl?: string
  domain: string
  phone: string
  social?: {
    facebook?: string
    instagram?: string
  }
  theme?: ThemeColors
  locations: DaycareLocation[]
}

const SHARED_HOURS: DaycareLocation['openingHours'] = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
]

// Approximate coordinates from postal-code centroids — operator should refine
// these with the exact pin from each Google Business Profile so the schema
// matches the GBP listings.
const SOMERLED_GEO = { latitude: 45.4691, longitude: -73.6402 }
const LACHINE_GEO = { latitude: 45.4391, longitude: -73.6747 }

const defaultConfig: BrandConfig = {
  name: 'Ile CoCo',
  legalName: 'Garderie Ile CoCo',
  logoUrl: undefined,
  faviconUrl: '/favicon/favicon.ico',
  customCssUrl: undefined,
  supportEmail: 'info@ilecoco.com',
  documentationUrl: undefined,
  termsUrl: undefined,
  privacyUrl: undefined,
  bookingUrl: 'https://calendly.com/ilecocodaycare',
  domain: 'ilecoco.com',
  phone: '+1-514-574-4695',
  social: {
    facebook: undefined,
    // Feeds `sameAs` on the Organization and LocalBusiness schemas, which is how
    // Google ties the site to the social profile as one entity. The account has
    // existed all along (linked in the footer) — it just never reached the schema.
    instagram: 'https://www.instagram.com/ilecocodaycare/',
  },
  theme: {
    primaryColor: '#2a2a2a',
    primaryHoverColor: '#1a1a1a',
    accentColor: '#e2b56a',
    accentHoverColor: '#ecc787',
    backgroundColor: '#faf8f2',
  },
  locations: [
    {
      slug: 'somerled',
      name: 'Ile CoCo — Somerled (NDG)',
      neighbourhood: 'Notre-Dame-de-Grâce',
      legalName: 'Garderie Ile CoCo',
      addressLine: '6624 av. Somerled, Suite 201',
      locality: 'Montréal',
      region: 'QC',
      postalCode: 'H4V 1T2',
      country: 'CA',
      phone: '+1-514-574-4695',
      email: 'info@ilecoco.com',
      geo: SOMERLED_GEO,
      openingHours: SHARED_HOURS,
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Garderie+ile+CoCo+6624+Somerled+Montreal+QC',
      photo: '/images/ile-coco/locations/somerled.jpg',
      yearOpened: 2018,
      rating: { value: 4.8, count: 74 },
      areaServed: [
        'Notre-Dame-de-Grâce',
        'NDG',
        'Côte-des-Neiges',
        'Westmount',
        'Hampstead',
        'Montréal-Ouest',
      ],
    },
    {
      slug: 'lachine',
      name: 'Ile CoCo — Lachine',
      neighbourhood: 'Lachine',
      legalName: 'Garderie Ile CoCo',
      addressLine: '400 rue Victoria',
      locality: 'Lachine',
      region: 'QC',
      postalCode: 'H8S 1Y5',
      country: 'CA',
      phone: '+1-514-574-4695',
      email: 'info@ilecoco.com',
      geo: LACHINE_GEO,
      openingHours: SHARED_HOURS,
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Garderie+ile+Coco+2+400+rue+Victoria+Lachine+QC',
      photo: '/images/ile-coco/locations/lachine.jpg',
      yearOpened: 2022,
      rating: { value: 4.6, count: 21 },
      areaServed: ['Lachine', 'LaSalle', 'Dorval', 'Saint-Pierre', 'Pointe-Claire'],
    },
  ],
}

const getThemeColors = (): ThemeColors => {
  return {
    primaryColor: defaultConfig.theme?.primaryColor,
    primaryHoverColor: defaultConfig.theme?.primaryHoverColor,
    accentColor: defaultConfig.theme?.accentColor,
    accentHoverColor: defaultConfig.theme?.accentHoverColor,
    backgroundColor: defaultConfig.theme?.backgroundColor,
  }
}

export const getBrandConfig = (): BrandConfig => {
  return {
    name: defaultConfig.name,
    legalName: defaultConfig.legalName,
    logoUrl: defaultConfig.logoUrl,
    faviconUrl: defaultConfig.faviconUrl,
    customCssUrl: defaultConfig.customCssUrl,
    supportEmail: defaultConfig.supportEmail,
    documentationUrl: defaultConfig.documentationUrl,
    termsUrl: defaultConfig.termsUrl,
    privacyUrl: defaultConfig.privacyUrl,
    bookingUrl: defaultConfig.bookingUrl,
    domain: defaultConfig.domain,
    phone: defaultConfig.phone,
    social: defaultConfig.social,
    theme: getThemeColors(),
    locations: defaultConfig.locations,
  }
}

export const getLocation = (slug: DaycareLocation['slug']): DaycareLocation => {
  const location = defaultConfig.locations.find((l) => l.slug === slug)
  if (!location) throw new Error(`Unknown location slug: ${slug}`)
  return location
}

export const useBrandConfig = () => {
  return getBrandConfig()
}
