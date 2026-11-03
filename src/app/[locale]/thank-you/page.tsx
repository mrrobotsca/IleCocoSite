import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThankYouPage, thankYouMetadata } from '../(site)/thank-you-page'

type Props = { params: Promise<{ locale: string }> }

// English slug only; French visitors land on /fr/merci.
export const generateStaticParams = () => [{ locale: 'en' }]

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  return locale === 'en' ? thankYouMetadata('en') : {}
}

export default async function ThankYouRoute({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') notFound()
  return <ThankYouPage locale='en' />
}
