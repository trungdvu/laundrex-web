import Container from '@/components/layouts/container/container';
import Seo from '@/components/seo/seo';

export default function Bookings() {
  return (
    <Container title="Bookings">
      <Seo />
      <main className="py-24">
        <div className="py-64">Bookings</div>
      </main>
    </Container>
  );
}
