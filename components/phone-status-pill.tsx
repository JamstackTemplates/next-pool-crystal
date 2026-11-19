'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { phoneStatus } from '../lib/hours';
import { site } from '../lib/site';

type Props = {
  className?: string;
  /** Compact variant for the site header. */
  compact?: boolean;
};

/**
 * Time-dependent phone status pill.
 * Static / no-JS HTML always renders the neutral phoneHoursSummary.
 * In the browser, computes open/closed in America/Los_Angeles and refreshes every minute.
 */
export function PhoneStatusPill({ className = '', compact = false }: Props) {
  const [state, setState] = useState<{ hydrated: boolean; open: boolean; label: string }>({
    hydrated: false,
    open: false,
    label: business.phoneHoursSummary,
  });

  useEffect(() => {
    const zone = site.timeZone || business.timeZone;
    const update = () => {
      const next = phoneStatus(business.phoneHours, zone, business.phoneHoursSummary);
      setState({ hydrated: true, open: next.open, label: next.label });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const dotClass = !state.hydrated
    ? 'bg-tile'
    : state.open
      ? 'bg-algae'
      : 'bg-test-yellow';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-plaster font-mono-reading text-ink ${
        compact ? 'px-2.5 py-1 text-[0.72rem]' : 'px-3 py-1.5 text-xs'
      } ${className}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{state.label}</span>
    </span>
  );
}
