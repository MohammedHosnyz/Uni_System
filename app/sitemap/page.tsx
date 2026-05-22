'use client';

import Link from 'next/link';
import { Cairo } from 'next/font/google';


import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { useTranslations } from '@/lib/useTranslations';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    title: 'خريطة الموقع',
    subtitle: 'دليل شامل لجميع صفحات الموقع',
    description: 'يمكنك من خلال هذه الصفحة الوصول إلى جميع أقسام وصفحات الموقع بسهولة.',
    categories: [
      {
        category: 'الصفحات الرئيسية',
        links: [
          { title: 'الرئيسية',     url: '/',      desc: 'الصفحة الرئيسية للكلية' },
          { title: 'عن الكلية',    url: '/about', desc: 'تعرف على كلية الحاسبات والمعلومات' },
          { title: 'تسجيل الدخول', url: '/login', desc: 'الدخول إلى حسابك' },
        ],
      },
      {
        category: 'الشؤون الأكاديمية',
        links: [
          { title: 'البرامج الأكاديمية',  url: '/programs',    desc: 'تخصصات الكلية الثلاثة' },
          { title: 'الأقسام العلمية',     url: '/departments', desc: 'أقسام الكلية ومجالاتها' },
          { title: 'اللوائح الأكاديمية',  url: '/regulations', desc: 'اللوائح والأنظمة الأكاديمية' },
          { title: 'أعضاء هيئة التدريس', url: '/faculty',     desc: 'نخبة من أعضاء هيئة التدريس' },
        ],
      },
      {
        category: 'القبول والتسجيل',
        links: [
          { title: 'القبول والتسجيل', url: '/admissions', desc: 'شروط القبول وإجراءات التسجيل' },
        ],
      },
      {
        category: 'الأخبار والفعاليات',
        links: [
          { title: 'الأخبار',  url: '/news',    desc: 'آخر أخبار وفعاليات الكلية' },
          { title: 'الوظائف', url: '/careers', desc: 'الوظائف والفرص المتاحة' },
        ],
      },
      {
        category: 'لوحات التحكم',
        links: [
          { title: 'لوحة تحكم الطالب',  url: '/student/dashboard',   desc: 'لوحة التحكم الرئيسية للطالب' },
          { title: 'لوحة تحكم الأستاذ', url: '/professor/dashboard', desc: 'لوحة التحكم الرئيسية للأستاذ' },
          { title: 'لوحة تحكم الموظف',  url: '/staff/dashboard',     desc: 'لوحة التحكم الرئيسية للموظف' },
          { title: 'لوحة تحكم المدير',  url: '/admin/dashboard',     desc: 'لوحة التحكم الرئيسية للمدير' },
        ],
      },
      {
        category: 'خدمات الطلاب',
        links: [
          { title: 'الملف الشخصي',   url: '/student/profile',      desc: 'بيانات الطالب الشخصية' },
          { title: 'تسجيل المقررات', url: '/student/registration', desc: 'تسجيل وإدارة المقررات' },
          { title: 'الجدول الدراسي', url: '/student/schedule',     desc: 'الجدول الأسبوعي للمحاضرات' },
          { title: 'الدرجات',        url: '/student/grades',       desc: 'نتائج الامتحانات والدرجات' },
          { title: 'المقررات',       url: '/student/courses',      desc: 'المقررات المسجلة والمواد' },
          { title: 'المدفوعات',      url: '/student/payments',     desc: 'الرسوم الدراسية والمدفوعات' },
        ],
      },
      {
        category: 'الدعم والمساعدة',
        links: [
          { title: 'المساعدة',    url: '/help',    desc: 'الأسئلة الشائعة والدعم الفني' },
          { title: 'تواصل معنا', url: '/contact', desc: 'التواصل مع إدارة الكلية' },
        ],
      },
      {
        category: 'السياسات والقانونية',
        links: [
          { title: 'سياسة الخصوصية', url: '/privacy',       desc: 'سياسة حماية البيانات والخصوصية' },
          { title: 'إمكانية الوصول', url: '/accessibility', desc: 'معلومات إمكانية الوصول' },
          { title: 'خريطة الموقع',   url: '/sitemap',       desc: 'دليل شامل لجميع صفحات الموقع' },
        ],
      },
    ],
  },
  en: {
    title: 'Sitemap',
    subtitle: 'A complete guide to all pages on the site',
    description: 'Use this page to easily navigate to all sections and pages of the website.',
    categories: [
      {
        category: 'Main Pages',
        links: [
          { title: 'Home',  url: '/',      desc: 'Faculty main page' },
          { title: 'About', url: '/about', desc: 'About the Faculty of Computers and Information' },
          { title: 'Login', url: '/login', desc: 'Sign in to your account' },
        ],
      },
      {
        category: 'Academic Affairs',
        links: [
          { title: 'Academic Programs', url: '/programs',    desc: 'The three faculty specializations' },
          { title: 'Departments',       url: '/departments', desc: 'Faculty departments and their fields' },
          { title: 'Regulations',       url: '/regulations', desc: 'Academic regulations and systems' },
          { title: 'Faculty Members',   url: '/faculty',     desc: 'Distinguished faculty members' },
        ],
      },
      {
        category: 'Admissions & Registration',
        links: [
          { title: 'Admissions', url: '/admissions', desc: 'Admission requirements and registration procedures' },
        ],
      },
      {
        category: 'News & Events',
        links: [
          { title: 'News',    url: '/news',    desc: 'Latest faculty news and events' },
          { title: 'Careers', url: '/careers', desc: 'Available jobs and opportunities' },
        ],
      },
      {
        category: 'Dashboards',
        links: [
          { title: 'Student Dashboard',   url: '/student/dashboard',   desc: 'Main student control panel' },
          { title: 'Professor Dashboard', url: '/professor/dashboard', desc: 'Main professor control panel' },
          { title: 'Staff Dashboard',     url: '/staff/dashboard',     desc: 'Main staff control panel' },
          { title: 'Admin Dashboard',     url: '/admin/dashboard',     desc: 'Main admin control panel' },
        ],
      },
      {
        category: 'Student Services',
        links: [
          { title: 'Profile',             url: '/student/profile',      desc: 'Student personal information' },
          { title: 'Course Registration', url: '/student/registration', desc: 'Register and manage courses' },
          { title: 'Schedule',            url: '/student/schedule',     desc: 'Weekly lecture schedule' },
          { title: 'Grades',              url: '/student/grades',       desc: 'Exam results and grades' },
          { title: 'Courses',             url: '/student/courses',      desc: 'Enrolled courses and subjects' },
          { title: 'Payments',            url: '/student/payments',     desc: 'Tuition fees and payments' },
        ],
      },
      {
        category: 'Support & Help',
        links: [
          { title: 'Help',       url: '/help',    desc: 'FAQs and technical support' },
          { title: 'Contact Us', url: '/contact', desc: 'Contact faculty administration' },
        ],
      },
      {
        category: 'Policies & Legal',
        links: [
          { title: 'Privacy Policy', url: '/privacy',       desc: 'Data protection and privacy policy' },
          { title: 'Accessibility',  url: '/accessibility', desc: 'Accessibility information' },
          { title: 'Sitemap',        url: '/sitemap',       desc: 'Complete guide to all site pages' },
        ],
      },
    ],
  },
};

export default function SitemapPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const tx  = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t      = dark ? darkTheme : theme;
  const bg1    = dark ? darkTheme.background : theme.background;
  const bg2    = dark ? darkTheme.surface    : theme.surface;
  const card   = dark ? darkTheme.surface    : theme.white;
  const bdr    = dark ? darkTheme.border     : theme.border;
  const heroBg   = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text    : theme.text;

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col transition-colors duration-300`}
      style={{ background: bg1 }} dir={dir}><main className="flex-grow">
        
        <section className="py-16" style={{ background: heroBg }}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: heroText }}>{tx.title}</h1>
            <p className="text-xl font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.subtitle}</p>
          </div>
        </section>

        <section className="py-12" style={{ background: bg2 }}>
          <div className="max-w-6xl mx-auto px-4">
            
            <div className="rounded-2xl border overflow-hidden mb-8" style={{ background: card, borderColor: bdr }}>
              <div className="h-1" style={{ background: t.primary }} />
              <div className="p-6">
                <p className="text-lg leading-relaxed font-medium" style={{ color: t.textMuted }}>{tx.description}</p>
              </div>
            </div>

            
            <div className="space-y-5">
              {tx.categories.map((section, i) => (
                <div key={i} className="rounded-2xl border overflow-hidden" style={{ background: card, borderColor: bdr }}>
                  <div className="h-1" style={{ background: t.primary }} />
                  <div className="p-6">
                    <h2 className="text-xl font-extrabold mb-5" style={{ color: t.text }}>{section.category}</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {section.links.map((link, j) => (
                        <Link key={j} href={link.url}
                          className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md group"
                          style={{ borderColor: bdr, background: bg2 }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: t.primary }} />
                          <div>
                            <h3 className="font-extrabold mb-0.5 group-hover:opacity-80 transition-opacity"
                              style={{ color: t.text }}>{link.title}</h3>
                            <p className="text-sm font-medium" style={{ color: t.textMuted }}>{link.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main></div>
  );
}
