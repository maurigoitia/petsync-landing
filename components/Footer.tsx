import React from 'react';
import { PawPrint, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#2D5F5D] p-1.5 rounded-lg text-white">
                <PawPrint size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">PetSync</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Tus Mascotas. Sus Cosas en orden.
            </p>
          </div>
          
          <div className="flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-[#2D5F5D] transition-colors">Características</a>
            <a href="#" className="hover:text-[#2D5F5D] transition-colors">Precios</a>
            <a href="#" className="hover:text-[#2D5F5D] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#2D5F5D] transition-colors">Contacto</a>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} PetSync. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-600 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-slate-600 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-slate-600 transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};