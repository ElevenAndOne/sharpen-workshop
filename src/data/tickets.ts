import { event } from './site';

export interface Tier {
  id: string;
  name: string;
  badge?: string;
  priceWas?: number;
  price: number;
  /**
   * Per-tier checkout URL; falls back to the shared one when absent.
   *
   * Both tiers now carry their own GoHighLevel payment link, which is what
   * makes the Dec. 1 switchover safe here: TicketBox is a client island, so it
   * picks the tier for the visitor's own date and sends them to that tier's
   * link. The shared `links.checkout` cannot do that — see the note on it in
   * site.ts.
   */
  href?: string;
  /**
   * An optional second CTA on the same card. Early Bird carries the two-seat
   * Bring a Colleague option here, so the choice between one seat and two is
   * made at the point of buying rather than in a separate section.
   */
  secondary?: { cta: string; href: string; note: string };
  /** Not sellable until Early Bird closes — the card renders locked. */
  opensAfterEarlyBird?: boolean;
  /** Shown in place of the CTA while the tier is locked. */
  opensLabel?: string;
  window: string;
  cta: string;
  featured: boolean;
}

export const tiers: Tier[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    badge: 'Save $100',
    priceWas: 495,
    price: 395,
    href: 'https://link.fastpaydirect.com/payment-link/6aa40b69e9a073174b3b5cbc',
    secondary: {
      cta: 'Bring a colleague — $592.50',
      href: 'https://link.fastpaydirect.com/payment-link/6aa41bd8ceb12d9fc1a8c588',
      note: 'Two seats. Second one half price.',
    },
    window: `Through ${event.earlyBirdEndsLabel}`,
    cta: 'Claim Early Bird — $395',
    featured: true,
  },
  {
    id: 'regular',
    name: 'Regular',
    price: 495,
    href: 'https://link.fastpaydirect.com/payment-link/6aa40cbce9a073174b3b5cbf',
    opensAfterEarlyBird: true,
    opensLabel: `Opens ${event.regularOpensLabel}`,
    window: `Registration closes ${event.registrationClosesLabel}`,
    cta: 'Register — $495',
    featured: false,
  },
];

/**
 * Section 5 — Bring a Colleague.
 *
 * This was a coupon code (`BAC`) the buyer typed at checkout. It is now a real
 * two-seat product instead, on the client's decision in Sept 2026.
 *
 * The reason is arithmetic rather than taste: GoHighLevel coupons discount the
 * whole order, so a 50% code on a two-seat order would have halved *both*
 * tickets — $395 instead of $592.50, costing $197.50 every time it was used.
 * A fixed-amount code priced for two seats would have applied to one-seat
 * orders as well. A product priced at $395 + half of $395 states the offer
 * exactly and cannot be misapplied.
 *
 * There is no discount code on this site any more, and none should return
 * without checking how the platform actually applies it.
 */
export const bringAColleague = {
  heading: 'The best ideas from SHARPEN rarely stay at SHARPEN.',
  body: 'Bring your business partner or your GM. Work through it together and go home with a shared plan instead of a summary.',
  offer: 'Two seats for $592.50',
  note: 'Second ticket half off',
  cta: 'Bring a colleague — $592.50',
  href: 'https://link.fastpaydirect.com/payment-link/6aa41bd8ceb12d9fc1a8c588',
} as const;
