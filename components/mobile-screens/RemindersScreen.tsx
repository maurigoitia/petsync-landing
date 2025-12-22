import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, X, Pill, Syringe, Sparkles } from 'lucide-react';

const reminders = [
  {
    id: 1,
    title: "Medicación",
    subtitle: "Max • Crema Dérmica",
    time: "20:00 hs",
    status: "urgent", // urgent, normal
    icon: Pill,
    color: "bg-amber-100 text-amber-600",
    detailColor: "bg-amber-500",
    description: "Aplicar capa fina en zona afectada. Usar guantes.",
    frequency: "Cada 12hs por 5 días"
  },
  {
    id: 2,
    title: "Vacuna",
    subtitle: "Mishi • Antirrábica",
    time: "Mañana 09:00",
    status: "normal",
    icon: Syringe,
    color: "bg-blue-100 text-blue-600",
    detailColor: "bg-blue-500",
    description: "Turno reservado con Dr. Pérez. Recordar llevar libreta.",
    frequency: "Anual"
  },
  {
    id: 3,
    title: "Cepillado Dental",
    subtitle: "Coco • Higiene",
    time: "Hoy",
    status: "normal",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
    detailColor: "bg-purple-500",
    description: "Usar pasta dental sabor pollo. Reforzar molares.",
    frequency: "Diario"
  }
];

export function RemindersScreen({ delay = 0 }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activeItem = reminders.find(r => r.id === selectedId);

  return (
    <PhoneFrame activeTab="alerts" delay={delay}>
      <div className="px-5 py-4 bg-white/80 backdrop-blur-sm border-b border-teal-100 z-10">
         <h1 className="text-lg font-bold text-gray-900">Recordatorios</h1>
         <p className="text-[10px] text-gray-500">Mantén la salud de tu mascota al día</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {reminders.map(item => (
            <div 
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md active:scale-[0.98] ${item.status === 'urgent' ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}
            >
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <item.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className={`font-bold text-sm truncate ${item.status === 'urgent' ? 'text-amber-900' : 'text-gray-900'}`}>{item.title}</h3>
                            {item.status === 'urgent' && <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">URGENTE</span>}
                        </div>
                        <p className={`text-xs mb-1 truncate ${item.status === 'urgent' ? 'text-amber-800' : 'text-gray-600'}`}>{item.subtitle}</p>
                        <div className={`flex items-center gap-1 text-[10px] font-medium ${item.status === 'urgent' ? 'text-amber-700' : 'text-gray-400'}`}>
                            <Clock size={10} className="shrink-0" /> {item.time}
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && activeItem && (
            <motion.div 
                className="absolute inset-0 z-30 bg-white flex flex-col"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                <div className={`${activeItem.detailColor} p-6 pb-12 text-white relative shrink-0`}>
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full text-white hover:bg-white/30"
                    >
                        <X size={18} />
                    </button>
                    <div className="flex flex-col items-center text-center mt-4">
                        <div className="bg-white/20 p-4 rounded-full mb-3 backdrop-blur-md">
                            <activeItem.icon size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-1">{activeItem.title}</h2>
                        <p className="opacity-90">{activeItem.subtitle}</p>
                    </div>
                </div>

                <div className="flex-1 bg-white -mt-6 rounded-t-3xl p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Horario</p>
                                <p className="text-lg font-semibold text-gray-900">{activeItem.time}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase font-bold">Frecuencia</p>
                                <p className="text-sm font-semibold text-gray-900">{activeItem.frequency}</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Instrucciones</p>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                                {activeItem.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6">
                        <button 
                            onClick={() => setSelectedId(null)}
                            className={`w-full ${activeItem.detailColor} text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                        >
                            <CheckCircle size={18} />
                            Marcar como Completado
                        </button>
                        <button 
                            onClick={() => setSelectedId(null)}
                            className="w-full bg-white text-gray-500 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            Posponer 1 hora
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}