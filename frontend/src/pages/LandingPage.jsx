import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import PopularSkills from '../components/PopularSkills'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <PopularSkills />
            <CTASection />
            <Footer />
        </div>
    )
}

export default LandingPage