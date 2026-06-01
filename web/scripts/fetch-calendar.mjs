/**
 * Fetches private iCal exports (Booking.com + Airbnb) and merges blocked dates.
 *
 * Env: ICAL_EXPORT_URL, AIRBNB_ICAL_URL
 * Local (gitignored): web/calendar.config.json → bookingExportUrl, airbnbExportUrl
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = join(__dirname, '..')
const outPath = join(webRoot, 'src/data/blocked-dates.json')

function resolveFeedUrls() {
  const feeds = []

  if (process.env.ICAL_EXPORT_URL?.trim()) {
    feeds.push({ name: 'booking', url: process.env.ICAL_EXPORT_URL.trim() })
  }
  if (process.env.AIRBNB_ICAL_URL?.trim()) {
    feeds.push({ name: 'airbnb', url: process.env.AIRBNB_ICAL_URL.trim() })
  }

  const configPath = join(webRoot, 'calendar.config.json')
  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    if (config.bookingExportUrl?.trim()) {
      feeds.push({ name: 'booking', url: config.bookingExportUrl.trim() })
    }
    if (config.airbnbExportUrl?.trim()) {
      feeds.push({ name: 'airbnb', url: config.airbnbExportUrl.trim() })
    }
  }

  const seen = new Set()
  return feeds.filter((feed) => {
    if (seen.has(feed.url)) return false
    seen.add(feed.url)
    return true
  })
}

/** Unfold RFC 5545 line continuations. */
function unfoldIcal(text) {
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '')
}

function parseIcalDate(value) {
  const raw = value.trim()
  if (/^\d{8}$/.test(raw)) {
    const y = raw.slice(0, 4)
    const m = raw.slice(4, 6)
    const d = raw.slice(6, 8)
    return `${y}-${m}-${d}`
  }
  if (/^\d{8}T/.test(raw)) {
    const y = raw.slice(0, 4)
    const m = raw.slice(4, 6)
    const d = raw.slice(6, 8)
    return `${y}-${m}-${d}`
  }
  return null
}

function parsePropertyLine(line) {
  const colon = line.indexOf(':')
  if (colon === -1) return null
  const namePart = line.slice(0, colon)
  const value = line.slice(colon + 1)
  const name = namePart.split(';')[0].toUpperCase()
  return { name, value }
}

function parseBlockedRanges(icalText) {
  const unfolded = unfoldIcal(icalText)
  const blocks = unfolded.split('BEGIN:VEVENT')
  const ranges = []

  for (const block of blocks.slice(1)) {
    const chunk = block.split('END:VEVENT')[0]
    let start = null
    let end = null

    for (const line of chunk.split('\n')) {
      const prop = parsePropertyLine(line.trim())
      if (!prop) continue
      if (prop.name === 'DTSTART') start = parseIcalDate(prop.value)
      if (prop.name === 'DTEND') end = parseIcalDate(prop.value)
    }

    if (start) {
      ranges.push({
        start,
        end: end ?? start,
      })
    }
  }

  return ranges
}

async function fetchFeed(feed) {
  const res = await fetch(feed.url)
  if (!res.ok) {
    throw new Error(`${feed.name} iCal fetch failed: ${res.status} ${res.statusText}`)
  }
  const text = await res.text()
  const ranges = parseBlockedRanges(text)
  console.log(`[fetch-calendar] ${feed.name}: ${ranges.length} blocked range(s)`)
  return ranges
}

async function main() {
  const feeds = resolveFeedUrls()
  const isCI = process.env.GITHUB_ACTIONS === 'true'

  if (feeds.length === 0) {
    if (existsSync(outPath)) {
      console.warn(
        '[fetch-calendar] Aucune URL iCal — conservation de src/data/blocked-dates.json existant.',
      )
      if (isCI) {
        console.warn(
          '[fetch-calendar] Secrets GitHub : ICAL_EXPORT_URL (Booking) et/ou AIRBNB_ICAL_URL (Airbnb).',
        )
      } else {
        console.warn(
          '[fetch-calendar] Local : calendar.config.json (gitignored) ou variables d’environnement.',
        )
      }
      return
    }
    if (isCI) {
      throw new Error(
        'Au moins un secret iCal requis : ICAL_EXPORT_URL et/ou AIRBNB_ICAL_URL (Settings → Secrets → Actions).',
      )
    }
    writeFileSync(
      outPath,
      `${JSON.stringify({ updatedAt: new Date().toISOString(), source: 'none', feeds: [], ranges: [] }, null, 2)}\n`,
    )
    console.warn('[fetch-calendar] Pas d’URL iCal — calendrier vide en local.')
    console.warn('[fetch-calendar] Copiez calendar.config.example.json → calendar.config.json (gitignored).')
    return
  }

  const merged = []
  const feedNames = []

  for (const feed of feeds) {
    merged.push(...(await fetchFeed(feed)))
    feedNames.push(feed.name)
  }

  merged.sort((a, b) => a.start.localeCompare(b.start))

  const payload = {
    updatedAt: new Date().toISOString(),
    source: 'ical',
    feeds: feedNames,
    ranges: merged,
  }

  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`[fetch-calendar] ${merged.length} blocked range(s) total → ${outPath}`)
}

main().catch((err) => {
  console.error('[fetch-calendar]', err)
  process.exit(1)
})
