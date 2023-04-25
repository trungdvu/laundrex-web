import { fetcher } from '@/libs/fetcher.lib';
import { StorageUtil } from '@/utils/storage.util';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { HTTP_STATUS } from '../../constants/constant';

export type CurrentUser = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextValue = {
  currentUser: CurrentUser | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(() =>
    StorageUtil.getCurrentUser(),
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const { statusCode, data }: any = fetcher({
          url: '/auth/sign-in',
          method: 'POST',
          data: { email, password },
        });
        if (statusCode === HTTP_STATUS.OK) {
          StorageUtil.setCurrentUser(data);
          setCurrentUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const signUp = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const { statusCode } = await fetcher({
          url: '/auth/sign-up',
          method: 'POST',
          data: { email, password },
        });
        if (statusCode === HTTP_STATUS.CREATED) {
          const res: any = await signIn(email, password);
          const user = res.data;
          StorageUtil.setCurrentUser(user);
          setCurrentUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [signIn],
  );

  const signOut = useCallback(async (): Promise<void> => {}, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
