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
- The 60-second event reel (set `youtubeId` in `VideoSection.astro`; the slot links to Instagram until then)
- Refund policy copy (`src/data/faq.ts`, flagged `pending`)
- Sponsor logo files (name plates stand in)
- 2026 room photography (the hero uses a 2024 SHARPEN photo carrying a photographer credit — confirm rights)

## Checkout
All ticket CTAs go to the Thrivecart page at `https://chefdeb.thrivecart.com/sharpen-workshop-2025/` (the slug is legacy but correct). Coupon codes are passed as `?coupon=CODE`. Only the two public codes appear in this repository.
