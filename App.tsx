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
      q1: "¿PetSync tiene costo para los tutores de mascotas?",
      a1: "No, la aplicación móvil para tutores es completamente gratuita.",
      q2: "¿Soy veterinario independiente, PetSync me sirve?",
      a2: "Sí, desde veterinarios a domicilio hasta clínicas grandes.",
      q3: "¿Cómo se integra PetSync con mi sistema?",
      a3: "Contamos con una API para migración de datos.",
      q4: "¿Está segura la información?",
      a4: "Sí, usamos encriptación de grado bancario."
    },
    footer: {
      desc: "Información de salud y cuidados de tu mascota disponible digitalmente.",
      contact: "Contacto",
      privacy: "Privacidad",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: { contact: "Contact Us", lang: "Language" },
    hero: {
      title_1: "Your pet, their stuff,",
      title_highlight: "without the usual mess",
      subtitle: "Comprehensive platform for owners and vets",
      cta: "Learn more"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about PetSync",
      q1: "Is PetSync free?",
      a1: "Yes, for pet owners it is completely free.",
      q2: "Is PetSync for independent vets?",
      a2: "Yes, from solo vets to large clinics.",
      q3: "How does integration work?",
      a3: "We provide a robust API.",
      q4: "Is data secure?",
      a4: "Yes, bank-grade encryption."
    },
    footer: {
      desc: "Health and care information available digitally.",
      contact: "Contact",
      privacy: "Privacy",
      rights: "All rights reserved."
    }
  },
  pt: {
    nav: { contact: "Contato", lang: "Idioma" },
    hero: {
      title_1: "Seu pet, as coisas dele,",
      title_highlight: "sem a bagunça de sempre",
      subtitle: "Plataforma para tutores e veterinários",
      cta: "Saiba mais"
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber",
      q1: "O PetSync é gratuito?",
      a1: "Sim, para tutores é gratuito.",
      q2: "Serve para veterinários independentes?",
      a2: "Sim, de pequenos a grandes.",
      q3: "Como funciona a integração?",
      a3: "API disponível.",
      q4: "Os dados são seguros?",
      a4: "Sim, criptografia bancária."
    },
    footer: {
      desc: "Informações de saúde disponíveis digitalmente.",
      contact: "Contato",
      privacy: "Privacidade",
      rights: "Todos os direitos reservados."
    }
  }
};

type Language = 'es' | 'en' | 'pt';

/* =========================
   FORM (FORMSPREE)
========================= */
const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xaqwlqoo");

  if (state.succeeded) {
    return (
      <p className="text-green-600 font-semibold text-center">
        Thanks, we’ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="w-full px-5 py-3 rounded-xl border border-gray-300"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea
        id="message"
        name="message"
        placeholder="Tell us who you are"
        className="w-full px-5 py-3 rounded-xl border border-gray-300"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-[#2D5F5D] text-white py-3 rounded-xl font-semibold"
      >
        Send
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
    const short = navigator.language.split('-')[0];
    if (short === 'en' || short === 'pt') setLang(short as Language);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
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

      {/* CTA → SOLO FORM */}
      <section id="cta-footer" className="py-24 border-t">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-4xl font-bold">Contact</h2>
          <ContactForm />
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
