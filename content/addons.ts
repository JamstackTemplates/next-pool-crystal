export interface PlanAddon {
  /** Stable, URL-safe identifier. */
  id: string;
  /** Add-on service name. */
  name: string;
  /** Price in whole USD. */
  price: number;
  /** Billing unit: per month or per single visit. */
  unit: 'month' | 'visit';
  /** Short note on scope or quoting. */
  note: string;
  /** Set false to mark temporarily unavailable. */
  available: boolean;
}

export const addons: readonly PlanAddon[] = [
  {
    id: 'spa',
    name: 'Attached spa or hot tub',
    price: 25,
    unit: 'month',
    note: 'Tested, balanced and skimmed alongside your main pool on every weekly visit.',
    available: true,
  },
  {
    id: 'filter-clean',
    name: 'Filter cartridge deep clean',
    price: 95,
    unit: 'visit',
    note: 'Full teardown, manifold check, rinse and O-ring lubrication.',
    available: true,
  },
  {
    id: 'salt-cell',
    name: 'Salt cell acid clean',
    price: 85,
    unit: 'visit',
    note: 'Removes calcium buildup from titanium plates to restore chlorine output.',
    available: true,
  },
  {
    id: 'tile-blast',
    name: 'Calcium removal on the tile line',
    price: 180,
    unit: 'visit',
    note: 'Quoted for pools over 40 ft of tile line.',
    available: true,
  },
  {
    id: 'opening',
    name: 'Spring opening and equipment start-up',
    price: 165,
    unit: 'visit',
    note: 'Full system prime, valve check, shock dose and baseline water balance.',
    available: true,
  },
];
