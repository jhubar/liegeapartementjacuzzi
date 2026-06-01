import { useMemo } from 'react'
import blockedDatesJson from '../data/blocked-dates.json'
import { CalendarMonthGrid, useCalendarView } from './CalendarMonthGrid'
import type { BlockedDatesData } from '../lib/calendar-utils'

const data = blockedDatesJson as BlockedDatesData

export function AvailabilityCalendar() {
  const today = useMemo(() => new Date(), [])
  const { viewYear, viewMonth, shiftMonth } = useCalendarView(today)

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
              <CalendarMonthGrid
                year={viewYear}
                month={viewMonth}
                onMonthChange={shiftMonth}
                ranges={data.ranges}
                today={today}
                mode="display"
                footer={
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
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
