'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import {
  User, Mail, MapPin, Phone, Clock, CalendarDays, BookOpen,
  MessageSquare, TrendingUp, CheckCircle2, ClipboardList, Send, X,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'منظومة الإرشاد الأكاديمي',
    subtitle: 'تواصل مباشرة مع مرشدك الأكاديمي، خطط مسارك الدراسي، وتابع مواعيد المقابلات الفردية',
    advisor: 'تفاصيل المرشد الأكاديمي المعين',
    advisorLabel: 'المرشد الأكاديمي',
    appointmentsLabel: 'الاجتماعات المجدولة',
    planLabel: 'الخطة الأكاديمية المقررة',
    apptUnit: 'موعد مفعل',
    semUnit: 'فصل مخطط',
    email: 'البريد الإلكتروني الجامعي',
    office: 'مكتب الأستاذ بالجامعة',
    phone: 'هاتف التواصل الداخلي',
    hours: 'ساعات المقابلة المكتبية',
    bookAppt: 'حجز اجتماع إرشادي',
    bookDesc: 'حجز جلسة نقاشية مسبقة لمراجعة مسارك الأكاديمي',
    chat: 'الاستشارة الرقمية الفورية',
    chatDesc: 'إرسال استفسار سريع عبر الدردشة الفورية للمرشد',
    evaluate: 'مراجعة الأداء الدراسي',
    evaluateDesc: 'تتبع تقدمك العام ونقاط المعدل الأكاديمي التراكمي',
    appointments: 'سجل اجتماعات الإرشاد الأكاديمي',
    plan: 'تفاصيل خطة الطالب الدراسية المقترحة',
    coursesCount: 'عدد المقررات المسجلة:',
    statusConfirmed: 'تم التأكيد والحجز',
    statusDone: 'انتهت المقابلة',
    statusPending: 'قيد المراجعة',
    statusRegistered: 'تم التسجيل الفعلي للمادة',
    statusPlanned: 'مخطط للتسجيل مستقبلاً',
    credits: 'ساعات معتمدة',
    regLink: 'التوجه لتسجيل المقررات',
    gradesLink: 'التوجه لعرض كشف الدرجات',
  },
  en: {
    title: 'Academic Guidance & Advising',
    subtitle: 'Connect with your advisor, map your degree requirement courses, and schedule office hours meetings',
    advisor: 'Assigned Academic Advisor Profile',
    advisorLabel: 'Advisor',
    appointmentsLabel: 'Scheduled Advising Meetings',
    planLabel: 'Study Curriculum Map',
    apptUnit: 'meeting',
    semUnit: 'semester map',
    email: 'Academic Email Address',
    office: 'On-Campus Office Room',
    phone: 'Internal Extension',
    hours: 'Weekly Office Advising Hours',
    bookAppt: 'Request Advising Meeting',
    bookDesc: 'Request a one-on-one session to audit academic progress',
    chat: 'Live Advisor Chat Box',
    chatDesc: 'Send quick questions directly to your assigned advisor',
    evaluate: 'GPA & Performance Audit',
    evaluateDesc: 'Review completed course achievements and target scores',
    appointments: 'Registered Advisor Sessions Log',
    plan: 'Curriculum Study Sequence Plan',
    coursesCount: 'Registered Course Units:',
    statusConfirmed: 'Meeting Confirmed',
    statusDone: 'Session Completed',
    statusPending: 'Advisor Approving',
    statusRegistered: 'Enrolled & Paid',
    statusPlanned: 'Planned Sequence',
    credits: 'credits',
    regLink: 'Navigate to Course Registration',
    gradesLink: 'Navigate to Grade Book',
  },
} as const;

const advisorInfo = {
  name: 'د. أحمد محمد علي',
  title: 'أستاذ مساعد - قسم علوم الحاسب',
  email: 'ahmed.ali@bua.edu.eg',
  office: 'مكتب 205 - مبنى الهندسة',
  phone: '088-2345678',
  officeHours: 'الأحد والثلاثاء: 10:00 ص - 12:00 م',
};

const appointments = [
  { id: 1, date: '2024-01-20', time: '10:00 ص', status: 'confirmed', topic: 'مناقشة الخطة الدراسية' },
  { id: 2, date: '2024-01-15', time: '11:00 ص', status: 'done',      topic: 'استشارة أكاديمية' },
];

const academicPlan = [
  {
    semester: 'الفصل الأول 2024/2025',
    courses: [
      { code: 'CS101',   name: 'أساسيات البرمجة',  credits: 3, status: 'registered' },
      { code: 'MATH101', name: 'رياضيات 1',         credits: 3, status: 'registered' },
      { code: 'PHY101',  name: 'فيزياء 1',          credits: 3, status: 'registered' },
      { code: 'ENG101',  name: 'لغة إنجليزية 1',    credits: 2, status: 'registered' },
    ],
  },
  {
    semester: 'الفصل الثاني 2024/2025',
    courses: [
      { code: 'CS102',   name: 'هياكل البيانات',    credits: 3, status: 'planned' },
      { code: 'MATH102', name: 'رياضيات 2',         credits: 3, status: 'planned' },
      { code: 'PHY102',  name: 'فيزياء 2',          credits: 3, status: 'planned' },
      { code: 'ENG102',  name: 'لغة إنجليزية 2',    credits: 2, status: 'planned' },
    ],
  },
];

export default function AcademicGuidancePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const router = useRouter();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [showBookModal, setShowBookModal] = useState(false);
  const [apptDate, setApptDate]   = useState('');
  const [apptTime, setApptTime]   = useState('10:00');
  const [apptTopic, setApptTopic] = useState('');
  const [apptList, setApptList]   = useState(appointments);
  const [toast, setToast]         = useState('');

  const [showChat, setShowChat]   = useState(false);
  const [chatMsg, setChatMsg]     = useState('');
  const [chatHistory, setChatHistory] = useState<{ from: 'student' | 'advisor'; text: string; time: string }[]>([
    { from: 'advisor', text: loc === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Hello! How can I help you today?', time: '10:00' },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleBookAppt = () => {
    if (!apptDate || !apptTopic.trim()) return;
    const newAppt = {
      id: Date.now(),
      date: apptDate,
      time: apptTime,
      status: 'confirmed',
      topic: apptTopic,
    };
    setApptList(prev => [newAppt, ...prev]);
    setShowBookModal(false);
    setApptDate('');
    setApptTime('10:00');
    setApptTopic('');
    showToast(loc === 'ar' ? 'تم تسجيل طلب حجز الموعد بنجاح ✓' : 'Guidance appointment booked successfully ✓');
  };

  const handleSendChat = () => {
    if (!chatMsg.trim()) return;
    const now = new Date().toLocaleTimeString(loc === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    setChatHistory(prev => [...prev, { from: 'student', text: chatMsg, time: now }]);
    setChatMsg('');
    
    setTimeout(() => {
      const replies = loc === 'ar'
        ? ['شكراً على تواصلك، سأراجع طلبك وأرد عليك قريباً.', 'حسناً، يمكنك حجز موعد لمناقشة هذا الأمر بالتفصيل.', 'تم استلام رسالتك، سأتواصل معك خلال 24 ساعة.']
        : ['Thank you for reaching out. I will review your request shortly.', 'You can book an appointment to discuss this in detail.', 'Message received. I will get back to you within 24 hours.'];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString(loc === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      setChatHistory(prev => [...prev, { from: 'advisor', text: reply, time: replyTime }]);
    }, 1000);
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

        {/* Request Session Modal */}
        <AnimatePresence>
          {showBookModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowBookModal(false)}>
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
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm text-stone-850 dark:text-stone-150">{t.bookAppt}</p>
                  </div>
                  <button onClick={() => setShowBookModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-250">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-450 dark:text-stone-500 mb-1">
                      {loc === 'ar' ? 'تاريخ الجلسة المطلوبة' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      value={apptDate}
                      onChange={e => setApptDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none focus:border-[#FABA19]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-450 dark:text-stone-500 mb-1">
                      {loc === 'ar' ? 'فترة الحضور المفضلة' : 'Preferred Slot'}
                    </label>
                    <select
                      value={apptTime}
                      onChange={e => setApptTime(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none focus:border-[#FABA19]"
                    >
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(tm => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-450 dark:text-stone-500 mb-1">
                      {loc === 'ar' ? 'موضوع ومحور المقابلة' : 'Agenda / Topic'}
                    </label>
                    <input
                      value={apptTopic}
                      onChange={e => setApptTopic(e.target.value)}
                      placeholder={loc === 'ar' ? 'مثال: مراجعة خطة المقررات للفصل التالي...' : 'e.g. Discuss course syllabus adjustments...'}
                      className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none focus:border-[#FABA19]"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleBookAppt}
                      disabled={!apptDate || !apptTopic.trim()}
                      className="flex-1 bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm disabled:opacity-50"
                    >
                      {loc === 'ar' ? 'تأكيد وحجز الموعد' : 'Confirm Advising Session'}
                    </Button>
                    <Button
                      onClick={() => setShowBookModal(false)}
                      className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs py-2 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm"
                    >
                      {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Live Advisor Chat Widget overlay */}
        <AnimatePresence>
          {showChat && (
            <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl w-full max-w-sm h-[480px] flex flex-col justify-between pointer-events-auto shadow-2xl overflow-hidden"
              >
                <div className="bg-[#FABA19] p-4 flex items-center justify-between text-white shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-start">
                      <p className="font-bold text-xs leading-tight">{advisorInfo.name}</p>
                      <p className="text-[9px] text-white/80 mt-0.5">{loc === 'ar' ? '● متصل حالياً' : '● Online'}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="text-white hover:text-white/80">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/30 dark:bg-stone-950/15">
                  {chatHistory.map((msg, i) => {
                    const isAdvisor = msg.from === 'advisor';
                    return (
                      <div key={i} className={`flex ${isAdvisor ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs font-semibold ${
                          isAdvisor
                            ? 'bg-white dark:bg-stone-850 border border-stone-100 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                            : 'bg-[#FABA19] text-white'
                        }`}>
                          <p className="leading-relaxed text-start">{msg.text}</p>
                          <span className="block text-[8px] opacity-70 mt-1 text-end leading-none">{msg.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 border-t border-stone-100 dark:border-stone-800 flex gap-2 shrink-0">
                  <input
                    value={chatMsg}
                    onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                    placeholder={loc === 'ar' ? 'اكتب رسالتك للمرشد...' : 'Type your inquiry...'}
                    className="flex-1 bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none focus:border-[#FABA19]"
                  />
                  <Button
                    onClick={handleSendChat}
                    disabled={!chatMsg.trim()}
                    className="w-9 h-9 rounded-xl bg-[#FABA19] hover:bg-[#e5a816] border-0 text-white flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
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
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">{t.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: t.advisorLabel,      value: advisorInfo.name,              icon: User },
                  { label: t.appointmentsLabel, value: `${appointments.length} ${t.apptUnit}`, icon: CalendarDays },
                  { label: t.planLabel,         value: `${academicPlan.length} ${t.semUnit}`,  icon: BookOpen },
                ].map(({ label, value, icon: Icon }, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-start min-w-0">
                      <p className="text-[10px] text-stone-450 dark:text-stone-550 font-bold truncate">{label}</p>
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-100 truncate mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Advisor Details Section */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <User className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.advisor}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 flex items-center justify-center text-[#D97706] shrink-0">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-850 dark:text-stone-100">{advisorInfo.name}</p>
                    <p className="text-xs text-stone-450 dark:text-stone-500 font-semibold mt-0.5">{advisorInfo.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { icon: Mail,    value: advisorInfo.email,    label: t.email },
                    { icon: MapPin,  value: advisorInfo.office,   label: t.office },
                    { icon: Phone,   value: advisorInfo.phone,    label: t.phone },
                    { icon: Clock,   value: advisorInfo.officeHours, label: t.hours },
                  ].map(({ icon: Icon, value, label }, idx) => (
                    <div key={idx} className="bg-stone-50/20 dark:bg-stone-850/5 border border-stone-100 dark:border-stone-800 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{label}</p>
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-250 mt-0.5 truncate">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dynamic Action Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: CalendarDays,  label: t.bookAppt,  desc: t.bookDesc,     action: () => setShowBookModal(true) },
            { icon: MessageSquare, label: t.chat,       desc: t.chatDesc,     action: () => setShowChat(true) },
            { icon: TrendingUp,    label: t.evaluate,   desc: t.evaluateDesc, action: () => router.push('/student/academic-record') },
          ].map(({ icon: Icon, label, desc, action }, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card
                onClick={action}
                className="border border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-2xl p-5 hover:border-amber-200 cursor-pointer transition-all flex flex-col justify-center items-center text-center space-y-3 h-full shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{label}</p>
                  <p className="text-xs text-stone-450 dark:text-stone-500 font-semibold mt-1 leading-normal">{desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sessions History Directory */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.appointments}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {apptList.map(a => {
                const isConfirmed = a.status === 'confirmed';
                return (
                  <div key={a.id} className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-850/5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-150">{a.topic}</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">{a.date} — {a.time}</p>
                      </div>
                    </div>
                    <Badge className={`border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5 ${
                      isConfirmed
                        ? 'bg-amber-500/10 text-[#D97706]'
                        : 'bg-stone-50 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {isConfirmed ? t.statusConfirmed : t.statusDone}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Semester Sequence Plan Map */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-stone-50 dark:border-stone-850">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm font-bold text-stone-850 dark:text-stone-150">{t.plan}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {academicPlan.map((sem, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <div className="rounded-2xl border border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
                    <div className="bg-stone-50/40 dark:bg-stone-800/10 px-4 py-3 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <p className="font-bold text-[#D97706]">{sem.semester}</p>
                      <span className="font-semibold text-stone-550 dark:text-stone-400">{t.coursesCount} {sem.courses.length}</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sem.courses.map((c, cIdx) => {
                        const isRegistered = c.status === 'registered';
                        return (
                          <div key={cIdx} className="bg-stone-50/20 dark:bg-stone-850/5 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold text-[#D97706]">{c.code}</p>
                              <p className="text-xs font-bold text-stone-850 dark:text-stone-150 mt-0.5">{c.name}</p>
                              <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold mt-1">{c.credits} {t.credits}</p>
                            </div>
                            <Badge className={`border-0 text-[9px] font-bold shadow-none px-2.5 py-0.5 ${
                              isRegistered
                                ? 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-600 dark:bg-emerald-950/20'
                                : 'bg-blue-50 hover:bg-blue-100/50 text-blue-600 dark:bg-blue-950/20'
                            }`}>
                              {isRegistered ? t.statusRegistered : t.statusPlanned}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {sIdx < academicPlan.length - 1 && <Separator className="bg-stone-100 dark:bg-stone-800" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Supplementary Link Badges */}
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/student/registration', label: t.regLink },
            { href: '/student/grades',       label: t.gradesLink },
          ].map(({ href, label }, idx) => (
            <Link key={idx} href={href}>
              <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-[#D97706] border border-[#FABA19]/25 text-xs font-bold shadow-none px-4 py-2 rounded-xl transition-all">
                {label}
              </Badge>
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
