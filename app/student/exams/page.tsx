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
  CalendarDays, Clock, MapPin, BookOpen, CheckCircle2,
  AlertCircle, ListChecks,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'جدول امتحانات الفصل الدراسي',
    subtitle: 'متابعة مواعيد، قاعات، وتفاصيل الاختبارات الفصلية والنهائية',
    totalExams: 'إجمالي المواد المقررة',
    upcoming: 'امتحانات قادمة',
    completed: 'امتحانات منتهية',
    nextExam: 'الامتحان القادم المستحق',
    daysLeft: 'يوم متبقي',
    today: 'اليوم الجاري',
    date: 'تاريخ الامتحان',
    time: 'توقيت الجلسة',
    room: 'القاعة الامتحانية',
    duration: 'الزمن المحدد',
    mins: 'دقيقة',
    midterms: 'امتحانات نصف الفصل (Midterm)',
    finals: 'الامتحانات النهائية (Final Exams)',
    subject: 'المادة الأكاديمية',
    type: 'نوع الاختبار',
    status: 'الحالة',
    typeFinal: 'نهائي',
    typeMidterm: 'نصف الترم',
    statusToday: 'اليوم',
    statusUpcoming: 'قادم',
    statusCompleted: 'مكتمل',
    examCount: 'امتحان مقرر',
    noData: 'لا توجد امتحانات معلنة أو مجدولة لك حالياً في هذا الفصل الدراسي',
  },
  en: {
    title: 'Semester Exam Schedule',
    subtitle: 'Track your midterm and final exam schedules, venues, and timings',
    totalExams: 'Total Courses Scheduled',
    upcoming: 'Upcoming Exams',
    completed: 'Completed Exams',
    nextExam: 'Next Scheduled Exam',
    daysLeft: 'days left',
    today: 'Scheduled for Today',
    date: 'Exam Date',
    time: 'Session Duration',
    room: 'Exam Room / Hall',
    duration: 'Allotted Time',
    mins: 'min',
    midterms: 'Midterm Assessments',
    finals: 'Final Semester Examinations',
    subject: 'Course / Subject',
    type: 'Assessment Type',
    status: 'Status',
    typeFinal: 'Final Exam',
    typeMidterm: 'Midterm',
    statusToday: 'Today',
    statusUpcoming: 'Upcoming',
    statusCompleted: 'Completed',
    examCount: 'scheduled exam',
    noData: 'No exams currently scheduled or published in this semester',
  },
} as const;

interface ApiExam {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  examType: string;
  examDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  room: string;
  status: 'upcoming' | 'completed' | 'today';
  daysLeft: number;
}

export default function ExamsPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [exams, setExams]           = useState<ApiExam[]>([]);
  const [semesterName, setSemName]  = useState('');
  const [dataLoading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/exams?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setExams(d.exams ?? []);
        if (d.semester) setSemName(`${d.semester.name}`);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const midterms = useMemo(() => exams.filter(e => e.examType === 'midterm'), [exams]);
  const finals   = useMemo(() => exams.filter(e => e.examType === 'final'),   [exams]);
  const nextExam = useMemo(() =>
    exams.filter(e => e.status === 'upcoming' || e.status === 'today')
         .sort((a, b) => a.examDate.localeCompare(b.examDate))[0],
  [exams]);

  const stats = useMemo(() => ({
    total:     exams.length,
    upcoming:  exams.filter(e => e.status !== 'completed').length,
    completed: exams.filter(e => e.status === 'completed').length,
  }), [exams]);

  const courseName = (e: ApiExam) => loc === 'ar' ? e.courseNameAr : e.courseNameEn;
  const typeLabel  = (type: string) => type === 'final' ? t.typeFinal : t.typeMidterm;
  const statusLabel = (s: string)  => s === 'today' ? t.statusToday : s === 'upcoming' ? t.statusUpcoming : t.statusCompleted;

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    {semesterName || '—'} • {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: t.totalExams, value: stats.total,     icon: ListChecks },
                  { label: t.upcoming,   value: stats.upcoming,  icon: AlertCircle },
                  { label: t.completed,  value: stats.completed, icon: CheckCircle2 },
                ].map(({ label, value, icon: Icon }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-start">
                      <p className="text-[10px] text-stone-450 dark:text-stone-550 font-bold">{label}</p>
                      <p className="text-base font-bold text-stone-850 dark:text-stone-100">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-16 bg-white dark:bg-stone-900 rounded-2xl">
            <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
          </div>
        ) : exams.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2">
            <CalendarDays className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            <p className="text-xs font-bold text-stone-450 dark:text-stone-550">{t.noData}</p>
          </Card>
        ) : (
          <div className="space-y-6">

            {/* Next Exam Spotlight Card */}
            {nextExam && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-5 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-550 font-bold uppercase">{t.nextExam}</p>
                        <p className="text-sm font-bold text-stone-850 dark:text-stone-100 mt-0.5">{courseName(nextExam)}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="text-2xl font-bold text-[#D97706] font-mono leading-none">
                        {nextExam.status === 'today' ? t.today : nextExam.daysLeft}
                      </p>
                      {nextExam.status !== 'today' && (
                        <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 mt-1 uppercase">{t.daysLeft}</p>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { icon: CalendarDays, label: t.date,     value: nextExam.examDate },
                        { icon: Clock,        label: t.time,     value: `${nextExam.startTime} - ${nextExam.endTime}` },
                        { icon: MapPin,       label: t.room,     value: nextExam.room },
                      ].map(({ icon: Icon, label, value }, idx) => (
                        <div key={idx} className="bg-stone-50/20 dark:bg-stone-850/5 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{label}</p>
                            <p className="text-xs font-bold text-stone-800 dark:text-stone-250 mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-wrap pt-1">
                      <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                        {typeLabel(nextExam.examType)}
                      </Badge>
                      <Badge className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                        {statusLabel(nextExam.status)}
                      </Badge>
                      <Badge className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                        {nextExam.courseCode}
                      </Badge>
                      <Badge className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                        {nextExam.duration} {t.mins}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Midterms Table */}
            {midterms.length > 0 && (
              <ExamTableSection title={t.midterms} exams={midterms} t={t} courseName={courseName} typeLabel={typeLabel} statusLabel={statusLabel} loc={loc} />
            )}

            {/* Finals Table */}
            {finals.length > 0 && (
              <ExamTableSection title={t.finals} exams={finals} t={t} courseName={courseName} typeLabel={typeLabel} statusLabel={statusLabel} loc={loc} />
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

function ExamTableSection({
  title, exams, t, courseName, typeLabel, statusLabel, loc,
}: {
  title: string;
  exams: ApiExam[];
  t: typeof i18n[keyof typeof i18n];
  courseName: (e: ApiExam) => string;
  typeLabel: (x: string) => string;
  statusLabel: (x: string) => string;
  loc: string;
}) {
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
              <BookOpen className="w-5 h-5" />
            </div>
            <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{title}</CardTitle>
          </div>
          <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
            {exams.length} {t.examCount}
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-xs">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/10 font-bold text-stone-400 dark:text-stone-500 text-start">
                  <th className={`px-5 py-3.5 font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.subject}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.date}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.time}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.duration}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.room}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.type}</th>
                  <th className="px-4 py-3.5 font-bold text-center">{t.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {exams.map((exam, idx) => {
                  const isToday = exam.status === 'today';
                  const isCompleted = exam.status === 'completed';
                  return (
                    <tr
                      key={exam.id}
                      className={`hover:bg-stone-50/30 dark:hover:bg-stone-850/10 transition-colors ${
                        isToday ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold">
                        <p className="font-bold text-stone-800 dark:text-stone-200">{courseName(exam)}</p>
                        <p className="text-[10px] text-[#D97706] font-mono mt-0.5">{exam.courseCode}</p>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-stone-650 dark:text-stone-400">{exam.examDate}</td>
                      <td className="px-4 py-4 text-center font-semibold text-stone-650 dark:text-stone-400 whitespace-nowrap">
                        {exam.startTime} - {exam.endTime}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-stone-650 dark:text-stone-400">
                        {exam.duration} {t.mins}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-stone-650 dark:text-stone-400">{exam.room}</td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                          {typeLabel(exam.examType)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className={`border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5 ${
                          isCompleted
                            ? 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-600 dark:bg-emerald-950/20'
                            : isToday
                            ? 'bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706]'
                            : 'bg-blue-50 hover:bg-blue-100/50 text-blue-600 dark:bg-blue-950/20'
                        }`}>
                          {statusLabel(exam.status)}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
