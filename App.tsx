import React, { useState, useEffect } from 'react';
import { VetDashboardMockup } from './components/dashboard/VetDashboardMockup';
import { SyncFlowSection } from './components/SyncFlowSection';
import { ProductModules } from './components/ProductModules';
import { InteractivePreviews } from './components/InteractivePreviews';

/* =========================
   TRANSLATIONS
========================= */
const translations = {
  es: {
    hero: {
      title_1: "Tu mascota, sus cosas,",
      title_highlight: "sin el desorden de siempre",
      subtitle: "Plataforma integral de tutores y veterinarios"
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    hero: {
      title_1: "Your pet, their stuff,",
      title_highlight: "without the usual mess",
      subtitle: "Comprehensive platform for owners and vets"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  pt: {
    hero: {
      title_1: "Seu pet, as coisas dele,",
      title_highlight: "sem a bagunça de sempre",
      subtitle: "Plataforma para tutores e veterinários"
    },
    footer: {
      rights: "Todos os direitos reservados."
    }
  }
};

type Language = 'es' | 'en' | 'pt';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const short = navigator.language.split('-')[0];
    if (short === 'en' || short === 'pt') setLang(short as Language);
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-gray-900">

      {/* HERO */}
      <section className="py-24 text-center bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
          {t.hero.title_1}{' '}
          <span className="text-[#2D5F5D]">{t.hero.title_highlight}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
      </section>

      <ProductModules />
      <SyncFlowSection t={t} />
      <InteractivePreviews />

      {/* CTA – FORM REAL */}
      <section
        id="cta-footer"
        className="py-24 border-t border-gray-100 bg-white"
      >
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Contact
          </h2>

          <form
            action="https://formspree.io/f/xaqwlqoo"
            method="POST"
            className="space-y-4 text-left"
          >
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2D5F5D] focus:outline-none"
            />

            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell us if you are a vet or a pet owner"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2D5F5D] focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#2D5F5D] hover:bg-[#234948] text-white font-semibold py-3 rounded-xl transition"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-sm text-gray-500">
        © 2025 PetSync. {t.footer.rights}
      </footer>
    </div>
  );
};

export default App;
