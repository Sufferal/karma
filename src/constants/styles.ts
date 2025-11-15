export const ButtonVariants = {
  default: 'default',
  outline: 'outline-solid',
  danger: 'danger',
  icon: 'icon',
} as const;
export type ButtonVariants =
  (typeof ButtonVariants)[keyof typeof ButtonVariants];

export const MODAL_PROJECT_HEIGHT = '65%';
