'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Cairo } from 'next/font/google';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const MI = ({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} style={style} aria-hidden="true">{name}</span>
);


const i18n = {
  ar: {
    student: 'طالب',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    showMenu: 'إظهار القائمة',
    hideMenu: 'إخفاء القائمة',
    goHome: 'الذهاب للصفحة الرئيسية',
    links: [
      { href: '/student/dashboard',         label: 'الرئيسية',              icon: 'space_dashboard' },
      { href: '/student/registration',      label: 'تسجيل المقررات',        icon: 'how_to_reg' },
      { href: '/student/courses',           label: 'مقرراتي الدراسية',      icon: 'menu_book' },
      { href: '/student/grades',            label: 'نتائجي الدراسية',       icon: 'grade' },
      { href: '/student/quizzes',           label: 'الاختبارات',            icon: 'quiz' },
      { href: '/student/academic-record',   label: 'ملفي الأكاديمي',        icon: 'description' },
      { href: '/student/schedule',          label: 'الجدول الأسبوعي',       icon: 'calendar_month' },
      { href: '/student/exams',             label: 'جداول الاختبارات',      icon: 'event_note' },
      { href: '/student/absence',           label: 'الحضور والانصراف',      icon: 'fact_check' },
      { href: '/student/services',          label: 'الخدمات الإلكترونية',  icon: 'handyman' },
      { href: '/student/academic-guidance', label: 'المرشد الأكاديمي',      icon: 'school' },
      { href: '/student/military-status',   label: 'حالة التجنيد',          icon: 'verified_user' },
      { href: '/student/activities',        label: 'الأنشطة والفعاليات',    icon: 'emoji_events' },
      { href: '/student/bus',               label: 'مواصلات الجامعة',       icon: 'directions_bus' },
      { href: '/student/housing',           label: 'السكن الجامعي',         icon: 'apartment' },
      { href: '/student/id-card',           label: 'بطاقة الطالب الجامعية', icon: 'badge' },
      { href: '/student/payments',          label: 'الرسوم والمدفوعات',     icon: 'payments' },
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
      { href: '/student/dashboard',         label: 'Dashboard',           icon: 'space_dashboard' },
      { href: '/student/registration',      label: 'Course Registration', icon: 'how_to_reg' },
      { href: '/student/courses',           label: 'My Courses',          icon: 'menu_book' },
      { href: '/student/grades',            label: 'My Grades',           icon: 'grade' },
      { href: '/student/quizzes',           label: 'Quizzes',             icon: 'quiz' },
      { href: '/student/academic-record',   label: 'Academic Record',     icon: 'description' },
      { href: '/student/schedule',          label: 'Weekly Schedule',     icon: 'calendar_month' },
      { href: '/student/exams',             label: 'Exam Schedules',      icon: 'event_note' },
      { href: '/student/absence',           label: 'Attendance',          icon: 'fact_check' },
      { href: '/student/services',          label: 'E-Services',          icon: 'handyman' },
      { href: '/student/academic-guidance', label: 'Academic Advisor',    icon: 'school' },
      { href: '/student/military-status',   label: 'Military Status',     icon: 'verified_user' },
      { href: '/student/activities',        label: 'Activities & Events', icon: 'emoji_events' },
      { href: '/student/bus',               label: 'University Transport',icon: 'directions_bus' },
      { href: '/student/housing',           label: 'University Housing',  icon: 'apartment' },
      { href: '/student/id-card',           label: 'Student ID Card',     icon: 'badge' },
      { href: '/student/payments',          label: 'Fees & Payments',     icon: 'payments' },
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
  const headerBg    = dark ? darkTheme.surfaceAlt : theme.primary;
  const headerText  = dark ? darkTheme.text       : theme.text;
  const tooltipBg   = dark ? darkTheme.surface    : theme.primary;
  const tooltipText = dark ? darkTheme.text       : theme.text;
  const tooltipBdr  = dark ? darkTheme.border     : theme.white;

  const avatar = userAvatarUrl ?? (userGender === 'female' ? '/default-avatar-female.png' : '/default-avatar.png');

  const navLinks = userRole === 'student'
    ? tx.links
    : [{ href: `/${userRole}/dashboard`, label: tx.links[0].label, icon: 'space_dashboard' }];

  return (
    <div className={`${cairo.className} sticky top-0 h-screen overflow-hidden flex flex-col z-40 transition-all duration-300 ease-in-out shadow-lg ${isCollapsed ? 'w-16' : 'w-full'}`}
      style={{ background: bg }}>

      <style>{`
        @keyframes tooltipSlide {
          from { opacity: 0; transform: translateY(-50%) translateX(-12px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        .tooltip-slide { animation: tooltipSlide 0.25s ease-out; }
        .text-shadow-gold {
          text-shadow: 0 2px 4px rgba(0,0,0,0.4), 0 0 16px rgba(255,204,0,0.25);
        }
      `}</style>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0" />

      {}
      <button
        onClick={onToggleCollapse}
        title={isCollapsed ? tx.showMenu : tx.hideMenu}
        className="absolute top-4 left-2 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:opacity-80"
        style={{ background: th.primary, color: headerText }}>
        <MI name={isCollapsed ? 'chevron_right' : 'chevron_left'} className="text-[18px]" />
      </button>

      {}
      <div className="overflow-hidden transition-all duration-300" style={{ background: headerBg }}>
        {!isCollapsed ? (
          <div className="p-5 pt-6">
            <Link href={`/${userRole}/dashboard`} className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src="/logo.png" alt="Logo" fill
                  className="object-contain rounded-full border-2 border-white p-1"
                  style={{ background: '#FFFDF8' }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: headerText }}>
                  {locale === 'ar' ? 'جامعة أسيوط الأهلية' : 'Assiut National University'}
                </p>
                <p className="text-xs truncate" style={{ color: headerText, opacity: 0.75 }}>
                  {locale === 'ar' ? 'كلية الحاسبات والمعلومات' : 'Faculty of Computers & Info'}
                </p>
              </div>
            </Link>
            <div className="border-t pt-3" style={{ borderColor: dark ? darkTheme.border : `${theme.text}25` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/40">
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: headerText }}>{userName}</p>
                  <p className="text-xs" style={{ color: headerText, opacity: 0.75 }}>{tx.student}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pt-10 pb-4">
            <Link href={`/${userRole}/dashboard`} title={tx.goHome}
              className="relative w-10 h-10 hover:scale-110 transition-transform duration-200">
              <Image src="/logo.png" alt="Logo" fill
                className="object-contain rounded-full border-2 border-white p-0.5"
                style={{ background: '#FFFDF8' }} />
            </Link>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/40">
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {}
      <div ref={navScrollRef} className="flex-1 py-3 px-2 overflow-y-auto">
        <nav className="space-y-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                ref={isActive ? activeItemRef : null}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold relative group ${isCollapsed ? 'justify-center' : ''}`}
                style={{
                  background: isActive ? th.primary : 'transparent',
                  color: isActive ? headerText : th.text,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = navHoverBg; e.currentTarget.style.color = th.primary; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = th.text; } }}>

                {}
                <div className="relative group/icon flex-shrink-0">
                  <MI name={link.icon}
                    className={`transition-transform duration-200 group-hover:scale-110 ${isCollapsed ? 'text-[22px]' : 'text-[20px]'}`}
                    style={{ color: isActive ? headerText : th.primary } as React.CSSProperties} />

                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-2xl pointer-events-none z-[9999] min-w-[180px] text-center tooltip-slide"
                      style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}`, filter: 'drop-shadow(0 8px 20px rgba(187,142,44,0.35))' }}>
                      <span className="text-sm font-extrabold text-shadow-gold">{link.label}</span>
                      {}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px]"
                          style={{ borderRightColor: tooltipBg }} />
                      </div>
                    </div>
                  )}
                </div>

                {!isCollapsed && <span className="truncate">{link.label}</span>}

                {}
                {isActive && !isCollapsed && (
                  <span className="ms-auto w-1 h-5 rounded-full flex-shrink-0" style={{ background: `${headerText}80` }} />
                )}
              </Link>
            );
          })}

          {}
          <div className="my-3 mx-1 border-t" style={{ borderColor: bdr }} />

          {(() => {
            const profileHref = `/${userRole}/profile`;
            const isActive = pathname === profileHref;
            return (
              <Link href={profileHref}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold relative group ${isCollapsed ? 'justify-center' : ''}`}
                style={{ background: isActive ? th.primary : 'transparent', color: isActive ? headerText : th.text }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = navHoverBg; e.currentTarget.style.color = th.primary; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = th.text; } }}>
                <div className="relative group/icon flex-shrink-0">
                  <MI name="person" className="text-[20px] transition-transform duration-200 group-hover:scale-110"
                    style={{ color: isActive ? headerText : th.primary } as React.CSSProperties} />
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-2xl pointer-events-none z-[9999] min-w-[180px] text-center tooltip-slide"
                      style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}`, filter: 'drop-shadow(0 8px 20px rgba(187,142,44,0.35))' }}>
                      <span className="text-sm font-extrabold text-shadow-gold">{tx.profile}</span>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px]"
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

      {}
      <div className="p-3 border-t" style={{ borderColor: bdr }}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-xs mb-2 px-1" style={{ color: th.textMuted }}>
            <MI name="mail" className="text-[16px]" style={{ color: th.primary } as React.CSSProperties} />
            <span>info@aun.edu.eg</span>
          </div>
        )}

        <button onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold group relative ${isCollapsed ? 'justify-center' : ''}`}
          style={{ color: th.primary }}
          onMouseEnter={e => (e.currentTarget.style.background = navHoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <div className="relative group/icon flex-shrink-0">
            <MI name="logout" className="text-[22px] transition-transform duration-200 group-hover:scale-110"
              style={{ color: th.primary } as React.CSSProperties} />
            {isCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 delay-75 whitespace-nowrap shadow-2xl pointer-events-none z-[9999] min-w-[180px] text-center tooltip-slide"
                style={{ background: tooltipBg, color: tooltipText, border: `1px solid ${tooltipBdr}`, filter: 'drop-shadow(0 8px 20px rgba(187,142,44,0.35))' }}>
                <span className="text-sm font-extrabold text-shadow-gold">{tx.logout}</span>
                <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px]"
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
