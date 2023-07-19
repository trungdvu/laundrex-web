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
        'auto-complete-input',
        'w-80 p-4 text-base',
        'rounded-sm border border-grey-dark',
        'bg-transparent',
        'placeholder:font-normal placeholder:text-grey-main',
        'hover:bg-base-lighter hover:bg-opacity-10',
        'focus:border-brand-main focus:bg-base-lighter focus:bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-brand-main',
        'transition duration-fast',
        className,
      )}
      ref={ref as any}
    />
  );
});

Input.displayName = 'Input';

export default Input;
