import Icon from '@/components/icons/icon';
import Input from '@/components/inputs/input';
import { SignUpStep } from '@/features/auth/auth.type';
import authService from '@/libs/auth-service';
import { ErrorData } from '@/utils/types';
import { capitalizeFirstLetter } from '@/utils/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/buttons/button';
import Layout from '../components/layouts/layout';
import Seo from '../components/seo/seo';

type SignUpInputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const errorRef = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState<SignUpStep>('one');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorResend, setErrorResend] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState, getValues } =
    useForm<SignUpInputs>();
  const [errorHeight, setErrorHeight] = useState(0);

  const onSubmit: SubmitHandler<SignUpInputs> = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await authService.signUp(email, password);
      setLoading(false);

      if (response.ok) {
        setStep('two');
      } else {
        setError((response.data as ErrorData).message);
      }
    } catch (_) {
      setError(
        'Sorry, the server is busy. Please try again after some minutes.',
      );
      setLoading(false);
    }
  };

  const handleContinueWithoutVerify = async () => {
    const { email, password } = getValues();
    setLoading(true);
    await new Promise((r) => setTimeout(() => r(true), 3000));
    setLoading(false);
  };

  const handleResend = async () => {
    try {
      const { email } = getValues();
      setResending(true);
      const response = await authService.resendVerifyToken(email);
      if (!response.ok) {
        setError((response.data as ErrorData).message);
      }
      setResending(false);
    } catch (error) {
      setError(
        'Sorry, the server is busy. Please try again after some minutes',
      );
      setResending(false);
    }
  };

  useEffect(() => {
    if (errorRef.current) {
      setErrorHeight(errorRef.current.offsetHeight);
    }
  }, [error]);

  return (
    <Layout>
      <Seo />
      <main className="mx-auto flex max-w-md flex-col px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === 'one' ? (
              <>
                <div className="mt-10 flex items-center justify-center">
                  <Icon className="h-10 w-auto" name="logo-l" />
                </div>
                <h4 className="mt-10 text-center text-2xl">
                  Create a Laundrex account
                </h4>
                <form
                  className="relative w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                  <AnimatePresence>
                    {!!error && (
                      <motion.span
                        className="absolute left-0 right-0 z-20 flex items-center rounded-sm border border-red-800 bg-red-300 bg-opacity-20 px-4 py-4 text-sm text-red-800"
                        ref={errorRef}
                        initial={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {capitalizeFirstLetter(error)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.div
                    className="w-full"
                    initial={{ translateY: 0 }}
                    animate={{ translateY: !!error ? errorHeight + 20 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      className="mt-6 w-full"
                      type="submit"
                      loading={loading}
                    >
                      Sign up
                    </Button>
                    <div className="mt-10 flex w-full items-center gap-4">
                      <div className="h-px w-full bg-grey-dark" />
                      <span className="text-grey-main">OR</span>
                      <div className="h-px w-full bg-grey-dark" />
                    </div>
                    <h6 className="mt-10 text-center">
                      Already have an account?{' '}
                      <Link
                        href="/sign-in"
                        className="text-brand-main hover:underline"
                      >
                        Sign in now
                      </Link>
                      .
                    </h6>
                  </motion.div>
                </form>
              </>
            ) : (
              <div className="shadow-popper relative mt-16 flex flex-col items-center justify-center gap-4 rounded-lg p-3 text-center text-sm text-grey-main">
                <Icon
                  className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-grey-light"
                  name="letter"
                />
                <h2 className="mt-6 text-base font-bold text-grey-light">
                  Please confirm your email
                </h2>
                <p className="text-grey-light">
                  Your’e almost there! We sent an email to verify your account.
                </p>
                <p>
                  Just click on the link in that email to complete you sign up.
                  If your don’t see it you may need to <b>check your spam</b>{' '}
                  folder.
                </p>
                <p>Still can’t find the email?</p>
                <button
                  className="hover:box-bg-hover rounded-full border border-grey-dark p-3"
                  onClick={handleResend}
                >
                  {resending ? 'Resending...' : 'Resend'}
                </button>
                <p>OR</p>
                <Link
                  href="/sign-in"
                  className="pb-3 underline hover:text-grey-light"
                >
                  Login without verifying my account
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </Layout>
  );
}
