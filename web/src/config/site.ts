import siteConfig from './site.config.json'
import { bedrooms } from '../data/bedrooms'

export type SiteConfig = typeof siteConfig

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

/** URL canonique du site (sans slash final). Surcharge : VITE_SITE_URL */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim()
  return trimTrailingSlash(fromEnv || siteConfig.url)
}

export function getSiteName(): string {
  return import.meta.env.VITE_SITE_NAME?.trim() || siteConfig.name
}

export function getContactEmail(): string {
  return import.meta.env.VITE_CONTACT_EMAIL?.trim() || siteConfig.email
}

export function getSite(): SiteConfig & { name: string; url: string; email: string } {
  return {
    ...siteConfig,
    name: getSiteName(),
    url: getSiteUrl(),
    email: getContactEmail(),
  }
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

/** Chemin public (avec base Vite) pour OG image — URL absolue pour schema / réseaux sociaux */
export function getDefaultOgImageUrl(): string {
  return `${getSiteUrl()}/img/${encodeURIComponent('living cuisine')}/${encodeURIComponent('20260511_155926.jpg')}`
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.replace(import.meta.env.BASE_URL, '/')
  return `${getSiteUrl()}${normalized.startsWith('/') ? normalized : `/${normalized}`}`
}

export function getBedroomRoutes(): string[] {
  return bedrooms.map((b) => `/chambres/${b.slug}`)
}

export const DEFAULT_TITLE = `${siteConfig.tagline} | Médiacité`
export const DEFAULT_DESCRIPTION = siteConfig.description
