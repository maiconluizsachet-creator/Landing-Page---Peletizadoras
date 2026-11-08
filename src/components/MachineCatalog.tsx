import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  ShieldCheck,
  CheckCircle,
  Zap,
  Gauge,
  Factory,
  MessageCircle,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Check,
  Paintbrush,
  Info,
} from 'lucide-react';
import {
  SAPEM_MACHINES,
  MachineModel,
  MachineFinish,
} from '../utils/calculator';

interface MachineCatalogProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  selectedMachineId?: string;
}

const MATRIX_INFO = [
  { size: 2.5, animals: 'Pintinhos, peixes alevinos e aves jovens', color: 'bg-blue-500' },
  { size: 4.0, animals: 'Frango de corte, poedeiras, suínos e ovinos', color: 'bg-amber-500' },
  { size: 6.0, animals: 'Bovinos de corte, bezerros e vacas leiteiras', color: 'bg-amber-600' },
  { size: 8.0, animals: 'Equinos e gado adulto de confinamento pesado', color: 'bg-stone-500' },
];

export const MachineCatalog: React.FC<MachineCatalogProps> = ({
  onOpenWhatsApp,
  selectedMachineId,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'small' | 'medium' | 'tractor' | 'large'>('all');
  const [selectedMatrix, setSelectedMatrix] = useState<number>(4.0);
  const [globalFinish, setGlobalFinish] = useState<MachineFinish>('epoxi');
  const [perMachineFinish, setPerMachineFinish] = useState<Record<string, MachineFinish>>({});
  const [modalMachine, setModalMachine] = useState<MachineModel | null>(null);

  const getMachineFinish = (machineId: string): MachineFinish => {
    return perMachineFinish[machineId] || globalFinish;
  };

  const handleSetFinishForMachine = (machineId: string, finish: MachineFinish) => {
    setPerMachineFinish((prev) => ({ ...prev, [machineId]: finish }));
  };

  const filteredMachines = SAPEM_MACHINES.filter((m) => {
    if (activeFilter === 'small') return m.capacityKgPerHour.max <= 180 && !m.id.includes('pto');
    if (activeFilter === 'medium') return m.capacityKgPerHour.max > 180 && m.capacityKgPerHour.max <= 550 && !m.id.includes('pto');
    if (activeFilter === 'tractor') return m.id.includes('pto') || m.voltage.includes('TDP');
    if (activeFilter === 'large') return m.capacityKgPerHour.max > 550;
    return true;
  });

  return (
    <section id="maquinas" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <Factory className="w-3.5 h-3.5 text-amber-700" />
            Catálogo Oficial Direto da Indústria
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display">
            Peletizadoras SAPEM: Robustez para o Trabalho Pesado
          </h2>
          <p className="text-stone-600 text-base md:text-lg">
            Máquinas 100% nacionais com matrizes reversíveis CNC, redutores de alto torque e 1 ano de garantia total de fábrica.
          </p>
        </div>

        {/* Visual Steel Finish Switcher Banner */}
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl p-5 sm:p-7 border border-stone-300 shadow-xl shadow-stone-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center justify-center md:justify-start gap-1.5">
                <Paintbrush className="w-3.5 h-3.5 text-amber-500" />
                Personalização de Fábrica
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                Acabamento da Chapa de Aço Estrutural
              </h3>
              <p className="text-xs text-stone-500 max-w-md">
                Alterne a cor e tratamento anticorrosivo da chapa para ver em tempo real a foto de cada modelo:
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Epóxi Premium Option */}
              <button
                type="button"
                onClick={() => {
                  setGlobalFinish('epoxi');
                  setPerMachineFinish({});
                }}
                className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  globalFinish === 'epoxi'
                    ? 'bg-stone-950 text-white border-amber-500 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-stone-900 via-stone-800 to-black border border-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                  {globalFinish === 'epoxi' && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-black flex items-center gap-1.5">
                    <span>Pintura Epóxi Premium</span>
                    <span className="text-[9px] bg-amber-400 text-stone-950 font-mono px-1.5 py-0.2 rounded font-bold">
                      Padrão
                    </span>
                  </div>
                  <span className={`text-[10px] block ${globalFinish === 'epoxi' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Preto Ônix + Ouro + Azul WEG
                  </span>
                </div>
              </button>

              {/* Industrial Natural Option */}
              <button
                type="button"
                onClick={() => {
                  setGlobalFinish('natural');
                  setPerMachineFinish({});
                }}
                className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  globalFinish === 'natural'
                    ? 'bg-stone-900 text-white border-amber-500 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 border border-stone-400 flex items-center justify-center shrink-0 shadow-inner">
                  {globalFinish === 'natural' && <Check className="w-4 h-4 text-stone-900 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-black flex items-center gap-1.5">
                    <span>Industrial Natural</span>
                    <span className="text-[9px] bg-stone-300 text-stone-900 font-mono px-1.5 py-0.2 rounded font-bold">
                      Aço Naval
                    </span>
                  </div>
                  <span className={`text-[10px] block ${globalFinish === 'natural' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Inox 304 & Galvanizado a Frio
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Description Highlight */}
          <div className="mt-4 pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {globalFinish === 'epoxi'
                ? 'Pintura eletrostática polimerizada a 200°C: máxima resistência contra poeira, sol e umidade de galpão.'
                : 'Acabamento mecânico bruto em Aço Inox 304 e chapa naval tratada: zero risco de contaminação alimentar e resistente a ácidos de silagem.'}
            </span>
            <span className="font-mono text-[10px] text-amber-700 font-bold">
              Ambos com garantia integral de 1 ano
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Todos os Modelos ({SAPEM_MACHINES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('small')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'small'
                ? 'bg-stone-900 text-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Pequeno Porte (até 180 kg/h)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('medium')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'medium'
                ? 'bg-stone-900 text-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Médio Porte (200 a 550 kg/h)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('tractor')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'tractor'
                ? 'bg-stone-900 text-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🚜 Acopladas no Trator (TDP)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('large')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'large'
                ? 'bg-stone-900 text-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Plantas Industriais (600 a 2.500 kg/h)
          </button>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredMachines.map((machine) => {
            const isHighlight = machine.id === 'sapem-agro-350';
            const isSelected = selectedMachineId === machine.id;
            const currentFinish = getMachineFinish(machine.id);
            const imageUrl = machine.images[currentFinish];

            return (
              <motion.div
                key={machine.id}
                id={machine.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between p-5 relative overflow-hidden group ${
                  isHighlight || isSelected
                    ? 'bg-gradient-to-b from-stone-950 via-zinc-900 to-amber-950/40 text-white border-2 border-amber-500 shadow-2xl ring-2 ring-amber-500/30'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-amber-400 hover:shadow-xl'
                }`}
              >
                {/* Header Tag and Model Code */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full font-mono ${
                        isHighlight
                          ? 'bg-amber-400 text-stone-950 shadow-sm'
                          : isSelected
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {machine.imageBadge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-stone-400">
                      100% NACIONAL
                    </span>
                  </div>

                  {/* Machine Photo Container */}
                  <div className="relative mb-4 bg-white rounded-2xl p-2.5 border border-stone-200/90 shadow-inner group/photo overflow-hidden aspect-square flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={imageUrl}
                        src={imageUrl}
                        alt={`${machine.name} - Acabamento ${currentFinish === 'epoxi' ? 'Pintura Epóxi Premium' : 'Industrial Natural'}`}
                        initial={{ opacity: 0.3, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.3, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-contain filter contrast-[1.02] drop-shadow-md group-hover/photo:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </AnimatePresence>

                    {/* Quick Finish Indicator Badge on Photo */}
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-white flex items-center gap-1.5 shadow-md">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          currentFinish === 'epoxi'
                            ? 'bg-amber-400 ring-1 ring-amber-300'
                            : 'bg-stone-300 ring-1 ring-white'
                        }`}
                      />
                      <span>{currentFinish === 'epoxi' ? 'Epóxi Premium' : 'Aço Natural'}</span>
                    </div>

                    {/* Zoom / Full Preview Trigger */}
                    <button
                      type="button"
                      onClick={() => setModalMachine(machine)}
                      aria-label={`Ver detalhes em alta resolução de ${machine.name}`}
                      className="absolute bottom-2.5 right-2.5 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-xl backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>

                  {/* Per-Card Finish Selector Switch */}
                  <div className="flex items-center justify-between bg-stone-100 p-1 rounded-xl mb-4 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => handleSetFinishForMachine(machine.id, 'epoxi')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        currentFinish === 'epoxi'
                          ? 'bg-stone-950 text-amber-400 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      <span>Epóxi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetFinishForMachine(machine.id, 'natural')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        currentFinish === 'natural'
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-stone-300 inline-block" />
                      <span>Natural</span>
                    </button>
                  </div>

                  {/* Machine Name & Tagline */}
                  <div className="space-y-1 mb-3">
                    <h3
                      className={`text-xl font-black font-display leading-tight ${
                        isHighlight || isSelected ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {machine.name}
                    </h3>
                    <p
                      className={`text-xs leading-snug line-clamp-2 ${
                        isHighlight || isSelected ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {machine.tagline}
                    </p>
                  </div>

                  {/* Machine Capacity Callout */}
                  <div
                    className={`p-3 rounded-2xl mb-4 text-center border ${
                      isHighlight || isSelected
                        ? 'bg-black/40 border-amber-500/30'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider block font-mono ${
                        isHighlight || isSelected ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      Capacidade de Produção
                    </span>
                    <div
                      className={`text-xl font-black font-display ${
                        isHighlight || isSelected ? 'text-amber-400' : 'text-stone-900'
                      }`}
                    >
                      {machine.capacityKgPerHour.min} a {machine.capacityKgPerHour.max} kg/h
                    </div>
                    <span
                      className={`text-[10px] font-medium block mt-0.5 ${
                        isHighlight || isSelected ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      Até {((machine.capacityKgPerHour.max * 8) / 1000).toFixed(1)} toneladas/dia (8h)
                    </span>
                  </div>

                  {/* Tech Specs */}
                  <div className="space-y-2 text-xs mb-5">
                    <div
                      className={`flex items-center justify-between pb-1 border-b ${
                        isHighlight || isSelected ? 'border-white/10' : 'border-stone-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 opacity-75 text-[11px]">
                        <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                        Motorização:
                      </span>
                      <span className="font-bold text-[11px] text-right truncate max-w-[130px]">
                        {machine.motorHp}
                      </span>
                    </div>

                    <div
                      className={`flex items-center justify-between pb-1 border-b ${
                        isHighlight || isSelected ? 'border-white/10' : 'border-stone-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 opacity-75 text-[11px]">
                        <Gauge className="w-3 h-3 text-amber-400 shrink-0" />
                        Energia / TDP:
                      </span>
                      <span
                        className="font-semibold text-[11px] text-right max-w-[130px] truncate"
                        title={machine.voltage}
                      >
                        {machine.voltage.includes('TDP') ? 'Trator 540 RPM' : machine.voltage.split(' ')[0]}
                      </span>
                    </div>

                    <div
                      className={`flex items-center justify-between pb-1 border-b ${
                        isHighlight || isSelected ? 'border-white/10' : 'border-stone-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 opacity-75 text-[11px]">
                        <Layers className="w-3 h-3 text-amber-400 shrink-0" />
                        Furação Matriz:
                      </span>
                      <span className="font-mono font-bold text-[11px]">
                        {machine.matrixDiameters.join(', ')} mm
                      </span>
                    </div>

                    <div
                      className={`flex items-center justify-between pb-1 border-b ${
                        isHighlight || isSelected ? 'border-white/10' : 'border-stone-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 opacity-75 text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
                        Garantia:
                      </span>
                      <span className="font-bold text-amber-500 text-[11px]">1 Ano de Fábrica</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenWhatsApp(
                        `Olá equipe SAPEM Industrial! Gostaria de receber o orçamento de fábrica para o modelo ${machine.name} (${machine.capacityKgPerHour.min}-${machine.capacityKgPerHour.max} kg/h) com acabamento ${currentFinish === 'epoxi' ? 'Pintura Epóxi Premium' : 'Industrial Natural'}. Qual o prazo de entrega?`
                      )
                    }
                    className={`w-full py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                      isHighlight || isSelected
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 ring-2 ring-emerald-400/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Cotar {machine.modelCode} no WhatsApp</span>
                  </button>
                  <p
                    className={`text-[9px] text-center mt-1.5 ${
                      isHighlight || isSelected ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    Preço direto da fábrica • Sem intermediários
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Matrix Die Guide */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
                <Wrench className="w-4 h-4" />
                Matrizes de Furação CNC em Aço Especial
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display">
                Qual o tamanho de pellet ideal para a sua criação?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Toda peletizadora SAPEM acompanha a matriz configurada para a sua necessidade. Nossas matrizes são <strong>reversíveis</strong> (você usa dos dois lados, dobrando a vida útil) e feitas em aço especial com tratamento térmico por cementação.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MATRIX_INFO.map((matrix) => {
                const isSelected = selectedMatrix === matrix.size;
                return (
                  <button
                    key={matrix.size}
                    type="button"
                    onClick={() => setSelectedMatrix(matrix.size)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 text-white'
                        : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-black text-lg text-amber-400">
                        {matrix.size.toFixed(1)} mm
                      </span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-bold font-mono">
                        Diâmetro
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">{matrix.animals}</p>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Full Machine Inspection Modal */}
      <AnimatePresence>
        {modalMachine && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalMachine(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-950 border border-stone-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalMachine(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-xl bg-stone-900 border border-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Modal Machine Photo */}
                <div className="bg-white rounded-2xl p-4 border border-stone-800 flex items-center justify-center aspect-square relative shadow-inner">
                  <img
                    src={modalMachine.images[getMachineFinish(modalMachine.id)]}
                    alt={modalMachine.name}
                    className="w-full h-full object-contain filter contrast-[1.03]"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-full text-xs font-mono text-amber-400 font-bold">
                    {getMachineFinish(modalMachine.id) === 'epoxi' ? 'Pintura Epóxi' : 'Aço Natural'}
                  </div>
                </div>

                {/* Modal Tech Specs */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Ficha Técnica do Fabricante
                    </span>
                    <h3 className="text-2xl font-black font-display mt-0.5">
                      {modalMachine.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {modalMachine.tagline}
                    </p>
                  </div>

                  {/* Finish Selector in Modal */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-stone-400 uppercase">
                      Escolha o acabamento estrutural:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetFinishForMachine(modalMachine.id, 'epoxi')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          getMachineFinish(modalMachine.id) === 'epoxi'
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-black'
                            : 'bg-stone-900 text-stone-300 border-stone-700'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-stone-950 inline-block" />
                        <span>Pintura Epóxi</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetFinishForMachine(modalMachine.id, 'natural')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          getMachineFinish(modalMachine.id) === 'natural'
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-black'
                            : 'bg-stone-900 text-stone-300 border-stone-700'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block" />
                        <span>Aço Natural</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs text-stone-300 bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Capacidade:</span>
                      <strong className="text-white font-mono">
                        {modalMachine.capacityKgPerHour.min} a {modalMachine.capacityKgPerHour.max} kg/h
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Motor:</span>
                      <strong className="text-white">{modalMachine.motorHp}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Alimentação:</span>
                      <strong className="text-white text-right max-w-[180px] truncate">{modalMachine.voltage}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Garantia:</span>
                      <strong className="text-amber-400">1 Ano Direto de Fábrica</strong>
                    </div>
                  </div>

                  {/* Direct WhatsApp Quote Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const finishLabel = getMachineFinish(modalMachine.id) === 'epoxi' ? 'Pintura Epóxi Premium' : 'Industrial Natural';
                      onOpenWhatsApp(
                        `Olá! Gostaria de receber a proposta comercial da Peletizadora ${modalMachine.name} com acabamento em ${finishLabel}. Fábrica em Capitão Leônidas Marques - PR.`
                      );
                    }}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Falar com Engenheiro no WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
