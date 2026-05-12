import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { images } from '../data/images'

export function GalleryGrid() {
  const [active, setActive] = useState<(typeof images.gallery)[number] | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <section className="bg-brand-cream py-16 sm:py-20 lg:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2
          id="gallery-heading"
          className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
        >
          Galerie
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
          Coup d’œil sur les volumes, les trois chambres, le séjour et la terrasse — une invitation
          douce à vous projeter pour votre prochain séjour.
        </p>
        <ul className="mt-10 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.gallery.map((item) => (
            <li key={item.src} className="list-none">
              <button
                type="button"
                className="group relative w-full cursor-pointer overflow-hidden rounded-xl ring-1 ring-stone-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                onClick={() => setActive(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="sr-only">Agrandir {item.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 p-4 backdrop-blur-sm motion-reduce:backdrop-blur-none"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <button
            type="button"
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setActive(null)}
            aria-label="Fermer la galerie"
          >
            <X className="h-6 w-6" />
          </button>
          <figure className="max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/20">
            <img src={active.src} alt={active.alt} className="max-h-[85vh] w-full object-contain" />
            <figcaption className="sr-only">{active.alt}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
