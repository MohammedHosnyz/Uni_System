'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  CalendarDays, Clock, MapPin, BookOpen, CheckCircle2,
  AlertCircle, Lightbulb, ListChecks,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'جدول الامتحانات',
    totalExams: 'إجمالي الامتحانات', upcoming: 'القادمة', completed: 'المكتملة',
    nextExam: 'الامتحان القادم', daysLeft: 'يوم متبقي', today: 'اليوم',
    date: 'التاريخ', time: 'الوقت', room: 'القاعة', duration: 'المدة', mins: 'دقيقة',
    midterms: 'امتحانات نصف الترم', finals: 'الامتحانات النهائية',
    subject: 'المادة', type: 'النوع', status: 'الحالة',
    typeFinal: 'نهائي', typeMidterm: 'نصف الترم',
    statusToday: 'اليوم', statusUpcoming: 'قادم', statusCompleted: 'مكتمل',
    examCount: 'امتحان', noData: 'لا توجد امتحانات حالياً',
    tips: 'نصائح للامتحانات',
    tip1Title: 'احضر مبكراً',        tip1Desc: 'تأكد من الوصول قبل 15 دقيقة من موعد الامتحان',
    tip2Title: 'أحضر البطاقة الجامعية', tip2Desc: 'البطاقة الجامعية إلزامية لدخول الامتحان',
    tip3Title: 'راجع المنهج',         tip3Desc: 'تأكد من مراجعة جميع المواضيع المقررة',
    tip4Title: 'نم جيداً',            tip4Desc: 'احصل على قسط كافٍ من النوم قبل الامتحان',
  },
  en: {
    title: 'Exam Schedule',
    totalExams: 'Total Exams', upcoming: 'Upcoming', completed: 'Completed',
    nextExam: 'Next Exam', daysLeft: 'days left', today: 'Today',
    date: 'Date', time: 'Time', room: 'Room', duration: 'Duration', mins: 'min',
    midterms: 'Midterm Exams', finals: 'Final Exams',
    subject: 'Subject', type: 'Type', status: 'Status',
    typeFinal: 'Final', typeMidterm: 'Midterm',
    statusToday: 'Today', statusUpcoming: 'Upcoming', statusCompleted: 'Completed',
    examCount: 'exam', noData: 'No exams scheduled',
    tips: 'Exam Tips',
    tip1Title: 'Arrive Early',        tip1Desc: 'Make sure to arrive 15 minutes before the exam',
    tip2Title: 'Bring Your ID',       tip2Desc: 'University ID is required to enter the exam',
    tip3Title: 'Review the Syllabus', tip3Desc: 'Make sure to review all required topics',
    tip4Title: 'Sleep Well',          tip4Desc: 'Get enough sleep before the exam',
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
  const th  = dark ? darkTheme : theme;

  const [exams, setExams]           = useState<ApiExam[]>([]);
  const [semesterName, setSemName]  = useState('');
  const [dataLoading, setLoading]   = useState(true);

  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';

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

  const typeColor = (type: string) => type === 'final' ? '#ef4444' : th.primary;
  const statusColor = (s: string) => s === 'today' ? th.primary : s === 'upcoming' ? '#3b82f6' : '#22c55e';

  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  const Skeleton = () => (
    <div className="space-y-3 p-4">
      {[1,2,3].map(i => <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: iconBg }} />)}
    </div>
  );

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarDays className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>
                    {semesterName || '—'} • {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: t.totalExams, value: stats.total,     icon: ListChecks },
                  { label: t.upcoming,   value: stats.upcoming,  icon: AlertCircle },
                  { label: t.completed,  value: stats.completed, icon: CheckCircle2 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }} className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon className="w-5 h-5" style={{ color: th.primary }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}</p>
                      <p className="text-xl font-extrabold" style={{ color: th.text }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        {dataLoading && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16 }}>
            <Skeleton />
          </div>
        )}

        
        {!dataLoading && exams.length === 0 && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
            <CalendarDays className="w-12 h-12 mx-auto mb-3" style={{ color: th.textMuted }} />
            <p style={{ color: th.textMuted }}>{t.noData}</p>
          </div>
        )}

        
        {!dataLoading && nextExam && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{t.nextExam}</p>
                    <p className="font-extrabold" style={{ color: th.text }}>{courseName(nextExam)}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-2xl font-extrabold" style={{ color: th.primary }}>
                    {nextExam.status === 'today' ? t.today : nextExam.daysLeft}
                  </p>
                  {nextExam.status !== 'today' && (
                    <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{t.daysLeft}</p>
                  )}
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: CalendarDays, label: t.date,     value: nextExam.examDate },
                    { icon: Clock,        label: t.time,     value: `${nextExam.startTime} - ${nextExam.endTime}` },
                    { icon: MapPin,       label: t.room,     value: nextExam.room },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }} className="flex items-center gap-3">
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon className="w-4 h-4" style={{ color: th.primary }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}</p>
                        <p className="font-extrabold text-sm" style={{ color: th.text }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: typeLabel(nextExam.examType),      color: typeColor(nextExam.examType) },
                    { label: statusLabel(nextExam.status),       color: statusColor(nextExam.status) },
                    { label: nextExam.courseCode,                color: th.primary },
                    { label: `${nextExam.duration} ${t.mins}`,  color: th.textMuted },
                  ].map(({ label, color }) => (
                    <span key={label} className="px-3 py-1 rounded-full text-xs font-extrabold"
                      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        
        {!dataLoading && midterms.length > 0 && (
          <ExamTable title={t.midterms} exams={midterms} t={t} th={th}
            card={card} bdr={bdr} bdrL={bdrL} iconBg={iconBg} heroBg={heroBg} heroText={heroText}
            courseName={courseName} typeLabel={typeLabel} statusLabel={statusLabel}
            typeColor={typeColor} statusColor={statusColor} loc={loc} />
        )}

        
        {!dataLoading && finals.length > 0 && (
          <ExamTable title={t.finals} exams={finals} t={t} th={th}
            card={card} bdr={bdr} bdrL={bdrL} iconBg={iconBg} heroBg={heroBg} heroText={heroText}
            courseName={courseName} typeLabel={typeLabel} statusLabel={statusLabel}
            typeColor={typeColor} statusColor={statusColor} loc={loc} />
        )}

      </div>
    </DashboardLayout>
  );
}

function ExamTable({
  title, exams, t, th, card, bdr, bdrL, iconBg, heroBg, heroText,
  courseName, typeLabel, statusLabel, typeColor, statusColor,
}: {
  title: string; exams: ApiExam[];
  t: typeof i18n[keyof typeof i18n]; th: typeof theme | typeof darkTheme;
  card: string; bdr: string; bdrL: string; iconBg: string; heroBg: string; heroText: string;
  courseName: (e: ApiExam) => string;
  typeLabel: (x: string) => string; statusLabel: (x: string) => string;
  typeColor: (x: string) => string; statusColor: (x: string) => string;
  loc: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center gap-3">
          <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen className="w-5 h-5" style={{ color: th.primary }} />
          </div>
          <p className="font-extrabold" style={{ color: th.text }}>{title}</p>
          <span className="px-2 py-0.5 rounded-full text-xs font-extrabold"
            style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
            {exams.length} {t.examCount}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ background: heroBg }}>
                {[t.subject, t.date, t.time, t.duration, t.room, t.type, t.status].map(h => (
                  <th key={h} className="px-4 py-3 text-center text-sm font-extrabold"
                    style={{ color: heroText, borderRight: `1px solid rgba(0,0,0,0.1)` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, i) => (
                <tr key={exam.id} style={{ background: i % 2 === 0 ? iconBg : card, borderBottom: `1px solid ${bdrL}` }}>
                  <td className="px-4 py-3" style={{ borderRight: `1px solid ${bdrL}` }}>
                    <p className="font-extrabold text-sm" style={{ color: th.text }}>{courseName(exam)}</p>
                    <p className="text-xs font-mono" style={{ color: th.primary }}>{exam.courseCode}</p>
                  </td>
                  <td className="px-4 py-3 text-center text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>{exam.examDate}</td>
                  <td className="px-4 py-3 text-center text-sm whitespace-nowrap" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>
                    {exam.startTime} - {exam.endTime}
                  </td>
                  <td className="px-4 py-3 text-center text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>
                    {exam.duration} {t.mins}
                  </td>
                  <td className="px-4 py-3 text-center text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>{exam.room}</td>
                  <td className="px-4 py-3 text-center" style={{ borderRight: `1px solid ${bdrL}` }}>
                    <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                      style={{ background: `${typeColor(exam.examType)}22`, color: typeColor(exam.examType), border: `1px solid ${typeColor(exam.examType)}44` }}>
                      {typeLabel(exam.examType)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                      style={{ background: `${statusColor(exam.status)}22`, color: statusColor(exam.status), border: `1px solid ${statusColor(exam.status)}44` }}>
                      {statusLabel(exam.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
