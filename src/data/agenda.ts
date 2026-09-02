export type Track =
  | 'Release' | 'Build' | 'Multiply' | 'Forecast'
  | 'Execute' | 'Position' | 'Profit' | null;

export interface Session {
  time: string;
  track: Track;
  title: string;
  /** One line on what happens in the room. From chefdeb.com/sharpen-2027/. */
  description?: string;
  /** Speaker not yet locked — renders as a chip. */
  speakerTbd?: boolean;
  /** Breaks and meals render quietly. */
  interlude?: boolean;
}

export interface Day {
  id: string;
  dayLabel: string;
  date: string;
  theme: string;
  sessions: Session[];
}

export const days: Day[] = [
  {
    id: 'day-1',
    dayLabel: 'Day 1',
    date: 'Thurs. Jan. 28',
    theme: 'People & Strategy',
    sessions: [
      { time: '9:00 – 9:30 am', track: 'Release', title: 'Opening session: Let it go to move forward',
        description: "Name what you're still carrying from last year and decide, on paper, what you're putting down before you plan anything new." },
      { time: '9:30 – 11:00 am', track: 'Build', title: 'The people decision: right people, right seats',
        description: 'Map every role in your business against the person currently in it, and work out which mismatches are costing you the most.' },
      { time: '11:00 – 11:15 am', track: null, title: 'Break', interlude: true },
      { time: '11:15 – 12:45 pm', track: 'Build', title: 'Panel: How I built my team',
        description: "Owners who've hired, fired, and rebuilt talk through what actually worked — and what they'd never do again." },
      { time: '12:45 – 1:45 pm', track: null, title: 'Lunch', interlude: true },
      { time: '1:45 – 2:45 pm', track: 'Multiply', title: 'AI as your execution multiplier', speakerTbd: true,
        description: 'Where AI actually saves a small food, beverage or hospitality operation time — and where it quietly creates more work.' },
      { time: '2:45 – 4:15 pm', track: 'Forecast', title: "2027 industry forecast: what's actually changing",
        description: 'Costs, labor, and client expectations heading into 2027, and what each one should change about your plan.' },
      { time: '4:15 – 4:30 pm', track: null, title: 'Break', interlude: true },
      { time: '4:30 – 5:00 pm', track: null, title: "Breakout with today's speaker",
        description: 'Small-group time to take one thing from the day and apply it to your own numbers.' },
    ],
  },
  {
    id: 'day-2',
    dayLabel: 'Day 2',
    date: 'Fri. Jan. 29',
    theme: 'Execution & Cash',
    sessions: [
      { time: '9:00 – 9:15 am', track: null, title: 'Welcome back / Day 2 kickoff' },
      { time: '9:15 – 10:00 am', track: null, title: 'Q&A recap' },
      { time: '10:00 – 10:15 am', track: null, title: 'Break', interlude: true },
      { time: '10:15 – 11:15 am', track: 'Execute', title: 'The execution decision: daily huddles, rocks & accountability',
        description: 'Set the rhythm that keeps the plan alive after you go home — who reports what, and how often.' },
      { time: '11:15 – 12:15 pm', track: 'Position', title: 'Panel: Positioning & differentiation',
        description: 'Owners in different corners of the industry on how they stopped competing on price.' },
      { time: '12:15 – 1:15 pm', track: null, title: 'Lunch', interlude: true },
      { time: '1:15 – 2:15 pm', track: 'Position', title: 'Marketing & PR mastery', speakerTbd: true,
        description: "Getting attention you didn't pay for, and turning it into booked work." },
      { time: '2:15 – 2:30 pm', track: null, title: 'Break', interlude: true },
      { time: '2:30 – 3:30 pm', track: 'Profit', title: 'The cash decision: Power of One & profitability by design',
        description: 'Run your own numbers through the Power of One and see which single lever moves your cash the furthest.' },
      { time: '3:30 – 4:30 pm', track: 'Profit', title: 'Bringing it together: your 2027 roadmap',
        description: 'Finish your One-Page Strategic Plan, prioritized, with dates against it before you leave the room.' },
      { time: '4:30 – 5:00 pm', track: null, title: "Breakout with today's speaker",
        description: "Last chance to pressure-test your plan with someone who's done it." },
    ],
  },
];

export interface AddOn {
  day: string;
  time: string;
  title: string;
  note?: string;
}

export const addOns: AddOn[] = [
  { day: 'Wed. Jan. 27', time: '1:00 pm', title: 'Savor Culinary Services kitchen tour' },
  { day: 'Wed. Jan. 27', time: '4:00 – 6:00 pm', title: 'In-flight round table on aircraft' },
  { day: 'Wed. Jan. 27', time: '6:00 pm', title: 'Welcome dinner, location TBD', note: 'Additional cost, RSVP' },
  { day: 'Sat. Jan. 30', time: 'All day', title: 'Mastermind Day', note: 'Coaching clients only' },
];
