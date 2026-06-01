import { Helmet } from 'react-helmet-async'
import { absoluteUrl, getSite, getDefaultOgImageUrl } from '../config/site'

type SeoHeadProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SeoHead({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoHeadProps) {
  const site = getSite()
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonical =
    canonicalPath === '/' ? `${site.url}/` : `${site.url}${canonicalPath.replace(/\/$/, '')}`
  const ogImage = image || getDefaultOgImageUrl()

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fr_BE" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage)} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
