/**
 * Approved Marketplace Design System Colors
 * Forest Green & Earthy Modern Palette
 */
export const colors = {
  // Brand Approved Palette
  forestGreen: '#214A3B',
  lightGreen: '#E4EDE6',
  lightPurple: '#EAE7F5',
  offWhite: '#F5F7F4',
  darkText: '#202923',
  mutedText: '#68736C',

  // Semantics & Fundamentals
  primary: '#214A3B',
  primaryLight: '#E4EDE6',
  accent: '#EAE7F5',
  background: '#F5F7F4',
  surface: '#FFFFFF',
  surfaceSubtle: '#F9FAF8',
  white: '#FFFFFF',

  // Borders & Dividers
  border: '#D8E2DC',
  borderLight: '#E7EFEA',

  // Status & Feedback
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#B45309',
  warningLight: '#FEF3C7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#1D4ED8',
  infoLight: '#DBEAFE',

  // Overlay
  overlay: 'rgba(32, 41, 35, 0.4)',
} as const;

export type Colors = typeof colors;
