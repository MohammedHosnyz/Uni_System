'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import {
  GraduationCap,
  Clock,
  Printer,
  BookOpen,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'كشف الدرجات الأكاديمي',
    print: 'طباعة التقرير',
    studentName: 'اسم الطالب',
    studentNum: 'رقم الطالب',
    faculty: 'الكلية',
    dept: 'القسم',
    level: 'المستوى',
    gpa: 'المعدل التراكمي (GPA)',
    earnedHours: 'الساعات المكتسبة',
    filterAll: 'جميع المواد',
    filterDone: 'المكتملة',
    filterCurrent: 'قيد الدراسة',
    colNum: '#',
    colSemester: 'الفصل الدراسي',
    colCode: 'كود المادة',
    colName: 'اسم المادة',
    colCredits: 'الساعات',
    colMid: 'أعمال السنة / المنتصف',
    colFinal: 'النهائي',
    colAssign: 'الأنشطة والواجبات',
    colTotal: 'المجموع',
    colGrade: 'التقدير',
    inProgress: 'قيد الدراسة',
    pending: '—',
    sumDone: 'المواد المجتازة',
    sumCurrent: 'المواد الحالية',
    sumRemaining: 'الساعات المتبقية',
    noData: 'لا توجد درجات مسجلة لعرضها',
  },
  en: {
    title: 'Academic Transcript',
    print: 'Print Transcript',
    studentName: 'Student Name',
    studentNum: 'Student ID',
    faculty: 'Faculty',
    dept: 'Department',
    level: 'Level',
    gpa: 'Cumulative GPA',
    earnedHours: 'Earned Credits',
    filterAll: 'All Courses',
    filterDone: 'Completed',
    filterCurrent: 'In Progress',
    colNum: '#',
    colSemester: 'Semester',
    colCode: 'Code',
    colName: 'Course Title',
    colCredits: 'Credits',
    colMid: 'Midterm / Work',
    colFinal: 'Final Exam',
    colAssign: 'Assignments',
    colTotal: 'Total',
    colGrade: 'Grade',
    inProgress: 'In Progress',
    pending: '—',
    sumDone: 'Passed Courses',
    sumCurrent: 'In Progress',
    sumRemaining: 'Remaining Hours',
    noData: 'No grades recorded to display',
  },
} as const;

type View = 'all' | 'completed' | 'current';

interface GradeItem {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  semesterName: string;
  semesterYear: number;
  midtermGrade: number | null;
  finalGrade: number | null;
  assignmentGrade: number | null;
  totalGrade: number | null;
  letterGrade: string | null;
  gradePoint: number | null;
  status: string | null;
}

interface InProgressItem {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  semesterName: string;
  semesterYear: number;
}

interface StudentInfo {
  currentLevel: number;
  gpa: string | null;
  completedCredits: number;
  totalRequired: number;
  programNameAr: string;
  programNameEn: string;
  deptNameAr: string;
  deptNameEn: string;
  facultyNameAr: string;
  facultyNameEn: string;
}

interface PageData {
  student: StudentInfo;
  grades: GradeItem[];
  inProgress: InProgressItem[];
}

function getGradeBadgeStyle(letter: string | null): string {
  if (!letter) return 'bg-stone-50 text-stone-600 border border-stone-200';
  if (['A+', 'A', 'A-'].includes(letter)) return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
  if (['B+', 'B', 'B-'].includes(letter)) return 'bg-blue-50 text-blue-700 border border-blue-100';
  if (['C+', 'C', 'C-'].includes(letter)) return 'bg-amber-50 text-amber-700 border border-amber-100';
  if (['D+', 'D'].includes(letter)) return 'bg-orange-50 text-orange-700 border border-orange-100';
  return 'bg-red-50 text-red-700 border border-red-100';
}

export default function GradesPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [view, setView] = useState<View>('all');
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/grades?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setPageData(d); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  if (loading || !user) return null;

  const info       = pageData?.student;
  const allGrades  = pageData?.grades ?? [];
  const inProgress = pageData?.inProgress ?? [];
  const completed  = allGrades.filter(g => g.status === 'pass' || g.status === 'fail');
  const remaining  = (info?.totalRequired ?? 136) - (info?.completedCredits ?? 0);

  const display: Array<GradeItem | (InProgressItem & { _inProgress: true })> =
    view === 'completed' ? completed :
    view === 'current'   ? inProgress.map(r => ({ ...r, _inProgress: true as const })) :
    [...allGrades, ...inProgress.map(r => ({ ...r, _inProgress: true as const }))];

  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };

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
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {user.firstName} {user.lastName} • {user.studentNumber ?? '—'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#FABA19] hover:bg-[#e5a816] transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Printer className="h-4 w-4" />
                  {t.print}
                </button>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                {[
                  { label: t.studentName, value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,  value: user.studentNumber ?? '—' },
                  { label: t.faculty,     value: loc === 'ar' ? (info?.facultyNameAr ?? '—') : (info?.facultyNameEn ?? '—') },
                  { label: t.dept,        value: loc === 'ar' ? (info?.deptNameAr ?? '—') : (info?.deptNameEn ?? '—') },
                  { label: t.level,       value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}` },
                  { label: loc === 'ar' ? 'البرنامج' : 'Program', value: loc === 'ar' ? (info?.programNameAr ?? '—') : (info?.programNameEn ?? '—') },
                  { label: t.gpa,         value: info?.gpa ?? '—', highlight: true },
                  { label: t.earnedHours, value: String(info?.completedCredits ?? 0), success: true },
                ].map((r, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-semibold">{r.label}</p>
                    <p className={`text-sm font-bold ${
                      r.highlight ? 'text-[#D97706] text-lg' :
                      r.success ? 'text-emerald-600 dark:text-emerald-500' :
                      'text-stone-850 dark:text-stone-200'
                    }`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-450">
            <BookOpen className="h-5 w-5 text-[#D97706]" />
            <span className="text-xs font-bold">
              {loc === 'ar' ? 'تصنيف السجل الأكاديمي' : 'Filter Academic Record'}
            </span>
          </div>
          <div className="flex gap-2">
            {([['all', t.filterAll], ['completed', t.filterDone], ['current', t.filterCurrent]] as [View, string][]).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  view === v
                    ? 'bg-[#FABA19] text-white border-[#FABA19]'
                    : 'bg-stone-50/50 hover:bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/40 dark:hover:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {dataLoading ? (
                <div className="space-y-3 p-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-10 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
                  ))}
                </div>
              ) : display.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-stone-350 mx-auto mb-3" />
                  <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{t.noData}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-stone-50/60 dark:bg-stone-800/30">
                      <TableRow className="border-b border-stone-100 dark:border-stone-800">
                        {[
                          t.colNum, t.colSemester, t.colCode, t.colName, t.colCredits,
                          t.colMid, t.colFinal, t.colAssign, t.colTotal, t.colGrade
                        ].map((h, i) => (
                          <TableHead key={i} className="text-xs font-bold text-stone-600 dark:text-stone-400 py-3.5 px-4 text-start whitespace-nowrap">
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {display.map((row, i) => {
                        const isIP = '_inProgress' in row;
                        const g = isIP ? null : row as GradeItem;
                        const ip = isIP ? row as InProgressItem & { _inProgress: true } : null;
                        const code = isIP ? ip!.courseCode : g!.courseCode;
                        const nameAr = isIP ? ip!.courseNameAr : g!.courseNameAr;
                        const nameEn = isIP ? ip!.courseNameEn : g!.courseNameEn;
                        const credits = isIP ? ip!.credits : g!.credits;
                        const sem = isIP ? ip!.semesterName : g!.semesterName;

                        return (
                          <TableRow
                            key={`${isIP ? 'ip' : 'g'}-${row.id}`}
                            className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/30 dark:hover:bg-stone-800/10 transition-colors"
                          >
                            <TableCell className="px-4 py-4 text-xs font-semibold text-stone-450">{i + 1}</TableCell>
                            <TableCell className="px-4 py-4 text-xs font-bold text-stone-600 dark:text-stone-300 whitespace-nowrap">{sem}</TableCell>
                            <TableCell className="px-4 py-4">
                              <span className="text-xs font-mono font-bold text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded">
                                {code}
                              </span>
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              <p className="text-xs font-bold text-stone-800 dark:text-stone-100 whitespace-nowrap">{loc === 'ar' ? nameAr : nameEn}</p>
                              <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold">{loc === 'ar' ? nameEn : nameAr}</p>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-bold text-center text-stone-800 dark:text-stone-200">{credits}</TableCell>
                            <TableCell className="px-4 py-4 text-xs font-semibold text-center text-stone-600 dark:text-stone-400">
                              {g?.midtermGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-semibold text-center text-stone-600 dark:text-stone-400">
                              {g?.finalGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-semibold text-center text-stone-600 dark:text-stone-400">
                              {g?.assignmentGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-bold text-center text-stone-800 dark:text-stone-100">
                              {g?.totalGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center whitespace-nowrap">
                              {isIP ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded-full">
                                  <Clock className="h-3 w-3" /> {t.inProgress}
                                </span>
                              ) : (
                                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${getGradeBadgeStyle(g!.letterGrade)}`}>
                                  {g!.letterGrade ?? t.pending}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Overview Stats Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: <CheckCircle2 className="h-5 w-5" />, label: t.sumDone,     value: completed.length,  badgeColor: 'bg-emerald-500/10 text-emerald-600' },
            { icon: <Clock className="h-5 w-5" />,        label: t.sumCurrent,  value: inProgress.length, badgeColor: 'bg-amber-500/10 text-[#D97706]' },
            { icon: <TrendingUp className="h-5 w-5" />,  label: t.sumRemaining, value: remaining,         badgeColor: 'bg-blue-500/10 text-blue-600' },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-semibold mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.badgeColor}`}>
                    {s.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
