import cn from 'classnames';
import Image from 'next/image';

export type AuthHeaderProps = {
  className?: string;
  textBrandVisible?: boolean;
};

export default function AuthHeader({
  className,
  textBrandVisible = true,
}: AuthHeaderProps) {
  return (
    <header className={cn('py-8', className)}>
      <div className="flex items-center">
        <Image src="/laundrex.svg" width={54} height={54} alt="laundrex" />
        {textBrandVisible ? (
          <h3 className="ml-2 text-3xl font-extrabold text-black">Laundrex</h3>
        ) : null}
      </div>
    </header>
  );
}
