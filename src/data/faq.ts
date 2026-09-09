export interface FaqItem {
  q: string;
  a: string;
}

/** Five, not fifteen. Answers match chefdeb.com/sharpen-2027/. */
export const faqs: FaqItem[] = [
  {
    q: "What's included?",
    a: 'Both full days, lunch daily, coffee, tea and snacks throughout, all worksheets and materials, and your 2027 One-Page Strategic Plan. Breakfast is not provided. Travel and lodging are on you.',
  },
  {
    q: 'Do I need to be a coaching client?',
    a: 'No. SHARPEN is open to any established food, beverage or hospitality business owner.',
  },
  {
    q: 'Will this apply to my kind of business?',
    a: "Restaurants, catering, personal chef work, bars, bakeries, hotels, private clubs — plus the businesses built around them: culinary-focused accounting firms, marketing agencies, food packaging companies. The room is mixed on purpose. There is no ONE plan for ALL food, beverage and hospitality businesses. That's the point — you build yours.",
  },
  {
    q: "What's the refund policy?",
    a: 'All tickets are non-refundable.',
  },
  {
    q: 'What airport should I fly into?',
    a: 'DFW International or Dallas Love Field both work; DFW is the closer drive to the venue at Meacham.',
  },
];
