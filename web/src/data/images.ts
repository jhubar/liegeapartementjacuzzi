import { imgUrl } from '../lib/paths'
import { bedrooms } from './bedrooms'

/** Central image map — swap files here without touching components. */
export const images = {
  hero: imgUrl('living cuisine', '20260511_155926.jpg'),
  livingKitchen: imgUrl('living cuisine', '20260511_152000.jpg'),
  /** PNG — copie de `ChatGPT Image…png` sous nom simple pour URL fiables */
  terrace: imgUrl('Terrasse', 'terrasse-hero.png'),
  bedrooms: {
    jaune: bedrooms[0].photos[0].src,
    verte: bedrooms[1].photos[0].src,
    rose: bedrooms[2].photos[0].src,
  },
  gallery: [
    { src: imgUrl('living cuisine', '20260511_115150.jpg'), alt: 'Salon et cuisine ouverte' },
    { src: imgUrl('living cuisine', '20260511_123803.jpg'), alt: 'Espace de vie lumineux' },
    { src: imgUrl('Chambre jaune', '20260511_115223.jpg'), alt: 'Chambre jaune' },
    { src: imgUrl('Chambre jaune', '20260511_115327.jpg'), alt: 'Chambre jaune, détail' },
    { src: imgUrl('Chambre verte', '20260511_122411.jpg'), alt: 'Chambre verte' },
    { src: imgUrl('Chambre verte', '20260511_122456.jpg'), alt: 'Chambre verte, ambiance' },
    { src: imgUrl('Chambre rose', '20260511_115823.jpg'), alt: 'Chambre rose' },
    { src: imgUrl('Chambre rose', '20260511_152321.jpg'), alt: 'Chambre rose, confort' },
    { src: imgUrl('Terrasse', '20260511_160711.jpg'), alt: 'Terrasse' },
    { src: imgUrl('Terrasse', '20260511_160741.jpg'), alt: 'Espace extérieur' },
    { src: imgUrl('living cuisine', '20260511_160019.jpg'), alt: 'Coin cuisine équipé' },
    { src: imgUrl('Terrasse', '20260511_160744.jpg'), alt: 'Terrasse, vue dégagée' },
  ],
} as const
