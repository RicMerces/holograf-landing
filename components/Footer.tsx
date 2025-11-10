import holografLogo from '../assets/4881e0ab60b4372f8b318883b1eb1059789049be.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src={holografLogo} 
              alt="Holograf Logo" 
              className="h-16 mb-4 object-contain"
            />
            <p className="text-gray-400 text-lg">
              O sistema de visibilidade urbana mais eficiente de Feira de Santana.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-gray-400 mb-2">Entre em contato:</p>
            <p className="text-white mb-1">
              <a href="mailto:cayque@holograf.com.br" className="hover:text-orange-500 transition-colors">
                cayque@holograf.com.br
              </a>
            </p>
            <p className="text-white">
              <a href="tel:+5575981917007" className="hover:text-orange-500 transition-colors">
                75 98191.7007
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Holograf. Transformando presença em preferência.
          </p>
        </div>
      </div>
    </footer>
  );
}
