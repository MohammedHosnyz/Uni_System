'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';

const DASHBOARD_PREFIXES = [
  '/student',
  '/professor',
  '/admin',
  '/staff',
  '/assistant',
  '/login',
  '/finance',
];

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isDashboardRoute = DASHBOARD_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotButton />
    </div>
  );
}
