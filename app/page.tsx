import type { Metadata } from 'next';
import { ClarityComparator } from '../components/clarity-comparator';
import { ClosingCta } from '../components/closing-cta';
import {
  HomeHero,
  PlansPreviewSection,
  RepairsStripSection,
  RouteDaysSection,
  VisitLapSection,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  title: `${business.name} — Weekly Pool Care on the Orange County Coast`,
  description: business.introduction,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.SeasonalNotice />
        <HomeHero.Heading>
          Crystal <span className="font-display-extra-wide text-primary dark:text-aqua">clear</span>, every week.
        </HomeHero.Heading>
        <HomeHero.Lead>
          Weekly pool and spa care for Newport, Laguna and the coast. We test, balance, brush and skim,
          and send a photo of your water after every visit.
        </HomeHero.Lead>
        <HomeHero.Actions
          primaryLabel="Ask about a weekly plan"
          secondaryLabel="My pool is green"
        />
        <HomeHero.PriceBadge />
      </HomeHero>

      <VisitLapSection
        heading="What happens on a visit"
        lead="Every weekly route stop follows the same seven-point deck checklist before we latch your gate."
      />

      <PlansPreviewSection
        heading="Three depths of weekly care"
        lead="Pick the level that matches how you use your pool. All plans cover one visit every week with standard chemicals included."
        linkLabel="Compare plans & add-ons →"
      />

      <section aria-label="Water clarity comparator" className="surface-water">
        <ClarityComparator
          depthMarker="3 FT · Test kit"
          heading="What colour is your pool today?"
          intro="Pick the swatch that looks closest to your water from the deck. We’ll point you to the right plan or rescue level."
        />
      </section>

      <RepairsStripSection
        heading="Pumps, filters, heaters and salt cells"
        lead="When the equipment pad starts humming, leaking or throwing a fault code, our techs diagnose and repair residential gear across the coast."
        linkLabel="See all repairs & water testing"
      />

      <RouteDaysSection
        heading="We’re in your street on…"
        lead="Our trucks run coastal routes Monday to Friday. Ask for a slot on your city’s route day."
      />

      <ClosingCta
        heading="Your pool, our route."
        lead="Tell us your city, pool size and whether it’s chlorine or salt. We’ll reply within one working day."
        ctaLabel="Ask about a weekly plan"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
