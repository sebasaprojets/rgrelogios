import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts, getReviews, submitServiceRequest } from "@/lib/api.functions";
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
import logoAsset from "@/assets/logo-official.png.asset.json";
import storefrontAsset from "@/assets/storefront.jpeg.asset.json";
import heroVideoAsset from "@/assets/hero-watch.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchProducts = useServerFn(getProducts);
  const fetchReviews = useServerFn(getReviews);
  const submitRequest = useServerFn(submitServiceRequest);

  const { data: products = [] } = useQuery({
    queryKey: ["products", activeCategory],
    queryFn: () => fetchProducts({ data: { category: activeCategory } }),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews({ data: undefined }),
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitRequest({
        data: {
          customer_name: formData.get("name") as string,
          customer_whatsapp: formData.get("whatsapp") as string,
          customer_email: formData.get("email") as string || undefined,
          service_type: formData.get("service") as string,
          description: formData.get("description") as string || undefined,
          watch_brand: formData.get("brand") as string || undefined,
          watch_model: formData.get("model") as string || undefined,
        }
      });
      setShowConfirm(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setShowConfirm(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  const categories = [
    "Todos",
    "Clássicos",
    "Luxo",
    "Antigos",
    "Vintage",
    "Masculinos",
    "Femininos",
    "Peças Exclusivas"
  ];

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#00050A]/95 backdrop-blur-md border-b border-[#C5A059]/20">
        <div className="flex items-center gap-4">
          <img src={logoAsset.url} alt="RG Relógios" className="w-10 h-10 object-contain rounded-full border border-[#C5A059]/30" />
          <h1 className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider">RG RELÓGIOS</h1>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-[#E5D3B3]/90 uppercase">
          {["Início", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
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
            onClick={() => window.open('https://wa.me/5541992399650', '_blank')}
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
              {["Início", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
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
        <section id="início" className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          {/* Fundo Cinematográfico com Zoom Suave */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.25 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "linear" 
              }}
              className="w-full h-full"
            >
              <img 
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Relógio de luxo em destaque"
                className="w-full h-full object-cover opacity-60"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#00050A]/90 via-[#00050A]/70 to-[#00050A]" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#C5A059] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Tempo, arte e precisão
            </h2>
            <p className="mt-6 text-base sm:text-xl text-[#E5D3B3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Venda, manutenção e restauração de relógios clássicos e contemporâneos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#serviços" className="bg-[#C5A059] text-[#00050A] px-8 py-4 rounded font-bold tracking-wide hover:bg-[#D4B473] transition-all">
                Solicitar Serviço
              </a>
              <a href="#sobre" className="border border-[#C5A059]/50 text-[#C5A059] px-8 py-4 rounded font-bold tracking-wide hover:bg-[#C5A059]/10 transition-all">
                Sobre Nós
              </a>
            </div>
          </div>
        </section>

        {/* Relógios Antigos */}
        <section id="antigos" className="relative py-32 px-8 bg-[#0A101A] overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl sm:text-5xl font-serif text-[#C5A059]">Relógios que carregam histórias</h3>
              <p className="text-[#E5D3B3]/70 leading-relaxed">
                Peças antigas restauradas com respeito à sua origem, mantendo o mecanismo original sempre que possível.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#serviços" className="bg-[#C5A059] text-[#00050A] px-7 py-3.5 rounded font-bold tracking-wide hover:bg-[#D4B473] transition-all">
                  Restaurar meu relógio
                </a>
                <a href="#contato" className="border border-[#C5A059]/50 text-[#C5A059] px-7 py-3.5 rounded font-bold tracking-wide hover:bg-[#C5A059]/10 transition-all">
                  Falar com especialista
                </a>
              </div>
            </div>

            <div className="relative h-[480px]">
              {/* Grid de Imagens Sofisticado */}
              <div className="absolute top-0 right-0 w-3/4 h-[85%] z-10 overflow-hidden rounded-lg shadow-2xl border border-[#C5A059]/10 group">
                <img 
                  src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt="Relógio Vintage de Luxo" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A101A]/80 to-transparent opacity-60" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-1/2 h-3/4 z-20 overflow-hidden rounded-lg shadow-2xl border border-[#C5A059]/20 group">
                <img 
                  src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt="Mecanismo de Precisão" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A101A]/60 to-transparent opacity-40" />
              </div>

              {/* Elementos Decorativos de Design */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#C5A059]/20 rounded-full animate-[spin_20s_linear_infinite] z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#C5A059]/5 blur-[120px] rounded-full z-0" />
            </div>
          </div>
        </section>


        {/* Seção de Serviços Premium */}
        <section id="serviços" className="py-32 px-8 bg-[#00050A] relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="text-center mb-20 space-y-4">
              <div className="flex flex-col items-center gap-2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059] uppercase block"
                >
                  Excelência em cada detalhe
                </motion.span>
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  className="w-12 h-[1px] bg-[#C5A059]/50 relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#C5A059] rotate-45" />
                </motion.div>
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif text-[#C5A059]"
              >
                Nossos Serviços Especializados
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#E5D3B3]/60 max-w-2xl mx-auto text-lg font-light leading-relaxed"
              >
                Cuidamos do seu relógio com precisão, técnica e paixão.
                <br className="hidden md:block" />
                Serviços completos para manter, restaurar e valorizar o que é especial.
              </motion.p>
            </div>
            
            {/* Grid de Cards Premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { 
                  title: 'Manutenção', 
                  desc: 'Manutenção preventiva que prolonga a vida útil do seu relógio e garante precisão.',
                  img: 'https://images.pexels.com/photos/1198264/pexels-photo-1198264.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Shield
                },
                { 
                  title: 'Reparação', 
                  desc: 'Diagnóstico preciso e reparos especializados para qualquer tipo de problema.',
                  img: 'https://images.pexels.com/photos/1198261/pexels-photo-1198261.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Tool 
                },
                { 
                  title: 'Restauração', 
                  desc: 'Devolvemos a originalidade e beleza de relógios antigos e peças especiais.',
                  img: 'https://images.pexels.com/photos/1198274/pexels-photo-1198274.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: History 
                },
                { 
                  title: 'Avaliação', 
                  desc: 'Avaliação profissional para relógios antigos, coleções e peças raras.',
                  img: 'https://images.pexels.com/photos/1198263/pexels-photo-1198263.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Star 
                },
                { 
                  title: 'Revisão Completa', 
                  desc: 'Revisão completa do mecanismo para garantir o perfeito funcionamento do relógio.',
                  img: 'https://images.pexels.com/photos/1198262/pexels-photo-1198262.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Tool 
                },
                { 
                  title: 'Troca de Bateria', 
                  desc: 'Substituição de bateria com técnica e ferramentas adequadas.',
                  img: 'https://images.pexels.com/photos/1198267/pexels-photo-1198267.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Smartphone 
                },
                { 
                  title: 'Ajuste de Pulseira', 
                  desc: 'Ajuste preciso para máximo conforto e segurança no seu dia a dia.',
                  img: 'https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Tool 
                },
                { 
                  title: 'Limpeza e Conservação', 
                  desc: 'Limpeza profissional que mantém a estética e o brilho do seu relógio.',
                  img: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Star 
                },
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden border border-[#C5A059]/10 shadow-2xl bg-[#0A101A]"
                >
                  {/* Imagem de Fundo com Hover Zoom */}
                  <div className="absolute inset-0 z-0">
                    <motion.img 
                      src={service.img} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00050A] via-[#00050A]/70 to-transparent" />
                  </div>
  
                  {/* Conteúdo do Card */}
                  <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#00050A] transition-all duration-300">
                        <service.icon size={20} />
                      </div>
                      <h4 className="text-2xl font-serif text-[#C5A059]">{service.title}</h4>
                    </div>
                    
                    <p className="text-sm text-[#E5D3B3]/70 leading-relaxed mb-6">
                      {service.desc}
                    </p>
  
                    <button 
                      onClick={() => window.open(`https://wa.me/5541992399650?text=${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o serviço de ${service.title} do meu relógio.`)}`, '_blank')}
                      className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest hover:text-[#D4B473] transition-colors"
                    >
                      <MessageCircle size={14} className="text-[#C5A059]" />
                      Solicitar via WhatsApp
                    </button>
                  </div>
  
                  {/* Borda de Hover */}
                  <div className="absolute inset-0 border border-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                </motion.div>
              ))}
            </div>
  
            {/* Barra de Confiança (Trust Bar) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full bg-[#0A101A] border border-[#C5A059]/20 rounded-xl p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative"
            >
              <div className="flex items-center gap-6 lg:pr-12">
                <div className="w-14 h-14 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Shield size={28} />
                </div>
                <p className="text-xl font-serif text-[#E5D3B3] leading-tight">
                  Confiança, precisão e tradição desde o primeiro atendimento.
                </p>
              </div>
  
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-12 gap-y-6 w-full lg:w-auto">
                {[
                  { label: 'Profissionais qualificados', icon: Star },
                  { label: 'Ferramentas de alta precisão', icon: Tool },
                  { label: 'Peças originais e selecionadas', icon: Star },
                  { label: 'Garantia em todos os serviços', icon: Shield },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon size={18} className="text-[#C5A059]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Avaliações Section */}
        <section id="avaliações" className="py-32 px-8 bg-[#0A101A]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Depoimentos</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#E5D3B3] mb-4">O que nossos clientes dizem</h3>
            <div className="flex justify-center items-center gap-2 mb-16">
              <div className="flex text-[#C5A059]">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="text-[#E5D3B3] font-bold">4,9 ⭐</span>
              <span className="text-[#E5D3B3]/40">• +100 avaliações</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <motion.div 
                  key={review.id}
                  whileHover={{ y: -10 }}
                  className="bg-[#00050A] p-8 rounded-xl border border-[#C5A059]/10 text-left"
                >
                  <div className="flex text-[#C5A059] mb-4">
                    {[...Array(Math.floor(review.rating))].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-[#E5D3B3]/80 italic mb-6">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-bold">
                      {review.customer_name[0]}
                    </div>
                    <div>
                      <h4 className="text-[#E5D3B3] font-bold text-sm">{review.customer_name}</h4>
                      {review.is_verified && <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Cliente Verificado</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="py-32 px-8 bg-[#00050A]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <img src={storefrontAsset.url} alt="Loja RG Relógios" className="rounded-lg shadow-2xl w-full h-[500px] object-cover border border-[#C5A059]/20" />
              <div className="absolute -bottom-10 -right-10 bg-[#C5A059] p-8 hidden md:block rounded-lg shadow-2xl">
                <span className="block text-4xl font-serif text-[#00050A] mb-1">25+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00050A]">Anos de Experiência</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Sobre a RG Relógios</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-[#E5D3B3] mb-8 leading-tight">Experiência, tradição e paixão pela relojoaria</h3>
              <div className="space-y-6 text-[#E5D3B3]/60 leading-relaxed font-light">
                <p>Localizada no coração de Curitiba, a RG Relógios é referência em alta relojoaria, especializada em peças de luxo e relógios antigos.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-widest text-[#C5A059]">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Atendimento Personalizado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Conhecimento Técnico</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Peças Originais</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Garantia em Serviços</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Localização & Contato */}
        <section id="contato" className="py-32 px-8 bg-[#0A101A]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-serif text-[#C5A059] mb-8">Visite nossa loja</h3>
              <div className="space-y-8 text-[#E5D3B3]/80">
                <div className="flex gap-4">
                  <MapPin className="text-[#C5A059] shrink-0" />
                  <div>
                    <p className="font-bold text-[#E5D3B3]">R. João Antônio Xavier, 420</p>
                    <p>Água Verde, Curitiba - PR, 80620-360</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-[#C5A059] shrink-0" />
                  <div>
                    <p className="font-bold text-[#E5D3B3]">Horário de Atendimento</p>
                    <p>Segunda a Sexta: 09h às 18h</p>
                    <p>Sábado: 09h às 13h</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Smartphone className="text-[#C5A059] shrink-0" />
                  <div>
                    <p className="font-bold text-[#E5D3B3]">WhatsApp & Telefone</p>
                    <p>+55 41 99239-9650</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 h-64 rounded-lg bg-[#00050A] border border-[#C5A059]/20 flex items-center justify-center relative overflow-hidden group">
                {/* Visual context instead of active map */}
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all" alt="RG Relógios Storefront" />
                <div className="relative z-10 text-center p-6">
                  <MapPin className="text-[#C5A059] mx-auto mb-4" size={32} />
                  <p className="text-[#E5D3B3] font-bold text-sm tracking-widest uppercase mb-4">Visite nossa loja física</p>
                  <button 
                    onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=RG+Relógios+R.+João+Antônio+Xavier+420+Água+Verde+Curitiba+PR', '_blank')}
                    className="bg-[#C5A059] text-[#00050A] px-6 py-2 rounded font-bold text-[10px] tracking-widest uppercase shadow-2xl hover:bg-[#D4B473] transition-colors"
                  >
                    Abrir no GPS
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#00050A] p-10 rounded-xl border border-[#C5A059]/20">
              <h3 className="text-3xl font-serif text-[#C5A059] mb-8">Envie uma mensagem</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="Nome" className="w-full p-4 bg-[#0A101A] border border-[#C5A059]/20 rounded text-[#E5D3B3] placeholder-[#E5D3B3]/30 outline-none focus:border-[#C5A059]" />
                  <input type="text" placeholder="WhatsApp" className="w-full p-4 bg-[#0A101A] border border-[#C5A059]/20 rounded text-[#E5D3B3] placeholder-[#E5D3B3]/30 outline-none focus:border-[#C5A059]" />
                </div>
                <input type="email" placeholder="E-mail" className="w-full p-4 bg-[#0A101A] border border-[#C5A059]/20 rounded text-[#E5D3B3] placeholder-[#E5D3B3]/30 outline-none focus:border-[#C5A059]" />
                <textarea placeholder="Mensagem" className="w-full p-4 bg-[#0A101A] border border-[#C5A059]/20 rounded text-[#E5D3B3] min-h-[150px] placeholder-[#E5D3B3]/30 outline-none focus:border-[#C5A059]"></textarea>
                <button className="w-full border border-[#C5A059] text-[#C5A059] py-4 rounded font-bold hover:bg-[#C5A059]/10 transition-all uppercase tracking-[0.2em] text-sm">Enviar Mensagem</button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 bg-[#00050A] border-t border-[#C5A059]/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <img src={logoAsset.url} alt="RG Relógios Logo" className="w-12 h-12 object-contain rounded-full border border-[#C5A059]/20" />
                  <h4 className="text-2xl font-serif text-[#C5A059]">RG RELÓGIOS</h4>
                </div>
                <p className="text-[#E5D3B3]/60 max-w-md leading-relaxed">
                  Especialistas em relógios, relojoaria, peças antigas e serviços especializados. 
                  Tradição e excelência no cuidado com o seu tempo.
                </p>
              </div>
              <div>
                <h5 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-6">Navegação</h5>
                <ul className="space-y-4 text-sm text-[#E5D3B3]/60">
                  <li><a href="#início" className="hover:text-[#C5A059]">Início</a></li>
                  <li><a href="#antigos" className="hover:text-[#C5A059]">Relógios Antigos</a></li>
                  <li><a href="#serviços" className="hover:text-[#C5A059]">Serviços</a></li>
                  <li><a href="#sobre" className="hover:text-[#C5A059]">Sobre Nós</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-6">Legal</h5>
                <ul className="space-y-4 text-sm text-[#E5D3B3]/60">
                  <li><a href="#" className="hover:text-[#C5A059]">Privacidade</a></li>
                  <li><a href="#" className="hover:text-[#C5A059]">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-[#C5A059]">Garantia</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-[#C5A059]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/40">
              <p>© 2026 RG Relógios. Todos os direitos reservados.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-[#C5A059]">Instagram</a>
                <a href="#" className="hover:text-[#C5A059]">WhatsApp</a>
                <a href="#" className="hover:text-[#C5A059]">Maps</a>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Float */}
<WhatsAppButton />
      </main>
    </div>
  );
}