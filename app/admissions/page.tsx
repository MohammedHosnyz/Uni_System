'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  CheckCircle,
  Calendar,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

// Original Translation Dictionary Preserved
const i18n = {
  ar: {
    title: 'القبول والتسجيل',
    subtitle: 'معلومات شاملة عن شروط القبول وإجراءات التسجيل في كلية الحاسبات والمعلومات',
    quickInfo: [
      { title: 'موعد التقديم', value: 'يوليو - أغسطس' },
      { title: 'نوع القبول',   value: 'مكتب التنسيق' },
      { title: 'الشعبة',       value: 'رياضيات' },
      { title: 'مدة الدراسة',  value: '4 سنوات' },
    ],
    requirementsTitle: 'شروط القبول',
    requirements: [
      { title: 'الثانوية العامة',    items: ['شعبة رياضيات', 'حسب تنسيق القبول المعلن', 'استيفاء الحد الأدنى للقبول'] },
      { title: 'الفحص الطبي',        items: ['اللياقة الطبية', 'خلو من الأمراض المعدية', 'القدرة على متابعة الدراسة'] },
      { title: 'المستندات المطلوبة', items: ['شهادة الثانوية الأصلية', 'شهادة الميلاد الأصلية', 'بطاقة الرقم القومي', '6 صور شخصية'] },
    ],
    notesTitle: 'ملاحظات هامة',
    notes: [
      'يتم القبول طبقاً لقواعد مكتب التنسيق المعلنة سنوياً',
      'يجب استيفاء جميع المستندات المطلوبة في المواعيد المحددة',
      'الأولوية للطلاب الحاصلين على أعلى الدرجات',
    ],
    stepsTitle: 'خطوات التسجيل',
    stepsSubtitle: 'اتبع هذه الخطوات لإتمام عملية التسجيل بنجاح',
    steps: [
      { n: '1', title: 'التقديم الإلكتروني', desc: 'ملء استمارة التقديم عبر موقع مكتب التنسيق', icon: FileText },
      { n: '2', title: 'تقديم المستندات',    desc: 'تقديم المستندات الأصلية للكلية في المواعيد المحددة', icon: ClipboardList },
      { n: '3', title: 'الفحص الطبي',        desc: 'إجراء الكشف الطبي في المركز المعتمد', icon: CheckCircle },
      { n: '4', title: 'سداد الرسوم',        desc: 'سداد الرسوم الدراسية والحصول على إيصال', icon: CreditCard },
    ],
    feesTitle: 'الرسوم الدراسية',
    fees: [
      { title: 'رسوم التسجيل',   amount: '3,500',  desc: 'تدفع مرة واحدة عند التسجيل' },
      { title: 'الرسوم الفصلية', amount: '35,000', desc: 'تدفع في بداية كل فصل دراسي' },
      { title: 'الفصل الصيفي',   amount: '6,000',  desc: 'اختياري — 8 أسابيع' },
    ],
    currency: 'جنيه مصري',
    feesNote: 'الرسوم قابلة للتغيير حسب قرارات الجامعة',
    noteLabel: 'ملاحظة',
    datesTitle: 'المواعيد الهامة',
    dates: [
      { event: 'بداية التقديم الإلكتروني', date: '1 يوليو' },
      { event: 'نهاية التقديم الإلكتروني', date: '31 يوليو' },
      { event: 'إعلان نتائج التنسيق',      date: '15 أغسطس' },
      { event: 'تقديم المستندات',          date: '20-25 أغسطس' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faq: [
      { question: 'هل يمكن التحويل من كلية أخرى؟', answer: 'نعم، يمكن التحويل وفقاً للقواعد المنظمة للتحويل بين الكليات والجامعات' },
      { question: 'ما هي لغة الدراسة؟',             answer: 'الدراسة باللغتين العربية والإنجليزية حسب طبيعة المقرر' },
      { question: 'هل توجد منح دراسية؟',            answer: 'نعم، تقدم الجامعة منح دراسية للطلاب المتفوقين وفقاً لشروط محددة' },
      { question: 'كيف يتم اختيار التخصص؟',         answer: 'يتم اختيار التخصص في نهاية السنة الأولى بناءً على رغبة الطالب ومعدله التراكمي' },
    ],
    inquiryTitle: 'هل لديك استفسار؟',
    inquirySubtitle: 'تواصل معنا للحصول على المزيد من المعلومات',
    contactButton: 'اتصل بنا',
    loginButton: 'تسجيل الدخول',
  },
  en: {
    title: 'Admissions and Registration',
    subtitle: 'Comprehensive information about admission requirements and registration procedures at the Faculty of Computers and Information',
    quickInfo: [
      { title: 'Application Date', value: 'July - August' },
      { title: 'Admission Type',   value: 'Coordination Office' },
      { title: 'Division',         value: 'Mathematics' },
      { title: 'Study Duration',   value: '4 Years' },
    ],
    requirementsTitle: 'Admission Requirements',
    requirements: [
      { title: 'High School',         items: ['Mathematics division', 'According to announced admission coordination', 'Meeting minimum admission requirements'] },
      { title: 'Medical Examination', items: ['Medical fitness', 'Free from infectious diseases', 'Ability to continue studies'] },
      { title: 'Required Documents',  items: ['Original high school certificate', 'Original birth certificate', 'National ID card', '6 personal photos'] },
    ],
    notesTitle: 'Important Notes',
    notes: [
      'Admission is according to the coordination office rules announced annually',
      'All required documents must be submitted on time',
      'Priority for students with highest grades',
    ],
    stepsTitle: 'Registration Steps',
    stepsSubtitle: 'Follow these steps to complete the registration process successfully',
    steps: [
      { n: '1', title: 'Online Application',   desc: 'Fill out the application form via the coordination office website', icon: FileText },
      { n: '2', title: 'Submit Documents',      desc: 'Submit original documents to the faculty on specified dates', icon: ClipboardList },
      { n: '3', title: 'Medical Examination',   desc: 'Undergo medical examination at the approved center', icon: CheckCircle },
      { n: '4', title: 'Pay Fees',              desc: 'Pay tuition fees and obtain receipt', icon: CreditCard },
    ],
    feesTitle: 'Tuition Fees',
    fees: [
      { title: 'Registration Fee', amount: '500',   desc: 'Paid once upon registration' },
      { title: 'Semester Fees',    amount: '8,500', desc: 'Paid at the beginning of each semester' },
      { title: 'Summer Semester',  amount: '4,000', desc: 'Optional — 8 weeks' },
    ],
    currency: 'EGP',
    feesNote: 'Fees are subject to change according to university decisions',
    noteLabel: 'Note',
    datesTitle: 'Important Dates',
    dates: [
      { event: 'Online Application Start',          date: 'July 1' },
      { event: 'Online Application End',            date: 'July 31' },
      { event: 'Coordination Results Announcement', date: 'August 15' },
      { event: 'Documents Submission',              date: 'August 20-25' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      { question: 'Can I transfer from another faculty?',  answer: 'Yes, transfer is possible according to the rules governing transfer between faculties and universities' },
      { question: 'What is the language of instruction?',  answer: 'Study is in both Arabic and English depending on the nature of the course' },
      { question: 'Are there scholarships?',               answer: 'Yes, the university offers scholarships to outstanding students according to specific conditions' },
      { question: 'How is the specialization chosen?',     answer: 'Specialization is chosen at the end of the first year based on student preference and cumulative GPA' },
    ],
    inquiryTitle: 'Have a Question?',
    inquirySubtitle: 'Contact us for more information',
    contactButton: 'Contact Us',
    loginButton: 'Login',
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

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <details className="group rounded-xl bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden border border-stone-100">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 font-bold text-stone-800 hover:text-[#FABA19] transition-colors">
        {question}
        <span className="shrink-0 rounded-full bg-stone-50 p-1.5 text-stone-900 group-open:-rotate-180 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5 leading-relaxed font-medium text-sm text-stone-500">
        {answer}
      </div>
    </details>
  );
};

export default function AdmissionsPage() {
  const { locale } = useTranslations();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;

  return (
    <>
      <PageHero
        title={tx.title}
        subtitle={tx.subtitle}
      />

      {/* Quick Info & Important Dates */}
      <section className="pb-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {tx.quickInfo.map((item) => (
              <div key={item.title}
                className="rounded-2xl border-0 bg-stone-50 p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-4">
                   <CheckCircle className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-xs font-bold mb-2 text-stone-500">{item.title}</p>
                <p className="text-lg font-black text-stone-800">{item.value}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8 mt-12 text-stone-800">{tx.datesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tx.dates.map((d, i) => (
              <Card key={i} className="border-0 bg-amber-50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 text-center">
                  <Calendar className="mx-auto h-6 w-6 text-amber-600" />
                  <p className="mt-3 text-sm font-bold text-stone-800">
                    {d.event}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-stone-500">
                    {d.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Notes */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{tx.requirementsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {tx.requirements.map((req) => (
              <div key={req.title}
                className="rounded-2xl border-0 bg-white p-8 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-bold mb-5 text-stone-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#FABA19]" />
                  {req.title}
                </h3>
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-stone-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-5 text-stone-800 flex items-center gap-2">
              <span className="text-[#FABA19] font-xl">ℹ️</span>
              {tx.notesTitle}
            </h3>
            <ul className="space-y-3">
              {tx.notes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-stone-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FABA19] mt-2 shrink-0" />
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold text-stone-800">
            {tx.stepsTitle}
          </h2>
          <p className="text-center text-lg font-medium mb-12 text-stone-500">{tx.stepsSubtitle}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tx.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center group">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-stone-50 group-hover:bg-amber-100 transition-colors text-amber-600">
                    <Icon className="h-8 w-8" />
                  </div>
                  <Badge className="mx-auto mt-4 bg-[#FABA19] text-white border-0 font-bold px-3 py-1">
                    {step.n}
                  </Badge>
                  <h3 className="mt-4 text-base font-bold text-stone-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-stone-500">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{tx.feesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {tx.fees.map((fee) => (
              <div key={fee.title}
                className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-all p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FABA19]" />
                <h3 className="text-lg font-bold mb-6 text-stone-800">{fee.title}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-5xl font-black text-[#FABA19] tabular-nums">{fee.amount}</span>
                </div>
                <div className="text-sm font-bold text-stone-400 mb-6 uppercase tracking-wider">{tx.currency}</div>
                <Separator className="mb-6 bg-stone-100" />
                <p className="text-sm font-medium text-stone-500">{fee.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-4 text-center shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              <span className="font-bold text-stone-800">{tx.noteLabel}: </span>
              {tx.feesNote}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-stone-800">
            {tx.faqTitle}
          </h2>
          <div className="space-y-4">
            {tx.faq.map((faq, i) => (
              <AccordionItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{tx.inquiryTitle}</h2>
          <p className="text-xl mb-10 font-medium text-white/80">{tx.inquirySubtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/contact">{tx.contactButton}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/login">{tx.loginButton}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
