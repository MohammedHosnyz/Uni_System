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
  Mail, 
  Phone, 
  GraduationCap, 
  Clock, 
  Layers 
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الأقسام العلمية',
    subtitle: 'تعرف على الأقسام العلمية في كلية الحاسبات والمعلومات',
    overviewTitle: 'نظرة عامة',
    overviewSubtitle: 'تضم الكلية أربعة أقسام علمية متخصصة تغطي أبرز مجالات الحاسبات والمعلومات',
    stats: [
      { num: '4', label: 'أقسام علمية', icon: Layers },
      { num: '144', label: 'ساعة معتمدة', icon: Clock },
      { num: '4', label: 'سنوات دراسية', icon: GraduationCap },
    ],
    departments: [
      {
        code: 'CS',
        title: 'علوم الحاسب', titleEn: 'Computer Science',
        desc: 'يُعنى قسم علوم الحاسب بدراسة أسس الحوسبة والخوارزميات وهياكل البيانات وتطوير البرمجيات، ويهدف إلى إعداد متخصصين قادرين على حل المشكلات التقنية المعقدة.',
        areas: ['الخوارزميات وهياكل البيانات', 'البرمجة المتقدمة', 'قواعد البيانات', 'شبكات الحاسب', 'أمن المعلومات', 'الحوسبة السحابية', 'تطوير البرمجيات', 'نظم التشغيل'],
        careers: ['مطور برمجيات', 'مهندس نظم', 'محلل أمن معلومات', 'مهندس شبكات', 'مطور تطبيقات'],
      },
      {
        code: 'SE',
        title: 'هندسة البرمجيات', titleEn: 'Software Engineering',
        desc: 'يركز قسم هندسة البرمجيات على منهجيات تطوير البرمجيات وإدارة المشاريع التقنية وضمان الجودة، ويُعد الطلاب لقيادة فرق التطوير وبناء أنظمة برمجية موثوقة.',
        areas: ['هندسة المتطلبات', 'تصميم البرمجيات', 'اختبار البرمجيات', 'إدارة المشاريع', 'منهجيات Agile', 'DevOps', 'هندسة المعمارية', 'ضمان الجودة'],
        careers: ['مهندس برمجيات', 'مدير مشروع تقني', 'مهندس جودة', 'مهندس DevOps', 'مهندس معمارية أنظمة'],
      },
      {
        code: 'AI',
        title: 'الذكاء الاصطناعي', titleEn: 'Artificial Intelligence',
        desc: 'يتناول قسم الذكاء الاصطناعي تقنيات التعلم الآلي ومعالجة اللغات الطبيعية والرؤية الحاسوبية، ويُعد الطلاب للعمل في أحدث مجالات التكنولوجيا.',
        areas: ['التعلم الآلي', 'التعلم العميق', 'معالجة اللغات الطبيعية', 'الرؤية الحاسوبية', 'الروبوتات', 'علم البيانات', 'الشبكات العصبية', 'الذكاء الاصطناعي التوليدي'],
        careers: ['مهندس ذكاء اصطناعي', 'عالم بيانات', 'باحث تعلم آلي', 'مهندس NLP', 'مطور نماذج AI'],
      },
      {
        code: 'IS',
        title: 'نظم المعلومات', titleEn: 'Information Systems',
        desc: 'يركز قسم نظم المعلومات على تصميم وتطوير نظم المعلومات الإدارية، ويهدف إلى إعداد متخصصين قادرين على تحليل وتطوير الحلول المعلوماتية للمؤسسات.',
        areas: ['تحليل وتصميم النظم', 'قواعد البيانات المتقدمة', 'نظم المعلومات الإدارية', 'ذكاء الأعمال', 'إدارة المشاريع التقنية', 'نظم دعم القرار', 'التجارة الإلكترونية', 'أمن نظم المعلومات'],
        careers: ['محلل نظم', 'مطور نظم معلومات', 'مدير قواعد بيانات', 'مستشار نظم معلومات', 'محلل ذكاء أعمال'],
      },
    ],
    areasLabel: 'مجالات الدراسة:',
    careersLabel: 'المسارات المهنية:',
    contactTitle: 'تواصل مع الأقسام',
    contacts: [
      { code: 'CS', name: 'قسم علوم الحاسب', email: 'cs@aun.edu.eg', phone: '088-2411112' },
      { code: 'IS', name: 'قسم نظم المعلومات', email: 'is@aun.edu.eg', phone: '088-2411113' },
      { code: 'SE', name: 'قسم هندسة البرمجيات', email: 'se@aun.edu.eg', phone: '088-2411114' },
      { code: 'AI', name: 'قسم الذكاء الاصطناعي', email: 'ai@aun.edu.eg', phone: '088-2411115' },
    ],
    chooseTitle: 'اختر تخصصك المناسب',
    chooseSubtitle: 'استكشف البرامج الأكاديمية وابدأ رحلتك نحو مستقبل مشرق',
    programs: 'البرامج الأكاديمية',
    contact: 'اتصل بنا',
  },
  en: {
    title: 'Academic Departments',
    subtitle: 'Explore the academic departments at the Faculty of Computers and Information',
    overviewTitle: 'Overview',
    overviewSubtitle: 'The faculty comprises four specialized departments covering the most prominent fields of computers and information',
    stats: [
      { num: '4', label: 'Departments', icon: Layers },
      { num: '144', label: 'Credit Hours', icon: Clock },
      { num: '4', label: 'Academic Years', icon: GraduationCap },
    ],
    departments: [
      {
        code: 'CS',
        title: 'Computer Science', titleEn: 'Computer Science',
        desc: 'The Computer Science department focuses on the fundamentals of computing, algorithms, data structures, and software development, aiming to prepare specialists capable of solving complex technical problems.',
        areas: ['Algorithms & Data Structures', 'Advanced Programming', 'Databases', 'Computer Networks', 'Information Security', 'Cloud Computing', 'Software Development', 'Operating Systems'],
        careers: ['Software Developer', 'Systems Engineer', 'Security Analyst', 'Network Engineer', 'App Developer'],
      },
      {
        code: 'SE',
        title: 'Software Engineering', titleEn: 'Software Engineering',
        desc: 'The Software Engineering department focuses on software development methodologies, technical project management, and quality assurance, preparing students to lead development teams and build reliable software systems.',
        areas: ['Requirements Engineering', 'Software Design', 'Software Testing', 'Project Management', 'Agile Methodologies', 'DevOps', 'Software Architecture', 'Quality Assurance'],
        careers: ['Software Engineer', 'Technical Project Manager', 'QA Engineer', 'DevOps Engineer', 'Systems Architect'],
      },
      {
        code: 'AI',
        title: 'Artificial Intelligence', titleEn: 'Artificial Intelligence',
        desc: 'The Artificial Intelligence department covers machine learning, natural language processing, and computer vision technologies, preparing students to work in the latest fields of technology.',
        areas: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Robotics', 'Data Science', 'Neural Networks', 'Generative AI'],
        careers: ['AI Engineer', 'Data Scientist', 'ML Researcher', 'NLP Engineer', 'AI Model Developer'],
      },
      {
        code: 'IS',
        title: 'Information Systems', titleEn: 'Information Systems',
        desc: 'The Information Systems department focuses on designing and developing management information systems, aiming to prepare specialists capable of analyzing and developing information solutions for organizations.',
        areas: ['Systems Analysis & Design', 'Advanced Databases', 'Management Information Systems', 'Business Intelligence', 'Technical Project Management', 'Decision Support Systems', 'E-Commerce', 'IS Security'],
        careers: ['Systems Analyst', 'IS Developer', 'Database Administrator', 'IS Consultant', 'Business Intelligence Analyst'],
      },
    ],
    areasLabel: 'Study Areas:',
    careersLabel: 'Career Paths:',
    contactTitle: 'Contact Departments',
    contacts: [
      { code: 'CS', name: 'Computer Science Dept.', email: 'cs@aun.edu.eg', phone: '088-2411112' },
      { code: 'IS', name: 'Information Systems Dept.', email: 'is@aun.edu.eg', phone: '088-2411113' },
      { code: 'SE', name: 'Software Engineering Dept.', email: 'se@aun.edu.eg', phone: '088-2411114' },
      { code: 'AI', name: 'Artificial Intelligence Dept.', email: 'ai@aun.edu.eg', phone: '088-2411115' },
    ],
    chooseTitle: 'Choose Your Specialization',
    chooseSubtitle: 'Explore academic programs and start your journey towards a bright future',
    programs: 'Academic Programs',
    contact: 'Contact Us',
  },
};

const PageHero = ({ title, subtitle }: any) => (
  <section className="bg-stone-900 py-20 mb-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
    </div>
  </section>
);

export default function DepartmentsPage() {
  const { locale } = useTranslations();
  const tx = locale === 'en' ? i18n.en : i18n.ar;

  return (
    <>
      <PageHero title={tx.title} subtitle={tx.subtitle} />

      {/* Overview & Stats */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">{tx.overviewTitle}</h2>
            <p className="text-lg max-w-3xl mx-auto font-medium text-stone-500">{tx.overviewSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tx.stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border-0 bg-stone-50 p-8 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 mb-5">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-4xl font-black mb-2 text-[#FABA19] tabular-nums">{s.num}</div>
                  <div className="text-sm font-bold text-stone-500">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments Listing */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {tx.departments.map((dept) => (
              <div key={dept.code} className="rounded-2xl border-0 bg-white shadow-sm overflow-hidden group hover:shadow-md transition-all">
                <div className="p-8 bg-stone-900 border-b-4 border-[#FABA19]">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl font-black text-2xl tracking-widest bg-stone-800 text-[#FABA19] border border-stone-700 shadow-inner">
                      {dept.code}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-1 text-white">{dept.title}</h3>
                      <p className="text-lg font-medium text-white/70">{dept.titleEn}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg mb-8 leading-relaxed font-medium text-stone-600">{dept.desc}</p>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold mb-5 text-lg text-stone-800 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#FABA19]" />
                        {tx.areasLabel}
                      </h4>
                      <ul className="space-y-3">
                        {dept.areas.map((area, i) => (
                          <li key={i} className="flex items-start gap-3 font-medium text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                            <span className="leading-relaxed">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-5 text-lg text-stone-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#FABA19]" />
                        {tx.careersLabel}
                      </h4>
                      <ul className="space-y-3">
                        {dept.careers.map((career, i) => (
                          <li key={i} className="flex items-start gap-3 font-medium text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                            <span className="leading-relaxed">{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-stone-800">{tx.contactTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tx.contacts.map((c) => (
              <div key={c.code} className="rounded-2xl border-0 bg-stone-50 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FABA19]" />
                <div className="p-8">
                  <div className="inline-flex items-center justify-center h-10 px-4 rounded-lg font-black text-sm tracking-widest mb-5 bg-white text-stone-800 border border-stone-200 shadow-sm">
                    {c.code}
                  </div>
                  <h3 className="text-base font-bold mb-5 text-stone-800">{c.name}</h3>
                  <div className="space-y-3 text-sm font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4 text-[#FABA19]" />
                      <a href={`mailto:${c.email}`} className="text-stone-500 hover:text-[#FABA19] transition-colors">{c.email}</a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-[#FABA19]" />
                      <a href={`tel:${c.phone}`} className="text-stone-500 hover:text-[#FABA19] transition-colors">{c.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{tx.chooseTitle}</h2>
          <p className="text-xl mb-10 font-medium text-white/80">{tx.chooseSubtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/programs">{tx.programs}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/contact">{tx.contact}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
