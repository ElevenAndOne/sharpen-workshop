# Product
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Established food, beverage and hospitality business owners — caterers, private/personal chefs, restaurant and food-truck owners, bakeries, bars, hotels, private clubs, meal-prep and packaged-food operators — with 1+ year in business. The room also takes the businesses built *around* the industry: culinary-focused accounting firms, marketing agencies, food packaging companies. There is no revenue floor (the earlier "$50K+ gross revenue" criterion was dropped by the client in Sept 2026 and must not come back). They arrive from Chef Deb's email list, Instagram, and the chefdeb.com nav, usually on a phone between shifts, deciding whether to spend $395–$495 and two days away from their business. Secondary audiences: prospective sponsors, and Chef Deb's coaching clients (who also attend a Mastermind Day).

## Product Purpose
A single landing page that sells seats to SHARPEN 2027, the 11th annual two-day strategic-planning workshop run by Chef Deb Coaching (Thurs. Jan. 28 – Fri. Jan. 29, 2027, Meacham International Airport Conference Center, Fort Worth, TX). Success = ticket purchases through the Thrivecart checkout (priority #1 in the brief), with a flawless mobile experience (priority #2). Secondary goals: sponsor enquiries and agenda PDF downloads.

## Positioning
Not a conference that talks at you. Fifty owners, two days working *on* the business instead of in it, and everyone leaves with their own written, prioritized 2027 One-Page Strategic Plan. "There is no ONE plan for ALL food, beverage and hospitality businesses." No fluff, nobody selling a course from the stage. Voice: short, direct, second-person, confident — "No B.S. Coaching for Food, Beverage & Hospitality Business Owners."

**The Sept 2026 steer:** the client's note was *"all business owners want to know is how much money will it make me and how fast."* The hero now leads on that and nothing else — the Power of One thesis (the money is in price, cost and volume, all three of which the owner already controls) plus a 90-day plan as the answer to "how fast". No earnings figure is promised anywhere, because none was ever supplied; what is promised is that they run their own numbers in the room. Any future ROI copy inherits that constraint.

## Operating Context
- Checkout is off-site: https://chefdeb.thrivecart.com/sharpen-workshop-2025/ (legacy slug is correct).
- Pricing: Early Bird **$395** (was $495) through Nov. 30, 2026 — **no coupon code**, the price is simply live. Regular **$495** opens Dec. 1, 2026. Registration closes Jan. 6, 2027. 50 seats.
- The Early Bird code `EARLYBIRD` was **retired** in Sept 2026 along with the `checkoutUrl()` coupon helper. `BAC` (second ticket half off, bring a colleague) is now the only public code, and it is advertised for the buyer to type — it is not pre-applied to any URL.
- Regular is visible but **not sellable** before Dec. 1: its card renders locked so the $100 saving reads, with no clickable CTA.
- **All tickets are non-refundable.** This was the last open policy question and the client settled it in Sept 2026.
- The ticket covers both full days, **lunch daily**, coffee/tea/snacks throughout, all worksheets, and the One-Page Strategic Plan. **Breakfast is not provided** — the page must not say "all meals" or "breakfast and lunch".
- Optional events (welcome dinner, Mastermind Day) are **not included in the ticket** and need an RSVP.
- Agenda PDF is ungated (Google Drive link), opens in a new tab. Current edition: `1YItEtKb-y9N2lKbz2bvGO5CoNjL_akZ_`.
- Contacts: Bianca Russano, Client & Event Manager & Culinary Coach (bianca@chefdeb.com, 973.879.4557) — first line for attendee and registration questions — and Chef Deb (deb@chefdeb.com, 512-879-7751). Heather Sanders is no longer a contact on this page.
- The page will live at chefdeb.com alongside an existing bespoke `/sharpen-2027/` page; this build is a standalone Astro deliverable.

## Capabilities and Constraints
- Stack: Astro 7 + React 19 islands + Tailwind v4, static output. Custom desktop-first breakpoints `desktop / tablet / landscape / portrait`. Every section is a `<Section>` (position:relative holder, tone, vertical rhythm) wrapping a `<Container>` (max-width, gutters); decorative or background elements sit between the two.
- Interactive elements (keep): announcement ticker linking to checkout, sticky nav with accessible mobile drawer, date-aware ticket box (Early Bird collapses after Nov. 30, Regular unlocks Dec. 1) with live countdown, agenda day tabs, FAQ accordion, click-to-play video.
- The event video is **self-hosted**, not embedded — `public/video/sharpen-2026-recap.mp4`, 36MB. Nothing is fetched until the visitor presses play, so the static HTML ships zero `<video>` tags. Do not reintroduce a third-party player.
- Content rules from the client: no emojis on web pages; H1 is red (#C73935) or dark; gold (#F7AE07) only as a scarce highlight; Mulish Black headings, Mulish body.
- The client holds several internal comp/scholarship discount codes (kept in the ClickUp task, not in this repo). They must never appear in the build or in this repository. `BAC` is the only public code.
- Still undecided: speaker names for two agenda sessions (one renders "Speaker TBD"), the welcome-dinner location, and final 2027 room photography.

## Brand Commitments
Chef Deb Coaching. Palette: neutral greys carry the page (dark grey, light grey, off-grey), red #C73935 is the accent, gold #F7AE07 hints only. Fonts: Mulish (Black for headings, Regular for body); taglines/pull-quotes in Mulish Italic — the live brand uses no script face (the outline names "Gistesy", no file supplied). Buttons: sharp rectangles, solid red with a thin red offset outline behind; outline secondary. Logos: the Chef Deb white stacked wordmark (`public/brand/chefdeb-logo-white.png`, used as a CSS mask) and the client's own **SHARPEN wordmark** (`src/assets/brand/sharpen-wordmark.svg`, converted from `SHARPEN Logo.ai` and painted with `currentColor`), which now carries the hero's first line in place of set type. Photography: candid, documentary, warm — Deb and owners in real rooms, not stage or stock. Reference site: https://chefdeb.com/ (full-bleed photo hero, one CTA, light nav). Inspiration set named by Craig: absolutecollagen.com, pizza-amici.nl, wildbran.pt, whatmattersagency.com, ampevino.fr — clean, minimal, image-forward, whitespace over rules.

## Evidence on Hand
- Full page outline (Google Doc `1rksIeuSZ2rv1n1h66dWrHGV9IU4mOl6tzsmMp_z4Ku8`) with all copy, agenda, pricing, sponsors, FAQ questions. Superseded on content by the client's Sept 2026 agenda PDF and the live page wherever they differ.
- Four published testimonials from the client's live playground page chefdeb.com/sharpen-2027/ (Ruth Oesterman / La Bonne Vie, Michelle Hendricks / Reverence Culinary, Bianca Russano / About the Table, Laura MacDougall / The Wanderlust Table). The outline's earlier names (Curlis, Johnson, Jones) had no quotes and are not used. **Never invent quotes.** Note that Bianca Russano now appears twice on the page — as a testimonial author and as the event manager contact.
- "Where to stay": two hotel areas, from the live page. Hotel Drover carries no published rate and says "Check rates" rather than a number nobody verified. The intro notes that several attendees split an Airbnb each year.
- Pull-quote (real, Chef Deb): "You can't be a victim and wealthy at the same time."
- Sponsors: Gold — Serenity Knives, ShuBu Creative, TEVA Bookkeeping Solutions; Silver — Supply Club. **ReTool Marketing was removed in Sept 2026** and must not be re-added. Logos are supplied and normalized into `src/assets/images/sponsors/`.
- **Event video supplied and in use:** the client's SHARPEN 2026 recap (Drive `1Kva9Dhl_vK7GjjM5nwufFhNoE-HkV_OD`, "Chef Deb - Sharpen 2026 (Full)"). 2:46, 1920×1080. The supplied master is a 12 Mbps export (245MB); the shipped file is a CRF 26 re-encode at 36MB. It contains real room b-roll, attendee interviews (pillarboxed vertical footage), text cards, and a closing Chef Deb Coaching card — **and a "Sponsors & Vendors" slide that still shows re•tool**, which the page itself no longer lists.
- Brand photography from chefdeb.com uploads, plus stills pulled from the 2026 recap master.
- Absent: 2027 room photography; the two unnamed speakers.

## Product Principles
1. Price and the ticket CTA are never more than one glance away; the CTA label is identical everywhere — currently **"Reserve your spot — $395"**.
2. Imagery does the persuading; copy stays short and specific (numbers, not adjectives).
3. One focal point per screen; whitespace separates sections, not lines or patterns.
4. Never fabricate. Where something is genuinely unknown it is either marked pending or left out — never filled in. This extends to inventory: the page never implies a live seat count it does not have.
5. Mobile is a first-class experience, not a collapsed desktop.
