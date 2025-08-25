// src/config/index.ts
export const API_BASE =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:1000";

export const COLORS = {
  orange: process.env.EXPO_PUBLIC_COLOR_ORANGE || "#F97316",
  white:  process.env.EXPO_PUBLIC_COLOR_WHITE  || "#FFFFFF",
  grey:   process.env.EXPO_PUBLIC_COLOR_GREY   || "#6B7280",
  border: process.env.EXPO_PUBLIC_COLOR_BORDER || "#E5E7EB",
  primary:process.env.EXPO_PUBLIC_COLOR_PRIMARY|| "#2ECC71",
  bg:     process.env.EXPO_PUBLIC_COLOR_BG     || "#FEFEFE",
  text:   process.env.EXPO_PUBLIC_COLOR_TEXT   || "#2C3E50",
  textMuted: process.env.EXPO_PUBLIC_COLOR_TEXT_MUTED || "#6B7280",

  // ← ajoute ceci pour éviter les erreurs TS
  neutral100: process.env.EXPO_PUBLIC_COLOR_NEUTRAL100 || "#F3F4F6",
  neutral200: process.env.EXPO_PUBLIC_COLOR_NEUTRAL200 || "#E5E7EB",
  danger:     process.env.EXPO_PUBLIC_COLOR_DANGER     || "#EF4444",
} as const;

export const UI = {
  tabBarHeight: 68,
  tabIconSize: 20,
  tabItemSize: 44,
  radius: 18,
} as const;
