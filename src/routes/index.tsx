import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3]">
      {/* Header Placeholder */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between p-6 bg-[#00050A]/90 backdrop-blur-md border-b border-[#C5A059]/20">
        <h1 className="text-2xl font-serif font-bold text-[#C5A059]">RG Relógios</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {["Início", "Relógios", "Relógios Antigos", "Serviços", "Sobre Nós", "Contato"].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <button className="bg-[#C5A059] text-[#00050A] px-4 py-2 rounded font-semibold text-sm hover:bg-[#D4B473] transition-colors">
          Falar no WhatsApp
        </button>
      </header>

      {/* Hero */}
      <main className="pt-24">
        <section className="relative h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#00050A] to-[#0A101A]">
          <h2 className="text-5xl md:text-7xl font-serif text-[#C5A059] mb-6">
            O tempo passa. A elegância permanece.
          </h2>
          <p className="text-xl max-w-2xl mb-10 text-[#E5D3B3]/80">
            Relógios selecionados, peças especiais e serviços especializados para quem valoriza precisão, história e exclusividade.
          </p>
          <div className="flex gap-4">
            <button className="border border-[#C5A059] text-[#C5A059] px-8 py-3 rounded font-semibold hover:bg-[#C5A059]/10 transition-colors">
              Ver Relógios
            </button>
            <button className="bg-[#C5A059] text-[#00050A] px-8 py-3 rounded font-semibold hover:bg-[#D4B473] transition-colors">
              Solicitar Avaliação
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
