import React, { useState, useId } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calculator,
  ArrowRight,
  MessageCircle,
  PiggyBank,
  Check,
  Percent,
  Clock,
  Sparkles,
  Users,
  Scale,
  Plus,
  Minus,
} from 'lucide-react';
import {
  ANIMAL_PROFILES,
  calculateSimulation,
  calculateMonthlyKgFromHerd,
  calculateHerdFromMonthlyKg,
  formatCurrencyBRL,
  formatNumberBR,
  AnimalProfile,
} from '../utils/calculator';
import { SavingsGrowthChart } from './SavingsGrowthChart';

interface SavingsCalculatorProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onSelectMachine: (machineId: string) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  onOpenWhatsApp,
  onSelectMachine,
}) => {
  const volumeInputId = useId();
  const herdInputId = useId();
  const commercialInputId = useId();
  const ownCostInputId = useId();

  const [inputMode, setInputMode] = useState<'herd' | 'weight'>('herd');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalProfile>(ANIMAL_PROFILES[0]);
  const [herdSize, setHerdSize] = useState<number>(ANIMAL_PROFILES[0].defaultHerdSize);
  const [monthlyKg, setMonthlyKg] = useState<number>(
    calculateMonthlyKgFromHerd(ANIMAL_PROFILES[0], ANIMAL_PROFILES[0].defaultHerdSize)
  );
  const [commercialPricePerKg, setCommercialPricePerKg] = useState<number>(
    ANIMAL_PROFILES[0].avgCommercialPricePerKg
  );
  const [ownCostPerKg, setOwnCostPerKg] = useState<number>(
    ANIMAL_PROFILES[0].avgOwnCostPerKg
  );

  const handleAnimalSelect = (animal: AnimalProfile) => {
    setSelectedAnimal(animal);
    const newHerd = animal.defaultHerdSize;
    setHerdSize(newHerd);
    setMonthlyKg(calculateMonthlyKgFromHerd(animal, newHerd));
    setCommercialPricePerKg(animal.avgCommercialPricePerKg);
    setOwnCostPerKg(animal.avgOwnCostPerKg);
  };

  const handleHerdChange = (newHerd: number) => {
    const valid = Math.max(1, newHerd);
    setHerdSize(valid);
    setMonthlyKg(calculateMonthlyKgFromHerd(selectedAnimal, valid));
  };

  const handleMonthlyKgChange = (newKg: number) => {
    const valid = Math.max(100, newKg);
    setMonthlyKg(valid);
    setHerdSize(calculateHerdFromMonthlyKg(selectedAnimal, valid));
  };

  const simulation = calculateSimulation({
    monthlyKg,
    commercialPricePerKg,
    ownCostPerKg,
  });

  const handleSendToWhatsApp = () => {
    const msg = `Olá Fábrica SAPEM! Fiz a simulação no site:
• Criação: ${selectedAnimal.name} (${formatNumberBR(herdSize)} ${selectedAnimal.herdUnitName})
• Consumo mensal projetado: ${formatNumberBR(monthlyKg)} kg/mês (${formatNumberBR(Math.round(monthlyKg / 40))} sacas)
• Preço da ração comprada: ${formatCurrencyBRL(commercialPricePerKg)}/kg (${formatCurrencyBRL(commercialPricePerKg * 40)}/saca)
• Custo estimado fabricando na fazenda: ${formatCurrencyBRL(ownCostPerKg)}/kg
• Minha economia projetada: ${formatCurrencyBRL(simulation.monthlySavings)}/mês (${formatCurrencyBRL(simulation.annualSavings)}/ano!)
• Modelo recomendado: ${simulation.recommendedMachine.name}

Gostaria de ver as opções de pagamento e prazo de entrega direto da indústria.`;
    onOpenWhatsApp(msg);
  };

  return (
    <section id="economometro" className="py-16 md:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-900 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            Simulador de Lucro do Produtor
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display tracking-tight">
            Descubra quanto você vai{' '}
            <span className="text-amber-600 underline decoration-amber-400 decoration-4">
              deixar de queimar
            </span>{' '}
            todo mês
          </h2>
          <p className="text-stone-600 text-base md:text-lg">
            Selecione a sua criação ou ajuste o seu rebanho. Veja em tempo real o dinheiro que volta para o seu bolso ao fabricar a ração na sua propriedade.
          </p>
        </div>

        {/* Animal Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {ANIMAL_PROFILES.map((animal) => {
            const isSelected = selectedAnimal.id === animal.id;
            return (
              <button
                key={animal.id}
                type="button"
                onClick={() => handleAnimalSelect(animal)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-950 border-amber-500 text-white shadow-xl ring-2 ring-amber-400 transform -translate-y-1'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                      Matriz {animal.recommendedMatrixMm}mm
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm leading-tight">{animal.name}</h4>
                </div>
                <p
                  className={`text-[11px] mt-2 font-medium ${
                    isSelected ? 'text-amber-300' : 'text-stone-500'
                  }`}
                >
                  Economia média {animal.efficiencyBoostPercent}%
                </p>
              </button>
            );
          })}
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
                Dados do seu Consumo Atual
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Ajuste os valores para refletir a realidade da sua propriedade:
              </p>
            </div>

            {/* Interactive Toggle: Herd Size vs Monthly Volume */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Modo de dimensionamento:
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Calculador Dinâmico
                </span>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200">
                <button
                  type="button"
                  data-testid="mode-toggle-herd"
                  onClick={() => setInputMode('herd')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === 'herd'
                      ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Nº de Animais (Rebanho)</span>
                </button>
                <button
                  type="button"
                  data-testid="mode-toggle-weight"
                  onClick={() => setInputMode('weight')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === 'weight'
                      ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Consumo em Quilos (kg)</span>
                </button>
              </div>

              {/* Herd Size Slider & Stepper View */}
              {inputMode === 'herd' ? (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label htmlFor={herdInputId} className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-600" />
                      Tamanho do rebanho / plantel:
                    </label>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <button
                        type="button"
                        aria-label="Diminuir animais"
                        onClick={() =>
                          handleHerdChange(
                            Math.max(
                              selectedAnimal.herdSliderConfig.min,
                              herdSize - selectedAnimal.herdSliderConfig.step
                            )
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold border border-stone-300 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center bg-emerald-50 border border-emerald-300 rounded-xl px-2.5 py-1">
                        <input
                          id={herdInputId}
                          type="number"
                          data-testid="herd-size-input"
                          min={selectedAnimal.herdSliderConfig.min}
                          max={selectedAnimal.herdSliderConfig.max}
                          step={selectedAnimal.herdSliderConfig.step}
                          value={herdSize}
                          onChange={(e) => handleHerdChange(Number(e.target.value))}
                          className="w-16 font-black text-center text-emerald-900 bg-transparent focus:outline-none text-base"
                        />
                        <span className="text-xs font-bold text-emerald-800 ml-1">
                          {selectedAnimal.herdUnitName}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label="Aumentar animais"
                        onClick={() =>
                          handleHerdChange(
                            Math.min(
                              selectedAnimal.herdSliderConfig.max,
                              herdSize + selectedAnimal.herdSliderConfig.step
                            )
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold border border-stone-300 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Herd Slider */}
                  <input
                    type="range"
                    data-testid="herd-size-slider"
                    min={selectedAnimal.herdSliderConfig.min}
                    max={selectedAnimal.herdSliderConfig.max}
                    step={selectedAnimal.herdSliderConfig.step}
                    value={herdSize}
                    onChange={(e) => handleHerdChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-stone-200 rounded-lg"
                  />

                  {/* Min / Max Range Indicators */}
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                    <span>{formatNumberBR(selectedAnimal.herdSliderConfig.min)} {selectedAnimal.herdUnitName}</span>
                    <span>{formatNumberBR(Math.round(selectedAnimal.herdSliderConfig.max / 2))}</span>
                    <span>{formatNumberBR(selectedAnimal.herdSliderConfig.max)} {selectedAnimal.herdUnitName}</span>
                  </div>

                  {/* Animal Specific Herd Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-stone-500 font-medium mr-1">Atalhos rápidos:</span>
                    {selectedAnimal.herdSliderConfig.presets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        data-testid={`herd-preset-${preset}`}
                        onClick={() => handleHerdChange(preset)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                          herdSize === preset
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-black shadow-sm'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        {formatNumberBR(preset)} {selectedAnimal.herdUnitName.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Real-time Dynamic Consumption Breakdown */}
                  <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-700" />
                      <span className="text-stone-700">
                        Consumo mensal calculado ({formatNumberBR(selectedAnimal.avgMonthlyKgPerAnimal)} kg/animal):
                      </span>
                    </div>
                    <span className="font-black text-amber-900 text-sm">
                      {formatNumberBR(monthlyKg)} kg / mês
                    </span>
                  </div>
                </div>
              ) : (
                /* Monthly Volume (Weight in kg) View */
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor={volumeInputId} className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-amber-600" />
                      Consumo mensal de ração:
                    </label>
                    <span className="text-base font-black text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-300">
                      {formatNumberBR(monthlyKg)} kg / mês
                    </span>
                  </div>
                  <input
                    id={volumeInputId}
                    type="range"
                    data-testid="volume-slider"
                    min="500"
                    max="50000"
                    step="500"
                    value={monthlyKg}
                    onChange={(e) => handleMonthlyKgChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                    <span>500 kg</span>
                    <span>10.000 kg</span>
                    <span>25.000 kg</span>
                    <span>50.000 kg</span>
                  </div>

                  {/* Quick preset buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-stone-500 font-medium mr-1">Atalhos rápidos:</span>
                    {[2000, 5000, 10000, 20000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleMonthlyKgChange(val)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                          monthlyKg === val
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-emerald-50 hover:border-emerald-200'
                        }`}
                      >
                        {formatNumberBR(val)} kg
                      </button>
                    ))}
                  </div>

                  {/* Real-time Dynamic Herd Equivalence */}
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-700" />
                      <span className="text-stone-700">
                        Equivale aproximadamente a:
                      </span>
                    </div>
                    <span className="font-black text-emerald-900 text-sm">
                      ~{formatNumberBR(herdSize)} {selectedAnimal.herdUnitName}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Feed Price */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex justify-between items-center">
                <label htmlFor={commercialInputId} className="text-sm font-bold text-stone-700">
                  Preço que você paga na ração comprada:
                </label>
                <span className="text-xs text-stone-500 font-medium">
                  {formatCurrencyBRL(commercialPricePerKg * 40)} / saca de 40kg
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-stone-400 font-bold text-sm">R$</span>
                <input
                  id={commercialInputId}
                  type="number"
                  step="0.05"
                  min="0.5"
                  max="10"
                  value={commercialPricePerKg}
                  onChange={(e) => setCommercialPricePerKg(Math.max(0.1, Number(e.target.value)))}
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-bold text-stone-800"
                />
                <span className="absolute right-3 top-3 text-stone-400 text-xs font-semibold">por kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Média do mercado hoje: R$ 2,20 a R$ 2,80 por kg de ração pronta comercial.
              </p>
            </div>

            {/* On-farm raw materials cost */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex justify-between items-center">
                <label htmlFor={ownCostInputId} className="text-sm font-bold text-stone-700">
                  Custo para fazer na propriedade (Milho + Farelo + Núcleo):
                </label>
                <span className="text-xs text-emerald-700 font-bold">
                  {formatCurrencyBRL(ownCostPerKg * 40)} / saca de 40kg
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-stone-400 font-bold text-sm">R$</span>
                <input
                  id={ownCostInputId}
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="5"
                  value={ownCostPerKg}
                  onChange={(e) => setOwnCostPerKg(Math.max(0.05, Number(e.target.value)))}
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-bold text-stone-800"
                />
                <span className="absolute right-3 top-3 text-stone-400 text-xs font-semibold">por kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Considera grãos colhidos no sítio ou comprados a granel + energia elétrica (~R$ 0,08/kg).
              </p>
            </div>

            {/* Animal specific formula hint */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-stone-700">
              <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Dica zootécnica para {selectedAnimal.name}:
              </div>
              <p>{selectedAnimal.description}</p>
            </div>

          </div>

          {/* Results Display Box (High Impact) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Resultado da Sua Economia Real
                </span>
                <span className="text-xs bg-amber-400 text-stone-950 font-black px-2.5 py-0.5 rounded-full">
                  -{simulation.savingsPercentage}% de Custo
                </span>
              </div>

              {/* Big Savings Number */}
              <div className="space-y-1 mb-6">
                <span className="text-xs sm:text-sm text-stone-300 font-medium">
                  Você economiza todo mês:
                </span>
                <div
                  data-testid="monthly-savings-display"
                  className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-display tracking-tight"
                >
                  {formatCurrencyBRL(simulation.monthlySavings)}
                  <span className="text-lg sm:text-xl text-stone-400 font-normal"> / mês</span>
                </div>
                <div className="text-sm font-semibold text-amber-300 pt-1">
                  São <strong className="text-white text-base">{formatCurrencyBRL(simulation.annualSavings)}</strong> economizados todo ano!
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5">
                  <span className="text-[11px] text-stone-400 block mb-1">Economia por saca (40kg):</span>
                  <span className="text-xl font-black text-amber-400">
                    {formatCurrencyBRL(simulation.savingsPerBag40kg)}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">menos por cada saca</span>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5">
                  <span className="text-[11px] text-stone-400 block mb-1">Retorno do Investimento:</span>
                  <span className="text-xl font-black text-amber-300 flex items-center gap-1 font-mono">
                    <Clock className="w-4 h-4 text-amber-400" />
                    ~{simulation.paybackMonths} meses
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">A máquina se paga sozinha</span>
                </div>
              </div>

              {/* Recommended Machine Card */}
              <div className="bg-zinc-900/95 border border-amber-500/40 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">
                    Modelo Recomendado para Você:
                  </span>
                  <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-bold">
                    {simulation.recommendedMachine.imageBadge}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white p-1 border border-amber-500/40 shrink-0 overflow-hidden shadow-md flex items-center justify-center">
                    <img
                      src={simulation.recommendedMachine.images.epoxi}
                      alt={simulation.recommendedMachine.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-black text-white font-display truncate">
                        {simulation.recommendedMachine.name}
                      </h4>
                      <span className="text-xs text-amber-400 font-mono shrink-0">
                        {simulation.recommendedMachine.capacityKgPerHour.min}-
                        {simulation.recommendedMachine.capacityKgPerHour.max} kg/h
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-1">
                      {simulation.recommendedMachine.tagline}. Motor {simulation.recommendedMachine.motorHp}.
                    </p>
                  </div>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectMachine(simulation.recommendedMachine.id)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    Ver detalhes técnicos da máquina &rarr;
                  </button>
                  <span className="text-xs text-stone-400">
                    Garantia 1 ano de fábrica
                  </span>
                </div>
              </div>

            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                data-testid="whatsapp-quote-simulation"
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse-ring"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>Quero Economizar {formatCurrencyBRL(simulation.monthlySavings)}/mês</span>
              </button>

              <p className="text-center text-[11px] text-stone-400">
                Toque no botão para enviar sua simulação direto para os engenheiros da fábrica SAPEM no WhatsApp.
              </p>
            </div>

          </div>

        </div>

        {/* Visual Growth Graph showing cumulative savings over 6, 12, and 24 months based on machine investment */}
        <SavingsGrowthChart
          simulation={simulation}
          herdSize={herdSize}
          animal={selectedAnimal}
        />

      </div>
    </section>
  );
};
