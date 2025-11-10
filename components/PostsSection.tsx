import { useState } from 'react';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
import AllPostsScreen from './AllPostsScreen';

interface Poste {
  id: number;
  code: string;
  image: string;
  lat: number;
  lng: number;
  location: string;
  reference: string;
  neighborhood: string;
  proximity: string;
}

export default function PostsSection() {
  const [hoveredPoste, setHoveredPoste] = useState<number | null>(null);
  const [isAllPostsOpen, setIsAllPostsOpen] = useState(false);

  // Todos os postes com dados reais
  const allPostes: Poste[] = [
    {
      id: 1,
      code: 'Painel 1',
      image: '/assets/MapPoints/image.png',
      lat: -12.2562669,
      lng: -38.9321908,
      location: 'Av. Contorno (2)',
      reference: 'Viaduto Getúlio Vargas, Noide Cerqueira',
      neighborhood: 'Sim',
      proximity: 'Cruzamento da Av. Getúlio Vargas com a Av. Noide Cirqueira'
    },
    {
      id: 2,
      code: 'P0141A',
      image: '/assets/MapPoints/image1.png',
      lat: -12.2395308,
      lng: -38.9639961,
      location: 'Av. José Falcão da Silva',
      reference: 'Maskate Distribuidora',
      neighborhood: 'Queimadinha',
      proximity: 'Complexo Viário Dr. Miraldo Gomes'
    },
    {
      id: 3,
      code: 'P0141B',
      image: '/assets/MapPoints/image2.png',
      lat: -12.2395308,
      lng: -38.9639961,
      location: 'Av. José Falcão da Silva',
      reference: 'Maskate Distribuidora',
      neighborhood: 'Queimadinha',
      proximity: 'Complexo Viário Dr. Miraldo Gomes'
    },
    {
      id: 4,
      code: 'P0104A',
      image: '/assets/MapPoints/image3.png',
      lat: -12.259259,
      lng: -38.95207,
      location: 'Rua Go V. Juracy Magalhães, 102',
      reference: 'Correios',
      neighborhood: 'Brasilia',
      proximity: 'Túnel Dr. Carlos Alberto Kruschewsky'
    },
    {
      id: 5,
      code: 'P0104B',
      image: '/assets/MapPoints/image4.png',
      lat: -12.259259,
      lng: -38.95207,
      location: 'Rua Go V. Juracy Magalhães, 102',
      reference: 'Correios',
      neighborhood: 'Brasilia',
      proximity: 'Túnel Dr. Carlos Alberto Kruschewsky'
    },
    {
      id: 6,
      code: 'P0145A',
      image: '/assets/MapPoints/image5.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 7,
      code: 'P0145B',
      image: '/assets/MapPoints/image6.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 8,
      code: 'P0146A',
      image: '/assets/MapPoints/image7.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 9,
      code: 'P0146B',
      image: '/assets/MapPoints/image8.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 10,
      code: 'P0137A',
      image: '/assets/MapPoints/image9.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 11,
      code: 'P0137B',
      image: '/assets/MapPoints/image10.png',
      lat: -12.2545038,
      lng: -38.9722801,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central (Localizado como "Estação Centro")',
      neighborhood: 'Comércio',
      proximity: 'Terminal Rodoviário Urbano, centro comercial, Centro de abastecimento, SAC'
    },
    {
      id: 12,
      code: 'P0143A',
      image: '/assets/MapPoints/image11.png',
      lat: -12.241287,
      lng: -38.9640594,
      location: 'Av. José Falcão Silva',
      reference: 'Atakadão (Localizado como "Atakarejo - Feira de Santana")',
      neighborhood: 'Baraúna',
      proximity: 'Escolas, centro comercial'
    },
    {
      id: 13,
      code: 'P0143B',
      image: '/assets/MapPoints/image12.png',
      lat: -12.241287,
      lng: -38.9640594,
      location: 'Av. José Falcão Silva',
      reference: 'Atakadão (Localizado como "Atakarejo - Feira de Santana")',
      neighborhood: 'Baraúna',
      proximity: 'Escolas, centro comercial'
    },
    {
      id: 14,
      code: 'P0129A',
      image: '/assets/MapPoints/image13.png',
      lat: -12.233571,
      lng: -38.9485013,
      location: 'Av. Contorno, em frente ao Posto Mônaco',
      reference: 'Posto Mônaco (Localizado como "POSTO MONACO - Ipiranga")',
      neighborhood: 'São João',
      proximity: 'Shopping Boulevard, Anel de Contorno de Feira'
    },
    {
      id: 15,
      code: 'P0129B',
      image: '/assets/MapPoints/image14.png',
      lat: -12.233571,
      lng: -38.9485013,
      location: 'Av. Contorno, em frente ao Posto Mônaco',
      reference: 'Posto Mônaco (Localizado como "POSTO MONACO - Ipiranga")',
      neighborhood: 'São João',
      proximity: 'Shopping Boulevard, Anel de Contorno de Feira'
    },
    {
      id: 16,
      code: 'P0147A',
      image: '/assets/MapPoints/image15.png',
      lat: -12.2944132,
      lng: -38.9075144,
      location: 'Av. P. Dutra com a Rod. Vasco Filho (LIGHT) Entrada da cidade',
      reference: 'G-LIGHT (Localizado como "G-LIGHT / TRONORD")',
      neighborhood: 'Aviário',
      proximity: 'Entrada da cidade, UNEF, polo de concessionárias'
    },
    {
      id: 17,
      code: 'P0112A',
      image: '/assets/MapPoints/image16.png',
      lat: -12.241287,
      lng: -38.9640594,
      location: 'Av. José Falcão Silva, esquina com a Av. Contorno',
      reference: 'Contorno (Coordenada aproximada da esquina, usando "Atakarejo" como referência próxima)',
      neighborhood: 'Baraúna',
      proximity: 'Escolas, Centro Comercial, Feiraguay, Mercados, UEFS'
    },
    {
      id: 18,
      code: 'P0112B',
      image: '/assets/MapPoints/image17.png',
      lat: -12.241287,
      lng: -38.9640594,
      location: 'Av. José Falcão Silva, esquina com a Av. Contorno',
      reference: 'Contorno (Coordenada aproximada da esquina, usando "Atakarejo" como referência próxima)',
      neighborhood: 'Baraúna',
      proximity: 'Escolas, Centro Comercial, Feiraguay, Mercados, UEFS'
    },
    {
      id: 19,
      code: 'P0105A',
      image: '/assets/MapPoints/image18.png',
      lat: -12.2495242,
      lng: -38.9486596,
      location: 'Av. João Durval Carneiro, esquina com a Rua P. Edelvira de Oliveira',
      reference: 'Justiça do Trabalho (Localizado como "Tribunal Regional Do Trabalho")',
      neighborhood: 'Caseb',
      proximity: 'Shopping Boulevard'
    },
    {
      id: 20,
      code: 'P0105B',
      image: '/assets/MapPoints/image19.png',
      lat: -12.2495242,
      lng: -38.9486596,
      location: 'Av. João Durval Carneiro, esquina com a Rua P. Edelvira de Oliveira',
      reference: 'Justiça do Trabalho (Localizado como "Tribunal Regional Do Trabalho")',
      neighborhood: 'Caseb',
      proximity: 'Shopping Boulevard'
    },
    {
      id: 21,
      code: 'P0101A',
      image: '/assets/MapPoints/image20.png',
      lat: -12.276649,
      lng: -38.9566151,
      location: 'Av. João Durval Carneiro',
      reference: 'Posto João Durval',
      neighborhood: "Olhos D'agua",
      proximity: 'Igrejas, área residencial de grande fluxo, Laboratórios'
    },
    {
      id: 22,
      code: 'P0101B',
      image: '/assets/MapPoints/image21.png',
      lat: -12.276649,
      lng: -38.9566151,
      location: 'Av. João Durval Carneiro',
      reference: 'Posto João Durval',
      neighborhood: "Olhos D'agua",
      proximity: 'Igrejas, área residencial de grande fluxo, Laboratórios'
    },
    {
      id: 23,
      code: 'P0119A',
      image: '/assets/MapPoints/image22.png',
      lat: -12.2604384,
      lng: -38.9658068,
      location: 'Av. Monsenhor Mário Pessoa',
      reference: 'Colégio Padre Ovídio',
      neighborhood: 'Centro',
      proximity: 'Escola, Farmácia'
    },
    {
      id: 24,
      code: 'P0119B',
      image: '/assets/MapPoints/image23.png',
      lat: -12.2604384,
      lng: -38.9658068,
      location: 'Av. Monsenhor Mário Pessoa',
      reference: 'Colégio Padre Ovídio',
      neighborhood: 'Centro',
      proximity: 'Escola, Farmácia'
    },
    {
      id: 25,
      code: 'P0151A',
      image: '/assets/MapPoints/image24.png',
      lat: -12.2774821,
      lng: -38.9406161,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade (Localizado como "Hospital Geral Clériston Andrade")',
      neighborhood: 'Brasília',
      proximity: 'Hospital'
    },
    {
      id: 26,
      code: 'P0151B',
      image: '/assets/MapPoints/image25.png',
      lat: -12.2774821,
      lng: -38.9406161,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade (Localizado como "Hospital Geral Clériston Andrade")',
      neighborhood: 'Brasília',
      proximity: 'Hospital'
    },
    {
      id: 27,
      code: 'P0152A',
      image: '/assets/MapPoints/image26.png',
      lat: -12.2774821,
      lng: -38.9406161,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade (Localizado como "Hospital Geral Clériston Andrade")',
      neighborhood: 'Brasília',
      proximity: 'Hospital'
    },
    {
      id: 28,
      code: 'P0152B',
      image: '/assets/MapPoints/image27.png',
      lat: -12.2774821,
      lng: -38.9406161,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade (Localizado como "Hospital Geral Clériston Andrade")',
      neighborhood: 'Brasília',
      proximity: 'Hospital'
    },
    {
      id: 29,
      code: 'P0150A',
      image: '/assets/MapPoints/image28.png',
      lat: -12.2720315,
      lng: -38.935805,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Complexo Viário Portal do Sertão',
      neighborhood: 'Santa Mônica',
      proximity: 'Bremen VolksWagen, Concessionária Fiat'
    },
    {
      id: 30,
      code: 'P0150B',
      image: '/assets/MapPoints/image29.png',
      lat: -12.2720315,
      lng: -38.935805,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Complexo Viário Portal do Sertão',
      neighborhood: 'Santa Mônica',
      proximity: 'Bremen VolksWagen, Concessionária Fiat'
    }
  ];

  const mainPostes = allPostes.slice(0, 6);

  return (
    <section id="posts-section" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-white text-4xl font-bold">
            Veja nossos principais postes
          </h2>
        </div>

        {/* Grid com 6 postes principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainPostes.map((poste) => (
            <div
              key={poste.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm"
              onMouseEnter={() => setHoveredPoste(poste.id)}
              onMouseLeave={() => setHoveredPoste(null)}
            >
              {/* Imagem do poste */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={poste.image}
                  alt={`Poste ${poste.code}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback para imagem placeholder
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3E' + poste.code + '%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Overlay com informações no hover */}
              {hoveredPoste === poste.id && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 transition-all duration-300 z-10">
                  <MapPin className="w-8 h-8 text-orange-500 mb-3" />
                  <p className="text-white font-semibold text-lg mb-1">{poste.neighborhood}</p>
                  <p className="text-gray-300 text-sm text-center mb-2">{poste.location}</p>
                  <p className="text-gray-400 text-xs text-center">{poste.reference}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botão "Veja todos" */}
        <div className="text-center">
          <Button 
            onClick={() => setIsAllPostsOpen(true)}
            variant="outline" 
            className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600 px-8 py-6 text-lg font-semibold"
          >
            Veja todos os postes
          </Button>
        </div>
      </div>

      {/* Tela fullscreen com todos os postes */}
      <AllPostsScreen
        postes={allPostes}
        isOpen={isAllPostsOpen}
        onClose={() => setIsAllPostsOpen(false)}
      />
    </section>
  );
}
