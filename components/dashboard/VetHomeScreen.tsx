import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Users, Calendar, ClipboardList, Settings,
  Search, Bell, CheckCircle, X,
  Filter, Plus, Activity as ActivityIcon,
  Pill, LogOut, LayoutDashboard,
  MoreHorizontal, Clock, AlertTriangle, Syringe
} from 'lucide-react';

// --- Interfaces & Data ---
interface Appointment {
  id: number;
  petName: string;
  ownerName: string;
  type: string;
  time: string;
  status: 'in-progress' | 'confirmed' | 'pending' | 'urgent';
  img: string;
  breed: string;
  age: string;
  weight: string;
  reason: string;
  notes: string;
  isNew?: boolean; // Para animar entrada
}

interface Activity {
  id: number;
  type: 'consultation' | 'prescription' | 'appointment' | 'alert';
  title: string;
  subtitle: string;
  timeAgo: string;
  isSync: boolean;
  color: string;
  icon: any;
}

// Datos iniciales
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    petName: "Simba",
    ownerName: "Candela Moreno",
    type: "Control Semestral",
    time: "10:00 - 10:30 hs",
    status: "in-progress",
    img: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?auto=format&fit=crop&w=100&q=80",
    breed: "Golden Retriever",
    age: "3 años",
    weight: "28 kg",
    reason: "Control de rutina y revisión de piel.",
    notes: "Paciente con historial de dermatitis. Revisar dieta."
  },
  {
    id: 2,
    petName: "Max",
    ownerName: "Martín López",
    type: "Vacunación Anual",
    time: "11:00 - 11:30 hs",
    status: "pending",
    img: "https://images.unsplash.com/photo-1685387714439-edef4bd70ef5?auto=format&fit=crop&w=100&q=80",
    breed: "Mestizo",
    age: "5 años",
    weight: "14 kg",
    reason: "Vacuna Séxtuple + Antirrábica.",
    notes: "Suele ponerse nervioso. Usar premios."
  },
  {
    id: 3,
    petName: "Mía",
    ownerName: "Laura Gómez",
    type: "Limpieza Dental",
    time: "15:00 - 15:30 hs",
    status: "confirmed",
    img: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?auto=format&fit=crop&w=100&q=80",
    breed: "Siamesa",
    age: "2 años",
    weight: "3.5 kg",
    reason: "Profilaxis dental bajo sedación.",
    notes: "Ayuno de 8 horas confirmado por tutor."
  }
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: 'consultation',
    title: "Consulta: Simba",
    subtitle: "Control semestral - Enviado al tutor",
    timeAgo: "Hace 15 min",
    isSync: true,
    color: "bg-green-100 text-green-600",
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'prescription',
    title: "Receta: Max",
    subtitle: "Antibiótico - Enviado al tutor",
    timeAgo: "Hace 2 horas",
    isSync: true,
    color: "bg-blue-100 text-blue-600",
    icon: Pill
  },
  {
    id: 3,
    type: 'appointment',
    title: "Turno: Coco",
    subtitle: "Revisión post-op - 17 dic, 16:00 hs",
    timeAgo: "Hace 3 horas",
    isSync: true,
    color: "bg-purple-100 text-purple-600",
    icon: Calendar
  }
];

// Listas de nombres aleatorios SIN PREFIJOS
const NAMES_ES = ["Martínez", "Rodríguez", "García", "López", "Silva", "Pérez", "González", "Torres", "Ruiz", "Vargas"];
const NAMES_EN = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson"];
const NAMES_PT = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Rodrigues"];

export const VetHomeScreen = ({ t }: { t?: any }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  
  // --- Estados para Simulación ---
  const [alert, setAlert] = useState<{ type: 'red' | 'green' | null, message: string, sub: string } | null>(null);
  
  // --- Estados Dinámicos ---
  const [currentDate, setCurrentDate] = useState<string>("");
  const [clinicName, setClinicName] = useState<string>(""); 
  const [vetName, setVetName] = useState<string>(""); 

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // --- EFECTO: SIMULACIÓN DE VIDA ---
  useEffect(() => {
    // 1. A los 4 segundos: LLEGA UN PERRO ENFERMO (Alerta Roja)
    const timerUrgency = setTimeout(() => {
      const newEmergency: Appointment = {
        id: 99,
        petName: "Rocky",
        ownerName: "Pedro Méndez",
        type: "URGENCIA",
        time: "AHORA",
        status: "urgent",
        img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=100&q=80",
        breed: "Bulldog Francés",
        age: "4 años",
        weight: "11 kg",
        reason: "Vómitos severos y decaimiento.",
        notes: "Ingreso inmediato a sala. Prioridad Alta.",
        isNew: true
      };

      setAppointments(prev => [newEmergency, ...prev]);
      
      setAlert({
        type: 'red',
        message: '¡Atención! Nuevo Ingreso de Urgencia',
        sub: 'Rocky (Bulldog) - Sala 1'
      });

      // Agregar actividad
      const newAct: Activity = {
        id: Date.now(),
        type: 'alert',
        title: "Ingreso Urgencia: Rocky",
        subtitle: "Triaje completado - Prioridad Alta",
        timeAgo: "Ahora",
        isSync: true,
        color: "bg-red-100 text-red-600",
        icon: AlertTriangle
      };
      setActivities(prev => [newAct, ...prev]);

    }, 4000);

    // 2. A los 12 segundos: SITUACIÓN CONTROLADA (Alerta Verde)
    const timerStabilized = setTimeout(() => {
      setAlert({
        type: 'green',
        message: 'Paciente Estabilizado',
        sub: 'Rocky ha respondido al antiemético.'
      });

      // Actualizar estado del turno
      setAppointments(prev => prev.map(app => 
        app.id === 99 ? { ...app, status: 'in-progress', type: 'En Observación' } : app
      ));

      // Agregar actividad de receta
      const newAct: Activity = {
        id: Date.now() + 1,
        type: 'prescription',
        title: "Medicación: Rocky",
        subtitle: "Maropitant inyectable administrado",
        timeAgo: "Ahora",
        isSync: true,
        color: "bg-emerald-100 text-emerald-600",
        icon: Syringe
      };
      setActivities(prev => [newAct, ...prev]);

    }, 12000);

    // 3. Limpiar alerta verde después de un rato
    const timerClear = setTimeout(() => {
      setAlert(null);
    }, 18000);

    return () => {
      clearTimeout(timerUrgency);
      clearTimeout(timerStabilized);
      clearTimeout(timerClear);
    };
  }, []);

  // --- EFECTO: FECHA Y UBICACIÓN ---
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const userLang = navigator.language || 'es-ES';
    const formattedDate = now.toLocaleDateString(userLang, options);
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));

    setVetName(getRandomItem(NAMES_ES));
    setClinicName("Clínica Veterinaria Central");

    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data && data.city) {
           const city = data.city;
           const country = data.country_code; 
           
           if (['US', 'GB', 'CA', 'AU'].includes(country)) {
             setClinicName(`${city} Veterinary Center`);
             setVetName(getRandomItem(NAMES_EN));
           } else if (country === 'BR' || country === 'PT') {
             setClinicName(`Clínica Vet ${city}`);
             setVetName(getRandomItem(NAMES_PT));
           } else {
             setClinicName(`Veterinaria ${city}`);
             setVetName(getRandomItem(NAMES_ES));
           }
        }
      } catch (error) {
        console.log("No se pudo detectar ubicación, usando defaults.");
      }
    };
    fetchLocation();
  }, []);

  // Fallback t
  const safeT = t || {
    dashboard: {
      welcome: "Bienvenida",
      btn_register: "Registrar Consulta",
      stats: { appointments: "Citas para Hoy", patients: "Pacientes Activos", sync: "Sincronización" },
      upcoming_title: "Próximas Citas",
      activity_title: "Actividad Reciente",
      search_placeholder: "Buscar pacientes, DNI, chip...",
      nav_home: "Inicio", nav_patients: "Pacientes", nav_agenda: "Agenda", nav_consultations: "Consultas", nav_settings: "Configuración",
      system_online: "Sistema en línea"
    },
    features: { title_module: "Módulo Veterinario" }
  };

  const navItems = [
    { id: 'home', label: safeT.dashboard.nav_home, icon: LayoutDashboard },
    { id: 'patients', label: safeT.dashboard.nav_patients, icon: Users },
    { id: 'agenda', label: safeT.dashboard.nav_agenda, icon: Calendar },
    { id: 'consultations', label: safeT.dashboard.nav_consultations, icon: ClipboardList },
    { id: 'settings', label: safeT.dashboard.nav_settings, icon: Settings },
  ];

  return (
    <div className="flex h-full w-full bg-[#F3F4F6] text-gray-900 font-sans overflow-hidden relative">
      
      {/* Alerta Flotante (Toast) */}
      <AnimatePresence>
        {alert && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`absolute top-6 left-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border ${
              alert.type === 'red' 
                ? 'bg-red-50 border-red-200 text-red-900' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className={`p-2 rounded-full ${alert.type === 'red' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {alert.type === 'red' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
            </div>
            <div>
              <p className="font-bold text-sm md:text-base">{alert.message}</p>
              <p className={`text-xs ${alert.type === 'red' ? 'text-red-700' : 'text-emerald-700'}`}>{alert.sub}</p>
            </div>
            <button onClick={() => setAlert(null)} className="ml-2 opacity-50 hover:opacity-100">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-[260px] bg-white border-r border-gray-200 flex flex-col z-20 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2D5F5D] rounded-lg flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                <path d="M12 4L4 8V14C4 18 12 22 12 22C12 22 20 18 20 14V8L12 4Z" fill="currentColor"></path>
                <circle cx="12" cy="12" r="2" fill="#2D5F5D"></circle>
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">PetSync</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-teal-50 text-[#2D5F5D] font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#2D5F5D]' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={2} />
                <span className="text-sm">{item.label}</span>
                {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#2D5F5D] rounded-l"></div>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
             <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-medium">Cerrar Sesión</span>
             </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full relative">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 z-10">
            <div className="max-w-md w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder={safeT.dashboard.search_placeholder} 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5F5D] focus:border-transparent transition-all placeholder-gray-400" 
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell size={20} className={alert ? 'animate-bounce text-[#2D5F5D]' : ''} />
                  {alert && <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-ping"></span>}
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-gray-200"></div>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-gray-900 transition-all duration-500 ease-out">{clinicName}</p>
                  <p className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    {safeT.dashboard.system_online}
                  </p>
                </div>
                <img src="https://images.unsplash.com/photo-1640161415278-a5ac46f82d04?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm" />
              </div>
            </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
           <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Welcome */}
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {safeT.dashboard.welcome}, {vetName}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Calendar size={14} />
                    {currentDate || safeT.dashboard.date}
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-[#2D5F5D] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#234948] transition-all shadow-lg shadow-teal-900/10 active:scale-95">
                  <Plus size={18} /> {safeT.dashboard.btn_register}
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: safeT.dashboard.stats.appointments, value: appointments.length.toString(), icon: Calendar, color: "text-[#2D5F5D]", bg: "bg-teal-50" },
                  { label: safeT.dashboard.stats.patients, value: "128", icon: Users, color: "text-blue-600", bg: "bg-blue-50" }, // +1 paciente
                  { label: safeT.dashboard.stats.sync, value: "100%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                     </div>
                     <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color}`}>
                        <stat.icon size={24} strokeWidth={2.5} />
                     </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-4">
                  {/* Left Column: Appointments */}
                  <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                          <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <Clock size={18} className="text-[#2D5F5D]" />
                            {safeT.dashboard.upcoming_title}
                          </h2>
                          <div className="flex gap-2">
                             <button className="p-1.5 hover:bg-gray-50 rounded text-gray-500"><Filter size={16} /></button>
                          </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 bg-white z-10">
                                <tr>
                                    <th className="px-4 py-3 font-semibold rounded-l-lg">Paciente</th>
                                    <th className="px-4 py-3 font-semibold">Tutor</th>
                                    <th className="px-4 py-3 font-semibold">Hora</th>
                                    <th className="px-4 py-3 font-semibold">Tipo</th>
                                    <th className="px-4 py-3 font-semibold rounded-r-lg text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence>
                                {appointments.map((app) => (
                                    <motion.tr 
                                        key={app.id} 
                                        initial={app.isNew ? { backgroundColor: "#FEF2F2", opacity: 0, x: -20 } : {}}
                                        animate={{ backgroundColor: app.status === 'urgent' ? "#FEF2F2" : "transparent", opacity: 1, x: 0 }}
                                        onClick={() => setSelectedAppointment(app)}
                                        className={`transition-colors cursor-pointer group ${app.status === 'urgent' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                  <img src={app.img} className={`w-8 h-8 rounded-full object-cover border ${app.status === 'urgent' ? 'border-red-400' : 'border-gray-200'}`} alt="" />
                                                  {app.status === 'urgent' && (
                                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                    </span>
                                                  )}
                                                </div>
                                                <span className={`font-bold text-sm ${app.status === 'urgent' ? 'text-red-900' : 'text-gray-900'}`}>{app.petName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{app.ownerName}</td>
                                        <td className={`px-4 py-3 text-sm font-medium ${app.status === 'urgent' ? 'text-red-700 font-bold' : 'text-gray-900'}`}>{app.time}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium px-2 py-1 rounded border ${
                                              app.status === 'urgent' 
                                                ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' 
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                                {app.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {app.status === 'in-progress' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-[#2D5F5D] border border-teal-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D5F5D] animate-pulse"></span>
                                                    En Curso
                                                </span>
                                            )}
                                            {app.status === 'urgent' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                                                    <AlertTriangle size={10} />
                                                    URGENTE
                                                </span>
                                            )}
                                            {app.status === 'pending' && <span className="text-xs text-gray-400 font-medium">Pendiente</span>}
                                            {app.status === 'confirmed' && <span className="text-xs text-blue-500 font-medium">Confirmado</span>}
                                        </td>
                                    </motion.tr>
                                ))}
                                </AnimatePresence>
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </div>

                  {/* Right Column: Activity Feed */}
                  <div className="lg:col-span-1">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col">
                        <div className="p-5 border-b border-gray-100">
                           <h2 className="font-bold text-gray-900 flex items-center gap-2">
                             <ActivityIcon size={18} className="text-[#2D5F5D]" />
                             {safeT.dashboard.activity_title}
                           </h2>
                        </div>
                        <div className="p-5 flex-1 overflow-y-auto">
                            <div className="relative border-l-2 border-gray-100 space-y-8 ml-3">
                                <AnimatePresence>
                                {activities.map((act) => (
                                    <motion.div 
                                      key={act.id} 
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="relative pl-6"
                                    >
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${act.color.replace('text-', 'bg-').replace('100', '500')}`}></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-none mb-1">{act.title}</p>
                                            <p className="text-xs text-gray-500 mb-2">{act.subtitle}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{act.timeAgo}</span>
                                                {act.isSync && (
                                                    <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded border border-green-100 flex items-center gap-1">
                                                        <CheckCircle size={8} /> Sync
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                            <button className="w-full text-center text-xs font-bold text-[#2D5F5D] hover:underline">Ver historial completo</button>
                        </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>

      </div>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedAppointment(null)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
                >
                    <div className={`flex justify-between items-center p-5 border-b ${selectedAppointment.status === 'urgent' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                        <h3 className={`font-bold text-lg ${selectedAppointment.status === 'urgent' ? 'text-red-900' : 'text-gray-900'}`}>
                          {selectedAppointment.status === 'urgent' ? '🚨 Urgencia Veterinaria' : 'Detalle de Turno'}
                        </h3>
                        <button onClick={() => setSelectedAppointment(null)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-1.5 rounded-full border border-gray-200 transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="flex gap-5 mb-6">
                            <img src={selectedAppointment.img} alt={selectedAppointment.petName} className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedAppointment.petName}</h2>
                                <p className="text-sm text-gray-500 font-medium mb-2">{selectedAppointment.ownerName}</p>
                                <div className="flex gap-2">
                                     <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded border border-gray-200">{selectedAppointment.breed}</span>
                                     <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded border border-gray-200">{selectedAppointment.age}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                             <div className={`${selectedAppointment.status === 'urgent' ? 'bg-red-50 border-red-100' : 'bg-teal-50 border-teal-100'} p-3 rounded-lg border`}>
                                 <p className={`text-xs font-bold uppercase mb-1 ${selectedAppointment.status === 'urgent' ? 'text-red-600' : 'text-teal-600'}`}>Motivo</p>
                                 <p className="text-sm font-semibold text-gray-900">{selectedAppointment.reason}</p>
                             </div>
                             <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                                 <p className="text-xs text-amber-600 font-bold uppercase mb-1">Notas Internas</p>
                                 <p className="text-sm font-semibold text-gray-900">{selectedAppointment.notes}</p>
                             </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button className="px-4 py-2 bg-white text-gray-700 font-semibold text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Reagendar
                            </button>
                            <button className={`px-4 py-2 text-white font-semibold text-sm rounded-lg transition-colors shadow-md ${selectedAppointment.status === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2D5F5D] hover:bg-[#234948]'}`}>
                                Iniciar Consulta
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};