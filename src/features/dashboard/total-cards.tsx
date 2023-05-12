import { UilArrowGrowth, UilChartDown } from '@iconscout/react-unicons';

export default function TotalCards() {
  return (
    <div className="flex gap-5">
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
    <div className="w-full bg-neutral-100 p-8 font-medium">
      <div className="flex items-center text-neutral-500">
        <span className="mr-1">{title}</span>
        {icon}
      </div>
      <div className="my-3 h-px w-full bg-neutral-400" />
      <span className="text-2xl">{number}</span>
    </div>
  );
}
