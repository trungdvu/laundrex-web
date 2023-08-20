import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
  show?: boolean;
  onClose?: () => any;
  children?: any;
  wrapperClassName?: string;
  backdropClassName?: string;
};

function Modal({
  show = false,
  onClose = () => {},
  children,
  wrapperClassName,
  backdropClassName,
}: ModalProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={twMerge('bg-backdrop fixed inset-0', backdropClassName)}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={twMerge('absolute inset-0', wrapperClassName)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(Modal);
