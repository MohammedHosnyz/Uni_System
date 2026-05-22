'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cairo } from 'next/font/google';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  BookOpen, GraduationCap, TrendingUp, Calendar, Clock,
  CheckCircle2, AlertCircle, Award, Target, BarChart3,
  FileText, CreditCard, Bell, ChevronRight, BookMarked,
  CalendarDays, MapPin,
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });


const i18n = {
  ar: {
    loading: 'جاري التحميل...',
    welcome: 'مرحباً',
    subtitle: 'لوحة التحكم الخاصة بك',
    gpaLabel: 'المعدل التراكمي',
    stats: {
      courses: 'المقررات المسجلة', thisSemester: 'هذا الفصل',
      credits: 'الساعات المكتملة', complete: 'مكتمل',
      attendance: 'نسبة الحضور', excellent: 'ممتاز',
      gpaTrend: 'تحسن المعدل', improving: 'في تحسن مستمر',
    },
    myCourses: 'مقرراتي الدراسية', viewAll: 'عرض الكل',
    progress: 'التقدم', instructor: 'الدكتور',
    weeklyActivity: 'النشاط الأسبوعي', studyHours: 'ساعات الدراسة هذا الأسبوع',
    todaySchedule: 'جدول اليوم', fullSchedule: 'الجدول الكامل',
    progressOverview: 'نظرة عامة على التقدم',
    completed: 'مكتمل', remaining: 'متبقي', totalRequired: 'المطلوب',
    credits: 'ساعة', quickActions: 'إجراءات سريعة',
    actions: {
      registration: 'تسجيل المقررات', grades: 'عرض الدرجات',
      schedule: 'جدولي الدراسي', payments: 'المدفوعات',
    },
    notifications: 'الإشعارات',
    notif: {
      gradesPosted: 'تم نشر الدرجات', gradesDesc: 'درجات CS101 متاحة الآن',
      regDeadline: 'موعد نهائي للتسجيل', regDesc: 'آخر يوم: 15 يناير',
      upcomingExam: 'امتحان قادم', examDesc: 'امتحان CS201 يوم الأحد',
    },
    schedule: {
      completed: 'انتهى', current: 'جارٍ الآن', upcoming: 'قادم',
    },
    days: { Mon: 'الإثنين', Tue: 'الثلاثاء', Wed: 'الأربعاء', Thu: 'الخميس', Fri: 'الجمعة', Sat: 'السبت', Sun: 'الأحد' },
  },
  en: {
    loading: 'Loading...',
    welcome: 'Welcome',
    subtitle: 'Your personal dashboard',
    gpaLabel: 'GPA',
    stats: {
      courses: 'Enrolled Courses', thisSemester: 'This semester',
      credits: 'Completed Credits', complete: 'complete',
      attendance: 'Attendance Rate', excellent: 'Excellent',
      gpaTrend: 'GPA Trend', improving: 'Improving',
    },
    myCourses: 'My Courses', viewAll: 'View All',
    progress: 'Progress', instructor: 'Dr.',
    weeklyActivity: 'Weekly Activity', studyHours: 'Study hours this week',
    todaySchedule: "Today's Schedule", fullSchedule: 'Full Schedule',
    progressOverview: 'Progress Overview',
    completed: 'Completed', remaining: 'Remaining', totalRequired: 'Total Required',
    credits: 'credits', quickActions: 'Quick Actions',
    actions: {
      registration: 'Course Registration', grades: 'View Grades',
      schedule: 'My Schedule', payments: 'Payments',
    },
    notifications: 'Notifications',
    notif: {
      gradesPosted: 'Grades Posted', gradesDesc: 'CS101 grades are now available',
      regDeadline: 'Registration Deadline', regDesc: 'Last day: January 15',
      upcomingExam: 'Upcoming Exam', examDesc: 'CS201 exam on Sunday',
    },
    schedule: {
      completed: 'Completed', current: 'In Progress', upcoming: 'Upcoming',
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
  const th  = dark ? darkTheme : theme;
  const bg1 = dark ? darkTheme.background : theme.background;
  const card = dark ? darkTheme.surface   : theme.white;
  const bdr  = dark ? darkTheme.border    : theme.border;
  const bdrL = dark ? darkTheme.borderLight : theme.border;
  const iconBg = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface  : theme.primary;
  const heroText = dark ? darkTheme.text     : theme.text;

  useEffect(() => {
    if (!user?.id) return;
    setDashLoading(true);
    fetch(`/api/students/dashboard?studentId=${user.id}`)
      .then(r => r.json())
      .then(data => { setDashData(data); setDashLoading(false); })
      .catch(() => setDashLoading(false));
  }, [user?.id]);

  const gpa              = parseFloat(dashData?.gpa ?? '0') || 0;
  const completedCredits = dashData?.completedCredits ?? 0;
  const totalCredits     = dashData?.totalCredits ?? 132;
  const registeredCourses = dashData?.registeredCoursesCount ?? 0;
  const attendanceRate   = dashData?.attendanceRate ?? null;
  const progress = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  const weeklyActivity = [
    { day: tx.days.Mon, hours: 4 }, { day: tx.days.Tue, hours: 6 },
    { day: tx.days.Wed, hours: 5 }, { day: tx.days.Thu, hours: 7 },
    { day: tx.days.Fri, hours: 3 }, { day: tx.days.Sat, hours: 2 },
    { day: tx.days.Sun, hours: 1 },
  ];

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item    = { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 120 } } };

  if (loading || !user) {
    return (
      <div className={`${cairo.className} min-h-screen flex items-center justify-center`} style={{ background: bg1 }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: th.primary }} />
          <p className="mt-4 font-semibold" style={{ color: th.textMuted }}>{tx.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} role="student">
      <div className={`${cairo.className} min-h-screen transition-colors duration-300`} style={{ background: bg1 }} dir={dir}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

          
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-none shadow-lg" style={{ background: heroBg }}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-4 ring-white/20 flex-shrink-0">
                      <img src={user.avatarUrl ?? (user.gender === 'female' ? '/default-avatar-female.png' : '/default-avatar.png')}
                        alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-2xl font-extrabold" style={{ color: heroText }}>
                        {tx.welcome}، {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-sm font-semibold" style={{ color: heroText, opacity: 0.8 }}>{tx.subtitle}</p>
                    </div>
                  </div>
                  <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold mb-1" style={{ color: heroText, opacity: 0.8 }}>
                      <Award className="w-4 h-4" />
                      <span>{tx.gpaLabel}</span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold" style={{ color: heroText }}>{gpa > 0 ? gpa.toFixed(2) : '—'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: tx.stats.courses, value: registeredCourses, sub: tx.stats.thisSemester },
              { icon: <CheckCircle2 className="w-5 h-5" />, label: tx.stats.credits, value: completedCredits, sub: `${progress.toFixed(0)}% ${tx.stats.complete}` },
              { icon: <Target className="w-5 h-5" />, label: tx.stats.attendance, value: attendanceRate !== null ? `${attendanceRate}%` : '—', sub: tx.stats.excellent },
              { icon: <TrendingUp className="w-5 h-5" />, label: tx.gpaLabel, value: gpa > 0 ? gpa.toFixed(2) : '—', sub: tx.stats.improving },
            ].map((s, i) => (
              <motion.div key={i} variants={item}>
                <Card className="hover:shadow-md transition-all" style={{ background: card, borderColor: bdr }}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold" style={{ color: th.textMuted }}>{s.label}</p>
                        <p className="text-3xl font-extrabold" style={{ color: th.text }}>{s.value}</p>
                        <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{s.sub}</p>
                      </div>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                        <span style={{ color: th.primary }}>{s.icon}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            
            <div className="lg:col-span-2 space-y-6">

              
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                          <BookMarked className="w-5 h-5" style={{ color: th.primary }} />
                        </div>
                        <CardTitle className="text-lg font-extrabold" style={{ color: th.text }}>{tx.myCourses}</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/student/courses" className="flex items-center gap-1 text-sm font-bold" style={{ color: th.primary }}>
                          {tx.viewAll} <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dashLoading ? (
                      <div className="space-y-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: iconBg }} />
                        ))}
                      </div>
                    ) : (dashData?.registrations ?? []).length === 0 ? (
                      <p className="text-sm text-center py-4" style={{ color: th.textMuted }}>{locale === 'ar' ? 'لا توجد مقررات مسجلة' : 'No registered courses'}</p>
                    ) : (
                      (dashData?.registrations ?? []).map((c) => (
                        <motion.div key={c.id} whileHover={{ scale: 1.01 }}
                          className="p-4 rounded-xl border transition-all"
                          style={{ background: iconBg, borderColor: bdrL }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: card, border: `1px solid ${bdr}` }}>
                              <BookOpen className="w-4 h-4" style={{ color: th.primary }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-extrabold text-sm" style={{ color: th.text }}>{c.course.code}</span>
                                <span className="text-xs font-semibold truncate" style={{ color: th.textMuted }}>
                                  {locale === 'ar' ? c.course.nameAr : c.course.nameEn}
                                </span>
                              </div>
                              {c.professor && (
                                <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{tx.instructor} {c.professor.name}</p>
                              )}
                              {c.grade?.totalGrade && (
                                <div className="flex items-center justify-between text-xs mt-1">
                                  <span style={{ color: th.textMuted }}>{locale === 'ar' ? 'الدرجة' : 'Grade'}</span>
                                  <span className="font-extrabold" style={{ color: th.primary }}>{c.grade.letterGrade} ({Number(c.grade.totalGrade).toFixed(0)})</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                        <BarChart3 className="w-5 h-5" style={{ color: th.primary }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-extrabold" style={{ color: th.text }}>{tx.weeklyActivity}</CardTitle>
                        <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{tx.studyHours}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ReactECharts
                      style={{ height: 200 }}
                      option={{
                        grid: { top: 10, bottom: 24, left: 28, right: 12 },
                        tooltip: {
                          trigger: 'axis',
                          backgroundColor: card,
                          borderColor: bdr,
                          textStyle: { color: th.text, fontFamily: 'Cairo, sans-serif', fontSize: 12 },
                          formatter: (p: { name: string; value: number }[]) => `${p[0].name}: ${p[0].value}h`,
                        },
                        xAxis: {
                          type: 'category',
                          data: weeklyActivity.map((d) => d.day),
                          axisLine: { lineStyle: { color: bdrL } },
                          axisTick: { show: false },
                          axisLabel: { color: th.textMuted, fontSize: 11, fontFamily: 'Cairo, sans-serif' },
                        },
                        yAxis: {
                          type: 'value',
                          splitLine: { lineStyle: { color: bdrL, type: 'dashed' } },
                          axisLabel: { color: th.textMuted, fontSize: 11 },
                        },
                        series: [{
                          type: 'line',
                          data: weeklyActivity.map((d) => d.hours),
                          smooth: true,
                          symbol: 'circle',
                          symbolSize: 7,
                          lineStyle: { color: th.primary, width: 2.5 },
                          itemStyle: { color: th.primary, borderColor: card, borderWidth: 2 },
                          areaStyle: {
                            color: {
                              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                              colorStops: [
                                { offset: 0, color: th.primary + '55' },
                                { offset: 1, color: th.primary + '00' },
                              ],
                            },
                          },
                        }],
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                          <CalendarDays className="w-5 h-5" style={{ color: th.primary }} />
                        </div>
                        <CardTitle className="text-lg font-extrabold" style={{ color: th.text }}>{tx.todaySchedule}</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/student/schedule" className="flex items-center gap-1 text-sm font-bold" style={{ color: th.primary }}>
                          {tx.fullSchedule} <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 pb-2">
                    {dashLoading ? (
                      <div className="px-4 py-3 space-y-2">
                        {[1,2,3].map(i => <div key={i} className="h-10 rounded animate-pulse" style={{ background: iconBg }} />)}
                      </div>
                    ) : !(dashData?.todaySchedule ?? []).length ? (
                      <p className="text-sm text-center py-6" style={{ color: th.textMuted }}>
                        {locale === 'ar' ? 'لا توجد محاضرات اليوم' : 'No classes today'}
                      </p>
                    ) : (() => {
                      const rows = dashData?.todaySchedule ?? [];
                      const statusCfg = {
                        completed: { label: tx.schedule.completed, textColor: th.textMuted,       bg: dark ? darkTheme.surfaceAlt : theme.surface,     dot: dark ? darkTheme.borderLight : theme.border },
                        current:   { label: tx.schedule.current,   textColor: dark ? darkTheme.primary : theme.primaryHover, bg: dark ? darkTheme.accent : theme.accent, dot: dark ? darkTheme.primary : theme.primary },
                        upcoming:  { label: tx.schedule.upcoming,  textColor: th.primary,         bg: dark ? darkTheme.surfaceAlt : theme.surface,     dot: th.primary },
                      };
                      return (
                        <Table>
                          <TableHeader>
                            <TableRow className="border-0" style={{ background: dark ? darkTheme.surfaceAlt : theme.surface }}>
                              {[
                                locale === 'ar' ? 'الوقت'   : 'Time',
                                locale === 'ar' ? 'المقرر'  : 'Course',
                                locale === 'ar' ? 'القاعة'  : 'Room',
                                locale === 'ar' ? 'الحالة'  : 'Status',
                              ].map((label, i) => (
                                <TableHead key={i}
                                  className="h-9 text-[11px] font-bold px-3 first:ps-4 last:pe-4 whitespace-nowrap"
                                  style={{ color: th.textMuted, textAlign: 'start' }}>
                                  {label}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rows.map((s, i) => {
                              const cfg = statusCfg[s.status];
                              const isCurrent = s.status === 'current';
                              return (
                                <TableRow key={i}
                                  className="border-0 transition-colors"
                                  style={{ background: isCurrent ? cfg.bg : 'transparent', borderTop: `1px solid ${bdrL}` }}>
                                  <TableCell className="py-3 ps-4 pe-3">
                                    <span className="text-xs font-mono tabular-nums whitespace-nowrap" style={{ color: th.textMuted }}>{s.startTime} - {s.endTime}</span>
                                  </TableCell>
                                  <TableCell className="py-3 px-3">
                                    <span className={`text-sm ${isCurrent ? 'font-bold' : 'font-medium'}`} style={{ color: isCurrent ? th.text : th.textMuted }}>
                                      {locale === 'ar' ? s.course.nameAr : s.course.nameEn}
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-3 px-3">
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md whitespace-nowrap"
                                      style={{ background: dark ? darkTheme.border : theme.border, color: th.textMuted, border: `1px solid ${bdrL}` }}>
                                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                                      {s.classroom.code}
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-3 pe-4 ps-3">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                                      style={{ background: cfg.bg, color: cfg.textColor, border: `1px solid ${cfg.dot}` }}>
                                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
                                      {cfg.label}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      );
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            
            <div className="space-y-6">

              
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg, border: `1px solid ${bdrL}` }}>
                        <GraduationCap className="w-5 h-5" style={{ color: th.primary }} />
                      </div>
                      <CardTitle className="text-lg font-extrabold" style={{ color: th.text }}>{tx.progressOverview}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReactECharts
                      style={{ height: 180 }}
                      option={{
                        tooltip: { show: false },
                        series: [{
                          type: 'pie',
                          radius: ['62%', '82%'],
                          center: ['50%', '50%'],
                          startAngle: 90,
                          data: [
                            {
                              value: completedCredits,
                              name: tx.completed,
                              itemStyle: { color: th.primary, borderRadius: 6 },
                            },
                            {
                              value: totalCredits - completedCredits,
                              name: tx.remaining,
                              itemStyle: { color: bdrL, borderRadius: 6 },
                            },
                          ],
                          label: {
                            show: true,
                            position: 'center',
                            formatter: () => `{pct|${progress.toFixed(0)}%}\n{sub|${tx.completed}}`,
                            rich: {
                              pct: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                color: th.text,
                                fontFamily: 'Cairo, sans-serif',
                                lineHeight: 34,
                              },
                              sub: {
                                fontSize: 11,
                                color: th.textMuted,
                                fontFamily: 'Cairo, sans-serif',
                                lineHeight: 18,
                              },
                            },
                          },
                          emphasis: { scale: false },
                          labelLine: { show: false },
                        }],
                      }}
                    />
                    {[
                      { label: tx.completed,     value: `${completedCredits} ${tx.credits}` },
                      { label: tx.remaining,     value: `${totalCredits - completedCredits} ${tx.credits}` },
                      { label: tx.totalRequired, value: `${totalCredits} ${tx.credits}` },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between text-sm">
                        <span className="font-semibold" style={{ color: th.textMuted }}>{r.label}</span>
                        <span className="font-extrabold" style={{ color: th.text }}>{r.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-extrabold" style={{ color: th.text }}>{tx.quickActions}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { href: '/student/registration', icon: <FileText className="w-4 h-4" />,  label: tx.actions.registration },
                      { href: '/student/grades',        icon: <Award className="w-4 h-4" />,     label: tx.actions.grades },
                      { href: '/student/schedule',      icon: <Calendar className="w-4 h-4" />,  label: tx.actions.schedule },
                      { href: '/student/payments',      icon: <CreditCard className="w-4 h-4" />, label: tx.actions.payments },
                    ].map((a) => (
                      <Button key={a.href} variant="ghost" className="w-full justify-start gap-3 font-semibold hover:opacity-80 transition-opacity" asChild
                        style={{ color: th.text }}>
                        <Link href={a.href}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: iconBg, border: `1px solid ${bdrL}`, color: th.primary }}>
                            {a.icon}
                          </div>
                          <span className="flex-1 text-sm">{a.label}</span>
                          <ChevronRight className="w-4 h-4" style={{ color: th.textMuted }} />
                        </Link>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Card style={{ background: card, borderColor: bdr }}>
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4" style={{ color: th.primary }} />
                        <CardTitle className="text-base font-extrabold" style={{ color: th.text }}>{tx.notifications}</CardTitle>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: dark ? darkTheme.accent : theme.accent, color: th.primary, border: `1px solid ${dark ? darkTheme.borderLight : theme.border}` }}>
                        {dashData?.recentGrades?.length ?? 0}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 px-0 pb-0">
                    {dashLoading ? (
                      <div className="px-4 space-y-2 pt-2">
                        {[1,2,3].map(i => <div key={i} className="h-12 rounded animate-pulse" style={{ background: iconBg }} />)}
                      </div>
                    ) : (dashData?.recentGrades ?? []).length === 0 ? (
                      <p className="text-sm text-center py-6 px-4" style={{ color: th.textMuted }}>
                        {locale === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
                      </p>
                    ) : (
                      (dashData?.recentGrades ?? []).map((g, i) => {
                        const isPassed = g.status === 'pass';
                        const cfg = isPassed
                          ? { textColor: dark ? darkTheme.primary : theme.primaryHover, bar: dark ? darkTheme.primary : theme.primary }
                          : { textColor: th.textMuted, bar: dark ? darkTheme.borderLight : theme.border };
                        const title = locale === 'ar'
                          ? `${isPassed ? 'نجحت في' : 'رسبت في'} ${g.courseNameAr}`
                          : `${isPassed ? 'Passed' : 'Failed'} ${g.courseNameEn}`;
                        const desc = g.letterGrade
                          ? `${g.semesterName} — ${g.letterGrade} (${Number(g.totalGrade ?? 0).toFixed(0)})`
                          : g.semesterName;
                        const time = new Date(g.updatedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
                        return (
                          <div key={g.id}
                            className="flex items-start gap-3 px-4 py-3 relative"
                            style={{ borderTop: `1px solid ${bdrL}` }}>
                            <span className="absolute start-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: cfg.bar }} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-bold leading-snug" style={{ color: th.text }}>{title}</p>
                                <span className="text-[10px] font-semibold shrink-0 mt-0.5" style={{ color: th.textMuted, opacity: 0.7 }}>{time}</span>
                              </div>
                              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: th.textMuted }}>{desc}</p>
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
      </div>
    </DashboardLayout>
  );
}
