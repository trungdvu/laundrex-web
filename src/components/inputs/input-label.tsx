import cn from 'classnames';
import { InputLabelProps } from './input-label.type';

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
