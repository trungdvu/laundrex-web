import Layout from '../common/layout/layout';
import Seo from '../common/seo/seo';

export default function Home() {
  return (
    <Layout>
      <Seo />
      <main className="py-24">This is a fucking Laundry service</main>
    </Layout>
  );
}
