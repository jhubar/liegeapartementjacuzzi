import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeroSection } from '../components/HeroSection'
import { ApartmentOverview } from '../components/ApartmentOverview'
import { BedroomsSection } from '../components/BedroomsSection'
import { LivingKitchenSection } from '../components/LivingKitchenSection'
import { TerraceSection } from '../components/TerraceSection'
import { PricingSection } from '../components/PricingSection'
import { AvailabilityCalendar } from '../components/AvailabilityCalendar'
import { LocationSection } from '../components/LocationSection'
import { GalleryGrid } from '../components/GalleryGrid'
import { BookingSection } from '../components/BookingSection'
import { SeoHead } from '../components/SeoHead'
import { DEFAULT_DESCRIPTION, getSiteName } from '../config/site'
import { buildVacationRentalSchema } from '../lib/schema'
import { scrollToSectionWhenReady } from '../lib/scroll-to-section'

export function HomePage() {
  const location = useLocation()
  const siteName = getSiteName()

  useEffect(() => {
    if (location.hash) {
      scrollToSectionWhenReady(location.hash)
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <SeoHead
        title={`${siteName} | Médiacité, Liège`}
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={buildVacationRentalSchema()}
      />
      <HeroSection />
      <ApartmentOverview />
      <BedroomsSection />
      <LivingKitchenSection />
      <TerraceSection />
      <PricingSection />
      <AvailabilityCalendar />
      <LocationSection />
      <GalleryGrid />
      <BookingSection />
    </>
  )
}
