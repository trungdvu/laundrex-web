import cn from 'classnames';
import { ButtonProps } from './button.type';

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-8 py-4',
        'text-lg font-bold text-white',
        'bg-black',
        'transition duration-75',
        'hover:transform hover:bg-neutral-800',
        'active:bg-neutral-700',
        'focus:outline-none',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
