import Container from '@/components/layout/container';
import Layout from '@/components/layout/layout';
import Seo from '@/components/seo/seo';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Settings() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.replace('/sign-in');
    }
  }, [status]);

  if (status === 'authenticated') {
    return (
      <Container title="Settings">
        <Seo />
        <main className="py-24">
          <div className="py-64">Settings</div>
        </main>
      </Container>
    );
  }

  return (
    <Layout header={null} footer={null}>
      <Seo />
      <main className="py-24">Loading...</main>
    </Layout>
  );
}
