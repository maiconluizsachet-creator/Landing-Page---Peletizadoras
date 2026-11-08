import React from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { TechnicalFAQ } from './TechnicalFAQ';

interface FooterProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpenModal: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenModal, onScrollTo }) => {
  return (
    <footer className="bg-stone-950 text-white pt-16 pb-28 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Expandable Technical FAQ Section */}
        <TechnicalFAQ onOpenWhatsApp={onOpenWhatsApp} />

        {/* Footer Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="bg-white rounded-xl px-3 py-2 inline-block border border-amber-500/30 shadow-md">
                <img
                  src="/assets/aistudio/00_-_LOGO_SAPEM-_1400_x_300_86aca99a.png"
                  alt="SAPEM Industrial"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-amber-400 font-mono font-semibold">
                Indústria Brasileira de Peletizadoras
              </p>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Equipamentos de alta robustez mecânica para peletização de ração animal. Máquinas simples de operar, fabricação 100% nacional e suporte vitalício.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantia de 1 Ano Direto de Fábrica</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('hero')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Início & Mensagem da Fábrica
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('economometro')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Calculadora de Economia
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('comparativo-custos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Comparativo de Custos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('maquinas')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Catálogo de Máquinas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('vantagens')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Vantagens do Pellet
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('assistente')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Assistente de Fórmulas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('depoimentos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Produtores Satisfeitos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-amber-400 text-amber-400 font-semibold transition-colors cursor-pointer"
                >
                  Dúvidas Técnicas (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Official Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
              Contato com a Fábrica
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-white block">Endereço da Fábrica:</strong>
                  <span>Rua Narcisio Biazus, 200 – Jardim Campo da Baixada</span>
                  <span className="block text-stone-400">Capitão Leônidas Marques – PR · CEP 85791-218</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Telefone & WhatsApp Comercial:</span>
                  <a
                    href="tel:+5545991161010"
                    className="font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    (45) 99116-1010
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[11px]">E-mail Corporativo:</span>
                  <a
                    href="mailto:contato@sapem.com.br"
                    className="font-bold text-white hover:text-amber-400 transition-colors underline"
                  >
                    contato@sapem.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Action */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
              Compre sem Intermediários
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Fale direto com os técnicos que constroem as máquinas em Capitão Leônidas Marques - PR e garanta o menor preço de fábrica.
            </p>
            <button
              type="button"
              onClick={onOpenModal}
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Pedir Demonstração Técnica
            </button>
            <button
              type="button"
              onClick={() => onOpenWhatsApp('Olá SAPEM Industrial! Gostaria de falar com o time de vendas.')}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: (45) 99116-1010</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} SAPEM Peletizadoras de Ração. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Fabricação 100% Nacional para o homem do campo.
          </p>
        </div>

      </div>
    </footer>
  );
};
