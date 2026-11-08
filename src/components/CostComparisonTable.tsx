import React, { useState } from 'react';
import {
  Wheat,
  Truck,
  Store,
  Package,
  Zap,
  Wind,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  MessageCircle,
  BadgePercent,
  Calculator,
  Flame,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';

interface CostComparisonTableProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onScrollToCalculator?: () => void;
}

type ComparisonUnit = 'saca' | 'tonelada' | 'mensal';

interface CostItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  commercialDesc: string;
  commercialValueSaca: number;
  sapemDesc: string;
  sapemValueSaca: number;
  savingsSaca: number;
  explanation: string;
  isKeyFactor?: boolean;
}

const COST_ITEMS: CostItem[] = [
  {
    id: 'materia-prima',
    name: 'Matéria-Prima Base (Milho + Soja + Núcleo)',
    category: 'Ingredientes Nutricionais',
    icon: Wheat,
    commercialDesc: 'Grãos com margens embutidas de corretores, armazéns e tributos de revenda',
    commercialValueSaca: 48.0,
    sapemDesc: 'Milho próprio da fazenda ou compra a granel direto do produtor/cooperativa',
    sapemValueSaca: 38.5,
    savingsSaca: 9.5,
    explanation:
      'Você elimina a margem dos corretores de grãos e compra insumos no atacado ou aproveita a safra da sua lavoura.',
    isKeyFactor: true,
  },
  {
    id: 'frete-distribuicao',
    name: 'Frete Rodoviário & Logística',
    category: 'Logística',
    icon: Truck,
    commercialDesc: 'Frete fracionado embutido em cada remessa (+ pedágios, diesel e seguro de carga)',
    commercialValueSaca: 14.5,
    sapemDesc: 'R$ 0,00 de frete de sacaria (fabricada e armazenada dentro da sua fazenda)',
    sapemValueSaca: 0.0,
    savingsSaca: 14.5,
    explanation:
      'Cada caminhão que sobe sua serra cobra frete fracionado caro. Com a máquina no galpão, a logística é zero.',
    isKeyFactor: true,
  },
  {
    id: 'margem-revenda',
    name: 'Margem Comercial do Lojista / Cooperativa',
    category: 'Comercialização',
    icon: Store,
    commercialDesc: '22% a 32% de margem bruta para custear lojas físicas, funcionários e comissões',
    commercialValueSaca: 20.0,
    sapemDesc: 'Margem de terceiros ZERO (lucro retido integralmente na sua fazenda)',
    sapemValueSaca: 0.0,
    savingsSaca: 20.0,
    explanation:
      'O atravessador ganha sobre o seu trabalho diário. Ao peletizar internamente, essa margem vira lucro no seu bolso.',
    isKeyFactor: true,
  },
  {
    id: 'embalagem',
    name: 'Embalagem & Sacaria de Ráfia',
    category: 'Insumos Industriais',
    icon: Package,
    commercialDesc: 'R$ 4,50 a R$ 6,00 pagos por cada saco novo de ráfia descartável',
    commercialValueSaca: 5.0,
    sapemDesc: 'Uso de bags retornáveis, tambores ou transporte direto ao cocho sem sacos',
    sapemValueSaca: 0.5,
    savingsSaca: 4.5,
    explanation:
      'Você nunca mais gasta dinheiro com sacos plásticos descartáveis de 40kg que rasgam e viram entulho.',
  },
  {
    id: 'energia-operacao',
    name: 'Energia Elétrica / Combustível Operacional',
    category: 'Processamento',
    icon: Zap,
    commercialDesc: 'Custo de fábrica terceirizada repassado com margem industrial ao comprador',
    commercialValueSaca: 6.0,
    sapemDesc: 'Apenas ~R$ 0,07 a R$ 0,09 por kg em energia rural ou acionamento por trator (TDP)',
    sapemValueSaca: 3.2,
    savingsSaca: 2.8,
    explanation:
      'Os motores WEG de alto rendimento e os redutores helicoidais SAPEM garantem consumo de energia mínimo por tonelada.',
  },
  {
    id: 'desperdicio-cocho',
    name: 'Perda por Desperdício no Cocho (Pó e Vento)',
    category: 'Eficiência Zootécnica',
    icon: Wind,
    commercialDesc: 'Perda de até 15% a 20% (vento sopra o pó, animais selecionam e babam a ração)',
    commercialValueSaca: 12.0,
    sapemDesc: 'Desperdício < 1%. O pellet firme e homogêneo é ingerido 100% pelo plantel',
    sapemValueSaca: 0.5,
    savingsSaca: 11.5,
    explanation:
      'Com ração farelada, até 20% do dinheiro voa com o vento ou fica no fundo do cocho. No pellet, o animal come tudo.',
    isKeyFactor: true,
  },
  {
    id: 'qualidade-sanitaria',
    name: 'Controle Sanitário & Frescor da Ração',
    category: 'Segurança Alimentar',
    icon: ShieldCheck,
    commercialDesc: 'Risco de caruncho, gorgulho e perda de vitaminas por estocagem longa em depósito',
    commercialValueSaca: 3.0,
    sapemDesc: '100% fresca: feita na semana, com amido gelatinizado e pasteurizado a 70°C na matriz',
    sapemValueSaca: 0.3,
    savingsSaca: 2.7,
    explanation:
      'O atrito térmico da peletizadora SAPEM elimina salmonela e fungos, garantindo sanidade intestinal máxima ao plantel.',
  },
];

export const CostComparisonTable: React.FC<CostComparisonTableProps> = ({
  onOpenWhatsApp,
  onScrollToCalculator,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<ComparisonUnit>('saca');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Multipliers based on unit
  const multiplier = selectedUnit === 'saca' ? 1 : selectedUnit === 'tonelada' ? 25 : 250; // 250 sacas = 10 toneladas (rebanho médio mensal)

  const unitLabels = {
    saca: {
      label: '1 Saca de 40 kg',
      subtext: 'Valor por saca ensacada padrão',
      prefix: 'R$ ',
      suffix: ' / saca',
    },
    tonelada: {
      label: '1 Tonelada (1.000 kg)',
      subtext: 'Equivalente a 25 sacas de 40 kg',
      prefix: 'R$ ',
      suffix: ' / ton',
    },
    mensal: {
      label: 'Consumo Médio Mensal (10 Ton / 250 Sacas)',
      subtext: 'Simulação para plantel médio de corte, leite ou suínos',
      prefix: 'R$ ',
      suffix: ' / mês',
    },
  };

  const totalCommercial = COST_ITEMS.reduce(
    (acc, item) => acc + item.commercialValueSaca * multiplier,
    0
  );
  const totalSapem = COST_ITEMS.reduce((acc, item) => acc + item.sapemValueSaca * multiplier, 0);
  const totalSavings = totalCommercial - totalSapem;
  const percentSavings = Math.round((totalSavings / totalCommercial) * 100);

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section id="comparativo-custos" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            Raio-X de Custos: Onde o Produtor Perde Dinheiro
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display tracking-tight">
            Ração Comprada vs.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
              Ração Peletizada SAPEM
            </span>
          </h2>
          <p className="text-stone-600 text-base md:text-lg">
            Veja para onde vai cada centavo da saca de ração. Entenda como fabricar na fazenda corta
            fretes abusivos, margens de terceiros e desperdício no cocho.
          </p>

          {/* Unit Switcher */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-4">
            <span className="text-xs text-stone-500 font-bold uppercase mr-1">Visualizar por:</span>
            <button
              type="button"
              onClick={() => setSelectedUnit('saca')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedUnit === 'saca'
                  ? 'bg-stone-950 text-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Saca de 40 kg
            </button>
            <button
              type="button"
              onClick={() => setSelectedUnit('tonelada')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedUnit === 'tonelada'
                  ? 'bg-stone-950 text-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              1 Tonelada (1.000 kg)
            </button>
            <button
              type="button"
              onClick={() => setSelectedUnit('mensal')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedUnit === 'mensal'
                  ? 'bg-stone-950 text-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Lote Médio Mensal (10 Toneladas)
            </button>
          </div>
        </div>

        {/* Top 3 Summary Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Ração Comprada */}
          <div className="bg-red-50/70 border-2 border-red-200 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  Ração Comercial Comprada
                </span>
                <span className="text-xs text-red-600 font-bold">Sem Controle</span>
              </div>
              <h3 className="text-sm font-bold text-stone-700 mb-1">Custo Total ao Produtor:</h3>
              <div className="text-3xl sm:text-4xl font-black text-red-700 font-display">
                {formatMoney(totalCommercial)}
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Mais de <strong>46%</strong> desse valor é frete rodoviário, margem de revenda, sacaria descartável e pó perdido no cocho.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-200/80 flex items-center gap-2 text-xs text-red-800 font-semibold">
              <Flame className="w-4 h-4 text-red-600 shrink-0" />
              <span>Você paga o lucro do lojista e o frete de terceiros.</span>
            </div>
          </div>

          {/* Card 2: Ração Peletizada SAPEM */}
          <div className="bg-zinc-950 border-2 border-amber-500 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-white shadow-xl shadow-amber-950/20 ring-2 ring-amber-500/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-stone-950 bg-amber-400 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-950" />
                  Peletizada na Fazenda SAPEM
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">100% Sua</span>
              </div>
              <h3 className="text-sm font-bold text-stone-300 mb-1">Custo Total de Produção:</h3>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
                {formatMoney(totalSapem)}
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Utiliza seus grãos ou insumos comprados a granel + energia rural (~R$ 0,08/kg).
                Desperdício quase nulo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Garantia de 1 ano de fábrica • Matriz temperada CNC</span>
            </div>
          </div>

          {/* Card 3: Lucro Retido / Economia */}
          <div className="bg-gradient-to-br from-emerald-950 via-stone-950 to-zinc-900 border-2 border-emerald-500 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-white shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Dinheiro Que Fica no Seu Bolso
                </span>
                <span className="text-xs text-emerald-400 font-bold font-mono">
                  -{percentSavings}% Menos
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-300 mb-1">Economia Líquida Real:</h3>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                {formatMoney(totalSavings)}
              </div>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                Diferença direta que deixa de ser queimada em intermediários e fretes rodoviários a cada ciclo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsApp(
                    `Olá! Vi o comparativo de custos no site da SAPEM. Gostaria de saber como economizar ${formatMoney(
                      totalSavings
                    )} por ${selectedUnit === 'saca' ? 'saca' : selectedUnit === 'tonelada' ? 'tonelada' : 'mês'} na minha fazenda.`
                  )
                }
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Simular Meu Custo no WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Visual Progress Bar Gauge Comparison */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-bold text-stone-900 text-base sm:text-lg font-display">
                Comparativo Visual de Custo: Para onde vai cada Real?
              </h4>
              <p className="text-xs text-stone-500">
                Comparação de composição entre a ração comprada e a peletizada na propriedade ({unitLabels[selectedUnit].label})
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
              Economia de {percentSavings}%
            </span>
          </div>

          {/* Bar 1: Commercial */}
          <div className="space-y-1.5 mb-5">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Ração Comercial (Comprada em Sacaria)
              </span>
              <span className="text-red-700 font-mono">{formatMoney(totalCommercial)} (100%)</span>
            </div>
            <div className="w-full bg-stone-200 h-6 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: '44%' }}
                className="bg-amber-700 h-full flex items-center justify-center text-[10px] font-bold text-white px-2 truncate"
                title="Matéria-prima com margem (44%)"
              >
                Grãos com margem
              </div>
              <div
                style={{ width: '15%' }}
                className="bg-orange-600 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 truncate"
                title="Frete Fracionado (15%)"
              >
                Frete
              </div>
              <div
                style={{ width: '21%' }}
                className="bg-red-600 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 truncate"
                title="Margem da Revenda (21%)"
              >
                Revenda
              </div>
              <div
                style={{ width: '8%' }}
                className="bg-red-800 h-full flex items-center justify-center text-[9px] font-bold text-white px-1 truncate"
                title="Sacaria (8%)"
              >
                Sacos
              </div>
              <div
                style={{ width: '12%' }}
                className="bg-red-950 h-full flex items-center justify-center text-[9px] font-bold text-white px-1 truncate"
                title="Desperdício no Cocho (12%)"
              >
                Perda cocho
              </div>
            </div>
          </div>

          {/* Bar 2: SAPEM */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Ração Própria Peletizada SAPEM
              </span>
              <span className="text-amber-800 font-mono font-black">
                {formatMoney(totalSapem)} ({100 - percentSavings}%)
              </span>
            </div>
            <div className="w-full bg-stone-200 h-6 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${Math.round(((totalSapem * 0.88) / totalCommercial) * 100)}%` }}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full flex items-center justify-center text-[10px] font-black text-stone-950 px-2 truncate"
                title="Matéria-prima própria / granel"
              >
                Insumos & Nutrição Própria
              </div>
              <div
                style={{ width: `${Math.round(((totalSapem * 0.12) / totalCommercial) * 100)}%` }}
                className="bg-stone-900 h-full flex items-center justify-center text-[9px] font-bold text-amber-300 px-1 truncate"
                title="Energia rural de peletização"
              >
                Energia
              </div>
              <div
                style={{ width: `${percentSavings}%` }}
                className="bg-emerald-100 border border-dashed border-emerald-400 h-full flex items-center justify-center text-[10px] font-bold text-emerald-800 px-2 truncate"
                title="Lucro retido na sua propriedade"
              >
                ✓ {percentSavings}% de Lucro Retido
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Item-by-Item Breakdown Table */}
        <div className="bg-white rounded-3xl border border-stone-300 overflow-hidden shadow-xl">
          <div className="p-5 sm:p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Tabela Detalhada com Ícones Explicativos
              </span>
              <h3 className="text-lg sm:text-xl font-black font-display text-white mt-0.5">
                Decomposição de Custos por Categoria ({unitLabels[selectedUnit].label})
              </h3>
            </div>
            <div className="text-xs text-stone-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Clique em qualquer linha para ver o motivo zootécnico</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/90 text-stone-700 text-xs uppercase font-mono tracking-wider border-b border-stone-300">
                  <th className="py-3.5 px-4 sm:px-6 font-bold">Componente de Custo</th>
                  <th className="py-3.5 px-4 font-bold text-red-700">Ração Comercial (Ensacada)</th>
                  <th className="py-3.5 px-4 font-bold text-stone-900">Ração Peletizada SAPEM</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-700 text-right">Economia Real</th>
                  <th className="py-3.5 px-3 text-center font-bold">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs sm:text-sm">
                {COST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const commVal = item.commercialValueSaca * multiplier;
                  const sapemVal = item.sapemValueSaca * multiplier;
                  const savVal = item.savingsSaca * multiplier;
                  const isExpanded = expandedItem === item.id;

                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => toggleExpand(item.id)}
                        className={`hover:bg-amber-50/40 transition-colors cursor-pointer ${
                          isExpanded ? 'bg-amber-50/60' : ''
                        }`}
                      >
                        {/* Name & Icon */}
                        <td className="py-4 px-4 sm:px-6 font-medium text-stone-900">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold flex items-center gap-2">
                                <span>{item.name}</span>
                                {item.isKeyFactor && (
                                  <span className="text-[10px] font-mono uppercase bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                                    Impacto Alto
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-500 block mt-0.5">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Commercial Cost */}
                        <td className="py-4 px-4 font-medium text-stone-700">
                          <div className="font-mono font-bold text-red-700 text-sm sm:text-base">
                            {formatMoney(commVal)}
                          </div>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {item.commercialDesc}
                          </span>
                        </td>

                        {/* SAPEM Cost */}
                        <td className="py-4 px-4 font-medium text-stone-900">
                          <div className="font-mono font-black text-stone-950 text-sm sm:text-base flex items-center gap-1.5">
                            <span>{formatMoney(sapemVal)}</span>
                            {sapemVal === 0 && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded font-mono">
                                ZERO
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {item.sapemDesc}
                          </span>
                        </td>

                        {/* Net Savings */}
                        <td className="py-4 px-4 text-right">
                          <div className="font-mono font-black text-emerald-700 text-sm sm:text-base">
                            +{formatMoney(savVal)}
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 block">
                            -{Math.round((savVal / commVal) * 100)}% do custo
                          </span>
                        </td>

                        {/* Expand Trigger */}
                        <td className="py-4 px-3 text-center">
                          <button
                            type="button"
                            className="text-stone-400 hover:text-amber-600 transition-colors p-1"
                            aria-label="Ver explicação técnica"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Explanation Row */}
                      {isExpanded && (
                        <tr className="bg-amber-50/90 border-t border-b border-amber-200">
                          <td colSpan={5} className="py-3 px-4 sm:px-6">
                            <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <strong className="font-bold text-stone-950">
                                  Por que a SAPEM elimina esse custo:
                                </strong>
                                <p className="text-stone-700 leading-relaxed">{item.explanation}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Table Total Summary Row */}
                <tr className="bg-stone-950 text-white font-bold border-t-2 border-amber-500">
                  <td className="py-4 px-4 sm:px-6 font-display text-base">
                    TOTAL POR {selectedUnit === 'saca' ? 'SACA (40 KG)' : selectedUnit === 'tonelada' ? 'TONELADA (1.000 KG)' : 'MÊS (10 TON)'}
                  </td>
                  <td className="py-4 px-4 font-mono text-red-400 text-base sm:text-lg">
                    {formatMoney(totalCommercial)}
                  </td>
                  <td className="py-4 px-4 font-mono text-amber-400 text-base sm:text-lg">
                    {formatMoney(totalSapem)}
                  </td>
                  <td className="py-4 px-4 font-mono text-emerald-400 text-base sm:text-lg text-right">
                    +{formatMoney(totalSavings)}
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-xs bg-emerald-500 text-stone-950 px-2 py-1 rounded font-black">
                      -{percentSavings}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Bottom Action Banner */}
          <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stone-800">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-white text-base font-display">
                Quer saber o custo exato da sua receita com seus insumos?
              </h4>
              <p className="text-xs text-stone-400">
                Nossos zootecnistas calculam gratuitamente o custo por saca do seu milho, farelo e núcleo na sua região.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {onScrollToCalculator && (
                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 text-xs font-bold transition-all cursor-pointer"
                >
                  Ir para o Economômetro
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsApp(
                    `Olá equipe SAPEM! Gostaria de uma análise de custo para a minha propriedade. Atualmente pago cerca de ${formatMoney(
                      COST_ITEMS[0].commercialValueSaca * multiplier
                    )} por ${selectedUnit === 'saca' ? 'saca' : 'tonelada'} de ração pronta comercial.`
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Calcular Meu Custo com a Fábrica</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
