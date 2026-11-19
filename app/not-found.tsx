import { DepthMarker } from '../components/art/depth-marker';
import { DrainedPoolArt } from '../components/art/drained-pool-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="surface-water py-14 sm:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DrainedPoolArt className="rounded-ui border-2 border-[var(--art-stroke)] bg-coping p-3 shadow-[5px_5px_0_var(--art-stroke)]" />
        </div>

        <div className="lg:col-span-5">
          <DepthMarker label="404 FT" detail="NO DIVING" tone="yellow" className="mb-4" />
          <h1 className="font-display-wide text-4xl leading-tight text-ink sm:text-5xl">
            Lost in the deep end
          </h1>
          <p className="mt-4 text-lg text-muted">That page has been drained.</p>

          {/* Three links styled as pool-ladder rungs */}
          <nav
            aria-label="Climb back out"
            className="relative mt-8 max-w-xs border-x-4 border-[var(--art-stroke)] px-4 py-4"
          >
            <div className="flex flex-col gap-3">
              <SiteLink href="/" className="button w-full justify-between">
                <span>Back to Home</span>
                <span className="font-mono-reading text-xs opacity-80">01</span>
              </SiteLink>
              <SiteLink href="/plans/" className="button button-quiet w-full justify-between">
                <span>Weekly Plans</span>
                <span className="font-mono-reading text-xs opacity-70">02</span>
              </SiteLink>
              <SiteLink href="/contact/" className="button button-quiet w-full justify-between">
                <span>Contact us</span>
                <span className="font-mono-reading text-xs opacity-70">03</span>
              </SiteLink>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
