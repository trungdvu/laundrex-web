import { UilAngleDown } from '@iconscout/react-unicons';
import cn from 'classnames';

export type AuthFooterProps = {
  className?: string;
  languageButtonVisible?: boolean;
};

export default function AuthFooter({
  className,
  languageButtonVisible = true,
}: AuthFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'mt-12 flex w-full items-center justify-between py-4 text-grey-main',
        className,
      )}
    >
      <span className="text-sm">
        © {year}, Laundrex, Inc. All rights reserved.
      </span>
      {languageButtonVisible ? (
        <button className="flex items-center rounded-sm border border-grey-dark bg-base-light bg-opacity-80 py-px pl-2 pr-0.5 hover:bg-opacity-100 focus:outline-none">
          English
          <UilAngleDown className="ml-px" />
        </button>
      ) : null}
    </footer>
  );
}
