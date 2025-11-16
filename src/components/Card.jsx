import { cn } from '../lib/utils';

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-gray-900/40 border border-gray-800/60 rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm',
        hover && 'hover:border-gray-700/60 hover:shadow-lg hover:shadow-primary-500/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
