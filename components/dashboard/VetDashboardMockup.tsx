import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { VetHomeScreen } from './VetHomeScreen';

// ----------------------------------------------------------------------
// 1. EL TRUCO DEL IFRAME (FitViewportFrame)
// Este componente crea una "ventana virtual" de 1280px, incluso en un móvil.
// ----------------------------------------------------------------------

interface FitViewportFrameProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const FitViewportFrame = ({ children, width = 1280, height = 720 }: FitViewportFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    // Copiamos los estilos (Tailwind) de la web principal al iframe
    // para que el diseño se vea idéntico.
    const doc = iframe.contentDocument;
    if (doc) {
        doc.body.innerHTML = '';
        
        // Copiar hojas de estilo existentes
        Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach(style => {
            doc.head.appendChild(style.cloneNode(true));
        });

        // Asegurarse de que Tailwind CDN esté presente si no se copió via link/style
        const tailwindScript = document.createElement('script');
        tailwindScript.src = "https://cdn.tailwindcss.com";
        doc.head.appendChild(tailwindScript);

        // Crear contenedor raíz de 1280px
        const root = doc.createElement('div');
        root.style.width = `${width}px`;     // <-- AQUÍ ESTÁ LA CLAVE: ANCHO FIJO
        root.style.minHeight = `${height}px`;
        root.style.height = '100%';
        root.style.backgroundColor = '#f9fafb';
        root.style.overflow = 'hidden'; // Sin barras de scroll internas
        
        doc.body.appendChild(root);
        doc.body.style.margin = '0';
        doc.body.style.overflow = 'hidden';
        
        setMountNode(root);
    }
  }, [width, height]);

  return (
    <iframe
      ref={iframeRef}
      className="border-0 w-full h-full pointer-events-auto"
      scrolling="no"
      style={{ width: '100%', height: '100%' }}
      title="Desktop Preview"
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

// ----------------------------------------------------------------------
// 2. EL COMPONENTE PRINCIPAL QUE ESCALA
// ----------------------------------------------------------------------
export function VetDashboardMockup({ t }: { t: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Esta función calcula cuánto debemos encoger el iframe
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const parentWidth = window.innerWidth - 32; // Restamos padding aproximado
      const desktopWidth = 1280; // El ancho original del diseño
      
      // Si la pantalla es menor a 1280px, calculamos el porcentaje de reducción
      const scale = Math.min(parentWidth / desktopWidth, 1);
      
      // Aplicamos el scale pero necesitamos compensar el espacio blanco que deja scale()
      // Como scale encoge hacia el centro o top-left, lo forzamos a top-left.
      containerRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.transformOrigin = 'top left';
      
      // Ajustamos el contenedor padre para que no ocupe 1280px de alto, sino el alto escalado
      const scaledHeight = 800 * scale; 
      if (containerRef.current.parentElement) {
          containerRef.current.parentElement.style.height = `${scaledHeight}px`;
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mx-auto relative z-10"
    >
      {/* 
         VERSIÓN MÓVIL/TABLET (Con el truco):
         Ocultamos el componente real y mostramos el iframe escalado.
         Usamos lg:hidden para que en pantallas muy grandes se vea el normal.
      */}
      <div className="lg:hidden w-full overflow-hidden relative">
         <div 
           ref={containerRef}
           className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
           style={{ width: 1280, height: 800 }} // <-- Forzamos tamaño escritorio base
         >
            {/* Explicitly passing children to fix 'property missing' error */}
            <FitViewportFrame width={1280} height={800} children={<VetHomeScreen t={t} />} />
         </div>
      </div>

      {/* 
         VERSIÓN ESCRITORIO (Normal):
         Aquí no necesitamos trucos, se renderiza tal cual en su grid.
      */}
      <div className="hidden lg:block w-full h-[800px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <VetHomeScreen t={t} />
      </div>
    </motion.div>
  );
}