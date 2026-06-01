/** URLs des fichiers dans `public/img` — respecte `base` Vite (ex. GitHub Pages). */
export function imgUrl(...segments: string[]): string {
  const base = import.meta.env.BASE_URL
  const encoded = segments.map((s) => encodeURIComponent(s)).join('/')
  return `${base}img/${encoded}`
}

/** Lien React Router vers une section de la page d’accueil. */
export function homeSectionTo(hash: string): { pathname: string; hash: string } {
  const normalized = hash.startsWith('#') ? hash : `#${hash}`
  return { pathname: '/', hash: normalized }
}

/** Racine du site avec base Vite. */
export function homePath(): string {
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? base : `${base}/`
}
