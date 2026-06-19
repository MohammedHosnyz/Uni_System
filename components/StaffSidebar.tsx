'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  BarChart3,
  Megaphone,
  FileText,
  HelpCircle,
  ClipboardCheck,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface StaffSidebarProps {
  userName: string;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userAvatarUrl?: string;
}

export default function StaffSidebar({
  userName,
  onLogout,
  isCollapsed,
  onToggleCollapse,
  userAvatarUrl,
}: StaffSidebarProps) {
  const pathname = usePathname();

  const staffLinks = [
    { href: '/staff/dashboard', label: 'نظرة عامة', icon: LayoutDashboard },
    { href: '/staff/students', label: 'إدارة الطلاب', icon: Users },
    { href: '/staff/registrations', label: 'إدارة التسجيل', icon: UserCheck },
    { href: '/staff/schedules', label: 'إدارة الجداول', icon: Calendar },
    { href: '/staff/payments', label: 'إدارة الدفعات', icon: CreditCard },
    { href: '/staff/reports', label: 'التقارير', icon: BarChart3 },
    { href: '/staff/announcements', label: 'الإعلانات', icon: Megaphone },
    { href: '/staff/documents', label: 'الوثائق والشهادات', icon: FileText },
    { href: '/staff/inquiries', label: 'الاستفسارات', icon: HelpCircle },
    { href: '/staff/attendance', label: 'الحضور والغياب', icon: ClipboardCheck },
  ];

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold relative group ${
      active
        ? 'bg-amber-50/60 text-[#D97706] shadow-sm shadow-amber-500/5'
        : 'text-[#78716C] hover:bg-amber-50/20 hover:text-[#D97706]'
    } ${isCollapsed ? 'justify-center' : ''}`;

  return (
    <div
      className={`${cairo.className} sticky top-0 bg-white border-l border-stone-150 h-screen overflow-hidden flex flex-col z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-full'
      }`}
    >
      {/* Top Header */}
      <div className="px-4 py-5 border-b border-stone-100 flex items-center justify-between min-h-[80px]">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-[#1C1917] leading-tight">جامعة أسيوط الأهلية</h1>
              <p className="text-[10px] text-stone-400 font-medium">كلية الحاسبات والمعلومات</p>
            </div>
          </div>
        ) : (
          <div className="relative w-8 h-8 mx-auto">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="text-stone-400 hover:text-[#D97706] p-1 rounded-lg transition-colors"
          title={isCollapsed ? 'إظهار القائمة' : 'إخفاء القائمة'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow p-3 overflow-y-auto space-y-1">
        <nav className="space-y-1">
          {staffLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={navLinkClass(isActive)}>
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#D97706]' : 'text-stone-400 group-hover:text-[#D97706]'} transition-colors`} />
                {!isCollapsed && <span>{link.label}</span>}
                
                {isCollapsed && (
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1C1917] text-white text-[11px] font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-md">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="border-t border-stone-100 my-3"></div>

          {/* Profile link */}
          <Link
            href="/staff/profile"
            className={navLinkClass(pathname === '/staff/profile')}
          >
            <User className={`h-5 w-5 shrink-0 ${pathname === '/staff/profile' ? 'text-[#D97706]' : 'text-stone-400'} transition-colors`} />
            {!isCollapsed && <span>الملف الشخصي</span>}
            
            {isCollapsed && (
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1C1917] text-white text-[11px] font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-md">
                الملف الشخصي
              </div>
            )}
          </Link>
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-stone-100 bg-white">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-all text-sm font-semibold relative group ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0 text-red-500 transition-colors" />
          {!isCollapsed && <span>تسجيل الخروج</span>}
          
          {isCollapsed && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-red-600 text-white text-[11px] font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-md">
              تسجيل الخروج
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
