# Plano de Otimização e Simplificação da Experiência do Cliente

O objetivo deste plano é simplificar o site da **RG Relógios**, removendo funcionalidades não essenciais e otimizando a conversão através do redirecionamento direto para o WhatsApp na seção de serviços de relojoaria.

## Alterações Propostas

### UI & UX
- **Remoção do Google Maps**: Ocultar a seção ou o componente que exibe o mapa interativo na página inicial e de contato.
- **Remoção do Catálogo**: Desabilitar a visualização da grade de produtos/catálogo de relógios para focar nos serviços.
- **Redirecionamento Condicional para WhatsApp**:
    - Alterar o comportamento dos 4 botões de serviço na seção de relojoaria.
    - Em vez de abrir um formulário interno, cada botão abrirá o WhatsApp com uma mensagem pré-preenchida dinâmica.
    - Exemplo: Ao clicar em "Manutenção", a mensagem será "Quero uma manutenção de Manutenção".

## Detalhes Técnicos

### Frontend (React/TanStack Router)
- **src/routes/index.tsx**:
    - Comentar ou remover a renderização do grid de produtos e da seção/botão do Google Maps.
    - Atualizar a lista de serviços para incluir uma função de clique que utiliza `window.open` com o link `https://wa.me/5541992399650?text=...`.
    - Implementar a lógica de mensagem dinâmica: `"Quero uma manutenção de " + service.title`.
- **Limpeza de Navegação**: Remover links para "Catálogo" ou "Relógios" no Header e Footer para manter a consistência.

### Validação
- Testar cada um dos 4 botões de serviço para garantir que o redirecionamento e a mensagem personalizada funcionem corretamente em dispositivos móveis e desktop.
- Verificar se não há referências quebradas ou espaços vazios deixados pela remoção do mapa e catálogo.
