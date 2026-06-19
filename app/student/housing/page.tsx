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
  Home, Wallet, Users, Wrench, Plus, X, RefreshCw,
  ArrowLeftRight, AlertTriangle, CheckCircle2,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'السكن الجامعي والإقامة',
    subtitle: 'إدارة طلبات الإقامة والمرافق وزملاء السكن والصيانة',
    occupancyRate: 'نسبة الإشغال العام',
    availableBuildings: 'مباني سكنية متاحة',
    totalCapacity: 'إجمالي السعة الاستيعابية',
    building: 'المبنى السكني',
    room: 'الغرفة',
    floor: 'الطابق',
    checkIn: 'تاريخ بدء الإقامة',
    checkOut: 'تاريخ انتهاء الإقامة',
    egp: 'جنيه',
    currentHousing: 'معلومات السكن الحالي',
    resident: 'مقيم حالي بالسكن',
    notResident: 'غير مقيد بالسكن الجامعي',
    details: 'تفاصيل عقد الإقامة',
    roommates: 'زملاء السكن في نفس الغرفة',
    noRoommates: 'لا يوجد زملاء مسجلين معك في الغرفة حالياً',
    renew: 'تجديد السكن للفصل القادم',
    changeRoom: 'طلب تغيير مبنى/غرفة',
    payFees: 'سداد مصروفات السكن',
    feesTitle: 'الرسوم والمصروفات السكنية',
    semFees: 'مصروفات الفصل الدراسي',
    paid: 'المبلغ المدفوع',
    remainingFees: 'المبلغ المتبقي',
    payRate: 'نسبة سداد الرسوم السكنية',
    viewBill: 'عرض الفاتورة وتفاصيل الدفع',
    availableBuildingsTitle: 'مباني السكن الجامعي المتاحة',
    perSem: 'جنيه / للفصل الدراسي',
    occupancy: 'نسبة الإشغال',
    facilities: 'مرافق وخدمات المبنى',
    statusAvailable: 'متاح للحجز',
    statusFull: 'مكتمل بالكامل',
    requestHousing: 'حجز السكن بالمبنى',
    notAvailable: 'غير متوفر',
    maintenanceTitle: 'سجل بلاغات الصيانة للغرفة',
    newMaintenance: 'تقديم بلاغ صيانة جديد',
    statusDone: 'تم الإصلاح بنجاح',
    statusPending: 'تحت المعالجة والإصلاح',
    noMaintenance: 'لا توجد بلاغات صيانة مسجلة للغرفة',
    rules: 'قواعد السكن واللوائح العامة',
    r1: 'الالتزام بمواعيد الدخول والخروج المحددة',
    r2: 'المحافظة على نظافة الغرف والمرافق العامة',
    r3: 'عدم إحضار زوار بدون إذن مسبق',
    r4: 'احترام زملاء السكن وعدم إزعاجهم',
    r5: 'الإبلاغ عن أي أعطال فور حدوثها',
    r6: 'عدم التدخين داخل المباني',
    modalTitle: 'تقديم بلاغ صيانة جديد',
    typeLabel: 'نوع العطل أو العيب',
    descLabel: 'تفاصيل المشكلة للغرفة',
    typePlaceholder: 'مثال: كهرباء، سباكة، تكييف...',
    descPlaceholder: 'يرجى كتابة وصف المشكلة بشكل مفصل ليتمكن الفني من إصلاحها...',
    submit: 'إرسال البلاغ فوراً',
    cancel: 'إلغاء',
    submitting: 'جاري الإرسال...',
    renewConfirm: 'تم إرسال طلب تجديد السكن بنجاح',
    changeConfirm: 'تم إرسال طلب تغيير الغرفة بنجاح',
    payConfirm: 'تم توجيهك لبوابة الدفع',
    noAssignment: 'لا يوجد سكن مخصص لك في النظام حالياً',
  },
  en: {
    title: 'University Housing & Residence',
    subtitle: 'Manage your housing contracts, roommates, bills, and repairs',
    occupancyRate: 'Total Occupancy Rate',
    availableBuildings: 'Available Buildings',
    totalCapacity: 'Total Capacity',
    building: 'Residence Building',
    room: 'Room Number',
    floor: 'Floor Level',
    checkIn: 'Check-in Date',
    checkOut: 'Check-out Date',
    egp: 'EGP',
    currentHousing: 'Active Housing Profile',
    resident: 'Active Resident',
    notResident: 'Not Resident',
    details: 'Residence Contract details',
    roommates: 'Roommates in Same Room',
    noRoommates: 'No roommates assigned to your room yet',
    renew: 'Renew for Next Semester',
    changeRoom: 'Request Room / Building Change',
    payFees: 'Pay Housing Fees',
    feesTitle: 'Residence Financial Status',
    semFees: 'Semester Housing Fees',
    paid: 'Total Paid Amount',
    remainingFees: 'Total Remaining Balance',
    payRate: 'Fees Payment progress',
    viewBill: 'View Detailed Invoice',
    availableBuildingsTitle: 'Available Dorm Buildings',
    perSem: 'EGP / Semester',
    occupancy: 'Occupancy Rate',
    facilities: 'Dorm Amenities',
    statusAvailable: 'Available',
    statusFull: 'Fully Occupied',
    requestHousing: 'Book Dorm Room',
    notAvailable: 'Unavailable',
    maintenanceTitle: 'Maintenance Orders History',
    newMaintenance: 'Report Maintenance Issue',
    statusDone: 'Repaired & Closed',
    statusPending: 'In Progress / Assigned',
    noMaintenance: 'No active maintenance orders found for your room',
    rules: 'General Housing Guidelines',
    r1: 'Comply with designated entry and exit times',
    r2: 'Maintain cleanliness of rooms and common areas',
    r3: 'No visitors without prior permission',
    r4: 'Respect roommates and avoid disturbances',
    r5: 'Report any faults immediately',
    r6: 'No smoking inside buildings',
    modalTitle: 'Report Maintenance Issue',
    typeLabel: 'Problem Category',
    descLabel: 'Issue Description',
    typePlaceholder: 'e.g. AC Repair, Plumbing issue, Power loss...',
    descPlaceholder: 'Describe what requires fixing in detail for the technical crew...',
    submit: 'Submit Report',
    cancel: 'Cancel',
    submitting: 'Sending...',
    renewConfirm: 'Housing renewal request sent successfully',
    changeConfirm: 'Room change request sent successfully',
    payConfirm: 'Redirecting to payment portal',
    noAssignment: 'You currently have no active dorm assignments',
  },
} as const;

interface HousingData {
  assignment: {
    building: { nameAr: string; nameEn: string; type: string };
    room: string;
    floor: number;
    checkIn: string;
    checkOut: string;
    semFees: number;
    paidAmount: number;
    remainingFees: number;
    status: string;
  } | null;
  roommates: string[];
  buildings: {
    id: number;
    nameAr: string;
    nameEn: string;
    type: string;
    capacity: number;
    occupied: number;
    pricePerSem: number;
    isActive: boolean;
    facilities: string[];
  }[];
  maintenance: {
    id: number;
    typeAr: string;
    typeEn: string;
    descAr: string;
    descEn: string;
    status: string;
    createdAt: string;
  }[];
}

export default function HousingPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [data, setData] = useState<HousingData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [typeAr, setTypeAr] = useState('');
  const [descAr, setDescAr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [loadingAction, setLoadingAction] = useState('');
  
  const [confirm, setConfirm] = useState<{ type: string; buildingId?: number; buildingName?: string } | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchData = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/student/housing?userId=${user.id}`);
      const json = await res.json();
      setData(json);
    } finally {
      setFetching(false);
    }
  }, [user]);

  const doAction = useCallback(async (action: string, buildingId?: number) => {
    if (!user) return;
    setLoadingAction(action);
    try {
      const res = await fetch('/api/student/housing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, action, buildingId }),
      });
      const json = await res.json();
      if (json.success) {
        const msgs: Record<string, string> = {
          book:   loc === 'ar' ? 'تم حجز السكن بنجاح' : 'Housing booked successfully',
          renew:  loc === 'ar' ? 'تم تجديد السكن بنجاح' : 'Housing renewed successfully',
          cancel: loc === 'ar' ? 'تم إلغاء حجز السكن' : 'Housing cancelled',
        };
        showToast(msgs[action] ?? 'تمت العملية');
        await fetchData();
      } else {
        const errs: Record<string, string> = {
          no_free_room:        loc === 'ar' ? 'لا توجد غرف متاحة في هذا المبنى' : 'No free rooms in this building',
          no_active_assignment: loc === 'ar' ? 'لا يوجد حجز نشط' : 'No active assignment',
        };
        showToast(errs[json.error] ?? (loc === 'ar' ? 'حدث خطأ' : 'An error occurred'));
      }
    } finally {
      setLoadingAction('');
      setConfirm(null);
    }
  }, [user, loc, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMaintenance = async () => {
    if (!typeAr.trim() || !descAr.trim() || !user) return;
    setSubmitting(true);
    try {
      await fetch('/api/student/housing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, typeAr, typeEn: typeAr, descAr, descEn: descAr }),
      });
      setShowModal(false);
      setTypeAr('');
      setDescAr('');
      await fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) return null;
  
  if (fetching) {
    return (
      <DashboardLayout user={user} role="student">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const assignment  = data?.assignment   ?? null;
  const roommates   = data?.roommates    ?? [];
  const buildings   = data?.buildings    ?? [];
  const maintenance = data?.maintenance  ?? [];
  const totalCap = buildings.reduce((s, b) => s + b.capacity, 0);
  const totalOcc = buildings.reduce((s, b) => s + b.occupied, 0);
  const occupancyRate = totalCap > 0 ? Math.round((totalOcc / totalCap) * 100) : 0;
  const availCount = buildings.filter(b => b.occupied < b.capacity).length;
  const paidRate = assignment && assignment.semFees > 0 ? Math.round((assignment.paidAmount / assignment.semFees) * 100) : 0;

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
                dir={dir}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm text-stone-850 dark:text-stone-150">
                      {confirm.type === 'book'   && (loc === 'ar' ? 'تأكيد حجز السكن' : 'Confirm Dorm Booking')}
                      {confirm.type === 'renew'  && (loc === 'ar' ? 'تجديد السكن' : 'Renew Residence Stay')}
                      {confirm.type === 'cancel' && (loc === 'ar' ? 'إلغاء السكن' : 'Cancel ResidenceStay')}
                      {confirm.type === 'change' && (loc === 'ar' ? 'تغيير السكن' : 'Change Dorm Residence')}
                    </p>
                  </div>
                  <button onClick={() => setConfirm(null)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-stone-650 dark:text-stone-400 font-medium leading-relaxed">
                  {confirm.type === 'book'   && (loc === 'ar' ? `هل تريد حجز مكان في "${confirm.buildingName}"؟` : `Book a place in "${confirm.buildingName}"?`)}
                  {confirm.type === 'renew'  && (loc === 'ar' ? 'هل تريد تجديد إقامتك لفصل دراسي إضافي؟' : 'Renew your stay for one more semester?')}
                  {confirm.type === 'cancel' && (loc === 'ar' ? 'هل أنت متأكد من إلغاء حجز السكن؟ لا يمكن التراجع.' : 'Cancel your housing? This cannot be undone.')}
                  {confirm.type === 'change' && (loc === 'ar' ? `سيتم إلغاء سكنك الحالي والانتقال إلى "${confirm.buildingName}". هل تريد المتابعة؟` : `Your current housing will be cancelled and you'll move to "${confirm.buildingName}". Continue?`)}
                </p>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={async () => {
                      if (confirm.type === 'book')   await doAction('book', confirm.buildingId);
                      if (confirm.type === 'renew')  await doAction('renew');
                      if (confirm.type === 'cancel') await doAction('cancel');
                      if (confirm.type === 'change') await doAction('book', confirm.buildingId);
                    }}
                    disabled={!!loadingAction}
                    className={`flex-1 font-bold text-xs py-2 rounded-xl border-0 shadow-sm disabled:opacity-50 text-white ${
                      confirm.type === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FABA19] hover:bg-[#e5a816]'
                    }`}
                  >
                    {loadingAction ? '...' : (loc === 'ar' ? 'تأكيد الطلب' : 'Confirm Request')}
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
                  <Home className="w-6 h-6" />
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
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: t.occupancyRate,      value: `${occupancyRate}%` },
                  { label: t.availableBuildings, value: availCount },
                  { label: t.totalCapacity,      value: totalCap },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 space-y-0.5">
                    <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold">{label}</p>
                    <p className="text-xl font-bold text-[#D97706]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Current Residence Details & Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Active Dorm Info Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <Home className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.currentHousing}</CardTitle>
                </div>
                <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5">
                  {assignment ? t.resident : t.notResident}
                </Badge>
              </CardHeader>
              <CardContent className="p-5">
                {!assignment ? (
                  <div className="py-8 text-center">
                    <Home className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
                    <p className="text-xs text-stone-450 font-bold">{t.noAssignment}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: General Details */}
                      <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-2.5">
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-250 pb-2 border-b border-stone-100 dark:border-stone-800">{t.details}</p>
                        {[
                          { label: t.building, value: loc === 'ar' ? assignment.building.nameAr : assignment.building.nameEn },
                          { label: t.room,     value: assignment.room },
                          { label: t.floor,    value: assignment.floor },
                          { label: t.checkIn,  value: new Date(assignment.checkIn).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US') },
                          { label: t.checkOut, value: new Date(assignment.checkOut).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US') },
                        ].map(({ label, value }, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
                            <span>{label}</span>
                            <span className="font-bold text-stone-800 dark:text-stone-200">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Roommates List */}
                      <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-2.5">
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-250 pb-2 border-b border-stone-100 dark:border-stone-800">{t.roommates}</p>
                        {roommates.length === 0 ? (
                          <p className="text-[11px] text-stone-450 dark:text-stone-500 font-semibold">{t.noRoommates}</p>
                        ) : (
                          <div className="space-y-2">
                            {roommates.map((name, idx) => (
                              <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-xl p-2.5 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                                  <Users className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate">{name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button
                        onClick={() => setConfirm({ type: 'renew' })}
                        disabled={!!loadingAction}
                        className="bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {t.renew}
                      </Button>
                      <Button
                        onClick={() => {
                          document.getElementById('available-buildings')?.scrollIntoView({ behavior: 'smooth' });
                          showToast(loc === 'ar' ? 'اختر المبنى السكني البديل من القائمة أدناه' : 'Select a new building below');
                        }}
                        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[#D97706] hover:bg-stone-50 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                        {t.changeRoom}
                      </Button>
                      <Button
                        onClick={() => window.location.href = '/student/payments'}
                        className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <Wallet className="w-4 h-4" />
                        {t.payFees}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Residence Fees Billing Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
              <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.feesTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                {!assignment ? (
                  <div className="py-8 text-center">
                    <Wallet className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
                    <p className="text-xs text-stone-450 font-bold">{t.noAssignment}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-3">
                      {[
                        { label: t.semFees,       value: `${assignment.semFees} ${t.egp}` },
                        { label: t.paid,          value: `${assignment.paidAmount} ${t.egp}` },
                        { label: t.remainingFees, value: `${assignment.remainingFees} ${t.egp}` },
                      ].map(({ label, value }, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold text-stone-550">
                          <span>{label}</span>
                          <span className="font-bold text-stone-850 dark:text-stone-100">{value}</span>
                        </div>
                      ))}
                      
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-stone-450 dark:text-stone-500">
                          <span>{t.payRate}</span>
                          <span>{paidRate}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                          <div className="h-1.5 rounded-full bg-[#FABA19]" style={{ width: `${paidRate}%` }} />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => window.location.href = '/student/payments'}
                      className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm"
                    >
                      {t.viewBill}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Dorm Buildings Listings */}
        <motion.div id="available-buildings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <Home className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.availableBuildingsTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {buildings.map(b => {
                  const pct = b.capacity > 0 ? Math.round((b.occupied / b.capacity) * 100) : 0;
                  const isAvail = b.occupied < b.capacity;
                  const isMyBuilding = assignment && (loc === 'ar' ? assignment.building.nameAr === b.nameAr : assignment.building.nameEn === b.nameEn);
                  return (
                    <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <div className={`p-5 rounded-2xl border transition-all ${
                        isMyBuilding
                          ? 'border-[#FABA19] bg-amber-500/5'
                          : 'border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-200/50'
                      }`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-stone-850 dark:text-stone-100">{loc === 'ar' ? b.nameAr : b.nameEn}</p>
                            <p className="text-xs font-bold text-[#D97706] mt-0.5">{b.pricePerSem} {t.perSem}</p>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mt-1 uppercase">{b.type}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                            isAvail
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40'
                              : 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100/40'
                          }`}>
                            {isAvail ? t.statusAvailable : t.statusFull}
                          </span>
                        </div>

                        {/* Occupancy Indicator */}
                        <div className="mt-4 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-stone-450 dark:text-stone-500">
                            <span>{t.occupancy}</span>
                            <span>{b.occupied} / {b.capacity}</span>
                          </div>
                          <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                            <div className="h-1 rounded-full bg-[#FABA19]" style={{ width: `${pct}%` }} />
                          </div>
                        </div>

                        {b.facilities && b.facilities.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-stone-50 dark:border-stone-850/60">
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-2">{t.facilities}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {b.facilities.map((f, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-5">
                          <Button
                            disabled={!isAvail || !!loadingAction}
                            onClick={() => {
                              if (!isAvail) return;
                              const bName = loc === 'ar' ? b.nameAr : b.nameEn;
                              if (assignment && !isMyBuilding) {
                                setConfirm({ type: 'change', buildingId: b.id, buildingName: bName });
                              } else if (!assignment) {
                                setConfirm({ type: 'book', buildingId: b.id, buildingName: bName });
                              }
                            }}
                            className={`w-full font-bold text-xs py-2 rounded-xl transition-all shadow-sm ${
                              isMyBuilding
                                ? 'bg-amber-500/10 text-[#D97706] hover:bg-amber-500/15 border border-[#FABA19]/20'
                                : 'bg-[#FABA19] hover:bg-[#e5a816] text-white border-0 disabled:opacity-50'
                            }`}
                          >
                            {isMyBuilding ? (loc === 'ar' ? '✓ سكنك الحالي' : '✓ Your Current Dorm') : isAvail ? t.requestHousing : t.notAvailable}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Maintenance Requests History & Booking */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <Wrench className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.maintenanceTitle}</CardTitle>
              </div>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg border-0 shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.newMaintenance}
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {maintenance.length === 0 ? (
                <div className="py-8 text-center text-stone-450 dark:text-stone-550 font-bold text-xs">
                  {t.noMaintenance}
                </div>
              ) : (
                <div className="space-y-3">
                  {maintenance.map(m => {
                    const isDone = m.status === 'done';
                    return (
                      <div key={m.id} className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                            <Wrench className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-800 dark:text-stone-150">{loc === 'ar' ? m.typeAr : m.typeEn}</p>
                            <p className="text-[10px] text-stone-400 dark:text-stone-550 font-semibold mt-0.5">
                              {loc === 'ar' ? m.descAr : m.descEn} • {new Date(m.createdAt).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US')}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          isDone
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40'
                            : 'text-[#D97706] bg-amber-50 dark:bg-amber-955/20 border-amber-100/40'
                        }`}>
                          {isDone ? t.statusDone : t.statusPending}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* New Maintenance Dialog */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
              dir={dir}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm text-stone-850 dark:text-stone-150">{t.modalTitle}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-250">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-400 dark:text-stone-500">{t.typeLabel}</label>
                  <input
                    value={typeAr}
                    onChange={e => setTypeAr(e.target.value)}
                    placeholder={t.typePlaceholder}
                    className="w-full rounded-xl p-3 text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900 text-stone-800 dark:text-stone-150 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-400 dark:text-stone-500">{t.descLabel}</label>
                  <textarea
                    value={descAr}
                    onChange={e => setDescAr(e.target.value)}
                    placeholder={t.descPlaceholder}
                    rows={4}
                    className="w-full rounded-xl p-3 text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900 text-stone-800 dark:text-stone-150 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleMaintenance}
                  disabled={submitting || !typeAr.trim() || !descAr.trim()}
                  className="flex-1 bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm disabled:opacity-50"
                >
                  {submitting ? t.submitting : t.submit}
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs py-2 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm"
                >
                  {t.cancel}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
