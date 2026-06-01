import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  addMonths,
  formatMonthLabel,
  getMonthGrid,
  getWeekdayLabels,
  isDateBlocked,
  isInPreviewRange,
  isInStayRange,
  isPastDate,
  isSameDay,
  toIsoDate,
  type BlockedRange,
} from '../lib/calendar-utils'

type CalendarMonthGridProps = {
  year: number
  month: number
  onMonthChange: (delta: number) => void
  ranges: BlockedRange[]
  today: Date
  mode: 'display' | 'select'
  minDate?: string
  selectedStart?: string
  selectedEnd?: string
  hoverDate?: string | null
  onDayClick?: (iso: string) => void
  onDayHover?: (iso: string | null) => void
  footer?: React.ReactNode
}

function dayClasses(params: {
  blocked: boolean
  isPast: boolean
  isToday: boolean
  isStart: boolean
  isEnd: boolean
  inRange: boolean
  inPreview: boolean
  selectable: boolean
}): string {
  const { blocked, isPast, isToday, isStart, isEnd, inRange, inPreview, selectable } = params

  if (isStart || isEnd) {
    return [
      'bg-brand-accent font-semibold text-white shadow-sm',
      selectable ? 'cursor-pointer hover:bg-brand-accent-soft' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (inRange || inPreview) {
    return [
      'bg-brand-accent/15 font-medium text-brand-ink',
      inPreview ? 'bg-brand-accent/10' : '',
      selectable ? 'cursor-pointer hover:bg-brand-accent/25' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (blocked) {
    return 'bg-stone-200 font-medium text-stone-500 line-through'
  }

  if (isPast) {
    return 'bg-stone-50 font-medium text-stone-300'
  }

  return [
    'bg-stone-50 font-medium text-brand-ink',
    selectable ? 'cursor-pointer hover:bg-stone-100' : '',
    isToday ? 'ring-2 ring-brand-accent ring-offset-1' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function CalendarMonthGrid({
  year,
  month,
  onMonthChange,
  ranges,
  today,
  mode,
  minDate,
  selectedStart = '',
  selectedEnd = '',
  hoverDate = null,
  onDayClick,
  onDayHover,
  footer,
}: CalendarMonthGridProps) {
  const weekdays = getWeekdayLabels()
  const cells = getMonthGrid(year, month)
  const monthLabel = formatMonthLabel(year, month)
  const previewEnd = selectedStart && !selectedEnd ? hoverDate : null

  function handleDayClick(iso: string, disabled: boolean) {
    if (disabled || mode !== 'select' || !onDayClick) return
    onDayClick(iso)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onMonthChange(-1)}
          className="cursor-pointer rounded-lg p-2 text-brand-muted transition-colors duration-200 hover:bg-stone-100 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent motion-reduce:transition-none"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <span className="text-sm font-semibold capitalize text-brand-ink">{monthLabel}</span>
        <button
          type="button"
          onClick={() => onMonthChange(1)}
          className="cursor-pointer rounded-lg p-2 text-brand-muted transition-colors duration-200 hover:bg-stone-100 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent motion-reduce:transition-none"
          aria-label="Mois suivant"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-brand-muted">
        {weekdays.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div
        className="mt-1 grid grid-cols-7 gap-1"
        role="grid"
        aria-label={`Calendrier ${monthLabel}`}
        onMouseLeave={() => onDayHover?.(null)}
      >
        {cells.map((date, i) => {
          if (!date) {
            return <div key={`empty-${i}`} className="aspect-square" aria-hidden />
          }

          const iso = toIsoDate(date)
          const blocked = isDateBlocked(iso, ranges)
          const isPast = minDate ? isPastDate(iso, minDate) : false
          const isToday = isSameDay(date, today)
          const isStart = iso === selectedStart
          const isEnd = iso === selectedEnd
          const inRange = isInStayRange(iso, selectedStart, selectedEnd)
          const inPreview = isInPreviewRange(iso, selectedStart, previewEnd)
          const disabled = blocked || isPast
          const selectable = mode === 'select' && !disabled

          const className = [
            'flex aspect-square items-center justify-center rounded-lg text-sm transition-colors duration-200 motion-reduce:transition-none',
            dayClasses({
              blocked,
              isPast,
              isToday: isToday && !isStart && !isEnd,
              isStart,
              isEnd,
              inRange,
              inPreview,
              selectable,
            }),
          ].join(' ')

          const ariaLabel = blocked
            ? `${date.getDate()} — indisponible`
            : isPast
              ? `${date.getDate()} — passé`
              : isStart
                ? `${date.getDate()} — arrivée`
                : isEnd
                  ? `${date.getDate()} — départ`
                  : `${date.getDate()} — disponible`

          if (mode === 'select') {
            return (
              <button
                key={iso}
                type="button"
                role="gridcell"
                disabled={disabled}
                aria-label={ariaLabel}
                aria-pressed={isStart || isEnd}
                className={className}
                onClick={() => handleDayClick(iso, disabled)}
                onMouseEnter={() => onDayHover?.(iso)}
                onFocus={() => onDayHover?.(iso)}
              >
                {date.getDate()}
              </button>
            )
          }

          return (
            <div key={iso} role="gridcell" aria-label={ariaLabel} className={className}>
              {date.getDate()}
            </div>
          )
        })}
      </div>

      {footer}
    </>
  )
}

export function useCalendarView(initial: Date) {
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  function shiftMonth(delta: number) {
    const [y, m] = addMonths(viewYear, viewMonth, delta)
    setViewYear(y)
    setViewMonth(m)
  }

  return { viewYear, viewMonth, shiftMonth, setViewYear, setViewMonth }
}
