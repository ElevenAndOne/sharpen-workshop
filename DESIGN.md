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
| Hint | `gold` / `gold-deep` / `gold-tint` | #f7ae07 / #c98a03 / #fdf3dc | **Only** to mark something different: "Save $100", the discount-code chip, "Speaker TBD", "Awaiting sign-off", ticker separators |

Never: a red or gold section background; gold as a general accent; coloured `border-left` tabs; gradients except the legibility scrim over hero/closing photographs.

## Type
Mulish only (self-hosted via `@fontsource-variable/mulish`). Four sizes plus two numeric exceptions — every text element on the page is one of these:

| Class | Size | Weight | Where |
|---|---|---|---|
| `text-display` | clamp(2.6rem, 4vw, 4rem) | 900 | The h1 and the closing invitation's heading |
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
- **Button**: sharp 2px radius, uppercase small. `primary` = solid red with the brand's thin red offset outline behind (tucks in on hover). `outline` / `outlineLight` = 1px border. `quiet` = underlined text. `stack` makes filled/outline buttons full-width on portrait phones while a quiet button centres itself on the same axis. The primary label is identical everywhere it appears: **"Grab your seat — $395"**.
- **Details cards**: white on `gray-50`; on hover a 2px red rule draws across the top edge (`card-rule`) — no lift, no shadow.
- **Countdown**: four identical-width clipped boxes; a changed digit slides up into its box (no fade).
- **SocialIcon**: 24×24 single-fill glyphs for Instagram, LinkedIn, Facebook, in 44px hit targets.
- **Badge**: `neutral` by default; `gold` only for hints; `brand` for the bring-a-friend tag.
- **ImageFrame**: pass an imported asset → responsive AVIF/WebP `<picture>`; no asset → quiet grey frame with an art-direction note. `fill` for photos that fill a box.
- **Logo**: white PNG used as a CSS mask painted with `currentColor`.

## Photography
Candid, documentary, the brand's own (harvested from chefdeb.com uploads into `src/assets/images/`). Full-bleed or edge-to-edge; never contained in a rounded card. Hero: the SHARPEN room (hands raised). Details: SHARPEN lanyards. Video poster: Deb coaching at the red wall. Bring-a-friend: two owners at a table, red wall. Strip: three equal 4:5 frames — Deb at the flipchart, a worksheet close-up, Deb coaching. Closing: Deb presenting, heavy scrim, signature. Replace with 2026 event photography when supplied; the hero source carries a 2024 photographer credit — confirm rights or get an uncredited export.

## Motion
Three authored moments, each tied to what the element is; everything fires once and is skipped under `prefers-reduced-motion`:
- **Type arrives into its baseline** — `reveal-lines`: the hero's lines slide up out of a clipped mask, 850ms expo-out, 90ms stagger.
- **Photographs open like a blind** — `reveal-clip`: a single left-to-right `clip-path` wipe on scroll-in, 1.1s, 120ms stagger across the strip. No hover scale anywhere.
- **Lists reflow top-to-bottom** — `row-enter`: agenda rows enter with a 40ms stagger when the day tab changes.
Supporting: `reveal` (a 10px rise for copy blocks), `accordion-body` (FAQ expands via `grid-template-rows`, closed panels are `inert`), `digit-roll` (a changed countdown digit slides up into its clipped box), `card-rule` (details-card hover rule), and the announcement ticker is driven by a small rAF script so it cruises at ~40px/s and eases to a stop on hover instead of freezing.

## Copy rules
No emojis. Numbers over adjectives. Pending content is shown as pending (refund policy, sponsor logos, event video) — never filled in. Neither video in the client outline is Chef Deb's; until the real reel arrives the video block links to instagram.com/chefdebcoaching. Social links are the ones in chefdeb.com's own header. Internal discount codes never appear in the build; only EARLYBIRD and BAC are public.
