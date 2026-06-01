import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { homeSectionTo } from '../lib/paths'

export type BreadcrumbItem = {
  label: string
  to?: { pathname: string; hash?: string }
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-brand-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-400" aria-hidden />
              )}
              {isLast ? (
                <span className="font-medium text-brand-ink" aria-current="page">
                  {item.label}
                </span>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="cursor-pointer transition-colors hover:text-brand-accent focus:outline-none focus-visible:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="cursor-pointer transition-colors hover:text-brand-accent focus:outline-none focus-visible:underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function bedroomBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    { label: 'Accueil', to: homeSectionTo('#accueil') },
    { label: 'Chambres', to: homeSectionTo('#chambres') },
    { label: title, to: { pathname: `/chambres/${slug}` } },
  ]
}
