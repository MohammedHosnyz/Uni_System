'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Compass, CheckCircle2, Star, CalendarDays, MapPin,
  Users, SlidersHorizontal,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الأنشطة والفعاليات الطلابية',
    subtitle: 'اكتشف الأنشطة الجامعية والمسابقات، وسجل حضورك لتكسب نقاط تميز',
    available: 'أنشطة متاحة للتسجيل',
    myActivities: 'سجل مشاركاتي النشطة',
    points: 'إجمالي نقاط التميز المكتسبة',
    upcoming: 'فعاليات قادمة قريباً',
    all: 'جميع الأنشطة والفعاليات',
    tech: 'تقني وتكنولوجي',
    training: 'تدريب وورش عمل',
    sports: 'رياضي وبدني',
    academic: 'أكاديمي وعلمي',
    cultural: 'ثقافي وفني',
    statusUpcoming: 'قادم',
    statusRegistered: 'تم الحجز بنجاح',
    statusAvailable: 'متاح للتسجيل',
    statusDone: 'منتهي',
    statusAttended: 'تم حضور الفعالية',
    participants: 'مشارك مسجل',
    btnRegister: 'تأكيد التسجيل بالفعالية',
    btnRegistered: 'مسجل بالفعل بالفعالية',
    btnDone: 'انتهت فترة الفعالية',
    btnSoon: 'قريباً جداً',
    btnRegistering: 'جاري الحجز...',
    noActivities: 'لا توجد أنشطة معلنة في هذا التصنيف حالياً',
    noMyActivities: 'لم تقم بالتسجيل في أي نشاط طلابي بعد في هذا الفصل',
    pts: 'نقطة تميز',
  },
  en: {
    title: 'Student Activities & Events',
    subtitle: 'Explore campus clubs, workshops, tournaments and build extracurricular credits',
    available: 'Available to Join',
    myActivities: 'My Enrolled Activities',
    points: 'Total Distinction Points',
    upcoming: 'Upcoming Campus Events',
    all: 'All Categories',
    tech: 'Tech & Innovation',
    training: 'Workshops & Training',
    sports: 'Sports & Athletics',
    academic: 'Scientific & Academic',
    cultural: 'Art & Cultural',
    statusUpcoming: 'Upcoming',
    statusRegistered: 'Successfully Booked',
    statusAvailable: 'Open for Registration',
    statusDone: 'Completed',
    statusAttended: 'Attended & Verified',
    participants: 'registered students',
    btnRegister: 'Register for Event',
    btnRegistered: 'Already Registered',
    btnDone: 'Event Completed',
    btnSoon: 'Opening Soon',
    btnRegistering: 'Booking Seat...',
    noActivities: 'No activities found in this category yet',
    noMyActivities: 'You have not registered for any campus activities this semester',
    pts: 'distinction points',
  },
} as const;

type Activity = {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  categoryAr: string;
  categoryEn: string;
  date: string;
  timeAr: string;
  timeEn: string;
  locationAr: string;
  locationEn: string;
  maxParticipants: number;
  points: number;
  status: string;
  participantCount: number;
  myStatus: string | null;
};

export default function ActivitiesPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const [activities, setActivities]   = useState<Activity[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('all');
  const [registering, setRegistering] = useState<number | null>(null);

  const loc      = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t        = i18n[loc];
  const dir      = loc === 'ar' ? 'rtl' : 'ltr';

  const fetchData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const res = await fetch(`/api/student/activities?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities ?? []);
        setTotalPoints(data.totalPoints ?? 0);
      }
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = [
    { key: 'all',      label: t.all },
    { key: 'tech',     label: t.tech },
    { key: 'training', label: t.training },
    { key: 'sports',   label: t.sports },
    { key: 'academic', label: t.academic },
    { key: 'cultural', label: t.cultural },
  ];

  const catMap: Record<string, { ar: string; en: string }> = {
    tech:     { ar: 'تقني',   en: 'Technical' },
    training: { ar: 'تدريبي', en: 'Training'  },
    sports:   { ar: 'رياضي',  en: 'Sports'    },
    academic: { ar: 'أكاديمي',en: 'Academic'  },
    cultural: { ar: 'ثقافي',  en: 'Cultural'  },
  };

  const filtered = useMemo(() =>
    selectedCat === 'all'
      ? activities
      : activities.filter(a => (loc === 'ar' ? a.categoryAr : a.categoryEn) === catMap[selectedCat]?.[loc]),
    [activities, selectedCat, loc]);

  const myActivities = useMemo(() => activities.filter(a => a.myStatus), [activities]);

  const stats = useMemo(() => ({
    available: activities.filter(a => a.status === 'available').length,
    upcoming:  activities.filter(a => a.status === 'upcoming').length,
  }), [activities]);

  const statusLabel = (s: string, myStatus?: string | null) => {
    if (myStatus === 'attended') return t.statusAttended;
    if (myStatus === 'registered') return t.statusRegistered;
    return s === 'upcoming' ? t.statusUpcoming : s === 'available' ? t.statusAvailable : t.statusDone;
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleRegister = async (activityId: number) => {
    if (!user) return;
    setRegistering(activityId);
    try {
      const res = await fetch('/api/student/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, activityId }),
      });
      if (res.ok) fetchData();
    } finally {
      setRegistering(null);
    }
  };

  const btnLabel = (a: Activity) => {
    if (registering === a.id) return t.btnRegistering;
    if (a.myStatus) return t.btnRegistered;
    if (a.status === 'done') return t.btnDone;
    if (a.status === 'upcoming') return t.btnSoon;
    return t.btnRegister;
  };

  const canRegister = (a: Activity) =>
    a.status === 'available' && !a.myStatus && registering !== a.id;

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
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    {user.firstName} {user.lastName} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: t.available,    value: dataLoading ? '—' : stats.available,      icon: Compass      },
                  { label: t.myActivities, value: dataLoading ? '—' : myActivities.length,  icon: CheckCircle2 },
                  { label: t.points,       value: dataLoading ? '—' : totalPoints,           icon: Star         },
                  { label: t.upcoming,     value: dataLoading ? '—' : stats.upcoming,        icon: CalendarDays },
                ].map(({ label, value, icon: Icon }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-start min-w-0">
                      <p className="text-[9px] text-stone-450 dark:text-stone-550 font-bold truncate">{label}</p>
                      <p className="text-sm font-bold text-[#D97706] truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* My Enrolled Activities Log */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.myActivities}</CardTitle>
              </div>
              {myActivities.length > 0 && (
                <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                  {myActivities.length}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {dataLoading ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                </div>
              ) : myActivities.length === 0 ? (
                <div className="py-6 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                  {t.noMyActivities}
                </div>
              ) : (
                <div className="space-y-3">
                  {myActivities.map((a, idx) => (
                    <div key={a.id} className="space-y-3">
                      <div className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                            <Star className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-800 dark:text-stone-150">
                              {loc === 'ar' ? a.titleAr : a.titleEn}
                            </p>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">{fmtDate(a.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                            {statusLabel(a.status, a.myStatus)}
                          </Badge>
                          <span className="text-xs font-bold text-[#D97706]">+{a.points} {t.pts}</span>
                        </div>
                      </div>
                      {idx < myActivities.length - 1 && <Separator className="bg-stone-100 dark:bg-stone-800" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Category Tabs */}
        <div className="p-3 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm flex items-center gap-2.5 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-[#D97706] shrink-0" />
          <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <Button
                key={key}
                onClick={() => setSelectedCat(key)}
                className={`text-xs font-bold py-1.5 px-3.5 rounded-xl transition-all shadow-sm ${
                  selectedCat === key
                    ? 'bg-[#FABA19] hover:bg-[#e5a816] text-white border-0'
                    : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Specific Activities Directory */}
        {dataLoading ? (
          <div className="flex items-center justify-center py-16 bg-white dark:bg-stone-900 rounded-2xl">
            <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2">
            <Compass className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            <p className="text-xs font-bold text-stone-450 dark:text-stone-550">{t.noActivities}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(a => {
              const title = loc === 'ar' ? a.titleAr : a.titleEn;
              const desc  = loc === 'ar' ? a.descAr  : a.descEn;
              const cat   = loc === 'ar' ? a.categoryAr : a.categoryEn;
              const time  = loc === 'ar' ? a.timeAr : a.timeEn;
              const loc2  = loc === 'ar' ? a.locationAr : a.locationEn;
              const pct   = Math.min(100, Math.round((a.participantCount / a.maxParticipants) * 100));
              const isRegistered = !!a.myStatus;

              return (
                <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-full bg-white dark:bg-stone-900 ${
                    isRegistered
                      ? 'border-[#FABA19]'
                      : 'border-stone-150 dark:border-stone-800 hover:border-amber-200/50'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-stone-850 dark:text-stone-100">{title}</p>
                          <p className="text-[10px] font-bold text-[#D97706] mt-0.5 uppercase">{cat}</p>
                        </div>
                        <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                          {statusLabel(a.status, a.myStatus)}
                        </Badge>
                      </div>

                      <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold leading-relaxed">{desc}</p>

                      <div className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-2.5">
                        {[
                          { icon: CalendarDays, text: `${fmtDate(a.date)} • ${time}` },
                          { icon: MapPin,       text: loc2 },
                          { icon: Users,        text: `${a.participantCount} / ${a.maxParticipants} ${t.participants}` },
                          { icon: Star,         text: `+${a.points} ${t.pts}` },
                        ].map(({ icon: Icon, text }, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                            <Icon className="w-4.5 h-4.5 text-[#D97706] shrink-0" />
                            <span className="truncate">{text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Participant Cap Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-stone-450 dark:text-stone-500">
                          <span>{t.participants}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                          <div className="h-1 rounded-full bg-[#FABA19]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Button
                        disabled={!canRegister(a)}
                        onClick={() => canRegister(a) && handleRegister(a.id)}
                        className={`w-full font-bold text-xs py-2 rounded-xl transition-all shadow-sm ${
                          canRegister(a)
                            ? 'bg-[#FABA19] hover:bg-[#e5a816] text-white border-0'
                            : 'bg-stone-50 dark:bg-stone-850 text-stone-400 dark:text-stone-600 border border-stone-200 dark:border-stone-800 cursor-not-allowed'
                        }`}
                      >
                        {btnLabel(a)}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
