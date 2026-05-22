'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { H as lightH, darkH, type HeaderTokens } from '@/lib/theme';
import { Separator } from '@/components/ui/separator';
import VerticalSidebar from '@/components/VerticalSidebar';
import { logout } from '@/lib/logout';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    firstName: string;
    lastName: string;
    email?: string;
    role?: string;
    gender?: 'male' | 'female';
    avatarUrl?: string;
  };
  role: 'admin' | 'student' | 'professor' | 'staff';
}

const i18n = {
  ar: {
    email: 'info@aun.edu.eg',
    phone: '088-2411111',
    followUs: 'تابعنا:',
    universityName: 'جامعة أسيوط الأهلية',
    facultyName: 'كلية الحاسبات والمعلومات',
    logout: 'تسجيل الخروج',
    welcome: 'مرحباً',
    subNav: [
      { href: '/student/registration', label: 'تسجيل المقررات' },
      { href: '/student/grades',       label: 'النتائج' },
      { href: '/student/schedule',     label: 'الجدول الدراسي' },
      { href: '/student/payments',     label: 'المدفوعات' },
      { href: '/student/absence',      label: 'الحضور والغياب' },
      { href: '/help',                 label: 'المساعدة' },
    ],
  },
  en: {
    email: 'info@aun.edu.eg',
    phone: '088-2411111',
    followUs: 'Follow us:',
    universityName: 'Assiut National University',
    facultyName: 'Faculty of Computers & Information',
    logout: 'Logout',
    welcome: 'Welcome',
    subNav: [
      { href: '/student/registration', label: 'Course Registration' },
      { href: '/student/grades',       label: 'Grades' },
      { href: '/student/schedule',     label: 'Schedule' },
      { href: '/student/payments',     label: 'Payments' },
      { href: '/student/absence',      label: 'Attendance' },
      { href: '/help',                 label: 'Help' },
    ],
  },
} as const;

export default function DashboardLayout({ children, user, role }: DashboardLayoutProps) {
  const { locale, switchLocale } = useTranslations();
  const { dark: isDark, toggle: toggleDark } = useDarkMode();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);   
  const [navOpen, setNavOpen] = useState(false);           
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const H = isDark ? darkH : lightH;
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) setSidebarCollapsed(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  
  useEffect(() => {
    setSidebarOpen(false);
    setNavOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(next));
  };

  return (
    <div
      className={`${cairo.className} min-h-screen flex flex-col`}
      dir={dir}
      style={{ background: isDark ? '#0F0D0A' : '#F5F0E8' }}
    >
      
      <header
        className="sticky top-0 z-50"
        style={{ background: H.bg, borderBottom: `1px solid ${H.border}` }}
      >
        
        <div className="hidden md:block" style={{ background: H.topBar }}>
          <div className="px-4 h-9 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <a href={`mailto:${tx.email}`} className="flex items-center gap-1.5"
                style={{ color: H.topText }}
                onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
                onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {tx.email}
              </a>
              <Separator orientation="vertical" className="h-4 opacity-30" />
              <span style={{ color: H.topText, opacity: 0.8 }}>
                {tx.welcome}، {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/AssuitANU" target="_blank" rel="noreferrer"
                style={{ color: H.topText }}
                onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
                onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <Separator orientation="vertical" className="h-4 opacity-30" />
              <LocaleSwitcher locale={locale as 'ar' | 'en'} switchLocale={switchLocale} H={H} />
              <Separator orientation="vertical" className="h-4 opacity-30" />
              <DarkToggle isDark={isDark} toggle={toggleDark} color={H.topText} hoverColor={H.topHover} />
            </div>
          </div>
        </div>

        
        <div className="px-3 sm:px-4 py-2.5 flex items-center gap-2" style={{ background: H.bg }}>
          
          <Link href={`/${role}/dashboard`}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity min-w-0 flex-1">
            <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 shrink-0">
              <Image src="/logo.png" alt="Logo" fill
                className="object-contain rounded-full p-0.5"
                style={{ border: `3px solid ${H.gold}`, background: '#FFFDF8' }} />
            </div>
            <div className="leading-tight min-w-0 overflow-hidden">
              <p className="text-[10px] sm:text-sm md:text-base font-bold truncate" style={{ color: H.text }}>
                {tx.universityName}
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs font-bold truncate" style={{ color: H.gold }}>
                {tx.facultyName}
              </p>
            </div>
          </Link>

          
          <button onClick={() => logout()}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 shrink-0"
            style={{ background: H.gold, color: isDark ? '#111' : '#2F2415' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {tx.logout}
          </button>

          
          <div className="md:hidden flex items-center gap-0.5 shrink-0 ms-auto">
            <LocaleSwitcher locale={locale as 'ar' | 'en'} switchLocale={switchLocale} H={H} textColor={H.text} compact />
            <DarkToggle isDark={isDark} toggle={toggleDark} color={H.text} />
            <button className="p-1.5 rounded-md" style={{ color: H.text }}
              onClick={() => setSidebarOpen(o => !o)} aria-label="القائمة">
              <motion.svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                animate={sidebarOpen ? 'open' : 'closed'}>
                <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  variants={{
                    closed: { d: 'M4 6h16M4 12h16M4 18h16' },
                    open:   { d: 'M6 18L18 6M6 6l12 12' },
                  }}
                  transition={{ duration: 0.2 }} />
              </motion.svg>
            </button>
          </div>
        </div>

      </header>

      
      <div className="flex flex-1 overflow-hidden">

        
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setSidebarOpen(false)} />
          )}
        </AnimatePresence>

        
        <div
          className="hidden md:block flex-shrink-0 sticky top-0 h-screen z-40 transition-all duration-300"
          style={{ width: sidebarCollapsed ? 64 : 288 }}
        >
          <VerticalSidebar
            userRole={role}
            userName={`${user.firstName} ${user.lastName}`}
            onLogout={logout}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            userGender={user.gender}
            userAvatarUrl={user.avatarUrl}
          />
        </div>

        
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div key="sidebar-drawer"
              initial={{ x: dir === 'rtl' ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir === 'rtl' ? '100%' : '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }}
              className="fixed top-0 h-screen z-50 md:hidden w-72 shadow-2xl"
              style={{ [dir === 'rtl' ? 'right' : 'left']: 0 }}>
              <VerticalSidebar
                userRole={role}
                userName={`${user.firstName} ${user.lastName}`}
                onLogout={() => { logout(); setSidebarOpen(false); }}
                isCollapsed={false}
                onToggleCollapse={() => setSidebarOpen(false)}
                userGender={user.gender}
                userAvatarUrl={user.avatarUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>

        
        <main
          ref={mainRef}
          className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto min-w-0"
        >
          {children}
        </main>
      </div>
    </div>
  );
}



function DarkToggle({ isDark, toggle, color, hoverColor }: {
  isDark: boolean;
  toggle: () => void;
  color: string;
  hoverColor?: string;
}) {
  return (
    <button onClick={toggle} aria-label="toggle dark mode"
      className="w-7 h-7 flex items-center justify-center rounded-md transition-colors"
      style={{ color }}
      onMouseEnter={e => { if (hoverColor) e.currentTarget.style.color = hoverColor; }}
      onMouseLeave={e => { if (hoverColor) e.currentTarget.style.color = color; }}>
      {isDark ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

function LocaleSwitcher({ locale, switchLocale, H, textColor, compact = false }: {
  locale: 'ar' | 'en';
  switchLocale: (l: 'ar' | 'en') => void;
  H: HeaderTokens;
  textColor?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const options = [
    { value: 'ar' as const, label: 'العربية', short: 'ع', flag: '🇪🇬' },
    { value: 'en' as const, label: 'English', short: 'E', flag: '🇬🇧' },
  ];
  const current = options.find(o => o.value === locale)!;
  const btnColor = textColor ?? H.topText;
  const [dropDir, setDropDir] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDropDir(window.innerWidth - rect.right < 130 ? 'right' : 'left');
  }, [open]);

  return (
    <div className="relative shrink-0" ref={ref}
      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); }}
      onMouseLeave={() => { closeTimer.current = setTimeout(() => setOpen(false), 120); }}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold select-none"
        style={{ color: btnColor }}>
        {compact ? (
          <span className="text-sm font-extrabold">{current.short}</span>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
              <path strokeWidth="1.8" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
            <span>{current.label}</span>
          </>
        )}
        <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 rounded-lg shadow-lg overflow-hidden z-[9999] min-w-[120px]"
            style={{ background: H.bg, border: `1px solid ${H.border}`, ...(dropDir === 'right' ? { right: 0 } : { left: 0 }) }}>
            {options.map(opt => (
              <button key={opt.value}
                onClick={() => { switchLocale(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-start"
                style={{ color: opt.value === locale ? H.gold : H.text, background: opt.value === locale ? H.subBar : 'transparent' }}
                onMouseEnter={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = H.subBar; }}
                onMouseLeave={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
                {opt.value === locale && <span className="ms-auto text-[10px]" style={{ color: H.gold }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
