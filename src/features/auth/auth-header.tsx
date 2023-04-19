import cn from 'classnames';
import Image from 'next/image';
import { AuthHeaderProps } from './auth-header.type';

export default function AuthHeader({ className }: AuthHeaderProps) {
  return (
    <header className={cn('py-8', className)}>
      <div className="flex items-center">
        <Image src="/laundrex.svg" width={48} height={48} alt="laundrex" />
        <h3 className="ml-2 text-2xl font-extrabold text-black">Laundrex</h3>
      </div>
    </header>
  );
}
