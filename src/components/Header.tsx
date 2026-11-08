import React, { useState } from 'react';
import { Phone, ShieldCheck, Factory, Award, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpenModal: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWhatsApp, onOpenModal, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-white transition-all">
      {/* Top micro bar with official factory contacts */}
      <div className="bg-zinc-950 px-4 py-1.5 text-[11px] sm:text-xs text-stone-300 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Indústria 100% Nacional
            </span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="hidden sm:flex items-center gap-1 text-stone-300 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Garantia de 1 Ano Direto de Fábrica
            </span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline text-stone-400">
              Capitão Leônidas Marques – PR
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-200">
            <span className="hidden lg:inline text-stone-400">Vendas Diretas Indústria:</span>
            <button
              type="button"
              onClick={() => onOpenWhatsApp('Olá! Gostaria de falar com o comercial da fábrica SAPEM Industrial.')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>(45) 99116-1010</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onScrollTo('hero')}
        >
          <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-md shadow-black/40 border border-amber-500/40 flex items-center justify-center transition-all group-hover:border-amber-400 group-hover:scale-[1.02]">
            <img
              src="/assets/aistudio/00_-_LOGO_SAPEM-_1400_x_300_86aca99a.png"
              alt="SAPEM Industrial - Peletizadoras"
              className="h-7 sm:h-9 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1">
              <span>Peletizadoras Profissionais</span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Direto da Indústria • Capitão Leônidas Marques - PR
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-300">
          <button
            type="button"
            onClick={() => handleNavClick('economometro')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Calculadora de Economia
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('comparativo-custos')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Comparativo de Custos
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('maquinas')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Modelos de Máquinas
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('vantagens')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Vantagens do Pellet
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('assistente')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Fórmulas & Nutrição
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('depoimentos')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Produtores Satisfeitos
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
          >
            <Factory className="w-3.5 h-3.5 text-amber-400" />
            Cotação de Fábrica
          </button>

          <button
            type="button"
            data-testid="header-whatsapp-btn"
            onClick={() => onOpenWhatsApp('Olá! Vi o anúncio da Peletizadora SAPEM Industrial e gostaria de saber o valor direto da indústria.')}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-black/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse-ring"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>(45) 99116-1010</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
            className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <button
            type="button"
            onClick={() => handleNavClick('economometro')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Calculadora de Economia</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('comparativo-custos')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Comparativo de Custos (Raio-X)</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('maquinas')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Modelos de Peletizadoras SAPEM</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('vantagens')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Vantagens da Ração Peletizada</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('assistente')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Consultoria de Fórmulas</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('depoimentos')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center justify-between"
          >
            <span>Depoimentos de Produtores</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-xl text-center text-sm"
            >
              Pedir Demonstração Técnica
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
