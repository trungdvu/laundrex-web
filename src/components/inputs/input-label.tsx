import cn from 'classnames';
import { InputLabelProps } from './input-label.type';

export default function InputLabel({
  children,
  className,
  ...rest
}: InputLabelProps) {
  return (
    <label className={cn('text-lg font-bold', className)} {...rest}>
      {children}
    </label>
  );
}
