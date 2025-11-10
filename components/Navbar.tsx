import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import holografLogo from '../assets/4881e0ab60b4372f8b318883b1eb1059789049be.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'posts-section', label: 'Destaque' },
    { id: 'map-section', label: 'Mapa' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-black shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="cursor-pointer flex items-center"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src={holografLogo} 
              alt="Holograf Logo" 
              className="h-8 object-contain"
            />
          </div>

          {/* Desktop Navigation - Links visíveis em telas médias e grandes */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-orange-500 transition-colors duration-300 font-medium text-base whitespace-nowrap px-2 py-1"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu - Hamburger apenas em telas pequenas */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black text-white">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg font-medium text-white hover:text-orange-500 transition-colors duration-300 py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

