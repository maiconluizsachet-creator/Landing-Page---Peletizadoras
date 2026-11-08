import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSimulation,
  calculateCumulativeGrowth,
  calculateMonthlyKgFromHerd,
  calculateHerdFromMonthlyKg,
  ANIMAL_PROFILES,
  SAPEM_MACHINES,
} from './calculator';

test('calculateSimulation correctly calculates monthly and annual savings', () => {
  const result = calculateSimulation({
    monthlyKg: 10000,
    commercialPricePerKg: 2.50,
    ownCostPerKg: 1.30,
  });

  // 10,000 * 2.50 = 25,000
  assert.equal(result.monthlyCommercialTotal, 25000);
  // 10,000 * 1.30 = 13,000
  assert.equal(result.monthlyOwnTotal, 13000);
  // 25,000 - 13,000 = 12,000
  assert.equal(result.monthlySavings, 12000);
  // 12,000 * 12 = 144,000
  assert.equal(result.annualSavings, 144000);
  // savings per 40kg bag = (2.50 - 1.30) * 40 = 48.00
  assert.equal(result.savingsPerBag40kg, 48.0);
  // percentage = (1.20 / 2.50) * 100 = 48%
  assert.equal(result.savingsPercentage, 48);
  // Payback is reasonable (< 6 months)
  assert.ok(result.paybackMonths > 0 && result.paybackMonths < 12);
});

test('calculateSimulation recommends appropriate machine for scale', () => {
  const smallScale = calculateSimulation({
    monthlyKg: 1500,
    commercialPricePerKg: 2.50,
    ownCostPerKg: 1.30,
  });
  assert.equal(smallScale.recommendedMachine.id, 'sapem-mini');

  const mediumScale = calculateSimulation({
    monthlyKg: 8000,
    commercialPricePerKg: 2.50,
    ownCostPerKg: 1.30,
  });
  assert.equal(mediumScale.recommendedMachine.id, 'sapem-agro-350');

  const largeScale = calculateSimulation({
    monthlyKg: 45000,
    commercialPricePerKg: 2.50,
    ownCostPerKg: 1.30,
  });
  assert.equal(largeScale.recommendedMachine.id, 'sapem-industrial-1500');
});

test('calculateCumulativeGrowth computes milestone savings for 6, 12, and 24 months based on machine investment', () => {
  const simulation = calculateSimulation({
    monthlyKg: 10000,
    commercialPricePerKg: 2.50,
    ownCostPerKg: 1.30,
  });
  const growth = calculateCumulativeGrowth(simulation);

  assert.equal(growth.length, 7);

  // Month 0
  const m0 = growth.find((p) => p.month === 0)!;
  assert.equal(m0.cumulativeGrossSavings, 0);
  assert.equal(m0.netSavingsAfterMachine, -simulation.recommendedMachine.estimatedPrice);

  // Month 6
  const m6 = growth.find((p) => p.month === 6)!;
  assert.equal(m6.cumulativeGrossSavings, 72000); // 12,000 * 6
  assert.equal(m6.netSavingsAfterMachine, 72000 - simulation.recommendedMachine.estimatedPrice);
  assert.ok(m6.netSavingsAfterMachine > 0);

  // Month 12
  const m12 = growth.find((p) => p.month === 12)!;
  assert.equal(m12.cumulativeGrossSavings, 144000); // 12,000 * 12
  assert.equal(m12.netSavingsAfterMachine, 144000 - simulation.recommendedMachine.estimatedPrice);

  // Month 24
  const m24 = growth.find((p) => p.month === 24)!;
  assert.equal(m24.cumulativeGrossSavings, 288000); // 12,000 * 24
  assert.equal(m24.netSavingsAfterMachine, 288000 - simulation.recommendedMachine.estimatedPrice);
});

test('ANIMAL_PROFILES has valid configurations for all standard species', () => {
  assert.ok(ANIMAL_PROFILES.length >= 5);
  for (const animal of ANIMAL_PROFILES) {
    assert.ok(animal.recommendedMatrixMm > 0);
    assert.ok(animal.avgCommercialPricePerKg > animal.avgOwnCostPerKg);
    assert.ok(animal.typicalDiet.length >= 3);
  }
});

test('calculateMonthlyKgFromHerd converts animal count to monthly kg accurately', () => {
  const bovinos = ANIMAL_PROFILES.find((a) => a.id === 'bovinos')!;
  // 50 cabeças * 240 kg/animal = 12,000 kg
  assert.equal(calculateMonthlyKgFromHerd(bovinos, 50), 12000);

  const suinos = ANIMAL_PROFILES.find((a) => a.id === 'suinos')!;
  // 200 suínos * 80 kg/animal = 16,000 kg
  assert.equal(calculateMonthlyKgFromHerd(suinos, 200), 16000);

  const aves = ANIMAL_PROFILES.find((a) => a.id === 'aves')!;
  // 3000 aves * 3 kg/animal = 9,000 kg
  assert.equal(calculateMonthlyKgFromHerd(aves, 3000), 9000);
});

test('calculateHerdFromMonthlyKg converts monthly kg to approximate animal count', () => {
  const bovinos = ANIMAL_PROFILES.find((a) => a.id === 'bovinos')!;
  // 12,000 kg / 240 kg = 50 cabeças
  assert.equal(calculateHerdFromMonthlyKg(bovinos, 12000), 50);

  const suinos = ANIMAL_PROFILES.find((a) => a.id === 'suinos')!;
  // 8,000 kg / 80 kg = 100 suínos
  assert.equal(calculateHerdFromMonthlyKg(suinos, 8000), 100);
});

test('dynamically updating herd size updates cumulative growth milestones (6, 12, 24 months)', () => {
  const bovinos = ANIMAL_PROFILES.find((a) => a.id === 'bovinos')!;
  
  // Baseline herd of 25 heads
  const kg25 = calculateMonthlyKgFromHerd(bovinos, 25); // 6,000 kg
  const sim25 = calculateSimulation({
    monthlyKg: kg25,
    commercialPricePerKg: 2.35,
    ownCostPerKg: 1.25,
  });
  const growth25 = calculateCumulativeGrowth(sim25);
  const m6_25 = growth25.find((p) => p.month === 6)!.netSavingsAfterMachine;
  const m12_25 = growth25.find((p) => p.month === 12)!.netSavingsAfterMachine;
  const m24_25 = growth25.find((p) => p.month === 24)!.netSavingsAfterMachine;

  // Expanded herd of 50 heads
  const kg50 = calculateMonthlyKgFromHerd(bovinos, 50); // 12,000 kg
  const sim50 = calculateSimulation({
    monthlyKg: kg50,
    commercialPricePerKg: 2.35,
    ownCostPerKg: 1.25,
  });
  const growth50 = calculateCumulativeGrowth(sim50);
  const m6_50 = growth50.find((p) => p.month === 6)!.netSavingsAfterMachine;
  const m12_50 = growth50.find((p) => p.month === 12)!.netSavingsAfterMachine;
  const m24_50 = growth50.find((p) => p.month === 24)!.netSavingsAfterMachine;

  // Monthly savings should double when herd size doubles
  assert.equal(sim50.monthlySavings, sim25.monthlySavings * 2);

  // Cumulative savings at 6, 12, and 24 months should grow dynamically
  assert.ok(m6_50 > m6_25, '6-month savings must be higher with larger herd');
  assert.ok(m12_50 > m12_25, '12-month savings must be higher with larger herd');
  assert.ok(m24_50 > m24_25, '24-month savings must be higher with larger herd');
});

