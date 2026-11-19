import type { ReactNode } from 'react';
import { DepthMarker } from './art/depth-marker';
import { PageHeadMotif, type PageMotifKind } from './art/page-motifs';
import { WaterlineTileBand } from './art/waterline-tile-band';

/**
 * Themed coping-strip page head for all inner pages:
 * large depth-marker numeral, wide Anybody title, one-line lead, right-hand motif,
 * and a waterline tile band underneath.
 */
export function PageHead({
  depthMarker,
  eyebrow,
  title,
  motif,
  children,
  id,
}: {
  depthMarker: string;
  eyebrow: string;
  title: ReactNode;
  motif?: PageMotifKind;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="surface-coping">
      <header className="wrap flex flex-wrap items-end justify-between gap-6 py-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <DepthMarker label={depthMarker} />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h1
            id={id}
            className="font-display-wide text-[clamp(2.2rem,5.4vw,3.75rem)] leading-[1.06] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-base text-muted sm:text-lg">{children}</div>
          ) : null}
        </div>

        {motif ? (
          <div className="hidden print-hide sm:block">
            <PageHeadMotif kind={motif} />
          </div>
        ) : null}
      </header>
      <WaterlineTileBand height="slim" />
    </div>
  );
}
