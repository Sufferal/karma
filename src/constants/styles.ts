export const ButtonVariants = {
  default: 'default',
  outline: 'outline-solid',
  danger: 'danger',
  icon: 'icon',
} as const;
export type ButtonVariants =
  (typeof ButtonVariants)[keyof typeof ButtonVariants];

export const tailWindColors = {
  'red-500': '#ef4444',
  'red-600': '#e7000b',
  'blue-500': '#2b7fff',
  'blue-600': '#155dfc',
} as const;
export type TailwindColor = keyof typeof tailWindColors;
