import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio do formulário
    const message = `Olá! Gostaria de receber o mapa e proposta.\n\nNome: ${formData.name}\nEmpresa: ${formData.company}\nEmail: ${formData.email}\nTelefone: ${formData.phone}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5575981917007?text=${encodedMessage}`, '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5575981917007?text=Olá! Gostaria de falar com um consultor sobre o Sistema Holograf.', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-black text-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="mb-6 text-white">
            Vamos colocar sua marca na rua?
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Fale com um especialista agora mesmo para receber o mapa completo de localizações e uma proposta de plano anual.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black backdrop-blur-sm border border-gray-800/40 rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm mb-2 text-gray-300">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-gray-300">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                  placeholder="(75) 98191-7007"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📧 Receber Mapa e Proposta
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                💬 Falar via WhatsApp
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              <a href="mailto:cayque@holograf.com.br" className="text-orange-500 hover:text-orange-400 transition-colors">
                cayque@holograf.com.br
              </a>
              {' | '}
              <a href="tel:+5575981917007" className="text-orange-500 hover:text-orange-400 transition-colors">
                75 98191.7007
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
