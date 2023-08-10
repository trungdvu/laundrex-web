import SignOutModal from '@/components/loadings/signing-out-modal';
import useMe from '@/hooks/useMe';
import { fetcher } from '@/libs/fetcher';
import { getImageUrl, sleep } from '@/utils/utils';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NAV_ITEMS } from './nav-bar.config';
import Icon from '@/components/icons/icon';
import IconButton from '@/components/buttons/icon-button';

function NavBar() {
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const { user } = useMe();

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
    <nav className="relative hidden px-2 lg:flex">
      <SignOutModal show={signingOut} />
      <div className="relative w-[275px]">
        <motion.div className="fixed h-screen w-[275px]">
          <div className="flex h-full w-full flex-1 flex-col">
            <div className="relative flex w-full items-center pr-3">
              <div className="flex h-14 cursor-pointer items-center">
                <Link
                  className="box-bg-hover rounded-full p-3"
                  href="/admin/dashboard"
                >
                  <div className="relative h-[26.5px] w-[26.5px]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icon className="h-6 w-auto" name="logo-l" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col">
              {NAV_ITEMS.map(({ href, title, icon, iconActive }) => (
                <Link
                  className={cn('group/item py-0.5 text-xl', {
                    'font-bold': href === router.pathname,
                  })}
                  key={href}
                  href={href}
                >
                  <div className="group-hover/item:box-bg-hover flex max-w-min items-center rounded-full p-3 transition duration-200">
                    {href === router.pathname ? iconActive : icon}
                    <span className="ml-3">{title}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full py-3">
              <button className="box-bg-hover flex w-full items-center justify-between rounded-full p-3 transition duration-main">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-base-lighter bg-opacity-10">
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
                    <span className="font-bold">
                      {user?.name ?? user?.email}
                    </span>
                    {!!user?.role?.name && (
                      <span className="text-left">
                        @{user?.role?.name.toLowerCase()}
                      </span>
                    )}
                  </div>
                </div>
                <Icon className="h-5 w-5" name="more" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default NavBar;
