# Crystal Pools & Spas

A static Next.js website for **Crystal Pools & Spas**, a sample residential pool and spa care business on the
Orange County coast (Newport Beach, Corona del Mar, Laguna Beach, Irvine, Costa Mesa and Huntington
Beach, CA). It is self-contained and builds with static export (`output: 'export'`).

Local development requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero scene, weekly visit lap, plans preview, water clarity comparator, repairs strip, route days and `HomeAndConstructionBusiness` JSON-LD |
| `/plans/` | Side-by-side weekly plans (Splash, Lap Lane, Deep End), add-ons, pricing notes, onboarding steps and FAQ |
| `/repairs-and-testing/` | Equipment pad diagram, repair service tickets, diagnostic note, on-site water testing and ideal-range test chart |
| `/green-pool-rescue/` | Interactive water clarity comparator, five rescue levels, day-by-day recovery sequence and intake checklist |
| `/contact/` | Hosted Jamstacks enquiry form when configured; always-visible email, phone, phone-status pill and route noticeboard |
| `/404.html` | Drained-pool 404 page with ladder-rung navigation links |

## Make it yours

Edit page-specific prose, headings and calls to action directly in each route file (`app/**/page.tsx`).
Edit structured data and prices in `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, tagline, email, phone, `America/Los_Angeles` phone hours, `seasonalNotice`, diagnostic/test fees and enquiry copy |
| `content/plans.ts` | Weekly plans (`splash`, `lap-lane`, `deep-end`): depth markers, monthly USD prices, includes, `featured` and `available` |
| `content/addons.ts` | Optional add-ons (`spa`, `filter-clean`, `salt-cell`, `tile-blast`, `opening`) and prices |
| `content/repairs.ts` | Equipment repairs, categories, starting USD prices, notes and `available` toggles |
| `content/water-tests.ts` | Ideal water-chemistry ranges and test-strip pad colours |
| `content/rescue-levels.ts` | Five green-pool rescue levels (`haze` to `lagoon`), water swatches, visit ranges, starting prices and drain-consult flag |
| `content/service-area.ts` | Served cities, Mon–Fri route days, ZIP codes and boundary notes |
| `content/visit-steps.ts` | Seven weekly visit steps |
| `app/page.tsx`, `app/*/page.tsx` | Route-level page composition and editable headings/copy |
| `site.config.json` | Public name, description, hostname, `timeZone` and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("noon on the deck") and dark ("night swim") colour tokens, textures, animations and print styles |
| `components/art/*` | Bespoke inline SVG pool artwork, waterline tile band, equipment pad and icons |
| `lib/structured-data.ts` | `HomeAndConstructionBusiness` JSON-LD derived from `content/business.ts`, `content/plans.ts` and `content/service-area.ts` |
| `app/sitemap.ts` | Static sitemap listing all public routes |

### Common owner edits

- **Change a weekly plan price:** edit `pricePerMonth` in `content/plans.ts` (for example, changing Lap Lane from `189` to `199`). This updates the Home waterline depth markers, Home plans preview, `/plans/` comparison column and `HomeAndConstructionBusiness` JSON-LD `Offer` automatically.
- **Hide or update the seasonal notice:** edit `seasonalNotice` in `content/business.ts`. Setting it to `""` hides the sign on Home.
- **Pause a repair or adjust a price:** edit `fromPrice` or set `available: false` in `content/repairs.ts` (unavailable repairs display `"Not taking new jobs this month"`).
- **Change route days:** edit `routeDay` (`Mon`–`Fri`) in `content/service-area.ts`.

Do not add business content to `site.config.json`: the Jamstacks provisioner rewrites that file wholesale (optionally adding `provisioningId`).

## Typography and licences

All fonts are self-hosted via npm under the **SIL Open Font License 1.1**:

- Display & depth markers: `@fontsource-variable/anybody` (wide & condensed variable widths)
- Body copy: `@fontsource-variable/plus-jakarta-sans`
- Readings, prices & route sheets: `@fontsource-variable/azeret-mono`

## Public configuration

```json
{
  "name": "Crystal Pools & Spas",
  "description": "Weekly pool and spa cleaning plans, equipment repairs, water testing and green-pool rescue across Newport Beach, Laguna Beach and the Orange County coast.",
  "domain": "next-pool-crystal.jamstacks.net",
  "timeZone": "America/Los_Angeles",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear
only on `/contact/` when `JAMSTACKS_SITE` / `site.config.json` `jamstacks.siteId` is configured.
Without a site ID there is no embed host or script request, and the email fallback is shown. Public
email (`service@example.com`) and phone remain visible in both states. Navigation to and from
`/contact/` uses full-document loads via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests verify configuration, embed state, collection validation, wording rules, `America/Los_Angeles`
phone-hours boundaries and DST transitions, route weekdays and JSON-LD escaping.

## GitHub Pages deployment

`.github/workflows/pages.yml` runs `npm ci`, tests, typecheck and static export while preserving
Jamstacks' `provisioning_id` dispatch input and correlated run name.

## Publishing assets

`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To regenerate gallery captures and validate:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-pool-crystal --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```
