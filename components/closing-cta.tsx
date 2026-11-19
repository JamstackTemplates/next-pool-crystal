import type { ReactNode } from 'react';
import { business, phoneHref } from '../content/business';
import { PoolIcon } from './art/icons';
import { WaterlineTileBand } from './art/waterline-tile-band';
import { SiteLink } from './site-link';

type Props = {
  heading: ReactNode;
  lead?: ReactNode;
  ctaLabel?: string;
};

/**
 * Closing call to action on the full-height waterline tile band + deep-water panel.
 */
export function ClosingCta({ heading, lead, ctaLabel = 'Ask about a weekly plan' }: Props) {
  return (
    <section aria-label="Enquire" className="relative">
      <WaterlineTileBand height="tall" />
      <div className="surface-deep relative">
        <div className="wrap relative z-10 flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center sm:py-16">
          <div className="max-w-xl">
            <p className="font-display-condensed text-xs tracking-[0.16em] uppercase text-aqua">
              Newport · Laguna · OC Coast
            </p>
            <h2 className="mt-2 font-display-wide text-3xl leading-tight text-deep-water-ink sm:text-5xl">
              {heading}
            </h2>
            {lead ? <p className="mt-3 text-base text-deep-water-muted sm:text-lg">{lead}</p> : null}
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <SiteLink href="/contact/" className="button button-on-deep text-base">
              {ctaLabel}
            </SiteLink>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-reading text-sm text-deep-water-ink">
              {business.phone ? (
                <a
                  href={phoneHref(business.phone)}
                  className="inline-flex items-center gap-1.5 text-deep-water-ink underline decoration-aqua/70 underline-offset-4 hover:text-aqua"
                >
                  <PoolIcon name="phone" className="h-4 w-4 text-aqua" />
                  <span>{business.phone}</span>
                </a>
              ) : null}
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-1.5 text-deep-water-ink underline decoration-aqua/70 underline-offset-4 hover:text-aqua"
              >
                <PoolIcon name="envelope" className="h-4 w-4 text-aqua" />
                <span>{business.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
