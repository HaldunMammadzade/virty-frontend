import HeroSection from '@/components/HeroSection'
import LogoSection from '@/components/LogoSection'
import FeaturesSection from '@/components/FeaturesSection'
import MediumHeadingSection from '@/components/MediumHeadingSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <LogoSection />
      <FeaturesSection />
      <MediumHeadingSection />
      <ContactSection />
    </main>
  )
}
