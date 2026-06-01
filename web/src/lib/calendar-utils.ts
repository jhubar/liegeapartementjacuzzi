export type BlockedRange = {
  start: string
  end: string
}

export type BlockedDatesData = {
  updatedAt: string
  source: string
  feeds?: string[]
  ranges: BlockedRange[]
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const

const MONTH_NAMES = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** iCal DTEND for all-day events is exclusive (checkout day). */
export function isDateBlocked(iso: string, ranges: BlockedRange[]): boolean {
  for (const range of ranges) {
    if (iso >= range.start && iso < range.end) return true
  }
  return false
}

export function formatMonthLabel(year: number, monthIndex: number): string {
  return `${MONTH_NAMES[monthIndex]} ${year}`
}

export function getWeekdayLabels(): readonly string[] {
  return WEEKDAYS
}

/** Monday-first grid cells for a month (null = padding). */
export function getMonthGrid(year: number, monthIndex: number): (Date | null)[] {
  const first = new Date(year, monthIndex, 1)
  const last = new Date(year, monthIndex + 1, 0)
  const startOffset = (first.getDay() + 6) % 7
  const cells: (Date | null)[] = []

  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let day = 1; day <= last.getDate(); day++) {
    cells.push(new Date(year, monthIndex, day))
  }

  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function addMonths(year: number, monthIndex: number, delta: number): [number, number] {
  const d = new Date(year, monthIndex + delta, 1)
  return [d.getFullYear(), d.getMonth()]
}
