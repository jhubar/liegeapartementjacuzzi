import { BedDouble, MapPin, Trees, Building2 } from 'lucide-react'
import { FeatureBadge } from './FeatureBadge'
import { images } from '../data/images'

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-brand-sand pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-28"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent" />
      <div className="relative mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div className="motion-reduce:animate-none animate-fade-up max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Liège · Centre-ville
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-brand-ink sm:text-5xl lg:text-[2.75rem]"
          >
            Appartement 3 chambres au cœur de Liège
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">
            Un séjour confortable et élégant à deux pas de Médiacité, idéal pour découvrir Liège en
            famille, entre amis ou pour un déplacement professionnel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#disponibilites"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-center text-base font-semibold text-white shadow-soft transition-all duration-200 hover:bg-brand-accent-soft hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Voir les disponibilités
            </a>
            <a
              href="#appartement"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-stone-300/90 bg-white px-6 py-3.5 text-center text-base font-semibold text-brand-ink transition-colors duration-200 hover:border-brand-accent hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Découvrir l’appartement
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-2" role="list">
            <span className="sr-only">Points forts</span>
            <FeatureBadge icon={BedDouble} label="3 chambres" />
            <FeatureBadge icon={Trees} label="Terrasse" />
            <FeatureBadge icon={MapPin} label="Centre de Liège" />
            <FeatureBadge icon={Building2} label="Proche Médiacité" />
          </div>
        </div>

        <div className="relative lg:justify-self-end motion-reduce:animate-none animate-fade-up">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200/30 via-transparent to-stone-300/20 blur-2xl motion-reduce:blur-0" />
          <figure className="relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200/80">
            <img
              src={images.hero}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
              alt="Salon et cuisine ouverte, ambiance chaleureuse et lumineuse"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption className="sr-only">
              Vue principale du séjour et de la cuisine entièrement équipée.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
