import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  SimulationResult,
  calculateCumulativeGrowth,
  formatCurrencyBRL,
  formatNumberBR,
  AnimalProfile,
} from '../utils/calculator';

interface SavingsGrowthChartProps {
  simulation: SimulationResult;
  herdSize?: number;
  animal?: AnimalProfile;
}

export const SavingsGrowthChart: React.FC<SavingsGrowthChartProps> = ({
  simulation,
  herdSize,
  animal,
}) => {
  const [viewMode, setViewMode] = useState<'netSavings' | 'comparison'>('netSavings');

  const growthData = calculateCumulativeGrowth(simulation);
  const machinePrice = simulation.recommendedMachine.estimatedPrice;

  // Extract milestone values
  const point6m = growthData.find((p) => p.month === 6) || growthData[2];
  const point12m = growthData.find((p) => p.month === 12) || growthData[4];
  const point24m = growthData.find((p) => p.month === 24) || growthData[6];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;

    return (
      <div className="bg-stone-900/95 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl text-white text-xs max-w-xs backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
          <span className="font-bold text-amber-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {data.monthLabel}
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
            {data.month <= simulation.paybackMonths ? 'Fase de Retorno' : 'Lucro Líquido'}
          </span>
        </div>

        <div className="space-y-1.5 font-sans">
          <div className="flex justify-between items-center text-stone-300">
            <span>Ração Comprada:</span>
            <span className="font-mono text-red-400 font-bold">
              {formatCurrencyBRL(data.cumulativeCommercial)}
            </span>
          </div>

          <div className="flex justify-between items-center text-stone-300">
            <span>SAPEM + Insumos Fazenda:</span>
            <span className="font-mono text-emerald-300 font-bold">
              {formatCurrencyBRL(data.cumulativeOwnWithMachine)}
            </span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="font-bold text-white">Economia Líquida:</span>
            <span
              className={`font-mono font-black text-sm ${
                data.netSavingsAfterMachine >= 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {formatCurrencyBRL(data.netSavingsAfterMachine)}
            </span>
          </div>
          <p className="text-[10px] text-stone-400 italic pt-1">
            *Já descontado o valor total da máquina de {formatCurrencyBRL(machinePrice)}.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      data-testid="savings-growth-chart-container"
      className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl p-5 sm:p-7 shadow-xl mt-8 space-y-6"
    >
      {/* Top Header of the Graph */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Evolução Patrimonial da Fazenda
            </span>
            <span className="text-xs text-amber-400 font-medium hidden md:inline">
              Baseado na {simulation.recommendedMachine.name}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
            Crescimento da Economia Acumulada em 6, 12 e 24 Meses
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-xs text-stone-400">
              Compare o dinheiro queimado comprando ração ensacada vs. o lucro acumulado com a peletizadora SAPEM.
            </p>
            {herdSize && animal && (
              <span
                data-testid="growth-chart-herd-badge"
                className="inline-flex items-center gap-1.5 text-[11px] bg-zinc-900 border border-amber-500/40 text-amber-300 font-medium px-2.5 py-0.5 rounded-full font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Plantel: <strong className="text-white font-bold">{formatNumberBR(herdSize)} {animal.herdUnitName}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-zinc-800 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setViewMode('netSavings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'netSavings'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Economia Líquida
          </button>
          <button
            type="button"
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'comparison'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Comparativo de Gastos
          </button>
        </div>
      </div>

      {/* 3 Prominent Milestone Cards (6, 12, and 24 months) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* 6 Months Milestone */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Marco de 6 Meses
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.5 rounded">
              Máquina Paga
            </span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-display">
            {formatCurrencyBRL(point6m.netSavingsAfterMachine)}
          </div>
          <p className="text-[11px] text-stone-300 mt-1">
            Lucro líquido no bolso após amortizar 100% da máquina ({formatCurrencyBRL(machinePrice)}).
          </p>
        </div>

        {/* 12 Months Milestone */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-amber-500/50 rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-black/60">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Marco de 12 Meses (1 Ano)
            </span>
            <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded">
              1º Ano Completo
            </span>
          </div>
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 font-display">
            {formatCurrencyBRL(point12m.netSavingsAfterMachine)}
          </div>
          <p className="text-[11px] text-stone-200 mt-1 font-medium">
            Economia bruta de <strong className="text-white">{formatCurrencyBRL(point12m.cumulativeGrossSavings)}</strong> em 1 ano de safra.
          </p>
        </div>

        {/* 24 Months Milestone */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Marco de 24 Meses (2 Anos)
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.5 rounded">
              Patrimônio Rural
            </span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-display">
            {formatCurrencyBRL(point24m.netSavingsAfterMachine)}
          </div>
          <p className="text-[11px] text-stone-300 mt-1">
            A máquina gerou mais de <strong className="text-white">{(point24m.netSavingsAfterMachine / machinePrice).toFixed(1)}x</strong> o seu valor de compra em economia!
          </p>
        </div>
      </div>

      {/* Main Recharts Area */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'netSavings' ? (
            <AreaChart data={growthData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="netSavingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="grossSavingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
              <XAxis
                dataKey="monthLabel"
                stroke="#a1a1aa"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                stroke="#a1a1aa"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#52525b" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="netSavingsAfterMachine"
                name="Economia Líquida (após a máquina)"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#netSavingsGradient)"
              />
              <Area
                type="monotone"
                dataKey="cumulativeGrossSavings"
                name="Economia Bruta de Ração"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#grossSavingsGradient)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={growthData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="commGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="sapemGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
              <XAxis
                dataKey="monthLabel"
                stroke="#a1a1aa"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                stroke="#a1a1aa"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulativeCommercial"
                name="Gasto Ração Comprada (Sem Máquina)"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#commGradient)"
              />
              <Area
                type="monotone"
                dataKey="cumulativeOwnWithMachine"
                name="Custo Máquina + Ração Própria"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#sapemGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Key Highlights */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 pt-3 border-t border-stone-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-stone-300">Lucro no Bolso (Líquido)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-amber-400 inline-block" />
            <span className="text-stone-300">Economia Bruta</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Payback completo em aproximadamente ~{simulation.paybackMonths} meses</span>
        </div>
      </div>
    </div>
  );
};
