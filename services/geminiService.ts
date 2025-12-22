import { GoogleGenAI, Type } from "@google/genai";

// Inicialización perezosa (Lazy) para evitar errores si no hay API Key al inicio
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey.includes("PLACEHOLDER")) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateCreativePetNames = async (
  petType: string,
  personality: string,
  color: string
): Promise<{ names: string[]; explanation: string }> => {
  try {
    const ai = getAIClient();
    
    // Si no hay cliente (no hay Key), lanzamos error controlado para usar el fallback
    if (!ai) throw new Error("API Key missing");

    const model = "gemini-3-flash-preview";
    const prompt = `Genera 5 nombres creativos y únicos para un ${petType} de color ${color} que tiene una personalidad ${personality}. 
    También proporciona una frase corta y divertida explicando la vibra o el tema de estos nombres.
    IMPORTANTE: La respuesta debe estar completamente en ESPAÑOL.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Una lista de 5 nombres creativos para mascotas.",
            },
            explanation: {
              type: Type.STRING,
              description: "Una explicación corta y divertida del tema de los nombres en español.",
            },
          },
          required: ["names", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);
  } catch (error) {
    console.log("Usando respuesta predefinida (IA no configurada o error):", error);
    
    // Simular delay para parecer real
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Respuestas Fallback Inteligentes según el tipo
    const fallbacks: any = {
      'Perro': ["Firulais", "Rex", "Thor", "Lola", "Rocky"],
      'Gato': ["Michi", "Luna", "Simba", "Garfield", "Nala"],
    };

    const names = fallbacks[petType] || ["Pelusa", "Coco", "Manchitas", "Sunny", "Blue"];

    return {
      names: names,
      explanation: `Como estamos en modo demo (sin IA conectada), ¡aquí tienes unos clásicos infalibles para un ${petType} ${personality}!`,
    };
  }
};