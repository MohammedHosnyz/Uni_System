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
import {
  CreditCard, Receipt, Clock, BarChart2,
  Landmark, Smartphone, Wallet, MapPin, Calendar,
  CheckCircle2, Info, X, Printer, FileText, ChevronRight,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'المدفوعات والرسوم الدراسية',
    subtitle: 'إدارة وتتبع الرسوم والمستندات المالية',
    totalPaid: 'إجمالي السداد',
    requiredSemester: 'رسوم الفصل الدراسي',
    remaining: 'المتبقي المستحق',
    paymentsCount: 'عمليات السداد',
    paid: 'مسدد',
    required: 'مطلوب',
    balance: 'مستحق',
    count: 'دفعة',
    egp: 'جنيه مصري',
    overallStatus: 'الحالة المالية الإجمالية',
    progress: 'نسبة سداد الرسوم المطلوبة للتخرج',
    completed: 'مكتمل',
    totalFees: 'إجمالي الرسوم المطلوبة',
    totalPaidLabel: 'إجمالي ما تم سداده',
    tabOverview: 'نظرة عامة',
    tabHistory: 'سجل المدفوعات',
    tabMethods: 'طرق الدفع المتاحة',
    newPayment: 'دفع الرسوم الآن',
    printReceipt: 'طباعة الإيصال الأخير',
    financialReport: 'كشف الحساب المالي',
    payTuition: 'سداد الرسوم الدراسية إلكترونياً',
    printDesc: 'عرض وطباعة إيصال السداد الأخير',
    reportDesc: 'تحميل كشف حساب مالي مفصل للبرنامج',
    upcoming: 'رسوم مستحقة قادمة',
    sem2Fees: 'رسوم الفصل الدراسي القادم المتوقعة',
    paymentHistory: 'سجل العمليات المالية',
    tuition: 'مصروفات دراسية',
    receiptNo: 'إيصال رقم:',
    paymentMethods: 'طرق سداد الرسوم المعتمدة',
    bankTransfer: 'التحويل البنكي المباشر',
    bankDesc: 'التحويل البنكي المباشر لحساب الجامعة الرسمي',
    bankName: 'اسم البنك:',
    bankAccount: 'رقم الحساب:',
    bankIban: 'IBAN الدولي:',
    bankNameVal: 'البنك الأهلي المصري',
    bankAccountVal: '123456789',
    bankIbanVal: 'EG380002...',
    ePayment: 'المحافظ الإلكترونية وفوري',
    ePayDesc: 'السداد عبر خدمات الدفع الإلكتروني المعتمدة',
    fawry: 'فوري (كود دفع الجامعة)',
    vodafone: 'فودافون كاش (Vodafone Cash)',
    orange: 'أورانج موني (Orange Money)',
    cashPayment: 'الإيداع النقدي المباشر',
    cashDesc: 'السداد نقداً في خزينة مبنى الإدارة بالجامعة',
    cashLocation: 'مبنى إدارة الجامعة - الخزينة الرئيسية',
    cashHours: '9:00 صباحاً - 3:00 مساءً',
    cashDays: 'من الأحد إلى الخميس',
    notes: 'تنبيهات مالية هامة',
    note1: 'يجب سداد الرسوم الدراسية المقررة قبل بداية كل فصل دراسي بوقت كافٍ لتفادي إيقاف القيد.',
    note2: 'تتيح الجامعة نظام تقسيط الرسوم على دفعتين خلال الفصل الدراسي بعد تقديم طلب للشؤون المالية.',
    note3: 'التأخر في سداد الرسوم المستحقة عن المواعيد المقررة يؤدي تلقائياً إلى حظر التسجيل الأكاديمي.',
    note4: 'يرجى الاحتفاظ بجميع إيصالات الدفع الرسمية المطبوعة كإثبات سداد حتى التخرج.',
    note5: 'لأي استفسارات مالية، يرجى مراجعة إدارة الشؤون المالية بمبنى الإدارة (تحويلة 123).',
    modalTitle: 'عملية دفع جديدة',
    modalDesc: 'اختر طريقة سداد الرسوم المناسبة للمتابعة',
    payElectronic: 'بوابة الدفع الإلكتروني',
    payBank: 'تحويل بنكي / إيداع',
    payCash: 'سداد نقدي بالخزينة',
    cancel: 'إلغاء العملية',
    payConfirm: 'جاري توجيهك لبوابة السداد الإلكتروني المعتمدة...',
    printConfirm: 'جاري إعداد الإيصال المالي...',
    reportConfirm: 'جاري إعداد كشف الحساب المالي...',
    methodBankTransfer: 'تحويل بنكي',
    methodFawry: 'فوري',
    methodVodafone: 'فودافون كاش',
    methodCash: 'نقدي',
    methodCard: 'بطاقة ائتمانية',
  },
  en: {
    title: 'Payments & Tuition Fees',
    subtitle: 'Manage and track academic tuition fees and financial records',
    totalPaid: 'Total Paid Amount',
    requiredSemester: 'Semester Fees',
    remaining: 'Outstanding Balance',
    paymentsCount: 'Completed Payments',
    paid: 'Paid',
    required: 'Required',
    balance: 'Outstanding',
    count: 'payment',
    egp: 'EGP',
    overallStatus: 'Overall Financial Status',
    progress: 'Tuition fees progress towards graduation requirement',
    completed: 'Paid',
    totalFees: 'Total Program Fees',
    totalPaidLabel: 'Total Amount Paid',
    tabOverview: 'Financial Overview',
    tabHistory: 'Payment History',
    tabMethods: 'Approved Methods',
    newPayment: 'Pay Tuition Fees',
    printReceipt: 'Print Last Receipt',
    financialReport: 'Financial Statement',
    payTuition: 'Pay semester tuition fees online',
    printDesc: 'View and print your latest payment receipt',
    reportDesc: 'Download a detailed financial statement for your program',
    upcoming: 'Upcoming Due Fees',
    sem2Fees: 'Expected Next Semester Tuition',
    paymentHistory: 'Financial Transaction History',
    tuition: 'Tuition Fee',
    receiptNo: 'Receipt No:',
    paymentMethods: 'Approved Payment Options',
    bankTransfer: 'Direct Bank Transfer',
    bankDesc: 'Transfer directly to the official university bank account',
    bankName: 'Bank:',
    bankAccount: 'Account No:',
    bankIban: 'IBAN Code:',
    bankNameVal: 'National Bank of Egypt',
    bankAccountVal: '123456789',
    bankIbanVal: 'EG380002...',
    ePayment: 'Digital Wallets & Fawry',
    ePayDesc: 'Pay instantly via certified electronic payment gateways',
    fawry: 'Fawry (University merchant code)',
    vodafone: 'Vodafone Cash Wallet',
    orange: 'Orange Money Wallet',
    cashPayment: 'Direct Cash Deposit',
    cashDesc: 'Pay directly at the university administration treasury office',
    cashLocation: 'Administration Building - Central Treasury',
    cashHours: '9:00 AM - 3:00 PM',
    cashDays: 'Sunday to Thursday',
    notes: 'Important Financial Notes',
    note1: 'Tuition fees must be paid before the start of each semester to avoid suspension of academic registration.',
    note2: 'Installment options are available (split in two payments) upon submitting a request to the Finance Department.',
    note3: 'Late payment of outstanding balances will result in immediate academic registration blocks.',
    note4: 'Please keep all official printed payment receipts as proof of payment until your official graduation.',
    note5: 'For any financial inquiries, please visit the Finance Department in the Admin Building (Ext. 123).',
    modalTitle: 'New Tuition Payment',
    modalDesc: 'Select an approved payment method to proceed',
    payElectronic: 'Online Credit Card',
    payBank: 'Bank Transfer / Deposit',
    payCash: 'Cash at University Treasury',
    cancel: 'Cancel Process',
    payConfirm: 'Redirecting to secure online payment portal...',
    printConfirm: 'Generating payment receipt...',
    reportConfirm: 'Generating financial statement...',
    methodBankTransfer: 'Bank Transfer',
    methodFawry: 'Fawry',
    methodVodafone: 'Vodafone Cash',
    methodCash: 'Cash',
    methodCard: 'Credit Card',
  },
} as const;

type Tab = 'overview' | 'history' | 'methods';

interface PaymentItem {
  id: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentType: string;
  semesterYear: string | null;
  receiptNumber: string;
  status: string;
}

interface Summary {
  totalPaid: number;
  tuitionPerSem: number;
  totalRequired: number;
  remaining: number;
  count: number;
  programNameAr: string;
  programNameEn: string;
}

export default function PaymentsPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [tab, setTab] = useState<Tab>('overview');
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState('');
  const [payingMethod, setPayingMethod] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        showToast(loc === 'ar' ? 'تم تسجيل عملية الدفع بنجاح ✓' : 'Payment recorded successfully ✓');
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
  body { background:#fff; color:#1C1917; }
  .header { text-align:center; border-bottom:3px solid #FABA19; padding-bottom:12px; margin-bottom:16px; }
  .logo { font-size:22px; font-weight:900; color:#D97706; }
  .sub { font-size:12px; color:#78716C; margin-top:4px; }
  .title { font-size:16px; font-weight:800; margin:12px 0 4px; color:#1C1917; }
  .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F5F0E8; font-size:13px; }
  .label { color:#78716C; }
  .val { font-weight:700; color:#1C1917; }
  .amount { font-size:28px; font-weight:900; color:#D97706; text-align:center; margin:16px 0; }
  .footer { text-align:center; margin-top:20px; font-size:11px; color:#78716C; border-top:1px solid #F5F0E8; padding-top:12px; }
  .stamp { display:inline-block; border:2px solid #10b981; color:#10b981; border-radius:8px; padding:4px 16px; font-weight:800; font-size:14px; margin-top:8px; }
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
    if (win) {
      win.document.write(html);
      win.document.close();
    }
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
    showToast(loc === 'ar' ? 'تم تحميل كشف الحساب المالي' : 'Financial statement downloaded');
  }, [user, summary, payments, loc]);

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

  if (fetching) {
    return (
      <DashboardLayout user={user} role="student">
        <div className="flex items-center justify-center h-64 bg-stone-50/10">
          <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

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
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl font-bold text-xs bg-[#FABA19] text-white shadow-lg">
            {toast}
          </div>
        )}

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{user.firstName} {user.lastName} • {t.subtitle}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Financial Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: CreditCard, label: t.totalPaid,        value: (summary?.totalPaid ?? 0).toLocaleString(),      badge: t.paid, colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30' },
            { icon: Receipt,    label: t.requiredSemester, value: (summary?.tuitionPerSem ?? 0).toLocaleString(),  badge: t.required, colorClass: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-955/20 dark:border-blue-900/30' },
            { icon: Clock,      label: t.remaining,        value: (summary?.remaining ?? 0).toLocaleString(),      badge: t.balance, colorClass: 'text-[#D97706] bg-amber-50 border-amber-100 dark:bg-amber-955/20 dark:border-amber-900/30' },
            { icon: BarChart2,  label: t.paymentsCount,    value: String(summary?.count ?? 0),                     badge: t.count, colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30' },
          ].map(({ icon: Icon, label, value, badge, colorClass }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${colorClass}`}>
                    {badge}
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-0.5">{label}</p>
                <p className="text-xl font-bold text-stone-850 dark:text-stone-100">{value}</p>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold">{t.egp}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.overallStatus}</p>
                <p className="text-xs text-stone-500 dark:text-stone-450 font-semibold">{t.progress}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#D97706]">{pct.toFixed(1)}%</p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{t.completed}</p>
              </div>
            </div>
            <div className="h-2 rounded-full mb-4 bg-stone-100 dark:bg-stone-800">
              <div className="h-2 rounded-full bg-[#FABA19] transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.totalFees,      value: `${(summary?.totalRequired ?? 0).toLocaleString()} ${t.egp}` },
                { label: t.totalPaidLabel, value: `${(summary?.totalPaid ?? 0).toLocaleString()} ${t.egp}` },
              ].map(r => (
                <div key={r.label} className="bg-stone-50/50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/60 rounded-xl p-3.5">
                  <p className="text-[10px] text-stone-450 dark:text-stone-550 font-semibold mb-1">{r.label}</p>
                  <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{r.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex gap-2 flex-wrap p-4 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                tab === key
                  ? 'bg-[#FABA19] text-white border-[#FABA19]'
                  : 'bg-stone-50/50 hover:bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/40 dark:hover:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: CreditCard, title: t.newPayment,      desc: t.payTuition,   action: () => setShowModal(true) },
                { icon: Printer,    title: t.printReceipt,    desc: t.printDesc,    action: handlePrintReceipt },
                { icon: FileText,   title: t.financialReport, desc: t.reportDesc,   action: handleReport },
              ].map(({ icon: Icon, title, desc, action }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="border border-stone-150 dark:border-stone-800 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300">
                    <button onClick={action} className="w-full p-6 text-center focus:outline-none">
                      <div className="w-12 h-12 rounded-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706] mx-auto mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-sm text-stone-850 dark:text-stone-100 mb-1">{title}</p>
                      <p className="text-xs text-stone-450 dark:text-stone-500 font-semibold">{desc}</p>
                    </button>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Upcoming Alert */}
            {summary && summary.remaining > 0 && (
              <div className="bg-amber-500/10 border border-amber-200/30 dark:border-amber-900/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0 border border-amber-200/20">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-[#D97706]">{t.upcoming}</p>
                </div>
                <Card className="border border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.sem2Fees}</p>
                    <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold flex items-center gap-1.5 mt-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                      {loc === 'ar' ? 'قبل بداية الفصل الدراسي القادم' : 'Prior to next semester start'}
                    </p>
                  </div>
                  <div className="text-center sm:text-end">
                    <p className="text-2xl font-extrabold text-[#D97706]">{summary.tuitionPerSem.toLocaleString()}</p>
                    <p className="text-[9px] text-stone-450 dark:text-stone-500 font-bold">{t.egp}</p>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'history' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.paymentHistory}</p>
              {payments.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{loc === 'ar' ? 'لا توجد مدفوعات مسجلة' : 'No payments recorded'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/30 dark:bg-stone-800/20 hover:border-amber-400 dark:hover:border-amber-600 transition-colors flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0 border border-amber-100/30">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{p.semesterYear ?? `Payment ${i + 1}`}</p>
                            <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold flex items-center gap-1.5 mt-1">
                              <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                              {new Date(p.paymentDate).toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-[9px] text-stone-400 dark:text-stone-650 mt-0.5 font-mono">{t.receiptNo} {p.receiptNumber}</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="text-base font-extrabold text-[#D97706]">{p.amount.toLocaleString()}</p>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-100/40">
                            {methodLabel(p.paymentMethod)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {tab === 'methods' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.paymentMethods}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Direct Bank Transfer */}
                <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/20 dark:bg-stone-800/25 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.bankTransfer}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold">{t.bankDesc}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs border-t border-stone-100 dark:border-stone-800/50 pt-2.5">
                    {[
                      { label: t.bankName,    val: t.bankNameVal },
                      { label: t.bankAccount, val: t.bankAccountVal },
                      { label: t.bankIban,    val: t.bankIbanVal },
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between flex-wrap gap-1 leading-snug">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold">{row.label}</span>
                        <span className="font-bold text-stone-750 dark:text-stone-300 font-mono text-[11px]">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electronic Payment */}
                <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/20 dark:bg-stone-800/25 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.ePayment}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold">{t.ePayDesc}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs border-t border-stone-100 dark:border-stone-800/50 pt-2.5">
                    {[
                      { label: t.fawry,    val: '98401' },
                      { label: t.vodafone, val: '0101234567' },
                      { label: t.orange,   val: '0121234567' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between flex-wrap gap-1 leading-snug">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold">{row.label}</span>
                        <span className="font-bold text-stone-750 dark:text-stone-300 font-mono text-[11px]">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cash Payment */}
                <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/20 dark:bg-stone-800/25 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{t.cashPayment}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold">{t.cashDesc}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs border-t border-stone-100 dark:border-stone-800/50 pt-2.5">
                    {[
                      { label: t.cashLocation, val: <MapPin className="w-3.5 h-3.5 inline text-[#D97706]" /> },
                      { label: t.cashHours,    val: t.cashHours },
                      { label: t.cashDays,     val: t.cashDays },
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between flex-wrap gap-1 leading-snug">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold">{row.label}</span>
                        <span className="font-bold text-stone-750 dark:text-stone-300">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Card>

            {/* Notes Section */}
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.notes}</p>
              <ul className="space-y-2.5 text-xs font-semibold text-stone-500 dark:text-stone-450">
                {[t.note1, t.note2, t.note3, t.note4, t.note5].map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FABA19] shrink-0 mt-1.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}

      </div>

      {/* Payment Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-[2px]" onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col"
              dir={dir}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-5 border-b border-stone-150 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <CreditCard className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#1C1917] dark:text-stone-100">{t.modalTitle}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{t.modalDesc}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                {[
                  { key: 'card',           icon: CreditCard, label: t.payElectronic, desc: t.payConfirm },
                  { key: 'bank_transfer',  icon: Landmark,   label: t.payBank,       desc: t.bankDesc },
                  { key: 'cash',           icon: Wallet,     label: t.payCash,       desc: t.cashDesc },
                ].map(({ key, icon: Icon, label, desc }) => (
                  <button
                    key={key}
                    disabled={payingMethod !== ''}
                    onClick={() => handlePay(key)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-stone-50/50 hover:bg-stone-50 dark:bg-stone-800/20 dark:hover:bg-stone-800/40 border border-stone-100 dark:border-stone-800/50 transition-all text-start"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-850 dark:text-stone-200">{label}</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold truncate">{desc}</p>
                      </div>
                    </div>
                    {payingMethod === key ? (
                      <div className="w-4 h-4 rounded-full border border-[#FABA19] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-stone-450 rotate-180 dir-ltr:rotate-0 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-stone-150 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-800/10">
                <Button onClick={() => setShowModal(false)} variant="ghost" className="w-full py-2.5 rounded-xl font-bold text-xs text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
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
