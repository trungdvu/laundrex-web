const CURRENT_USER_KEY = 'currentUser';

export function setCurrentUser(user: any) {
  if (typeof window !== undefined) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function getCurrentUser() {
  if (typeof window !== undefined) {
    return null;
  }
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}
