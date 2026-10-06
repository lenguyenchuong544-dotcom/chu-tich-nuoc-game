import { Transition, Variants } from 'framer-motion';

// ============================================================================
// MOTION SYSTEM: PASTEL LIGHT THEME PRESETS
// Easing and springs designed for physical, tactile stationery aesthetics.
// Respects prefers-reduced-motion across all tokens.
// ============================================================================

// Physical Spring Presets
export const springs = {
  // Snappy, authoritative feedback for stamps ("DUYỆT" / "BÁC BỎ") and buttons
  stamp: {
    type: 'spring',
    stiffness: 600,
    damping: 24,
    mass: 0.8,
  } as Transition,

  // Fluid physics for dragging top dossier cards and smooth releases
  dossierCard: {
    type: 'spring',
    stiffness: 300,
    damping: 26,
    mass: 0.9,
  } as Transition,

  // Soft elastic settling for incoming replacement cards rising from deck
  deckRise: {
    type: 'spring',
    stiffness: 240,
    damping: 22,
    mass: 1,
  } as Transition,

  // Gentle pop for correct answer sparkle and rank upgrades
  celebrationPop: {
    type: 'spring',
    stiffness: 450,
    damping: 18,
    mass: 0.7,
  } as Transition,

  // Smooth layout shifts for live scoreboard row re-ordering
  scoreboardRow: {
    type: 'spring',
    stiffness: 350,
    damping: 30,
    mass: 1,
  } as Transition,
};

// Durations & Easings (non-spring curves)
export const transitions = {
  instant: { duration: 0 },
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  standard: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] },
  gentle: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  drift: { duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' as const },
};

// Reusable Variants with Reduced-Motion Fallbacks
export const cardStackVariants: Variants = {
  idle: { scale: 1, y: 0, opacity: 1, rotate: 0 },
  exitingLeft: {
    x: -380,
    y: 40,
    rotate: -18,
    opacity: 0,
    transition: { duration: 0.26, ease: [0.4, 0, 0.7, 0.2] },
  },
  exitingRight: {
    x: 380,
    y: 40,
    rotate: 18,
    opacity: 0,
    transition: { duration: 0.26, ease: [0.4, 0, 0.7, 0.2] },
  },
};

// Rubber Stamp Variants (Initial strike -> settling ink)
export const stampVariants: Variants = {
  hidden: { scale: 1.8, opacity: 0, rotate: 14 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 6,
    transition: springs.stamp,
  },
  rejected: {
    scale: 1,
    opacity: 1,
    rotate: -8,
    transition: springs.stamp,
  },
};

// Answer Explanation & Sheet Entrances
export const slideUpVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.standard,
  },
  exit: {
    y: 12,
    opacity: 0,
    transition: transitions.fast,
  },
};

// Gentle Crisis Alert Nudge (no jarring screen shakes)
export const crisisAlertVariants: Variants = {
  initial: { scale: 0.96, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: springs.celebrationPop,
  },
  bellRing: {
    rotate: [-8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};
