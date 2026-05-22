'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bus, CheckCircle2, RefreshCw, Printer, MapPin, Clock, Users, ArrowLeftRight, AlertTriangle, X, GraduationCap, Hash, CalendarDays, Wifi } from 'lucide-react';


function BusTransportCard({ sub, userName, studentNumber, loc }: {
  sub: { id: number; startDate: string; endDate: string; totalPaid: number; remainingDays: number; route: { nameAr: string; nameEn: string; departureTime: string; returnDepTime: string; stopsAr: string; stopsEn: string } };
  userName: string;
  studentNumber?: string;
  loc: 'ar' | 'en';
}) {
  const gold   = '#D4A843';
  const dark   = '#2F2415';
  const light  = '#FFFDF8';
  const muted  = '#7C6943';
  const fmtD   = (d: string) => new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const stops  = (() => { try { return JSON.parse(loc === 'ar' ? sub.route.stopsAr : sub.route.stopsEn) as string[]; } catch { return []; } })();
  const routeName = loc === 'ar' ? sub.route.nameAr : sub.route.nameEn;
  const cardId = `BUS-${String(sub.id).padStart(6, '0')}`;

  return (
    <div className="bus-print-card" style={{
      width: 340, height: 215, borderRadius: 16, overflow: 'hidden',
      fontFamily: 'Cairo, Arial, sans-serif', position: 'relative',
      background: light, border: `1px solid #DCCDAE`,
      boxShadow: '0 8px 32px rgba(47,36,21,0.18)',
      flexShrink: 0,
    }}>
      
      <div style={{
        background: `linear-gradient(135deg, ${gold} 0%, #B8902E 100%)`,
        padding: '9px 14px 7px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bus size={16} color="#fff" />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 10.5, letterSpacing: 0.3 }}>جامعة أسيوط الأهلية</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 8 }}>Assiut National University</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 6, padding: '2px 8px', color: '#fff', fontSize: 7.5, fontWeight: 700, letterSpacing: 1 }}>
          BUS PASS
        </div>
      </div>

      
      <div style={{ display: 'flex', padding: '10px 14px 0', gap: 12, height: 'calc(100% - 56px - 36px)' }}>
        
        <div style={{ width: 58, height: 72, borderRadius: 8, flexShrink: 0, background: '#F3EBDD', border: `2px solid ${gold}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <GraduationCap size={24} color={gold} />
          <div style={{ fontSize: 6.5, color: muted, textAlign: 'center', lineHeight: 1.2 }}>صورة<br/>الطالب</div>
        </div>

        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          
          <div style={{ fontSize: 12, fontWeight: 800, color: dark, lineHeight: 1.2 }}>{userName}</div>

          
          <div style={{ display: 'flex', gap: 10 }}>
            <div>
              <div style={{ fontSize: 7, color: muted }}>رقم الطالب</div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: gold, letterSpacing: 0.4 }}>{studentNumber ?? '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: 7, color: muted }}>رقم الكارت</div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: dark }}>{cardId}</div>
            </div>
          </div>

          
          <div style={{ background: '#F3EBDD', border: `1px solid #DCCDAE`, borderRadius: 6, padding: '3px 7px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin size={9} color={gold} />
            <span style={{ fontSize: 9, fontWeight: 700, color: dark }}>{routeName}</span>
          </div>

          
          <div style={{ display: 'flex', gap: 8 }}>
            <div>
              <div style={{ fontSize: 7, color: muted }}>الذهاب</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: dark }}>{sub.route.departureTime}</div>
            </div>
            <div>
              <div style={{ fontSize: 7, color: muted }}>العودة</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: dark }}>{sub.route.returnDepTime}</div>
            </div>
            <div>
              <div style={{ fontSize: 7, color: muted }}>صالح حتى</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: gold }}>{fmtD(sub.endDate)}</div>
            </div>
          </div>

          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {stops.slice(0, 4).map((s, i) => (
              <span key={i} style={{ fontSize: 6.5, background: '#F3EBDD', border: `1px solid #DCCDAE`, borderRadius: 4, padding: '1px 5px', color: muted }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: `linear-gradient(135deg, ${gold} 0%, #B8902E 100%)`,
        height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px',
      }}>
        
        <svg viewBox="0 0 100 20" style={{ width: 90, height: 20 }}>
          {[2,5,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97].map((x, i) => (
            <rect key={i} x={x} y={1} width={i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1} height={18} fill="rgba(255,255,255,0.85)" />
          ))}
        </svg>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 7.5, fontWeight: 600, letterSpacing: 0.5, textAlign: 'end' }}>
          هذا الكارت ملك جامعة أسيوط الأهلية
        </div>
      </div>
    </div>
  );
}

const i18n = {
  ar: {
    title: 'خدمة الباص', subtitle: 'إدارة اشتراك النقل الجامعي',
    mySubscription: 'اشتراكي الحالي', route: 'الخط',
    startDate: 'تاريخ البداية', endDate: 'تاريخ الانتهاء',
    remaining: 'الأيام المتبقية', totalPaid: 'إجمالي المدفوع',
    day: 'يوم', egp: 'جنيه', statusActive: 'نشط',
    renew: 'تجديد الاشتراك', changeRoute: 'تغيير الخط', printCard: 'طباعة الكارت',
    weeklySchedule: 'الجدول الأسبوعي',
    colDay: 'اليوم', colDepart: 'موعد الذهاب', colReturn: 'موعد العودة', colStatus: 'الحالة',
    scheduled: 'مجدول',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    availableRoutes: 'الخطوط المتاحة', perDay: 'جنيه/يوم',
    goTime: 'مواعيد الذهاب', returnTime: 'مواعيد العودة',
    depart: 'الانطلاق:', arrive: 'الوصول:',
    stops: 'المحطات', occupancy: 'الإشغال',
    statusAvailable: 'متاح', statusFull: 'مكتمل',
    subscribe: 'اشترك في هذا الخط', full: 'الخط مكتمل',
    noSubscription: 'لا يوجد اشتراك نشط حالياً',
    info: 'معلومات هامة',
    i1: 'يجب الوصول لنقطة الانطلاق قبل الموعد بـ 10 دقائق',
    i2: 'الاشتراك الشهري أوفر من الاشتراك اليومي',
    i3: 'يمكن تغيير الخط مرة واحدة في الشهر',
    i4: 'في حالة عدم الحضور لمدة أسبوع يتم إلغاء الاشتراك',
    i5: 'للاستفسارات تواصل مع إدارة النقل: 088-1234567',
  },
  en: {
    title: 'Bus Service', subtitle: 'Manage your university transport subscription',
    mySubscription: 'My Subscription', route: 'Route',
    startDate: 'Start Date', endDate: 'End Date',
    remaining: 'Days Remaining', totalPaid: 'Total Paid',
    day: 'days', egp: 'EGP', statusActive: 'Active',
    renew: 'Renew Subscription', changeRoute: 'Change Route', printCard: 'Print Card',
    weeklySchedule: 'Weekly Schedule',
    colDay: 'Day', colDepart: 'Departure', colReturn: 'Return', colStatus: 'Status',
    scheduled: 'Scheduled',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableRoutes: 'Available Routes', perDay: 'EGP/day',
    goTime: 'Departure Times', returnTime: 'Return Times',
    depart: 'Depart:', arrive: 'Arrive:',
    stops: 'Stops', occupancy: 'Occupancy',
    statusAvailable: 'Available', statusFull: 'Full',
    subscribe: 'Subscribe to Route', full: 'Route Full',
    noSubscription: 'No active subscription',
    info: 'Important Information',
    i1: 'Arrive at the departure point 10 minutes early',
    i2: 'Monthly subscription is more economical than daily',
    i3: 'Route can be changed once per month',
    i4: 'Subscription is cancelled after one week of absence',
    i5: 'For inquiries contact transport office: 088-1234567',
  },
} as const;

type BusRoute = {
  id: number; nameAr: string; nameEn: string;
  departureTime: string; arrivalTime: string;
  returnDepTime: string; returnArrTime: string;
  pricePerDay: number; capacity: number;
  stopsAr: string; stopsEn: string;
  currentSubscribers: number;
};
type Subscription = {
  id: number; startDate: string; endDate: string;
  totalPaid: number; status: string; remainingDays: number;
  route: BusRoute;
};

export default function BusPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [routes, setRoutes]             = useState<BusRoute[]>([]);
  const [dataLoading, setDataLoading]   = useState(true);
  const [toast, setToast]               = useState('');
  const [loadingAction, setLoadingAction] = useState('');
  
  const [confirm, setConfirm] = useState<{ type: string; routeId?: number; routeName?: string } | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const handlePrintCard = () => {
    if (!subscription || !user) return;
    const stops = (() => { try { return JSON.parse(loc === 'ar' ? subscription.route.stopsAr : subscription.route.stopsEn) as string[]; } catch { return []; } })();
    const fmtD = (d: string) => new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const cardId = `BUS-${String(subscription.id).padStart(6, '0')}`;
    const routeName = loc === 'ar' ? subscription.route.nameAr : subscription.route.nameEn;
    const gold = '#D4A843';

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<title>كارت الباص</title>
<style>
  @page { size: 340px 215px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 340px; height: 215px; overflow: hidden; background: #fff; font-family: Cairo, Arial, sans-serif; }
  .card { width: 340px; height: 215px; border-radius: 16px; overflow: hidden; position: relative; background: #FFFDF8; border: 1px solid #DCCDAE; }
  .header { background: linear-gradient(135deg, #D4A843 0%, #B8902E 100%); padding: 9px 14px 7px; display: flex; align-items: center; justify-content: space-between; }
  .logo-circle { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.25); border: 2px solid rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center; }
  .uni-name { color: #fff; font-weight: 800; font-size: 10.5px; }
  .uni-sub  { color: rgba(255,255,255,0.8); font-size: 8px; }
  .badge    { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 6px; padding: 2px 8px; color: #fff; font-size: 7.5px; font-weight: 700; letter-spacing: 1px; }
  .body     { display: flex; padding: 10px 14px 0; gap: 12px; height: calc(100% - 56px - 36px); }
  .photo    { width: 58px; height: 72px; border-radius: 8px; flex-shrink: 0; background: #F3EBDD; border: 2px solid ${gold}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; }
  .photo-icon { font-size: 22px; }
  .photo-txt { font-size: 6.5px; color: #7C6943; text-align: center; line-height: 1.2; }
  .info     { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .name     { font-size: 12px; font-weight: 800; color: #2F2415; line-height: 1.2; }
  .row      { display: flex; gap: 10px; }
  .field    { display: flex; flex-direction: column; }
  .flabel   { font-size: 7px; color: #7C6943; }
  .fval     { font-size: 9.5px; font-weight: 700; color: #2F2415; }
  .fval-gold { font-size: 9.5px; font-weight: 700; color: ${gold}; }
  .route-badge { background: #F3EBDD; border: 1px solid #DCCDAE; border-radius: 6px; padding: 3px 7px; display: flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 700; color: #2F2415; }
  .stops    { display: flex; flex-wrap: wrap; gap: 3px; }
  .stop     { font-size: 6.5px; background: #F3EBDD; border: 1px solid #DCCDAE; border-radius: 4px; padding: 1px 5px; color: #7C6943; }
  .footer   { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, #D4A843 0%, #B8902E 100%); height: 36px; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; }
  .footer-txt { color: rgba(255,255,255,0.9); font-size: 7.5px; font-weight: 600; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div style="display:flex;align-items:center;gap:8px">
      <div class="logo-circle"><span style="font-size:14px">🚌</span></div>
      <div><div class="uni-name">جامعة أسيوط الأهلية</div><div class="uni-sub">Assiut National University</div></div>
    </div>
    <div class="badge">BUS PASS</div>
  </div>
  <div class="body">
    <div class="photo">
      <div class="photo-icon">🎓</div>
      <div class="photo-txt">صورة<br/>الطالب</div>
    </div>
    <div class="info">
      <div class="name">${user.firstName} ${user.lastName}</div>
      <div class="row">
        <div class="field"><span class="flabel">رقم الطالب</span><span class="fval-gold">${user.studentNumber ?? '—'}</span></div>
        <div class="field"><span class="flabel">رقم الكارت</span><span class="fval">${cardId}</span></div>
      </div>
      <div class="route-badge">📍 ${routeName}</div>
      <div class="row">
        <div class="field"><span class="flabel">الذهاب</span><span class="fval">${subscription.route.departureTime}</span></div>
        <div class="field"><span class="flabel">العودة</span><span class="fval">${subscription.route.returnDepTime}</span></div>
        <div class="field"><span class="flabel">صالح حتى</span><span class="fval-gold">${fmtD(subscription.endDate)}</span></div>
      </div>
      <div class="stops">${stops.slice(0, 4).map(s => `<span class="stop">${s}</span>`).join('')}</div>
    </div>
  </div>
  <div class="footer">
    <svg viewBox="0 0 100 20" style="width:90px;height:20px">${
      [2,5,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97]
        .map((x, i) => `<rect x="${x}" y="1" width="${i%4===0?2.5:i%3===0?1.5:1}" height="18" fill="rgba(255,255,255,0.85)"/>`)
        .join('')
    }</svg>
    <div class="footer-txt">هذا الكارت ملك جامعة أسيوط الأهلية</div>
  </div>
</div>
<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500);}<\/script>
</body></html>`;

    const win = window.open('', '_blank', 'width=380,height=260,toolbar=0,menubar=0,scrollbars=0');
    if (win) { win.document.write(html); win.document.close(); }
  };

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
      const res = await fetch(`/api/student/bus?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setSubscription(data.subscription);
        setRoutes(data.routes ?? []);
      }
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const doAction = useCallback(async (action: string, routeId?: number) => {
    if (!user) return;
    setLoadingAction(action + (routeId ?? ''));
    try {
      const res = await fetch('/api/student/bus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, action, routeId }),
      });
      const data = await res.json();
      if (data.success) {
        const msgs: Record<string, string> = {
          renew:     loc === 'ar' ? 'تم تجديد الاشتراك بنجاح' : 'Subscription renewed',
          cancel:    loc === 'ar' ? 'تم إلغاء الاشتراك' : 'Subscription cancelled',
          subscribe: loc === 'ar' ? 'تم الاشتراك في الخط بنجاح' : 'Subscribed to route',
        };
        showToast(msgs[action] ?? 'تمت العملية');
        await fetchData();
      } else {
        const errs: Record<string, string> = {
          already_subscribed: loc === 'ar' ? 'أنت مشترك بالفعل في خط آخر، يجب إلغاء الاشتراك أولاً' : 'Already subscribed to another route. Cancel first.',
          route_full:         loc === 'ar' ? 'الخط مكتمل' : 'Route is full',
        };
        showToast(errs[data.error] ?? (loc === 'ar' ? 'حدث خطأ' : 'An error occurred'));
      }
    } finally {
      setLoadingAction('');
      setConfirm(null);
    }
  }, [user, loc, fetchData]);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const parseStops = (json: string): string[] => { try { return JSON.parse(json); } catch { return []; } };

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl font-bold text-sm"
            style={{ background: p, color: dark ? '#1A1612' : '#fff' }}>
            <CheckCircle2 className="w-5 h-5" />{toast}
          </div>
        )}

        
        {confirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setConfirm(null)}>
            <div onClick={e => e.stopPropagation()}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', width: '100%', maxWidth: 400 }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${p}18`, border: `1px solid ${p}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: p }} />
                  </div>
                  <p className="font-extrabold text-base" style={{ color: th.text }}>
                    {confirm.type === 'renew'     && (loc === 'ar' ? 'تجديد الاشتراك' : 'Renew Subscription')}
                    {confirm.type === 'cancel'    && (loc === 'ar' ? 'إلغاء الاشتراك' : 'Cancel Subscription')}
                    {confirm.type === 'subscribe' && (loc === 'ar' ? 'اشتراك جديد' : 'New Subscription')}
                    {confirm.type === 'change'    && (loc === 'ar' ? 'تغيير الخط' : 'Change Route')}
                  </p>
                </div>
                <button onClick={() => setConfirm(null)} style={{ color: th.textMuted }}><X className="w-5 h-5" /></button>
              </div>

              <p className="text-sm mb-5" style={{ color: th.text }}>
                {confirm.type === 'renew'  && (loc === 'ar' ? 'هل تريد تجديد اشتراكك لمدة شهر إضافي؟' : 'Renew your subscription for one more month?')}
                {confirm.type === 'cancel' && (loc === 'ar' ? 'هل أنت متأكد من إلغاء الاشتراك؟ لا يمكن التراجع.' : 'Are you sure you want to cancel? This cannot be undone.')}
                {confirm.type === 'subscribe' && (loc === 'ar' ? `هل تريد الاشتراك في خط "${confirm.routeName}"؟` : `Subscribe to route "${confirm.routeName}"?`)}
                {confirm.type === 'change' && (loc === 'ar'
                  ? `سيتم إلغاء اشتراكك الحالي والاشتراك في خط "${confirm.routeName}". هل تريد المتابعة؟`
                  : `Your current subscription will be cancelled and you'll be subscribed to "${confirm.routeName}". Continue?`)}
              </p>

              <div className="flex gap-3">
                <button onClick={() => setConfirm(null)}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: `1px solid ${bdrL}`, background: 'transparent', color: th.textMuted, fontWeight: 700, cursor: 'pointer' }}>
                  {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  disabled={!!loadingAction}
                  onClick={async () => {
                    if (confirm.type === 'renew')     await doAction('renew');
                    if (confirm.type === 'cancel')    await doAction('cancel');
                    if (confirm.type === 'subscribe') await doAction('subscribe', confirm.routeId);
                    if (confirm.type === 'change') {
                      await doAction('cancel');
                      await doAction('subscribe', confirm.routeId);
                    }
                  }}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: 'none', background: confirm.type === 'cancel' ? '#ef4444' : p, color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loadingAction ? 0.7 : 1 }}>
                  {loadingAction ? '...' : (loc === 'ar' ? 'تأكيد' : 'Confirm')}
                </button>
              </div>
            </div>
          </div>
        )}

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bus className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>
                    {user.firstName} {user.lastName} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {dataLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: `${p} transparent transparent transparent` }} />
          </div>
        ) : (
          <>
            
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16 }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 className="w-5 h-5" style={{ color: p }} />
                    </div>
                    <CardTitle style={{ color: th.text }}>{t.mySubscription}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {!subscription ? (
                    <p className="text-sm py-4 text-center" style={{ color: th.textMuted }}>{t.noSubscription}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${p}18`, border: `1px solid ${p}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Bus className="w-7 h-7" style={{ color: p }} />
                          </div>
                          <div>
                            <p className="font-extrabold" style={{ color: th.text }}>
                              {loc === 'ar' ? subscription.route.nameAr : subscription.route.nameEn}
                            </p>
                            <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33`, marginTop: 4 }}>
                              {t.statusActive}
                            </Badge>
                          </div>
                        </div>
                        <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }} className="space-y-2">
                          {[
                            { label: t.startDate, value: fmtDate(subscription.startDate) },
                            { label: t.endDate,   value: fmtDate(subscription.endDate) },
                            { label: t.remaining, value: `${subscription.remainingDays} ${t.day}`, highlight: true },
                            { label: t.totalPaid, value: `${subscription.totalPaid} ${t.egp}` },
                          ].map(({ label, value, highlight }) => (
                            <div key={label} className="flex items-center justify-between">
                              <span className="text-sm" style={{ color: th.textMuted }}>{label}</span>
                              <span className="font-extrabold text-sm" style={{ color: highlight ? p : th.text }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { icon: RefreshCw,      label: t.renew,       action: () => setConfirm({ type: 'renew' }),  key: 'renew'  },
                          { icon: ArrowLeftRight, label: t.changeRoute, action: () => {
                              
                              document.getElementById('available-routes')?.scrollIntoView({ behavior: 'smooth' });
                              showToast(loc === 'ar' ? 'اختر الخط الجديد من القائمة أدناه' : 'Select a new route from the list below');
                            }, key: 'change' },
                          { icon: Printer,        label: t.printCard,   action: () => handlePrintCard(),              key: 'print'  },
                        ].map(({ icon: Icon, label, action, key }) => (
                          <Button key={label} className="w-full gap-2"
                            onClick={action}
                            disabled={loadingAction === key}
                            style={{ background: p, color: heroText }}>
                            <Icon className={`w-4 h-4 ${loadingAction === key ? 'animate-spin' : ''}`} /> {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            
            {subscription && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                  <CardHeader style={{ background: iconBg, borderBottom: `1px solid ${bdrL}` }} className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Clock className="w-5 h-5" style={{ color: p }} />
                      </div>
                      <CardTitle style={{ color: th.text }}>{t.weeklySchedule}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr style={{ background: heroBg }}>
                            {[t.colDay, t.colDepart, t.colReturn, t.colStatus].map(h => (
                              <th key={h} className="px-4 py-3 text-center text-sm font-extrabold"
                                style={{ color: heroText, borderRight: `1px solid rgba(0,0,0,0.1)` }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {t.days.map((day, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? iconBg : card, borderBottom: `1px solid ${bdrL}` }}>
                              <td className="px-4 py-3 text-center font-extrabold text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>{day}</td>
                              <td className="px-4 py-3 text-center text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>{subscription.route.departureTime}</td>
                              <td className="px-4 py-3 text-center text-sm" style={{ color: th.text, borderRight: `1px solid ${bdrL}` }}>{subscription.route.returnDepTime}</td>
                              <td className="px-4 py-3 text-center">
                                <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33` }}>{t.scheduled}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            
            <motion.div id="available-routes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                <CardHeader style={{ background: iconBg, borderBottom: `1px solid ${bdrL}` }} className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin className="w-5 h-5" style={{ color: p }} />
                    </div>
                    <CardTitle style={{ color: th.text }}>{t.availableRoutes}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {routes.map((r, i) => {
                    const pct       = Math.min(100, Math.round((r.currentSubscribers / r.capacity) * 100));
                    const isFull    = pct >= 100;
                    const isMyRoute = subscription?.route.id === r.id;
                    const stops     = parseStops(loc === 'ar' ? r.stopsAr : r.stopsEn);
                    return (
                      <div key={r.id}>
                        <div style={{ border: `1px solid ${isMyRoute ? p : bdrL}`, borderRadius: 12, padding: '1.25rem' }}>
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <p className="font-extrabold" style={{ color: th.text }}>{loc === 'ar' ? r.nameAr : r.nameEn}</p>
                              <p className="text-sm font-extrabold mt-0.5" style={{ color: p }}>{r.pricePerDay} {t.perDay}</p>
                            </div>
                            <Badge style={{ background: `${p}18`, color: isFull ? th.textMuted : p, border: `1px solid ${p}33`, flexShrink: 0 }}>
                              {isFull ? t.statusFull : t.statusAvailable}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {[
                              { label: t.goTime,     dep: r.departureTime, arr: r.arrivalTime },
                              { label: t.returnTime, dep: r.returnDepTime, arr: r.returnArrTime },
                            ].map(({ label, dep, arr }) => (
                              <div key={label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.75rem' }}>
                                <p className="text-xs font-extrabold mb-1" style={{ color: p }}>{label}</p>
                                <p className="text-sm" style={{ color: th.textMuted }}>{t.depart} {dep}</p>
                                <p className="text-sm" style={{ color: th.textMuted }}>{t.arrive} {arr}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mb-4">
                            <p className="text-xs font-extrabold mb-2" style={{ color: th.textMuted }}>
                              <MapPin className="w-3 h-3 inline me-1" style={{ color: p }} />{t.stops}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {stops.map(s => (
                                <span key={s} className="px-2 py-1 rounded-full text-xs"
                                  style={{ background: iconBg, color: th.textMuted, border: `1px solid ${bdrL}` }}>{s}</span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs flex items-center gap-1" style={{ color: th.textMuted }}>
                                <Users className="w-3 h-3" style={{ color: p }} />{t.occupancy}
                              </span>
                              <span className="text-xs font-extrabold" style={{ color: th.text }}>{r.currentSubscribers}/{r.capacity}</span>
                            </div>
                            <div style={{ background: bdrL, borderRadius: 99, height: 6 }}>
                              <div style={{ width: `${pct}%`, height: 6, borderRadius: 99, background: p, transition: 'width 0.4s' }} />
                            </div>
                          </div>

                          <Button disabled={isFull || isMyRoute} className="w-full"
                            onClick={() => {
                              if (isFull || isMyRoute) return;
                              const routeName = loc === 'ar' ? r.nameAr : r.nameEn;
                              if (subscription && !isMyRoute) {
                                
                                setConfirm({ type: 'change', routeId: r.id, routeName });
                              } else {
                                setConfirm({ type: 'subscribe', routeId: r.id, routeName });
                              }
                            }}
                            style={{ background: (isFull || isMyRoute) ? iconBg : p, color: (isFull || isMyRoute) ? th.textMuted : heroText, border: `1px solid ${(isFull || isMyRoute) ? bdrL : p}`, cursor: (isFull || isMyRoute) ? 'not-allowed' : 'pointer' }}>
                            {isMyRoute ? t.statusActive : isFull ? t.full : t.subscribe}
                          </Button>
                        </div>
                        {i < routes.length - 1 && <Separator className="mt-4" style={{ background: bdrL }} />}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

      </div>

      
      {subscription && (
        <div id="bus-card-print-area" style={{ display: 'none' }}>
          <div style={{ fontFamily: 'Cairo, Arial, sans-serif', textAlign: 'center', marginBottom: 8, fontSize: 13, color: '#7C6943' }}>
            كارت النقل الجامعي — جامعة أسيوط الأهلية
          </div>
          <BusTransportCard
            sub={subscription}
            userName={`${user.firstName} ${user.lastName}`}
            studentNumber={user.studentNumber}
            loc={loc}
          />
          <div style={{ marginTop: 10, fontSize: 10, color: '#7C6943', textAlign: 'center' }}>
            يجب إبراز هذا الكارت عند ركوب الباص • للاستفسار: 088-1234567
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
