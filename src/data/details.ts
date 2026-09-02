import { event } from './site';

export interface DetailBlock {
  index: string;
  label: string;
  lines: string[];
  note?: string;
  link?: { label: string; href: string };
}

/** Section 3 — four blocks, same shape as the WTSFest reference. */
export const details: DetailBlock[] = [
  {
    index: '01',
    label: 'Date & Time',
    lines: [event.dateLine, event.timeLine],
  },
  {
    index: '02',
    label: 'Location',
    lines: [event.venue.name, event.venue.detail],
    note: event.venue.note,
    link: { label: 'Open in Maps', href: event.venue.mapsUrl },
  },
  {
    index: '03',
    label: 'Ticket includes',
    lines: [
      'Both full days',
      'Breakfast and lunch daily',
      'All worksheets and materials',
      'Your 2027 One-Page Strategic Plan',
    ],
  },
  {
    index: '04',
    label: 'Please note',
    lines: [
      'Built for established owners — 1+ year in business, $50K+ gross revenue.',
      `Limited to ${event.seats} attendees.`,
    ],
  },
];
