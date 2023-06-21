import Container from '@/components/layouts/container/container';
import Seo from '@/components/seo/seo';

export default function Home() {
  return (
    <Container>
      <Seo />
      <main className="py-24">
        <div className="py-64">This is a fucking Laundry service</div>
      </main>
    </Container>
  );
}
