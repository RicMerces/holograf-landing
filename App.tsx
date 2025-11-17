import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SystemCarousel from "./components/SystemCarousel";
import MapSection from "./components/MapSection";
import PostsSection from "./components/PostsSection";
import MarketSlider from "./components/MarketSlider";
import ProcessSteps from "./components/ProcessSteps";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="map-section">
        <MapSection />
      </section>
      <section id="system-carousel">
        <SystemCarousel />
      </section>
      <section id="posts-section">
        <PostsSection />
      </section>
      <section id="market-slider">
        <MarketSlider />
      </section>
      <section id="process-steps">
        <ProcessSteps />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}