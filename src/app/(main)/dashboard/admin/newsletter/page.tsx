import { NewsletterTable } from './newsletter-table'

export default function AdminNewsletterPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Newsletter subscribers</h1>
        <p className='mt-1 text-muted-foreground'>
          Email-only signups from the homepage. Use the export button to download as CSV — paste
          into Resend / Plunk when you&rsquo;re ready to send the seasonal letter.
        </p>
      </div>
      <NewsletterTable />
    </div>
  )
}
