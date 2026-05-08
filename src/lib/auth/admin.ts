import { headers } from 'next/headers'
import { auth } from './auth'
import { env } from '@/config/env'

export const getAdminEmails = (): string[] =>
  (env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false
  const allow = getAdminEmails()
  if (allow.length === 0) return false
  return allow.includes(email.toLowerCase())
}

export const requireAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return { ok: false as const, status: 401 as const, session: null }
  if (!isAdminEmail(session.user?.email)) {
    return { ok: false as const, status: 403 as const, session }
  }
  return { ok: true as const, session }
}
