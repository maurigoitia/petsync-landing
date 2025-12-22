import React from 'react';
import { Database, Clock, ShieldCheck, Share2 } from 'lucide-react';

export const ProductModules: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-xs md:text-sm font-bold text-[#2D5F5D] tracking-wider uppercase mb-3">
            Módulo Veterinario
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6">
            Gestión clínica sin fricción.
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Una suite completa diseñada para optimizar el tiempo de consulta y automatizar la comunicación con los tutores.
          </p>
        </div>

        {/* 
           GRID UPDATE: 
           - grid-cols-2 on mobile (instead of 1) 
           - Smaller gap on mobile (gap-3) 
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          
          {/* Feature 1 */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-200 hover:border-[#2D5F5D]/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-teal-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-300">
              <Database className="w-5 h-5 md:w-7 md:h-7 text-[#2D5F5D]" />
            </div>
            <h4 className="text-sm md:text-xl font-bold text-gray-900 mb-1.5 md:mb-3 leading-tight">Historia Clínica</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed opacity-90">
              Registra vacunas, peso y diagnósticos. Sincronizado en la nube al instante.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-300">
              <Clock className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
            </div>
            <h4 className="text-sm md:text-xl font-bold text-gray-900 mb-1.5 md:mb-3 leading-tight">Agenda Smart</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed opacity-90">
              Gestión de turnos con recordatorios automáticos para reducir ausentismo.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-200 hover:border-purple-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-purple-600" />
            </div>
            <h4 className="text-sm md:text-xl font-bold text-gray-900 mb-1.5 md:mb-3 leading-tight">Seguridad</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed opacity-90">
              Backups automáticos y encriptación. La data de pacientes siempre segura.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-200 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-orange-50 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-300">
              <Share2 className="w-5 h-5 md:w-7 md:h-7 text-orange-600" />
            </div>
            <h4 className="text-sm md:text-xl font-bold text-gray-900 mb-1.5 md:mb-3 leading-tight">Conexión</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed opacity-90">
              Envía recetas y estudios a la App del tutor con un solo clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};