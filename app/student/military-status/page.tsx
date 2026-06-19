'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Shield, FileText, RefreshCw, Headphones, Download,
  CheckCircle2, Clock, AlertTriangle, CalendarDays, Hash, Building2, X,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الموقف والوضع التجنيدي الميداني',
    subtitle: 'متابعة وتحديث مستندات تأجيل الخدمة العسكرية للطلاب الذكور',
    currentStatus: 'حالة القيد والوضع الحالي',
    activeStatus: 'تأجيل ساري المفعول',
    defermentNum: 'رقم قرار التأجيل (نموذج 2 جند)',
    issueDate: 'تاريخ بدء التأجيل الأكاديمي',
    expiryDate: 'تاريخ انتهاء صلاحية التأجيل',
    militaryOffice: 'منطقة التجنيد والتعبئة التابع لها',
    nextAction: 'الإجراء والالتزام القادم المطلوب',
    renewBefore: 'يجب تقديم طلب تجديد التأجيل قبل حلول تاريخ',
    startRenewal: 'بدء إجراءات تجديد التأجيل الآن',
    requestCert: 'إصدار شهادة إثبات تجنيدية',
    requestCertDesc: 'طلب شهادة موجهة لمنطقة التجنيد تثبت القيد بالدراسة',
    renew: 'تقديم نموذج تجديد التأجيل',
    renewDesc: 'طلب تمديد فترة التأجيل بناء على الانتقال لمستوى أعلى',
    contactOffice: 'التواصل مع شؤون التجنيد بالكلية',
    contactOfficeDesc: 'إرسال استفسار مباشر للموظف المختص بالكلية',
    documents: 'سجل النماذج والمستندات المرفوعة',
    statusAvailable: 'جاهز للتحميل',
    download: 'تحميل المستند',
    timeline: 'المخطط الزمني للمعاملات التجنيدية',
    statusDone: 'مكتمل ومعتمد',
    statusUpcoming: 'مستحق قريباً',
    alert: 'تنبيه عسكري هام وجدي',
    alertText: 'يرجى تقديم طلب التجديد قبل انتهاء التأجيل الحالي بـ 30 يوماً على الأقل لتفادي المساءلة أو وقف القيد.',
    alertTip1: 'احتفظ دائماً بنسخة ورقية مصدقة من نموذج 2/3 جند بمحفظتك.',
    alertTip2: 'تأكد من مطابقة اسمك الرباعي والرقم القومي بالرقم العسكري.',
    alertTip3: 'مراجعة الموظف المسؤول بالكلية فور إتمام سن الـ 22.',
    deferred: 'مؤجل مؤقتاً لغرض الدراسة والتعليم',
    exempt: 'معفى نهائياً من الخدمة العسكرية',
    completed: 'أدى الخدمة العسكرية بنجاح',
    pending: 'الطلب قيد المراجعة الأمنية',
    noData: 'لا توجد أي بيانات تجنيدية مسجلة باسمك في النظام حالياً',
  },
  en: {
    title: 'Military Conscription Status',
    subtitle: 'Track military deferment progress, official cards, and actions',
    currentStatus: 'Current Military Deferment Status',
    activeStatus: 'Active Deferment Status',
    defermentNum: 'Decision / Deferment Number',
    issueDate: 'Deferment Start Date',
    expiryDate: 'Expiration Date',
    militaryOffice: 'Assigned Conscription District Office',
    nextAction: 'Upcoming Required Military Action',
    renewBefore: 'You must submit renewal documents before',
    startRenewal: 'Start Military Deferment Renewal',
    requestCert: 'Request Proof of Deferment',
    requestCertDesc: 'Get a formal certificate showing you are enrolled in active study',
    renew: 'Submit Renewal Form',
    renewDesc: 'Renew the deferment period upon moving to the next level',
    contactOffice: 'Contact Recruitment Liaison Office',
    contactOfficeDesc: 'Directly contact the military student affairs clerk',
    documents: 'Recruitment Forms & Digital Documents',
    statusAvailable: 'Ready to Download',
    download: 'Download Doc',
    timeline: 'Military Actions & Events Timeline',
    statusDone: 'Approved & Completed',
    statusUpcoming: 'Upcoming Action',
    alert: 'Critical Military Conscription Notice',
    alertText: 'Deferment forms must be updated at least 30 days prior to expiry to prevent enrollment locks or legal actions.',
    alertTip1: 'Keep physical copies of your military forms in your record.',
    alertTip2: 'Make sure your national ID matches your military ID prefix.',
    alertTip3: 'Visit the campus recruitment office when you turn 22.',
    deferred: 'Deferred for Active Academic Studies',
    exempt: 'Officially Exempt from Military Service',
    completed: 'Completed Active Duty Military Service',
    pending: 'Request Under Security Review',
    noData: 'No military service or deferment records found in your profile',
  },
} as const;

type MilitaryStatusData = {
  status: string;
  defermentNumber: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  militaryOffice: string | null;
};

type MilitaryDoc = { id: number; nameAr: string; nameEn: string | null; docType: string; docDate: string; status: string };
type MilitaryEvent = { id: number; eventAr: string; eventEn: string | null; eventDate: string; status: string };

export default function MilitaryStatusPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const [militaryStatus, setMilitaryStatus] = useState<MilitaryStatusData | null>(null);
  const [documents, setDocuments]           = useState<MilitaryDoc[]>([]);
  const [timeline, setTimeline]             = useState<MilitaryEvent[]>([]);
  const [dataLoading, setDataLoading]       = useState(true);
  const [toast, setToast]                   = useState('');
  const [loadingAction, setLoadingAction]   = useState('');
  const [contactModal, setContactModal]     = useState(false);
  const [contactNote, setContactNote]       = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const fetchData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const res = await fetch(`/api/student/military-status?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setMilitaryStatus(data.militaryStatus);
        setDocuments(data.documents ?? []);
        setTimeline(data.timeline ?? []);
      }
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const doAction = useCallback(async (action: string, notes?: string) => {
    if (!user) return;
    setLoadingAction(action);
    try {
      const res = await fetch('/api/student/military-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, action, notes }),
      });
      const data = await res.json();
      if (data.success) {
        const msgs: Record<string, string> = {
          request_cert: loc === 'ar' ? 'تم تقديم طلب الشهادة بنجاح' : 'Certificate request submitted',
          renew:        loc === 'ar' ? 'تم تجديد التأجيل بنجاح' : 'Deferment renewed successfully',
          contact:      loc === 'ar' ? 'تم إرسال طلب التواصل بنجاح' : 'Contact request sent',
        };
        showToast(msgs[action] ?? 'تمت العملية بنجاح');
        setContactModal(false);
        setContactNote('');
        await fetchData();
      }
    } finally {
      setLoadingAction('');
    }
  }, [user, loc, fetchData]);

  const fmtDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const statusLabel = (s: string) =>
    ({ deferred: t.deferred, exempt: t.exempt, completed: t.completed, pending: t.pending }[s] ?? s);

  const nextUpcoming = timeline.find(e => e.status === 'upcoming');

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

        {/* Contact Liaison Office Modal */}
        {contactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setContactModal(false)}>
            <div
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm text-stone-850 dark:text-stone-150">{t.contactOffice}</p>
                </div>
                <button onClick={() => setContactModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-250">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <textarea
                  value={contactNote}
                  onChange={e => setContactNote(e.target.value)}
                  placeholder={loc === 'ar' ? 'اكتب رسالتك أو استفسارك هنا لمشرف التجنيد...' : 'Write your message or inquiry here...'}
                  rows={4}
                  className="w-full rounded-xl p-3 text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900 text-stone-800 dark:text-stone-150 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => doAction('contact', contactNote)}
                  disabled={loadingAction === 'contact'}
                  className="flex-1 bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm disabled:opacity-50"
                >
                  {loadingAction === 'contact' ? '...' : (loc === 'ar' ? 'إرسال الرسالة' : 'Send Message')}
                </Button>
                <Button
                  onClick={() => setContactModal(false)}
                  className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs py-2 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm"
                >
                  {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <Shield className="w-6 h-6" />
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
        ) : !militaryStatus ? (
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2">
            <Shield className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            <p className="text-xs font-bold text-stone-450 dark:text-stone-550">{t.noData}</p>
          </Card>
        ) : (
          <div className="space-y-6">

            {/* Current Status Section */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100 dark:border-stone-800">
                  <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                    <Shield className="w-4.5 h-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.currentStatus}</CardTitle>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column Status Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-stone-50/50 dark:bg-stone-850/20 border border-stone-100 dark:border-stone-800">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-150">{statusLabel(militaryStatus.status)}</p>
                        <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border-0 text-[9px] font-bold mt-1 shadow-none">
                          {t.activeStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 space-y-2.5">
                      {[
                        { icon: Hash,         label: t.defermentNum,  value: militaryStatus.defermentNumber ?? '—', highlight: false },
                        { icon: CalendarDays, label: t.issueDate,      value: fmtDate(militaryStatus.issueDate),     highlight: false },
                        { icon: CalendarDays, label: t.expiryDate,     value: fmtDate(militaryStatus.expiryDate),    highlight: true  },
                        { icon: Building2,    label: t.militaryOffice, value: militaryStatus.militaryOffice ?? '—',  highlight: false },
                      ].map(({ icon: Icon, label, value, highlight }, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-stone-400" />
                            <span className="font-semibold text-stone-450 dark:text-stone-500">{label}</span>
                          </div>
                          <span className={`font-bold ${highlight ? 'text-[#D97706]' : 'text-stone-800 dark:text-stone-200'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column Alerts / Next Action */}
                  <div className="space-y-4">
                    {nextUpcoming ? (
                      <div className="p-4 rounded-xl border border-amber-200/50 bg-amber-500/5 space-y-3">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-[#D97706]">
                              {loc === 'ar' ? nextUpcoming.eventAr : (nextUpcoming.eventEn ?? nextUpcoming.eventAr)}
                            </p>
                            <p className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                              {t.renewBefore} {fmtDate(nextUpcoming.eventDate)}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => doAction('renew')}
                          disabled={loadingAction === 'renew'}
                          className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm flex items-center justify-center gap-2"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${loadingAction === 'renew' ? 'animate-spin' : ''}`} />
                          {loadingAction === 'renew' ? '...' : t.startRenewal}
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-stone-150 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-850/5 space-y-2">
                        <p className="text-xs font-bold text-stone-700 dark:text-stone-300">{t.alert}</p>
                        <p className="text-[11px] text-stone-450 dark:text-stone-500 leading-relaxed font-semibold">{t.alertText}</p>
                        <ul className="text-[10px] text-stone-400 dark:text-stone-500 space-y-1 pt-1 font-semibold">
                          <li>• {t.alertTip1}</li>
                          <li>• {t.alertTip2}</li>
                          <li>• {t.alertTip3}</li>
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              </Card>
            </motion.div>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: FileText,   label: t.requestCert,   desc: t.requestCertDesc,   action: () => doAction('request_cert'), key: 'request_cert' },
                { icon: RefreshCw,  label: t.renew,         desc: t.renewDesc,         action: () => doAction('renew'),        key: 'renew'        },
                { icon: Headphones, label: t.contactOffice, desc: t.contactOfficeDesc, action: () => setContactModal(true),    key: 'contact'      },
              ].map(({ icon: Icon, label, desc, action, key }, idx) => (
                <Card
                  key={idx}
                  onClick={action}
                  className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-stone-50/50 dark:hover:bg-stone-850/30 transition-all border border-transparent hover:border-amber-200/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <Icon className={`w-6 h-6 ${loadingAction === key ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{label}</p>
                    <p className="text-[10px] text-stone-450 dark:text-stone-550 leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Documents History List */}
            {documents.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.documents}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {documents.map((doc, idx) => (
                      <div key={doc.id} className="space-y-3">
                        <div className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-800 dark:text-stone-150">
                                {loc === 'ar' ? doc.nameAr : (doc.nameEn ?? doc.nameAr)}
                              </p>
                              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">{doc.docType} • {fmtDate(doc.docDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge className="bg-amber-500/10 text-[#D97706] border-0 text-[9px] font-bold shadow-none">
                              {t.statusAvailable}
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-sm border-0 flex items-center gap-1"
                              onClick={() => {
                                const content = `${loc === 'ar' ? doc.nameAr : (doc.nameEn ?? doc.nameAr)}\n${doc.docType} - ${fmtDate(doc.docDate)}`;
                                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${doc.nameAr}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                                showToast(loc === 'ar' ? 'تم تحميل المستند' : 'Document downloaded');
                              }}
                            >
                              <Download className="w-3.5 h-3.5" />
                              {t.download}
                            </Button>
                          </div>
                        </div>
                        {idx < documents.length - 1 && <Separator className="bg-stone-100 dark:bg-stone-800" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Timeline of events */}
            {timeline.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.timeline}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="relative">
                      <div
                        className="absolute top-2 bottom-2 w-0.5 bg-stone-100 dark:bg-stone-800"
                        style={{ [dir === 'rtl' ? 'right' : 'left']: '7px' }}
                      />
                      <div className="space-y-6">
                        {timeline.map((ev, idx) => {
                          const isDone = ev.status === 'done';
                          const dotColor = isDone ? 'bg-[#FABA19]' : 'bg-stone-300 dark:bg-stone-750';
                          return (
                            <div
                              key={ev.id}
                              className="relative"
                              style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '24px' }}
                            >
                              <div
                                className={`absolute top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-stone-900 shadow-sm ${dotColor}`}
                                style={{ [dir === 'rtl' ? 'right' : 'left']: '1px' }}
                              />
                              <div className="flex items-center justify-between gap-4 flex-wrap text-xs">
                                <div>
                                  <p className={`font-bold ${isDone ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400 dark:text-stone-500'}`}>
                                    {loc === 'ar' ? ev.eventAr : (ev.eventEn ?? ev.eventAr)}
                                  </p>
                                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">{fmtDate(ev.eventDate)}</p>
                                </div>
                                <Badge className={`border-0 shadow-none text-[9px] font-bold ${
                                  isDone
                                    ? 'bg-amber-500/10 text-[#D97706]'
                                    : 'bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-600'
                                }`}>
                                  {isDone ? t.statusDone : t.statusUpcoming}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
