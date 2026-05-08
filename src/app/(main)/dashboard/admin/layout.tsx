import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { auth } from '@/lib/auth/auth'
import { isAdminEmail } from '@/lib/auth/admin'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || !isAdminEmail(session.user?.email)) notFound()

  return (
    <div className='min-h-screen bg-zinc-50'>
      <header className='border-b bg-white'>
        <div className='mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4'>
          <div>
            <Link href='/dashboard/admin' className='text-lg font-bold tracking-tight'>
              Ile CoCo · Admin
            </Link>
            <p className='text-xs text-muted-foreground'>Signed in as {session.user.email}</p>
          </div>
          <nav className='flex items-center gap-1 text-sm'>
            <AdminNavLink href='/dashboard/admin'>Overview</AdminNavLink>
            <AdminNavLink href='/dashboard/admin/waitlist'>Waitlist</AdminNavLink>
            <AdminNavLink href='/dashboard/admin/newsletter'>Newsletter</AdminNavLink>
            <Link
              href='/'
              className='ml-3 rounded-md border px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100'
            >
              View site
            </Link>
          </nav>
        </div>
      </header>
      <main className='mx-auto max-w-6xl px-6 py-8'>{children}</main>
    </div>
  )
}

const AdminNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className='rounded-md px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900'
  >
    {children}
  </Link>
)
