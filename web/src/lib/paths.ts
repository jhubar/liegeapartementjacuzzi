/** Build /img/... URLs with correct encoding for spaces in folder names. */
export function imgUrl(...segments: string[]): string {
  return '/img/' + segments.map((s) => encodeURIComponent(s)).join('/')
}
