'use client'

import { useMemo, useState, type MouseEvent } from 'react'
import {
  BellRing,
  ChevronDown,
  ChevronRight,
  Loader2,
  Mail,
  MailCheck,
  Phone,
  Send,
  Trash2,
} from 'lucide-react'
import {
  useAdminWaitlist,
  useDeleteWaitlistApplicant,
  useNotifyWaitlistApplicant,
  useRemindBatch,
  useRemindWaitlistApplicant,
  useUpdateWaitlistStatus,
  type WaitlistApplicantRow,
} from '@/lib/waitlist/hooks'
import type { WaitlistStatus } from '@/lib/waitlist/schemas'
import { computeAge } from '@/lib/waitlist/schemas'
import { cn } from '@/lib/utils/css'

const STATUSES: WaitlistStatus[] = [
  'new',
  'contacted',
  'tour-booked',
  'offered',
  'placed',
  'closed',
]

const STATUS_STYLES: Record<WaitlistStatus, string> = {
  new: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  contacted: 'bg-blue-100 text-blue-800 ring-blue-200',
  'tour-booked': 'bg-purple-100 text-purple-800 ring-purple-200',
  offered: 'bg-amber-100 text-amber-800 ring-amber-200',
  placed: 'bg-zinc-200 text-zinc-700 ring-zinc-300',
  closed: 'bg-zinc-100 text-zinc-500 ring-zinc-200',
}

const LOCATION_LABELS: Record<WaitlistApplicantRow['preferredLocation'], string> = {
  somerled: 'Somerled',
  lachine: 'Lachine',
  either: 'Either',
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })

export const WaitlistTable = () => {
  const [filter, setFilter] = useState<WaitlistStatus | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const query = useAdminWaitlist(filter === 'all' ? undefined : filter)
  const remindBatch = useRemindBatch()

  const rows = query.data?.data ?? []

  const toggleRow = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const allVisibleSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const toggleAll = () =>
    setSelected(allVisibleSelected ? new Set() : new Set(rows.map((r) => r.id)))

  const handleBatchRemind = () => {
    const ids = selected.size > 0 ? [...selected] : undefined
    const count = ids ? ids.length : rows.length
    const message = ids
      ? `Send the follow-up reminder email to the ${count} selected applicant${count === 1 ? '' : 's'}?\n\n` +
        'Only applicants with status "offered" will receive it — anyone else in the selection is skipped automatically.'
      : `Send the follow-up reminder email to all ${count} applicants marked "offered"?\n\n` +
        'Families already placed or closed will NOT receive it. Applicants who already ' +
        'registered are told in the email to simply ignore it.'
    if (confirm(message)) {
      remindBatch.mutate({ ids }, { onSuccess: () => setSelected(new Set()) })
    }
  }
  const counts = useMemo(() => {
    const map: Partial<Record<WaitlistStatus | 'all', number>> = { all: 0 }
    for (const r of rows) {
      map.all = (map.all ?? 0) + 1
      map[r.status] = (map[r.status] ?? 0) + 1
    }
    return map
  }, [rows])

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-2'>
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type='button'
            onClick={() => {
              setFilter(s)
              setSelected(new Set())
            }}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              filter === s
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
            )}
          >
            {s === 'all' ? 'All' : s.replace('-', ' ')}{' '}
            <span className={filter === s ? 'opacity-70' : 'text-zinc-400'}>
              · {counts[s] ?? 0}
            </span>
          </button>
        ))}
        {(selected.size > 0 || (filter === 'offered' && rows.length > 0)) && (
          <button
            type='button'
            onClick={handleBatchRemind}
            disabled={remindBatch.isPending}
            className='ml-auto flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-50'
          >
            {remindBatch.isPending ? (
              <Loader2 className='h-3.5 w-3.5 animate-spin' />
            ) : (
              <BellRing size={13} />
            )}
            {selected.size > 0
              ? `Send reminder · ${selected.size} selected`
              : `Send reminder to all offered · ${rows.length}`}
          </button>
        )}
      </div>

      {remindBatch.isSuccess && (
        <div className='rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800'>
          Reminder sent to {remindBatch.data.sent} of {remindBatch.data.total} applicant
          {remindBatch.data.total === 1 ? '' : 's'}.
          {remindBatch.data.skipped.length > 0 && (
            <span className='ml-1'>
              Skipped {remindBatch.data.skipped.length} not in “offered” status.
            </span>
          )}
          {remindBatch.data.failed.length > 0 && (
            <span className='ml-1 text-red-700'>
              Failed for: {remindBatch.data.failed.map((f) => f.parentEmail).join(', ')}
            </span>
          )}
        </div>
      )}
      {remindBatch.isError && (
        <div className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800'>
          Failed to send reminders: {remindBatch.error.message}
        </div>
      )}

      {query.isLoading && (
        <div className='flex items-center gap-2 rounded-2xl border bg-white px-6 py-12 text-sm text-muted-foreground'>
          <Loader2 className='h-4 w-4 animate-spin' /> Loading applicants…
        </div>
      )}
      {query.isError && (
        <div className='rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-800'>
          Failed to load applicants: {query.error.message}
        </div>
      )}
      {!query.isLoading && !query.isError && rows.length === 0 && (
        <div className='rounded-2xl border bg-white px-6 py-12 text-center text-sm text-muted-foreground'>
          No applicants {filter !== 'all' && `with status "${filter}"`} yet.
        </div>
      )}

      {rows.length > 0 && (
        <div className='overflow-hidden rounded-2xl border bg-white'>
          <table className='w-full text-sm'>
            <thead className='bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500'>
              <tr>
                <th className='w-10 px-3 py-3'>
                  <input
                    type='checkbox'
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    aria-label='Select all visible applicants'
                    className='h-4 w-4 cursor-pointer accent-zinc-900'
                  />
                </th>
                <th className='w-8 px-3 py-3' />
                <th className='px-3 py-3'>Received</th>
                <th className='px-3 py-3'>Child</th>
                <th className='px-3 py-3'>Location</th>
                <th className='px-3 py-3'>Start</th>
                <th className='px-3 py-3'>Parent</th>
                <th className='px-3 py-3'>Status</th>
                <th className='px-3 py-3' />
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-100'>
              {rows.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  expanded={expanded === row.id}
                  onToggle={() => setExpanded((cur) => (cur === row.id ? null : row.id))}
                  selected={selected.has(row.id)}
                  onSelect={() => toggleRow(row.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const Row = ({
  row,
  expanded,
  onToggle,
  selected,
  onSelect,
}: {
  row: WaitlistApplicantRow
  expanded: boolean
  onToggle: () => void
  selected: boolean
  onSelect: () => void
}) => {
  const update = useUpdateWaitlistStatus()
  const del = useDeleteWaitlistApplicant()
  const notify = useNotifyWaitlistApplicant()
  const remind = useRemindWaitlistApplicant()
  // Anchor the branch menu with fixed coords so it escapes the table's `overflow-hidden`
  // (an absolute dropdown gets clipped for the bottom rows).
  const [menu, setMenu] = useState<{ top: number; right: number } | null>(null)
  const age = computeAge(row.childDob)

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    if (menu) {
      setMenu(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setMenu({ top: rect.bottom + 4, right: Math.max(8, window.innerWidth - rect.right) })
  }

  const handleNotify = (branch: 'somerled' | 'lachine') => {
    setMenu(null)
    const label = branch === 'lachine' ? 'Lachine' : 'Somerled'
    const message = row.notifiedAt
      ? `${row.parentName} was already emailed on ${formatDate(row.notifiedAt)}. Send the "spot is open" email again for ${label}?`
      : `Send the "spot is open" email to ${row.parentName} for ${label}?`
    if (confirm(message)) {
      notify.mutate({ id: row.id, branch })
    }
  }

  const handleRemind = () => {
    setMenu(null)
    const message = row.remindedAt
      ? `${row.parentName} already got a reminder on ${formatDate(row.remindedAt)}. Send another one?`
      : `Send the follow-up reminder to ${row.parentName}? If they already registered, the email tells them to simply ignore it.`
    if (confirm(message)) {
      remind.mutate({ id: row.id })
    }
  }

  const ageText =
    age.years === 0
      ? `${age.months} mo`
      : age.years === 1
        ? `1 yr ${age.months}m`
        : `${age.years} yrs`

  return (
    <>
      <tr
        className={cn('cursor-pointer hover:bg-zinc-50', selected && 'bg-amber-50/40')}
        onClick={onToggle}
      >
        <td className='px-3 py-3' onClick={(e) => e.stopPropagation()}>
          <input
            type='checkbox'
            checked={selected}
            onChange={onSelect}
            aria-label={`Select ${row.parentName}`}
            className='h-4 w-4 cursor-pointer accent-zinc-900'
          />
        </td>
        <td className='px-3 py-3 text-zinc-400'>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </td>
        <td className='whitespace-nowrap px-3 py-3 text-zinc-600'>{formatDate(row.createdAt)}</td>
        <td className='px-3 py-3'>
          <div className='font-medium text-zinc-900'>{row.childFirstName}</div>
          <div className='text-xs text-zinc-500'>
            {ageText} · DOB {row.childDob}
          </div>
        </td>
        <td className='px-3 py-3 text-zinc-700'>
          {LOCATION_LABELS[row.preferredLocation]}
          <div className='text-xs text-zinc-500'>{row.careType}</div>
        </td>
        <td className='whitespace-nowrap px-3 py-3 text-zinc-700'>{row.desiredStartDate}</td>
        <td className='px-3 py-3'>
          <div className='font-medium text-zinc-900'>{row.parentName}</div>
          <div className='text-xs text-zinc-500'>{row.parentEmail}</div>
        </td>
        <td className='px-3 py-3' onClick={(e) => e.stopPropagation()}>
          <select
            value={row.status}
            onChange={(e) =>
              update.mutate({ id: row.id, status: e.target.value as WaitlistStatus })
            }
            disabled={update.isPending}
            className={cn(
              'cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-1',
              STATUS_STYLES[row.status]
            )}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace('-', ' ')}
              </option>
            ))}
          </select>
          {row.notifiedAt && (
            <div
              className='mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-600'
              title={`Spot-open email sent ${formatDate(row.notifiedAt)}`}
            >
              <MailCheck size={11} /> Emailed {formatDate(row.notifiedAt)}
            </div>
          )}
          {row.remindedAt && (
            <div
              className='mt-0.5 flex items-center gap-1 text-[10px] font-medium text-amber-600'
              title={`Follow-up reminder sent ${formatDate(row.remindedAt)}`}
            >
              <BellRing size={11} /> Reminded {formatDate(row.remindedAt)}
            </div>
          )}
        </td>
        <td className='px-3 py-3 text-right' onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center justify-end gap-1'>
            <button
              type='button'
              onClick={toggleMenu}
              disabled={notify.isPending || remind.isPending}
              className='rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50'
              aria-label='Send spot-open email'
              title={
                row.notifiedAt
                  ? `Emailed ${formatDate(row.notifiedAt)} — click to resend`
                  : 'Send spot-open email'
              }
            >
              {notify.isPending || remind.isPending ? (
                <Loader2 className='h-3.5 w-3.5 animate-spin' />
              ) : (
                <Send size={14} />
              )}
            </button>
            {menu && (
              <>
                <div className='fixed inset-0 z-40' onClick={() => setMenu(null)} />
                <div
                  className='fixed z-50 w-44 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 text-left shadow-lg'
                  style={{ top: menu.top, right: menu.right }}
                >
                  <div className='px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400'>
                    Spot open at
                  </div>
                  {(['lachine', 'somerled'] as const).map((b) => (
                    <button
                      key={b}
                      type='button'
                      onClick={() => handleNotify(b)}
                      className='flex w-full items-center justify-between px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50'
                    >
                      {LOCATION_LABELS[b]}
                      {row.preferredLocation === b && (
                        <span className='text-[10px] font-medium text-emerald-600'>preferred</span>
                      )}
                    </button>
                  ))}
                  {row.status === 'offered' && (
                    <>
                      <div className='my-1 border-t border-zinc-100' />
                      <button
                        type='button'
                        onClick={handleRemind}
                        className='flex w-full items-center gap-2 px-3 py-1.5 text-sm text-amber-700 hover:bg-amber-50'
                      >
                        <BellRing size={13} />
                        Send follow-up reminder
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            <button
              type='button'
              onClick={() => {
                if (confirm(`Delete application from ${row.parentName}? This cannot be undone.`)) {
                  del.mutate(row.id)
                }
              }}
              disabled={del.isPending}
              className='rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600'
              aria-label='Delete'
            >
              <Trash2 size={14} />
            </button>
          </div>
          {notify.isError && (
            <div className='mt-1 text-[10px] text-red-600' title={notify.error.message}>
              Send failed
            </div>
          )}
          {remind.isError && (
            <div className='mt-1 text-[10px] text-red-600' title={remind.error.message}>
              Reminder failed
            </div>
          )}
        </td>
      </tr>
      {expanded && (
        <tr className='bg-zinc-50/50'>
          <td colSpan={2} />
          <td colSpan={7} className='px-3 py-5'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-4 text-sm md:grid-cols-2'>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                  Contact
                </h4>
                <div className='mt-2 space-y-1'>
                  <a
                    className='flex items-center gap-2 text-zinc-700 hover:text-zinc-900'
                    href={`mailto:${row.parentEmail}`}
                  >
                    <Mail size={14} /> {row.parentEmail}
                  </a>
                  <a
                    className='flex items-center gap-2 text-zinc-700 hover:text-zinc-900'
                    href={`tel:${row.parentPhone.replace(/[^+\d]/g, '')}`}
                  >
                    <Phone size={14} /> {row.parentPhone}
                  </a>
                  <p className='text-xs text-zinc-500'>Submitted in {row.lang.toUpperCase()}</p>
                  {row.notifiedAt && (
                    <p className='flex items-center gap-1 text-xs text-emerald-600'>
                      <MailCheck size={12} /> Spot-open email sent {formatDate(row.notifiedAt)}
                    </p>
                  )}
                  {row.remindedAt && (
                    <p className='flex items-center gap-1 text-xs text-amber-600'>
                      <BellRing size={12} /> Follow-up reminder sent {formatDate(row.remindedAt)}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                  Heard from
                </h4>
                <p className='mt-2 whitespace-pre-wrap text-zinc-700'>{row.heardFrom || '—'}</p>
              </div>
              <div className='md:col-span-2'>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                  Notes
                </h4>
                <p className='mt-2 whitespace-pre-wrap text-zinc-700'>{row.notes || '—'}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
