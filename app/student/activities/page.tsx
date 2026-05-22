'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Compass, CheckCircle2, Star, CalendarDays, MapPin,
  Users, Sparkles, SlidersHorizontal,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الأنشطة الطلابية', subtitle: 'اكتشف الأنشطة وسجل مشاركتك',
    available: 'الأنشطة المتاحة', myActivities: 'أنشطتي',
    points: 'النقاط المكتسبة', upcoming: 'الأنشطة القادمة',
    all: 'جميع الأنشطة', tech: 'تقني', training: 'تدريبي',
    sports: 'رياضي', academic: 'أكاديمي', cultural: 'ثقافي',
    statusUpcoming: 'قادم', statusRegistered: 'مسجل',
    statusAvailable: 'متاح', statusDone: 'مكتمل', statusAttended: 'حضرت',
    participants: 'مشارك',
    btnRegister: 'التسجيل في النشاط', btnRegistered: 'مسجل بالفعل',
    btnDone: 'انتهى النشاط', btnSoon: 'قريباً', btnRegistering: 'جاري التسجيل...',
    benefits: 'فوائد المشاركة في الأنشطة',
    b1: 'تطوير المهارات الشخصية والمهنية',
    b2: 'بناء شبكة علاقات مع الزملاء',
    b3: 'الحصول على نقاط إضافية في السجل الأكاديمي',
    b4: 'تعزيز الثقة بالنفس والقيادة',
    b5: 'إثراء السيرة الذاتية بالخبرات العملية',
    noActivities: 'لا توجد أنشطة في هذا التصنيف',
    noMyActivities: 'لم تسجل في أي نشاط بعد',
    pts: 'نقطة',
  },
  en: {
    title: 'Student Activities', subtitle: 'Discover activities and register your participation',
    available: 'Available Activities', myActivities: 'My Activities',
    points: 'Points Earned', upcoming: 'Upcoming',
    all: 'All Activities', tech: 'Technical', training: 'Training',
    sports: 'Sports', academic: 'Academic', cultural: 'Cultural',
    statusUpcoming: 'Upcoming', statusRegistered: 'Registered',
    statusAvailable: 'Available', statusDone: 'Completed', statusAttended: 'Attended',
    participants: 'participants',
    btnRegister: 'Register', btnRegistered: 'Already Registered',
    btnDone: 'Activity Ended', btnSoon: 'Coming Soon', btnRegistering: 'Registering...',
    benefits: 'Benefits of Participation',
    b1: 'Develop personal and professional skills',
    b2: 'Build a network with peers',
    b3: 'Earn extra points in academic record',
    b4: 'Boost confidence and leadership',
    b5: 'Enrich your CV with practical experience',
    noActivities: 'No activities in this category',
    noMyActivities: 'You have not registered for any activity yet',
    pts: 'pts',
  },
} as const;

type Activity = {
  id: number; titleAr: string; titleEn: string;
  descAr: string; descEn: string;
  categoryAr: string; categoryEn: string;
  date: string; timeAr: string; timeEn: string;
  locationAr: string; locationEn: string;
  maxParticipants: number; points: number;
  status: string; participantCount: number;
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
  const th       = dark ? darkTheme : theme;
  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';
  const p        = th.primary;

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

  useEffect(() => { fetchData(); }, [fetchData]);

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
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Compass className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>
                    {user.firstName} {user.lastName} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: t.available,    value: dataLoading ? '—' : stats.available,      icon: Compass      },
                  { label: t.myActivities, value: dataLoading ? '—' : myActivities.length,  icon: CheckCircle2 },
                  { label: t.points,       value: dataLoading ? '—' : totalPoints,           icon: Star         },
                  { label: t.upcoming,     value: dataLoading ? '—' : stats.upcoming,        icon: CalendarDays },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }} className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon className="w-4 h-4" style={{ color: p }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}</p>
                      <p className="text-xl font-extrabold" style={{ color: p }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <CardHeader style={{ background: iconBg, borderBottom: `1px solid ${bdrL}` }} className="py-3 px-5">
              <div className="flex items-center gap-3">
                <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: p }} />
                </div>
                <CardTitle style={{ color: th.text }}>{t.myActivities}</CardTitle>
                {myActivities.length > 0 && (
                  <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33` }}>{myActivities.length}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {dataLoading ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: `${p} transparent transparent transparent` }} />
                </div>
              ) : myActivities.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: th.textMuted }}>{t.noMyActivities}</p>
              ) : (
                <div className="space-y-3">
                  {myActivities.map(a => (
                    <div key={a.id} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}
                      className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Star className="w-5 h-5" style={{ color: p }} />
                        </div>
                        <div>
                          <p className="font-extrabold text-sm" style={{ color: th.text }}>
                            {loc === 'ar' ? a.titleAr : a.titleEn}
                          </p>
                          <p className="text-xs" style={{ color: th.textMuted }}>{fmtDate(a.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33` }}>
                          {statusLabel(a.status, a.myStatus)}
                        </Badge>
                        <span className="text-xs font-extrabold" style={{ color: p }}>+{a.points} {t.pts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '0.875rem 1.25rem' }}
          className="flex items-center gap-3 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 flex-shrink-0" style={{ color: p }} />
          <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button key={key} onClick={() => setSelectedCat(key)}
                className="px-4 py-2 rounded-xl font-extrabold text-sm transition-all"
                style={{ background: selectedCat === key ? p : iconBg, color: selectedCat === key ? heroText : th.textMuted, border: `1px solid ${selectedCat === key ? p : bdrL}` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        
        {dataLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: `${p} transparent transparent transparent` }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '3rem' }} className="text-center">
            <p style={{ color: th.textMuted }}>{t.noActivities}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div style={{ background: card, border: `1px solid ${isRegistered ? p : bdr}`, borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-extrabold" style={{ color: th.text }}>{title}</p>
                        <p className="text-xs font-extrabold mt-0.5" style={{ color: p }}>{cat}</p>
                      </div>
                      <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33`, flexShrink: 0 }}>
                        {statusLabel(a.status, a.myStatus)}
                      </Badge>
                    </div>

                    <p className="text-sm mb-3 flex-1" style={{ color: th.textMuted }}>{desc}</p>

                    <div className="space-y-1.5 mb-3">
                      {[
                        { icon: CalendarDays, text: `${fmtDate(a.date)} — ${time}` },
                        { icon: MapPin,       text: loc2 },
                        { icon: Users,        text: `${a.participantCount}/${a.maxParticipants} ${t.participants}` },
                        { icon: Star,         text: `${a.points} ${t.pts}` },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-sm" style={{ color: th.textMuted }}>
                          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: p }} />
                          {text}
                        </div>
                      ))}
                    </div>

                    
                    <div style={{ background: bdrL, borderRadius: 99, height: 6, marginBottom: '0.75rem' }}>
                      <div style={{ width: `${pct}%`, height: 6, borderRadius: 99, background: p, transition: 'width 0.4s' }} />
                    </div>

                    <Button
                      disabled={!canRegister(a)}
                      onClick={() => canRegister(a) && handleRegister(a.id)}
                      style={{
                        background: canRegister(a) ? p : iconBg,
                        color: canRegister(a) ? heroText : th.textMuted,
                        border: `1px solid ${canRegister(a) ? p : bdrL}`,
                        cursor: canRegister(a) ? 'pointer' : 'not-allowed',
                      }}>
                      {btnLabel(a)}
                    </Button>
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
