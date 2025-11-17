export default function ProcessSteps() {
  const steps = [
    {
      number: '01',
      title: 'Contrate',
      description: 'Garanta sua presença nos melhores eixos.',
      icon: '🤝'
    },
    {
      number: '02',
      title: 'Envie sua Arte',
      description: 'A instalação e renovação das lonas está inclusa.',
      icon: '🎨'
    },
    {
      number: '03',
      title: 'Renove o Impacto',
      description: 'Alternamos seus criativos (até 3 por ano) e fazemos o rodízio de posicionamento para manter o impacto máximo.',
      icon: '🔄'
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="mb-6 text-white">
            Um sistema completo, sem preocupação.
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Nossos planos anuais são desenhados para garantir sua presença constante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black border-2 border-gray-800/40 rounded-2xl p-8 h-full hover:border-orange-500 transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{step.icon}</span>
                  <span className="text-6xl text-orange-500/20">{step.number}</span>
                </div>
                <h3 className="mb-3 text-white text-2xl">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-8 text-center border-2 border-orange-800">
          <p className="text-white text-lg">
            ✨ <strong>Planos anuais com rodízio estratégico</strong> para maximizar o retorno do seu investimento
          </p>
        </div>
      </div>
    </section>
  );
}
