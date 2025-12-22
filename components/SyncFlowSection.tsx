import React from 'react';
import { motion } from 'framer-motion';
import { Database, Smartphone, Monitor, ArrowRight, Zap, Bell, Mail } from 'lucide-react';

interface SyncFlowSectionProps {
  t: any;
}

export const SyncFlowSection: React.FC<SyncFlowSectionProps> = ({ t }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50/30 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-[#2D5F5D] tracking-wider uppercase mb-2">
            {t.ecosystem.title}
          </h2>
          <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Cómo viaja la información
          </p>
          <p className="text-lg text-gray-600">
            {t.ecosystem.subtitle}
          </p>
        </div>

        {/* The Flow Diagram */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            
            {/* Step 1: Vet Input */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center relative z-10">
                  <Monitor size={40} className="text-[#2D5F5D]" />
                  <div className="absolute -top-2 -right-2 bg-blue-100 p-1.5 rounded-full border border-white">
                    <PlusIcon />
                  </div>
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-teal-100 rounded-3xl animate-ping opacity-20 duration-1000"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.ecosystem.card1_title}</h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {t.ecosystem.card1_desc}
              </p>
            </div>

            {/* Step 2: Cloud Process (The Sync) */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                 {/* Animated Particles flowing to center */}
                 <motion.div 
                    className="absolute top-1/2 -left-[50%] w-[50%] h-1 bg-gradient-to-r from-transparent to-[#2D5F5D] hidden md:block"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                 />

                <div className="w-28 h-28 bg-[#2D5F5D] rounded-full shadow-2xl shadow-teal-900/20 flex items-center justify-center relative z-10">
                  <Database size={48} className="text-white" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.ecosystem.card2_title}</h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {t.ecosystem.card2_desc}
              </p>
              <div className="flex flex-col gap-2 mt-4">
                 <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5F5D] bg-teal-50 px-3 py-1 rounded-md">
                    <Zap size={12} /> Edge Functions
                 </div>
                 <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-md">
                    <Mail size={12} /> Magic Link Email
                 </div>
              </div>
            </div>

            {/* Step 3: Tutor Output */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                 {/* Animated Particles flowing from center */}
                 <motion.div 
                    className="absolute top-1/2 -right-[50%] w-[50%] h-1 bg-gradient-to-l from-transparent to-[#2D5F5D] hidden md:block"
                    style={{ left: '-50%' }}
                    initial={{ scaleX: 0, opacity: 0, originX: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                 />

                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center relative z-10">
                  <Smartphone size={40} className="text-blue-600" />
                  {/* Notification Badge Animation */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full border border-white shadow-sm"
                  >
                    <Bell size={14} fill="currentColor" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.ecosystem.card3_title}</h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {t.ecosystem.card3_desc}
              </p>
              <div className="mt-4 flex flex-col gap-1">
                 <div className="bg-white border border-gray-100 shadow-sm px-3 py-2 rounded-lg flex items-center gap-2 w-full max-w-[200px]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 text-left">
                        <div className="h-2 w-16 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1.5 w-24 bg-gray-100 rounded"></div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);