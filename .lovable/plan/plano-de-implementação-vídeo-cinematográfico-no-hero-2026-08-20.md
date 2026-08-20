# Plano de Implementação: Vídeo Cinematográfico no Hero

Este plano descreve a substituição da seção Hero estática por um vídeo cinematográfico de um relógio sendo montado/desmontado, conforme solicitado.

## Alterações Visuais
- Substituir o fundo da seção Hero por um vídeo em loop de alta qualidade.
- Adicionar uma camada de overlay escura para garantir o contraste e a legibilidade do texto dourado/champagne.
- Manter a responsividade do vídeo para diferentes tamanhos de tela (cover).

## Detalhes Técnicos
1. **Fonte do Vídeo**: Utilizar um vídeo cinematográfico de alta qualidade (ex: Pexels ou similar) que mostre o intrincado processo de relojoaria (montagem/desmontagem).
2. **Implementação do Componente**:
    - Usar a tag `<video>` com propriedades `autoPlay`, `loop`, `muted` e `playsInline`.
    - Estilizar com `object-cover` para preencher toda a área da seção Hero.
    - Adicionar um gradiente ou overlay semi-transparente acima do vídeo.
3. **Fallback**: Manter uma cor de fundo ou imagem estática caso o vídeo falhe no carregamento.

## Arquivos a serem modificados
- `src/routes/index.tsx`: Atualização da seção `início` (Hero).

## Validação
- Verificar o carregamento do vídeo no preview.
- Testar a legibilidade do texto sobre o vídeo em dispositivos móveis e desktop.
