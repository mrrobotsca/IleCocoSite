'use client'

import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Lang } from './copy'

const LOCALES: ReadonlyArray<Lang> = ['en', 'fr'] as const

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  /** The current page's URL in the other locale, so the switcher can be a real link. */
  pathFor: (l: Lang) => string
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

  const pathFor = useCallback(
    (l: Lang) => {
      const restPath = stripLocaleFromPath(pathname || '/')
      return restPath === '/' ? `/${l}` : `/${l}${restPath}`
    },
    [pathname]
  )

  const setLang = useCallback(
    (l: Lang) => {
      if (!LOCALES.includes(l)) return
      try {
        window.localStorage.setItem(STORAGE_KEY, l)
        // The middleware reads NEXT_LOCALE when deciding where `/` should land.
        // Without this the cookie branch never fired and returning visitors were
        // re-detected from Accept-Language on every visit.
        document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`
      } catch {
        // Storage may be unavailable (private mode, SSR races) — ignore.
      }
      router.push(pathFor(l))
      router.refresh()
    },
    [router, pathFor]
  )

  return (
    <LangContext.Provider value={{ lang: initialLang, setLang, pathFor }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
