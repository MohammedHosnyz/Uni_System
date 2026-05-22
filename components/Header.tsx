'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import { getCurrentUser, isAuthenticated } from '@/lib/authClient';
import { logout } from '@/lib/logout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';
import { H as lightH, darkH, type HeaderTokens } from '@/lib/theme';




const content = {
  ar: {
    followUs: 'تابعنا:',
    universityName: 'جامعة أسيوط الأهلية',
    universityNameEn: 'Assiut National University',
    facultyName: 'كلية الحاسبات والمعلومات',
    login: 'تسجيل الدخول',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    nav: [
      { href: '/',           label: 'الرئيسية' },
      { href: '/about',      label: 'عن الكلية' },
      { href: '/programs',   label: 'البرامج الأكاديمية' },
      { href: '/admissions', label: 'القبول والتسجيل' },
      { href: '/news',       label: 'الأخبار والفعاليات' },
      { href: '/contact',    label: 'اتصل بنا' },
    ],
    subNav: [
      { href: '/about',       label: 'من نحن' },
      { href: '/programs',    label: 'البرامج والتخصصات' },
      { href: '/admissions',  label: 'القبول والتسجيل' },
      { href: '/news',        label: 'الأخبار والفعاليات' },
      { href: '/help',        label: 'المساعدة' },
      { href: '/regulations', label: 'اللوائح والأنظمة' },
      { href: '/sitemap',     label: 'خريطة الموقع' },
    ],
  },
  en: {
    followUs: 'Follow us:',
    universityName: 'Assiut National University',
    universityNameEn: 'جامعة أسيوط الأهلية',
    facultyName: 'Faculty of Computers & Information',
    login: 'Login',
    dashboard: 'Dashboard',
    logout: 'Logout',
    nav: [
      { href: '/',           label: 'Home' },
      { href: '/about',      label: 'About' },
      { href: '/programs',   label: 'Programs' },
      { href: '/admissions', label: 'Admissions' },
      { href: '/news',       label: 'News & Events' },
      { href: '/contact',    label: 'Contact' },
    ],
    subNav: [
      { href: '/about',       label: 'Who We Are' },
      { href: '/programs',    label: 'Programs & Specializations' },
      { href: '/admissions',  label: 'Admissions & Registration' },
      { href: '/news',        label: 'News & Events' },
      { href: '/help',        label: 'Help' },
      { href: '/regulations', label: 'Regulations' },
      { href: '/sitemap',     label: 'Sitemap' },
    ],
  },
};

export default function Header() {
  const { locale, switchLocale } = useTranslations();
  const c = locale === 'en' ? content.en : content.ar;
  const isRtl = locale !== 'en';
  const { dark: isDark, toggle: toggleDark } = useDarkMode();
  const H = isDark ? darkH : lightH;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUserName(`${user.firstName} ${user.lastName}`);
      }
    }
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ background: H.bg, borderBottom: `1px solid ${H.border}` }}
    >
      
      <div style={{ background: H.topBar }}>
        <div className="max-w-7xl mx-auto px-4 h-9 hidden md:flex items-center justify-between text-xs">

          
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
          </div>

          
          <div className="flex items-center gap-3">
            <span style={{ color: H.topText, opacity: 0.6 }}>{c.followUs}</span>
            <a href="https://www.facebook.com/AssuitANU" target="_blank" rel="noreferrer"
              className="transition-colors" style={{ color: H.topText }}
              onMouseEnter={e => (e.currentTarget.style.color = H.topHover)}
              onMouseLeave={e => (e.currentTarget.style.color = H.topText)}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <LocaleSwitcher locale={locale} switchLocale={switchLocale} H={H} />
            <Separator orientation="vertical" className="h-4 opacity-30" />
            
            <button
              onClick={toggleDark}
              aria-label={isDark ? 'Light mode' : 'Dark mode'}
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
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" style={{ background: H.bg }}>

        
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
          <div className="relative w-16 h-16">
            <Image
              src="/logo.png"
              alt="Assiut National University Logo"
              fill
              sizes="64px"
              className="object-contain rounded-full p-0.5"
              style={{ border: `3px solid ${H.gold}`, background: '#FFFDF8' }}
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold" style={{ color: H.text }}>{c.universityName}</p>
            <p className="text-xs" style={{ color: H.subText }}>{c.universityNameEn}</p>
            <p className="text-xs font-bold" style={{ color: H.gold }}>{c.facultyName}</p>
          </div>
        </Link>

        
        <nav className="hidden md:flex items-center gap-1">
          {c.nav.map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              style={{ color: H.navText }}
              onMouseEnter={e => { e.currentTarget.style.color = H.navHover; e.currentTarget.style.background = H.subBar; }}
              onMouseLeave={e => { e.currentTarget.style.color = H.navText; e.currentTarget.style.background = 'transparent'; }}>
              {label}
            </Link>
          ))}
        </nav>

        
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-semibold gap-2 border"
                  style={{ borderColor: H.border, color: H.text, background: H.bg }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {userName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44" style={{ background: H.bg, borderColor: H.border }}>
                <DropdownMenuItem asChild>
                  <Link href="/student/dashboard" style={{ color: H.text }}>{c.dashboard}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator style={{ background: H.border }} />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  {c.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="font-bold shadow-sm px-5 transition-colors"
              style={{ background: H.gold, color: isDark ? '#111111' : '#2F2415' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}>
              <Link href="/login">{c.login}</Link>
            </Button>
          )}
        </div>

        
        <div className="md:hidden flex items-center gap-1">
          <LocaleSwitcher locale={locale} switchLocale={switchLocale} H={H} textColor={H.text} compact />
          <button
            onClick={toggleDark}
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
            style={{ color: H.text }}>
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
          <button className="p-2 rounded-md" style={{ color: H.text }}
            onClick={() => setMobileOpen(o => !o)} aria-label="القائمة">
            <motion.svg
              className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              animate={mobileOpen ? 'open' : 'closed'}>
              <motion.path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                variants={{
                  closed: { d: 'M4 6h16M4 12h16M4 18h16' },
                  open:   { d: 'M6 18L18 6M6 6l12 12' },
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </button>
        </div>
      </div>


      
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t overflow-hidden"
            style={{ background: H.bg, borderColor: H.border }}>
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {c.nav.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}>
                  <Link href={href}
                    className="block px-3 py-2.5 rounded-md text-sm font-semibold transition-colors"
                    style={{ color: H.navText }}
                    onClick={() => setMobileOpen(false)}
                    onMouseEnter={e => (e.currentTarget.style.background = H.subBar)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    {label}
                  </Link>
                </motion.div>
              ))}
              <Separator className="my-2" style={{ background: H.border }} />
              {isLoggedIn ? (
                <Button variant="destructive" size="sm" onClick={logout} className="w-full">{c.logout}</Button>
              ) : (
                <Button asChild size="sm" className="w-full font-bold"
                  style={{ background: H.gold, color: isDark ? '#111111' : '#2F2415' }}>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>{c.login}</Link>
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


function LocaleSwitcher({
  locale,
  switchLocale,
  H,
  textColor,
  compact = false,
}: {
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

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  
  const [dropDir, setDropDir] = useState<'left' | 'right'>('right');
  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    setDropDir(spaceRight < 130 ? 'right' : 'left');
  }, [open]);

  return (
    <div className="relative" ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-colors select-none"
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
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 opacity-70"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="absolute top-full mt-1 rounded-lg shadow-lg overflow-hidden z-[9999] min-w-[120px]"
            style={{
              background: H.bg,
              border: `1px solid ${H.border}`,
              ...(dropDir === 'right' ? { right: 0 } : { left: 0 }),
            }}>
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { switchLocale(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors text-start"
                style={{
                  color: opt.value === locale ? H.gold : H.text,
                  background: opt.value === locale ? H.subBar : 'transparent',
                }}
                onMouseEnter={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = H.subBar; }}
                onMouseLeave={e => { if (opt.value !== locale) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
                {opt.value === locale && (
                  <span className="ms-auto text-[10px]" style={{ color: H.gold }}>✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
