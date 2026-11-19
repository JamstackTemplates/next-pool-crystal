export const ROUTE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
export type RouteDay = (typeof ROUTE_DAYS)[number];

export interface ServiceCity {
  /** Stable, URL-safe identifier. */
  id: string;
  /** City name shown on route sheets and in schema.org areaServed. */
  name: string;
  /** Weekly route weekday (Mon–Fri). Edit here when route days shift. */
  routeDay: RouteDay;
  /** Representative ZIP code for display. */
  zip: string;
  /** Optional boundary note. */
  note?: string;
}

export const serviceArea: readonly ServiceCity[] = [
  { id: 'newport-beach', name: 'Newport Beach', routeDay: 'Mon', zip: '92660' },
  { id: 'corona-del-mar', name: 'Corona del Mar', routeDay: 'Mon', zip: '92625' },
  { id: 'laguna-beach', name: 'Laguna Beach', routeDay: 'Tue', zip: '92651' },
  { id: 'irvine', name: 'Irvine', routeDay: 'Wed', zip: '92603' },
  { id: 'costa-mesa', name: 'Costa Mesa', routeDay: 'Thu', zip: '92627' },
  {
    id: 'huntington-beach',
    name: 'Huntington Beach',
    routeDay: 'Fri',
    zip: '92648',
    note: 'South of Adams Ave',
  },
];
