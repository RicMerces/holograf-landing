import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { Maximize2 } from 'lucide-react';
import FullscreenMap from './FullscreenMap';

// Criar ícone customizado para painéis frontlight
const createFrontlightIcon = (code: string) => {
  return L.divIcon({
    className: 'custom-frontlight-marker',
    html: `
      <div style="
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
          text-align: center;
        ">${code.substring(0, 2)}</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Fix para os ícones padrão do Leaflet (caso necessário)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Coordenadas de Feira de Santana (centro da cidade)
const FEIRA_DE_SANTANA_CENTER: [number, number] = [-12.2564, -38.9566];

// Interface para os postes
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

// Coordenadas dos postes principais (para o mapa pequeno)
const postesLocations = [
  { lat: -12.2562669, lng: -38.9321908, code: 'Painel 1', location: 'Av. Contorno (2)' },
  { lat: -12.2395308, lng: -38.9639961, code: 'P0141A/B', location: 'Av. José Falcão da Silva' },
  { lat: -12.259259, lng: -38.95207, code: 'P0104A/B', location: 'Rua Go V. Juracy Magalhães' },
  { lat: -12.2545038, lng: -38.9722801, code: 'P0145A/B', location: 'Av. Getúlio Vargas' },
  { lat: -12.241287, lng: -38.9640594, code: 'P0143A/B', location: 'Av. José Falcão Silva' },
  { lat: -12.233571, lng: -38.9485013, code: 'P0129A/B', location: 'Av. Contorno' },
];

// Todos os postes (mesmos dados do PostsSection)
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

export default function MapSection() {
  const [isClient, setIsClient] = useState(false);
  const [isFullscreenMapOpen, setIsFullscreenMapOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
  return (
      <section id="map-section" className="py-24 bg-black scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
            <h3 className="mb-6 text-white text-3xl md:text-4xl font-bold">
            Esteja onde seu cliente está:<br />Próximo aos Principais Mercados
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Nossos painéis estão estrategicamente posicionados próximos dos principais mercados atacadistas e supermercados de Feira de Santana.
          </p>
          </div>
          <div className="mt-12 bg-gradient-to-br from-gray-900/90 via-gray-950/95 to-black border border-gray-800/40 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <p className="text-gray-300">Carregando mapa...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="map-section" className="py-24 bg-black scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="mb-6 text-white text-3xl md:text-4xl font-bold">
              Esteja onde seu cliente está:<br />Próximo aos Principais Mercados
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
              Estamos nas melhores avenidas. Nossos painéis Frontlight estão estrategicamente posicionados próximos dos principais mercados atacadistas e supermercados de Feira de Santana.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white"></div>
              <span>Painéis Frontlight</span>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-gray-900/90 via-gray-950/95 to-black border border-gray-800/40 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <div className="aspect-video rounded-xl overflow-hidden relative">
              <MapContainer
                center={FEIRA_DE_SANTANA_CENTER}
                zoom={13}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {postesLocations.map((poste, index) => (
                  <Marker
                    key={index}
                    position={[poste.lat, poste.lng]}
                    icon={createFrontlightIcon(poste.code)}
                  >
                    <Popup className="custom-popup">
                      <div className="p-3 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <p className="font-bold text-sm text-gray-900">{poste.code}</p>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Frontlight</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{poste.location}</p>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            <strong>Tipo:</strong> Painel Frontlight
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Botão Ver Mapa Completo */}
              <div className="absolute bottom-4 right-4 z-[1000]">
                <Button
                  onClick={() => setIsFullscreenMapOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg flex items-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  Ver Mapa Completo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black border border-gray-800/40 rounded-lg p-6 text-center shadow-md backdrop-blur-sm">
                <div className="text-3xl mb-3">🛣️</div>
                <p className="text-white">2º Maior Entroncamento Rodoviário</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black border border-gray-800/40 rounded-lg p-6 text-center shadow-md backdrop-blur-sm">
              <div className="text-3xl mb-3">💰</div>
                <p className="text-white">3º Maior PIB da Bahia</p>
            </div>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black border border-gray-800/40 rounded-lg p-6 text-center shadow-md backdrop-blur-sm">
              <div className="text-3xl mb-3">🎯</div>
                <p className="text-white">Eixo Estratégico do Nordeste</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Mapa Fullscreen */}
      <FullscreenMap
        postes={allPostes}
        isOpen={isFullscreenMapOpen}
        onClose={() => setIsFullscreenMapOpen(false)}
      />
    </>
  );
}
