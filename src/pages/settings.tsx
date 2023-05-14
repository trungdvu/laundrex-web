import Container from '@/components/layout/container';
import Seo from '@/components/seo/seo';

export default function Settings() {
  return (
    <Container title="Settings">
      <Seo />
      <main className="py-24">
        <div className="py-64">Settings</div>
      </main>
    </Container>
  );
}
