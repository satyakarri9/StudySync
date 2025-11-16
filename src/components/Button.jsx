import { cn } from '../lib/utils';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    primary: 'gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all',
    secondary: 'glass text-white hover:bg-white/20',
    ghost: 'hover:bg-white/10 text-gray-300 hover:text-white',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
