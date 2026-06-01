import { Link } from 'react-router-dom'
import { BedroomAmenities } from './BedroomAmenities'

export type BedroomCardProps = {
  slug: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function BedroomCard({ slug, title, description, imageSrc, imageAlt }: BedroomCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        to={`/chambres/${slug}`}
        className="relative block aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
      >
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
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-ink opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          Voir la chambre
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-brand-ink">
          <Link
            to={`/chambres/${slug}`}
            className="cursor-pointer transition-colors duration-200 hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-base leading-relaxed text-brand-muted">{description}</p>
        <div className="mt-5">
          <BedroomAmenities />
        </div>
        <Link
          to={`/chambres/${slug}`}
          className="mt-5 inline-flex cursor-pointer items-center text-sm font-semibold text-brand-accent transition-colors duration-200 hover:text-brand-accent-soft focus:outline-none focus-visible:underline"
        >
          {title} — photos et détails →
        </Link>
      </div>
    </article>
  )
}
