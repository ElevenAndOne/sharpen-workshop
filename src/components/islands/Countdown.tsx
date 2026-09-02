import { useCountdown } from '../../lib/useCountdown';

interface Props {
  to: string;
  label: string;
  tone?: 'light' | 'dark';
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Each digit sits in a clipped box. When a value changes the new digit slides
 * up into the box from below — a split-flap motion, not a fade.
 */
export default function Countdown({ to, label, tone = 'dark' }: Props) {
  const r = useCountdown(to);

  const cells: Array<[string, string]> = r
    ? [
        [pad(r.days), r.days === 1 ? 'day' : 'days'],
        [pad(r.hours), 'hours'],
        [pad(r.minutes), 'minutes'],
        [pad(r.seconds), 'seconds'],
      ]
    : [
        ['--', 'days'],
        ['--', 'hours'],
        ['--', 'minutes'],
        ['--', 'seconds'],
      ];

  const light = tone === 'light';

  return (
    <div className="flex flex-col items-center gap-4">
      <p className={['label', light ? 'text-white/55' : 'text-slate'].join(' ')}>{label}</p>

      <div className="flex items-stretch justify-center gap-4 portrait:gap-2.5" role="timer" aria-live="off">
        {cells.map(([value, unit]) => (
          <div
            key={unit}
            className={[
              /* fixed, identical width — never sized by the word inside */
              'flex w-[6.75rem] flex-col items-center gap-2.5 px-2 py-4 tablet:w-[6rem] portrait:w-[4.9rem] portrait:py-3',
              light ? 'bg-white/8 ring-1 ring-inset ring-white/12' : 'bg-white ring-1 ring-inset ring-line',
            ].join(' ')}
          >
            {/* the clip box: exactly one digit tall */}
            <span
              className={[
                'block h-[1em] overflow-hidden font-display text-heading leading-none font-black tabular-nums',
                light ? 'text-white' : 'text-ink-deep',
              ].join(' ')}
              aria-label={`${value} ${unit}`}
            >
              <span key={value} className="digit-roll block leading-none">
                {value}
              </span>
            </span>
            {/* unit label sits a step below the small size so it never crowds the digit */}
            <span
              className={[
                'text-[0.62rem] leading-none font-black tracking-[0.12em] uppercase',
                light ? 'text-white/45' : 'text-slate-soft',
              ].join(' ')}
            >
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
