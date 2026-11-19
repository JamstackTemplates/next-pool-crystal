import type { ReactNode } from 'react';
import { addons } from '../content/addons';
import { plans } from '../content/plans';
import { DepthMarker } from './art/depth-marker';
import { LaneRopeDivider } from './art/lane-rope-divider';
import { SiteLink } from './site-link';

/**
 * Three weekly plans as rising water columns (shallow -> mid -> deep).
 * Featured plan sits raised on a coping step; on mobile they stack as a descending staircase.
 */
export function PlanDepthColumns({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead: ReactNode;
}) {
  const columnHeights = ['lg:mt-16', 'lg:mt-0', 'lg:mt-6'];
  const waterFills = [
    'from-shallow/70 to-shallow',
    'from-aqua/30 via-tile/25 to-tile/45',
    'from-tile/30 via-primary/35 to-primary/55',
  ];
  const waterHeaderBar = ['bg-shallow text-ink', 'bg-tile text-white', 'bg-primary text-white'];

  return (
    <section aria-labelledby="plans-compare-heading" className="surface-water border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10">
          <DepthMarker label="1 FT" detail="Side by side" className="mb-3" />
          <h2 id="plans-compare-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">{lead}</p>
        </div>

        <div className="grid items-end gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const inheritedPlan = index > 0 ? plans[index - 1] : null;
            return (
              <article
                key={plan.id}
                id={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-ui border-2 border-[var(--art-stroke)] bg-coping shadow-[5px_5px_0_var(--art-stroke)] ${columnHeights[index] ?? ''} ${
                  plan.featured ? 'ring-4 ring-test-yellow/70' : ''
                }`}
              >
                {/* Raised coping step for the featured plan */}
                {plan.featured ? (
                  <div className="flex items-center justify-between border-b-2 border-[var(--art-stroke)] bg-test-yellow px-4 py-1.5 text-[#0A2A3D]">
                    <span className="font-display-condensed text-xs tracking-[0.14em] uppercase">
                      Most family pools
                    </span>
                    <span className="font-mono-reading text-xs font-bold">5 FT · POPULAR</span>
                  </div>
                ) : null}

                {/* Depth marker header bar */}
                <div className={`border-b-2 border-[var(--art-stroke)] px-6 py-5 ${waterHeaderBar[index] ?? waterHeaderBar[2]}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-tile border-2 border-[var(--art-stroke)] bg-coping px-2.5 py-0.5 font-display-wide text-sm tracking-wider text-ink">
                      {plan.depthMarker}
                    </span>
                    <span className="font-mono-reading text-xs uppercase tracking-wider opacity-85">
                      {plan.visitsPerWeek} visit / week
                    </span>
                  </div>
                  <h3 className="mt-4 font-display-wide text-3xl">{plan.name}</h3>
                  <p className="mt-1 text-sm opacity-90">{plan.summary}</p>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-mono-reading text-4xl font-bold">
                      ${plan.pricePerMonth}
                    </span>
                    <span className="font-mono-reading text-xs opacity-85">/ month</span>
                  </div>
                </div>

                {/* Rising water column body */}
                <div className={`flex flex-1 flex-col justify-between bg-gradient-to-b p-6 ${waterFills[index] ?? waterFills[2]}`}>
                  <div>
                    <p className="font-display-condensed text-xs tracking-[0.14em] uppercase text-ink/75">
                      Best for: {plan.bestFor}
                    </p>

                    {inheritedPlan ? (
                      <p className="mt-4 rounded-tile border border-[var(--art-stroke)]/40 bg-coping/80 px-3 py-2 text-xs font-semibold text-ink">
                        Everything in {inheritedPlan.name} ({inheritedPlan.depthMarker}), plus:
                      </p>
                    ) : null}

                    <ul className="mt-4 space-y-2.5 text-sm text-ink">
                      {plan.includes.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--art-stroke)] bg-coping font-mono-reading text-[0.65rem] font-bold text-primary dark:text-aqua"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4">
                    {plan.available ? (
                      <SiteLink
                        href="/contact/"
                        className={`button w-full ${plan.featured ? '' : 'button-quiet'}`}
                      >
                        Ask about {plan.name}
                      </SiteLink>
                    ) : (
                      <p className="rounded-tile border border-border bg-coping px-3 py-2 text-center font-mono-reading text-xs text-muted">
                        Waitlist only this month
                      </p>
                    )}
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

/** Strip of glossy tiles: one tick per tile, laid out like the waterline band. */
export function EveryPlanIncludesStrip({
  heading,
  items,
}: {
  heading: ReactNode;
  items: readonly string[];
}) {
  return (
    <section aria-labelledby="every-plan-heading" className="surface-coping border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-12 sm:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 id="every-plan-heading" className="font-display-wide text-2xl sm:text-3xl">
            {heading}
          </h2>
          <span className="font-mono-reading text-xs uppercase tracking-wider text-muted">
            Standard across all 3 tiers
          </span>
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <li
              key={item}
              className={`flex items-start gap-3 rounded-tile border-2 border-[var(--art-stroke)] p-4 ${
                idx % 2 === 0 ? 'bg-tile text-white' : 'bg-tile-deep text-white'
              }`}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-tile border border-white/60 bg-white/15 font-mono-reading text-xs font-bold"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-sm font-medium leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Pool-supply shelf: each add-on styled as a labelled chemical tub / tool silhouette with a price tag. */
export function AddonsShelfSection({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead: ReactNode;
}) {
  return (
    <section aria-labelledby="addons-heading" className="surface-sand border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-10">
          <DepthMarker label="2 FT" detail="Add-ons" className="mb-3" />
          <h2 id="addons-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">{lead}</p>
        </div>

        {/* Supply shelf frame */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {addons.map(addon => (
            <div
              key={addon.id}
              className={`flex flex-col justify-between rounded-t-xl rounded-b-tile border-2 border-[var(--art-stroke)] bg-coping shadow-[3px_3px_0_var(--art-stroke)] ${
                addon.available ? '' : 'opacity-65'
              }`}
            >
              {/* Chemical tub lid bar */}
              <div className="flex items-center justify-between rounded-t-[10px] border-b-2 border-[var(--art-stroke)] bg-shallow px-3.5 py-2">
                <span className="font-mono-reading text-xs font-bold uppercase text-ink">
                  ${addon.price}/{addon.unit === 'month' ? 'mo' : 'visit'}
                </span>
                <span className="h-2.5 w-2.5 rounded-full border border-[var(--art-stroke)] bg-test-yellow" aria-hidden="true" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-display-wide text-base leading-snug text-ink">
                    {addon.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{addon.note}</p>
                </div>
                <p className="mt-4 border-t border-border pt-2 font-mono-reading text-[0.7rem] uppercase tracking-wider text-muted">
                  {addon.available ? `Per ${addon.unit}` : 'Unavailable this month'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shelf plank line */}
        <div className="mt-3 h-3 w-full rounded-full border-2 border-[var(--art-stroke)] bg-coping" aria-hidden="true" />
      </div>
    </section>
  );
}

/** Pool size notes + "How starting works" 3 numbered steps along a lane-rope divider. */
export function StartingAndPricingSection({
  pricingHeading,
  pricingChildren,
  stepsHeading,
  steps,
}: {
  pricingHeading: ReactNode;
  pricingChildren: ReactNode;
  stepsHeading: ReactNode;
  steps: readonly { title: string; detail: string }[];
}) {
  return (
    <section aria-labelledby="starting-heading" className="surface-water border-b-2 border-[var(--art-stroke)]">
      <div className="wrap py-14 sm:py-20">
        {/* Pricing note */}
        <div className="mb-12 max-w-3xl rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-6 shadow-[4px_4px_0_var(--art-stroke)]">
          <DepthMarker label="3 FT" detail="Pool size & pricing" className="mb-3" />
          <h2 className="font-display-wide text-2xl sm:text-3xl">{pricingHeading}</h2>
          <div className="mt-3 space-y-2 text-muted">{pricingChildren}</div>
        </div>

        {/* How starting works */}
        <h2 id="starting-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
          {stepsHeading}
        </h2>
        <LaneRopeDivider className="my-4" />

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-5 shadow-[3px_3px_0_var(--art-stroke)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--art-stroke)] bg-test-yellow font-mono-reading text-sm font-bold text-[#0A2A3D]">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display-wide text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Native <details> FAQ styled as pool-rules signs. */
export function PoolRulesFaqSection({
  heading,
  items,
}: {
  heading: ReactNode;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section aria-labelledby="faq-heading" className="surface-coping">
      <div className="wrap py-14 sm:py-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <DepthMarker label="4 FT" detail="Pool rules FAQ" className="mb-3" />
            <h2 id="faq-heading" className="font-display-wide text-3xl leading-tight sm:text-4xl">
              {heading}
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map(item => (
            <details
              key={item.question}
              className="group rounded-tile border-2 border-[var(--art-stroke)] bg-plaster p-5 shadow-[3px_3px_0_var(--art-stroke)]"
            >
              <summary className="flex items-center justify-between gap-4 font-display-wide text-lg text-ink">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-tile border-2 border-[var(--art-stroke)] bg-coping font-mono-reading text-sm transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
