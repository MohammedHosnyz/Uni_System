'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Home, Wallet, Users, Wrench, Plus, X, RefreshCw, ArrowLeftRight, AlertTriangle } from 'lucide-react';

const i18n = {
  ar: {
    title: 'السكن الجامعي', subtitle: 'إدارة إقامتك في السكن الجامعي',
    occupancyRate: 'نسبة الإشغال', availableBuildings: 'مبانٍ متاحة', totalCapacity: 'إجمالي السعة',
    building: 'المبنى', room: 'الغرفة', floor: 'الطابق',
    checkIn: 'تاريخ الدخول', checkOut: 'حتى', egp: 'جنيه',
    currentHousing: 'معلومات السكن الحالي', resident: 'مقيم', notResident: 'غير مقيم',
    details: 'تفاصيل الإقامة', roommates: 'زملاء الغرفة', noRoommates: 'لا يوجد زملاء',
    renew: 'تجديد السكن', changeRoom: 'طلب تغيير الغرفة', payFees: 'دفع الرسوم',
    feesTitle: 'الرسوم', semFees: 'رسوم الفصل', paid: 'المدفوع', remainingFees: 'المتبقي',
    payRate: 'نسبة السداد', viewBill: 'عرض تفاصيل الفاتورة',
    availableBuildingsTitle: 'المباني المتاحة', perSem: 'جنيه/فصل',
    occupancy: 'الإشغال', facilities: 'المرافق',
    statusAvailable: 'متاح', statusFull: 'مكتمل',
    requestHousing: 'طلب السكن', notAvailable: 'غير متاح',
    maintenanceTitle: 'طلبات الصيانة', newMaintenance: 'طلب صيانة جديد',
    statusDone: 'مكتمل', statusPending: 'قيد المعالجة', noMaintenance: 'لا توجد طلبات صيانة',
    rules: 'قواعد السكن الجامعي',
    r1: 'الالتزام بمواعيد الدخول والخروج المحددة',
    r2: 'المحافظة على نظافة الغرف والمرافق العامة',
    r3: 'عدم إحضار زوار بدون إذن مسبق',
    r4: 'احترام زملاء السكن وعدم إزعاجهم',
    r5: 'الإبلاغ عن أي أعطال فور حدوثها',
    r6: 'عدم التدخين داخل المباني',
    modalTitle: 'طلب صيانة جديد', typeLabel: 'نوع العطل', descLabel: 'وصف المشكلة',
    typePlaceholder: 'مثال: كهرباء، سباكة، تكييف...', descPlaceholder: 'اشرح المشكلة بالتفصيل...',
    submit: 'إرسال الطلب', cancel: 'إلغاء', submitting: 'جارٍ الإرسال...',
    renewConfirm: 'تم إرسال طلب تجديد السكن بنجاح',
    changeConfirm: 'تم إرسال طلب تغيير الغرفة بنجاح',
    payConfirm: 'تم توجيهك لبوابة الدفع',
    noAssignment: 'لا يوجد سكن مخصص لك حالياً',
  },
  en: {
    title: 'University Housing', subtitle: 'Manage your university residence',
    occupancyRate: 'Occupancy Rate', availableBuildings: 'Available Buildings', totalCapacity: 'Total Capacity',
    building: 'Building', room: 'Room', floor: 'Floor',
    checkIn: 'Check-in', checkOut: 'Until', egp: 'EGP',
    currentHousing: 'Current Housing Info', resident: 'Resident', notResident: 'Not Resident',
    details: 'Residence Details', roommates: 'Roommates', noRoommates: 'No roommates',
    renew: 'Renew Housing', changeRoom: 'Request Room Change', payFees: 'Pay Fees',
    feesTitle: 'Fees', semFees: 'Semester Fees', paid: 'Paid', remainingFees: 'Remaining',
    payRate: 'Payment Rate', viewBill: 'View Bill Details',
    availableBuildingsTitle: 'Available Buildings', perSem: 'EGP/sem',
    occupancy: 'Occupancy', facilities: 'Facilities',
    statusAvailable: 'Available', statusFull: 'Full',
    requestHousing: 'Request Housing', notAvailable: 'Not Available',
    maintenanceTitle: 'Maintenance Requests', newMaintenance: 'New Request',
    statusDone: 'Completed', statusPending: 'In Progress', noMaintenance: 'No maintenance requests',
    rules: 'Housing Rules',
    r1: 'Comply with designated entry and exit times',
    r2: 'Maintain cleanliness of rooms and common areas',
    r3: 'No visitors without prior permission',
    r4: 'Respect roommates and avoid disturbances',
    r5: 'Report any faults immediately',
    r6: 'No smoking inside buildings',
    modalTitle: 'New Maintenance Request', typeLabel: 'Fault Type', descLabel: 'Problem Description',
    typePlaceholder: 'e.g. Electricity, Plumbing, AC...', descPlaceholder: 'Describe the problem in detail...',
    submit: 'Submit Request', cancel: 'Cancel', submitting: 'Submitting...',
    renewConfirm: 'Housing renewal request sent successfully',
    changeConfirm: 'Room change request sent successfully',
    payConfirm: 'Redirecting to payment portal',
    noAssignment: 'No housing assignment found',
  },
} as const;

interface HousingData {
  assignment: {
    building: { nameAr: string; nameEn: string; type: string };
    room: string; floor: number;
    checkIn: string; checkOut: string;
    semFees: number; paidAmount: number; remainingFees: number; status: string;
  } | null;
  roommates: string[];
  buildings: {
    id: number; nameAr: string; nameEn: string; type: string;
    capacity: number; occupied: number; pricePerSem: number; isActive: boolean;
    facilities: string[];
  }[];
  maintenance: {
    id: number; typeAr: string; typeEn: string; descAr: string; descEn: string;
    status: string; createdAt: string;
  }[];
}

export default function HousingPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th = dark ? darkTheme : theme;
  const card   = dark ? darkTheme.surface    : theme.white;
  const bdr    = dark ? darkTheme.border     : theme.border;
  const bdrL   = dark ? darkTheme.borderLight : theme.border;
  const iconBg = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text     : '#1A1612';

  const [data, setData] = useState<HousingData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [typeAr, setTypeAr] = useState('');
  const [descAr, setDescAr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [loadingAction, setLoadingAction] = useState('');
  
  const [confirm, setConfirm] = useState<{ type: string; buildingId?: number; buildingName?: string } | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

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

  useEffect(() => { fetchData(); }, [fetchData]);

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
      setTypeAr(''); setDescAr('');
      await fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) return null;
  if (fetching) return (
    <DashboardLayout user={user} role="student">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: th.primary, borderTopColor: 'transparent' }} />
      </div>
    </DashboardLayout>
  );

  const assignment  = data?.assignment   ?? null;
  const roommates   = data?.roommates    ?? [];
  const buildings   = data?.buildings    ?? [];
  const maintenance = data?.maintenance  ?? [];
  const totalCap = buildings.reduce((s, b) => s + b.capacity, 0);
  const totalOcc = buildings.reduce((s, b) => s + b.occupied, 0);
  const occupancyRate = totalCap > 0 ? Math.round((totalOcc / totalCap) * 100) : 0;
  const availCount = buildings.filter(b => b.occupied < b.capacity).length;
  const paidRate = assignment && assignment.semFees > 0 ? Math.round((assignment.paidAmount / assignment.semFees) * 100) : 0;

  const SectionHeader = ({ icon: Icon, label, action }: { icon: React.ElementType; label: string; action?: React.ReactNode }) => (
    <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon className="w-5 h-5" style={{ color: th.primary }} />
        </div>
        <p className="font-extrabold" style={{ color: th.text }}>{label}</p>
      </div>
      {action}
    </div>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl font-bold text-sm shadow-lg"
            style={{ background: th.primary, color: heroText }}>{toast}</div>
        )}

        
        {confirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setConfirm(null)}>
            <div onClick={e => e.stopPropagation()}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', width: '100%', maxWidth: 400 }} dir={dir}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${th.primary}18`, border: `1px solid ${th.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <p className="font-extrabold text-base" style={{ color: th.text }}>
                    {confirm.type === 'book'   && (loc === 'ar' ? 'تأكيد حجز السكن' : 'Confirm Booking')}
                    {confirm.type === 'renew'  && (loc === 'ar' ? 'تجديد السكن' : 'Renew Housing')}
                    {confirm.type === 'cancel' && (loc === 'ar' ? 'إلغاء السكن' : 'Cancel Housing')}
                    {confirm.type === 'change' && (loc === 'ar' ? 'تغيير السكن' : 'Change Housing')}
                  </p>
                </div>
                <button onClick={() => setConfirm(null)} style={{ color: th.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm mb-5" style={{ color: th.text }}>
                {confirm.type === 'book'   && (loc === 'ar' ? `هل تريد حجز مكان في "${confirm.buildingName}"؟` : `Book a place in "${confirm.buildingName}"?`)}
                {confirm.type === 'renew'  && (loc === 'ar' ? 'هل تريد تجديد إقامتك لفصل دراسي إضافي؟' : 'Renew your stay for one more semester?')}
                {confirm.type === 'cancel' && (loc === 'ar' ? 'هل أنت متأكد من إلغاء حجز السكن؟ لا يمكن التراجع.' : 'Cancel your housing? This cannot be undone.')}
                {confirm.type === 'change' && (loc === 'ar' ? `سيتم إلغاء سكنك الحالي والانتقال إلى "${confirm.buildingName}". هل تريد المتابعة؟` : `Your current housing will be cancelled and you'll move to "${confirm.buildingName}". Continue?`)}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirm(null)}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: `1px solid ${bdrL}`, background: 'transparent', color: th.textMuted, fontWeight: 700, cursor: 'pointer' }}>
                  {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button disabled={!!loadingAction}
                  onClick={async () => {
                    if (confirm.type === 'book')   await doAction('book', confirm.buildingId);
                    if (confirm.type === 'renew')  await doAction('renew');
                    if (confirm.type === 'cancel') await doAction('cancel');
                    if (confirm.type === 'change') await doAction('book', confirm.buildingId);
                  }}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: 'none', background: confirm.type === 'cancel' ? '#ef4444' : th.primary, color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loadingAction ? 0.7 : 1 }}>
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
                  <Home className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>{user.firstName} {user.lastName} • {t.subtitle}</p>
                </div>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.occupancyRate,      value: `${occupancyRate}%` },
                  { label: t.availableBuildings, value: availCount },
                  { label: t.totalCapacity,      value: totalCap },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem', textAlign: 'center' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{label}</p>
                    <p className="text-xl font-extrabold" style={{ color: th.primary }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Home className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <p className="font-extrabold" style={{ color: th.text }}>{t.currentHousing}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                  style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
                  {assignment ? t.resident : t.notResident}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                {!assignment ? (
                  <p className="text-sm text-center py-6" style={{ color: th.textMuted }}>{t.noAssignment}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}>
                        <p className="font-extrabold text-sm mb-3" style={{ color: th.text }}>{t.details}</p>
                        <div className="space-y-2">
                          {[
                            { label: t.building, value: loc === 'ar' ? assignment.building.nameAr : assignment.building.nameEn },
                            { label: t.room,     value: assignment.room },
                            { label: t.floor,    value: `${assignment.floor}` },
                            { label: t.checkIn,  value: new Date(assignment.checkIn).toLocaleDateString('ar-EG') },
                            { label: t.checkOut, value: new Date(assignment.checkOut).toLocaleDateString('ar-EG') },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between">
                              <span className="text-sm" style={{ color: th.textMuted }}>{label}</span>
                              <span className="font-extrabold text-sm" style={{ color: th.text }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}>
                        <p className="font-extrabold text-sm mb-3" style={{ color: th.text }}>{t.roommates}</p>
                        {roommates.length === 0 ? (
                          <p className="text-sm" style={{ color: th.textMuted }}>{t.noRoommates}</p>
                        ) : (
                          <div className="space-y-2">
                            {roommates.map(r => (
                              <div key={r} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem' }} className="flex items-center gap-3">
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Users className="w-4 h-4" style={{ color: th.primary }} />
                                </div>
                                <span className="font-extrabold text-sm" style={{ color: th.text }}>{r}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => setConfirm({ type: 'renew' })}
                        disabled={!!loadingAction}
                        style={{ background: th.primary, color: heroText, border: `1px solid ${th.primary}`, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <RefreshCw className="w-4 h-4" /> {t.renew}
                      </button>
                      <button onClick={() => {
                          document.getElementById('available-buildings')?.scrollIntoView({ behavior: 'smooth' });
                          showToast(loc === 'ar' ? 'اختر المبنى الجديد من القائمة أدناه' : 'Select a new building below');
                        }}
                        style={{ background: 'transparent', color: th.primary, border: `1px solid ${th.primary}`, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <ArrowLeftRight className="w-4 h-4" /> {t.changeRoom}
                      </button>
                      <button onClick={() => window.location.href = '/student/payments'}
                        style={{ background: iconBg, color: th.primary, border: `1px solid ${th.primary}`, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Wallet className="w-4 h-4" /> {t.payFees}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
              <SectionHeader icon={Wallet} label={t.feesTitle} />
              <div style={{ padding: '1.25rem' }}>
                {!assignment ? (
                  <p className="text-sm text-center py-6" style={{ color: th.textMuted }}>{t.noAssignment}</p>
                ) : (
                  <>
                    <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem', marginBottom: '1rem' }} className="space-y-2">
                      {[
                        { label: t.semFees,       value: `${assignment.semFees} ${t.egp}` },
                        { label: t.paid,          value: `${assignment.paidAmount} ${t.egp}` },
                        { label: t.remainingFees, value: `${assignment.remainingFees} ${t.egp}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: th.textMuted }}>{label}</span>
                          <span className="font-extrabold text-sm" style={{ color: th.primary }}>{value}</span>
                        </div>
                      ))}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs" style={{ color: th.textMuted }}>{t.payRate}</span>
                          <span className="text-xs font-extrabold" style={{ color: th.text }}>{paidRate}%</span>
                        </div>
                        <div style={{ background: bdrL, borderRadius: 99, height: 8 }}>
                          <div style={{ width: `${paidRate}%`, height: 8, borderRadius: 99, background: th.primary }} />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => window.location.href = '/student/payments'}
                      style={{ background: th.primary, color: heroText, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 13, width: '100%', cursor: 'pointer' }}>
                      {t.viewBill}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        
        <motion.div id="available-buildings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <SectionHeader icon={Home} label={t.availableBuildingsTitle} />
            <div style={{ padding: '1.25rem' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buildings.map(b => {
                const pct = b.capacity > 0 ? Math.round((b.occupied / b.capacity) * 100) : 0;
                const isAvail = b.occupied < b.capacity;
                const isMyBuilding = assignment && (loc === 'ar' ? assignment.building.nameAr === b.nameAr : assignment.building.nameEn === b.nameEn);
                return (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ border: `2px solid ${isMyBuilding ? th.primary : bdrL}`, borderRadius: 12, padding: '1.25rem', background: isMyBuilding ? `${th.primary}0A` : 'transparent' }}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-extrabold" style={{ color: th.text }}>{loc === 'ar' ? b.nameAr : b.nameEn}</p>
                          <p className="text-sm font-extrabold" style={{ color: th.primary }}>{b.pricePerSem} {t.perSem}</p>
                          <p className="text-xs" style={{ color: th.textMuted }}>{b.type}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                          style={{ background: `${th.primary}${isAvail ? '22' : '11'}`, color: isAvail ? th.primary : th.textMuted, border: `1px solid ${th.primary}${isAvail ? '44' : '22'}` }}>
                          {isAvail ? t.statusAvailable : t.statusFull}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs" style={{ color: th.textMuted }}>{t.occupancy}</span>
                          <span className="text-xs font-extrabold" style={{ color: th.text }}>{b.occupied}/{b.capacity}</span>
                        </div>
                        <div style={{ background: bdrL, borderRadius: 99, height: 6 }}>
                          <div style={{ width: `${pct}%`, height: 6, borderRadius: 99, background: th.primary }} />
                        </div>
                      </div>
                      {b.facilities && b.facilities.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-extrabold mb-2" style={{ color: th.textMuted }}>{t.facilities}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {b.facilities.map((f: string) => (
                              <span key={f} className="px-2 py-0.5 rounded-full text-xs"
                                style={{ background: iconBg, color: th.textMuted, border: `1px solid ${bdrL}` }}>{f}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <button
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
                        style={{ background: isMyBuilding ? iconBg : isAvail ? th.primary : iconBg, color: isMyBuilding ? th.primary : isAvail ? heroText : th.textMuted, borderRadius: 12, padding: '0.5rem', fontWeight: 700, fontSize: 13, width: '100%', border: `1px solid ${isMyBuilding ? th.primary : isAvail ? th.primary : bdrL}`, cursor: (isAvail && !isMyBuilding) ? 'pointer' : 'not-allowed' }}>
                        {isMyBuilding ? (loc === 'ar' ? '✓ سكنك الحالي' : '✓ Your Current Housing') : isAvail ? t.requestHousing : t.notAvailable}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <SectionHeader icon={Wrench} label={t.maintenanceTitle} action={
              <button onClick={() => setShowModal(true)}
                style={{ background: th.primary, color: heroText, borderRadius: 10, padding: '0.375rem 0.875rem', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <Plus className="w-4 h-4" /> {t.newMaintenance}
              </button>
            } />
            <div style={{ padding: '1.25rem' }} className="space-y-3">
              {maintenance.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: th.textMuted }}>{t.noMaintenance}</p>
              ) : maintenance.map(m => {
                const isDone = m.status === 'done';
                return (
                  <div key={m.id} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Wrench className="w-5 h-5" style={{ color: th.primary }} />
                      </div>
                      <div>
                        <p className="font-extrabold text-sm" style={{ color: th.text }}>{loc === 'ar' ? m.typeAr : m.typeEn}</p>
                        <p className="text-xs" style={{ color: th.textMuted }}>{loc === 'ar' ? m.descAr : m.descEn} • {new Date(m.createdAt).toLocaleDateString('ar-EG')}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                      style={{ background: `${th.primary}${isDone ? '22' : '11'}`, color: isDone ? th.primary : th.textMuted, border: `1px solid ${th.primary}${isDone ? '44' : '22'}` }}>
                      {isDone ? t.statusDone : t.statusPending}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', width: '100%', maxWidth: 480 }} dir={dir}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-extrabold text-lg" style={{ color: th.text }}>{t.modalTitle}</p>
              <button onClick={() => setShowModal(false)} style={{ color: th.textMuted, cursor: 'pointer', background: 'none', border: 'none' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: th.text }}>{t.typeLabel}</label>
                <input value={typeAr} onChange={e => setTypeAr(e.target.value)} placeholder={t.typePlaceholder}
                  style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', color: th.text, fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: th.text }}>{t.descLabel}</label>
                <textarea value={descAr} onChange={e => setDescAr(e.target.value)} placeholder={t.descPlaceholder} rows={3}
                  style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', color: th.text, fontSize: 14, outline: 'none', resize: 'none' }} />
              </div>
              <div className="flex gap-3">
                <button onClick={handleMaintenance} disabled={submitting || !typeAr.trim() || !descAr.trim()}
                  style={{ flex: 1, background: th.primary, color: heroText, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 14, cursor: submitting ? 'wait' : 'pointer', opacity: (!typeAr.trim() || !descAr.trim()) ? 0.6 : 1 }}>
                  {submitting ? t.submitting : t.submit}
                </button>
                <button onClick={() => setShowModal(false)}
                  style={{ flex: 1, background: 'transparent', color: th.primary, border: `1px solid ${th.primary}`, borderRadius: 12, padding: '0.625rem', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                  {t.cancel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
