import React from 'react';
import {
  Check,
  X,
  Flame,
  Award,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface PelletAdvantagesProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const PelletAdvantages: React.FC<PelletAdvantagesProps> = ({ onOpenWhatsApp }) => {
  const comparisonItems = [
    {
      criteria: 'Desperdício no Cocho',
      commercial: 'Perde até 20% do volume. O vento sopra o pó e o animal espalha com o focinho.',
      pellet: 'Desperdício quase ZERO (< 1%). O animal consome o pellet inteiro sem deixar sobras.',
      isPelletBetter: true,
    },
    {
      criteria: 'Aproveitamento Nutricional (Amido)',
      commercial: 'Amido cru de difícil quebra digestiva, gerando esterco com grãos inteiros.',
      pellet: 'A compressão a quente gelatiniza o amido. O animal engorda mais rápido comendo menos.',
      isPelletBetter: true,
    },
    {
      criteria: 'Seleção pelos Animais',
      commercial: 'O animal fuça o cocho, come só o farelo gostoso e deixa o núcleo mineral no fundo.',
      pellet: 'Homogêneo. Cada pellet tem exatamente a mesma dosagem balanceada da sua fórmula.',
      isPelletBetter: true,
    },
    {
      criteria: 'Custo Médio da Saca (40kg)',
      commercial: 'R$ 90,00 a R$ 125,00 por saca com margem da revenda e frete embutido.',
      pellet: 'R$ 48,00 a R$ 62,00 por saca usando o seu milho e comprando insumos a granel.',
      isPelletBetter: true,
    },
    {
      criteria: 'Segurança e Frescor',
      commercial: 'Fica estocada em depósitos por semanas, sujeita a gorgulho, caruncho e fungos.',
      pellet: 'Feita fresca na sua propriedade conforme a sua necessidade diária ou semanal.',
      isPelletBetter: true,
    },
  ];

  return (
    <section id="vantagens" className="py-16 md:py-24 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Ciência Zootécnica Aplicada
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display">
            Por que o pellet dá muito mais lucro que a ração farelada?
          </h2>
          <p className="text-stone-300 text-base md:text-lg">
            Não é só economia na compra: seus animais ganham mais peso, produzem mais leite e nunca mais rejeitam minerais no fundo do cocho.
          </p>
        </div>

        {/* 4 Pillars of Pellet Quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-stone-800/80 border border-stone-700 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xl">
              1
            </div>
            <h3 className="text-lg font-black text-white">Gelatinização do Amido</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              O atrito natural da matriz atinge 65°C a 75°C, cozinhando o amido do milho. Isso eleva a digestibilidade em até 20% no trato digestivo.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xl">
              2
            </div>
            <h3 className="text-lg font-black text-white">Zero Seletividade no Cocho</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              O gado ou frango não consegue separar o milho doce do sal amargo. Todos os animais do lote recebem nutrição 100% equilibrada.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xl">
              3
            </div>
            <h3 className="text-lg font-black text-white">Pasteurização Térmica</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              A temperatura de extrusão elimina salmonela, bactérias e esporos de fungos comuns em grãos armazenados, protegendo a saúde do plantel.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-black text-xl">
              4
            </div>
            <h3 className="text-lg font-black text-white">Sem Poeira Respiratória</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Fundamental para cavalos, suínos e aves: elimina o pó fino que causa tosse, pneumonia e irritação ocular nas baias e galpões.
            </p>
          </div>
        </div>

        {/* Head-to-Head Comparison Table */}
        <div className="bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-stone-700 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Comparativo: Comprar Ração vs. Fabricar com a SAPEM
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Veja o impacto prático na rotina e no bolso da sua fazenda:
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenWhatsApp(
                  'Olá! Quero saber como montar minha fábrica de ração peletizada com a SAPEM na minha fazenda.'
                )
              }
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Falar com Técnico no WhatsApp</span>
            </button>
          </div>

          <div className="divide-y divide-stone-800">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 gap-4 items-center hover:bg-stone-800/40 transition-colors"
              >
                <div className="md:col-span-3 font-bold text-sm sm:text-base text-stone-200">
                  {item.criteria}
                </div>

                <div className="md:col-span-4 bg-red-950/30 border border-red-900/40 rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] font-black uppercase text-red-400 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    Ração Farelada / Comprada
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">{item.commercial}</p>
                </div>

                <div className="md:col-span-5 bg-amber-950/20 border border-amber-500/40 rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Ração Peletizada SAPEM Própria
                  </div>
                  <p className="text-xs text-amber-100 font-medium leading-relaxed">
                    {item.pellet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
