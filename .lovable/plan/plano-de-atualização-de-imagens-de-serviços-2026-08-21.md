# Plano de Atualização de Imagens de Serviços

O objetivo é substituir as imagens atuais por fotos mais específicas e contextuais para cada um dos 8 serviços da RG Relógios, garantindo que a imagem represente exatamente o trabalho descrito.

## Alterações Propostas

### 🎨 UI Architect & Luxury Design
- Substituir as URLs das imagens na seção de serviços em `src/routes/index.tsx` por fotos mais descritivas:
    1. **Manutenção**: Imagem de ferramentas de precisão junto a um mecanismo.
    2. **Reparação**: Close-up de um relojoeiro trabalhando com uma lupa.
    3. **Restauração**: Relógio antigo clássico ou de bolso com detalhes vintage.
    4. **Avaliação**: Detalhe de inspeção minuciosa de um mostrador de luxo.
    5. **Revisão Completa**: Mecanismo de relógio totalmente aberto/desmontado.
    6. **Troca de Bateria**: Interior de um relógio de quartzo com a bateria em evidência.
    7. **Ajuste de Pulseira**: Foco nos elos metálicos e pinos de uma pulseira.
    8. **Limpeza e Conservação**: Relógio sendo polido ou com brilho intenso após limpeza.

## Detalhes Técnicos
- Utilizar URLs do Pexels com parâmetros de otimização (`auto=compress&cs=tinysrgb&w=800`).
- Manter o efeito de `grayscale` com transição para colorido no `hover` para consistência visual premium.
- Validar se as imagens carregam corretamente e são responsivas.
