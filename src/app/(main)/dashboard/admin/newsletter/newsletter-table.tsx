'use client'

import { Download, Loader2 } from 'lucide-react'
import { useAdminNewsletter, type NewsletterSubscriberRow } from '@/lib/waitlist/hooks'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' })

const escapeCsv = (v: string) => {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return `"${v.replace(/"/g, '""')}"`
  }
  return v
}

const rowsToCsv = (rows: NewsletterSubscriberRow[]) => {
  const header = 'email,lang,source,subscribed_at,unsubscribed_at\n'
  const body = rows
    .map((r) =>
      [r.email, r.lang, r.source, r.createdAt, r.unsubscribedAt ?? ''].map(escapeCsv).join(',')
    )
    .join('\n')
  return `${header + body}\n`
}

const downloadCsv = (rows: NewsletterSubscriberRow[]) => {
  const blob = new Blob([rowsToCsv(rows)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ile-coco-newsletter-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export const NewsletterTable = () => {
  const query = useAdminNewsletter()
  const rows = query.data?.data ?? []
  const active = rows.filter((r) => !r.unsubscribedAt)

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {active.length} active · {rows.length - active.length} unsubscribed
        </p>
        <button
          type='button'
          onClick={() => downloadCsv(active)}
          disabled={active.length === 0}
          className='inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40'
        >
          <Download size={14} /> Export active as CSV
        </button>
      </div>

      {query.isLoading && (
        <div className='flex items-center gap-2 rounded-2xl border bg-white px-6 py-12 text-sm text-muted-foreground'>
          <Loader2 className='h-4 w-4 animate-spin' /> Loading subscribers…
        </div>
      )}
      {query.isError && (
        <div className='rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-800'>
          Failed to load: {query.error.message}
        </div>
      )}
      {!query.isLoading && !query.isError && rows.length === 0 && (
        <div className='rounded-2xl border bg-white px-6 py-12 text-center text-sm text-muted-foreground'>
          No subscribers yet.
        </div>
      )}

      {rows.length > 0 && (
        <div className='overflow-hidden rounded-2xl border bg-white'>
          <table className='w-full text-sm'>
            <thead className='bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500'>
              <tr>
                <th className='px-3 py-3'>Subscribed</th>
                <th className='px-3 py-3'>Email</th>
                <th className='px-3 py-3'>Lang</th>
                <th className='px-3 py-3'>Source</th>
                <th className='px-3 py-3'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-100'>
              {rows.map((r) => (
                <tr key={r.id} className={r.unsubscribedAt ? 'opacity-50' : ''}>
                  <td className='whitespace-nowrap px-3 py-2.5 text-zinc-600'>
                    {formatDate(r.createdAt)}
                  </td>
                  <td className='px-3 py-2.5'>
                    <a href={`mailto:${r.email}`} className='text-zinc-900 hover:underline'>
                      {r.email}
                    </a>
                  </td>
                  <td className='px-3 py-2.5 uppercase text-zinc-500'>{r.lang}</td>
                  <td className='px-3 py-2.5 text-zinc-600'>{r.source.replace('-', ' ')}</td>
                  <td className='px-3 py-2.5'>
                    {r.unsubscribedAt ? (
                      <span className='rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600'>
                        unsubscribed
                      </span>
                    ) : (
                      <span className='rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800'>
                        active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
