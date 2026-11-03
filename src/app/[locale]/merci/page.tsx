import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThankYouPage, thankYouMetadata } from '../(site)/thank-you-page'

type Props = { params: Promise<{ locale: string }> }

// French slug only; English visitors land on /en/thank-you.
export const generateStaticParams = () => [{ locale: 'fr' }]

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  return locale === 'fr' ? thankYouMetadata('fr') : {}
}

export default async function MerciPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'fr') notFound()
  return <ThankYouPage locale='fr' />
}
