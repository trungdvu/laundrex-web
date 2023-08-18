import { Dialog } from '@headlessui/react';
import Modal from '../modals/modal';
import { Loading } from './loading';

export default function SignOutModal({ show = false }) {
  return (
    <Modal
      show={show}
      wrapperClassName="flex items-center justify-center  overflow-hidden"
    >
      <Dialog.Panel className="flex w-full max-w-xs flex-col  items-center justify-center overflow-hidden rounded-lg bg-black p-4 text-left align-middle text-normal shadow-normal transition-all">
        <div className="mb-4">
          <Loading />
        </div>
        <Dialog.Title as="h3" className="font-bold leading-6 md:text-lg">
          Signing out...
        </Dialog.Title>
      </Dialog.Panel>
    </Modal>
  );
}
