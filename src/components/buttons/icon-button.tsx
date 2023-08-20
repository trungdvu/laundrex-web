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
        'flex min-h-[2.25rem] min-w-[2.25rem] items-center justify-center rounded-full text-secondary-normal transition duration-normal hover:bg-hover-normal',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
