import { twMerge } from 'tailwind-merge';

type Props = {
  name?: string;
  email?: string;
  className?: string;
  supportTextClassName?: string;
};

export default function DisplayName({
  name,
  email,
  className,
  supportTextClassName,
}: Props) {
  return (
    <div
      className={twMerge(
        'block min-w-0 truncate text-left font-bold',
        className,
      )}
    >
      <span>{name || email?.split('@')[0].toLowerCase()}</span>
      {!!email && !!name && (
        <span
          className={twMerge(
            'text-secondary mt-0.5 block text-sm font-normal',
            supportTextClassName,
          )}
        >
          @{email.split('@')[0].toLowerCase()}
        </span>
      )}
    </div>
  );
}
