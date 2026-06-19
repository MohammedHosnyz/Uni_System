'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3, CheckCircle2, XCircle, TrendingUp,
  BookOpen, AlertTriangle, ShieldCheck, Clock,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'سجل الحضور والغياب الأكاديمي',
    subtitle: 'متابعة نسب الحضور للمحاضرات وحصص التمارين والمعامل بالتفصيل للفصل الحالي',
    totalClasses: 'إجمالي المحاضرات المقررة',
    attended: 'المحاضرات المحضورة',
    absent: 'أيام الغياب',
    rate: 'معدل الحضور العام',
    statusExcellent: 'ممتاز ومثالي',
    statusSafe: 'ضمن النطاق الآمن',
    statusDanger: 'تحت إنذار الحرمان',
    present: 'حاضر',
    absentLabel: 'غائب',
    excused: 'غياب بعذر',
    session: 'محاضرة',
    noData: 'لا توجد بيانات رصد حضور أو غياب مسجلة بعد',
    warning: 'تنبيه أكاديمي هام',
    warningText: 'الحد الأدنى لنسبة الحضور القانونية لدخول الاختبار النهائي هو 75% من إجمالي الساعات المقررة للمادة.',
    credits: 'ساعة',
    sessionTypes: { lecture: 'محاضرة', lab: 'معمل', tutorial: 'تمارين' },
  },
  en: {
    title: 'Attendance Ledger',
    subtitle: 'Monitor attendance metrics, lectures, laboratories and tutor sessions for the current semester',
    totalClasses: 'Total Sessions Scheduled',
    attended: 'Attended Classes',
    absent: 'Recorded Absences',
    rate: 'Overall Attendance Rate',
    statusExcellent: 'Excellent Status',
    statusSafe: 'Safe Attendance Status',
    statusDanger: 'At Deprivation Risk',
    present: 'Present',
    absentLabel: 'Absent',
    excused: 'Excused Absence',
    session: 'Session',
    noData: 'No attendance metrics have been logged yet',
    warning: 'Important Academic Notice',
    warningText: 'Students are required to maintain a minimum of 75% attendance to sit for final course examinations.',
    credits: 'cr',
    sessionTypes: { lecture: 'Lecture', lab: 'Lab', tutorial: 'Tutorial' },
  },
} as const;

interface Session {
  date: string;
  dayOfWeek: number;
  startTime: string;
  sessionType: string;
  status: 'present' | 'absent' | 'excused';
}

interface CourseAttendance {
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  total: number;
  present: number;
  excused: number;
  absent: number;
  rate: number;
  sessions: Session[];
}

interface Stats {
  total: number;
  present: number;
  absent: number;
  rate: number;
}

export default function AbsencePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [courses, setCourses]       = useState<CourseAttendance[]>([]);
  const [stats, setStats]           = useState<Stats>({ total: 0, present: 0, absent: 0, rate: 0 });
  const [semName, setSemName]       = useState('');
  const [dataLoading, setLoading]   = useState(true);
  const [expanded, setExpanded]     = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/attendance?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setCourses(d.courses ?? []);
        setStats(d.stats ?? { total: 0, present: 0, absent: 0, rate: 0 });
        if (d.semester) setSemName(d.semester.name);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const riskLevel = useMemo(() => {
    if (stats.rate >= 90) return { label: t.statusExcellent, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (stats.rate >= 75) return { label: t.statusSafe,      color: 'text-blue-500',    bg: 'bg-blue-500/10' };
    return                       { label: t.statusDanger,    color: 'text-[#D97706]',   bg: 'bg-amber-500/10' };
  }, [stats.rate, t]);

  const courseRisk = (rate: number) => {
    if (rate >= 90) return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500' };
    if (rate >= 75) return { color: 'text-blue-500',    bg: 'bg-blue-500/10',    bar: 'bg-blue-500' };
    return                 { color: 'text-[#D97706]',   bg: 'bg-amber-500/10',   bar: 'bg-[#FABA19]' };
  };

  const sessionTypeLabel = (type: string) =>
    type === 'lecture' ? t.sessionTypes.lecture
    : type === 'lab'   ? t.sessionTypes.lab
    : t.sessionTypes.tutorial;

  if (loading || !user) return null;

  const atRisk = courses.filter(c => c.rate < 75);

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    {user.firstName} {user.lastName} • {semName || t.subtitle}
                  </p>
                </div>
              </div>
              <Badge className={`border-0 text-xs font-bold shadow-none px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${riskLevel.bg} ${riskLevel.color}`}>
                <ShieldCheck className="w-4 h-4" />
                {riskLevel.label} — {stats.rate}%
              </Badge>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: t.totalClasses, value: stats.total,      icon: BookOpen,     color: 'text-[#D97706]' },
                  { label: t.attended,     value: stats.present,    icon: CheckCircle2, color: 'text-emerald-500' },
                  { label: t.absent,       value: stats.absent,     icon: XCircle,      color: 'text-[#D97706]' },
                  { label: t.rate,         value: `${stats.rate}%`, icon: TrendingUp,   color: 'text-blue-500' },
                ].map(({ label, value, icon: Icon, color }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-start min-w-0">
                      <p className="text-[10px] text-stone-450 dark:text-stone-550 font-bold truncate">{label}</p>
                      <p className={`text-base font-bold truncate mt-0.5 ${color}`}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Attendance List */}
        {dataLoading ? (
          <div className="flex justify-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-150 dark:border-stone-800">
            <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2">
            <BarChart3 className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            <p className="text-xs font-bold text-stone-450 dark:text-stone-550">{t.noData}</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {courses.map(course => {
              const risk  = courseRisk(course.rate);
              const isExp = expanded === course.courseCode;
              const courseName = loc === 'ar' ? course.courseNameAr : course.courseNameEn;

              return (
                <motion.div key={course.courseCode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                    <button
                      className="w-full text-start p-4 hover:bg-stone-50/20 dark:hover:bg-stone-850/5 transition-all"
                      onClick={() => setExpanded(isExp ? null : course.courseCode)}
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 flex items-center justify-center text-[#D97706] shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-850 dark:text-stone-100 truncate">{courseName}</p>
                            <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold mt-0.5 uppercase">
                              {course.courseCode} • {course.credits} {t.credits}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center gap-3 text-[10px] font-bold text-stone-450 dark:text-stone-550">
                            <span className="flex items-center gap-1 text-emerald-500">
                              <CheckCircle2 className="w-4 h-4" />
                              {course.present + course.excused}
                            </span>
                            <span className="flex items-center gap-1 text-[#D97706]">
                              <XCircle className="w-4 h-4" />
                              {course.absent}
                            </span>
                            <span className="flex items-center gap-1 text-stone-400">
                              <Clock className="w-4 h-4" />
                              {course.total}
                            </span>
                          </div>

                          <Badge className={`border-0 text-[10px] font-bold shadow-none px-2.5 py-0.5 rounded-lg ${risk.bg} ${risk.color}`}>
                            {course.rate}%
                          </Badge>

                          <div className="w-20 h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden hidden sm:block">
                            <div className={`h-1 rounded-full transition-all ${risk.bar}`} style={{ width: `${course.rate}%` }} />
                          </div>
                        </div>
                      </div>
                    </button>

                    {isExp && (
                      <div className="p-4 border-t border-stone-50 dark:border-stone-850 bg-stone-50/20 dark:bg-stone-850/5">
                        {course.sessions.length === 0 ? (
                          <p className="text-[10px] text-center py-4 font-bold text-stone-400">{t.noData}</p>
                        ) : (
                          <div className="flex flex-wrap gap-2.5">
                            {course.sessions.map((s, idx) => {
                              const isPresent = s.status === 'present' || s.status === 'excused';
                              const statusStyle = isPresent
                                ? { text: 'text-emerald-500', bg: 'bg-emerald-50 hover:bg-emerald-100/50 dark:bg-emerald-950/20', border: 'border-emerald-100 dark:border-emerald-900/30' }
                                : { text: 'text-red-500',     bg: 'bg-red-50 hover:bg-red-100/50 dark:bg-red-950/20',     border: 'border-red-100 dark:border-red-900/30' };

                              return (
                                <div
                                  key={idx}
                                  title={`${s.date} ${s.startTime} — ${sessionTypeLabel(s.sessionType)}`}
                                  className={`rounded-xl border p-2.5 min-w-[90px] text-center space-y-1 transition-all ${statusStyle.bg} ${statusStyle.border}`}
                                >
                                  <div className="flex items-center justify-center">
                                    {isPresent ? (
                                      <CheckCircle2 className={`w-4 h-4 ${statusStyle.text}`} />
                                    ) : (
                                      <XCircle className={`w-4 h-4 ${statusStyle.text}`} />
                                    )}
                                  </div>
                                  <p className="text-[10px] font-bold text-stone-800 dark:text-stone-200">{s.date.slice(5)}</p>
                                  <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold">{s.startTime}</p>
                                  <p className={`text-[9px] font-bold ${statusStyle.text}`}>
                                    {s.status === 'excused' ? t.excused : isPresent ? t.present : t.absentLabel}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Warning Board */}
        {!dataLoading && atRisk.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-amber-500/10 border border-[#FABA19]/20 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-[#D97706] shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#D97706]">{t.warning}</p>
                <p className="font-semibold text-stone-600 dark:text-stone-400">{t.warningText}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {atRisk.map(c => (
                    <Badge key={c.courseCode} className="bg-amber-500/20 border border-[#FABA19]/25 text-[#D97706] text-[9px] font-bold shadow-none px-2.5 py-0.5 rounded-lg">
                      {c.courseCode} — {c.rate}%
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Safe Badge Notification */}
        {!dataLoading && atRisk.length === 0 && courses.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-emerald-600">{t.statusSafe}</p>
                <p className="font-semibold text-stone-600 dark:text-stone-400">{t.warningText}</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}
