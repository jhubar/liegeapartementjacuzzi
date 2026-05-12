import { Sofa, ChefHat, SunMedium, Train, Store } from 'lucide-react'

const highlights = [
  {
    icon: Sofa,
    title: 'Volumes généreux',
    body: 'Un appartement trois chambres pensé pour accueillir familles, groupes d’amis et séjours professionnels dans le calme.',
  },
  {
    icon: ChefHat,
    title: 'Cuisine équipée',
    body: 'Espace cuisine fonctionnel pour préparer vos repas comme à la maison — pratique pour les séjours de quelques nuits ou plus longs.',
  },
  {
    icon: SunMedium,
    title: 'Terrasse',
    body: 'Un espace extérieur pour profiter d’un moment de détente entre deux visites de la cité ardente.',
  },
  {
    icon: Train,
    title: 'Accès facilité',
    body: 'Situation centrale : commerces, restauration et transports à proximité pour circuler sans contrainte.',
  },
  {
    icon: Store,
    title: 'Au cœur de l’animation',
    body: 'À deux pas de Médiacité et des points d’intérêt liégeois, pour explorer la ville à pied.',
  },
] as const

export function ApartmentOverview() {
  return (
    <section
      id="appartement"
      className="bg-brand-cream py-16 sm:py-20 lg:py-24"
      aria-labelledby="overview-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="overview-heading"
            className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
          >
            Un cocon urbain, moderne et chaleureux
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Découvrez un appartement spacieux trois chambres : salon accueillant, cuisine entièrement
            équipée et terrasse pour prolonger vos moments de convivialité. L’ensemble conjugue
            confort, style contemporain et luminosité — le bon équilibre pour un séjour réussi à
            Liège.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="group cursor-default rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="mb-4 inline-flex rounded-xl bg-brand-sand p-3 text-brand-accent transition-colors duration-200 group-hover:bg-amber-100/60">
                <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-ink">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-brand-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
