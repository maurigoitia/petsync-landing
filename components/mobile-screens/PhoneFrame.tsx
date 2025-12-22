import React, { ReactNode } from 'react';
import { Home, Calendar, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhoneFrameProps {
  children?: ReactNode;
  activeTab?: 'home' | 'calendar' | 'alerts' | 'profile';
  delay?: number;
}

export function PhoneFrame({ children, activeTab = 'home', delay = 0 }: PhoneFrameProps) {
  const currentTime = "14:30"; 

  const getIconColor = (tab: string) => activeTab === tab ? "text-[#2D5F5D]" : "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative flex justify-center w-full"
    >
      {/* 
        REALISTIC PHONE BORDER 
        - Outer border: Gray-900
        - Inner border (Screen edge): Black
        - Shadow: Double shadow for depth
      */}
      <div className="w-full max-w-[280px] aspect-[9/18.5] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_0_2px_#374151] h-auto relative overflow-hidden ring-4 ring-gray-950/50">
        
        {/* Screen Container */}
        <div className="w-full h-full bg-white rounded-[2.2rem] sm:rounded-[2.7rem] overflow-hidden flex flex-col relative border-[3px] border-black mask-image:radial-gradient(white, black)">
          
          {/* Dynamic Island / Notch Placeholder (Optional, simple dot for now) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-50 flex justify-center items-center">
             <div className="w-12 h-1 bg-gray-800 rounded-full opacity-50"></div>
          </div>

          {/* Status Bar */}
          <div className="px-6 pt-3 pb-2 flex items-center justify-between z-10 select-none bg-white/90 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-gray-900 pl-1">{currentTime}</span>
            <div className="flex items-center gap-1 pr-1">
              <div className="w-4 h-2.5 border border-gray-400 rounded-[3px] relative">
                  <div className="absolute inset-[1px] bg-black rounded-[1px] w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-teal-50/50 to-emerald-50/50">
            {children}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-100 px-6 py-3 pb-5 flex items-center justify-around z-10 select-none">
            <NavIcon icon={Home} label="Inicio" color={getIconColor('home')} />
            <NavIcon icon={Calendar} label="Agenda" color={getIconColor('calendar')} />
            <NavIcon icon={Bell} label="Alertas" color={getIconColor('alerts')} />
            <NavIcon icon={User} label="Perfil" color={getIconColor('profile')} />
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50 opacity-20"></div>
        </div>
      </div>
    </motion.div>
  );
}

function NavIcon({ icon: Icon, label, color }: any) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors">
      <Icon className={`w-5 h-5 ${color}`} strokeWidth={2.5} />
      <span className={`text-[9px] font-bold ${color.replace('text-', 'text-')}`}>{label}</span>
    </div>
  );
}