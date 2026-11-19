'use client';

import { useEffect, useId, useState } from 'react';
import {
  crystalClarityState,
  formatVisits,
  rescueLevels,
  type RescueLevel,
} from '../content/rescue-levels';
import { lowestPlanPrice } from '../content/plans';
import { SiteLink } from './site-link';

type ClarityOption =
  | {
      kind: 'crystal';
      id: 'crystal';
      name: string;
      swatch: string;
      looksLike: string;
      recommendation: string;
    }
  | ({ kind: 'rescue' } & RescueLevel);

const CLARITY_OPTIONS: readonly ClarityOption[] = [
  { kind: 'crystal', ...crystalClarityState },
  ...rescueLevels.map(level => ({ kind: 'rescue' as const, ...level })),
];

type Props = {
  /** Heading text; passed from the page file so owners can edit copy in route files. */
  heading: string;
  /** Optional depth-marker badge label. */
  depthMarker?: string;
  /** Optional sub-copy under heading. */
  intro?: string;
  /** Default selected state after hydration. */
  defaultSelected?: ClarityOption['id'];
};

function visibilityLevel(id: ClarityOption['id']): number {
  switch (id) {
    case 'crystal':
      return 1;
    case 'haze':
      return 0.65;
    case 'lime':
      return 0.45;
    case 'emerald':
      return 0.16;
    case 'swamp':
      return 0.06;
    case 'lagoon':
      return 0.02;
    default:
      return 0.2;
  }
}

function isDarkSwatch(id: ClarityOption['id']): boolean {
  return id === 'emerald' || id === 'swamp' || id === 'lagoon';
}

/**
 * Signature interaction: Water clarity comparator.
 * - Without JavaScript (and in static SSR HTML), renders all six clarity states as a static list
 *   with swatches, descriptions, visit/price estimates and links.
 * - After hydration, upgrades to a keyboard-operable radio comparator that smoothly tints
 *   a large pool-window SVG (300ms transition, instant under reduced motion).
 */
export function ClarityComparator({
  heading,
  depthMarker,
  intro,
  defaultSelected = 'crystal',
}: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState<ClarityOption['id']>(defaultSelected);
  const groupName = useId();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const selected = CLARITY_OPTIONS.find(option => option.id === selectedId) ?? CLARITY_OPTIONS[0];
  const floorVisibility = visibilityLevel(selected.id);
  const darkWater = isDarkSwatch(selected.id);

  return (
    <div className="wrap py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          {depthMarker ? (
            <span className="mb-3 inline-flex items-center rounded-tile border-2 border-[var(--art-stroke)] bg-coping px-3 py-1 font-display-wide text-xs tracking-[0.12em] uppercase text-ink shadow-[2px_2px_0_var(--art-stroke)]">
              {depthMarker}
            </span>
          ) : null}
          <h2 className="font-display-wide text-3xl leading-tight sm:text-4xl">{heading}</h2>
          {intro ? <p className="mt-2 max-w-2xl text-muted">{intro}</p> : null}
        </div>
        <p className="font-mono-reading text-xs uppercase tracking-wider text-muted">
          Test-kit colour comparator · 6 states
        </p>
      </div>

      {!hydrated ? (
        /* Static / no-JS fallback: lists all six clarity states with swatch, details and link */
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLARITY_OPTIONS.map(option => (
            <li
              key={option.id}
              className="flex flex-col justify-between rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-5"
            >
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="h-9 w-9 shrink-0 rounded-tile border-2 border-[var(--art-stroke)]"
                    style={{ backgroundColor: option.swatch }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display-wide text-lg text-ink">{option.name}</h3>
                    <p className="font-mono-reading text-xs text-muted">
                      {option.kind === 'crystal'
                        ? `Weekly plans from $${lowestPlanPrice}/mo`
                        : `${formatVisits(option.typicalVisits)} · From $${option.fromPrice}`}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-ink">{option.looksLike}</p>
                <p className="mt-2 text-sm text-muted">{option.recommendation}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 pt-2">
                {option.kind === 'crystal' ? (
                  <SiteLink href="/plans/" className="text-link text-sm">
                    Compare weekly plans
                  </SiteLink>
                ) : (
                  <>
                    <SiteLink href="/green-pool-rescue/" className="text-link text-sm">
                      See rescue process
                    </SiteLink>
                    <SiteLink href="/contact/" className="text-link text-sm">
                      Ask about a rescue
                    </SiteLink>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        /* Interactive hydrated comparator: pool window on left, test-kit radio block on right */
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left: large pool window whose water tints smoothly */}
          <div className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-4 shadow-[4px_4px_0_var(--art-stroke)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-display-condensed text-xs tracking-[0.14em] uppercase text-muted">
                  Pool water window
                </span>
                <span className="font-mono-reading text-xs font-semibold text-ink">
                  {selected.name.toUpperCase()} · {selected.swatch}
                </span>
              </div>

              <svg
                viewBox="0 0 560 340"
                className="h-auto w-full rounded-tile border-2 border-[var(--art-stroke)]"
                role="img"
                aria-label={`Pool water window tinted to ${selected.name}: ${selected.looksLike}`}
              >
                {/* Coping top edge */}
                <rect x="0" y="0" width="560" height="36" fill="var(--coping)" />
                <line x1="0" y1="36" x2="560" y2="36" stroke="var(--art-stroke)" strokeWidth="2.5" />
                {/* Waterline mosaic strip */}
                {Array.from({ length: 20 }, (_, i) => (
                  <rect
                    key={i}
                    x={i * 28}
                    y="36"
                    width="26"
                    height="20"
                    fill={i % 2 === 0 ? 'var(--tile)' : 'var(--tile-deep)'}
                    stroke="var(--grout)"
                    strokeWidth="2"
                  />
                ))}

                {/* Water body — smoothly transitions colour */}
                <rect
                  x="0"
                  y="56"
                  width="560"
                  height="284"
                  style={{
                    fill: selected.swatch,
                    transition: 'fill 300ms ease',
                  }}
                />

                {/* Underwater steps & main drain (fade out as water turns darker green/black) */}
                <g
                  style={{
                    opacity: floorVisibility,
                    transition: 'opacity 300ms ease',
                  }}
                >
                  {/* Shallow steps */}
                  <rect x="0" y="56" width="132" height="62" fill="#FFFFFF" fillOpacity="0.24" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
                  <rect x="0" y="118" width="94" height="58" fill="#FFFFFF" fillOpacity="0.16" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2" />
                  {/* Floor grid lines */}
                  <path d="M 132 176 H 560 M 260 56 V 340 M 420 56 V 340" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.5" />
                  {/* Main drain */}
                  <circle cx="442" cy="252" r="22" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" />
                  <circle cx="442" cy="252" r="8" fill="#FFFFFF" fillOpacity="0.5" />
                </g>

                {/* Caustic net (bright in clear water, muted in algae) */}
                <g
                  className="caustic-drift"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  style={{
                    opacity: Math.max(0.08, floorVisibility * 0.45),
                    transition: 'opacity 300ms ease',
                  }}
                >
                  <path d="M 20 105 Q 110 82, 200 112 T 380 102 T 550 110" />
                  <path d="M 10 192 Q 120 168, 225 200 T 415 188 T 555 198" />
                  <path d="M 35 280 Q 140 256, 255 288 T 450 274 T 555 284" />
                </g>

                {/* Floating debris specks only for Swamp and Lagoon */}
                {selected.id === 'swamp' || selected.id === 'lagoon' ? (
                  <g fill="#0A2A3D" fillOpacity="0.45">
                    <ellipse cx="184" cy="146" rx="14" ry="6" transform="rotate(-14 184 146)" />
                    <ellipse cx="348" cy="212" rx="18" ry="7" transform="rotate(18 348 212)" />
                    <ellipse cx="268" cy="274" rx="12" ry="5" transform="rotate(-8 268 274)" />
                    {selected.id === 'lagoon' ? (
                      <>
                        <ellipse cx="440" cy="148" rx="20" ry="8" transform="rotate(12 440 148)" />
                        <ellipse cx="122" cy="242" rx="16" ry="6" transform="rotate(-22 122 242)" />
                      </>
                    ) : null}
                  </g>
                ) : null}

                {/* Chrome ladder rails */}
                <path d="M 484 22 V 126 M 526 22 V 126" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.85" />
                <path d="M 484 78 H 526 M 484 112 H 526" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.7" />

                {/* Surface meniscus line */}
                <path
                  className="waterline-ripple"
                  d="M -20 58 Q 50 53, 120 58 T 260 58 T 400 58 T 580 58"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeOpacity="0.9"
                />

                {/* Status stamp inside window */}
                <g transform="translate(20, 276)">
                  <rect
                    x="0"
                    y="0"
                    width="246"
                    height="44"
                    rx="5"
                    fill={darkWater ? '#04121C' : '#FFFFFF'}
                    fillOpacity="0.92"
                    stroke={darkWater ? '#3FE0EE' : '#0A2A3D'}
                    strokeWidth="2"
                  />
                  <text
                    x="14"
                    y="19"
                    fill={darkWater ? '#E6F6FA' : '#0A2A3D'}
                    fontFamily="var(--font-display)"
                    fontWeight="800"
                    fontSize="13"
                  >
                    {selected.name.toUpperCase()}
                  </text>
                  <text
                    x="14"
                    y="35"
                    fill={darkWater ? '#9CBAC8' : '#46667A'}
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {selected.kind === 'crystal'
                      ? `WEEKLY PLANS FROM $${lowestPlanPrice}/MO`
                      : `${formatVisits(selected.typicalVisits).toUpperCase()} · FROM $${selected.fromPrice}`}
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right: test-kit comparator block with 6 keyboard-operable radios */}
          <div className="flex flex-col justify-between rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-5 shadow-[4px_4px_0_var(--art-stroke)] sm:p-6 lg:col-span-5">
            <fieldset>
              <legend className="font-display-condensed text-xs tracking-[0.14em] uppercase text-muted">
                Match your pool’s water colour
              </legend>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
                {CLARITY_OPTIONS.map(option => {
                  const active = option.id === selected.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-tile border-2 p-2.5 transition-colors ${
                        active
                          ? 'border-primary bg-shallow/60 ring-2 ring-primary/30'
                          : 'border-border bg-plaster hover:border-ink'
                      }`}
                    >
                      <input
                        type="radio"
                        name={groupName}
                        value={option.id}
                        checked={active}
                        onChange={() => setSelectedId(option.id)}
                        className="sr-only"
                      />
                      <span
                        className="h-7 w-7 shrink-0 rounded-tile border-2 border-[var(--art-stroke)]"
                        style={{ backgroundColor: option.swatch }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block font-display-wide text-sm leading-tight text-ink">
                          {option.name}
                        </span>
                        <span className="block font-mono-reading text-[0.7rem] text-muted">
                          {option.kind === 'crystal' ? 'Weekly' : `From $${option.fromPrice}`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Live recommendation readout */}
            <div className="mt-6 border-t-2 border-border pt-5" aria-live="polite">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display-wide text-2xl text-ink">{selected.name}</h3>
                <span className="font-mono-reading text-sm font-bold text-primary dark:text-aqua">
                  {selected.kind === 'crystal'
                    ? `From $${lowestPlanPrice}/mo`
                    : `${formatVisits(selected.typicalVisits)} · From $${selected.fromPrice}`}
                </span>
              </div>

              <p className="mt-2 font-semibold text-ink">{selected.looksLike}</p>
              <p className="mt-2 text-sm text-muted">{selected.recommendation}</p>

              {selected.kind === 'rescue' && selected.drainConsult ? (
                <p className="mt-3 inline-flex items-center rounded-tile border-2 border-[var(--art-stroke)] bg-test-yellow px-2.5 py-1 font-display-condensed text-xs tracking-wider uppercase text-[#0A2A3D]">
                  Drain consult may be needed
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                {selected.kind === 'crystal' ? (
                  <>
                    <SiteLink href="/plans/" className="button">
                      Compare weekly plans
                    </SiteLink>
                    <SiteLink href="/contact/" className="button button-quiet">
                      Ask about a weekly plan
                    </SiteLink>
                  </>
                ) : (
                  <>
                    <SiteLink href="/contact/" className="button">
                      Ask about a {selected.name} rescue
                    </SiteLink>
                    <SiteLink href="/green-pool-rescue/" className="button button-quiet">
                      See rescue steps
                    </SiteLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
