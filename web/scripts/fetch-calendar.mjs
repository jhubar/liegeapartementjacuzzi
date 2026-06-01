/**
 * Fetches the private iCal export and writes blocked date ranges for the static site.
 * URL: ICAL_EXPORT_URL env var, or web/calendar.config.json → exportUrl
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = join(__dirname, '..')
const outPath = join(webRoot, 'src/data/blocked-dates.json')

function resolveExportUrl() {
  if (process.env.ICAL_EXPORT_URL?.trim()) {
    return process.env.ICAL_EXPORT_URL.trim()
  }
  const configPath = join(webRoot, 'calendar.config.json')
  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    if (config.exportUrl?.trim()) return config.exportUrl.trim()
  }
  console.warn('[fetch-calendar] No iCal URL configured — writing empty ranges.')
  return null
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

  ranges.sort((a, b) => a.start.localeCompare(b.start))
  return ranges
}

async function main() {
  const exportUrl = resolveExportUrl()
  const isCI = process.env.GITHUB_ACTIONS === 'true'

  if (!exportUrl) {
    if (isCI && existsSync(outPath)) {
      console.warn(
        '[fetch-calendar] ICAL_EXPORT_URL absent — conservation de src/data/blocked-dates.json existant.',
      )
      console.warn(
        '[fetch-calendar] Ajoutez le secret ICAL_EXPORT_URL dans Settings → Secrets → Actions.',
      )
      return
    }
    if (isCI) {
      throw new Error(
        'ICAL_EXPORT_URL manquant : ajoutez le secret dans GitHub (Settings → Secrets → Actions).',
      )
    }
    const payload = {
      updatedAt: new Date().toISOString(),
      source: 'none',
      ranges: [],
    }
    writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`)
    console.warn('[fetch-calendar] Pas d’URL iCal — calendrier vide en local.')
    console.warn('[fetch-calendar] Copiez calendar.config.example.json → calendar.config.json (gitignored).')
    return
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    source: 'ical',
    ranges: [],
  }

  const res = await fetch(exportUrl)
  if (!res.ok) {
    throw new Error(`iCal fetch failed: ${res.status} ${res.statusText}`)
  }

  const text = await res.text()
  payload.ranges = parseBlockedRanges(text)
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`[fetch-calendar] ${payload.ranges.length} blocked range(s) → ${outPath}`)
}

main().catch((err) => {
  console.error('[fetch-calendar]', err)
  process.exit(1)
})
