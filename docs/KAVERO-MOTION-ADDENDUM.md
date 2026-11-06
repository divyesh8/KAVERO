# KAVERO Motion Engineering Addendum

Paste the prompt below into Antigravity **after** the original Phase 1 master design specification. Extract this package into the repository root first. Keep the approved screenshot as the visual source of truth. This addendum supersedes the previous 'no animations in Phase 1' rule ONLY for the four small, enabled Phase 1 transitions. The remaining files are future-phase components and must stay disabled.

## Included production-oriented components

| File | Animation/Interaction | Owner | Phase | Default |
| --- | --- | --- | --- | --- |
| `src/components/kavero-motion/HeroIntro.tsx` | Staggered hero eyebrow/headline/copy/actions | Motion | 1 | ON |
| `src/components/kavero-motion/BrandButton.tsx` | Button hover/tap feedback | Motion | 1 | ON |
| `src/components/kavero-motion/ProductTilt.tsx` | Subtle mouse tilt on pouch media | Motion | 1 | ON |
| `src/components/kavero-motion/SectionReveal.tsx` | Once-only scroll fade/lift | GSAP + ScrollTrigger | 1 | ON |
| `src/components/kavero-motion/HardRefreshPreloader.tsx` | Centered approved logo reveal + overlay dissolve | GSAP | 2 | OFF |
| `src/components/kavero-motion/CoffeeBeanRain.tsx` | Staggered coffee-bean canvas physics | Canvas / JS | 2 | OFF |
| `src/components/kavero-motion/FloatingLeaves.tsx` | Organic leaves swaying | GSAP | 3 | OFF |
| `src/components/kavero-motion/CoffeeSteam.tsx` | Soft rising steam | GSAP / SVG | 3 | OFF |
| `src/components/kavero-motion/OriginParallax.tsx` | Subtle origin-photo parallax | GSAP + ScrollTrigger | 3 | OFF |

The enable/disable switches live in `src/lib/kavero-motion-config.ts`.

## Install after your Next.js app exists

```powershell
npm install gsap @gsap/react motion lucide-react
```

The provided components assume a `@/*` alias mapped to `src/*` (standard Next.js setup).

Import the CSS ONCE inside `src/app/layout.tsx` alongside the existing global styles:

```tsx
import "./globals.css";
import "@/styles/kavero-motion.css";
```

Do **NOT** overwrite `layout.tsx`, `page.tsx`, or `globals.css` from the original Phase 1 build. Integrate components into them surgically.

## 1. Hero headline entrance (Motion)

```tsx
import { HeroIntro } from "@/components/kavero-motion/HeroIntro";
import { BrandButton } from "@/components/kavero-motion/BrandButton";

<HeroIntro
  className="flex flex-col items-start gap-5"
  eyebrow={<p className="text-[#A96C40]">Estate-Grown Filter Coffee</p>}
  title={<h1>Your Morning Has an <em>Origin.</em></h1>}
  description={<p>Authentic South Indian filter coffee, grown in Karnataka.</p>}
  actions={<div className="flex flex-wrap gap-3"><BrandButton href="/shop">Shop Coffee</BrandButton><BrandButton href="/our-story" variant="outline">Our Story</BrandButton></div>}
/>
```

## 2. Section reveals (GSAP)

```tsx
import { SectionReveal } from "@/components/kavero-motion/SectionReveal";

<SectionReveal><AboutKavero /></SectionReveal>
<SectionReveal><PopularPicks /></SectionReveal>
<SectionReveal><KarnatakaOrigin /></SectionReveal>
```

**Important:** Animate only the WRAPPER's `opacity` and `translateY`. Do not put a GSAP animation on the same physical DOM element that a `motion.div` also transforms. Avoid wrapping the above-the-fold hero inside SectionReveal.

## 3. Product pouch micro tilt (Motion)

```tsx
import { ProductTilt } from "@/components/kavero-motion/ProductTilt";
import Image from "next/image";

<ProductTilt className="mx-auto max-w-56">
  <Image src="/images/kavero-original.png" alt="KAVERO Original filter coffee" width={360} height={480} className="h-auto w-full object-contain" />
</ProductTilt>
```

The image path is an EXAMPLE. Use the actual output filename of your isolated pouch image. **Do not use the entire screenshot as a product image.** The crop must not include unrelated layout elements.

## 4. Button hover micro-interaction (Motion)

Use `BrandButton` for link CTAs. Product purchase buttons should keep their existing functional `onClick` logic; if adapting for purchase buttons, preserve accessibility, validation, and working cart behavior.

## 5. Phase 2 later: preloader and falling beans

Only after visual Phase 1 is approved: change `hardRefreshPreloader` to `true`, then mount once in the root layout:

```tsx
import { HardRefreshPreloader } from "@/components/kavero-motion/HardRefreshPreloader";

<body>
  <HardRefreshPreloader />
  {children}
</body>
```

The implementation is **best-effort**, not guaranteed hard-refresh detection. Browsers expose navigation type `'reload'` for both normal and hard refresh. Shortcut key detection (`Ctrl+Shift+R` / `Ctrl+F5`) is sometimes intercepted by the browser; menu-triggered hard refresh may not send events to the page. Under this implementation:
- normal refresh does not trigger the intro;
- first visit and client-side routing do not trigger it;
- detectable hard-reload keyboard shortcuts trigger it;
- some hard refreshes will be missed, not mislabeled.

Do not claim exact cross-browser hard-refresh detection. If exact reproducibility is essential, replace the trigger with a user-visible Replay Intro action or a clearly-defined full-reload policy.

The preloader uses the provided exact source logo `public/reference/kavero-logo-original.png`. It is low-resolution with an opaque warm background; a higher-resolution transparent master is required for perfect full-screen rendering. **Do not swap the approved lettering for a new typeface.**

## 6. Phase 3 later: environmental animations

### Coffee steam

```tsx
import { CoffeeSteam } from "@/components/kavero-motion/CoffeeSteam";

<div className="relative">
  <Image src="/images/filter-coffee-mug.webp" alt="Brass filter coffee tumbler" width={720} height={600} />
  <CoffeeSteam />
</div>
```

Calibrate `top`, `left`, and `width` in CSS so steam emerges exactly from the tumbler opening. If the photo already includes steam, do not layer a second plume. The SVG is a controllable approximation, not volumetric fluid simulation.

### Coffee leaves

```tsx
import { FloatingLeaves } from "@/components/kavero-motion/FloatingLeaves";

<section className="relative overflow-hidden">
  <FloatingLeaves />
  {/* Keep heading / CTAs above this layer by z-index as appropriate. */}
</section>
```

Keep leaves near visual edges, not over buying controls or text. SVG is decorative; replace with licensed photographic transparent assets if photorealism is required. Branch anchors and GSAP rotations create an organic swaying effect.

### Origin landscape parallax

```tsx
import { OriginParallax } from "@/components/kavero-motion/OriginParallax";

<div className="relative h-72 overflow-hidden rounded-xl">
  <OriginParallax className="h-full">
    <Image src="/images/approved-karnataka-origin.webp" alt="Karnataka coffee landscape" fill className="object-cover" />
  </OriginParallax>
</div>
```

Do not mislabel tea-plantation reference photos as your actual coffee estate. Use factual image captions and real estate photography when available.

## QA checklist before enabling more phases

- Screenshot composition still matches the approved reference at 1440, 1280, 768, and 390px.
- Fonts, line breaks, hero image, pouch crop, and section heights have not shifted.
- Reduced-motion users see stable content without parallax or large animated effects.
- No GSAP and Motion transform ownership collisions.
- ScrollTrigger instances and timelines clean up on unmount.
- Pointer hover does not block touch interaction.
- Preloader never overlays every client-side navigation.
- No fake product prices, farm claims, reviews, or contact data in production.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass after integration.

## Antigravity follow-up prompt

> Read `docs/KAVERO-MOTION-ADDENDUM.md`, inspect the exact reference screenshot, and merge the provided source files into the existing KAVERO Phase 1 project. Never overwrite an existing layout blindly. Install `gsap`, `@gsap/react`, `motion`, and `lucide-react`. Activate only `heroIntro`, `sectionReveal`, `productTilt`, and `buttonMotion` from `src/lib/kavero-motion-config.ts`. Integrate them in the hero, editorial sections, and product pouch areas without altering layout or typography. Keep all Phase 2/3 effects disabled and staged. Verify screenshots at 1440, 1280, 768, 390, check reduced motion, run lint/typecheck/build, and write `docs/PHASE-1-MOTION-REPORT.md`. Stop after the integration is visually approved; do not implement checkout or turn on the preloader yet.
