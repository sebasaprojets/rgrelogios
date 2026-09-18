import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Check, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { getProducts } from "@/lib/api.functions";
import { Reveal } from "@/components/MotionBits";
import { SiteFooter, SiteHeader, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/relogios/$id")({
  head: () => ({ meta: [
    { title: "Detalhes do Relógio | RG Relógios" },
    { name: "description", content: "Conheça os detalhes desta peça selecionada pela RG Relógios e consulte sua disponibilidade." },
    { property: "og:title", content: "Relógio selecionado | RG Relógios" },
    { property: "og:description", content: "Detalhes, características e disponibilidade desta peça." },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const fetchProducts = useServerFn(getProducts);
  const { data: product, isLoading } = useQuery({ queryKey: ["product", id], queryFn: async () => (await fetchProducts({ data: {} })).find((item) => item.id === id) });

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-background" aria-label="Carregando relógio"><div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (!product) return <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center"><h1 className="font-serif text-4xl">Relógio não encontrado</h1><Button asChild variant="outline" className="mt-6"><Link to="/relogios-antigos"><ArrowLeft /> Voltar à galeria</Link></Button></div>;

  const image = product.images?.[0] ?? "https://images.unsplash.com/photo-1524592094714-0f0654e20314";
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main className="px-5 pb-24 pt-32 sm:px-8 lg:pt-40"><div className="mx-auto max-w-7xl"><Button asChild variant="ghost" className="mb-8"><Link to="/relogios-antigos"><ArrowLeft /> Voltar à galeria</Link></Button><div className="grid gap-12 lg:grid-cols-2 lg:gap-20"><Reveal><div className="aspect-square overflow-hidden bg-muted editorial-shadow"><img src={image} alt={product.name} className="h-full w-full object-cover" /></div>{product.images && product.images.length > 1 && <div className="mt-4 grid grid-cols-4 gap-3">{product.images.slice(1).map((src) => <div key={src} className="aspect-square overflow-hidden border border-border"><img src={src} alt={`Outro ângulo de ${product.name}`} loading="lazy" className="h-full w-full object-cover" /></div>)}</div>}</Reveal><Reveal delay={.1} className="lg:pt-6"><p className="text-xs font-bold uppercase text-primary">{product.brand}</p><h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">{product.name}</h1><p className="mt-6 text-3xl font-semibold text-primary">{product.price ? `R$ ${product.price.toLocaleString("pt-BR")}` : "Preço sob consulta"}</p><p className="mt-8 border-y border-border py-8 leading-8 text-muted-foreground">{product.description ?? "Uma peça de relojoaria selecionada por sua presença, qualidade e caráter atemporal."}</p><dl className="grid grid-cols-2 gap-6 py-8 text-sm"><div><dt className="text-xs uppercase text-primary">Modelo</dt><dd className="mt-2 font-semibold">{product.model}</dd></div><div><dt className="text-xs uppercase text-primary">Ano</dt><dd className="mt-2 font-semibold">{product.year ?? "Não informado"}</dd></div><div><dt className="text-xs uppercase text-primary">Categoria</dt><dd className="mt-2 font-semibold">{product.category}</dd></div><div><dt className="text-xs uppercase text-primary">Condição</dt><dd className="mt-2 font-semibold">{product.condition}</dd></div></dl><Button size="lg" className="w-full sm:w-auto" onClick={() => openWhatsApp(`Olá! Tenho interesse no relógio ${product.brand} ${product.name}. Gostaria de mais informações.`)}><MessageCircle /> Consultar disponibilidade</Button><div className="mt-10 grid gap-4 border-t border-border pt-8 text-sm sm:grid-cols-3"><span className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Atendimento seguro</span><span className="flex gap-2"><Check className="h-5 w-5 text-primary" />Peça selecionada</span><span className="flex gap-2"><Clock3 className="h-5 w-5 text-primary" />Resposta rápida</span></div></Reveal></div></div></main><SiteFooter /><WhatsAppButton message={`Olá! Tenho interesse no relógio ${product.brand} ${product.name}.`} /></div>;
}