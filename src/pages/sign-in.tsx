import Image from 'next/image';
import Link from 'next/link';
import doodle14 from '../../public/highlights/doodle-14.svg';
import Button from '../components/buttons/button';
import Input from '../components/inputs/input';
import InputLabel from '../components/inputs/input-label';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import AuthFooter from '../features/auth/auth-footer';
import AuthHeader from '../features/auth/auth-header';

export default function SignIn() {
  return (
    <Layout
      header={<AuthHeader className="mx-auto max-w-3xl" />}
      footer={<AuthFooter className="mx-auto max-w-3xl" />}
    >
      <Seo />
      <main className="mx-auto max-w-3xl">
        <div className="flex w-full gap-8">
          <div className="w-full">
            <h4 className="text-2xl font-bold">Sign in</h4>
            <div className="mt-6 flex flex-col">
              <InputLabel>Email address</InputLabel>
              <Input
                placeholder="username@example.com"
                className="mt-2 w-full"
              />
            </div>
            <div className="mt-6 flex flex-col">
              <InputLabel>Password</InputLabel>
              <Input
                className="mt-2 w-full"
                placeholder="Enter your password"
              />
            </div>
            <Button className="mt-6 w-full">Sign in</Button>

            <div className="mt-2 flex items-center justify-between">
              <button className="flex items-center">
                <div className="relative h-4 w-4 border border-neutral-400">
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform bg-neutral-400" />
                </div>
                <span className="ml-2 text-sm font-medium text-neutral-400">
                  Remember me
                </span>
              </button>
              <button className="text-sm font-medium text-neutral-400">
                Need help?
              </button>
            </div>
          </div>
          <div className="bg-gradient-sign-in flex aspect-square w-full flex-col items-center justify-center">
            <div className="w-min text-3xl font-extrabold">
              <h2 className="text-left">THE</h2>
              <h1 className="text-5xl">LAUNDRY</h1>
              <h2 className="text-right">SERVICE</h2>
            </div>
            <Image className="mt-2" priority src={doodle14} alt="highlight" />
          </div>
        </div>

        <h6 className="mt-12 text-lg font-medium">
          New to Laundrex?
          <Link href="/sign-up" className="font-bold text-brand">
            {' Sign up now'}
          </Link>
          .
        </h6>
      </main>
    </Layout>
  );
}
