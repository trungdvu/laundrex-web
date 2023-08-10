import Icon from '@/components/icons/icon';
import Input from '@/components/inputs/input';
import { ENV } from '@/constants/constants';
import { fetcher } from '@/libs/fetcher';
import { ErrorData } from '@/utils/types';
import { capitalizeFirstLetter } from '@/utils/utils';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import doodle14 from '../../public/highlights/doodle-14.svg';
import Button from '../components/buttons/button';
import Layout from '../components/layouts/layout';
import Seo from '../components/seo/seo';

type SignInInputs = {
  email: string;
  password: string;
};

export default function SignIn({
  defaultValues,
}: {
  defaultValues: SignInInputs;
}) {
  const errorRef = useRef<HTMLSpanElement | null>(null);
  const [errorHeight, setErrorHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInInputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<SignInInputs> = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await fetcher('sign-in', { email, password });
      setLoading(false);

      if (response.ok) {
        router.push('admin/dashboard');
      } else {
        setError((response.data as ErrorData).message);
      }
    } catch (_: any) {
      setError(
        'Sorry, the server is busy. Please try again after some minutes.',
      );
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (errorRef.current) {
      setErrorHeight(errorRef.current.offsetHeight);
    }
  }, [error]);

  return (
    <Layout className="flex min-h-screen flex-col lg:min-h-fit">
      <Seo />
      <main className="w-full flex-1">
        <div className="mx-auto w-full max-w-md lg:max-w-[52rem]">
          <div className="mt-10 flex items-center justify-center lg:justify-start">
            <Icon className="h-10 w-auto" name="logo-l" />
          </div>
          <div className="mt-10 flex w-full flex-col gap-10 px-5 lg:flex-row lg:px-0">
            <form
              className="mx-auto w-full lg:w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4 className="text-center text-2xl lg:text-left">
                Login to Laundrex
              </h4>
              <Input
                wrapperClassName="mt-5"
                label="Email address"
                placeholder="username@example.com"
                type="email"
                {...register('email')}
              />
              <div className="relative mt-5">
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...register('password')}
                />
                <AnimatePresence>
                  {!!error && (
                    <motion.span
                      ref={errorRef}
                      className="absolute left-0 right-0 z-20 flex items-center rounded-sm border border-red-800 bg-red-300 bg-opacity-20 px-4 py-4 text-sm text-red-800"
                      initial={{ opacity: 0, translateY: 0 }}
                      animate={{ opacity: 1, translateY: 20 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {capitalizeFirstLetter(error)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ translateY: 0 }}
                animate={{ translateY: !!error ? errorHeight + 20 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className="mt-6 w-full"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  Sign in
                </Button>
                <h6 className="mt-10 text-center md:mt-12 lg:text-left">
                  New to Laundrex?{' '}
                  <Link
                    className="text-brand-main hover:underline"
                    href="/sign-up"
                  >
                    Sign up now
                  </Link>
                  .
                </h6>
                <footer className="mx-auto flex w-full max-w-md flex-col-reverse items-center justify-between gap-3 px-5 py-5 text-grey-main lg:mt-5 lg:max-w-[52rem] lg:items-start lg:px-0">
                  <span className="text-sm">
                    © {currentYear}, Laundrex, Inc. All rights reserved.
                  </span>
                </footer>
              </motion.div>
            </form>
            <div className="hidden aspect-square h-fit w-full flex-col items-center justify-center rounded-full bg-white lg:flex">
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
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps = () => {
  const isDev = process.env.ENVIRONMENT === ENV.DEV;

  if (isDev) {
    return {
      props: { email: 'admin@gmail.com', password: 'admin1234' },
    };
  }

  return {
    props: {
      defaultValues: { email: '', password: '' },
    },
  };
};
