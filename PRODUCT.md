# Product
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Established culinary business owners — caterers, private/personal chefs, restaurant and food-truck owners, meal-prep and packaged-food operators — with 1+ year in business and $50K+ gross revenue. They arrive from Chef Deb's email list, Instagram, and the chefdeb.com nav, usually on a phone between shifts, deciding whether to spend $395–$495 and two days away from their business. Secondary audiences: prospective sponsors, and Chef Deb's coaching clients (who also attend a Mastermind Day).

## Product Purpose
A single landing page that sells seats to SHARPEN 2027, the 11th annual two-day strategic-planning workshop run by Chef Deb Coaching (Thurs. Jan. 28 – Fri. Jan. 29, 2027, Meacham International Airport Conference Center, Fort Worth, TX). Success = ticket purchases through the Thrivecart checkout (priority #1 in the brief), with a flawless mobile experience (priority #2). Secondary goals: sponsor enquiries and agenda PDF downloads.

## Positioning
Not a conference that talks at you. Fifty owners, two days working *on* the business instead of in it, and everyone leaves with their own written, prioritized 2027 One-Page Strategic Plan. "There is no ONE plan for ALL culinary businesses." No fluff, nobody selling a course from the stage. Voice: short, direct, second-person, confident — "No B.S. Coaching for Food, Beverage & Hospitality Business Owners."

## Operating Context
- Checkout is off-site: https://chefdeb.thrivecart.com/sharpen-workshop-2025/ (legacy slug is correct). Thrivecart accepts `?coupon=CODE`.
- Pricing: Early Bird $395 (was $495) with code EARLYBIRD through Nov. 30, 2026; Regular $495; registration closes Jan. 6, 2027; 50 seats. Bring-a-friend: second ticket half off with code BAC.
- Agenda PDF is ungated (Google Drive link), opens in a new tab.
- Contacts: Chef Deb (deb@chefdeb.com, 512-879-7751), Heather Sanders (heather@chefdeb.com, 936-662-3948).
- The page will live at chefdeb.com alongside an existing bespoke `/sharpen-2027/` page; this build is a standalone Astro deliverable.

## Capabilities and Constraints
- Stack: Astro 7 + React 19 islands + Tailwind v4, static output. Custom desktop-first breakpoints `desktop / tablet / landscape / portrait`. Every section is a `<Section>` (position:relative holder, tone, vertical rhythm) wrapping a `<Container>` (max-width, gutters); decorative or background elements sit between the two.
- Interactive elements (keep): announcement ticker linking to checkout, sticky nav with accessible mobile drawer, date-aware ticket box (Early Bird collapses after Nov. 30) with live countdown, agenda day tabs, FAQ accordion, click-to-load video facade.
- Content rules from the client: no emojis on web pages; H1 is red (#C73935) or dark; gold (#F7AE07) only as a scarce highlight; Mulish Black headings, Mulish body.
- The client holds several internal comp/scholarship discount codes (kept in the ClickUp task, not in this repo). They must never appear in the build or in this repository. Only EARLYBIRD and BAC are public.
- Undecided: refund policy copy; speaker names for two sessions; sponsor logo files; final hero/room photography from SHARPEN 2026; the correct 60-second event video (the YouTube short in the outline doc is a Mel Robbins clip and must not be used).

## Brand Commitments
Chef Deb Coaching. Palette: neutral greys carry the page (dark grey, light grey, off-grey), red #C73935 is the accent, gold #F7AE07 hints only. Fonts: Mulish (Black for headings, Regular for body); taglines/pull-quotes in Mulish Italic — the live brand uses no script face (the outline names "Gistesy", no file supplied). Buttons: sharp rectangles, solid red with a thin red offset outline behind; outline secondary. Logo: white stacked wordmark (only asset is `public/brand/chefdeb-logo-white.png`, used as a CSS mask). Photography: candid, documentary, warm — Deb and owners in real rooms, not stage or stock. Reference site: https://chefdeb.com/ (full-bleed photo hero, one CTA, light nav). Inspiration set named by Craig: absolutecollagen.com, pizza-amici.nl, wildbran.pt, whatmattersagency.com, ampevino.fr — clean, minimal, image-forward, whitespace over rules.

## Evidence on Hand
- Full page outline (Google Doc `1rksIeuSZ2rv1n1h66dWrHGV9IU4mOl6tzsmMp_z4Ku8`) with all copy, agenda, pricing, sponsors, FAQ questions.
- Four published testimonials from the client's live playground page chefdeb.com/sharpen-2027/ (Ruth Oesterman / La Bonne Vie, Michelle Hendricks / Reverence Culinary, Bianca Russano / About the Table, Laura MacDougall / The Wanderlust Table). The outline's earlier names (Curlis, Johnson, Jones) had no quotes and are not used. **Never invent quotes.**
- "Where to stay": two hotel areas with rates, from the live page. Audience wording on the live page is "food, beverage & hospitality business owners" (supersedes the outline's "culinary").
- Pull-quote (real, Chef Deb): "You can't be a victim and wealthy at the same time."
- Sponsors (names only): Gold — Serenity Knives, ShuBu Creative, ReTool Marketing, TEVA; Silver — Supply Club.
- Brand photography available from chefdeb.com uploads (Deb in kitchens/offices, group cooking class, "Hands raised Day One" from a past SHARPEN) — usable as on-brand placeholders until 2026 room photography arrives.
- Absent: sponsor logos, refund policy, event video, 2026 event photos.

## Product Principles
1. Price and the ticket CTA are never more than one glance away; the CTA label is identical everywhere.
2. Imagery does the persuading; copy stays short and specific (numbers, not adjectives).
3. One focal point per screen; whitespace separates sections, not lines or patterns.
4. Never fabricate: pending content is shown as clearly pending, not filled in.
5. Mobile is a first-class experience, not a collapsed desktop.
