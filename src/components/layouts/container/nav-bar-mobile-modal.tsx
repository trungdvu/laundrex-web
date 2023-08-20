import Avatar from '@/components/avatar';
import DisplayName from '@/components/display-name';
import Icon from '@/components/icons/icon';
import { Loading } from '@/components/loadings/loading';
import Modal from '@/components/modals/modal';
import useMe from '@/hooks/useMe';
import useWindowSize from '@/hooks/useWindowSize';
import { fetcher } from '@/libs/fetcher';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { NAV_ITEMS } from './nav-bar.config';

type Props = {
  show?: boolean;
  onClose?: () => void;
};

export default function NavbarMobileModal({ show, onClose }: Props) {
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const { user } = useMe();
  const [height, width] = useWindowSize();

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

  useEffect(() => {
    onClose?.();
  }, [height, width]);

  return (
    <Modal
      wrapperClassName="overflow-hidden text-base md:text-lg"
      backdropClassName="bg-white"
      show={show}
    >
      <Dialog.Panel className="h-full w-full overflow-y-scroll">
        <button
          className="md:4 text-main fixed bottom-10 left-1/2 top-auto -translate-x-1/2 rounded-full p-2 hover:text-opacity-60"
          onClick={onClose}
        >
          <Icon name="cross" className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <div className="flex flex-col items-center gap-5 pt-10">
          <div className="flex flex-col items-center">
            <Link href="/admin/profile">
              <Avatar
                className="mx-auto h-14 w-14 md:h-16 md:w-16"
                textClassName="text-lg md:text-3xl"
                name={user?.name}
                email={user?.email}
                url={user?.avatar}
              />
              <DisplayName
                email={user?.email}
                name={user?.name}
                className="mt-2 text-center text-base"
                supportTextClassName="hidden"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, title }) => (
              <Link
                className={twMerge(
                  'group/item flex justify-center',
                  href === router.pathname && 'font-bold',
                )}
                href={href}
                key={href}
              >
                <span className="max-w-min rounded-full p-3 transition duration-normal group-hover/item:bg-secondary group-hover/item:bg-opacity-10">
                  {title}
                </span>
              </Link>
            ))}
          </div>
          <button
            className="group/item flex justify-center p-3"
            onClick={handleSignOut}
          >
            <span className="relative max-w-max rounded-full transition duration-normal group-hover/item:bg-secondary group-hover/item:bg-opacity-10">
              Sign out
              {signingOut && (
                <div className="absolute -right-10 top-1/2 -translate-y-1/2">
                  <Loading className="h-5 w-5" />
                </div>
              )}
            </span>
          </button>
        </div>
      </Dialog.Panel>
    </Modal>
  );
}
