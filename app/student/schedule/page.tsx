'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  Calendar, List, BookOpen, GraduationCap, Users,
  MapPin, User, Clock, LayoutGrid,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الجدول الدراسي',
    studentName: 'اسم الطالب', studentNum: 'رقم الطالب',
    semesterLabel: 'الفصل الدراسي', noSemester: 'لا يوجد فصل نشط',
    totalSessions: 'إجمالي الحصص', lectures: 'المحاضرات', labs: 'المعامل والتمارين',
    todaySchedule: 'جدول اليوم', sessions: 'حصة',
    tableView: 'جدول', listView: 'قائمة',
    time: 'الوقت', lecture: 'محاضرة', lab: 'معمل', tutorial: 'تمارين',
    legend: 'دليل الأنواع', noData: 'لا يوجد جدول دراسي حالياً',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dr: 'د.',
  },
  en: {
    title: 'Schedule',
    studentName: 'Student Name', studentNum: 'Student ID',
    semesterLabel: 'Semester', noSemester: 'No active semester',
    totalSessions: 'Total Sessions', lectures: 'Lectures', labs: 'Labs & Tutorials',
    todaySchedule: "Today's Schedule", sessions: 'sessions',
    tableView: 'Table', listView: 'List',
    time: 'Time', lecture: 'Lecture', lab: 'Lab', tutorial: 'Tutorial',
    legend: 'Type Guide', noData: 'No schedule available',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dr: 'Dr.',
  },
} as const;

interface ApiSession {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timeRange: string;
  sessionType: string;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  room: string;
  professorName: string | null;
}

interface ApiSemester { id: number; name: string; year: number; season: string }

function sessionColors(type: string, dark: boolean, primary: string) {
  const alpha = (hex: string, a: number) =>
    `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
  if (type === 'lecture')
    return { bg: alpha(primary, dark ? 0.18 : 0.12), border: alpha(primary, dark ? 0.35 : 0.28), text: primary };
  if (type === 'lab')
    return { bg: alpha(primary, dark ? 0.10 : 0.07), border: alpha(primary, dark ? 0.22 : 0.18), text: dark ? '#C8A86A' : '#8B6914' };
  return { bg: alpha(primary, dark ? 0.07 : 0.05), border: alpha(primary, dark ? 0.16 : 0.12), text: dark ? '#A89060' : '#6B5010' };
}

export default function SchedulePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th  = dark ? darkTheme : theme;

  const [viewMode, setViewMode]     = useState<'table' | 'list'>('table');
  const [sessions, setSessions]     = useState<ApiSession[]>([]);
  const [semester, setSemester]     = useState<ApiSemester | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const card    = dark ? darkTheme.surface    : theme.white;
  const bdr     = dark ? darkTheme.border     : theme.border;
  const bdrL    = dark ? darkTheme.borderLight : theme.border;
  const iconBg  = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg  = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text      : '#1A1612';

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/schedule?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setSessions(d.sessions ?? []); setSemester(d.semester ?? null); })
      .catch(() => {})
      .finally(() => setDataLoading(false));
  }, [user?.id]);

  const stats = useMemo(() => {
    const lectures = sessions.filter(s => s.sessionType === 'lecture').length;
    return { total: sessions.length, lectures, others: sessions.length - lectures };
  }, [sessions]);

  
  const timeSlots = useMemo(() =>
    [...new Set(sessions.map(s => s.startTime))].sort(), [sessions]);

  
  const activeDays = useMemo(() =>
    [...new Set(sessions.map(s => s.dayOfWeek))].sort(), [sessions]);

  const todayDay = new Date().getDay();
  const todaySessions = sessions.filter(s => s.dayOfWeek === todayDay);

  const getSession = (day: number, startTime: string) =>
    sessions.find(s => s.dayOfWeek === day && s.startTime === startTime);

  const typeLabel = (type: string) =>
    type === 'lecture' ? t.lecture : type === 'lab' ? t.lab : t.tutorial;

  const courseName = (s: ApiSession) =>
    loc === 'ar' ? s.courseNameAr : s.courseNameEn;

  const semesterLabel = semester
    ? `${semester.name} ${semester.year}`
    : t.noSemester;

  if (loading || !user) return null;

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  const Skeleton = () => (
    <div className="space-y-3 p-4">
      {[1,2,3].map(i => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: iconBg }} />)}
    </div>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: `2px solid rgba(0,0,0,0.15)` }}>
                    <img
                      src={user.avatarUrl ?? '/default-avatar.png'}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                    <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(['table', 'list'] as const).map(v => (
                    <button key={v} onClick={() => setViewMode(v)}
                      className="px-4 py-2 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all"
                      style={{
                        background: viewMode === v ? (dark ? darkTheme.surfaceAlt : 'rgba(0,0,0,0.18)') : 'transparent',
                        color: viewMode === v ? (dark ? th.primary : '#1A1612') : (dark ? darkTheme.textMuted : 'rgba(26,22,18,0.6)'),
                        border: `1px solid ${viewMode === v ? (dark ? darkTheme.border : 'rgba(0,0,0,0.15)') : 'transparent'}`,
                      }}>
                      {v === 'table' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                      {v === 'table' ? t.tableView : t.listView}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t.studentName,   value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,    value: user.studentNumber ?? '—' },
                  { label: t.semesterLabel, value: semesterLabel, gold: true },
                ].map(r => (
                  <div key={r.label} className="text-center">
                    <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-extrabold" style={{ color: r.gold ? th.primary : th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Calendar className="w-7 h-7" />, label: t.totalSessions, value: stats.total },
            { icon: <GraduationCap className="w-7 h-7" />, label: t.lectures,      value: stats.lectures },
            { icon: <Users className="w-7 h-7" />,        label: t.labs,           value: stats.others },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem', textAlign: 'center' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: iconBg, border: `1px solid ${bdrL}`, color: th.primary }}>
                  {s.icon}
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: th.textMuted }}>{s.label}</p>
                <p className="text-2xl font-extrabold" style={{ color: th.text }}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
        {!dataLoading && todaySessions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }}
                className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <p className="font-extrabold" style={{ color: th.text }}>
                    {t.todaySchedule} — {t.days[todayDay]}
                  </p>
                </div>
                <span className="text-sm font-semibold" style={{ color: th.textMuted }}>{todaySessions.length} {t.sessions}</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {todaySessions.map(s => {
                  const col = sessionColors(s.sessionType, dark, th.primary);
                  return (
                    <div key={s.id} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 14, padding: '1rem' }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${col.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <BookOpen className="w-5 h-5" style={{ color: col.text }} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold truncate" style={{ color: th.text }}>{courseName(s)}</p>
                            <p className="text-xs font-mono" style={{ color: th.primary }}>{s.courseCode}</p>
                            <p className="text-sm" style={{ color: th.textMuted }}>{s.timeRange}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-extrabold flex-shrink-0"
                          style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}>
                          {typeLabel(s.sessionType)}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <div className="flex items-center gap-2" style={{ color: th.textMuted }}>
                          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: th.primary }} />
                          <span>{s.room}</span>
                        </div>
                        {s.professorName && (
                          <div className="flex items-center gap-2" style={{ color: th.textMuted }}>
                            <User className="w-4 h-4 flex-shrink-0" style={{ color: th.primary }} />
                            <span>{t.dr} {s.professorName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        
        {dataLoading && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <Skeleton />
          </div>
        )}

        
        {!dataLoading && sessions.length === 0 && (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
            <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: th.textMuted }} />
            <p style={{ color: th.textMuted }}>{t.noData}</p>
          </div>
        )}

        
        {!dataLoading && sessions.length > 0 && viewMode === 'table' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: activeDays.length * 160 + 120 }}>
                  <thead>
                    <tr style={{ background: heroBg }}>
                      <th className="px-4 py-3 text-center text-sm font-extrabold w-28"
                        style={{ color: heroText, borderRight: `1px solid rgba(0,0,0,0.1)` }}>
                        {t.time}
                      </th>
                      {activeDays.map(di => (
                        <th key={di} className="px-4 py-3 text-center text-sm font-extrabold"
                          style={{ color: heroText, borderRight: `1px solid rgba(0,0,0,0.1)` }}>
                          {t.days[di]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((startTime, ti) => (
                      <tr key={startTime} style={{ background: ti % 2 === 0 ? iconBg : card, borderBottom: `1px solid ${bdrL}` }}>
                        <td className="px-4 py-3 text-center text-sm font-extrabold"
                          style={{ color: th.primary, background: iconBg, borderRight: `1px solid ${bdrL}` }}>
                          {startTime}
                        </td>
                        {activeDays.map(di => {
                          const s = getSession(di, startTime);
                          if (!s) return <td key={di} className="px-2 py-2" style={{ borderRight: `1px solid ${bdrL}`, minHeight: 88 }} />;
                          const col = sessionColors(s.sessionType, dark, th.primary);
                          return (
                            <td key={di} className="px-2 py-2 align-top" style={{ borderRight: `1px solid ${bdrL}` }}>
                              <div style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 10, padding: '0.5rem 0.625rem', minHeight: 88 }}>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: col.text }} />
                                  <p className="text-xs font-extrabold truncate" style={{ color: th.text }}>{courseName(s)}</p>
                                </div>
                                <p className="text-xs font-mono truncate" style={{ color: th.primary }}>{s.courseCode}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: th.primary }} />
                                  <p className="text-xs truncate" style={{ color: th.textMuted }}>{s.room}</p>
                                </div>
                                {s.professorName && (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <User className="w-3 h-3 flex-shrink-0" style={{ color: th.primary }} />
                                    <p className="text-xs truncate" style={{ color: th.textMuted }}>{s.professorName}</p>
                                  </div>
                                )}
                                <span className="mt-1 inline-block px-1.5 py-0.5 rounded text-xs font-bold"
                                  style={{ background: col.border, color: col.text }}>
                                  {typeLabel(s.sessionType)}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        
        {!dataLoading && sessions.length > 0 && viewMode === 'list' && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
            {activeDays.map(di => {
              const daySessions = sessions.filter(s => s.dayOfWeek === di);
              return (
                <motion.div key={di} variants={itemAnim}>
                  <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }}
                      className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Calendar className="w-5 h-5" style={{ color: th.primary }} />
                        </div>
                        <p className="font-extrabold" style={{ color: th.text }}>{t.days[di]}</p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: th.textMuted }}>{daySessions.length} {t.sessions}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {daySessions.map(s => {
                        const col = sessionColors(s.sessionType, dark, th.primary);
                        return (
                          <div key={s.id} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 12, padding: '0.875rem 1rem' }}
                            className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div style={{ background: card, border: `1px solid ${col.border}`, borderRadius: 10, padding: '0.5rem 0.75rem', flexShrink: 0, textAlign: 'center', minWidth: 80 }}>
                                <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{t.time}</p>
                                <p className="text-sm font-extrabold" style={{ color: th.text }}>{s.startTime}</p>
                                <p className="text-xs" style={{ color: th.textMuted }}>{s.endTime}</p>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-extrabold truncate" style={{ color: th.text }}>{courseName(s)}</p>
                                <p className="text-xs font-mono mb-1" style={{ color: th.primary }}>{s.courseCode}</p>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                  <span className="flex items-center gap-1" style={{ color: th.textMuted }}>
                                    <MapPin className="w-3.5 h-3.5" style={{ color: th.primary }} />{s.room}
                                  </span>
                                  {s.professorName && (
                                    <span className="flex items-center gap-1" style={{ color: th.textMuted }}>
                                      <User className="w-3.5 h-3.5" style={{ color: th.primary }} />{t.dr} {s.professorName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold flex-shrink-0"
                              style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}>
                              {typeLabel(s.sessionType)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem' }}>
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LayoutGrid className="w-4 h-4" style={{ color: th.primary }} />
              </div>
              <p className="font-extrabold" style={{ color: th.text }}>{t.legend}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['lecture', 'lab', 'tutorial'] as const).map(type => {
                const col = sessionColors(type, dark, th.primary);
                const label = type === 'lecture' ? t.lecture : type === 'lab' ? t.lab : t.tutorial;
                const Icon = type === 'lecture' ? GraduationCap : type === 'lab' ? BookOpen : Users;
                return (
                  <div key={type} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 12, padding: '0.875rem 1rem' }}
                    className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${col.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon className="w-5 h-5" style={{ color: col.text }} />
                    </div>
                    <p className="font-extrabold" style={{ color: col.text }}>{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
