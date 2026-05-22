import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface DecodedToken {
  userId: number;
  roleId: number;
}

function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded) as DecodedToken;
  } catch {
    return null;
  }
}

/** Inject x-pathname so app/layout.tsx can conditionally hide public Header/Footer on dashboard routes */
function passThrough(request: NextRequest, pathname: string) {
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set('x-pathname', pathname);
  return NextResponse.next({ request: { headers: reqHeaders } });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPages = [
    '/',
    '/login',
    '/about',
    '/contact',
    '/departments',
    '/programs',
    '/faculty',
    '/admissions',
    '/news',
    '/careers',
    '/help',
    '/privacy',
    '/accessibility',
    '/sitemap',
    '/regulations',
    '/vision',
  ];

  const publicApiRoutes = ['/api/auth/login', '/api/auth/register', '/api/chatbot'];

  const isPublicPage = publicPages.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route));

  // Static assets — skip everything
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const tokenFromCookie = request.cookies.get('token')?.value;
  const tokenFromHeader = request.headers.get('authorization')?.replace('Bearer ', '');
  const token = tokenFromCookie || tokenFromHeader;

  // API routes
  if (pathname.startsWith('/api/')) {
    if (isPublicApi) {
      return NextResponse.next();
    }
    if (!token) {
      return NextResponse.json({ error: 'غير مصرح - يجب تسجيل الدخول' }, { status: 401 });
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'رمز غير صالح' }, { status: 401 });
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId.toString());
    requestHeaders.set('x-role-id', decoded.roleId.toString());
    requestHeaders.set('x-pathname', pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Public pages
  if (isPublicPage) {
    if (pathname === '/login' && token) {
      // Clear stale token on login page visit
      const response = passThrough(request, pathname);
      response.cookies.delete('token');
      return response;
    }
    return passThrough(request, pathname);
  }

  // Protected pages — require valid token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  const roleRoutes: { [key: number]: string[] } = {
    1: ['/admin'],
    2: ['/professor'],
    3: ['/assistant'],
    4: ['/student'],
    5: ['/staff'],
  };

  const allowedRoutes = roleRoutes[decoded.roleId] || [];
  const hasAccess = allowedRoutes.some(route => pathname.startsWith(route));

  if (!hasAccess) {
    const roleRedirects: { [key: number]: string } = {
      1: '/admin/dashboard',
      2: '/professor/dashboard',
      3: '/assistant/dashboard',
      4: '/student/dashboard',
      5: '/staff/dashboard',
    };
    return NextResponse.redirect(new URL(roleRedirects[decoded.roleId] || '/login', request.url));
  }

  return passThrough(request, pathname);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
};
