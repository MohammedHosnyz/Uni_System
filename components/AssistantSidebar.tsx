'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

const MaterialIcon = ({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) => (
  <span
    className={`material-symbols-outlined text-[20px] leading-none ${className}`}
    aria-hidden="true"
  >
    {name}
  </span>
);

interface AssistantSidebarProps {
  userName: string;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userAvatarUrl?: string;
}

export default function AssistantSidebar({
  userName,
  onLogout,
  isCollapsed,
  onToggleCollapse,
  userAvatarUrl,
}: AssistantSidebarProps) {
  const pathname = usePathname();

  const assistantLinks = [
    { href: '/assistant/dashboard', label: 'لوحة التحكم', icon: 'space_dashboard' },
    { href: '/assistant/courses', label: 'المقررات', icon: 'menu_book' },
    { href: '/assistant/attendance', label: 'الحضور والغياب', icon: 'how_to_reg' },
    { href: '/assistant/assignments', label: 'الواجبات', icon: 'assignment' },
    { href: '/assistant/quizzes', label: 'الاختبارات', icon: 'quiz' },
    { href: '/assistant/grades', label: 'الدرجات', icon: 'grade' },
    { href: '/assistant/schedule', label: 'الجدول والمواعيد', icon: 'calendar_month' },
    { href: '/assistant/students', label: 'الطلاب', icon: 'group' },
    { href: '/assistant/materials', label: 'المواد التعليمية', icon: 'folder' },
    { href: '/assistant/announcements', label: 'الإعلانات', icon: 'campaign' },
    { href: '/assistant/reports', label: 'التقارير', icon: 'analytics' },
  ];

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-semibold relative group ${
      active
        ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] shadow-md'
        : 'text-[#1A1A1A] hover:bg-[#FAF7F2] hover:text-[#BB8E2C]'
    } ${isCollapsed ? 'justify-center hover:scale-110' : ''}`;

  const renderNavLink = (link: any, isActive: boolean) => (
    <Link key={link.href} href={link.href} className={navLinkClass(isActive)}>
      <div className="relative group/icon">
        <MaterialIcon
          name={link.icon}
          className={`${
            isActive ? 'text-[#121110]' : 'text-[#BB8E2C]'
          } ${isCollapsed ? 'text-[20px]' : 'text-[22px]'} transition-transform duration-200 group-hover:scale-125`}
        />

        {isCollapsed && (
          <div
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] text-lg font-extrabold rounded-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-2xl border-2 border-[#FCCC03] pointer-events-none z-[9999] min-w-[220px] text-center tooltip-slide"
            style={{
              filter: 'drop-shadow(0 10px 25px rgba(187, 142, 44, 0.5))',
            }}
          >
            <span className="text-shadow-lg tracking-wide">{link.label}</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-2px]">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#BB8E2C]"></div>
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FCCC03] rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FCCC03] rounded-br-lg"></div>
          </div>
        )}
      </div>
      {!isCollapsed && <span>{link.label}</span>}
    </Link>
  );

  return (
    <div
      className={`${cairo.className} sticky top-0 bg-white shadow-lg h-screen overflow-hidden flex flex-col z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-full'
      }`}
    >
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 4px 20px rgba(187, 142, 44, 0.4);
          }
          50% {
            box-shadow: 0 4px 35px rgba(187, 142, 44, 0.7), 0 0 50px rgba(187, 142, 44, 0.5);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .tooltip-slide {
          animation: slideInRight 0.3s ease-out;
        }

        .icon-glow:hover {
          animation: glow 1.5s ease-in-out infinite;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(252, 204, 3, 0.3);
        }

        .group:hover .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <button
        onClick={onToggleCollapse}
        className="absolute top-4 left-2 z-50 w-8 h-8 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] hover:from-[#D6AE45] hover:to-[#FCCC03] text-[#121110] rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
        title={isCollapsed ? 'إظهار القائمة' : 'إخفاء القائمة'}
      >
        <MaterialIcon
          name={isCollapsed ? 'chevron_right' : 'chevron_left'}
          className="text-[#121110] text-[18px] transition-transform duration-300"
        />
      </button>

      <div className="bg-gradient-to-b from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] p-6 overflow-hidden">
        {!isCollapsed && (
          <>
            <Link href="/assistant/dashboard" className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain rounded-full border-2 border-white bg-white p-1"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold truncate">جامعة أسيوط الأهلية</h1>
                <p className="text-xs text-[#121110]/80 truncate">كلية الحاسبات والمعلومات</p>
              </div>
            </Link>

            <div className="border-t border-[#121110]/20 pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-white">
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="صورة شخصية" className="w-full h-full object-cover" />
                  ) : (
                    <MaterialIcon name="person" className="text-[#BB8E2C] text-[32px]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{userName}</p>
                  <p className="text-xs text-[#121110]/80">معيد</p>
                </div>
              </div>
            </div>
          </>
        )}

        {isCollapsed && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <Link
              href="/assistant/dashboard"
              className="relative w-12 h-12 hover:scale-110 transition-transform duration-200 cursor-pointer"
              title="الذهاب للصفحة الرئيسية"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain rounded-full border-2 border-white bg-white p-1 hover:border-[#121110] transition-colors duration-200"
              />
            </Link>
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white">
              {userAvatarUrl ? (
                <img src={userAvatarUrl} alt="صورة شخصية" className="w-full h-full object-cover" />
              ) : (
                <MaterialIcon name="person" className="text-[#BB8E2C] text-[24px]" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-2">
          {assistantLinks.map((link) => {
            const isActive = pathname === link.href;
            return renderNavLink(link, isActive);
          })}

          <div className="border-t border-[#E8DFD3] my-4"></div>

          {renderNavLink(
            {
              href: '/assistant/profile',
              label: 'الملف الشخصي',
              icon: 'person',
            },
            pathname === '/assistant/profile'
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-[#E8DFD3]">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2 text-xs text-[#777] mb-3">
              <MaterialIcon name="mail" className="text-[#BB8E2C]" />
              <span>info@aun.edu.eg</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-semibold relative group ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="relative group/icon">
              <MaterialIcon
                name="logout"
                className="text-red-600 text-[22px] transition-transform duration-200 group-hover:scale-125"
              />

              {isCollapsed && (
                <div
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-lg font-extrabold rounded-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-2xl border-2 border-[#FFCC00] pointer-events-none z-[9999] min-w-[220px] text-center tooltip-slide"
                  style={{
                    filter: 'drop-shadow(0 10px 25px rgba(220, 38, 38, 0.5))',
                  }}
                >
                  <span className="text-shadow-lg tracking-wide">تسجيل الخروج</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-2px]">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-red-600"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FFCC00] rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FFCC00] rounded-br-lg"></div>
                </div>
              )}
            </div>
            {!isCollapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
