import Container from '@/components/layout/container';
import { RequireAuth } from '@/components/layout/require-auth';
import Seo from '@/components/seo/seo';

export default function Home() {
  return (
    <RequireAuth>
      <Container>
        <Seo />
        <main className="py-24">
          <div className="py-64">This is a fucking Laundry service</div>
        </main>
      </Container>
    </RequireAuth>
  );
}
