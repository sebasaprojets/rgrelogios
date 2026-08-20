# Plano de Melhoria Visual: Estabilidade do Hero e Legibilidade Mobile

Corrigir a trepidação do vídeo do Hero e otimizar a legibilidade do texto em dispositivos móveis.

## Problemas Identificados
- **Trepidação do Vídeo:** O vídeo atual apresenta instabilidade visual (provavelmente devido a um loop imperfeito ou efeito de zoompan mal configurado).
- **Legibilidade Mobile:** O texto dourado sobre o fundo animado dificulta a leitura em telas pequenas, apesar das melhorias anteriores.

## Ações Propostas

### 1. Estabilização do Fundo (Hero)
- Substituir o vídeo por uma imagem macro de alta resolução de um relógio luxuoso com um efeito de "zoom suave" via CSS (transform: scale) em vez de vídeo processado, garantindo 0 trepidação e performance máxima.
- Alternativamente, se o vídeo for mantido, usar uma versão com bitrate otimizado e loop perfeito.

### 2. Otimização de Legibilidade Mobile
- Aumentar ainda mais o contraste no mobile usando um gradiente escuro mais denso na base do texto.
- Ajustar o `line-height` e o `letter-spacing` do título no mobile para melhorar a escaneabilidade.
- Adicionar um leve `text-shadow` escuro para destacar o texto dourado.

### 3. Ajustes Técnicos
- Atualizar `src/routes/index.tsx` com as novas classes de estilo.
- Garantir que o `poster` do vídeo seja de alta qualidade e carregue instantaneamente.

## Detalhes Técnicos
- **CSS Transitions:** Usar animações de hardware (transform/opacity) para o efeito de zoom.
- **Tailwind:** Utilizar classes como `bg-gradient-to-b from-black/20 via-black/60 to-black/90` para o overlay.
- **Responsividade:** Aplicar `text-[2.5rem]` no mobile para o H2 em vez de `text-3xl` se necessário para melhor ajuste.
