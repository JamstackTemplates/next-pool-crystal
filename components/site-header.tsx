import { DarkModeToggle } from 'jamstacks';
import { business, phoneHref } from '../content/business';
import { PoolIcon } from './art/icons';
import { WaterlineTileBand } from './art/waterline-tile-band';
import { PhoneStatusPill } from './phone-status-pill';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/plans/', label: 'Plans' },
  { href: '/repairs-and-testing/', label: 'Repairs & testing' },
  { href: '/green-pool-rescue/', label: 'Green-pool rescue' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header surface-coping relative z-40">
      <div className="wrap flex min-h-16 items-center justify-between gap-2 py-2.5 sm:min-h-20 sm:gap-4 sm:py-3">
        {/* Wordmark: Crystal in wide Anybody + POOLS & SPAS painted as a small depth-marker tile */}
        <SiteLink
          href="/"
          aria-label={`${business.name} home`}
          className="inline-flex shrink-0 items-center gap-1.5 no-underline hover:no-underline sm:gap-2"
        >
          <span aria-hidden="true" className="font-display-wide text-lg tracking-tight text-ink sm:text-2xl">
            Crystal
          </span>
          <span aria-hidden="true" className="whitespace-nowrap rounded-tile border-2 border-[var(--art-stroke)] bg-coping px-1.5 py-0.5 font-display-condensed text-[0.65rem] tracking-[0.14em] uppercase text-primary shadow-[1.5px_1.5px_0_var(--art-stroke)] dark:text-aqua sm:px-2 sm:text-[0.7rem]">
            POOLS &amp; SPAS
          </span>
        </SiteLink>

        {/* Desktop navigation + phone + phone-status pill + dark mode toggle */}
        <div className="hidden items-center gap-5 lg:flex">
          <nav aria-label="Main" className="flex items-center gap-5">
            {NAV_ITEMS.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="page"
                className="font-display-condensed text-sm tracking-wide text-ink no-underline hover:text-primary hover:underline dark:hover:text-aqua"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            {business.phone ? (
              <a
                href={phoneHref(business.phone)}
                className="inline-flex items-center gap-1.5 font-mono-reading text-sm font-bold text-ink no-underline hover:text-primary hover:underline dark:hover:text-aqua"
              >
                <PoolIcon name="phone" className="h-4 w-4 text-primary dark:text-aqua" />
                <span>{business.phone}</span>
              </a>
            ) : null}
            <PhoneStatusPill compact />
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile controls: theme toggle + native <details> disclosure menu (works without JS) */}
        <div className="flex items-center gap-2 lg:hidden">
          <DarkModeToggle />
          <details className="relative">
            <summary className="inline-flex min-h-11 items-center gap-2 rounded-tile border-2 border-[var(--art-stroke)] bg-coping px-3 py-1.5 font-display-condensed text-sm tracking-wider uppercase text-ink">
              <span>Menu</span>
              <span aria-hidden="true" className="font-mono-reading text-xs">
                ≡
              </span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-4 shadow-[4px_4px_0_var(--art-stroke)]">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                <SiteLink
                  href="/"
                  markCurrent="page"
                  className="rounded-tile px-3 py-2 font-display-wide text-base text-ink no-underline hover:bg-shallow/50"
                >
                  Home
                </SiteLink>
                {NAV_ITEMS.map(item => (
                  <SiteLink
                    key={item.href}
                    href={item.href}
                    markCurrent="page"
                    className="rounded-tile px-3 py-2 font-display-wide text-base text-ink no-underline hover:bg-shallow/50"
                  >
                    {item.label}
                  </SiteLink>
                ))}
              </nav>
              <div className="mt-3 border-t border-border pt-3">
                {business.phone ? (
                  <a
                    href={phoneHref(business.phone)}
                    className="mb-2 inline-flex items-center gap-2 font-mono-reading text-sm font-bold text-ink"
                  >
                    <PoolIcon name="phone" className="h-4 w-4 text-primary dark:text-aqua" />
                    <span>{business.phone}</span>
                  </a>
                ) : null}
                <PhoneStatusPill compact className="w-full justify-center" />
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Signature waterline tile band runs directly below the coping header on every page */}
      <WaterlineTileBand height="slim" />
    </header>
  );
}
