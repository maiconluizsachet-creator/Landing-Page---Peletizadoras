import React, { useState } from 'react';
import { X, CheckCircle, Factory, Phone, MapPin, Send, MessageCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DirectFactoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: (customMsg?: string) => void;
  initialMachineInterest?: string;
}

export const DirectFactoryModal: React.FC<DirectFactoryModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp,
  initialMachineInterest = 'SAPEM Agro 350',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [animal, setAnimal] = useState('Bovinos');
  const [monthlyVolume, setMonthlyVolume] = useState('5.000 kg/mês');
  const [machineInterest, setMachineInterest] = useState(initialMachineInterest);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSending(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          city,
          state,
          animal,
          monthlyVolume,
          machineInterest,
        }),
      });
    } catch (err) {
      console.warn('Lead capture exception:', err);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setIsSending(false);
    setIsSubmitted(true);

    setTimeout(() => {
      const msg = `Olá Fábrica SAPEM! Meu nome é ${name} (${city}/${state}).
Criação: ${animal}
Consumo estimado: ${monthlyVolume}
Interesse na Peletizadora: ${machineInterest}
Gostaria da cotação com valor de fábrica e frete para a minha propriedade.`;
      onOpenWhatsApp(msg);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-stone-900 border-2 border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <div className="bg-white rounded-xl px-3 py-1.5 inline-block shadow-md border border-amber-500/40">
                <img
                  src="/assets/aistudio/00_-_LOGO_SAPEM-_1400_x_300_86aca99a.png"
                  alt="SAPEM Industrial"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded-full ml-2">
                <Factory className="w-3.5 h-3.5" />
                Venda Direta de Fábrica
              </div>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-black font-display text-white">
                Fale com a Indústria SAPEM
              </h3>
              <p className="text-xs text-stone-300">
                Capitão Leônidas Marques - PR • WhatsApp Oficial: <strong className="text-amber-400">(45) 99116-1010</strong>
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Seu Nome ou Fazenda:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João da Silva / Fazenda Santa Rita"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    WhatsApp com DDD:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Cidade e Estado:
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Uberaba - MG"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Criação Principal:
                  </label>
                  <select
                    value={animal}
                    onChange={(e) => setAnimal(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Bovinos (Corte/Leite)">Bovinos (Corte/Leite)</option>
                    <option value="Suínos">Suínos</option>
                    <option value="Aves / Galinhas">Aves / Galinhas</option>
                    <option value="Ovinos e Caprinos">Ovinos e Caprinos</option>
                    <option value="Equinos">Equinos</option>
                    <option value="Piscicultura">Piscicultura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Modelo de Interesse:
                  </label>
                  <select
                    value={machineInterest}
                    onChange={(e) => setMachineInterest(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="SAPEM PLS-025 ECO (40-70 kg/h)">SAPEM PLS-025 ECO (40-70 kg/h)</option>
                    <option value="SAPEM PLS-050 ECO (80-150 kg/h)">SAPEM PLS-050 ECO (80-150 kg/h)</option>
                    <option value="SAPEM PLS-050 PLUS (100-180 kg/h)">SAPEM PLS-050 PLUS (100-180 kg/h)</option>
                    <option value="SAPEM PLS-100 PLUS (180-280 kg/h)">SAPEM PLS-100 PLUS (180-280 kg/h)</option>
                    <option value="SAPEM PLS-100 PTO - Trator TDP (200-350 kg/h)">SAPEM PLS-100 PTO - Trator TDP (200-350 kg/h)</option>
                    <option value="SAPEM PLT-200 Pro (250-400 kg/h)">SAPEM PLT-200 Pro (250-400 kg/h)</option>
                    <option value="SAPEM PLT-400 MAX (350-550 kg/h)">SAPEM PLT-400 MAX (350-550 kg/h)</option>
                    <option value="SAPEM PLS-800 MAX (600-900 kg/h)">SAPEM PLS-800 MAX (600-900 kg/h)</option>
                    <option value="SAPEM PLT-1000 Pro (800-1.250 kg/h)">SAPEM PLT-1000 Pro (800-1.250 kg/h)</option>
                    <option value="SAPEM PLS-2000 ULTRA (1.500-2.500 kg/h)">SAPEM PLS-2000 ULTRA (1.500-2.500 kg/h)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{isSending ? 'Enviando...' : 'Pedir Cotação de Fábrica no WhatsApp'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garantia de 1 Ano
              </span>
              <span>•</span>
              <span>Atendimento em até 5 minutos</span>
            </div>

          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-white font-display">
              Proposta Solicitada com Sucesso!
            </h4>
            <p className="text-sm text-stone-300">
              Redirecionando você para o engenheiro de plantão no WhatsApp da SAPEM...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
