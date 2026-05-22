'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  FileText, BarChart2, GraduationCap, PauseCircle, LogOut, ArrowLeftRight,
  CreditCard, Wallet, HelpCircle, Link2, CalendarDays, SlidersHorizontal,
  Clock, CheckCircle, XCircle, Send, X, ChevronDown, ChevronUp,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الخدمات الطلابية', subtitle: 'جميع الخدمات في مكان واحد',
    totalServices: 'إجمالي الخدمات', available: 'متاح', unavailable: 'غير متاح',
    filterBy: 'تصفية حسب', category: 'التصنيف',
    all: 'جميع الخدمات', certs: 'الشهادات', academic: 'الطلبات الأكاديمية', financial: 'الخدمات المالية',
    statusAvailable: 'متاح', statusUnavailable: 'غير متاح',
    responseTime: 'يتم الرد خلال 24-48 ساعة',
    requestService: 'طلب الخدمة', notAvailable: 'غير متاح حالياً',
    quickLinks: 'روابط سريعة',
    payments: 'المدفوعات', paymentsDesc: 'عرض ودفع الرسوم',
    schedule: 'الجدول الدراسي', scheduleDesc: 'عرض الجدول الأسبوعي',
    grades: 'الدرجات', gradesDesc: 'عرض النتائج والدرجات',
    needHelp: 'تحتاج مساعدة؟',
    helpDesc: 'إذا كنت تواجه صعوبة في استخدام أي من الخدمات، يمكنك التواصل مع الدعم الفني أو زيارة مكتب شؤون الطلاب.',
    support: 'الدعم الفني', contact: 'اتصل بنا',
    myRequests: 'طلباتي', noRequests: 'لا توجد طلبات مقدمة بعد',
    pending: 'قيد المراجعة', approved: 'مقبول', rejected: 'مرفوض',
    submitRequest: 'تقديم الطلب', cancel: 'إلغاء',
    notes: 'ملاحظات (اختياري)', notesPlaceholder: 'أضف أي تفاصيل إضافية...',
    submitting: 'جاري التقديم...', submitted: 'تم تقديم الطلب بنجاح',
    gpa: 'المعدل التراكمي', level: 'المستوى', program: 'البرنامج',
    requestedAt: 'تاريخ الطلب',
  },
  en: {
    title: 'Student Services', subtitle: 'All services in one place',
    totalServices: 'Total Services', available: 'Available', unavailable: 'Unavailable',
    filterBy: 'Filter by', category: 'Category',
    all: 'All Services', certs: 'Certificates', academic: 'Academic Requests', financial: 'Financial Services',
    statusAvailable: 'Available', statusUnavailable: 'Unavailable',
    responseTime: 'Response within 24-48 hours',
    requestService: 'Request Service', notAvailable: 'Not Available',
    quickLinks: 'Quick Links',
    payments: 'Payments', paymentsDesc: 'View and pay fees',
    schedule: 'Schedule', scheduleDesc: 'View weekly schedule',
    grades: 'Grades', gradesDesc: 'View results and grades',
    needHelp: 'Need Help?',
    helpDesc: 'If you have difficulty using any service, contact technical support or visit the student affairs office.',
    support: 'Technical Support', contact: 'Contact Us',
    myRequests: 'My Requests', noRequests: 'No requests submitted yet',
    pending: 'Pending', approved: 'Approved', rejected: 'Rejected',
    submitRequest: 'Submit Request', cancel: 'Cancel',
    notes: 'Notes (optional)', notesPlaceholder: 'Add any additional details...',
    submitting: 'Submitting...', submitted: 'Request submitted successfully',
    gpa: 'GPA', level: 'Level', program: 'Program',
    requestedAt: 'Requested At',
  },
} as const;

const SERVICES = [
  { key: 'enrollment_cert',    titleAr: 'طلب شهادة قيد',       titleEn: 'Enrollment Certificate',  descAr: 'طلب شهادة قيد للطالب',              descEn: 'Request student enrollment certificate', icon: FileText,       status: 'available', catKey: 'certs' },
  { key: 'grade_transcript',   titleAr: 'طلب كشف درجات',       titleEn: 'Grade Transcript',         descAr: 'طلب كشف درجات رسمي',                descEn: 'Request official grade transcript',      icon: BarChart2,      status: 'available', catKey: 'certs' },
  { key: 'graduation_cert',    titleAr: 'طلب إفادة تخرج',      titleEn: 'Graduation Certificate',   descAr: 'طلب إفادة تخرج مؤقتة',              descEn: 'Request temporary graduation letter',    icon: GraduationCap,  status: 'unavailable', catKey: 'certs' },
  { key: 'study_deferral',     titleAr: 'طلب تأجيل دراسة',     titleEn: 'Study Deferral',           descAr: 'طلب تأجيل الدراسة لفصل دراسي',      descEn: 'Request study deferral for a semester',  icon: PauseCircle,    status: 'available', catKey: 'academic' },
  { key: 'course_withdrawal',  titleAr: 'طلب انسحاب من مادة', titleEn: 'Course Withdrawal',        descAr: 'طلب انسحاب من مادة دراسية',         descEn: 'Request withdrawal from a course',       icon: LogOut,         status: 'available', catKey: 'academic' },
  { key: 'faculty_transfer',   titleAr: 'طلب تحويل كلية',      titleEn: 'Faculty Transfer',         descAr: 'طلب تحويل إلى كلية أخرى',           descEn: 'Request transfer to another faculty',    icon: ArrowLeftRight, status: 'available', catKey: 'academic' },
  { key: 'fee_refund',         titleAr: 'طلب استرداد رسوم',    titleEn: 'Fee Refund',               descAr: 'طلب استرداد الرسوم الدراسية',        descEn: 'Request tuition fee refund',             icon: Wallet,         status: 'available', catKey: 'financial' },
  { key: 'fee_installment',    titleAr: 'طلب تقسيط رسوم',     titleEn: 'Fee Installment',          descAr: 'طلب تقسيط الرسوم الدراسية',         descEn: 'Request tuition fee installment plan',   icon: CreditCard,     status: 'available', catKey: 'financial' },
];

type StudentInfo = { name: string; email: string; studentNumber: string; program: { nameAr: string; nameEn: string }; gpa: number | null; currentLevel: number };
type ServiceReq  = { id: number; serviceKey: string; status: string; notes: string | null; createdAt: string };

export default function ServicesPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const [selectedCat, setSelectedCat] = useState('all');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [requests, setRequests]       = useState<ServiceReq[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [modal, setModal]             = useState<{ key: string; titleAr: string; titleEn: string } | null>(null);
  const [notes, setNotes]             = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [toast, setToast]             = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th  = dark ? darkTheme : theme;
  const card   = dark ? darkTheme.surface    : theme.white;
  const bdr    = dark ? darkTheme.border     : theme.border;
  const bdrL   = dark ? darkTheme.borderLight : theme.border;
  const iconBg = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text     : '#1A1612';

  const fetchData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const res = await fetch(`/api/student/services?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setStudentInfo(data.student);
        setRequests(data.requests);
      }
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const categories = [
    { key: 'all',      label: t.all },
    { key: 'certs',    label: t.certs },
    { key: 'academic', label: t.academic },
    { key: 'financial',label: t.financial },
  ];

  const filtered = useMemo(() =>
    selectedCat === 'all' ? SERVICES : SERVICES.filter(s => s.catKey === selectedCat),
    [selectedCat]);

  const stats = useMemo(() => ({
    total: SERVICES.length,
    available: SERVICES.filter(s => s.status === 'available').length,
    unavailable: SERVICES.filter(s => s.status !== 'available').length,
  }), []);

  const catLabel = (key: string) => {
    const map: Record<string, { ar: string; en: string }> = {
      certs:    { ar: 'الشهادات', en: 'Certificates' },
      academic: { ar: 'الطلبات الأكاديمية', en: 'Academic Requests' },
      financial:{ ar: 'الخدمات المالية', en: 'Financial Services' },
    };
    return loc === 'ar' ? (map[key]?.ar ?? key) : (map[key]?.en ?? key);
  };

  const handleSubmit = async () => {
    if (!modal || !user) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/student/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, serviceKey: modal.key, notes }),
      });
      if (res.ok) {
        setModal(null);
        setNotes('');
        setToast(t.submitted);
        setTimeout(() => setToast(''), 3000);
        fetchData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = (s: string) => s === 'approved' ? '#22c55e' : s === 'rejected' ? '#ef4444' : th.primary;
  const statusLabel = (s: string) => s === 'approved' ? t.approved : s === 'rejected' ? t.rejected : t.pending;
  const StatusIcon  = (s: string) => s === 'approved' ? CheckCircle : s === 'rejected' ? XCircle : Clock;

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item    = { hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } } };

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>
                    {studentInfo?.name ?? `${user.firstName} ${user.lastName}`} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {studentInfo && (
              <div style={{ background: card, padding: '0.75rem 1.5rem', borderBottom: `1px solid ${bdrL}` }} className="flex flex-wrap gap-4">
                {[
                  { label: t.program, value: loc === 'ar' ? studentInfo.program.nameAr : studentInfo.program.nameEn },
                  { label: t.gpa,     value: studentInfo.gpa?.toFixed(2) ?? '—' },
                  { label: t.level,   value: `${studentInfo.currentLevel}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}:</span>
                    <span className="text-sm font-extrabold" style={{ color: th.primary }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.totalServices, value: stats.total,       color: th.primary },
                  { label: t.available,     value: stats.available,   color: '#22c55e' },
                  { label: t.unavailable,   value: stats.unavailable, color: '#ef4444' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem', textAlign: 'center' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{label}</p>
                    <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
          <button
            onClick={() => setShowHistory(v => !v)}
            className="w-full flex items-center justify-between"
            style={{ padding: '0.875rem 1.25rem', background: iconBg, borderBottom: showHistory ? `1px solid ${bdrL}` : 'none' }}>
            <div className="flex items-center gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock className="w-5 h-5" style={{ color: th.primary }} />
              </div>
              <span className="font-extrabold" style={{ color: th.text }}>{t.myRequests}</span>
              {requests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold" style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>{requests.length}</span>
              )}
            </div>
            {showHistory ? <ChevronUp className="w-4 h-4" style={{ color: th.textMuted }} /> : <ChevronDown className="w-4 h-4" style={{ color: th.textMuted }} />}
          </button>
          <AnimatePresence>
            {showHistory && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem' }}>
                  {dataLoading ? (
                    <p className="text-sm text-center py-4" style={{ color: th.textMuted }}>...</p>
                  ) : requests.length === 0 ? (
                    <p className="text-sm text-center py-4" style={{ color: th.textMuted }}>{t.noRequests}</p>
                  ) : (
                    <div className="space-y-2">
                      {requests.map(r => {
                        const svc = SERVICES.find(s => s.key === r.serviceKey);
                        const Icon = StatusIcon(r.status);
                        const color = statusColor(r.status);
                        return (
                          <div key={r.id} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                              <div className="min-w-0">
                                <p className="font-extrabold text-sm truncate" style={{ color: th.text }}>{svc ? (loc === 'ar' ? svc.titleAr : svc.titleEn) : r.serviceKey}</p>
                                {r.notes && <p className="text-xs truncate" style={{ color: th.textMuted }}>{r.notes}</p>}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className="px-2 py-0.5 rounded-full text-xs font-extrabold" style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{statusLabel(r.status)}</span>
                              <span className="text-xs" style={{ color: th.textMuted }}>{new Date(r.createdAt).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US')}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '0.875rem 1.25rem' }} className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" style={{ color: th.primary }} />
            <span className="text-sm font-semibold" style={{ color: th.textMuted }}>{t.filterBy}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button key={key} onClick={() => setSelectedCat(key)}
                className="px-4 py-2 rounded-xl font-extrabold text-sm transition-all"
                style={{ background: selectedCat === key ? th.primary : iconBg, color: selectedCat === key ? heroText : th.textMuted, border: `1px solid ${selectedCat === key ? th.primary : bdrL}` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => {
            const Icon = s.icon;
            const isAvailable = s.status === 'available';
            const title = loc === 'ar' ? s.titleAr : s.titleEn;
            const desc  = loc === 'ar' ? s.descAr  : s.descEn;
            const pendingCount = requests.filter(r => r.serviceKey === s.key && r.status === 'pending').length;
            return (
              <motion.div key={s.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <Icon className="w-7 h-7" style={{ color: th.primary }} />
                      {pendingCount > 0 && (
                        <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: th.primary, color: heroText, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pendingCount}</span>
                      )}
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                      style={{ background: isAvailable ? '#22c55e22' : '#ef444422', color: isAvailable ? '#22c55e' : '#ef4444', border: `1px solid ${isAvailable ? '#22c55e44' : '#ef444444'}` }}>
                      {isAvailable ? t.statusAvailable : t.statusUnavailable}
                    </span>
                  </div>
                  <p className="font-extrabold mb-1" style={{ color: th.text }}>{title}</p>
                  <p className="text-sm mb-3 flex-1" style={{ color: th.textMuted }}>{desc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold px-2 py-1 rounded-full" style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>{catLabel(s.catKey)}</span>
                    <span className="text-xs" style={{ color: th.textMuted }}>{t.responseTime}</span>
                  </div>
                  <button
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setModal({ key: s.key, titleAr: s.titleAr, titleEn: s.titleEn })}
                    className="w-full py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2"
                    style={{ background: isAvailable ? th.primary : iconBg, color: isAvailable ? heroText : th.textMuted, border: `1px solid ${isAvailable ? th.primary : bdrL}`, cursor: isAvailable ? 'pointer' : 'not-allowed' }}>
                    {isAvailable && <Send className="w-4 h-4" />}
                    {isAvailable ? t.requestService : t.notAvailable}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 20, padding: '1.5rem', width: '100%', maxWidth: 440 }}
              dir={dir}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-extrabold text-lg" style={{ color: th.text }}>{loc === 'ar' ? modal.titleAr : modal.titleEn}</p>
                <button onClick={() => setModal(null)} style={{ color: th.textMuted }}><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: th.textMuted }}>{t.notes}</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={3}
                  className="w-full rounded-xl p-3 text-sm resize-none outline-none"
                  style={{ background: iconBg, border: `1px solid ${bdrL}`, color: th.text }}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2"
                  style={{ background: th.primary, color: heroText, opacity: submitting ? 0.7 : 1 }}>
                  <Send className="w-4 h-4" />
                  {submitting ? t.submitting : t.submitRequest}
                </button>
                <button onClick={() => setModal(null)}
                  className="px-4 py-2.5 rounded-xl font-extrabold text-sm"
                  style={{ background: iconBg, color: th.textMuted, border: `1px solid ${bdrL}` }}>
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2"
            style={{ background: '#22c55e', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <CheckCircle className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
}
