import React from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Wrench,
  CheckCircle,
  Flame,
  Factory,
  Phone,
  Sparkles,
} from 'lucide-react';
import { AudioNarrationPlayer } from './AudioNarrationPlayer';

interface HeroProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsApp, onScrollTo }) => {
  return (
    <section id="hero" className="relative bg-zinc-950 text-white pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-zinc-800">
      {/* Background industrial pattern & amber illumination */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-36 w-80 h-80 bg-zinc-800/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Aggressive Copy & Conversion Hook with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white rounded-xl px-3 py-1.5 shadow-md border border-amber-500/50 inline-flex items-center">
                <img
                  src="/assets/aistudio/00_-_LOGO_SAPEM-_1400_x_300_86aca99a.png"
                  alt="SAPEM Industrial"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide">
                <Factory className="w-3.5 h-3.5 text-amber-400" />
                <span>Capitão Leônidas Marques – PR</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight font-display tracking-tight">
              Produtor, chega de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 underline decoration-amber-500 decoration-wavy decoration-2">
                queimar dinheiro
              </span>{' '}
              comprando ração cara!
            </h1>

            {/* Subtitle with Pain Point */}
            <div className="space-y-3 text-stone-300 text-base md:text-lg leading-relaxed">
              <p className="font-medium text-stone-200">
                Todo mês a ração leva a <strong className="text-amber-300 font-bold">maior parte do seu lucro</strong>. O preço sobe, o frete sobe, e você não controla nada.
              </p>
              <p className="text-amber-400 font-bold text-lg md:text-xl">
                E se a ração saísse da sua própria propriedade, com o seu milho, o seu farelo e a sua fórmula?
              </p>
              <p className="text-stone-300">
                Com a <strong className="text-white font-bold">peletizadora SAPEM</strong> você fabrica ração peletizada aí mesmo no seu sítio ou fazenda. Máquina simples de operar, <span className="text-white underline decoration-amber-500 font-semibold">fabricação 100% nacional</span> e <span className="text-white underline decoration-amber-500 font-semibold">garantia de 1 ano de fábrica</span>.
              </p>
            </div>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 hover:border-amber-500/40 transition-colors">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">Direto da Indústria</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 hover:border-amber-500/40 transition-colors">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">Garantia de 1 Ano</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 hover:border-amber-500/40 transition-colors col-span-2 sm:col-span-1">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">Fácil Operação</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                data-testid="hero-saiba-mais-whatsapp"
                onClick={() =>
                  onOpenWhatsApp(
                    'Olá SAPEM Industrial! Vi a mensagem: quero parar de queimar dinheiro com ração cara e fabricar na minha propriedade. Como compro direto da fábrica?'
                  )
                }
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:to-green-500 text-white text-base sm:text-lg font-black px-6 py-4 rounded-xl shadow-2xl shadow-black/80 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer animate-pulse-ring"
              >
                <MessageCircle className="w-6 h-6 fill-current text-white" />
                <span>Toque em Saiba Mais e fale com a fábrica no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => onScrollTo('economometro')}
                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 hover:text-amber-300 font-bold text-sm sm:text-base px-5 py-4 rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer"
              >
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span>Simular Minha Economia</span>
              </button>
            </div>

            {/* Direct Factory Guarantee Note */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>Fábrica em Capitão Leônidas Marques – PR</span>
              </span>
              <span>•</span>
              <span className="text-stone-300 font-semibold">
                WhatsApp Comercial: (45) 99116-1010
              </span>
            </div>
          </motion.div>

          {/* Right Column: Audio Narration & Machine Highlight Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Audio Narration Component (TTS Feature with gemini-3.8-flash-tts) */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 to-yellow-500/20 rounded-2xl blur opacity-30" />
              <AudioNarrationPlayer
                onOpenWhatsApp={() =>
                  onOpenWhatsApp(
                    'Olá! Acabei de ouvir o áudio oficial da SAPEM Industrial e quero detalhes sobre os modelos de peletizadora.'
                  )
                }
              />
            </div>

            {/* Quick Agro Fact Card */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs sm:text-sm text-stone-300 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Preço Direto da Indústria
                </span>
                <span className="text-amber-400 font-mono font-bold">Sem Intermediários</span>
              </div>
              <p className="text-stone-300">
                Você compra <strong>direto do fabricante</strong> em Capitão Leônidas Marques - PR, com assistência técnica vitalícia, peças de reposição imediatas a pronta entrega e orientação zootécnica gratuita para a sua receita.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
