import Button from '@/components/buttons/button';
import Layout from '@/components/layout/layout';
import Seo from '@/components/seo/seo';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.replace('/sign-in');
    }
  }, [status]);

  if (status === 'authenticated') {
    return (
      <Layout header={null} footer={null}>
        <Seo />
        <main className="py-24">This is a fucking Laundry service</main>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Layout>
    );
  }

  return (
    <Layout header={null} footer={null}>
      <Seo />
      <main className="py-24">Loading...</main>
    </Layout>
  );
}
