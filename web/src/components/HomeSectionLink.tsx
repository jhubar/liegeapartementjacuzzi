import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { ComponentProps } from 'react'
import { homeSectionTo } from '../lib/paths'
import { scrollToSectionWhenReady } from '../lib/scroll-to-section'

type HomeSectionLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  hash: string
}

/** Lien vers une section de l’accueil — scroll fiable même déjà sur `/`. */
export function HomeSectionLink({ hash, onClick, ...props }: HomeSectionLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const normalized = hash.startsWith('#') ? hash : `#${hash}`
  const onHome = location.pathname === '/'

  return (
    <Link
      to={homeSectionTo(normalized)}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return

        if (onHome) {
          e.preventDefault()
          if (location.hash !== normalized) {
            navigate(homeSectionTo(normalized))
          }
          scrollToSectionWhenReady(normalized)
        }
      }}
      {...props}
    />
  )
}
