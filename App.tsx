import React, { useState, useEffect } from 'react';
import { VetDashboardMockup } from './components/dashboard/VetDashboardMockup';
import { SyncFlowSection } from './components/SyncFlowSection';
import { ProductModules } from './components/ProductModules';
import { InteractivePreviews } from './components/InteractivePreviews';
import { useForm, ValidationError } from '@formspree/react';

/* =========================
   TRANSLATIONS (SIN CTA)
========================= */
const translations = {
  es: {
    nav: { contact: "Contactanos", lang: "Idioma" },
    hero: {
      title_1: "Tu mascota, sus cosas,",
      title_highlight: "sin el desorden de siempre",
      subtitle: "Plataforma integral de tutores y veterinarios",
      cta: "Conocer más"
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre PetSync",
      q1: "¿PetSync tiene costo para los tutores?",
      a1: "No, es completamente gratuita."
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: { contact: "Contact", lang: "Language" },
    hero: {
      title_1: "Your pet, their stuff,",
      title_highlight: "without the usual mess",
      subtitle: "Platform for pet owners and vets",
      cta: "Learn more"
    },
    faq: {
      title: "FAQ",
      subtitle: "What you need to know",
      q1: "Is PetSync free?",
      a1: "Yes, for pet owners."
    },
    footer: {
      rights: "All rights reserved."
    }
  }
};

type Language = 'es' | 'en';

/* =========================
   FORMSPREE FORM
========================= */
const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xaqwlqoo");

  if (state.succeeded) {
    return (
      <p className="text-green-600 font-semibold text-center">
        Thanks, we’ll contact you shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-4"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@email.com"
        className="w-full px-5 py-3 rounded-xl border border-gray-300"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea
        name="message"
        placeholder="Tell us if you are a vet or pet owner"
        className="w-full px-5 py-3 rounded-xl border border-gray-300"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-[#2D5F5D] text-white py-3 rounded-xl font-semibold"
      >
        {state.submitting ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
};

/* =========================
   APP
========================= */
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const t = translations[lang];

  useEffect(() => {
    const l = navigator.language.startsWith('en') ? 'en' : 'es';
    setLang(l);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-gray-900">
      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold">
          {t.hero.title_1}{' '}
          <span className="text-[#2D5F5D]">{t.hero.title_highlight}</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">{t.hero.subtitle}</p>
      </section>

      <ProductModules />
      <SyncFlowSection t={t} />
      <InteractivePreviews />

      {/* CTA = FORM */}
      <section
        id="cta-footer"
        className="py-24 border-t flex justify-center"
      >
        <ContactForm />
      </section>

      <footer className="py-10 text-center text-sm text-gray-400">
        © 2025 PetSync. {t.footer.rights}
      </footer>
    </div>
  );
};

export default App;
