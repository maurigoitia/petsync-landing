import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "Dra. Ana Martínez",
    role: "Veterinaria",
    content: "PetSync ha organizado la manera en que mis pacientes comparten su historial. Es limpio, rápido y eficiente.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Carlos Ruiz",
    role: "Tutor de Max",
    content: "Por fin tengo todas las cosas de Max en orden. Las alertas de vacunas me han salvado más de una vez.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Laura Gómez",
    role: "Tutora de 3 Gatos",
    content: "La interfaz es hermosa y muy fácil de usar. Me encanta poder tener perfiles separados para cada uno de mis gatos.",
    avatar: "https://picsum.photos/100/100?random=3"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Lo que dicen nuestros usuarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col h-full">
              <div className="flex space-x-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
              </div>
              <p className="text-slate-700 italic mb-6 flex-grow">"{t.content}"</p>
              <div className="flex items-center mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3 object-cover bg-slate-200" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};