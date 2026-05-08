import Link from 'next/link'
import { sql } from 'drizzle-orm'
import { ArrowRight, Mail, ListChecks } from 'lucide-react'
import { db } from '@/database'
import { waitlistApplicant, newsletterSubscriber } from '@/database/schema'

export const dynamic = 'force-dynamic'

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  'tour-booked': 'Tour booked',
  offered: 'Offered',
  placed: 'Placed',
  closed: 'Closed',
}

export default async function AdminOverviewPage() {
  const [waitCounts, [{ subTotal }]] = await Promise.all([
    db
      .select({ status: waitlistApplicant.status, count: sql<number>`count(*)::int` })
      .from(waitlistApplicant)
      .groupBy(waitlistApplicant.status),
    db.select({ subTotal: sql<number>`count(*)::int` }).from(newsletterSubscriber),
  ])

  const totalWaitlist = waitCounts.reduce((sum, r) => sum + r.count, 0)
  const newWait = waitCounts.find((r) => r.status === 'new')?.count ?? 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Two inboxes — waitlist applicants (full family info) and newsletter subscribers (just an email).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/admin/waitlist"
          className="group rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Waitlist applicants</h2>
                <p className="text-xs text-muted-foreground">Wizard submissions</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight">{totalWaitlist}</span>
            <span className="text-sm text-muted-foreground">total</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {waitCounts.length === 0 ? (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-muted-foreground">
                No applicants yet
              </span>
            ) : (
              waitCounts.map((r) => (
                <span
                  key={r.status}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.status === 'new' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-700'
                  }`}
                >
                  {STATUS_LABELS[r.status] ?? r.status} · {r.count}
                </span>
              ))
            )}
          </div>
          {newWait > 0 && (
            <p className="mt-4 text-sm font-medium text-emerald-700">
              {newWait} new {newWait === 1 ? 'applicant' : 'applicants'} waiting for a reply
            </p>
          )}
        </Link>

        <Link
          href="/dashboard/admin/newsletter"
          className="group rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Newsletter subscribers</h2>
                <p className="text-xs text-muted-foreground">Seasonal letter list</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight">{subTotal}</span>
            <span className="text-sm text-muted-foreground">total</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
