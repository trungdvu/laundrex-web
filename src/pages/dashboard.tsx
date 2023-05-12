import Container from '@/components/layout/container';
import { RequireAuth } from '@/components/layout/require-auth';
import Seo from '@/components/seo/seo';

export default function Dashboard() {
  return (
    <RequireAuth>
      <Container title="Dashboard">
        <Seo />
        <main className="py-24">
          <div className="py-64">Dashboard</div>
        </main>
      </Container>
    </RequireAuth>
  );
}
