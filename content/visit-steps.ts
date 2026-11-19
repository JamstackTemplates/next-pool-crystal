export interface VisitStep {
  /** Stable, URL-safe identifier. */
  id: 'test' | 'balance' | 'skim' | 'baskets' | 'brush' | 'vacuum' | 'photo-report';
  /** Step number in visit order (1–7). */
  order: number;
  /** Short step heading. */
  title: string;
  /** One-sentence description of what happens on the deck. */
  detail: string;
}

export const visitSteps: readonly VisitStep[] = [
  {
    id: 'test',
    order: 1,
    title: 'Test',
    detail: 'Digital and drop-kit test of chlorine, pH, alkalinity and salt.',
  },
  {
    id: 'balance',
    order: 2,
    title: 'Balance',
    detail: 'Dose liquid chlorine, acid or bicarb so water stays gentle on eyes and plaster.',
  },
  {
    id: 'skim',
    order: 3,
    title: 'Skim',
    detail: 'Net floating leaves, petals and coastal dust off the surface.',
  },
  {
    id: 'baskets',
    order: 4,
    title: 'Empty baskets',
    detail: 'Clear skimmer and pump hair-and-lint pots so circulation stays strong.',
  },
  {
    id: 'brush',
    order: 5,
    title: 'Brush',
    detail: 'Sweep walls, steps, benches and the glossy waterline tile.',
  },
  {
    id: 'vacuum',
    order: 6,
    title: 'Vacuum',
    detail: 'Lift sand and settled silt off the deep-end floor and check filter pressure.',
  },
  {
    id: 'photo-report',
    order: 7,
    title: 'Photo report',
    detail: 'Latch the gate and text a clear photo of your pool with that visit’s readings.',
  },
];
