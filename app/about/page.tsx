'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Rocket, 
  GraduationCap, 
  FlaskConical, 
  Briefcase, 
  Users, 
  Globe, 
  Handshake, 
  BookOpen, 
  Clock, 
  Calculator, 
  BookMarked, 
  Building2, 
  Wrench, 
  Puzzle, 
  ArrowUpRight
} from 'lucide-react';

const content = {
  ar: {
    hero: { badge: 'جامعة أسيوط الأهلية', title: 'عن الكلية', subtitle: 'كلية الحاسبات والمعلومات' },
    vision: { title: 'الرؤية', icon: Eye, content: 'تسعى الكلية إلى تحقيق التميز والابتكار في التعليم والبحث العلمي وخدمة المجتمع محليًا وإقليميًا، لتكون مركزًا رائدًا في مجال الحاسبات والمعلومات.' },
    mission: { title: 'الرسالة', icon: Rocket, content: 'تزويد الطلاب بالمعرفة والبحث العلمي في علوم الحاسب ونظم وتكنولوجيا المعلومات، وتطوير المناهج بما يواكب التطور العلمي واحتياجات سوق العمل.' },
    objectivesTitle: 'أهداف الكلية',
    objectives: [
      {icon: GraduationCap, title: 'إعداد الخريجين',   description: 'إعداد خريجين متخصصين قادرين على المنافسة محليًا وعالميًا' },
      {icon: FlaskConical, title: 'البحث العلمي',      description: 'إجراء البحوث والدراسات العلمية المتقدمة في مجالات التخصص' },
      {icon: Briefcase, title: 'الاستشارات',        description: 'تقديم الاستشارات للمؤسسات التي تستخدم التكنولوجيا' },
      {icon: Users, title: 'تدريب الكوادر',     description: 'تدريب الكوادر الفنية في قطاعات الدولة المختلفة' },
      {icon: Globe, title: 'خدمة المجتمع',      description: 'نشر الوعي التكنولوجي وخدمة المجتمع المحلي' },
      {icon: Handshake, title: 'التعاون الدولي',    description: 'عقد مؤتمرات علمية وتعاون دولي مع الجامعات العالمية' },
    ],
    deptsTitle: 'الأقسام العلمية',
    deptsSubtitle: 'تضم الكلية ثلاثة أقسام علمية متخصصة',
    areasLabel: 'مجالات التخصص',
    depts: [
      {code: 'CS', title: 'قسم علوم الحاسب',        titleEn: 'Computer Science Department',      areas: ['الخوارزميات وهياكل البيانات','البرمجة المتقدمة','قواعد البيانات','نظم التشغيل','الشبكات والاتصالات','أمن المعلومات','الحوسبة السحابية','تطبيقات الويب والموبايل'] },
      {code: 'SE', title: 'قسم هندسة البرمجيات',    titleEn: 'Software Engineering Department',  areas: ['تحليل وتصميم النظم','هندسة المتطلبات','إدارة المشاريع البرمجية','ضمان الجودة والاختبار','DevOps و CI/CD','الأنماط التصميمية','Agile و Scrum','صيانة البرمجيات'] },
      {code: 'AI', title: 'قسم الذكاء الاصطناعي',   titleEn: 'Artificial Intelligence Department', areas: ['التعلم الآلي','التعلم العميق','معالجة اللغات الطبيعية','الرؤية الحاسوبية','الشبكات العصبية','تعلم التعزيز','معالجة الصور','الروبوتات الذكية'] },
    ],
    studyTitle: 'نظام الدراسة',
    studyCards: [
      {icon: BookOpen, title: 'نظام الساعات المعتمدة', value: '144', unit: 'ساعة معتمدة',  desc: 'إجمالي الساعات المطلوبة للتخرج' },
      {icon: Clock, title: 'مدة الدراسة',           value: '4',   unit: 'سنوات',         desc: 'الحد الأدنى للتخرج (8 فصول دراسية)' },
      {icon: Calculator, title: 'المعدل التراكمي',       value: '2.0', unit: 'GPA',            desc: 'الحد الأدنى المطلوب للتخرج' },
    ],
    creditsTitle: 'توزيع الساعات المعتمدة',
    credits: [
      {icon: BookMarked, title: 'متطلبات عامة',          hours: 18,  },
      {icon: Building2, title: 'متطلبات الكلية',         hours: 71,  },
      {icon: GraduationCap, title: 'متطلبات التخصص',         hours: 42, },
      {icon: Wrench, title: 'التدريب والمشروعات',     hours: 14,  },
      {icon: Puzzle, title: 'التخصص الفرعي',          hours: 15, },
    ],
    levelsTitle: 'المستويات الأكاديمية',
    levels: [
      { level: '1', nameAr: 'المستوى الأول',   nameEn: 'Freshman',   credits: '0 – 35 ساعة' },
      { level: '2', nameAr: 'المستوى الثاني',  nameEn: 'Sophomore',  credits: '36 – 71 ساعة' },
      { level: '3',   nameAr: 'المستوى الثالث',  nameEn: 'Junior',     credits: '72 – 107 ساعة' },
      { level: '4',   nameAr: 'المستوى الرابع',  nameEn: 'Senior',     credits: '108 – 144 ساعة' },
    ],
    cta: { title: 'انضم إلينا اليوم', subtitle: 'كن جزءًا من مستقبل التكنولوجيا والابتكار', login: 'تسجيل الدخول', contact: 'تواصل معنا' },
  },
  en: {
    hero: { badge: 'Assiut National University', title: 'About the Faculty', subtitle: 'Faculty of Computers & Information' },
    vision: { title: 'Vision', icon: Eye, content: 'The faculty strives for excellence and innovation in education, scientific research, and community service locally and regionally, to become a leading center in the field of computers and information.' },
    mission: { title: 'Mission', icon: Rocket, content: 'Providing students with knowledge and scientific research in computer science, information systems, and technology, while developing curricula that keep pace with scientific advancement and labor market needs.' },
    objectivesTitle: 'Faculty Objectives',
    objectives: [
      { icon: GraduationCap,     title: 'Graduate Preparation', description: 'Preparing specialized graduates capable of competing locally and globally' },
      { icon: FlaskConical,    title: 'Scientific Research',  description: 'Conducting advanced scientific research and studies in specialized fields' },
      { icon: Briefcase,       title: 'Consulting',           description: 'Providing consulting services to technology-using institutions' },
      { icon: Users,     title: 'Staff Training',       description: 'Training technical staff in various state sectors' },
      { icon: Globe,     title: 'Community Service',    description: 'Spreading technological awareness and serving the local community' },
      { icon: Handshake,  title: 'International Cooperation', description: 'Organizing scientific conferences and international cooperation with global universities' },
    ],
    deptsTitle: 'Academic Departments',
    deptsSubtitle: 'The faculty includes three specialized academic departments',
    areasLabel: 'Specialization Areas',
    depts: [
      { code: 'CS', title: 'Computer Science Dept.',        titleEn: 'Computer Science Department',      areas: ['Algorithms & Data Structures','Advanced Programming','Databases','Operating Systems','Networks & Communications','Information Security','Cloud Computing','Web & Mobile Applications'] },
      { code: 'SE', title: 'Software Engineering Dept.',    titleEn: 'Software Engineering Department',  areas: ['Systems Analysis & Design','Requirements Engineering','Software Project Management','Quality Assurance & Testing','DevOps & CI/CD','Design Patterns','Agile & Scrum','Software Maintenance'] },
      { code: 'AI', title: 'Artificial Intelligence Dept.', titleEn: 'Artificial Intelligence Department', areas: ['Machine Learning','Deep Learning','Natural Language Processing','Computer Vision','Neural Networks','Reinforcement Learning','Image Processing','Intelligent Robotics'] },
    ],
    studyTitle: 'Study System',
    studyCards: [
      { icon: BookOpen, title: 'Credit Hour System', value: '144', unit: 'Credit Hours', desc: 'Total hours required for graduation' },
      { icon: Clock,       title: 'Study Duration',     value: '4',   unit: 'Years',        desc: 'Minimum to graduate (8 semesters)' },
      { icon: Calculator,         title: 'Cumulative GPA',     value: '2.0', unit: 'GPA',          desc: 'Minimum required for graduation' },
    ],
    creditsTitle: 'Credit Hours Distribution',
    credits: [
      { icon: BookMarked,  title: 'General Requirements',    hours: 18 },
      { icon: Building2,  title: 'Faculty Requirements',    hours: 71 },
      { icon: GraduationCap,     title: 'Major Requirements',      hours: 42 },
      { icon: Wrench,   title: 'Training & Projects',     hours: 14 },
      { icon: Puzzle,   title: 'Minor Specialization',    hours: 15 },
    ],
    levelsTitle: 'Academic Levels',
    levels: [
      { level: '1', nameAr: 'Level 1', nameEn: 'Freshman',  credits: '0 – 35 Hours' },
      { level: '2', nameAr: 'Level 2', nameEn: 'Sophomore', credits: '36 – 71 Hours' },
      { level: '3', nameAr: 'Level 3', nameEn: 'Junior',    credits: '72 – 107 Hours' },
      { level: '4', nameAr: 'Level 4', nameEn: 'Senior',    credits: '108 – 144 Hours' },
    ],
    cta: { title: 'Join Us Today', subtitle: 'Be part of the future of technology and innovation', login: 'Login', contact: 'Contact Us' },
  },
};

const PageHero = ({ title, subtitle, badge }: any) => (
  <section className="bg-stone-900 py-20 mb-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FABA19]/10 text-[#FABA19] font-bold text-sm mb-6 border border-[#FABA19]/20">
          {badge}
        </span>
      )}
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
    </div>
  </section>
);

export default function AboutPage() {
  const { locale } = useTranslations();
  const c = locale === 'en' ? content.en : content.ar;

  return (
    <>
      <PageHero badge={c.hero.badge} title={c.hero.title} subtitle={c.hero.subtitle} />

      {/* Vision & Mission */}
      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-7">
          {[c.vision, c.mission].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-lg transition-shadow border-0 bg-stone-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <Icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl text-stone-800">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-stone-200" />
                  <p className="leading-relaxed font-medium text-stone-600">{item.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{c.objectivesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.objectives.map((obj) => {
              const Icon = obj.icon;
              return (
                <Card key={obj.title} className="hover:shadow-lg transition-shadow border-0 bg-white group">
                  <CardContent className="pt-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 mb-5 group-hover:bg-[#FABA19] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6 text-stone-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-stone-800">{obj.title}</h3>
                    <p className="text-sm leading-relaxed font-medium text-stone-500">{obj.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">{c.deptsTitle}</h2>
            <p className="text-lg font-medium text-stone-500">{c.deptsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {c.depts.map((dept) => (
              <div
                key={dept.code}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-stone-50 border-0"
              >
                <div className="h-1 bg-[#FABA19]" />
                <div className="px-6 pt-8 pb-4 text-center">
                  <span className="inline-block font-black text-xs px-3 py-1.5 rounded-lg bg-white border shadow-sm mb-4 text-stone-800 tracking-widest">
                    {dept.code}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-stone-800">{dept.title}</h3>
                  <p className="text-xs font-semibold text-stone-500">{dept.titleEn}</p>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-xs font-bold uppercase tracking-wider mb-4 text-center text-stone-400">{c.areasLabel}</p>
                  <div className="grid gap-2">
                    {dept.areas.slice(0, 4).map((area) => (
                      <div key={area} className="flex items-center gap-2 text-xs font-medium rounded-lg px-3 py-2 bg-white border border-stone-100 text-stone-600">
                        <ArrowUpRight className="h-3 w-3 text-[#FABA19]" />
                        <span className="truncate">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study System */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{c.studyTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {c.studyCards.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative overflow-hidden rounded-2xl border-0 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <Icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <p className="text-sm font-bold text-stone-600">{s.title}</p>
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-black tabular-nums leading-none text-[#FABA19]">{s.value}</span>
                    <span className="text-sm font-bold mb-1 text-stone-400">{s.unit}</span>
                  </div>
                  <p className="text-sm font-medium text-stone-500">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Credit Hours Distribution */}
          <div className="rounded-2xl border-0 overflow-hidden bg-white shadow-sm">
            <div className="px-8 py-6 border-b bg-stone-900 border-[#FABA19] border-b-4">
              <h3 className="text-xl font-bold text-white">{c.creditsTitle}</h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {c.credits.map((cr) => {
                  const Icon = cr.icon;
                  const totalHours = 160;
                  const barWidth = Math.round((cr.hours / totalHours) * 100);
                  return (
                    <div key={cr.title} className="rounded-2xl p-5 border-0 bg-stone-50 flex flex-col items-center text-center hover:bg-stone-100 transition-colors">
                      <Icon className="h-6 w-6 text-[#FABA19] mb-4" />
                      <div className="text-3xl font-black tabular-nums leading-none text-stone-800 mb-4">{cr.hours}</div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden bg-stone-200 mb-3">
                        <div className="h-full rounded-full bg-[#FABA19]" style={{ width: `${barWidth}%` }} />
                      </div>
                      <p className="text-xs font-bold leading-tight text-stone-500">{cr.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{c.levelsTitle}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {c.levels.map((lv) => (
              <div key={lv.level} className="relative overflow-hidden rounded-2xl border-0 bg-stone-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-6 text-center">
                <div className="text-6xl font-black tabular-nums mb-4 text-[#FABA19] opacity-30">
                  {lv.level}
                </div>
                <h3 className="text-lg font-bold mb-1 text-stone-800">{lv.nameAr}</h3>
                <p className="text-sm font-semibold mb-5 text-stone-400">{lv.nameEn}</p>
                <div className="rounded-xl py-2 px-4 text-sm font-bold bg-white text-[#FABA19] shadow-sm inline-block">
                  {lv.credits}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{c.cta.title}</h2>
          <p className="text-xl mb-10 font-medium text-white/80">{c.cta.subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/login">{c.cta.login}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/contact">{c.cta.contact}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}



