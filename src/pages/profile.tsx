import Button from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import Label from '@/components/inputs/label';
import Layout from '@/components/layouts/layout';
import { Loading } from '@/components/loadings/loading';
import Seo from '@/components/seo/seo';
import authService from '@/libs/auth-service';
import fileUploadService from '@/libs/file-upload-service';
import { withLaundrexApi } from '@/libs/laundrex-api';
import userService from '@/libs/user-service';
import { pageMotion } from '@/utils/motion';
import { UserDetail } from '@/utils/types';
import { getImageUrl } from '@/utils/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type ProfileProps = {
  user: UserDetail;
};

type UpdateInputs = {
  name?: string;
};

export default function Profile({ user: initialUser }: ProfileProps) {
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(initialUser);
  const [avatarFileUploading, setAvatarFileUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<UpdateInputs>({
    defaultValues: {
      name: user.name,
    },
  });

  const handleOpenAvatarFilePicker = () => {
    avatarFileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      setAvatarFileUploading(true);
      const response = await fileUploadService.getPresignedUrl({
        filename: file.name,
        folder: 'avatars',
      });
      if (response.ok) {
        const {
          data: { url, key },
        } = response;
        await fileUploadService.upload(url, file);
        const updatedMeResponse = await userService.updateMe({ avatar: key });
        if (updatedMeResponse.ok) {
          setUser(updatedMeResponse.data);
        }
      }
      setAvatarFileUploading(false);
    } catch (error) {
      setAvatarFileUploading(false);
    }
  };

  const handleUpdate = async ({ name }: UpdateInputs) => {
    try {
      setSubmitting(true);
      await userService.updateMe({ name });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Layout footer={null}>
      <Seo />
      <motion.main className="mx-auto max-w-4xl" {...pageMotion}>
        <button className="mt-5 text-brand" onClick={router.back}>
          Go back
        </button>
        <form
          className="flex justify-between gap-4"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="w-7/12">
            <div className="relative mt-4 flex w-full flex-col">
              <Label>Name</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Your display name"
                type="text"
                {...register('name')}
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
              <button
                type="button"
                className="absolute -right-2 top-1/2 mt-2 translate-x-full transform text-sm text-neutral-500 transition duration-fast hover:text-black"
              >
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
            <Button
              type="submit"
              className="mt-8 w-full"
              disabled={submitting}
              loading={submitting}
            >
              Update
            </Button>
          </div>
          <div className="mt-4">
            <input
              ref={avatarFileInputRef}
              accept="image/*,image/heif,image/heic"
              type="file"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Label className="text-base">Profile picture</Label>
            <div className="relative mt-2 h-48 w-48 overflow-hidden rounded-full bg-neutral-100">
              {user.avatar && (
                <Image
                  className="h-full w-full bg-cover"
                  priority
                  src={getImageUrl(user.avatar)}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="profile avatar"
                />
              )}
              <button
                className={classNames(
                  'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-black transition duration-fast active:bg-opacity-10 enabled:opacity-0 enabled:hover:bg-black enabled:hover:bg-opacity-5 enabled:hover:opacity-100',
                  {
                    'bg-black bg-opacity-20': avatarFileUploading,
                  },
                )}
                type="button"
                disabled={avatarFileUploading}
                onClick={handleOpenAvatarFilePicker}
              >
                {avatarFileUploading ? <Loading /> : null}
              </button>
            </div>
          </div>
        </form>
      </motion.main>
    </Layout>
  );
}

export const getServerSideProps = withLaundrexApi(async () => {
  try {
    const { data } = await authService.getMe();
    return {
      props: { user: data },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      },
    };
  }
});
