# Ile Coco — SEO Action Checklist

Everything below is **off-site work** that has to happen outside the codebase. The on-site foundation (locale routing, structured data, per-location landing pages, sitemap, hreflang) is already shipped — but local search rankings are won and lost on the items in this list.

> **Order matters.** Do steps 1–4 first. They are the highest-leverage items by an order of magnitude.

---

## 1. Set the production domain (5 minutes — required before launch)

The site reads `NEXT_PUBLIC_APP_URL` for canonical URLs, sitemap, hreflang, and structured data. Without this set in production, every URL will use `http://localhost:3000`.

In Vercel (or wherever the site is hosted), set the environment variable:

```
NEXT_PUBLIC_APP_URL=https://ilecoco.com
```

Then re-deploy. Verify with:

```
curl -s https://ilecoco.com/sitemap.xml | head
curl -s https://ilecoco.com/robots.txt
```

Both should reference `https://ilecoco.com`.

---

## 2. Google Business Profile — one listing per location (the single biggest local-SEO lever)

Two **separate** Google Business Profile listings — one for Somerled, one for Lachine. Verify each by postcard.

- **Somerled (NDG)**
  - Name: `Garderie Ile Coco — Somerled (NDG)`
  - Address: `6624 av. Somerled, Suite 201, Montréal, QC H4V 1T2`
  - Phone: `(514) 574-4695`
  - Hours: Mon–Fri 7:00–18:00
  - Primary category: `Day care center`
  - Secondary categories: `Preschool`, `Child care agency`
  - Website link: `https://ilecoco.com/en/locations/somerled` (use the English URL; Google can find the French alternate via hreflang)
  - Service area: NDG, Notre-Dame-de-Grâce, Côte-des-Neiges, Westmount, Hampstead, Montréal-Ouest
  - Description: pull from the homepage description — "Small, bilingual daycare in NDG (Somerled), Montréal. House-made meals, screen-free, ages 18 months to 5 years. 4.8★ on Google."
  - Photos: at minimum exterior, lobby, three classrooms, a meal, an outdoor moment. Aim for 20+ within the first month.
  - Attributes: tick "Identifies as women-owned" (if applicable), "Wheelchair accessible entrance" (if applicable), "Bilingual staff: English, French".

- **Lachine**
  - Name: `Garderie Ile Coco — Lachine`
  - Address: `400 rue Victoria, Lachine, QC H8S 1Y5`
  - Phone: `(514) 574-4695`
  - Hours: Mon–Fri 7:00–18:00
  - Same categories
  - Website link: `https://ilecoco.com/en/locations/lachine`
  - Service area: Lachine, LaSalle, Dorval, Saint-Pierre, Pointe-Claire
  - Description and photos as above, with Lachine-specific imagery.

**Critical**: the address, phone, and business name on the GBP listing **must match exactly** what's in `src/config/branding.ts`. Any inconsistency hurts ranking. The schema on the per-location pages mirrors GBP — keep both in sync.

After verification, post weekly:
- "We have spots opening in [month]"
- A photo from the day
- Holiday closure notices

---

## 3. Refine the GeoCoordinates in `src/config/branding.ts`

The `geo.latitude` / `geo.longitude` for both locations are **postal-code-centroid approximations**. Open Google Maps, find the exact pin for each location, right-click → copy coordinates, and replace:

- `SOMERLED_GEO` in `src/config/branding.ts` (currently `45.4691, -73.6402`)
- `LACHINE_GEO` (currently `45.4391, -73.6747`)

Even being 100m off is fine, but matching the GBP pin exactly is better.

---

## 4. Search Console + Bing Webmaster Tools

After production deployment:

1. **Google Search Console** — `search.google.com/search-console`
   - Add `https://ilecoco.com` as a property (use the **Domain** option, not URL prefix — it covers en/fr/www in one go).
   - Verify via DNS TXT record (preferred) or HTML file.
   - Submit sitemap: `https://ilecoco.com/sitemap.xml`
   - Use **URL Inspection** on `/en` and `/fr` — request indexing for each.
   - Use **URL Inspection** on `/en/locations/somerled`, `/fr/locations/somerled`, `/en/locations/lachine`, `/fr/locations/lachine` — request indexing.
   - In **Settings → Crawl stats**, watch for crawl errors weekly for the first month.

2. **Bing Webmaster Tools** — `bing.com/webmasters`
   - Same drill: verify domain, submit sitemap. Bing's Quebec audience is small but free.

---

## 5. Validate structured data (do this after deploy)

For each of these URLs, paste the rendered HTML into `https://search.google.com/test/rich-results`:

- `https://ilecoco.com/en` — must show **Organization**, **WebSite**, **FAQPage**
- `https://ilecoco.com/fr` — same
- `https://ilecoco.com/en/locations/somerled` — must show **LocalBusiness/ChildCare**, **BreadcrumbList**, **FAQPage**, multiple **Service** entries
- `https://ilecoco.com/en/locations/lachine` — same
- `https://ilecoco.com/fr/locations/somerled` and `/fr/locations/lachine` — same

Zero errors and zero warnings. Fix anything Google flags before submitting to GSC.

---

## 6. Local citations (NAP consistency on third-party sites)

Build mentions of `Ile Coco / Garderie Ile Coco` with the **exact same** address and phone. Each consistent citation is a small ranking signal; many small signals compound.

Required:
- Yellow Pages CA — `pj.ca` and `yellowpages.ca`
- 411.ca
- Apple Maps Connect — `mapsconnect.apple.com`
- Yelp — separate listing per location
- Facebook — Page with location info, then check-in enabled

Quebec-specific:
- `enfance-famille-jeunesse.gouv.qc.ca` directory if eligible
- `garderie.qc.ca` / `mamanpourlavie.com` directory listings
- Local NDG / Lachine community Facebook groups (organic mentions, not spam)

**Trick**: keep a spreadsheet of every citation you build. When you change the phone or address later, update every entry — inconsistent NAP across the web is the #1 reason daycares lose local rankings.

---

## 7. Reviews — your aggregateRating schema mirrors GBP

The schema markup on each location page declares the current rating (4.8★ / 74 reviews for Somerled, 4.6★ / 21 reviews for Lachine). Google cross-checks this against the GBP listing.

- Update `rating.value` and `rating.count` in `src/config/branding.ts` whenever those numbers change on GBP.
- Actively ask current Somerled families to also leave a Google review for the Lachine location and vice versa (they often share parents).
- Reply to every review — Google rewards responsiveness.

---

## 8. Backlinks — local authority

Daycare ranking is heavily influenced by **local relevance signals**. Mentions from neighborhood-level sites are gold:

- NDG community blogs, Lachine community blogs (offer a "behind the scenes" piece)
- Local pediatricians, CLSCs, family doctors — ask if they keep a referral list and whether you can be on it (these often have web presence)
- Montreal mom blogs (`mtlfamilyfun.com`, `mtl4kids.com`, etc.)
- Sponsor a local park-cleanup or community event — mentions on local news sites count
- Get listed in the official Quebec daycare registry if your CPE/garderie status qualifies

Avoid: paid link schemes, generic "list of daycares" sites in other regions, anything that smells like a link farm. Google explicitly penalizes these.

---

## 9. Analytics — measure what's working

Install GA4 (Google Analytics 4) so you can track which URLs drive waitlist sign-ups:

1. Create a GA4 property at `analytics.google.com`.
2. Add the measurement ID as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env`.
3. Wire it into the root layout (a small `<Script>` tag is enough — ask your dev to wire `next/third-parties` if you want the Vercel-recommended setup).
4. Set up two key events:
   - `waitlist_submit` — fires when the waitlist form succeeds
   - `tour_book_click` — fires when someone clicks the "Book a tour" button
5. In GA4, mark both as **conversions**. After two weeks, you'll know which page (homepage, Somerled, Lachine) and which language (en, fr) is converting best.

---

## 10. Once you have a Facebook / Instagram presence

When the social profiles exist, fill these in:

- `src/config/branding.ts` → `social.facebook` and `social.instagram` (URLs, not handles).
- After deploy, the Organization and LocalBusiness schemas will pick them up automatically and feed Google a richer entity profile.

---

## What's already done in code (no action needed)

- ✅ Replaced ShipFree boilerplate in metadata everywhere
- ✅ `/en` and `/fr` URL prefixes with full hreflang (`en-CA`, `fr-CA`, `x-default`)
- ✅ Middleware redirects `/` to the user's preferred locale (default French for Quebec)
- ✅ Per-locale, per-page `<title>`, `<meta description>`, OG, Twitter cards
- ✅ JSON-LD structured data: Organization, WebSite, LocalBusiness/ChildCare (×2), BreadcrumbList, FAQPage, Service
- ✅ Dynamic `sitemap.xml` with hreflang alternates per route
- ✅ `robots.txt` with proper allow/disallow
- ✅ PWA manifest with Ile Coco brand info
- ✅ Dedicated landing pages: `/en/locations/somerled`, `/en/locations/lachine`, `/fr/locations/somerled`, `/fr/locations/lachine`
- ✅ Keyword-rich alt text on hero/mission/why/locations imagery
- ✅ Internal links from homepage location cards to dedicated pages with descriptive anchor text
- ✅ Font display strategy (`swap`) and Geist Mono dropped
- ✅ Privacy / terms / licenses pages set to `noindex` (their bodies still contain ShipFree boilerplate text — rewrite those when you have time, then flip `noindex: false`)

---

## Reasonable timeline

- **Week 1**: deploy with `NEXT_PUBLIC_APP_URL` set, verify GBP for both locations (postcard takes 5–14 days), submit sitemap to GSC.
- **Week 2–3**: refine GeoCoordinates, add 20+ photos to each GBP, post weekly updates.
- **Week 4–8**: build local citations (target 10–15), start asking for reviews, install analytics.
- **Month 2–3**: rankings start to move. The local 3-pack typically responds within 6–10 weeks of a clean LocalBusiness schema + verified GBP + consistent citations.
