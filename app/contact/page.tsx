import type { Metadata } from 'next';
import { PoolIcon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { PhoneStatusPill } from '../../components/phone-status-pill';
import { business, phoneHref } from '../../content/business';
import { serviceArea } from '../../content/service-area';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        depthMarker="DECK"
        eyebrow="Enquiries"
        title={business.enquiries.title}
        motif="contact"
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="surface-water">
        <div className="wrap grid items-start gap-8 py-12 lg:grid-cols-12 sm:py-16">
          {/* Left: coping-framed enquiry form host or email fallback */}
          <section
            aria-label="Enquiry form"
            className="surface-coping rounded-ui border-2 border-[var(--art-stroke)] p-6 shadow-[5px_5px_0_var(--art-stroke)] lg:col-span-7 sm:p-8"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-border pb-3">
              <h2 className="font-display-wide text-2xl text-ink">Send an enquiry</h2>
              <span className="font-mono-reading text-xs text-muted">Name · Email · Message</span>
            </div>

            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div className="rounded-tile border-2 border-border bg-plaster p-6">
                <h3 className="font-display-wide text-xl text-ink">Write to us directly</h3>
                <p className="mt-2 text-muted">
                  The online enquiry form is not connected on this preview. Send your pool details
                  by email or phone using the noticeboard alongside — it reaches our route desk
                  just the same.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${business.email}`} className="button">
                    <PoolIcon name="envelope" className="h-4 w-4" />
                    <span>Email {business.email}</span>
                  </a>
                  {business.phone ? (
                    <a href={phoneHref(business.phone)} className="button button-quiet">
                      <PoolIcon name="phone" className="h-4 w-4" />
                      <span>Call {business.phone}</span>
                    </a>
                  ) : null}
                </div>
              </div>
            )}

            <p className="mt-6 rounded-tile border border-border bg-sand/75 p-4 text-sm text-ink">
              {business.enquiries.replyNote}
            </p>
          </section>

          {/* Right: "Pool shed noticeboard" */}
          <aside
            aria-label="Contact details and route coverage"
            className="surface-sand rounded-ui border-2 border-[var(--art-stroke)] p-6 shadow-[5px_5px_0_var(--art-stroke)] lg:col-span-5 sm:p-7"
          >
            <p className="eyebrow">Pool shed noticeboard</p>

            {/* Email & phone */}
            <div className="mt-4 space-y-4 rounded-tile border-2 border-[var(--art-stroke)] bg-coping p-5">
              <div>
                <h2 className="font-display-condensed text-xs tracking-[0.14em] uppercase text-muted">
                  Email
                </h2>
                <a
                  className="mt-1 inline-block font-mono-reading text-lg font-bold text-primary underline wrap-anywhere dark:text-aqua"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <CopyEmail email={business.email} />
                </div>
              </div>

              {business.phone ? (
                <div className="border-t border-border pt-4">
                  <h2 className="font-display-condensed text-xs tracking-[0.14em] uppercase text-muted">
                    Phone
                  </h2>
                  <a
                    className="mt-1 inline-flex items-center gap-2 font-mono-reading text-xl font-bold text-ink underline hover:text-primary dark:hover:text-aqua"
                    href={phoneHref(business.phone)}
                  >
                    <PoolIcon name="phone" className="h-5 w-5 text-primary dark:text-aqua" />
                    <span>{business.phone}</span>
                  </a>
                  <div className="mt-3">
                    <PhoneStatusPill />
                  </div>
                  <p className="mt-2 font-mono-reading text-xs text-muted">
                    Mon–Fri 07:00–17:00 · Sat 08:00–12:00 · Sun closed (PT)
                  </p>
                </div>
              ) : null}
            </div>

            {/* Useful to include */}
            <div className="mt-6">
              <h2 className="font-display-wide text-lg text-ink">
                Useful to include in your message
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-ink/90">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary dark:bg-aqua"
                      aria-hidden="true"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Served cities with route days */}
            <div className="mt-6 border-t-2 border-border pt-5">
              <h2 className="font-display-wide text-lg text-ink">Served cities &amp; route days</h2>
              <p className="mt-1 text-xs text-muted">
                Mobile coastal route service only — no walk-in storefront.
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {serviceArea.map(city => (
                  <li
                    key={city.id}
                    className="flex items-baseline justify-between gap-2 rounded-tile border border-border bg-coping px-3 py-1.5 text-xs"
                  >
                    <span className="font-semibold text-ink">{city.name}</span>
                    <span className="font-mono-reading font-bold text-primary dark:text-aqua">
                      {city.routeDay}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
