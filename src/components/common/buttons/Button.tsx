import clsx from 'clsx';
import { ButtonVariants } from '../../../constants/styles';
import { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  'font-semibold py-2 px-5 rounded-sm transition-all duration-200 flex justify-center items-center gap-1';

const variantClasses = {
  [ButtonVariants.default]:
    'bg-slate-800 text-slate-50 hover:bg-slate-700 active:translate-y-0.5',
  [ButtonVariants.outline]:
    'border-2 border-slate-800 text-slate-800 hover:bg-slate-200',
  [ButtonVariants.danger]:
    'bg-red-500 text-slate-50 hover:bg-red-700 active:translate-y-0.5',
  [ButtonVariants.icon]: 'p-0!',
};

export const Button = ({
  variant = ButtonVariants.default,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        base,
        fullWidth ? 'w-full' : 'max-w-max',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
