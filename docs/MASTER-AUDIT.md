# KAVERO COFFEE — MASTER REPOSITORY AUDIT & TRANSFORMATION BLUEPRINT

**Date:** 2026-11-06  
**Auditors:** Creative Direction, Interactive Motion Engineering, Principal Full-Stack & E-Commerce Engineering, Security & Performance  
**Baseline Git Checkpoint:** `checkpoint-pre-transformation`  
**Working Branch:** `transformation/master-overhaul`  

---

## 1. Executive Summary

KAVERO Coffee has an authentic brand concept rooted in Karnataka's coffee heritage (Western Ghats, Chikmagalur, Coorg) celebrating the classic brass tumbler and dabarah filter coffee ritual. The repository contains high-quality assets (such as `kavero-origin-video.mp4`, `hero-coffee-tumbler.png`, `about-kavero-estate.png`, and high-res harvest photography) and a clean Next.js 15 + Tailwind CSS + GSAP + Motion foundation.

However, the current website is exclusively an above-the-fold landing page with placeholder anchors (`#shop`, `#about`, etc.), non-functional controls (carousel arrows that do not scroll, search inputs with no execution, cart badge with no drawer/persistence), no backend commerce infrastructure, disabled motion systems, and narrow container widths (`max-w-5xl`) that compress the editorial typography.

This audit documents all findings across the 10 mandated evaluation criteria and establishes the implementation blueprint for the 8 transformation milestones.

---

## 2. Comprehensive 10-Point Audit Findings

### 1. Existing Functional Features
- **Next.js 15 App Router** configured with React 19, TypeScript, Tailwind CSS, `@gsap/react`, `gsap`, and `motion`.
- **Custom Design Tokens** in `src/styles/tokens.css` and `tailwind.config.ts` reflecting the roasted coffee brown palette (`#140D09`, `#1E120B`, `#24160E`, `#271810`, `#294736`, `#A96C40`, `#F2E8D7`).
- **Brand Typography**: `Playfair Display` (serif editorial headings), `Inter` (readable UI text), and `Alex Brush` (cursive script accents).
- **Core Sections**:
  - `AnnouncementBar`: Forest green top banner with shipping & heritage highlights.
  - `Navbar`: Sticky blurred header with logo, navigation links, search toggle, user icon, and cart count.
  - `Hero`: Hero headline, script eyebrow, description, two action buttons, and brass tumbler photo.
  - `BrandTrustStrip`: 4 key trust icons (Estate-Grown, Farmer-Owned, Filter Coffee, Freshly Roasted).
  - `AboutKavero`: 2-column estate story with product pouch imagery and checklist of 4 core values.
  - `PopularPicks`: 4 product cards displaying base pricing, pouch photography, and add-to-cart buttons.
  - `KarnatakaOrigin`: Embedded video banner (`kavero-origin-video.mp4`) with play/pause and mute/unmute controls, opening a rich modal with high-res waterfall and harvest photos.
  - `CustomerStories`: 3 testimonial cards with 5-star ratings and user avatars.
  - `Newsletter`: Client-validated subscription form with success/error states.
  - `Footer`: 6-column editorial footer with contact info, social links, and mountain silhouette.

### 2. Existing Reusable Components
- `src/components/ui/KaveroLogo.tsx`: Flexible multi-size brand logo component.
- `src/components/ui/SectionHeading.tsx`: Editorial eyebrow, serif title, and botanical SVG divider.
- `src/components/kavero-motion/HeroIntro.tsx`: Staggered intro animation for hero elements.
- `src/components/kavero-motion/BrandButton.tsx`: Accessible spring button with primary, outline, and ghost variants.
- `src/components/kavero-motion/ProductTilt.tsx`: Mouse cursor 3D perspective tilt.
- `src/components/kavero-motion/SectionReveal.tsx`: GSAP ScrollTrigger fade and lift.
- `src/components/kavero-motion/HardRefreshPreloader.tsx`: Logo reveal and coffee bean animation structure.
- `src/components/kavero-motion/CoffeeBeanRain.tsx`: Canvas 2D coffee bean particle physics.
- `src/components/kavero-motion/CoffeeSteam.tsx`: Procedural SVG steam paths with blur filters.
- `src/components/kavero-motion/FloatingLeaves.tsx`: Branch sway motion logic.

### 3. Non-Functional Navigation and Controls
- **Navbar Links**: All main links (`Shop`, `Our Story`, `Brew Guide`, `Collections`, `Reviews`, `Contact`) point to on-page hash targets (`#shop`, `#about`, `#brew-guide`, etc.) instead of dedicated multi-page routes.
- **Dropdown Controls**: Nav items marked with `hasDropdown` display ChevronDown arrows that rotate on hover, but render no dropdown menu.
- **Search System**: Expanding search bar has an input field, but submitting or typing does not search products or route anywhere.
- **User Account**: Icon links to `#account` with no login/profile interface.
- **Cart Access**: Cart button links to `#cart`, with no drawer opening, no line items, and no checkout trigger.
- **Carousel Controls**:
  - `PopularPicks.tsx` has left/right arrow buttons that modify `currentIndex`, but all 4 products are rendered in a static grid; the buttons have zero visual effect.
  - `CustomerStories.tsx` similarly has arrow buttons that change state without moving cards.
- **Footer Links**: Over 15 footer links point to `#` without destinations.
- **Newsletter Form**: Submits to purely local `setTimeout` state without persisting subscriber emails.

### 4. Missing Backend Capabilities
- **Database & Data Layer**: No persistent storage (Supabase or local persistent fallback) for products, inventory, orders, customers, reviews, or subscribers.
- **Product Routing & Dynamic Pages**: Missing `/shop` collection page, `/shop/[slug]` product detail pages, and dynamic category/roast filtering.
- **Cart State Management**: Missing persistent typed cart store with SKU handling, quantity increment/decrement, and subtotal calculation.
- **Checkout Engine**: No checkout page (`/checkout`), no Indian PIN code serviceability verification, no tax/shipping calculations, and no order confirmation page (`/order/[id]`).
- **Payment Gateway**: No server-side Razorpay order creation, signature verification, or webhook handling (or clearly labeled demo mode when credentials are not supplied).
- **Admin & Management**: No protected admin dashboard (`/admin`) for inventory management, price updates, order status tracking, or content editing.

### 5. Broken, Duplicated, or Visually Inconsistent Imagery
- **Product Assets**: Multiple redundant pouch image variants in `public/images/` (`pouch-1.png`, `pouch-bold-roast-clean.png`, `product-bold-roast.png`, `test_pouch1.png`, etc.).
- **Preloader Asset**: `HardRefreshPreloader.tsx` uses `/reference/kavero-logo-original.png` which has an opaque beige background, instead of the transparent high-resolution master `kavero-logo-cream-4x.png` or `kavero-logo-2x.png`.
- **Foliage SVG vs Photographic Assets**: `FloatingLeaves.tsx` uses a simple SVG outline `/kavero-motion/coffee-branch.svg`, whereas the repository has photorealistic foliage assets (`/images/about-foliage-exact.png` and `/images/foliage-cherry-branch.png`).
- **Image Crops**: Product pouches in cards have varying aspect ratios and require uniform container heights and `object-contain` alignment.

### 6. Staged but Disabled Motion Systems
- In `src/lib/kavero-motion-config.ts`:
  - `hardRefreshPreloader: false`
  - `leafSway: false`
  - `coffeeSteam: false`
  - `originParallax: false`
- Steam animation was not mounted above the brass tumbler in `Hero.tsx`.
- Foliage sway was not attached to the hero or about section branches.
- Parallax was not active on the Karnataka landscape banner.

### 7. Accessibility & Performance Problems
- **Typography Sizing**: Body and description text in several components is excessively small (`text-[10px]` to `text-[12px]`), causing legibility strain.
- **Contrast Ratios**: Subtitles using `text-cream-secondary/60` on dark backgrounds dip below the WCAG 2.2 AA 4.5:1 minimum contrast threshold.
- **Modal Accessibility**: `KarnatakaOrigin.tsx` estate modal lacks an Escape key listener, focus trap, and background scroll locking (`document.body.style.overflow = "hidden"`).
- **Carousel ARIA**: Carousel buttons lack `aria-controls`, `aria-live`, and keyboard accessibility.
- **Container Geometry**: The desktop `max-w-5xl` (1024px) container severely restricts wide-screen monitors; editorial sections need expansion to 1200–1320px while maintaining intentional breathing room.

### 8. Security Concerns
- Client-side cart and pricing could be tampered with if checkout relied on client calculations. All prices, discounts, and inventory limits must be verified server-side.
- Any future admin dashboard must enforce strict server-side authentication and role-based access control (RBAC), never relying solely on client-side routing guards.
- Lack of rate limiting or CSRF protection on public endpoints (newsletter, review submission, order initiation).

### 9. Hardcoded Business Data & Unsupported Marketing Claims
- `reviews.ts` contains 3 reviews marked `verified: true` with stock customer photos without purchase verification provenance. These must be clearly marked as customer impressions or brand feedback until verified buyer data is connected.
- Contact details (`+91 98765 43210`, `hello@kavero.com`) and social media links are placeholders.
- Shipping rule "Free Shipping on Orders Above ₹499" must be backed by transparent checkout logic and a clear shipping policy.

### 10. Undocumented Differences (Deployed Site vs Repository)
- The live deployment at `https://kavero-orcin.vercel.app/` hosts the Phase 1 static landing page.
- None of the multi-page routes, interactive coffee finder, brewing ritual guide, shopping cart drawer, checkout, or admin capabilities are present on the live site.

---

## 3. Transformation Blueprint & Execution Milestones

| Milestone | Scope | Deliverables |
|---|---|---|
| **M1: Audit & Baseline Repair** | Repository baseline, git checkpoint, fix broken links/controls, audit documentation | `docs/MASTER-AUDIT.md`, fixed carousel/modal behaviors, clean build & tests |
| **M2: Premium Visual Design System** | Palette refinement, 1200-1320px wide layouts, editorial typography, responsive spacing | Refined design tokens, responsive typography clamp, updated container widths |
| **M3: Cinematic Motion & Atmosphere** | Photorealistic coffee steam on brass tumbler, natural foliage sway, refined preloader, origin parallax | Calibrated `CoffeeSteam`, organic `FloatingLeaves`, active `HardRefreshPreloader` |
| **M4: Shopping Fundamentals** | `/shop` collection, product search/filter, `/shop/[slug]` details, typed persistent cart drawer | Product grid, category & roast filters, product gallery & specs, interactive cart drawer |
| **M5: Commerce Backend & Checkout** | Persistent store, Indian PIN code checkout, server-side pricing, Razorpay/demo flow, order tracking | `/checkout`, `/order/[id]`, server actions, payment validation, inventory safeguards |
| **M6: Editorial Brand Experiences** | The Filter Coffee Ritual guide, Karnataka Origin storytelling, Interactive Coffee Finder | `/brew-guide`, `/our-story`, `/our-estates`, `/coffee-finder` with deterministic matching |
| **M7: Admin & Business Operations** | Owner dashboard (`/admin`), customer portal (`/account`), policy pages (`/shipping`, `/returns`, etc.) | Protected dashboard, product/order management, authentic legal & contact pages |
| **M8: Production Hardening & Verification** | Performance audit, WCAG 2.2 AA validation, automated testing suite, production report | Unit & E2E tests, Lighthouse metrics, full milestone reports in `docs/` |

---

## 4. Non-Negotiable Preservation Rules Verified
1. **Brand Name & Wordmark**: KAVERO Coffee remains strictly unchanged.
2. **Approved Logo & Palette**: Warm Roasted Espresso (`#140D09`, `#1E120B`, `#21140E`), Warm Cream (`#F2E8D7`), Muted Copper (`#A96C40`), and Forest Green (`#294736`) preserved.
3. **Heritage Positioning**: Authentic South Indian filter coffee estate-grown in Karnataka.
4. **Product Names & Base Prices**:
   - Original Filter Coffee: ₹169 / 250 g
   - Estate Blend: ₹189 / 250 g
   - Bold Roast: ₹199 / 250 g
   - KAVERO Gift Pack: ₹749 / 3 × 250 g
5. **Authentic Imagery**: Original brass tumbler, Jog Falls, harvest photography, and estate pouches preserved as authoritative assets.
