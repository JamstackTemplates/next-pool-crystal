import { business } from '../content/business.ts';
import { plans } from '../content/plans.ts';
import { serviceArea } from '../content/service-area.ts';
import { absoluteUrl } from './paths.ts';

/**
 * Schema.org HomeAndConstructionBusiness derived from typed content files.
 * Editing plans, cities or phone hours in content/ updates this JSON-LD automatically.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const plansUrl = absoluteUrl('/plans/');

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    areaServed: serviceArea.map(city => ({
      '@type': 'City',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: business.region,
        addressCountry: business.country,
        postalCode: city.zip,
      },
    })),
    openingHoursSpecification: business.phoneHours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      })),
    makesOffer: plans.map(plan => ({
      '@type': 'Offer',
      name: `${plan.name} weekly pool plan`,
      price: plan.pricePerMonth,
      priceCurrency: 'USD',
      availability: plan.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      ...(plansUrl ? { url: `${plansUrl}#${plan.id}` } : {}),
      itemOffered: {
        '@type': 'Service',
        name: `${plan.name} (${plan.depthMarker}) Weekly Pool Maintenance`,
        description: plan.summary,
      },
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
