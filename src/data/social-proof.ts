import type { ImageMetadata } from 'astro';

/* Sponsor logos — the normalized plates, not the supplied originals. */
import serenityKnives from '../assets/images/sponsors/serenity-knives-logo.png';
import shubuCreative from '../assets/images/sponsors/shubu-tagline-midnight-logo.png';
import supplyClub from '../assets/images/sponsors/supply-club-green-logo.png';
import teva from '../assets/images/sponsors/teva-full-stacked-logo.png';

export interface Testimonial {
  name: string;
  business: string;
  /** Published by the client on chefdeb.com/sharpen-2027/. */
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'I believe this is my 7th SHARPEN. I look forward to attending + connecting every year. It is always a part of my business plan!',
    name: 'Ruth Oesterman',
    business: 'Founder, La Bonne Vie',
  },
  {
    quote: "I learned so much about what's holding me back at SHARPEN — from mindset to marketing. I see a clear path now!",
    name: 'Michelle Hendricks',
    business: 'Reverence Culinary',
  },
  {
    quote: "Stepping away from your biz to learn & work through content that helps you grow is invaluable. The community and opportunity to connect with other chefs provides a sense of camaraderie that I've never found anywhere else.",
    name: 'Bianca Russano',
    business: 'About the Table',
  },
  {
    quote: 'Thank you to the Chef Deb Team who organizes such great workshops. These events always get me going on some level — always learning something new, and I so admire this community for all their successes and ability to laugh at their failures, move on, and continue to grow.',
    name: 'Laura MacDougall',
    business: 'The Wanderlust Table',
  },
];

/** Pull-quote that closes the testimonials block (from the page outline). */
export const pullQuote = "You can't be a victim and wealthy at the same time.";

export interface Sponsor {
  name: string;
  href: string;
  /**
   * Trimmed to its ink bounds by scripts/normalize-sponsor-logos.mjs, so the
   * asset's own aspect ratio is the mark's aspect ratio — which is what lets
   * Sponsors.astro size each logo optically. Never point this at an untrimmed
   * original; a padded canvas renders as a tiny logo in a big box.
   */
  logo: ImageMetadata;
  /** Optical nudge for a mark that still reads light or heavy. 1 = computed. */
  scale?: number;
}

export interface SponsorTier {
  tier: 'Gold' | 'Silver';
  /**
   * Rendered height in px for a square logo in this tier; wider marks step
   * down from it (see Sponsors.astro). Gold sits above Silver because the
   * tiers are a real hierarchy — $750 vs $300 in the sponsorship package.
   */
  base: number;
  sponsors: Sponsor[];
}

export const sponsorTiers: SponsorTier[] = [
  {
    tier: 'Gold',
    base: 68,
    sponsors: [
      { name: 'Serenity Knives', href: 'https://serenityknives.com/', logo: serenityKnives },
      { name: 'ShuBu Creative', href: 'https://shubucreative.com/', logo: shubuCreative },
      { name: 'TEVA Bookkeeping Solutions', href: 'https://tevabookkeeping.com/', logo: teva },
    ],
  },
  {
    tier: 'Silver',
    base: 56,
    sponsors: [
      { name: 'Supply Club', href: 'https://mysupplyclub.com/', logo: supplyClub },
    ],
  },
];

export const sponsorIntro =
  'With the price of everything going up, we take on sponsors so SHARPEN tickets stay affordable — without taking anything away from the experience attendees deserve.';
