'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { F as lightF } from '@/lib/theme';

const i18n = {
  ar: {
    aboutSection: 'عن الكلية',
    aboutLinks: [
      { href: '/about',       text: 'من نحن' },
      { href: '/vision',      text: 'الرؤية والرسالة' },
      { href: '/departments', text: 'الأقسام العلمية' },
      { href: '/faculty',     text: 'أعضاء هيئة التدريس' },
    ],
    usefulLinks: 'روابط مفيدة',
    usefulLinksItems: [
      { href: '/admissions',  text: 'القبول والتسجيل' },
      { href: '/programs',    text: 'البرامج الأكاديمية' },
      { href: '/regulations', text: 'اللائحة الأكاديمية' },
      { href: '/careers',     text: 'الوظائف' },
    ],
    contactUs: 'تواصل معنا',
    address: 'أسيوط، مصر',
    copyright: '© 2026 جامعة أسيوط الأهلية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    bottomLinks: [
      { href: '/sitemap',       label: 'خريطة الموقع' },
      { href: '/privacy',       label: 'سياسة الخصوصية' },
      { href: '/terms',         label: 'الشروط والأحكام' },
      { href: '/accessibility', label: 'إمكانية الوصول' },
      { href: '/contact',       label: 'اتصل بنا' },
    ],
    backToTop: '↑ العودة للأعلى',
  },
  en: {
    aboutSection: 'About Faculty',
    aboutLinks: [
      { href: '/about',       text: 'Who We Are' },
      { href: '/vision',      text: 'Vision & Mission' },
      { href: '/departments', text: 'Academic Departments' },
      { href: '/faculty',     text: 'Faculty Members' },
    ],
    usefulLinks: 'Useful Links',
    usefulLinksItems: [
      { href: '/admissions',  text: 'Admissions & Registration' },
      { href: '/programs',    text: 'Academic Programs' },
      { href: '/regulations', text: 'Academic Regulations' },
      { href: '/careers',     text: 'Careers' },
    ],
    contactUs: 'Contact Us',
    address: 'Assiut, Egypt',
    copyright: '© 2026 Assiut National University',
    allRightsReserved: 'All Rights Reserved',
    bottomLinks: [
      { href: '/sitemap',       label: 'Sitemap' },
      { href: '/privacy',       label: 'Privacy Policy' },
      { href: '/terms',         label: 'Terms & Conditions' },
      { href: '/accessibility', label: 'Accessibility' },
      { href: '/contact',       label: 'Contact Us' },
    ],
    backToTop: '↑ Back to Top',
  },
};

export default function Footer() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const tx  = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const F = dark ? {
    bg:         '#1A1612',
    surface:    '#221E18',
    border:     '#3A3228',
    text:       '#C0B090',
    muted:      '#7A6A50',
    gold:       '#E8B84B',
    hover:      '#F0E6D0',
    bottom:     '#110F0C',
    bottomText: '#5A5040',
  } : lightF;

  return (
    <footer className="mt-auto overflow-hidden transition-colors duration-300" style={{ background: F.bg }} dir={dir}>

      
      <div className="h-1" style={{ background: `linear-gradient(to left, ${F.gold}, ${F.hover}, ${F.gold})` }} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          
          <FooterSection title={tx.aboutSection} gold={F.gold}>
            {tx.aboutLinks.map(l => <FooterLink key={l.href} href={l.href} text={l.text} F={F} />)}
          </FooterSection>

          
          <FooterSection title={tx.usefulLinks} gold={F.gold}>
            {tx.usefulLinksItems.map(l => <FooterLink key={l.href} href={l.href} text={l.text} F={F} />)}
          </FooterSection>

          
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: F.gold }}>{tx.contactUs}</h3>
            <ul className="space-y-3 text-sm" style={{ color: F.text }}>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: F.gold }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{tx.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: F.gold }}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+20882411111" className="transition-colors" style={{ color: F.text }}
                  onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = F.text)}>
                  088-2411111
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: F.gold }}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:info@aun.edu.eg" className="transition-colors" style={{ color: F.text }}
                  onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = F.text)}>
                  info@aun.edu.eg
                </a>
              </li>
              
              <li className="flex items-center gap-4 mt-4">
                {[
                  <path key="fb" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
                  <path key="tw" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />,
                  <path key="ig" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />,
                ].map((pathEl, i) => (
                  <a key={i} href="#" className="transition-colors" style={{ color: F.muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
                    onMouseLeave={e => (e.currentTarget.style.color = F.muted)}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{pathEl}</svg>
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>

      
      <div style={{ borderTop: `1px solid ${F.border}` }} />

      
      <div style={{ background: F.bottom }}>
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: F.bottomText }}>
            <div className="flex items-center gap-3">
              <span>{tx.copyright}</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">{tx.allRightsReserved}</span>
            </div>
            <div className="flex items-center gap-5 flex-wrap justify-center">
              {tx.bottomLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="transition-colors" style={{ color: F.bottomText }}
                  onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = F.bottomText)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm transition-colors"
              style={{ color: F.bottomText }}
              onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = F.bottomText)}>
              {tx.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, gold, children }: { title: string; gold: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4" style={{ color: gold }}>{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, text, F }: { href: string; text: string; F: { text: string; gold: string } }) {
  return (
    <li>
      <Link href={href} className="text-sm transition-colors" style={{ color: F.text }}
        onMouseEnter={e => (e.currentTarget.style.color = F.gold)}
        onMouseLeave={e => (e.currentTarget.style.color = F.text)}>
        {text}
      </Link>
    </li>
  );
}
