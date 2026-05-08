import { WaitlistTable } from './waitlist-table'

export default function AdminWaitlistPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Waitlist applicants</h1>
        <p className='mt-1 text-muted-foreground'>
          Sorted newest first. Click a row to expand the parent message; change the status from the
          dropdown.
        </p>
      </div>
      <WaitlistTable />
    </div>
  )
}
