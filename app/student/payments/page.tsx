'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  CreditCard, Receipt, Clock, BarChart2,
  Landmark, Smartphone, Wallet, MapPin, Calendar,
  CheckCircle2, Info, X, Printer, FileText,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'المدفوعات والرسوم', subtitle: 'إدارة المدفوعات والمصروفات الدراسية',
    totalPaid: 'إجمالي المدفوع', requiredSemester: 'رسوم الفصل',
    remaining: 'المتبقي', paymentsCount: 'عدد الدفعات',
    paid: 'مدفوع', required: 'مطلوب', balance: 'متبقي', count: 'دفعة',
    egp: 'جنيه مصري',
    overallStatus: 'حالة الدفع الإجمالية', progress: 'تقدم المدفوعات للبرنامج الكامل',
    completed: 'مكتمل', totalFees: 'إجمالي المصروفات', totalPaidLabel: 'تم السداد',
    tabOverview: 'نظرة عامة', tabHistory: 'سجل المدفوعات', tabMethods: 'طرق الدفع',
    newPayment: 'دفع جديد', printReceipt: 'طباعة إيصال', financialReport: 'تقرير مالي',
    payTuition: 'سداد المصروفات الدراسية', printDesc: 'طباعة إيصالات الدفع', reportDesc: 'تحميل التقرير المالي',
    upcoming: 'دفعات قادمة', sem2Fees: 'مصروفات الفصل الدراسي القادم',
    paymentHistory: 'سجل المدفوعات', tuition: 'مصروفات دراسية', receiptNo: 'إيصال رقم:',
    paymentMethods: 'طرق الدفع المتاحة',
    bankTransfer: 'التحويل البنكي', bankDesc: 'حول المبلغ إلى حساب الجامعة',
    bankName: 'البنك:', bankAccount: 'رقم الحساب:', bankIban: 'IBAN:',
    bankNameVal: 'البنك الأهلي المصري', bankAccountVal: '123456789', bankIbanVal: 'EG380002...',
    ePayment: 'الدفع الإلكتروني', ePayDesc: 'ادفع عبر المحافظ الإلكترونية',
    fawry: 'فوري', vodafone: 'فودافون كاش', orange: 'أورانج موني',
    cashPayment: 'الدفع النقدي', cashDesc: 'ادفع في خزينة الجامعة',
    cashLocation: 'مبنى الإدارة - الدور الأول', cashHours: '9 صباحاً - 3 مساءً', cashDays: 'الأحد - الخميس',
    notes: 'ملاحظات هامة',
    note1: 'يجب سداد المصروفات قبل بداية كل فصل دراسي',
    note2: 'يمكن التقسيط على دفعتين خلال الفصل الدراسي',
    note3: 'عدم السداد في الموعد المحدد يؤدي إلى إيقاف التسجيل',
    note4: 'احتفظ بإيصالات الدفع لحين التخرج',
    note5: 'للاستفسارات: اتصل بالشؤون المالية - تحويلة 123',
    modalTitle: 'دفع جديد', modalDesc: 'اختر طريقة الدفع المناسبة',
    payElectronic: 'الدفع الإلكتروني', payBank: 'التحويل البنكي', payCash: 'الدفع النقدي',
    cancel: 'إلغاء', payConfirm: 'تم توجيهك لبوابة الدفع',
    printConfirm: 'جارٍ تحضير الإيصال...', reportConfirm: 'جارٍ تحضير التقرير...',
    methodBankTransfer: 'تحويل بنكي', methodFawry: 'فوري', methodVodafone: 'فودافون كاش',
    methodCash: 'نقدي', methodCard: 'بطاقة',
  },
  en: {
    title: 'Payments & Fees', subtitle: 'Manage tuition and academic fees',
    totalPaid: 'Total Paid', requiredSemester: 'Semester Fee',
    remaining: 'Remaining', paymentsCount: 'Payments',
    paid: 'Paid', required: 'Required', balance: 'Balance', count: 'payment',
    egp: 'EGP',
    overallStatus: 'Overall Payment Status', progress: 'Program payment progress',
    completed: 'Completed', totalFees: 'Total Fees', totalPaidLabel: 'Amount Paid',
    tabOverview: 'Overview', tabHistory: 'Payment History', tabMethods: 'Payment Methods',
    newPayment: 'New Payment', printReceipt: 'Print Receipt', financialReport: 'Financial Report',
    payTuition: 'Pay tuition fees', printDesc: 'Print payment receipts', reportDesc: 'Download financial report',
    upcoming: 'Upcoming Payments', sem2Fees: 'Next Semester Tuition',
    paymentHistory: 'Payment History', tuition: 'Tuition', receiptNo: 'Receipt No:',
    paymentMethods: 'Available Payment Methods',
    bankTransfer: 'Bank Transfer', bankDesc: 'Transfer to university account',
    bankName: 'Bank:', bankAccount: 'Account No:', bankIban: 'IBAN:',
    bankNameVal: 'National Bank of Egypt', bankAccountVal: '123456789', bankIbanVal: 'EG380002...',
    ePayment: 'E-Payment', ePayDesc: 'Pay via digital wallets',
    fawry: 'Fawry', vodafone: 'Vodafone Cash', orange: 'Orange Money',
    cashPayment: 'Cash Payment', cashDesc: 'Pay at university cashier',
    cashLocation: 'Admin Building - 1st Floor', cashHours: '9 AM - 3 PM', cashDays: 'Sun - Thu',
    notes: 'Important Notes',
    note1: 'Fees must be paid before each semester starts',
    note2: 'Installments available in two payments per semester',
    note3: 'Late payment results in registration suspension',
    note4: 'Keep receipts until graduation',
    note5: 'Inquiries: contact Finance Dept - ext. 123',
    modalTitle: 'New Payment', modalDesc: 'Choose a payment method',
    payElectronic: 'E-Payment', payBank: 'Bank Transfer', payCash: 'Cash Payment',
    cancel: 'Cancel', payConfirm: 'Redirecting to payment portal',
    printConfirm: 'Preparing receipt...', reportConfirm: 'Preparing report...',
    methodBankTransfer: 'Bank Transfer', methodFawry: 'Fawry', methodVodafone: 'Vodafone Cash',
    methodCash: 'Cash', methodCard: 'Card',
  },
} as const;

type Tab = 'overview' | 'history' | 'methods';

interface PaymentItem {
  id: number; amount: number; paymentDate: string;
  paymentMethod: string; paymentType: string;
  semesterYear: string | null; receiptNumber: string; status: string;
}
interface Summary {
  totalPaid: number; tuitionPerSem: number; totalRequired: number;
  remaining: number; count: number; programNameAr: string; programNameEn: string;
}

export default function PaymentsPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th = dark ? darkTheme : theme;
  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';

  const [tab, setTab] = useState<Tab>('overview');
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState('');
  const [payingMethod, setPayingMethod] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchData = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/student/payments?userId=${user.id}`);
      const json = await res.json();
      setPayments(json.payments ?? []);
      setSummary(json.summary ?? null);
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  
  const handlePay = useCallback(async (method: string) => {
    if (!user || !summary) return;
    setPayingMethod(method);
    try {
      const res = await fetch('/api/student/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount: summary.tuitionPerSem,
          paymentMethod: method,
          paymentType: 'tuition',
          semesterYear: new Date().getFullYear() + '/' + (new Date().getFullYear() + 1),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        showToast(loc === 'ar' ? 'تم تسجيل الدفعة بنجاح ✓' : 'Payment recorded successfully ✓');
        await fetchData();
      }
    } finally {
      setPayingMethod('');
    }
  }, [user, summary, loc, fetchData]);

  
  const handlePrintReceipt = useCallback(() => {
    if (!payments.length || !user) return;
    const latest = payments[0];
    const html = `<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8"/><title>إيصال دفع</title>
<style>
  @page { size: A5; margin: 20mm; }
  * { margin:0; padding:0; box-sizing:border-box; font-family: Cairo, Arial, sans-serif; }
  body { background:#fff; color:#2F2415; }
  .header { text-align:center; border-bottom:3px solid #D4A843; padding-bottom:12px; margin-bottom:16px; }
  .logo { font-size:22px; font-weight:900; color:#D4A843; }
  .sub { font-size:12px; color:#7C6943; margin-top:4px; }
  .title { font-size:16px; font-weight:800; margin:12px 0 4px; color:#2F2415; }
  .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F3EBDD; font-size:13px; }
  .label { color:#7C6943; }
  .val { font-weight:700; color:#2F2415; }
  .amount { font-size:28px; font-weight:900; color:#D4A843; text-align:center; margin:16px 0; }
  .footer { text-align:center; margin-top:20px; font-size:11px; color:#7C6943; border-top:1px solid #F3EBDD; padding-top:12px; }
  .stamp { display:inline-block; border:2px solid #22c55e; color:#22c55e; border-radius:8px; padding:4px 16px; font-weight:800; font-size:14px; margin-top:8px; }
</style></head>
<body>
<div class="header">
  <div class="logo">جامعة أسيوط الأهلية</div>
  <div class="sub">Assiut National University — إيصال دفع رسمي</div>
</div>
<div class="title">إيصال دفع رسوم دراسية</div>
<div class="row"><span class="label">رقم الإيصال</span><span class="val">${latest.receiptNumber}</span></div>
<div class="row"><span class="label">اسم الطالب</span><span class="val">${user.firstName} ${user.lastName}</span></div>
<div class="row"><span class="label">رقم الطالب</span><span class="val">${user.studentNumber ?? '—'}</span></div>
<div class="row"><span class="label">تاريخ الدفع</span><span class="val">${new Date(latest.paymentDate).toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' })}</span></div>
<div class="row"><span class="label">طريقة الدفع</span><span class="val">${latest.paymentMethod}</span></div>
<div class="row"><span class="label">الفصل الدراسي</span><span class="val">${latest.semesterYear ?? '—'}</span></div>
<div class="amount">${latest.amount.toLocaleString()} جنيه مصري</div>
<div style="text-align:center"><span class="stamp">✓ مدفوع</span></div>
<div class="footer">هذا الإيصال وثيقة رسمية — احتفظ به حتى التخرج<br/>للاستفسار: الشؤون المالية — تحويلة 123</div>
<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500);}<\/script>
</body></html>`;
    const win = window.open('', '_blank', 'width=500,height=700,toolbar=0,menubar=0');
    if (win) { win.document.write(html); win.document.close(); }
  }, [payments, user]);

  
  const handleReport = useCallback(() => {
    if (!user || !summary) return;
    const lines = [
      'التقرير المالي — جامعة أسيوط الأهلية',
      '='.repeat(40),
      `الطالب: ${user.firstName} ${user.lastName}`,
      `رقم الطالب: ${user.studentNumber ?? '—'}`,
      `البرنامج: ${summary.programNameAr}`,
      '',
      'ملخص المدفوعات:',
      '-'.repeat(30),
      `إجمالي المدفوع: ${summary.totalPaid.toLocaleString()} جنيه`,
      `إجمالي المطلوب: ${summary.totalRequired.toLocaleString()} جنيه`,
      `المتبقي: ${summary.remaining.toLocaleString()} جنيه`,
      `عدد الدفعات: ${summary.count}`,
      '',
      'سجل المدفوعات:',
      '-'.repeat(30),
      ...payments.map((p, i) =>
        `${i + 1}. ${new Date(p.paymentDate).toLocaleDateString('ar-EG')} | ${p.amount.toLocaleString()} جنيه | ${p.paymentMethod} | ${p.receiptNumber}`
      ),
      '',
      `تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}`,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${user.studentNumber ?? user.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(loc === 'ar' ? 'تم تحميل التقرير المالي' : 'Financial report downloaded');
  }, [user, summary, payments, loc]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const methodLabel = (method: string) => {
    const map: Record<string, string> = {
      bank_transfer: t.methodBankTransfer,
      fawry: t.methodFawry,
      vodafone_cash: t.methodVodafone,
      cash: t.methodCash,
      card: t.methodCard,
    };
    return map[method] ?? method;
  };

  if (loading || !user) return null;
  if (fetching) return (
    <DashboardLayout user={user} role="student">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: th.primary, borderTopColor: 'transparent' }} />
      </div>
    </DashboardLayout>
  );

  const pct = summary && summary.totalRequired > 0
    ? Math.min((summary.totalPaid / summary.totalRequired) * 100, 100)
    : 0;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: t.tabOverview },
    { key: 'history',  label: t.tabHistory },
    { key: 'methods',  label: t.tabMethods },
  ];

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl font-bold text-sm shadow-lg"
            style={{ background: th.primary, color: heroText }}>{toast}</div>
        )}

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>{user.firstName} {user.lastName} • {t.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: CreditCard, label: t.totalPaid,        value: (summary?.totalPaid ?? 0).toLocaleString(),      badge: t.paid },
            { icon: Receipt,    label: t.requiredSemester, value: (summary?.tuitionPerSem ?? 0).toLocaleString(),  badge: t.required },
            { icon: Clock,      label: t.remaining,        value: (summary?.remaining ?? 0).toLocaleString(),      badge: t.balance },
            { icon: BarChart2,  label: t.paymentsCount,    value: String(summary?.count ?? 0),                     badge: t.count },
          ].map(({ icon: Icon, label, value, badge }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: `${i * 60}ms` }}>
              <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem' }}>
                <div className="flex items-center justify-between mb-3">
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                    style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
                    {badge}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: th.textMuted }}>{label}</p>
                <p className="text-2xl font-extrabold" style={{ color: th.text }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: th.textMuted }}>{t.egp}</p>
              </div>
            </motion.div>
          ))}
        </div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: heroBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="text-lg font-extrabold" style={{ color: heroText }}>{t.overallStatus}</p>
                <p className="text-sm opacity-75" style={{ color: heroText }}>{t.progress}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold" style={{ color: heroText }}>{pct.toFixed(1)}%</p>
                <p className="text-sm opacity-75" style={{ color: heroText }}>{t.completed}</p>
              </div>
            </div>
            <div className="h-3 rounded-full mb-4" style={{ background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)' }}>
              <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, background: dark ? th.primary : 'rgba(255,255,255,0.8)' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.totalFees,      value: `${(summary?.totalRequired ?? 0).toLocaleString()} ${t.egp}` },
                { label: t.totalPaidLabel, value: `${(summary?.totalPaid ?? 0).toLocaleString()} ${t.egp}` },
              ].map(r => (
                <div key={r.label} style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.1)', borderRadius: 12, padding: '0.875rem 1rem' }}>
                  <p className="text-sm opacity-75 mb-1" style={{ color: heroText }}>{r.label}</p>
                  <p className="font-extrabold" style={{ color: heroText }}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '0.625rem' }} className="flex gap-2 flex-wrap">
          {tabs.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className="px-5 py-2 rounded-xl font-extrabold text-sm transition-all"
              style={{ background: tab === key ? th.primary : iconBg, color: tab === key ? '#1A1612' : th.textMuted, border: `1px solid ${tab === key ? th.primary : bdrL}` }}>
              {label}
            </button>
          ))}
        </div>

        
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: CreditCard, title: t.newPayment,      desc: t.payTuition,   action: () => setShowModal(true) },
                { icon: Printer,    title: t.printReceipt,    desc: t.printDesc,    action: () => handlePrintReceipt() },
                { icon: FileText,   title: t.financialReport, desc: t.reportDesc,   action: () => handleReport() },
              ].map(({ icon: Icon, title, desc, action }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: `${i * 60}ms` }}>
                  <button onClick={action} className="w-full text-center transition-all"
                    style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = th.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = bdr; }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <Icon className="w-7 h-7" style={{ color: th.primary }} />
                    </div>
                    <p className="font-extrabold mb-1" style={{ color: th.text }}>{title}</p>
                    <p className="text-sm" style={{ color: th.textMuted }}>{desc}</p>
                  </button>
                </motion.div>
              ))}
            </div>

            
            {summary && summary.remaining > 0 && (
              <div style={{ background: `${th.primary}11`, border: `1px solid ${th.primary}33`, borderRadius: 16, padding: '1.25rem' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${th.primary}22`, border: `1px solid ${th.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Info className="w-5 h-5" style={{ color: th.primary }} />
                  </div>
                  <p className="font-extrabold" style={{ color: th.primary }}>{t.upcoming}</p>
                </div>
                <div style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}
                  className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-extrabold" style={{ color: th.text }}>{t.sem2Fees}</p>
                    <p className="text-sm flex items-center gap-2 mt-1" style={{ color: th.textMuted }}>
                      <Calendar className="w-4 h-4" style={{ color: th.primary }} />
                      {loc === 'ar' ? 'قبل بداية الفصل القادم' : 'Before next semester starts'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold" style={{ color: th.primary }}>{summary.tuitionPerSem.toLocaleString()}</p>
                    <p className="text-sm" style={{ color: th.textMuted }}>{t.egp}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        
        {tab === 'history' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
            <p className="text-lg font-extrabold mb-4" style={{ color: th.text }}>{t.paymentHistory}</p>
            {payments.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: th.textMuted }}>
                {loc === 'ar' ? 'لا توجد مدفوعات مسجلة' : 'No payments recorded'}
              </p>
            ) : (
              <div className="space-y-3">
                {payments.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: `${i * 50}ms` }}>
                    <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 14, padding: '1rem 1.25rem' }}
                      className="flex items-center justify-between gap-4 flex-wrap"
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = th.primary; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = bdrL; }}>
                      <div className="flex items-center gap-4 min-w-0">
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${th.primary}22`, border: `1px solid ${th.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle2 className="w-6 h-6" style={{ color: th.primary }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold" style={{ color: th.text }}>{p.semesterYear ?? `Payment ${i + 1}`}</p>
                          <p className="text-sm flex items-center gap-2 mt-0.5" style={{ color: th.textMuted }}>
                            <Calendar className="w-3.5 h-3.5" style={{ color: th.primary }} />
                            {new Date(p.paymentDate).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: th.textMuted }}>{t.receiptNo} {p.receiptNumber}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-extrabold" style={{ color: th.primary }}>{p.amount.toLocaleString()}</p>
                        <p className="text-xs" style={{ color: th.textMuted }}>{t.egp}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-extrabold"
                          style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
                          {methodLabel(p.paymentMethod)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        
        {tab === 'methods' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Landmark className="w-7 h-7" style={{ color: th.primary }} />
                  </div>
                  <p className="text-lg font-extrabold mb-1" style={{ color: th.text }}>{t.bankTransfer}</p>
                  <p className="text-sm mb-4" style={{ color: th.textMuted }}>{t.bankDesc}</p>
                  <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem' }} className="space-y-2 text-sm">
                    {[[t.bankName, t.bankNameVal], [t.bankAccount, t.bankAccountVal], [t.bankIban, t.bankIbanVal]].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span style={{ color: th.textMuted }}>{k}</span>
                        <span className="font-extrabold" style={{ color: th.text }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: '60ms' }}>
                <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Smartphone className="w-7 h-7" style={{ color: th.primary }} />
                  </div>
                  <p className="text-lg font-extrabold mb-1" style={{ color: th.text }}>{t.ePayment}</p>
                  <p className="text-sm mb-4" style={{ color: th.textMuted }}>{t.ePayDesc}</p>
                  <div className="space-y-2">
                    {[
                      { icon: Smartphone, name: t.fawry,    method: 'fawry' },
                      { icon: Wallet,     name: t.vodafone, method: 'vodafone_cash' },
                      { icon: CreditCard, name: t.orange,   method: 'online' },
                    ].map(({ icon: Icon, name, method }) => (
                      <button key={name} onClick={() => handlePay(method)}
                        disabled={!!payingMethod}
                        style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', cursor: payingMethod ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
                        onMouseEnter={e => { if (!payingMethod) e.currentTarget.style.borderColor = th.primary; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = bdrL; }}>
                        <Icon className="w-5 h-5" style={{ color: th.primary }} />
                        <span className="font-extrabold" style={{ color: th.text }}>{payingMethod === method ? '...' : name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: '120ms' }}>
                <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Wallet className="w-7 h-7" style={{ color: th.primary }} />
                  </div>
                  <p className="text-lg font-extrabold mb-1" style={{ color: th.text }}>{t.cashPayment}</p>
                  <p className="text-sm mb-4" style={{ color: th.textMuted }}>{t.cashDesc}</p>
                  <div style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem' }} className="space-y-2 text-sm">
                    {[
                      { icon: MapPin,    val: t.cashLocation },
                      { icon: Clock,     val: t.cashHours },
                      { icon: Calendar,  val: t.cashDays },
                    ].map(({ icon: Icon, val }, i) => (
                      <div key={i} className="flex items-center gap-2" style={{ color: th.text }}>
                        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: th.primary }} />
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        )}

      </div>

      
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 20, width: '100%', maxWidth: 420, padding: '2rem' }}
              dir={dir}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CreditCard className="w-6 h-6" style={{ color: th.primary }} />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: th.text }}>{t.modalTitle}</p>
                    <p className="text-sm" style={{ color: th.textMuted }}>{t.modalDesc}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)}
                  style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: th.textMuted, cursor: 'pointer' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  { icon: Smartphone, label: t.payElectronic, method: 'online' },
                  { icon: Landmark,   label: t.payBank,       method: 'bank_transfer' },
                  { icon: Wallet,     label: t.payCash,       method: 'cash' },
                ].map(({ icon: Icon, label, method }) => (
                  <button key={label}
                    onClick={() => handlePay(method)}
                    disabled={!!payingMethod}
                    className="w-full py-3 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all"
                    style={{ background: iconBg, color: th.primary, border: `1px solid ${bdrL}`, cursor: payingMethod ? 'wait' : 'pointer', opacity: payingMethod && payingMethod !== method ? 0.5 : 1 }}
                    onMouseEnter={e => { if (!payingMethod) e.currentTarget.style.borderColor = th.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = bdrL; }}>
                    <Icon className="w-5 h-5" />
                    {payingMethod === method ? '...' : label}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl font-extrabold text-sm"
                style={{ background: iconBg, color: th.textMuted, border: `1px solid ${bdrL}`, cursor: 'pointer' }}>
                {t.cancel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
