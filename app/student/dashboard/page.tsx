'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cairo } from 'next/font/google';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  BookOpen, GraduationCap, TrendingUp, Calendar, Clock,
  CheckCircle2, Award, Target, BarChart3,
  FileText, CreditCard, Bell, ChevronRight, BookMarked,
  CalendarDays, MapPin,
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const i18n = {
  ar: {
    loading: 'جاري التحميل...',
    welcome: 'مرحباً بك مجدداً',
    subtitle: 'لوحة التحكم الأكاديمية للطالب للخدمات والنتائج',
    gpaLabel: 'المعدل التراكمي العام',
    stats: {
      courses: 'المقررات المسجلة', thisSemester: 'الفصل الدراسي الحالي',
      credits: 'الساعات المنجزة', complete: 'من الساعات المطلوبة',
      attendance: 'نسبة الحضور', excellent: 'معدل الحضور الكلي',
      gpaTrend: 'مؤشر التقديرات', improving: 'مستواك الأكاديمي ممتاز',
    },
    myCourses: 'مقرراتي الدراسية الحالية', viewAll: 'عرض التفاصيل',
    progress: 'التقدم الأكاديمي', instructor: 'أستاذ المقرر:',
    weeklyActivity: 'ساعات الدراسة الأسبوعية المقررة', studyHours: 'توزيع ساعات الاستذكار والنشاط الدراسي الأسبوعي',
    todaySchedule: 'جدول محاضرات ولقاءات اليوم', fullSchedule: 'الجدول الكامل',
    progressOverview: 'خطة إنجاز الساعات المعتمدة',
    completed: 'الساعات المنجزة', remaining: 'الساعات المتبقية', totalRequired: 'الساعات المطلوبة للتخرج',
    credits: 'ساعة معتمدة', quickActions: 'وصول سريع للخدمات الإلكترونية',
    actions: {
      registration: 'تسجيل المقررات', grades: 'عرض الدرجات والتقديرات',
      schedule: 'جدولي الدراسي الأسبوعي', payments: 'الرسوم والمدفوعات',
    },
    notifications: 'النتائج والدرجات المعتمدة حديثاً',
    schedule: {
      completed: 'منتهية', current: 'محاضرة جارية حالياً', upcoming: 'قادمة قريباً',
    },
    days: { Mon: 'الإثنين', Tue: 'الثلاثاء', Wed: 'الأربعاء', Thu: 'الخميس', Fri: 'الجمعة', Sat: 'السبت', Sun: 'الأحد' },
  },
  en: {
    loading: 'Loading dashboard metrics...',
    welcome: 'Welcome Back',
    subtitle: 'Student academic performance and resources dashboard',
    gpaLabel: 'Cumulative GPA',
    stats: {
      courses: 'Enrolled Courses', thisSemester: 'Current active term',
      credits: 'Completed Credits', complete: 'of graduation requirements',
      attendance: 'Attendance Rate', excellent: 'Overall rate',
      gpaTrend: 'Academic Standing', improving: 'Excellent academic standing',
    },
    myCourses: 'Current Term Courses', viewAll: 'View Details',
    progress: 'Academic Progress', instructor: 'Instructor:',
    weeklyActivity: 'Weekly Academic Study Activity', studyHours: 'Recorded weekly study hours distribution',
    todaySchedule: "Today's Class Schedule", fullSchedule: 'Full Schedule',
    progressOverview: 'Degree Completion Credits Map',
    completed: 'Completed Credits', remaining: 'Remaining Credits', totalRequired: 'Total Graduation Target',
    credits: 'credits', quickActions: 'Academic Quick Access Links',
    actions: {
      registration: 'Course Registration', grades: 'Academic Transcript',
      schedule: 'Weekly Schedule Map', payments: 'Tuition Fees Portal',
    },
    notifications: 'Recently Approved Results & Grades',
    schedule: {
      completed: 'Completed', current: 'In Progress Now', upcoming: 'Upcoming Next',
    },
    days: { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' },
  },
} as const;

interface ScheduleEntry {
  id: number;
  startTime: string;
  endTime: string;
  sessionType: string;
  status: 'completed' | 'current' | 'upcoming';
  course: { nameAr: string; nameEn: string; code: string };
  classroom: { code: string; name: string; building: string };
  professor: { name: string; title: string } | null;
}

interface CourseReg {
  id: number;
  course: { nameAr: string; nameEn: string; code: string; credits: number };
  professor: { name: string } | null;
  grade: { totalGrade: string | null; letterGrade: string | null; status: string | null } | null;
}

interface RecentGrade {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  semesterName: string;
  totalGrade: string | null;
  letterGrade: string | null;
  status: string | null;
  updatedAt: string;
}

interface DashboardData {
  gpa: string | null;
  currentLevel: number;
  totalCredits: number;
  completedCredits: number;
  registeredCoursesCount: number;
  attendanceRate: number | null;
  todaySchedule: ScheduleEntry[];
  registrations: CourseReg[];
  recentGrades: RecentGrade[];
}

export default function StudentDashboard() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [dashLoading, setDashLoading] = useState(true);

  const tx  = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    if (!user?.id) return;
    setDashLoading(true);
    fetch(`/api/students/dashboard?studentId=${user.id}`)
      .then(r => r.json())
      .then(data => {
        setDashData(data);
        setDashLoading(false);
      })
      .catch(() => setDashLoading(false));
  }, [user?.id]);

  const gpa              = parseFloat(dashData?.gpa ?? '0') || 0;
  const completedCredits = dashData?.completedCredits ?? 0;
  const totalCredits     = dashData?.totalCredits ?? 132;
  const registeredCourses = dashData?.registeredCoursesCount ?? 0;
  const attendanceRate   = dashData?.attendanceRate ?? null;
  const progress = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  const weeklyActivity = useMemo(() => [
    { day: tx.days.Mon, hours: 4 }, { day: tx.days.Tue, hours: 6 },
    { day: tx.days.Wed, hours: 5 }, { day: tx.days.Thu, hours: 7 },
    { day: tx.days.Fri, hours: 3 }, { day: tx.days.Sat, hours: 2 },
    { day: tx.days.Sun, hours: 1 },
  ], [tx]);

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className={`${cairo.className} max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6`}>

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 flex justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#FABA19]/10 shrink-0">
                  <img
                    src={user.avatarUrl ?? (user.gender === 'female' ? '/default-avatar-female.png' : '/default-avatar.png')}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">
                    {tx.welcome}، {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">{tx.subtitle}</p>
                </div>
              </div>
              <div className="text-end">
                <p className="text-[10px] text-stone-450 dark:text-stone-550 font-bold uppercase">{tx.gpaLabel}</p>
                <p className="text-3xl font-extrabold text-[#D97706] mt-0.5">{gpa > 0 ? gpa.toFixed(2) : '—'}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BookOpen,     label: tx.stats.courses, value: registeredCourses, sub: tx.stats.thisSemester, color: 'text-blue-500' },
            { icon: CheckCircle2, label: tx.stats.credits, value: completedCredits, sub: `${progress.toFixed(0)}% ${tx.stats.complete}`, color: 'text-emerald-500' },
            { icon: Target,       label: tx.stats.attendance, value: attendanceRate !== null ? `${attendanceRate}%` : '—', sub: tx.stats.excellent, color: 'text-[#D97706]' },
            { icon: TrendingUp,   label: tx.gpaLabel, value: gpa > 0 ? gpa.toFixed(2) : '—', sub: tx.stats.improving, color: 'text-blue-600' },
          ].map((s, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{s.label}</p>
                    <p className="text-xl font-bold text-stone-850 dark:text-stone-100 mt-0.5">{s.value}</p>
                    <p className="text-[9px] text-stone-450 dark:text-stone-500 font-bold mt-0.5 truncate">{s.sub}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Block (Courses, Schedule, Graph) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Current Enrolled Courses */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <BookMarked className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.myCourses}</CardTitle>
                  </div>
                  <Link href="/student/courses">
                    <Button variant="ghost" className="text-xs font-bold text-[#D97706] p-0 hover:bg-transparent">
                      {tx.viewAll} <ChevronRight className="w-4 h-4 rotate-180 dir-ltr:rotate-0" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {dashLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="w-6 h-6 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                    </div>
                  ) : (dashData?.registrations ?? []).length === 0 ? (
                    <div className="py-6 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                      {locale === 'ar' ? 'لا توجد مقررات مسجلة حالياً للفصل الحالي' : 'No registered courses currently'}
                    </div>
                  ) : (
                    (dashData?.registrations ?? []).slice(0, 3).map((c) => (
                      <div key={c.id} className="p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono font-bold text-[10px] text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded">{c.course.code}</span>
                            <p className="text-xs font-bold text-stone-850 dark:text-stone-100 truncate">
                              {locale === 'ar' ? c.course.nameAr : c.course.nameEn}
                            </p>
                          </div>
                          {c.professor && (
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">{tx.instructor} {c.professor.name}</p>
                          )}
                          {c.grade?.totalGrade && (
                            <div className="flex items-center justify-between text-[10px] mt-1.5 border-t border-stone-100 dark:border-stone-800/40 pt-1.5 font-bold">
                              <span className="text-stone-450">{locale === 'ar' ? 'الدرجة المسجلة' : 'Recorded Grade'}</span>
                              <span className="text-[#D97706]">{c.grade.letterGrade} ({Number(c.grade.totalGrade).toFixed(0)})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Activity Line Chart */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.weeklyActivity}</CardTitle>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">{tx.studyHours}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ReactECharts
                    style={{ height: 180 }}
                    option={{
                      grid: { top: 15, bottom: 25, left: 30, right: 10 },
                      tooltip: {
                        trigger: 'axis',
                        backgroundColor: dark ? '#1c1917' : '#ffffff',
                        borderColor: dark ? '#292524' : '#e7e5e4',
                        textStyle: { color: dark ? '#f5f5f4' : '#1c1917', fontFamily: 'Cairo, sans-serif', fontSize: 11 },
                        formatter: (p: { name: string; value: number }[]) => `${p[0].name}: ${p[0].value} hrs`,
                      },
                      xAxis: {
                        type: 'category',
                        data: weeklyActivity.map((d) => d.day),
                        axisLine: { lineStyle: { color: dark ? '#292524' : '#e7e5e4' } },
                        axisTick: { show: false },
                        axisLabel: { color: dark ? '#a8a29e' : '#78716c', fontSize: 9, fontFamily: 'Cairo, sans-serif' },
                      },
                      yAxis: {
                        type: 'value',
                        splitLine: { lineStyle: { color: dark ? '#292524' : '#f5f5f4', type: 'dashed' } },
                        axisLabel: { color: dark ? '#a8a29e' : '#78716c', fontSize: 9 },
                      },
                      series: [{
                        type: 'line',
                        data: weeklyActivity.map((d) => d.hours),
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: { color: '#FABA19', width: 2 },
                        itemStyle: { color: '#FABA19', borderColor: dark ? '#1c1917' : '#ffffff', borderWidth: 1.5 },
                        areaStyle: {
                          color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                              { offset: 0, color: 'rgba(250, 186, 25, 0.2)' },
                              { offset: 1, color: 'rgba(250, 186, 25, 0)' },
                            ],
                          },
                        },
                      }],
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Class Schedule Directory */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.todaySchedule}</CardTitle>
                  </div>
                  <Link href="/student/schedule">
                    <Button variant="ghost" className="text-xs font-bold text-[#D97706] p-0 hover:bg-transparent">
                      {tx.fullSchedule} <ChevronRight className="w-4 h-4 rotate-180 dir-ltr:rotate-0" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  {dashLoading ? (
                    <div className="p-4 flex justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                    </div>
                  ) : !(dashData?.todaySchedule ?? []).length ? (
                    <div className="py-8 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                      {locale === 'ar' ? 'لا توجد محاضرات مدرجة اليوم في جدولك' : 'No classes scheduled today'}
                    </div>
                  ) : (() => {
                    const rows = dashData?.todaySchedule ?? [];
                    const statusCfg = {
                      completed: { label: tx.schedule.completed, textColor: 'text-stone-400', bg: 'bg-stone-50 dark:bg-stone-800/40 border-stone-100 dark:border-stone-800', dot: 'bg-stone-400' },
                      current:   { label: tx.schedule.current,   textColor: 'text-[#D97706]', bg: 'bg-amber-50/50 dark:bg-amber-950/10 border-amber-100/60 dark:border-amber-900/30', dot: 'bg-[#FABA19]' },
                      upcoming:  { label: tx.schedule.upcoming,  textColor: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100/60 dark:border-blue-900/30', dot: 'bg-blue-500' },
                    };
                    return (
                      <div className="overflow-x-auto">
                        <Table className="text-xs">
                          <TableHeader className="bg-stone-50/40 dark:bg-stone-800/10">
                            <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-450 font-bold text-start">
                              <TableHead className="px-4 py-2.5 font-bold">{locale === 'ar' ? 'التوقيت' : 'Time Slot'}</TableHead>
                              <TableHead className="px-4 py-2.5 font-bold">{locale === 'ar' ? 'المقرر الدراسي' : 'Course Modules'}</TableHead>
                              <TableHead className="px-4 py-2.5 font-bold">{locale === 'ar' ? 'قاعة الدراسة' : 'Classroom'}</TableHead>
                              <TableHead className="px-4 py-2.5 font-bold">{locale === 'ar' ? 'حالة الحصة' : 'Status'}</TableHead>
                            </tr>
                          </TableHeader>
                          <TableBody className="divide-y divide-stone-100 dark:divide-stone-800">
                            {rows.map((s, rIdx) => {
                              const cfg = statusCfg[s.status];
                              const isCurrent = s.status === 'current';
                              return (
                                <TableRow key={rIdx} className={`hover:bg-stone-50/20 dark:hover:bg-stone-850/10 transition-colors ${isCurrent ? 'bg-amber-50/10 dark:bg-amber-900/10' : ''}`}>
                                  <TableCell className="px-4 py-3.5 font-mono font-bold text-stone-500 dark:text-stone-400 whitespace-nowrap">{s.startTime} - {s.endTime}</TableCell>
                                  <TableCell className="px-4 py-3.5 font-bold text-stone-850 dark:text-stone-150">
                                    {locale === 'ar' ? s.course.nameAr : s.course.nameEn}
                                  </TableCell>
                                  <TableCell className="px-4 py-3.5">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-100 dark:border-stone-800">
                                      <MapPin className="w-2.5 h-2.5 text-[#D97706]" />
                                      {s.classroom.code}
                                    </span>
                                  </TableCell>
                                  <TableCell className="px-4 py-3.5">
                                    <Badge className={`border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5 rounded-lg ${cfg.bg} ${cfg.textColor}`}>
                                      <span className={`w-1 h-1 rounded-full ${cfg.dot} inline-block mx-1`} />
                                      {cfg.label}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Block (Progress ring, Actions, Alert box) */}
          <div className="space-y-6">

            {/* Total Completion Progress ring */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.progressOverview}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <ReactECharts
                    style={{ height: 180 }}
                    option={{
                      tooltip: { show: false },
                      series: [{
                        type: 'pie',
                        radius: ['65%', '85%'],
                        center: ['50%', '50%'],
                        startAngle: 90,
                        data: [
                          {
                            value: completedCredits,
                            name: tx.completed,
                            itemStyle: { color: '#FABA19', borderRadius: 4 },
                          },
                          {
                            value: Math.max(totalCredits - completedCredits, 0),
                            name: tx.remaining,
                            itemStyle: { color: dark ? '#292524' : '#f5f5f4', borderRadius: 4 },
                          },
                        ],
                        label: {
                          show: true,
                          position: 'center',
                          formatter: () => `{pct|${progress.toFixed(0)}%}\n{sub|${tx.completed}}`,
                          rich: {
                            pct: {
                              fontSize: 24,
                              fontWeight: 'bold',
                              color: dark ? '#f5f5f4' : '#1c1917',
                              fontFamily: 'Cairo, sans-serif',
                              lineHeight: 30,
                            },
                            sub: {
                              fontSize: 10,
                              fontWeight: 'bold',
                              color: '#78716c',
                              fontFamily: 'Cairo, sans-serif',
                              lineHeight: 16,
                            },
                          },
                        },
                        emphasis: { scale: false },
                        labelLine: { show: false },
                      }],
                    }}
                  />
                  <div className="space-y-2 border-t border-stone-50 dark:border-stone-800/60 pt-3.5">
                    {[
                      { label: tx.completed,     value: `${completedCredits} ${tx.credits}`, colorClass: 'text-[#D97706]' },
                      { label: tx.remaining,     value: `${Math.max(totalCredits - completedCredits, 0)} ${tx.credits}`, colorClass: 'text-stone-450 dark:text-stone-400' },
                      { label: tx.totalRequired, value: `${totalCredits} ${tx.credits}`, colorClass: 'text-stone-850 dark:text-stone-200' },
                    ].map((r, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-semibold">
                        <span className="text-stone-500 dark:text-stone-400">{r.label}</span>
                        <span className={`font-bold ${r.colorClass}`}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.quickActions}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {[
                    { href: '/student/registration', icon: FileText,   label: tx.actions.registration },
                    { href: '/student/grades',        icon: Award,      label: tx.actions.grades },
                    { href: '/student/schedule',      icon: Calendar,   label: tx.actions.schedule },
                    { href: '/student/payments',      icon: CreditCard, label: tx.actions.payments },
                  ].map((a, idx) => (
                    <Button key={idx} variant="ghost" className="w-full justify-start gap-3 font-bold hover:bg-stone-50/50 dark:hover:bg-stone-850/15 rounded-xl px-3.5 py-5.5 text-stone-750 dark:text-stone-300" asChild>
                      <Link href={a.href}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-stone-50 dark:bg-stone-800 border border-stone-150 dark:border-stone-800 text-[#D97706] hover:text-[#e5a816]">
                          <a.icon className="w-4 h-4" />
                        </div>
                        <span className="flex-1 text-xs">{a.label}</span>
                        <ChevronRight className="w-4 h-4 text-stone-400 rotate-180 dir-ltr:rotate-0" />
                      </Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Latest Announced Grade Notifications */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#D97706]" />
                      <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{tx.notifications}</CardTitle>
                    </div>
                    <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[10px] font-bold px-2 py-0.5">
                      {dashData?.recentGrades?.length ?? 0}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {dashLoading ? (
                    <div className="p-4 flex justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                    </div>
                  ) : (dashData?.recentGrades ?? []).length === 0 ? (
                    <div className="py-6 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                      {locale === 'ar' ? 'لا توجد إشعارات درجات جديدة' : 'No new grade notifications'}
                    </div>
                  ) : (
                    (dashData?.recentGrades ?? []).map((g) => {
                      const isPassed = g.status === 'pass';
                      const cfg = isPassed
                        ? { bar: 'bg-emerald-500', bg: 'bg-emerald-50/10' }
                        : { bar: 'bg-stone-300 dark:bg-stone-700', bg: '' };
                      const title = locale === 'ar'
                        ? `إعلان تقدير ${g.courseNameAr}`
                        : `Grade declared for ${g.courseNameEn}`;
                      const desc = g.letterGrade
                        ? `${g.semesterName} — التقدير الأكاديمي: ${g.letterGrade} (${Number(g.totalGrade ?? 0).toFixed(0)}/100)`
                        : g.semesterName;
                      const time = new Date(g.updatedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
                      return (
                        <div key={g.id} className={`flex items-start gap-3 px-4 py-3 relative border-b border-stone-50 dark:border-stone-800/40 hover:bg-stone-50/10 ${cfg.bg}`}>
                          <span className={`absolute start-0 top-3 bottom-3 w-1 rounded-full ${cfg.bar}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-bold leading-snug text-stone-800 dark:text-stone-150">{title}</p>
                              <span className="text-[9px] font-semibold text-stone-400 shrink-0">{time}</span>
                            </div>
                            <p className="text-[10px] text-stone-450 dark:text-stone-550 mt-0.5 leading-normal">{desc}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </motion.div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
