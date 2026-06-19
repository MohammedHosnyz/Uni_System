'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Cairo } from 'next/font/google';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  LayoutDashboard,
  UserCheck,
  BookOpen,
  GraduationCap,
  FileQuestion,
  FileText,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  Settings,
  User,
  Shield,
  Award,
  Bus,
  Home,
  Contact,
  CreditCard,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    student: 'طالب',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    showMenu: 'إظهار القائمة',
    hideMenu: 'إخفاء القائمة',
    goHome: 'الذهاب للصفحة الرئيسية',
    links: [
      { href: '/student/dashboard',         label: 'الرئيسية',              icon: LayoutDashboard },
      { href: '/student/registration',      label: 'تسجيل المقررات',        icon: UserCheck },
      { href: '/student/courses',           label: 'مقرراتي الدراسية',      icon: BookOpen },
      { href: '/student/grades',            label: 'نتائجي الدراسية',       icon: GraduationCap },
      { href: '/student/quizzes',           label: 'الاختبارات',            icon: FileQuestion },
      { href: '/student/academic-record',   label: 'ملفي الأكاديمي',        icon: FileText },
      { href: '/student/schedule',          label: 'الجدول الأسبوعي',       icon: Calendar },
      { href: '/student/exams',             label: 'جداول الاختبارات',      icon: CalendarDays },
      { href: '/student/absence',           label: 'الحضور والانصراف',      icon: ClipboardCheck },
      { href: '/student/services',          label: 'الخدمات الإلكترونية',  icon: Settings },
      { href: '/student/academic-guidance', label: 'المرشد الأكاديمي',      icon: User },
      { href: '/student/military-status',   label: 'حالة التجنيد',          icon: Shield },
      { href: '/student/activities',        label: 'الأنشطة والفعاليات',    icon: Award },
      { href: '/student/bus',               label: 'مواصلات الجامعة',       icon: Bus },
      { href: '/student/housing',           label: 'السكن الجامعي',         icon: Home },
      { href: '/student/id-card',           label: 'بطاقة الطالب الجامعية', icon: Contact },
      { href: '/student/payments',          label: 'الرسوم والمدفوعات',     icon: CreditCard },
    ],
  },
  en: {
    student: 'Student',
    profile: 'My Profile',
    logout: 'Logout',
    showMenu: 'Show menu',
    hideMenu: 'Hide menu',
    goHome: 'Go to dashboard',
    links: [
      { href: '/student/dashboard',         label: 'Dashboard',           icon: LayoutDashboard },
      { href: '/student/registration',      label: 'Course Registration', icon: UserCheck },
      { href: '/student/courses',           label: 'My Courses',          icon: BookOpen },
      { href: '/student/grades',            label: 'My Grades',           icon: GraduationCap },
      { href: '/student/quizzes',           label: 'Quizzes',             icon: FileQuestion },
      { href: '/student/academic-record',   label: 'Academic Record',     icon: FileText },
      { href: '/student/schedule',          label: 'Weekly Schedule',     icon: Calendar },
      { href: '/student/exams',             label: 'Exam Schedules',      icon: CalendarDays },
      { href: '/student/absence',           label: 'Attendance',          icon: ClipboardCheck },
      { href: '/student/services',          label: 'E-Services',          icon: Settings },
      { href: '/student/academic-guidance', label: 'Academic Advisor',    icon: User },
      { href: '/student/military-status',   label: 'Military Status',     icon: Shield },
      { href: '/student/activities',        label: 'Activities & Events', icon: Award },
      { href: '/student/bus',               label: 'University Transport',icon: Bus },
      { href: '/student/housing',           label: 'University Housing',  icon: Home },
      { href: '/student/id-card',           label: 'Student ID Card',     icon: Contact },
      { href: '/student/payments',          label: 'Fees & Payments',     icon: CreditCard },
    ],
  },
} as const;

interface VerticalSidebarProps {
  userRole: 'admin' | 'student' | 'professor' | 'staff';
  userName: string;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userGender?: 'male' | 'female';
  userAvatarUrl?: string;
}

export default function VerticalSidebar({
  userRole,
  userName,
  onLogout,
  isCollapsed,
  onToggleCollapse,
  userGender,
  userAvatarUrl,
}: VerticalSidebarProps) {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const pathname = usePathname();
  const navScrollRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = activeItemRef.current;
    const container = navScrollRef.current;
    if (!el || !container) return;

    const elTop    = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const cTop     = container.scrollTop;
    const cBottom  = cTop + container.clientHeight;

    if (elTop < cTop || elBottom > cBottom) {
      container.scrollTo({
        top: elTop - container.clientHeight / 2 + el.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  const tx  = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const th  = dark ? darkTheme : theme;
  const bg  = dark ? darkTheme.surface     : theme.white;
  const bdr = dark ? darkTheme.border      : theme.border;
  const navHoverBg  = dark ? darkTheme.surfaceAlt : '#FAF7F2';
  const headerBg    = dark ? darkTheme.surfaceAlt : '#1C1917'; // Match Admin dark sidebar/header theme
  const headerText  = '#FFFFFF';
  const tooltipBg   = '#1C1917';
  const tooltipText = '#FFFFFF';
  const tooltipBdr  = '#3A3228';

  const avatar = userAvatarUrl ?? (userGender === 'female' ? '/default-avatar-female.png' : '/default-avatar.png');

  const navLinks = userRole === 'student'
    ? tx.links
    : [{ href: `/${userRole}/dashboard`, label: tx.links[0].label, icon: LayoutDashboard }];

  return (
    <div className={`${cairo.className} sticky top-0 h-screen overflow-hidden flex flex-col z-40 transition-all duration-300 ease-in-out shadow-md border-l ${isCollapsed ? 'w-16' : 'w-full'}`}
      style={{ background: bg, borderColor: bdr }}>

      <style>{`
        @keyframes tooltipSlide {
          from { opacity: 0; transform: translateY(-50%) translateX(-12px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        .tooltip-slide { animation: tooltipSlide 0.25s ease-out; }
      `}</style>

      {/* Collapse button */}
      <button
        onClick={onToggleCollapse}
        title={isCollapsed ? tx.showMenu : tx.hideMenu}
        className="absolute top-4 left-2 z-50 w-8 h-8 rounded-full flex items-center justify-center bg-[#FABA19] hover:bg-[#e5a816] text-[#1C1917] transition-all duration-200 shadow-md"
      >
        {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* User / Org Header Info */}
      <div className="overflow-hidden transition-all duration-300" style={{ background: headerBg }}>
        {!isCollapsed ? (
          <div className="p-5 pt-6">
            <Link href={`/${userRole}/dashboard`} className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src="/logo.png" alt="Logo" fill
                  className="object-contain rounded-full border border-white/20 p-0.5"
                  style={{ background: '#FFFDF8' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate text-white">
                  {locale === 'ar' ? 'جامعة أسيوط الأهلية' : 'Assiut National University'}
                </p>
                <p className="text-[10px] truncate text-stone-400 font-medium">
                  {locale === 'ar' ? 'كلية الحاسبات والمعلومات' : 'Faculty of Computers & Info'}
                </p>
              </div>
            </Link>
            <div className="border-t border-stone-800 pt-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-white">{userName}</p>
                  <p className="text-[10px] text-amber-500 font-bold">{tx.student}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pt-10 pb-4">
            <Link href={`/${userRole}/dashboard`} title={tx.goHome}
              className="relative w-10 h-10 hover:scale-115 transition-transform duration-200">
              <Image src="/logo.png" alt="Logo" fill
                className="object-contain rounded-full border border-white/20 p-0.5"
                style={{ background: '#FFFDF8' }} />
            </Link>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div ref={navScrollRef} className="flex-1 py-3 px-2 overflow-y-auto">
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const LinkIcon = link.icon;
            return (
              <Link key={link.href} href={link.href}
                ref={isActive ? activeItemRef : null}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-xs font-bold relative group ${isCollapsed ? 'justify-center' : ''}`}
                style={{
                  background: isActive ? 'rgba(250, 186, 25, 0.15)' : 'transparent',
                  color: isActive ? '#D97706' : '#78716C',
                }}
                onMouseEnter={e => { 
                  if (!isActive) { 
                    e.currentTarget.style.background = 'rgba(250, 186, 25, 0.05)'; 
                    e.currentTarget.style.color = '#D97706'; 
                  } 
                }}
                onMouseLeave={e => { 
                  if (!isActive) { 
                    e.currentTarget.style.background = 'transparent'; 
                    e.currentTarget.style.color = '#78716C'; 
                  } 
                }}
              >
                <div className="relative group/icon flex-shrink-0">
                  <LinkIcon
                    className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110`}
                    style={{ color: isActive ? '#D97706' : '#78716C' }}
                  />

                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-md pointer-events-none z-[9999] text-center tooltip-slide"
                      style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}` }}>
                      <span className="text-xs font-bold">{link.label}</span>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px]"
                          style={{ borderRightColor: tooltipBg }} />
                      </div>
                    </div>
                  )}
                </div>

                {!isCollapsed && <span className="truncate">{link.label}</span>}

                {isActive && !isCollapsed && (
                  <span className="ms-auto w-1 h-4 rounded-full bg-[#D97706] flex-shrink-0" />
                )}
              </Link>
            );
          })}

          <div className="my-2 mx-1 border-t border-stone-150" />

          {/* Profile link */}
          {(() => {
            const profileHref = `/${userRole}/profile`;
            const isActive = pathname === profileHref;
            return (
              <Link href={profileHref}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-xs font-bold relative group ${isCollapsed ? 'justify-center' : ''}`}
                style={{
                  background: isActive ? 'rgba(250, 186, 25, 0.15)' : 'transparent',
                  color: isActive ? '#D97706' : '#78716C',
                }}
                onMouseEnter={e => { 
                  if (!isActive) { 
                    e.currentTarget.style.background = 'rgba(250, 186, 25, 0.05)'; 
                    e.currentTarget.style.color = '#D97706'; 
                  } 
                }}
                onMouseLeave={e => { 
                  if (!isActive) { 
                    e.currentTarget.style.background = 'transparent'; 
                    e.currentTarget.style.color = '#78716C'; 
                  } 
                }}
              >
                <div className="relative group/icon flex-shrink-0">
                  <User className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" style={{ color: isActive ? '#D97706' : '#78716C' }} />
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-md pointer-events-none z-[9999] text-center tooltip-slide"
                      style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}` }}>
                      <span className="text-xs font-bold">{tx.profile}</span>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px]"
                          style={{ borderRightColor: tooltipBg }} />
                      </div>
                    </div>
                  )}
                </div>
                {!isCollapsed && <span>{tx.profile}</span>}
              </Link>
            );
          })()}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-stone-150" style={{ background: bg }}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-[10px] mb-2 px-1 text-stone-500 font-bold">
            <Mail className="h-3.5 w-3.5 text-[#D97706]" />
            <span>info@aun.edu.eg</span>
          </div>
        )}

        <button onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-xs font-bold group relative ${isCollapsed ? 'justify-center' : ''}`}
          style={{ color: '#D97706' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(250, 186, 25, 0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="relative group/icon flex-shrink-0">
            <LogOut className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" style={{ color: '#D97706' }} />
            {isCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-md pointer-events-none z-[9999] text-center tooltip-slide"
                style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}` }}>
                <span className="text-xs font-bold">{tx.logout}</span>
                <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px]"
                    style={{ borderRightColor: tooltipBg }} />
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && <span>{tx.logout}</span>}
        </button>
      </div>
    </div>
  );
}
