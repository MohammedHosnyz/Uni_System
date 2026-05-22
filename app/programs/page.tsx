'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Layers,
  FileText,
  CheckCircle
} from 'lucide-react';

const i18n = {
  ar: {
    hero: {
      title: 'البرامج الأكاديمية',
      subtitle: 'برامج بكالوريوس متميزة في مجالات الحاسبات والمعلومات',
    },
    degrees: {
      title: 'الدرجات العلمية',
      subtitle: 'تمنح الكلية درجة البكالوريوس في أربعة تخصصات رئيسية، مع إمكانية اختيار تخصص فرعي بعد إتمام 72 ساعة معتمدة',
    },
    stats: [
      { number: '4',   label: 'برامج بكالوريوس', icon: Layers },
      { number: '144', label: 'ساعة معتمدة', icon: Clock },
      { number: '4',   label: 'سنوات دراسية', icon: GraduationCap },
    ],
    mainProgramsTitle: 'البرامج الرئيسية',
    mainCourses: 'المقررات الرئيسية',
    careerOpportunities: 'فرص العمل',
    programs: [
      {
        code: 'CS',
        title: 'بكالوريوس علوم الحاسب', titleEn: 'Bachelor of Computer Science',
        description: 'برنامج متخصص في علوم الحاسب النظرية والتطبيقية، يغطي الخوارزميات والبرمجة وقواعد البيانات والشبكات وأمن المعلومات.',
        duration: '4 سنوات (8 فصول دراسية)', credits: '144 ساعة معتمدة',
        features: ['الخوارزميات وهياكل البيانات', 'البرمجة المتقدمة', 'قواعد البيانات', 'نظم التشغيل', 'الشبكات والاتصالات', 'أمن المعلومات والتشفير', 'الحوسبة السحابية', 'تطوير التطبيقات'],
        careers: ['مطور برمجيات', 'مهندس قواعد بيانات', 'مهندس أمن معلومات', 'مطور تطبيقات', 'مهندس شبكات', 'مهندس حوسبة سحابية'],
      },
      {
        code: 'SE',
        title: 'بكالوريوس هندسة البرمجيات', titleEn: 'Bachelor of Software Engineering',
        description: 'برنامج متخصص في تطوير وإدارة المشاريع البرمجية، يركز على منهجيات التطوير الحديثة وضمان الجودة وإدارة دورة حياة البرمجيات.',
        duration: '4 سنوات (8 فصول دراسية)', credits: '144 ساعة معتمدة',
        features: ['تحليل وتصميم النظم', 'هندسة المتطلبات', 'إدارة المشاريع البرمجية', 'ضمان الجودة والاختبار', 'DevOps و CI/CD', 'الأنماط التصميمية', 'تطوير الويب والموبايل', 'الأمن البرمجي'],
        careers: ['مهندس برمجيات', 'مدير مشاريع تقنية', 'مهندس DevOps', 'مهندس ضمان جودة', 'مهندس متطلبات', 'مهندس معمارية البرمجيات'],
      },
      {
        code: 'AI',
        title: 'بكالوريوس الذكاء الاصطناعي', titleEn: 'Bachelor of Artificial Intelligence',
        description: 'برنامج متخصص في تقنيات الذكاء الاصطناعي والتعلم الآلي، يغطي الشبكات العصبية ومعالجة اللغات الطبيعية والرؤية الحاسوبية.',
        duration: '4 سنوات (8 فصول دراسية)', credits: '144 ساعة معتمدة',
        features: ['التعلم الآلي', 'التعلم العميق', 'معالجة اللغات الطبيعية', 'الرؤية الحاسوبية', 'الشبكات العصبية', 'تعلم التعزيز', 'علم البيانات', 'الروبوتيات الذكية'],
        careers: ['مهندس ذكاء اصطناعي', 'عالم بيانات', 'مهندس تعلم آلي', 'باحث في الذكاء الاصطناعي', 'مهندس رؤية حاسوبية', 'مهندس معالجة لغات'],
      },
      {
        code: 'IS',
        title: 'بكالوريوس نظم المعلومات', titleEn: 'Bachelor of Information Systems',
        description: 'برنامج يجمع بين تقنية المعلومات وإدارة الأعمال، يركز على تصميم وتطوير وإدارة أنظمة المعلومات لدعم اتخاذ القرارات في المؤسسات.',
        duration: '4 سنوات (8 فصول دراسية)', credits: '144 ساعة معتمدة',
        features: ['تحليل وتصميم النظم', 'إدارة قواعد البيانات', 'نظم دعم القرار', 'تخطيط موارد المؤسسات (ERP)', 'إدارة المشاريع التقنية', 'أمن نظم المعلومات', 'ذكاء الأعمال', 'التجارة الإلكترونية'],
        careers: ['محلل نظم معلومات', 'مدير نظم معلومات', 'مستشار تقنية معلومات', 'محلل بيانات أعمال', 'مدير مشاريع تقنية', 'أخصائي ذكاء أعمال'],
      },
    ],
    minor: {
      title: 'التخصص الفرعي',
      subtitle: 'يمكن للطالب اختيار تخصص فرعي إضافي بعد إتمام 72 ساعة معتمدة (15 ساعة إضافية)',
      hoursLabel: '15 ساعة معتمدة',
      items: [
        { title: 'علوم الحاسب',       code: 'CS Minor' },
        { title: 'هندسة البرمجيات',   code: 'SE Minor' },
        { title: 'الذكاء الاصطناعي', code: 'AI Minor' },
        { title: 'نظم المعلومات',     code: 'IS Minor' },
      ],
    },
    admission: {
      title: 'شروط القبول',
      items: [
        { title: 'الثانوية العامة', description: 'شعبة رياضيات طبقاً لقواعد مكتب التنسيق' },
        { title: 'الحد الأدنى',     description: 'حسب تنسيق القبول المعلن سنوياً' },
        { title: 'المستندات',       description: 'شهادة الثانوية + صور شخصية + بطاقة الرقم القومي' },
      ],
    },
    cta: {
      title: 'ابدأ رحلتك الأكاديمية',
      subtitle: 'اختر البرنامج المناسب لك وانضم إلى كلية الحاسبات والمعلومات',
      login: 'تسجيل الدخول',
      inquire: 'استفسر الآن',
    },
  },
  en: {
    hero: {
      title: 'Academic Programs',
      subtitle: "Distinguished bachelor's programs in computers and information fields",
    },
    degrees: {
      title: 'Academic Degrees',
      subtitle: "The faculty grants bachelor's degrees in four main specializations, with the option to choose a minor after completing 72 credit hours",
    },
    stats: [
      { number: '4',   label: 'Bachelor Programs', icon: Layers },
      { number: '144', label: 'Credit Hours', icon: Clock },
      { number: '4',   label: 'Academic Years', icon: GraduationCap },
    ],
    mainProgramsTitle: 'Main Programs',
    mainCourses: 'Main Courses',
    careerOpportunities: 'Career Opportunities',
    programs: [
      {
        code: 'CS',
        title: 'Bachelor of Computer Science', titleEn: 'Computer Science',
        description: 'A specialized program in theoretical and applied computer science, covering algorithms, programming, databases, networks, and information security.',
        duration: '4 Years (8 Semesters)', credits: '144 Credit Hours',
        features: ['Algorithms & Data Structures', 'Advanced Programming', 'Databases', 'Operating Systems', 'Networks & Communications', 'Information Security & Cryptography', 'Cloud Computing', 'Application Development'],
        careers: ['Software Developer', 'Database Engineer', 'Information Security Engineer', 'Application Developer', 'Network Engineer', 'Cloud Engineer'],
      },
      {
        code: 'SE',
        title: 'Bachelor of Software Engineering', titleEn: 'Software Engineering',
        description: 'A specialized program in software development and project management, focusing on modern development methodologies, quality assurance, and software lifecycle management.',
        duration: '4 Years (8 Semesters)', credits: '144 Credit Hours',
        features: ['Systems Analysis & Design', 'Requirements Engineering', 'Software Project Management', 'Quality Assurance & Testing', 'DevOps & CI/CD', 'Design Patterns', 'Web & Mobile Development', 'Software Security'],
        careers: ['Software Engineer', 'Technical Project Manager', 'DevOps Engineer', 'QA Engineer', 'Requirements Engineer', 'Software Architect'],
      },
      {
        code: 'AI',
        title: 'Bachelor of Artificial Intelligence', titleEn: 'Artificial Intelligence',
        description: 'A specialized program in AI and machine learning technologies, covering neural networks, natural language processing, and computer vision.',
        duration: '4 Years (8 Semesters)', credits: '144 Credit Hours',
        features: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Neural Networks', 'Reinforcement Learning', 'Data Science', 'Intelligent Robotics'],
        careers: ['AI Engineer', 'Data Scientist', 'Machine Learning Engineer', 'AI Researcher', 'Computer Vision Engineer', 'NLP Engineer'],
      },
      {
        code: 'IS',
        title: 'Bachelor of Information Systems', titleEn: 'Information Systems',
        description: 'A program combining information technology and business management, focusing on designing, developing, and managing information systems to support decision-making.',
        duration: '4 Years (8 Semesters)', credits: '144 Credit Hours',
        features: ['Systems Analysis & Design', 'Database Management', 'Decision Support Systems', 'Enterprise Resource Planning (ERP)', 'Technical Project Management', 'Information Systems Security', 'Business Intelligence', 'E-Commerce'],
        careers: ['Information Systems Analyst', 'Information Systems Manager', 'IT Consultant', 'Business Data Analyst', 'Technical Project Manager', 'Business Intelligence Specialist'],
      },
    ],
    minor: {
      title: 'Minor Specialization',
      subtitle: 'Students can choose an additional minor specialization after completing 72 credit hours (15 additional hours)',
      hoursLabel: '15 Credit Hours',
      items: [
        { title: 'Computer Science',       code: 'CS Minor' },
        { title: 'Software Engineering',   code: 'SE Minor' },
        { title: 'Artificial Intelligence', code: 'AI Minor' },
        { title: 'Information Systems',    code: 'IS Minor' },
      ],
    },
    admission: {
      title: 'Admission Requirements',
      items: [
        { title: 'High School',    description: 'Mathematics track according to the coordination office rules' },
        { title: 'Minimum Score',  description: 'According to the annually announced admission coordination' },
        { title: 'Documents',      description: 'High school certificate + personal photos + national ID card' },
      ],
    },
    cta: {
      title: 'Start Your Academic Journey',
      subtitle: 'Choose the right program for you and join the Faculty of Computers and Information',
      login: 'Login',
      inquire: 'Inquire Now',
    },
  },
} as const;

const PageHero = ({ title, subtitle }: any) => (
  <section className="bg-stone-900 py-20 mb-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
    </div>
  </section>
);

export default function ProgramsPage() {
  const { locale } = useTranslations();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;

  return (
    <>
      <PageHero title={tx.hero.title} subtitle={tx.hero.subtitle} />

      {/* Degrees & Stats */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">{tx.degrees.title}</h2>
            <p className="text-lg max-w-3xl mx-auto font-medium text-stone-500">{tx.degrees.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tx.stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border-0 bg-stone-50 p-8 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 mb-5">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-4xl font-black mb-2 text-[#FABA19] tabular-nums">{s.number}</div>
                  <div className="text-sm font-bold text-stone-500">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{tx.mainProgramsTitle}</h2>
          <div className="space-y-12">
            {tx.programs.map((p) => (
              <div key={p.code} className="rounded-2xl border-0 bg-white shadow-sm overflow-hidden group hover:shadow-md transition-all">
                <div className="p-8 bg-stone-900 border-b-4 border-[#FABA19]">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl font-black text-2xl tracking-widest bg-stone-800 text-[#FABA19] border border-stone-700 shadow-inner">
                      {p.code}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-1 text-white">{p.title}</h3>
                      <p className="text-lg font-medium text-white/70">{p.titleEn}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="lg:w-1/3 shrink-0">
                      <p className="text-lg mb-6 leading-relaxed font-medium text-stone-600">{p.description}</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm font-semibold text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                          <Clock className="h-5 w-5 text-[#FABA19]" />
                          <span>{p.duration}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-semibold text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                          <GraduationCap className="h-5 w-5 text-[#FABA19]" />
                          <span>{p.credits}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:block w-px self-stretch bg-stone-100" />

                    {/* Right Columns */}
                    <div className="flex-1 grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-5 text-lg text-stone-800 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-[#FABA19]" />
                          {tx.mainCourses}
                        </h4>
                        <ul className="space-y-3">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 font-medium text-stone-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                              <span className="leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold mb-5 text-lg text-stone-800 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-[#FABA19]" />
                          {tx.careerOpportunities}
                        </h4>
                        <ul className="space-y-3">
                          {p.careers.map((c) => (
                            <li key={c} className="flex items-start gap-3 font-medium text-stone-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                              <span className="leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">{tx.minor.title}</h2>
            <p className="text-lg max-w-3xl mx-auto font-medium text-stone-500">{tx.minor.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tx.minor.items.map((m) => (
              <div key={m.code} className="rounded-2xl border-0 bg-stone-50 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all text-center p-8">
                <div className="inline-flex items-center justify-center h-8 px-3 rounded-lg font-black text-xs tracking-widest mb-5 bg-white text-stone-800 border border-stone-200 shadow-sm">
                  {m.code}
                </div>
                <h3 className="text-base font-bold mb-4 text-stone-800">{m.title}</h3>
                <Separator className="mb-4 bg-stone-200" />
                <span className="text-xs font-bold text-[#FABA19]">{tx.minor.hoursLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{tx.admission.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tx.admission.items.map((item, idx) => (
              <div key={item.title} className="rounded-2xl border-0 bg-white p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FABA19]" />
                <div className="text-4xl font-black mb-4 text-[#FABA19] opacity-30">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold mb-3 text-stone-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#FABA19]" />
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{tx.cta.title}</h2>
          <p className="text-xl mb-10 font-medium text-white/80">{tx.cta.subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/login">{tx.cta.login}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/contact">{tx.cta.inquire}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
