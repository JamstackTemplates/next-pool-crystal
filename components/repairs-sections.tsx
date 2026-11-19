import type { ReactNode } from 'react';
import { business } from '../content/business';
import { repairs, type EquipmentType } from '../content/repairs';
import { formatIdealRange, waterTests } from '../content/water-tests';
import { DepthMarker } from './art/depth-marker';
import { EquipmentPad } from './art/equipment-pad';
import { PoolIcon, type PoolIconName } from './art/icons';
import { TestKitComparator } from './art/test-kit-comparator';
import { SiteLink } from './site-link';

const EQUIPMENT_ICON: Record<EquipmentType, PoolIconName> = {
  pump: 'pump',
  filter: 'filter',
  heater: 'heater',
  automation: 'automation',
  leak: 'leak',
  lighting: 'light',
  salt: 'salt',
};

export function EquipmentRepairsSection({
  heading,
  lead,
  diagnosticHeading,
  diagnosticNote,
}: {
  heading: ReactNode;
  lead: ReactNode;
  diagnosticHeading: ReactNode;
  diagnosticNote: ReactNode;
}) {
  return (
    <section aria-labelledby="repairs-heading" className="surface-water border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-8 max-w-2xl">
          <DepthMarker label="1 FT" detail="Equipment repairs" className="mb-3" />
          <h2 id="repairs-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-muted">{lead}</p>
        </div>

        {/* Large equipment pad diagram with numbered callouts */}
        <div className="mb-10 rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-4 shadow-[5px_5px_0_var(--art-stroke)] sm:p-6">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <EquipmentPad numbered />
            </div>
            <ol className="space-y-2.5 text-sm lg:col-span-4">
              {[
                { n: '1', label: 'Circulation pump', detail: 'Motors, seals & variable-speed upgrades' },
                { n: '2', label: 'Cartridge / DE filter', detail: 'Manifolds, grids, O-rings & gauges' },
                { n: '3', label: 'Heater & heat pump', detail: 'Sensors, igniters & pressure switches' },
                { n: '4', label: 'Salt cell & automation', detail: 'Cells, relays, actuators & app control' },
              ].map(item => (
                <li
                  key={item.n}
                  className="flex items-start gap-3 rounded-tile border border-border bg-plaster p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#0A2A3D] bg-test-yellow font-mono-reading text-xs font-bold text-[#0A2A3D]">
                    {item.n}
                  </span>
                  <div>
                    <span className="block font-display-wide text-sm text-ink">{item.label}</span>
                    <span className="block text-xs text-muted">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Two-column "service ticket" list of every repair */}
        <div className="grid gap-4 md:grid-cols-2">
          {repairs.map((repair, idx) => (
            <article
              key={repair.id}
              className={`flex flex-col justify-between rounded-tile border-2 border-[var(--art-stroke)] bg-coping p-5 shadow-[3px_3px_0_var(--art-stroke)] ${
                repair.available ? '' : 'opacity-60 grayscale-[40%]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-border pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile border-2 border-[var(--art-stroke)] bg-shallow text-primary dark:text-aqua">
                      <PoolIcon name={EQUIPMENT_ICON[repair.equipment]} className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-mono-reading text-[0.7rem] uppercase tracking-wider text-muted">
                        Ticket #{String(idx + 1).padStart(2, '0')} · {repair.equipment}
                      </span>
                      <h3 className="font-display-wide text-lg leading-snug text-ink">
                        {repair.name}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono-reading text-base font-bold text-primary dark:text-aqua">
                    From ${repair.fromPrice.toLocaleString('en-US')}
                  </span>
                </div>

                <p className="mt-3 text-sm text-ink/90">{repair.description}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                <span className="font-mono-reading text-xs text-muted">{repair.priceNote}</span>
                {repair.available ? (
                  <SiteLink href="/contact/" className="text-link text-xs">
                    Request a quote →
                  </SiteLink>
                ) : (
                  <span className="rounded-tile border border-border bg-sand px-2.5 py-1 font-mono-reading text-xs font-semibold text-muted">
                    Not taking new jobs this month
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Yellow test-kit diagnostic visit label */}
        <div className="mt-8 rounded-tile border-2 border-[#0A2A3D] bg-test-yellow p-5 text-[#0A2A3D] shadow-[4px_4px_0_var(--art-stroke)] sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-display-condensed text-xs tracking-[0.14em] uppercase">
              Diagnostic visit · ${business.diagnosticVisitPrice}
            </p>
            <h3 className="mt-1 font-display-wide text-xl">{diagnosticHeading}</h3>
            <p className="mt-1 max-w-2xl text-sm font-medium">{diagnosticNote}</p>
          </div>
          <SiteLink href="/contact/" className="button mt-4 shrink-0 sm:mt-0">
            Ask for a diagnosis
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

export function WaterTestingAndChartSection({
  testingHeading,
  testingLead,
  chartHeading,
  chartLead,
  tipsHeading,
  tips,
}: {
  testingHeading: ReactNode;
  testingLead: ReactNode;
  chartHeading: ReactNode;
  chartLead: ReactNode;
  tipsHeading: ReactNode;
  tips: readonly { title: string; detail: string }[];
}) {
  return (
    <>
      {/* Water testing service on sand deck */}
      <section aria-labelledby="testing-service-heading" className="surface-sand border-b-2 border-[var(--art-stroke)]">
        <div className="wrap py-14 sm:py-16">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <DepthMarker label="2 FT" detail="Water testing" className="mb-3" />
              <h2 id="testing-service-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
                {testingHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted">{testingLead}</p>
            </div>
            <div className="rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-6 shadow-[4px_4px_0_var(--art-stroke)] md:col-span-4">
              <p className="font-display-condensed text-xs tracking-[0.14em] uppercase text-muted">
                On-site lab report
              </p>
              <p className="mt-2 font-mono-reading text-4xl font-bold text-primary dark:text-aqua">
                ${business.waterTestPrice}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Included free on every weekly plan
              </p>
              <SiteLink href="/contact/" className="button mt-5 w-full">
                Ask about a water test
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal-range test chart: one continuous vertical strip on desktop, stacked pads on mobile */}
      <section aria-labelledby="test-chart-heading" className="surface-coping border-b-2 border-[var(--art-stroke)]">
        <div className="wrap py-14 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <DepthMarker label="3 FT" detail="Ideal ranges" className="mb-3" />
            <h2 id="test-chart-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {chartHeading}
            </h2>
            <p className="mt-2 text-muted">{chartLead}</p>
          </div>

          {/* Test strip layout: continuous white plastic strip spine on desktop */}
          <div className="relative">
            {/* Desktop vertical test-strip spine */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-9 hidden w-12 rounded-full border-2 border-[var(--art-stroke)] bg-coping shadow-inner lg:block"
              aria-hidden="true"
            />

            <ol className="space-y-4">
              {waterTests.map(param => (
                <li
                  key={param.id}
                  className="relative grid items-center gap-4 rounded-tile border-2 border-[var(--art-stroke)] bg-plaster p-4 lg:grid-cols-12 lg:bg-transparent lg:border-0 lg:p-0"
                >
                  {/* Dual-colour test pad sitting on the strip spine */}
                  <div className="flex items-center gap-3 lg:col-span-2 lg:justify-center">
                    <div
                      className="relative z-10 flex h-12 w-16 overflow-hidden rounded-tile border-2 border-[var(--art-stroke)] shadow-[2px_2px_0_var(--art-stroke)]"
                      aria-hidden="true"
                    >
                      <span className="flex-1" style={{ backgroundColor: param.swatchLow }} />
                      <span className="flex-1" style={{ backgroundColor: param.swatchHigh }} />
                    </div>
                  </div>

                  {/* Parameter row card */}
                  <div className="grid items-center gap-2 rounded-tile border-2 border-border bg-plaster p-4 sm:grid-cols-12 lg:col-span-10">
                    <div className="sm:col-span-4">
                      <h3 className="font-display-wide text-lg text-ink">{param.name}</h3>
                    </div>
                    <div className="sm:col-span-3">
                      <span className="inline-block rounded-tile border border-[var(--art-stroke)] bg-coping px-2.5 py-1 font-mono-reading text-sm font-bold text-primary dark:text-aqua">
                        {formatIdealRange(param)}
                      </span>
                    </div>
                    <div className="sm:col-span-5">
                      <p className="text-sm text-muted">{param.why}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Reading your own test strip — 3 tips beside TestKitComparator */}
          <div className="mt-14 grid items-center gap-8 rounded-ui border-2 border-[var(--art-stroke)] bg-sand p-6 shadow-[4px_4px_0_var(--art-stroke)] md:grid-cols-12 sm:p-8">
            <div className="md:col-span-4">
              <TestKitComparator />
            </div>
            <div className="md:col-span-8">
              <h3 className="font-display-wide text-2xl text-ink">{tipsHeading}</h3>
              <ol className="mt-4 space-y-3">
                {tips.map((tip, idx) => (
                  <li key={tip.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--art-stroke)] bg-coping font-mono-reading text-xs font-bold text-ink">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-display-wide text-sm text-ink">{tip.title}: </span>
                      <span className="text-sm text-muted">{tip.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
