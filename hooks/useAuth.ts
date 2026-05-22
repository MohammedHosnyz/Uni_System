import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, type AuthUser } from '@/lib/authClient';

interface UseAuthOptions {
  requiredRole?: string;
  redirectTo?: string;
}


let cachedUser: AuthUser | null = null;

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(cachedUser);
  const [loading, setLoading] = useState(cachedUser === null);

  useEffect(() => {
    if (cachedUser) {
      if (options.requiredRole && cachedUser.role !== options.requiredRole) {
        const roleRedirects: Record<string, string> = {
          admin: '/admin/dashboard',
          professor: '/professor/dashboard',
          assistant: '/assistant/dashboard',
          staff: '/staff/dashboard',
          student: '/student/dashboard',
        };
        router.replace(roleRedirects[cachedUser.role] || '/login');
        return;
      }
      setUser(cachedUser);
      setLoading(false);
      return;
    }

    const authed = isAuthenticated();

    if (!authed) {
      router.replace(options.redirectTo || '/login');
      return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace(options.redirectTo || '/login');
      return;
    }

    if (options.requiredRole && currentUser.role !== options.requiredRole) {
      const roleRedirects: Record<string, string> = {
        admin: '/admin/dashboard',
        professor: '/professor/dashboard',
        assistant: '/assistant/dashboard',
        staff: '/staff/dashboard',
        student: '/student/dashboard',
      };
      router.replace(roleRedirects[currentUser.role] || '/login');
      return;
    }

    cachedUser = currentUser;
    setUser(currentUser);
    setLoading(false);

  
  }, []);

  return { user, loading };
}


export function clearAuthCache() {
  cachedUser = null;
}
