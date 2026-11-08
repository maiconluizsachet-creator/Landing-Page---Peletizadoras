import React from 'react';
import { Star, Quote, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'José Carlos Medeiros',
      role: 'Produtor de Leite e Gado de Corte',
      location: 'Patos de Minas - MG',
      machine: 'SAPEM Agro 350 (Trifásica)',
      monthlyEconomy: 'R$ 8.900 / mês',
      quote:
        'Eu gastava quase 12 mil reais todo mês comprando ração ensacada na cooperativa. Com a SAPEM Agro 350, eu uso o milho que colho aqui e compro o farelo de soja a granel. Em 3 meses a máquina se pagou inteira. O gado come tudo, lambe o cocho e não sobra um farelo!',
      rating: 5,
    },
    {
      name: 'Antonio Marcos Silveira',
      role: 'Granja de Suínos & Aves',
      location: 'Toledo - PR',
      machine: 'SAPEM Turbo 700 (20 CV)',
      monthlyEconomy: 'R$ 15.400 / mês',
      quote:
        'O que me convenceu foi a fabricação 100% nacional. Antes eu tinha medo de comprar máquina e faltar peça. Mas a SAPEM manda peça no mesmo dia se precisar. A matriz deles em aço especial dura mais do que o dobro das importadas. Suinocultura sem peletizadora hoje é prejuízo certo.',
      rating: 5,
    },
    {
      name: 'Valter Nogueira & Família',
      role: 'Criador de Ovinos e Cavalos',
      location: 'Ribeirão Preto - SP',
      machine: 'SAPEM Mini 150 (Monofásica)',
      monthlyEconomy: 'R$ 4.200 / mês',
      quote:
        'Minha energia é monofásica rural 220V e funcionou perfeito. Ligo na tomada do galpão, a máquina é silenciosa e muito simples de operar. Até meu filho de 18 anos ajuda na peletização. Melhor investimento que fiz nos últimos 5 anos na propriedade.',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-current" />
            Voz de Quem Está no Campo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display">
            Quem comprou direto da fábrica não volta para a ração ensacada
          </h2>
          <p className="text-stone-600 text-base md:text-lg">
            Mais de 1.800 peletizadoras SAPEM em operação ativa em fazendas, haras, granjas e confinamentos por todo o Brasil.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-emerald-400 transition-all duration-300"
            >
              <div>
                {/* Rating & Economy Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Economiza {t.monthlyEconomy}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {t.location}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 block mt-0.5">
                      {t.machine}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-around gap-6 text-center border border-stone-800">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">1.800+</span>
            <p className="text-xs text-stone-300">Peletizadoras Entregues</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-stone-700" />
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">100%</span>
            <p className="text-xs text-stone-300">Fabricação Nacional</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-stone-700" />
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">1 Ano</span>
            <p className="text-xs text-stone-300">Garantia Total de Fábrica</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-stone-700" />
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">24h</span>
            <p className="text-xs text-stone-300">Despacho de Peças de Reposição</p>
          </div>
        </div>

      </div>
    </section>
  );
};
