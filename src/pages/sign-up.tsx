import { signUp } from '@/libs/auth.lib';
import { capitalizeFirstLetter } from '@/utils/helper.util';
import { pageMotion } from '@/utils/motion.util';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
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
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<SignUpInputs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<SignUpInputs> = async ({ email, password }) => {
    setLoading(true);
    const response = await signUp(email, password);
    if (response.ok && response.data) {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        Router.replace('/');
      }
    } else {
      const message = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
      setError(capitalizeFirstLetter(message));
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
      <motion.main
        className="mx-auto flex max-w-3xl flex-col items-center"
        {...pageMotion}
      >
        <form
          className="mx-auto flex w-96 flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-2xl font-bold">Sign up</h4>
          <div className="mt-8 flex w-full flex-col">
            <InputLabel>Email address</InputLabel>
            <Input
              className="mt-2 w-full"
              placeholder="username@example.com"
              type="email"
              autoComplete="off"
              {...register('email')}
            />
          </div>
          <div className="relative mt-4 flex w-full flex-col">
            <InputLabel>Password</InputLabel>
            <Input
              className="mt-2 w-full"
              placeholder="Enter your password"
              type="password"
              {...register('password')}
            />
            <AnimatePresence>
              {!!error && (
                <motion.div
                  className="absolute -bottom-4 left-0 right-0 z-20 flex h-10 items-center border border-orange-700 bg-orange-100 px-4 text-sm text-orange-700"
                  initial={{ opacity: 0, translateY: 0 }}
                  animate={{ opacity: 1, translateY: 40 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="truncate">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={classNames('w-full transition duration-200', {
              'translate-y-14': !!error,
              'transslate-y-0': !error,
            })}
          >
            <Button
              className="mt-4 w-full"
              type="submit"
              loading={loading}
              disabled={!isDirty || !isValid}
            >
              Sign up
            </Button>
            <div className="mt-12 flex w-96 items-center gap-4">
              <div className="h-px w-full bg-neutral-300" />
              <span className="text-neutral-400">OR</span>
              <div className="h-px w-full bg-neutral-300" />
            </div>
            <h6 className="mt-12 text-lg">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="font-bold text-brand hover:underline"
              >
                Sign in now
              </Link>
              .
            </h6>
          </div>
        </form>
      </motion.main>
    </Layout>
  );
}
