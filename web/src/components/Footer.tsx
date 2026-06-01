import { Link } from 'react-router-dom'
import { AIRBNB_LISTING_URL, CONTACT_EMAIL } from '../config/booking-links'
import { homeSectionTo } from '../lib/paths'

const footerLinks = [
  { hash: '#accueil', label: 'Accueil' },
  { hash: '#appartement', label: 'Appartement' },
  { hash: '#chambres', label: 'Chambres' },
  { hash: '#tarifs', label: 'Tarifs' },
  { hash: '#disponibilites', label: 'Disponibilités' },
  { hash: '#reserver', label: 'Réserver' },
  { hash: '#localisation', label: 'Localisation' },
] as const

export function Footer() {
  return (
    <footer id="contact" className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">Nom de l’appartement</p>
            <p className="mt-2 text-sm leading-relaxed">
              Appartement trois chambres · Liège, Belgique
              <br />
              Quartier Médiacité, centre-ville
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Liens rapides
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.hash}>
                  <Link
                    to={homeSectionTo(l.hash)}
                    className="cursor-pointer text-stone-300 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Réservation & contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="tel:+32483597987"
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  +32 483 59 79 87
                </a>
              </li>
              <li>
                <a
                  href="tel:+32477077331"
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  +32 477 07 73 31
                </a>
              </li>
              <li>
                <a
                  href={AIRBNB_LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  Airbnb — voir l’annonce
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-stone-800 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-stone-500">© {new Date().getFullYear()} · Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="#"
              className="cursor-pointer text-stone-500 transition-colors hover:text-stone-300 focus:outline-none focus-visible:underline"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="cursor-pointer text-stone-500 transition-colors hover:text-stone-300 focus:outline-none focus-visible:underline"
            >
              Politique de confidentialité
            </a>
            <a
              href="#"
              className="cursor-pointer text-stone-500 transition-colors hover:text-stone-300 focus:outline-none focus-visible:underline"
            >
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
