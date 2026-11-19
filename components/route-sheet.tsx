'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { ROUTE_DAYS, serviceArea, type RouteDay } from '../content/service-area';
import { currentRouteWeekday } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Laminated Mon–Fri route sheet clipped to a clipboard.
 * Static HTML highlights no day. In the browser, highlights today's weekday in America/Los_Angeles.
 * On weekends highlights nothing and shows "Routes run Monday to Friday".
 */
export function RouteSheet() {
  const [status, setStatus] = useState<{ hydrated: boolean; today: RouteDay | null }>({
    hydrated: false,
    today: null,
  });

  useEffect(() => {
    const zone = site.timeZone || business.timeZone;
    const update = () => {
      setStatus({ hydrated: true, today: currentRouteWeekday(zone) });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const isWeekend = status.hydrated && status.today === null;

  return (
    <div className="relative rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-5 shadow-[5px_5px_0_var(--art-stroke)] sm:p-7">
      {/* Clipboard metal clip accent at top center */}
      <div
        className="mx-auto -mt-9 mb-5 flex h-7 w-28 items-center justify-center rounded-t-md border-2 border-[var(--art-stroke)] bg-shallow"
        aria-hidden="true"
      >
        <span className="h-1.5 w-12 rounded-full bg-[var(--art-stroke)]" />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-border pb-3">
        <span className="font-mono-reading text-xs font-semibold uppercase tracking-wider text-muted">
          OC Coastal Route Sheet · Mon–Fri
        </span>
        {isWeekend ? (
          <span className="rounded-tile border border-border bg-sand px-2.5 py-1 font-mono-reading text-xs font-semibold text-ink">
            Routes run Monday to Friday
          </span>
        ) : status.today ? (
          <span className="rounded-tile border border-[var(--art-stroke)] bg-test-yellow px-2.5 py-1 font-mono-reading text-xs font-bold text-[#0A2A3D]">
            Today’s route: {status.today}
          </span>
        ) : (
          <span className="font-mono-reading text-xs text-muted">America/Los_Angeles</span>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ROUTE_DAYS.map(day => {
          const cities = serviceArea.filter(city => city.routeDay === day);
          const isToday = status.today === day;
          return (
            <div
              key={day}
              className={`rounded-tile border-2 p-3.5 transition-colors ${
                isToday
                  ? 'border-[var(--art-stroke)] bg-shallow shadow-[2px_2px_0_var(--art-stroke)]'
                  : 'border-border bg-plaster'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2 border-b border-border pb-1.5">
                <span className="font-mono-reading text-sm font-bold uppercase tracking-wider text-ink">
                  {day}
                </span>
                {isToday ? (
                  <span className="rounded-tile bg-primary px-1.5 py-0.5 font-mono-reading text-[0.65rem] font-bold uppercase text-on-primary">
                    Today
                  </span>
                ) : null}
              </div>

              <ul className="space-y-2">
                {cities.map(city => (
                  <li key={city.id}>
                    <span className="block font-display-wide text-sm text-ink">{city.name}</span>
                    <span className="block font-mono-reading text-xs text-muted">{city.zip}</span>
                    {city.note ? (
                      <span className="mt-0.5 block text-xs text-muted">{city.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
