import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import havaianasLogo from "../assets/839f5d51d3fef4f21865417e5f1f7178bfa8c956.png";
import vivoLogo from "../assets/2c907788f01d024f109cdf398151314319ad63d2.png";
import tvGloboLogo from "../assets/b8c412c6c628a5d9b2e02ef03a37ce029612657c.png";
import governoBahiaLogo from "../assets/275f5225636390c0e04809eb68489176488e6658.png";
import oiLogo from "../assets/9533105f705b6e06ea46800d0f03d177d8c0619a.png";
import glightLogo from "../assets/64064f519650048e7be2d300efe96a4692c3ac74.png";
import boulevardLogo from "../assets/258eb5c52814d6e7514e4facb8ef7e64fe3bc56a.png";
import arezzoLogo from "../assets/9fccedf26128bc5566621ac62040e9b885422804.png";
import iberostarLogo from "../assets/78d169d1528d31ed71b62ecd5bd1bfc3113888c1.png";
import laMarquezzoLogo from "../assets/153b52ff6119fb1c15db0165cceb3a0f3d8ba9cd.png";

export default function MarketSlider() {
  const markets = [
    { name: "Havaianas", logo: havaianasLogo },
    { name: "Vivo", logo: vivoLogo },
    { name: "TV Globo", logo: tvGloboLogo },
    { name: "Governo da Bahia", logo: governoBahiaLogo },
    { name: "Oi", logo: oiLogo },
    { name: "G-light", logo: glightLogo },
    { name: "Boulevard Shopping", logo: boulevardLogo },
    { name: "Arezzo", logo: arezzoLogo },
    { name: "Iberostar", logo: iberostarLogo },
    { name: "La Marquezzo", logo: laMarquezzoLogo },
  ];

  const [plugin] = useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-black text-[24px]">
            Empresas que já anunciaram/anunciam conosco
          </h1>
        </div>

        <div className="mt-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent>
              {markets.map((market, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5"
                >
                  <div className="p-2">
                    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden h-32 flex items-center justify-center hover:border-orange-500 transition-colors duration-300">
                      <ImageWithFallback
                        src={market.logo}
                        alt={market.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}