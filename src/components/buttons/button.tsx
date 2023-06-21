import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Loading } from '../loadings/loading';

export type ButtonProps = {
  loading?: boolean;
  iconLeft?: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  children,
  iconLeft,
  loading,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative transform bg-black px-8 py-4 text-lg font-bold text-white transition duration-75',
        {
          'hover:bg-neutral-800 focus:outline-none active:bg-neutral-700':
            !disabled && !loading,
        },
        { 'opacity-70 hover:bg-black active:bg-black': loading },
        { 'opacity-20 hover:bg-black active:bg-black': disabled },
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0',
          { 'opacity-100': loading },
        )}
      >
        <Loading />
      </div>
      <div
        className={cn('flex items-center justify-center', {
          'opacity-0': loading,
        })}
      >
        {iconLeft ? <div className="mr-3">{iconLeft}</div> : null}
        {children}
      </div>
    </button>
  );
}
