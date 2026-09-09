/** Single source of truth for event facts, links and navigation. */

/**
 * The sponsorship package as supplied by the client. Imported rather than
 * hard-coded so a missing file fails the build instead of shipping a 404,
 * and so the emitted URL is content-hashed when a new edition replaces it.
 */
import sponsorPackagePdf from '../assets/files/sharpen-2026-sponsorship-opportunities-package.pdf?url';

export const event = {
  name: 'SHARPEN 2027',
  edition: '11th Annual',
  city: 'Fort Worth, Texas',
  tagline: 'No B.S. Coaching for Food, Beverage & Hospitality Business Owners',
  dateLine: 'Thurs. Jan. 28 – Fri. Jan. 29, 2027',
  dateShort: 'Jan. 28–29, 2027',
  timeLine: '9:00 am – 5:00 pm (CT) both days',
  seats: 50,
  venue: {
    name: 'Meacham International Airport Conference Center',
    detail: '3rd Floor, Fort Worth, TX',
    note: 'Private airport conference center — floor-to-ceiling runway views.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Meacham+International+Airport+Conference+Center+Fort+Worth+TX',
  },
  /** Registration hard close. */
  registrationClosesLabel: 'Jan. 6, 2027',
  registrationClosesAt: '2027-01-06T23:59:00-06:00',
  /**
   * Hero copy. The headline pair leads; the subhead names the audience. The
   * `lines` below still match chefdeb.com/sharpen-2027/ verbatim; `heading`
   * and `body` no longer do — see the note on them.
   */
  hero: {
    /* Non-breaking space keeps the wrap on the sentence break, not after "A". */
    headline: 'Two days. A\u00A0different 2027.',
    subhead:
      "The must-attend event for Food, Beverage & Hospitality leaders shaping what's next",
    /* Client note, Sept 2026: "all business owners want to know is how much
       money will it make me and how fast." So the lead claim is now the
       Power of One thesis — the money is in price, cost and volume, which the
       owner already controls — and the answer to "how fast" is the 90-day
       plan they leave with. No earnings figure is promised, because none was
       supplied; what is promised is that they run their own numbers. */
    heading: 'The fastest money in your business is already in your numbers.',
    body: "Two days on the three levers that move it — price, cost, volume — run against your own figures, and a 90-day plan to go get it.",
    lines: [
      'Fifty seats. No fluff. Nobody selling you a course from the stage.',
      "Because there is no ONE plan for ALL food, beverage and hospitality businesses — you'll leave with yours, written down and prioritized for 2027.",
    ],
  },
  /** Early Bird window. Regular opens the morning after it closes. */
  earlyBirdEndsLabel: 'Nov. 30',
  earlyBirdEndsAt: '2026-11-30T23:59:00-06:00',
  regularOpensLabel: 'Dec. 1, 2026',
} as const;

export const links = {
  /** Priority #1 from the brief — every ticket CTA lands here. */
  checkout: 'https://chefdeb.thrivecart.com/sharpen-workshop-2025/',
  /* The client's updated agenda deck (Sept 2026) — the one that carries the
     revised "your ticket includes", no $50K criterion, Optional Events, and
     the non-refundable policy. Shared publicly on Drive. */
  agendaPdf:
    'https://drive.google.com/file/d/1YItEtKb-y9N2lKbz2bvGO5CoNjL_akZ_/view?usp=sharing',
  sponsorEnquiry: 'mailto:deb@chefdeb.com?subject=SHARPEN%202027%20Sponsorship',
  /**
   * NOTE: the supplied deck is the 2026 edition — 10th Annual, Jan. 14-17
   * 2026 dates, and 2026 tier prices ($2,000 presenting / $750 gold / $300
   * silver). What a sponsorship *includes* still holds, so it is linked, but
   * the page labels it by its own year so nobody reads last year's pricing as
   * this year's. Swap in the 2027 deck and this is the only line to change.
   */
  sponsorPackage: sponsorPackagePdf,
  sponsorPackageYear: '2026',
  home: 'https://chefdeb.com/',
  /**
   * Kept as the video band's safety net: if `video.youtubeId` is ever set back
   * to null, VideoEmbed falls back to sending people here rather than showing
   * an empty slot. (The reel and short in the original page outline were never
   * Chef Deb's content — the short is a Mel Robbins clip, the reel is from
   * another account — so neither was ever embedded.)
   */
  instagram: 'https://www.instagram.com/chefdebcoaching',
} as const;

/**
 * The talk the video band plays.
 *
 * Worth being precise about what this is: it is NOT SHARPEN footage. It is
 * Chef Deb delivering her "From Behind the Stove to CEO" masterclass at the
 * Feed the Soul Foundation's Global Culinary Conference 2025, published on
 * The Culinary Business Network's channel. That still earns its place in the
 * band — the section asks "here's what you're walking into", and this is how
 * she teaches — but the caption credits the conference rather than implying
 * the clip was shot at the event. Swap in real SHARPEN footage when it exists.
 *
 * The poster is deliberately the brand's own photograph, not YouTube's
 * thumbnail: that thumbnail is a magenta-and-gold title card which would
 * fight a palette where gold only ever hints.
 */
export const video = {
  youtubeId: 'u9cykTQnNzc',
  title: 'From Behind the Stove to CEO',
  /** Credited under the player, so the clip is never passed off as SHARPEN. */
  context: 'Global Culinary Conference 2025',
  url: 'https://www.youtube.com/live/u9cykTQnNzc',
} as const;

export const nav = [
  { label: 'The Details', href: '#details' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Sponsors', href: '#sponsor' },
  { label: 'Stay', href: '#stay' },
  { label: 'FAQ', href: '#faq' },
] as const;

export interface Contact {
  name: string;
  role?: string;
  email: string;
  phone: string;
  phoneHref: string;
}

/** Bianca runs registration and is the first line for attendee questions. */
export const contacts: Contact[] = [
  {
    name: 'Bianca Russano',
    role: 'Client & Event Manager & Culinary Coach',
    email: 'bianca@chefdeb.com',
    phone: '973.879.4557',
    phoneHref: 'tel:+19738794557',
  },
  {
    name: 'Chef Deb',
    email: 'deb@chefdeb.com',
    phone: '512-879-7751',
    phoneHref: 'tel:+15128797751',
  },
];

/** Verified against the links in chefdeb.com's own header. */
export const social = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/chefdebcoaching' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/chef-deb' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/chefdebcoaching' },
] as const;
