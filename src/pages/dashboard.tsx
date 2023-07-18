import Container from '@/components/layouts/container/container';
import Seo from '@/components/seo/seo';
import OrderCreation from '@/features/dashboard/order-creation';
import RecentBookings from '@/features/dashboard/recent-bookings';
import TotalCards from '@/features/dashboard/total-cards';

export default function Dashboard() {
  return (
    <Container title="Dashboard">
      {/* <Seo /> */}
      <div className="relative flex flex-col gap-4">
        <TotalCards />
        <RecentBookings />
        <div className="my-96 h-96 py-96">content 1</div>
        <div className="my-96 h-96 py-96">content 2</div>
        <div className="my-96 h-96 py-96">content 3</div>
        <div className="my-96 h-96 py-96">content 4</div>
        <div className="my-96 h-96 py-96">content 5</div>
        <div className="my-96 h-96 py-96">content 6</div>
      </div>
      {/* <div className="col-span-4">
        <OrderCreation />
      </div> */}
    </Container>
  );
}
