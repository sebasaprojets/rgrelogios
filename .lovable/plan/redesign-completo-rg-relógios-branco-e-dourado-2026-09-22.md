# Redesign completo — RG Relógios branco e dourado

## Objetivo
Transformar toda a experiência visual em um atelier suíço contemporâneo: fundo marfim, tipografia carvão, dourado metálico usado com moderação e fotografia realista. Todo o conteúdo, navegação, galeria, formulários, compra, restaurações e WhatsApp serão preservados.

## Direção visual definida
- **Paleta:** marfim como fundo principal, branco quente para superfícies, bege claro para alternância de seções, carvão para textos e dourado metálico aproximado de `#C9A45C` para ações e detalhes.
- **Tipografia:** Instrument Serif nos títulos e Inter nos textos, com hierarquia editorial, espaçamento generoso e boa leitura.
- **Acabamento:** linhas douradas finas, sombras muito suaves, cantos discretos e transições curtas; sem excesso de gradientes, animações ou ornamentos.
- **Responsividade:** composições adaptadas para desktop, tablet e celular, sem cortes, sobreposições ou textos apertados.

## Implementação

### 1. Sistema visual global
- Substituir as cores escuras fixas por tokens semânticos em `src/styles.css`, incluindo fundo, superfície, texto, dourado, bordas, estados e sombras.
- Configurar o tema claro como padrão e manter contraste acessível em textos, botões, campos e estados de foco.
- Centralizar padrões reutilizáveis de botões, cartões e superfícies para evitar inconsistências entre páginas.

### 2. Cabeçalho e rodapé
- Converter o cabeçalho compartilhado e o da página inicial em navegação branca translúcida, com texto carvão, logo preservado e realces dourados discretos.
- Refinar o menu móvel, estados de foco e botão do WhatsApp sem mudar os destinos atuais.
- Transformar o rodapé em uma faixa bege quente, com separadores e detalhes dourados sutis.

### 3. Nova abertura da página inicial
- Remover a fotografia escura em tela cheia e construir uma composição editorial clara, com texto de um lado e relógio de luxo do outro.
- Produzir uma imagem realista de relógio em fotografia de produto, sobre fundo claro, adequada ao novo visual.
- Manter “Tempo, arte e precisão”, o texto de apoio e as duas ações existentes; aplicar título carvão, detalhe dourado, botão principal dourado e secundário claro com borda dourada.
- Usar apenas um brilho/gradiente dourado muito suave e linhas finas para profundidade, sem aspecto artificial.

### 4. Página inicial completa
- Reestilizar a seção do vídeo Movado como composição clara de oficina, mantendo o vídeo e suas ações.
- Converter serviços em cartões brancos minimalistas com imagem realista, ícones dourados, texto carvão e elevação delicada.
- Atualizar barra de confiança, depoimentos, apresentação da loja, localização, contato e formulário para o mesmo sistema editorial claro.
- Manter dados, textos, horários, endereço, links e comportamento existentes.

### 5. Galeria e catálogo
- Atualizar a galeria de relógios antigos, filtros, ampliação e navegação entre fotos para superfícies claras e detalhes dourados.
- Preservar todas as imagens e categorias atuais, inclusive as remoções já realizadas.
- Reestilizar detalhes de produto e estados de carregamento/indisponibilidade com cartões brancos, fotografia destacada, preços e ações refinadas.
- Aplicar o novo visual ao fluxo de compra sem alterar sua lógica.

### 6. Restaurações
- Transformar os comparadores antes/depois em cartões editoriais brancos com moldura dourada fina e controles legíveis.
- Atualizar a apresentação do processo, chamada final e janela de detalhes com hierarquia clara e sombras suaves.
- Preservar todas as fotos, textos e interação de arrastar.

### 7. Áreas auxiliares
- Aplicar os mesmos tokens claros ao painel administrativo, tabelas, formulários, estados e navegação lateral, sem mudar dados ou operações.
- Atualizar o botão flutuante do WhatsApp para harmonizar com o novo tema, preservando sua identificação verde e sua função.
- Refinar telas de erro, vazio e carregamento para consistência visual.

## Detalhes técnicos
- Arquivos centrais: `src/styles.css`, componentes compartilhados, página inicial, galeria, restaurações, detalhes do relógio, compra e painel administrativo.
- Remover cores visuais fixas dos componentes e usar exclusivamente tokens semânticos do tema.
- Preservar TanStack Start, integrações atuais, consultas, formulários e URLs.
- Garantir metadados próprios nas páginas de conteúdo que ainda não os possuem, sem alterar o conteúdo exibido.
- Respeitar redução de movimento e manter navegação por teclado e foco visível.

## Validação
- Verificar página inicial e rotas internas em desktop, tablet e celular.
- Testar menu, filtros da galeria, comparador antes/depois, modais, formulários, detalhes de produto, compra e WhatsApp.
- Conferir contraste, alinhamento, cortes de imagem, sobreposições e consistência do dourado.
- Confirmar ausência de erros de compilação, execução e navegação.
