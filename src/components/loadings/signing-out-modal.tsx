import { Dialog } from '@headlessui/react';
import Modal from '../modals/modal';
import { Loading } from './loading';

export default function SignOutModal({ show = false }) {
  return (
    <Modal show={show}>
      <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center justify-center overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="mb-4">
          <Loading />
        </div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Signing out...
        </Dialog.Title>
      </Dialog.Panel>
    </Modal>
  );
}
