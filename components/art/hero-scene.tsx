import { useId } from 'react';

type Props = {
  className?: string;
};

/**
 * Hero illustration: "Tuesday, 9:40 a.m." — pool & spa from above.
 * Top-down architectural view of a sunlit Orange County backyard:
 * - Large travertine deck pavers with speckle and palm-frond shadows
 * - Raised round spa with stacked-stone face, mosaic tile ring, steam, jets, bench ring
 *   and a floating "102°" thermometer, spilling over a sheet-water lip into the pool
 * - Pool with bullnose coping, "4 FT" marker, glossy waterline tile band, corner entry
 *   steps, chrome ladder, underwater light, floor lane line and drifting caustics
 * - Skimmer net on a telescopic pole catching a leaf
 * - Lounger, folded towel, open drop-test kit, deck skimmer lid and potted palm
 * Re-themes via CSS tokens into a moonlit night swim in dark mode.
 */
export function HeroScene({ className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `hero-${name}-${uid}`;
  const ref = (name: string) => `url(#${id(name)})`;

  // Spa geometry (top-down circle that overlaps the pool's back-left corner)
  const spa = { cx: 196, cy: 190, r: 112, tile: 94, water: 86 };

  return (
    <svg
      viewBox="0 0 800 560"
      className={`h-auto w-full select-none ${className}`}
      role="img"
      aria-label="Illustration of a sunlit backyard from above: a raised, steaming spa with jets and a floating thermometer spills over into a crystal-clear pool with entry steps, a chrome ladder and a skimmer net catching a leaf, beside a lounger, towel, potted palm and an open water test kit on the deck"
    >
      <defs>
        {/* Pool water: shallow luminous aqua to deep blue */}
        <linearGradient id={id('water')} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="var(--shallow)" />
          <stop offset="40%" stopColor="var(--aqua)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>

        {/* Spa water: brighter, warmer-looking centre */}
        <radialGradient id={id('spa-water')} cx="45%" cy="42%" r="62%">
          <stop offset="0%" stopColor="var(--shallow)" />
          <stop offset="55%" stopColor="var(--aqua)" stopOpacity="0.92" />
          <stop offset="100%" stopColor="var(--tile)" />
        </radialGradient>

        {/* Underwater light glow */}
        <radialGradient id={id('beam')} cx="8%" cy="62%" r="48%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="30%" stopColor="var(--aqua)" stopOpacity="0.36" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>

        {/* Spillover sheet water */}
        <linearGradient id={id('sheet')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--shallow)" stopOpacity="0.85" />
        </linearGradient>

        {/* Deck speckle */}
        <pattern id={id('speckle')} width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="12" r="0.9" fill="var(--ink)" fillOpacity="0.09" />
          <circle cx="28" cy="7" r="0.8" fill="var(--ink)" fillOpacity="0.07" />
          <circle cx="47" cy="19" r="1.1" fill="var(--ink)" fillOpacity="0.09" />
          <circle cx="17" cy="34" r="0.85" fill="var(--ink)" fillOpacity="0.08" />
          <circle cx="38" cy="44" r="1" fill="var(--ink)" fillOpacity="0.07" />
          <circle cx="52" cy="49" r="0.8" fill="var(--ink)" fillOpacity="0.08" />
        </pattern>

        {/* Glossy two-tone waterline mosaic */}
        <pattern id={id('tile')} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="var(--grout)" />
          <rect x="1" y="1" width="6.5" height="6.5" rx="0.6" fill="var(--tile)" />
          <rect x="8.5" y="1" width="6.5" height="6.5" rx="0.6" fill="var(--tile-deep)" />
          <rect x="1" y="8.5" width="6.5" height="6.5" rx="0.6" fill="var(--tile-deep)" />
          <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="0.6" fill="var(--tile)" />
          <path d="M2 2 H5.5 L4 3.5 H2 Z M9.5 9.5 H13 L11.5 11 H9.5 Z" fill="#FFFFFF" fillOpacity="0.4" />
        </pattern>

        <filter id={id('soft')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        {/* Pool water clip (runs off the right and bottom edges) */}
        <clipPath id={id('pool')}>
          <rect x="260" y="220" width="560" height="360" rx="6" />
        </clipPath>

        {/* Spa wall face clip */}
        <clipPath id={id('spa-face')}>
          <circle cx={spa.cx} cy={spa.cy + 16} r={spa.r} />
        </clipPath>

        <clipPath id={id('spa-water-clip')}>
          <circle cx={spa.cx} cy={spa.cy} r={spa.water} />
        </clipPath>
      </defs>

      {/* 1. TRAVERTINE DECK */}
      <rect width="800" height="560" fill="var(--sand)" />
      <rect width="800" height="560" fill={ref('speckle')} />
      <g stroke="var(--border)" strokeWidth="1.6" strokeOpacity="0.9">
        <path d="M0 100 H800 M0 200 H800 M0 300 H260 M0 400 H260 M0 500 H260" />
        <path d="M110 0 V560 M330 0 V200 M440 0 V200 M550 0 V200 M660 0 V200 M770 0 V200" />
      </g>

      {/* Deck skimmer lid */}
      <g transform="translate(724, 166)">
        <circle r="15" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <circle r="10.5" fill="none" stroke="var(--border)" strokeWidth="1.3" />
        <circle cx="-4" r="1.6" fill="var(--muted)" />
        <circle cx="4" r="1.6" fill="var(--muted)" />
      </g>

      {/* 2. POOL COPING */}
      <rect x="240" y="202" width="600" height="400" rx="20" fill="var(--ink)" fillOpacity="0.08" />
      <rect
        x="236"
        y="196"
        width="600"
        height="400"
        rx="20"
        fill="var(--coping)"
        stroke="var(--art-stroke)"
        strokeWidth="2.2"
      />
      <rect x="236" y="196" width="600" height="400" rx="20" fill={ref('speckle')} />
      <g stroke="var(--border)" strokeWidth="1.6">
        <path d="M360 197 V219 M470 197 V219 M580 197 V219 M690 197 V219 M790 197 V219" />
        <path d="M237 340 H259 M237 450 H259" />
      </g>

      {/* "4 FT" depth marker inlaid in the back coping */}
      <g transform="translate(384, 199)">
        <rect width="58" height="18" rx="2.5" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        <text
          x="29"
          y="13.5"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="12"
          letterSpacing="1.4"
        >
          4 FT
        </text>
      </g>

      {/* 3. POOL WATER */}
      <g clipPath={ref('pool')}>
        <rect x="260" y="220" width="560" height="360" fill={ref('water')} />
        <rect x="260" y="220" width="560" height="360" fill={ref('beam')} />

        {/* Corner entry steps (top-right), deepest first */}
        {[
          { r: 156, op: 0.2, line: 0.42 },
          { r: 112, op: 0.3, line: 0.58 },
          { r: 68, op: 0.44, line: 0.75 },
        ].map(step => (
          <g key={step.r}>
            <path
              d={`M ${812 - step.r} 246 A ${step.r} ${step.r} 0 0 0 812 ${246 + step.r} L 812 246 Z`}
              fill="var(--shallow)"
              fillOpacity={step.op}
            />
            <path
              d={`M ${812 - step.r} 246 A ${step.r} ${step.r} 0 0 0 812 ${246 + step.r}`}
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity={step.line}
              strokeWidth="2.4"
            />
          </g>
        ))}
        <path
          d="M 656 248 A 156 156 0 0 0 812 402"
          fill="none"
          stroke="var(--tile)"
          strokeOpacity="0.5"
          strokeWidth="3"
          strokeDasharray="7 5"
        />

        {/* Floor lane line */}
        <path d="M 340 486 H 700" stroke="var(--tile-deep)" strokeOpacity="0.26" strokeWidth="12" strokeLinecap="round" />
        <path d="M 340 466 V 506" stroke="var(--tile-deep)" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />

        {/* Underwater light on the left wall */}
        <g transform="translate(282, 446)">
          <ellipse rx="20" ry="28" fill="var(--aqua)" fillOpacity="0.4" />
          <ellipse rx="8" ry="14" fill="#FFFFFF" fillOpacity="0.95" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <ellipse cx="1" cy="-2" rx="3" ry="7" fill="var(--shallow)" />
        </g>

        {/* Drifting sunlit caustics */}
        <g className="caustic-drift" fill="none" strokeLinecap="round">
          <g stroke="var(--shallow)" strokeOpacity="0.3" strokeWidth="5">
            <path d="M 300 300 C 350 276, 392 318, 446 296 C 500 274, 540 318, 600 294 C 660 270, 712 312, 800 288" />
            <path d="M 280 400 C 340 372, 392 420, 460 394 C 528 368, 580 420, 650 390 C 720 360, 770 400, 810 384" />
            <path d="M 300 540 C 370 512, 430 560, 510 530 C 590 500, 660 550, 760 516" />
          </g>
          <g stroke="#FFFFFF" strokeOpacity="0.36" strokeWidth="2">
            <path d="M 300 300 C 350 276, 392 318, 446 296 C 500 274, 540 318, 600 294 C 660 270, 712 312, 800 288" />
            <path d="M 280 400 C 340 372, 392 420, 460 394 C 528 368, 580 420, 650 390 C 720 360, 770 400, 810 384" />
            <path d="M 300 540 C 370 512, 430 560, 510 530 C 590 500, 660 550, 760 516" />
            <path d="M 400 250 C 420 310, 380 360, 410 420 C 440 480, 392 520, 414 580" />
            <path d="M 540 250 C 566 314, 518 368, 552 436 C 586 504, 536 540, 560 580" />
            <path d="M 690 360 C 712 420, 664 470, 700 520 C 720 550, 700 570, 708 580" />
          </g>
          <g fill="#FFFFFF" fillOpacity="0.5">
            <circle cx="412" cy="304" r="3" />
            <circle cx="548" cy="300" r="3.2" />
            <circle cx="404" cy="402" r="3" />
            <circle cx="556" cy="408" r="3.4" />
            <circle cx="700" cy="386" r="2.8" />
            <circle cx="520" cy="532" r="3" />
          </g>
        </g>

        {/* Ladder: underwater shadow, then refracted rails and treads */}
        <g stroke="#04121C" strokeOpacity="0.16" strokeWidth="6" fill="none" filter={ref('soft')}>
          <path d="M 534 240 V 346 M 590 240 V 346 M 534 286 H 590 M 534 326 H 590" />
        </g>
        <g fill="none" strokeLinecap="round" stroke="#FFFFFF">
          <path d="M 524 232 Q 530 262, 522 290 Q 529 316, 524 340" strokeOpacity="0.72" strokeWidth="6" />
          <path d="M 580 232 Q 586 262, 578 290 Q 585 316, 580 340" strokeOpacity="0.72" strokeWidth="6" />
          <path d="M 524 276 H 580" strokeOpacity="0.82" strokeWidth="7.5" />
          <path d="M 525 316 H 581" strokeOpacity="0.62" strokeWidth="7.5" />
        </g>

        {/* Skimmer net: floor shadow and surface ripples */}
        <g filter={ref('soft')} opacity="0.24">
          <ellipse cx="596" cy="476" rx="74" ry="34" transform="rotate(-10 596 476)" fill="#04121C" />
          <path d="M 676 456 L 830 400" stroke="#04121C" strokeWidth="10" strokeLinecap="round" />
        </g>
        <ellipse cx="580" cy="452" rx="94" ry="46" transform="rotate(-12 580 452)" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="36 18 22 14" />
        <ellipse cx="580" cy="452" rx="118" ry="60" transform="rotate(-12 580 452)" fill="none" stroke="#FFFFFF" strokeOpacity="0.26" strokeWidth="1.5" strokeDasharray="24 28" />
      </g>

      {/* Waterline tile band on the back and left walls, with coping overhang shadow */}
      <rect x="260" y="220" width="576" height="24" fill={ref('tile')} />
      <rect x="260" y="220" width="12" height="376" fill={ref('tile')} />
      <rect x="260" y="220" width="12" height="376" fill="#04121C" fillOpacity="0.14" />
      <rect x="260" y="220" width="576" height="6" fill="#04121C" fillOpacity="0.22" />
      <path
        className="waterline-ripple"
        d="M 272 247 Q 300 243, 330 246 T 390 245 T 450 246 T 510 245 T 570 246 T 630 245 T 690 246 T 750 245 T 810 246 T 870 245"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.9"
      />
      <path d="M 259 220 H 836 M 259 220 V 596" stroke="var(--art-stroke)" strokeWidth="2" fill="none" />

      {/* Ladder rails above water, anchored in the coping */}
      <g fill="none" strokeLinecap="round">
        <path d="M 524 198 C 524 186, 540 186, 540 198 M 580 198 C 580 186, 596 186, 596 198" stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="8" transform="translate(6, 8)" />
        {[524, 580].map(x => (
          <g key={x}>
            <path d={`M ${x} 236 V 214 C ${x} 196, ${x + 18} 196, ${x + 18} 212`} stroke="var(--art-stroke)" strokeWidth="11" />
            <path d={`M ${x} 236 V 214 C ${x} 196, ${x + 18} 196, ${x + 18} 212`} stroke="var(--coping)" strokeWidth="6.5" />
            <path d={`M ${x - 1} 222 C ${x - 1} 202, ${x + 15} 200, ${x + 17} 210`} stroke="#FFFFFF" strokeWidth="2" />
            <ellipse cx={x + 18} cy="212" rx="8" ry="4" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="1.6" />
          </g>
        ))}
      </g>

      {/* 4. RAISED SPA */}
      {/* Contact shadow on deck */}
      <circle cx={spa.cx + 8} cy={spa.cy + 22} r={spa.r} fill="var(--ink)" fillOpacity="0.1" />

      {/* Stacked-stone wall face, visible as a crescent below the coping */}
      <circle cx={spa.cx} cy={spa.cy + 16} r={spa.r} fill="var(--sand)" stroke="var(--art-stroke)" strokeWidth="2.2" />
      <g clipPath={ref('spa-face')}>
        <circle cx={spa.cx} cy={spa.cy + 16} r={spa.r} fill="var(--ink)" fillOpacity="0.12" />
        <circle cx={spa.cx} cy={spa.cy + 8} r={spa.r} fill="none" stroke="var(--border)" strokeWidth="1.6" />
        <circle
          cx={spa.cx}
          cy={spa.cy + 12}
          r={spa.r}
          fill="none"
          stroke="var(--art-stroke)"
          strokeOpacity="0.35"
          strokeWidth="9"
          strokeDasharray="1.4 21"
        />
      </g>

      {/* Bullnose coping ring */}
      <circle cx={spa.cx} cy={spa.cy} r={spa.r} fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.2" />
      <circle cx={spa.cx} cy={spa.cy} r={spa.r} fill={ref('speckle')} />
      <g stroke="var(--border)" strokeWidth="1.6">
        {[200, 245, 290, 335, 110, 155].map(deg => {
          const a = (deg * Math.PI) / 180;
          const p = (r: number) => `${(spa.cx + r * Math.cos(a)).toFixed(1)} ${(spa.cy + r * Math.sin(a)).toFixed(1)}`;
          return <path key={deg} d={`M ${p(spa.tile + 1)} L ${p(spa.r - 1)}`} />;
        })}
      </g>

      {/* Mosaic tile ring and water */}
      <circle cx={spa.cx} cy={spa.cy} r={spa.tile} fill={ref('tile')} stroke="var(--art-stroke)" strokeWidth="2" />
      <circle cx={spa.cx} cy={spa.cy} r={spa.water} fill={ref('spa-water')} />
      <g clipPath={ref('spa-water-clip')}>
        {/* Inner wall shadow and submerged bench ring */}
        <circle cx={spa.cx} cy={spa.cy} r={spa.water} fill="none" stroke="#04121C" strokeOpacity="0.16" strokeWidth="10" />
        <circle cx={spa.cx} cy={spa.cy} r="58" fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2.2" />
        <circle cx={spa.cx} cy={spa.cy} r="58" fill="var(--primary)" fillOpacity="0.14" />

        {/* Jet bubble plumes */}
        <g fill="#FFFFFF" className="caustic-drift">
          {[150, 215, 285, 355, 60].map(deg => {
            const a = (deg * Math.PI) / 180;
            const at = (r: number, off: number) => ({
              x: spa.cx + r * Math.cos(a) + off * -Math.sin(a),
              y: spa.cy + r * Math.sin(a) + off * Math.cos(a),
            });
            const bubbles = [
              { ...at(80, 0), r: 4, o: 0.9 },
              { ...at(70, 5), r: 3.2, o: 0.8 },
              { ...at(66, -5), r: 2.6, o: 0.75 },
              { ...at(58, 2), r: 3.6, o: 0.65 },
              { ...at(50, -6), r: 2.2, o: 0.6 },
              { ...at(46, 7), r: 2, o: 0.5 },
            ];
            return (
              <g key={deg}>
                {bubbles.map((b, i) => (
                  <circle key={i} cx={b.x.toFixed(1)} cy={b.y.toFixed(1)} r={b.r} fillOpacity={b.o} />
                ))}
              </g>
            );
          })}
        </g>

        {/* Swirling surface foam */}
        <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
          <path d="M 150 170 C 166 140, 216 136, 236 162" strokeOpacity="0.6" strokeWidth="2.4" />
          <path d="M 242 214 C 228 246, 176 252, 154 226" strokeOpacity="0.55" strokeWidth="2.4" />
          <path d="M 170 196 C 176 178, 210 176, 220 194" strokeOpacity="0.4" strokeWidth="1.8" />
        </g>
      </g>

      {/* Spillover lip, falling sheet and impact foam (toward the pool, lower right) */}
      <path
        d="M 281.2 229.7 A 94 94 0 0 1 249.9 267 L 260.3 281.7 A 112 112 0 0 0 297.5 237.3 Z"
        fill="var(--shallow)"
        stroke="var(--art-stroke)"
        strokeWidth="1.6"
      />
      <path
        d="M 297.5 237.3 A 112 112 0 0 1 260.3 281.7 L 274 301.4 A 136 136 0 0 0 319.2 247.5 Z"
        fill={ref('sheet')}
        stroke="var(--art-stroke)"
        strokeWidth="1.6"
      />
      <g stroke="var(--aqua)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M 293 246 L 313.8 258 M 287.7 254.3 L 307.4 268.1 M 281.8 262 L 300.2 277.4 M 275.2 269.2 L 292.2 286.2 M 268 275.8 L 283.4 294.2" />
      </g>
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
        <path d="M 329.5 238.6 A 142 142 0 0 1 267 313" strokeOpacity="0.95" strokeWidth="4" strokeDasharray="10 5 4 5" />
        <path className="waterline-ripple" d="M 338.8 247.7 A 154 154 0 0 1 277.6 320.6" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="14 8" />
      </g>
      <g fill="#FFFFFF" fillOpacity="0.85">
        <circle cx="336" cy="262" r="2.4" />
        <circle cx="322" cy="285" r="2.8" />
        <circle cx="304" cy="304" r="2.2" />
        <circle cx="290" cy="318" r="2" />
      </g>

      {/* Floating digital thermometer */}
      <g transform="translate(150, 176) rotate(-8)">
        <rect x="2" y="4" width="54" height="22" rx="11" fill="#04121C" fillOpacity="0.18" />
        <rect width="54" height="22" rx="11" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <rect x="8" y="5" width="38" height="12" rx="3" fill="var(--ink)" />
        <text
          x="27"
          y="14.5"
          textAnchor="middle"
          fill="var(--aqua)"
          fontFamily="var(--font-mono)"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.5"
        >
          102°F
        </text>
      </g>

      {/* Rising steam */}
      <g className="spa-steam" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="6">
        <path d="M 170 140 C 156 120, 184 104, 168 82 C 158 68, 170 56, 166 44" strokeOpacity="0.62" />
        <path d="M 214 132 C 202 110, 230 96, 216 72 C 208 58, 222 46, 218 30" strokeOpacity="0.52" />
        <path d="M 248 170 C 238 152, 262 140, 252 120" strokeOpacity="0.46" />
      </g>

      {/* 5. SKIMMER POLE & NET (over the water) */}
      <g>
        <path
          d="M 652 448 L 604 426 C 554 412, 504 432, 504 468 C 504 504, 556 518, 606 500 L 652 448 Z"
          fill="var(--coping)"
          fillOpacity="0.72"
        />
        <g stroke="var(--tile)" strokeOpacity="0.4" strokeWidth="1.2">
          <path d="M 528 432 L 610 492 M 550 422 L 626 478 M 514 452 L 590 506 M 508 474 L 564 510" />
          <path d="M 580 422 L 530 500 M 606 428 L 558 508 M 630 440 L 590 504 M 552 424 L 512 484" />
        </g>
        <g transform="translate(566, 464) rotate(-18)">
          <path d="M -28 2 C -14 -16, 14 -16, 30 0 C 16 16, -12 16, -28 2 Z" fill="var(--algae)" stroke="var(--art-stroke)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M -24 2 Q 2 -2, 26 0" stroke="var(--art-stroke)" strokeWidth="1.4" fill="none" />
          <path d="M -8 1 L -2 -7 M 4 0 L 10 -6 M -4 2 L 2 8 M 10 0 L 15 6" stroke="var(--art-stroke)" strokeOpacity="0.55" strokeWidth="1.2" />
        </g>
        <path
          d="M 652 448 L 604 426 C 554 412, 504 432, 504 468 C 504 504, 556 518, 606 500 L 652 448 Z"
          fill="none"
          stroke="var(--coping)"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path
          d="M 652 448 L 604 426 C 554 412, 504 432, 504 468 C 504 504, 556 518, 606 500 L 652 448 Z"
          fill="none"
          stroke="var(--art-stroke)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M 812 390 L 652 449" stroke="var(--art-stroke)" strokeWidth="13" strokeLinecap="round" />
        <path d="M 812 390 L 652 449" stroke="var(--coping)" strokeWidth="8.5" strokeLinecap="round" />
        <path d="M 810 388 L 652 447" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 752 412 L 722 423" stroke="var(--art-stroke)" strokeWidth="16" strokeLinecap="round" />
        <path d="M 752 412 L 722 423" stroke="var(--tile)" strokeWidth="11.5" strokeLinecap="round" />
      </g>

      {/* 6. DECK FURNITURE & KIT */}
      {/* Lounger with striped cushion and folded towel */}
      <g transform="translate(352, 58)">
        <rect x="6" y="8" width="216" height="76" rx="12" fill="var(--ink)" fillOpacity="0.12" />
        <rect width="216" height="76" rx="12" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.2" />
        <rect x="8" y="8" width="200" height="60" rx="8" fill="var(--shallow)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        <g fill="var(--tile)" fillOpacity="0.85">
          <rect x="62" y="8" width="14" height="60" />
          <rect x="96" y="8" width="14" height="60" />
          <rect x="130" y="8" width="14" height="60" />
          <rect x="164" y="8" width="14" height="60" />
        </g>
        {/* Raised headrest */}
        <rect x="8" y="8" width="44" height="60" rx="8" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        <path d="M 52 12 V 64" stroke="var(--art-stroke)" strokeWidth="1.4" />
        {/* Folded towel */}
        <g transform="translate(118, 20) rotate(6)">
          <rect width="48" height="38" rx="4" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <path d="M 0 12 H 48 M 0 28 H 48" stroke="var(--art-stroke)" strokeOpacity="0.5" strokeWidth="1.2" />
          <rect x="0" y="16" width="48" height="5" fill="#FFFFFF" fillOpacity="0.55" />
        </g>
      </g>

      {/* Open drop-test kit */}
      <g transform="translate(616, 50) rotate(4)">
        <rect x="6" y="6" width="136" height="72" rx="8" fill="var(--ink)" fillOpacity="0.16" />
        <rect width="136" height="72" rx="8" fill="var(--primary)" stroke="var(--art-stroke)" strokeWidth="2.2" />
        <rect x="7" y="6" width="122" height="60" rx="4.5" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        <g transform="translate(15, 12)">
          <rect x="0" y="12" width="20" height="34" rx="4" fill="#FFFFFF" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <rect x="4" y="3" width="12" height="9.5" rx="2" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <rect x="3" y="21" width="14" height="16" rx="1.5" fill="var(--test-yellow)" />
          <text x="10" y="32" textAnchor="middle" fill="#0A2A3D" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700">
            CL
          </text>
        </g>
        <g transform="translate(42, 12)">
          <rect x="0" y="12" width="20" height="34" rx="4" fill="#FFFFFF" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <rect x="4" y="3" width="12" height="9.5" rx="2" fill="var(--test-red)" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <rect x="3" y="21" width="14" height="16" rx="1.5" fill="var(--test-red)" />
          <text x="10" y="32" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700">
            pH
          </text>
        </g>
        <g transform="translate(72, 12)">
          <rect x="0" y="2" width="49" height="46" rx="4" fill="var(--plaster)" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <rect x="6" y="8" width="13" height="34" rx="2.5" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="1.5" />
          <rect x="30" y="8" width="13" height="34" rx="2.5" fill="var(--test-red)" stroke="var(--art-stroke)" strokeWidth="1.5" />
          <path d="M 22 16 H 27 M 22 25 H 27 M 22 34 H 27" stroke="var(--art-stroke)" strokeWidth="1.5" />
        </g>
      </g>

      {/* Potted palm (top-down) */}
      <g transform="translate(112, 452)">
        <circle cx="8" cy="10" r="50" fill="var(--ink)" fillOpacity="0.1" />
        <circle r="46" fill="var(--coping)" stroke="var(--art-stroke)" strokeWidth="2.2" />
        <circle r="38" fill="var(--sand)" stroke="var(--art-stroke)" strokeWidth="1.4" />
        <g fill="var(--algae)" stroke="var(--art-stroke)" strokeWidth="1.6" strokeLinejoin="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
            <path key={deg} transform={`rotate(${deg + 12})`} d="M 0 -4 C 14 -12, 40 -10, 58 0 C 40 10, 14 12, 0 4 Z" />
          ))}
        </g>
        <g stroke="var(--art-stroke)" strokeOpacity="0.45" strokeWidth="1.1">
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
            <path key={deg} transform={`rotate(${deg + 12})`} d="M 4 0 H 54" />
          ))}
        </g>
        <circle r="7" fill="var(--sand)" stroke="var(--art-stroke)" strokeWidth="1.6" />
      </g>

      {/* 7. PALM-FROND SHADOWS */}
      <g fill="var(--ink)" fillOpacity="0.08" pointerEvents="none">
        <path d="M -10 330 Q 52 352, 108 398 Q 60 368, -10 354 Z" />
        <path d="M -10 370 Q 48 390, 96 434 Q 48 406, -10 394 Z" />
        <path d="M 640 -8 Q 700 24, 770 44 Q 708 34, 660 10 Z" />
        <path d="M 688 -8 Q 748 16, 808 34 L 808 16 Q 760 6, 710 -8 Z" />
        <path d="M 606 -8 Q 658 28, 716 54 Q 662 40, 624 12 Z" />
      </g>
    </svg>
  );
}
