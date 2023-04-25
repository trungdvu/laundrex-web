import cn from 'classnames';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = React.forwardRef<
  React.LegacyRef<HTMLInputElement> | undefined,
  InputProps
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      className={cn(
        'w-80 p-4',
        'text-lg',
        'border border-neutral-200',
        'bg-neutral-50',
        'placeholder:font-normal placeholder:text-neutral-400',
        'hover:border-neutral-400 hover:bg-neutral-100',
        'focus:border-neutral-400 focus:outline-none focus:ring-0',
        'transition duration-75',
        className,
      )}
      ref={ref as any}
    />
  );
});

Input.displayName = 'Input';

export default Input;
