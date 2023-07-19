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
        'relative rounded-full bg-brand-main px-6 py-3 text-lg font-bold',
        'transition duration-main',
        'focus:outline-none',
        { 'hover:bg-brand-dark': !disabled && !loading },
        { 'bg-brand-main bg-opacity-100 hover:bg-brand-main': loading },
        { 'bg-opacity-20 hover:bg-brand-main hover:bg-opacity-20': disabled },
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0',
          { hidden: !loading },
          { 'block opacity-100': loading },
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
