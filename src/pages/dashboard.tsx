import Container from '@/components/layouts/container/container';
import Seo from '@/components/seo/seo';
import OrderCreation from '@/features/dashboard/order-creation';
import RecentBookings from '@/features/dashboard/recent-bookings';
import TotalCards from '@/features/dashboard/total-cards';

export default function Dashboard() {
  return (
    <Container title="Dashboard">
      <Seo />
      <main className="grid grid-cols-12 gap-5 px-5">
        <div className="col-span-8 flex flex-col gap-5">
          <TotalCards />
          <RecentBookings />
        </div>
        <div className="col-span-4">
          <OrderCreation />
        </div>
      </main>
    </Container>
  );
}
