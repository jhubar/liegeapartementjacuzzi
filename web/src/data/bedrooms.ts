import { imgUrl } from '../lib/paths'

export type BedroomPhoto = {
  src: string
  alt: string
}

export type Bedroom = {
  slug: string
  title: string
  folder: string
  description: string
  photos: BedroomPhoto[]
}

function bedroomPhotos(folder: string, title: string, files: string[]): BedroomPhoto[] {
  return files.map((file, i) => ({
    src: imgUrl(folder, file),
    alt: i === 0 ? title : `${title}, vue ${i + 1}`,
  }))
}

export const bedrooms: Bedroom[] = [
  {
    slug: 'jaune',
    title: 'Chambre jaune',
    folder: 'Chambre jaune',
    description:
      'Lumière dorée et ambiance enveloppante — une retraite douillette pour des nuits paisibles.',
    photos: bedroomPhotos('Chambre jaune', 'Chambre jaune', [
      '20260511_152051.jpg',
      '20260511_115223.jpg',
      '20260511_115327.jpg',
      '20260511_115318.jpg',
      '20260511_115231.jpg',
      '20260511_115252.jpg',
    ]),
  },
  {
    slug: 'verte',
    title: 'Chambre verte',
    folder: 'Chambre verte',
    description:
      'Une touche naturelle et apaisante, idéale pour se déconnecter tout en restant en ville.',
    photos: bedroomPhotos('Chambre verte', 'Chambre verte', [
      '20260511_122456.jpg',
      '20260511_122411.jpg',
      '20260511_122403.jpg',
      '20260511_122426.jpg',
      '20260511_122501.jpg',
      '20260511_122505.jpg',
      '20260511_120326.jpg',
      '20260511_120352.jpg',
      '20260511_152126.jpg',
    ]),
  },
  {
    slug: 'rose',
    title: 'Chambre rose',
    folder: 'Chambre rose',
    description:
      'Une chambre lumineuse au caractère doux — parfaite pour prolonger la convivialité de votre séjour.',
    photos: bedroomPhotos('Chambre rose', 'Chambre rose', [
      '20260511_152225.jpg',
      '20260511_115823.jpg',
      '20260511_152321.jpg',
      '20260511_115521.jpg',
      '20260511_115541.jpg',
      '20260511_115635.jpg',
      '20260511_115832.jpg',
    ]),
  },
]

export function getBedroomBySlug(slug: string | undefined): Bedroom | undefined {
  return bedrooms.find((b) => b.slug === slug)
}
