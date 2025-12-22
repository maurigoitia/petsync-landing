import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Users, Calendar, FileText, Settings,
  Search, Bell, ChevronRight, Clock,
  Stethoscope, CheckCircle, AlertCircle, X,
  MoreVertical, Filter, Plus, Activity as ActivityIcon,
  Pill,
  ClipboardList,
  LayoutGrid
} from 'lucide-react';

// --- Interfaces ---
interface Appointment {
  id: number;
  petName: string;
  ownerName: string;
  type: string;
  time: string;
  status: 'in-progress' | 'confirmed' | 'pending';
  img: string;
  breed: string;
  age: string;
  weight: string;
  reason: string;
  notes: string;
  lastVisit: string;
}

interface Activity {
  id: number;
  type: 'consultation' | 'prescription' | 'appointment';
  title: string;
  subtitle: string;
  timeAgo: string;
  isSync: boolean;
  color: string;
  icon: any;
}

// --- Mock Data ---
const appointments: Appointment[] = [
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
    notes: "Paciente con historial de dermatitis. Revisar dieta.",
    lastVisit: "14 Ago 2025"
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
    notes: "Suele ponerse nervioso. Usar premios.",
    lastVisit: "10 Dic 2024"
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
    notes: "Ayuno de 8 horas confirmado por tutor.",
    lastVisit: "01 Nov 2025"
  }
];

const activities: Activity[] = [
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


interface VetDashboardProps {
  t: any;
}

export const VetDashboard: React.FC<VetDashboardProps> = ({ t }) => {
  // Desktop Sidebar State
  const [desktopTab, setDesktopTab] = useState('home');
  // Mobile Tab Bar State (The "Mini App" logic)
  const [mobileTab, setMobileTab] = useState<'overview' | 'appointments' | 'activity'>('overview');
  
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // --- LOCALIZATION STATE ---
  const [currentDate, setCurrentDate] = useState<string>("");
  const [clinicName, setClinicName] = useState<string>("");
  const [vetName, setVetName] = useState<string>("");

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    // 1. Fecha Real
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const userLang = navigator.language || 'es-ES';
    const formattedDate = now.toLocaleDateString(userLang, options);
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));

    // 2. Establecer valores aleatorios iniciales (por si falla la API de ubicación)
    setVetName(getRandomItem(NAMES_ES));
    setClinicName("Clínica Veterinaria Central");

    // 3. Ubicación Real (GeoIP)
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
        console.log("Loc error", error);
      }
    };
    fetchLocation();
  }, []);

  const desktopNavItems = [
    { id: 'home', label: t.dashboard.nav_home, icon: Home },
    { id: 'patients', label: t.dashboard.nav_patients, icon: Users },
    { id: 'agenda', label: t.dashboard.nav_agenda, icon: Calendar },
    { id: 'consultations', label: t.dashboard.nav_consultations, icon: ClipboardList },
    { id: 'settings', label: t.dashboard.nav_settings, icon: Settings },
  ];

  // --- SUB-COMPONENTES (Vistas) ---

  const OverviewView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{t.dashboard.welcome}, {vetName}</h1>
          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            {currentDate || t.dashboard.date}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={14} /> <span className="hidden sm:inline">Filtrar</span>
          </button>
          <button className="flex items-center gap-2 bg-[#2D5F5D] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold hover:bg-[#234948] transition-colors shadow-md shadow-teal-900/10">
            <Plus size={14} /> {t.dashboard.btn_register}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#2D5F5D] group-hover:scale-110 transition-transform shrink-0">
            <Calendar size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">8</p>
            <p className="text-xs font-medium text-gray-500">{t.dashboard.stats.appointments}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0">
            <Users size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">127</p>
            <p className="text-xs font-medium text-gray-500">{t.dashboard.stats.patients}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shrink-0">
            <CheckCircle size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">100%</p>
            <p className="text-xs font-medium text-gray-500">{t.dashboard.stats.sync}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentsView = () => (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Clock size={18} className="text-[#2D5F5D]" />
          {t.dashboard.upcoming_title}
        </h2>
        <button className="text-xs font-bold text-[#2D5F5D] hover:underline">Ver Agenda</button>
      </div>
      <div className="space-y-4">
        {appointments.map((app) => (
          <motion.div 
            key={app.id}
            onClick={() => setSelectedAppointment(app)}
            className={`relative p-4 rounded-2xl border transition-all cursor-pointer group ${
              app.status === 'in-progress' 
                ? 'bg-gradient-to-r from-[#2D5F5D]/5 to-emerald-50 border-[#2D5F5D]/30 hover:border-[#2D5F5D]' 
                : 'bg-white border-gray-100 hover:border-teal-200 hover:shadow-md'
            }`}
          >
            {app.status === 'in-progress' && (
              <div className="absolute -top-2 -right-2 bg-[#2D5F5D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                EN CURSO
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 mt-0.5">
                <img src={app.img} alt={app.petName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  {app.breed.includes('Gato') || app.breed.includes('Siamesa') ? (
                    <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center text-[8px] text-purple-600">🐱</div>
                  ) : (
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-[8px] text-blue-600">🐶</div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{app.petName}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{app.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-1">{app.ownerName} • {app.breed}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                    app.type.includes('Vacuna') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    app.type.includes('Control') ? 'bg-green-50 text-green-700 border-green-100' :
                    'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    {app.type}
                  </span>
                </div>
              </div>
              <div className="self-center text-gray-300 group-hover:text-[#2D5F5D] transition-colors">
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ActivityView = () => (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ActivityIcon size={18} className="text-[#2D5F5D]" />
        {t.dashboard.activity_title}
      </h2>
      <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
        {activities.map((act) => (
          <div key={act.id} className="relative pl-10">
            <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${act.color} flex items-center justify-center border-4 border-white shadow-sm z-10`}>
              <act.icon size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{act.title}</p>
              <p className="text-[10px] text-gray-500 mb-1">{act.subtitle}</p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-400 font-medium">{act.timeAgo}</span>
                {act.isSync && (
                  <span className="flex items-center gap-0.5 text-[9px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">
                    <CheckCircle size={8} /> Sync
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-900">24</p>
          <p className="text-[10px] text-gray-500 font-medium">{t.dashboard.card_treatment}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-900">18</p>
          <p className="text-[10px] text-gray-500 font-medium">{t.dashboard.card_recipes}</p>
        </div>
      </div>
    </div>
  );

  return (
    // ESTRUCTURA PRINCIPAL
    // Mobile: h-[580px] fijo (como una pantalla de cel).
    // Desktop: aspect ratio o auto height para grid normal.
    <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-w-7xl mx-auto w-full h-[580px] sm:h-auto sm:aspect-[4/3] lg:aspect-[16/10] flex flex-col relative z-0">
      <div className="flex h-full overflow-hidden">
        
        {/* --- Sidebar (DESKTOP ONLY) --- */}
        <div className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-col z-10">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2D5F5D] to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M12 4L4 8V14C4 18 12 22 12 22C12 22 20 18 20 14V8L12 4Z" fill="white"></path>
                  <circle cx="12" cy="12" r="2" fill="#2D5F5D"></circle>
                </svg>
              </div>
              <div>
                <span className="font-bold text-[#2D5F5D] block text-base">PetSync</span>
                <span className="text-xs text-gray-500 font-medium">{t.features.title_module}</span>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {desktopNavItems.map((item) => {
              const isActive = desktopTab === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setDesktopTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#2D5F5D] to-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-teal-50 hover:text-[#2D5F5D]'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#2D5F5D]'} />
                  <span className={`text-sm font-medium ${isActive ? '' : ''}`}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-teal-50 rounded-xl p-4 flex items-start gap-3 border border-teal-100">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-sm shadow-sm">💡</div>
              <div>
                <p className="text-xs font-bold text-[#2D5F5D] mb-0.5">Tip del día</p>
                <p className="text-xs text-teal-700 leading-tight">Configura recordatorios automáticos de WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Main Content Container --- */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-gray-50/50">
          
          {/* Top Bar (Universal) */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0 shadow-sm z-20">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 max-w-md relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={t.dashboard.search_placeholder} 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5F5D] focus:border-transparent transition-all hover:bg-white" 
                />
              </div>
              <div className="sm:hidden flex-1"><span className="text-sm font-bold text-gray-800">PetSync Vet</span></div>
              
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 truncate">{clinicName}</p>
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-xs font-medium text-gray-600">{t.dashboard.system_online}</span>
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all group">
                  <img src="https://images.unsplash.com/photo-1640161415278-a5ac46f82d04?auto=format&fit=crop&w=100&q=80" alt={vetName} className="w-10 h-10 rounded-full object-cover border-2 border-teal-100 group-hover:border-[#2D5F5D] transition-colors shrink-0" />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-gray-700">{vetName}</p>
                    <p className="text-[10px] text-gray-500">Administrador</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT AREA: HYBRID ARCHITECTURE --- */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            
            {/* MOBILE VIEW (Tabbed Interface) */}
            <div className="lg:hidden flex-1 overflow-y-auto p-4 scroll-smooth">
               {mobileTab === 'overview' && <OverviewView />}
               {mobileTab === 'appointments' && <AppointmentsView />}
               {mobileTab === 'activity' && <ActivityView />}
            </div>

            {/* DESKTOP VIEW (Grid Layout) */}
            <div className="hidden lg:block flex-1 overflow-y-auto p-8">
               <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-3">
                     <OverviewView />
                  </div>
                  <div className="col-span-2">
                     <AppointmentsView />
                  </div>
                  <div className="col-span-1">
                     <ActivityView />
                  </div>
               </div>
            </div>

            {/* --- MOBILE BOTTOM NAVIGATION (Tab Bar) --- */}
            <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
                <button 
                  onClick={() => setMobileTab('overview')}
                  className={`flex flex-col items-center gap-1 transition-colors ${mobileTab === 'overview' ? 'text-[#2D5F5D]' : 'text-gray-400'}`}
                >
                  <LayoutGrid size={22} className={mobileTab === 'overview' ? 'fill-current opacity-20' : ''} />
                  <span className="text-[10px] font-medium">Inicio</span>
                </button>
                <button 
                  onClick={() => setMobileTab('appointments')}
                  className={`flex flex-col items-center gap-1 transition-colors ${mobileTab === 'appointments' ? 'text-[#2D5F5D]' : 'text-gray-400'}`}
                >
                  <Calendar size={22} className={mobileTab === 'appointments' ? 'fill-current opacity-20' : ''} />
                  <span className="text-[10px] font-medium">Agenda</span>
                </button>
                <button 
                  onClick={() => setMobileTab('activity')}
                  className={`flex flex-col items-center gap-1 transition-colors ${mobileTab === 'activity' ? 'text-[#2D5F5D]' : 'text-gray-400'}`}
                >
                  <ActivityIcon size={22} className={mobileTab === 'activity' ? 'fill-current opacity-20' : ''} />
                  <span className="text-[10px] font-medium">Actividad</span>
                </button>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment Detail Overlay (Universal) */}
      <AnimatePresence>
        {selectedAppointment && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
                onClick={() => setSelectedAppointment(null)}
            >
                <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full sm:max-w-md h-[85%] sm:h-auto rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="relative h-32 bg-[#2D5F5D] flex items-end p-6 shrink-0">
                        <button 
                            onClick={() => setSelectedAppointment(null)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                        <div className="flex items-end gap-4 translate-y-8">
                            <img src={selectedAppointment.img} alt={selectedAppointment.petName} className="w-20 h-20 rounded-2xl border-4 border-white shadow-md object-cover bg-gray-200" />
                            <div className="mb-2 text-white">
                                <h2 className="text-2xl font-bold leading-none">{selectedAppointment.petName}</h2>
                                <p className="text-sm opacity-90">{selectedAppointment.ownerName}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 pt-12 p-6 overflow-y-auto bg-white">
                        <div className="flex gap-2 mb-6">
                            <span className="bg-teal-50 text-[#2D5F5D] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {selectedAppointment.status === 'in-progress' ? 'En Curso' : 'Pendiente'}
                            </span>
                             <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {selectedAppointment.type}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                             <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 uppercase font-bold">Edad</p>
                                 <p className="text-sm font-bold text-gray-900">{selectedAppointment.age}</p>
                             </div>
                             <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 uppercase font-bold">Peso</p>
                                 <p className="text-sm font-bold text-gray-900">{selectedAppointment.weight}</p>
                             </div>
                             <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 uppercase font-bold">Raza</p>
                                 <p className="text-sm font-bold text-gray-900 truncate px-1">{selectedAppointment.breed}</p>
                             </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Stethoscope size={16} className="text-[#2D5F5D]" />
                                    Motivo
                                </h3>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    {selectedAppointment.reason}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <ClipboardList size={16} className="text-[#2D5F5D]" />
                                    Notas
                                </h3>
                                <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-900">
                                    {selectedAppointment.notes}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};