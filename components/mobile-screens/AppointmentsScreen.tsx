import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, X, Clock, AlertCircle } from 'lucide-react';

const appointments = [
  {
    id: 1,
    pet: "Simba",
    title: "Control Semestral",
    date: "Mié 17 Dic",
    time: "10:00 - 10:30",
    status: "Confirmado",
    doctor: "Dra. Fernández",
    notes: "Traer carnet de vacunación. Ayuno de 2 horas sugerido.",
    img: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?auto=format&fit=crop&w=100&q=80",
    color: "from-[#2D5F5D] to-emerald-700"
  },
  {
    id: 2,
    pet: "Max",
    title: "Vacunación",
    date: "Jue 18 Dic",
    time: "09:00 - 09:15",
    status: "Pendiente",
    doctor: "Enf. López",
    notes: "Vacuna antirrábica anual.",
    img: "https://images.unsplash.com/photo-1685387714439-edef4bd70ef5?auto=format&fit=crop&w=100&q=80",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 3,
    pet: "Mía",
    title: "Limpieza Dental",
    date: "Lun 22 Dic",
    time: "14:00 - 15:30",
    status: "Confirmado",
    doctor: "Dr. Pérez",
    notes: "Requiere anestesia leve. Ayuno total de 8 horas.",
    img: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?auto=format&fit=crop&w=100&q=80",
    color: "from-purple-500 to-purple-600"
  }
];

export function AppointmentsScreen({ delay = 0 }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activeItem = appointments.find(a => a.id === selectedId);

  return (
    <PhoneFrame activeTab="calendar" delay={delay}>
      <div className="px-5 py-4 bg-white/80 backdrop-blur-sm border-b border-teal-100 z-10 flex justify-between items-center">
         <h1 className="text-lg font-bold text-gray-900">Próximos Turnos</h1>
         <span className="bg-teal-100 text-[#2D5F5D] text-[10px] font-bold px-2 py-1 rounded-full shrink-0">3 Futuros</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {appointments.map(app => (
            <motion.div 
                key={app.id} 
                layoutId={`card-${app.id}`}
                onClick={() => setSelectedId(app.id)}
                className={`rounded-2xl p-4 shadow-md cursor-pointer relative overflow-hidden bg-gradient-to-br ${app.id === 1 ? 'from-[#2D5F5D] to-emerald-700 text-white' : 'bg-white border border-gray-100'}`}
            >
                <div className="flex items-start gap-3 relative z-10">
                    <img src={app.img} alt={app.pet} className="w-12 h-12 rounded-full object-cover border-2 border-white/50 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-sm truncate ${app.id !== 1 ? 'text-gray-900' : ''}`}>{app.pet}</h3>
                        <p className={`text-xs opacity-90 truncate ${app.id !== 1 ? 'text-gray-500' : ''}`}>{app.title}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className={`text-xs font-bold ${app.id !== 1 ? 'text-gray-900' : ''}`}>{app.date.split(' ')[1]}</p>
                        <p className={`text-[10px] opacity-80 ${app.id !== 1 ? 'text-gray-500' : ''}`}>{app.date.split(' ')[2]}</p>
                    </div>
                </div>
                {app.id === 1 && (
                    <div className="mt-3 flex items-center gap-2 bg-white/20 p-2 rounded-lg backdrop-blur-md">
                        <Clock size={12} className="shrink-0" />
                        <span className="text-[10px] font-semibold">Faltan 2 días</span>
                    </div>
                )}
            </motion.div>
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
                <div className={`relative h-40 bg-gradient-to-br ${activeItem.color} flex flex-col justify-end p-6 shrink-0`}>
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full text-white hover:bg-white/30"
                    >
                        <X size={18} />
                    </button>
                    <div className="flex items-end gap-4">
                        <img src={activeItem.img} alt={activeItem.pet} className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg -mb-8 z-10 object-cover shrink-0" />
                        <div className="text-white mb-1">
                            <h2 className="text-xl font-bold">{activeItem.pet}</h2>
                            <p className="text-sm opacity-90">{activeItem.title}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 pt-10 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <CalendarIcon size={14} />
                                <span className="text-[10px] font-bold uppercase">Fecha</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{activeItem.date}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <Clock size={14} />
                                <span className="text-[10px] font-bold uppercase">Hora</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{activeItem.time}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Profesional</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-[#2D5F5D] font-bold shrink-0">
                                {activeItem.doctor.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{activeItem.doctor}</p>
                                <p className="text-xs text-gray-500">Veterinario General</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                        <AlertCircle className="text-amber-500 shrink-0" size={20} />
                        <div>
                            <p className="text-xs font-bold text-amber-800 mb-1">Importante</p>
                            <p className="text-xs text-amber-700 leading-relaxed">{activeItem.notes}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Ubicación</h3>
                        <div className="bg-gray-100 h-24 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                            <div className="text-center">
                                <MapPin size={24} className="mx-auto mb-1" />
                                <span className="text-xs">Mapa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}