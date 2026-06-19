'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar, List, BookOpen, GraduationCap, Users,
  MapPin, User, Clock, LayoutGrid,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الجدول الدراسي الأسبوعي',
    studentName: 'اسم الطالب',
    studentNum: 'رقم الطالب',
    semesterLabel: 'الفصل الدراسي',
    noSemester: 'لا يوجد فصل دراسي نشط',
    totalSessions: 'إجمالي المحاضرات',
    lectures: 'المحاضرات النظرية',
    labs: 'التمارين والعملي',
    todaySchedule: 'محاضرات اليوم',
    sessions: 'محاضرة',
    tableView: 'عرض الجدول الموحد',
    listView: 'عرض القائمة التفصيلية',
    time: 'توقيت المحاضرة',
    lecture: 'محاضرة نظرية',
    lab: 'معمل / عملي',
    tutorial: 'تمارين / كويز',
    legend: 'دليل تصنيفات الجدول',
    noData: 'لا يوجد جدول دراسي مسجل حالياً',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dr: 'د.',
  },
  en: {
    title: 'Weekly Schedule',
    studentName: 'Student Name',
    studentNum: 'Student ID',
    semesterLabel: 'Semester',
    noSemester: 'No active semester',
    totalSessions: 'Total Lectures',
    lectures: 'Lectures',
    labs: 'Labs & Tutorials',
    todaySchedule: "Today's Lectures",
    sessions: 'sessions',
    tableView: 'Weekly Grid View',
    listView: 'List View',
    time: 'Class Time',
    lecture: 'Lecture',
    lab: 'Lab Class',
    tutorial: 'Tutorial / Quiz',
    legend: 'Schedule Legend',
    noData: 'No schedule available currently',
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

interface ApiSemester {
  id: number;
  name: string;
  year: number;
  season: string;
}

function getSessionStyles(type: string) {
  if (type === 'lecture') {
    return {
      bg: 'bg-amber-500/10 dark:bg-amber-955/20 border-amber-500/20 dark:border-amber-900/30',
      text: 'text-[#D97706]',
      badge: 'bg-amber-100 dark:bg-amber-950/40 text-[#D97706]',
    };
  }
  if (type === 'lab') {
    return {
      bg: 'bg-blue-500/10 dark:bg-blue-955/20 border-blue-500/20 dark:border-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450',
    };
  }
  return {
    bg: 'bg-emerald-500/10 dark:bg-emerald-955/20 border-emerald-500/20 dark:border-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450',
  };
}

export default function SchedulePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [viewMode, setViewMode]     = useState<'table' | 'list'>('table');
  const [sessions, setSessions]     = useState<ApiSession[]>([]);
  const [semester, setSemester]     = useState<ApiSemester | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/schedule?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setSessions(d.sessions ?? []);
        setSemester(d.semester ?? null);
      })
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

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                <div className="flex gap-2 bg-stone-50/50 dark:bg-stone-800 p-1.5 rounded-xl border border-stone-150 dark:border-stone-750 self-start sm:self-auto">
                  {(['table', 'list'] as const).map(v => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                        viewMode === v
                          ? 'bg-[#FABA19] text-white shadow-sm'
                          : 'text-stone-500 hover:text-[#D97706] dark:text-stone-400'
                      }`}
                    >
                      {v === 'table' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                      {v === 'table' ? t.tableView : t.listView}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-center sm:text-start">
                {[
                  { label: t.studentName,   value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,    value: user.studentNumber ?? '—' },
                  { label: t.semesterLabel, value: semesterLabel, highlight: true },
                ].map((r, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{r.label}</p>
                    <p className={`text-xs font-bold ${r.highlight ? 'text-[#D97706]' : 'text-stone-750 dark:text-stone-250'}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Statistics Grid */}
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Calendar className="w-5 h-5 text-[#D97706]" />, label: t.totalSessions, value: stats.total },
            { icon: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />, label: t.lectures, value: stats.lectures },
            { icon: <Users className="w-5 h-5 text-emerald-600" />, label: t.labs, value: stats.others },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-bold mb-1">{s.label}</p>
                    <p className="text-xl font-bold text-stone-850 dark:text-stone-100">{s.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800">
                    {s.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Today's schedule alert if exists */}
        {!dataLoading && todaySessions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <div className="bg-amber-500/10 dark:bg-amber-955/15 px-5 py-3 border-b border-amber-250/20 dark:border-amber-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-stone-900 border border-amber-200/50 flex items-center justify-center text-[#D97706]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-stone-850 dark:text-stone-150">
                    {t.todaySchedule} — {t.days[todayDay]}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#D97706] bg-white dark:bg-stone-900 border border-amber-200/40 px-2 py-0.5 rounded-full">{todaySessions.length} {t.sessions}</span>
              </div>
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {todaySessions.map(s => {
                  const styles = getSessionStyles(s.sessionType);
                  return (
                    <div key={s.id} className={`p-4 rounded-xl border ${styles.bg} transition-colors flex flex-col justify-between`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-850/80 flex items-center justify-center shrink-0 text-[#D97706]">
                            <BookOpen className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-stone-850 dark:text-stone-100 truncate">{courseName(s)}</p>
                            <p className="text-[10px] font-mono text-[#D97706] mt-0.5">{s.courseCode}</p>
                            <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold mt-1">{s.timeRange}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold flex-shrink-0 border border-current ${styles.text}`}>
                          {typeLabel(s.sessionType)}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs border-t border-stone-150/40 dark:border-stone-800/40 pt-2.5">
                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-450 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                          <span>{s.room}</span>
                        </div>
                        {s.professorName && (
                          <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-450 font-semibold">
                            <User className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                            <span>{t.dr} {s.professorName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Schedule Table / Grid */}
        {!dataLoading && sessions.length > 0 && viewMode === 'table' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: activeDays.length * 160 + 120 }}>
                  <thead>
                    <tr className="bg-stone-50 dark:bg-stone-850/50 border-b border-stone-150 dark:border-stone-800">
                      <th className="px-4 py-3 text-center text-xs font-bold text-stone-500 dark:text-stone-400 w-28 border-e border-stone-150 dark:border-stone-800">
                        {t.time}
                      </th>
                      {activeDays.map(di => (
                        <th key={di} className="px-4 py-3 text-center text-xs font-bold text-stone-500 dark:text-stone-400 border-e border-stone-150 dark:border-stone-800 last:border-e-0">
                          {t.days[di]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((startTime, ti) => (
                      <tr key={startTime} className="border-b border-stone-100 dark:border-stone-800/60 last:border-b-0">
                        <td className="px-4 py-4 text-center text-xs font-mono font-bold text-[#D97706] bg-stone-50/20 dark:bg-stone-800/10 border-e border-stone-150 dark:border-stone-800">
                          {startTime}
                        </td>
                        {activeDays.map(di => {
                          const s = getSession(di, startTime);
                          if (!s) {
                            return <td key={di} className="px-2 py-2 border-e border-stone-100 dark:border-stone-800/60 last:border-e-0" />;
                          }
                          const styles = getSessionStyles(s.sessionType);
                          return (
                            <td key={di} className="px-2 py-2 align-top border-e border-stone-100 dark:border-stone-800/60 last:border-e-0">
                              <div className={`p-2.5 rounded-xl border ${styles.bg} min-h-[96px] flex flex-col justify-between`}>
                                <div className="space-y-1">
                                  <div className="flex items-start gap-1">
                                    <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                                    <p className="text-[11px] font-bold text-stone-850 dark:text-stone-100 leading-tight line-clamp-2">{courseName(s)}</p>
                                  </div>
                                  <p className="text-[9px] font-mono text-[#D97706] font-semibold">{s.courseCode}</p>
                                </div>
                                <div className="space-y-0.5 border-t border-stone-150/40 dark:border-stone-800/40 pt-1.5 mt-2">
                                  <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-450 font-semibold truncate">
                                    <MapPin className="w-3 h-3 text-[#D97706]" />
                                    <span>{s.room}</span>
                                  </div>
                                  {s.professorName && (
                                    <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-450 font-semibold truncate">
                                      <User className="w-3 h-3 text-[#D97706]" />
                                      <span>{s.professorName}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Schedule List View */}
        {!dataLoading && sessions.length > 0 && viewMode === 'list' && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
            {activeDays.map(di => {
              const daySessions = sessions.filter(s => s.dayOfWeek === di);
              return (
                <motion.div key={di} variants={itemAnim}>
                  <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                    <div className="bg-stone-50 dark:bg-stone-800/40 px-5 py-3 border-b border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-750 flex items-center justify-center text-[#D97706]">
                          <Calendar className="w-4.5 h-4.5" />
                        </div>
                        <p className="text-xs font-bold text-stone-850 dark:text-stone-100">{t.days[di]}</p>
                      </div>
                      <span className="text-[10px] font-bold text-stone-450 dark:text-stone-500 bg-stone-100 dark:bg-stone-900 px-2.5 py-0.5 rounded-full">{daySessions.length} {t.sessions}</span>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      {daySessions.map(s => {
                        const styles = getSessionStyles(s.sessionType);
                        return (
                          <div key={s.id} className={`p-4 rounded-xl border ${styles.bg} transition-colors flex items-center justify-between gap-4 flex-wrap`}>
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5 text-center min-w-[84px] shrink-0">
                                <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold mb-0.5">{t.time}</p>
                                <p className="text-xs font-mono font-extrabold text-[#D97706]">{s.startTime}</p>
                                <p className="text-[10px] font-mono text-stone-450 dark:text-stone-500">{s.endTime}</p>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-xs text-stone-850 dark:text-stone-100 truncate">{courseName(s)}</p>
                                <p className="text-[10px] font-mono text-[#D97706] mt-0.5 mb-1.5">{s.courseCode}</p>
                                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-stone-500 dark:text-stone-450">
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />{s.room}
                                  </span>
                                  {s.professorName && (
                                    <span className="flex items-center gap-1.5">
                                      <User className="w-3.5 h-3.5 text-[#D97706]" />{t.dr} {s.professorName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold flex-shrink-0 border border-current ${styles.text}`}>
                              {typeLabel(s.sessionType)}
                            </span>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Legend Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100 dark:border-stone-800">
              <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                <LayoutGrid className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.legend}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['lecture', 'lab', 'tutorial'] as const).map(type => {
                const styles = getSessionStyles(type);
                const label = type === 'lecture' ? t.lecture : type === 'lab' ? t.lab : t.tutorial;
                const Icon = type === 'lecture' ? GraduationCap : type === 'lab' ? BookOpen : Users;
                return (
                  <div key={type} className={`flex items-center gap-3 p-3 rounded-xl border ${styles.bg}`}>
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${styles.text}`} />
                    </div>
                    <p className={`text-xs font-bold ${styles.text}`}>{label}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
