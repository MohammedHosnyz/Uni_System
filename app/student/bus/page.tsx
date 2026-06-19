'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bus, CheckCircle2, RefreshCw, Printer, MapPin, Clock,
  Users, ArrowLeftRight, AlertTriangle, X, GraduationCap,
} from 'lucide-react';

function BusTransportCard({ sub, userName, studentNumber, loc }: {
  sub: { id: number; startDate: string; endDate: string; totalPaid: number; remainingDays: number; route: { nameAr: string; nameEn: string; departureTime: string; returnDepTime: string; stopsAr: string; stopsEn: string } };
  userName: string;
  studentNumber?: string;
  loc: 'ar' | 'en';
}) {
  const fmtD   = (d: string) => new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const stops  = (() => { try { return JSON.parse(loc === 'ar' ? sub.route.stopsAr : sub.route.stopsEn) as string[]; } catch { return []; } })();
  const routeName = loc === 'ar' ? sub.route.nameAr : sub.route.nameEn;
  const cardId = `BUS-${String(sub.id).padStart(6, '0')}`;

  return (
    <div className="w-[340px] h-[215px] rounded-2xl overflow-hidden relative bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 flex flex-col justify-between shadow-md shrink-0">
      
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2.5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0">
            <Bus className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="font-bold text-[10px]">جامعة أسيوط الأهلية</p>
            <p className="text-[7.5px] text-white/85">Assiut National University</p>
          </div>
        </div>
        <div className="bg-white/20 border border-white/40 rounded px-2 py-0.5 text-[7px] font-bold tracking-wider shrink-0">
          BUS PASS
        </div>
      </div>

      <div className="flex px-4 py-2.5 gap-3 flex-1 items-center">
        <div className="w-14 h-18 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center gap-1 shrink-0 text-[#D97706]">
          <GraduationCap className="w-7 h-7" />
          <span className="text-[6.5px] text-stone-400 dark:text-stone-500 font-bold text-center leading-tight">PHOTO</span>
        </div>

        <div className="flex-1 space-y-1 min-w-0 text-start">
          <p className="text-[11.5px] font-bold text-stone-800 dark:text-stone-150 leading-tight truncate">{userName}</p>

          <div className="flex gap-4 text-[7px] font-bold text-stone-400">
            <div>
              <span>رقم الطالب</span>
              <span className="block text-[9.5px] text-[#D97706] mt-0.5">{studentNumber ?? '—'}</span>
            </div>
            <div>
              <span>رقم الكارت</span>
              <span className="block text-[9.5px] text-stone-800 dark:text-stone-200 mt-0.5">{cardId}</span>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded-lg px-2 py-1 flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3 text-[#D97706] shrink-0" />
            <span className="text-[8.5px] font-bold text-stone-800 dark:text-stone-200 truncate">{routeName}</span>
          </div>

          <div className="flex gap-4 text-[7px] text-stone-400 font-bold">
            <div>
              <span>الذهاب</span>
              <span className="block text-[8.5px] text-stone-800 dark:text-stone-200">{sub.route.departureTime}</span>
            </div>
            <div>
              <span>العودة</span>
              <span className="block text-[8.5px] text-stone-800 dark:text-stone-200">{sub.route.returnDepTime}</span>
            </div>
            <div>
              <span>صالح حتى</span>
              <span className="block text-[8.5px] text-[#D97706]">{fmtD(sub.endDate)}</span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap pt-0.5">
            {stops.slice(0, 3).map((s, i) => (
              <span key={i} className="text-[6px] font-bold bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded px-1 text-stone-500 dark:text-stone-400">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 h-9 flex items-center justify-between text-white shrink-0">
        <svg viewBox="0 0 100 20" className="w-[90px] h-5 opacity-90">
          {[2,5,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97].map((x, i) => (
            <rect key={i} x={x} y={1} width={i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1} height={18} className="fill-white" />
          ))}
        </svg>
        <span className="text-[7.5px] font-bold tracking-wide">هذا الكارت وثيقة رسمية ملك جامعة أسيوط الأهلية</span>
      </div>
    </div>
  );
}

const i18n = {
  ar: {
    title: 'اشتراكات وخدمات الباص',
    subtitle: 'إدارة اشتراكات النقل الجامعي، تتبع الخطوط، وطباعة بطاقات المرور',
    mySubscription: 'معلومات اشتراكي الحالي',
    route: 'الخط التابع له',
    startDate: 'تاريخ تفعيل الاشتراك',
    endDate: 'تاريخ انتهاء الاشتراك',
    remaining: 'الأيام المتبقية للاشتراك',
    totalPaid: 'إجمالي الرسوم المدفوعة',
    day: 'يوم',
    egp: 'جنيه',
    statusActive: 'نشط وصالح للاستخدام',
    renew: 'تجديد الاشتراك الحالي',
    changeRoute: 'طلب تغيير خط الباص',
    printCard: 'إصدار كارت الباص الرقمي',
    weeklySchedule: 'جدول رحلات الباص الأسبوعي',
    colDay: 'اليوم',
    colDepart: 'موعد الذهاب للجامعة',
    colReturn: 'موعد العودة من الجامعة',
    colStatus: 'حالة الرحلة',
    scheduled: 'مجدولة',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    availableRoutes: 'خطوط الباص الجامعي المتاحة',
    perDay: 'جنيه / يومياً',
    goTime: 'رحلة الذهاب (صباحاً)',
    returnTime: 'رحلة العودة (مساءً)',
    depart: 'موعد التحرك:',
    arrive: 'موعد الوصول المتوقع:',
    stops: 'المحطات ونقاط التوقف للخط',
    occupancy: 'نسبة إشغال الباص',
    statusAvailable: 'متاح للاشتراك',
    statusFull: 'مكتمل بالكامل',
    subscribe: 'حجز واشتراك في الخط',
    full: 'خط الباص مكتمل',
    noSubscription: 'لا يوجد اشتراك نشط مسجل باسمك حالياً في خطوط النقل',
  },
  en: {
    title: 'Bus Services & Passes',
    subtitle: 'Manage dorm transport passes, route selections, and departures',
    mySubscription: 'Current Subscription Details',
    route: 'Assigned Route',
    startDate: 'Subscription Activation Date',
    endDate: 'Subscription Expiry Date',
    remaining: 'Remaining Validity Period',
    totalPaid: 'Total Paid Amount',
    day: 'days',
    egp: 'EGP',
    statusActive: 'Active Bus Pass',
    renew: 'Renew Subscription Period',
    changeRoute: 'Request Route Change',
    printCard: 'Issue Digital Bus Pass',
    weeklySchedule: 'Weekly Transit Schedule',
    colDay: 'Day',
    colDepart: 'To University (AM)',
    colReturn: 'From University (PM)',
    colStatus: 'Transit Status',
    scheduled: 'Scheduled',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableRoutes: 'Available Bus Routes',
    perDay: 'EGP / day',
    goTime: 'Morning Shift (To Campus)',
    returnTime: 'Evening Shift (From Campus)',
    depart: 'Departure Time:',
    arrive: 'Expected Arrival:',
    stops: 'Scheduled Route Stops',
    occupancy: 'Bus Seat Capacity',
    statusAvailable: 'Seats Available',
    statusFull: 'Fully Booked',
    subscribe: 'Subscribe to Route',
    full: 'Fully Occupied',
    noSubscription: 'No active bus subscriptions found on your account',
  },
} as const;

type BusRoute = {
  id: number;
  nameAr: string;
  nameEn: string;
  departureTime: string;
  arrivalTime: string;
  returnDepTime: string;
  returnArrTime: string;
  pricePerDay: number;
  capacity: number;
  stopsAr: string;
  stopsEn: string;
  currentSubscribers: number;
};

type Subscription = {
  id: number;
  startDate: string;
  endDate: string;
  totalPaid: number;
  status: string;
  remainingDays: number;
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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const handlePrintCard = () => {
    if (!subscription || !user) return;
    const stops = (() => { try { return JSON.parse(loc === 'ar' ? subscription.route.stopsAr : subscription.route.stopsEn) as string[]; } catch { return []; } })();
    const fmtD = (d: string) => new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const cardId = `BUS-${String(subscription.id).padStart(6, '0')}`;
    const routeName = loc === 'ar' ? subscription.route.nameAr : subscription.route.nameEn;

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
  .photo    { width: 58px; height: 72px; border-radius: 8px; flex-shrink: 0; background: #F3EBDD; border: 2px solid #D4A843; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; }
  .photo-icon { font-size: 22px; }
  .photo-txt { font-size: 6.5px; color: #7C6943; text-align: center; line-height: 1.2; }
  .info     { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .name     { font-size: 12px; font-weight: 800; color: #2F2415; line-height: 1.2; }
  .row      { display: flex; gap: 10px; }
  .field    { display: flex; flex-direction: column; }
  .flabel   { font-size: 7px; color: #7C6943; }
  .fval     { font-size: 9.5px; font-weight: 700; color: #2F2415; }
  .fval-gold { font-size: 9.5px; font-weight: 700; color: #D4A843; }
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
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const parseStops = (json: string): string[] => {
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  };

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-bold text-xs bg-[#FABA19] text-white">
            <CheckCircle2 className="w-4.5 h-4.5" />
            {toast}
          </div>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {confirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setConfirm(null)}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm text-stone-850 dark:text-stone-150">
                      {confirm.type === 'renew'     && (loc === 'ar' ? 'تجديد الاشتراك' : 'Renew Bus Subscription')}
                      {confirm.type === 'cancel'    && (loc === 'ar' ? 'إلغاء الاشتراك' : 'Cancel Bus Pass')}
                      {confirm.type === 'subscribe' && (loc === 'ar' ? 'اشتراك جديد' : 'New Bus Pass')}
                      {confirm.type === 'change'    && (loc === 'ar' ? 'تغيير الخط' : 'Change Bus Route')}
                    </p>
                  </div>
                  <button onClick={() => setConfirm(null)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-250">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-stone-650 dark:text-stone-400 font-medium leading-relaxed">
                  {confirm.type === 'renew'  && (loc === 'ar' ? 'هل تريد تجديد اشتراكك لمدة شهر إضافي؟' : 'Renew your subscription for one more month?')}
                  {confirm.type === 'cancel' && (loc === 'ar' ? 'هل أنت متأكد من إلغاء الاشتراك؟ لا يمكن التراجع.' : 'Are you sure you want to cancel? This cannot be undone.')}
                  {confirm.type === 'subscribe' && (loc === 'ar' ? `هل تريد الاشتراك في خط "${confirm.routeName}"؟` : `Subscribe to route "${confirm.routeName}"?`)}
                  {confirm.type === 'change' && (loc === 'ar'
                    ? `سيتم إلغاء اشتراكك الحالي والاشتراك في خط "${confirm.routeName}". هل تريد المتابعة؟`
                    : `Your current subscription will be cancelled and you'll be subscribed to "${confirm.routeName}". Continue?`)}
                </p>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={async () => {
                      if (confirm.type === 'renew')     await doAction('renew');
                      if (confirm.type === 'cancel')    await doAction('cancel');
                      if (confirm.type === 'subscribe') await doAction('subscribe', confirm.routeId);
                      if (confirm.type === 'change') {
                        await doAction('cancel');
                        await doAction('subscribe', confirm.routeId);
                      }
                    }}
                    disabled={!!loadingAction}
                    className={`flex-1 font-bold text-xs py-2 rounded-xl border-0 shadow-sm disabled:opacity-50 text-white ${
                      confirm.type === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FABA19] hover:bg-[#e5a816]'
                    }`}
                  >
                    {loadingAction ? '...' : (loc === 'ar' ? 'تأكيد' : 'Confirm')}
                  </Button>
                  <Button
                    onClick={() => setConfirm(null)}
                    className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs py-2 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm"
                  >
                    {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    {user.firstName} {user.lastName} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-16 bg-white dark:bg-stone-900 rounded-2xl">
            <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">

            {/* My Current Subscription Profile */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.mySubscription}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  {!subscription ? (
                    <div className="py-8 text-center">
                      <Bus className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
                      <p className="text-xs text-stone-450 font-bold">{t.noSubscription}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                            <Bus className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-850 dark:text-stone-100">
                              {loc === 'ar' ? subscription.route.nameAr : subscription.route.nameEn}
                            </p>
                            <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold shadow-none mt-1">
                              {t.statusActive}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-2.5">
                          {[
                            { label: t.startDate, value: fmtDate(subscription.startDate) },
                            { label: t.endDate,   value: fmtDate(subscription.endDate) },
                            { label: t.remaining, value: `${subscription.remainingDays} ${t.day}`, highlight: true },
                            { label: t.totalPaid, value: `${subscription.totalPaid} ${t.egp}` },
                          ].map(({ label, value, highlight }, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
                              <span>{label}</span>
                              <span className={`font-bold ${highlight ? 'text-[#D97706]' : 'text-stone-850 dark:text-stone-100'}`}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { icon: RefreshCw,      label: t.renew,       action: () => setConfirm({ type: 'renew' }),  key: 'renew'  },
                          { icon: ArrowLeftRight, label: t.changeRoute, action: () => {
                              document.getElementById('available-routes')?.scrollIntoView({ behavior: 'smooth' });
                              showToast(loc === 'ar' ? 'اختر خط السير الجديد من القائمة أدناه' : 'Select a new route below');
                            }, key: 'change' },
                          { icon: Printer,        label: t.printCard,   action: () => handlePrintCard(),              key: 'print'  },
                        ].map(({ icon: Icon, label, action, key }, idx) => (
                          <Button
                            key={idx}
                            onClick={action}
                            disabled={loadingAction === key}
                            className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm flex items-center justify-center gap-1.5"
                          >
                            <Icon className={`w-4 h-4 ${loadingAction === key ? 'animate-spin' : ''}`} />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Travel Timings Grid */}
            {subscription && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.weeklySchedule}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/10 font-bold text-stone-400 dark:text-stone-500 text-start">
                            <th className="px-5 py-3.5 font-bold text-center">{t.colDay}</th>
                            <th className="px-4 py-3.5 font-bold text-center">{t.colDepart}</th>
                            <th className="px-4 py-3.5 font-bold text-center">{t.colReturn}</th>
                            <th className="px-4 py-3.5 font-bold text-center">{t.colStatus}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-center font-semibold text-stone-650 dark:text-stone-400">
                          {t.days.map((day, idx) => (
                            <tr key={idx} className="hover:bg-stone-50/30 dark:hover:bg-stone-850/10 transition-colors">
                              <td className="px-4 py-3 font-bold text-stone-850 dark:text-stone-250">{day}</td>
                              <td className="px-4 py-3">{subscription.route.departureTime}</td>
                              <td className="px-4 py-3">{subscription.route.returnDepTime}</td>
                              <td className="px-4 py-3">
                                <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2 py-0.5">
                                  {t.scheduled}
                                </Badge>
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

            {/* Available Routes Directory */}
            <motion.div id="available-routes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.availableRoutes}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-6">
                  {routes.map((r, idx) => {
                    const pct       = Math.min(100, Math.round((r.currentSubscribers / r.capacity) * 100));
                    const isFull    = pct >= 100;
                    const isMyRoute = subscription?.route.id === r.id;
                    const stops     = parseStops(loc === 'ar' ? r.stopsAr : r.stopsEn);
                    return (
                      <div key={r.id} className="space-y-4">
                        <div className={`p-5 rounded-2xl border transition-all ${
                          isMyRoute
                            ? 'border-[#FABA19] bg-amber-500/5'
                            : 'border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-200/50'
                        }`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-stone-850 dark:text-stone-100">{loc === 'ar' ? r.nameAr : r.nameEn}</p>
                              <p className="text-xs font-bold text-[#D97706] mt-0.5">{r.pricePerDay} {t.perDay}</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                              !isFull
                                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40'
                                : 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100/40'
                            }`}>
                              {isFull ? t.statusFull : t.statusAvailable}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {[
                              { label: t.goTime,     dep: r.departureTime, arr: r.arrivalTime },
                              { label: t.returnTime, dep: r.returnDepTime, arr: r.returnArrTime },
                            ].map(({ label, dep, arr }, i) => (
                              <div key={i} className="bg-stone-50/20 dark:bg-stone-850/5 border border-stone-100 dark:border-stone-800 rounded-xl p-3">
                                <p className="text-[10px] font-bold text-[#D97706] mb-1.5">{label}</p>
                                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">{t.depart} <span className="font-bold text-stone-800 dark:text-stone-200">{dep}</span></p>
                                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">{t.arrive} <span className="font-bold text-stone-800 dark:text-stone-200">{arr}</span></p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-50 dark:border-stone-850/60">
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-2">{t.stops}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {stops.map((s, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Seat Fill Ratio */}
                          <div className="mt-4 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-bold text-stone-450 dark:text-stone-500">
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#D97706]" />
                                {t.occupancy}
                              </span>
                              <span>{r.currentSubscribers} / {r.capacity}</span>
                            </div>
                            <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                              <div className="h-1 rounded-full bg-[#FABA19]" style={{ width: `${pct}%` }} />
                            </div>
                          </div>

                          <div className="mt-5">
                            <Button
                              disabled={isFull || isMyRoute}
                              onClick={() => {
                                if (isFull || isMyRoute) return;
                                const routeName = loc === 'ar' ? r.nameAr : r.nameEn;
                                if (subscription && !isMyRoute) {
                                  setConfirm({ type: 'change', routeId: r.id, routeName });
                                } else {
                                  setConfirm({ type: 'subscribe', routeId: r.id, routeName });
                                }
                              }}
                              className={`w-full font-bold text-xs py-2 rounded-xl transition-all shadow-sm ${
                                isMyRoute
                                  ? 'bg-amber-500/10 text-[#D97706] hover:bg-amber-500/15 border border-[#FABA19]/20'
                                  : 'bg-[#FABA19] hover:bg-[#e5a816] text-white border-0 disabled:opacity-50'
                              }`}
                            >
                              {isMyRoute ? t.statusActive : isFull ? t.full : t.subscribe}
                            </Button>
                          </div>
                        </div>
                        {idx < routes.length - 1 && <Separator className="bg-stone-100 dark:bg-stone-800" />}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        )}

      </div>

      {/* Hidden print area for physical ticket generation */}
      {subscription && (
        <div id="bus-card-print-area" className="hidden">
          <div className="font-bold text-center mb-2 text-stone-500">
            كارت النقل الجامعي — جامعة أسيوط الأهلية
          </div>
          <BusTransportCard
            sub={subscription}
            userName={`${user.firstName} ${user.lastName}`}
            studentNumber={user.studentNumber}
            loc={loc}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
