import React, { useState } from 'react';
import {
  Zap,
  Wrench,
  Hammer,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Search,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Phone,
  Layers,
} from 'lucide-react';

interface TechnicalFAQProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

type FaqCategory = 'all' | 'energia' | 'instalacao' | 'manutencao';

interface FaqItem {
  id: string;
  category: 'energia' | 'instalacao' | 'manutencao';
  categoryLabel: string;
  categoryIcon: React.ComponentType<{ className?: string }>;
  badge: string;
  question: string;
  shortAnswer: string;
  detailedPoints: string[];
  engineerTip?: string;
}

const TECHNICAL_FAQS: FaqItem[] = [
  // --- ENERGIA ELÉTRICA & MOTORES ---
  {
    id: 'energia-monofasica',
    category: 'energia',
    categoryLabel: 'Energia Elétrica',
    categoryIcon: Zap,
    badge: 'Rede Rural Monofásica',
    question: 'Minha propriedade só tem energia monofásica 220V. Consigo operar uma peletizadora?',
    shortAnswer:
      'Sim, perfeitamente! A SAPEM desenvolveu o modelo Mini 150 (5.0 a 7.5 CV) projetado sob medida para redes rurais monofásicas sem desarmar disjuntores.',
    detailedPoints: [
      'O modelo SAPEM Mini 150 opera em 220V monofásica com partida balanceada, evitando quedas bruscas de tensão na sede da propriedade.',
      'Produz de 80 a 150 kg/h (até 1,2 tonelada/dia), ideal para pequenos criadores de gado, ovinos, suínos e aves.',
      'Caso a propriedade não tenha eletricidade no retiro ou pasto, fornecemos a opção de acoplamento na Tomada de Força (TDP) do trator.',
    ],
    engineerTip:
      'Se o seu transformador rural for de 10 kVA ou 15 kVA, o modelo Mini 150 trabalha com folga e segurança contínua.',
  },
  {
    id: 'fiação-disjuntores',
    category: 'energia',
    categoryLabel: 'Energia Elétrica',
    categoryIcon: Zap,
    badge: 'Dimensionamento Elétrico',
    question: 'Qual a bitola de fio e o disjuntor necessários para ligar a máquina?',
    shortAnswer:
      'O dimensionamento varia conforme a potência do motor e a distância do transformador. Enviamos diagrama unifilar completo com a máquina.',
    detailedPoints: [
      'Modelo Mini 150 (Monofásica 220V): Cabos de 10 mm² a 16 mm² e disjuntor bipolar de 40A a 50A curva C.',
      'Modelo Agro 350 (Trifásica 220V/380V): Cabos de 6 mm² a 10 mm² e chave de partida direta ou estrela-triângulo com disjuntor de 32A a 40A.',
      'Modelo Turbo 700 e Industrial: Acompanha painel elétrico de comando com relé térmico de sobrecarga e chave soft-starter para proteção do motor WEG.',
    ],
    engineerTip:
      'Nunca use extensões longas improvisadas com fios finos (2,5mm²), pois a perda de carga reduz a força do motor na partida.',
  },
  {
    id: 'custo-kwh',
    category: 'energia',
    categoryLabel: 'Energia Elétrica',
    categoryIcon: Zap,
    badge: 'Custo em Reais (R$)',
    question: 'Quanto a peletizadora consome de energia por saca de 40 kg produzida?',
    shortAnswer:
      'O consumo é extremamente baixo: varia de R$ 0,07 a R$ 0,09 por kg peletizado, ou cerca de R$ 2,80 a R$ 3,60 por saca de 40 kg.',
    detailedPoints: [
      'Nossos equipamentos utilizam redutores mecânicos helicoidais de altíssimo rendimento (rendimento mecânico acima de 96%).',
      'Um motor de 10 CV consome cerca de 7,5 kWh. Em uma hora produz cerca de 300 a 380 kg de ração.',
      'Na tarifa rural brasileira (média de R$ 0,45 a R$ 0,65 por kWh), o custo elétrico é inferior a 3% do custo total da ração.',
    ],
    engineerTip:
      'Se você tiver energia solar rural na propriedade, o custo de peletização de cada saca se aproxima de zero!',
  },
  {
    id: 'acoplamento-tdp',
    category: 'energia',
    categoryLabel: 'Energia Elétrica',
    categoryIcon: Zap,
    badge: 'Acoplamento no Trator',
    question: 'Como funciona a versão acoplada na Tomada de Força (TDP) do trator?',
    shortAnswer:
      'A máquina é fixada nos três pontos do trator e acionada pelo cardã padrão a 540 RPM. Você pode peletizar direto no campo ou retiro sem fiação.',
    detailedPoints: [
      'Compatível com tratores a partir de 25 CV (Microtratores até tratores agrícolas médios).',
      'Conta com multiplicador de rotação banhado em óleo e eixo cardã com pino fusível de segurança.',
      'Permite descarregar a ração quente direto no carretão basculante ou tanque graneleiro móvel.',
    ],
  },

  // --- INSTALAÇÃO & ESPAÇO FÍSICO ---
  {
    id: 'base-concreto',
    category: 'instalacao',
    categoryLabel: 'Instalação & Espaço',
    categoryIcon: Hammer,
    badge: 'Piso e Nivelamento',
    question: 'Preciso construir uma base especial de concreto ou chumbamento no piso?',
    shortAnswer:
      'Não é obrigatório contrapiso industrial reforçado. O chassi monobloco em aço naval da SAPEM é estável e conta com pés niveladores antivibração.',
    detailedPoints: [
      'Pode ser assentada sobre piso cimentado comum de 8 a 10 cm nivelado ou sobre palete reforçado.',
      'O centro de gravidade rebaixado e a caixa de engrenagens balanceada impedem que a máquina balance ou caminhe durante a peletização.',
      'Para facilitar a limpeza diária com vassoura ou compressor, recomendamos manter o piso limpo ao redor da descarga.',
    ],
    engineerTip:
      'O uso de coxins de borracha ou madeira tratada sob os pés da máquina diminui ainda mais o ruído no galpão.',
  },
  {
    id: 'espaco-operacao',
    category: 'instalacao',
    categoryLabel: 'Instalação & Espaço',
    categoryIcon: Hammer,
    badge: 'Área do Galpão',
    question: 'Qual o tamanho de galpão ideal para instalar a máquina e trabalhar com conforto?',
    shortAnswer:
      'A máquina ocupa cerca de 1,2m x 0,9m. Uma área livre coberta de 3m x 3m (9 m²) é suficiente para um operador trabalhar com folga.',
    detailedPoints: [
      'Área de entrada: espaço para os sacos de matéria-prima (milho moído e farelos) ou saída do triturador/misturador.',
      'Área de descarga: espaço para caixas plásticas, bombonas ou lona para aeração e resfriamento inicial dos pellets.',
      'Ventilação: recomendamos galpão arejado ou com abertura lateral para dissipar o vapor natural e o calor da matriz (65°C a 75°C).',
    ],
  },
  {
    id: 'instalacao-plug-play',
    category: 'instalacao',
    categoryLabel: 'Instalação & Espaço',
    categoryIcon: Hammer,
    badge: 'Chegada da Máquina',
    question: 'A máquina já vem montada de fábrica ou preciso contratar montador mecânico?',
    shortAnswer:
      'A peletizadora SAPEM sai da fábrica 100% montada, regulada, lubrificada e testada com carga real pela nossa equipe de testes.',
    detailedPoints: [
      'Ao descarregar da transportadora, basta retirar a embalagem de proteção, conectar os cabos elétricos no disjuntor e começar a trabalhar.',
      'Acompanha manual de instruções em português com fotos passo a passo e tabela de umidade ideal.',
      'Nossa equipe técnica faz chamada de vídeo gratuita pelo WhatsApp para acompanhar a sua primeira peletização na fazenda.',
    ],
    engineerTip:
      'Você nunca fica sozinho: nosso time de pós-venda em Capitão Leônidas Marques - PR atende direto no WhatsApp.',
  },

  // --- MANUTENÇÃO PREVENTIVA & PEÇAS ---
  {
    id: 'engraxamento-frequencia',
    category: 'manutencao',
    categoryLabel: 'Manutenção & Peças',
    categoryIcon: Wrench,
    badge: 'Lubrificação',
    question: 'Com que frequência devo engraxar os rolamentos e roletes da máquina?',
    shortAnswer:
      'A cada 8 a 10 horas de trabalho contínuo (aproximadamente ao final de cada dia de peletização intensa).',
    detailedPoints: [
      'Utilize graxa automotiva à base de sabão de lítio de alta temperatura (ponto de gota superior a 180°C).',
      'Todos os pinos graxeiros da SAPEM ficam na parte externa, de fácil acesso com engate rápido de graxeira manual.',
      'Basta dar de 2 a 3 bombadas de graxa em cada pino. O excesso de graxa não é necessário.',
    ],
    engineerTip:
      'Engraxe a máquina sempre logo após o uso, enquanto os rolamentos ainda estão mornos, pois a graxa nova se distribui perfeitamente.',
  },
  {
    id: 'vida-util-matriz',
    category: 'manutencao',
    categoryLabel: 'Manutenção & Peças',
    categoryIcon: Wrench,
    badge: 'Matriz Reversível 2 Lados',
    question: 'Quantas toneladas dura uma matriz e como funciona a furação reversível dos dois lados?',
    shortAnswer:
      'Nossas matrizes em aço especial cementado duram de 150 a 250 toneladas por lado. Sendo reversível, a vida útil dobra para até 400 a 500 toneladas!',
    detailedPoints: [
      'Fabricadas em aço de liga cromo-manganês com tratamento térmico em forno de atmosfera controlada (dureza 58 a 62 HRC).',
      'Quando o primeiro lado sofrer desgaste natural após meses de uso intenso, basta soltar os parafusos centrais e virar a matriz.',
      'A furação cônica CNC garante que o segundo lado entre em operação com a mesma vazão e qualidade de pellet novo.',
    ],
  },
  {
    id: 'limpeza-antientupimento',
    category: 'manutencao',
    categoryLabel: 'Manutenção & Peças',
    categoryIcon: Wrench,
    badge: 'Dica Antientupimento',
    question: 'A ração pode endurecer dentro dos furos da matriz se a máquina ficar parada?',
    shortAnswer:
      'Existe um segredo simples de fábrica de 2 minutos para nunca deixar a matriz entupir entre um dia de trabalho e outro.',
    detailedPoints: [
      'Nos últimos 2 minutos de peletização do dia, passe cerca de 2 kg a 3 kg de milho moído ou farelo misturado com 2% a 3% de óleo vegetal comum.',
      'Essa massa oleosa expulsa a ração mineralizada e preenche todos os furos com uma mistura macia e lubrificada.',
      'No dia seguinte ou na próxima semana, quando você religar a máquina, os pellets saem com partida instantânea sem nenhum esforço mecânico.',
    ],
    engineerTip:
      'Essa dica de ouro economiza horas de trabalho e protege o motor de sobrecarga no início de cada jornada.',
  },
  {
    id: 'reposicao-pecas',
    category: 'manutencao',
    categoryLabel: 'Manutenção & Peças',
    categoryIcon: Wrench,
    badge: 'Envio em 24 Horas',
    question: 'Se eu precisar de roletes, matriz de outra furação ou rolamentos, quanto tempo demora?',
    shortAnswer:
      'Como somos a indústria fabricante brasileira, temos 100% das peças a pronta entrega e despachamos em até 24 horas úteis para todo o Brasil.',
    detailedPoints: [
      'Você compra direto de quem usina as peças, sem depender de navios importados ou atravessadores que somem.',
      'Matrizes avulsas de 2.5mm, 3.0mm, 4.0mm, 6.0mm, 8.0mm e 10.0mm com despacho expresso via Sedex ou transportadora.',
      'Garantia total de compatibilidade e precisão milimétrica para todas as safras de máquinas SAPEM.',
    ],
  },
];

export const TechnicalFAQ: React.FC<TechnicalFAQProps> = ({ onOpenWhatsApp }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('energia-monofasica');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = TECHNICAL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.detailedPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div id="faq" className="max-w-4xl mx-auto mb-16">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          Guia Técnico da Fábrica
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white">
          Dúvidas Técnicas Frequentes
        </h3>
        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          Tudo o que você precisa saber sobre <strong>energia elétrica</strong>,{' '}
          <strong>instalação na propriedade</strong> e <strong>manutenção preventiva</strong> das peletizadoras SAPEM.
        </p>
      </div>

      {/* Search Input & Category Filters */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por: monofásica, bitola de fio, trator TDP, graxa, matriz, limpeza..."
            className="w-full pl-11 pr-4 py-3 bg-stone-900/90 border border-stone-700 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md ring-1 ring-amber-400'
                : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
            }`}
          >
            Todas as Dúvidas ({TECHNICAL_FAQS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('energia')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'energia'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md ring-1 ring-amber-400'
                : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Energia Elétrica & Motores</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('instalacao')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'instalacao'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md ring-1 ring-amber-400'
                : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
            }`}
          >
            <Hammer className="w-3.5 h-3.5 text-amber-400" />
            <span>🏗️ Instalação & Galpão</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('manutencao')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'manutencao'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md ring-1 ring-amber-400'
                : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>🔧 Manutenção & Peças</span>
          </button>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-8 text-center text-stone-400 text-sm">
            Nenhuma resposta encontrada para &ldquo;{searchQuery}&rdquo;.
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-amber-400 hover:underline font-bold text-xs"
              >
                Ver todas as perguntas frequentes
              </button>
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const CategoryIcon = faq.categoryIcon;

            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-stone-900 border-amber-500/70 shadow-lg shadow-black/60 ring-1 ring-amber-500/40'
                    : 'bg-stone-900/70 border-stone-800 hover:border-stone-700'
                }`}
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                        <CategoryIcon className="w-3 h-3 text-amber-400" />
                        {faq.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-white/10 text-stone-300 px-2 py-0.5 rounded">
                        {faq.badge}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-stone-100 leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 sm:mt-0 ${
                      isOpen
                        ? 'bg-amber-400 text-stone-950 rotate-180 font-bold'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expandable Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80 space-y-3.5">
                    {/* Short Summary Highlight */}
                    <p className="font-medium text-amber-100 bg-amber-950/30 p-3 rounded-xl border border-amber-500/20">
                      {faq.shortAnswer}
                    </p>

                    {/* Detailed Technical Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {faq.detailedPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-stone-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Engineer Tip Callout */}
                    {faq.engineerTip && (
                      <div className="bg-stone-950/80 border border-amber-400/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-stone-300">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-bold block mb-0.5 font-mono uppercase text-[11px]">
                            💡 Dica do Engenheiro SAPEM:
                          </strong>
                          <span>{faq.engineerTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Direct Contact for This Specific Question */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenWhatsApp(
                            `Olá equipe técnica da SAPEM! Tenho uma dúvida sobre ${faq.categoryLabel}: "${faq.question}". Gostaria de saber mais detalhes para minha fazenda.`
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                        <span>Falar com o técnico sobre isso no WhatsApp &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Technical Support Direct Callout Card */}
      <div className="mt-8 bg-gradient-to-r from-stone-900 via-zinc-900 to-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-white text-sm sm:text-base">
              Sua dúvida técnica não está na lista?
            </h4>
          </div>
          <p className="text-xs text-stone-400">
            Fale direto com a equipe que projeta as máquinas em Capitão Leônidas Marques – PR. Atendimento rápido e gratuito.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onOpenWhatsApp(
              'Olá equipe de engenharia da SAPEM! Tenho uma dúvida técnica sobre energia e instalação na minha propriedade rural.'
            )
          }
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Tirar Dúvida Técnica no WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
