export interface WaterTestParameter {
  /** Stable, URL-safe identifier. */
  id: string;
  /** Water chemistry parameter name. */
  name: string;
  /** Measurement unit (e.g. "ppm", "ppb", or "" for pH). */
  unit: string;
  /** Lower bound of the ideal range. */
  idealMin: number;
  /** Upper bound of the ideal range. */
  idealMax: number;
  /** Why this reading matters for swimmers and equipment. */
  why: string;
  /** Hex colour for the lower end of the test-strip pad. */
  swatchLow: string;
  /** Hex colour for the upper end of the test-strip pad. */
  swatchHigh: string;
}

export const waterTests: readonly WaterTestParameter[] = [
  {
    id: 'free-chlorine',
    name: 'Free chlorine',
    unit: 'ppm',
    idealMin: 1,
    idealMax: 3,
    why: 'Keeps algae and bacteria out.',
    swatchLow: '#FFF0A8',
    swatchHigh: '#F6C22E',
  },
  {
    id: 'ph',
    name: 'pH',
    unit: '',
    idealMin: 7.4,
    idealMax: 7.6,
    why: 'Comfortable on eyes and protects equipment.',
    swatchLow: '#F48A70',
    swatchHigh: '#D9434F',
  },
  {
    id: 'total-alkalinity',
    name: 'Total alkalinity',
    unit: 'ppm',
    idealMin: 80,
    idealMax: 120,
    why: 'Holds the pH steady.',
    swatchLow: '#8CC9A8',
    swatchHigh: '#2E8E7A',
  },
  {
    id: 'calcium-hardness',
    name: 'Calcium hardness',
    unit: 'ppm',
    idealMin: 200,
    idealMax: 400,
    why: 'Prevents etching and scale.',
    swatchLow: '#B7A4D8',
    swatchHigh: '#7A5EA8',
  },
  {
    id: 'cyanuric-acid',
    name: 'Cyanuric acid (stabiliser)',
    unit: 'ppm',
    idealMin: 30,
    idealMax: 50,
    why: 'Shields chlorine from the sun.',
    swatchLow: '#F5C487',
    swatchHigh: '#D97B3A',
  },
  {
    id: 'salt',
    name: 'Salt (salt pools only)',
    unit: 'ppm',
    idealMin: 2700,
    idealMax: 3400,
    why: 'Lets the cell make chlorine.',
    swatchLow: '#CBEAF4',
    swatchHigh: '#4BAED1',
  },
  {
    id: 'phosphates',
    name: 'Phosphates',
    unit: 'ppb',
    idealMin: 0,
    idealMax: 100,
    why: 'Algae food.',
    swatchLow: '#DDF3F0',
    swatchHigh: '#54B4C7',
  },
];

export function formatIdealRange(param: WaterTestParameter): string {
  const min = param.idealMin.toLocaleString('en-US');
  const max = param.idealMax.toLocaleString('en-US');
  return param.unit ? `${min}–${max} ${param.unit}` : `${min}–${max}`;
}
