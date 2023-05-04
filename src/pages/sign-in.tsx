import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import doodle14 from '../../public/highlights/doodle-14.svg';
import Button from '../components/buttons/button';
import Input from '../components/inputs/input';
import InputLabel from '../components/inputs/input-label';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import AuthFooter from '../features/auth/auth-footer';
import AuthHeader from '../features/auth/auth-header';
import { signIn } from 'next-auth/react';

type SignInInputs = {
  email: string;
  password: string;
  remember?: boolean;
};

const defaultValues: SignInInputs = {
  email: 'admin@gmail.com',
  password: '1234',
  remember: true,
};

export default function SignIn() {
  const { register, handleSubmit } = useForm<SignInInputs>({ defaultValues });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (!response?.ok) {
        setError(response?.error ?? '');
      }
    } catch (error) {
      setError('Something went wrong, please try again!');
    }
    setLoading(false);
  };

  return (
    <Layout
      header={<AuthHeader className="mx-auto max-w-3xl" />}
      footer={<AuthFooter className="mx-auto max-w-3xl" />}
    >
      <Seo />
      <main className="mx-auto max-w-3xl">
        <div className="flex w-full gap-8">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-xl font-bold">Sign in</h4>
            <div className="mt-5 flex flex-col">
              <InputLabel>Email address</InputLabel>
              <Input
                className="mt-2 w-full"
                placeholder="username@example.com"
                type="email"
                autoComplete="on"
                {...register('email')}
              />
            </div>
            <div className="mt-5 flex flex-col">
              <InputLabel>Password</InputLabel>
              <Input
                className="mt-2 w-full"
                placeholder="Enter your password"
                type="password"
                {...register('password')}
              />
            </div>
            {!!error && (
              <div className="mt-5 border border-orange-700 bg-orange-100 px-4 py-3 text-sm text-orange-700">
                {error}
              </div>
            )}
            <Button className="mt-5 w-full" type="submit" loading={loading}>
              Sign in
            </Button>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 cursor-pointer rounded-none border-2 border-neutral-400 bg-neutral-50 text-neutral-400 focus:outline-none focus:ring-0 "
                  id="remember"
                  type="checkbox"
                  {...register('email')}
                />
                <label
                  className="ml-2 cursor-pointer text-sm text-neutral-400"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <Link
                className="text-sm text-neutral-400 hover:underline"
                href="#help"
              >
                Need help?
              </Link>
            </div>
          </form>
          <div className="bg-gradient-sign-in flex aspect-square h-min w-full flex-col items-center justify-center">
            <div className="w-min text-3xl font-extrabold">
              <h2 className="text-left">THE</h2>
              <h1 className="text-5xl">LAUNDRY</h1>
              <h2 className="text-right">SERVICE</h2>
            </div>
            <Image
              className="mt-2 px-4"
              priority
              src={doodle14}
              alt="highlight"
            />
          </div>
        </div>

        <h6 className="mt-12 text-lg">
          New to Laundrex?{' '}
          <Link
            href="/sign-up"
            className="font-bold text-brand hover:underline"
          >
            Sign up now
          </Link>
          .
        </h6>
      </main>
    </Layout>
  );
}
