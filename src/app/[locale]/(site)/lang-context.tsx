'use client'

import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Lang } from './copy'

const LOCALES: ReadonlyArray<Lang> = ['en', 'fr'] as const

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'ilecoco:lang'

const stripLocaleFromPath = (pathname: string): string => {
  const match = pathname.match(/^\/(en|fr)(\/.*)?$/)
  if (!match) return '/'
  return match[2] || '/'
}

export const LangProvider = ({
  initialLang,
  children,
}: {
  initialLang: Lang
  children: ReactNode
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const setLang = useCallback(
    (l: Lang) => {
      if (!LOCALES.includes(l)) return
      try {
        window.localStorage.setItem(STORAGE_KEY, l)
      } catch {
        // localStorage may be unavailable (private mode, SSR races) — ignore.
      }
      const restPath = stripLocaleFromPath(pathname || '/')
      const target = restPath === '/' ? `/${l}` : `/${l}${restPath}`
      router.push(target)
      router.refresh()
    },
    [router, pathname]
  )

  return (
    <LangContext.Provider value={{ lang: initialLang, setLang }}>{children}</LangContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
