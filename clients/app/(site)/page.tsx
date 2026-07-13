import dynamic from 'next/dynamic'
import { Hero } from '@/components/site/sections/hero'

// Below-the-fold sections are lazy loaded (code-split) for faster first paint.
const ServicesSection = dynamic(() =>
  import('@/components/site/sections/services-section').then(
    (m) => m.ServicesSection,
  ),
)
const AboutSection = dynamic(() =>
  import('@/components/site/sections/about-section').then((m) => m.AboutSection),
)
const WhyChooseSection = dynamic(() =>
  import('@/components/site/sections/why-choose-section').then(
    (m) => m.WhyChooseSection,
  ),
)
const IndustriesSection = dynamic(() =>
  import('@/components/site/sections/industries-section').then(
    (m) => m.IndustriesSection,
  ),
)
const FreePickupSection = dynamic(() =>
  import('@/components/site/sections/free-pickup-section').then(
    (m) => m.FreePickupSection,
  ),
)
const LocationSection = dynamic(() =>
  import('@/components/site/sections/location-section').then(
    (m) => m.LocationSection,
  ),
)
const CtaSection = dynamic(() =>
  import('@/components/site/sections/cta-section').then((m) => m.CtaSection),
)

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <WhyChooseSection />
      <IndustriesSection />
      <FreePickupSection />
      <LocationSection />
      <CtaSection />
    </>
  )
}
