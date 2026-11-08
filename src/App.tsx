/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SavingsCalculator } from './components/SavingsCalculator';
import { CostComparisonTable } from './components/CostComparisonTable';
import { MachineCatalog } from './components/MachineCatalog';
import { PelletAdvantages } from './components/PelletAdvantages';
import { FormulaAssistant } from './components/FormulaAssistant';
import { Testimonials } from './components/Testimonials';
import { DirectFactoryModal } from './components/DirectFactoryModal';
import { FloatingWhatsAppBar } from './components/FloatingWhatsAppBar';
import { Footer } from './components/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState<string>('sapem-agro-350');

  const handleOpenWhatsApp = (customMsg?: string) => {
    const defaultMsg =
      "Olá SAPEM Industrial! Quero parar de queimar dinheiro com ração cara e fabricar na minha propriedade com o melhor preço de fábrica.";
    const text = encodeURIComponent(customMsg || defaultMsg);
    const whatsappUrl = `https://wa.me/5545991161010?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMachineFromCalculator = (machineId: string) => {
    setSelectedMachineId(machineId);
    handleScrollTo('maquinas');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      {/* Header */}
      <Header
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenModal={() => setIsModalOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main>
        {/* Hero with Audio Narration Player (Gemini 3.8 Flash TTS) */}
        <Hero onOpenWhatsApp={handleOpenWhatsApp} onScrollTo={handleScrollTo} />

        {/* Savings Calculator (Economômetro) */}
        <SavingsCalculator
          onOpenWhatsApp={handleOpenWhatsApp}
          onSelectMachine={handleSelectMachineFromCalculator}
        />

        {/* Visual Cost Comparison Breakdown with Explanatory Icons */}
        <CostComparisonTable
          onOpenWhatsApp={handleOpenWhatsApp}
          onScrollToCalculator={() => handleScrollTo('economometro')}
        />

        {/* Machine Catalog & Specs */}
        <MachineCatalog
          onOpenWhatsApp={handleOpenWhatsApp}
          selectedMachineId={selectedMachineId}
        />

        {/* Pellet vs Mash Advantages */}
        <PelletAdvantages onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Recipe & Moisture Assistant */}
        <FormulaAssistant onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Producer Proof & Testimonials */}
        <Testimonials />
      </main>

      {/* Footer & FAQ */}
      <Footer
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenModal={() => setIsModalOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Sticky Floating WhatsApp Bar */}
      <FloatingWhatsAppBar onOpenWhatsApp={handleOpenWhatsApp} />

      {/* Quote / Demo Request Modal */}
      <DirectFactoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenWhatsApp={handleOpenWhatsApp}
        initialMachineInterest={selectedMachineId}
      />
    </div>
  );
}
