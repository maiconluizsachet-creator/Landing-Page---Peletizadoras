import React from 'react';
import { MessageCircle, ShieldCheck, Zap } from 'lucide-react';

interface FloatingWhatsAppBarProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const FloatingWhatsAppBar: React.FC<FloatingWhatsAppBarProps> = ({ onOpenWhatsApp }) => {
  return (
    <aside
      aria-label="Atendimento fábrica WhatsApp"
      className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-amber-500/40 p-3 sm:py-3 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left message & credibility */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Indústria SAPEM • Atendimento de Fábrica</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            </div>
            <p className="text-[11px] text-stone-400">
              Capitão Leônidas Marques - PR • Ligue ou chame no WhatsApp: <strong className="text-stone-200">(45) 99116-1010</strong>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            type="button"
            data-testid="floating-whatsapp-btn"
            onClick={() =>
              onOpenWhatsApp(
                'Olá SAPEM Industrial! Gostaria de falar com um especialista sobre a peletizadora para minha propriedade.'
              )
            }
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm sm:text-base py-3 px-6 rounded-xl shadow-lg shadow-black/80 transition-all transform active:scale-95 cursor-pointer animate-pulse-ring"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Falar com a Fábrica: (45) 99116-1010</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
