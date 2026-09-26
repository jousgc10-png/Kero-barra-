import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import Services from './components/Services/Services.jsx'
import Experience from './components/Experience/Experience.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import VideoExperience from './components/VideoExperience/VideoExperience.jsx'
import Cocktails from './components/Cocktails/Cocktails.jsx'
import Packages from './components/Packages/Packages.jsx'
import CTA from './components/CTA/CTA.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experience />
        <Gallery />
        <VideoExperience />
        <Cocktails />
        <Packages />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
