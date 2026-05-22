'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MdMenuBook, MdBookmark, MdSchedule, MdPerson, MdCheckCircle,
  MdDownload, MdDescription, MdVideoLibrary, MdAssignment, MdChevronLeft,
  MdGridView, MdViewList, MdSchool, MdClose, MdTrendingUp, MdEmojiEvents, MdBarChart,
} from 'react-icons/md';

const i18n = {
  ar: {
    title: 'موادي الدراسية', loading: 'جاري التحميل...',
    registerNew: 'تسجيل مواد جديدة',
    studentName: 'اسم الطالب', studentNum: 'رقم الطالب',
    semesterLabel: 'الفصل الدراسي', coursesCount: 'عدد المواد',
    statCourses: 'عدد المواد', statHours: 'إجمالي الساعات', statStatus: 'الحالة', statusActive: 'مسجل',
    tabAll: 'جميع المواد', tabMaterials: 'المواد الدراسية', tabGrades: 'الدرجات',
    colNum: '#', colCode: 'الكود', colName: 'اسم المادة', colCredits: 'الساعات', colProf: 'الأستاذ', colStatus: 'الحالة',
    active: 'نشط', credits: 'ساعة',
    lec1: 'المحاضرة الأولى', lec2: 'المحاضرة الثانية', video: 'فيديو شرح', hw: 'الواجب الأول',
    currentGrade: 'الدرجة الحالية', outOf: 'من إجمالي',
    yearWork: 'أعمال السنة', midterm: 'منتصف الفصل', final: 'الامتحان النهائي', pending: 'لم يُعقد',
    viewDetails: 'تفاصيل الدرجات', dr: 'د.',
    modalTitle: 'تفاصيل الدرجات', close: 'إغلاق',
    courseCode: 'كود المادة', courseName: 'اسم المادة', instructor: 'الأستاذ', creditHours: 'الساعات',
    gradeBreakdown: 'توزيع الدرجات', totalGrade: 'الدرجة الإجمالية', gradeStatus: 'الحالة',
    inProgress: 'قيد الدراسة', passed: 'ناجح', failed: 'راسب',
    midtermLabel: 'درجة المنتصف', finalLabel: 'درجة النهائي', assignmentLabel: 'الواجبات',
    outOf25: 'من 25', outOf50: 'من 50', outOf100: 'من 100',
    progressNote: 'الامتحان النهائي لم يُعقد بعد',
    gradeScale: 'سلم الدرجات',
    excellent: 'ممتاز', veryGood: 'جيد جداً', good: 'جيد', pass: 'مقبول', fail: 'راسب',
    noData: 'لا توجد مواد مسجلة في هذا الفصل',
  },
  en: {
    title: 'My Courses', loading: 'Loading...',
    registerNew: 'Register New Courses',
    studentName: 'Student Name', studentNum: 'Student ID',
    semesterLabel: 'Semester', coursesCount: 'Courses',
    statCourses: 'Courses', statHours: 'Total Hours', statStatus: 'Status', statusActive: 'Enrolled',
    tabAll: 'All Courses', tabMaterials: 'Materials', tabGrades: 'Grades',
    colNum: '#', colCode: 'Code', colName: 'Course Name', colCredits: 'Credits', colProf: 'Instructor', colStatus: 'Status',
    active: 'Active', credits: 'hrs',
    lec1: 'Lecture 1', lec2: 'Lecture 2', video: 'Explanation Video', hw: 'Assignment 1',
    currentGrade: 'Current Grade', outOf: 'Out of',
    yearWork: 'Year Work', midterm: 'Midterm', final: 'Final Exam', pending: 'Not held',
    viewDetails: 'Grade Details', dr: 'Dr.',
    modalTitle: 'Grade Details', close: 'Close',
    courseCode: 'Course Code', courseName: 'Course Name', instructor: 'Instructor', creditHours: 'Credits',
    gradeBreakdown: 'Grade Breakdown', totalGrade: 'Total Grade', gradeStatus: 'Status',
    inProgress: 'In Progress', passed: 'Passed', failed: 'Failed',
    midtermLabel: 'Midterm Grade', finalLabel: 'Final Grade', assignmentLabel: 'Assignments',
    outOf25: 'out of 25', outOf50: 'out of 50', outOf100: 'out of 100',
    progressNote: 'Final exam has not been held yet',
    gradeScale: 'Grade Scale',
    excellent: 'Excellent', veryGood: 'Very Good', good: 'Good', pass: 'Pass', fail: 'Fail',
    noData: 'No courses registered this semester',
  },
} as const;

type Tab = 'all' | 'materials' | 'grades';

interface CourseGrade {
  midtermGrade: number | null;
  finalGrade: number | null;
  assignmentGrade: number | null;
  totalGrade: number | null;
  letterGrade: string | null;
  status: string | null;
}
interface CourseItem {
  registrationId: number;
  courseId: number;
  code: string;
  nameAr: string;
  nameEn: string;
  credits: number;
  level: number;
  semesterName: string;
  professor: string | null;
  grade: CourseGrade | null;
}
interface PageData {
  semesterName: string | null;
  currentLevel: number;
  courses: CourseItem[];
}


function GradeModal({
  course, dir, t, th, card, bdr, bdrL, iconBg, heroBg, heroText, onClose,
}: {
  course: CourseItem; dir: string;
  t: typeof i18n[keyof typeof i18n];
  th: typeof theme | typeof darkTheme;
  card: string; bdr: string; bdrL: string; iconBg: string;
  heroBg: string; heroText: string;
  onClose: () => void;
}) {
  const g = course.grade;
  const midterm   = g?.midtermGrade   ? Number(g.midtermGrade)   : null;
  const finalG    = g?.finalGrade     ? Number(g.finalGrade)     : null;
  const assignment = g?.assignmentGrade ? Number(g.assignmentGrade) : null;
  const total     = g?.totalGrade     ? Number(g.totalGrade)     : null;
  const letter    = g?.letterGrade    ?? null;
  const status    = g?.status         ?? null;

  const pct = (val: number, max: number) => Math.min(Math.round((val / max) * 100), 100);

  const statusLabel = status === 'pass' ? t.passed : status === 'fail' ? t.failed : t.inProgress;
  const statusColor = status === 'pass' ? th.primary : status === 'fail' ? '#ef4444' : th.textMuted;

  const scaleRows = [
    { range: '90–100', label: t.excellent, color: th.primary },
    { range: '80–89',  label: t.veryGood,  color: '#3b82f6' },
    { range: '70–79',  label: t.good,      color: th.primary },
    { range: '60–69',  label: t.pass,      color: '#f97316' },
    { range: '0–59',   label: t.fail,      color: '#ef4444' },
  ];

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}>
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          dir={dir} onClick={(e) => e.stopPropagation()}>

          
          <div style={{ background: heroBg, padding: '1.25rem 1.5rem', flexShrink: 0 }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MdSchool className="w-5 h-5" style={{ color: heroText }} />
                </div>
                <div>
                  <p className="text-base font-bold" style={{ color: heroText }}>{t.modalTitle}</p>
                  <p className="text-sm opacity-75" style={{ color: heroText }}>{course.code}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.18)', color: heroText }}>
                <MdClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 space-y-4" style={{ padding: '1.25rem 1.5rem' }}>

            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.courseCode,  value: course.code },
                { label: t.creditHours, value: `${course.credits} ${t.credits}` },
                { label: t.instructor,  value: course.professor ? `${t.dr} ${course.professor}` : '—', span: true },
              ].map(r => (
                <div key={r.label} className={r.span ? 'col-span-2' : ''}
                  style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.75rem 1rem' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                  <p className="font-bold" style={{ color: th.text }}>{r.value}</p>
                </div>
              ))}
            </div>

            
            <div style={{ background: heroBg, borderRadius: 14, padding: '1rem 1.25rem' }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <MdTrendingUp className="w-5 h-5" style={{ color: heroText }} />
                  <div>
                    <p className="text-sm opacity-75" style={{ color: heroText }}>{t.totalGrade}</p>
                    <p className="text-2xl font-bold" style={{ color: heroText }}>
                      {total !== null ? `${total.toFixed(1)} / 100` : '— / 100'}
                      {letter && <span className="text-base ms-2 opacity-80">({letter})</span>}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(0,0,0,0.18)', color: statusColor }}>
                  {statusLabel}
                </span>
              </div>
              {total !== null && (
                <div className="mt-3 h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="h-2 rounded-full" style={{ width: `${pct(total, 100)}%`, background: 'rgba(255,255,255,0.7)' }} />
                </div>
              )}
            </div>

            
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: iconBg, padding: '0.75rem 1rem', borderBottom: `1px solid ${bdrL}` }}
                className="flex items-center gap-2">
                <MdBarChart className="w-4 h-4" style={{ color: th.primary }} />
                <p className="font-bold text-sm" style={{ color: th.text }}>{t.gradeBreakdown}</p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: t.midtermLabel,    val: midterm,    max: 25, color: th.primary },
                  { label: t.finalLabel,      val: finalG,     max: 50, color: '#3b82f6' },
                  { label: t.assignmentLabel, val: assignment, max: 25, color: th.primary },
                ].map(r => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold" style={{ color: th.textMuted }}>{r.label}</span>
                      <span className="text-sm font-bold" style={{ color: r.val !== null ? r.color : th.textMuted }}>
                        {r.val !== null ? `${r.val} / ${r.max}` : t.pending}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: bdrL }}>
                      {r.val !== null && (
                        <div className="h-1.5 rounded-full" style={{ width: `${pct(r.val, r.max)}%`, background: r.color }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: iconBg, padding: '0.75rem 1rem', borderBottom: `1px solid ${bdrL}` }}
                className="flex items-center gap-2">
                <MdEmojiEvents className="w-4 h-4" style={{ color: th.primary }} />
                <p className="font-bold text-sm" style={{ color: th.text }}>{t.gradeScale}</p>
              </div>
              <div className="p-3 grid grid-cols-5 gap-2">
                {scaleRows.map(s => (
                  <div key={s.label} className="text-center p-2 rounded-xl"
                    style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                    <p className="text-xs font-bold mb-1" style={{ color: s.color }}>{s.range}</p>
                    <p className="text-xs" style={{ color: th.textMuted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: `1px solid ${bdrL}`, flexShrink: 0 }}>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl font-bold text-sm"
              style={{ background: th.primary, color: '#1A1612' }}>
              {t.close}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


export default function CoursesPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th  = dark ? darkTheme : theme;

  const [tab, setTab] = useState<Tab>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('courses-tab') as Tab | null;
      if (saved && ['all', 'materials', 'grades'].includes(saved)) return saved;
    }
    return 'all';
  });
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    sessionStorage.setItem('courses-tab', t);
  };

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/courses?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setPageData(d); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  if (loading || !user) return null;

  const card    = dark ? darkTheme.surface    : theme.white;
  const bdr     = dark ? darkTheme.border     : theme.border;
  const bdrL    = dark ? darkTheme.borderLight : theme.border;
  const iconBg  = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg  = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text      : '#1A1612';

  const courses = pageData?.courses ?? [];
  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const semesterName = pageData?.semesterName ?? t.semesterLabel;

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  const Skeleton = () => (
    <div className="space-y-2 p-4">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="h-10 rounded animate-pulse" style={{ background: iconBg }} />
      ))}
    </div>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-5 p-1">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ background: card, borderColor: bdr, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MdMenuBook className="w-5 h-5" style={{ color: heroText }} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: heroText }}>{t.title}</h1>
                    <p className="text-sm opacity-75" style={{ color: heroText }}>{semesterName}</p>
                  </div>
                </div>
                <Link href="/student/registration"
                  className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
                  style={{ background: 'rgba(0,0,0,0.18)', color: heroText, border: '1px solid rgba(0,0,0,0.12)' }}>
                  {t.registerNew}
                </Link>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: t.studentName,   value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,    value: user.studentNumber ?? '—' },
                  { label: t.semesterLabel, value: semesterName },
                  { label: t.coursesCount,  value: String(courses.length), gold: true },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-xs mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-bold text-sm" style={{ color: r.gold ? th.primary : th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <MdMenuBook className="w-6 h-6" />,     label: t.statCourses, value: courses.length },
            { icon: <MdSchedule className="w-6 h-6" />,        label: t.statHours,   value: totalCredits },
            { icon: <MdCheckCircle className="w-6 h-6" />, label: t.statStatus,  value: t.statusActive, green: true },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <Card style={{ background: card, borderColor: bdr }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: iconBg, border: `1px solid ${bdrL}`, color: th.primary }}>
                    {s.icon}
                  </div>
                  <p className="text-xs mb-1" style={{ color: th.textMuted }}>{s.label}</p>
                  <p className="text-xl font-bold" style={{ color: s.green ? th.primary : th.text }}>{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        
        <div className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-xl"
          style={{ background: card, border: `1px solid ${bdr}` }}>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'materials', 'grades'] as Tab[]).map(tabKey => {
              const labels: Record<Tab, string> = { all: t.tabAll, materials: t.tabMaterials, grades: t.tabGrades };
              const active = tab === tabKey;
              return (
                <button key={tabKey} onClick={() => handleTabChange(tabKey)}
                  className="px-4 py-1.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: active ? th.primary : iconBg, color: active ? '#1A1612' : th.textMuted, border: `1px solid ${active ? th.primary : bdrL}` }}>
                  {labels[tabKey]}
                </button>
              );
            })}
          </div>
          {tab === 'all' && (
            <div className="flex gap-1">
              {(['list', 'grid'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: view === v ? th.primary : iconBg, color: view === v ? '#1A1612' : th.textMuted, border: `1px solid ${bdrL}` }}>
                  {v === 'list' ? <MdViewList className="w-4 h-4" /> : <MdGridView className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        
        {tab === 'all' && view === 'list' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-0">
                {dataLoading ? <Skeleton /> : courses.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: th.textMuted }}>{t.noData}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: iconBg }}>
                        {[t.colNum, t.colCode, t.colName, t.colCredits, t.colProf, t.colStatus].map(h => (
                          <TableHead key={h} className="text-xs font-bold h-9 px-3 whitespace-nowrap"
                            style={{ color: th.textMuted, textAlign: 'start' }}>{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((c, i) => (
                        <TableRow key={c.registrationId} style={{ borderTop: `1px solid ${bdrL}` }}>
                          <TableCell className="px-3 py-3 text-sm" style={{ color: th.textMuted }}>{i + 1}</TableCell>
                          <TableCell className="px-3 py-3">
                            <span className="text-xs font-mono font-bold" style={{ color: th.primary }}>{c.code}</span>
                          </TableCell>
                          <TableCell className="px-3 py-3">
                            <p className="text-sm font-semibold" style={{ color: th.text }}>{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                            <p className="text-xs" style={{ color: th.textMuted }}>{loc === 'ar' ? c.nameEn : c.nameAr}</p>
                          </TableCell>
                          <TableCell className="px-3 py-3 text-sm font-bold tabular-nums" style={{ color: th.text }}>{c.credits}</TableCell>
                          <TableCell className="px-3 py-3 text-sm" style={{ color: th.textMuted }}>
                            {c.professor ? `${t.dr} ${c.professor}` : '—'}
                          </TableCell>
                          <TableCell className="px-3 py-3">
                            <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: '#22c55e' }}>
                              <MdCheckCircle className="w-3.5 h-3.5" /> {t.active}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        
        {tab === 'all' && view === 'grid' && (
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1,2,3].map(i => (
              <div key={i} className="h-36 rounded-xl animate-pulse" style={{ background: iconBg }} />
            )) : courses.map(c => (
              <motion.div key={c.registrationId} variants={itemAnim}>
                <Card style={{ background: card, borderColor: bdr, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 3, background: th.primary }} />
                  <CardContent className="p-4 pt-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MdBookmark className="w-4 h-4" style={{ color: th.primary }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: th.primary }}>{c.code}</p>
                          <p className="text-xs" style={{ color: th.textMuted }}>{c.credits} {t.credits}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: dark ? '#1A2A1A' : '#F0FFF0', color: '#22c55e', border: '1px solid #22c55e44' }}>
                        <MdCheckCircle className="w-3 h-3" /> {t.active}
                      </span>
                    </div>
                    <p className="font-semibold text-sm mb-1" style={{ color: th.text }}>{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                    {c.professor && (
                      <p className="text-xs flex items-center gap-1.5" style={{ color: th.textMuted }}>
                        <MdPerson className="w-3.5 h-3.5" style={{ color: th.primary }} />
                        {t.dr} {c.professor}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        
        {tab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1,2,3].map(i => (
              <div key={i} className="h-48 rounded-xl animate-pulse" style={{ background: iconBg }} />
            )) : courses.map((c, i) => (
              <motion.div key={c.registrationId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 130, delay: i * 0.06 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: th.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MdMenuBook className="w-4 h-4" style={{ color: '#1A1612' }} />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-sm font-bold truncate" style={{ color: th.primary }}>{c.code}</CardTitle>
                        <p className="text-xs truncate" style={{ color: th.textMuted }}>{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {[
                      { icon: <MdDescription className="w-4 h-4" />, name: t.lec1,  size: '2.5 MB', type: 'pdf' },
                      { icon: <MdDescription className="w-4 h-4" />, name: t.lec2,  size: '3.1 MB', type: 'pdf' },
                      { icon: <MdVideoLibrary className="w-4 h-4" />,    name: t.video, size: '45 MB',  type: 'mp4' },
                      { icon: <MdAssignment className="w-4 h-4" />, name: t.hw,    size: '1.2 MB', type: 'pdf' },
                    ].map(f => (
                      <button key={f.name}
                        onClick={() => {
                          const content = `${c.code} — ${loc === 'ar' ? c.nameAr : c.nameEn}\n${f.name}\n\nهذا ملف تجريبي للعرض فقط.`;
                          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${c.code}_${f.name}.${f.type === 'mp4' ? 'txt' : f.type}`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl transition-all"
                        style={{ background: iconBg, border: `1px solid ${bdrL}`, cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = th.primary; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = bdrL; }}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: th.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#1A1612' }}>
                            {f.icon}
                          </div>
                          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                            <p className="text-xs font-bold" style={{ color: th.text }}>{f.name}</p>
                            <p className="text-xs" style={{ color: th.textMuted }}>{f.size}</p>
                          </div>
                        </div>
                        <MdDownload className="w-4 h-4 shrink-0" style={{ color: th.primary }} />
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        {tab === 'grades' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1,2,3].map(i => (
              <div key={i} className="h-48 rounded-xl animate-pulse" style={{ background: iconBg }} />
            )) : courses.map((c, i) => {
              const g = c.grade;
              const total = g?.totalGrade ? Number(g.totalGrade) : null;
              const letter = g?.letterGrade ?? null;
              const status = g?.status ?? null;
              const statusColor = status === 'pass' ? th.primary : status === 'fail' ? '#ef4444' : th.textMuted;
              return (
                <motion.div key={c.registrationId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 130, delay: i * 0.06 }}>
                  <Card style={{ background: card, borderColor: bdr, cursor: 'pointer' }}
                    onClick={() => setSelectedCourse(c)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <MdSchool className="w-4 h-4" style={{ color: th.primary }} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate" style={{ color: th.primary }}>{c.code}</p>
                            <p className="text-xs truncate" style={{ color: th.textMuted }}>{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                          </div>
                        </div>
                        <MdChevronLeft className="w-4 h-4 shrink-0 mt-1" style={{ color: th.primary, transform: dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="text-center p-2 rounded-lg" style={{ background: iconBg }}>
                          <p className="text-xs mb-0.5" style={{ color: th.textMuted }}>{t.currentGrade}</p>
                          <p className="text-lg font-bold" style={{ color: th.text }}>
                            {total !== null ? total.toFixed(1) : '—'}
                            {letter && <span className="text-xs ms-1" style={{ color: th.primary }}>({letter})</span>}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: iconBg }}>
                          <p className="text-xs mb-0.5" style={{ color: th.textMuted }}>{t.gradeStatus}</p>
                          <p className="text-sm font-bold" style={{ color: statusColor }}>
                            {status === 'pass' ? t.passed : status === 'fail' ? t.failed : t.inProgress}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs mb-3">
                        {[
                          { label: t.midterm,  val: g?.midtermGrade   ? `${Number(g.midtermGrade)} / 25`  : t.pending, color: g?.midtermGrade   ? th.primary : th.textMuted },
                          { label: t.final,    val: g?.finalGrade      ? `${Number(g.finalGrade)} / 50`    : t.pending, color: g?.finalGrade      ? '#3b82f6'  : th.textMuted },
                          { label: t.yearWork, val: g?.assignmentGrade ? `${Number(g.assignmentGrade)} / 25` : t.pending, color: g?.assignmentGrade ? '#22c55e' : th.textMuted },
                        ].map(row => (
                          <div key={row.label} className="flex justify-between">
                            <span style={{ color: th.textMuted }}>{row.label}</span>
                            <span className="font-bold" style={{ color: row.color }}>{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
                        style={{ background: iconBg, color: th.primary, border: `1px solid ${bdrL}` }}>
                        {t.viewDetails}
                        <MdChevronLeft className="w-3.5 h-3.5" style={{ transform: dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {selectedCourse && (
        <GradeModal
          course={selectedCourse}
          dir={dir} t={t} th={th}
          card={card} bdr={bdr} bdrL={bdrL} iconBg={iconBg}
          heroBg={heroBg} heroText={heroText}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </DashboardLayout>
  );
}

