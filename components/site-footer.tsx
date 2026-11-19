import { business, phoneHref } from '../content/business';
import { serviceArea } from '../content/service-area';
import { LaneRopeDivider } from './art/lane-rope-divider';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="surface-deep relative">
      <LaneRopeDivider className="bg-transparent" />

      <div className="wrap relative z-10 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand & contact */}
          <div className="md:col-span-5">
            <SiteLink
              href="/"
              aria-label={`${business.name} home`}
              className="inline-flex items-center gap-2 no-underline hover:no-underline"
            >
              <span aria-hidden="true" className="font-display-wide text-2xl text-deep-water-ink">Crystal</span>
              <span aria-hidden="true" className="whitespace-nowrap rounded-tile border-2 border-aqua bg-deep-water px-2 py-0.5 font-display-condensed text-xs tracking-[0.16em] uppercase text-aqua">
                POOLS &amp; SPAS
              </span>
            </SiteLink>
            <p className="mt-3 max-w-sm text-sm text-deep-water-muted">
              Weekly residential pool and spa care, equipment repairs, water testing and green-pool rescue
              along the Orange County coast. No walk-in shop — we come to your gate.
            </p>
            <div className="mt-5 flex flex-col gap-2 font-mono-reading text-sm">
              {business.phone ? (
                <a
                  href={phoneHref(business.phone)}
                  className="font-bold text-deep-water-ink underline decoration-aqua/70 underline-offset-4 hover:text-aqua"
                >
                  {business.phone}
                </a>
              ) : null}
              <a
                href={`mailto:${business.email}`}
                className="text-deep-water-ink underline decoration-aqua/70 underline-offset-4 hover:text-aqua"
              >
                {business.email}
              </a>
            </div>
          </div>

          {/* Phone hours as a mono "route sheet" */}
          <div className="md:col-span-3">
            <h2 className="font-display-condensed text-xs tracking-[0.16em] uppercase text-aqua">
              Phone hours (PT)
            </h2>
            <dl className="mt-3 space-y-1.5 font-mono-reading text-xs text-deep-water-ink">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-1">
                <dt className="text-deep-water-muted">Mon–Fri</dt>
                <dd>07:00–17:00</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-1">
                <dt className="text-deep-water-muted">Saturday</dt>
                <dd>08:00–12:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-deep-water-muted">Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>

          {/* Served cities */}
          <div className="md:col-span-2">
            <h2 className="font-display-condensed text-xs tracking-[0.16em] uppercase text-aqua">
              Route cities
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-deep-water-muted">
              {serviceArea.map(city => (
                <li key={city.id} className="flex items-baseline justify-between gap-2">
                  <span>{city.name}</span>
                  <span className="font-mono-reading text-[0.7rem] text-aqua/90">{city.routeDay}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h2 className="font-display-condensed text-xs tracking-[0.16em] uppercase text-aqua">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-deep-water-ink">
              <li>
                <SiteLink href="/" className="hover:text-aqua">
                  Home
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/plans/" className="hover:text-aqua">
                  Plans
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/repairs-and-testing/" className="hover:text-aqua">
                  Repairs &amp; testing
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/green-pool-rescue/" className="hover:text-aqua">
                  Green-pool rescue
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/contact/" className="hover:text-aqua">
                  Contact
                </SiteLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-deep-water-muted">
          <p>{business.name} · Orange County Coast, CA</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="text-deep-water-ink no-underline hover:text-aqua hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
