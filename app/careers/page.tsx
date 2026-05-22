'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cairo } from 'next/font/google';


import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    title: 'الوظائف والفرص',
    subtitle: 'انضم إلى فريق كلية الحاسبات والمعلومات وكن جزءاً من مسيرة التميز',
    availableJobs: 'وظيفة متاحة',
    departments: 'أقسام علمية',
    whyJoin: 'لماذا تنضم إلينا؟',
    whyJoinDesc: 'كلية الحاسبات والمعلومات توفر بيئة عمل متميزة تجمع بين التعليم والبحث العلمي وخدمة المجتمع.',
    benefits: [
      { title: 'بيئة أكاديمية متميزة', desc: 'فرصة للعمل في بيئة تعليمية حديثة ومتطورة' },
      { title: 'دعم البحث العلمي',      desc: 'إمكانيات بحثية متقدمة ودعم للنشر العلمي' },
      { title: 'مزايا تنافسية',         desc: 'رواتب ومزايا تنافسية وفرص للتطوير المهني' },
    ],
    availableTitle: 'الوظائف المتاحة',
    statusOpen: 'متاحة',
    deadline: 'آخر موعد:',
    viewApply: 'عرض التفاصيل والتقديم',
    noJobs: 'لا توجد وظائف متاحة حالياً',
    noJobsDesc: 'يرجى المتابعة لاحقاً أو التواصل معنا للاستفسار',
    jobDesc: 'الوصف الوظيفي',
    requirements: 'المتطلبات',
    responsibilities: 'المسؤوليات',
    applyNow: 'تقدم الآن',
    close: 'إغلاق',
    ctaTitle: 'هل لديك استفسار؟',
    ctaSubtitle: 'تواصل معنا للحصول على المزيد من المعلومات حول الوظائف المتاحة',
    contactUs: 'اتصل بنا',
    jobs: [
      {
        id: 1,
        title: 'عضو هيئة تدريس - علوم الحاسب',
        titleEn: 'Faculty Member - Computer Science',
        department: 'قسم علوم الحاسب',
        type: 'دوام كامل',
        location: 'أسيوط، مصر',
        description: 'نبحث عن عضو هيئة تدريس متميز للانضمام إلى قسم علوم الحاسب. المرشح المثالي يجب أن يكون لديه خبرة في التدريس والبحث العلمي.',
        requirements: ['درجة الدكتوراه في علوم الحاسب أو مجال ذي صلة', 'خبرة لا تقل عن 3 سنوات في التدريس الجامعي', 'سجل بحثي متميز مع نشر في مجلات علمية محكمة', 'إجادة اللغة الإنجليزية تحدثاً وكتابة', 'مهارات تواصل ممتازة'],
        responsibilities: ['تدريس المقررات الدراسية في مجال التخصص', 'إجراء البحوث العلمية والنشر في المجلات المحكمة', 'الإشراف على رسائل الماجستير والدكتوراه', 'المشاركة في الأنشطة الأكاديمية والإدارية للقسم', 'تطوير المناهج الدراسية'],
        deadline: '2025-01-31', status: 'open' as const,
      },
      {
        id: 2,
        title: 'عضو هيئة تدريس - هندسة البرمجيات',
        titleEn: 'Faculty Member - Software Engineering',
        department: 'قسم هندسة البرمجيات',
        type: 'دوام كامل',
        location: 'أسيوط، مصر',
        description: 'فرصة للانضمام إلى قسم هندسة البرمجيات كعضو هيئة تدريس. نبحث عن متخصصين في تطوير البرمجيات وإدارة المشاريع.',
        requirements: ['درجة الدكتوراه في هندسة البرمجيات أو علوم الحاسب', 'خبرة عملية في تطوير البرمجيات', 'معرفة بمنهجيات Agile و DevOps', 'خبرة في التدريس الجامعي', 'القدرة على التدريس باللغتين العربية والإنجليزية'],
        responsibilities: ['تدريس مقررات هندسة البرمجيات', 'الإشراف على مشاريع التخرج', 'إجراء البحوث في مجال هندسة البرمجيات', 'التعاون مع الصناعة لتطوير المناهج', 'المشاركة في الأنشطة الأكاديمية'],
        deadline: '2025-02-15', status: 'open' as const,
      },
      {
        id: 3,
        title: 'معيد - الذكاء الاصطناعي',
        titleEn: 'Teaching Assistant - Artificial Intelligence',
        department: 'قسم الذكاء الاصطناعي',
        type: 'دوام كامل',
        location: 'أسيوط، مصر',
        description: 'فرصة للخريجين المتميزين للعمل كمعيد في قسم الذكاء الاصطناعي والبدء في مسيرة أكاديمية.',
        requirements: ['درجة البكالوريوس بتقدير امتياز في الحاسبات أو الذكاء الاصطناعي', 'معدل تراكمي لا يقل عن 3.7', 'مهارات برمجية قوية في Python و TensorFlow', 'معرفة بالتعلم الآلي والتعلم العميق', 'رغبة في استكمال الدراسات العليا'],
        responsibilities: ['مساعدة أعضاء هيئة التدريس في المحاضرات والمعامل', 'تصحيح الامتحانات والواجبات', 'الإشراف على المعامل العملية', 'مساعدة الطلاب في المشاريع', 'المشاركة في البحث العلمي'],
        deadline: '2025-01-20', status: 'open' as const,
      },
      {
        id: 4,
        title: 'مدير شؤون الطلاب',
        titleEn: 'Student Affairs Manager',
        department: 'الشؤون الإدارية',
        type: 'دوام كامل',
        location: 'أسيوط، مصر',
        description: 'نبحث عن مدير متمرس لإدارة شؤون الطلاب والإشراف على الخدمات الطلابية.',
        requirements: ['درجة البكالوريوس في الإدارة أو مجال ذي صلة', 'خبرة لا تقل عن 5 سنوات في الإدارة الجامعية', 'مهارات قيادية وتنظيمية ممتازة', 'إجادة استخدام الحاسب الآلي', 'القدرة على التعامل مع الطلاب وحل المشكلات'],
        responsibilities: ['إدارة قسم شؤون الطلاب', 'الإشراف على عمليات التسجيل والقبول', 'متابعة الشكاوى والاستفسارات الطلابية', 'تنظيم الأنشطة الطلابية', 'إعداد التقارير الإدارية'],
        deadline: '2025-02-01', status: 'open' as const,
      },
    ],
  },
  en: {
    title: 'Careers & Opportunities',
    subtitle: 'Join the Faculty of Computers and Information team and be part of a journey of excellence',
    availableJobs: 'Available Jobs',
    departments: 'Departments',
    whyJoin: 'Why Join Us?',
    whyJoinDesc: 'The Faculty of Computers and Information provides a distinguished work environment that combines education, scientific research, and community service.',
    benefits: [
      { title: 'Distinguished Academic Environment', desc: 'Opportunity to work in a modern and advanced educational environment' },
      { title: 'Research Support',                   desc: 'Advanced research facilities and support for scientific publishing' },
      { title: 'Competitive Benefits',               desc: 'Competitive salaries, benefits, and professional development opportunities' },
    ],
    availableTitle: 'Available Positions',
    statusOpen: 'Open',
    deadline: 'Deadline:',
    viewApply: 'View Details & Apply',
    noJobs: 'No positions available at the moment',
    noJobsDesc: 'Please check back later or contact us for inquiries',
    jobDesc: 'Job Description',
    requirements: 'Requirements',
    responsibilities: 'Responsibilities',
    applyNow: 'Apply Now',
    close: 'Close',
    ctaTitle: 'Have a question?',
    ctaSubtitle: 'Contact us for more information about available positions',
    contactUs: 'Contact Us',
    jobs: [
      {
        id: 1,
        title: 'Faculty Member - Computer Science',
        titleEn: 'Faculty Member - Computer Science',
        department: 'Computer Science Department',
        type: 'Full Time',
        location: 'Assiut, Egypt',
        description: 'We are looking for a distinguished faculty member to join the Computer Science department. The ideal candidate should have experience in teaching and scientific research.',
        requirements: ['PhD in Computer Science or related field', 'At least 3 years of university teaching experience', 'Distinguished research record with publications in peer-reviewed journals', 'Proficiency in English (spoken and written)', 'Excellent communication skills'],
        responsibilities: ['Teaching courses in the area of specialization', 'Conducting scientific research and publishing in peer-reviewed journals', 'Supervising Master\'s and PhD theses', 'Participating in academic and administrative activities', 'Developing curricula'],
        deadline: '2025-01-31', status: 'open' as const,
      },
      {
        id: 2,
        title: 'Faculty Member - Software Engineering',
        titleEn: 'Faculty Member - Software Engineering',
        department: 'Software Engineering Department',
        type: 'Full Time',
        location: 'Assiut, Egypt',
        description: 'An opportunity to join the Software Engineering department as a faculty member. We are looking for specialists in software development and project management.',
        requirements: ['PhD in Software Engineering or Computer Science', 'Practical experience in software development', 'Knowledge of Agile and DevOps methodologies', 'University teaching experience', 'Ability to teach in both Arabic and English'],
        responsibilities: ['Teaching software engineering courses', 'Supervising graduation projects', 'Conducting research in software engineering', 'Collaborating with industry to develop curricula', 'Participating in academic activities'],
        deadline: '2025-02-15', status: 'open' as const,
      },
      {
        id: 3,
        title: 'Teaching Assistant - Artificial Intelligence',
        titleEn: 'Teaching Assistant - Artificial Intelligence',
        department: 'Artificial Intelligence Department',
        type: 'Full Time',
        location: 'Assiut, Egypt',
        description: 'An opportunity for outstanding graduates to work as a teaching assistant in the Artificial Intelligence department and begin an academic career.',
        requirements: ['Bachelor\'s degree with Distinction in Computers or AI', 'GPA of at least 3.7', 'Strong programming skills in Python and TensorFlow', 'Knowledge of machine learning and deep learning', 'Desire to pursue postgraduate studies'],
        responsibilities: ['Assisting faculty members in lectures and labs', 'Grading exams and assignments', 'Supervising practical labs', 'Helping students with projects', 'Participating in scientific research'],
        deadline: '2025-01-20', status: 'open' as const,
      },
      {
        id: 4,
        title: 'Student Affairs Manager',
        titleEn: 'Student Affairs Manager',
        department: 'Administrative Affairs',
        type: 'Full Time',
        location: 'Assiut, Egypt',
        description: 'We are looking for an experienced manager to oversee student affairs and student services.',
        requirements: ['Bachelor\'s degree in Administration or related field', 'At least 5 years of university administration experience', 'Excellent leadership and organizational skills', 'Computer proficiency', 'Ability to deal with students and solve problems'],
        responsibilities: ['Managing the student affairs department', 'Overseeing registration and admission processes', 'Following up on student complaints and inquiries', 'Organizing student activities', 'Preparing administrative reports'],
        deadline: '2025-02-01', status: 'open' as const,
      },
    ],
  },
};

type Job = typeof i18n.ar.jobs[0];

export default function CareersPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const tx  = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t    = dark ? darkTheme : theme;
  const bg1  = dark ? darkTheme.background  : theme.background;
  const bg2  = dark ? darkTheme.surface     : theme.surface;
  const card = dark ? darkTheme.surface     : theme.white;
  const bdr  = dark ? darkTheme.border      : theme.border;
  const bdrL = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text    : theme.text;

  const openJobs = tx.jobs.filter(j => j.status === 'open');

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col transition-colors duration-300`}
      style={{ background: bg1 }} dir={dir}><section className="py-20 px-4" style={{ background: heroBg }}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: heroText }}>{tx.title}</h1>
            <p className="text-xl mb-6 font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.subtitle}</p>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
              <div className="px-6 py-3 rounded-2xl border" style={{ background: iconBg, borderColor: bdrL }}>
                <div className="text-2xl font-extrabold" style={{ color: t.text }}>{openJobs.length}</div>
                <div className="font-semibold" style={{ color: t.textMuted }}>{tx.availableJobs}</div>
              </div>
              <div className="px-6 py-3 rounded-2xl border" style={{ background: iconBg, borderColor: bdrL }}>
                <div className="text-2xl font-extrabold" style={{ color: t.text }}>4</div>
                <div className="font-semibold" style={{ color: t.textMuted }}>{tx.departments}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12" style={{ background: bg2 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold mb-4" style={{ color: t.text }}>{tx.whyJoin}</h2>
              <p className="text-lg leading-relaxed font-medium" style={{ color: t.textMuted }}>{tx.whyJoinDesc}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {tx.benefits.map((item, i) => (
                <div key={i} className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: card, borderColor: bdr }}>
                  <div className="h-1" style={{ background: t.primary }} />
                  <div className="p-6 text-center">
                    <div className="text-4xl font-black tabular-nums mb-3" style={{ color: t.primary }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-base font-extrabold mb-2" style={{ color: t.text }}>{item.title}</h3>
                    <p className="text-sm font-medium" style={{ color: t.textMuted }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12" style={{ background: bg1 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-center" style={{ color: t.text }}>{tx.availableTitle}</h2>
            {openJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {openJobs.map((job) => (
                  <div key={job.id} className="rounded-2xl border overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                    style={{ background: card, borderColor: bdr }} onClick={() => setSelectedJob(job)}>
                    <div className="h-1" style={{ background: t.primary }} />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div>
                          <h3 className="text-xl font-extrabold mb-1" style={{ color: t.text }}>{job.title}</h3>
                          <p className="text-sm font-semibold" style={{ color: t.textMuted }}>{job.titleEn}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                          style={{ background: dark ? '#1A3A1A' : '#DCFCE7', color: dark ? '#4ADE80' : '#166534' }}>
                          {tx.statusOpen}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {[job.department, job.type, job.location, `${tx.deadline} ${job.deadline}`].map((val, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm font-medium" style={{ color: t.text }}>
                            <span style={{ color: t.primary }} className="font-bold shrink-0">·</span>
                            <span>{val}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm mb-4 line-clamp-2 font-medium" style={{ color: t.textMuted }}>{job.description}</p>
                      <button className="w-full py-2 rounded-2xl font-extrabold transition-all hover:opacity-90"
                        style={{ background: t.primary, color: heroText }}>
                        {tx.viewApply}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl p-12 text-center border" style={{ background: card, borderColor: bdr }}>
                <p className="text-xl font-semibold mb-2" style={{ color: t.text }}>{tx.noJobs}</p>
                <p className="font-medium" style={{ color: t.textMuted }}>{tx.noJobsDesc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}>
          <div className="rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{ background: card }} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 p-6 rounded-t-2xl" style={{ background: heroBg }}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold mb-1" style={{ color: heroText }}>{selectedJob.title}</h2>
                  <p className="font-semibold" style={{ color: heroText, opacity: 0.85 }}>{selectedJob.titleEn}</p>
                </div>
                <button onClick={() => setSelectedJob(null)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:opacity-80 text-xl font-bold"
                  style={{ background: iconBg, borderColor: bdrL, color: t.text }} aria-label="close">
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[selectedJob.department, selectedJob.type, selectedJob.location, `${tx.deadline} ${selectedJob.deadline}`].map((val, i) => (
                  <div key={i} className="flex items-center gap-2 font-medium" style={{ color: t.text }}>
                    <span style={{ color: t.primary }} className="font-bold shrink-0">·</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-3" style={{ color: t.text }}>{tx.jobDesc}</h3>
                <p className="leading-relaxed font-medium" style={{ color: t.textMuted }}>{selectedJob.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-3" style={{ color: t.text }}>{tx.requirements}</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 font-medium" style={{ color: t.text }}>
                      <span style={{ color: t.primary }} className="font-bold mt-0.5 shrink-0">·</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-3" style={{ color: t.text }}>{tx.responsibilities}</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 font-medium" style={{ color: t.text }}>
                      <span style={{ color: t.primary }} className="font-bold mt-0.5 shrink-0">·</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href="/contact"
                  className="flex-1 min-w-[200px] py-3 rounded-2xl text-center font-extrabold transition-all hover:opacity-90"
                  style={{ background: t.primary, color: heroText }}>
                  {tx.applyNow}
                </Link>
                <button onClick={() => setSelectedJob(null)}
                  className="flex-1 min-w-[200px] py-3 rounded-2xl font-extrabold transition-all border hover:opacity-80"
                  style={{ background: iconBg, color: t.text, borderColor: bdrL }}>
                  {tx.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      <section className="py-12" style={{ background: heroBg }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: heroText }}>{tx.ctaTitle}</h2>
            <p className="text-xl mb-6 font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.ctaSubtitle}</p>
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl font-extrabold transition-all hover:opacity-90"
              style={{ background: dark ? darkTheme.background : theme.text, color: dark ? darkTheme.primary : theme.white }}>
              {tx.contactUs}
            </Link>
          </div>
        </div>
      </section></div>
  );
}
