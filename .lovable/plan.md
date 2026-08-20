# Plano de Implementação - RG Relógios (Fase 2)

Este plano detalha a conclusão do site premium da **RG Relógios**, implementando as funcionalidades restantes, integração com banco de dados e refinamento visual.

## 1. Banco de Dados e API
- **Sincronização do Catálogo**: Substituir os dados estáticos em `src/routes/index.tsx` por chamadas ao Supabase via `useQuery` do TanStack.
- **Persistência de Avaliações**: Conectar o formulário de "Solicite uma avaliação" à tabela `service_requests`.
- **Upload de Imagens**: Implementar suporte a fotos no formulário de reparação usando Supabase Storage.
- **Painel Administrativo**: Criar rota protegida em `src/routes/admin.tsx` para gestão de estoque e pedidos (acesso via `auth.users`).

## 2. Componentes e UI
- **Refinamento do Catálogo**:
  - Implementar filtros funcionais por Marca, Preço, Condição e Época.
  - Adicionar funcionalidade de busca em tempo real.
- **Páginas de Produto**: Criar a rota dinâmica `src/routes/relogios/$id.tsx` com galeria, detalhes técnicos e CTAs contextuais.
- **Seção de Avaliações**: Renderizar cards de clientes reais a partir da tabela `reviews`.
- **Localização**: Adicionar o Google Maps incorporado e botões de ação ("Como Chegar", "Ligar").
- **WhatsApp Dinâmico**: Configurar o botão flutuante para enviar mensagens personalizadas baseadas no contexto da página.

## 3. Funcionalidades de Checkout
- **Estrutura de Pagamento**: Preparar o fluxo de checkout com opções de PIX e Cartão (simulação de gateway seguro).
- **Rodapé Completo**: Incluir todos os links institucionais, redes sociais e políticas solicitadas.

## Detalhes Técnicos
- **Estilização**: Uso rigoroso de Tailwind v4 com tokens semânticos e `framer-motion` para transições premium.
- **Segurança**: RLS (Row Level Security) em todas as tabelas e autenticação robusta para o painel administrativo.
- **SEO**: Meta tags dinâmicas para cada produto e otimização de performance (LCP/CLS).

---
*Este plano segue a arquitetura TanStack Start e as diretrizes de design premium da RG Relógios.*
