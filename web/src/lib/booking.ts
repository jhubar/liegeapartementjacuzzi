import { AIRBNB_LISTING_URL, CONTACT_EMAIL } from '../config/booking-links'
import { enumerateStayNights, isDateBlocked, type BlockedRange } from './calendar-utils'

export function isStayAvailable(
  checkIn: string,
  checkOut: string,
  ranges: BlockedRange[],
): boolean {
  if (!checkIn || !checkOut || checkOut <= checkIn) return false
  return enumerateStayNights(checkIn, checkOut).every((night) => !isDateBlocked(night, ranges))
}

export function buildAirbnbBookingUrl(
  checkIn: string,
  checkOut: string,
  adults: number,
): string {
  const url = new URL(AIRBNB_LISTING_URL)
  url.searchParams.set('check_in', checkIn)
  url.searchParams.set('check_out', checkOut)
  url.searchParams.set('adults', String(adults))
  return url.toString()
}

export function buildDirectRequestMailto(params: {
  name: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: number
  message: string
}): string {
  const subject = `Demande de réservation — ${params.checkIn} → ${params.checkOut}`
  const body = [
    `Nom : ${params.name}`,
    `E-mail : ${params.email}`,
    `Téléphone : ${params.phone || '—'}`,
    `Arrivée : ${params.checkIn}`,
    `Départ : ${params.checkOut}`,
    `Voyageurs : ${params.guests}`,
    '',
    params.message || '—',
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
