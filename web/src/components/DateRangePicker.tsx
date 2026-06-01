import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { CalendarMonthGrid, useCalendarView } from './CalendarMonthGrid'
import {
  formatDateFr,
  isDateBlocked,
  isPastDate,
  parseIsoDate,
  type BlockedRange,
} from '../lib/calendar-utils'

type DateRangePickerProps = {
  checkIn: string
  checkOut: string
  onChange: (checkIn: string, checkOut: string) => void
  ranges: BlockedRange[]
  minDate: string
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  ranges,
  minDate,
}: DateRangePickerProps) {
  const today = useMemo(() => new Date(), [])
  const { viewYear, viewMonth, shiftMonth, setViewYear, setViewMonth } = useCalendarView(today)
  const [hoverDate, setHoverDate] = useState<string | null>(null)

  const selectionHint = !checkIn
    ? 'Choisissez votre date d’arrivée'
    : !checkOut
      ? 'Choisissez votre date de départ'
      : `${formatDateFr(checkIn, { day: 'numeric', month: 'short' })} → ${formatDateFr(checkOut, { day: 'numeric', month: 'short', year: 'numeric' })}`

  function handleDayClick(iso: string) {
    if (isPastDate(iso, minDate) || isDateBlocked(iso, ranges)) return

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, '')
      setHoverDate(null)
      return
    }

    if (iso <= checkIn) {
      onChange(iso, '')
      setHoverDate(null)
      return
    }

    onChange(checkIn, iso)
    setHoverDate(null)
  }

  function focusMonthFor(iso: string) {
    const d = parseIsoDate(iso)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-stone-200 bg-white ring-1 ring-stone-200/80">
        <div className="border-r border-stone-200 px-4 py-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-brand-muted">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Arrivée
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-brand-ink">
            {checkIn ? formatDateFr(checkIn) : '—'}
          </span>
        </div>
        <div className="px-4 py-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-brand-muted">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Départ
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-brand-ink">
            {checkOut ? formatDateFr(checkOut) : '—'}
          </span>
        </div>
      </div>

      <p className="text-xs text-brand-muted" aria-live="polite">
        {selectionHint}
      </p>

      <div className="rounded-xl bg-brand-sand/40 p-4 ring-1 ring-stone-200/80">
        <CalendarMonthGrid
          year={viewYear}
          month={viewMonth}
          onMonthChange={shiftMonth}
          ranges={ranges}
          today={today}
          mode="select"
          minDate={minDate}
          selectedStart={checkIn}
          selectedEnd={checkOut}
          hoverDate={hoverDate}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
          footer={
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-muted">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-stone-200" aria-hidden />
                Réservé
              </span>
              {(checkIn || checkOut) && (
                <button
                  type="button"
                  className="cursor-pointer font-medium text-brand-accent underline-offset-2 transition-colors hover:text-brand-accent-soft hover:underline"
                  onClick={() => {
                    onChange('', '')
                    setHoverDate(null)
                    focusMonthFor(minDate)
                  }}
                >
                  Effacer les dates
                </button>
              )}
            </div>
          }
        />
      </div>

      {/* Accessible values for form validation */}
      <input type="hidden" name="checkIn" value={checkIn} />
      <input type="hidden" name="checkOut" value={checkOut} />
    </div>
  )
}
