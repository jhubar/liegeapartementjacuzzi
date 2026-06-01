import { BedroomCard } from './BedroomCard'
import { bedrooms } from '../data/bedrooms'

export function BedroomsSection() {
  return (
    <section id="chambres" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="bedrooms-heading">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2
          id="bedrooms-heading"
          className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
        >
          Trois chambres, trois ambiances
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
          Chaque chambre offre une atmosphère intimiste pour se reposer après une journée dans Liège
          — tons doux, matériaux agréables et détails soignés. L’appartement se loue en entier ;
          cliquez sur une chambre pour voir toutes les photos.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {bedrooms.map((bedroom) => (
            <BedroomCard
              key={bedroom.slug}
              slug={bedroom.slug}
              title={bedroom.title}
              description={bedroom.description}
              imageSrc={bedroom.photos[0].src}
              imageAlt={bedroom.photos[0].alt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
