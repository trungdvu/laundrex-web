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
        'flex items-center justify-center rounded-full p-3 text-secondary-normal transition duration-normal hover:bg-hover-normal',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
