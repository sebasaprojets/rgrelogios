import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Clock, Star, Shield, PenTool as Tool, Search, Filter, History, Smartphone, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#00050A]/90 backdrop-blur-md border-b border-[#C5A059]/20">
        <h1 className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider">RG RELÓGIOS</h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-[#E5D3B3]/90 uppercase">
          {["Início", "Relógios", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#C5A059] text-[#00050A] px-6 py-2.5 rounded font-bold text-sm tracking-wide hover:bg-[#D4B473] transition-all"
        >
          Falar no WhatsApp
        </motion.button>
      </header>

      <main>
        <section id="início" className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#00050A] to-[#0A101A]">
          <h2 className="text-5xl md:text-8xl font-serif text-[#C5A059] mb-8 leading-tight">
            O tempo passa.<br/>A elegância permanece.
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mb-12 text-[#E5D3B3]/80 font-light">
            Relógios selecionados, peças especiais e serviços especializados para quem valoriza precisão, história e exclusividade.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#C5A059] text-[#C5A059] px-10 py-4 rounded text-lg font-medium hover:bg-[#C5A059]/10 transition-all"
            >
              Ver Relógios
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C5A059] text-[#00050A] px-10 py-4 rounded text-lg font-bold hover:bg-[#D4B473] transition-all"
            >
              Solicitar Avaliação
            </motion.button>
          </div>
          
          <div className="mt-20 flex gap-12 text-[#E5D3B3]/60 text-sm tracking-widest uppercase">
            <div><strong>4,9/5</strong> no Google</div>
            <div>+100 avaliações</div>
            <div>Especialistas em relojoaria</div>
            <div>Atendimento em Curitiba</div>
          </div>
        </section>

        <section id="relógios" className="py-32 px-8 bg-[#00050A]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-16 text-center">Encontre o relógio ideal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Submariner Date', brand: 'Rolex', category: 'Luxo', price: 'R$ 75.000', condition: 'Novo', img: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800' },
                { name: 'Speedmaster Moon', brand: 'Omega', category: 'Clássicos', price: 'R$ 42.000', condition: 'Excelente', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
                { name: 'Calatrava 96', brand: 'Patek Philippe', category: 'Antigos', price: 'Sob Consulta', condition: 'Vintage', img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800' },
                { name: 'Tank Louis', brand: 'Cartier', category: 'Luxo', price: 'R$ 58.000', condition: 'Novo', img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800' },
              ].map((watch, i) => (
                <div key={i} className="group bg-[#0A101A] border border-[#C5A059]/10 rounded-lg overflow-hidden hover:border-[#C5A059]/40 transition-all">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={watch.img} alt={watch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#C5A059] mb-1 tracking-widest uppercase">{watch.brand}</div>
                    <h4 className="text-xl font-serif mb-2">{watch.name}</h4>
                    <div className="flex justify-between text-sm text-[#E5D3B3]/60 mb-6">
                      <span>{watch.category}</span>
                      <span>{watch.condition}</span>
                    </div>
                    <div className="text-[#C5A059] font-bold text-lg mb-6">{watch.price}</div>
                    <div className="flex flex-col gap-3">
                      <button className="w-full border border-[#C5A059]/40 text-[#C5A059] py-2 rounded text-sm font-medium hover:bg-[#C5A059]/10 transition-colors">Ver detalhes</button>
                      <button className="w-full bg-[#C5A059] text-[#00050A] py-2 rounded text-sm font-bold hover:bg-[#D4B473] transition-colors">Tenho interesse</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="antigos" className="py-32 px-8 bg-[#0A101A] overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h3 className="text-4xl md:text-6xl font-serif text-[#C5A059]">Relógios que carregam histórias</h3>
              <p className="text-xl text-[#E5D3B3]/80 font-light leading-relaxed">
                Descubra peças antigas e vintage selecionadas para colecionadores e apaixonados por relojoaria. Cada relógio possui sua própria história, personalidade e valor técnico inestimável.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-[#C5A059] text-[#00050A] px-10 py-4 rounded text-lg font-bold hover:bg-[#D4B473] transition-all">
                  Explorar Relógios Antigos
                </button>
                <button className="border border-[#C5A059] text-[#C5A059] px-10 py-4 rounded text-lg font-medium hover:bg-[#C5A059]/10 transition-all">
                  Solicitar Avaliação
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-lg overflow-hidden border border-[#C5A059]/20 shadow-2xl shadow-black/50">
                <img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800" alt="Relógio Antigo" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 border border-[#C5A059]/10 rounded-full animate-pulse -z-0"></div>
            </div>
          </div>
        </section>

        <section id="serviços" className="py-32 px-8 bg-[#00050A]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-4 text-center">Serviços de Relojoaria</h3>
            <p className="text-[#E5D3B3]/60 text-center mb-16 max-w-xl mx-auto">Excelência técnica e cuidado artesanal para garantir a precisão e longevidade do seu relógio.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Manutenção', desc: 'Manutenção preventiva e cuidados especializados para prolongar a vida útil.' },
                { title: 'Reparação', desc: 'Diagnóstico e reparação de problemas mecânicos e funcionais complexos.' },
                { title: 'Restauração', desc: 'Serviços voltados para peças antigas que precisam recuperar aparência e funcionamento.' },
                { title: 'Avaliação', desc: 'Avaliação técnica de peças antigas, vintage e relógios de coleção.' },
                { title: 'Revisão', desc: 'Revisão completa para garantir o funcionamento adequado do mecanismo.' },
                { title: 'Troca de Bateria', desc: 'Serviço profissional imediato para relógios que utilizam bateria.' },
                { title: 'Ajuste de Pulseira', desc: 'Ajustes e adequações para maior conforto e segurança no pulso.' },
                { title: 'Limpeza', desc: 'Cuidados especiais para manter o relógio em excelente estado estético.' },
              ].map((service, i) => (
                <div key={i} className="p-8 bg-[#0A101A] border border-[#C5A059]/5 rounded-lg hover:bg-[#C5A059]/5 hover:border-[#C5A059]/20 transition-all group">
                  <h4 className="text-xl font-serif text-[#C5A059] mb-4 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                  <p className="text-sm text-[#E5D3B3]/60 mb-8 leading-relaxed">{service.desc}</p>
                  <button className="text-xs font-bold text-[#C5A059] tracking-widest uppercase hover:underline decoration-[#C5A059]/40 underline-offset-8">Solicitar orçamento</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="py-32 px-8 bg-[#0A101A]">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-12">Experiência, tradição e paixão pela relojoaria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left text-[#E5D3B3]/80 font-light leading-relaxed text-lg">
              <p>
                Localizada no coração de Curitiba, a RG Relógios é referência em alta relojoaria. Nossa missão é preservar a precisão e a história de cada peça que passa por nossas mãos, combinando técnica artesanal com equipamentos modernos.
              </p>
              <p>
                Especializados em marcas de luxo e peças vintage raras, oferecemos um atendimento exclusivo e personalizado para colecionadores e entusiastas que não abrem mão da qualidade e da transparência.
              </p>
            </div>
            <div className="mt-20 py-12 border-y border-[#C5A059]/20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div><div className="text-4xl font-serif text-[#C5A059] mb-2">+100</div><div className="text-xs uppercase tracking-widest">Avaliações</div></div>
              <div><div className="text-4xl font-serif text-[#C5A059] mb-2">4,9</div><div className="text-xs uppercase tracking-widest">Estrelas Google</div></div>
              <div><div className="text-4xl font-serif text-[#C5A059] mb-2">10+</div><div className="text-xs uppercase tracking-widest">Anos de Históra</div></div>
              <div><div className="text-4xl font-serif text-[#C5A059] mb-2">2k+</div><div className="text-xs uppercase tracking-widest">Peças Atendidas</div></div>
            </div>
          </div>
        </section>

        <footer id="contato" className="py-20 px-8 bg-[#00050A] border-t border-[#C5A059]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h1 className="text-xl font-serif font-bold text-[#C5A059] mb-6 tracking-wider uppercase">RG RELÓGIOS</h1>
              <p className="text-sm text-[#E5D3B3]/60 leading-relaxed mb-8">
                A excelência em relojoaria em Curitiba. Venda, manutenção e restauração de peças de luxo e colecionáveis.
              </p>
              <button className="bg-[#C5A059] text-[#00050A] px-8 py-3 rounded font-bold text-sm tracking-wide hover:bg-[#D4B473] transition-all">
                Falar no WhatsApp
              </button>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#C5A059] tracking-widest uppercase mb-6">Onde estamos</h4>
              <p className="text-[#E5D3B3]/80 leading-relaxed">
                R. João Antônio Xavier, 420<br/>
                Água Verde, Curitiba - PR<br/>
                80620-360
              </p>
              <div className="mt-6 flex gap-4 text-sm text-[#C5A059]">
                <a href="#" className="hover:underline">Ver no Google Maps</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#C5A059] tracking-widest uppercase mb-6">Horário</h4>
              <p className="text-[#E5D3B3]/80 leading-relaxed">
                Segunda a Sexta: 09:00 - 18:00<br/>
                Sábado: 09:00 - 13:00<br/>
                Domingo: Fechado
              </p>
              <div className="mt-6 text-[#E5D3B3]/80">
                <strong>WhatsApp:</strong> +55 41 99239-9650
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#C5A059]/5 text-center text-xs text-[#E5D3B3]/40 tracking-widest uppercase">
            © {new Date().getFullYear()} RG Relógios. Todos os direitos reservados.
          </div>
        </footer>
      </main>
    </div>
  );
}
