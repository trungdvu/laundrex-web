import cn from 'classnames';
import Image from 'next/image';
import { CSSProperties } from 'react';

export type LogoProps = {
  width?: number;
  height?: number;
  src?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
};

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
