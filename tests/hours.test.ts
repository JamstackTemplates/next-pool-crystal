import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  currentRouteWeekday,
  openingLabel,
  phoneStatus,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});

/* Crystal Pools & Spas phone-status pill & route-day tests in America/Los_Angeles */
const poolStatusAt = (isoUtc: string) =>
  phoneStatus(business.phoneHours, 'America/Los_Angeles', business.phoneHoursSummary, new Date(isoUtc));

test('Crystal Pools phone pill: Friday close, Saturday window and Sunday wrap to Mon 7 am', () => {
  // Friday 2026-07-10 in PDT (UTC-7): 16:59 local = 23:59Z, 17:00 local = 2026-07-11T00:00Z
  assert.deepEqual(poolStatusAt('2026-07-10T23:59:00Z'), {
    open: true,
    label: 'Phones open · until 5 pm',
  });
  assert.deepEqual(poolStatusAt('2026-07-11T00:00:00Z'), {
    open: false,
    label: 'Phones closed · opens Sat 8 am',
  });

  // Saturday 2026-07-11 in PDT (UTC-7): 08:00 local = 15:00Z, 12:00 local = 19:00Z
  assert.deepEqual(poolStatusAt('2026-07-11T15:00:00Z'), {
    open: true,
    label: 'Phones open · until 12 pm',
  });
  assert.deepEqual(poolStatusAt('2026-07-11T19:00:00Z'), {
    open: false,
    label: 'Phones closed · opens Mon 7 am',
  });

  // Sunday 2026-07-12 in PDT: closed all day, next opening Mon 7 am
  assert.deepEqual(poolStatusAt('2026-07-12T18:00:00Z'), {
    open: false,
    label: 'Phones closed · opens Mon 7 am',
  });
});

test('Crystal Pools phone pill handles both 2026 America/Los_Angeles DST transitions', () => {
  // Spring forward: Sunday 2026-03-08 -> Monday 2026-03-09 is PDT (UTC-7)
  // 2026-03-08 12:00 PDT = 19:00Z (Sunday -> Mon 7 am)
  assert.deepEqual(poolStatusAt('2026-03-08T19:00:00Z'), {
    open: false,
    label: 'Phones closed · opens Mon 7 am',
  });
  // Monday 2026-03-09 06:59 PDT = 13:59Z, 07:00 PDT = 14:00Z
  assert.deepEqual(poolStatusAt('2026-03-09T13:59:00Z'), {
    open: false,
    label: 'Phones closed · opens today 7 am',
  });
  assert.deepEqual(poolStatusAt('2026-03-09T14:00:00Z'), {
    open: true,
    label: 'Phones open · until 5 pm',
  });

  // Fall back: Sunday 2026-11-01 -> Monday 2026-11-02 is PST (UTC-8)
  // 2026-11-01 12:00 PST = 20:00Z (Sunday -> Mon 7 am)
  assert.deepEqual(poolStatusAt('2026-11-01T20:00:00Z'), {
    open: false,
    label: 'Phones closed · opens Mon 7 am',
  });
  // Monday 2026-11-02 06:59 PST = 14:59Z, 07:00 PST = 15:00Z
  assert.deepEqual(poolStatusAt('2026-11-02T14:59:00Z'), {
    open: false,
    label: 'Phones closed · opens today 7 am',
  });
  assert.deepEqual(poolStatusAt('2026-11-02T15:00:00Z'), {
    open: true,
    label: 'Phones open · until 5 pm',
  });
});

test('route weekday highlights Mon-Fri in America/Los_Angeles and returns null on weekends', () => {
  assert.equal(currentRouteWeekday('America/Los_Angeles', new Date('2026-07-06T18:00:00Z')), 'Mon');
  assert.equal(currentRouteWeekday('America/Los_Angeles', new Date('2026-07-10T18:00:00Z')), 'Fri');
  assert.equal(currentRouteWeekday('America/Los_Angeles', new Date('2026-07-11T18:00:00Z')), null);
  assert.equal(currentRouteWeekday('America/Los_Angeles', new Date('2026-07-12T18:00:00Z')), null);
});
