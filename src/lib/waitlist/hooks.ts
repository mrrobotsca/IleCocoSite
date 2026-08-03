'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { NewsletterSubmission, WaitlistStatus, WaitlistSubmission } from './schemas'

type ApiOk<T> = { success: true; data?: T; meta?: unknown }
type ApiErr = { success: false; error: string; issues?: unknown }
type ApiResponse<T> = ApiOk<T> | ApiErr

const postJson = async <T>(url: string, body: unknown): Promise<T> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = (await res.json().catch(() => ({}))) as ApiResponse<T>
  if (!res.ok || !('success' in json) || !json.success) {
    throw new Error(('error' in json && json.error) || `Request failed (${res.status})`)
  }
  return (json.data as T) ?? (undefined as T)
}

const patchJson = async <T>(url: string, body: unknown): Promise<T> => {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = (await res.json().catch(() => ({}))) as ApiResponse<T>
  if (!res.ok || !('success' in json) || !json.success) {
    throw new Error(('error' in json && json.error) || `Request failed (${res.status})`)
  }
  return (json.data as T) ?? (undefined as T)
}

const getJson = async <T>(url: string): Promise<{ data: T; meta?: unknown }> => {
  const res = await fetch(url, { credentials: 'include' })
  const json = (await res.json().catch(() => ({}))) as ApiResponse<T>
  if (!res.ok || !('success' in json) || !json.success) {
    throw new Error(('error' in json && json.error) || `Request failed (${res.status})`)
  }
  return { data: json.data as T, meta: json.meta }
}

// =============================================================================
// Public mutations (used by the homepage)
// =============================================================================

export const useSubmitWaitlist = () =>
  useMutation({
    mutationKey: ['waitlist', 'submit'],
    mutationFn: (input: WaitlistSubmission) => postJson<{ id: string }>('/api/waitlist', input),
  })

export const useSubmitNewsletter = () =>
  useMutation({
    mutationKey: ['newsletter', 'submit'],
    mutationFn: (input: NewsletterSubmission) => postJson<void>('/api/newsletter', input),
  })

// =============================================================================
// Admin queries + mutations
// =============================================================================

export type WaitlistApplicantRow = {
  id: string
  createdAt: string
  updatedAt: string
  childFirstName: string
  childDob: string
  preferredLocation: 'somerled' | 'lachine' | 'either'
  desiredStartDate: string
  careType: 'full-time' | 'part-time'
  parentName: string
  parentEmail: string
  parentPhone: string
  heardFrom: string | null
  notes: string | null
  status: WaitlistStatus
  notifiedAt: string | null
  lang: 'en' | 'fr'
}

export type NewsletterSubscriberRow = {
  id: string
  createdAt: string
  email: string
  lang: 'en' | 'fr'
  source: 'newsletter-band' | 'cta-band'
  unsubscribedAt: string | null
}

export const useAdminWaitlist = (status?: WaitlistStatus) =>
  useQuery({
    queryKey: ['admin', 'waitlist', status ?? 'all'],
    queryFn: async () => {
      const qs = status ? `?status=${encodeURIComponent(status)}` : ''
      return getJson<WaitlistApplicantRow[]>(`/api/admin/waitlist${qs}`)
    },
    staleTime: 10 * 1000,
  })

export const useAdminNewsletter = () =>
  useQuery({
    queryKey: ['admin', 'newsletter'],
    queryFn: () => getJson<NewsletterSubscriberRow[]>('/api/admin/newsletter'),
    staleTime: 10 * 1000,
  })

export const useUpdateWaitlistStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['admin', 'waitlist', 'update'],
    mutationFn: ({ id, status }: { id: string; status: WaitlistStatus }) =>
      patchJson<WaitlistApplicantRow>(`/api/admin/waitlist/${id}`, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'waitlist'] })
    },
  })
}

export const useNotifyWaitlistApplicant = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['admin', 'waitlist', 'notify'],
    mutationFn: ({ id, branch }: { id: string; branch: 'somerled' | 'lachine' }) =>
      postJson<WaitlistApplicantRow>(`/api/admin/waitlist/${id}/notify`, { branch }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'waitlist'] })
    },
  })
}

export const useDeleteWaitlistApplicant = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['admin', 'waitlist', 'delete'],
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/waitlist/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Delete failed (${res.status})`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'waitlist'] })
    },
  })
}
