import authService from '@/libs/auth-service';
import { UserDetail } from '@/utils/types';
import useSWR from 'swr';

export default function useMe() {
  const { data, isLoading, error } = useSWR('/auth/me', authService.getMe);

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
