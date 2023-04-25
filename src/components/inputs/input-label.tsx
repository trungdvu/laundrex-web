import cn from 'classnames';
import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

export type InputLabelProps = {} & DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export default function InputLabel({
  children,
  className,
  ...rest
}: InputLabelProps) {
  return (
    <label className={cn('text-lg font-medium', className)} {...rest}>
      {children}
    </label>
  );
}
