import React, { useState, useEffect } from 'react';
import { HistoryScreen } from './mobile-screens/HistoryScreen';
import { AppointmentsScreen } from './mobile-screens/AppointmentsScreen';
import { RemindersScreen } from './mobile-screens/RemindersScreen';
import { Smartphone, Bell, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'history' | 'appointments' | 'reminders';

export const InteractivePreviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate tabs functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
        setActiveTab(current => {
            if (current === 'history') return 'appointments';
            if (current === 'appointments') return 'reminders';
            return 'history';
        });
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setIsAutoPlaying(false); // Stop auto-play if user interacts
  };

  const tabs = [
    { 
      id: 'history', 
      label: 'Historia Clínica', 
      desc: 'Acceso total al historial médico.',
      icon: FileText,
      color: 'bg-teal-50 text-[#2D5F5D] border-teal-200' 
    },
    { 
      id: 'appointments', 
      label: 'Turnos y Citas', 
      desc: 'Gestión de agenda simplificada.',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600 border-blue-200' 
    },
    { 
      id: 'reminders', 
      label: 'Recordatorios', 
      desc: 'Alertas de salud automáticas.',
      icon: Bell,
      color: 'bg-amber-50 text-amber-600 border-amber-200' 
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             {/* Left Column: Text & Controls */}
             <div className="order-2 lg:order-1">
                <div className="mb-10">
                   <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">
                      App para Tutores
                   </h2>
                   <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                      El control total en la palma de su mano.
                   </h3>
                   <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      Tus clientes descargan Pessy gratis. Automáticamente reciben todo lo que cargas en el sistema: recetas, próximos turnos y recordatorios de vacunas.
                   </p>
                </div>

                <div className="space-y-4">
                   {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                           key={tab.id}
                           onClick={() => handleTabClick(tab.id as TabType)}
                           className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 group ${
                              isActive 
                              ? `${tab.color} shadow-md scale-[1.02]` 
                              : 'bg-white border-transparent hover:bg-white hover:border-gray-200'
                           }`}
                        >
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isActive ? 'bg-white/50' : 'bg-gray-100 group-hover:bg-gray-200'
                           }`}>
                              <tab.icon size={24} className={isActive ? 'text-current' : 'text-gray-500'} />
                           </div>
                           <div>
                              <h4 className={`font-bold text-lg ${isActive ? 'text-current' : 'text-gray-900'}`}>
                                 {tab.label}
                              </h4>
                              <p className={`text-sm ${isActive ? 'text-current opacity-80' : 'text-gray-500'}`}>
                                 {tab.desc}
                              </p>
                           </div>
                        </button>
                      );
                   })}
                </div>
             </div>

             {/* Right Column: Phone Mockup */}
             <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                {/* Decorative Elements behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-blue-200 to-teal-200 rounded-full blur-[80px] opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10 w-full max-w-[320px]">
                   <AnimatePresence mode="wait">
                      {activeTab === 'history' && (
                         <div key="history" className="absolute inset-0 w-full">
                            <HistoryScreen delay={0} />
                         </div>
                      )}
                      {activeTab === 'appointments' && (
                         <div key="appointments" className="absolute inset-0 w-full">
                            <AppointmentsScreen delay={0} />
                         </div>
                      )}
                      {activeTab === 'reminders' && (
                         <div key="reminders" className="absolute inset-0 w-full">
                            <RemindersScreen delay={0} />
                         </div>
                      )}
                   </AnimatePresence>
                   
                   {/* Invisible placeholder to give height to container since screens are absolute */}
                   <div className="opacity-0 pointer-events-none">
                      <HistoryScreen />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};