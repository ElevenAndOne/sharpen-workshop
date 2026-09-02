import { useEffect, useState } from 'react';

export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function diff(target: number, now: number): Remaining {
  const total = Math.max(0, target - now);
  const s = Math.floor(total / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    total,
  };
}

/**
 * Ticking countdown to an ISO date.
 *
 * Returns `null` on the server and for the first client paint so the markup
 * is identical on both sides — no hydration mismatch from a live clock.
 */
export function useCountdown(iso: string): Remaining | null {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(iso).getTime();
    if (Number.isNaN(target)) return;

    const tick = () => setRemaining(diff(target, Date.now()));
    tick();

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [iso]);

  return remaining;
}

/** True once the date has passed. `null` while still undetermined. */
export function useHasPassed(iso: string): boolean | null {
  const [passed, setPassed] = useState<boolean | null>(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    setPassed(Number.isNaN(target) ? false : Date.now() > target);
  }, [iso]);
  return passed;
}
