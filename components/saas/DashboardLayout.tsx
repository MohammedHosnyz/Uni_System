'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFAF6]">
      
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-[#E8DFD3] transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E8DFD3]">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center shadow-md">
                <MaterialIcon name="rocket_launch" className="text-[24px] text-white" />
              </div>
              <span className="text-xl font-bold text-[#121110]">FlowSaaS</span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center shadow-md mx-auto">
              <MaterialIcon name="rocket_launch" className="text-[24px] text-white" />
            </div>
          )}
        </div>

        
        <nav className="p-4 space-y-2">
          <SidebarItem icon="dashboard" label="Dashboard" href="/saas/dashboard" active sidebarOpen={sidebarOpen} />
          <SidebarItem icon="analytics" label="Analytics" href="/saas/analytics" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="folder" label="Projects" href="/saas/projects" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="group" label="Team" href="/saas/team" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="task" label="Tasks" href="/saas/tasks" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="calendar_month" label="Calendar" href="/saas/calendar" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="chat" label="Messages" href="/saas/messages" badge="3" sidebarOpen={sidebarOpen} />
          <SidebarItem icon="settings" label="Settings" href="/saas/settings" sidebarOpen={sidebarOpen} />
        </nav>

        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[#E8DFD3] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <MaterialIcon
            name={sidebarOpen ? 'chevron_left' : 'chevron_right'}
            className="text-[20px] text-[#BB8E2C]"
          />
        </button>
      </aside>

      
      <div
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        
        <header className="h-16 bg-white border-b border-[#E8DFD3] sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <MaterialIcon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#62615F]"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F6F2E6] border border-[#E8DFD3] rounded-xl text-[#121110] placeholder-[#62615F] focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]/20 focus:border-[#BB8E2C] transition-all"
                />
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              
              <button className="relative w-10 h-10 rounded-xl bg-[#F6F2E6] hover:bg-[#EEEDE4] border border-[#E8DFD3] flex items-center justify-center transition-all">
                <MaterialIcon name="notifications" className="text-[24px] text-[#121110]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F6F2E6] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center shadow-md">
                    <MaterialIcon name="person" className="text-[24px] text-white" />
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-bold text-[#121110]">Alex Morgan</div>
                    <div className="text-xs text-[#62615F]">Premium</div>
                  </div>
                  <MaterialIcon name="expand_more" className="text-[20px] text-[#62615F]" />
                </button>

                
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8DFD3] py-2 z-50">
                    <Link
                      href="/saas/profile"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#F6F2E6] transition-colors"
                    >
                      <MaterialIcon name="person" className="text-[20px] text-[#62615F]" />
                      <span className="text-sm font-medium text-[#121110]">Profile</span>
                    </Link>
                    <Link
                      href="/saas/settings"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#F6F2E6] transition-colors"
                    >
                      <MaterialIcon name="settings" className="text-[20px] text-[#62615F]" />
                      <span className="text-sm font-medium text-[#121110]">Settings</span>
                    </Link>
                    <Link
                      href="/saas/billing"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#F6F2E6] transition-colors"
                    >
                      <MaterialIcon name="credit_card" className="text-[20px] text-[#62615F]" />
                      <span className="text-sm font-medium text-[#121110]">Billing</span>
                    </Link>
                    <hr className="my-2 border-[#E8DFD3]" />
                    <Link
                      href="/saas"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#F6F2E6] transition-colors text-[#ef4444]"
                    >
                      <MaterialIcon name="logout" className="text-[20px]" />
                      <span className="text-sm font-medium">Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
  sidebarOpen: boolean;
}

function SidebarItem({ icon, label, href, active = false, badge, sidebarOpen }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
        active
          ? 'bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] shadow-md'
          : 'text-[#62615F] hover:bg-[#F6F2E6]'
      }`}
    >
      <MaterialIcon
        name={icon}
        className={`text-[24px] ${active ? 'text-[#121110]' : 'text-[#62615F] group-hover:text-[#BB8E2C]'}`}
      />
      {sidebarOpen && (
        <>
          <span className={`font-semibold text-sm ${active ? 'text-[#121110]' : ''}`}>{label}</span>
          {badge && (
            <span className="ml-auto bg-[#ef4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
      {!sidebarOpen && badge && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
