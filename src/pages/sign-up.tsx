import { HTTP_STATUS } from '@/constants/constant';
import { signUp } from '@/libs/auth.lib';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/buttons/button';
import Input from '../components/inputs/input';
import InputLabel from '../components/inputs/input-label';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import AuthFooter from '../features/auth/auth-footer';
import AuthHeader from '../features/auth/auth-header';

type SignUpInputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignUpInputs> = async ({ email, password }) => {
    setLoading(true);
    const { data, statusCode } = await signUp(email, password);
    if (statusCode === HTTP_STATUS.CREATED && data) {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        Router.replace('/');
      }
    }
    setLoading(false);
  };

  return (
    <Layout
      header={
        <AuthHeader
          className="mx-auto flex max-w-3xl justify-center"
          textBrandVisible={false}
        />
      }
      footer={
        <AuthFooter
          className="mx-auto flex max-w-xs justify-center"
          languageButtonVisible={false}
        />
      }
    >
      <Seo />
      <main className="mx-auto flex max-w-3xl flex-col items-center">
        <form
          className="mx-auto flex w-96 flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-2xl font-bold">Sign up for Laundrex</h4>
          <div className="mt-5 flex w-full flex-col">
            <InputLabel>Email address</InputLabel>
            <Input
              className="mt-2 w-full"
              placeholder="username@example.com"
              type="email"
              autoComplete="off"
              {...register('email')}
            />
          </div>
          <div className="mt-5 flex w-full flex-col">
            <InputLabel>Password</InputLabel>
            <Input
              className="mt-2 w-full"
              placeholder="Enter your password"
              type="password"
              {...register('password')}
            />
          </div>
          <Button className="mt-5 w-full" type="submit" loading={loading}>
            Sign up
          </Button>
        </form>
        <div className="mt-12 flex w-96 items-center gap-4">
          <div className="h-px w-full bg-neutral-300" />
          <span className="text-neutral-400">OR</span>
          <div className="h-px w-full bg-neutral-300" />
        </div>
        <h6 className="mt-12 text-lg">
          Already have an account?
          <Link
            href="/sign-in"
            className="font-bold text-brand hover:underline"
          >
            {' '}
            Sign in now
          </Link>
          .
        </h6>
      </main>
    </Layout>
  );
}
