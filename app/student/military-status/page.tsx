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
import {
  Shield, FileText, RefreshCw, Headphones, Download,
  CheckCircle2, Clock, AlertTriangle, CalendarDays, Hash, Building2,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الوضع العسكري', subtitle: 'متابعة حالة التأجيل والمستندات',
    currentStatus: 'الحالة الحالية', activeStatus: 'الحالة النشطة',
    defermentNum: 'رقم التأجيل', issueDate: 'تاريخ الإصدار',
    expiryDate: 'تاريخ الانتهاء', militaryOffice: 'مكتب التجنيد',
    nextAction: 'الإجراء التالي', renewBefore: 'يجب تجديد التأجيل قبل تاريخ',
    startRenewal: 'بدء إجراءات التجديد',
    requestCert: 'طلب شهادة تأجيل', requestCertDesc: 'احصل على شهادة تأجيل جديدة',
    renew: 'تجديد التأجيل', renewDesc: 'تجديد فترة التأجيل',
    contactOffice: 'التواصل مع المكتب', contactOfficeDesc: 'تواصل مع مكتب التجنيد',
    documents: 'المستندات', statusAvailable: 'متاح', download: 'تحميل',
    timeline: 'الجدول الزمني', statusDone: 'مكتمل', statusUpcoming: 'قادم',
    alert: 'تنبيه هام',
    alertText: 'يجب تجديد التأجيل قبل انتهاء صلاحيته بشهر على الأقل. عدم التجديد في الوقت المحدد قد يؤدي إلى مشاكل قانونية.',
    alertTip1: 'احتفظ بنسخة من شهادة التأجيل دائماً',
    alertTip2: 'تأكد من صحة البيانات في جميع المستندات',
    alertTip3: 'راجع مكتب شؤون الطلاب عند الحاجة للمساعدة',
    deferred: 'مؤجل للدراسة', exempt: 'معفى', completed: 'أتم الخدمة', pending: 'قيد المراجعة',
    noData: 'لا توجد بيانات عسكرية مسجلة',
  },
  en: {
    title: 'Military Status', subtitle: 'Track deferment status and documents',
    currentStatus: 'Current Status', activeStatus: 'Active Status',
    defermentNum: 'Deferment Number', issueDate: 'Issue Date',
    expiryDate: 'Expiry Date', militaryOffice: 'Military Office',
    nextAction: 'Next Action', renewBefore: 'Deferment must be renewed before',
    startRenewal: 'Start Renewal Process',
    requestCert: 'Request Certificate', requestCertDesc: 'Get a new deferment certificate',
    renew: 'Renew Deferment', renewDesc: 'Renew the deferment period',
    contactOffice: 'Contact Office', contactOfficeDesc: 'Contact the military recruitment office',
    documents: 'Documents', statusAvailable: 'Available', download: 'Download',
    timeline: 'Timeline', statusDone: 'Completed', statusUpcoming: 'Upcoming',
    alert: 'Important Notice',
    alertText: 'Deferment must be renewed at least one month before expiry. Failure to renew on time may lead to legal issues.',
    alertTip1: 'Always keep a copy of your deferment certificate',
    alertTip2: 'Verify all data in your documents is correct',
    alertTip3: 'Visit the student affairs office if you need assistance',
    deferred: 'Deferred for Study', exempt: 'Exempt', completed: 'Service Completed', pending: 'Pending Review',
    noData: 'No military records found',
  },
} as const;

type MilitaryStatusData = {
  status: string; defermentNumber: string | null;
  issueDate: string | null; expiryDate: string | null; militaryOffice: string | null;
};
type MilitaryDoc   = { id: number; nameAr: string; nameEn: string | null; docType: string; docDate: string; status: string };
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

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

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

  
  const p = th.primary; 

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

  useEffect(() => { fetchData(); }, [fetchData]);

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

  const item = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 160, damping: 20 } } };

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl font-bold text-sm"
            style={{ background: th.primary, color: dark ? '#1A1612' : '#fff' }}>
            <CheckCircle2 className="w-5 h-5" />{toast}
          </div>
        )}

        
        {contactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setContactModal(false)}>
            <div onClick={e => e.stopPropagation()}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', width: '100%', maxWidth: 420 }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${p}18`, border: `1px solid ${p}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Headphones className="w-5 h-5" style={{ color: p }} />
                </div>
                <p className="font-extrabold text-lg" style={{ color: th.text }}>{t.contactOffice}</p>
              </div>
              <textarea
                value={contactNote}
                onChange={e => setContactNote(e.target.value)}
                placeholder={loc === 'ar' ? 'اكتب رسالتك أو استفسارك هنا...' : 'Write your message or inquiry here...'}
                rows={4}
                style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.75rem', color: th.text, fontSize: 14, resize: 'none', outline: 'none', fontFamily: 'inherit' }}
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setContactModal(false)}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: `1px solid ${bdrL}`, background: 'transparent', color: th.textMuted, fontWeight: 700, cursor: 'pointer' }}>
                  {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button onClick={() => doAction('contact', contactNote)}
                  disabled={loadingAction === 'contact'}
                  style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: 'none', background: p, color: dark ? '#1A1612' : '#fff', fontWeight: 700, cursor: 'pointer', opacity: loadingAction === 'contact' ? 0.7 : 1 }}>
                  {loadingAction === 'contact' ? '...' : (loc === 'ar' ? 'إرسال' : 'Send')}
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
                  <Shield className="w-6 h-6" style={{ color: heroText }} />
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
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: `${p} transparent transparent transparent` }} />
          </div>
        ) : !militaryStatus ? (
          <Card style={{ background: card, border: `1px solid ${bdr}` }}>
            <CardContent className="flex items-center justify-center py-16">
              <p className="font-semibold" style={{ color: th.textMuted }}>{t.noData}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16 }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield className="w-5 h-5" style={{ color: p }} />
                    </div>
                    <CardTitle style={{ color: th.text }}>{t.currentStatus}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div style={{ width: 64, height: 64, borderRadius: 16, background: `${p}18`, border: `1px solid ${p}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle2 className="w-8 h-8" style={{ color: p }} />
                        </div>
                        <div>
                          <p className="font-extrabold text-lg" style={{ color: th.text }}>{statusLabel(militaryStatus.status)}</p>
                          <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}44`, marginTop: 4 }}>
                            {t.activeStatus}
                          </Badge>
                        </div>
                      </div>

                      <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }} className="space-y-3">
                        {[
                          { icon: Hash,         label: t.defermentNum,  value: militaryStatus.defermentNumber ?? '—', highlight: false },
                          { icon: CalendarDays, label: t.issueDate,      value: fmtDate(militaryStatus.issueDate),     highlight: false },
                          { icon: CalendarDays, label: t.expiryDate,     value: fmtDate(militaryStatus.expiryDate),    highlight: true  },
                          { icon: Building2,    label: t.militaryOffice, value: militaryStatus.militaryOffice ?? '—',  highlight: false },
                        ].map(({ icon: Icon, label, value, highlight }) => (
                          <div key={label} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" style={{ color: th.textMuted }} />
                              <span className="text-sm" style={{ color: th.textMuted }}>{label}</span>
                            </div>
                            <span className="font-extrabold text-sm" style={{ color: highlight ? p : th.text }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                    {nextUpcoming && (
                      <div>
                        <p className="font-extrabold mb-3" style={{ color: th.text }}>{t.nextAction}</p>
                        <div style={{ background: `${p}12`, border: `1px solid ${p}44`, borderRadius: 12, padding: '1rem' }}>
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: p }} />
                            <div>
                              <p className="font-extrabold text-sm" style={{ color: p }}>
                                {loc === 'ar' ? nextUpcoming.eventAr : (nextUpcoming.eventEn ?? nextUpcoming.eventAr)}
                              </p>
                              <p className="text-sm mt-1" style={{ color: th.text }}>
                                {t.renewBefore} {fmtDate(nextUpcoming.eventDate)}
                              </p>
                              <Button size="sm" className="mt-3 gap-2"
                                onClick={() => doAction('renew')}
                                disabled={loadingAction === 'renew'}
                                style={{ background: p, color: heroText, opacity: loadingAction === 'renew' ? 0.7 : 1 }}>
                                <RefreshCw className={`w-4 h-4 ${loadingAction === 'renew' ? 'animate-spin' : ''}`} />
                                {loadingAction === 'renew' ? '...' : t.startRenewal}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: FileText,   label: t.requestCert,   desc: t.requestCertDesc,   action: () => doAction('request_cert'), key: 'request_cert' },
                { icon: RefreshCw,  label: t.renew,         desc: t.renewDesc,         action: () => doAction('renew'),        key: 'renew'        },
                { icon: Headphones, label: t.contactOffice, desc: t.contactOfficeDesc, action: () => setContactModal(true),    key: 'contact'      },
              ].map(({ icon: Icon, label, desc, action, key }) => (
                <motion.div key={label} variants={item} initial="hidden" animate="visible">
                  <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, cursor: 'pointer' }}
                    className="hover:opacity-80 transition-opacity h-full"
                    onClick={action}>
                    <CardContent className="pt-6 text-center">
                      <div style={{ width: 56, height: 56, borderRadius: 14, background: `${p}18`, border: `1px solid ${p}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                        <Icon className={`w-7 h-7 ${loadingAction === key ? 'animate-spin' : ''}`} style={{ color: p }} />
                      </div>
                      <p className="font-extrabold mb-1" style={{ color: th.text }}>{label}</p>
                      <p className="text-sm" style={{ color: th.textMuted }}>{desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            
            {documents.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                  <CardHeader style={{ background: iconBg, borderBottom: `1px solid ${bdrL}` }} className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText className="w-5 h-5" style={{ color: p }} />
                      </div>
                      <CardTitle style={{ color: th.text }}>{t.documents}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    {documents.map((doc, i) => (
                      <div key={doc.id}>
                        <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}
                          className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${p}18`, border: `1px solid ${p}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <FileText className="w-5 h-5" style={{ color: p }} />
                            </div>
                            <div>
                              <p className="font-extrabold text-sm" style={{ color: th.text }}>
                                {loc === 'ar' ? doc.nameAr : (doc.nameEn ?? doc.nameAr)}
                              </p>
                              <p className="text-xs" style={{ color: th.textMuted }}>{doc.docType} • {fmtDate(doc.docDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge style={{ background: `${p}18`, color: p, border: `1px solid ${p}33` }}>
                              {t.statusAvailable}
                            </Badge>
                            <Button size="sm" className="gap-1.5"
                              onClick={() => {
                                const content = `${loc === 'ar' ? doc.nameAr : (doc.nameEn ?? doc.nameAr)}\n${doc.docType} - ${fmtDate(doc.docDate)}`;
                                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url; a.download = `${doc.nameAr}.txt`; a.click();
                                URL.revokeObjectURL(url);
                                showToast(loc === 'ar' ? 'تم تحميل المستند' : 'Document downloaded');
                              }}
                              style={{ background: p, color: heroText }}>
                              <Download className="w-3.5 h-3.5" />
                              {t.download}
                            </Button>
                          </div>
                        </div>
                        {i < documents.length - 1 && <Separator className="mt-3" style={{ background: bdrL }} />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            
            {timeline.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                  <CardHeader style={{ background: iconBg, borderBottom: `1px solid ${bdrL}` }} className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Clock className="w-5 h-5" style={{ color: p }} />
                      </div>
                      <CardTitle style={{ color: th.text }}>{t.timeline}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="relative">
                      <div style={{ position: 'absolute', [dir === 'rtl' ? 'right' : 'left']: 7, top: 8, bottom: 8, width: 2, background: bdrL }} />
                      <div className="space-y-5">
                        {timeline.map(ev => {
                          const isDone = ev.status === 'done';
                          
                          const dotColor  = isDone ? p : th.textMuted;
                          const textColor = isDone ? th.text : th.textMuted;
                          const offset    = dir === 'rtl' ? { paddingRight: '1.75rem' } : { paddingLeft: '1.75rem' };
                          return (
                            <div key={ev.id} className="relative flex items-start gap-3" style={offset}>
                              <div style={{ position: 'absolute', [dir === 'rtl' ? 'right' : 'left']: 0, top: 4, width: 16, height: 16, borderRadius: '50%', background: dotColor, border: `2px solid ${card}`, boxShadow: `0 0 0 2px ${dotColor}` }} />
                              <div className="flex-1 flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-extrabold text-sm" style={{ color: textColor }}>
                                    {loc === 'ar' ? ev.eventAr : (ev.eventEn ?? ev.eventAr)}
                                  </p>
                                  <p className="text-xs mt-0.5" style={{ color: th.textMuted }}>{fmtDate(ev.eventDate)}</p>
                                </div>
                                <Badge style={{
                                  background: isDone ? `${p}18` : `${th.textMuted}18`,
                                  color: isDone ? p : th.textMuted,
                                  border: `1px solid ${isDone ? p : th.textMuted}33`,
                                  flexShrink: 0,
                                }}>
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
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
