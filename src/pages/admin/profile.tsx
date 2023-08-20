import Avatar from '@/components/avatar';
import Button from '@/components/buttons/button';
import IconButton from '@/components/buttons/icon-button';
import DisplayName from '@/components/display-name';
import Icon from '@/components/icons/icon';
import Input from '@/components/inputs/input';
import Layout from '@/components/layouts/layout';
import { Loading } from '@/components/loadings/loading';
import useMe from '@/hooks/useMe';
import fileUploadService from '@/libs/file-upload-service';
import userService from '@/libs/user-service';
import { pageMotion } from '@/utils/motion';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type UpdateInputs = {
  name?: string;
};

export default function Profile() {
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const { user, isLoading, isError, mutate } = useMe();
  const [avatarFileUploading, setAvatarFileUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<UpdateInputs>({
    defaultValues: {
      name: user?.name,
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
        const updatedResponse = await userService.updateMe({ avatar: key });
        if (updatedResponse.ok) {
          await mutate();
          setAvatarFileUploading(false);
        }
      }
    } catch (error) {
      setAvatarFileUploading(false);
    }
  };

  const handleUpdate = async ({ name }: UpdateInputs) => {
    try {
      setSubmitting(true);
      const response = await userService.updateMe({ name });
      if (response.ok) {
        await mutate();
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name });
    }
  }, [user?.name]);

  return (
    <Layout footer={null} header={null}>
      <motion.main className="mx-auto max-w-xl" {...pageMotion}>
        {isLoading || isError ? (
          <Loading className="mx-auto mt-10" />
        ) : (
          <>
            <div className="flex items-center px-4 py-2.5">
              <IconButton className="mr-4" onClick={router.back}>
                <Icon className="h-5 w-5 text-main" name="arrow-left" />
              </IconButton>
              <DisplayName
                name={user?.name}
                email={user?.email}
                className="text-lg md:text-xl"
                supportTextClassName="hidden"
              />
            </div>
            <div className="relative">
              <div className="h-32 w-full bg-placeholder md:h-48"></div>
              <div className="absolute bottom-0 left-4 z-10 h-20 w-20 translate-y-1/2 overflow-hidden rounded-full bg-white p-0.5 md:h-32 md:w-32">
                <Avatar
                  className="h-full w-full"
                  textClassName="text-3xl"
                  url={user?.avatar}
                  email={user?.email}
                  name={user?.name}
                />
                <input
                  ref={avatarFileInputRef}
                  accept="image/*,image/heif,image/heic"
                  type="file"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  className={twMerge(
                    'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-black transition duration-fast active:bg-opacity-10 enabled:opacity-0 enabled:hover:bg-black enabled:hover:bg-opacity-5 enabled:hover:opacity-100',
                    avatarFileUploading && 'bg-black bg-opacity-20',
                  )}
                  type="button"
                  disabled={avatarFileUploading}
                  onClick={handleOpenAvatarFilePicker}
                >
                  {avatarFileUploading ? <Loading className="h-5 w-5" /> : null}
                </button>
              </div>
            </div>
            <div className="mt-14 px-4 md:mt-20">
              <DisplayName
                name={user?.name}
                email={user?.email}
                className="text-xl"
                supportTextClassName="text-base mt-0"
              />
              <span className="mt-2 flex items-center gap-1 text-secondary">
                <Icon className="h-5 w-5" name="calendar" />
                <span>Joined {dayjs(user?.createdAt).format('MMMM YYYY')}</span>
              </span>
            </div>
            <form
              className="mt-4 flex justify-between gap-4 px-4"
              onSubmit={handleSubmit(handleUpdate)}
            >
              <div className="flex w-full flex-col items-center gap-4">
                <Input
                  wrapperClassName="w-full"
                  label="Name"
                  placeholder="Your display name"
                  type="text"
                  {...register('name')}
                />
                <Input
                  wrapperClassName="w-full"
                  label="Email"
                  placeholder="username@example.com"
                  type="email"
                  disabled
                  value={user?.email}
                />
                <Button
                  className="text-base md:text-lg"
                  type="submit"
                  disabled={submitting}
                  loading={submitting}
                >
                  Update
                </Button>
              </div>
            </form>
          </>
        )}
      </motion.main>
    </Layout>
  );
}
