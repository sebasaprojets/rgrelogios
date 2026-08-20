import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Shield, 
  PenTool as Tool, 
  History, 
  Smartphone, 
  CheckCircle2, 
  Menu, 
  X,
  Upload,
  Send
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 5000);
  };

  const categories = [
    "Todos",
    "Relógios Clássicos",
    "Relógios de Luxo",
    "Relógios Antigos",
    "Relógios Vintage",
    "Relógios Masculinos",
    "Relógios Femininos",
    "Peças Exclusivas"
  ];

  const watches = [
    { name: 'Submariner Date', brand: 'Rolex', category: 'Relógios de Luxo', price: 'R$ 75.000', condition: 'Novo', img: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800' },
    { name: 'Speedmaster Moon', brand: 'Omega', category: 'Relógios Clássicos', price: 'R$ 42.000', condition: 'Excelente', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
    { name: 'Calatrava 96', brand: 'Patek Philippe', category: 'Relógios Antigos', price: 'Sob Consulta', condition: 'Vintage', img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tank Louis', brand: 'Cartier', category: 'Relógios de Luxo', price: 'R$ 58.000', condition: 'Novo', img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800' },
  ];

  const filteredWatches = activeCategory === "Todos" 
    ? watches 
    : watches.filter(w => w.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#00050A]/95 backdrop-blur-md border-b border-[#C5A059]/20">
        <h1 className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider">RG RELÓGIOS</h1>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-[#E5D3B3]/90 uppercase">
          {["Início", "Relógios", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex bg-[#C5A059] text-[#00050A] px-6 py-2.5 rounded font-bold text-sm tracking-wide hover:bg-[#D4B473] transition-all items-center gap-2"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </motion.button>
          
          <button 
            className="md:hidden text-[#C5A059]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#00050A] border-b border-[#C5A059]/20 p-8 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              {["Início", "Relógios", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-serif text-[#C5A059] hover:text-[#D4B473]"
                >
                  {item}
                </a>
              ))}
              <button className="bg-[#C5A059] text-[#00050A] py-4 rounded font-bold flex justify-center items-center gap-2">
                <MessageCircle size={20} />
                WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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

        {/* Form & Services Section */}
        <div id="serviços" className="py-32 px-8 bg-[#00050A] grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Services List */}
            <div className="space-y-8">
                <h3 className="text-4xl font-serif text-[#C5A059]">Serviços de Relojoaria</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Manutenção', icon: Tool },
                    { title: 'Reparação', icon: Tool },
                    { title: 'Restauração', icon: History },
                    { title: 'Avaliação', icon: Star },
                  ].map((service, i) => (
                    <div key={i} className="p-6 bg-[#0A101A] border border-[#C5A059]/10 rounded-lg hover:border-[#C5A059]/40 transition-all">
                      <service.icon className="text-[#C5A059] mb-4" size={24} />
                      <h4 className="text-lg font-serif text-[#C5A059] mb-2">{service.title}</h4>
                      <p className="text-sm text-[#E5D3B3]/60">Serviço profissional de alta precisão.</p>
                    </div>
                  ))}
                </div>
            </div>

            {/* Evaluation Form */}
            <div className="bg-[#0A101A] p-10 rounded-xl border border-[#C5A059]/20 shadow-2xl">
                <h3 className="text-3xl font-serif text-[#C5A059] mb-8">Solicite uma avaliação do seu relógio</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" placeholder="Seu Nome" className="w-full p-4 bg-[#00050A] border border-[#C5A059]/20 rounded text-[#E5D3B3] placeholder-[#E5D3B3]/30" />
                    <input type="text" placeholder="Seu WhatsApp" className="w-full p-4 bg-[#00050A] border border-[#C5A059]/20 rounded text-[#E5D3B3] placeholder-[#E5D3B3]/30" />
                    <select className="w-full p-4 bg-[#00050A] border border-[#C5A059]/20 rounded text-[#E5D3B3]">
                        <option>Reparação</option>
                        <option>Manutenção</option>
                        <option>Restauração</option>
                    </select>
                    <textarea placeholder="Descrição do problema" className="w-full p-4 bg-[#00050A] border border-[#C5A059]/20 rounded text-[#E5D3B3] min-h-[150px] placeholder-[#E5D3B3]/30"></textarea>
                    <button type="submit" className="w-full bg-[#C5A059] text-[#00050A] py-4 rounded font-bold hover:bg-[#D4B473] transition-all flex justify-center items-center gap-2">
                        <Send size={18} /> Enviar para avaliação
                    </button>
                </form>
                {showConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-green-900/20 text-green-500 rounded flex items-center gap-2">
                        <CheckCircle2 size={20} /> Solicitação enviada com sucesso!
                    </motion.div>
                )}
            </div>
        </div>

        {/* WhatsApp Float */}
<WhatsAppButton />
      </main>
    </div>
  );
}