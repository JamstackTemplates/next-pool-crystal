/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
const SHORT_DAYS: Record<Day, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

function formatShortTime(hhmm: string): string {
  const hour24 = Number(hhmm.slice(0, 2));
  const min = Number(hhmm.slice(3));
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return min === 0 ? `${hour12} ${suffix}` : `${hour12}:${String(min).padStart(2, '0')} ${suffix}`;
}

function zonedClock(timeZone: string, now: Date): { index: number; current: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return null;
  return { index, current: Number(part('hour')) * 60 + Number(part('minute')) };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  const zoned = zonedClock(timeZone, now);
  if (!zoned) return fallback;
  const { index, current } = zoned;
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return `Open now · until ${today.closes}`;
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
    }
  }
  return 'Closed · see opening hours';
}

export interface PhoneStatus {
  open: boolean;
  label: string;
}

/**
 * Pool-service phone pill status in the business time zone.
 * Example open: "Phones open · until 5 pm"
 * Example closed: "Phones closed · opens Mon 7 am"
 */
export function phoneStatus(
  hours: readonly OpeningHours[],
  timeZone: string,
  fallbackLabel: string,
  now = new Date(),
): PhoneStatus {
  if (!timeZone) return { open: false, label: fallbackLabel };
  validateHours(hours);
  const zoned = zonedClock(timeZone, now);
  if (!zoned) return { open: false, label: fallbackLabel };
  const { index, current } = zoned;
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { open: true, label: `Phones open · until ${formatShortTime(today.closes)}` };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      const dayLabel = offset === 0 ? 'today' : SHORT_DAYS[day];
      return { open: false, label: `Phones closed · opens ${dayLabel} ${formatShortTime(entry.opens)}` };
    }
  }
  return { open: false, label: fallbackLabel };
}

/** Returns 'Mon'–'Fri' for weekdays in the business zone, or null on weekends / invalid zone. */
export function currentRouteWeekday(timeZone: string, now = new Date()): 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | null {
  const zoned = zonedClock(timeZone, now);
  if (!zoned) return null;
  const day = DAYS[zoned.index];
  if (day === 'Saturday' || day === 'Sunday') return null;
  return SHORT_DAYS[day] as 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
}
