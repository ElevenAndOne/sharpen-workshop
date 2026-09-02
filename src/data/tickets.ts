import { event } from './site';

export interface Tier {
  id: string;
  name: string;
  badge?: string;
  priceWas?: number;
  price: number;
  code?: string;
  /** Publicly advertised codes only. Internal codes stay out of the build. */
  window: string;
  cta: string;
  featured: boolean;
  fine?: string;
}

export const tiers: Tier[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    badge: 'Save $100',
    priceWas: 495,
    price: 395,
    code: 'EARLYBIRD',
    window: `Through ${event.earlyBirdEndsLabel}`,
    cta: 'Claim Early Bird — $395',
    featured: true,
    fine: 'Code applied automatically at checkout.',
  },
  {
    id: 'regular',
    name: 'Regular',
    price: 495,
    window: `Registration closes ${event.registrationClosesLabel}`,
    cta: 'Register — $495',
    featured: false,
  },
];

/** Section 5 — Bring a Friend. */
export const bringAFriend = {
  heading: 'The best ideas from SHARPEN rarely stay at SHARPEN.',
  body: 'Bring your business partner or your GM. Work through it together and go home with a shared plan instead of a summary.',
  offer: 'Second ticket half off',
  code: 'BAC',
} as const;
