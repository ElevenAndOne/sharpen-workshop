export interface FaqItem {
  q: string;
  a: string;
  /** Answer needs client sign-off before launch. */
  pending?: boolean;
}

/** Five, not fifteen. Answers match chefdeb.com/sharpen-2027/. */
export const faqs: FaqItem[] = [
  {
    q: "What's included?",
    a: 'Both full days, breakfast and lunch daily, all worksheets and materials, and your 2027 One-Page Strategic Plan. Travel and lodging are on you.',
  },
  {
    q: 'Do I need to be a coaching client?',
    a: 'No. SHARPEN is open to any established food, beverage or hospitality business owner.',
  },
  {
    q: 'Will this apply to my kind of business?',
    a: "Restaurants, catering, personal chef work, bars, bakeries, hotels, private clubs — the room is mixed on purpose. There is no ONE plan for ALL food, beverage and hospitality businesses. That's the point — you build yours.",
  },
  {
    q: "What's the refund policy?",
    a: 'Refund and transfer terms are being confirmed with Chef Deb\u2019s team and will be published here before registration opens.',
    pending: true,
  },
  {
    q: 'What airport should I fly into?',
    a: 'DFW International or Dallas Love Field both work; DFW is the closer drive to the venue at Meacham.',
  },
];
