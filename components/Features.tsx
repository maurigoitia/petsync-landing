import React from 'react';
import { Database, ShieldCheck, Smartphone, Settings, Users, Activity } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Registro Simplificado',
    description: 'Un formulario de registro limpio y rápido para dar de alta a tus mascotas en segundos.',
    icon: Smartphone,
  },
  {
    title: 'Panel Administrativo',
    description: 'Gestión total de datos. Controla historiales, citas y documentos desde un solo lugar.',
    icon: Settings,
  },
  {
    title: 'Datos Centralizados',
    description: 'Toda la información de tus mascotas sincronizada y accesible cuando la necesites.',
    icon: Database,
  },
  {
    title: 'Seguridad Primero',
    description: 'Tus datos y los de tus mascotas están protegidos con los más altos estándares.',
    icon: ShieldCheck,
  },
  {
    title: 'Conexión Veterinaria',
    description: 'Comparte el perfil de tu mascota con tu veterinario de confianza fácilmente.',
    icon: Users,
  },
  {
    title: 'Seguimiento de Salud',
    description: 'Monitoreo de vacunas, peso y tratamientos activos.',
    icon: Activity,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Funcionalidades</h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Todo en Orden
          </p>
          <p className="mt-4 text-xl text-slate-500">
            Diseñado para simplificar la vida de los tutores de mascotas responsables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};