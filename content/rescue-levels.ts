export interface RescueLevel {
  /** Stable, URL-safe identifier. */
  id: string;
  /** Severity name shown on the clarity comparator and rescue windows. */
  name: string;
  /** Hex water colour used to tint the comparator pool window and swatch. */
  swatch: string;
  /** Plain description of what the water looks like from the deck. */
  looksLike: string;
  /** Typical number of recovery visits. */
  typicalVisits: {
    min: number;
    max: number;
  };
  /** Starting rescue price in whole USD. Edit frequently here. */
  fromPrice: number;
  /** True when a partial or full drain consult may be needed before chemical recovery. */
  drainConsult: boolean;
  /** Practical recommendation shown when this state is chosen. */
  recommendation: string;
}

export interface CrystalClarityState {
  id: 'crystal';
  name: string;
  swatch: string;
  looksLike: string;
  recommendation: string;
}

export const crystalClarityState: CrystalClarityState = {
  id: 'crystal',
  name: 'Crystal',
  swatch: '#7FD6F0',
  looksLike: 'Clear and sparkling — you can count the screws on the main drain.',
  recommendation: 'Your water is in great shape. A weekly maintenance plan keeps it locked right here.',
};

export const rescueLevels: readonly RescueLevel[] = [
  {
    id: 'haze',
    name: 'Haze',
    swatch: '#BFE3E6',
    looksLike: 'Cloudy, but you can see the floor',
    typicalVisits: { min: 1, max: 1 },
    fromPrice: 195,
    drainConsult: false,
    recommendation: 'Balanced shock dose, clarifier and a filter check usually clear a hazy pool in one visit.',
  },
  {
    id: 'lime',
    name: 'Lime',
    swatch: '#9FD39A',
    looksLike: 'Light green, floor still visible',
    typicalVisits: { min: 2, max: 2 },
    fromPrice: 325,
    drainConsult: false,
    recommendation: 'Early algae bloom. We shock, brush every wall and return to vacuum and rebalance.',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    swatch: '#4E9A5B',
    looksLike: 'Green, the floor is gone below 4 ft',
    typicalVisits: { min: 2, max: 3 },
    fromPrice: 475,
    drainConsult: false,
    recommendation: 'Active bloom needing multi-stage shock, floc or vacuum to waste, and a filter teardown.',
  },
  {
    id: 'swamp',
    name: 'Swamp',
    swatch: '#2F5B33',
    looksLike: "Dark green, can't see the steps",
    typicalVisits: { min: 3, max: 4 },
    fromPrice: 650,
    drainConsult: false,
    recommendation: 'Heavy algae and organic load. Requires blind leaf raking, heavy chlorination and several filter cleans.',
  },
  {
    id: 'lagoon',
    name: 'Lagoon',
    swatch: '#1E2A1E',
    looksLike: 'Black or brown, debris on the floor',
    typicalVisits: { min: 4, max: 6 },
    fromPrice: 850,
    drainConsult: true,
    recommendation: 'Standing dark water with heavy debris. We inspect first to see whether a drain and acid wash saves time and chemicals.',
  },
];

export function formatVisits(range: { min: number; max: number }): string {
  if (range.min === range.max) {
    return `${range.min} ${range.min === 1 ? 'visit' : 'visits'}`;
  }
  return `${range.min}–${range.max} visits`;
}
