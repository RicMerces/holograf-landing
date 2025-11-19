import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from './ui/carousel';
import coberturaImage from '../assets/imagens/coberturatotalcommenosplacas.png';
import dirigeImage from '../assets/imagens/quemdirigeolhaprafrente.png';
import designImage from '../assets/imagens/designarrojado.png';
import destaqueImage from '../assets/imagens/destaqueabsolutoanoite.png';
import rodizioImage from '../assets/imagens/rodizio.png';

export default function SystemCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const pillars = [
    {
      number: '1',
      title: 'Cobertura total com menos placas.',
      description: 'Estamos nos principais corredores viários de Feira. Quem circula, vê.',
      image: coberturaImage
    },
    {
      number: '2',
      title: 'Quem dirige olha para frente.',
      description: 'Todos os painéis em canteiros centrais, sempre de frente. Sem ângulo morto.',
      image: dirigeImage
    },
    {
      number: '3',
      title: 'Design arrojado de Painel',
      description: 'Estrutura metálica moderna que valoriza sua marca e chama atenção na paisagem.',
      image: designImage
    },
    {
      number: '4',
      title: 'Destaque Absoluto durante a noite',
      description: 'Iluminação forte, estável e contínua. Sua marca em evidência dia e noite.',
      image: destaqueImage
    },
    {
      number: '5',
      title: 'Rodízio de lonas a cada 90 dias.',
      description: 'Alto índice de repetição. Presença constante que grava sua marca na memória.',
      image: rodizioImage
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
    <section id="system-carousel" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="mb-6 text-white text-3xl md:text-4xl font-bold">
            VISIBILIDADE ESTRATÉGICA HOLOGRAF
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Você não precisa de mais mídia. Você precisa de presença de marca. Nosso sistema entrega impacto hoje e lembrança amanhã.
          </p>
        </div>

        <div className="relative px-4 md:px-12">
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
                <CarouselItem key={index} className="md:basis-full">
                  <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black border border-gray-800/50 rounded-2xl overflow-hidden min-h-[600px] md:min-h-[700px] flex flex-col backdrop-blur-sm">
                    {/* Imagem de fundo - maior e mais visível */}
                    <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
                      {/* Número grande no topo */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-9xl md:text-[12rem] font-bold text-white/5 leading-none">{pillar.number}</span>
                      </div>
                    </div>
                    
                    {/* Conteúdo de texto */}
                    <div className="p-6 md:p-10 flex-grow flex flex-col justify-center bg-black/40">
                      {/* Linha laranja divisória */}
                      <div className="w-full h-0.5 bg-orange-500 mb-6"></div>
                      
                      {/* Título e descrição */}
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="mb-4 text-white text-2xl md:text-3xl font-bold leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
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
