import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

export default function Home() {
  return (
    <Layout header={null} footer={null}>
      <Seo />
      <main className="py-24">This is a fucking Laundry service</main>
    </Layout>
  );
}
