/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_FORM_ENDPOINT?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_NAME?: string
  readonly VITE_CONTACT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
