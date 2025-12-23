import React, { useEffect, useMemo, useState } from 'react';
import { VetDashboardMockup } from './components/dashboard/VetDashboardMockup';
import { SyncFlowSection } from './components/SyncFlowSection';
import { ProductModules } from './components/ProductModules';
import { InteractivePreviews } from './components/InteractivePreviews';

type Language = 'es' | 'en' | 'pt';

type Translation = {
  hero: {
    title_1: string;
    title_highlight: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    rights: string;
  };
};

const translations: Record<Language, Translation> = {
  es: {
    hero: {
      title_1: 'Tu mascota, sus cosas,',
      title_highlight: 'sin el desorden de siempre',
      subtitle: 'Plataforma integral de tutores y veterinarios',
      cta: 'Conocer más',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    hero: {
      title_1: 'Your pet, their stuff,',
      title_highlight: 'without the usual mess',
      subtitle: 'Comprehensive platform for pet owners and veterinarians',
      cta: 'Learn more',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  pt: {
    hero: {
      title_1: 'Seu pet, as coisas dele,',
      title_highlight: 'sem a bagunça de sempre',
      subtitle: 'Plataforma para tutores e veterinários',
      cta: 'Saiba mais',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
    },
  },
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    try {
      const short = navigator.language?.split('-')[0];
      if (short === 'en' || short === 'pt') {
        setLang(short);
      }
    } catch {
      setLang('es');
    }
  }, []);

  const t = useMemo(() => {
    return translations[lang] ?? translations.es;
  }, [lang]);

  if (!t) {
    return null;
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-sans text-gray-900">
      {/* HERO */}
      <section className="pt-24 pb-16 text-center bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
          {t.hero.title_1}{' '}
          <span className="text-[#2D5F5D]">{t.hero.title_highlight}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {t.hero.subtitle}
        </p>

        <button
          onClick={() => scrollToSection('contact')}
          className="bg-[#2D5F5D] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#234948] transition"
        >
          {t.hero.cta}
        </button>

        <div className="max-w-6xl mx-auto mt-16 px-4">
          <VetDashboardMockup t={t} />
        </div>
      </section>

      <ProductModules />
      <SyncFlowSection t={t} />
      <InteractivePreviews />

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t border-gray-100 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>

          <form
            action="https://formspree.io/f/xaqwlqoo"
            method="POST"
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5F5D]"
            />

            <textarea
              name="message"
              placeholder="Tell us who you are"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5F5D]"
            />

            <button
              type="submit"
              className="w-full bg-[#2D5F5D] text-white py-3 rounded-xl font-semibold hover:bg-[#234948]"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-400 border-t">
        © 2025 PetSync. {t.footer.rights}
      </footer>
    </div>
  );
};

export default App;
