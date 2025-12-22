import React from 'react';
import { Button } from './Button';

export const Cta: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para poner las cosas de tu mascota en orden?
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          Únete a PetSync hoy y experimenta la tranquilidad de tener toda la información importante siempre a mano.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white border-none">
            Crear Cuenta Gratis
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-white">
            Contactar Soporte
          </Button>
        </div>
      </div>
    </section>
  );
};