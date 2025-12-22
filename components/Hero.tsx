import React from 'react';
import { CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-[#fdfdfd]">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] opacity-60 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl relative z-10 text-center lg:text-left mx-auto lg:mx-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#2D5F5D] text-xs font-bold uppercase tracking-wide mb-6 mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#2D5F5D] animate-pulse"></span>
              Disponible pronto en iOS y Android
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Tu Mascota.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5F5D] to-teal-500">
                Todo Sincronizado.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Olvídate de perder la libreta de vacunas. <strong>PetSync</strong> conecta la historia clínica de tu veterinario directamente con tu celular.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start"
            >
              <Button 
                onClick={() => document.getElementById('cta-footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#2D5F5D] hover:bg-[#234948] text-white shadow-xl shadow-teal-900/20 h-12 px-8 text-lg w-full sm:w-auto" 
                size="lg"
              >
                Unirse a la Lista
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-200 h-12 px-8 text-lg group w-full sm:w-auto" 
                size="lg" 
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
              >
                Cómo funciona <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 border-t border-slate-100 pt-6"
            >
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full"><CheckCircle className="h-3 w-3 text-green-600" /></div>
                Gratis para Tutores
              </div>
              <div className="flex items-center gap-2">
                 <div className="bg-blue-100 p-1 rounded-full"><Shield className="h-3 w-3 text-blue-600" /></div>
                Datos Encriptados
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
             {/* Decorative blob behind image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-transparent rounded-[3rem] transform rotate-6 opacity-40 scale-90"></div>
             
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative w-full"
             >
               <img 
                 src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80" 
                 alt="Perro y Gato felices" 
                 className="rounded-[2.5rem] shadow-2xl border-4 border-white w-full object-cover h-[400px] lg:h-[500px] z-10 relative"
               />
               
               {/* Floating Badge 1 */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -left-4 lg:-left-6 top-8 lg:top-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-20 max-w-[200px]"
               >
                  <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Recordatorio</p>
                    <p className="text-sm font-bold text-slate-900">Vacuna Mañana 💉</p>
                  </div>
               </motion.div>

               {/* Floating Badge 2 */}
               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -right-4 lg:-right-6 bottom-12 lg:bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-20"
               >
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Historial</p>
                    <p className="text-sm font-bold text-slate-900">100% Sincronizado</p>
                  </div>
               </motion.div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};