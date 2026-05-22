'use client';

import { useState, useEffect } from 'react';
import { Cairo } from 'next/font/google';
import StaffSidebar from './StaffSidebar';
import StaffHeaderTop from './StaffHeaderTop';
import StaffFooter from './StaffFooter';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface StaffLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatarUrl?: string;
}

export default function StaffLayout({ children, userName = 'أ. أحمد محمد', userAvatarUrl }: StaffLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('staffSidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('staffSidebarCollapsed');
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('staffSidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <div className={`${cairo.className} min-h-screen bg-[#F5EFE6] flex flex-col`} dir="rtl">
      <StaffHeaderTop onLogout={handleLogout} userName={userName} />
      
      <div className="flex flex-1">
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-16' : 'w-80'
          }`}
        >
          <StaffSidebar
            userName={userName}
            onLogout={handleLogout}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            userAvatarUrl={userAvatarUrl}
          />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>

      <StaffFooter />
    </div>
  );
}
