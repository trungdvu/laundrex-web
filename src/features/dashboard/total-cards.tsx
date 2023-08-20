import { twMerge } from 'tailwind-merge';

export default function TotalCards() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-3">
      <TotalCard title="Total Earning" number={'$34,775.00'} />
      <TotalCard title="Total Spending" number={'$9,775.00'} />
      <TotalCard title="This Month" number={'$20,424.76'} />
    </div>
  );
}

type TotalCardProps = {
  title: string;
  number: number | string;
  icon?: React.ReactNode;
  className?: string;
};

function TotalCard({ title, number, icon, className }: TotalCardProps) {
  return (
    <div
      className={twMerge(
        'bg-main flex flex-col gap-2 rounded-2xl p-4 text-sm md:text-base',
        className,
      )}
    >
      <div className="flex">
        <span className="mr-1">{title}</span>
        {icon && icon}
      </div>
      <div className="bg-border-main h-px w-full" />
      <span className="block text-lg font-bold md:text-2xl">{number}</span>
    </div>
  );
}
