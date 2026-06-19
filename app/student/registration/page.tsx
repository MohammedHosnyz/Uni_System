'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTranslations } from '@/lib/useTranslations';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Users, ChevronDown, ChevronUp, Check, X, AlertCircle, GraduationCap, Clock } from 'lucide-react';

const i18n = {
  ar: {
    title: 'تسجيل المقررات الدراسية',
    loading: 'جاري التحميل...',
    semester: 'الفصل الدراسي النشط',
    deadline: 'آخر موعد للتسجيل',
    creditsTitle: 'الساعات المعتمدة',
    completed: 'منجزة',
    inProgress: 'قيد الدراسة',
    remaining: 'متبقية للتخرج',
    rulesTitle: 'تعليمات التسجيل',
    ruleMax: 'الحد الأقصى للتسجيل: 21 ساعة معتمدة',
    ruleMin: 'الحد الأدنى للتسجيل: 12 ساعة معتمدة',
    ruleCap: 'السعة القصوى للشعبة: 50 طالباً',
    selectedTitle: 'المقررات المختارة',
    noSelected: 'لم يتم اختيار أي مقررات بعد',
    selectedCount: 'عدد المقررات المختارة',
    selectedHours: 'إجمالي الساعات المختارة',
    totalAfter: 'إجمالي الساعات بعد التسجيل',
    confirm: 'إرسال وتأكيد طلب التسجيل',
    availableTitle: 'المقررات المتاحة للمستوى الدراسي',
    availableCount: 'مقرر متاح',
    section: 'شعبة',
    full: 'مكتمل العدد',
    available: 'متاح للتسجيل',
    hours: 'ساعة',
    successMsg: 'تم تسجيل',
    successSuffix: 'مقررات بنجاح',
    errorMsg: 'فشل إكمال عملية التسجيل',
    noData: 'لا توجد مقررات دراسية متاحة للتسجيل حالياً',
    code: 'رمز المقرر',
    course: 'اسم المقرر الدراسي',
    hrs: 'الساعات',
    sections: 'الشعب المتاحة',
    alreadyRegistered: 'مقرر مسجل مسبقاً',
  },
  en: {
    title: 'Course Registration',
    loading: 'Loading...',
    semester: 'Active Academic Semester',
    deadline: 'Registration Deadline',
    creditsTitle: 'Credit Hours Summary',
    completed: 'Completed',
    inProgress: 'In Progress',
    remaining: 'Remaining to Graduate',
    rulesTitle: 'Registration Policy',
    ruleMax: 'Maximum enrollment: 21 credit hours',
    ruleMin: 'Minimum enrollment: 12 credit hours',
    ruleCap: 'Maximum capacity per section: 50 students',
    selectedTitle: 'Selected Courses',
    noSelected: 'No courses selected yet',
    selectedCount: 'Selected Courses',
    selectedHours: 'Total Selected Credits',
    totalAfter: 'Total Hours After Submission',
    confirm: 'Submit Course Registration',
    availableTitle: 'Available Courses for Level',
    availableCount: 'courses available',
    section: 'Section',
    full: 'Full',
    available: 'Available',
    hours: 'credits',
    successMsg: 'Successfully registered',
    successSuffix: 'courses',
    errorMsg: 'Registration process failed',
    noData: 'No courses available for registration at this moment',
    code: 'Code',
    course: 'Course Title',
    hrs: 'Credits',
    sections: 'Sections',
    alreadyRegistered: 'Already registered',
  },
} as const;

interface OfferingSection {
  id: number;
  professorName: string;
  enrolledCount: number;
  maxStudents: number;
}

interface AvailableCourse {
  id: number;
  offeringId: number;
  code: string;
  nameAr: string;
  nameEn: string;
  credits: number;
  sections: OfferingSection[];
  alreadyRegistered: boolean;
}

interface PageData {
  semesterName: string;
  semesterId: number;
  registrationEnd: string;
  completedCredits: number;
  inProgressCredits: number;
  totalRequired: number;
  courses: AvailableCourse[];
}

function CoursesTable({
  courses, selected, onToggle, dark, locale, t,
}: {
  courses: AvailableCourse[];
  selected: number[];
  onToggle: (offeringId: number) => void;
  dark: boolean;
  locale: 'ar' | 'en';
  t: typeof i18n[keyof typeof i18n];
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!courses.length) {
    return (
      <div className="text-center py-8">
        <p className="text-xs text-stone-450 dark:text-stone-500 font-semibold">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-stone-50/40 dark:bg-stone-850/10">
          <TableRow className="border-b border-stone-150 dark:border-stone-800">
            {['', t.code, t.course, t.hrs, t.sections, ''].map((h, i) => (
              <TableHead key={i} className="h-9 text-[10px] font-bold text-stone-500 dark:text-stone-400 px-4 text-start whitespace-nowrap">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => {
            const isSelected = selected.includes(course.offeringId);
            const isExpanded = expanded === course.id;
            const availCount = course.sections.filter(s => s.enrolledCount < s.maxStudents).length;

            return (
              <React.Fragment key={course.id}>
                <TableRow
                  className={`border-b border-stone-100 dark:border-stone-800/60 transition-colors ${
                    course.alreadyRegistered
                      ? 'bg-stone-50/20 dark:bg-stone-800/5 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-amber-500/5 dark:bg-amber-955/5 cursor-pointer'
                      : 'hover:bg-stone-50/20 cursor-pointer'
                  }`}
                  onClick={() => !course.alreadyRegistered && onToggle(course.offeringId)}
                >
                  <TableCell className="py-3 px-4 w-8">
                    {course.alreadyRegistered ? (
                      <div className="w-4 h-4 rounded bg-[#FABA19] flex items-center justify-center border border-[#FABA19]">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors border ${
                        isSelected
                          ? 'bg-[#FABA19] border-[#FABA19] text-white'
                          : 'border-stone-300 dark:border-stone-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="py-3 px-4 w-24">
                    <span className="text-xs font-mono font-bold text-[#D97706]">{course.code}</span>
                    {course.alreadyRegistered && (
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold mt-0.5">{t.alreadyRegistered}</p>
                    )}
                  </TableCell>

                  <TableCell className="py-3 px-4">
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-150">
                      {locale === 'ar' ? course.nameAr : course.nameEn}
                    </p>
                    <p className="text-[10px] text-stone-450 dark:text-stone-550 font-semibold mt-0.5">
                      {locale === 'ar' ? course.nameEn : course.nameAr}
                    </p>
                  </TableCell>

                  <TableCell className="py-3 px-4 w-12">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-150">{course.credits}</span>
                  </TableCell>

                  <TableCell className="py-3 px-4 w-24">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border border-stone-150 bg-stone-50 text-stone-600 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-400">
                      <Users className="w-3 h-3 text-[#D97706]" />
                      {availCount}/{course.sections.length}
                    </span>
                  </TableCell>

                  <TableCell className="py-3 px-4 w-8" onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : course.id); }}>
                    <button className="p-1 rounded text-stone-400 hover:text-[#D97706] transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </TableCell>
                </TableRow>

                {isExpanded && course.sections.map((sec) => {
                  const isFull = sec.enrolledCount >= sec.maxStudents;
                  const pct = Math.min(Math.round((sec.enrolledCount / sec.maxStudents) * 100), 100);
                  return (
                    <TableRow key={`sec-${sec.id}`} className="border-b border-stone-100 dark:border-stone-800/40 bg-stone-50/40 dark:bg-stone-800/10 last:border-b-0">
                      <TableCell className="py-2.5 px-4" />
                      <TableCell className="py-2.5 px-4">
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">{t.section} {sec.id}</span>
                      </TableCell>
                      <TableCell className="py-2.5 px-4">
                        <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{sec.professorName}</span>
                      </TableCell>
                      <TableCell className="py-2.5 px-4" colSpan={2}>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                            <div className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-[#FABA19]'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] text-stone-450 dark:text-stone-500 font-mono">{sec.enrolledCount}/{sec.maxStudents}</span>
                          <span className={`text-[10px] font-bold ${isFull ? 'text-red-500' : 'text-[#D97706]'}`}>
                            {isFull ? t.full : t.available}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 px-4" />
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function SelectedPanel({
  courses, selected, onRemove, onConfirm, completedCredits, totalRequired, submitting, dark, locale, t,
}: {
  courses: AvailableCourse[];
  selected: number[];
  onRemove: (id: number) => void;
  onConfirm: () => void;
  completedCredits: number;
  totalRequired: number;
  submitting: boolean;
  dark: boolean;
  locale: 'ar' | 'en';
  t: typeof i18n[keyof typeof i18n];
}) {
  const selectedCourses = courses.filter(c => selected.includes(c.offeringId));
  const selectedCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#D97706]" />
          <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.selectedTitle}</CardTitle>
        </div>
        {selected.length > 0 && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-[#D97706]">
            {selected.length}
          </span>
        )}
      </div>

      {selected.length === 0 ? (
        <p className="text-xs text-center py-6 text-stone-450 dark:text-stone-500 font-semibold">{t.noSelected}</p>
      ) : (
        <>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            {selectedCourses.map(c => (
              <div key={c.offeringId} className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-[#D97706] me-1.5">{c.code}</span>
                  <span className="text-xs font-bold text-stone-850 dark:text-stone-250 truncate">
                    {locale === 'ar' ? c.nameAr : c.nameEn}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-stone-450 dark:text-stone-550">{c.credits} {t.hours}</span>
                  <button onClick={() => onRemove(c.offeringId)} className="p-1 rounded text-stone-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-stone-100 dark:bg-stone-800" />

          <div className="space-y-1.5 text-xs">
            {[
              { label: t.selectedCount, value: `${selected.length}` },
              { label: t.selectedHours, value: `${selectedCredits}` },
              { label: t.totalAfter,    value: `${completedCredits + selectedCredits}`, bold: true },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-stone-400 dark:text-stone-500 font-semibold">{row.label}</span>
                <span className={`font-bold ${row.bold ? 'text-[#D97706] text-sm' : 'text-stone-800 dark:text-stone-200'}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={onConfirm}
            disabled={submitting}
            className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm border-0 disabled:opacity-50 transition-all"
          >
            {t.confirm}
          </Button>
        </>
      )}
    </Card>
  );
}

export default function RegistrationPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { dark } = useDarkMode();
  const { locale } = useTranslations();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/registration-data?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setPageData(d);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  const handleToggle = (offeringId: number) => {
    setSelected(prev => prev.includes(offeringId) ? prev.filter(x => x !== offeringId) : [...prev, offeringId]);
  };

  const handleConfirm = async () => {
    if (!pageData || !user?.id) return;
    setSubmitting(true);
    try {
      const results = await Promise.all(selected.map(offeringId =>
        fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentUserId: user.id,
            courseOfferingId: offeringId,
            semesterId: pageData.semesterId,
          }),
        }).then(r => r.json())
      ));
      const failed = results.filter(r => r.error);
      if (failed.length === 0) {
        setToast({ type: 'success', msg: `${t.successMsg} ${selected.length} ${t.successSuffix}` });
        setSelected([]);
        const d = await fetch(`/api/student/registration-data?userId=${user.id}`).then(r => r.json());
        setPageData(d);
      } else {
        setToast({ type: 'error', msg: failed[0].error ?? t.errorMsg });
      }
    } catch {
      setToast({ type: 'error', msg: t.errorMsg });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading || !user) return null;

  const completedCredits = pageData?.completedCredits ?? 0;
  const inProgressCredits = pageData?.inProgressCredits ?? 0;
  const totalRequired = pageData?.totalRequired ?? 144;
  const remaining = Math.max(totalRequired - completedCredits - inProgressCredits, 0);
  const courses = pageData?.courses ?? [];

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 bg-[#FABA19] text-white">
            {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </div>
        )}

        {/* Top Title Section */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-3 border-b border-stone-100 dark:border-stone-850">
          <div>
            <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
              {pageData?.semesterName ?? t.semester}
            </p>
          </div>
          {pageData?.registrationEnd && (
            <div className="text-end">
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-0.5">{t.deadline}</p>
              <p className="text-xs font-bold text-[#D97706]">
                {new Date(pageData.registrationEnd).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left panel widgets */}
          <div className="space-y-6">

            {/* Credit Hours Card */}
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100 dark:border-stone-800">
                <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.creditsTitle}</CardTitle>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { label: t.completed,   value: completedCredits },
                  { label: t.inProgress,  value: inProgressCredits },
                  { label: t.remaining,   value: remaining, highlight: true },
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-stone-400 dark:text-stone-500 font-semibold">{row.label}</span>
                    <span className={`font-bold font-mono ${row.highlight ? 'text-[#D97706]' : 'text-stone-850 dark:text-stone-200'}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <Separator className="bg-stone-100 dark:bg-stone-800" />
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-stone-400 dark:text-stone-500 font-bold">
                  <span>{completedCredits} / {totalRequired}</span>
                  <span>{Math.round((completedCredits / totalRequired) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-[#FABA19] transition-all"
                    style={{ width: `${Math.min((completedCredits / totalRequired) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Rules Card */}
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100 dark:border-stone-800">
                <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                  <AlertCircle className="w-4.5 h-4.5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.rulesTitle}</CardTitle>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-stone-500 dark:text-stone-450">
                {[t.ruleMax, t.ruleMin, t.ruleCap].map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FABA19] shrink-0 mt-1.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Selected Panel Widget */}
            <SelectedPanel
              courses={courses}
              selected={selected}
              onRemove={handleToggle}
              onConfirm={handleConfirm}
              completedCredits={completedCredits}
              totalRequired={totalRequired}
              submitting={submitting}
              dark={dark}
              locale={loc}
              t={t}
            />
          </div>

          {/* Right Courses Table list */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base font-bold text-stone-850 dark:text-stone-100">
                      {t.availableTitle} {user.currentLevel}
                    </CardTitle>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-stone-100 dark:border-stone-800">
                    {courses.length} {t.availableCount}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {dataLoading ? (
                  <div className="space-y-2 p-5">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-stone-50 dark:bg-stone-800/40 rounded-xl animate-pulse" />)}
                  </div>
                ) : (
                  <CoursesTable
                    courses={courses}
                    selected={selected}
                    onToggle={handleToggle}
                    dark={dark}
                    locale={loc}
                    t={t}
                  />
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
