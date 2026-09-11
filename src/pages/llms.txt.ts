import type { APIRoute } from 'astro';
import { event, links, contacts } from '../data/site';
import { tiers, bringAColleague } from '../data/tickets';
import { days } from '../data/agenda';
import { faqs } from '../data/faq';

/**
 * llms.txt — a plain-Markdown brief of the page for answer engines.
 *
 * Honest about what this is: llms.txt is a proposed convention, not a ratified
 * standard, and no major assistant has committed to reading it. It is here
 * because it is nearly free and generated, not because it will move rankings.
 * The real work for AI answerability is the JSON-LD graph in Layout.astro and
 * the fact that the FAQ answers are written as self-contained passages.
 *
 * Everything below is generated from the same data the page renders, so this
 * file cannot drift into telling a model something the page contradicts —
 * which is the actual failure mode of a hand-written one.
 */
export const GET: APIRoute = ({ site }) => {
  const url = new URL('/', site).href;

  /* Windows carry month names, so they are quoted as written rather than
     lower-cased into "through nov. 30". */
  const priceLine = tiers
    .map((t) => `$${t.price} ${t.name} (${t.window})`)
    .join(', ');

  const agenda = days
    .map((d) => {
      const sessions = d.sessions
        .filter((s) => !s.interlude)
        .map((s) => `- ${s.time} — ${s.title}${s.description ? `: ${s.description}` : ''}`)
        .join('\n');
      return `### ${d.dayLabel} — ${d.date} — ${d.theme}\n\n${sessions}`;
    })
    .join('\n\n');

  const faqBlock = faqs.map((f) => `**${f.q}**\n\n${f.a}`).join('\n\n');

  const contactBlock = contacts
    .map((c) => `${c.name}${c.role ? `, ${c.role}` : ''} — ${c.email}, ${c.phone}`)
    .join('\n');

  const body = `# ${event.name}

> A two-day strategic planning workshop for food, beverage and hospitality
> business owners, run by Chef Deb Coaching. ${event.dateLine}, at the
> ${event.venue.name} in ${event.city}. ${event.seats} seats. ${priceLine}.

${event.edition} edition. This is a working session, not a conference: attendees
run their own numbers in the room and leave with a written, prioritised 90-day
plan for 2027. The focus is the three levers an owner already controls — price,
cost and volume. No earnings figure is promised.

## Key facts

- **What it is:** ${event.edition} SHARPEN, a two-day strategic planning workshop.
- **Who it is for:** established food, beverage and hospitality business owners —
  restaurants, catering, personal chef work, bars, bakeries, hotels, private
  clubs — plus the businesses built around them, such as culinary-focused
  accounting firms, marketing agencies and food packaging companies.
- **Dates:** ${event.dateLine}, ${event.timeLine}.
- **Venue:** ${event.venue.name}, ${event.venue.detail}. ${event.venue.note}
- **Capacity:** ${event.seats} seats.
- **Pricing:** ${priceLine}. Registration closes ${event.registrationClosesLabel}.
- **Group offer:** ${bringAColleague.offer} with code ${bringAColleague.code}.
- **Refunds:** all tickets are non-refundable.
- **Registration:** ${links.checkout}
- **Page:** ${url}

## Agenda

${agenda}

## Frequently asked questions

${faqBlock}

## Contact

${contactBlock}

## Organiser

Chef Deb Coaching — ${links.home}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
