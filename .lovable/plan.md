# Plan: Fix Hero Video Shake and Mobile Readability

Fix the "shaking" hero video by regenerating a smoother version and improve text readability on mobile devices by adjusting typography and background contrast.

## User Review Required
> [!IMPORTANT]
> I will regenerate the hero video using a high-quality static image with a smooth, slow-motion "Ken Burns" effect. This replaces the current yoyo loop which may be causing the "shaking" sensation.

## Proposed Changes

### 🎨 UI Architect & 📈 SEO Optimizer
- **Hero Section (Mobile Readability):**
  - Reduce heading font size from `text-5xl` to `text-3xl` on small screens to prevent clipping and improve layout.
  - Increase background overlay opacity from `0.6` to `0.8` on mobile to improve text contrast.
  - Add a subtle `drop-shadow` to the hero text to make it stand out against the busy watch movement background.
  - Adjust line heights and margins for a more balanced mobile layout.

### 🚀 Deploy Ops & 🎨 UI Architect
- **Hero Video (Stability):**
  - Generate a new, ultra-high-resolution macro shot of a luxury watch movement.
  - Create a smooth 15-second video with a very slow zoom-in effect.
  - Implement a seamless cross-fade loop instead of a yoyo (reverse) loop to eliminate jitter at the transition point.
  - Optimize the video for web delivery (H.264, lower bitrate but high quality) to reduce loading artifacts.
  - Update the `hero-watch.mp4` asset in the CDN.

## Technical Details
- Use `imagegen` for a high-quality 16:9 watch movement image.
- Use `ffmpeg` with `zoompan` filter for the slow zoom effect.
- Update `src/routes/index.tsx` with responsive classes:
  - `text-3xl sm:text-4xl md:text-8xl` for the heading.
  - `bg-[#00050A]/80 md:bg-[#00050A]/60` for the overlay.
  - `drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]` for text.
