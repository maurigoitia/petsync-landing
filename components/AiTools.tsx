import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Button } from './Button';
import { generateCreativePetNames } from '../services/geminiService';

export const AiTools: React.FC = () => {
  const [petType, setPetType] = useState('Perro');
  const [personality, setPersonality] = useState('Juguetón');
  const [color, setColor] = useState('Dorado');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ names: string[]; explanation: string } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await generateCreativePetNames(petType, personality, color);
    setResult(data);
    setLoading(false);
  };

  return (
    <section id="ai-tools" className="py-24 bg-slate-900 relative overflow-hidden text-white">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Description */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-slate-200">Potenciado por Gemini AI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Conoce a tu Nuevo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Asistente de Mascotas IA</span>
            </h2>
            
            <p className="text-lg text-slate-300">
              PetSync no es solo almacenamiento. Es inteligencia. Usa nuestras herramientas de IA para generar planes de dieta, analizar síntomas o simplemente encontrar el nombre perfecto para el nuevo miembro de la familia.
            </p>

            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <span className="mr-3 p-1 bg-blue-500/20 rounded text-blue-400 font-bold">01</span>
                Recomendaciones de salud inteligentes basadas en raza y edad.
              </li>
              <li className="flex items-start">
                <span className="mr-3 p-1 bg-purple-500/20 rounded text-purple-400 font-bold">02</span>
                Ayudante de análisis de comportamiento.
              </li>
              <li className="flex items-start">
                <span className="mr-3 p-1 bg-teal-500/20 rounded text-teal-400 font-bold">03</span>
                ¡Herramientas divertidas como nuestro Generador de Nombres!
              </li>
            </ul>
          </div>

          {/* Interactive Tool Card */}
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Wand2 className="text-purple-400" size={20}/>
                Generador de Nombres
              </h3>
              <p className="text-sm text-slate-400">¡Pruébalo! Genera nombres únicos al instante.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tipo de Mascota</label>
                  <select 
                    value={petType} 
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Conejo">Conejo</option>
                    <option value="Ave">Ave</option>
                    <option value="Hámster">Hámster</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Color/Patrón</label>
                  <input 
                    type="text" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Ej. Negro, Manchas..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Personalidad</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Juguetón', 'Vago', 'Noble', 'Loco', 'Valiente', 'Tímido'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPersonality(p)}
                      className={`text-xs py-2 rounded-md transition-colors border ${
                        personality === p 
                        ? 'bg-blue-600 text-white border-blue-500' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white font-semibold shadow-lg shadow-purple-900/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Pensando Ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Nombres
                  </>
                )}
              </Button>
            </div>

            {/* Results Area */}
            {result && (
              <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 animate-fade-in">
                <p className="text-xs text-purple-300 mb-3 italic">"{result.explanation}"</p>
                <div className="flex flex-wrap gap-2">
                  {result.names.map((name, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-sm font-medium text-white hover:bg-slate-700 hover:border-purple-500 transition-colors cursor-default shadow-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};