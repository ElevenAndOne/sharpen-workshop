import { useState } from 'react';

export interface FaqData {
  q: string;
  a: string;
  pending?: boolean;
}

interface Props {
  items: FaqData[];
}

export default function FaqAccordion({ items }: Props) {
  /* First question open by default — the rest collapsed. */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="group flex w-full items-start gap-6 py-6 text-left portrait:gap-4 portrait:py-5"
              >
                <span
                  className="mt-1.5 font-mono text-small tabular-nums text-slate-soft"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-body leading-snug font-black tracking-[-0.015em] text-ink-deep transition-colors duration-200 group-hover:text-brand portrait:text-body">
                  {item.q}
                </span>
                <span className="relative mt-2 size-4 shrink-0 text-ink-deep" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 h-[2px] w-4 -translate-y-1/2 bg-current" />
                  <span
                    className={[
                      'absolute top-0 left-1/2 h-4 w-[2px] -translate-x-1/2 bg-current transition-transform duration-300',
                      isOpen ? 'scale-y-0' : 'scale-y-100',
                    ].join(' ')}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              data-open={isOpen}
              inert={!isOpen}
              className="accordion-body"
            >
              <div>
                <div className="pr-10 pb-7 pl-[3.1rem] portrait:pr-0 portrait:pl-0">
                  <p className="max-w-[62ch] text-body text-slate">{item.a}</p>
                  {item.pending && (
                    <p className="label mt-3 inline-flex items-center bg-gold-tint px-3 py-1.5 text-gold-deep">
                      Awaiting client sign-off
                    </p>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
