import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Loading } from './loading.button';

export type ButtonProps = {
  loading?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  loading,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative bg-black px-8 py-4 text-lg font-bold text-white transition duration-75 hover:transform hover:bg-neutral-800 focus:outline-none active:bg-neutral-700',
        { 'opacity-70 hover:bg-black active:bg-black': loading },
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
      <div className={cn({ 'opacity-0': loading })}>{children}</div>
    </button>
  );
}
