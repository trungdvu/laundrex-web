import Button from '@/components/buttons/button';
import { UilPlus } from '@iconscout/react-unicons';

export default function OrderCreation() {
  return (
    <div className="bg-brand p-8">
      <Button className="min-h-fit w-full" iconLeft={<UilPlus />}>
        <span>Create a order</span>
      </Button>
    </div>
  );
}
