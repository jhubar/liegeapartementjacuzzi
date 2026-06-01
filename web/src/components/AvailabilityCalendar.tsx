import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import blockedDatesJson from '../data/blocked-dates.json'
import {
  addMonths,
  formatMonthLabel,
  getMonthGrid,
  getWeekdayLabels,
  isDateBlocked,
  isSameDay,
  toIsoDate,
  type BlockedDatesData,
} from '../lib/calendar-utils'

const data = blockedDatesJson as BlockedDatesData

export function AvailabilityCalendar() {
  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const weekdays = getWeekdayLabels()
  const cells = getMonthGrid(viewYear, viewMonth)
  const monthLabel = formatMonthLabel(viewYear, viewMonth)

  const updatedLabel = useMemo(() => {
    if (!data.updatedAt || data.source === 'none') return null
    try {
      return new Intl.DateTimeFormat('fr-BE', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(data.updatedAt))
    } catch {
      return null
    }
  }, [])

  function shiftMonth(delta: number) {
    const [y, m] = addMonths(viewYear, viewMonth, delta)
    setViewYear(y)
    setViewMonth(m)
  }

  return (
    <section
      id="disponibilites"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="availability-heading"
    >
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
              Dates déjà réservées (Airbnb & Booking.com)
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Les jours barrés correspondent aux nuits déjà réservées sur Airbnb ou Booking.com.
              Pour toute autre période, contactez-nous ou réservez via votre plateforme habituelle.
            </p>
            <a
              href="#reserver"
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Réserver ces dates
            </a>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-brand-sand/40 p-6 shadow-soft">
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80">
              <div className="mb-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-stone-100 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label="Mois précédent"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <span className="text-sm font-semibold capitalize text-brand-ink">{monthLabel}</span>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-stone-100 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label="Mois suivant"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-brand-muted">
                {weekdays.map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label={`Calendrier ${monthLabel}`}>
                {cells.map((date, i) => {
                  if (!date) {
                    return <div key={`empty-${i}`} className="aspect-square" aria-hidden />
                  }

                  const iso = toIsoDate(date)
                  const blocked = isDateBlocked(iso, data.ranges)
                  const isToday = isSameDay(date, today)

                  return (
                    <div
                      key={iso}
                      role="gridcell"
                      aria-label={
                        blocked
                          ? `${date.getDate()} — indisponible`
                          : `${date.getDate()} — disponible`
                      }
                      className={[
                        'flex aspect-square items-center justify-center rounded-lg text-sm font-medium',
                        blocked
                          ? 'bg-stone-200 text-stone-500 line-through'
                          : 'bg-stone-50 text-brand-ink',
                        isToday && !blocked ? 'ring-2 ring-brand-accent ring-offset-1' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {date.getDate()}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded bg-stone-200" aria-hidden />
                  Réservé
                </span>
                {updatedLabel ? (
                  <span>Mis à jour le {updatedLabel}</span>
                ) : (
                  <span>Calendrier non synchronisé</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
