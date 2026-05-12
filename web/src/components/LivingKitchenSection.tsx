import { Coffee, UtensilsCrossed, Home } from 'lucide-react'
import { images } from '../data/images'

export function LivingKitchenSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="living-heading">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <figure className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200/80">
            <img
              src={images.livingKitchen}
              alt="Grand espace de vie partagé avec cuisine ouverte équipée"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div className="order-1 lg:order-2">
          <h2
            id="living-heading"
            className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
          >
            Salon & cuisine : le cœur de l’appartement
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Profitez d’un espace de vie commun lumineux pour partager vos journées : détente sur le
            canapé, repas maison ou télétravail ponctuel. La cuisine équipée facilite les séjours
            plus longs, avec tout le nécessaire pour vous sentir comme chez vous.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex gap-3">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-sand text-brand-accent">
                <Home className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-brand-ink">Espace de vie partagé</p>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Un cadre convivial pour retrouver tout le monde après une journée à Liège.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-sand text-brand-accent">
                <UtensilsCrossed className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-brand-ink">Cuisine équipée</p>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Pratique pour le petit-déjeuner, le dîner sur le pouce ou les séjours de plusieurs
                  nuits.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-sand text-brand-accent">
                <Coffee className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-brand-ink">Ambiance chaleureuse</p>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Matériaux et couleurs doux pour un séjour élégant sans austérité.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
