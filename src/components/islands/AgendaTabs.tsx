import { useRef, useState } from 'react';

export interface SessionData {
  time: string;
  track: string | null;
  title: string;
  description?: string;
  speakerTbd?: boolean;
  interlude?: boolean;
}

export interface DayData {
  id: string;
  dayLabel: string;
  date: string;
  theme: string;
  sessions: SessionData[];
}

interface Props {
  days: DayData[];
}

export default function AgendaTabs({ days }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = days.length - 1;
    let next: number | null = null;

    if (e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;

    if (next !== null) {
      e.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-10 landscape:gap-8">
      {/* Day tabs */}
      <div
        role="tablist"
        aria-label="Agenda by day"
        onKeyDown={onKeyDown}
        className="flex gap-3 portrait:flex-col"
      >
        {days.map((day, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={day.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${day.id}`}
              aria-selected={selected}
              aria-controls={`panel-${day.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={[
                'flex flex-1 flex-col items-start gap-1.5 rounded-[2px] px-6 py-5 text-left transition-colors duration-200 portrait:px-5 portrait:py-4',
                selected
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-ink ring-1 ring-inset ring-line hover:ring-gray-400',
              ].join(' ')}
            >
              <span
                className={[
                  'label',
                  selected ? 'text-white/60' : 'text-slate',
                ].join(' ')}
              >
                {day.dayLabel} — {day.date}
              </span>
              <span className="font-display text-body leading-tight font-black tracking-[-0.01em] portrait:text-body">
                {day.theme}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {days.map((day, i) => (
        <div
          key={day.id}
          role="tabpanel"
          id={`panel-${day.id}`}
          aria-labelledby={`tab-${day.id}`}
          hidden={i !== activeIndex}
          tabIndex={0}
        >
          <ol className="flex flex-col" key={`${day.id}-${i === activeIndex ? 'on' : 'off'}`}>
            {day.sessions.map((s, si) => (
              <li
                key={`${day.id}-${si}`}
                style={{ '--i': si } as React.CSSProperties}
                className={[
                  'row-enter grid grid-cols-[8rem_7rem_1fr] items-baseline gap-6 border-t border-line py-5 last:border-b',
                  'tablet:grid-cols-[7rem_6rem_1fr] tablet:gap-5',
                  'landscape:grid-cols-[1fr] landscape:gap-2 landscape:py-4',
                  s.interlude ? 'opacity-50' : '',
                ].join(' ')}
              >
                <span className="font-mono text-small tabular-nums text-slate">
                  {s.time}
                </span>

                {/* Track label sits in its own margin column on desktop and
                    tablet; inline above the title further down. */}
                <span className="landscape:order-first">
                  {s.track ? (
                    <span className="label inline-block border-l border-gray-300 pl-2.5 text-slate">
                      {s.track}
                    </span>
                  ) : null}
                </span>

                <span className="flex flex-col gap-1.5">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <span className="font-display text-body leading-tight font-black tracking-[-0.015em] text-ink-deep">
                        {s.title}
                      </span>
                      {s.speakerTbd && (
                        <span className="inline-flex items-center rounded-[2px] bg-gold-tint px-2 py-0.5 label text-gold-deep">
                          Speaker TBD
                        </span>
                      )}
                    </span>
                  {s.description && (
                    <span className="max-w-[64ch] text-body text-slate">{s.description}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
