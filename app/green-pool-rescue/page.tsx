import type { Metadata } from 'next';
import { ClarityComparator } from '../../components/clarity-comparator';
import { ClosingCta } from '../../components/closing-cta';
import { PageHead } from '../../components/page-head';
import {
  RescueChecklistAndRollover,
  RescueDayByDaySection,
  RescueLevelsRow,
} from '../../components/rescue-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Green-pool rescue',
  description:
    'Turn a cloudy, green or black backyard pool back to swim-ready water across Newport Beach, Laguna Beach and the Orange County coast.',
  alternates: { canonical: absoluteUrl('/green-pool-rescue/') },
};

export default function GreenPoolRescuePage() {
  return (
    <>
      <PageHead
        depthMarker="8 FT"
        eyebrow="Algae recovery"
        title="Green-pool rescue"
        motif="rescue"
      >
        <p>
          Whether the pump stopped while you were away or you just bought a house with a neglected
          backyard pool, we recover cloudy, green and black water step by step.
        </p>
      </PageHead>

      <section aria-label="Find your rescue level" className="surface-water">
        <ClarityComparator
          heading="Find your level"
          intro="Select the colour closest to your pool today to see typical visits and starting rescue pricing."
          defaultSelected="emerald"
        />
      </section>

      <RescueLevelsRow
        heading="All five rescue levels"
        lead="From black lagoon to light haze — every rescue is quoted after we see your water and filter setup."
      />

      <RescueDayByDaySection
        heading="A typical rescue, day by day"
        lead="No miracle overnight claims — real algae recovery takes circulation, brushing and clean filter media."
        steps={[
          {
            dayLabel: 'Day 1',
            title: 'Shock and circulate',
            detail:
              'Remove heavy leaves, check pump prime, lower pH for maximum chlorine punch and deliver an initial shock dose.',
            swatch: '#2F5B33',
            clarity: 'opaque',
          },
          {
            dayLabel: 'Day 2',
            title: 'Brush and floc',
            detail:
              'Brush walls, steps and tile line to break algae biofilm loose, then flocculate or clarify suspended dead algae.',
            swatch: '#4E9A5B',
            clarity: 'murky',
          },
          {
            dayLabel: 'Day 3',
            title: 'Vacuum to waste',
            detail:
              'Slowly vacuum settled grey algae off the floor so dead organics leave the pool instead of clogging the filter.',
            swatch: '#9FD39A',
            clarity: 'hazy',
          },
          {
            dayLabel: 'Day 4',
            title: 'Filter clean',
            detail:
              'Tear down cartridges or backwash DE grids to clear trapped algae spores and bring pressure back to baseline.',
            swatch: '#BFE3E6',
            clarity: 'bright',
          },
          {
            dayLabel: 'Day 5',
            title: 'Balance and hand over',
            detail:
              'Dial in chlorine, pH, alkalinity and stabiliser, take a clear photo report and hand back a swim-ready pool.',
            swatch: '#7FD6F0',
            clarity: 'crystal',
          },
        ]}
      />

      <RescueChecklistAndRollover
        checklistHeading="What we’ll ask you"
        checklistItems={[
          {
            title: 'Approximate pool size',
            detail: 'Length, width or rough gallonage helps us estimate chemical load and filter runtime.',
          },
          {
            title: 'Equipment status',
            detail: 'Whether the pump and filter are currently running, and whether you have cartridges or DE.',
          },
          {
            title: 'How long it has been green',
            detail: 'A week-old bloom clears far faster than a pool that sat uncirculated all winter.',
          },
          {
            title: 'Any recent draining',
            detail: 'Coastal water tables matter — let us know if the pool was drained or acid-washed recently.',
          },
        ]}
        rolloverHeading="Keep it crystal after the rescue"
        rolloverBody="Once your water is balanced and clear, your rescue can roll straight into a Splash, Lap Lane or Deep End weekly plan so it never turns green again."
      />

      <ClosingCta
        heading="Send us a photo description of your water."
        lead="Tell us which swatch matches your pool and your city — we reply within one working day."
        ctaLabel="Ask about a rescue"
      />
    </>
  );
}
