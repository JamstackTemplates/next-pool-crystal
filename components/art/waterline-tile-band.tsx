import { useId } from 'react';
import { SiteLink } from '../site-link';

export interface TileDepthMarker {
  label: string;
  sublabel?: string;
  href?: string;
  featured?: boolean;
}

type Props = {
  /** Slim sits under the header/page-head; medium carries Home depth markers; tall backs the closing CTA. */
  height?: 'slim' | 'medium' | 'tall';
  /** Optional painted depth-marker tiles embedded directly into the waterline band. */
  markers?: readonly TileDepthMarker[];
  className?: string;
};

const HEIGHT_CLASS = {
  slim: 'h-10 sm:h-11',
  medium: 'min-h-[4.75rem]',
  tall: 'h-16 sm:h-20',
} as const;

/**
 * Signature element: full-width glossy square mosaic waterline tile band.
 * Two pool blues with white grout lines, diagonal gloss streaks, and a gently rippling
 * water surface across the lower third where submerged tiles look refracted and lighter.
 */
export function WaterlineTileBand({ height = 'slim', markers, className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const tilePatternId = `mosaic-${uid}`;
  const refractedPatternId = `mosaic-sub-${uid}`;
  const waterClipId = `water-clip-${uid}`;

  return (
    <div
      className={`relative w-full overflow-hidden border-y-2 border-[var(--art-stroke)] select-none ${HEIGHT_CLASS[height]} ${className}`}
      aria-hidden={markers && markers.length > 0 ? undefined : true}
    >
      {/* Base tile mosaic + refracted lower third */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 84"
        aria-hidden="true"
      >
        <defs>
          {/* Above-water glossy 2-tone square mosaic tiles */}
          <pattern id={tilePatternId} width="56" height="28" patternUnits="userSpaceOnUse">
            <rect width="56" height="28" fill="var(--grout)" />
            <rect x="1.5" y="1.5" width="25" height="25" rx="1.5" fill="var(--tile)" />
            <rect x="29.5" y="1.5" width="25" height="25" rx="1.5" fill="var(--tile-deep)" />
            {/* Glossy highlight streaks */}
            <path d="M4 5 H15 L11 9 H4 Z" fill="#FFFFFF" fillOpacity="0.34" />
            <path d="M32 5 H45 L40 9 H32 Z" fill="#FFFFFF" fillOpacity="0.24" />
            <path d="M4 22 H24" stroke="#04121C" strokeOpacity="0.16" strokeWidth="1.2" />
            <path d="M32 22 H52" stroke="#04121C" strokeOpacity="0.22" strokeWidth="1.2" />
          </pattern>

          {/* Below-water refracted/shifted lighter mosaic tiles */}
          <pattern id={refractedPatternId} width="56" height="28" patternUnits="userSpaceOnUse" patternTransform="translate(5 2)">
            <rect width="56" height="28" fill="var(--grout)" fillOpacity="0.72" />
            <rect x="1.5" y="1.5" width="25" height="25" rx="1.5" fill="var(--aqua)" fillOpacity="0.75" />
            <rect x="29.5" y="1.5" width="25" height="25" rx="1.5" fill="var(--tile)" fillOpacity="0.78" />
            <path d="M6 12 Q 16 9, 25 13" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.6" fill="none" />
            <path d="M34 15 Q 44 12, 53 16" stroke="#FFFFFF" strokeOpacity="0.38" strokeWidth="1.6" fill="none" />
          </pattern>

          <clipPath id={waterClipId}>
            <path
              className="waterline-ripple"
              d="M -40 54 Q 30 48, 100 54 T 240 54 T 380 54 T 520 54 T 660 54 T 800 54 T 940 54 T 1080 54 T 1240 54 L 1280 88 L -40 88 Z"
            />
          </clipPath>
        </defs>

        <rect width="1200" height="84" fill={`url(#${tilePatternId})`} />

        {/* Refracted submerged lower third */}
        <g clipPath={`url(#${waterClipId})`}>
          <rect width="1200" height="84" fill={`url(#${refractedPatternId})`} />
          <rect width="1200" height="84" fill="var(--aqua)" fillOpacity="0.22" />
        </g>

        {/* Bright surface meniscus ripple */}
        <path
          className="waterline-ripple"
          d="M -40 54 Q 30 48, 100 54 T 240 54 T 380 54 T 520 54 T 660 54 T 800 54 T 940 54 T 1080 54 T 1240 54"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeOpacity="0.92"
        />
        <path
          className="waterline-ripple"
          d="M -20 62 Q 50 58, 120 62 T 260 62 T 400 62 T 540 62 T 680 62 T 820 62 T 960 62 T 1100 62 T 1260 62"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeOpacity="0.48"
        />
      </svg>

      {/* Optional painted depth-marker tiles embedded along the band */}
      {markers && markers.length > 0 ? (
        <div className="wrap relative z-10 flex flex-wrap items-center justify-between gap-2 py-2.5 sm:gap-4">
          {markers.map(marker => {
            const tile = (
              <span
                className={`inline-flex items-center gap-2 rounded-tile border-2 border-[var(--art-stroke)] px-3 py-1.5 shadow-sm transition-transform hover:-translate-y-0.5 ${
                  marker.featured ? 'bg-test-yellow text-[#0A2A3D]' : 'bg-coping text-ink'
                }`}
              >
                <span className="font-display-wide text-xs tracking-wider uppercase sm:text-sm">
                  {marker.label}
                </span>
                {marker.sublabel ? (
                  <span className="font-mono-reading text-xs font-semibold sm:text-sm">
                    {marker.sublabel}
                  </span>
                ) : null}
              </span>
            );

            return marker.href ? (
              <SiteLink key={marker.label} href={marker.href} className="no-underline hover:no-underline">
                {tile}
              </SiteLink>
            ) : (
              <span key={marker.label}>{tile}</span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
