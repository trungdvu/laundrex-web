import cn from 'classnames';
import Image from 'next/image';
import { LogoProps } from './logo.type';

export default function Logo({
  width = 64,
  height = 64,
  className,
  style,
  src = '/laundrex',
  alt = 'laundrex logo',
}: LogoProps) {
  return (
    <Image
      className={cn(className)}
      width={width}
      height={height}
      style={style}
      src={src}
      alt={alt}
    />
  );
}
