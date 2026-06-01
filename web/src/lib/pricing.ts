import { enumerateStayNights, parseIsoDate } from './calendar-utils'

const RATE_STANDARD = 189
const RATE_SATURDAY_NIGHT = 211
const WEEK_DISCOUNT = 0.14
const MONTH_DISCOUNT = 0.3

/** Tarif d’une nuit (nuée du jour indiqué). Samedi → dimanche = 211 €. */
export function rateForNight(date: Date): number {
  return date.getDay() === 6 ? RATE_SATURDAY_NIGHT : RATE_STANDARD
}

export type StayQuote = {
  nights: number
  subtotal: number
  discountPercent: number
  total: number
}

export function quoteStay(checkIn: string, checkOut: string): StayQuote | null {
  const nightIsos = enumerateStayNights(checkIn, checkOut)
  if (nightIsos.length === 0) return null

  const subtotal = nightIsos.reduce(
    (sum, iso) => sum + rateForNight(parseIsoDate(iso)),
    0,
  )

  let discountPercent = 0
  if (nightIsos.length >= 28) discountPercent = MONTH_DISCOUNT * 100
  else if (nightIsos.length >= 7) discountPercent = WEEK_DISCOUNT * 100

  const total = Math.round(subtotal * (1 - discountPercent / 100))

  return { nights: nightIsos.length, subtotal, discountPercent, total }
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
