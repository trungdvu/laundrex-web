import { UilArrowGrowth, UilChartDown } from '@iconscout/react-unicons';

export default function TotalCards() {
  return (
    <div className="flex gap-4 px-4">
      <TotalCard
        title="Total Earning"
        number={'$34,775.00'}
        icon={<UilArrowGrowth />}
      />
      <TotalCard
        title="Total Spending"
        number={'$9,775.00'}
        icon={<UilChartDown />}
      />
      <TotalCard
        title="This Month"
        number={'$20,424.76'}
        icon={<UilArrowGrowth />}
      />
    </div>
  );
}

type TotalCardProps = {
  title: string;
  number: number | string;
  icon: React.ReactNode;
};

function TotalCard({ title, number, icon }: TotalCardProps) {
  return (
    <div className="w-full rounded-2xl bg-neutral-100 px-4 pb-5 pt-3">
      <div className="flex items-center font-bold">
        <span className="mr-1">{title}</span>
        {icon}
      </div>
      <div className="mb-4 mt-2 h-px w-full bg-neutral-400" />
      <span className="text-2xl">{number}</span>
    </div>
  );
}
