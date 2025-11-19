import backgroundImage from '../assets/01951521cd2d817d631da7c117af8613d6a4c486.png';
import billboardImage from '../assets/ca802bf343a32dc2275edd39d379cda046a3a5d0.png';

export default function Hero() {
  const scrollToSystem = () => {
    const systemSection = document.getElementById('system-carousel');
    systemSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white px-4 overflow-hidden bg-black">
      {/* Background Gradient Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Billboard Image */}
          <div className="flex justify-center lg:justify-start">
            <img 
              src={billboardImage} 
              alt="Painel Holograf" 
              className="w-full max-w-5xl drop-shadow-2xl"
            />
          </div>

          {/* Right Side - Text Content */}
          <div >
            <h1 className="mb-6 text-white text-3xl md:text-4xl font-bold">
              SISTEMA DE VISIBILIDADE URBANA
            </h1>
            <p className="mb-12 text-gray-100 max-w-2xl md:text-xl leading-relaxed font-[Sora] text-[24px] font-bold drop-shadow-lg lg:ml-auto text-left">
              MAIS IMPACTO, MAIS ALCANÇE, MAIS RETORNO.
            </p>
            <button
              onClick={scrollToSystem}
              className="bg-black hover:bg-gray-900 text-white px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold border border-gray-800 text-left"
            >
              Conheça o Sistema Holograf
            </button>
          </div>

        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
