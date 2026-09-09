export interface Hotel {
  name: string;
  href: string;
  /** Recent nightly average as published by the client; "Check rates" when none. */
  rate?: string;
}

export interface StayArea {
  area: string;
  blurb: string;
  hotels: Hotel[];
}

export const stayIntro =
  'No room block — book direct at whichever hotel suits you. Rates are recent nightly averages and change daily, so please verify before booking. Several attendees split an Airbnb each year.';

export const stayAreas: StayArea[] = [
  {
    area: 'Historic Stockyards',
    blurb: 'Walkable district with restaurants and bars, a short drive south of the venue.',
    hotels: [
      /* No published rate for Drover, so it says "Check rates" rather than
         carrying a number nobody has verified. */
      { name: 'Hotel Drover, Autograph Collection', href: 'https://hoteldrover.com/' },
      { name: 'Hyatt Place Fort Worth / Historic Stockyards', href: 'https://www.hyatt.com/hyatt-place/en-US/dfwzf-hyatt-place-fort-worth-historic-stockyards', rate: '~$269 / night' },
      { name: 'Courtyard by Marriott Fort Worth Historic Stockyards', href: 'https://www.marriott.com/en-us/hotels/dfwcn-courtyard-fort-worth-historic-stockyards/overview/', rate: '~$267 / night' },
      { name: 'SpringHill Suites by Marriott Fort Worth Historic Stockyards', href: 'https://www.marriott.com/en-us/hotels/dfwsy-springhill-suites-fort-worth-historic-stockyards/overview/', rate: '~$340 / night' },
    ],
  },
  {
    area: 'Fossil Creek',
    blurb: 'Quieter and more cost effective, north of the venue off I-35W.',
    hotels: [
      { name: 'DoubleTree by Hilton Fort Worth Fossil Creek', href: 'https://www.hilton.com/en/hotels/dfwmtdt-doubletree-fort-worth-fossil-creek/', rate: '~$129 / night' },
      { name: 'Hilton Garden Inn Fort Worth / Fossil Creek', href: 'https://www.hilton.com/en/hotels/ftwnhgi-hilton-garden-inn-fort-worth-fossil-creek/' },
    ],
  },
];
