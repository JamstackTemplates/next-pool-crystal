type Props = {
  className?: string;
};

/**
 * Row of alternating pool-blue and white lane-rope floats gently bobbing on a taut line.
 */
export function LaneRopeDivider({ className = '' }: Props) {
  const floats = Array.from({ length: 24 }, (_, idx) => idx);

  return (
    <div className={`w-full overflow-hidden py-2 print-hide ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 28"
        className="h-6 w-full sm:h-7"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          x1="0"
          y1="14"
          x2="1200"
          y2="14"
          stroke="var(--art-stroke)"
          strokeWidth="2.5"
        />
        <g className="lane-bob">
          {floats.map(index => {
            const x = index * 50 + 6;
            const isBlue = index % 2 === 0;
            const isYellowMarker = index === 5 || index === 18;
            const fill = isYellowMarker
              ? 'var(--test-yellow)'
              : isBlue
                ? 'var(--tile)'
                : 'var(--coping)';
            return (
              <g key={index}>
                <rect
                  x={x}
                  y="6"
                  width="38"
                  height="16"
                  rx="7"
                  fill={fill}
                  stroke="var(--art-stroke)"
                  strokeWidth="2"
                />
                <line
                  x1={x + 12}
                  y1="7"
                  x2={x + 12}
                  y2="21"
                  stroke="var(--art-stroke)"
                  strokeOpacity="0.35"
                  strokeWidth="1.4"
                />
                <line
                  x1={x + 26}
                  y1="7"
                  x2={x + 26}
                  y2="21"
                  stroke="var(--art-stroke)"
                  strokeOpacity="0.35"
                  strokeWidth="1.4"
                />
                <path
                  d={`M ${x + 8} 10 H ${x + 22}`}
                  stroke="#FFFFFF"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
