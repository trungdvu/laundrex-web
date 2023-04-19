import cn from 'classnames';
import React, { ForwardedRef, LegacyRef } from 'react';
import { InputProps } from './input.type';

const Input = React.forwardRef<
  React.LegacyRef<HTMLInputElement> | undefined,
  InputProps
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
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
      ref={ref as any}
    />
  );
});

Input.displayName = 'Input';

export default Input;
