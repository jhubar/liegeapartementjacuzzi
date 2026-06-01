import { useMemo, useState } from 'react'
import blockedDatesJson from '../data/blocked-dates.json'
import {
  AIRBNB_LISTING_URL,
  BOOKING_FORM_ENDPOINT,
  BOOKING_MAX_GUESTS,
  CONTACT_EMAIL,
} from '../config/booking-links'
import {
  buildAirbnbBookingUrl,
  buildDirectRequestMailto,
  isStayAvailable,
} from '../lib/booking'
import { formatEuro, quoteStay } from '../lib/pricing'
import type { BlockedDatesData } from '../lib/calendar-utils'

const blockedData = blockedDatesJson as BlockedDatesData

type BookingMode = 'airbnb' | 'direct'

function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-brand-ink shadow-sm transition-colors focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30'

export function BookingSection() {
  const [mode, setMode] = useState<BookingMode>('airbnb')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const minDate = todayIso()

  const quote = useMemo(() => {
    if (!checkIn || !checkOut) return null
    return quoteStay(checkIn, checkOut)
  }, [checkIn, checkOut])

  const available = useMemo(() => {
    if (!checkIn || !checkOut) return null
    return isStayAvailable(checkIn, checkOut, blockedData.ranges)
  }, [checkIn, checkOut])

  const validationError = useMemo(() => {
    if (!checkIn || !checkOut) return null
    if (checkOut <= checkIn) return 'La date de départ doit être après l’arrivée.'
    if (available === false) return 'Ces dates ne sont pas disponibles.'
    return null
  }, [checkIn, checkOut, available])

  const canBook = Boolean(checkIn && checkOut && !validationError && quote)

  const airbnbUrl = canBook
    ? buildAirbnbBookingUrl(checkIn, checkOut, guests)
    : AIRBNB_LISTING_URL

  async function handleDirectSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canBook || !name.trim() || !email.trim()) return

    if (BOOKING_FORM_ENDPOINT) {
      setFormStatus('sending')
      try {
        const res = await fetch(BOOKING_FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            checkIn,
            checkOut,
            guests,
            message,
            _subject: `Demande de réservation — ${checkIn} → ${checkOut}`,
          }),
        })
        if (!res.ok) throw new Error('submit failed')
        setFormStatus('sent')
      } catch {
        setFormStatus('error')
      }
      return
    }

    window.location.href = buildDirectRequestMailto({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      guests,
      message: message.trim(),
    })
  }

  return (
    <section
      id="reserver"
      className="relative overflow-hidden bg-stone-900 py-16 sm:py-20 lg:py-24"
      aria-labelledby="booking-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <h2
              id="booking-heading"
              className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Réserver en ligne
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-300">
              Choisissez vos dates, vérifiez la disponibilité et le tarif estimé, puis finalisez
              sur Airbnb ou envoyez une demande directe.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-stone-400">
              <li>Disponibilités synchronisées Airbnb & Booking.com</li>
              <li>Tarif indicatif calculé selon nos grilles</li>
              <li>Confirmation immédiate via Airbnb</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lift ring-1 ring-stone-200/80 sm:p-8">
            <div className="flex rounded-full bg-brand-sand p-1" role="tablist" aria-label="Mode de réservation">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'airbnb'}
                className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  mode === 'airbnb'
                    ? 'bg-white text-brand-ink shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                onClick={() => setMode('airbnb')}
              >
                Airbnb
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'direct'}
                className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  mode === 'direct'
                    ? 'bg-white text-brand-ink shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                onClick={() => setMode('direct')}
              >
                Demande directe
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-brand-ink">
                Arrivée
                <input
                  type="date"
                  className={inputClass}
                  value={checkIn}
                  min={minDate}
                  onChange={(e) => {
                    setCheckIn(e.target.value)
                    if (checkOut && e.target.value >= checkOut) setCheckOut('')
                  }}
                  required
                />
              </label>
              <label className="block text-sm font-medium text-brand-ink">
                Départ
                <input
                  type="date"
                  className={inputClass}
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-brand-ink">
              Voyageurs
              <select
                className={inputClass}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {Array.from({ length: BOOKING_MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'voyageur' : 'voyageurs'}
                  </option>
                ))}
              </select>
            </label>

            {validationError && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                {validationError}
              </p>
            )}

            {canBook && quote && (
              <div className="mt-4 rounded-xl bg-brand-sand/80 px-4 py-4 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>
                    {quote.nights} {quote.nights > 1 ? 'nuits' : 'nuit'}
                  </span>
                  <span>{formatEuro(quote.subtotal)}</span>
                </div>
                {quote.discountPercent > 0 && (
                  <div className="mt-1 flex justify-between text-emerald-700">
                    <span>Réduction (−{quote.discountPercent}&nbsp;%)</span>
                    <span>
                      −{formatEuro(quote.subtotal - quote.total)}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 font-semibold text-brand-ink">
                  <span>Total estimé</span>
                  <span className="font-display text-lg">{formatEuro(quote.total)}</span>
                </div>
                <p className="mt-2 text-xs text-brand-muted">
                  Tarif indicatif — le montant final est confirmé sur Airbnb ou par nos soins.
                </p>
              </div>
            )}

            {mode === 'airbnb' ? (
              <a
                href={canBook ? airbnbUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canBook}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${
                  canBook
                    ? 'cursor-pointer bg-brand-accent hover:bg-brand-accent-soft'
                    : 'pointer-events-none cursor-not-allowed bg-stone-300 text-stone-500'
                }`}
                onClick={(e) => {
                  if (!canBook) e.preventDefault()
                }}
              >
                Continuer sur Airbnb
              </a>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleDirectSubmit}>
                <label className="block text-sm font-medium text-brand-ink">
                  Nom complet
                  <input
                    type="text"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-brand-ink">
                    E-mail
                    <input
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="block text-sm font-medium text-brand-ink">
                    Téléphone
                    <input
                      type="tel"
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-brand-ink">
                  Message (optionnel)
                  <textarea
                    className={`${inputClass} min-h-[88px] resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Heure d’arrivée, demande particulière…"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!canBook || !name.trim() || !email.trim() || formStatus === 'sending'}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                >
                  {formStatus === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
                </button>
                {formStatus === 'sent' && (
                  <p className="text-sm text-emerald-700" role="status">
                    Demande envoyée — nous vous répondrons rapidement.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-sm text-red-700" role="alert">
                    Envoi impossible. Écrivez-nous à{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}
                {!BOOKING_FORM_ENDPOINT && (
                  <p className="text-xs text-brand-muted">
                    La demande s’ouvre dans votre application e-mail. Pour un envoi direct depuis le
                    site, configurez Formspree (variable VITE_BOOKING_FORM_ENDPOINT).
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}