import type { Metadata } from 'next';
import { ClosingCta } from '../../components/closing-cta';
import { PageHead } from '../../components/page-head';
import {
  EquipmentRepairsSection,
  WaterTestingAndChartSection,
} from '../../components/repairs-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Repairs & water testing',
  description:
    'Residential pool pump, filter, heater, salt cell and leak repairs plus on-site water testing and ideal chemistry ranges across Orange County.',
  alternates: { canonical: absoluteUrl('/repairs-and-testing/') },
};

export default function RepairsAndTestingPage() {
  return (
    <>
      <PageHead
        depthMarker="4 FT"
        eyebrow="Equipment & chemistry"
        title="Repairs & water testing"
        motif="repairs"
      >
        <p>
          Honest equipment diagnosis, transparent starting prices, and a test-kit reference chart so
          you know what balanced coastal water looks like.
        </p>
      </PageHead>

      <EquipmentRepairsSection
        heading="Equipment repairs from pump to salt cell"
        lead="Every repair begins with a pad check and a written quote before we swap a single part."
        diagnosticHeading="Credited to your repair if you go ahead"
        diagnosticNote="An on-site diagnostic visit covers pressure testing, electrical and sensor checks, and a clear written quote. If you ask us to complete the repair, the $95 fee goes straight toward the job."
      />

      <WaterTestingAndChartSection
        testingHeading="On-site water testing with a written report"
        testingLead="Not sure why your eyes sting or calcium is building on the tile? We test all seven parameters poolside with drop reagents and digital meters, then hand you an exact dosing sheet. Included free on every weekly plan."
        chartHeading="Ideal water-chemistry ranges"
        chartLead="These are the target bands we balance to on every weekly route stop."
        tipsHeading="Reading your own test strip"
        tips={[
          {
            title: 'Dip elbow-deep away from return jets',
            detail: 'Surface water near skimmers or jets can read differently from the main body of the pool.',
          },
          {
            title: 'Hold level for 15 seconds in shade',
            detail: 'Shaking the strip bleeds pads together, and direct noon glare washes out yellow chlorine shades.',
          },
          {
            title: 'Check pH before adding chlorine',
            detail: 'Chlorine loses most of its punch when pH climbs above 7.8 — balance pH first.',
          },
        ]}
      />

      <ClosingCta
        heading="Something noisy on the pad?"
        lead="Send the equipment brand, fault code or symptom and we’ll reply within one working day."
        ctaLabel="Request a repair quote"
      />
    </>
  );
}
