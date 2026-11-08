import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Layers,
  Droplets,
  Thermometer,
  Wrench,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Lightbulb,
} from 'lucide-react';

interface FormulaAssistantProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

const COMMON_INGREDIENTS = [
  'Milho Moído Fino',
  'Farelo de Soja 46%',
  'Farelo de Trigo',
  'Polpa Cítrica Peletizada',
  'Casquinha de Soja',
  'Caroço de Algodão',
  'Melaço de Cana (Aglutinante)',
  'Núcleo Mineral / Vitamínico',
  'Feno de Tifton Picado',
  'Quirera de Arroz',
];

export const FormulaAssistant: React.FC<FormulaAssistantProps> = ({ onOpenWhatsApp }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Milho Moído Fino',
    'Farelo de Soja 46%',
    'Núcleo Mineral / Vitamínico',
  ]);
  const [animalCategory, setAnimalCategory] = useState('Bovinos de Confinamento');
  const [targetVolume, setTargetVolume] = useState('500 kg/dia');
  const [customNotes, setCustomNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adviceText, setAdviceText] = useState<string | null>(null);

  const toggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      if (selectedIngredients.length > 1) {
        setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
      }
    } else {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  const generateAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/formula-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: selectedIngredients.join(', ') + (customNotes ? ` (${customNotes})` : ''),
          animalType: animalCategory,
          targetProduction: targetVolume,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdviceText(data.advice);
      } else {
        throw new Error('Fallback to local zootecnist advice');
      }
    } catch {
      // High-quality deterministic fallback
      setAdviceText(`Recomendação Técnica SAPEM para ${animalCategory}:
1. Proporção Sugerida da Mistura:
- 60% ${selectedIngredients[0] || 'Milho Moído'} (base energética)
- 25% ${selectedIngredients[1] || 'Farelo de Soja'} (proteína bruta)
- 10% de volumoso fino ou farelo de trigo para melhor fibra
- 5% Núcleo mineral específico para a categoria

2. Nível Ideal de Umidade na Peletização:
- A massa deve entrar na matriz com 13% a 14,5% de umidade. Faça o teste da mão: aperte uma porção na palma; se formar um bolinho firme sem esfarelar e sem molhar os dedos, o ponto de peletização está perfeito!

3. Matriz Recomendada:
- Matriz de 6.0mm para bovinos / ovinos ou 4.0mm para suínos e aves.

4. Dica de Ouro de Operação:
- Comece o trabalho com uma mistura levemente untada com 1% de óleo vegetal para aquecer e lubrificar os furos da matriz antes de acelerar a carga máxima.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsultOnWhatsApp = () => {
    const msg = `Olá equipe técnica da SAPEM! Quero peletizar para ${animalCategory} usando meus insumos:
Ingredientes: ${selectedIngredients.join(', ')}
Produção estimada: ${targetVolume}

Gostaria da avaliação do zootecnista de vocês sobre qual modelo de peletizadora SAPEM é o ideal.`;
    onOpenWhatsApp(msg);
  };

  return (
    <section id="assistente" className="py-16 md:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-amber-700" />
            Assistente Técnico de Formulação
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display">
            A sua receita, do seu jeito, na sua propriedade
          </h2>
          <p className="text-stone-600 text-base md:text-lg">
            Selecione os ingredientes que você produz ou tem acesso na sua região e receba orientações zootécnicas para uma peletização perfeita.
          </p>
        </div>

        {/* Interactive Formula Builder Box */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form & Insumos */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  1. Para qual animal você vai fabricar?
                </label>
                <select
                  value={animalCategory}
                  onChange={(e) => setAnimalCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                >
                  <option value="Bovinos de Confinamento / Engorda">Bovinos de Confinamento / Engorda</option>
                  <option value="Vacas de Leite em Lactação">Vacas de Leite em Lactação</option>
                  <option value="Suínos (Creche e Terminação)">Suínos (Creche e Terminação)</option>
                  <option value="Aves (Frango de Corte e Poedeiras)">Aves (Frango de Corte e Poedeiras)</option>
                  <option value="Ovinos e Caprinos">Ovinos e Caprinos</option>
                  <option value="Equinos de Trabalho e Esporte">Equinos de Trabalho e Esporte</option>
                  <option value="Piscicultura (Tilápias)">Piscicultura (Tilápias)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  2. Quais insumos você tem disponíveis na propriedade?
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_INGREDIENTS.map((ing) => {
                    const isSelected = selectedIngredients.includes(ing);
                    return (
                      <button
                        key={ing}
                        type="button"
                        onClick={() => toggleIngredient(ing)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-black border-amber-500 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {ing}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  3. Produção diária pretendida:
                </label>
                <input
                  type="text"
                  value={targetVolume}
                  onChange={(e) => setTargetVolume(e.target.value)}
                  placeholder="Ex: 500 kg/dia ou 2 toneladas por semana"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800 focus:border-amber-500 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={generateAdvice}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 ring-1 ring-amber-400/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                    <span>Calculando Ponto de Peletização...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Gerar Dica Zootécnica de Peletização</span>
                  </>
                )}
              </button>

            </div>

            {/* Right Column: AI Output or Default Guidance */}
            <div className="lg:col-span-6 bg-stone-950 text-white rounded-2xl p-6 flex flex-col justify-between border border-stone-800 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Orientação Técnica da Fábrica SAPEM
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    Engenharia Agronômica
                  </span>
                </div>

                {adviceText ? (
                  <div className="text-xs sm:text-sm text-stone-200 whitespace-pre-line leading-relaxed space-y-3 font-sans max-h-96 overflow-y-auto pr-1">
                    {adviceText}
                  </div>
                ) : (
                  <div className="space-y-4 py-6 text-center text-stone-400">
                    <Droplets className="w-12 h-12 text-amber-400 mx-auto opacity-70" />
                    <p className="text-sm">
                      Selecione seus ingredientes ao lado e clique em{' '}
                      <strong className="text-amber-400">Gerar Dica Zootécnica</strong> para ver a proporção de umidade, temperatura e matriz ideal.
                    </p>
                    <div className="text-xs text-stone-400 bg-stone-900/90 p-3 rounded-xl border border-stone-800 inline-block text-left">
                      💡 <strong>Sabia que:</strong> Peletizar com 13% de umidade garante que o pellet saia brilhante, firme e sem esfarelar no saco ou no cocho.
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom WhatsApp Button */}
              <div className="pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleConsultOnWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Validar Minha Fórmula com a Fábrica no WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
