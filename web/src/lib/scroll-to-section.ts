/** Scroll vers une ancre (#section). Retourne false si l’élément n’existe pas encore. */
export function scrollToSection(hash: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

/** Réessaie jusqu’à ce que la section soit montée (navigation inter-pages). */
export function scrollToSectionWhenReady(hash: string, maxAttempts = 20): void {
  let attempts = 0
  const tryScroll = () => {
    if (scrollToSection(hash)) return
    attempts += 1
    if (attempts < maxAttempts) requestAnimationFrame(tryScroll)
  }
  tryScroll()
}
