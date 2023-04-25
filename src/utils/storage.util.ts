import { CurrentUser } from '@/contexts/auth/auth.context';

const CURRENT_USER_KEY = 'currentUser';

export const StorageUtil = Object.freeze({
  setCurrentUser(user: any) {
    if (typeof window !== undefined) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },
  getCurrentUser() {
    if (typeof window !== undefined) {
      return null;
    }
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? (JSON.parse(userStr) as CurrentUser) : null;
  },
});
