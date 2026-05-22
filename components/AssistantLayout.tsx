'use client';

import { useState, useEffect } from 'react';
import { Cairo } from 'next/font/google';
import AssistantSidebar from './AssistantSidebar';
import AssistantHeaderTop from './AssistantHeaderTop';
import AssistantFooter from './AssistantFooter';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface AssistantLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatarUrl?: string;
}

export default function AssistantLayout({ children, userName = 'أ. محمد أحمد', userAvatarUrl }: AssistantLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('assistantSidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('assistantSidebarCollapsed');
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('assistantSidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <div className={`${cairo.className} min-h-screen bg-[#F5EFE6] flex flex-col`} dir="rtl">
      <AssistantHeaderTop onLogout={handleLogout} userName={userName} />
      
      <div className="flex flex-1">
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-16' : 'w-80'
          }`}
        >
          <AssistantSidebar
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

      <AssistantFooter />
    </div>
  );
}
