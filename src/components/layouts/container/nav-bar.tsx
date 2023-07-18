import SignOutModal from '@/components/loadings/signing-out-modal';
import useMe from '@/hooks/useMe';
import { fetcher } from '@/libs/fetcher';
import { getImageUrl, sleep } from '@/utils/utils';
import { UilEllipsisH } from '@iconscout/react-unicons';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import Logo from '../../logo';
import { SIDEBAR_MENU_ITEMS } from './sidebar.config';

function NavBar() {
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
    <aside className="relative flex px-2 text-black">
      <SignOutModal show={signingOut} />
      <div className="relative h-0 w-[275px]">
        <motion.div className="fixed h-screen w-[275px]">
          <div className="flex h-full w-full flex-1 flex-col">
            <Header />
            <Menu />
            <Profile />
          </div>
        </motion.div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <div className="relative flex w-full items-center px-3">
      <div className="flex h-14 cursor-pointer items-center">
        <Logo height={30} width={30} />
      </div>
    </div>
  );
}

function Menu() {
  const { pathname } = useRouter();

  return (
    <div className="flex w-full flex-1 flex-col">
      {SIDEBAR_MENU_ITEMS.map(({ href, title, Icon }) => (
        <Link
          className={cn('group/item py-0.5 text-xl', {
            'font-bold text-brand': href === pathname,
          })}
          key={href}
          href={href}
        >
          <div className="flex max-w-min items-center rounded-full p-3 transition duration-200 group-hover/item:bg-neutral-100">
            <Icon size={28} />
            <span className="ml-3">{title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Profile() {
  const { user } = useMe();

  return (
    <div className="w-full py-3">
      <button className="flex w-full items-center justify-between rounded-full p-3 transition duration-200 hover:bg-neutral-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-50">
            {user?.avatar && (
              <Image
                className="h-full w-full"
                src={getImageUrl(user?.avatar)}
                width="0"
                height="0"
                sizes="100vw"
                alt="profile avatar"
              />
            )}
          </div>
          <div className="flex flex-col gap-0.5 text-sm">
            <span className="font-bold">{user?.name ?? user?.email}</span>
            {!!user?.role?.name && (
              <span className="text-left">
                @{user?.role?.name.toLowerCase()}
              </span>
            )}
          </div>
        </div>
        <UilEllipsisH size={18} />
      </button>
    </div>
  );
}

export default memo(NavBar);
