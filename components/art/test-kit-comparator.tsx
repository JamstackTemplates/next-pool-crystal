type Props = {
  className?: string;
};

/**
 * Drop-kit colour comparator block with yellow chlorine vial, red pH vial and reference strips.
 */
export function TestKitComparator({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 260 220"
      className={`h-auto w-full select-none ${className}`}
      role="img"
      aria-label="Pool water test-kit comparator block showing yellow chlorine and red pH vials beside colour reference scales"
    >
      {/* Clear acrylic housing */}
      <rect
        x="16"
        y="24"
        width="228"
        height="176"
        rx="14"
        fill="var(--coping)"
        stroke="var(--art-stroke)"
        strokeWidth="2.5"
      />
      <rect x="26" y="34" width="208" height="24" rx="5" fill="var(--plaster)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="72" y="51" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
        CL · ppm
      </text>
      <text x="188" y="51" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
        pH
      </text>

      {/* Chlorine reference chips (left) */}
      {['#FFF4BF', '#FFE380', '#FFC93C', '#E6A817'].map((color, idx) => (
        <rect
          key={color}
          x="32"
          y={72 + idx * 28}
          width="24"
          height="22"
          rx="3"
          fill={color}
          stroke="var(--art-stroke)"
          strokeWidth="1.6"
        />
      ))}

      {/* Chlorine test vial */}
      <rect x="66" y="70" width="38" height="114" rx="8" fill="var(--test-yellow)" stroke="var(--art-stroke)" strokeWidth="2.2" />
      <path d="M 74 82 V 170" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="3.5" strokeLinecap="round" />
      <text x="85" y="132" textAnchor="middle" fill="#0A2A3D" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700">
        2.0
      </text>

      {/* Center divider */}
      <line x1="130" y1="68" x2="130" y2="186" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />

      {/* pH test vial */}
      <rect x="156" y="70" width="38" height="114" rx="8" fill="var(--test-red)" stroke="var(--art-stroke)" strokeWidth="2.2" />
      <path d="M 164 82 V 170" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
      <text x="175" y="132" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700">
        7.5
      </text>

      {/* pH reference chips (right) */}
      {['#F7A072', '#EC6D62', '#D9434F', '#B22B5E'].map((color, idx) => (
        <rect
          key={color}
          x="204"
          y={72 + idx * 28}
          width="24"
          height="22"
          rx="3"
          fill={color}
          stroke="var(--art-stroke)"
          strokeWidth="1.6"
        />
      ))}

      {/* Ideal arrow markers */}
      <path d="M 112 126 L 122 126" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 138 126 L 148 126" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
