import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children?: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function IconButton({ className, children, ...rest }: Props) {
  return (
    <button
      className={twMerge(
        'hover:bg-hover flex min-h-[2.25rem] min-w-[2.25rem] items-center justify-center rounded-full text-secondary transition duration-normal',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
