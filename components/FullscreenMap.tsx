import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogContentFullscreen } from './ui/dialog';
import { X, Search, Home, MapPin, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
        ">FL</div>
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

// Componente para ajustar o mapa quando abrir ou quando um painel for selecionado
function MapBounds({ postes, selectedPoste }: { postes: Poste[]; selectedPoste: Poste | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPoste) {
      // Se um painel específico foi selecionado, focar nele
      map.setView([selectedPoste.lat, selectedPoste.lng], 16, {
        animate: true,
        duration: 0.5
      });
    } else if (postes.length > 0) {
      // Caso contrário, mostrar todos os painéis
      const bounds = L.latLngBounds(
        postes.map(poste => [poste.lat, poste.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, postes, selectedPoste]);

  return null;
}

export default function FullscreenMap({ postes, isOpen, onClose }: FullscreenMapProps) {
  const [selectedPoste, setSelectedPoste] = useState<Poste | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [highlightedPoste, setHighlightedPoste] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtrar postes baseado na busca
  const filteredPostes = useMemo(() => {
    if (!searchTerm) return postes;
    return postes.filter(poste =>
      poste.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [postes, searchTerm]);

  // Função para navegar até um painel no mapa
  const navigateToPoste = (poste: Poste) => {
    setSelectedPoste(poste);
    setHighlightedPoste(poste.id);
    // O mapa será ajustado pelo componente MapBounds quando o selectedPoste mudar
    setTimeout(() => setHighlightedPoste(null), 2000);
  };

  // Coordenadas de Feira de Santana (centro da cidade)
  const FEIRA_DE_SANTANA_CENTER: [number, number] = [-12.2564, -38.9566];

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentFullscreen>
        <div className="relative w-full h-full flex flex-col bg-white">
          {/* Header com searchbar e botões */}
          <div className="sticky top-0 z-[1000] bg-white border-b border-gray-200 shadow-sm p-4 flex items-center gap-4">
            {/* Botão Home */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
              aria-label="Voltar para home"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>

            {/* Searchbar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar painéis por código, localização, bairro..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botão toggle sidebar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
              aria-label="Toggle menu lateral"
            >
              <span className="hidden sm:inline">{isSidebarOpen ? 'Ocultar' : 'Mostrar'} Lista</span>
              <ChevronRight className={`w-5 h-5 sm:hidden ${isSidebarOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors text-gray-700"
              aria-label="Fechar mapa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Container principal: Sidebar + Mapa */}
          <div className="flex-1 flex overflow-hidden">
            {/* Menu Lateral */}
            <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 flex flex-col`}>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Painéis Frontlight</h3>
                <p className="text-sm text-gray-500 mt-1">{filteredPostes.length} painéis encontrados</p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredPostes.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>Nenhum painel encontrado</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredPostes.map((poste) => (
                      <button
                        key={poste.id}
                        onClick={() => navigateToPoste(poste)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedPoste?.id === poste.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                        } ${highlightedPoste === poste.id ? 'bg-orange-100' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 mb-1">{poste.code}</p>
                            <p className="text-xs text-gray-600 mb-1 truncate">{poste.location}</p>
                            <p className="text-xs text-gray-500">{poste.neighborhood}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mapa */}
            <div className="flex-1 relative">
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
                <MapBounds postes={filteredPostes} selectedPoste={selectedPoste} />
                {filteredPostes.map((poste) => (
                  <Marker
                    key={poste.id}
                    position={[poste.lat, poste.lng]}
                    icon={createFrontlightIcon(poste.code)}
                    eventHandlers={{
                      click: () => {
                        setSelectedPoste(poste);
                      },
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-3 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <p className="font-bold text-sm text-gray-900">{poste.code}</p>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Frontlight</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{poste.location}</p>
                        <p className="text-xs text-gray-500 mb-2">{poste.neighborhood}</p>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">
                            <strong>Tipo:</strong> Painel Frontlight
                          </p>
                          <button
                            onClick={() => setSelectedPoste(poste)}
                            className="text-xs text-orange-600 hover:text-orange-800 underline font-semibold"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

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

