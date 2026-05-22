'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTranslations } from '@/lib/useTranslations';
import { theme, darkTheme } from '@/lib/theme';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Users, ChevronDown, ChevronUp, Check, X, AlertCircle, GraduationCap, Clock } from 'lucide-react';


const i18n = {
  ar: {
    title: 'تسجيل المواد', loading: 'جاري التحميل...',
    semester: 'الفصل الدراسي الحالي', deadline: 'آخر موعد للتسجيل',
    creditsTitle: 'ملخص الساعات', completed: 'المكتسبة',
    inProgress: 'الحالية', remaining: 'المتبقية للتخرج',
    rulesTitle: 'قواعد التسجيل',
    ruleMax: 'الحد الأقصى: 21 ساعة', ruleMin: 'الحد الأدنى: 12 ساعة', ruleCap: 'سعة السكشن: 50 طالب',
    selectedTitle: 'المواد المختارة', noSelected: 'لم تختر أي مادة بعد',
    selectedCount: 'عدد المواد', selectedHours: 'الساعات المختارة',
    totalAfter: 'الإجمالي بعد التسجيل', confirm: 'تأكيد التسجيل',
    availableTitle: 'المواد المتاحة — المستوى', availableCount: 'مادة',
    section: 'سكشن', full: 'ممتلئ', available: 'متاح', hours: 'س',
    successMsg: 'تم تسجيل', successSuffix: 'مادة بنجاح',
    errorMsg: 'حدث خطأ أثناء التسجيل', noData: 'لا توجد مواد متاحة',
    code: 'الكود', course: 'المادة', hrs: 'الساعات', sections: 'السكاشن',
    alreadyRegistered: 'مسجل مسبقاً',
  },
  en: {
    title: 'Course Registration', loading: 'Loading...',
    semester: 'Current Semester', deadline: 'Registration Deadline',
    creditsTitle: 'Credits Summary', completed: 'Completed',
    inProgress: 'In Progress', remaining: 'Remaining to Graduate',
    rulesTitle: 'Registration Rules',
    ruleMax: 'Maximum: 21 credit hours', ruleMin: 'Minimum: 12 credit hours', ruleCap: 'Section capacity: 50 students',
    selectedTitle: 'Selected Courses', noSelected: 'No courses selected yet',
    selectedCount: 'Courses', selectedHours: 'Selected Hours',
    totalAfter: 'Total after registration', confirm: 'Confirm Registration',
    availableTitle: 'Available Courses — Level', availableCount: 'courses',
    section: 'Section', full: 'Full', available: 'Available', hours: 'hrs',
    successMsg: 'Successfully registered', successSuffix: 'courses',
    errorMsg: 'Registration failed', noData: 'No courses available',
    code: 'Code', course: 'Course', hrs: 'Hrs', sections: 'Sections',
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
  courses, selected, onToggle, dark, locale, t, th, bdrL,
}: {
  courses: AvailableCourse[];
  selected: number[];
  onToggle: (offeringId: number) => void;
  dark: boolean; locale: 'ar' | 'en';
  t: typeof i18n[keyof typeof i18n];
  th: typeof theme | typeof darkTheme;
  bdrL: string;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!courses.length) return (
    <p className="text-sm text-center py-8" style={{ color: th.textMuted }}>{t.noData}</p>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-0" style={{ background: dark ? darkTheme.surfaceAlt : theme.surface }}>
          {['', t.code, t.course, t.hrs, t.sections, ''].map((h, i) => (
            <TableHead key={i} className="h-9 text-[11px] font-bold px-3 first:ps-3 last:pe-3 whitespace-nowrap"
              style={{ color: th.textMuted, textAlign: 'start' }}>{h}</TableHead>
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
              <TableRow className="border-0 transition-colors"
                style={{
                  borderTop: `1px solid ${bdrL}`,
                  background: course.alreadyRegistered
                    ? (dark ? darkTheme.surfaceAlt : theme.surface)
                    : isSelected ? (dark ? darkTheme.accent : theme.accent) : 'transparent',
                  cursor: course.alreadyRegistered ? 'default' : 'pointer',
                  opacity: course.alreadyRegistered ? 0.6 : 1,
                }}
                onClick={() => !course.alreadyRegistered && onToggle(course.offeringId)}>

                
                <TableCell className="py-3 ps-3 pe-1 w-8">
                  {course.alreadyRegistered ? (
                    <div className="w-5 h-5 rounded flex items-center justify-center"
                      style={{ background: th.primary, border: `1.5px solid ${th.primary}` }}>
                      <Check className="w-3 h-3" style={{ color: dark ? '#1A1612' : '#fff' }} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                      style={{ background: isSelected ? th.primary : 'transparent', border: `1.5px solid ${isSelected ? th.primary : bdrL}` }}>
                      {isSelected && <Check className="w-3 h-3" style={{ color: dark ? '#1A1612' : '#fff' }} />}
                    </div>
                  )}
                </TableCell>

                
                <TableCell className="py-3 px-3 w-24">
                  <span className="text-xs font-mono font-bold" style={{ color: th.primary }}>{course.code}</span>
                  {course.alreadyRegistered && (
                    <p className="text-[10px] mt-0.5" style={{ color: th.textMuted }}>{t.alreadyRegistered}</p>
                  )}
                </TableCell>

                
                <TableCell className="py-3 px-3">
                  <p className="text-sm font-semibold" style={{ color: th.text }}>
                    {locale === 'ar' ? course.nameAr : course.nameEn}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: th.textMuted }}>
                    {locale === 'ar' ? course.nameEn : course.nameAr}
                  </p>
                </TableCell>

                
                <TableCell className="py-3 px-3 w-12">
                  <span className="text-sm font-bold tabular-nums" style={{ color: th.text }}>{course.credits}</span>
                </TableCell>

                
                <TableCell className="py-3 px-3 w-24">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: dark ? darkTheme.border : theme.border, color: availCount > 0 ? th.primary : th.textMuted, border: `1px solid ${bdrL}` }}>
                    <Users className="w-3 h-3 shrink-0" />
                    {availCount}/{course.sections.length}
                  </span>
                </TableCell>

                
                <TableCell className="py-3 pe-3 ps-1 w-8"
                  onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : course.id); }}>
                  <button className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: th.textMuted }}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </TableCell>
              </TableRow>

              
              {isExpanded && course.sections.map((sec) => {
                const isFull = sec.enrolledCount >= sec.maxStudents;
                const pct = Math.round((sec.enrolledCount / sec.maxStudents) * 100);
                return (
                  <TableRow key={`sec-${sec.id}`} className="border-0"
                    style={{ borderTop: `1px solid ${bdrL}`, background: dark ? darkTheme.surfaceAlt : theme.surface }}>
                    <TableCell className="py-2 ps-3" />
                    <TableCell className="py-2 px-3">
                      <span className="text-xs font-semibold" style={{ color: th.textMuted }}>{t.section} {sec.id}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <span className="text-xs" style={{ color: th.textMuted }}>{sec.professorName}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3" colSpan={2}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: bdrL }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: isFull ? '#ef4444' : th.primary }} />
                        </div>
                        <span className="text-xs tabular-nums shrink-0" style={{ color: th.textMuted }}>{sec.enrolledCount}/{sec.maxStudents}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color: isFull ? '#ef4444' : th.primary }}>
                          {isFull ? t.full : t.available}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 pe-3" />
                  </TableRow>
                );
              })}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}


function SelectedPanel({
  courses, selected, onRemove, onConfirm, completedCredits, totalRequired, submitting, dark, locale, t, th, bdrL,
}: {
  courses: AvailableCourse[];
  selected: number[];
  onRemove: (id: number) => void;
  onConfirm: () => void;
  completedCredits: number;
  totalRequired: number;
  submitting: boolean;
  dark: boolean; locale: 'ar' | 'en';
  t: typeof i18n[keyof typeof i18n];
  th: typeof theme | typeof darkTheme;
  bdrL: string;
}) {
  const selectedCourses = courses.filter(c => selected.includes(c.offeringId));
  const selectedCredits = selectedCourses.reduce((s, c) => s + c.credits, 0);

  return (
    <Card style={{ background: dark ? darkTheme.surface : theme.white, borderColor: dark ? darkTheme.border : theme.border }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" style={{ color: th.primary }} />
            <CardTitle className="text-sm font-bold" style={{ color: th.text }}>{t.selectedTitle}</CardTitle>
          </div>
          {selected.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: dark ? darkTheme.accent : theme.accent, color: th.primary, border: `1px solid ${bdrL}` }}>
              {selected.length}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {selected.length === 0 ? (
          <p className="text-xs text-center py-4" style={{ color: th.textMuted }}>{t.noSelected}</p>
        ) : (
          <>
            
            <div className="space-y-1 mb-4">
              {selectedCourses.map(c => (
                <div key={c.offeringId} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg"
                  style={{ background: dark ? darkTheme.surfaceAlt : theme.surface }}>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-mono font-bold me-1.5" style={{ color: th.primary }}>{c.code}</span>
                    <span className="text-xs font-medium truncate" style={{ color: th.text }}>
                      {locale === 'ar' ? c.nameAr : c.nameEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs tabular-nums font-semibold" style={{ color: th.textMuted }}>{c.credits} {t.hours}</span>
                    <button onClick={() => onRemove(c.offeringId)} className="hover:opacity-70 transition-opacity"
                      style={{ color: th.textMuted }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Separator style={{ background: bdrL }} className="mb-3" />

            
            <div className="space-y-1.5 mb-4 text-xs">
              {[
                { label: t.selectedCount, value: `${selected.length}` },
                { label: t.selectedHours, value: `${selectedCredits}` },
                { label: t.totalAfter,    value: `${completedCredits + selectedCredits}`, bold: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between">
                  <span style={{ color: th.textMuted }}>{row.label}</span>
                  <span className={row.bold ? 'font-bold' : 'font-semibold'} style={{ color: row.bold ? th.primary : th.text }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full font-bold text-sm" onClick={onConfirm} disabled={submitting}
              style={{ background: th.primary, color: dark ? '#1A1612' : '#2F2415', border: 'none', opacity: submitting ? 0.7 : 1 }}>
              {t.confirm}
            </Button>
          </>
        )}
      </CardContent>
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
  const th  = dark ? darkTheme : theme;
  const card = dark ? darkTheme.surface : theme.white;
  const bdr  = dark ? darkTheme.border : theme.border;
  const bdrL = dark ? darkTheme.borderLight : theme.border;

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/registration-data?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setPageData(d); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  const handleToggle = (offeringId: number) =>
    setSelected(prev => prev.includes(offeringId) ? prev.filter(x => x !== offeringId) : [...prev, offeringId]);

  const handleConfirm = async () => {
    if (!pageData || !user?.id) return;
    setSubmitting(true);
    try {
      const results = await Promise.all(selected.map(offeringId =>
        fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentUserId: user.id, courseOfferingId: offeringId, semesterId: pageData.semesterId }),
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
  const remaining = totalRequired - completedCredits - inProgressCredits;
  const courses = pageData?.courses ?? [];

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-5 p-1">

        
        {toast && (
          <div className="fixed top-4 inset-x-0 flex justify-center z-50 px-4">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg text-sm font-semibold"
              style={{ background: toast.type === 'success' ? th.primary : '#ef4444', color: dark ? '#1A1612' : '#fff' }}>
              {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {toast.msg}
            </div>
          </div>
        )}

        
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: th.text }}>{t.title}</h1>
            <p className="text-sm mt-0.5" style={{ color: th.textMuted }}>
              {pageData?.semesterName ?? t.semester}
            </p>
          </div>
          {pageData?.registrationEnd && (
            <div className="text-end">
              <p className="text-xs" style={{ color: th.textMuted }}>{t.deadline}</p>
              <p className="text-sm font-bold" style={{ color: th.primary }}>
                {new Date(pageData.registrationEnd).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          
          <div className="space-y-4">

            
            <Card style={{ background: card, borderColor: bdr }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: th.primary }} />
                  <CardTitle className="text-sm font-bold" style={{ color: th.text }}>{t.creditsTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {[
                  { label: t.completed,   value: completedCredits },
                  { label: t.inProgress,  value: inProgressCredits },
                  { label: t.remaining,   value: remaining, accent: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span style={{ color: th.textMuted }}>{row.label}</span>
                    <span className="font-bold tabular-nums" style={{ color: row.accent ? th.primary : th.text }}>{row.value}</span>
                  </div>
                ))}
                <Separator style={{ background: bdrL }} />
                
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ color: th.textMuted }}>
                    <span>{completedCredits} / {totalRequired}</span>
                    <span>{Math.round((completedCredits / totalRequired) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: bdrL }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min((completedCredits / totalRequired) * 100, 100)}%`, background: th.primary }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            
            <Card style={{ background: card, borderColor: bdr }}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" style={{ color: th.primary }} />
                  <CardTitle className="text-sm font-bold" style={{ color: th.text }}>{t.rulesTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5">
                  {[t.ruleMax, t.ruleMin, t.ruleCap].map(rule => (
                    <li key={rule} className="flex items-start gap-2 text-xs" style={{ color: th.textMuted }}>
                      <span className="mt-0.5 w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: th.primary }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            
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
              th={th}
              bdrL={bdrL}
            />
          </div>

          
          <div className="lg:col-span-2">
            <Card style={{ background: card, borderColor: bdr }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" style={{ color: th.primary }} />
                    <CardTitle className="text-sm font-bold" style={{ color: th.text }}>
                      {t.availableTitle} {user.currentLevel}
                    </CardTitle>
                  </div>
                  <span className="text-xs" style={{ color: th.textMuted }}>
                    {courses.length} {t.availableCount}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0 pb-2">
                {dataLoading ? (
                  <div className="space-y-2 px-4 py-3">
                    {[1,2,3,4].map(i => <div key={i} className="h-10 rounded animate-pulse" style={{ background: dark ? darkTheme.surfaceAlt : theme.surface }} />)}
                  </div>
                ) : (
                  <CoursesTable
                    courses={courses}
                    selected={selected}
                    onToggle={handleToggle}
                    dark={dark}
                    locale={loc}
                    t={t}
                    th={th}
                    bdrL={bdrL}
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
