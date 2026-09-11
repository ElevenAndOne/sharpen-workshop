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

/** Section 5 — Bring a Colleague. */
export const bringAColleague = {
  heading: 'The best ideas from SHARPEN rarely stay at SHARPEN.',
  body: 'Bring your business partner or your GM. Work through it together and go home with a shared plan instead of a summary.',
  offer: 'Second ticket half off',
  code: 'BAC',
} as const;
