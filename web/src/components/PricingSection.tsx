export function PricingSection() {
  return (
    <section
      id="tarifs"
      className="bg-brand-cream py-16 sm:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="pricing-heading"
            className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
          >
            Tarifs indicatifs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Des conditions transparentes pour préparer votre séjour. Les tarifs finaux sont
            confirmés au moment de la réservation sur la plateforme choisie.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-stone-200/90 bg-white p-8 shadow-sm">
            <dl className="space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
                <dt className="font-medium text-brand-muted">Nuit standard</dt>
                <dd className="font-display text-2xl font-semibold text-brand-ink">189&nbsp;€</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
                <dt className="font-medium text-brand-muted">Nuit du vendredi au samedi</dt>
                <dd className="font-display text-2xl font-semibold text-brand-ink">189&nbsp;€</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
                <dt className="font-medium text-brand-muted">Nuit du samedi au dimanche</dt>
                <dd className="font-display text-2xl font-semibold text-brand-ink">211&nbsp;€</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-brand-muted">Réduction semaine</dt>
                <dd className="text-lg font-semibold text-emerald-700">−14&nbsp;%</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-brand-muted">Réduction mois</dt>
                <dd className="text-lg font-semibold text-emerald-700">−30&nbsp;%</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-brand-cream p-8">
            <p className="font-display text-xl font-semibold text-brand-ink">
              Une valeur juste pour un séjour haut de gamme au centre-ville.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Les prix peuvent varier selon les périodes, la durée du séjour et les plateformes de
              réservation.
            </p>
            <a
              href="#reserver"
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-center text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Vérifier les tarifs en ligne
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
