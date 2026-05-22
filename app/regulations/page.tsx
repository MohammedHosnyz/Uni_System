'use client';

import Link from 'next/link';
import { Cairo } from 'next/font/google';


import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { useTranslations } from '@/lib/useTranslations';
import { Separator } from '@/components/ui/separator';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    title: 'اللوائح الأكاديمية',
    subtitle: 'اللوائح والأنظمة الأكاديمية للكلية',
    overview: 'نبذة عن اللوائح',
    overviewText: 'تحتوي هذه الصفحة على اللوائح الأكاديمية المعتمدة للدراسة في كلية الحاسبات والمعلومات. يمكنك تحميل اللائحة الخاصة بتخصصك للاطلاع على جميع التفاصيل والقواعد المنظمة للدراسة.',
    stats: [
      { title: '144 ساعة معتمدة', desc: 'إجمالي الساعات للتخرج' },
      { title: '4 سنوات دراسية',  desc: 'مدة الدراسة (8 فصول)' },
      { title: 'GPA 2.0',          desc: 'الحد الأدنى للتخرج' },
    ],
    programs: 'لوائح البرامج',
    regulations: [
      {
        code: '01',
        title: 'اللائحة العامة',
        subtitle: 'لجميع التخصصات',
        desc: 'اللائحة الأكاديمية الشاملة لجميع برامج البكالوريوس في كلية الحاسبات والمعلومات',
        features: ['نظام الساعات المعتمدة', 'قواعد التسجيل والحذف', 'نظام التقييم والدرجات', 'متطلبات التخرج', 'الإنذارات الأكاديمية'],
        pdfFile: '/regulations/general-regulation',
        fileSize: '2.99 MB',
        lastUpdate: 'سبتمبر 2026',
      },
      {
        code: '02',
        title: 'لائحة هندسة البرمجيات',
        subtitle: 'Software Engineering',
        desc: 'اللائحة الخاصة ببرنامج هندسة البرمجيات مع التفاصيل الكاملة للمقررات والمتطلبات',
        features: ['المقررات الإجبارية والاختيارية', 'المتطلبات السابقة', 'مشروع التخرج', 'التدريب الميداني', 'معايير الاعتماد الدولي'],
        pdfFile: '/regulations/software-engineering-regulation',
        fileSize: '1.54 MB',
        lastUpdate: 'سبتمبر 2026',
      },
    ],
    contents: 'محتويات اللائحة',
    fileSize: 'حجم الملف:',
    lastUpdate: 'آخر تحديث:',
    download: 'تحميل اللائحة (PDF)',
    viewRegulation: 'عرض اللائحة',
    quickLinks: 'روابط سريعة',
    quickLinksItems: [
      { title: 'البرامج الأكاديمية',    link: '/programs' },
      { title: 'القبول والتسجيل',       link: '/admissions' },
      { title: 'عن الكلية',             link: '/about' },
      { title: 'المساعدة',              link: '/help' },
    ],
    importantNotes: 'ملاحظات هامة',
    notes: [
      'يجب على جميع الطلاب الالتزام باللائحة الأكاديمية المعتمدة',
      'اللوائح قابلة للتحديث - يرجى مراجعة آخر إصدار دورياً',
      'في حالة وجود أي استفسار، يرجى التواصل مع شؤون الطلاب',
      'يُنصح بطباعة نسخة من اللائحة للرجوع إليها عند الحاجة',
    ],
    faqTitle: 'أسئلة شائعة',
    faq: [
      { q: 'هل يمكنني تحميل اللائحة على هاتفي؟',                         a: 'نعم، الملفات بصيغة PDF ويمكن تحميلها وعرضها على أي جهاز' },
      { q: 'ما الفرق بين اللائحة العامة ولائحة هندسة البرمجيات؟',         a: 'اللائحة العامة تشمل جميع التخصصات، بينما لائحة هندسة البرمجيات خاصة ببرنامج Software Engineering فقط' },
      { q: 'هل اللوائح ملزمة لجميع الطلاب؟',                             a: 'نعم، جميع الطلاب ملزمون بالالتزام باللائحة الأكاديمية المعتمدة' },
      { q: 'كيف أعرف أي لائحة تنطبق علي؟',                              a: 'يتم تطبيق اللائحة حسب سنة التحاقك بالكلية. راجع مرشدك الأكاديمي للتأكد' },
    ],
    inquiryTitle: 'هل لديك استفسار عن اللوائح؟',
    inquirySubtitle: 'تواصل مع شؤون الطلاب للحصول على المزيد من المعلومات',
    contact: 'تواصل معنا',
    help: 'المساعدة',
  },
  en: {
    title: 'Academic Regulations',
    subtitle: 'Faculty academic regulations and systems',
    overview: 'About Regulations',
    overviewText: 'This page contains the approved academic regulations for studying at the Faculty of Computers and Information. You can download the regulation for your specialization to view all details and rules governing the study.',
    stats: [
      { title: '144 Credit Hours', desc: 'Total hours to graduate' },
      { title: '4 Academic Years', desc: 'Study duration (8 semesters)' },
      { title: 'GPA 2.0',           desc: 'Minimum GPA to graduate' },
    ],
    programs: 'Program Regulations',
    regulations: [
      {
        code: '01',
        title: 'General Regulations',
        subtitle: 'For all specializations',
        desc: 'The comprehensive academic regulations for all undergraduate programs at the Faculty of Computers and Information',
        features: ['Credit hours system', 'Registration and withdrawal rules', 'Grading and evaluation system', 'Graduation requirements', 'Academic warnings'],
        pdfFile: '/regulations/general-regulation',
        fileSize: '2.99 MB',
        lastUpdate: 'September 2026',
      },
      {
        code: '02',
        title: 'Software Engineering Regulations',
        subtitle: 'Software Engineering',
        desc: 'The specific regulations for the Software Engineering program with full details of courses and requirements',
        features: ['Mandatory and elective courses', 'Prerequisites', 'Graduation project', 'Field training', 'International accreditation standards'],
        pdfFile: '/regulations/software-engineering-regulation',
        fileSize: '1.54 MB',
        lastUpdate: 'September 2026',
      },
    ],
    contents: 'Regulation Contents',
    fileSize: 'File Size:',
    lastUpdate: 'Last Update:',
    download: 'Download Regulations (PDF)',
    viewRegulation: 'View Regulation',
    quickLinks: 'Quick Links',
    quickLinksItems: [
      { title: 'Academic Programs',         link: '/programs' },
      { title: 'Admissions & Registration', link: '/admissions' },
      { title: 'About',                     link: '/about' },
      { title: 'Help',                      link: '/help' },
    ],
    importantNotes: 'Important Notes',
    notes: [
      'All students must comply with the approved academic regulations',
      'Regulations are subject to updates - please review the latest version periodically',
      'For any inquiries, please contact Student Affairs',
      'It is recommended to print a copy of the regulations for reference when needed',
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      { q: 'Can I download the regulations on my phone?',                                         a: 'Yes, the files are in PDF format and can be downloaded and viewed on any device' },
      { q: 'What is the difference between general and software engineering regulations?',         a: 'General regulations cover all specializations, while software engineering regulations are specific to the Software Engineering program only' },
      { q: 'Are regulations mandatory for all students?',                                         a: 'Yes, all students are required to comply with the approved academic regulations' },
      { q: 'How do I know which regulations apply to me?',                                        a: 'Regulations are applied according to your enrollment year. Consult your academic advisor to confirm' },
    ],
    inquiryTitle: 'Have questions about regulations?',
    inquirySubtitle: 'Contact Student Affairs for more information',
    contact: 'Contact Us',
    help: 'Help',
  },
};

export default function RegulationsPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const tx = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t      = dark ? darkTheme : theme;
  const bg1    = dark ? darkTheme.background  : theme.background;
  const bg2    = dark ? darkTheme.surface     : theme.surface;
  const card   = dark ? darkTheme.surface     : theme.white;
  const bdr    = dark ? darkTheme.border      : theme.border;
  const bdrL   = dark ? darkTheme.borderLight : theme.border;
  const heroBg   = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text    : theme.text;

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col transition-colors duration-300`}
      style={{ background: bg1 }} dir={dir}><section className="py-20 px-4" style={{ background: heroBg }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: heroText }}>{tx.title}</h1>
          <p className="text-xl max-w-3xl mx-auto font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.subtitle}</p>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-6" style={{ color: t.text }}>{tx.overview}</h2>
            <p className="text-lg leading-relaxed font-medium" style={{ color: t.textMuted }}>{tx.overviewText}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tx.stats.map((s) => (
              <div key={s.title}
                className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-extrabold mb-1" style={{ color: t.primary }}>{s.title}</h3>
                  <p className="text-sm font-medium" style={{ color: t.textMuted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: t.text }}>{tx.programs}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tx.regulations.map((reg) => (
              <div key={reg.code}
                className="rounded-2xl border overflow-hidden hover:shadow-xl transition-all"
                style={{ background: card, borderColor: bdr }}>
                
                <div className="p-8" style={{ background: heroBg }}>
                  <div className="text-5xl font-black tabular-nums mb-4" style={{ color: heroText, opacity: 0.3 }}>{reg.code}</div>
                  <h3 className="text-2xl font-extrabold mb-1" style={{ color: heroText }}>{reg.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: heroText, opacity: 0.8 }}>{reg.subtitle}</p>
                </div>

                
                <div className="p-8">
                  <p className="mb-6 leading-relaxed font-medium text-sm" style={{ color: t.textMuted }}>{reg.desc}</p>

                  <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: t.textMuted }}>{tx.contents}</p>
                  <ul className="space-y-2 mb-6">
                    {reg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: t.text }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: t.primary }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  
                  <div className="rounded-xl p-4 mb-6 border flex items-center justify-between flex-wrap gap-2 text-xs font-semibold"
                    style={{ background: bg2, borderColor: bdrL }}>
                    <span style={{ color: t.textMuted }}>{tx.fileSize} <span style={{ color: t.text }}>{reg.fileSize}</span></span>
                    <span style={{ color: t.textMuted }}>{tx.lastUpdate} <span style={{ color: t.text }}>{reg.lastUpdate}</span></span>
                  </div>

                  
                  <div className="space-y-3">
                    <a href={reg.pdfFile} download
                      className="flex items-center justify-center w-full py-3 rounded-xl font-extrabold transition-all hover:opacity-90 text-sm"
                      style={{ background: t.primary, color: dark ? darkTheme.background : theme.text }}>
                      {tx.download}
                    </a>
                    <a href={reg.pdfFile} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl font-extrabold transition-all border-2 hover:opacity-80 text-sm"
                      style={{ background: 'transparent', color: t.primary, borderColor: t.primary }}>
                      {tx.viewRegulation}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: t.text }}>{tx.quickLinks}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.quickLinksItems.map((ql, idx) => (
              <Link key={ql.link} href={ql.link}>
                <div className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  style={{ background: card, borderColor: bdr }}>
                  <div className="h-1" style={{ background: t.primary }} />
                  <div className="p-6 text-center">
                    <div className="text-3xl font-black tabular-nums mb-2" style={{ color: t.primary }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-base font-extrabold" style={{ color: t.text }}>{ql.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border overflow-hidden" style={{ background: card, borderColor: bdr }}>
            <div className="h-1" style={{ background: t.primary }} />
            <div className="p-8">
              <h3 className="text-2xl font-extrabold mb-6" style={{ color: t.text }}>{tx.importantNotes}</h3>
              <ul className="space-y-3">
                {tx.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium" style={{ color: t.textMuted }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: t.primary }} />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: t.text }}>{tx.faqTitle}</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ background: card, borderColor: bdr }}>
            {tx.faq.map((item, i) => (
              <div key={i} style={{ borderBottom: i < tx.faq.length - 1 ? `1px solid ${bdr}` : 'none' }}>
                <div className="p-6">
                  <p className="font-extrabold mb-3" style={{ color: t.text }}>{item.q}</p>
                  <Separator className="mb-3" style={{ background: bdr }} />
                  <p className="text-sm font-medium leading-relaxed" style={{ color: t.textMuted }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: heroText }}>{tx.inquiryTitle}</h2>
          <p className="text-xl mb-8 font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.inquirySubtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact"
              className="px-8 py-3 rounded-xl font-extrabold transition-all hover:opacity-90"
              style={{ background: dark ? darkTheme.background : theme.text, color: dark ? darkTheme.primary : theme.white }}>
              {tx.contact}
            </Link>
            <Link href="/help"
              className="px-8 py-3 rounded-xl font-extrabold transition-all border-2 hover:opacity-80"
              style={{ background: 'transparent', color: heroText, borderColor: dark ? darkTheme.border : `${theme.white}80` }}>
              {tx.help}
            </Link>
          </div>
        </div>
      </section></div>
  );
}
