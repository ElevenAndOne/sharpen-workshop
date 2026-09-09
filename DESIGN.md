# Design — SHARPEN 2027 landing page

The page is brand-native to chefdeb.com: photography persuades, copy stays short, greys carry every surface, red is the only action colour. This file records the decisions the code now embodies so the next change stays inside them.

## World in one line
A working room, not a stage. One photograph per screen does the talking; type is restrained; nothing is decorated for its own sake.

## Colour
Neutral-first. Tokens live in `src/styles/global.css` under `@theme`.

| Role | Token | Value | Use |
|---|---|---|---|
| Page ground | `white` / `gray-50` / `gray-100` | #fff / #f6f6f6 / #ececec | Alternating section tones; cards are white on `gray-50` |
| Dark ground | `gray-900` | #1f1f1f | Nav, video band, closing invitation, footer |
| Headings | `ink-deep` | #1f1f1f | |
| Body | `ink` | #333333 | |
| Secondary | `slate` / `slate-soft` | #58595b / #8a8b8d | Notes, captions, times |
| Hairline | `line` / `line-dark` | #dcdcdc / white 12% | The only lines on the page |
| Accent | `brand` / `brand-deep` | #c73935 / #a52c29 | Primary buttons, tagline & pull-quote, link underlines, ticker ground, one live dot |
| Hint | `gold` / `gold-deep` / `gold-tint` | #f7ae07 / #c98a03 / #fdf3dc | **Only** to mark something different: "Save $100", the BAC code chip, "Speaker TBD", ticker separators. A **locked** ticket tier uses grey, not gold — gold marks an opportunity, never an obstacle |

Never: a red or gold section background; gold as a general accent; coloured `border-left` tabs; gradients except the legibility scrim over hero/closing photographs.

## Type
Mulish only (self-hosted via `@fontsource-variable/mulish`). Four sizes plus two numeric exceptions — every text element on the page is one of these:

| Class | Size | Weight | Where |
|---|---|---|---|
| `text-display` | clamp(2.6rem, 4vw, 4rem) | 900 | The three statements that carry a whole section: bring-a-colleague, the ticket section's scarcity line (portrait steps down), and the closing invitation. **The h1 is no longer set type** — it is the SHARPEN wordmark, see Components |
| `text-heading` | clamp(1.85rem, 2.6vw, 2.5rem) | 900 | Every section h2, the pull-quote, drawer links |
| `text-body` | 1.0625rem | 400 (900 for titles/names) | Paragraphs, card titles, session titles, FAQ questions, links |
| `text-small` | 0.75rem | 400/900 | Buttons, mono times, footnotes |
| `label` (utility) | 0.75rem | 900, uppercase, 0.14em tracking | Tier names, day labels, column headers, captions, the hero footnote |
| `text-price` | clamp(3.25rem, 4.8vw, 4.75rem) | 900 | The ticket price only |
| `text-numeral` | 1.3rem | 900 | Struck-through old price |
| (countdown) | digits `text-heading`, units 0.62rem | 900 | The one place a label sits below `small` — so it never crowds the digit |

Voice: `text-tagline` = Mulish Italic 500 — the brand tagline and Deb's pull-quote. There is no script face on the brand (the outline's "Gistesy" was not supplied; the live site uses Mulish Italic). Sentence-case headings. No eyebrows, no section numbers.

## Layout
- `<Section tone spacing id clip>` is the position:relative holder; `<Container width>` owns max-width and gutters. Backgrounds/scrims sit between them.
- Every left-aligned section uses `width="wide"` (1560px) so the page has one left edge. Pricing is centred inside the same container.
- `<Container edges>` draws 1px vertical hairlines on the container's outer edges through the full section height — a chefdeb.com detail — on the grey sections (details, tickets, sponsors, FAQ). Desktop/tablet only.
- Breakpoints are desktop-first max-width tiers: `tablet:` ≤1279, `landscape:` ≤1023, `portrait:` ≤767. See the specificity note in `global.css` — do not reorder or "simplify" it.
- Section rhythm (top to bottom): ticker (red strip) → nav (dark) → hero (photo) → details `gray` with white cards + photo → video `dark` → bring-a-friend 50/50 photo → tickets `gray` → agenda `white` → photo strip → sponsors `gray` → testimonials `white` → where to stay `white` (grey cards) → FAQ `gray` → closing invitation (photo, dark scrim, signature) → footer `dark`.
- Content source of truth is the client's live page chefdeb.com/sharpen-2027/ (supersedes the outline doc where they differ). Every CTA price is a `PriceTag` island so the label flips to $495 after Nov. 30 without a rebuild; each ticket card states "SHARPEN 2027 · Jan. 28–29, 2027" because the Thrivecart page still carries the old year.

## Components
- **Button**: sharp 2px radius, uppercase small. `primary` = solid red with the brand's thin red offset outline behind (tucks in on hover). `outline` / `outlineLight` = 1px border. `quiet` = underlined text. `stack` makes filled/outline buttons full-width on portrait phones while a quiet button centres itself on the same axis. The primary label is identical everywhere it appears: **"Reserve your spot — $395"**.
- **Details cards**: white on `gray-50`; on hover a 2px red rule draws across the top edge (`card-rule`) — no lift, no shadow.
- **Countdown**: four identical-width clipped boxes; a changed digit slides up into its box (no fade).
- **SocialIcon**: 24×24 single-fill glyphs for Instagram, LinkedIn, Facebook, in 44px hit targets.
- **Badge**: `neutral` by default; `gold` only for hints; `brand` for the bring-a-friend tag.
- **ImageFrame**: pass an imported asset → responsive AVIF/WebP `<picture>`; no asset → quiet grey frame with an art-direction note. `fill` for photos that fill a box.
- **Logo**: white PNG used as a CSS mask painted with `currentColor`.
- **SharpenWordmark**: the client's own SHARPEN mark (`SHARPEN Logo.ai` → paths), stripped to `currentColor` so one file serves white over the hero photograph and brand red on a light ground without a second export. Its viewBox is trimmed to the ink bounds — measured off a 300dpi render, because the .ai artboard carried asymmetric padding — so the mark's aspect ratio is the file's aspect ratio and sizing by width or height both behave. It carries the h1; the mark has no year in it, so 2027 lives in the accessible name and in the meta line below.
- **Ticket tiers**: featured (Early Bird) is the dark card; the second tier is white. A tier that is on show but **not on sale** — Regular before Dec. 1 — renders *locked*: `gray-50` ground, muted price, a grey "Opens Dec. 1, 2026" chip, and the CTA replaced by a plain `<span>`. There is nothing to click, rather than a link dressed up as disabled.
- **Scarcity statement**: the closing argument of the ticket section, and the only element there set at display size — larger than "Get your tickets" above it, which is only a label. It carries no rule, no chrome and no device: the countdown's whitespace separates it. The break is forced at the period so the two sentences stay two beats, the way the hero's headline pair does, and **"50 seats" is the one piece of red text on the grey ground** — red is already the page's accent, so the number is marked without inventing a highlight for it. Portrait steps back to `text-heading`, because display type here follows the page's convention of one whole sentence per line and "When they're gone, they're gone." cannot hold that in a 375px column.
- **VideoEmbed**: click-to-play, **self-hosted**. The band plays the client's own SHARPEN 2026 recap from `public/video/`, not a third-party embed. The supplied master was a 12 Mbps export — 245MB for 2:46 — and a CRF 26 re-encode with a 3 Mbps ceiling lands at 36MB with no visible loss at the size this slot paints, which is small enough to serve ourselves. Three things to keep. **Nothing loads until someone presses play**: the facade is an `<img>` and a button, the built HTML contains no `<video>` tag at all, so a visitor who never plays it never pays the 36MB. **The poster is a designed card, not a frame of the film** — ShuBu supplied it, and it is shipped as a hand-tuned AVIF rather than run through `getImage`, because it already sits at the exact width the slot needs and a second encode would only spend quality it cannot get back. **The play disc is white at rest and brand red on hover**, because red lanyards run right through the poster and a red disc half-disappears into them. Note the facade's scrim still applies over it, so the card renders a little darker than the file does on its own. `ratio` sets the slot's aspect — landscape by default, `'9 / 16'` for a phone-shot reel — and `src={null}` still renders the pending slot, so pulling the video degrades to a link rather than an empty box.
- **Sponsor wall**: real sponsor logos, in their own colours, on white plates over `gray-50` — a sponsor pays for logo recognition, so the marks are never greyed or tinted to suit the palette. Plates carry the same `card-rule` hover as the details cards; the logo itself does not move. Tiers are a real hierarchy (Gold $750 / Silver $300 in the package), so Gold logos sit at a larger base size than Silver.
  Two rules keep the wall even. **One:** every logo is trimmed to its ink bounds by `scripts/normalize-sponsor-logos.mjs`, writing `src/assets/images/sponsors/` and leaving the supplied originals alone — as delivered, the since-removed re•tool mark filled 14% of a 6250² canvas while Serenity's filled 99%, so untrimmed files render at wildly different sizes in the same box. **Two:** because the files are trimmed, a file's aspect ratio is the mark's aspect ratio, so `Sponsors.astro` derives each height from it — `base * (h/w) ** 0.33`. The marks run 1:1 to 4.75:1; equal heights would let the square one dominate, equal areas would shrink it to nothing, and the tempered exponent sits between the two. Adding a sponsor means dropping the logo in, re-running the script and adding a data entry — no per-logo numbers. `scale` on a `Sponsor` is the escape hatch for a mark that still reads light or heavy.

## Photography
Candid, documentary, the brand's own (harvested from chefdeb.com uploads into `src/assets/images/`). Full-bleed or edge-to-edge; never contained in a rounded card. Hero: the SHARPEN room (hands raised). Details: SHARPEN lanyards. Video poster: ShuBu's designed card — four attendees laughing with lanyards under "THIS IS SHARPEN", the wordmark in brand red and the type held to the left so the centred play disc never covers it. Bring-a-friend: two owners at a table, red wall. Strip: three equal 4:5 frames — Deb at the flipchart, a worksheet close-up, Deb coaching. Closing: Deb presenting, heavy scrim, signature. Stills from the 2026 recap master are now a legitimate source alongside the chefdeb.com uploads; replace the rest with 2027 event photography when supplied; the hero source carries a 2024 photographer credit — confirm rights or get an uncredited export.

## Motion
Three authored moments, each tied to what the element is; everything fires once and is skipped under `prefers-reduced-motion`:
- **Type arrives into its baseline** — `reveal-lines`: the hero's lines slide up out of a clipped mask, 850ms expo-out, 90ms stagger.
- **Photographs open like a blind** — `reveal-clip`: a single left-to-right `clip-path` wipe on scroll-in, 1.1s, 120ms stagger across the strip. No hover scale anywhere.
- **Lists reflow top-to-bottom** — `row-enter`: agenda rows enter with a 40ms stagger when the day tab changes.
Supporting: `reveal` (a 10px rise for copy blocks), `accordion-body` (FAQ expands via `grid-template-rows`, closed panels are `inert`), `digit-roll` (a changed countdown digit slides up into its clipped box), `card-rule` (details-card hover rule), and the announcement ticker is driven by a small rAF script so it cruises at ~40px/s and eases to a stop on hover instead of freezing.

## Copy rules
No emojis. Numbers over adjectives. Never fabricate — where something is genuinely unknown it is marked pending ("Speaker TBD") or left out, never filled in; that extends to inventory, so nothing on the page implies a live seat count we do not have. The refund policy is no longer pending: **all tickets are non-refundable**. The ticket includes lunch, not breakfast — never "all meals". The hero leads on the money (price, cost, volume, and a 90-day plan) because the client asked it to, but promises no earnings figure, because none was supplied. Neither video in the original page outline was Chef Deb's, and the borrowed Global Culinary Conference talk that stood in for a while is gone: the band now plays her own SHARPEN 2026 recap, credited by year and city. Social links are the ones in chefdeb.com's own header. Internal discount codes never appear in the build; `EARLYBIRD` was retired when Early Bird became a plain price, leaving `BAC` as the only public code.
