import Countdown from './Countdown';
import { useHasPassed } from '../../lib/useCountdown';

export interface TierData {
  id: string;
  name: string;
  badge?: string;
  priceWas?: number;
  price: number;
  code?: string;
  window: string;
  cta: string;
  featured: boolean;
  fine?: string;
}

interface Props {
  tiers: TierData[];
  seats: number;
  earlyBirdEndsAt: string;
  earlyBirdEndsLabel: string;
  registrationClosesAt: string;
  registrationClosesLabel: string;
  /** Pre-built checkout URLs keyed by coupon code, plus a bare `default`. */
  checkoutUrls: Record<string, string>;
  colleagueCode: string;
  /** "SHARPEN 2027 · Jan. 28–29, 2027 · Fort Worth" — stated on every card so
      the year is unmissable before the (older) Thrivecart page loads. */
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
  checkoutUrls,
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
          const href = tier.code ? (checkoutUrls[tier.code] ?? checkoutUrls.default) : checkoutUrls.default;

          return (
            <div
              key={tier.id}
              className={[
                'flex flex-col p-10 tablet:p-9 portrait:p-7',
                tier.featured
                  ? 'bg-gray-900 text-white ring-1 ring-inset ring-white/10'
                  : 'bg-white text-ink ring-1 ring-inset ring-line',
              ].join(' ')}
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
              </div>

              <p className={['mt-3 text-body', tier.featured ? 'text-white/80' : 'text-slate'].join(' ')}>
                {eventDate}
              </p>

              <div className="mt-7 flex items-end gap-4">
                <span className="font-display text-price font-black">{money(tier.price)}</span>
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
                {tier.code && (
                  <>
                    <span className="mx-2 opacity-40">·</span>
                    Code <span className={tier.featured ? 'text-gold' : 'text-brand'}>{tier.code}</span>
                  </>
                )}
              </p>

              <a
                href={href}
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

              {tier.fine && (
                <p
                  className={[
                    'mt-4 text-center text-small',
                    tier.featured ? 'text-white/45' : 'text-slate-soft',
                  ].join(' ')}
                >
                  {tier.fine}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ---- the clock ---- */}
      <Countdown to={clockTarget} label={clockLabel} tone="dark" />

      {/* ---- two facts that help people act ---- */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-line pt-8 text-body text-ink portrait:flex-col portrait:gap-y-2">
        <p className="flex items-center gap-2.5">
          <span className="size-1.5 rotate-45 bg-brand" aria-hidden="true" />
          Limited to {seats} attendees
        </p>
        <span className="size-1.5 rotate-45 bg-gold portrait:hidden" aria-hidden="true" />
        <p className="flex items-center gap-2.5">
          Bringing someone? Second ticket half off with code
          <span className="label inline-flex items-center bg-gold px-2 py-1 text-gray-900">{colleagueCode}</span>
        </p>
      </div>
    </div>
  );
}
