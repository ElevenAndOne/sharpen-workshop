# SHARPEN 2027 — landing page

Landing page for **SHARPEN 2027**, Chef Deb Coaching's 11th annual two-day strategic-planning workshop for food, beverage and hospitality business owners (Jan. 28–29, 2027, Fort Worth, TX). Built by 11&1 for ShuBu Creative.

Content source of truth: the client's live page at <https://chefdeb.com/sharpen-2027/>. Design decisions are recorded in [DESIGN.md](DESIGN.md); product facts in [PRODUCT.md](PRODUCT.md).

## Stack

- **Astro 7** (static output) with **React 19** islands for the interactive pieces
- **Tailwind v4** with a custom, desktop-first breakpoint system: `desktop` (base) → `tablet:` ≤1279 → `landscape:` ≤1023 → `portrait:` ≤767
- **Mulish** self-hosted via `@fontsource-variable/mulish`
- Images optimised at build through `astro:assets` (AVIF/WebP, responsive `srcset`)

## Run it

```sh
npm install
npx astro dev --background   # http://localhost:4321 (honours $PORT)
npx astro dev stop
npm run build                # -> dist/
npm run preview
```

## How the page is put together

```
src/
  data/          all copy, pricing, agenda, FAQ, hotels — the only place content lives
  layouts/       Layout.astro: head, fonts, event JSON-LD, direction contract, reveal script
  components/
    layout/      Section (position:relative holder, tone, rhythm) + Container (max-width, gutters)
    ui/          Button, Badge, ImageFrame, SectionHeading, Logo, SocialIcon…
    sections/    one file per section, top to bottom of the page
    islands/     React: SiteNav (drawer), TicketBox, Countdown, PriceTag, AgendaTabs, FaqAccordion, VideoEmbed
  styles/        global.css — tokens, breakpoints, motion utilities
  assets/images/ brand photography (harvested from chefdeb.com)
```

Every section is `<Section><Container>…</Container></Section>`. Anything decorative or full-bleed (a photograph, a scrim) sits **between** the two.

### Things that change on their own
- **Early Bird → Regular.** `TicketBox` collapses to the Regular card after Nov. 30, 2026, and every CTA price (`PriceTag`) flips from $395 to $495 — no rebuild needed.
- **Countdown** switches from the Early Bird deadline to the registration close (Jan. 6, 2027).

### Things waiting on the client
- 2026 room photography (the hero uses a 2024 SHARPEN photo carrying a photographer credit — confirm rights)
- **DNS.** `sharpen.chefdeb.com` still does not resolve — Cloudflare, which is authoritative for `chefdeb.com`, returns NXDOMAIN for the name, so no record exists in the zone yet. Re-checked 11 Sept 2026. Note this is unrelated to checkout: the GHL funnel domain `c.chefdeb.com` is already live, so the checkout needs no new record.
- **The GHL checkout page.** Products exist; the page that sells them does not. See [docs/ghl-checkout.md](docs/ghl-checkout.md).
- **What happens to `chefdeb.com/sharpen-2027/`.** That WordPress page is live and carries the same content. Once this build is published, two URLs will compete for the same searches. Whoever owns the decision needs to pick one: either retire the WordPress page and 301 it here, or leave it as the primary and have this page canonicalise to it. Until that is settled this page self-canonicalises, which is the right default for the page that is going live but is not a substitute for the decision.

## SEO and share metadata

`src/layouts/Layout.astro` holds the head: title and description (kept to ~60 and ~155 characters so neither is truncated in results), the full Open Graph and Twitter set, and one JSON-LD `@graph` linking Organization → WebSite → WebPage → BusinessEvent → FAQPage by `@id`. The FAQ nodes are generated from `src/data/faq.ts`, so answers cannot drift from what the page renders.

Three generated endpoints sit alongside it: `robots.txt` (answer-engine crawlers explicitly allowed — see the note in that file), `sitemap.xml`, and `llms.txt`, a Markdown brief of the event built from the same data layer.

Icons and the share card are generated, not hand-drawn:

```sh
node scripts/generate-brand-assets.mjs
```

The icon glyph is the knife-"A" lifted out of the client's own SHARPEN wordmark; the share card reuses the hero's photograph and composition. Re-run after changing either. The script downloads the Mulish variable TTF into `node_modules/.cache` on first run, because librsvg cannot read the woff2 the site ships.

## Checkout
All ticket CTAs read `links.checkout` in `src/data/site.ts` and currently go to the Thrivecart page at `https://chefdeb.thrivecart.com/sharpen-workshop-2025/` (the slug is legacy but correct).

Checkout is **migrating to GoHighLevel** — the client's decision on 10 Sept 2026, because Thrivecart leaves no contact record and GHL is what gives them tags, a registrant list and reminders. Both ticket products are already created in GHL against a connected Stripe; the page that sells them is not built yet, so the link above is still the live one. [docs/ghl-checkout.md](docs/ghl-checkout.md) has the account details, what exists, what is left, and the one open pricing decision on the `BAC` code.

There is **no discount code** on this site. `BAC` — second ticket half off — was retired on 11 Sept 2026 in favour of a two-seat product at $592.50, because GoHighLevel coupons discount the whole order and a 50% code would have halved both tickets rather than the second one. It shows as a second button on the Early Bird card.
