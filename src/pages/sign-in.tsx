import { fetcher } from '@/libs/fetcher';
import { pageMotion } from '@/utils/motion';
import { ErrorData } from '@/utils/types';
import { capitalizeFirstLetter } from '@/utils/utils';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import doodle14 from '../../public/highlights/doodle-14.svg';
import Button from '../components/buttons/button';
import Input from '../components/inputs/input';
import Label from '../components/inputs/label';
import Layout from '../components/layouts/layout';
import Seo from '../components/seo/seo';
import AuthFooter from '../features/auth/auth-footer';
import AuthHeader from '../features/auth/auth-header';

type SignInInputs = {
  email: string;
  password: string;
};

const DEFAULT_VALUES: SignInInputs =
  process.env.ENVIRONMENT === 'development'
    ? {
        email: 'admin@gmail.com',
        password: '1234',
      }
    : {
        email: '',
        password: '',
      };

export default function SignIn() {
  const { register, handleSubmit } = useForm<SignInInputs>({
    defaultValues: DEFAULT_VALUES,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInInputs> = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await fetcher('sign-in', { email, password });
      setLoading(false);
      if (response.ok) {
        router.replace('/dashboard');
      } else {
        setError((response.data as ErrorData).message);
      }
    } catch (error: any) {
      setError(
        'Sorry, the server is busy. Please try again after some minutes.',
      );
      setLoading(false);
    }
  };

  return (
    <Layout
      header={<AuthHeader className="mx-auto max-w-4xl" />}
      footer={<AuthFooter className="mx-auto max-w-4xl" />}
    >
      <Seo />
      <motion.main className="mx-auto max-w-4xl" {...pageMotion}>
        <div className="flex w-full gap-10">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-3xl font-bold">Sign in</h4>
            <div className="mt-6 flex flex-col-reverse">
              <Input
                className="peer mt-2 w-full"
                placeholder="username@example.com"
                type="email"
                {...register('email')}
              />
              <Label className="transition duration-main peer-focus:text-brand-main">
                Email address
              </Label>
            </div>
            <div className="relative mt-4 flex flex-col-reverse">
              <Input
                className="peer mt-2 w-full"
                placeholder="Enter your password"
                type="password"
                {...register('password')}
              />
              <Label className="transition duration-main peer-focus:text-brand-main">
                Password
              </Label>
              <AnimatePresence>
                {!!error && (
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 z-20 flex h-10 items-center rounded-sm border border-red-800 bg-red-300 bg-opacity-20 px-4 text-sm text-red-800"
                    initial={{ opacity: 0, translateY: 0 }}
                    animate={{ opacity: 1, translateY: 40 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="truncate">
                      {capitalizeFirstLetter(error)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className={classNames('transition duration-200', {
                'translate-y-14': !!error,
                'transslate-y-0': !error,
              })}
            >
              <Button className="mt-6 w-full" type="submit" loading={loading}>
                Sign in
              </Button>
              <div className="mt-2.5 flex items-center justify-end">
                <Link
                  className="text-sm text-grey-main hover:underline"
                  href="/help"
                >
                  Need help?
                </Link>
              </div>
              <h6 className="mt-12">
                New to Laundrex?{' '}
                <Link
                  href="/sign-up"
                  className="font-bold text-brand-main hover:underline"
                >
                  Sign up now
                </Link>
                .
              </h6>
            </div>
          </form>
          <div className="flex h-[24.25rem] w-full flex-col items-center justify-center rounded-sm bg-white">
            <div className="w-min text-3xl font-bold text-grey-darker">
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
      </motion.main>
    </Layout>
  );
}
