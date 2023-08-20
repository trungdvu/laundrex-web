import { getImageUrl } from '@/utils/utils';
import Image from 'next/image';
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
  return (
    <div
      className={twMerge(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full',
        !url && 'bg-secondary-normal',
        className,
      )}
    >
      {url ? (
        <Image
          className="bg-cover bg-center bg-no-repeat"
          fill
          src={getImageUrl(url)}
          alt="profile avatar"
        />
      ) : !!name || !!email ? (
        <span className={twMerge('text-center text-sm', textClassName)}>
          {(name || email)?.[0].toUpperCase()}
        </span>
      ) : null}
    </div>
  );
}
