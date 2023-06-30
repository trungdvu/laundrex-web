import Button from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import Label from '@/components/inputs/label';
import Layout from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import authService from '@/libs/auth-service';
import { withLaundrexApi } from '@/libs/laundrex-api';
import { pageMotion } from '@/utils/motion';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

type ProfileProps = {
  user: any;
};

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };

  if (!user) {
    return null;
  }

  return (
    <Layout footer={null}>
      <Seo />
      <motion.main className="mx-auto max-w-4xl" {...pageMotion}>
        <button className="mt-5 text-brand" onClick={onGoBack}>
          Go back
        </button>

        <div className="flex justify-between gap-4">
          <div className="w-7/12">
            <div className="relative mt-4 flex w-full flex-col">
              <Label>Name</Label>
              <Input
                className="mt-2 w-full"
                readOnly
                placeholder="Your display name"
                type="text"
                value={user.name}
              />
            </div>
            <div className="relative mt-4 flex w-full flex-col">
              <Label>Email address</Label>
              <Input
                className="mt-2 w-full"
                readOnly
                placeholder="username@example.com"
                type="email"
                value={user.email}
              />
              <button className="absolute -right-2 top-1/2 mt-2 translate-x-full transform text-sm text-neutral-500 transition duration-75 hover:text-black">
                Modify
              </button>
            </div>

            <div className="relative mt-4 flex w-full flex-col">
              <Label>Role</Label>
              <Input
                readOnly
                className="mt-2 w-full"
                type="text"
                value={user.role?.name}
              />
              <span className="mt-2 text-neutral-500">
                You can’t change your role
              </span>
            </div>
            <div className="relative mt-4 flex w-full flex-col">
              <Label>Phone</Label>
              <Input className="mt-2 w-full" readOnly type="tel" />
              <span className="mt-2 text-neutral-500">
                To enable 2 factor authentication via SMS
              </span>
            </div>
            <Button className="mt-8 w-full">Update</Button>
          </div>
          <div className="mt-4">
            <Label className="text-base">Profile picture</Label>
            <div className="mt-2 h-48 w-48 rounded-full bg-neutral-100" />
          </div>
        </div>
      </motion.main>
    </Layout>
  );
}

export const getServerSideProps = withLaundrexApi(async () => {
  const { data: user } = await authService.getMe();

  return {
    props: { user },
  };
});
