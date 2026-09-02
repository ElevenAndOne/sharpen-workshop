import { useCallback, useEffect, useRef, useState } from 'react';
import { useHasPassed } from '../../lib/useCountdown';

export interface NavItem {
  label: string;
  href: string;
}

interface Props {
  items: NavItem[];
  checkoutHref: string;
  logoSrc: string;
  earlyPrice: number;
  regularPrice: number;
  earlyBirdEndsAt: string;
  initialEarly: boolean;
}

/** Matches the `landscape` breakpoint (<= 1023px) where the drawer takes over. */
const DRAWER_QUERY = '(max-width: 1023px)';

export default function SiteNav({
  items,
  checkoutHref,
  logoSrc,
  earlyPrice,
  regularPrice,
  earlyBirdEndsAt,
  initialEarly,
}: Props) {
  const passed = useHasPassed(earlyBirdEndsAt);
  const price = `$${(passed === null ? initialEarly : !passed) ? earlyPrice : regularPrice}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  /* Distance from the top of the viewport to the bottom of the sticky bar.
     Not the bar's height — the announcement ticker sits above it until it
     scrolls away, so the two differ by the ticker's height at the top of
     the page and the drawer would tuck in behind the bar. */
  const [barBottom, setBarBottom] = useState(72);

  const close = useCallback(() => setOpen(false), []);

  /* Compact the bar once the announcement ticker has scrolled away, and keep
     the drawer's offset in step with it. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const rect = barRef.current?.getBoundingClientRect();
      if (rect) setBarBottom(rect.bottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const ids = items
      .map((i) => i.href)
      .filter((h) => h.startsWith('#'))
      .map((h) => h.slice(1));

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (!nodes.length) return;

    /* Track every section's intersection state so the highlight clears when
       nothing is in the band (the hero, the footer) instead of sticking. */
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        const first = ids.find((id) => inView.has(id));
        setActive(first ? `#${first}` : null);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  /* Drawer: scroll lock, Escape, focus management, focus trap. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      triggerRef.current?.focus();
    };
  }, [open, close]);

  /* The drawer opens directly beneath the bar, so measure it rather than
     hard-coding an offset that drifts when the logo scales. */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const measure = () => setBarBottom(el.getBoundingClientRect().bottom);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  /* Never leave the drawer mounted when we cross up into tablet/desktop. */
  useEffect(() => {
    const mq = window.matchMedia(DRAWER_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const linkBase =
    'relative label transition-colors duration-200';

  return (
    <>
      <div
        ref={barRef}
        className={[
          'sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300',
          scrolled || open
            ? 'border-white/10 bg-gray-900/95 backdrop-blur-md'
            : 'border-transparent bg-gray-900',
        ].join(' ')}
      >
        <div className="relative z-1 mx-auto flex w-full max-w-wide items-center justify-between gap-8 px-10 tablet:px-8 tablet:gap-6 landscape:px-6 portrait:px-5">
          <a
            href="#top"
            className="flex items-center gap-3.5 py-4 text-white transition-opacity duration-200 hover:opacity-80"
            onClick={close}
          >
            <span
              className="inline-block shrink-0 bg-current"
              style={{
                height: 46,
                aspectRatio: '1528 / 1020',
                transform: scrolled ? 'scale(0.83)' : 'scale(1)',
                transformOrigin: 'left center',
                WebkitMaskImage: `url(${logoSrc})`,
                maskImage: `url(${logoSrc})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
              }}
              role="img"
              aria-label="Chef Deb Coaching"
            />
            <span className="h-8 w-px bg-white/20 landscape:hidden" aria-hidden="true" />
            <span className="flex flex-col leading-none landscape:hidden">
              <span className="font-display text-body font-black tracking-[-0.01em]">
                SHARPEN 2027
              </span>
              <span className="mt-1 label text-white/55">
                Fort Worth
              </span>
            </span>
          </a>

          {/* Desktop + tablet nav */}
          <nav aria-label="Page sections" className="landscape:hidden">
            <ul className="flex items-center gap-9 tablet:gap-6">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? 'true' : undefined}
                    className={[
                      linkBase,
                      active === item.href
                        ? 'text-white'
                        : 'text-white/65 hover:text-white',
                    ].join(' ')}
                  >
                    {item.label}
                    <span
                      className={[
                        'absolute -bottom-1.5 left-0 h-0.5 bg-brand transition-[width] duration-300',
                        active === item.href ? 'w-full' : 'w-0',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] bg-brand px-5 py-3 font-display label text-white transition-colors duration-200 hover:bg-brand-deep portrait:px-4 portrait:py-2.5 portrait:text-small"
            >
              Grab your seat
              <span className="text-white/70 portrait:hidden">{price}</span>
            </a>

            {/* Drawer trigger — landscape and portrait only */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="hidden size-11 shrink-0 items-center justify-center rounded-[2px] border border-white/25 text-white transition-colors duration-200 hover:border-white/60 landscape:flex"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={[
                    'absolute left-0 block h-[2px] w-5 bg-current transition-transform duration-300',
                    open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute top-1/2 left-0 block h-[2px] w-5 -translate-y-1/2 bg-current transition-opacity duration-200',
                    open ? 'opacity-0' : 'opacity-100',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 block h-[2px] w-5 bg-current transition-transform duration-300',
                    open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — landscape and portrait only */}
      {open && (
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-x-0 bottom-0 z-40 hidden overflow-y-auto overscroll-contain bg-gray-900 landscape:block"
        style={{ top: barBottom }}
      >

        <div className="relative z-1 flex min-h-full flex-col px-6 pt-8 pb-10 portrait:px-5">
          <nav aria-label="Page sections">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <li key={item.href} className="border-b border-white/10">
                  <a
                    href={item.href}
                    onClick={close}
                    className="group flex items-baseline gap-4 py-5 text-white transition-colors duration-200 hover:text-white/70"
                  >
                    <span
                      className="font-mono text-small tabular-nums text-white/35"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-heading leading-none font-black tracking-[-0.02em]">
                      {item.label}
                    </span>
                    <span
                      className="ml-auto translate-x-0 text-white/30 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-brand px-6 py-4.5 font-display text-body font-black tracking-[0.09em] text-white uppercase"
            >
              Grab your seat — {price}
            </a>
            <p className="mt-4 text-center label text-white/45">
              50 seats · Jan. 28–29, 2027 · Fort Worth
            </p>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
