import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ApartmentOverview } from './components/ApartmentOverview'
import { BedroomsSection } from './components/BedroomsSection'
import { LivingKitchenSection } from './components/LivingKitchenSection'
import { TerraceSection } from './components/TerraceSection'
import { PricingSection } from './components/PricingSection'
import { AvailabilityCalendar } from './components/AvailabilityCalendar'
import { LocationSection } from './components/LocationSection'
import { GalleryGrid } from './components/GalleryGrid'
import { BookingSection } from './components/BookingSection'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-ink focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  )
}
