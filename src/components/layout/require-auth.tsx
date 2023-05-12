import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';
import { Loading } from '../buttons/loading.button';
import Seo from '../seo/seo';
import Layout from './layout';

type RequireAuthProps = {
  children?: any;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.replace('/sign-in');
    }
  }, [status]);

  if (status === 'authenticated') {
    return children;
  }

  return (
    <Layout header={null} footer={null}>
      <Seo />
      <main className="flex w-full items-center justify-center pt-20">
        <Loading className="h-8 w-8 animate-spin fill-brand" />
      </main>
    </Layout>
  );
}
