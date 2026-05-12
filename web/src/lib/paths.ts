/** URLs des fichiers dans `public/img` — respecte `base` Vite (ex. GitHub Pages). */
export function imgUrl(...segments: string[]): string {
  const base = import.meta.env.BASE_URL
  const encoded = segments.map((s) => encodeURIComponent(s)).join('/')
  return `${base}img/${encoded}`
}
