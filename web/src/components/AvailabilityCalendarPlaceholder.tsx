/**
 * Placeholder UI for future Booking.com iCal (or other) calendar sync.
 * Replace this component with a real calendar once feed parsing is implemented.
 */
export function AvailabilityCalendarPlaceholder() {
  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const
  const placeholderCells = Array.from({ length: 35 }, (_, i) => i)

  return (
    <section
      id="disponibilites"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="availability-heading"
    >
      {/* TODO: connect Booking.com iCal feed here to display unavailable dates. */}
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2
              id="availability-heading"
              className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
            >
              Disponibilités
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              Consultez les disponibilités en temps réel
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Nous préparons l’affichage des dates réservées à partir du flux iCal de votre annonce.
              En attendant, contactez-nous ou passez par votre plateforme habituelle pour réserver.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Demander une réservation
            </a>
          </div>

          <div className="rounded-2xl border border-dashed border-stone-300 bg-brand-sand/40 p-6 shadow-inner">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Aperçu du calendrier (placeholder)
            </p>
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-ink">Mois à venir</span>
                <span className="text-xs text-brand-muted">Données non connectées</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-brand-muted">
                {weekdays.map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {placeholderCells.map((i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-lg bg-stone-100 text-[0.7rem] font-medium text-stone-400"
                  >
                    ·
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
