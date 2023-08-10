import classNames from 'classnames';

export default function TotalCards() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-opacity-20 px-4 lg:grid-cols-3">
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
      className={classNames(
        'rounded-2xl bg-base-main p-4 text-sm md:text-base',
      )}
    >
      <div className="flex">
        <span className="mr-1">{title}</span>
        {icon && icon}
      </div>
      <div className="my-4 h-px w-full bg-grey-dark" />
      <span className="block font-mono text-lg font-bold md:text-xl">
        {number}
      </span>
    </div>
  );
}
