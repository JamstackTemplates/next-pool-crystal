type Props = {
  /** Show numbered callout pins (used on Repairs & testing page). */
  numbered?: boolean;
  className?: string;
};

/**
 * Equipment pad illustration: pump, cartridge filter with pressure gauge,
 * heater and salt cell connected by PVC plumbing.
 */
export function EquipmentPad({ numbered = false, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 640 360"
      className={`h-auto w-full select-none ${className}`}
      role="img"
      aria-label="Illustration of a residential pool equipment pad showing a circulation pump, cartridge filter with pressure gauge, pool heater and salt chlorine generator cell connected by PVC pipes"
    >
      {/* Concrete equipment pad base */}
      <rect
        x="16"
        y="272"
        width="608"
        height="58"
        rx="8"
        fill="var(--coping)"
        stroke="var(--art-stroke)"
        strokeWidth="2.5"
      />
      <path d="M 38 292 H 602" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 8" />

      {/* Connecting PVC pipe run */}
      <g fill="none" stroke="var(--art-stroke)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 36 244 H 96" />
        <path d="M 148 192 V 164 H 222" />
        <path d="M 308 232 H 362" />
        <path d="M 488 222 H 522" />
        <path d="M 594 222 H 612 V 270" />
      </g>
      <g fill="none" stroke="var(--coping)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 36 244 H 96" />
        <path d="M 148 192 V 164 H 222" />
        <path d="M 308 232 H 362" />
        <path d="M 488 222 H 522" />
        <path d="M 594 222 H 612 V 270" />
      </g>

      {/* 1. Circulation Pump */}
      <g transform="translate(82, 186)">
        <rect x="0" y="34" width="66" height="56" rx="8" fill="var(--tile)" stroke="var(--art-stroke)" strokeWidth="2.4" />
        <path d="M 12 48 H 54 M 12 58 H 54 M 12 68 H 54" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
        <circle cx="80" cy="60" r="28" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="2.4" />
        <circle cx="80" cy="60" r="14" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2" />
        <rect x="64" y="16" width="32" height="18" rx="4" fill="var(--primary)" stroke="var(--art-stroke)" strokeWidth="2" />
        <text x="48" y="114" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
          PUMP
        </text>
      </g>

      {/* 2. Cartridge Filter + Pressure Gauge */}
      <g transform="translate(212, 82)">
        {/* Tank body */}
        <rect x="8" y="36" width="90" height="156" rx="34" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="2.5" />
        {/* Center clamp band */}
        <rect x="4" y="106" width="98" height="16" rx="4" fill="var(--primary)" stroke="var(--art-stroke)" strokeWidth="2.2" />
        {/* Gloss highlight */}
        <path d="M 24 58 V 94 M 24 132 V 172" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="4" strokeLinecap="round" />
        {/* Pressure gauge on top */}
        <path d="M 53 36 V 24" stroke="var(--art-stroke)" strokeWidth="3" />
        <circle cx="53" cy="16" r="14" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.2" />
        <path d="M 45 20 A 9 9 0 0 1 61 20" fill="none" stroke="var(--tile)" strokeWidth="2" />
        <path d="M 53 16 L 59 10" stroke="var(--test-red)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="53" y="218" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
          FILTER
        </text>
      </g>

      {/* 3. Pool Heater */}
      <g transform="translate(362, 134)">
        <rect x="0" y="0" width="126" height="140" rx="10" fill="var(--sand)" stroke="var(--art-stroke)" strokeWidth="2.5" />
        {/* Top louver vent */}
        <rect x="14" y="14" width="98" height="24" rx="4" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2" />
        <path d="M 26 26 H 100" stroke="var(--muted)" strokeWidth="2" strokeDasharray="8 6" />
        {/* Control display */}
        <rect x="22" y="52" width="82" height="34" rx="5" fill="var(--deep-water)" stroke="var(--art-stroke)" strokeWidth="2" />
        <text x="63" y="74" textAnchor="middle" fill="var(--aqua)" fontFamily="var(--font-mono)" fontSize="15" fontWeight="700">
          82°F
        </text>
        {/* Flame badge */}
        <path
          d="M 63 98 C 70 106, 73 112, 73 117 A 10 10 0 0 1 53 117 C 53 112, 56 106, 63 98 Z"
          fill="var(--test-red)"
          stroke="var(--art-stroke)"
          strokeWidth="2"
        />
        <text x="63" y="166" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
          HEATER
        </text>
      </g>

      {/* 4. Salt Cell */}
      <g transform="translate(520, 198)">
        <rect x="0" y="6" width="76" height="36" rx="10" fill="var(--tile)" stroke="var(--art-stroke)" strokeWidth="2.4" />
        <rect x="16" y="13" width="44" height="22" rx="4" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <path d="M 26 17 V 31 M 38 17 V 31 M 50 17 V 31" stroke="var(--aqua)" strokeWidth="2.2" />
        {/* Status LED */}
        <circle cx="38" cy="-4" r="5" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <text x="38" y="102" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
          SALT CELL
        </text>
      </g>

      {/* Optional numbered callout pins for Repairs & testing page */}
      {numbered ? (
        <g fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
          {[
            { n: '1', x: 118, y: 162 },
            { n: '2', x: 296, y: 68 },
            { n: '3', x: 425, y: 112 },
            { n: '4', x: 558, y: 166 },
          ].map(pin => (
            <g key={pin.n} transform={`translate(${pin.x}, ${pin.y})`}>
              <circle cx="0" cy="0" r="14" fill="var(--test-yellow)" stroke="#0A2A3D" strokeWidth="2.2" />
              <text x="0" y="4.5" textAnchor="middle" fill="#0A2A3D">
                {pin.n}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}
