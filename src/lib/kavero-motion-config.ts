/**
 * KAVERO Motion Architecture Switches.
 * Strict ownership:
 * - GSAP owns outer section scroll reveals, timeline sequences, steam and environmental sway.
 * - Motion for React owns interactive inner elements (headline staggers, buttons, product tilts, cart drawer).
 * - Never animate the same transform property on the same DOM node with both engines.
 * - All motion respects prefers-reduced-motion.
 */
export const KAVERO_MOTION = {
  heroIntro: true,
  sectionReveal: true,
  productTilt: true,
  buttonMotion: true,
  hardRefreshPreloader: true,
  leafSway: true,
  coffeeSteam: true,
  originParallax: true,
} as const;
