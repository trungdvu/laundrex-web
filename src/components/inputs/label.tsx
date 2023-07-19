import cn from 'classnames';
import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

export type InputLabelProps = {} & DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export default function Label({
  children,
  className,
  ...rest
}: InputLabelProps) {
  return (
    <label className={cn('text-base', className)} {...rest}>
      {children}
    </label>
  );
}
