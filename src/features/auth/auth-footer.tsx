import { UilAngleDown } from '@iconscout/react-unicons';
import cn from 'classnames';
import { AuthFooterProps } from './auth-footer.type';

export default function AuthFooter({ className }: AuthFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'mt-12 flex w-full items-center justify-between py-4 text-neutral-400',
        className,
      )}
    >
      <span className="text-sm">
        © {year}, Laundrex, Inc. All rights reserved.
      </span>
      <button className="flex items-center border border-neutral-300 bg-neutral-50 px-2 py-px text-base hover:border-neutral-400 hover:bg-neutral-100 focus:outline-none">
        English
        <UilAngleDown className="ml-px" />
      </button>
    </footer>
  );
}
