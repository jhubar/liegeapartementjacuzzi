import { BedDouble, Lamp, Sparkles, Wind } from 'lucide-react'

export function BedroomAmenities() {
  return (
    <ul className="flex list-none flex-wrap gap-3 p-0" aria-label="Confort">
      <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        <Lamp className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        Éclairage doux
      </li>
      <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        <Wind className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        Chambre calme
      </li>
      <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        <Sparkles className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        Literie de qualité
      </li>
      <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        <BedDouble className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        Lit double
      </li>
    </ul>
  )
}
