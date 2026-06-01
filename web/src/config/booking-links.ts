/** Liens externes et réservation — URL Airbnb canonique (sans params de recherche). */
export const AIRBNB_LISTING_URL =
  'https://fr.airbnb.be/rooms/1683423850329472195' as const

export const CONTACT_EMAIL = 'contact@example.com' as const

export const BOOKING_MAX_GUESTS = 6

/** Optionnel : endpoint Formspree (https://formspree.io/f/xxx) pour demandes directes sans mailto. */
export const BOOKING_FORM_ENDPOINT = import.meta.env.VITE_BOOKING_FORM_ENDPOINT ?? ''
