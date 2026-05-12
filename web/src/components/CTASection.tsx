import { AIRBNB_LISTING_URL } from '../config/booking-links'

export function CTASection() {
  return (
    <section
      id="reserver"
      className="relative overflow-hidden bg-stone-900 py-16 sm:py-20 lg:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Prêt à séjourner au cœur de Liège ?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-300">
          Réservez sur Airbnb ou écrivez-nous pour une demande personnalisée — nous vous répondrons
          avec attention.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={AIRBNB_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:w-auto"
          >
            Réserver maintenant
          </a>
          <a
            href="#contact"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-stone-500 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:w-auto"
          >
            Nous contacter
          </a>
        </div>
        <p className="mt-6 text-xs text-stone-500">
          Réservation sur Airbnb ou par message — nous restons à votre écoute.
        </p>
      </div>
    </section>
  )
}
