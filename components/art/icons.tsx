import type { SVGProps } from 'react';

export type PoolIconName =
  | 'skimmer'
  | 'brush'
  | 'vacuum'
  | 'pump'
  | 'filter'
  | 'gauge'
  | 'heater'
  | 'light'
  | 'leak'
  | 'salt'
  | 'vial'
  | 'camera'
  | 'calendar'
  | 'phone'
  | 'envelope'
  | 'baskets'
  | 'balance'
  | 'automation';

type Props = SVGProps<SVGSVGElement> & {
  name: PoolIconName;
};

export function PoolIcon({ name, className = 'h-6 w-6 shrink-0', ...rest }: Props) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
    ...rest,
  };

  switch (name) {
    case 'skimmer':
      return (
        <svg {...common}>
          <path d="M3 20 L10 13" />
          <path d="M10 13 L13 6 C14.5 3.5 18.5 3.5 20 6 C21.5 8.5 20 12 17 13.5 L10 13 Z" fill="var(--shallow)" />
          <path d="M12.5 9.5 L18.5 9.5 M14 6.5 L16 12.5" strokeWidth="1.4" />
        </svg>
      );
    case 'brush':
      return (
        <svg {...common}>
          <path d="M12 3 L12 11" />
          <rect x="4" y="11" width="16" height="4" rx="1.5" fill="var(--tile)" />
          <path d="M6 15 V20 M9 15 V20 M12 15 V20 M15 15 V20 M18 15 V20" />
        </svg>
      );
    case 'vacuum':
      return (
        <svg {...common}>
          <path d="M12 3 L12 12" />
          <path d="M4 17 L7 12 H17 L20 17 Z" fill="var(--aqua)" />
          <circle cx="7" cy="19" r="1.5" fill="currentColor" />
          <circle cx="17" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'baskets':
      return (
        <svg {...common}>
          <path d="M5 7 H19 L17 19 H7 Z" fill="var(--shallow)" />
          <path d="M8 7 C8 4 16 4 16 7" />
          <path d="M9 11 V16 M12 11 V16 M15 11 V16" strokeWidth="1.5" />
        </svg>
      );
    case 'balance':
      return (
        <svg {...common}>
          <path d="M12 3 C12 3 6 10 6 14.5 A6 6 0 0 0 18 14.5 C18 10 12 3 12 3 Z" fill="var(--aqua)" />
          <path d="M9.5 15 A2.5 2.5 0 0 0 12 17.5" stroke="#FFFFFF" strokeWidth="1.8" />
        </svg>
      );
    case 'pump':
      return (
        <svg {...common}>
          <rect x="3" y="9" width="10" height="9" rx="2" fill="var(--tile)" />
          <circle cx="16.5" cy="13.5" r="4.5" fill="var(--shallow)" />
          <path d="M16.5 9 V5 H20" />
          <circle cx="16.5" cy="13.5" r="1.3" fill="currentColor" />
        </svg>
      );
    case 'filter':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="14" rx="4" fill="var(--shallow)" />
          <path d="M6 12 H18" />
          <circle cx="12" cy="4" r="1.5" fill="var(--test-yellow)" />
          <path d="M9 15 H15" strokeWidth="1.5" />
        </svg>
      );
    case 'gauge':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" fill="var(--coping)" />
          <path d="M7.5 15 A5.5 5.5 0 0 1 16.5 15" stroke="var(--tile)" />
          <path d="M12 12 L15.5 8.5" stroke="var(--test-red)" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        </svg>
      );
    case 'heater':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" fill="var(--sand)" />
          <path d="M12 9 C14 11.5 15 13 15 14.5 A3 3 0 0 1 9 14.5 C9 13 10 11.5 12 9 Z" fill="var(--test-red)" />
          <path d="M8 5 V3 M16 5 V3" />
        </svg>
      );
    case 'light':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="5" fill="var(--test-yellow)" />
          <path d="M12 3 V5 M12 19 V21 M3 12 H5 M19 12 H21 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M18.4 5.6 L17 7 M7 17 L5.6 18.4" />
        </svg>
      );
    case 'leak':
      return (
        <svg {...common}>
          <path d="M12 3 C12 3 7 9.5 7 13.5 A5 5 0 0 0 17 13.5 C17 9.5 12 3 12 3 Z" fill="var(--aqua)" />
          <path d="M5 20 Q 9 18, 12 20 T 19 20" stroke="var(--tile)" />
        </svg>
      );
    case 'salt':
      return (
        <svg {...common}>
          <rect x="4" y="8" width="16" height="8" rx="3" fill="var(--shallow)" />
          <path d="M2 12 H4 M20 12 H22" />
          <path d="M9 10 V14 M12 10 V14 M15 10 V14" stroke="var(--tile)" />
        </svg>
      );
    case 'automation':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" fill="var(--shallow)" />
          <rect x="8" y="6" width="8" height="6" rx="1" fill="var(--coping)" />
          <circle cx="9.5" cy="16" r="1" fill="currentColor" />
          <circle cx="14.5" cy="16" r="1" fill="var(--test-yellow)" />
        </svg>
      );
    case 'vial':
      return (
        <svg {...common}>
          <path d="M9 3 H15 M10 3 V17 A2 2 0 0 0 14 17 V3" fill="var(--test-yellow)" />
          <path d="M10 11 H14" />
        </svg>
      );
    case 'camera':
      return (
        <svg {...common}>
          <path d="M4 8 H7 L9 5 H15 L17 8 H20 V19 H4 Z" fill="var(--shallow)" />
          <circle cx="12" cy="13.5" r="3.2" fill="var(--coping)" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" fill="var(--coping)" />
          <path d="M3.5 10 H20.5 M8 3 V7 M16 3 V7" />
          <rect x="7.5" y="13" width="3" height="3" rx="0.5" fill="var(--tile)" stroke="none" />
          <rect x="13.5" y="13" width="3" height="3" rx="0.5" fill="var(--aqua)" stroke="none" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path
            d="M5.5 4.5 H9.5 L11 9 L8.8 10.6 A10.5 10.5 0 0 0 13.4 15.2 L15 13 L19.5 14.5 V18.5 A1.5 1.5 0 0 1 18 20 C10.3 19.6 4.4 13.7 4 6 A1.5 1.5 0 0 1 5.5 4.5 Z"
            fill="var(--shallow)"
          />
        </svg>
      );
    case 'envelope':
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" />
          <path d="M4 7 L12 13 L20 7" />
        </svg>
      );
  }
}
