import { useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type LightboxImage = {
  src: string
  alt: string
}

type ImageLightboxProps = {
  images: LightboxImage[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function ImageLightbox({ images, index, onIndexChange, onClose }: ImageLightboxProps) {
  const current = images[index]
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onIndexChange(index - 1)
  }, [hasPrev, index, onIndexChange])

  const goNext = useCallback(() => {
    if (hasNext) onIndexChange(index + 1)
  }, [hasNext, index, onIndexChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, goPrev, goNext])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/90 p-4 backdrop-blur-sm motion-reduce:backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie photo — ${current.alt}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Fermer la galerie"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>

      {hasPrev && (
        <button
          type="button"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="Photo précédente"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="Photo suivante"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      )}

      <figure
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-h-[85vh] w-full object-contain"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 to-transparent px-4 pb-4 pt-10 text-center text-sm text-white">
          {current.alt}
          <span className="mt-1 block text-xs text-stone-300">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
