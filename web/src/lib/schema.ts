import { type Bedroom, ENTIRE_APARTMENT_RENTAL_NOTE } from '../data/bedrooms'
import { getDefaultOgImageUrl, getSite, absoluteAssetUrl } from '../config/site'

type SchemaObject = Record<string, unknown>

function baseUrl(): string {
  return getSite().url
}

export function buildVacationRentalSchema(): SchemaObject {
  const site = getSite()
  const url = baseUrl()
  const image = getDefaultOgImageUrl()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VacationRental',
        '@id': `${url}/#rental`,
        name: site.name,
        description: site.description,
        url,
        telephone: site.phones[0],
        numberOfRooms: site.capacity.numberOfRooms,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: site.capacity.maxGuests,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.streetAddress,
          addressLocality: site.address.addressLocality,
          postalCode: site.address.postalCode,
          addressCountry: site.address.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Terrasse', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Cuisine équipée', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Lit double par chambre', value: true },
        ],
        image: [image],
        sameAs: site.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: site.name,
        description: site.description,
        inLanguage: 'fr-BE',
        publisher: { '@id': `${url}/#rental` },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@id': `${url}/#rental` },
        priceCurrency: site.pricing.currency,
        price: String(site.pricing.nightFrom),
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: site.pricing.nightFrom,
          priceCurrency: site.pricing.currency,
          unitText: 'nuit',
        },
        availability: 'https://schema.org/InStock',
        url: `${url}/#reserver`,
      },
    ],
  }
}

export function buildBedroomPageSchema(bedroom: Bedroom): SchemaObject {
  const site = getSite()
  const url = `${baseUrl()}/chambres/${bedroom.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: `${bedroom.title} — ${site.name}`,
        description: `${bedroom.description} ${ENTIRE_APARTMENT_RENTAL_NOTE}`,
        isPartOf: { '@id': `${baseUrl()}/#website` },
        about: { '@id': `${baseUrl()}/#rental` },
        inLanguage: 'fr-BE',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteAssetUrl(bedroom.photos[0].src),
        },
      },
      {
        '@type': 'Room',
        '@id': `${url}/#room`,
        name: bedroom.title,
        description: `${bedroom.description} ${ENTIRE_APARTMENT_RENTAL_NOTE}`,
        url: `${baseUrl()}/#chambres`,
        bed: {
          '@type': 'BedDetails',
          typeOfBed: 'Double',
          numberOfBeds: 1,
        },
        isPartOf: { '@id': `${baseUrl()}/#rental` },
        image: bedroom.photos.map((p) => absoluteAssetUrl(p.src)),
      },
      buildBreadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Chambres', path: '/#chambres' },
        { name: bedroom.title, path: `/chambres/${bedroom.slug}` },
      ]),
    ],
  }
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): SchemaObject {
  const site = getSite()
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('/#')
        ? `${site.url}${item.path}`
        : `${site.url}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}
