import { Lamp, Wind, Sparkles } from 'lucide-react'

export type BedroomCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function BedroomCard({ title, description, imageSrc, imageAlt }: BedroomCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-brand-ink">{title}</h3>
        <p className="mt-2 flex-1 text-base leading-relaxed text-brand-muted">{description}</p>
        <ul className="mt-5 flex list-none flex-wrap gap-3 p-0 text-brand-accent" aria-label="Confort">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            <Lamp className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
            Éclairage doux
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            <Wind className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
            Chambre calme
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            <Sparkles className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
            Literie de qualité
          </li>
        </ul>
        <p className="mt-4 text-sm italic text-stone-500">
          Détails du couchage : à préciser (configuration exacte à confirmer).
        </p>
      </div>
    </article>
  )
}
