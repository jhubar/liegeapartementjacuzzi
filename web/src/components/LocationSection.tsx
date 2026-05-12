import { MapPinned } from 'lucide-react'

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.6770147170564!2d5.57738007716686!3d50.63356567162778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0fa00c7c2dc09%3A0x58a0140d20166cfe!2sRue%20d%27Harscamp%2048%2C%204020%20Li%C3%A8ge!5e1!3m2!1sfr!2sbe!4v1778614855980!5m2!1sfr!2sbe'

export function LocationSection() {
  return (
    <section
      id="localisation"
      className="bg-brand-sand py-16 sm:py-20 lg:py-24"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="location-heading"
              className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
            >
              Liège, au creux de Médiacité
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              Profitez d’un emplacement central : à proximité de Médiacité, commerces et restauration
              à quelques pas, transports en commun accessibles pour rayonner dans la ville et au-delà.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Que vous soyez en escapade urbaine, en déplacement professionnel ou en séjour famille,
              vous êtes au bon endroit pour découvrir Liège avec souplesse — depuis la cité ardente
              jusqu’aux quartiers voisins.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-ink shadow-sm ring-1 ring-stone-200/80">
              <MapPinned className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              <span>
                Rue d’Harscamp 48, 4020 Liège · quartier Médiacité
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200/90 shadow-lift ring-1 ring-stone-200/80">
            <div className="relative aspect-[4/3] w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
              <iframe
                src={MAP_EMBED_SRC}
                title="Carte — Rue d’Harscamp 48, 4020 Liège"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
