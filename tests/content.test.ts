import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { addons } from '../content/addons.ts';
import { business } from '../content/business.ts';
import { plans } from '../content/plans.ts';
import { EQUIPMENT_TYPES, repairs } from '../content/repairs.ts';
import { crystalClarityState, rescueLevels } from '../content/rescue-levels.ts';
import { ROUTE_DAYS, serviceArea } from '../content/service-area.ts';
import { visitSteps } from '../content/visit-steps.ts';
import { waterTests } from '../content/water-tests.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function assertPositiveWholeUsd(value: number, label: string) {
  assert.ok(
    Number.isInteger(value) && value > 0,
    `${label}: must be a positive whole USD amount (got ${value})`,
  );
}

function assertUniqueUrlSafeIds(items: readonly { id: string }[], collection: string) {
  const seen = new Set<string>();
  for (const item of items) {
    assert.match(item.id, URL_SAFE_ID, `${collection}.${item.id}: ID must be URL-safe lowercase`);
    assert.ok(!seen.has(item.id), `${collection}.${item.id}: duplicate ID`);
    seen.add(item.id);
  }
}

test('business content has actionable required fields and valid phone hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'timeZone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length > 0, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assertPositiveWholeUsd(business.diagnosticVisitPrice, 'business.diagnosticVisitPrice');
  assertPositiveWholeUsd(business.waterTestPrice, 'business.waterTestPrice');
  assert.doesNotThrow(() => validateHours(business.phoneHours));
});

test('weekly plans are unique, valid, rising in price, with exactly one featured', () => {
  assertUniqueUrlSafeIds(plans, 'plans');
  assert.equal(plans.length, 3, 'plans: expected 3 tiers');
  const featured = plans.filter(plan => plan.featured);
  assert.equal(featured.length, 1, `plans: expected exactly 1 featured plan (got ${featured.length})`);

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    assert.ok(plan.name.trim(), `plans.${plan.id}: name required`);
    assert.ok(plan.depthMarker.trim(), `plans.${plan.id}: depthMarker required`);
    assert.equal(plan.visitsPerWeek, 1, `plans.${plan.id}: visitsPerWeek must be 1`);
    assertPositiveWholeUsd(plan.pricePerMonth, `plans.${plan.id}.pricePerMonth`);
    assert.ok(plan.includes.length > 0, `plans.${plan.id}: includes required`);
    if (i > 0) {
      assert.ok(
        plan.pricePerMonth > plans[i - 1].pricePerMonth,
        `plans.${plan.id}: price ($${plan.pricePerMonth}) must exceed ${plans[i - 1].id} ($${plans[i - 1].pricePerMonth})`,
      );
    }
  }
});

test('add-ons have unique IDs and positive whole USD prices', () => {
  assertUniqueUrlSafeIds(addons, 'addons');
  for (const addon of addons) {
    assert.ok(addon.name.trim(), `addons.${addon.id}: name required`);
    assertPositiveWholeUsd(addon.price, `addons.${addon.id}.price`);
    assert.ok(addon.unit === 'month' || addon.unit === 'visit', `addons.${addon.id}: invalid unit`);
  }
});

test('repairs have unique IDs, valid equipment types and positive whole USD prices', () => {
  assertUniqueUrlSafeIds(repairs, 'repairs');
  const allowed = new Set<string>(EQUIPMENT_TYPES);
  for (const repair of repairs) {
    assert.ok(repair.name.trim(), `repairs.${repair.id}: name required`);
    assert.ok(allowed.has(repair.equipment), `repairs.${repair.id}: invalid equipment "${repair.equipment}"`);
    assertPositiveWholeUsd(repair.fromPrice, `repairs.${repair.id}.fromPrice`);
    assert.ok(repair.description.trim(), `repairs.${repair.id}: description required`);
  }
});

test('water test parameters have valid idealMin <= idealMax and hex swatches', () => {
  assertUniqueUrlSafeIds(waterTests, 'waterTests');
  for (const param of waterTests) {
    assert.ok(param.name.trim(), `waterTests.${param.id}: name required`);
    assert.ok(
      param.idealMin <= param.idealMax,
      `waterTests.${param.id}: idealMin (${param.idealMin}) must be <= idealMax (${param.idealMax})`,
    );
    assert.match(param.swatchLow, HEX_COLOR, `waterTests.${param.id}.swatchLow: invalid hex`);
    assert.match(param.swatchHigh, HEX_COLOR, `waterTests.${param.id}.swatchHigh: invalid hex`);
    assert.ok(param.why.trim(), `waterTests.${param.id}: why required`);
  }
});

test('rescue levels are in severity order with rising prices, valid visits and hex swatches', () => {
  assert.match(crystalClarityState.swatch, HEX_COLOR, 'crystalClarityState.swatch: invalid hex');
  assertUniqueUrlSafeIds(rescueLevels, 'rescueLevels');
  assert.equal(rescueLevels.length, 5, 'rescueLevels: expected 5 severity tiers');

  for (let i = 0; i < rescueLevels.length; i++) {
    const level = rescueLevels[i];
    assert.match(level.swatch, HEX_COLOR, `rescueLevels.${level.id}.swatch: invalid hex`);
    assertPositiveWholeUsd(level.fromPrice, `rescueLevels.${level.id}.fromPrice`);
    assert.ok(
      Number.isInteger(level.typicalVisits.min) &&
        Number.isInteger(level.typicalVisits.max) &&
        level.typicalVisits.min >= 1 &&
        level.typicalVisits.min <= level.typicalVisits.max,
      `rescueLevels.${level.id}.typicalVisits: min must be <= max`,
    );
    if (i > 0) {
      assert.ok(
        level.fromPrice > rescueLevels[i - 1].fromPrice,
        `rescueLevels.${level.id}: fromPrice ($${level.fromPrice}) must exceed ${rescueLevels[i - 1].id} ($${rescueLevels[i - 1].fromPrice})`,
      );
    }
  }
});

test('service area uses Mon-Fri route days and every city appears in schema areaServed', () => {
  assertUniqueUrlSafeIds(serviceArea, 'serviceArea');
  const allowedDays = new Set<string>(ROUTE_DAYS);
  for (const city of serviceArea) {
    assert.ok(allowedDays.has(city.routeDay), `serviceArea.${city.id}: routeDay must be Mon–Fri`);
    assert.match(city.zip, /^\d{5}$/, `serviceArea.${city.id}: zip must be 5 digits`);
  }

  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'HomeAndConstructionBusiness');
  const schemaCities = schema.areaServed.map(entry => entry.name);
  for (const city of serviceArea) {
    assert.ok(schemaCities.includes(city.name), `schema.areaServed missing ${city.name}`);
  }
  assert.equal(schema.makesOffer.length, plans.length);
  for (const plan of plans) {
    const offer = schema.makesOffer.find(item => item.name.includes(plan.name));
    assert.ok(offer, `schema.makesOffer missing ${plan.name}`);
    assert.equal(offer.price, plan.pricePerMonth);
    assert.equal(offer.priceCurrency, 'USD');
  }
});

test('visit steps are unique and ordered 1..7', () => {
  assertUniqueUrlSafeIds(visitSteps, 'visitSteps');
  assert.deepEqual(
    visitSteps.map(step => step.order),
    [1, 2, 3, 4, 5, 6, 7],
  );
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('wording rule: copy never uses "book now", "booked", "confirmed" or "scheduled" outside the disclaimer', () => {
  const rootDir = fileURLToPath(new URL('../', import.meta.url));
  const files: string[] = [];
  for (const dir of ['app', 'content']) {
    const walk = (current: string) => {
      for (const entry of readdirSync(current)) {
        const full = join(current, entry);
        if (statSync(full).isDirectory()) {
          walk(full);
        } else if (/\.(ts|tsx)$/.test(entry)) {
          files.push(full);
        }
      }
    };
    walk(join(rootDir, dir));
  }

  const forbidden = /\b(book now|booked|confirmed|scheduled)\b/i;
  for (const file of files) {
    // Strip the single allowed disclaimer sentence and single-line comments before checking.
    const raw = readFileSync(file, 'utf8')
      .replace(business.enquiries.replyNote, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    const match = raw.match(forbidden);
    assert.equal(
      match,
      null,
      `${file}: forbidden wording "${match?.[0]}" found outside the enquiry disclaimer`,
    );
  }
});
