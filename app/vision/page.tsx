'use client';

import Link from 'next/link';
import { Cairo } from 'next/font/google';


import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    title: 'الرؤية والرسالة',
    subtitle: 'نحو مستقبل مشرق في التعليم والبحث العلمي وخدمة المجتمع',
    visionTitle: 'الرؤية',
    visionContent: 'تسعى الكلية إلى تحقيق التميز والابتكار في التعليم والبحث العلمي وخدمة المجتمع محليًا وإقليميًا، لتكون مركزًا رائدًا في مجال الحاسبات والمعلومات على المستوى الوطني والإقليمي.',
    missionTitle: 'الرسالة',
    missionContent: 'تزويد الطلاب بالمعرفة والبحث العلمي في علوم الحاسب ونظم وتكنولوجيا المعلومات، وتطوير المناهج بما يواكب التطور العلمي واحتياجات سوق العمل المحلي والإقليمي.',
    missionAxesTitle: 'محاور الرسالة',
    missionAxes: [
      { title: 'التعليم المتميز',     desc: 'تقديم تعليم عالي الجودة يواكب المعايير الدولية ويلبي احتياجات سوق العمل' },
      { title: 'تطوير المناهج',       desc: 'تحديث المناهج الدراسية باستمرار لمواكبة التطورات التكنولوجية المتسارعة' },
      { title: 'التعلم الذاتي',       desc: 'تنمية مهارات التعلم الذاتي والتفكير النقدي لدى الطلاب' },
      { title: 'البحث العلمي',        desc: 'تشجيع البحث العلمي والابتكار في مجالات الحاسبات والمعلومات' },
      { title: 'القيم والأخلاق',      desc: 'غرس القيم الأخلاقية والمهنية في نفوس الطلاب والخريجين' },
      { title: 'خدمة المجتمع',        desc: 'المساهمة الفعّالة في خدمة المجتمع وتلبية احتياجاته التكنولوجية' },
    ],
    goalsTitle: 'الأهداف الاستراتيجية',
    goalsSubtitle: 'نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تدعم رؤيتنا ورسالتنا',
    goals: [
      { title: 'التميز الأكاديمي',    desc: 'الارتقاء بمستوى التعليم والبحث العلمي لتحقيق التميز على المستوى الوطني والإقليمي' },
      { title: 'الابتكار والإبداع',   desc: 'تهيئة بيئة محفزة للابتكار والإبداع وريادة الأعمال في مجال التكنولوجيا' },
      { title: 'الشراكات الاستراتيجية', desc: 'بناء شراكات فعّالة مع المؤسسات الأكاديمية والصناعية محليًا ودوليًا' },
      { title: 'نشر الوعي التكنولوجي', desc: 'المساهمة في نشر الثقافة التكنولوجية وتطوير المجتمع الرقمي' },
      { title: 'التعاون المجتمعي',    desc: 'تعزيز التعاون مع مؤسسات المجتمع لتلبية احتياجاته التنموية' },
      { title: 'التطوير المستمر',     desc: 'الالتزام بالتحسين المستمر لجميع العمليات الأكاديمية والإدارية' },
    ],
    valuesTitle: 'قيمنا',
    values: ['التميز', 'الابتكار', 'النزاهة', 'العدالة', 'الجودة', 'الإبداع', 'الهدفية', 'الانفتاح'],
    joinTitle: 'انضم إلى مجتمعنا الأكاديمي',
    joinSubtitle: 'كن جزءًا من رحلة التميز والابتكار في كلية الحاسبات والمعلومات',
    programs: 'البرامج الأكاديمية',
    contact: 'اتصل بنا',
  },
  en: {
    title: 'Vision & Mission',
    subtitle: 'Towards a bright future in education, research, and community service',
    visionTitle: 'Vision',
    visionContent: 'The faculty strives to achieve excellence and innovation in education, scientific research, and community service locally and regionally, to become a leading center in the field of computers and information at the national and regional level.',
    missionTitle: 'Mission',
    missionContent: 'Providing students with knowledge and scientific research in computer science, information systems and technology, and developing curricula to keep pace with scientific progress and the needs of the local and regional labor market.',
    missionAxesTitle: 'Mission Pillars',
    missionAxes: [
      { title: 'Distinguished Education',  desc: 'Providing high-quality education that meets international standards and labor market needs' },
      { title: 'Curriculum Development',  desc: 'Continuously updating curricula to keep pace with rapid technological developments' },
      { title: 'Self-Learning',            desc: 'Developing self-learning skills and critical thinking among students' },
      { title: 'Scientific Research',      desc: 'Encouraging scientific research and innovation in computers and information fields' },
      { title: 'Values & Ethics',          desc: 'Instilling ethical and professional values in students and graduates' },
      { title: 'Community Service',        desc: 'Actively contributing to community service and meeting its technological needs' },
    ],
    goalsTitle: 'Strategic Goals',
    goalsSubtitle: 'We strive to achieve a set of strategic goals that support our vision and mission',
    goals: [
      { title: 'Academic Excellence',     desc: 'Elevating the level of education and research to achieve excellence at the national and regional level' },
      { title: 'Innovation & Creativity', desc: 'Creating an environment that fosters innovation, creativity, and entrepreneurship in technology' },
      { title: 'Strategic Partnerships',  desc: 'Building effective partnerships with academic and industrial institutions locally and internationally' },
      { title: 'Tech Awareness',          desc: 'Contributing to spreading technological culture and developing the digital community' },
      { title: 'Community Cooperation',   desc: 'Strengthening cooperation with community institutions to meet their development needs' },
      { title: 'Continuous Development',  desc: 'Commitment to continuous improvement of all academic and administrative processes' },
    ],
    valuesTitle: 'Our Values',
    values: ['Excellence', 'Innovation', 'Integrity', 'Justice', 'Quality', 'Creativity', 'Purpose', 'Openness'],
    joinTitle: 'Join Our Academic Community',
    joinSubtitle: 'Be part of the journey of excellence and innovation at the Faculty of Computers and Information',
    programs: 'Academic Programs',
    contact: 'Contact Us',
  },
};

export default function VisionPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const tx  = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t    = dark ? darkTheme : theme;
  const bg1  = dark ? darkTheme.background : theme.background;
  const bg2  = dark ? darkTheme.surface    : theme.surface;
  const card = dark ? darkTheme.surface    : theme.white;
  const bdr  = dark ? darkTheme.border     : theme.border;
  const bdrL = dark ? darkTheme.borderLight : theme.border;
  const iconBg  = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg  = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text   : theme.text;

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
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { label: tx.visionTitle, content: tx.visionContent },
              { label: tx.missionTitle, content: tx.missionContent },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-10">
                  <h2 className="text-4xl font-extrabold mb-6" style={{ color: t.primary }}>{item.label}</h2>
                  <p className="text-xl leading-relaxed font-medium" style={{ color: t.textMuted }}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: t.text }}>{tx.missionAxesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tx.missionAxes.map((item, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-6">
                  <div className="text-4xl font-black tabular-nums mb-3" style={{ color: t.primary }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: t.text }}>{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: t.textMuted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4 text-center" style={{ color: t.text }}>{tx.goalsTitle}</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 font-medium" style={{ color: t.textMuted }}>{tx.goalsSubtitle}</p>
          <div className="space-y-4 max-w-4xl mx-auto">
            {tx.goals.map((g, i) => (
              <div key={i} className="rounded-xl border p-6 flex gap-6 hover:shadow-lg transition-all"
                style={{ background: card, borderColor: bdr }}>
                <div className="text-3xl font-black tabular-nums shrink-0 w-12 text-center" style={{ color: t.primary }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold mb-2" style={{ color: t.text }}>{g.title}</h3>
                  <p className="font-medium" style={{ color: t.textMuted }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: t.text }}>{tx.valuesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tx.values.map((value, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-extrabold" style={{ color: t.text }}>{value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: heroText }}>{tx.joinTitle}</h2>
          <p className="text-xl mb-8 font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.joinSubtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/programs"
              className="px-8 py-3 rounded-lg font-extrabold transition-all hover:opacity-90"
              style={{ background: dark ? darkTheme.background : theme.text, color: dark ? darkTheme.primary : theme.white }}>
              {tx.programs}
            </Link>
            <Link href="/contact"
              className="px-8 py-3 rounded-lg font-extrabold transition-all border hover:opacity-80"
              style={{ background: iconBg, color: t.text, borderColor: bdrL }}>
              {tx.contact}
            </Link>
          </div>
        </div>
      </section></div>
  );
}
