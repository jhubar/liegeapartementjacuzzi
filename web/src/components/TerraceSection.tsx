import { Sun, Wine } from 'lucide-react'
import { images } from '../data/images'

export function TerraceSection() {
  return (
    <section className="bg-brand-sand py-16 sm:py-20 lg:py-24" aria-labelledby="terrace-heading">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <h2
            id="terrace-heading"
            className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
          >
            Une terrasse pour ralentir le tempo
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Respirez un peu d’air extérieur : la terrasse invite à la pause — café du matin au soleil
            ou verre en fin de journée. Un plus rare en centre-ville pour savourer Liège autrement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-brand-ink shadow-sm">
              <Sun className="h-4 w-4 text-brand-accent" strokeWidth={1.75} aria-hidden />
              Espace extérieur
            </div>
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-brand-ink shadow-sm">
              <Wine className="h-4 w-4 text-brand-accent" strokeWidth={1.75} aria-hidden />
              Moments de détente
            </div>
          </div>
        </div>
        <figure className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200/80">
          <img
            src={images.terrace}
            alt="Terrasse meublée, espace extérieur pour se détendre"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
