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

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        })
      }
    }
  }, [location.pathname, location.hash])

  return (
    <>
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
