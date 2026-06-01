#!/usr/bin/env node
/**
 * Génère robots.txt, sitemap.xml, llms.txt et injecte JSON-LD dans index.html (build).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = join(__dirname, '..')
const distDir = join(webRoot, 'dist')
const configPath = join(webRoot, 'src', 'config', 'site.config.json')

if (!existsSync(distDir)) {
  console.warn('[generate-seo] dist/ introuvable — skip (lancer après vite build)')
  process.exit(0)
}

const config = JSON.parse(readFileSync(configPath, 'utf8'))
const siteUrl = (process.env.VITE_SITE_URL || config.url).replace(/\/+$/, '')
const siteName = process.env.VITE_SITE_NAME || config.name
const email = process.env.VITE_CONTACT_EMAIL || config.email

const bedroomSlugs = ['jaune', 'verte', 'rose']
const staticRoutes = [
  '/',
  ...bedroomSlugs.map((s) => `/chambres/${s}`),
  '/mentions-legales',
  '/politique-confidentialite',
]

const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : path.includes('chambres') ? 'monthly' : 'yearly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.includes('chambres') ? '0.8' : '0.5'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `# ${siteName}
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const llms = `# ${siteName}
> ${config.description}

## Pages principales
- [Accueil](${siteUrl}/): Présentation, tarifs, disponibilités, réservation en ligne
- [Chambre jaune](${siteUrl}/chambres/jaune): photos de la chambre (appartement loué en entier)
- [Chambre verte](${siteUrl}/chambres/verte): photos de la chambre (appartement loué en entier)
- [Chambre rose](${siteUrl}/chambres/rose): photos de la chambre (appartement loué en entier)

## Faits clés (location vacances Liège)
- Type: appartement 3 chambres avec terrasse — **location de l'appartement entier uniquement** (pas de location à la chambre)
- Capacité: jusqu'à ${config.capacity.maxGuests} voyageurs (${config.capacity.numberOfRooms} chambres, lit double chacune)
- Adresse: ${config.address.streetAddress}, ${config.address.postalCode} ${config.address.addressLocality}, Belgique
- Quartier: Médiacité, centre de Liège
- Tarif indicatif: à partir de ${config.pricing.nightFrom} ${config.pricing.currency}/nuit
- Réductions: −14 % semaine, −30 % mois
- Disponibilités: synchronisées Airbnb et Booking.com
- Réservation: Airbnb ou demande directe sur le site
- Contact: ${config.phones[0]}${email !== 'contact@example.com' ? `, ${email}` : ''}
- Annonce Airbnb: ${config.sameAs[0]}

## Équipements
- Terrasse, cuisine équipée, salon lumineux
- 3 chambres calmes avec literie de qualité
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(distDir, 'robots.txt'), robots, 'utf8')
writeFileSync(join(distDir, 'llms.txt'), llms, 'utf8')

const heroImage = `${siteUrl}/img/living%20cuisine/20260511_155926.jpg`
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VacationRental',
      '@id': `${siteUrl}/#rental`,
      name: siteName,
      description: config.description,
      url: `${siteUrl}/`,
      telephone: config.phones[0],
      numberOfRooms: config.capacity.numberOfRooms,
      occupancy: { '@type': 'QuantitativeValue', maxValue: config.capacity.maxGuests },
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address.streetAddress,
        addressLocality: config.address.addressLocality,
        postalCode: config.address.postalCode,
        addressCountry: config.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: config.geo.latitude,
        longitude: config.geo.longitude,
      },
      image: [heroImage],
      sameAs: config.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      inLanguage: 'fr-BE',
    },
  ],
}

const indexPath = join(distDir, 'index.html')
let html = readFileSync(indexPath, 'utf8')
const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`

if (!html.includes('application/ld+json')) {
  html = html.replace('</head>', `    ${ldScript}\n  </head>`)
}

const noscript = `<noscript>
    <article style="max-width:48rem;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif">
      <h1>${siteName} — ${config.tagline}</h1>
      <p>${config.description}</p>
      <p><strong>Adresse :</strong> ${config.address.streetAddress}, ${config.address.postalCode} ${config.address.addressLocality}</p>
      <p><strong>Capacité :</strong> ${config.capacity.numberOfRooms} chambres, ${config.capacity.maxGuests} voyageurs, lit double par chambre.</p>
      <p><strong>Tarif :</strong> à partir de ${config.pricing.nightFrom} ${config.pricing.currency}/nuit.</p>
      <p><strong>Contact :</strong> ${config.phones[0]}</p>
    </article>
  </noscript>`

if (!html.includes('<noscript>')) {
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`)
}

writeFileSync(indexPath, html, 'utf8')
console.log('[generate-seo] robots.txt, sitemap.xml, llms.txt + JSON-LD injectés dans dist/')
