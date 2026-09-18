# Plano: Redesign claro e sofisticado da RG Relógios

Transformar o site atual em uma experiência editorial leve, com branco, off-white e dourado discreto, preservando o conteúdo real, as fotos existentes e o atendimento pelo WhatsApp.

## Experiência visual
- Reestruturar os tokens globais para superfícies claras, texto grafite e dourado sutil, mantendo contraste acessível.
- Usar tipografia moderna e legível, com títulos elegantes sem excesso de ornamentos.
- Padronizar cabeçalho, rodapé, botões, filtros, cards, formulários e estados interativos em todas as páginas.
- Aplicar movimentos suaves inspirados no React Bits — entradas delicadas, brilho de borda controlado, inclinação mínima em cards e zoom lento de imagem — respeitando `prefers-reduced-motion`.

## Página inicial
- Criar uma abertura com foto real de relógio, apresentação breve e ações para catálogo e serviços.
- Organizar uma seleção visual entre relógios e relógios antigos com cards minimalistas e filtros claros.
- Destacar restaurações com uma prévia interativa de antes/depois e acesso à página completa.
- Resumir manutenção, restauração e reparos em uma seção objetiva.
- Preservar informações da loja, avaliações disponíveis e contato direto pelo WhatsApp.

## Páginas internas
- Atualizar a galeria de relógios antigos para a mesma linguagem visual clara.
- Atualizar a página de restaurações, preservando os sliders e tornando os resultados mais evidentes.
- Criar uma página própria de serviços com manutenção, restauração, reparos, processo de atendimento e chamada para orçamento.
- Atualizar a página de detalhe do relógio e os estados de carregamento/indisponibilidade.

## Navegação e qualidade
- Converter os principais destinos em páginas próprias e manter âncoras apenas para conteúdo interno da página inicial.
- Manter o WhatsApp visível sem encobrir conteúdo em telas pequenas.
- Otimizar imagens, dimensões, carregamento tardio e movimentos para celular e desktop.
- Garantir metadados únicos para cada página e validar navegação, sliders, menus, filtros e principais chamadas em desktop e celular.

## Detalhes técnicos
- Centralizar cores e sombras em tokens semânticos no estilo global.
- Criar pequenos componentes de animação no padrão React Bits, usando a infraestrutura de movimento já presente e evitando adicionar peso desnecessário.
- Reutilizar os componentes existentes de comparação, navegação e WhatsApp, refinando acessibilidade e consistência.
- Não alterar banco de dados, pagamentos ou regras comerciais nesta etapa.
