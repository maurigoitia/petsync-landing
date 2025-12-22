import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('cta-footer')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { name: 'Características', href: '#features' },
    { name: 'Herramientas IA', href: '#ai-tools' },
    { name: 'Testimonios', href: '#testimonials' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-[#2D5F5D] p-2 rounded-xl text-white shadow-lg shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <PawPrint size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#2D5F5D] transition-colors">
              PetSync
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-[#2D5F5D] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
               <a href="#" className="text-sm font-bold text-slate-900 hover:text-slate-600">Entrar</a>
               <Button 
                variant="primary" 
                size="sm" 
                onClick={scrollToWaitlist}
                className="bg-[#2D5F5D] hover:bg-[#234948] text-white border-none shadow-lg shadow-teal-900/20 transform hover:-translate-y-0.5 transition-all"
               >
                Lista de Espera
               </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 focus:outline-none p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 w-full h-screen p-6 flex flex-col space-y-6 shadow-xl animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-800 font-bold text-lg border-b border-slate-50 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col space-y-3">
             <Button className="w-full justify-center py-4 text-base" variant="outline" onClick={() => setIsMobileMenuOpen(false)}>
              Iniciar Sesión
            </Button>
            <Button className="w-full justify-center py-4 bg-[#2D5F5D] text-white text-base shadow-xl shadow-teal-900/20" onClick={scrollToWaitlist}>
              Unirse a Lista de Espera
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};