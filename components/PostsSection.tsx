import { useState } from 'react';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
import AllPostsScreen from './AllPostsScreen';
import FullscreenMap from './FullscreenMap';

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
  const [isFullscreenMapOpen, setIsFullscreenMapOpen] = useState(false);
  const [selectedPosteForMap, setSelectedPosteForMap] = useState<Poste | null>(null);
  const [selectedPosteInModal, setSelectedPosteInModal] = useState<Poste | null>(null);

  // Todos os postes com dados reais
  const allPostes: Poste[] = [
    {
      id: 1,
      code: 'P0123B',
      image: '/assets/MapPoints/image.png',
      lat: -12.247155,
      lng: -38.975762,
      location: 'Av. Contorno(2)',
      reference: 'Viaduto Getúlio Vargas, Noide Cerqueira',
      neighborhood: 'Sim',
      proximity: 'Viaduto Getúlio Vargas/Av. Nóide Cerqueira'
    },
    {
      id: 2,
      code: 'P0101A',
      image: '/assets/MapPoints/image copy.png',
      lat: -12.24883,
      lng: -38.94846,
      location: 'Av. João Durval Carneiro',
      reference: 'Posto João Durval',
      neighborhood: "Olhos D'agua",
      proximity: 'Posto Kalilândia (Shell), Av. JD Carneiro, 2830'
    },
    {
      id: 3,
      code: 'P0101B',
      image: '/assets/MapPoints/image copy 1.png',
      lat: -12.24883,
      lng: -38.94846,
      location: 'Av. João Durval Carneiro',
      reference: 'Posto João Durval',
      neighborhood: "Olhos D'agua",
      proximity: 'Posto Kalilândia (Shell), Av. JD Carneiro, 2830'
    },
    {
      id: 4,
      code: 'P0104A',
      image: '/assets/MapPoints/image copy 2.png',
      lat: -12.246473,
      lng: -38.932975,
      location: 'Rua Go V. Juracy Magalhães, 102',
      reference: 'Correios',
      neighborhood: 'Brasília',
      proximity: 'Approximate center of Juracy Magalhães street'
    },
    {
      id: 5,
      code: 'P0104B',
      image: '/assets/MapPoints/image copy 4.png',
      lat: -12.246473,
      lng: -38.932975,
      location: 'Rua Go V. Juracy Magalhães, 102',
      reference: 'Correios',
      neighborhood: 'Brasília',
      proximity: 'Approximate center of Juracy Magalhães street'
    },
    {
      id: 6,
      code: 'P0105A',
      image: '/assets/MapPoints/image copy 5.png',
      lat: -12.25306,
      lng: -38.95015,
      location: 'Av. João Durval Carneiro, esquina com a Rua P. Edelvira de Oliveira',
      reference: 'Justiça do Trabalho',
      neighborhood: 'Caseb',
      proximity: 'Fórum José Martins Catharino (Av. JD Carneiro, 2768)'
    },
    {
      id: 7,
      code: 'P0105B',
      image: '/assets/MapPoints/image copy 6.png',
      lat: -12.25306,
      lng: -38.95015,
      location: 'Av. João Durval Carneiro, esquina com a Rua P. Edelvira de Oliveira',
      reference: 'Justiça do Trabalho',
      neighborhood: 'Caseb',
      proximity: 'Fórum José Martins Catharino (Av. JD Carneiro, 2768)'
    },
    {
      id: 8,
      code: 'P0143A',
      image: '/assets/MapPoints/image copy 7.png',
      lat: -12.26127,
      lng: -38.97341,
      location: 'Av. José Falcão Silva',
      reference: 'Atakadão',
      neighborhood: 'Baraúna',
      proximity: 'Atakarejo, Av. José Falcão da Silva, 150'
    },
    {
      id: 9,
      code: 'P0143B',
      image: '/assets/MapPoints/image copy 8.png',
      lat: -12.26127,
      lng: -38.97341,
      location: 'Av. José Falcão Silva',
      reference: 'Atakadão',
      neighborhood: 'Baraúna',
      proximity: 'Atakarejo, Av. José Falcão da Silva, 150'
    },
    {
      id: 10,
      code: 'P0141A',
      image: '/assets/MapPoints/image copy 9.png',
      lat: -12.25700,
      lng: -38.96640,
      location: 'Av. José Falcão da Silva',
      reference: 'Maskate Distribuidora',
      neighborhood: 'Queimadinha',
      proximity: 'Based on Maskate area on Av. José Falcão da Silva'
    },
    {
      id: 11,
      code: 'P0141B',
      image: '/assets/MapPoints/image copy 10.png',
      lat: -12.25700,
      lng: -38.96640,
      location: 'Av. José Falcão da Silva',
      reference: 'Maskate Distribuidora',
      neighborhood: 'Queimadinha',
      proximity: 'Based on Maskate area on Av. José Falcão da Silva'
    },
    {
      id: 12,
      code: 'P0112A',
      image: '/assets/MapPoints/image copy 11.png',
      lat: -12.26354,
      lng: -38.97864,
      location: 'Av. José Falcão Silva, esquina com a Av. Contorno',
      reference: 'Contorno',
      neighborhood: 'Baraúna',
      proximity: 'Intersection of Av. José Falcão and Av. Contorno'
    },
    {
      id: 13,
      code: 'P0112B',
      image: '/assets/MapPoints/image copy 12.png',
      lat: -12.26354,
      lng: -38.97864,
      location: 'Av. José Falcão Silva, esquina com a Av. Contorno',
      reference: 'Contorno',
      neighborhood: 'Baraúna',
      proximity: 'Intersection of Av. José Falcão and Av. Contorno'
    },
    {
      id: 14,
      code: 'P0137A',
      image: '/assets/MapPoints/image copy 13.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 15,
      code: 'P0137B',
      image: '/assets/MapPoints/image copy 14.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 16,
      code: 'P0146A',
      image: '/assets/MapPoints/image copy 16.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 17,
      code: 'P0146B',
      image: '/assets/MapPoints/image copy 17.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 18,
      code: 'P0145A',
      image: '/assets/MapPoints/image copy 18.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 19,
      code: 'P0145B',
      image: '/assets/MapPoints/image copy 19.png',
      lat: -12.25890,
      lng: -38.95550,
      location: 'Av. Getúlio Vargas',
      reference: 'Estação Central',
      neighborhood: 'Comércio',
      proximity: 'Central part of Av. Getúlio Vargas, near the old Estação/Terminal'
    },
    {
      id: 20,
      code: 'P0119A',
      image: '/assets/MapPoints/image copy 20.png',
      lat: -12.25368,
      lng: -38.96251,
      location: 'Av. Monsenhor Mário Pessoa',
      reference: 'Colégio Padre Ovídio',
      neighborhood: 'Centro',
      proximity: 'Near Colégio Padre Ovídio (Av. Senhor dos Passos, 3000)'
    },
    {
      id: 21,
      code: 'P0119B',
      image: '/assets/MapPoints/image copy 21.png',
      lat: -12.25368,
      lng: -38.96251,
      location: 'Av. Monsenhor Mário Pessoa',
      reference: 'Colégio Padre Ovídio',
      neighborhood: 'Centro',
      proximity: 'Near Colégio Padre Ovídio (Av. Senhor dos Passos, 3000)'
    },
    {
      id: 22,
      code: 'P0147A',
      image: '/assets/MapPoints/image copy 22.png',
      lat: -12.20815,
      lng: -38.96690,
      location: 'Av. P. Dutra com a Rod. Vasco Filho (LIGHT) Entrada da cidade',
      reference: 'G-LIGHT',
      neighborhood: 'Aviário',
      proximity: 'Intersection of BR-324 (Rod. Vasco Filho) and Av. Presidente Dutra (Area)'
    },
    {
      id: 23,
      code: 'P0129A',
      image: '/assets/MapPoints/image copy 23.png',
      lat: -12.24760,
      lng: -38.95870,
      location: 'Av. Contorno, em frente ao Posto Mônaco',
      reference: 'Posto Mônaco',
      neighborhood: 'São João',
      proximity: 'Near Posto Mônaco (R. Tupinambás, 4000)'
    },
    {
      id: 24,
      code: 'P0129B',
      image: '/assets/MapPoints/image copy 24.png',
      lat: -12.24760,
      lng: -38.95870,
      location: 'Av. Contorno, em frente ao Posto Mônaco',
      reference: 'Posto Mônaco',
      neighborhood: 'São João',
      proximity: 'Near Posto Mônaco (R. Tupinambás, 4000)'
    },
    {
      id: 25,
      code: 'P0152A',
      image: '/assets/MapPoints/image copy 25.png',
      lat: -12.25875,
      lng: -38.93980,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade',
      neighborhood: 'Brasília',
      proximity: 'Hospital Clériston Andrade, Av. Eduardo Fróes da Mota'
    },
    {
      id: 26,
      code: 'P0152B',
      image: '/assets/MapPoints/image copy 26.png',
      lat: -12.25875,
      lng: -38.93980,
      location: 'Av. Eduardo Fróes da Mota',
      reference: 'Hospital Clériston Andrade',
      neighborhood: 'Brasília',
      proximity: 'Hospital Clériston Andrade, Av. Eduardo Fróes da Mota'
    },
    {
      id: 27,
      code: 'P0150A',
      image: '/assets/MapPoints/image copy 27.png',
      lat: -12.22272,
      lng: -38.93888,
      location: 'Av. Eduardo Fróes da Mota,',
      reference: 'Complexo Viário Portal do Sertão',
      neighborhood: 'Santa Mônica',
      proximity: 'Near the Portal do Sertão Complex on Av. Eduardo Fróes da Mota'
    },
    {
      id: 28,
      code: 'P0150B',
      image: '/assets/MapPoints/image copy 28.png',
      lat: -12.22272,
      lng: -38.93888,
      location: 'Av. Eduardo Fróes da Mota,',
      reference: 'Complexo Viário Portal do Sertão',
      neighborhood: 'Santa Mônica',
      proximity: 'Near the Portal do Sertão Complex on Av. Eduardo Fróes da Mota'
    }
  ];

  const mainPostes = allPostes.slice(0, 6);

  return (
    <section id="posts-section" className="py-24 bg-black text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="mb-6 text-white text-3xl md:text-4xl font-bold">
            Veja nossos principais postes
          </h3>
        </div>

        {/* Grid com 6 postes principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainPostes.map((poste) => (
            <div
              key={poste.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-800/40 bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black backdrop-blur-sm"
              onMouseEnter={() => setHoveredPoste(poste.id)}
              onMouseLeave={() => setHoveredPoste(null)}
              onClick={() => {
                setSelectedPosteInModal(poste);
                setIsAllPostsOpen(true);
              }}
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
          onClick={() => {
            setSelectedPosteInModal(null);
            setIsAllPostsOpen(true);
          }}
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
        onClose={() => {
          setIsAllPostsOpen(false);
          setSelectedPosteInModal(null);
        }}
        onOpenMap={(poste) => {
          setSelectedPosteForMap(poste);
          setIsAllPostsOpen(false);
          setIsFullscreenMapOpen(true);
        }}
        initialPoste={selectedPosteInModal}
      />

      {/* Mapa Fullscreen */}
      <FullscreenMap
        postes={allPostes}
        isOpen={isFullscreenMapOpen}
        onClose={() => {
          setIsFullscreenMapOpen(false);
          setSelectedPosteForMap(null);
        }}
        initialPoste={selectedPosteForMap}
      />
    </section>
  );
}
