import type { MetadataRoute } from 'next'
import { getBrandConfig } from '@/config/branding'

export default function manifest(): MetadataRoute.Manifest {
  const brand = getBrandConfig()

  return {
    name: `${brand.name} — Bilingual daycare in NDG & Lachine`,
    short_name: brand.name,
    description:
      'Ile Coco is a small, bilingual daycare with two homes in Montréal — NDG (Somerled) and Lachine — for children 18 months to 5 years.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: brand.theme?.backgroundColor ?? '#faf8f2',
    theme_color: brand.theme?.primaryColor ?? '#2a2a2a',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'kids', 'lifestyle'],
    lang: 'en-CA',
    dir: 'ltr',
  }
}
