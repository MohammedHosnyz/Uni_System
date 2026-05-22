export const theme = {
  primary:      '#FABA19',
  primaryHover: '#E5A816',
  accent:       '#FEF3C7',
  background:   '#FAF7F2',
  surface:      '#F5F0E8',
  border:       '#E7E5E4',
  text:         '#1C1917',
  textMuted:    '#78716C',
  white:        '#FFFFFF',
} as const;

export const darkTheme = {
  primary:      '#FABA19',
  primaryHover: '#E5A816',
  accent:       '#92400E',
  background:   '#1A1612',   
  surface:      '#221E18',
  surfaceAlt:   '#2A2520',
  border:       '#3A3228',
  borderLight:  '#4A4035',
  text:         '#F0E6D0',
  textMuted:    '#A89070',
  textSubtle:   '#7A6A50',
  white:        '#221E18',
  heroText:     '#1A1612',
} as const;

export const darkH = {
  topBar:   '#110F0C',
  topText:  '#B0A080',
  topHover: '#FABA19',
  bg:       '#1A1612',
  border:   '#3A3228',
  navText:  '#C0B090',
  navHover: '#FABA19',
  subBar:   '#221E18',
  subText:  '#907860',
  subHover: '#FABA19',
  gold:     '#FABA19',
  text:     '#F0E6D0',
} as const;

export const H = {
  topBar:   '#1C1917',
  topText:  '#E7E5E4',
  topHover: '#FABA19',
  bg:       '#FFFFFF',
  border:   '#E7E5E4',
  navText:  '#44403C',
  navHover: '#FABA19',
  subBar:   '#F5F0E8',
  subText:  '#78716C',
  subHover: '#FABA19',
  gold:     '#FABA19',
  text:     '#1C1917',
} as const;

export const F = {
  bg:         '#1C1917',
  border:     '#44403C',
  text:       '#E7E5E4',
  muted:      '#A8A29E',
  gold:       '#FABA19',
  hover:      '#FEF3C7',
  bottom:     '#171717',
  bottomText: '#78716C',
} as const;

export type HeaderTokens = {
  topBar: string; topText: string; topHover: string;
  bg: string; border: string; navText: string; navHover: string;
  subBar: string; subText: string; subHover: string;
  gold: string; text: string;
};
export type DarkTheme = typeof darkTheme;
export type AnyTheme = { primary: string; primaryHover: string; accent: string; background: string; surface: string; border: string; text: string; textMuted: string; white: string; [key: string]: string };
export type Theme = typeof theme;
