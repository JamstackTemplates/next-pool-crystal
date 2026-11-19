import type { Metadata } from 'next';
import { ClosingCta } from '../../components/closing-cta';
import { PageHead } from '../../components/page-head';
import {
  AddonsShelfSection,
  EveryPlanIncludesStrip,
  PlanDepthColumns,
  PoolRulesFaqSection,
  StartingAndPricingSection,
} from '../../components/plans-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Weekly pool plans',
  description:
    'Compare Splash, Lap Lane and Deep End weekly pool cleaning plans and optional add-ons across Newport Beach, Laguna Beach and the Orange County coast.',
  alternates: { canonical: absoluteUrl('/plans/') },
};

export default function PlansPage() {
  return (
    <>
      <PageHead
        depthMarker="3–8 FT"
        eyebrow="Weekly maintenance"
        title="Weekly pool plans"
        motif="plans"
      >
        <p>
          Same route day each week, standard chemicals included, and no surprise bills. Pick the
          depth of care that fits your pool.
        </p>
      </PageHead>

      <PlanDepthColumns
        heading="Compare the three weekly plans"
        lead="Every tier includes one visit per week on your city’s route day. Lap Lane is the everyday choice for most family pools."
      />

      <EveryPlanIncludesStrip
        heading="Every plan includes"
        items={[
          'Same-day coastal route each week',
          'Standard chlorine, acid and bicarb included',
          'Free on-site water testing every visit',
          'Side-gate latch check before we leave',
        ]}
      />

      <AddonsShelfSection
        heading="Optional add-ons"
        lead="Pair an attached spa or periodic deep clean with any weekly plan, or request a single-visit service."
      />

      <StartingAndPricingSection
        pricingHeading="Pool size and pricing"
        pricingChildren={
          <>
            <p>
              Monthly prices cover a standard residential pool of up to 20,000 gallons with normal
              landscaping.
            </p>
            <p>
              Larger estate pools, heavy overhanging trees or commercial pools are quoted individually
              when you enquire.
            </p>
          </>
        }
        stepsHeading="How starting works"
        steps={[
          {
            title: 'Send an enquiry',
            detail:
              'Tell us your city, rough pool size and whether you run chlorine or salt. We reply within one working day.',
          },
          {
            title: 'First visit & water test',
            detail:
              'We meet at the gate or inspect the pad, test your baseline water chemistry and give a clear monthly quote.',
          },
          {
            title: 'Join your weekly route',
            detail:
              'Once you agree to the quote, we assign your city’s weekly route day and start sending photo reports.',
          },
        ]}
      />

      <PoolRulesFaqSection
        heading="Common deck questions"
        items={[
          {
            question: 'What happens on holidays?',
            answer:
              'If your route day falls on a major public holiday, we shift that week’s visit by one day and let you know by text or email.',
          },
          {
            question: 'Are pets in the yard okay?',
            answer:
              'Yes — let us know their names and gate habits when you enquire. We always double-check latches before leaving.',
          },
          {
            question: 'Do I need to be home for gate access?',
            answer:
              'No. Most homeowners give us a side-gate code or spare key so we can complete your weekly visit while you are out.',
          },
          {
            question: 'Do you still visit in rain weeks?',
            answer:
              'In light coastal rain we still test, balance and empty baskets. During heavy storms we balance chemistry and return to brush and vacuum on the next clear visit.',
          },
        ]}
      />

      <ClosingCta
        heading="Ready for a clear week every week?"
        lead="Ask about Splash, Lap Lane or Deep End and tell us which city your pool is in."
        ctaLabel="Ask about a weekly plan"
      />
    </>
  );
}
