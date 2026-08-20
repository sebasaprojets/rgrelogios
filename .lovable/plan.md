# Plano de Implementação - RG Relógios

Este plano detalha a criação de um site profissional e sofisticado para a **RG Relógios**, focado em luxo, tradição e excelência técnica.

## Identidade Visual e Estilo
- **Paleta de Cores:** Fundo azul-marinho muito escuro/preto, detalhes em dourado/champagne, textos em off-white e cinza metálico.
- **Tipografia:** Elegante (Instrument Serif para títulos, Inter/Montserrat para corpo) com amplo espaçamento.
- **Animações:** Suaves via Framer Motion para uma experiência premium.

## Estrutura do Site (Página Única / Multi-seções)

### 1. Navegação (Header)
- Menu fixo (Sticky) com links para todas as seções.
- Botão destacado "Falar no WhatsApp".
- Logotipo sofisticado.

### 2. Seção Hero
- Imagem de alta qualidade de um relógio de luxo.
- Título: "O tempo passa. A elegância permanece."
- Indicadores de confiança (Google 4.9/5).

### 3. Catálogo de Relógios
- Listagem em cards premium com filtros (Marca, Preço, Categoria, Época).
- Categorias: Clássicos, Luxo, Antigos, Vintage, Masculinos, Femininos, Exclusivos.

### 4. Seção Especial: Relógios Antigos
- Layout diferenciado para destacar a história e exclusividade das peças vintage.

### 5. Serviços de Relojoaria
- Grade de cards detalhando manutenção, reparação, restauração, etc.

### 6. Solicitação de Avaliação/Reparo
- Formulário completo para envio de dados e fotos para orçamento.

### 7. Sobre Nós e Avaliações
- História da RG Relógios e depoimentos reais dos clientes (Google reviews style).

### 8. Rodapé e Contato
- Informações de endereço (Curitiba), mapa integrado e links sociais.

## Funcionalidades Técnicas
- **Integração WhatsApp:** Botão flutuante e mensagens personalizadas por página/produto.
- **Backend (Lovable Cloud):**
    - Tabela `products` para o catálogo.
    - Tabela `service_requests` para os formulários de avaliação.
    - Tabela `reviews` para depoimentos.
- **Pagamentos:** Estrutura preparada para checkout seguro (PIX, Cartão).

## Detalhes Técnicos (Para Desenvolvedores)
- **Framework:** TanStack Start v1 (React 19).
- **Estilização:** Tailwind CSS v4 com variáveis semânticas.
- **Banco de Dados:** PostgreSQL via Lovable Cloud (Supabase).
- **Segurança:** RLS (Row Level Security) em todas as tabelas.
- **SEO:** Head tags otimizadas em todas as rotas/seções.
