# Relógios mais vivos e movimento elegante

## Objetivo
Dar acabamento fotográfico profissional à seção de relógios e aplicar movimentos sutis, consistentes e acessíveis em todas as páginas públicas, preservando a identidade clara em off-white e dourado.

## O que será alterado
- Transformar as áreas das fotos de relógios em pequenos estúdios: fundo branco luminoso com leve profundidade, moldura discreta, sombra natural sob a peça e contraste mais vivo sem modificar o relógio original.
- Unificar esse tratamento na galeria, na seleção da página inicial e na página de detalhes do relógio.
- Evoluir a biblioteca local de movimento com efeitos no estilo React Bits: revelação por palavras, entrada suave, cartões com inclinação mínima e brilho que acompanha o ponteiro, além de movimento leve nas imagens.
- Aplicar esses movimentos nas páginas Início, Relógios, Restaurações e Serviços, incluindo cabeçalho, títulos, imagens, cards e chamadas principais.
- Respeitar a preferência de movimento reduzido e manter todos os efeitos discretos em celular e desktop.
- Melhorar a janela ampliada da galeria com superfície clara, controles consistentes e transições suaves.

## Limites visuais
- Sem efeitos chamativos, partículas, distorções ou aparência artificial.
- Sem substituir as fotos reais por imagens inventadas.
- O painel administrativo e a finalização de compra não serão redesenhados, pois não fazem parte da experiência pública solicitada.

## Validação
- Conferir todas as páginas públicas em desktop e celular.
- Testar filtros, ampliação das fotos, navegação por teclado, menu e botões do WhatsApp.
- Confirmar ausência de cortes, sobreposição de textos, movimentos excessivos e erros de carregamento.

## Detalhes técnicos
- Os efeitos serão implementados como componentes locais inspirados no React Bits, sobre a biblioteca de movimento já instalada; isso evita adicionar um pacote inexistente e reduz peso e risco.
- Os novos fundos e sombras usarão apenas os tokens semânticos do projeto e serão desativados ou simplificados quando o dispositivo solicitar menos movimento.
