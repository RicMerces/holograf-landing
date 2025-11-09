import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarketSlider from "./components/MarketSlider";
import PostsSection from "./components/PostsSection";
import MapSection from "./components/MapSection";
import Contact from "./components/Contact";
import ProcessSteps from "./components/ProcessSteps";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="market-slider">
        <MarketSlider />
      </section>
      <section id="posts-section">
        <PostsSection />
      </section>
      <section id="map-section">
        <MapSection />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="process-steps">
        <ProcessSteps />
      </section>
      <Footer />
    </div>
  );
}