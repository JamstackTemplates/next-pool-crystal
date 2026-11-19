import { useId } from 'react';

type Props = {
  className?: string;
};

/**
 * 404 illustration: "Lost in the deep end"
 * Drained pool with high-and-dry waterline tile band, bare plaster floor,
 * lone striped inflatable ring, painted "404 FT" marker and "NO DIVING" stencil.
 */
export function DrainedPoolArt({ className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const tileId = `dry-tile-${uid}`;

  return (
    <svg
      viewBox="0 0 680 340"
      className={`h-auto w-full select-none ${className}`}
      role="img"
      aria-label="Illustration of a drained swimming pool with a dry blue tile band, a painted 404 FT depth marker, a NO DIVING stencil and a striped inflatable ring on the bare plaster floor"
    >
      <defs>
        <pattern id={tileId} width="32" height="24" patternUnits="userSpaceOnUse">
          <rect width="32" height="24" fill="var(--grout)" />
          <rect x="1.5" y="1.5" width="13.5" height="21" rx="1" fill="var(--tile)" />
          <rect x="17" y="1.5" width="13.5" height="21" rx="1" fill="var(--tile-deep)" />
          <path d="M3 4 H10 L8 7 H3 Z" fill="#FFFFFF" fillOpacity="0.32" />
        </pattern>
      </defs>

      {/* Coping deck strip across the top */}
      <rect x="12" y="14" width="656" height="54" rx="8" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.5" />

      {/* Painted 404 FT depth marker */}
      <g transform="translate(36, 24)">
        <rect x="0" y="0" width="114" height="34" rx="4" fill="var(--test-yellow)" stroke="#0A2A3D" strokeWidth="2.2" />
        <text x="57" y="23" textAnchor="middle" fill="#0A2A3D" fontFamily="var(--font-display)" fontWeight="800" fontSize="18" letterSpacing="1.5">
          404 FT
        </text>
      </g>

      {/* NO DIVING stencil */}
      <g transform="translate(496, 24)">
        <rect x="0" y="0" width="144" height="34" rx="4" fill="var(--coping)" stroke="var(--test-red)" strokeWidth="2.2" />
        <text x="72" y="23" textAnchor="middle" fill="var(--test-red)" fontFamily="var(--font-display)" fontWeight="800" fontSize="15" letterSpacing="2">
          NO DIVING
        </text>
      </g>

      {/* High-and-dry waterline tile band */}
      <rect x="24" y="68" width="632" height="32" fill={`url(#${tileId})`} stroke="var(--art-stroke)" strokeWidth="2.4" />

      {/* Empty plaster wall & sloped deep-end floor */}
      <path
        d="M 24 100 H 656 V 316 H 24 Z"
        fill="var(--plaster)"
        stroke="var(--art-stroke)"
        strokeWidth="2.5"
      />
      {/* Perspective floor corner lines */}
      <path d="M 24 234 H 656" fill="none" stroke="var(--border)" strokeWidth="2" />
      <path d="M 110 100 L 146 234 L 92 316 M 570 100 L 534 234 L 588 316" fill="none" stroke="var(--border)" strokeWidth="2" />

      {/* Main drain cover on bare floor */}
      <ellipse cx="470" cy="276" rx="26" ry="10" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2" />
      <path d="M 454 276 H 486 M 460 272 H 480 M 460 280 H 480" stroke="var(--muted)" strokeWidth="1.5" />

      {/* Lone striped inflatable ring on the bare plaster */}
      <g transform="translate(268, 252)">
        <ellipse cx="4" cy="28" rx="68" ry="18" fill="var(--ink)" fillOpacity="0.12" />
        <ellipse cx="0" cy="14" rx="66" ry="28" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.5" />
        {/* Red & yellow stripes */}
        <path d="M -52 1 C -38 -12, -20 -14, -8 -14 L -14 2 C -26 4, -36 10, -40 16 Z" fill="var(--test-red)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <path d="M 18 -14 C 36 -12, 50 -4, 58 6 L 38 14 C 32 8, 24 4, 14 2 Z" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <path d="M -38 28 C -24 38, -4 42, 16 40 L 12 24 C 0 26, -14 24, -24 20 Z" fill="var(--tile)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        {/* Inner hole */}
        <ellipse cx="0" cy="14" rx="28" ry="11" fill="var(--plaster)" stroke="var(--art-stroke)" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
