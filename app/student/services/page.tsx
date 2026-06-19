'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText, BarChart2, GraduationCap, PauseCircle, LogOut, ArrowLeftRight,
  CreditCard, Wallet, SlidersHorizontal,
  Clock, CheckCircle, XCircle, Send, X, ChevronDown, ChevronUp,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الخدمات الطلابية الإلكترونية',
    subtitle: 'نافذة تقديم المعاملات والطلبات الرسمية',
    totalServices: 'إجمالي الخدمات',
    available: 'متاح للتقديم',
    unavailable: 'موقف مؤقتاً',
    filterBy: 'تصفية الخدمات حسب',
    category: 'التصنيف',
    all: 'جميع الخدمات المتاحة',
    certs: 'الوثائق والشهادات',
    academic: 'الشؤون التعليمية',
    financial: 'المعاملات المالية',
    statusAvailable: 'متاح للتقديم',
    statusUnavailable: 'غير متوفر حالياً',
    responseTime: 'متوسط الرد: 24 - 48 ساعة',
    requestService: 'تقديم طلب الخدمة',
    notAvailable: 'الخدمة غير متاحة',
    myRequests: 'سجل الطلبات والالتماسات السابقة',
    noRequests: 'لا توجد طلبات مسجلة باسمك بعد',
    pending: 'قيد المراجعة',
    approved: 'تم القبول والاعتماد',
    rejected: 'تم الرفض والاعتراض',
    submitRequest: 'تأكيد وإرسال الطلب',
    cancel: 'إلغاء الطلب',
    notes: 'ملاحظات وتفاصيل إضافية (اختياري)',
    notesPlaceholder: 'يرجى كتابة أي معلومات تود إرفاقها مع الطلب...',
    submitting: 'جاري إرسال الطلب...',
    submitted: 'تم تقديم طلب الخدمة بنجاح ✓',
    gpa: 'المعدل التراكمي',
    level: 'المستوى الأكاديمي',
    program: 'البرنامج الدراسي',
    requestedAt: 'تاريخ التقديم',
  },
  en: {
    title: 'Online Student Services',
    subtitle: 'Portal for submitting official requests and transcripts',
    totalServices: 'Total Services',
    available: 'Available',
    unavailable: 'Suspended',
    filterBy: 'Filter services by',
    category: 'Category',
    all: 'All Available Services',
    certs: 'Certificates & Documents',
    academic: 'Academic Petitions',
    financial: 'Financial Services',
    statusAvailable: 'Available',
    statusUnavailable: 'Not Available',
    responseTime: 'Response: 24 - 48 hours',
    requestService: 'Submit Request',
    notAvailable: 'Not Available',
    myRequests: 'Your Previous Requests Log',
    noRequests: 'No requests submitted under your account yet',
    pending: 'Pending Review',
    approved: 'Approved & Issued',
    rejected: 'Rejected / Declined',
    submitRequest: 'Confirm & Send Request',
    cancel: 'Cancel',
    notes: 'Additional notes or details (optional)',
    notesPlaceholder: 'Write any details you wish to attach to this request...',
    submitting: 'Sending request...',
    submitted: 'Request submitted successfully ✓',
    gpa: 'Cumulative GPA',
    level: 'Academic Level',
    program: 'Academic Program',
    requestedAt: 'Submitted At',
  },
} as const;

const SERVICES = [
  { key: 'enrollment_cert',    titleAr: 'طلب شهادة قيد',       titleEn: 'Enrollment Certificate',  descAr: 'طلب شهادة قيد رسمية لإثبات القيد بالجامعة.',              descEn: 'Request official student enrollment certificate to verify status.', icon: FileText,       status: 'available', catKey: 'certs' },
  { key: 'grade_transcript',   titleAr: 'طلب كشف درجات',       titleEn: 'Grade Transcript',         descAr: 'طلب كشف درجات رسمي معتمد للمواد والتقديرات.',                descEn: 'Request official cumulative grade transcript and credits record.',      icon: BarChart2,      status: 'available', catKey: 'certs' },
  { key: 'graduation_cert',    titleAr: 'طلب إفادة تخرج',      titleEn: 'Graduation Certificate',   descAr: 'طلب إفادة تخرج مؤقتة للطلاب الخريجين.',              descEn: 'Request temporary graduation letter for graduated students.',    icon: GraduationCap,  status: 'unavailable', catKey: 'certs' },
  { key: 'study_deferral',     titleAr: 'طلب تأجيل دراسة',     titleEn: 'Study Deferral',           descAr: 'تقديم طلب لتأجيل الدراسة لفصل دراسي كامل.',      descEn: 'Request official study deferral for a semester.',  icon: PauseCircle,    status: 'available', catKey: 'academic' },
  { key: 'course_withdrawal',  titleAr: 'طلب انسحاب من مادة', titleEn: 'Course Withdrawal',        descAr: 'الانسحاب من مقرر دراسي مسجل حالياً.',         descEn: 'Request withdrawal from an active registered course.',       icon: LogOut,         status: 'available', catKey: 'academic' },
  { key: 'faculty_transfer',   titleAr: 'طلب تحويل كلية',      titleEn: 'Faculty Transfer',         descAr: 'طلب للتحويل إلى تخصص أو كلية أخرى.',           descEn: 'Request official transfer to another faculty/department.',    icon: ArrowLeftRight, status: 'available', catKey: 'academic' },
  { key: 'fee_refund',         titleAr: 'طلب استرداد رسوم',    titleEn: 'Fee Refund',               descAr: 'استرداد الرسوم المدفوعة أو المبالغ الزائدة.',        descEn: 'Request official tuition fee or excess balance refund.',             icon: Wallet,         status: 'available', catKey: 'financial' },
  { key: 'fee_installment',    titleAr: 'طلب تقسيط رسوم',     titleEn: 'Fee Installment',          descAr: 'تقسيط المصروفات الدراسية المتبقية.',         descEn: 'Request official payment installment plan.',   icon: CreditCard,     status: 'available', catKey: 'financial' },
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      certs:    { ar: 'الشهادات والوثائق', en: 'Certificates' },
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

  const getStatusStyles = (s: string) => {
    if (s === 'approved') return { text: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40', icon: CheckCircle };
    if (s === 'rejected') return { text: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20 border-red-100/40', icon: XCircle };
    return { text: 'text-[#D97706]', bg: 'bg-amber-50 dark:bg-amber-955/20 border-amber-100/40', icon: Clock };
  };

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-bold text-xs bg-[#FABA19] text-white">
            <CheckCircle className="w-4.5 h-4.5" />
            {toast}
          </div>
        )}

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    {studentInfo?.name ?? `${user.firstName} ${user.lastName}`} • {t.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {studentInfo && (
              <div className="px-6 py-3 bg-stone-50/20 dark:bg-stone-850/10 border-b border-stone-100 dark:border-stone-800 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { label: t.program, value: loc === 'ar' ? studentInfo.program.nameAr : studentInfo.program.nameEn },
                  { label: t.gpa,     value: studentInfo.gpa?.toFixed(2) ?? '—' },
                  { label: t.level,   value: studentInfo.currentLevel },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-stone-400 dark:text-stone-500">{label}:</span>
                    <span className="font-bold text-[#D97706]">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: t.totalServices, value: stats.total,       color: 'text-[#D97706]' },
                  { label: t.available,     value: stats.available,   color: 'text-emerald-600' },
                  { label: t.unavailable,   value: stats.unavailable, color: 'text-red-500' },
                ].map(({ label, value, color }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 space-y-0.5">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{label}</p>
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Requests Collapse Panel */}
        <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowHistory(v => !v)}
            className="w-full flex items-center justify-between p-4 bg-stone-50/30 dark:bg-stone-850/20 border-b border-stone-100 dark:border-stone-800/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.myRequests}</span>
              {requests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-[#D97706]">{requests.length}</span>
              )}
            </div>
            {showHistory ? <ChevronUp className="w-4 h-4 text-stone-450" /> : <ChevronDown className="w-4 h-4 text-stone-450" />}
          </button>
          <AnimatePresence>
            {showHistory && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  {dataLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="w-5 h-5 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
                    </div>
                  ) : requests.length === 0 ? (
                    <p className="text-xs text-center py-4 text-stone-450 font-bold">{t.noRequests}</p>
                  ) : (
                    <div className="space-y-2">
                      {requests.map(r => {
                        const svc = SERVICES.find(s => s.key === r.serviceKey);
                        const styles = getStatusStyles(r.status);
                        const Icon = styles.icon;
                        return (
                          <div key={r.id} className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/10 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <Icon className={`w-5 h-5 shrink-0 ${styles.text}`} />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-stone-800 dark:text-stone-150 truncate">
                                  {svc ? (loc === 'ar' ? svc.titleAr : svc.titleEn) : r.serviceKey}
                                </p>
                                {r.notes && <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold mt-0.5 truncate">{r.notes}</p>}
                              </div>
                            </div>
                            <div className="text-end shrink-0">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-current ${styles.text} ${styles.bg}`}>
                                {r.status === 'approved' ? t.approved : r.status === 'rejected' ? t.rejected : t.pending}
                              </span>
                              <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold mt-1">
                                {new Date(r.createdAt).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US')}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs font-bold text-stone-400 dark:text-stone-500">{t.filterBy}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedCat(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCat === key
                    ? 'bg-[#FABA19] text-white border-[#FABA19]'
                    : 'bg-stone-50/50 hover:bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/40 dark:hover:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => {
            const Icon = s.icon;
            const isAvailable = s.status === 'available';
            const title = loc === 'ar' ? s.titleAr : s.titleEn;
            const desc  = loc === 'ar' ? s.descAr  : s.descEn;
            const pendingCount = requests.filter(r => r.serviceKey === s.key && r.status === 'pending').length;
            return (
              <motion.div key={s.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706] relative shrink-0">
                        <Icon className="w-6 h-6" />
                        {pendingCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FABA19] text-white text-[9px] font-bold flex items-center justify-center border border-white dark:border-stone-900">
                            {pendingCount}
                          </span>
                        )}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                        isAvailable
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40'
                          : 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100/40'
                      }`}>
                        {isAvailable ? t.statusAvailable : t.statusUnavailable}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-100">{title}</p>
                      <p className="text-[11px] text-stone-450 dark:text-stone-500 font-semibold leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-50 dark:border-stone-850 mt-4">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#D97706] bg-amber-500/5 px-2 py-0.5 rounded-full">
                        {catLabel(s.catKey)}
                      </span>
                      <span className="font-semibold text-stone-400 dark:text-stone-500">{t.responseTime}</span>
                    </div>

                    <Button
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setModal({ key: s.key, titleAr: s.titleAr, titleEn: s.titleEn })}
                      className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl shadow-sm border-0 disabled:opacity-50 disabled:bg-stone-100 disabled:text-stone-400 dark:disabled:bg-stone-800 dark:disabled:text-stone-600 transition-colors"
                    >
                      {isAvailable && <Send className="w-3.5 h-3.5 me-1.5" />}
                      {isAvailable ? t.requestService : t.notAvailable}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModal(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
              dir={dir}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <p className="font-bold text-xs text-stone-850 dark:text-stone-150">
                  {loc === 'ar' ? modal.titleAr : modal.titleEn}
                </p>
                <button onClick={() => setModal(null)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-400 dark:text-stone-500">{t.notes}</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={4}
                  className="w-full rounded-xl p-3 text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900 text-stone-800 dark:text-stone-150 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl shadow-sm border-0 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 me-1.5" />
                  {submitting ? t.submitting : t.submitRequest}
                </Button>
                <Button
                  onClick={() => setModal(null)}
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
