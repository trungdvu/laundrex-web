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
  const isDisabled = disabled || loading;

  return (
    <button
      className={twMerge(
        'relative rounded-full bg-brand-normal px-6 py-3 text-lg font-bold text-white transition duration-normal focus:outline-none',
        !isDisabled && !loading && 'hover:bg-brand-inverted',
        isDisabled && 'bg-opacity-60',
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
        {iconRight ? <div className="ml-3">{iconRight}</div> : null}
      </div>
    </button>
  );
}
