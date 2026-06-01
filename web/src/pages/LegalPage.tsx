import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { getSite } from '../config/site'
import { homeSectionTo } from '../lib/paths'

type LegalKind = 'mentions-legales' | 'politique-confidentialite'

const content: Record<
  LegalKind,
  { title: string; description: string; sections: { heading: string; body: string }[] }
> = {
  'mentions-legales': {
    title: 'Mentions légales',
    description: 'Informations légales relatives au site de location de vacances à Liège.',
    sections: [
      {
        heading: 'Éditeur du site',
        body: 'Le présent site est édité par le propriétaire du logement « Appartement Médiacité Liège », situé Rue d’Harscamp 48, 4020 Liège, Belgique. Contact : voir les coordonnées en pied de page.',
      },
      {
        heading: 'Hébergement',
        body: 'Ce site est hébergé via GitHub Pages. Pour toute question technique relative à l’accessibilité du site, contactez l’éditeur aux coordonnées indiquées.',
      },
      {
        heading: 'Propriété intellectuelle',
        body: 'Les textes, photographies et éléments graphiques de ce site sont protégés. Toute reproduction sans autorisation écrite est interdite.',
      },
      {
        heading: 'Responsabilité',
        body: 'Les informations (tarifs indicatifs, disponibilités) sont fournies à titre informatif. Le montant final et la confirmation de réservation sont validés sur la plateforme choisie (Airbnb, demande directe) ou par contact direct avec l’hôte.',
      },
    ],
  },
  'politique-confidentialite': {
    title: 'Politique de confidentialité',
    description: 'Traitement des données personnelles pour les demandes de réservation et contact.',
    sections: [
      {
        heading: 'Données collectées',
        body: 'Lors d’une demande de réservation directe, nous collectons les informations que vous transmettez volontairement : nom, e-mail, téléphone, dates de séjour, nombre de voyageurs et message éventuel.',
      },
      {
        heading: 'Finalité',
        body: 'Ces données servent uniquement à traiter votre demande de réservation ou de contact, à vous répondre et à organiser votre séjour.',
      },
      {
        heading: 'Durée de conservation',
        body: 'Les données liées à une demande sont conservées le temps nécessaire au traitement de la réservation et aux obligations légales applicables en Belgique.',
      },
      {
        heading: 'Vos droits',
        body: 'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour l’exercer, contactez-nous via les coordonnées en pied de page.',
      },
      {
        heading: 'Cookies',
        body: 'Ce site ne dépose pas de cookies publicitaires. Des cookies techniques peuvent être utilisés par des services tiers intégrés (ex. carte Google Maps).',
      },
    ],
  },
}

type LegalPageProps = {
  kind: LegalKind
}

export function LegalPage({ kind }: LegalPageProps) {
  const page = content[kind]
  const site = getSite()

  return (
    <>
      <SeoHead
        title={`${page.title} | ${site.name}`}
        description={page.description}
        path={`/${kind}`}
        noindex
      />
      <article className="bg-white pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <Link
            to={homeSectionTo('#accueil')}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour à l’accueil
          </Link>
          <header className="mt-8 max-w-2xl">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-4 text-brand-muted">Dernière mise à jour : {new Date().getFullYear()}</p>
          </header>
          <div className="prose prose-stone mt-10 max-w-2xl space-y-8">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-brand-ink">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-brand-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
