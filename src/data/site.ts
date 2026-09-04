/** Single source of truth for event facts, links and navigation. */

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
   * Hero copy. The headline pair leads; the subhead names the audience; the
   * paragraph below it matches chefdeb.com/sharpen-2027/ verbatim.
   */
  hero: {
    /* Non-breaking space keeps the wrap on the sentence break, not after "A". */
    headline: 'Two days. A\u00A0different 2027.',
    subhead:
      "The must-attend event for Food, Beverage & Hospitality leaders shaping what's next",
    heading: "SHARPEN isn't another conference that talks at you.",
    body: "It's two days of working on your business instead of in it, next to owners who understand exactly what you're carrying.",
    lines: [
      'Fifty seats. No fluff. Nobody selling you a course from the stage.',
      "Because there is no ONE plan for ALL food, beverage and hospitality businesses — you'll leave with yours, written down and prioritized for 2027.",
    ],
  },
  /** Early Bird window. */
  earlyBirdEndsLabel: 'Nov. 30',
  earlyBirdEndsAt: '2026-11-30T23:59:00-06:00',
} as const;

export const links = {
  /** Priority #1 from the brief — every ticket CTA lands here. */
  checkout: 'https://chefdeb.thrivecart.com/sharpen-workshop-2025/',
  agendaPdf:
    'https://drive.google.com/file/d/1ooP31dJ9afG9drNj2qdD1t9_Fbhfs8Uw/view?usp=sharing',
  sponsorEnquiry: 'mailto:deb@chefdeb.com?subject=SHARPEN%202027%20Sponsorship',
  home: 'https://chefdeb.com/',
  /**
   * The reel and short listed in the page outline are NOT Chef Deb's content
   * (the short is a Mel Robbins clip; the reel is from another account), so
   * neither is linked. Until the real 60-second cut is supplied, the video
   * block sends people to Chef Deb's Instagram.
   */
  instagram: 'https://www.instagram.com/chefdebcoaching',
} as const;

/**
 * Build a Thrivecart URL with a coupon pre-applied so the code the page
 * advertises is already in the cart when the buyer lands.
 */
export function checkoutUrl(coupon?: string): string {
  if (!coupon) return links.checkout;
  const url = new URL(links.checkout);
  url.searchParams.set('coupon', coupon);
  return url.toString();
}

export const nav = [
  { label: 'The Details', href: '#details' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Sponsors', href: '#sponsor' },
  { label: 'Stay', href: '#stay' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const contacts = [
  {
    name: 'Chef Deb',
    email: 'deb@chefdeb.com',
    phone: '512-879-7751',
    phoneHref: 'tel:+15128797751',
  },
] as const;

/** Verified against the links in chefdeb.com's own header. */
export const social = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/chefdebcoaching' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/chef-deb' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/chefdebcoaching' },
] as const;
