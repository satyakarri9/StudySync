import { cn } from '../lib/utils';

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6 transition-all duration-300',
        hover && 'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
