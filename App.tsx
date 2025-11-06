import Hero from "./components/Hero";
import MarketSlider from "./components/MarketSlider";
import SystemCarousel from "./components/SystemCarousel";
import MapSection from "./components/MapSection";
import Contact from "./components/Contact";
import ProcessSteps from "./components/ProcessSteps";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MarketSlider />
      <SystemCarousel />
      <MapSection />
      <Contact />
      <ProcessSteps />
      <Footer />
    </div>
  );
}