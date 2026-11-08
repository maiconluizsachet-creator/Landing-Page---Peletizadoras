/**
 * Financial and nutritional calculations for SAPEM Peletizadoras
 */

export interface AnimalProfile {
  id: string;
  name: string;
  icon: string;
  defaultMonthlyKg: number;
  recommendedMatrixMm: number; // e.g. 2.5, 4, 6, 8mm
  avgCommercialPricePerKg: number; // in R$
  avgOwnCostPerKg: number; // in R$
  efficiencyBoostPercent: number; // reduction in feed waste with pellets
  description: string;
  herdUnitName: string;
  defaultHerdSize: number;
  avgMonthlyKgPerAnimal: number; // kg consumed per animal per month
  herdSliderConfig: {
    min: number;
    max: number;
    step: number;
    presets: number[];
  };
  typicalDiet: {
    name: string;
    percentage: number;
    avgCostPerKg: number;
  }[];
}

export const ANIMAL_PROFILES: AnimalProfile[] = [
  {
    id: 'bovinos',
    name: 'Bovinos (Corte e Leite)',
    icon: 'beef',
    defaultMonthlyKg: 6000,
    recommendedMatrixMm: 6,
    avgCommercialPricePerKg: 2.35,
    avgOwnCostPerKg: 1.25,
    efficiencyBoostPercent: 18,
    description: 'Evita a seleção de partículas no cocho e melhora a digestibilidade do amido.',
    herdUnitName: 'cabeças de gado',
    defaultHerdSize: 25,
    avgMonthlyKgPerAnimal: 240, // ~8kg/dia
    herdSliderConfig: {
      min: 5,
      max: 200,
      step: 5,
      presets: [15, 25, 50, 100],
    },
    typicalDiet: [
      { name: 'Milho Moído', percentage: 55, avgCostPerKg: 0.95 },
      { name: 'Farelo de Soja', percentage: 25, avgCostPerKg: 2.10 },
      { name: 'Farelo de Trigo / Casquinha', percentage: 15, avgCostPerKg: 0.85 },
      { name: 'Núcleo Mineral / Ureia', percentage: 5, avgCostPerKg: 3.50 },
    ],
  },
  {
    id: 'suinos',
    name: 'Suínos (Creche e Terminação)',
    icon: 'piggy-bank',
    defaultMonthlyKg: 8000,
    recommendedMatrixMm: 4,
    avgCommercialPricePerKg: 2.55,
    avgOwnCostPerKg: 1.38,
    efficiencyBoostPercent: 20,
    description: 'Ração peletizada reduz úlceras gástricas e elimina desperdício de pó no comedouro.',
    herdUnitName: 'suínos no plantel',
    defaultHerdSize: 100,
    avgMonthlyKgPerAnimal: 80, // ~2.6kg/dia
    herdSliderConfig: {
      min: 20,
      max: 600,
      step: 10,
      presets: [50, 100, 200, 400],
    },
    typicalDiet: [
      { name: 'Milho Moído Fino', percentage: 62, avgCostPerKg: 0.95 },
      { name: 'Farelo de Soja 46%', percentage: 30, avgCostPerKg: 2.15 },
      { name: 'Premix Vitamínico Mineral', percentage: 5, avgCostPerKg: 4.20 },
      { name: 'Óleo Vegetal / Gordura', percentage: 3, avgCostPerKg: 4.80 },
    ],
  },
  {
    id: 'aves',
    name: 'Aves (Frango de Corte e Postura)',
    icon: 'feather',
    defaultMonthlyKg: 4500,
    recommendedMatrixMm: 3,
    avgCommercialPricePerKg: 2.65,
    avgOwnCostPerKg: 1.42,
    efficiencyBoostPercent: 22,
    description: 'Pellets uniformes aumentam o consumo voluntário e reduzem o tempo de engorda.',
    herdUnitName: 'aves / galinhas',
    defaultHerdSize: 1500,
    avgMonthlyKgPerAnimal: 3, // ~100g/dia
    herdSliderConfig: {
      min: 200,
      max: 15000,
      step: 100,
      presets: [500, 1500, 3000, 6000],
    },
    typicalDiet: [
      { name: 'Milho Moído', percentage: 60, avgCostPerKg: 0.95 },
      { name: 'Farelo de Soja', percentage: 32, avgCostPerKg: 2.15 },
      { name: 'Calcário Calcítico / Fosfato', percentage: 4, avgCostPerKg: 1.20 },
      { name: 'Núcleo de Postura/Corte', percentage: 4, avgCostPerKg: 4.50 },
    ],
  },
  {
    id: 'ovinos_caprinos',
    name: 'Ovinos & Caprinos',
    icon: 'shield',
    defaultMonthlyKg: 3000,
    recommendedMatrixMm: 4,
    avgCommercialPricePerKg: 2.45,
    avgOwnCostPerKg: 1.28,
    efficiencyBoostPercent: 17,
    description: 'Facilidade de arraçoamento em confinamento com zero perda de pó por vento.',
    herdUnitName: 'cabeças de ovinos/caprinos',
    defaultHerdSize: 80,
    avgMonthlyKgPerAnimal: 37.5, // ~1.25kg/dia
    herdSliderConfig: {
      min: 15,
      max: 400,
      step: 5,
      presets: [40, 80, 150, 300],
    },
    typicalDiet: [
      { name: 'Milho Moído', percentage: 50, avgCostPerKg: 0.95 },
      { name: 'Farelo de Algodão / Soja', percentage: 22, avgCostPerKg: 1.95 },
      { name: 'Feno Moído / Casca', percentage: 22, avgCostPerKg: 0.70 },
      { name: 'Sal Mineral Ovinos', percentage: 6, avgCostPerKg: 3.20 },
    ],
  },
  {
    id: 'equinos',
    name: 'Equinos',
    icon: 'horse',
    defaultMonthlyKg: 2500,
    recommendedMatrixMm: 8,
    avgCommercialPricePerKg: 2.85,
    avgOwnCostPerKg: 1.48,
    efficiencyBoostPercent: 19,
    description: 'Pellet livre de poeira respiratória com cozimento seguro do amido contra cólicas.',
    herdUnitName: 'equinos / cavalos',
    defaultHerdSize: 15,
    avgMonthlyKgPerAnimal: 165, // ~5.5kg/dia
    herdSliderConfig: {
      min: 2,
      max: 100,
      step: 1,
      presets: [5, 15, 30, 60],
    },
    typicalDiet: [
      { name: 'Aveia / Milho Laminado', percentage: 45, avgCostPerKg: 1.30 },
      { name: 'Farelo de Trigo', percentage: 25, avgCostPerKg: 0.90 },
      { name: 'Farelo de Soja', percentage: 18, avgCostPerKg: 2.10 },
      { name: 'Melaço + Núcleo Equino', percentage: 12, avgCostPerKg: 3.10 },
    ],
  },
  {
    id: 'peixes',
    name: 'Piscicultura / Tilápias',
    icon: 'fish',
    defaultMonthlyKg: 5000,
    recommendedMatrixMm: 3,
    avgCommercialPricePerKg: 3.40,
    avgOwnCostPerKg: 1.85,
    efficiencyBoostPercent: 24,
    description: 'Estabilidade física na água reduz lixiviação de nutrientes e melhora conversão alimentar.',
    herdUnitName: 'peixes / tilápias em tanque',
    defaultHerdSize: 3200,
    avgMonthlyKgPerAnimal: 1.56,
    herdSliderConfig: {
      min: 500,
      max: 30000,
      step: 250,
      presets: [1500, 3200, 7000, 15000],
    },
    typicalDiet: [
      { name: 'Farelo de Soja 46%', percentage: 40, avgCostPerKg: 2.15 },
      { name: 'Milho / Quirera', percentage: 32, avgCostPerKg: 0.95 },
      { name: 'Farinha de Peixe / Vísceras', percentage: 18, avgCostPerKg: 3.80 },
      { name: 'Premix Aquacultura + Aglutinante', percentage: 10, avgCostPerKg: 4.90 },
    ],
  },
];

export function calculateMonthlyKgFromHerd(animal: AnimalProfile, herdSize: number): number {
  const safeHerd = Math.max(1, Number(herdSize) || animal.defaultHerdSize);
  return Math.round(safeHerd * animal.avgMonthlyKgPerAnimal);
}

export function calculateHerdFromMonthlyKg(animal: AnimalProfile, monthlyKg: number): number {
  const safeKg = Math.max(1, Number(monthlyKg) || animal.defaultMonthlyKg);
  return Math.max(1, Math.round(safeKg / animal.avgMonthlyKgPerAnimal));
}

export type MachineFinish = 'epoxi' | 'natural';

export interface MachineModel {
  id: string;
  name: string;
  modelCode: string;
  tagline: string;
  capacityKgPerHour: { min: number; max: number };
  motorHp: string;
  voltage: string;
  estimatedPrice: number; // R$
  recommendedForMonthlyKg: { min: number; max: number };
  matrixDiameters: number[]; // mm
  features: string[];
  imageBadge: string;
  recommendedRole: string;
  images: {
    epoxi: string;
    natural: string;
  };
}

export const SAPEM_MACHINES: MachineModel[] = [
  {
    id: 'sapem-pls-025-eco',
    name: 'SAPEM PLS-025 ECO',
    modelCode: 'PLS 025 ECO',
    tagline: 'Super compacta e econômica para chácaras e pequenos criadores',
    capacityKgPerHour: { min: 40, max: 70 },
    motorHp: '3.0 CV',
    voltage: 'Monofásica 220V',
    estimatedPrice: 9800,
    recommendedForMonthlyKg: { min: 300, max: 2000 },
    matrixDiameters: [2.5, 3.0, 4.0],
    features: [
      'Ligação direta em tomada comum monofásica 220V residencial/rural',
      'Funil cônico injetado e estrutura com rodízios de alta mobilidade',
      'Matriz plana reversível de dupla face para maior vida útil',
      'Chave liga/desliga com botão de emergência tipo cogumelo',
    ],
    imageBadge: 'Econômica Monofásica',
    recommendedRole: 'Chácaras e Criação Familiar',
    images: {
      epoxi: '/assets/machines/pls-025-eco-epoxi.jpg',
      natural: '/assets/machines/pls-025-eco-natural.jpg',
    },
  },
  {
    id: 'sapem-mini',
    name: 'SAPEM PLS-050 ECO',
    modelCode: 'PLS 050 ECO',
    tagline: 'Matriz plana campeã de vendas para agricultura familiar',
    capacityKgPerHour: { min: 80, max: 150 },
    motorHp: '5.0 a 7.5 CV',
    voltage: 'Monofásica 220V ou Trifásica 220/380V',
    estimatedPrice: 13900,
    recommendedForMonthlyKg: { min: 800, max: 4500 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0],
    features: [
      'Operação contínua em rede rural monofásica sem sobrecarga',
      'Roletes duplos em aço cromo temperado de alta pressão mecânica',
      'Chassi naval com pintura epóxi ou acabamento industrial natural',
      'Bocal de saída direcionável com grelha de aeração rápida',
    ],
    imageBadge: 'Mais Acessível Monofásica',
    recommendedRole: 'Pequenos Produtores e Sítios',
    images: {
      epoxi: '/assets/machines/pls-050-eco-epoxi.jpg',
      natural: '/assets/machines/pls-050-eco-natural.jpg',
    },
  },
  {
    id: 'sapem-pls-050-plus',
    name: 'SAPEM PLS-050 PLUS',
    modelCode: 'PLS 050 PLUS',
    tagline: 'Acionamento flangeado direto com calha longa perfurada',
    capacityKgPerHour: { min: 100, max: 180 },
    motorHp: '7.5 CV',
    voltage: 'Trifásica 220/380V ou Monofásica 220V Reforçada',
    estimatedPrice: 16500,
    recommendedForMonthlyKg: { min: 1500, max: 6000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0],
    features: [
      'Motor acoplado direto sem correias para máximo rendimento energético',
      'Calha de descarga longa perfurada para separação automática de finos',
      'Quatro rodas de grande diâmetro com trava de segurança para galpão',
      'Adesivagem técnica de segurança operacional NR-12 de fábrica',
    ],
    imageBadge: 'Acoplamento Direto',
    recommendedRole: 'Pequenas Granjas e Haras',
    images: {
      epoxi: '/assets/machines/pls-050-plus-epoxi.jpg',
      natural: '/assets/machines/pls-050-plus-natural.jpg',
    },
  },
  {
    id: 'sapem-pls-100-plus',
    name: 'SAPEM PLS-100 PLUS',
    modelCode: 'PLS 100 PLUS',
    tagline: 'Conjunto de alta compressão para rações com altos teores de fibra',
    capacityKgPerHour: { min: 180, max: 280 },
    motorHp: '10.0 CV WEG',
    voltage: 'Trifásica 220/380V',
    estimatedPrice: 19800,
    recommendedForMonthlyKg: { min: 3000, max: 10000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0, 8.0],
    features: [
      'Motor WEG W22 Premium de alto rendimento elétrico e longa vida útil',
      'Caixa de compressão reforçada para peletizar milho, farelos e feno',
      'Chave liga-desliga com proteção de sobrecorrente e relé térmico',
      'Bandeja de apoio frontal e alças ergonômicas de transporte',
    ],
    imageBadge: 'Alta Pressão',
    recommendedRole: 'Criação de Bovinos e Ovinos',
    images: {
      epoxi: '/assets/machines/pls-100-plus-epoxi.jpg',
      natural: '/assets/machines/pls-100-plus-natural.jpg',
    },
  },
  {
    id: 'sapem-pls-100-pto',
    name: 'SAPEM PLS-100 PTO (Trator)',
    modelCode: 'PLS 100 PTO',
    tagline: 'Acionada pela Tomada de Força (TDP) do trator para peletizar no pasto',
    capacityKgPerHour: { min: 200, max: 350 },
    motorHp: 'Cardan TDP 540 RPM (Tratores 25 a 75 CV)',
    voltage: 'Tomada de Força TDP Trator (Sem necessidade de energia elétrica)',
    estimatedPrice: 18200,
    recommendedForMonthlyKg: { min: 3000, max: 14000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0, 8.0],
    features: [
      'Independência total de fiação elétrica: trabalha no campo, retiro ou pasto',
      'Engate universal de 3 pontos com estrutura tubular de alta resistência',
      'Eixo cardan com protetor de segurança e multiplicador de rotação banhado em óleo',
      'Descarrega direto no carretão basculante ou bombonas na lavoura',
    ],
    imageBadge: 'TDP Trator 🚜 Sem Fios',
    recommendedRole: 'Retiros, Pastos e Fazendas sem Rede Trifásica',
    images: {
      epoxi: '/assets/machines/pls-100-pto-epoxi.jpg',
      natural: '/assets/machines/pls-100-pto-natural.jpg',
    },
  },
  {
    id: 'sapem-agro-350',
    name: 'SAPEM PLT-200 Pro',
    modelCode: 'PLT 200 Pro',
    tagline: 'O modelo mais vendido do Brasil para média produção',
    capacityKgPerHour: { min: 250, max: 400 },
    motorHp: '12.5 a 15.0 CV',
    voltage: 'Trifásica 220/380/440V',
    estimatedPrice: 24500,
    recommendedForMonthlyKg: { min: 4000, max: 16000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0, 8.0],
    features: [
      'Redutor mecânico helicoidal banhado a óleo com eficiência superior a 96%',
      'Matriz plana reversível em aço especial cementado (dobro da vida útil)',
      'Chassi estrutural com 4 coxins niveladores antivibração para piso cimentado',
      'Funil ampliado com bocal lateral para conexão com rosca sem-fim dosadora',
    ],
    imageBadge: 'Campeã de Vendas ⭐',
    recommendedRole: 'Médias Fazendas e Confinamentos',
    images: {
      epoxi: '/assets/machines/plt-200-pro-epoxi.jpg',
      natural: '/assets/machines/plt-200-pro-natural.jpg',
    },
  },
  {
    id: 'sapem-plt-400-max',
    name: 'SAPEM PLT-400 MAX',
    modelCode: 'PLT 400 MAX',
    tagline: 'Painel elétrico de comando integrado com partida suave e dosagem contínua',
    capacityKgPerHour: { min: 350, max: 550 },
    motorHp: '20.0 CV WEG',
    voltage: 'Trifásica 220/380/440V Soft Starter',
    estimatedPrice: 34900,
    recommendedForMonthlyKg: { min: 8000, max: 28000 },
    matrixDiameters: [3.0, 4.0, 6.0, 8.0, 10.0],
    features: [
      'Painel elétrico frontal completo com botoeiras de comando e horímetro digital',
      'Linha de lubrificação sob pressão para roletes durante operação contínua',
      'Funil superior reforçado com bocal de aspiração de vapor',
      'Plataforma reforçada em perfil U com sapatas de sustentação mecânica',
    ],
    imageBadge: 'Painel Elétrico Integrado',
    recommendedRole: 'Confinamentos Intensivos e Cooperativas',
    images: {
      epoxi: '/assets/machines/plt-400-max-epoxi.jpg',
      natural: '/assets/machines/plt-400-max-natural.jpg',
    },
  },
  {
    id: 'sapem-turbo-700',
    name: 'SAPEM PLS-800 MAX',
    modelCode: 'PLS 800 MAX',
    tagline: 'Alto rendimento e trabalho pesado para turnos contínuos',
    capacityKgPerHour: { min: 600, max: 900 },
    motorHp: '30.0 CV WEG',
    voltage: 'Trifásica 380/440V Chave Estrela-Triângulo / Soft Starter',
    estimatedPrice: 48900,
    recommendedForMonthlyKg: { min: 15000, max: 45000 },
    matrixDiameters: [3.0, 4.0, 6.0, 8.0, 10.0],
    features: [
      'Tremonha superior industrial com grade de segurança para proteção do operador',
      'Painel de comando com porta de policarbonato e disjuntores magnéticos WEG',
      'Câmara de peletização de alta vazão com anel de retenção usinado em CNC',
      'Produz até 900 kg/h (mais de 7 toneladas por dia de trabalho contínuo)',
    ],
    imageBadge: 'Alta Produtividade',
    recommendedRole: 'Grandes Produtores e Fábricas Regionais',
    images: {
      epoxi: '/assets/machines/pls-800-max-epoxi.jpg',
      natural: '/assets/machines/pls-800-max-natural.jpg',
    },
  },
  {
    id: 'sapem-plt-1000-pro',
    name: 'SAPEM PLT-1000 Pro',
    modelCode: 'PLT 1000 Pro',
    tagline: 'Sistema de lubrificação central automatizada e alta capacidade por hora',
    capacityKgPerHour: { min: 800, max: 1250 },
    motorHp: '40.0 a 50.0 CV WEG',
    voltage: 'Trifásica 380/440V Painel Digital Soft Starter',
    estimatedPrice: 64000,
    recommendedForMonthlyKg: { min: 25000, max: 70000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0, 8.0, 10.0, 12.0],
    features: [
      'Reservatório de lubrificação pressurizada automática para trabalho 24/7',
      'Painel elétrico climatizado com leitura digital de amperagem e temperatura',
      'Conjunto motor-redutor industrial pesado com engrenagens cementadas',
      'Bocal duplo de inspeção rápida de desgaste da matriz',
    ],
    imageBadge: 'Lubrificação Automática',
    recommendedRole: 'Indústrias de Nutrição Animal e Grandes Confinamentos',
    images: {
      epoxi: '/assets/machines/plt-1000-pro-epoxi.jpg',
      natural: '/assets/machines/plt-1000-pro-natural.jpg',
    },
  },
  {
    id: 'sapem-industrial-1500',
    name: 'SAPEM PLS-2000 ULTRA',
    modelCode: 'PLS 2000 ULTRA',
    tagline: 'Planta industrial contínua com painel digital IHM Touch e inversor VFD',
    capacityKgPerHour: { min: 1500, max: 2500 },
    motorHp: '75.0 CV WEG Premium',
    voltage: 'Trifásica 380/440V Painel Inversor VFD + PLC IHM Digital',
    estimatedPrice: 89500,
    recommendedForMonthlyKg: { min: 40000, max: 150000 },
    matrixDiameters: [2.5, 3.0, 4.0, 6.0, 8.0, 10.0, 12.0],
    features: [
      'Painel industrial de grande porte com CLP microprocessado e tela IHM sensível ao toque',
      'Inversor de frequência de 75 CV para controle milimétrico de torque e rotação da matriz',
      'Chassi reforçado em viga I estrutural com base antivibratória industrial',
      'Capacidade impressionante de até 2.500 kg/hora (20 toneladas por turno comercial)',
    ],
    imageBadge: 'Planta Industrial 2.5 Ton/h 🏆',
    recommendedRole: 'Usinas de Ração Comercial e Granjas Integradas',
    images: {
      epoxi: '/assets/machines/pls-2000-ultra-epoxi.jpg',
      natural: '/assets/machines/pls-2000-ultra-natural.jpg',
    },
  },
];

export interface SimulationInputs {
  monthlyKg: number;
  commercialPricePerKg: number;
  ownCostPerKg: number;
}

export interface SimulationResult {
  monthlyCommercialTotal: number;
  monthlyOwnTotal: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  savingsPerBag40kg: number;
  recommendedMachine: MachineModel;
  paybackMonths: number;
  effectiveFeedGainKg: number;
}

export function calculateSimulation(inputs: SimulationInputs): SimulationResult {
  const monthlyKg = Math.max(100, Number(inputs.monthlyKg) || 1000);
  const commercialPrice = Math.max(0.1, Number(inputs.commercialPricePerKg) || 2.4);
  const ownCost = Math.max(0.05, Number(inputs.ownCostPerKg) || 1.3);

  const monthlyCommercialTotal = monthlyKg * commercialPrice;
  const monthlyOwnTotal = monthlyKg * ownCost;
  const monthlySavings = Math.max(0, monthlyCommercialTotal - monthlyOwnTotal);
  const annualSavings = monthlySavings * 12;

  const savingsPercentage = commercialPrice > 0
    ? Math.round(((commercialPrice - ownCost) / commercialPrice) * 100)
    : 0;

  const savingsPerBag40kg = (commercialPrice - ownCost) * 40;

  // Find best machine
  let recommendedMachine = SAPEM_MACHINES[0];
  for (const machine of SAPEM_MACHINES) {
    if (monthlyKg >= machine.recommendedForMonthlyKg.min) {
      recommendedMachine = machine;
    }
  }

  // Payback in months
  const paybackMonths = monthlySavings > 0
    ? Number((recommendedMachine.estimatedPrice / monthlySavings).toFixed(1))
    : 99;

  // Better feed conversion ~ 18% less wasted residue
  const effectiveFeedGainKg = Math.round(monthlyKg * 0.18);

  return {
    monthlyCommercialTotal: Math.round(monthlyCommercialTotal),
    monthlyOwnTotal: Math.round(monthlyOwnTotal),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    savingsPercentage,
    savingsPerBag40kg: Number(savingsPerBag40kg.toFixed(2)),
    recommendedMachine,
    paybackMonths,
    effectiveFeedGainKg,
  };
}

export interface CumulativeGrowthPoint {
  month: number;
  monthLabel: string;
  cumulativeCommercial: number;
  cumulativeOwnTotal: number;
  cumulativeOwnWithMachine: number;
  cumulativeGrossSavings: number;
  netSavingsAfterMachine: number;
}

export function calculateCumulativeGrowth(
  simulation: SimulationResult,
  customMachinePrice?: number
): CumulativeGrowthPoint[] {
  const machinePrice = customMachinePrice ?? simulation.recommendedMachine.estimatedPrice;
  const milestoneMonths = [0, 3, 6, 9, 12, 18, 24];

  return milestoneMonths.map((m) => {
    const cumulativeCommercial = Math.round(simulation.monthlyCommercialTotal * m);
    const cumulativeOwnTotal = Math.round(simulation.monthlyOwnTotal * m);
    const cumulativeOwnWithMachine = Math.round(machinePrice + cumulativeOwnTotal);
    const cumulativeGrossSavings = Math.round(simulation.monthlySavings * m);
    const netSavingsAfterMachine = Math.round(cumulativeGrossSavings - machinePrice);

    return {
      month: m,
      monthLabel: m === 0 ? 'Início' : `${m} meses`,
      cumulativeCommercial,
      cumulativeOwnTotal,
      cumulativeOwnWithMachine,
      cumulativeGrossSavings,
      netSavingsAfterMachine,
    };
  });
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumberBR(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
