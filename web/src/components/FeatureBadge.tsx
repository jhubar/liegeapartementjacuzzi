import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  label: string
}

export function FeatureBadge({ icon: Icon, label }: Props) {
  return (
    <div className="flex cursor-default items-center gap-2 rounded-full border border-stone-200/90 bg-white/80 px-3 py-2 text-sm font-medium text-brand-ink shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-soft motion-reduce:transition-none">
      <Icon className="h-4 w-4 shrink-0 text-brand-accent" strokeWidth={1.75} aria-hidden />
      <span>{label}</span>
    </div>
  )
}
