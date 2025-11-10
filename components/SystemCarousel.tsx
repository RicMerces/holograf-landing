import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from './ui/carousel';

export default function SystemCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const pillars = [
    {
      title: 'Cobertura Total',
      description: 'Menos placas, mais alcance. Estamos nos principais corredores viários.',
      icon: '🗺️'
    },
    {
      title: 'Quem dirige, olha para frente',
      description: 'Painéis 100% frontais em canteiros centrais. Sem ângulo morto.',
      icon: '👁️'
    },
    {
      title: 'Design Arrojado',
      description: 'Estrutura metálica moderna que valoriza sua marca e chama atenção.',
      icon: '✨'
    },
    {
      title: 'Destaque Absoluto à Noite',
      description: 'Iluminação de alta performance. Sua marca em evidência dia e noite.',
      icon: '💡'
    },
    {
      title: 'Rodízio de 90 Dias',
      description: 'Evita a "cegueira publicitária". Presença constante que grava sua marca na memória.',
      icon: '🔄'
    }
  ];

  const [plugin] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="system-carousel" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-white">
            Visibilidade Estratégica Holograf
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Você não precisa de mais mídia. Você precisa de presença de marca. Nosso sistema entrega impacto hoje e lembrança amanhã.
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {pillars.map((pillar, index) => (
                <CarouselItem key={index}>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">{pillar.icon}</div>
                    <h3 className="mb-4 text-white text-2xl">{pillar.title}</h3>
                    <p className="text-gray-300 text-lg max-w-xl">
                      {pillar.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 left-0" />
            <CarouselNext className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 right-0" />
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {pillars.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-orange-600 scale-125' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
