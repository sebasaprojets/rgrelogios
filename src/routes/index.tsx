import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-sans selection:bg-[#C5A059] selection:text-[#00050A]">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#00050A]/90 backdrop-blur-md border-b border-[#C5A059]/20">
        <h1 className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider">RG RELÓGIOS</h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-[#E5D3B3]/90 uppercase">
          {["Início", "Relógios", "Antigos", "Serviços", "Sobre", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <button className="bg-[#C5A059] text-[#00050A] px-6 py-2.5 rounded font-bold text-sm tracking-wide hover:bg-[#D4B473] transition-all hover:scale-105 active:scale-95">
          Falar no WhatsApp
        </button>
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
            <button className="border border-[#C5A059] text-[#C5A059] px-10 py-4 rounded text-lg font-medium hover:bg-[#C5A059]/10 transition-all">
              Ver Relógios
            </button>
            <button className="bg-[#C5A059] text-[#00050A] px-10 py-4 rounded text-lg font-bold hover:bg-[#D4B473] transition-all">
              Solicitar Avaliação
            </button>
          </div>
          
          <div className="mt-20 flex gap-12 text-[#E5D3B3]/60 text-sm tracking-widest uppercase">
            <div><strong>4,9/5</strong> no Google</div>
            <div>+100 avaliações</div>
            <div>Especialistas em relojoaria</div>
            <div>Atendimento em Curitiba</div>
          </div>
        </section>
      </main>
    </div>
  );
}
