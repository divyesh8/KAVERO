# KAVERO COFFEE — MASTER DESIGN SPECIFICATION & ARCHITECTURE

## 1. Brand Identity & Vision
- **Brand Name**: KAVERO COFFEE
- **Tagline**: *From Our Estate. To Your Everyday.*
- **Hero Headline**: *Your Morning Has an Origin.*
- **Brand Pillars**:
  - Farmer-Owned: Direct trade model cutting out middle-men.
  - Estate-Grown in Karnataka: Authentic single-estate heritage coffee from the Western Ghats / Chikmagalur / Coorg highlands.
  - Authentic South Indian Filter Coffee: Traditional decoction and brew craft celebrating the classic brass tumbler & dabarah ritual.
  - Sustainable & Community Driven: Fair remuneration, ethical agricultural practices, and pride of place.
- **Tone & Aesthetics**:
  - Dark, warm, luxurious espresso palette.
  - Mature, editorial, authentic, grounded in nature.
  - No generic tech-startup neon, pastel, or cold corporate styles.

---

## 2. Visual Hierarchy & Design System (Tokens)

### Color Palette
| Token | Hex Value | Semantic Usage |
|---|---|---|
| Espresso Primary | `#21140E` | Dominant surface background, page sections |
| Deep Background | `#140D09` | Hero backdrop, darkest tone, base underlay |
| Card Background | `#2A1A12` | Product cards, feature strips, testimonial cards |
| Forest Green | `#294736` | Announcement strip, brand accent ribbons |
| Forest Deep | `#16241A` | Secondary green surfaces, pill badges |
| Warm Cream | `#F2E8D7` | Primary text, titles, navigation links |
| Light Heading | `#F5E8D7` | Hero & section headings |
| Muted Copper | `#A96C40` | CTAs, accented words (*Origin.*), active badges |
| Copper Light | `#C28B5E` | Eyebrow scripts, rating stars, hover states |
| Roasted Red | `#8A3F35` | Subtle cherry accents, alerts, badges |
| Secondary Text | `#C7B2A1` | Subtitles, body descriptions, metadata |
| Subtle Border | `#50382A` | Card outlines, dividers, input borders |

### Typography
- **Headings**: `Playfair Display` (serif, elegant, high contrast, editorial weight 600/700).
- **Body**: `Inter` (sans-serif, crisp, highly legible at small sizes, weight 400/500).
- **Accents / Eyebrows**: `Alex Brush` / script font (warm cursive, used selectively for section eyebrows such as "Estate-Grown Filter Coffee", "About KAVERO", "Our Signature Coffees").

---

## 3. Approved Page Structure (Section by Section)

1. **Section 01: Announcement Bar**
   - Slim strip in Forest Green (`#16241A` / `#294736`).
   - Centered: `Free Shipping on Orders Above ₹499` | `Freshly Roasted` | `Estate-Grown in Karnataka`.
2. **Section 02: Navigation Header**
   - Left: KAVERO logo (botanical 3-bean emblem + stylized wordmark).
   - Center links: `Shop ˅`, `Our Story`, `Brew Guide`, `Collections ˅`, `Reviews`, `Contact`.
   - Right: Search icon, Account icon, Shopping Cart icon with badge `0`.
   - Responsive mobile drawer menu for `< 1024px`.
3. **Section 03: Main Hero**
   - Left: Script eyebrow ("Estate-Grown Filter Coffee"), serif headline ("Your Morning Has an *Origin.*" with copper italicized "Origin."), descriptive paragraph, "Shop Coffee →" primary CTA, "Our Story ▷" secondary outline CTA.
   - Right: Traditional brass coffee tumbler in dabarah with creamy froth and rising steam, rustic wooden board, coffee beans, glossy foliage with ripe cherries.
4. **Section 04: Brand Trust Strip**
   - 4 evenly distributed circular badge items:
     1. Estate-Grown in Karnataka (Mountain icon)
     2. Farmer-Owned & Community Driven (People icon)
     3. Rich South Indian Filter Coffee (Steaming cup icon)
     4. Freshly Roasted Direct from Farm (Two beans icon)
5. **Section 05: About KAVERO**
   - Left: Pouch on wood table with burlap coffee beans, bowl of cherries, and misty hills background.
   - Right: Script label "About KAVERO", headline "More Than Just Coffee.", story paragraph, 4 checkmark value propositions, "Learn Our Story →" button.
6. **Section 06: Popular Picks**
   - Centered script label "Our Signature Coffees", headline "Popular Picks", 3-leaf botanical divider.
   - 4 product cards:
     1. Original Filter Coffee (₹169, 250 g)
     2. Estate Blend (₹189, 250 g)
     3. Bold Roast (₹199, 250 g)
     4. KAVERO Gift Pack (₹749, 3 × 250 g)
   - Left and right carousel arrow buttons.
7. **Section 07: Karnataka Origin Banner**
   - Landscape banner with Jog Falls waterfall on left, deep dark center with "OUR ORIGIN", "The Karnataka Advantage", story copy, "Explore Our Estates →" button, and farmer harvesting coffee cherries on right.
8. **Section 08: Customer Stories**
   - Headline "Loved by Coffee Enthusiasts".
   - 3 cards with quotes, 5 copper stars, photo avatars, customer names and cities (Ramesh K. / Bengaluru, Anita M. / Mysuru, Vikram S. / Mangaluru).
9. **Section 09: Newsletter Strip**
   - Envelope icon, "Stay in the Loop", invitation copy, email input field, "Subscribe →" button.
10. **Section 10: Footer**
    - 5 columns: Logo & tagline, Shop, Learn, Support, Contact Us & Social links.
    - Bottom mountain ridges landscape contour silhouette.

---

## 4. Animation Engineering Boundaries (Phase Separation)

### Phase 1 (ACTIVE):
- `HeroIntro.tsx` (Motion: staggered entrance for eyebrow, headline, copy, and buttons).
- `SectionReveal.tsx` (GSAP ScrollTrigger: subtle fade/lift on scroll for content sections).
- `ProductTilt.tsx` (Motion: subtle 3D cursor tilt on pouch media container).
- `BrandButton.tsx` (Motion: subtle spring hover elevation and tap feedback).

### Phase 2 (STAGED, OFF by default):
- `HardRefreshPreloader.tsx` (GSAP logo reveal on hard reload).
- `CoffeeBeanRain.tsx` (Canvas physics coffee bean fall).

### Phase 3 (STAGED, OFF by default):
- `CoffeeSteam.tsx` (Rising steam effect above brass tumbler).
- `FloatingLeaves.tsx` (Gentle leaf sway in hero).
- `OriginParallax.tsx` (ScrollTrigger parallax on landscape banner).

### Non-Negotiable Rule:
**GSAP and Motion for React must NEVER animate the same CSS transform properties on the same DOM element.**
GSAP animates wrappers; Motion animates inner interactive elements. All motion respects `prefers-reduced-motion`.

---

## 5. Technology Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Motion**: `motion` (`motion/react`) & `gsap` + `@gsap/react`
- **Icons**: `lucide-react`
- **Images**: Next.js `next/image` with optimized WebP/AVIF formats
