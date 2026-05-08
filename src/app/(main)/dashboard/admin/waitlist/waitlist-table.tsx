'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Loader2, Mail, Phone, Trash2 } from 'lucide-react'
import {
  useAdminWaitlist,
  useDeleteWaitlistApplicant,
  useUpdateWaitlistStatus,
  type WaitlistApplicantRow,
} from '@/lib/waitlist/hooks'
import type { WaitlistStatus } from '@/lib/waitlist/schemas'
import { computeAge } from '@/lib/waitlist/schemas'
import { cn } from '@/lib/utils/css'

const STATUSES: WaitlistStatus[] = ['new', 'contacted', 'tour-booked', 'offered', 'placed', 'closed']

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
  'cote-des-neiges': 'Côte-des-Neiges',
  either: 'Either',
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })

export const WaitlistTable = () => {
  const [filter, setFilter] = useState<WaitlistStatus | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const query = useAdminWaitlist(filter === 'all' ? undefined : filter)

  const rows = query.data?.data ?? []
  const counts = useMemo(() => {
    const map: Partial<Record<WaitlistStatus | 'all', number>> = { all: 0 }
    for (const r of rows) {
      map.all = (map.all ?? 0) + 1
      map[r.status] = (map[r.status] ?? 0) + 1
    }
    return map
  }, [rows])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              filter === s
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
            )}
          >
            {s === 'all' ? 'All' : s.replace('-', ' ')}{' '}
            <span className={filter === s ? 'opacity-70' : 'text-zinc-400'}>· {counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      {query.isLoading && (
        <div className="flex items-center gap-2 rounded-2xl border bg-white px-6 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading applicants…
        </div>
      )}
      {query.isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-800">
          Failed to load applicants: {query.error.message}
        </div>
      )}
      {!query.isLoading && !query.isError && rows.length === 0 && (
        <div className="rounded-2xl border bg-white px-6 py-12 text-center text-sm text-muted-foreground">
          No applicants {filter !== 'all' && `with status "${filter}"`} yet.
        </div>
      )}

      {rows.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="w-8 px-3 py-3"></th>
                <th className="px-3 py-3">Received</th>
                <th className="px-3 py-3">Child</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Start</th>
                <th className="px-3 py-3">Parent</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  expanded={expanded === row.id}
                  onToggle={() => setExpanded((cur) => (cur === row.id ? null : row.id))}
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
}: {
  row: WaitlistApplicantRow
  expanded: boolean
  onToggle: () => void
}) => {
  const update = useUpdateWaitlistStatus()
  const del = useDeleteWaitlistApplicant()
  const age = computeAge(row.childDob)
  const ageText =
    age.years === 0 ? `${age.months} mo` : age.years === 1 ? `1 yr ${age.months}m` : `${age.years} yrs`

  return (
    <>
      <tr className="cursor-pointer hover:bg-zinc-50" onClick={onToggle}>
        <td className="px-3 py-3 text-zinc-400">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-zinc-600">{formatDate(row.createdAt)}</td>
        <td className="px-3 py-3">
          <div className="font-medium text-zinc-900">{row.childFirstName}</div>
          <div className="text-xs text-zinc-500">
            {ageText} · DOB {row.childDob}
          </div>
        </td>
        <td className="px-3 py-3 text-zinc-700">
          {LOCATION_LABELS[row.preferredLocation]}
          <div className="text-xs text-zinc-500">{row.careType}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-zinc-700">{row.desiredStartDate}</td>
        <td className="px-3 py-3">
          <div className="font-medium text-zinc-900">{row.parentName}</div>
          <div className="text-xs text-zinc-500">{row.parentEmail}</div>
        </td>
        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
          <select
            value={row.status}
            onChange={(e) => update.mutate({ id: row.id, status: e.target.value as WaitlistStatus })}
            disabled={update.isPending}
            className={cn(
              'cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-1',
              STATUS_STYLES[row.status],
            )}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace('-', ' ')}
              </option>
            ))}
          </select>
        </td>
        <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete application from ${row.parentName}? This cannot be undone.`)) {
                del.mutate(row.id)
              }
            }}
            disabled={del.isPending}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-zinc-50/50">
          <td></td>
          <td colSpan={7} className="px-3 py-5">
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm md:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Contact</h4>
                <div className="mt-2 space-y-1">
                  <a className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900" href={`mailto:${row.parentEmail}`}>
                    <Mail size={14} /> {row.parentEmail}
                  </a>
                  <a className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900" href={`tel:${row.parentPhone.replace(/[^+\d]/g, '')}`}>
                    <Phone size={14} /> {row.parentPhone}
                  </a>
                  <p className="text-xs text-zinc-500">Submitted in {row.lang.toUpperCase()}</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Heard from</h4>
                <p className="mt-2 whitespace-pre-wrap text-zinc-700">{row.heardFrom || '—'}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Notes</h4>
                <p className="mt-2 whitespace-pre-wrap text-zinc-700">{row.notes || '—'}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
