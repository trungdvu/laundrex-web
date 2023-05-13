import Logo from '../logo/logo';

export default function Header() {
  return (
    <header>
      <div className="flex h-20 items-center px-5">
        <Logo height={48} width={48} />
        <h3 className="ml-2 text-2xl font-extrabold text-black">Laundrex</h3>
      </div>
    </header>
  );
}
