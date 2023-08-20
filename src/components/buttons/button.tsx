import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loading } from '../loadings/loading';

export type ButtonProps = {
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  children,
  iconLeft,
  iconRight,
  loading,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'bg-brand-main relative rounded-full px-6 py-3 text-lg font-bold text-white transition duration-normal focus:outline-none',
        !disabled && !loading && 'hover:bg-brand-inverted',
        loading && 'bg-brand-inverted',
        !loading && disabled && 'bg-disabled-main',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      <div
        className={twMerge(
          'absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform opacity-0',
          loading && 'block opacity-100',
        )}
      >
        <Loading className="h-5 w-5 fill-white text-main/20 md:h-7 md:w-7" />
      </div>
      <div
        className={twMerge(
          'flex items-center justify-center',
          loading && 'opacity-0',
        )}
      >
        {iconLeft ? <div className="mr-3">{iconLeft}</div> : null}
        {children}
        {iconRight ? <div className="ml-3">{iconRight}</div> : null}
      </div>
    </button>
  );
}
