import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by metadata and structured data. */
  introduction: string;
  /** Public contact email address, always visible on Contact and footer. */
  email: string;
  /** Public telephone number; blank hides it. */
  phone: string;
  /** Two-letter state or region code for schema.org areaServed. */
  region: string;
  /** Two-letter ISO country code for schema.org areaServed. */
  country: string;
  /** IANA time zone for phone hours and route-day highlighting. */
  timeZone: string;
  /** Weekly phone and office hours; same-day intervals only. */
  phoneHours: readonly OpeningHours[];
  /** Neutral summary shown before JavaScript runs or when no time zone is set. */
  phoneHoursSummary: string;
  /** Optional seasonal banner shown above the home headline; empty string hides it. */
  seasonalNotice: string;
  /** On-site equipment diagnostic fee in whole USD, credited if the repair goes ahead. */
  diagnosticVisitPrice: number;
  /** Standalone on-site water test price in whole USD; included free on every weekly plan. */
  waterTestPrice: number;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Intro copy describing enquiries without implying confirmed bookings or payments. */
    introduction: string;
    /** Suggestions for the message box, not additional form inputs. */
    usefulToInclude: readonly string[];
    /** Disclaimer clarifying that replies confirm route slots and pricing. */
    replyNote: string;
  };
}

export const business: Business = {
  name: 'Crystal Pools & Spas',
  tagline: 'Crystal clear, every week.',
  introduction:
    'Weekly pool and spa cleaning plans, equipment repairs, water testing and green-pool rescue across Newport Beach, Laguna Beach and the Orange County coast.',
  email: 'service@example.com',
  phone: '(949) 555-0142',
  region: 'CA',
  country: 'US',
  timeZone: 'America/Los_Angeles',
  phoneHours: [
    { day: 'Monday', opens: '07:00', closes: '17:00' },
    { day: 'Tuesday', opens: '07:00', closes: '17:00' },
    { day: 'Wednesday', opens: '07:00', closes: '17:00' },
    { day: 'Thursday', opens: '07:00', closes: '17:00' },
    { day: 'Friday', opens: '07:00', closes: '17:00' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  phoneHoursSummary: 'Phone hours: Mon–Fri 7–5, Sat 8–12',
  seasonalNotice: 'Spring opening slots for March are filling. Ask now to get on a route.',
  diagnosticVisitPrice: 95,
  waterTestPrice: 65,
  enquiries: {
    title: 'Ask about your pool',
    introduction:
      'Send an enquiry for a weekly maintenance plan, equipment repair, water test or green-pool rescue across the Orange County coast.',
    usefulToInclude: [
      'Your street or city so we can check route coverage',
      'Approximate pool size or dimensions, and whether there is an attached spa',
      'Whether it is a chlorine or salt pool, plus any equipment brands you know',
      'What you need: a weekly plan, an equipment repair, a water test or a green-pool rescue',
      'For a rescue, what colour the water is and how long it has been that way',
      'Gate or side-yard access notes, and any pets in the yard',
      'A preferred day or week for our first visit',
    ],
    replyNote:
      'We reply within one working day. A route slot and price are confirmed only when Crystal Pools & Spas replies, and nothing is scheduled until then.',
  },
};

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
