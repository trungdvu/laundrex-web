import { getImageUrl } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  url?: string;
  name?: string;
  email?: string;
  className?: string;
  textClassName?: string;
};

export default function Avatar({
  url,
  name,
  email,
  className,
  textClassName,
}: Props) {
  const [isError, setIsError] = useState(true);

  return (
    <div
      className={twMerge(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full',
        (!url || isError) && 'bg-secondary',
        className,
      )}
    >
      {url && !isError ? (
        <Image
          className="bg-cover bg-center bg-no-repeat"
          fill
          src={getImageUrl(url)}
          alt="profile avatar"
          priority
          onLoad={() => setIsError(false)}
          onError={() => setIsError(true)}
        />
      ) : !!name || !!email ? (
        <span className={twMerge('text-center text-sm', textClassName)}>
          {(name || email)?.[0].toUpperCase()}
        </span>
      ) : (
        <div className="h-full w-full animate-pulse bg-secondary"></div>
      )}
    </div>
  );
}
