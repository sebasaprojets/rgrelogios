# Plano de Upgrade: Seção de Serviços Premium - RG Relógios

Este plano visa transformar a seção de serviços em uma experiência de luxo, sofisticada e altamente funcional, alinhada com as melhores práticas de design de relojoaria premium.

## 🎨 Identidade Visual e Design

*   **Paleta de Cores:** Fundo azul profundo/preto (`#00050A`), acentos em dourado metálico com gradiente (`#C5A059` a `#8C6D31`), e textos em off-white (`#E5D3B3`).
*   **Tipografia:** Uso de fontes Serif para títulos (elegância) e Sans-serif (Inter) para corpo (legibilidade).
*   **Estilização:** Bordas douradas sutis, cantos arredondados (`rounded-xl`), e sombras suaves para profundidade.
*   **Imagens:** Substituição de ícones simples por imagens reais de alta resolução (mecanismos, ferramentas, relógios de luxo) com overlays de gradiente escuro.

## 🏗️ Estrutura da Seção

1.  **Cabeçalho:**
    *   Etiqueta: "EXCELÊNCIA EM CADA DETALHE" (dourado, minúsculo/caps, espaçado).
    *   Título Principal: "NOSSOS SERVIÇOS ESPECIALIZADOS" (Serif, grande).
    *   Subtítulo: Texto descritivo refinado.

2.  **Grid de Cards (8 itens):**
    *   Cada card conterá:
        *   Fundo com imagem premium e overlay.
        *   Ícone dourado sofisticado no topo.
        *   Título e descrição curta.
        *   Linha divisória elegante.
        *   Botão de ação "Solicitar via WhatsApp" com ícone.
    *   **Serviços:** Manutenção, Reparação, Restauração, Avaliação, Revisão Completa, Troca de Bateria, Ajuste de Pulseira, Limpeza e Conservação.

3.  **Barra de Confiança (Trust Bar):**
    *   Frase de impacto central.
    *   4 pilares com ícones dourados: Profissionais qualificados, Ferramentas de precisão, Peças originais, Garantia.

## ⚡ Interação e Performance

*   **Framer Motion:** Animações de entrada (`staggerChildren`) para os cards.
*   **Hover Effects:** Zoom suave na imagem de fundo, borda dourada iluminada, brilho no ícone, e leve elevação do card.
*   **Responsividade:** Grid adaptável (1 col mobile, 2 col tablet, 4 col desktop).

## 🔌 Funcionalidade e Conversão

*   **WhatsApp:** Integração direta com mensagens pré-preenchidas específicas para cada serviço.
*   **Link Dinâmico:** `https://wa.me/5541992399650?text=Olá! Gostaria de solicitar um orçamento para o serviço de [NOME DO SERVIÇO] do meu relógio.`

## Detalhes Técnicos

*   **Arquivo:** Modificação única em `src/routes/index.tsx`.
*   **Assets:** Uso de URLs de imagens premium do Unsplash/Pexels com foco em detalhes macro de relojoaria.
*   **CSS:** Utilização de `bg-gradient-to-br` para o efeito metálico do ouro.
