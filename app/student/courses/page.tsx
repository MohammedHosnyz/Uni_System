'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Bookmark,
  Clock,
  User,
  CheckCircle2,
  Download,
  FileText,
  Video,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  GraduationCap,
  X,
  TrendingUp,
  Award,
  BarChart3,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'مقرراتي الدراسية',
    loading: 'جاري التحميل...',
    registerNew: 'تسجيل مواد جديدة',
    studentName: 'اسم الطالب',
    studentNum: 'رقم الطالب',
    semesterLabel: 'الفصل الدراسي',
    coursesCount: 'عدد المواد',
    statCourses: 'عدد المواد',
    statHours: 'إجمالي الساعات',
    statStatus: 'الحالة الدراسية',
    statusActive: 'مسجل نشط',
    tabAll: 'جميع المقررات',
    tabMaterials: 'المحتوى الدراسي',
    tabGrades: 'درجاتي الدراسية',
    colNum: '#',
    colCode: 'كود المقرر',
    colName: 'اسم المقرر',
    colCredits: 'الساعات المعززة',
    colProf: 'الأستاذ المحاضر',
    colStatus: 'الحالة',
    active: 'نشط',
    credits: 'ساعة معتمدة',
    lec1: 'المحاضرة الأولى',
    lec2: 'المحاضرة الثانية',
    video: 'شرح تفاعلي (فيديو)',
    hw: 'الواجب المنزلي الأول',
    currentGrade: 'الدرجة الحالية',
    outOf: 'من',
    yearWork: 'أعمال السنة',
    midterm: 'منتصف الفصل الدراسي',
    final: 'الامتحان النهائي',
    pending: 'لم يُعقد بعد',
    viewDetails: 'تفاصيل الدرجة',
    dr: 'د.',
    modalTitle: 'تفاصيل درجات المقرر',
    close: 'إغلاق النافذة',
    courseCode: 'كود المادة',
    courseName: 'اسم المقرر',
    instructor: 'الأستاذ المحاضر',
    creditHours: 'الساعات المعتمدة',
    gradeBreakdown: 'توزيع الدرجات التفصيلي',
    totalGrade: 'الدرجة الإجمالية',
    gradeStatus: 'الحالة الأكاديمية للمقرر',
    inProgress: 'قيد الدراسة',
    passed: 'ناجح',
    failed: 'راسب',
    midtermLabel: 'اختبار المنتصف والأعمال',
    finalLabel: 'الامتحان النهائي الورقي',
    assignmentLabel: 'الأنشطة والواجبات',
    outOf25: 'من 25',
    outOf50: 'من 50',
    outOf100: 'من 100',
    progressNote: 'الامتحان النهائي لم يُعقد بعد',
    gradeScale: 'سلم التقديرات الأكاديمية',
    excellent: 'ممتاز',
    veryGood: 'جيد جداً',
    good: 'جيد',
    pass: 'مقبول',
    fail: 'راسب',
    noData: 'لا توجد مقررات مسجلة في هذا الفصل الدراسي',
  },
  en: {
    title: 'My Courses',
    loading: 'Loading...',
    registerNew: 'Register New Courses',
    studentName: 'Student Name',
    studentNum: 'Student ID',
    semesterLabel: 'Semester',
    coursesCount: 'Courses Count',
    statCourses: 'Enrolled Courses',
    statHours: 'Total Credit Hours',
    statStatus: 'Academic Status',
    statusActive: 'Enrolled Active',
    tabAll: 'All Courses',
    tabMaterials: 'Course Content',
    tabGrades: 'Course Grades',
    colNum: '#',
    colCode: 'Course Code',
    colName: 'Course Title',
    colCredits: 'Credits',
    colProf: 'Instructor',
    colStatus: 'Status',
    active: 'Active',
    credits: 'credit hrs',
    lec1: 'Lecture 1 (PDF)',
    lec2: 'Lecture 2 (PDF)',
    video: 'Interactive Lecture (Video)',
    hw: 'Assignment 1',
    currentGrade: 'Current Grade',
    outOf: 'out of',
    yearWork: 'Year Work',
    midterm: 'Midterm Exam',
    final: 'Final Exam',
    pending: 'Not Held Yet',
    viewDetails: 'View Details',
    dr: 'Dr.',
    modalTitle: 'Detailed Course Grades',
    close: 'Close Window',
    courseCode: 'Course Code',
    courseName: 'Course Title',
    instructor: 'Instructor',
    creditHours: 'Credit Hours',
    gradeBreakdown: 'Grade Breakdown',
    totalGrade: 'Total Score',
    gradeStatus: 'Course Status',
    inProgress: 'In Progress',
    passed: 'Passed',
    failed: 'Failed',
    midtermLabel: 'Midterm & Class Work',
    finalLabel: 'Final Paper Exam',
    assignmentLabel: 'Assignments & Projects',
    outOf25: 'out of 25',
    outOf50: 'out of 50',
    outOf100: 'out of 100',
    progressNote: 'Final exam has not been graded yet',
    gradeScale: 'Academic Grading Scale',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    pass: 'Pass',
    fail: 'Fail',
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
  course, dir, t, onClose,
}: {
  course: CourseItem;
  dir: string;
  t: typeof i18n[keyof typeof i18n];
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
  const statusColorClass = status === 'pass' ? 'text-[#D97706]' : status === 'fail' ? 'text-red-600' : 'text-stone-500';

  const scaleRows = [
    { range: '90–100', label: t.excellent, colorClass: 'text-[#D97706]' },
    { range: '80–89',  label: t.veryGood,  colorClass: 'text-blue-600' },
    { range: '70–79',  label: t.good,      colorClass: 'text-emerald-600' },
    { range: '60–69',  label: t.pass,      colorClass: 'text-orange-600' },
    { range: '0–59',   label: t.fail,      colorClass: 'text-red-600' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-[2px]" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 12 }}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col"
          dir={dir}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-5 border-b border-stone-150 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                <GraduationCap className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#1C1917] dark:text-stone-100">{t.modalTitle}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{course.code}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto space-y-4 max-h-[70vh]">
            {/* Core Info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.courseCode,  value: course.code },
                { label: t.creditHours, value: `${course.credits} ${t.credits}` },
                { label: t.instructor,  value: course.professor ? `${t.dr} ${course.professor}` : '—', span: true },
              ].map((r, idx) => (
                <div key={idx} className={`bg-stone-50/50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/60 rounded-xl p-3 ${r.span ? 'col-span-2' : ''}`}>
                  <p className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 mb-0.5">{r.label}</p>
                  <p className="text-xs font-bold text-stone-850 dark:text-stone-250">{r.value}</p>
                </div>
              ))}
            </div>

            {/* Total Grade Section */}
            <div className="bg-amber-50/60 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">{t.totalGrade}</p>
                    <p className="text-xl font-extrabold text-[#1C1917] dark:text-stone-100">
                      {total !== null ? `${total.toFixed(1)} / 100` : '— / 100'}
                      {letter && <span className="text-xs ms-1.5 font-bold">({letter})</span>}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 ${statusColorClass}`}>
                  {statusLabel}
                </span>
              </div>
              {total !== null && (
                <div className="mt-3 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800">
                  <div className="h-1.5 rounded-full bg-[#FABA19]" style={{ width: `${pct(total, 100)}%` }} />
                </div>
              )}
            </div>

            {/* Grade breakdown */}
            <div className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-stone-50/50 dark:bg-stone-800/40 px-4 py-2.5 border-b border-stone-150 dark:border-stone-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D97706]" />
                <p className="font-extrabold text-xs text-stone-850 dark:text-stone-250">{t.gradeBreakdown}</p>
              </div>
              <div className="p-4 space-y-3.5">
                {[
                  { label: t.midtermLabel,    val: midterm,    max: 25, colorClass: 'bg-[#FABA19]', textClass: 'text-[#D97706]' },
                  { label: t.finalLabel,      val: finalG,     max: 50, colorClass: 'bg-blue-500', textClass: 'text-blue-600' },
                  { label: t.assignmentLabel, val: assignment, max: 25, colorClass: 'bg-emerald-500', textClass: 'text-emerald-600' },
                ].map((r, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-stone-500 dark:text-stone-400">{r.label}</span>
                      <span className={`font-bold ${r.val !== null ? r.textClass : 'text-stone-400 dark:text-stone-500'}`}>
                        {r.val !== null ? `${r.val} / ${r.max}` : t.pending}
                      </span>
                    </div>
                    <div className="h-1 bg-stone-100 dark:bg-stone-800 rounded-full">
                      {r.val !== null && (
                        <div className={`h-1 rounded-full ${r.colorClass}`} style={{ width: `${pct(r.val, r.max)}%` }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grading scale */}
            <div className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-stone-50/50 dark:bg-stone-800/40 px-4 py-2.5 border-b border-stone-150 dark:border-stone-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D97706]" />
                <p className="font-extrabold text-xs text-stone-850 dark:text-stone-250">{t.gradeScale}</p>
              </div>
              <div className="p-3 grid grid-cols-5 gap-2">
                {scaleRows.map((s, idx) => (
                  <div key={idx} className="text-center p-2 rounded-xl bg-stone-50/30 dark:bg-stone-800/10 border border-stone-100 dark:border-stone-800/40">
                    <p className={`text-xs font-bold mb-0.5 ${s.colorClass}`}>{s.range}</p>
                    <p className="text-[10px] font-semibold text-stone-450 dark:text-stone-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-stone-150 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-800/10">
            <Button onClick={onClose} className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm">
              {t.close}
            </Button>
          </div>
        </motion.div>
      </div>
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

  const courses = pageData?.courses ?? [];
  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const semesterName = pageData?.semesterName ?? t.semesterLabel;

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{semesterName}</p>
                  </div>
                </div>
                <Link href="/student/registration"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#FABA19] hover:bg-[#e5a816] transition-colors shadow-sm self-start sm:self-auto"
                >
                  {t.registerNew}
                </Link>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                {[
                  { label: t.studentName,   value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,    value: user.studentNumber ?? '—' },
                  { label: t.semesterLabel, value: semesterName },
                  { label: t.coursesCount,  value: String(courses.length), highlight: true },
                ].map((r, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-semibold">{r.label}</p>
                    <p className={`text-sm font-bold ${r.highlight ? 'text-[#D97706] text-lg' : 'text-stone-850 dark:text-stone-250'}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <BookOpen className="w-5 h-5 text-[#D97706]" />,     label: t.statCourses, value: courses.length },
            { icon: <Clock className="w-5 h-5 text-[#D97706]" />,        label: t.statHours,   value: totalCredits },
            { icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, label: t.statStatus,  value: t.statusActive, success: true },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-semibold mb-1">{s.label}</p>
                    <p className={`text-xl font-bold ${s.success ? 'text-emerald-600' : 'text-stone-850 dark:text-stone-250'}`}>{s.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800">
                    {s.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls / View toggles */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'materials', 'grades'] as Tab[]).map(tabKey => {
              const labels: Record<Tab, string> = { all: t.tabAll, materials: t.tabMaterials, grades: t.tabGrades };
              const active = tab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => handleTabChange(tabKey)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? 'bg-[#FABA19] text-white border-[#FABA19]'
                      : 'bg-stone-50/50 hover:bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/40 dark:hover:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
                  }`}
                >
                  {labels[tabKey]}
                </button>
              );
            })}
          </div>
          {tab === 'all' && (
            <div className="flex gap-1.5">
              {(['list', 'grid'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    view === v
                      ? 'bg-amber-50 text-[#D97706] border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'
                      : 'bg-stone-50/50 border-stone-200 text-stone-500 hover:bg-stone-100 dark:bg-stone-800/40 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800'
                  }`}
                >
                  {v === 'list' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Tabs */}
        {tab === 'all' && view === 'list' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {dataLoading ? (
                  <div className="space-y-3 p-6">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-10 bg-stone-100 dark:bg-stone-850 rounded animate-pulse" />
                    ))}
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{t.noData}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-stone-50/60 dark:bg-stone-800/30">
                        <TableRow className="border-b border-stone-100 dark:border-stone-800">
                          {[t.colNum, t.colCode, t.colName, t.colCredits, t.colProf, t.colStatus].map((h, idx) => (
                            <TableHead key={idx} className="text-xs font-bold text-stone-600 dark:text-stone-400 py-3.5 px-4 text-start whitespace-nowrap">
                              {h}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((c, i) => (
                          <TableRow key={c.registrationId} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/30 dark:hover:bg-stone-800/10 transition-colors">
                            <TableCell className="px-4 py-4 text-xs font-semibold text-stone-450">{i + 1}</TableCell>
                            <TableCell className="px-4 py-4">
                              <span className="text-xs font-mono font-bold text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded">
                                {c.code}
                              </span>
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              <p className="text-xs font-bold text-stone-850 dark:text-stone-100 whitespace-nowrap">{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                              <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold">{loc === 'ar' ? c.nameEn : c.nameAr}</p>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-bold text-stone-850 dark:text-stone-250 tabular-nums">{c.credits}</TableCell>
                            <TableCell className="px-4 py-4 text-xs font-semibold text-stone-500 dark:text-stone-450">
                              {c.professor ? `${t.dr} ${c.professor}` : '—'}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> {t.active}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {tab === 'all' && view === 'grid' && (
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1, 2, 3].map(i => (
              <div key={i} className="h-36 bg-stone-100 dark:bg-stone-800 rounded-2xl animate-pulse" />
            )) : courses.map(c => (
              <motion.div key={c.registrationId} variants={itemAnim}>
                <Card className="border border-stone-150 dark:border-stone-800 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300">
                  <div className="h-1 bg-[#FABA19]" />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                          <Bookmark className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#D97706]">{c.code}</p>
                          <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold">{c.credits} {t.credits}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/40">
                        <CheckCircle2 className="w-3 h-3" /> {t.active}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-stone-850 dark:text-stone-100 mb-1.5 leading-snug">{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                    {c.professor && (
                      <p className="text-xs flex items-center gap-1.5 text-stone-500 dark:text-stone-450 font-medium">
                        <User className="w-3.5 h-3.5 text-[#D97706]" />
                        {t.dr} {c.professor}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Course Materials Tab */}
        {tab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-stone-100 dark:bg-stone-850 rounded-2xl animate-pulse" />
            )) : courses.map((c, i) => (
              <motion.div key={c.registrationId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 130, delay: i * 0.06 }}>
                <Card className="border border-stone-150 dark:border-stone-800 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-800/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-[#D97706]">
                        <BookOpen className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-xs font-extrabold truncate text-[#D97706]">{c.code}</CardTitle>
                        <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold truncate">{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {[
                      { icon: <FileText className="w-4 h-4" />, name: t.lec1,  size: '2.5 MB', type: 'pdf' },
                      { icon: <FileText className="w-4 h-4" />, name: t.lec2,  size: '3.1 MB', type: 'pdf' },
                      { icon: <Video className="w-4 h-4" />,    name: t.video, size: '45 MB',  type: 'mp4' },
                      { icon: <ClipboardList className="w-4 h-4" />, name: t.hw,    size: '1.2 MB', type: 'pdf' },
                    ].map(f => (
                      <button key={f.name}
                        onClick={() => {
                          const content = `${c.code} — ${loc === 'ar' ? c.nameAr : c.nameEn}\n${f.name}\n\nDemo academic material file contents.`;
                          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${c.code}_${f.name}.${f.type === 'mp4' ? 'txt' : f.type}`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-stone-50/50 hover:bg-stone-50 dark:bg-stone-800/20 dark:hover:bg-stone-800/40 border border-stone-100 dark:border-stone-800/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 text-[#D97706]">
                            {f.icon}
                          </div>
                          <div className="text-start">
                            <p className="text-xs font-bold text-stone-850 dark:text-stone-200">{f.name}</p>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">{f.size}</p>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-stone-400 dark:text-stone-500 hover:text-[#D97706] transition-colors" />
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Course Grades Tab */}
        {tab === 'grades' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataLoading ? [1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-stone-100 dark:bg-stone-850 rounded-2xl animate-pulse" />
            )) : courses.map((c, i) => {
              const g = c.grade;
              const total = g?.totalGrade ? Number(g.totalGrade) : null;
              const letter = g?.letterGrade ?? null;
              const status = g?.status ?? null;
              const statusColorClass = status === 'pass' ? 'text-[#D97706]' : status === 'fail' ? 'text-red-600' : 'text-stone-500';
              return (
                <motion.div key={c.registrationId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 130, delay: i * 0.06 }}>
                  <Card className="border border-stone-150 dark:border-stone-800 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCourse(c)}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center shrink-0 text-[#D97706]">
                            <GraduationCap className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-xs text-[#D97706] truncate">{c.code}</p>
                            <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold truncate">{loc === 'ar' ? c.nameAr : c.nameEn}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 rotate-180 dir-ltr:rotate-0" />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 mb-4">
                        <div className="text-center p-2.5 rounded-xl bg-stone-50/50 dark:bg-stone-800/30 border border-stone-100 dark:border-stone-800/40">
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mb-0.5">{t.currentGrade}</p>
                          <p className="text-base font-bold text-stone-850 dark:text-stone-200">
                            {total !== null ? total.toFixed(1) : '—'}
                            {letter && <span className="text-xs ms-1 text-[#D97706]">({letter})</span>}
                          </p>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-stone-50/50 dark:bg-stone-800/30 border border-stone-100 dark:border-stone-800/40">
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mb-0.5">{t.gradeStatus}</p>
                          <p className={`text-xs font-bold ${statusColorClass}`}>
                            {status === 'pass' ? t.passed : status === 'fail' ? t.failed : t.inProgress}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs mb-4">
                        {[
                          { label: t.midterm,  val: g?.midtermGrade   ? `${Number(g.midtermGrade)} / 25`  : t.pending, textClass: g?.midtermGrade ? 'text-[#D97706]' : 'text-stone-400' },
                          { label: t.final,    val: g?.finalGrade      ? `${Number(g.finalGrade)} / 50`    : t.pending, textClass: g?.finalGrade ? 'text-blue-600' : 'text-stone-400' },
                          { label: t.yearWork, val: g?.assignmentGrade ? `${Number(g.assignmentGrade)} / 25` : t.pending, textClass: g?.assignmentGrade ? 'text-emerald-600' : 'text-stone-400' },
                        ].map((row, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-stone-500 dark:text-stone-450 font-semibold">{row.label}</span>
                            <span className={`font-bold ${row.textClass}`}>{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full py-2 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-[#D97706] text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 border border-stone-100 dark:border-stone-750 transition-colors">
                        {t.viewDetails}
                        <ChevronRight className="w-3.5 h-3.5 rotate-180 dir-ltr:rotate-0" />
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
          dir={dir} t={t}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </DashboardLayout>
  );
}
