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
}

export interface SponsorTier {
  tier: 'Gold' | 'Silver';
  sponsors: Sponsor[];
}

export const sponsorTiers: SponsorTier[] = [
  {
    tier: 'Gold',
    sponsors: [
      { name: 'Serenity Knives', href: 'https://serenityknives.com/' },
      { name: 'ShuBu Creative', href: 'https://shubucreative.com/' },
      { name: 'ReTool Marketing', href: 'https://retoolmarketing.com/' },
      { name: 'TEVA', href: 'https://tevabookkeeping.com/' },
    ],
  },
  { tier: 'Silver', sponsors: [{ name: 'Supply Club', href: 'https://mysupplyclub.com/' }] },
];

export const sponsorIntro =
  'With the price of everything going up, we take on sponsors so SHARPEN tickets stay affordable — without taking anything away from the experience attendees deserve.';
