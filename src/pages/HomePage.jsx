import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import TalentDiscovery from '../components/TalentDiscovery'
import ClubRecruitment from '../components/ClubRecruitment'
import NetworkSection from '../components/NetworkSection'
import HowItWorks from '../components/HowItWorks'
import TrustSection from '../components/TrustSection'
import CommunitySection from '../components/CommunitySection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <TalentDiscovery />
        <ClubRecruitment />
        <HowItWorks />
        <NetworkSection />
        <TrustSection />
        <CommunitySection />
      </main>
      <Footer />
    </>
  )
}
