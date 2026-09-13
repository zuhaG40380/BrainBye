import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorldSection from './components/WorldSection'
import FeatureSection from './components/FeatureSection'
import HowItWorks from './components/HowItWorks'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-void">
      <Navbar />
      <main>
        <Hero />
        <WorldSection />
        <FeatureSection />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
