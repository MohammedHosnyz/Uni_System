'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  GraduationCap, BarChart3, BookOpen, TrendingUp,
  User, Mail, Building2, Printer, ShieldAlert,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'السجل الأكاديمي الشامل',
    subtitle: 'عرض تفصيلي لدرجات المقررات الدراسية، نقاط التقدير، وحساب المعدلات التراكمية',
    academicYear: 'السنة الأكاديمية',
    semester: 'الفصل الدراسي',
    subjects: 'إجمالي المواد المسجلة',
    gpa: 'المعدل التراكمي (GPA)',
    studentData: 'بيانات الملف الأكاديمي للطالب',
    studentName: 'الاسم الكامل للطالب',
    studentCode: 'الرقم الجامعي المميز',
    email: 'البريد الإلكتروني الجامعي',
    faculty: 'الكلية التابع لها',
    dept: 'القسم الأكاديمي',
    program: 'البرنامج التعليمي',
    level: 'المستوى الأكاديمي الحالي',
    enrollYear: 'سنة الالتحاق بالجامعة',
    completedCredits: 'الساعات المكتسبة المنجزة',
    totalRequired: 'الساعات المطلوبة للتخرج',
    subjectDetails: 'تفاصيل نتائج المقررات الدراسية',
    totalSubjects: 'عدد المقررات المنجزة',
    colNum: '#',
    colSemester: 'الفصل الدراسي',
    colCode: 'رمز المادة',
    colName: 'المسمى الأكاديمي للمقرر',
    colCredits: 'الساعات المعتمدة',
    colTotal: 'المجموع الكلي',
    colGrade: 'التقدير الرمزي',
    colPoints: 'نقاط المادة',
    gpaLabel: 'معدل الفصل التراكمي',
    highestLabel: 'أعلى معدل نقاط تم إحرازه',
    perfStats: 'إحصائيات وتحليل الأداء',
    gradeDist: 'توزيع التقديرات المكتسبة',
    semInfo: 'ملخص الساعات الدراسية',
    currentLevel: 'المستوى الدراسي الحالي',
    note: 'ملاحظة هامة',
    noteText: 'هذا السجل يعرض الدرجات المحتسبة رسمياً بعد اعتمادها من الكنترول المركزي.',
    noData: 'لا توجد سجلات أكاديمية معتمدة على هذا الحساب حالياً',
    print: 'طباعة التقرير الرسمي',
    inProgress: 'قيد الدراسة',
  },
  en: {
    title: 'Transcript & Academic Record',
    subtitle: 'Comprehensive overview of course achievements, credits, letter grades, and GPA metrics',
    academicYear: 'Academic Year',
    semester: 'Semester Period',
    subjects: 'Total Registered Courses',
    gpa: 'Cumulative GPA',
    studentData: 'Student Academic Profile',
    studentName: 'Full Student Name',
    studentCode: 'Student ID Code',
    email: 'University Email Address',
    faculty: 'Enrolled Faculty',
    dept: 'Academic Department',
    program: 'Degree Program',
    level: 'Current Level',
    enrollYear: 'Enrollment Academic Year',
    completedCredits: 'Completed Earned Credits',
    totalRequired: 'Required Credits for Graduation',
    subjectDetails: 'Detailed Course Assessment Results',
    totalSubjects: 'Completed Course Modules',
    colNum: '#',
    colSemester: 'Semester',
    colCode: 'Course Code',
    colName: 'Course Title',
    colCredits: 'Credit Hours',
    colTotal: 'Aggregate Score',
    colGrade: 'Letter Grade',
    colPoints: 'Grade Points',
    gpaLabel: 'Cumulative Grade Average',
    highestLabel: 'Highest Grade Point Achieved',
    perfStats: 'Performance Diagnostics',
    gradeDist: 'Letter Grade Distribution',
    semInfo: 'Completed Credits Overview',
    currentLevel: 'Current Academic Year Level',
    note: 'Important Notice',
    noteText: 'The values represented in this transcript are audited and approved by the central registrar.',
    noData: 'No officially approved transcript records exist under your account',
    print: 'Print Official Transcript',
    inProgress: 'In Progress',
  },
} as const;

interface RecordItem {
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

interface StudentInfo {
  email: string;
  studentNumber: string;
  currentLevel: number;
  enrollmentYear: number;
  gpa: number | null;
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
  records: RecordItem[];
}

function gradeColor(letter: string | null): string {
  if (!letter) return '#78716c'; // stone-500
  if (['A+', 'A', 'A-'].includes(letter)) return '#10b981'; // emerald-500
  if (['B+', 'B', 'B-'].includes(letter)) return '#3b82f6'; // blue-500
  if (['C+', 'C', 'C-'].includes(letter)) return '#f59e0b'; // amber-500
  if (['D+', 'D'].includes(letter)) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
}

const GRADE_COLORS: Record<string, string> = {
  'A+': '#10b981', 'A':  '#059669',
  'A-': '#3b82f6', 'B+': '#2563eb',
  'B':  '#06b6d4', 'B-': '#0891b2',
  'C+': '#f59e0b', 'C':  '#d97706', 'C-': '#b45309',
  'D+': '#f97316', 'D':  '#ea580c',
  'F':  '#ef4444',
};

function GradeDistChart({ gradeCounts, dark }: {
  gradeCounts: Record<string, number>;
  dark: boolean;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || Object.keys(gradeCounts).length === 0) return;

    let chart: any;
    let ro: ResizeObserver;

    import('echarts').then(echarts => {
      if (!chartRef.current) return;
      chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

      const sorted = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
      const total  = sorted.reduce((s, [, v]) => s + v, 0);

      const data = sorted.map(([name, value]) => ({
        name,
        value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: GRADE_COLORS[name] ?? '#f59e0b' },
            { offset: 1, color: (GRADE_COLORS[name] ?? '#f59e0b') + 'CC' },
          ]),
          borderRadius: 4,
          borderWidth: 2,
          borderColor: dark ? '#1c1917' : '#ffffff',
        },
      }));

      chart.setOption({
        backgroundColor: 'transparent',
        animation: true,
        animationDuration: 800,
        animationEasing: 'cubicOut',
        tooltip: {
          trigger: 'item',
          backgroundColor: dark ? '#1c1917' : '#ffffff',
          borderColor: dark ? '#292524' : '#e7e5e4',
          borderWidth: 1,
          padding: [8, 12],
          textStyle: { color: dark ? '#f5f5f4' : '#1c1917', fontSize: 11, fontFamily: 'Cairo, sans-serif' },
          formatter: (p: any) =>
            `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${GRADE_COLORS[p.name] ?? '#f59e0b'};margin-inline-end:6px"></span>`
            + `<b>${p.name}</b>: ${p.value} (${((p.value / total) * 100).toFixed(1)}%)`,
          extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.05);border-radius:8px;',
        },
        graphic: [{
          type: 'text',
          left: '28%',
          top: '44%',
          style: {
            text: String(total),
            textAlign: 'center',
            fill: dark ? '#f5f5f4' : '#1c1917',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Cairo, sans-serif',
          },
          z: 100,
        }],
        legend: {
          orient: 'vertical',
          right: '2%',
          top: 'middle',
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 8,
          textStyle: {
            color: dark ? '#a8a29e' : '#78716c',
            fontSize: 10,
            fontFamily: 'Cairo, sans-serif',
            rich: {
              name:  { color: dark ? '#e7e5e4' : '#1c1917', fontWeight: 'bold', fontSize: 10, width: 22 },
              count: { color: dark ? '#a8a29e' : '#78716c', fontSize: 10, width: 16, align: 'right' },
              pct:   { color: '#D97706', fontSize: 10, width: 30, align: 'right' },
            },
          },
          formatter: (name: string) => {
            const count = gradeCounts[name] ?? 0;
            const pct   = ((count / total) * 100).toFixed(0);
            return `{name|${name}}  {count|${count}}  {pct|${pct}%}`;
          },
        },
        series: [{
          type: 'pie',
          radius: ['45%', '75%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: true,
          padAngle: 1.5,
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 5,
            label: {
              show: true,
              position: 'center',
              fontSize: 11,
              fontWeight: 'bold',
              color: dark ? '#f5f5f4' : '#1c1917',
              fontFamily: 'Cairo, sans-serif',
              formatter: (p: any) => `{a|${p.name}}\n{b|${p.value}}`,
              rich: {
                a: { fontSize: 11, fontWeight: 'bold', lineHeight: 16 },
                b: { fontSize: 15, fontWeight: 'bold', lineHeight: 20, color: '#D97706' },
              },
            },
          },
          data,
        }],
      });

      ro = new ResizeObserver(() => chart?.resize());
      ro.observe(chartRef.current!);
    });

    return () => {
      ro?.disconnect();
      chart?.dispose();
    };
  }, [gradeCounts, dark]);

  if (Object.keys(gradeCounts).length === 0) return null;
  return <div ref={chartRef} className="w-full h-[180px]" />;
}

export default function AcademicRecordPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [pageData, setPageData]     = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/academic-record?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setPageData(d);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  const info    = pageData?.student;
  const records = pageData?.records ?? [];
  const gpa     = info?.gpa ?? null;

  const highest = useMemo(() => records.length ? Math.max(...records.map(r => r.gradePoint ?? 0)) : 0, [records]);
  const gradeCounts = useMemo(() => records.reduce<Record<string, number>>((acc, r) => {
    if (r.letterGrade) acc[r.letterGrade] = (acc[r.letterGrade] || 0) + 1;
    return acc;
  }, {}), [records]);

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">{t.subtitle}</p>
                </div>
              </div>
              <Button
                onClick={() => window.print()}
                className="bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                {t.print}
              </Button>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: t.subjects,          value: String(records.length) },
                  { label: t.completedCredits,  value: String(info?.completedCredits ?? 0) },
                  { label: t.totalRequired,     value: String(info?.totalRequired ?? 0) },
                  { label: t.gpa,               value: gpa ? gpa.toFixed(2) : '—', gold: true },
                ].map((r, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex flex-col justify-center items-center">
                    <p className="text-[10px] text-stone-450 dark:text-stone-550 font-bold">{r.label}</p>
                    <p className={`text-base font-bold mt-1 ${r.gold ? 'text-[#D97706]' : 'text-stone-850 dark:text-stone-100'}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Student Profile Block */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <User className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.studentData}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t.studentName,      value: `${user.firstName} ${user.lastName}`,                                    icon: User },
                  { label: t.studentCode,      value: info?.studentNumber ?? user.studentNumber ?? '—',                        icon: GraduationCap },
                  { label: t.email,            value: info?.email ?? user.email ?? '—',                                        icon: Mail },
                  { label: t.faculty,          value: loc === 'ar' ? (info?.facultyNameAr ?? '—') : (info?.facultyNameEn ?? '—'), icon: Building2 },
                  { label: t.dept,             value: loc === 'ar' ? (info?.deptNameAr ?? '—') : (info?.deptNameEn ?? '—'),    icon: Building2 },
                  { label: t.program,          value: loc === 'ar' ? (info?.programNameAr ?? '—') : (info?.programNameEn ?? '—'), icon: BookOpen },
                  { label: t.level,            value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}`, icon: BarChart3 },
                  { label: t.enrollYear,       value: String(info?.enrollmentYear ?? '—'),                                     icon: GraduationCap },
                ].map((r, idx) => (
                  <div key={idx} className="bg-stone-50/20 dark:bg-stone-850/5 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                      <r.icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{r.label}</p>
                      <p className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-0.5 truncate">{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Scores Ledger */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.subjectDetails}</CardTitle>
              </div>
              <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                {t.totalSubjects}: {records.length}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              {dataLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                </div>
              ) : records.length === 0 ? (
                <div className="py-8 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                  {t.noData}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="text-xs">
                    <TableHeader>
                      <tr className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/10 font-bold text-stone-450 dark:text-stone-500 text-start">
                        <TableHead className="px-5 py-3.5 font-bold">{t.colNum}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold">{t.colSemester}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold">{t.colCode}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold">{t.colName}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold text-center">{t.colCredits}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold text-center">{t.colTotal}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold text-center">{t.colGrade}</TableHead>
                        <TableHead className="px-4 py-3.5 font-bold text-center">{t.colPoints}</TableHead>
                      </tr>
                    </TableHeader>
                    <TableBody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {records.map((r, idx) => {
                        const gc = gradeColor(r.letterGrade);
                        return (
                          <TableRow key={r.id} className="hover:bg-stone-50/30 dark:hover:bg-stone-850/10 transition-colors">
                            <TableCell className="px-5 py-4 font-semibold text-stone-450 dark:text-stone-550">{idx + 1}</TableCell>
                            <TableCell className="px-4 py-4 font-semibold text-stone-650 dark:text-stone-400 whitespace-nowrap">{r.semesterName}</TableCell>
                            <TableCell className="px-4 py-4">
                              <span className="font-mono font-bold text-[#D97706]">{r.courseCode}</span>
                            </TableCell>
                            <TableCell className="px-4 py-4 font-bold text-stone-800 dark:text-stone-200">
                              {loc === 'ar' ? r.courseNameAr : r.courseNameEn}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center font-bold text-stone-800 dark:text-stone-200">{r.credits}</TableCell>
                            <TableCell className="px-4 py-4 text-center font-extrabold text-stone-900 dark:text-white">
                              {r.totalGrade !== null ? r.totalGrade.toFixed(1) : '—'}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center">
                              {r.letterGrade ? (
                                <Badge className="border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5" style={{ background: `${gc}18`, color: gc }}>
                                  {r.letterGrade}
                                </Badge>
                              ) : (
                                <span className="text-[10px] font-bold text-stone-400">{t.inProgress}</span>
                              )}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center">
                              {r.gradePoint !== null ? (
                                <Badge className="border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5" style={{ background: `${gc}18`, color: gc }}>
                                  {r.gradePoint.toFixed(2)}
                                </Badge>
                              ) : '—'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between p-5 bg-stone-50/40 dark:bg-stone-800/10 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <span className="font-bold text-stone-500 dark:text-stone-400">{t.gpaLabel}</span>
                    <span className="font-extrabold text-base text-[#D97706]">{gpa ? gpa.toFixed(2) : '—'}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics & Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Performance Summary Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden h-full">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.perfStats}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {[
                  { label: t.gpaLabel,         value: gpa ? gpa.toFixed(2) : '—',          color: 'text-[#D97706]' },
                  { label: t.subjects,          value: String(records.length) },
                  { label: t.completedCredits,  value: String(info?.completedCredits ?? 0) },
                  { label: t.highestLabel,      value: highest ? highest.toFixed(2) : '—',  color: 'text-emerald-500' },
                ].map((r, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-stone-500 dark:text-stone-400">{r.label}</span>
                    <span className={`font-bold ${r.color ?? 'text-stone-850 dark:text-stone-100'}`}>{r.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Grade Distribution Graph Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden h-full">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.gradeDist}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {Object.keys(gradeCounts).length === 0 ? (
                  <div className="py-8 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                    {t.noData}
                  </div>
                ) : (
                  <GradeDistChart
                    gradeCounts={gradeCounts}
                    dark={dark}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Completion Status & Targets */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden h-full">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.semInfo}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {[
                  { label: t.currentLevel,     value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}`, color: 'text-[#D97706]' },
                  { label: t.enrollYear,        value: String(info?.enrollmentYear ?? '—') },
                  { label: t.completedCredits,  value: `${info?.completedCredits ?? 0} / ${info?.totalRequired ?? 0}` },
                ].map((r, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-stone-500 dark:text-stone-400">{r.label}</span>
                    <span className={`font-bold ${r.color ?? 'text-stone-850 dark:text-stone-100'}`}>{r.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

        </div>

      </div>
    </DashboardLayout>
  );
}
