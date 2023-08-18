import Avatar from '@/components/avatar';
import DisplayName from '@/components/display-name';
import Icon from '@/components/icons/icon';
import SignOutModal from '@/components/loadings/signing-out-modal';
import Popover from '@/components/popover/popover';
import useMe from '@/hooks/useMe';
import { fetcher } from '@/libs/fetcher';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { NAV_ITEMS } from './nav-bar.config';

function NavBar() {
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const { user } = useMe();

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
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
            <div className="relative flex h-14 w-full items-center pr-3 md:h-16 lg:h-20">
              <div className="mt-0.5 flex h-14 cursor-pointer items-center">
                <Link
                  className="rounded-full p-3 transition duration-normal hover:bg-hover-normal"
                  href="/admin/dashboard"
                >
                  <div className="relative h-[26.5px] w-[26.5px]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icon className="h-auto w-5" name="logo-l" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col">
              {NAV_ITEMS.map(({ href, title, icon, iconActive }) => (
                <Link
                  className={twMerge(
                    'group/item py-0.5 text-xl',
                    href === router.pathname && 'font-bold',
                  )}
                  key={href}
                  href={href}
                >
                  <div className="flex max-w-min items-center rounded-full p-3 transition duration-200 group-hover/item:bg-hover-normal">
                    {href === router.pathname ? iconActive : icon}
                    <span className="ml-3">{title}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full py-3">
              <Popover
                panelChild={
                  <div className="flex flex-col gap-1 py-2 text-base font-bold">
                    <Link
                      href="/admin/profile"
                      className="px-4 py-3 transition duration-normal hover:bg-hover-normal"
                    >
                      Profile
                    </Link>
                    <button
                      className="px-4 py-3 text-left transition duration-normal hover:bg-hover-normal"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                }
                buttonChild={
                  <div className="flex w-full items-center gap-2">
                    <Avatar
                      className="flex-none"
                      url={user?.avatar}
                      name={user?.name}
                      email={user?.email}
                    />
                    <DisplayName
                      className="min-w-0 grow"
                      email={user?.email}
                      name={user?.name}
                    />
                    <Icon className="h-5 w-5 flex-none" name="more" />
                  </div>
                }
                buttonProps={{
                  className:
                    'hover:bg-hover-normal flex w-full items-center justify-between rounded-full p-3 transition duration-normal',
                }}
                panelProps={{
                  className: 'w-screen max-w-[275px] ',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default NavBar;
