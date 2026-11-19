export interface WeeklyPlan {
  /** Stable, URL-safe identifier used in anchors (/plans/#<id>). */
  id: string;
  /** Display name of the weekly plan. */
  name: string;
  /** Painted coping depth-marker label (e.g. "3 FT"). */
  depthMarker: string;
  /** Monthly price in whole USD. Edit here to update Home, Plans and schema.org Offers. */
  pricePerMonth: number;
  /** Weekly visit count; always 1 for standard residential routes. */
  visitsPerWeek: 1;
  /** Short one-line summary of the plan. */
  summary: string;
  /** Tasks added at this tier (in addition to lower tiers). */
  includes: readonly string[];
  /** Who this plan fits best. */
  bestFor: string;
  /** Exactly one plan is featured as the most popular option. */
  featured: boolean;
  /** Set false if temporarily pausing new sign-ups for this tier. */
  available: boolean;
}

export const plans: readonly WeeklyPlan[] = [
  {
    id: 'splash',
    name: 'Splash',
    depthMarker: '3 FT',
    pricePerMonth: 139,
    visitsPerWeek: 1,
    summary: 'Chemistry, surface skim and basket empty every week.',
    includes: [
      'Weekly water test',
      'Chemicals balanced',
      'Surface skimmed',
      'Skimmer and pump baskets emptied',
      'Standard chemicals included',
    ],
    bestFor: 'Owners who brush and vacuum themselves',
    featured: false,
    available: true,
  },
  {
    id: 'lap-lane',
    name: 'Lap Lane',
    depthMarker: '5 FT',
    pricePerMonth: 189,
    visitsPerWeek: 1,
    summary: 'Full weekly clean from waterline tile to deep-end floor, with a photo report.',
    includes: [
      'Walls, steps and tile line brushed',
      'Floor vacuumed',
      'Filter pressure checked',
      'Equipment looked over',
      'Photo report after each visit',
    ],
    bestFor: 'Most family pools',
    featured: true,
    available: true,
  },
  {
    id: 'deep-end',
    name: 'Deep End',
    depthMarker: '8 FT',
    pricePerMonth: 249,
    visitsPerWeek: 1,
    summary: 'Complete weekly care plus quarterly filter cleans, salt cell care and priority repairs.',
    includes: [
      'Quarterly filter cartridge clean',
      'Salt cell inspected and cleaned',
      'Monthly tile-line scrub',
      'Priority repair visits',
    ],
    bestFor: 'Holiday lets and salt pools',
    featured: false,
    available: true,
  },
];

export const lowestPlanPrice = Math.min(...plans.map(plan => plan.pricePerMonth));
