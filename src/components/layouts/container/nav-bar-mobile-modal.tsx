import Icon from '@/components/icons/icon';
import Modal from '@/components/modals/modal';
import useMe from '@/hooks/useMe';
import { getImageUrl } from '@/utils/utils';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from './nav-bar.config';

type Props = {
  show?: boolean;
  onClose?: () => void;
};

export default function NavbarMobileModal({ show, onClose }: Props) {
  const router = useRouter();
  const { user } = useMe();

  return (
    <Modal
      show={show}
      wrapperClassName="overflow-hidden bg-black/30 backdrop-blur-md text-base md:text-lg"
    >
      <Dialog.Panel className="h-full w-full overflow-y-scroll">
        <button
          className="md:4 fixed bottom-10 left-1/2 top-auto -translate-x-1/2 rounded-full bg-base-lighter p-2 text-grey-darker hover:bg-white hover:bg-opacity-80"
          onClick={onClose}
        >
          <Icon name="cross" className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <div className="flex flex-col items-center gap-5 pt-10">
          <div className="flex flex-col items-center">
            <Link href="/admin/profile">
              <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full bg-opacity-10 md:h-20 md:w-20">
                {user?.avatar && (
                  <Image
                    fill
                    src={getImageUrl(user?.avatar)}
                    alt="profile avatar"
                  />
                )}
              </div>
              <p className="mt-2 font-bold">{user?.name ?? user?.email}</p>
              {!!user?.role?.name && (
                <p className="mt-0.5 text-sm text-grey-main md:text-base">
                  @{user.role.name.toLowerCase()}
                </p>
              )}
            </Link>
          </div>
          <div className="flex w-full flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, title }) => (
              <Link
                className={classNames('group/item flex justify-center', {
                  'font-bold': href === router.pathname,
                })}
                href={href}
                key={href}
              >
                <span className="max-w-min rounded-full p-3 transition duration-main group-hover/item:bg-base-lighter group-hover/item:bg-opacity-10">
                  {title}
                </span>
              </Link>
            ))}
          </div>
          <button
            className={classNames('group/item flex justify-center py-0.5')}
          >
            <span className="max-w-max rounded-full p-4 transition duration-main group-hover/item:bg-base-lighter group-hover/item:bg-opacity-10">
              Sign out
            </span>
          </button>
        </div>
      </Dialog.Panel>
    </Modal>
  );
}
