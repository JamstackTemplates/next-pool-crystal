export const EQUIPMENT_TYPES = [
  'pump',
  'filter',
  'heater',
  'automation',
  'leak',
  'lighting',
  'salt',
] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPES)[number];

export interface RepairService {
  /** Stable, URL-safe identifier. */
  id: string;
  /** Repair name shown on service tickets and Home strip. */
  name: string;
  /** Equipment category for icon selection and validation. */
  equipment: EquipmentType;
  /** Plain-language description of what the tech does. */
  description: string;
  /** Starting price in whole USD. Edit frequently here. */
  fromPrice: number;
  /** Note clarifying parts, labour or quoting. */
  priceNote: string;
  /** Set false to show "Not taking new jobs this month" and dim the ticket. */
  available: boolean;
}

export const repairs: readonly RepairService[] = [
  {
    id: 'pump-motor',
    name: 'Pump motor replacement',
    equipment: 'pump',
    description: 'Swap a noisy, seized or tripping motor with new shaft seal and housing O-ring.',
    fromPrice: 385,
    priceNote: 'Parts quoted after diagnosis.',
    available: true,
  },
  {
    id: 'variable-speed-pump',
    name: 'Variable-speed pump upgrade',
    equipment: 'pump',
    description: 'Quiet, Title-20 compliant variable-speed pump installed and programmed for daily turnover.',
    fromPrice: 1450,
    priceNote: 'Includes plumbing tie-in and timer setup.',
    available: true,
  },
  {
    id: 'filter-replacement',
    name: 'Cartridge or DE filter replacement',
    equipment: 'filter',
    description: 'Replace cracked filter tanks, grids or cartridge manifolds and reset pressure gauges.',
    fromPrice: 145,
    priceNote: 'Labour only, plus the filter.',
    available: true,
  },
  {
    id: 'heater-diagnosis',
    name: 'Heater and heat pump diagnosis and repair',
    equipment: 'heater',
    description: 'Troubleshoot ignition faults, pressure switches, sensors and heat exchangers.',
    fromPrice: 125,
    priceNote: 'Parts quoted after bench or pad test.',
    available: true,
  },
  {
    id: 'leak-detection',
    name: 'Pressure and dye leak detection',
    equipment: 'leak',
    description: 'Isolate skimmer, main drain and return lines and dye-test fittings and lights.',
    fromPrice: 295,
    priceNote: 'Written report of every leak point found.',
    available: true,
  },
  {
    id: 'automation',
    name: 'Automation and app control setup',
    equipment: 'automation',
    description: 'Install or reconfigure Pentair, Hayward or Jandy relays, valves and phone control.',
    fromPrice: 180,
    priceNote: 'Actuators and control boards quoted separately.',
    available: true,
  },
  {
    id: 'pool-light',
    name: 'LED pool light replacement',
    equipment: 'lighting',
    description: 'Pull new colour or warm-white LED fixtures with fresh deck-box seals.',
    fromPrice: 210,
    priceNote: 'Fixture price depends on niche size and cord length.',
    available: true,
  },
  {
    id: 'salt-cell-replacement',
    name: 'Salt cell replacement',
    equipment: 'salt',
    description: 'Install a matched replacement salt chlorine generator cell and calibrate salt readings.',
    fromPrice: 650,
    priceNote: 'Cell price varies by pool gallonage.',
    available: true,
  },
];
