'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cairo } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { H as lightH, darkH, type HeaderTokens } from '@/lib/theme';
import { Separator } from '@/components/ui/separator';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });


const i18n = {
  ar: {
    followUs: 'تابعنا:',
    universityName: 'جامعة أسيوط الأهلية',
    facultyName: 'كلية الحاسبات والمعلومات',
    system: 'نظام إدارة الطلاب',
    welcome: 'مرحباً',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    links: {
      student: [
        { href: '/student/dashboard',        label: 'لوحة التحكم',          icon: 'space_dashboard' },
        { href: '/student/registration',     label: 'تسجيل المقررات',       icon: 'how_to_reg' },
        { href: '/student/courses',          label: 'مقرراتي الدراسية',     icon: 'menu_book' },
        { href: '/student/grades',           label: 'نتائجي الدراسية',      icon: 'grade' },
        { href: '/student/quizzes',          label: 'الاختبارات',           icon: 'quiz' },
        { href: '/student/academic-record',  label: 'ملفي الأكاديمي',       icon: 'description' },
        { href: '/student/schedule',         label: 'الجدول الأسبوعي',      icon: 'calendar_month' },
        { href: '/student/exams',            label: 'جداول الاختبارات',     icon: 'event_note' },
        { href: '/student/absence',          label: 'الحضور والانصراف',     icon: 'fact_check' },
        { href: '/student/services',         label: 'الخدمات الإلكترونية', icon: 'handyman' },
        { href: '/student/academic-guidance',label: 'المرشد الأكاديمي',     icon: 'school' },
        { href: '/student/payments',         label: 'الرسوم والمدفوعات',    icon: 'payments' },
      ],
    },
  },
  en: {
    followUs: 'Follow us:',
    universityName: 'Assiut National University',
    facultyName: 'Faculty of Computers & Information',
    system: 'Student Management System',
    welcome: 'Welcome',
    logout: 'Logout',
    profile: 'My Profile',
    links: {
      student: [
        { href: '/student/dashboard',        label: 'Dashboard',           icon: 'space_dashboard' },
        { href: '/student/registration',     label: 'Course Registration', icon: 'how_to_reg' },
        { href: '/student/courses',          label: 'My Courses',          icon: 'menu_book' },
        { href: '/student/grades',           label: 'My Grades',           icon: 'grade' },
        { href: '/student/quizzes',          label: 'Quizzes',             icon: 'quiz' },
        { href: '/student/academic-record',  label: 'Academic Record',     icon: 'description' },
        { href: '/student/schedule',         label: 'Weekly Schedule',     icon: 'calendar_month' },
        { href: '/student/exams',            label: 'Exam Schedules',      icon: 'event_note' },
        { href: '/student/absence',          label: 'Attendance',          icon: 'fact_check' },
        { href: '/student/services',         label: 'E-Services',          icon: 'handyman' },
        { href: '/student/academic-guidance',label: 'Academic Advisor',    icon: 'school' },
        { href: '/student/payments',         label: 'Fees & Payments',     icon: 'payments' },
      ],
    },
  },
} as const;


const MI = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined text-[18px] leading-none ${className}`} aria-hidden="true">{name}</span>
);

interface DashboardHeaderProps {
  userRole: 'admin' | 'student' | 'professor' | 'staff';
  userName: string;
  onLogout: () => void;
}

export default function DashboardHeader({ userRole, userName, onLogout }: DashboardHeaderProps) {
  const { locale, switchLocale } = useTranslations();
  const { dark: isDark, toggle: toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const H = isDark ? darkH : lightH;
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const navLinks = userRole === 'student' ? tx.links.student : [];

  return (
    <header className={`${cairo.className} sticky top-0 z-50 transition-colors duration-300`}
      style={{ background: H.bg, borderBottom: `1px solid ${H.border}` }} dir={dir}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0" />

      
      <div style={{ background: H.topBar }}>
        <div className="max-w-full px-4 h-9 flex items-center justify-between text-xs">

          
          <div className="flex items-center gap-4">
            <a href="mailto:info@aun.edu.eg"
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@aun.edu.eg
            </a>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <a href="tel:+20882411111"
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              088-2411111
            </a>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <span style={{ color: H.topText, opacity: 0.85 }}>
              {tx.welcome}، {userName}
            </span>
          </div>

          
          <div className="flex items-center gap-3">
            <span style={{ color: H.topText, opacity: 0.6 }}>{tx.followUs}</span>
            <a href="https://www.facebook.com/AssuitANU" target="_blank" rel="noreferrer"
              className="transition-colors" style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <LocaleSwitcher locale={locale as 'ar' | 'en'} switchLocale={switchLocale} H={H} />
            <Separator orientation="vertical" className="h-4 opacity-30" />
            
            <button onClick={toggleDark} aria-label="toggle dark mode"
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors"
              style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
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
            <Separator orientation="vertical" className="h-4 opacity-30" />
            
            <button onClick={onLogout}
              className="flex items-center gap-1.5 transition-colors font-semibold"
              style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {tx.logout}
            </button>
          </div>
        </div>
      </div>

      
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: H.bg }}>
        <Link href={`/${userRole}/dashboard`} className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
          <div className="relative w-14 h-14">
            <Image src="/logo.png" alt="Logo" fill
              className="object-contain rounded-full p-0.5"
              style={{ border: `3px solid ${H.gold}`, background: '#FFFDF8' }} />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold" style={{ color: H.text }}>{tx.universityName}</p>
            <p className="text-xs font-bold" style={{ color: H.gold }}>{tx.facultyName}</p>
            <p className="text-xs" style={{ color: H.subText }}>{tx.system}</p>
          </div>
        </Link>

        
        <button className="md:hidden p-2 rounded-md" style={{ color: H.text }}
          onClick={() => setMobileOpen(o => !o)} aria-label="القائمة">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      
      <div className="hidden md:block" style={{ background: H.subBar, borderTop: `1px solid ${H.border}` }}>
        <div className="px-4 h-10 flex items-center gap-1 overflow-x-auto text-xs">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors"
              style={{ color: H.subText }}
              onMouseEnter={e => { e.currentTarget.style.color = H.subHover; e.currentTarget.style.background = H.bg; }}
              onMouseLeave={e => { e.currentTarget.style.color = H.subText; e.currentTarget.style.background = 'transparent'; }}>
              <MI name={icon} className="" />
              {label}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-5 mx-1 opacity-30" />
          <Link href={`/${userRole}/profile`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors"
            style={{ color: H.subText }}
            onMouseEnter={e => { e.currentTarget.style.color = H.subHover; e.currentTarget.style.background = H.bg; }}
            onMouseLeave={e => { e.currentTarget.style.color = H.subText; e.currentTarget.style.background = 'transparent'; }}>
            <MI name="account_circle" />
            {tx.profile}
          </Link>
        </div>
      </div>

      
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: H.bg, borderColor: H.border }}>
          <nav className="px-4 py-3 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
            {navLinks.map(({ href, label, icon }) => (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors"
                style={{ color: H.navText }}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={e => (e.currentTarget.style.background = H.subBar)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <MI name={icon} className="" />
                {label}
              </Link>
            ))}
            <Separator className="my-2" style={{ background: H.border }} />
            <button onClick={() => { onLogout(); setMobileOpen(false); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-bold transition-colors"
              style={{ color: H.gold }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {tx.logout}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}


function LocaleSwitcher({ locale, switchLocale, H }: {
  locale: 'ar' | 'en';
  switchLocale: (l: 'ar' | 'en') => void;
  H: HeaderTokens;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const options = [
    { value: 'ar' as const, label: 'العربية', flag: '🇪🇬' },
    { value: 'en' as const, label: 'English', flag: '🇬🇧' },
  ];
  const current = options.find(o => o.value === locale)!;

  return (
    <div className="relative"
      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); }}
      onMouseLeave={() => { closeTimer.current = setTimeout(() => setOpen(false), 120); }}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold transition-colors select-none"
        style={{ color: H.topText }}>
        <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
          <path strokeWidth="1.8" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
        <span>{current.label}</span>
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
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-1 rounded-lg shadow-lg overflow-hidden z-50 min-w-[110px]"
            style={{ background: H.bg, border: `1px solid ${H.border}`, left: locale === 'en' ? 0 : 'auto', right: locale === 'ar' ? 0 : 'auto' }}>
            {options.map(opt => (
              <button key={opt.value}
                onClick={() => { switchLocale(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors text-start"
                style={{ color: opt.value === locale ? H.gold : H.text, background: opt.value === locale ? H.subBar : 'transparent' }}
                onMouseEnter={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = H.subBar; }}
                onMouseLeave={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
                {opt.value === locale && <span className="mr-auto text-[10px]" style={{ color: H.gold }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
