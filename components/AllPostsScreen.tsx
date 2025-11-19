import { useEffect, useState } from 'react';
import { Dialog, DialogContentFullscreen } from './ui/dialog';
import { X, MapPin, Search, ExternalLink } from 'lucide-react';
import { Input } from './ui/input';
import MiniMap from './MiniMap';
import { Button } from './ui/button';

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

interface AllPostsScreenProps {
  postes: Poste[];
  isOpen: boolean;
  onClose: () => void;
  onOpenMap?: (poste: Poste) => void;
  initialPoste?: Poste | null;
}

export default function AllPostsScreen({ postes, isOpen, onClose, onOpenMap, initialPoste }: AllPostsScreenProps) {
  const [selectedPoste, setSelectedPoste] = useState<Poste | null>(initialPoste ?? null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');

  // Atualizar o poste selecionado quando o modal abrir a partir de outra seção
  useEffect(() => {
    if (isOpen && initialPoste) {
      setSelectedPoste(initialPoste);
    }

    if (!isOpen) {
      setSelectedPoste(null);
    }
  }, [initialPoste, isOpen]);

  // Filtrar postes
  const filteredPostes = postes.filter((poste) => {
    const matchesSearch = 
      poste.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poste.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNeighborhood = 
      selectedNeighborhood === 'all' || poste.neighborhood === selectedNeighborhood;
    
    return matchesSearch && matchesNeighborhood;
  });

  // Obter bairros únicos
  const neighborhoods = Array.from(new Set(postes.map(p => p.neighborhood))).sort();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentFullscreen>
        <div className="h-full flex flex-col bg-white">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Todos os Nossos Postes</h3>
                  <p className="text-gray-600 mt-1">
                    {filteredPostes.length} de {postes.length} postes
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por código, localização, bairro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Todos os bairros</option>
                  {neighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid de postes */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {filteredPostes.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">Nenhum poste encontrado com os filtros selecionados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPostes.map((poste) => (
                    <div
                      key={poste.id}
                      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedPoste(poste)}
                    >
                      {/* Imagem do poste */}
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={poste.image}
                          alt={`Poste ${poste.code}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%236b7280" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="18"%3E' + poste.code + '%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>

                      {/* Informações */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{poste.code}</h3>
                        <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{poste.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="font-semibold">Bairro:</span> {poste.neighborhood}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          <span className="font-semibold">Referência:</span> {poste.reference}
                        </p>
                      </div>

                      {/* Overlay no hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de detalhes do poste */}
        {selectedPoste && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">{selectedPoste.code}</h3>
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
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src={selectedPoste.image}
                    alt={`Poste ${selectedPoste.code}`}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext fill="%236b7280" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E' + selectedPoste.code + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Informações detalhadas */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Localização:</p>
                      <p className="text-gray-900">{selectedPoste.location}</p>
                    </div>
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

                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Coordenadas:</p>
                    <p className="text-gray-600 text-sm">
                      Lat: {selectedPoste.lat}, Lng: {selectedPoste.lng}
                    </p>
                  </div>

                  {/* Minimapa */}
                  <div className="pt-4 border-t mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Localização no mapa:</p>
                    <MiniMap 
                      lat={selectedPoste.lat} 
                      lng={selectedPoste.lng} 
                      code={selectedPoste.code}
                    />
                    {onOpenMap && (
                      <Button
                        onClick={() => {
                          onOpenMap(selectedPoste);
                          setSelectedPoste(null);
                        }}
                        className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver no mapa completo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContentFullscreen>
    </Dialog>
  );
}

