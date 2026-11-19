import type { ReactNode } from 'react';
import { business } from '../content/business';
import { lowestPlanPrice, plans } from '../content/plans';
import { repairs, type EquipmentType } from '../content/repairs';
import { visitSteps, type VisitStep } from '../content/visit-steps';
import { DepthMarker } from './art/depth-marker';
import { EquipmentPad } from './art/equipment-pad';
import { HeroScene } from './art/hero-scene';
import { PoolIcon, type PoolIconName } from './art/icons';
import { WaterlineTileBand } from './art/waterline-tile-band';
import { RouteSheet } from './route-sheet';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* 1. Hero */
function HeroRoot({ children }: ChildrenProps) {
  const planMarkers = plans.map(plan => ({
    label: `${plan.depthMarker} · ${plan.name}`,
    sublabel: `$${plan.pricePerMonth}/mo`,
    href: `/plans/#${plan.id}`,
    featured: plan.featured,
  }));

  return (
    <section className="surface-coping relative overflow-hidden">
      <div className="wrap grid items-center gap-6 pt-6 pb-8 lg:grid-cols-12 lg:gap-8 lg:pt-12 lg:pb-12">
        <div className="relative z-10 lg:col-span-5">{children}</div>
        <div className="relative lg:col-span-7 lg:-mr-12 xl:-mr-20">
          <HeroScene className="rounded-ui border-2 border-[var(--art-stroke)] shadow-[6px_6px_0_var(--art-stroke)]" />
        </div>
      </div>

      {/* Waterline tile band carrying the painted plan depth markers */}
      <WaterlineTileBand height="medium" markers={planMarkers} />
    </section>
  );
}

function HeroSeasonalNotice() {
  if (!business.seasonalNotice.trim()) return null;
  return (
    <div className="mb-4 inline-flex items-start gap-2.5 rounded-tile border-2 border-[var(--art-stroke)] bg-test-yellow px-3 py-1.5 text-xs font-semibold text-[#0A2A3D] shadow-[2px_2px_0_var(--art-stroke)] sm:text-sm">
      <span className="font-display-condensed shrink-0 uppercase tracking-wider">Notice</span>
      <span aria-hidden="true">·</span>
      <span>{business.seasonalNotice}</span>
    </div>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="font-display-wide text-[clamp(2.35rem,5.8vw,4.35rem)] leading-[1.03] text-ink">
      {children}
    </h1>
  );
}

function HeroLead({ children }: ChildrenProps) {
  return <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">{children}</p>;
}

function HeroActions({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <SiteLink href="/contact/" className="button">
        {primaryLabel}
      </SiteLink>
      <SiteLink href="/green-pool-rescue/" className="button button-algae">
        <span className="h-2.5 w-2.5 rounded-full bg-algae" aria-hidden="true" />
        <span>{secondaryLabel}</span>
      </SiteLink>
    </div>
  );
}

function HeroPriceBadge() {
  return (
    <div className="mt-5">
      <DepthMarker label="3 FT" detail={`From $${lowestPlanPrice}/mo`} />
    </div>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  SeasonalNotice: HeroSeasonalNotice,
  Heading: HeroHeading,
  Lead: HeroLead,
  Actions: HeroActions,
  PriceBadge: HeroPriceBadge,
});

/* 2. Visit timeline ("What happens on a visit") */
const STEP_ICON: Record<VisitStep['id'], PoolIconName> = {
  test: 'vial',
  balance: 'balance',
  skim: 'skimmer',
  baskets: 'baskets',
  brush: 'brush',
  vacuum: 'vacuum',
  'photo-report': 'camera',
};

export function VisitLapSection({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead: ReactNode;
}) {
  return (
    <section aria-labelledby="visit-steps-heading" className="surface-shallow border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <DepthMarker label="1 FT" detail="Weekly lap" className="mb-3" />
            <h2 id="visit-steps-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-ink/80">{lead}</p>
          </div>
          <span className="font-mono-reading text-xs font-semibold uppercase tracking-wider text-ink/75">
            7 stops · every visit
          </span>
        </div>

        {/* Horizontal lane line on desktop, vertical lane line on mobile — buoys, not cards */}
        <div className="relative">
          {/* Desktop horizontal lane rope */}
          <div
            className="pointer-events-none absolute top-7 right-6 left-6 hidden h-1.5 rounded-full bg-[var(--art-stroke)] lg:block"
            aria-hidden="true"
          />
          {/* Mobile vertical lane rope */}
          <div
            className="pointer-events-none absolute top-6 bottom-6 left-7 w-1.5 rounded-full bg-[var(--art-stroke)] lg:hidden"
            aria-hidden="true"
          />

          <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-3">
            {visitSteps.map(step => (
              <li key={step.id} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                {/* Floating buoy node */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[var(--art-stroke)] bg-coping text-primary shadow-[3px_3px_0_var(--art-stroke)] dark:text-aqua">
                  <PoolIcon name={STEP_ICON[step.id]} className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--art-stroke)] bg-test-yellow font-mono-reading text-[0.7rem] font-bold text-[#0A2A3D]">
                    {step.order}
                  </span>
                </div>

                <div className="pt-1 lg:pt-2">
                  <h3 className="font-display-wide text-base text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-ink/80">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 3. Plans preview (3 large painted depth markers set into coping) */
const DEPTH_TONES = [
  'bg-shallow text-ink',
  'bg-tile text-white',
  'bg-primary text-white',
] as const;

export function PlansPreviewSection({
  heading,
  lead,
  linkLabel,
}: {
  heading: ReactNode;
  lead: ReactNode;
  linkLabel: string;
}) {
  return (
    <section aria-labelledby="plans-preview-heading" className="surface-sand border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <DepthMarker label="2 FT" detail="Weekly plans" className="mb-3" />
            <h2 id="plans-preview-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">{lead}</p>
          </div>
          <SiteLink href="/plans/" className="text-link font-display-condensed text-sm tracking-wide uppercase">
            {linkLabel}
          </SiteLink>
        </div>

        {/* Strip of coping holding the 3 painted depth markers */}
        <div className="surface-coping rounded-ui border-2 border-[var(--art-stroke)] p-4 shadow-[5px_5px_0_var(--art-stroke)] sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan, index) => {
              const tone = DEPTH_TONES[index] ?? DEPTH_TONES[2];
              const isLight = index === 0;
              return (
                <SiteLink
                  key={plan.id}
                  href={`/plans/#${plan.id}`}
                  className={`group relative flex flex-col justify-between rounded-tile border-2 border-[var(--art-stroke)] p-6 no-underline transition-transform hover:-translate-y-1 hover:no-underline ${tone}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-block rounded-tile border-2 border-[var(--art-stroke)] bg-coping px-3 py-1 font-display-wide text-lg tracking-wider text-ink">
                        {plan.depthMarker}
                      </span>
                      {plan.featured ? (
                        <span className="rounded-tile border-2 border-[#0A2A3D] bg-test-yellow px-2.5 py-1 font-display-condensed text-xs tracking-[0.12em] uppercase text-[#0A2A3D]">
                          Most pools
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-5 font-display-wide text-2xl">{plan.name}</h3>
                    <p className={`mt-1.5 text-sm ${isLight ? 'text-ink/80' : 'text-white/85'}`}>
                      {plan.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-current/20 pt-4">
                    <div>
                      <span className="font-mono-reading text-3xl font-bold">
                        ${plan.pricePerMonth}
                      </span>
                      <span className={`ml-1 font-mono-reading text-xs ${isLight ? 'text-ink/75' : 'text-white/80'}`}>
                        / month
                      </span>
                    </div>
                    <span className="font-display-condensed text-xs tracking-wider uppercase underline-offset-4 group-hover:underline">
                      See plan →
                    </span>
                  </div>
                </SiteLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. Repairs strip (Equipment pad left + drawn pipe-run list of 6 repairs right) */
const EQUIPMENT_ICON: Record<EquipmentType, PoolIconName> = {
  pump: 'pump',
  filter: 'filter',
  heater: 'heater',
  automation: 'automation',
  leak: 'leak',
  lighting: 'light',
  salt: 'salt',
};

export function RepairsStripSection({
  heading,
  lead,
  linkLabel,
}: {
  heading: ReactNode;
  lead: ReactNode;
  linkLabel: string;
}) {
  const featuredRepairs = repairs.slice(0, 6);

  return (
    <section aria-labelledby="repairs-strip-heading" className="surface-coping border-y-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <DepthMarker label="4 FT" detail="Equipment pad" className="mb-3" />
            <h2 id="repairs-strip-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-xl text-muted">{lead}</p>

            <div className="mt-6 rounded-ui border-2 border-[var(--art-stroke)] bg-plaster p-4 shadow-[4px_4px_0_var(--art-stroke)]">
              <EquipmentPad />
            </div>
          </div>

          {/* Right: drawn PVC pipe-run list of 6 repairs */}
          <div className="lg:col-span-6">
            <div className="relative pl-8">
              {/* Vertical PVC pipe line */}
              <div
                className="pointer-events-none absolute top-4 bottom-4 left-3 w-2.5 rounded-full border-2 border-[var(--art-stroke)] bg-coping"
                aria-hidden="true"
              />

              <ul className="space-y-3">
                {featuredRepairs.map(repair => (
                  <li
                    key={repair.id}
                    className="relative flex flex-wrap items-center justify-between gap-3 rounded-tile border-2 border-border bg-plaster px-4 py-3"
                  >
                    {/* Pipe tee connector */}
                    <span
                      className="pointer-events-none absolute top-1/2 -left-6 h-2 w-6 -translate-y-1/2 border-y-2 border-[var(--art-stroke)] bg-coping"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile border-2 border-[var(--art-stroke)] bg-coping text-primary dark:text-aqua">
                        <PoolIcon name={EQUIPMENT_ICON[repair.equipment]} className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="block font-display-wide text-base text-ink">
                          {repair.name}
                        </span>
                        <span className="block text-xs text-muted">{repair.priceNote}</span>
                      </div>
                    </div>

                    <span className="font-mono-reading text-sm font-bold text-primary dark:text-aqua">
                      From ${repair.fromPrice.toLocaleString('en-US')}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <SiteLink href="/repairs-and-testing/" className="button button-quiet">
                  {linkLabel}
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 6. Route days ("We're in your street on…") */
export function RouteDaysSection({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead: ReactNode;
}) {
  return (
    <section aria-labelledby="route-days-heading" className="surface-sand">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <DepthMarker label="5 FT" detail="Coastal routes" className="mb-3" />
            <h2 id="route-days-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">{lead}</p>
          </div>
        </div>

        <RouteSheet />
      </div>
    </section>
  );
}
