import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, X, ChevronRight, Stethoscope, Weight, Syringe, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Control Anual",
    date: "Hoy",
    time: "10:00 AM",
    type: "Consulta",
    details: "Revisión general completa. Signos vitales normales. Se observa buena condición corporal.",
    weight: "28kg",
    doctor: "Dra. Fernández",
    location: "Clínica Vet San Martín",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Vacunación Múltiple",
    date: "Hace 3 meses",
    time: "15 Oct 2025",
    type: "Vacuna",
    details: "Aplicación de vacuna séxtuple anual. Sin reacciones alérgicas inmediatas.",
    weight: "27.5kg",
    doctor: "Dr. Pérez",
    location: "Clínica Vet San Martín",
    icon: Syringe,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    title: "Chequeo Inicial",
    date: "Hace 9 meses",
    time: "12 Mar 2025",
    type: "Consulta",
    details: "Primera visita de cachorro. Desparasitación interna y externa realizada.",
    weight: "12kg",
    doctor: "Dra. Fernández",
    location: "Clínica Vet San Martín",
    icon: Weight,
    color: "bg-purple-100 text-purple-600"
  }
];

export function HistoryScreen({ delay = 0 }) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const activeEvent = events.find(e => e.id === selectedEvent);

  return (
    <PhoneFrame activeTab="home" delay={delay}>
      {/* Header */}
      <div className="px-5 py-3 bg-white/80 backdrop-blur-sm border-b border-teal-100 z-10">
         <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-1.5 rounded-lg shrink-0">
                <FileText size={16} className="text-[#2D5F5D]"/>
            </div>
            <div>
                <h1 className="text-sm font-bold text-gray-900 leading-tight">Historia Médica</h1>
                <p className="text-[10px] text-gray-500">Simba • Golden Retriever</p>
            </div>
         </div>
      </div>

      {/* Lista Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="relative pl-4 border-l-2 border-teal-100 space-y-6">
            {events.map((event, index) => (
            <div key={event.id} className="relative cursor-pointer group" onClick={() => setSelectedEvent(event.id)}>
                {/* Timeline Dot */}
                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${index === 0 ? 'bg-[#2D5F5D]' : 'bg-gray-300'}`}></div>
                
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="text-xs font-bold text-gray-800 leading-tight">{event.title}</span>
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md whitespace-nowrap shrink-0">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-gray-500">{event.type}</span>
                    </div>
                    <div className="flex items-center text-[#2D5F5D] text-[10px] font-medium gap-1">
                        Ver detalles <ChevronRight size={12} />
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Detalle Desplegable (Overlay) */}
      <AnimatePresence>
        {selectedEvent && activeEvent && (
           <motion.div 
             className="absolute inset-0 z-20 bg-white flex flex-col"
             initial={{ y: "100%" }} 
             animate={{ y: 0 }} 
             exit={{ y: "100%" }}
             transition={{ type: "spring", damping: 25, stiffness: 200 }}
           >
             <div className="relative h-32 bg-[#2D5F5D] flex items-center justify-center rounded-b-[2rem] flex-shrink-0">
                <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-white/20 p-1 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <X size={18} />
                </button>
                <div className="text-center text-white p-4">
                    <div className={`mx-auto w-12 h-12 ${activeEvent.color} bg-white rounded-full flex items-center justify-center mb-2 shadow-lg`}>
                        <activeEvent.icon size={24} className="text-[#2D5F5D]" />
                    </div>
                    <h2 className="text-lg font-bold leading-tight">{activeEvent.title}</h2>
                    <p className="text-xs opacity-90">{activeEvent.time}</p>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Diagnóstico</h3>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                        {activeEvent.details}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <p className="text-[10px] text-blue-500 font-bold uppercase mb-1">Peso</p>
                        <p className="text-lg font-bold text-blue-700">{activeEvent.weight}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                        <p className="text-[10px] text-purple-500 font-bold uppercase mb-1">Veterinario</p>
                        <p className="text-sm font-bold text-purple-700 truncate">{activeEvent.doctor}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-gray-700">{activeEvent.location}</p>
                        <p className="text-[10px] text-gray-500">Av. San Martín 1234</p>
                    </div>
                </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}