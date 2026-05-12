import { BedroomCard } from './BedroomCard'
import { images } from '../data/images'

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
          — tons doux, matériaux agréables et détails soignés.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <BedroomCard
            title="Chambre jaune"
            description="Lumière dorée et ambiance enveloppante — une retraite douillette pour des nuits paisibles."
            imageSrc={images.bedrooms.jaune}
            imageAlt="Chambre jaune, décoration chaleureuse"
          />
          <BedroomCard
            title="Chambre verte"
            description="Une touche naturelle et apaisante, idéale pour se déconnecter tout en restant en ville."
            imageSrc={images.bedrooms.verte}
            imageAlt="Chambre verte, tons naturels et reposants"
          />
          <BedroomCard
            title="Chambre rose"
            description="Une chambre lumineuse au caractère doux — parfaite pour prolonger la convivialité de votre séjour."
            imageSrc={images.bedrooms.rose}
            imageAlt="Chambre rose, atmosphère douce et accueillante"
          />
        </div>
      </div>
    </section>
  )
}
