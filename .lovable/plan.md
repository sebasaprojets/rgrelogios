# Plano de Otimização Visual: Nossos Serviços Especializados

O objetivo é substituir as imagens atuais da seção "Nossos Serviços Especializados" por fotografias macro de alta resolução que representem especificamente os relógios e suas partes técnicas, reforçando a identidade de relojoaria premium e profissional da RG Relógios.

## Ações Propostas

### 1. Atualização de Imagens (src/routes/index.tsx)
Substituir as URLs das imagens no array de serviços por seleções otimizadas do Pexels:

- **Manutenção**: Detalhe macro de um movimento de relógio sendo ajustado com pinças.
- **Reparação**: Close-up técnico de engrenagens e rubis de um calibre.
- **Restauração**: Relógio antigo clássico com detalhes em ouro e couro, evocando história.
- **Avaliação**: Detalhe de um relógio de luxo (Rolex/Omega style) sob luz controlada.
- **Revisão Completa**: Visão explodida ou mecanismo complexo de cronógrafo.
- **Troca de Bateria**: Fundo de caixa aberto mostrando o circuito e bateria de quartzo.
- **Ajuste de Pulseira**: Foco nos elos de uma pulseira metálica de alta qualidade.
- **Limpeza e Conservação**: Relógio polido brilhando com reflexos nítidos em superfície escura.

### 2. Refinamento de UX
- Garantir que todas as imagens utilizem parâmetros de compressão (`auto=compress&cs=tinysrgb&w=800`) para carregamento rápido.
- Manter o efeito de escala no hover para interatividade premium.

## Detalhes Técnicos
- **Arquivo**: `src/routes/index.tsx`
- **Componente**: Seção `id="serviços"`
- **Tecnologias**: Tailwind CSS, Framer Motion, Pexels CDN.

---
### 📊 Relatório de Planejamento (Pré-execução)
**Sub-agentes ativados:**
- 🎨 **UI Architect**
- 📈 **SEO Optimizer**
