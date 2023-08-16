import Icon from '@/components/icons/icon';
import Input from '@/components/inputs/input';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/buttons/button';
import Layout from '../components/layouts/layout';
import Seo from '../components/seo/seo';

type SignUpInputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignUpInputs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<SignUpInputs> = async ({ email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(() => r(true), 1000));
    setLoading(false);
  };

  return (
    <Layout>
      <Seo />
      <main className="mx-auto flex max-w-md flex-col px-5">
        <div className="mt-10 flex items-center justify-center">
          <Icon className="h-10 w-auto" name="logo-l" />
        </div>
        <h4 className="mt-10 text-center text-2xl">
          Create a Laundrex account
        </h4>
        <p className="mt-5 rounded-sm border border-yellow-100 border-opacity-30 bg-yellow-50 bg-opacity-30 py-2 text-center text-yellow-600">
          This feature is not available!
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            wrapperClassName="mt-5"
            className="w-full"
            label="Email address"
            type="email"
            placeholder="username@example.com"
            maxLength={180}
            {...register('email')}
          />
          <Input
            wrapperClassName="mt-5"
            label="Password"
            placeholder="Enter your password"
            type="password"
            autoComplete="off"
            {...register('password')}
          />
          <div className="w-full transition duration-200">
            <Button className="mt-6 w-full" type="submit" loading={loading}>
              Sign up
            </Button>
            <div className="mt-10 flex w-full items-center gap-4">
              <div className="h-px w-full bg-grey-dark" />
              <span className="text-grey-main">OR</span>
              <div className="h-px w-full bg-grey-dark" />
            </div>
            <h6 className="mt-10 text-center">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-brand-main hover:underline">
                Sign in now
              </Link>
              .
            </h6>
          </div>
        </form>
      </main>
    </Layout>
  );
}
