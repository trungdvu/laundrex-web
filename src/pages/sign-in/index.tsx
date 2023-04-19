import Link from 'next/link';
import Layout from '../../components/layout/layout';
import Seo from '../../components/seo/seo';
import Image from 'next/image';
import AuthHeader from '../../features/auth/auth-header';

export default function SignIn() {
  return (
    <Layout header={<AuthHeader />} footer={null}>
      <Seo />
      <main>
        <Link href="/sign-up">Go to sign up!</Link>
      </main>
    </Layout>
  );
}
