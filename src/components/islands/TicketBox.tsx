import Countdown from './Countdown';
import { useHasPassed } from '../../lib/useCountdown';

export interface TierData {
  id: string;
  name: string;
  badge?: string;
  priceWas?: number;
  price: number;
  href?: string;
  opensAfterEarlyBird?: boolean;
  opensLabel?: string;
  window: string;
  cta: string;
  featured: boolean;
}

interface Props {
  tiers: TierData[];
  seats: number;
  earlyBirdEndsAt: string;
  earlyBirdEndsLabel: string;
  registrationClosesAt: string;
  registrationClosesLabel: string;
  /** Used by any tier that doesn't carry its own checkout URL. */
  checkoutUrl: string;
  colleagueCode: string;
  /** "SHARPEN 2027 · Jan. 28–29, 2027 · Fort Worth" — stated on every card so
      the year is unmissable before the (older) checkout page loads. */
  eventDate: string;
}

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

export default function TicketBox({
  tiers,
  seats,
  earlyBirdEndsAt,
  earlyBirdEndsLabel,
  registrationClosesAt,
  registrationClosesLabel,
  checkoutUrl,
  colleagueCode,
  eventDate,
}: Props) {
  /* Once Early Bird closes the block collapses to the Regular card and the
     clock switches to the hard registration close — exactly the behaviour the
     page outline asks for, handled here rather than by a manual edit. */
  const earlyBirdOver = useHasPassed(earlyBirdEndsAt);

  const visible = earlyBirdOver ? tiers.filter((t) => t.id !== 'early-bird') : tiers;
  const clockTarget = earlyBirdOver ? registrationClosesAt : earlyBirdEndsAt;
  const clockLabel = earlyBirdOver
    ? `Registration closes ${registrationClosesLabel}`
    : `Early Bird ends ${earlyBirdEndsLabel}`;

  return (
    <div className="flex flex-col items-center gap-14 landscape:gap-12">
      {/* ---- the cards ---- */}
      <div
        className={[
          'grid w-full gap-6',
          visible.length > 1
            ? 'max-w-[66rem] grid-cols-2 landscape:max-w-[34rem] landscape:grid-cols-1'
            : 'max-w-[34rem] grid-cols-1',
        ].join(' ')}
      >
        {visible.map((tier) => {
          /* Regular is on show but not on sale until Early Bird closes: the
             price is visible so the saving reads, the card is muted, and the
             CTA is a plain span — there is nothing to click, not a link that
             looks disabled. */
          const locked = !earlyBirdOver && !!tier.opensAfterEarlyBird;

          return (
            <div
              key={tier.id}
              className={[
                'flex flex-col p-10 tablet:p-9 portrait:p-7',
                tier.featured
                  ? 'bg-gray-900 text-white ring-1 ring-inset ring-white/10'
                  : locked
                    ? 'bg-gray-50 text-slate ring-1 ring-inset ring-line'
                    : 'bg-white text-ink ring-1 ring-inset ring-line',
              ].join(' ')}
              aria-disabled={locked || undefined}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className={['label', tier.featured ? 'text-white/60' : 'text-slate'].join(' ')}>
                  {tier.name}
                </h3>
                {tier.badge && (
                  <span className="label inline-flex shrink-0 items-center bg-gold px-2.5 py-1 text-gray-900">
                    {tier.badge}
                  </span>
                )}
                {locked && tier.opensLabel && (
                  <span className="label inline-flex shrink-0 items-center bg-gray-200 px-2.5 py-1 text-slate">
                    {tier.opensLabel}
                  </span>
                )}
              </div>

              <p className={['mt-3 text-body', tier.featured ? 'text-white/80' : 'text-slate'].join(' ')}>
                {eventDate}
              </p>

              <div className="mt-7 flex items-end gap-4">
                <span
                  className={[
                    'font-display text-price font-black',
                    locked ? 'text-slate-soft' : '',
                  ].join(' ')}
                >
                  {money(tier.price)}
                </span>
                {tier.priceWas && (
                  <span
                    className={[
                      'mb-2 font-display text-numeral leading-none font-black line-through',
                      tier.featured ? 'text-white/35' : 'text-slate-soft',
                    ].join(' ')}
                  >
                    {money(tier.priceWas)}
                  </span>
                )}
              </div>

              <p className={['label mt-5', tier.featured ? 'text-white/60' : 'text-slate'].join(' ')}>
                {tier.window}
              </p>

              {locked ? (
                <p className="label mt-9 inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-dashed border-line px-6 py-4.5 text-slate-soft portrait:py-4">
                  Not yet on sale
                </p>
              ) : (
                <a
                  href={tier.href ?? checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'label mt-9 inline-flex w-full items-center justify-center gap-2 rounded-[2px] px-6 py-4.5 transition-colors duration-200 portrait:py-4',
                    tier.featured
                      ? 'bg-brand text-white hover:bg-brand-deep'
                      : 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
                  ].join(' ')}
                >
                  {tier.cta}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* ---- the clock ---- */}
      <Countdown to={clockTarget} label={clockLabel} tone="dark" />

      {/* ---- scarcity ----
           The closing argument of the section, so it is the one line here set
           at display size — bigger than "Get your tickets" above it, which is
           only a label. The break is forced at the period rather than left to
           the wrapper, so the two sentences stay two beats the way the hero's
           headline pair does. "50 seats" is the only red text on this grey
           ground: red is already the page's accent, so the number is marked
           without inventing a highlight treatment for it.

           Portrait drops back to heading size, because the page's convention
           for display type is one whole sentence per line and "When they're
           gone, they're gone." is too long to hold that in a 375px column —
           at 41.6px it strands a two-word fragment on a line of its own. At
           heading size the comma break falls where it should. */}
      <div className="flex w-full flex-col items-center">
        <p className="text-center font-display text-display font-black tracking-[-0.02em] text-ink-deep portrait:text-heading">
          <span className="block">
            Only <span className="text-brand">{seats} seats</span>.
          </span>
          <span className="block">When they&rsquo;re gone, they&rsquo;re gone.</span>
        </p>

        <p className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-body text-slate portrait:mt-7">
          Bringing someone? Second ticket half off with code
          <span className="label inline-flex items-center bg-gold px-2 py-1 text-gray-900">{colleagueCode}</span>
        </p>
      </div>
    </div>
  );
}
