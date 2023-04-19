import Link from 'next/link';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

export default function SignIn() {
  return (
    <Layout header={null} footer={null}>
      <Seo />
      <main className="py-24">
        Sign up page
        <Link href="/sign-in">Go to sign in!</Link>
      </main>
    </Layout>
  );
}
