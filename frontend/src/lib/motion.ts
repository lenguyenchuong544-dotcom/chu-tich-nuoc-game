// ============================================================================
// HỆ THỐNG CHUYỂN ĐỘNG (PASTEL MOTION PRESETS & SPRING PHYSICS)
// ============================================================================

export const springPresets = {
  // Bật nảy xúc giác nhẹ cho nút bấm & tem đóng dấu
  tactile: {
    type: 'spring' as const,
    stiffness: 450,
    damping: 24,
  },
  // Lò xo vật lý cho tập hồ sơ giấy (dossier card stack)
  cardStack: {
    type: 'spring' as const,
    stiffness: 320,
    damping: 28,
    mass: 0.8,
  },
  // Nổi nhẹ êm ái cho modal & popup lý luận
  sheet: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 26,
  },
  // Bảng xếp hạng re-order layout
  scoreboard: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
};

export const transitionEasings = {
  smooth: [0.16, 1, 0.3, 1] as const,
  stamp: [0.34, 1.56, 0.64, 1] as const,
};

// Variants hỗ trợ prefers-reduced-motion
export const stampVariants = {
  initial: { scale: 1.4, opacity: 0, rotate: -8 },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: -4,
    transition: { duration: 0.16, ease: transitionEasings.stamp },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const fadeScaleVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: transitionEasings.smooth } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};
