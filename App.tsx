import React, { useState, useEffect } from 'react';
import { VetDashboardMockup } from './components/dashboard/VetDashboardMockup';
import { SyncFlowSection } from './components/SyncFlowSection';
import { ProductModules } from './components/ProductModules';
import { InteractivePreviews } from './components/InteractivePreviews';
import { addToWaitlistFirestore } from './services/firebase';

// --- Diccionario de Traducciones ---
const translations = {
  es: {
    nav: {
      contact: "Contactanos",
      lang: "Idioma"
    },
    hero: {
      title_1: "Tu mascota, sus cosas,",
      title_highlight: "sin el desorden de siempre",
      subtitle: "Plataforma integral de tutores y veterinarios",
      cta: "Conocer más"
    },
    dashboard: {
      search_placeholder: "Buscar pacientes, historias clínicas...",
      welcome: "Bienvenida",
      system_online: "Sistema en línea",
      date: "Miércoles, 17 de diciembre de 2025",
      stats: {
        appointments: "Citas para Hoy",
        patients: "Pacientes Activos",
        sync: "Sincronización"
      },
      upcoming_title: "Próximas Citas",
      btn_register: "Registrar Consulta",
      activity_title: "Actividad Reciente",
      card_treatment: "En Tratamiento",
      card_recipes: "Recetas Emitidas",
      card_status: "Estado de Clínica",
      nav_home: "Inicio",
      nav_patients: "Pacientes",
      nav_agenda: "Agenda",
      nav_consultations: "Consultas",
      nav_settings: "Configuración"
    },
    features: {
      title_module: "Módulo Veterinario",
      subtitle_module: "Gestión integral con datos reales de tu clínica en tiempo real.",
      app_title: "App Móvil para Tutores",
      app_subtitle: "Tus clientes reciben la historia clínica, recordatorios y turnos automáticamente en su celular.",
      f1_title: "Historia Médica Completa",
      f1_desc: "Acceso a vacunas, estudios y diagnósticos previos.",
      f2_title: "Próximos Turnos",
      f2_desc: "Visualización clara de la agenda futura.",
      f3_title: "Recordatorios Inteligentes",
      f3_desc: "Alertas para vacunas, medicación e higiene.",
      f4_title: "Multi-Mascota",
      f4_desc: "Gestión de varios perfiles desde una sola cuenta."
    },
    ecosystem: {
      title: "El Flujo de Datos",
      subtitle: "Un ecosistema conectado que automatiza la comunicación.",
      card1_title: "1. Vet Carga Datos",
      card1_desc: "Registra consultas, sube estudios o crea recetas en el Dashboard.",
      card2_title: "2. Sincronización",
      card2_desc: "La nube procesa la información y detecta al tutor.",
      card3_title: "3. Tutor Recibe",
      card3_desc: "Notificación Push instantánea con la información actualizada."
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre PetSync",
      q1: "¿PetSync tiene costo para los tutores de mascotas?",
      a1: "No, la aplicación móvil para tutores es completamente gratuita. Puedes gestionar el perfil de tus mascotas, recibir recordatorios y ver su historial médico sin costo alguno.",
      q2: "¿Soy veterinario independiente, PetSync me sirve?",
      a2: "¡Absolutamente! PetSync está diseñado para escalar. Desde veterinarios a domicilio que necesitan historias clínicas digitales hasta grandes hospitales veterinarios.",
      q3: "¿Soy una clínica grande, cómo se integra PetSync con mi sistema actual?",
      a3: "Contamos con una API robusta que permite la migración de datos. Ponte en contacto con nuestro equipo de soporte para evaluar tu sistema actual y planificar una integración sin problemas.",
      q4: "¿Está segura la información de mi mascota?",
      a4: "Sí, la seguridad es nuestra prioridad. Utilizamos encriptación de grado bancario para todos los datos y cumplimos con las normativas de protección de datos vigentes."
    },
    cta: {
      title: "Obtén acceso anticipado a PetSync",
      subtitle: "Únete a la lista de espera y te avisaremos cuando tu clínica pueda conectar con los tutores.",
      email_placeholder: "tu@email.com",
      btn_submit: "Unirme a la lista",
      btn_loading: "Enviando...",
      success_msg: "¡Gracias! Te avisaremos pronto.",
      spam_notice: "" 
    },
    footer: {
      desc: "Información de salud y cuidados de tu mascota disponible en tus dispositivos digitales.",
      contact: "Contacto",
      privacy: "Privacidad",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      contact: "Contact Us",
      lang: "Language"
    },
    hero: {
      title_1: "Your pet, their stuff,",
      title_highlight: "without the usual mess",
      subtitle: "Comprehensive platform for pet owners and veterinarians",
      cta: "Learn more"
    },
    dashboard: {
      search_placeholder: "Search patients, medical records...",
      welcome: "Welcome",
      system_online: "System Online",
      date: "Wednesday, December 17, 2025",
      stats: {
        appointments: "Appointments Today",
        patients: "Active Patients",
        sync: "Synchronization"
      },
      upcoming_title: "Upcoming Appointments",
      btn_register: "Register Visit",
      activity_title: "Recent Activity",
      card_treatment: "In Treatment",
      card_recipes: "Prescriptions Issued",
      card_status: "Clinic Status",
      nav_home: "Home",
      nav_patients: "Patients",
      nav_agenda: "Calendar",
      nav_consultations: "Consultations",
      nav_settings: "Settings"
    },
    features: {
      title_module: "Veterinary Module",
      subtitle_module: "Comprehensive management with real-time clinic data.",
      app_title: "Mobile App for Owners",
      app_subtitle: "Your clients receive medical history, reminders, and appointments automatically on their phone.",
      f1_title: "Complete Medical History",
      f1_desc: "Access to vaccines, studies, and previous diagnoses.",
      f2_title: "Upcoming Appointments",
      f2_desc: "Clear visualization of future schedule.",
      f3_title: "Smart Reminders",
      f3_desc: "Alerts for vaccines, medication, and hygiene.",
      f4_title: "Multi-Pet",
      f4_desc: "Manage multiple profiles from a single account."
    },
    ecosystem: {
      title: "Data Flow",
      subtitle: "A connected ecosystem that automates communication.",
      card1_title: "1. Vet Input",
      card1_desc: "Vet logs consultations, uploads labs, or creates prescriptions.",
      card2_title: "2. Synchronization",
      card2_desc: "The cloud processes info and matches the owner.",
      card3_title: "3. Owner Receives",
      card3_desc: "Instant Push Notification with updated information."
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about PetSync",
      q1: "Is PetSync free for pet owners?",
      a1: "Yes, the mobile app for owners is completely free. You can manage your pets' profiles, receive reminders, and view medical history at no cost.",
      q2: "I'm an independent vet, is PetSync for me?",
      a2: "Absolutely! PetSync is designed to scale. From house-call vets needing digital records to large veterinary hospitals.",
      q3: "I'm a large clinic, how does PetSync integrate with my system?",
      a3: "We have a robust API for data migration. Contact our support team to assess your current system and plan a seamless integration.",
      q4: "Is my pet's information secure?",
      a4: "Yes, security is our priority. We use bank-grade encryption for all data and comply with current data protection regulations."
    },
    cta: {
      title: "Get early access to PetSync",
      subtitle: "Join the waitlist and we'll notify you when your clinic connects with owners.",
      email_placeholder: "your@email.com",
      btn_submit: "Join the Waitlist",
      btn_loading: "Sending...",
      success_msg: "Thanks! We'll notify you soon.",
      spam_notice: ""
    },
    footer: {
      desc: "Health information and care for your pet available on your digital devices.",
      contact: "Contact",
      privacy: "Privacy",
      rights: "All rights reserved."
    }
  },
  pt: {
    nav: {
      contact: "Contate-nos",
      lang: "Idioma"
    },
    hero: {
      title_1: "Seu pet, as coisas dele,",
      title_highlight: "sem a bagunça de sempre",
      subtitle: "Plataforma abrangente para tutores e veterinários",
      cta: "Saiba mais"
    },
    dashboard: {
      search_placeholder: "Buscar pacientes, prontuários...",
      welcome: "Bem-vinda",
      system_online: "Sistema Online",
      date: "Quarta-feira, 17 de Dezembro de 2025",
      stats: {
        appointments: "Consultas Hoje",
        patients: "Pacientes Ativos",
        sync: "Sincronização"
      },
      upcoming_title: "Próximas Consultas",
      btn_register: "Registrar Consulta",
      activity_title: "Atividade Recente",
      card_treatment: "Em Tratamento",
      card_recipes: "Receitas Emitidas",
      card_status: "Status da Clínica",
      nav_home: "Início",
      nav_patients: "Pacientes",
      nav_agenda: "Agenda",
      nav_consultations: "Consultas",
      nav_settings: "Configurações"
    },
    features: {
      title_module: "Módulo Veterinário",
      subtitle_module: "Gestão integral com dados reais da sua clínica em tempo real.",
      app_title: "App Móvil para Tutores",
      app_subtitle: "Seus clientes recebem histórico médico, lembretes e agendamentos automaticamente no celular.",
      f1_title: "Histórico Médico Completo",
      f1_desc: "Acesso a vacinas, exames e diagnósticos anteriores.",
      f2_title: "Próximos Agendamentos",
      f2_desc: "Visualização clara da agenda futura.",
      f3_title: "Lembretes Inteligentes",
      f3_desc: "Alertas para vacinas, medicação e higiene.",
      f4_title: "Multi-Pet",
      f4_desc: "Gestão de vários perfis em uma única conta."
    },
    ecosystem: {
      title: "Fluxo de Dados",
      subtitle: "Um ecossistema conectado que automatiza a comunicação.",
      card1_title: "1. Veterinário Insere",
      card1_desc: "Registra consultas, carrega exames ou cria receitas.",
      card2_title: "2. Sincronização",
      card2_desc: "A nuvem processa as informações e detecta o tutor.",
      card3_title: "3. Tutor Recebe",
      card3_desc: "Notificação Push instantânea com as informações atualizadas."
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre o PetSync",
      q1: "O PetSync tem custo para os tutores?",
      a1: "Não, o aplicativo móvel para tutores é totalmente gratuito. Você pode gerenciar o perfil dos seus pets, receber lembretes e ver o histórico médico sem custo.",
      q2: "Sou veterinário independente, o PetSync serve para mim?",
      a2: "Com certeza! O PetSync foi projetado para escalar. Desde veterinários que atendem em domicílio até grandes hospitais veterinários.",
      q3: "Sou uma clínica grande, como o PetSync se integra ao meu sistema?",
      a3: "Temos uma API robusta que permite a migração de dados. Entre em contato com nossa equipe de suporte para avaliar seu sistema atual e planejar a integração.",
      q4: "A informação do meu pet está segura?",
      a4: "Sim, a segurança é nossa prioridade. Usamos criptografia de nível bancário para todos os dados e cumprimos as normas de proteção de dados vigentes."
    },
    cta: {
      title: "Tenha acesso antecipado ao PetSync",
      subtitle: "Entre na lista de espera e avisaremos quando sua clínica puder se conectar com los tutores.",
      email_placeholder: "seu@email.com",
      btn_submit: "Entrar na lista",
      btn_loading: "Enviando...",
      success_msg: "Obrigado! Avisaremos em breve.",
      spam_notice: ""
    },
    footer: {
      desc: "Informações de saúde e cuidados do seu pet disponíveis em seus dispositivos digitais.",
      contact: "Contato",
      privacy: "Privacidad",
      rights: "Todos os direitos reservados."
    }
  }
};

type Language = 'es' | 'en' | 'pt';

// --- Componente: Formulario de Lista de Espera ---
const WaitlistForm = ({ t }: { t: any }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // --- CONFIGURACIÓN GOOGLE FORM (FALLBACK) ---
  const EMAIL_ENTRY_ID = "entry.2005620554"; 
  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/1McLnGa-xhrFXyfHvJdhBjPrg733YVgF5eHvrOYlvwsI/formResponse";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // 1. Intentar guardar en Firestore
    const savedInFirestore = await addToWaitlistFirestore(email);

    if (savedInFirestore) {
      setStatus('success');
      setEmail('');
      return;
    }

    // 2. Fallback a Google Forms si Firestore falla (ej: sin API Key configurada)
    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, email);
    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error("Error al enviar formulario", err);
      // Asumimos éxito incluso con error de CORS en Google Forms
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span className="font-semibold">{t.cta.success_msg}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3">
      <input 
        type="email" 
        placeholder={t.cta.email_placeholder} 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5F5D] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-8 py-3 bg-[#2D5F5D] hover:bg-[#234948] text-white text-base font-semibold shadow-lg shadow-teal-900/10 hover:shadow-teal-900/20 transition-all rounded-xl disabled:opacity-70 disabled:cursor-wait"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {t.cta.btn_loading}
          </>
        ) : (
          t.cta.btn_submit
        )}
      </button>
    </form>
  );
};

// --- Componente: FAQ Item ---
const FAQItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 mb-3">
      <button 
        onClick={onClick}
        className="w-full p-5 lg:p-6 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <div className="flex-1">
          <h3 className={`font-bold text-base lg:text-lg pr-4 transition-colors ${isOpen ? 'text-[#2D5F5D]' : 'text-gray-900'}`}>
            {question}
          </h3>
        </div>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-[#2D5F5D] rotate-45' : 'bg-gray-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-[#2D5F5D]'}`}><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 lg:p-6 pt-0 text-gray-600 text-sm lg:text-base leading-relaxed border-t border-gray-50 mt-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<Language>('es');

  // Detección automática de idioma
  useEffect(() => {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang) {
      const shortLang = browserLang.split('-')[0].toLowerCase();
      if (shortLang === 'pt') {
        setLang('pt');
      } else if (shortLang === 'en') {
        setLang('en');
      } else {
        setLang('es');
      }
    }
  }, []);

  const t = translations[lang];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] scroll-smooth font-sans text-gray-900">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5F5D] rounded-lg">
              <img src="https://petsync.net/_assets/v11/e4b9cb13fdb59713820f2da9cb50d2aa5431cc45.png" alt="PetSync" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-[#2D5F5D]">PetSync</span>
            </a>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#2D5F5D]">
                  <span className="uppercase">{lang}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button onClick={() => setLang('es')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2D5F5D]">Español</button>
                  <button onClick={() => setLang('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2D5F5D]">English</button>
                  <button onClick={() => setLang('pt')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2D5F5D]">Português</button>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('cta-footer')}
                className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm bg-[#2D5F5D] text-white px-5 py-2.5 rounded-full hover:bg-[#1F4F52] transition-all duration-300 font-semibold shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5F5D] focus-visible:ring-offset-2 h-auto"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero Section */}
        <div className="relative z-10">
          <section className="relative lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-16 pb-12 lg:pt-24 lg:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6 tracking-tight">
                  {t.hero.title_1} <span className="text-[#2D5F5D] inline-block">{t.hero.title_highlight}</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="items-center justify-center gap-2 whitespace-nowrap inline-block bg-[#2D5F5D] text-white px-8 py-4 h-auto rounded-2xl font-semibold shadow-xl hover:bg-[#234948] hover:shadow-2xl transition-all text-lg transform hover:-translate-y-1"
                  >
                    {t.hero.cta}
                  </button>
                </div>
              </div>

              {/* Dashboard Preview (Visual Hook) */}
              <div className="max-w-6xl mx-auto relative px-2 sm:px-0">
                 {/* Aquí usamos el nuevo Mockup escalable */}
                 <VetDashboardMockup t={t} />
              </div>
            </div>
          </section>
        </div>

        {/* --- Features (El Input - Módulo Veterinario) --- */}
        <ProductModules />

        {/* --- Sync Flow (El Proceso - Animación) --- */}
        <SyncFlowSection t={t} />

        {/* --- App Mobile (El Output - Tutor) --- */}
        <InteractivePreviews />

        {/* FAQ Section */}
        <section id="faq-section" className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t.faq.title}</h2>
              <p className="text-lg text-gray-600">{t.faq.subtitle}</p>
            </div>
            <div className="space-y-4">
              {faqData.map((item, idx) => (
                <FAQItem 
                  key={idx} 
                  question={item.q} 
                  answer={item.a} 
                  isOpen={openFaqIndex === idx} 
                  onClick={() => toggleFaq(idx)} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-footer" className="py-16 md:py-28 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center gap-8 max-w-[340px] md:max-w-3xl mx-auto">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{t.cta.title}</h2>
                <p className="text-base md:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto">{t.cta.subtitle}</p>
              </div>
              
              <div className="w-full max-w-md">
                 <WaitlistForm t={t} />
              </div>

              <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">{t.cta.spam_notice}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <img src="https://petsync.net/_assets/v11/e4b9cb13fdb59713820f2da9cb50d2aa5431cc45.png" alt="PetSync" className="h-7 w-auto" />
              <span className="text-lg font-bold text-gray-800">PetSync</span>
            </div>
            <span className="hidden md:block text-gray-300 h-5 border-l border-gray-300 mx-2"></span>
            <p className="text-sm text-gray-500 max-w-xs md:max-w-md">{t.footer.desc}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="mailto:thor@petsync.net" className="hover:text-[#2D5F5D] transition-colors">{t.footer.contact}</a>
              <a href="#" className="hover:text-[#2D5F5D] transition-colors">FAQ</a>
              <a href="#" className="hover:text-[#2D5F5D] transition-colors">{t.footer.privacy}</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/petsync-app" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#2D5F5D] hover:bg-gray-50 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/petsyncapp" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#2D5F5D] hover:bg-gray-50 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="mailto:thor@petsync.net" className="p-2 text-gray-400 hover:text-[#2D5F5D] hover:bg-gray-50 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-50 w-full text-center">
          <p className="text-xs text-gray-400">© 2025 PetSync. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;