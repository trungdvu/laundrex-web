import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
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
  const isDisabled = disabled || loading;

  return (
    <button
      className={twMerge(
        'relative rounded-full bg-brand-main px-6 py-3 text-lg font-bold transition duration-main focus:outline-none',
        !disabled && !loading && 'hover:bg-brand-dark',
        loading && 'bg-brand-main bg-opacity-100 hover:bg-brand-main',
        isDisabled && 'bg-opacity-50 hover:bg-brand-main hover:bg-opacity-20',
        className,
      )}
      disabled={isDisabled}
      {...rest}
    >
      <div
        className={twMerge(
          'absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform opacity-0',
          loading && 'block opacity-100',
        )}
      >
        <Loading />
      </div>
      <div
        className={twMerge(
          'flex items-center justify-center',
          loading && 'opacity-0',
        )}
      >
        {iconLeft ? <div className="mr-3">{iconLeft}</div> : null}
        {children}
      </div>
    </button>
  );
}
