import cn from 'classnames';
import Image from 'next/image';
import { AuthHeaderProps } from './auth-header.type';

export default function AuthHeader({ className }: AuthHeaderProps) {
  return (
    <header className={cn('py-8', className)}>
      <div className="flex items-center">
        <Image src="/laundrex.svg" width={54} height={54} alt="laundrex" />
        <h3 className="ml-2 text-3xl font-extrabold text-black">Laundrex</h3>
      </div>
    </header>
  );
}
