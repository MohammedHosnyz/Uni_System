import { clearAuthData } from './authClient';
import { clearAuthCache } from '@/hooks/useAuth';

export function logout() {
  clearAuthCache();
  clearAuthData();

  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
