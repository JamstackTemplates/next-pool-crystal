import type { ReactNode } from 'react';
import { formatVisits, rescueLevels } from '../content/rescue-levels';
import { DepthMarker } from './art/depth-marker';
import { LaneRopeDivider } from './art/lane-rope-divider';
import { RescuePoolWindow } from './art/page-motifs';
import { SiteLink } from './site-link';

/**
 * Five rescue levels displayed as a row of five pool windows from Lagoon to Haze.
 * On mobile: horizontal snap-scroll row with visible scrollbar.
 */
export function RescueLevelsRow({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead: ReactNode;
}) {
  const lagoonToHaze = [...rescueLevels].reverse();

  return (
    <section aria-labelledby="rescue-levels-heading" className="surface-sand border-y-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <DepthMarker label="1 FT" detail="Five rescue tiers" className="mb-3" />
            <h2 id="rescue-levels-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">{lead}</p>
          </div>
          <span className="font-mono-reading text-xs uppercase tracking-wider text-muted">
            Lagoon → Haze · scroll on small screens
          </span>
        </div>

        {/* Snap-scroll row on mobile, 5-column row on desktop */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {lagoonToHaze.map(level => {
            const dark = level.id === 'lagoon' || level.id === 'swamp' || level.id === 'emerald';
            return (
              <article
                key={level.id}
                id={level.id}
                className="flex w-64 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-ui border-2 border-[var(--art-stroke)] bg-coping shadow-[4px_4px_0_var(--art-stroke)] lg:w-auto"
              >
                {/* Pool window water swatch */}
                <div
                  className="relative flex h-32 flex-col justify-between border-b-2 border-[var(--art-stroke)] p-3.5"
                  style={{ backgroundColor: level.swatch }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`rounded-tile border px-2 py-0.5 font-display-wide text-xs uppercase ${
                        dark
                          ? 'border-white/50 bg-[#04121C]/80 text-white'
                          : 'border-[#0A2A3D]/40 bg-white/85 text-[#0A2A3D]'
                      }`}
                    >
                      {level.name}
                    </span>
                    <span
                      className={`font-mono-reading text-[0.7rem] font-bold ${
                        dark ? 'text-white/90' : 'text-[#0A2A3D]'
                      }`}
                    >
                      {formatVisits(level.typicalVisits)}
                    </span>
                  </div>

                  {level.drainConsult ? (
                    <span className="inline-block self-start rounded-tile border-2 border-[#0A2A3D] bg-test-yellow px-2 py-0.5 font-display-condensed text-[0.68rem] tracking-wider uppercase text-[#0A2A3D]">
                      Drain consult may be needed
                    </span>
                  ) : null}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{level.looksLike}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{level.recommendation}</p>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
                    <span className="font-mono-reading text-xs text-muted">Starting</span>
                    <span className="font-mono-reading text-lg font-bold text-primary dark:text-aqua">
                      From ${level.fromPrice}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Five alternating day-by-day rescue sequence vignettes (swamp -> crystal). */
export function RescueDayByDaySection({
  heading,
  lead,
  steps,
}: {
  heading: ReactNode;
  lead: ReactNode;
  steps: readonly {
    dayLabel: string;
    title: string;
    detail: string;
    swatch: string;
    clarity: 'opaque' | 'murky' | 'hazy' | 'bright' | 'crystal';
  }[];
}) {
  return (
    <section aria-labelledby="day-by-day-heading" className="surface-coping border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <DepthMarker label="2 FT" detail="Day by day" className="mb-3" />
          <h2 id="day-by-day-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-muted">{lead}</p>
        </div>

        <ol className="space-y-6">
          {steps.map((step, index) => {
            const reverse = index % 2 === 1;
            return (
              <li
                key={step.dayLabel}
                className="grid items-center gap-6 rounded-ui border-2 border-border bg-plaster p-5 md:grid-cols-12"
              >
                <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
                  <RescuePoolWindow
                    swatch={step.swatch}
                    clarity={step.clarity}
                    dayLabel={step.dayLabel}
                  />
                </div>
                <div className={`md:col-span-7 ${reverse ? 'md:order-1' : ''}`}>
                  <span className="font-mono-reading text-xs font-bold uppercase tracking-wider text-primary dark:text-aqua">
                    Step 0{index + 1} · {step.dayLabel}
                  </span>
                  <h3 className="mt-1 font-display-wide text-2xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-base text-muted">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Clipboard checklist of "What we'll ask you" + roll-into-a-plan lane-rope transition. */
export function RescueChecklistAndRollover({
  checklistHeading,
  checklistItems,
  rolloverHeading,
  rolloverBody,
}: {
  checklistHeading: ReactNode;
  checklistItems: readonly { title: string; detail: string }[];
  rolloverHeading: ReactNode;
  rolloverBody: ReactNode;
}) {
  return (
    <section aria-labelledby="ask-you-heading" className="surface-water">
      <div className="wrap py-14 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-6 shadow-[5px_5px_0_var(--art-stroke)] sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4 border-b-2 border-border pb-4">
            <div>
              <DepthMarker label="3 FT" detail="Rescue intake" className="mb-2" />
              <h2 id="ask-you-heading" className="font-display-wide text-2xl sm:text-3xl">
                {checklistHeading}
              </h2>
            </div>
            <span className="hidden font-mono-reading text-xs uppercase text-muted sm:inline">
              Deck clipboard
            </span>
          </div>

          <ul className="space-y-4">
            {checklistItems.map(item => (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-tile border-2 border-[var(--art-stroke)] bg-test-yellow font-mono-reading text-xs font-bold text-[#0A2A3D]"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <span className="font-display-wide text-base text-ink">{item.title} — </span>
                  <span className="text-sm text-muted">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <LaneRopeDivider className="my-10" />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display-wide text-2xl sm:text-3xl text-ink">{rolloverHeading}</h2>
          <p className="mt-3 text-base text-muted">{rolloverBody}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <SiteLink href="/contact/" className="button">
              Ask about a green-pool rescue
            </SiteLink>
            <SiteLink href="/plans/" className="button button-quiet">
              Compare weekly plans
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
