'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  BarChart2, CheckCircle2, XCircle, TrendingUp,
  BookOpen, AlertTriangle, ShieldCheck, Clock,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الحضور والغياب', subtitle: 'سجل الحضور لكل مادة',
    totalClasses: 'إجمالي المحاضرات', attended: 'الحضور', absent: 'الغياب', rate: 'نسبة الحضور',
    statusExcellent: 'ممتاز', statusSafe: 'آمن', statusDanger: 'خطر',
    present: 'حاضر', absentLabel: 'غائب', excused: 'بعذر',
    session: 'محاضرة', noData: 'لا توجد بيانات حضور',
    warning: 'تنبيه', warningText: 'نسبة الحضور يجب ألا تقل عن 75% لدخول الامتحان النهائي.',
    credits: 'ساعة',
    sessionTypes: { lecture: 'محاضرة', lab: 'معمل', tutorial: 'تمارين' },
  },
  en: {
    title: 'Attendance', subtitle: 'Attendance record per course',
    totalClasses: 'Total Sessions', attended: 'Attended', absent: 'Absent', rate: 'Rate',
    statusExcellent: 'Excellent', statusSafe: 'Safe', statusDanger: 'At Risk',
    present: 'Present', absentLabel: 'Absent', excused: 'Excused',
    session: 'Session', noData: 'No attendance data',
    warning: 'Notice', warningText: 'Attendance must not fall below 75% to be eligible for the final exam.',
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

interface Stats { total: number; present: number; absent: number; rate: number }

export default function AbsencePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th  = dark ? darkTheme : theme;

  const [courses, setCourses]       = useState<CourseAttendance[]>([]);
  const [stats, setStats]           = useState<Stats>({ total: 0, present: 0, absent: 0, rate: 0 });
  const [semName, setSemName]       = useState('');
  const [dataLoading, setLoading]   = useState(true);
  const [expanded, setExpanded]     = useState<string | null>(null);

  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';

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
    if (stats.rate >= 90) return { label: t.statusExcellent, color: th.primary };
    if (stats.rate >= 75) return { label: t.statusSafe,      color: dark ? '#C8A86A' : '#8B6914' };
    return                       { label: t.statusDanger,    color: dark ? '#A89060' : '#6B5010' };
  }, [stats.rate, t, th.primary, dark]);

  const courseRisk = (rate: number) =>
    rate >= 90 ? th.primary : rate >= 75 ? (dark ? '#C8A86A' : '#8B6914') : (dark ? '#A89060' : '#6B5010');

  const sessionTypeLabel = (type: string) =>
    type === 'lecture' ? t.sessionTypes.lecture
    : type === 'lab'   ? t.sessionTypes.lab
    : t.sessionTypes.tutorial;

  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemAnim = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  const Skeleton = () => (
    <div className="space-y-3 p-4">
      {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: iconBg }} />)}
    </div>
  );

  if (loading || !user) return null;

  const atRisk = courses.filter(c => c.rate < 75);

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BarChart2 className="w-6 h-6" style={{ color: heroText }} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                    <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>
                      {user.firstName} {user.lastName} • {semName || t.subtitle}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2"
                  style={{ background: `${riskLevel.color}22`, color: riskLevel.color, border: `1px solid ${riskLevel.color}44` }}>
                  <ShieldCheck className="w-4 h-4" /> {riskLevel.label} — {stats.rate}%
                </span>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <motion.div variants={stagger} initial="hidden" animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: t.totalClasses, value: stats.total,      icon: BookOpen,     color: th.primary },
                  { label: t.attended,     value: stats.present,    icon: CheckCircle2, color: th.primary },
                  { label: t.absent,       value: stats.absent,     icon: XCircle,      color: dark ? '#A89060' : '#6B5010' },
                  { label: t.rate,         value: `${stats.rate}%`, icon: TrendingUp,   color: th.primary },
                ].map(({ label, value, icon: Icon, color }) => (
                  <motion.div key={label} variants={itemAnim}>
                    <div style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }}
                      className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}</p>
                        <p className="text-xl font-extrabold" style={{ color }}>{value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        
        {dataLoading && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16 }}>
            <Skeleton />
          </div>
        )}

        
        {!dataLoading && courses.length === 0 && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
            <BarChart2 className="w-12 h-12 mx-auto mb-3" style={{ color: th.textMuted }} />
            <p style={{ color: th.textMuted }}>{t.noData}</p>
          </div>
        )}

        
        {!dataLoading && courses.map(course => {
          const risk  = courseRisk(course.rate);
          const isExp = expanded === course.courseCode;
          const courseName = loc === 'ar' ? course.courseNameAr : course.courseNameEn;

          return (
            <motion.div key={course.courseCode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>

                
                <button className="w-full text-start"
                  onClick={() => setExpanded(isExp ? null : course.courseCode)}>
                  <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: isExp ? `1px solid ${bdrL}` : 'none' }}
                    className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <BookOpen className="w-5 h-5" style={{ color: th.primary }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold truncate" style={{ color: th.text }}>{courseName}</p>
                        <p className="text-xs font-mono" style={{ color: th.primary }}>{course.courseCode} • {course.credits} {t.credits}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      
                      <div className="hidden sm:flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1" style={{ color: th.primary }}>
                          <CheckCircle2 className="w-4 h-4" />{course.present + course.excused}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: dark ? '#A89060' : '#6B5010' }}>
                          <XCircle className="w-4 h-4" />{course.absent}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: th.textMuted }}>
                          <Clock className="w-4 h-4" />{course.total}
                        </span>
                      </div>
                      
                      <span className="px-3 py-1 rounded-full text-sm font-extrabold"
                        style={{ background: `${risk}22`, color: risk, border: `1px solid ${risk}44` }}>
                        {course.rate}%
                      </span>
                      
                      <div className="hidden md:block w-24 h-2 rounded-full overflow-hidden" style={{ background: bdrL }}>
                        <div className="h-2 rounded-full transition-all"
                          style={{ width: `${course.rate}%`, background: risk }} />
                      </div>
                    </div>
                  </div>
                </button>

                
                {isExp && (
                  <div style={{ padding: '1rem 1.25rem' }}>
                    {course.sessions.length === 0 ? (
                      <p className="text-sm text-center py-4" style={{ color: th.textMuted }}>{t.noData}</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {course.sessions.map((s, idx) => {
                          const isPresent = s.status === 'present' || s.status === 'excused';
                          const color   = isPresent ? '#22c55e' : '#ef4444';
                          const bg      = isPresent ? (dark ? '#1a2a1a' : '#f0fff4') : (dark ? '#2a1a1a' : '#fff5f5');
                          const borderC = isPresent ? (dark ? '#2a4a2a' : '#bbf7d0') : (dark ? '#4a2a2a' : '#fecaca');

                          return (
                            <div key={idx}
                              title={`${s.date} ${s.startTime} — ${sessionTypeLabel(s.sessionType)}`}
                              style={{ background: bg, border: `1px solid ${borderC}`, borderRadius: 10, padding: '0.5rem 0.75rem', minWidth: 90, textAlign: 'center' }}>
                              <div className="flex items-center justify-center mb-1">
                                {isPresent
                                  ? <CheckCircle2 className="w-4 h-4" style={{ color }} />
                                  : <XCircle     className="w-4 h-4" style={{ color }} />
                                }
                              </div>
                              <p className="text-xs font-bold" style={{ color: th.text }}>{s.date.slice(5)}</p>
                              <p className="text-xs" style={{ color: th.textMuted }}>{s.startTime}</p>
                              <p className="text-xs font-semibold mt-0.5" style={{ color }}>
                                {s.status === 'excused' ? t.excused : isPresent ? t.present : t.absentLabel}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        
        {!dataLoading && atRisk.length > 0 && (
          <div style={{ background: `${th.primary}15`, border: `1px solid ${th.primary}33`, borderRadius: 16, padding: '1.25rem' }}
            className="flex items-start gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${th.primary}22`, border: `1px solid ${th.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle className="w-5 h-5" style={{ color: th.primary }} />
            </div>
            <div>
              <p className="font-extrabold mb-1" style={{ color: th.primary }}>{t.warning}</p>
              <p className="text-sm" style={{ color: th.text }}>{t.warningText}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {atRisk.map(c => (
                  <span key={c.courseCode} className="px-2 py-0.5 rounded-full text-xs font-extrabold"
                    style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
                    {c.courseCode} — {c.rate}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        
        {!dataLoading && atRisk.length === 0 && courses.length > 0 && (
          <div style={{ background: `${th.primary}15`, border: `1px solid ${th.primary}33`, borderRadius: 16, padding: '1.25rem' }}
            className="flex items-start gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${th.primary}22`, border: `1px solid ${th.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck className="w-5 h-5" style={{ color: th.primary }} />
            </div>
            <div>
              <p className="font-extrabold mb-1" style={{ color: th.primary }}>{t.statusSafe}</p>
              <p className="text-sm" style={{ color: th.text }}>{t.warningText}</p>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
