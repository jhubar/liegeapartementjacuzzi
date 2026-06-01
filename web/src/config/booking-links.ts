import siteConfig from './site.config.json'

/** Liens externes et réservation — URL Airbnb canonique (sans params de recherche). */
export const AIRBNB_LISTING_URL = siteConfig.sameAs[0]

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || siteConfig.email

export const BOOKING_MAX_GUESTS = 6

/** Optionnel : endpoint Formspree (https://formspree.io/f/xxx) pour demandes directes sans mailto. */
export const BOOKING_FORM_ENDPOINT = import.meta.env.VITE_BOOKING_FORM_ENDPOINT ?? ''
