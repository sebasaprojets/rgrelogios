# Plan - Premium Services Section Enhancement

Refine the "Nossos Serviços Especializados" section to match the luxury aesthetic of the provided reference image, focusing on high-quality imagery, sophisticated layout, and the addition of the "Trust Bar".

## Technical Details
- **UI Architect**: Update `src/routes/index.tsx` to refine the 8-card grid and add the bottom Trust Bar.
- **Styling**: Use Tailwind CSS for the dark luxury theme with gold (`#C5A059`) accents.
- **Imagery**: Select unique, high-quality macro watch photography from Pexels for all 8 service cards.
- **Animations**: Use `framer-motion` for smooth entry and hover effects.

## Proposed Changes

### 1. Update Services Grid (src/routes/index.tsx)
- Replace duplicate images with unique high-quality macro shots.
- Ensure each card has the gold icon next to the title as shown in the reference.
- Match the description and WhatsApp button styling to the mockup.

### 2. Implement Trust Bar (src/routes/index.tsx)
- Add a horizontal bar at the bottom of the section.
- Left side: "Confiança, precisão e tradição desde o primeiro atendimento."
- Right side: Four pillars with icons:
  - Profissionais qualificados
  - Ferramentas de alta precisão
  - Peças originais e selecionadas
  - Garantia em todos os serviços

### 3. Visual Refinements
- Adjust spacing and font sizes to match the elegant serif/sans-serif combination.
- Ensure the "EXCELÊNCIA EM CADA DETALHE" label has the small arrow/separator decoration if possible.
