import authService from '@/libs/auth-service';
import { ApiResponse, UserDetail } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { KeyedMutator } from 'swr';

export default function useMe() {
  const { data, isLoading, error, mutate } = useSWR(
    '/auth/me',
    authService.getMe,
  );
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
    mutate,
  } as {
    user: UserDetail | undefined;
    isLoading: boolean;
    isError: boolean;
    mutate: KeyedMutator<ApiResponse>;
  };
}
