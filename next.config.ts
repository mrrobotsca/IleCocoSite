import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

import { LEGACY_REDIRECTS } from './src/config/legacy-urls'

/** The one hostname this site is canonical on. Everything else 301s here. */
const CANONICAL_HOST = 'www.ilecoco.com'
const APEX_HOST = 'ilecoco.com'

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  // This reduces the Docker image size by including only necessary files
  // output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async headers() {
    return [
      {
        // Every marketing page is server-rendered per request, because the root
        // layout calls `headers()` to read `x-pathname` for <html lang>. That taints
        // the whole tree as dynamic, so Next sends `no-store` and Vercel never
        // caches the HTML — every Googlebot fetch is a cold origin render.
        //
        // Fixing the root cause means restructuring to multiple root layouts, which
        // is disproportionate here. Caching the response at the edge gets the same
        // practical result for crawlers. Safe because these pages contain nothing
        // user-specific: the waitlist form and locale switch are client-side, and
        // the locale redirect happens in middleware, ahead of the cache.
        source: '/:locale(en|fr)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:locale(en|fr)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // The apex served a 200 on every page alongside www, because the locale
      // redirect in middleware emits a *relative* Location header and so preserves
      // whichever host was requested. Every page existed on two hostnames with only
      // a canonical tag — a hint, not a directive — separating them.
      //
      // Declared here rather than in middleware so it resolves at the edge, before
      // any locale handling runs. Dev and preview hosts don't match, so they're
      // unaffected.
      // `statusCode: 301` rather than `permanent: true`, which emits 308. Both are
      // permanent and Google treats them the same, but 301 is what every crawler,
      // log analyser, and SEO tool expects for a moved page.
      {
        source: '/:path*',
        has: [{ type: 'host', value: APEX_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        statusCode: 301,
      },
      // Old Webflow URLs with a real equivalent. These run before middleware, so
      // they win over its catch-all locale prefix (which used to turn every one of
      // them into a 308 into a 404).
      ...LEGACY_REDIRECTS.map((entry) => ({ ...entry, statusCode: 301 })),
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "ilecoco",

  project: "ilecoco",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
