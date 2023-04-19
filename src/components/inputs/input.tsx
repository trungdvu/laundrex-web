import cn from 'classnames';
import { InputProps } from './input.type';

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'w-80 p-4',
        'text-lg font-medium',
        'border border-neutral-200',
        'bg-neutral-50',
        'placeholder:font-normal placeholder:text-neutral-400',
        'hover:border-neutral-400 hover:bg-neutral-100',
        'focus:outline-none',
        'transition duration-75',
        className,
      )}
      {...rest}
    />
  );
}
