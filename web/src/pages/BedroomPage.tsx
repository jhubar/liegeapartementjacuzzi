import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedroomAmenities } from '../components/BedroomAmenities'
import { ArrowLeft } from 'lucide-react'
import { ImageLightbox } from '../components/ImageLightbox'
import { bedrooms, getBedroomBySlug } from '../data/bedrooms'
import { homeSectionTo } from '../lib/paths'

type BedroomPageProps = {
  slug: string
}

export function BedroomPage({ slug }: BedroomPageProps) {
  const bedroom = getBedroomBySlug(slug)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!bedroom) {
    return (
      <div className="mx-auto max-w-content px-4 py-32 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-brand-ink">Chambre introuvable</h1>
        <Link
          to={homeSectionTo('#chambres')}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-brand-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour aux chambres
        </Link>
      </div>
    )
  }

  const otherBedrooms = bedrooms.filter((b) => b.slug !== bedroom.slug)

  return (
    <>
      <article className="bg-white pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <Link
            to={homeSectionTo('#chambres')}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand-muted transition-colors duration-200 hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Toutes les chambres
          </Link>

          <header className="mt-8 max-w-2xl">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
              {bedroom.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">{bedroom.description}</p>
            <div className="mt-6">
              <BedroomAmenities />
            </div>
          </header>

          <div className="mt-10">
            <button
              type="button"
              className="group relative w-full cursor-pointer overflow-hidden rounded-2xl ring-1 ring-stone-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              onClick={() => setLightboxIndex(0)}
            >
              <img
                src={bedroom.photos[0].src}
                alt={bedroom.photos[0].alt}
                width={1200}
                height={800}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-ink shadow-sm backdrop-blur-sm">
                Voir en grand · {bedroom.photos.length} photos
              </span>
            </button>
          </div>

          {bedroom.photos.length > 1 && (
            <ul className="mt-4 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {bedroom.photos.map((photo, i) => (
                <li key={photo.src} className="list-none">
                  <button
                    type="button"
                    className="group relative w-full cursor-pointer overflow-hidden rounded-xl ring-1 ring-stone-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={450}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <span className="sr-only">Agrandir {photo.alt}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to={homeSectionTo('#reserver')}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Réserver cette chambre
            </Link>
          </div>

          {otherBedrooms.length > 0 && (
            <aside className="mt-16 border-t border-stone-200 pt-12">
              <h2 className="font-display text-xl font-semibold text-brand-ink">Autres chambres</h2>
              <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2">
                {otherBedrooms.map((other) => (
                  <li key={other.slug} className="list-none">
                    <Link
                      to={`/chambres/${other.slug}`}
                      className="group flex cursor-pointer gap-4 rounded-xl border border-stone-200/90 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transform-none"
                    >
                      <img
                        src={other.photos[0].src}
                        alt={other.title}
                        width={120}
                        height={90}
                        className="h-20 w-28 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div>
                        <span className="font-display font-semibold text-brand-ink group-hover:text-brand-accent">
                          {other.title}
                        </span>
                        <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{other.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={bedroom.photos}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
