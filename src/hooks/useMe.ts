import authService from '@/libs/auth-service';
import { UserDetail } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useMe() {
  const { data, isLoading, error } = useSWR('/auth/me', authService.getMe);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.ok) {
      router.push('/sign-in');
    }
  }, [isLoading, data]);

  return {
    user: data?.data,
    isLoading: (!data && !error) || isLoading,
    isError: error,
  } as {
    user: UserDetail | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}
