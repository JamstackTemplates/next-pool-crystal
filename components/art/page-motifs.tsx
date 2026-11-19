import type { ReactNode } from 'react';

export type PageMotifKind = 'plans' | 'repairs' | 'rescue' | 'contact';

/** Small themed right-hand motif for inner page heads. */
export function PageHeadMotif({ kind }: { kind: PageMotifKind }): ReactNode {
  switch (kind) {
    case 'plans':
      return (
        <svg viewBox="0 0 180 86" className="h-20 w-44 shrink-0 select-none" aria-hidden="true">
          {[
            { x: 6, y: 26, label: '3 FT', fill: 'var(--shallow)', ink: 'var(--ink)' },
            { x: 64, y: 14, label: '5 FT', fill: 'var(--tile)', ink: '#FFFFFF' },
            { x: 122, y: 4, label: '8 FT', fill: 'var(--primary)', ink: '#FFFFFF' },
          ].map(tile => (
            <g key={tile.label} transform={`translate(${tile.x}, ${tile.y})`}>
              <rect width="52" height="54" rx="5" fill={tile.fill} stroke="var(--art-stroke)" strokeWidth="2.2" />
              <rect x="5" y="6" width="42" height="18" rx="3" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.6" />
              <text x="26" y="19" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-display)" fontWeight="800" fontSize="11">
                {tile.label}
              </text>
              <path d="M 8 38 Q 18 33, 26 38 T 44 38" fill="none" stroke={tile.ink} strokeOpacity="0.65" strokeWidth="2" />
            </g>
          ))}
        </svg>
      );
    case 'repairs':
      return (
        <svg viewBox="0 0 180 86" className="h-20 w-44 shrink-0 select-none" aria-hidden="true">
          <rect x="14" y="30" width="52" height="40" rx="6" fill="var(--tile)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <circle cx="80" cy="50" r="20" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <circle cx="80" cy="50" r="8" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2" />
          <rect x="120" y="14" width="18" height="56" rx="5" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <rect x="146" y="14" width="18" height="56" rx="5" fill="var(--test-red)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <path d="M 126 24 V 58 M 152 24 V 58" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'rescue':
      return (
        <svg viewBox="0 0 180 86" className="h-20 w-44 shrink-0 select-none" aria-hidden="true">
          {['#1E2A1E', '#2F5B33', '#4E9A5B', '#9FD39A', '#7FD6F0'].map((swatch, idx) => (
            <g key={swatch} transform={`translate(${8 + idx * 33}, 16)`}>
              <rect width="28" height="54" rx="5" fill={swatch} stroke="var(--art-stroke)" strokeWidth="2" />
              <path d="M 5 38 Q 14 34, 23 38" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.8" />
            </g>
          ))}
        </svg>
      );
    case 'contact':
      return (
        <svg viewBox="0 0 180 86" className="h-20 w-44 shrink-0 select-none" aria-hidden="true">
          <rect x="12" y="18" width="84" height="54" rx="7" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <path d="M 16 24 L 54 50 L 92 24" fill="none" stroke="var(--tile)" strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="136" cy="45" r="27" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="2.2" />
          <path
            d="M 125 34 H 132 L 135 41 L 131 44 A 14 14 0 0 0 139 52 L 142 48 L 149 51 V 58 A 2 2 0 0 1 146 60 C 133 59 124 50 123 37 A 2 2 0 0 1 125 34 Z"
            fill="var(--primary)"
            stroke="var(--art-stroke)"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
}

/**
 * Small pool window vignette showing water clarity at a specific day in a green-pool rescue.
 */
export function RescuePoolWindow({
  swatch,
  clarity,
  dayLabel,
}: {
  swatch: string;
  clarity: 'opaque' | 'murky' | 'hazy' | 'bright' | 'crystal';
  dayLabel: string;
}) {
  const showFloor = clarity === 'hazy' || clarity === 'bright' || clarity === 'crystal';
  const causticOpacity = clarity === 'crystal' ? 0.55 : clarity === 'bright' ? 0.35 : clarity === 'hazy' ? 0.18 : 0.05;

  return (
    <svg viewBox="0 0 220 128" className="h-auto w-full select-none" aria-hidden="true">
      {/* Coping frame */}
      <rect x="2" y="2" width="216" height="124" rx="10" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.4" />
      {/* Tile inner lip */}
      <rect x="12" y="12" width="196" height="104" rx="6" fill="var(--tile)" stroke="var(--art-stroke)" strokeWidth="2" />
      {/* Water fill */}
      <rect x="18" y="22" width="184" height="88" rx="4" fill={swatch} />
      {/* Visible steps/floor as water clears */}
      {showFloor ? (
        <path
          d="M 18 52 H 72 V 110 M 18 76 H 54 V 110"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={clarity === 'crystal' ? 0.65 : 0.32}
          strokeWidth="2"
        />
      ) : null}
      {/* Caustic shimmer */}
      <g fill="none" stroke="#FFFFFF" strokeOpacity={causticOpacity} strokeWidth="2">
        <path d="M 28 46 Q 74 34, 120 48 T 194 44" />
        <path d="M 32 82 Q 84 70, 134 86 T 192 80" />
      </g>
      {/* Day stencil badge */}
      <rect x="24" y="28" width="62" height="22" rx="3" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.6" />
      <text x="55" y="43" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700">
        {dayLabel}
      </text>
    </svg>
  );
}
