type Props = {
  /** Stencilled depth label, e.g. "1 FT", "3 FT", "404 FT". */
  label: string;
  /** Optional secondary mono note inside the tile, e.g. "From $139/mo". */
  detail?: string;
  /** Visual accent variant. */
  tone?: 'coping' | 'yellow' | 'deep';
  className?: string;
};

/**
 * Painted coping-tile depth marker badge used for section numbers, plan markers and hero pricing.
 */
export function DepthMarker({ label, detail, tone = 'coping', className = '' }: Props) {
  const toneClasses =
    tone === 'yellow'
      ? 'bg-test-yellow text-[#0A2A3D] border-[#0A2A3D]'
      : tone === 'deep'
        ? 'bg-primary text-on-primary border-[var(--art-stroke)]'
        : 'bg-coping text-ink border-[var(--art-stroke)]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-tile border-2 px-3 py-1 shadow-[2px_2px_0_var(--art-stroke)] ${toneClasses} ${className}`}
    >
      <span className="font-display-wide text-xs tracking-[0.12em] uppercase sm:text-sm">
        {label}
      </span>
      {detail ? (
        <>
          <span aria-hidden="true" className="opacity-45">
            ·
          </span>
          <span className="font-mono-reading text-xs font-semibold sm:text-sm">{detail}</span>
        </>
      ) : null}
    </span>
  );
}
