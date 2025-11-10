import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogContentFullscreen } from './ui/dialog';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Fix para os ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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

interface FullscreenMapProps {
  postes: Poste[];
  isOpen: boolean;
  onClose: () => void;
}

// Componente para ajustar o mapa quando abrir
function MapBounds({ postes }: { postes: Poste[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (postes.length > 0) {
      const bounds = L.latLngBounds(
        postes.map(poste => [poste.lat, poste.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, postes]);

  return null;
}

export default function FullscreenMap({ postes, isOpen, onClose }: FullscreenMapProps) {
  const [selectedPoste, setSelectedPoste] = useState<Poste | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Coordenadas de Feira de Santana (centro da cidade)
  const FEIRA_DE_SANTANA_CENTER: [number, number] = [-12.2564, -38.9566];

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentFullscreen>
        <div className="relative w-full h-full">
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[1000] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Fechar mapa"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>

          {/* Mapa */}
          <MapContainer
            center={FEIRA_DE_SANTANA_CENTER}
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            scrollWheelZoom={true}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBounds postes={postes} />
            {postes.map((poste) => (
              <Marker
                key={poste.id}
                position={[poste.lat, poste.lng]}
                eventHandlers={{
                  click: () => {
                    setSelectedPoste(poste);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">{poste.code}</p>
                    <p className="text-xs text-gray-600 mb-1">{poste.location}</p>
                    <p className="text-xs text-gray-500">{poste.neighborhood}</p>
                    <button
                      onClick={() => setSelectedPoste(poste)}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Modal com detalhes do poste */}
          {selectedPoste && (
            <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">{selectedPoste.code}</h3>
                  <button
                    onClick={() => setSelectedPoste(null)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Imagem do poste */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={selectedPoste.image}
                      alt={`Poste ${selectedPoste.code}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Informações */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Localização:</p>
                      <p className="text-gray-900">{selectedPoste.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Bairro:</p>
                      <p className="text-gray-900">{selectedPoste.neighborhood}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Referência:</p>
                      <p className="text-gray-900">{selectedPoste.reference}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Proximidade:</p>
                      <p className="text-gray-900">{selectedPoste.proximity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContentFullscreen>
    </Dialog>
  );
}

