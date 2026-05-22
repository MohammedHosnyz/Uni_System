import { safeLocalStorage } from './safeLocalStorage';

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  studentNumber?: string;
  currentLevel?: number;
  programName?: string;
  departmentName?: string;
  facultyName?: string;
  gpa?: string;
  gender?: 'male' | 'female';
  avatarUrl?: string;
  section?: string;
}


export function getToken(): string | null {
  
  const lsToken = safeLocalStorage.getItem('token');
  if (lsToken) return lsToken;

  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
    if (tokenCookie) return tokenCookie.split('=')[1].trim();
  }

  return null;
}

export function getCurrentUser(): AuthUser | null {
  const userStr = safeLocalStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as AuthUser;
  } catch {
    return null;
  }
}
export function isAuthenticated(): boolean {
  const token = getToken();
  const user = getCurrentUser();
  return !!(token && user);
}

export function hasRole(role: string): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}
export function setAuthData(token: string, user: AuthUser): void {
  safeLocalStorage.setItem('token', token);
  safeLocalStorage.setItem('user', JSON.stringify(user));

  if (typeof document !== 'undefined') {
    const maxAge = 7 * 24 * 60 * 60; 
    const isProduction = window.location.protocol === 'https:';
    const secureFlag = isProduction ? '; Secure' : '';
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
  }
}


 
 
export function clearAuthData(): void {
  safeLocalStorage.removeItem('token');
  safeLocalStorage.removeItem('user');
  
  if (typeof document !== 'undefined') {
    
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
    
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  }
}
