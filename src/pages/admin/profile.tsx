import Button from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import Layout from '@/components/layouts/layout';
import { Loading } from '@/components/loadings/loading';
import authService from '@/libs/auth-service';
import fileUploadService from '@/libs/file-upload-service';
import { withLaundrexApi } from '@/libs/laundrex-api';
import userService from '@/libs/user-service';
import { pageMotion } from '@/utils/motion';
import { UserDetail } from '@/utils/types';
import { getImageUrl } from '@/utils/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
    <Layout footer={null} header={null}>
      <motion.main className="mx-auto mt-20 max-w-3xl" {...pageMotion}>
        <button className="text-brand-normal" onClick={router.back}>
          Go back
        </button>
        <form
          className="flex justify-between gap-4"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="w-7/12">
            <Input
              wrapperClassName="mt-5"
              placeholder="Your display name"
              type="text"
              {...register('name')}
            />
            <Input
              wrapperClassName="mt-5"
              readOnly
              placeholder="username@example.com"
              type="email"
              value={user.email}
            />

            {/* <div className="relative mt-4 flex w-full flex-col">
              <Label>Role</Label>
              <Input
                readOnly
                className="mt-2 w-full"
                type="text"
                value={user.role?.name}
              />
              <span className="mt-2 text-sm text-secondary-normal">
                You can’t change your role
              </span>
            </div>
            <div className="relative mt-4 flex w-full flex-col">
              <Label>Phone</Label>
              <Input className="mt-2 w-full" readOnly type="tel" />
              <span className="mt-2 text-sm text-secondary-normal">
                To enable 2 factor authentication via SMS
              </span>
            </div> */}
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
            <label className="text-base">Profile picture</label>
            <div className="relative mt-2 h-48 w-48 overflow-hidden rounded-full bg-secondary-normal bg-opacity-10">
              {user.avatar && (
                <Image
                  className="h-full w-full"
                  priority
                  src={getImageUrl(user.avatar)}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="profile avatar"
                />
              )}
              <button
                className={twMerge(
                  'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-black transition duration-fast active:bg-opacity-10 enabled:opacity-0 enabled:hover:bg-black enabled:hover:bg-opacity-5 enabled:hover:opacity-100',
                  avatarFileUploading && 'bg-black bg-opacity-20',
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
