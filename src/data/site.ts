/** Single source of truth for event facts, links and navigation. */

/**
 * The sponsorship package as supplied by the client. Imported rather than
 * hard-coded so a missing file fails the build instead of shipping a 404,
 * and so the emitted URL is content-hashed when a new edition replaces it.
 */
import sponsorPackagePdf from '../assets/files/sharpen-2026-sponsorship-opportunities-package.pdf?url';

/**
 * The 2027 agenda deck, supplied by the client. Served from our own build
 * rather than the Drive link it arrived on: a Drive URL shows a sign-in
 * wall to anyone not logged into Google, can be revoked or moved without
 * us knowing, and interrupts the page with a third-party viewer. Imported
 * so a missing file fails the build and the URL is content-hashed.
 */
import agendaPdf from '../assets/files/sharpen-2027-agenda.pdf?url';

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
      "The must attend event for Food, Beverage & Hospitality leaders shaping what's next.",
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
  /* Four pages: the overview and pricing, both days, then Optional Events
     with the travel, stay, non-refundable policy and Bianca's details. Its
     prices match the tiers below, and its only contact is Bianca — so it
     agrees with the page on both counts. */
  agendaPdf,
  sponsorEnquiry:
    'mailto:bianca@chefdeb.com?subject=Sharpen%202027%20Sponsorship%20Inquiry',
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
   * Kept as the video band's safety net: if `video.src` is ever set back to
   * null, VideoEmbed falls back to sending people here rather than showing an
   * empty slot.
   */
  instagram: 'https://www.instagram.com/chefdebcoaching',
} as const;

/**
 * The film the video band plays.
 *
 * This is the client's own SHARPEN 2026 recap (Drive `1Kva9Dhl…`, "Chef Deb -
 * Sharpen 2026 (Full)") — real footage of the room, attendee interviews and
 * the closing card. It replaces the borrowed Global Culinary Conference talk
 * that stood in while no SHARPEN footage existed.
 *
 * Self-hosted rather than embedded. The supplied master is a 12 Mbps export,
 * 245MB for 2:46; re-encoded at CRF 26 with a 3 Mbps ceiling it is 36MB with
 * no visible loss at the size this slot paints, which is small enough to
 * serve ourselves. That keeps the page free of a third-party player and its
 * cookies, and keeps the poster and controls on-brand. `VideoEmbed` still
 * loads nothing until someone presses play, so the 36MB is only ever paid by
 * a visitor who asked for it.
 *
 * The poster is a frame of the room at 1:10, pulled from the 12 Mbps master
 * rather than from our own re-encode so the still carries no compression the
 * video's bitrate introduced.
 */
export const video = {
  src: '/video/sharpen-2026-recap.mp4',
  title: 'SHARPEN 2026',
  /** Credited under the player, so the year is never ambiguous. */
  context: 'Fort Worth, Texas',
  runtime: '2:46',
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

/**
 * Bianca runs registration and is the first line for attendee questions.
 * Chef Deb's own email and phone came off at the client's request (Sept 2026),
 * so Bianca is the only contact the page publishes.
 */
export const contacts: Contact[] = [
  {
    name: 'Bianca Russano',
    role: 'Client & Event Manager & Culinary Coach',
    email: 'bianca@chefdeb.com',
    phone: '973.879.4557',
    phoneHref: 'tel:+19738794557',
  },
];

/** Verified against the links in chefdeb.com's own header. */
export const social = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/chefdebcoaching' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/chef-deb' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/chefdebcoaching' },
] as const;
