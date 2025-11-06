import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MapSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="mb-6 text-black">
            Esteja onde seu cliente está:<br />Próximo aos Principais Mercados
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Nossos painéis estão estrategicamente posicionados próximos dos principais mercados atacadistas e supermercados de Feira de Santana.
          </p>
        </div>

        <div className="mt-12 bg-gray-100 rounded-2xl p-8 shadow-lg">
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
              alt="Mapa estratégico de localização dos painéis em Feira de Santana"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-lg shadow-xl">
                <p className="text-gray-800 text-center">
                  📍 Posicionamento Estratégico em Feira de Santana
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">🛣️</div>
              <p className="text-gray-800">2º Maior Entroncamento Rodoviário</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">💰</div>
              <p className="text-gray-800">3º Maior PIB da Bahia</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <p className="text-gray-800">Eixo Estratégico do Nordeste</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
