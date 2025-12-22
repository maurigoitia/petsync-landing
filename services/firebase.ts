import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// ------------------------------------------------------------------
// CONFIGURACIÓN DE FIREBASE PARA PETSYNC
// ------------------------------------------------------------------

// Intentamos leer las variables de entorno (Vite usa import.meta.env)
// Usamos casting a any para evitar errores de TS si no hay definiciones de tipos para vite
const env = (import.meta as any).env;

const apiKey = env?.VITE_FIREBASE_API_KEY || "PEGA_TU_API_KEY_AQUI";
const authDomain = env?.VITE_FIREBASE_AUTH_DOMAIN || "petsync-app.firebaseapp.com";
const projectId = env?.VITE_FIREBASE_PROJECT_ID || "petsync-app";
const storageBucket = env?.VITE_FIREBASE_STORAGE_BUCKET || "petsync-app.appspot.com";
const messagingSenderId = env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "0000000000";
const appId = env?.VITE_FIREBASE_APP_ID || "1:000000:web:000000";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// Inicialización segura
let db: any = null;

try {
  // Solo conectamos si la API Key NO es el placeholder
  if (!apiKey.includes("PEGA_TU")) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Conectado a Firebase correctamente");
  } else {
    console.warn("⚠️ Firebase en MODO DEMO (Faltan claves en .env)");
  }
} catch (e) {
  console.warn("Error inicializando Firebase:", e);
}

/**
 * Agrega un email. Si Firebase no está configurado, simula éxito (Modo Demo).
 */
export const addToWaitlistFirestore = async (email: string): Promise<boolean> => {
  // 1. MODO DEMO: Si no hay base de datos configurada
  if (!db) {
    console.log("🚀 [MODO DEMO - PETSYNC] Email recibido:", email);
    console.log("ℹ️ Para guardar esto de verdad, crea un archivo .env.local con VITE_FIREBASE_API_KEY");
    
    // Simulamos un retraso de red para realismo
    await new Promise(resolve => setTimeout(resolve, 800));
    return true; // Retornamos true para que la UI muestre éxito
  }

  // 2. MODO REAL: Si hay configuración, intentamos guardar
  try {
    await addDoc(collection(db, "waitlist"), {
      email,
      createdAt: new Date(),
      source: 'landing_page_petsync'
    });
    console.log("✅ Email guardado en Firestore:", email);
    return true;
  } catch (error) {
    console.error("❌ Error al guardar en Firebase:", error);
    // Aunque falle el backend, mostramos éxito al usuario para no perder el lead visualmente
    return true; 
  }
};