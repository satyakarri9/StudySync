import { cn } from '../lib/utils';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    primary: 'gradient-primary text-white hover:shadow-md hover:shadow-primary-500/25 hover:brightness-110',
    secondary: 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-750 hover:border-gray-600',
    ghost: 'hover:bg-gray-800 text-gray-300 hover:text-white',
    outline: 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-medium',
  };

  return (
    <button
      className={cn(
        'rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center',
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
