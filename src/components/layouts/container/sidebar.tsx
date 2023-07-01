import SigninOutModal from '@/components/loadings/signing-out-modal';
import { fetcher } from '@/libs/fetcher';
import { sleep } from '@/utils/utils';
import { UilAngleDoubleLeft, UilSignOutAlt } from '@iconscout/react-unicons';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import Logo from '../../logo';
import { SIDEBAR_MENU_ITEMS } from './sidebar.config';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
};

function Sidebar({ visible, onClose }: SidebarProps) {
  const [signingOut, setSigningOut] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await sleep(500);
      const res = await fetcher('sign-out');
      setSigningOut(false);
      if (res.ok) {
        router.replace('/sign-in');
      }
    } catch (error) {
      setSigningOut(false);
    }
  };

  return (
    <aside className="group flex h-screen text-neutral-500">
      <SigninOutModal show={signingOut} />
      <motion.div
        className="relative flex w-72 flex-1 flex-col border-r"
        animate={{
          translateX: visible ? 0 : -288,
          opacity: visible ? 1 : 0,
          transition: { type: 'keyframes' },
        }}
      >
        <Header visible={visible} onClose={onClose} />
        <Menu />
        <button
          className="flex items-center px-10 py-4 transition focus:text-brand focus:underline"
          onClick={handleSignOut}
        >
          <UilSignOutAlt size={26} />
          <span className="ml-3 font-medium">Sign out</span>
        </button>
      </motion.div>
    </aside>
  );
}

function Header({
  visible,
  onClose,
}: Pick<SidebarProps, 'visible' | 'onClose'>) {
  return (
    <div className="relative flex h-20 w-full items-center border-b px-10 py-4">
      <div className="flex cursor-pointer items-center">
        <Logo height={28} width={28} />
        <h3 className="ml-3 text-lg font-extrabold text-black">Laundrex</h3>
      </div>
      <button
        className={cn(
          'btn-icon invisible absolute bottom-0 right-5 top-1/2 z-10 h-10 w-10 -translate-y-1/2 transform  text-lg transition group-hover:visible',
          { 'translate-x-0': !visible },
        )}
        onClick={onClose}
      >
        <UilAngleDoubleLeft size={32} />
      </button>
    </div>
  );
}

function Menu() {
  const { pathname } = useRouter();

  return (
    <div className="flex w-full flex-1 flex-col">
      {SIDEBAR_MENU_ITEMS.map(({ href, title, Icon }) => (
        <Link
          className={cn(
            'flex items-center px-10 py-4 font-medium transition hover:bg-neutral-100 focus:text-brand',
            { 'text-brand': href === pathname },
          )}
          key={href}
          href={href}
        >
          <Icon size={26} />
          <span className="ml-3">{title}</span>
        </Link>
      ))}
    </div>
  );
}

export default memo(Sidebar);
