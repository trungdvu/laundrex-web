import Button from '@/components/buttons/button';
import Icon from '@/components/icons/icon';
import Layout from '@/components/layouts/layout';
import authService from '@/libs/auth-service';
import { withLaundrexApi } from '@/libs/laundrex-api';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

type Props = {
  success?: string;
};

export default function AccountConfirmation({ success }: Props) {
  const router = useRouter();

  const handleNext = () => {
    if (success) {
      router.push('/sign-up');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <Layout>
      <motion.div
        className="flex flex-col items-center justify-center gap-4 px-4 pt-10 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Icon name={success ? 'verify' : 'exclamation'} className="h-16 w-16" />
        <h1 className="px-8 text-xl font-bold ">
          {success
            ? 'Your account has been verified'
            : 'Couldn’t verify this account'}
        </h1>
        <p className="text-secondary">
          {success
            ? 'Thanks to this, we’ve been able to confirm you’re the one who has signed up for Laundrex.'
            : 'Looks like your request link has been expired or the link has been used.'}
        </p>
        <Button
          iconRight={
            <Icon className="rotate-180 transform" name="arrow-left" />
          }
          onClick={handleNext}
        >
          {success ? 'You’re all set' : 'Resend'}
        </Button>
      </motion.div>
    </Layout>
  );
}

export const getServerSideProps = withLaundrexApi(
  async (context: GetServerSidePropsContext) => {
    try {
      const [userId, token] = (context.query.slug as string[]) || [];
      const response = await authService.verifyToken(userId, token);

      return {
        props: { success: response.ok },
      };
    } catch (error) {
      return {
        props: { success: false },
      };
    }
  },
);
