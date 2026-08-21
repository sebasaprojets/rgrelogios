# Plan: Atualização de Imagens dos Serviços Especializados

O objetivo é substituir as imagens atuais da seção "Nossos Serviços Especializados" por imagens macro de alta qualidade que representem fielmente cada serviço oferecido pela RG Relógios, garantindo que todas as URLs sejam estáveis e funcionais.

## Alterações Propostas

### UI Architect & Design
- **Substituição de Imagens**: Atualizar as URLs no componente `Index` em `src/routes/index.tsx` para cada um dos 8 serviços:
    1. **Manutenção**: Imagem de ferramentas e precisão.
    2. **Reparação**: Close-up de ferramentas de relojoaria.
    3. **Restauração**: Engrenagens e mecanismos clássicos.
    4. **Avaliação**: Relógio de luxo em detalhe.
    5. **Revisão Completa**: Mecanismo interno complexo em macro.
    6. **Troca de Bateria**: Relógio aberto revelando o mecanismo.
    7. **Ajuste de Pulseira**: Foco em detalhe de pulseira/pulso.
    8. **Limpeza e Conservação**: Relógio limpo com reflexos de luz.

### Detalhes Técnicos
- As novas URLs utilizam o domínio `images.pexels.com` com parâmetros de compressão (`auto=compress&cs=tinysrgb&w=800`) para garantir performance e qualidade.
- Validação das URLs realizada via script para evitar erros de carregamento (404).

## Verificação
- Verificação visual da seção de serviços no preview.
- Teste de carregamento das imagens em diferentes resoluções.
- Confirmação de que os botões de WhatsApp continuam operacionais com as mensagens corretas.
