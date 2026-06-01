import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getSiteName } from '../config/site'
import { HomeSectionLink } from './HomeSectionLink'

const nav = [
  { hash: '#accueil', label: 'Accueil' },
  { hash: '#appartement', label: 'Appartement' },
  { hash: '#chambres', label: 'Chambres' },
  { hash: '#tarifs', label: 'Tarifs' },
  { hash: '#disponibilites', label: 'Disponibilités' },
  { hash: '#localisation', label: 'Localisation' },
  { hash: '#reserver', label: 'Réserver' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const siteName = getSiteName()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 motion-reduce:transition-none ${
        scrolled
          ? 'bg-brand-cream/90 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-brand-cream/75'
          : 'bg-brand-cream/0'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <HomeSectionLink
          hash="#accueil"
          className="group flex cursor-pointer items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
        >
          <span className="font-display text-lg font-semibold tracking-tight text-brand-ink transition-colors duration-200 group-hover:text-brand-accent sm:text-xl">
            {siteName}
          </span>
        </HomeSectionLink>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {nav.map((item) => (
            <HomeSectionLink
              key={item.hash}
              hash={item.hash}
              className="cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-brand-muted transition-colors duration-200 hover:bg-brand-sand hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              {item.label}
            </HomeSectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <HomeSectionLink
            hash="#reserver"
            className="hidden cursor-pointer rounded-full bg-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-brand-accent-soft hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream sm:inline-flex"
          >
            Réserver
          </HomeSectionLink>
          <button
            type="button"
            className="inline-flex cursor-pointer rounded-full p-2.5 text-brand-ink transition-colors hover:bg-brand-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-stone-200/80 bg-brand-cream px-4 pb-6 pt-2 lg:hidden motion-reduce:animate-none animate-fade-up"
        >
          <div className="mx-auto flex max-w-content flex-col gap-1">
            {nav.map((item) => (
              <HomeSectionLink
                key={item.hash}
                hash={item.hash}
                className="cursor-pointer rounded-xl px-3 py-3 text-base font-medium text-brand-ink transition-colors hover:bg-brand-sand"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </HomeSectionLink>
            ))}
            <HomeSectionLink
              hash="#reserver"
              className="mt-3 cursor-pointer rounded-full bg-brand-accent px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Réserver
            </HomeSectionLink>
          </div>
        </div>
      )}
    </header>
  )
}
