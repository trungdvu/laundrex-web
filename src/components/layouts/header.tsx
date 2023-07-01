import Link from 'next/link';
import Logo from '../logo';

export default function Header() {
  return (
    <header>
      <Link
        href="/dashboard"
        className="flex h-20 cursor-pointer items-center px-10"
      >
        <Logo height={28} width={28} />
        <h3 className="ml-2 text-lg font-extrabold text-black">Laundrex</h3>
      </Link>
    </header>
  );
}
