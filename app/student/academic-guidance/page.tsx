'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import {
  User, Mail, MapPin, Phone, Clock, CalendarDays, BookOpen,
  MessageSquare, TrendingUp, CheckCircle2, ClipboardList, Send, X,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الإرشاد الأكاديمي', subtitle: 'تواصل مع مرشدك الأكاديمي وراجع خطتك الدراسية',
    advisor: 'المرشد الأكاديمي', advisorLabel: 'المرشد', appointmentsLabel: 'مواعيد حالية', planLabel: 'خطة دراسية',
    apptUnit: 'موعد', semUnit: 'فصل',
    email: 'البريد الإلكتروني', office: 'المكتب', phone: 'الهاتف', hours: 'ساعات المكتب',
    bookAppt: 'حجز موعد', bookDesc: 'احجز موعد مع المرشد الأكاديمي',
    chat: 'استشارة فورية', chatDesc: 'تواصل مع المرشد عبر الدردشة',
    evaluate: 'تقييم الأداء', evaluateDesc: 'مراجعة الأداء الأكاديمي',
    appointments: 'المواعيد', plan: 'الخطة الدراسية',
    coursesCount: 'عدد المقررات:',
    statusConfirmed: 'مؤكد', statusDone: 'مكتمل', statusPending: 'معلق',
    statusRegistered: 'مسجل', statusPlanned: 'مخطط',
    credits: 'ساعة معتمدة',
    tips: 'نصائح أكاديمية',
    tip1: 'احرص على حضور جميع المحاضرات والسكاشن',
    tip2: 'راجع المرشد الأكاديمي قبل تسجيل المواد',
    tip3: 'خطط لدراستك مسبقاً ولا تؤجل المذاكرة',
    tip4: 'استفد من الساعات المكتبية للأساتذة',
    tip5: 'شارك في الأنشطة الطلابية لتطوير مهاراتك',
    regLink: 'تسجيل المقررات', gradesLink: 'الدرجات',
  },
  en: {
    title: 'Academic Guidance', subtitle: 'Connect with your advisor and review your study plan',
    advisor: 'Academic Advisor', advisorLabel: 'Advisor', appointmentsLabel: 'Appointments', planLabel: 'Study Plan',
    apptUnit: 'appt', semUnit: 'sem',
    email: 'Email', office: 'Office', phone: 'Phone', hours: 'Office Hours',
    bookAppt: 'Book Appointment', bookDesc: 'Schedule a meeting with your advisor',
    chat: 'Instant Consultation', chatDesc: 'Chat directly with your advisor',
    evaluate: 'Performance Review', evaluateDesc: 'Review your academic performance',
    appointments: 'Appointments', plan: 'Study Plan',
    coursesCount: 'Courses:',
    statusConfirmed: 'Confirmed', statusDone: 'Completed', statusPending: 'Pending',
    statusRegistered: 'Registered', statusPlanned: 'Planned',
    credits: 'credit hours',
    tips: 'Academic Tips',
    tip1: 'Attend all lectures and sections',
    tip2: 'Consult your advisor before registering courses',
    tip3: 'Plan your studies in advance',
    tip4: 'Make use of professors\' office hours',
    tip5: 'Participate in student activities to develop your skills',
    regLink: 'Course Registration', gradesLink: 'Grades',
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
  const th = dark ? darkTheme : theme;
  const card    = dark ? darkTheme.surface    : theme.white;
  const bdr     = dark ? darkTheme.border     : theme.border;
  const bdrL    = dark ? darkTheme.borderLight : theme.border;
  const iconBg  = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg  = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text      : '#1A1612';

  
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

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleBookAppt = () => {
    if (!apptDate || !apptTopic.trim()) return;
    const newAppt = {
      id: Date.now(), date: apptDate, time: apptTime,
      status: 'confirmed', topic: apptTopic,
    };
    setApptList(prev => [newAppt, ...prev]);
    setShowBookModal(false);
    setApptDate(''); setApptTime('10:00'); setApptTopic('');
    showToast(loc === 'ar' ? 'تم حجز الموعد بنجاح ✓' : 'Appointment booked successfully ✓');
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

  const apptStatusColor = (s: string) => s === 'confirmed' ? '#22c55e' : s === 'done' ? '#3b82f6' : '#f97316';
  const apptStatusLabel = (s: string) => s === 'confirmed' ? t.statusConfirmed : s === 'done' ? t.statusDone : t.statusPending;
  const courseStatusColor = (s: string) => s === 'registered' ? '#22c55e' : '#3b82f6';
  const courseStatusLabel = (s: string) => s === 'registered' ? t.statusRegistered : t.statusPlanned;

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const item    = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

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

        
        <AnimatePresence>
          {showBookModal && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowBookModal(false)}>
              <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem', width: '100%', maxWidth: 420 }} dir={dir}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${th.primary}18`, border: `1px solid ${th.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CalendarDays className="w-5 h-5" style={{ color: th.primary }} />
                    </div>
                    <p className="font-extrabold text-base" style={{ color: th.text }}>{t.bookAppt}</p>
                  </div>
                  <button onClick={() => setShowBookModal(false)} style={{ color: th.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1" style={{ color: th.text }}>
                      {loc === 'ar' ? 'التاريخ' : 'Date'}
                    </label>
                    <input type="date" value={apptDate} onChange={e => setApptDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', color: th.text, fontSize: 14, outline: 'none' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1" style={{ color: th.text }}>
                      {loc === 'ar' ? 'الوقت' : 'Time'}
                    </label>
                    <select value={apptTime} onChange={e => setApptTime(e.target.value)}
                      style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', color: th.text, fontSize: 14, outline: 'none' }}>
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1" style={{ color: th.text }}>
                      {loc === 'ar' ? 'موضوع الموعد' : 'Topic'}
                    </label>
                    <input value={apptTopic} onChange={e => setApptTopic(e.target.value)}
                      placeholder={loc === 'ar' ? 'مثال: مناقشة الخطة الدراسية...' : 'e.g. Discuss study plan...'}
                      style={{ width: '100%', background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.625rem 0.875rem', color: th.text, fontSize: 14, outline: 'none' }} />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={() => setShowBookModal(false)}
                      style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: `1px solid ${bdrL}`, background: 'transparent', color: th.textMuted, fontWeight: 700, cursor: 'pointer' }}>
                      {loc === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button onClick={handleBookAppt} disabled={!apptDate || !apptTopic.trim()}
                      style={{ flex: 1, padding: '0.625rem', borderRadius: 10, border: 'none', background: th.primary, color: dark ? '#1A1612' : '#fff', fontWeight: 700, cursor: 'pointer', opacity: (!apptDate || !apptTopic.trim()) ? 0.6 : 1 }}>
                      {loc === 'ar' ? 'تأكيد الحجز' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        
        <AnimatePresence>
          {showChat && (
            <motion.div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ pointerEvents: 'none' }}>
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
                style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, width: '100%', maxWidth: 360, height: 480, display: 'flex', flexDirection: 'column', pointerEvents: 'all', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} dir={dir}>
                
                <div style={{ background: th.primary, borderRadius: '16px 16px 0 0', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User className="w-5 h-5" style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: dark ? '#1A1612' : '#fff' }}>{advisorInfo.name}</p>
                      <p className="text-xs" style={{ color: dark ? '#2F2415' : 'rgba(255,255,255,0.8)' }}>
                        {loc === 'ar' ? '● متاح' : '● Online'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} style={{ color: dark ? '#1A1612' : '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ background: iconBg }}>
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'student' ? (dir === 'rtl' ? 'justify-start' : 'justify-end') : (dir === 'rtl' ? 'justify-end' : 'justify-start')}`}>
                      <div style={{
                        maxWidth: '75%', padding: '8px 12px', borderRadius: 12,
                        background: msg.from === 'student' ? th.primary : card,
                        color: msg.from === 'student' ? (dark ? '#1A1612' : '#fff') : th.text,
                        border: msg.from === 'advisor' ? `1px solid ${bdrL}` : 'none',
                        fontSize: 13,
                      }}>
                        <p>{msg.text}</p>
                        <p style={{ fontSize: 10, opacity: 0.7, marginTop: 2, textAlign: 'end' }}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ padding: '10px 12px', borderTop: `1px solid ${bdrL}`, display: 'flex', gap: 8 }}>
                  <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                    placeholder={loc === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'}
                    style={{ flex: 1, background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '8px 12px', color: th.text, fontSize: 13, outline: 'none' }} />
                  <button onClick={handleSendChat} disabled={!chatMsg.trim()}
                    style={{ width: 38, height: 38, borderRadius: 10, background: th.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: !chatMsg.trim() ? 0.5 : 1 }}>
                    <Send className="w-4 h-4" style={{ color: dark ? '#1A1612' : '#fff' }} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ClipboardList className="w-6 h-6" style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>{t.subtitle}</p>
                </div>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.advisorLabel,      value: advisorInfo.name,              icon: User },
                  { label: t.appointmentsLabel, value: `${appointments.length} ${t.apptUnit}`, icon: CalendarDays },
                  { label: t.planLabel,         value: `${academicPlan.length} ${t.semUnit}`,  icon: BookOpen },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ background: card, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }} className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon className="w-4 h-4" style={{ color: th.primary }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold" style={{ color: th.textMuted }}>{label}</p>
                      <p className="font-extrabold text-sm truncate" style={{ color: th.text }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User className="w-5 h-5" style={{ color: th.primary }} />
              </div>
              <p className="font-extrabold text-lg" style={{ color: th.text }}>{t.advisor}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div style={{ width: 72, height: 72, borderRadius: 16, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User className="w-8 h-8" style={{ color: th.primary }} />
                </div>
                <div>
                  <p className="font-extrabold text-lg" style={{ color: th.text }}>{advisorInfo.name}</p>
                  <p className="text-sm" style={{ color: th.textMuted }}>{advisorInfo.title}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Mail,    value: advisorInfo.email },
                  { icon: MapPin,  value: advisorInfo.office },
                  { icon: Phone,   value: advisorInfo.phone },
                  { icon: Clock,   value: advisorInfo.officeHours },
                ].map(({ icon: Icon, value }) => (
                  <div key={value} className="flex items-center gap-3">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon className="w-4 h-4" style={{ color: th.primary }} />
                    </div>
                    <span className="text-sm" style={{ color: th.textMuted }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CalendarDays,  label: t.bookAppt,  desc: t.bookDesc,     action: () => setShowBookModal(true) },
            { icon: MessageSquare, label: t.chat,       desc: t.chatDesc,     action: () => setShowChat(true) },
            { icon: TrendingUp,    label: t.evaluate,   desc: t.evaluateDesc, action: () => router.push('/student/academic-record') },
          ].map(({ icon: Icon, label, desc, action }) => (
            <motion.div key={label} variants={item}>
              <button onClick={action} style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem', width: '100%', textAlign: 'center', cursor: 'pointer' }}
                className="hover:opacity-80 transition-opacity"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = th.primary; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = bdr; }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <Icon className="w-7 h-7" style={{ color: th.primary }} />
                </div>
                <p className="font-extrabold mb-1" style={{ color: th.text }}>{label}</p>
                <p className="text-sm" style={{ color: th.textMuted }}>{desc}</p>
              </button>
            </motion.div>
          ))}
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarDays className="w-5 h-5" style={{ color: th.primary }} />
              </div>
              <p className="font-extrabold" style={{ color: th.text }}>{t.appointments}</p>
            </div>
            <div style={{ padding: '1.25rem' }} className="space-y-3">
              {apptList.map(a => (
                <div key={a.id} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CalendarDays className="w-5 h-5" style={{ color: th.primary }} />
                    </div>
                    <div>
                      <p className="font-extrabold text-sm" style={{ color: th.text }}>{a.topic}</p>
                      <p className="text-xs" style={{ color: th.textMuted }}>{a.date} — {a.time}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                    style={{ background: `${apptStatusColor(a.status)}22`, color: apptStatusColor(a.status), border: `1px solid ${apptStatusColor(a.status)}44` }}>
                    {apptStatusLabel(a.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen className="w-5 h-5" style={{ color: th.primary }} />
              </div>
              <p className="font-extrabold" style={{ color: th.text }}>{t.plan}</p>
            </div>
            <div style={{ padding: '1.25rem' }} className="space-y-4">
              {academicPlan.map((sem, si) => (
                <div key={si} style={{ border: `1px solid ${bdrL}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: iconBg, padding: '0.75rem 1rem', borderBottom: `1px solid ${bdrL}` }} className="flex items-center justify-between">
                    <p className="font-extrabold text-sm" style={{ color: th.primary }}>{sem.semester}</p>
                    <span className="text-xs" style={{ color: th.textMuted }}>{t.coursesCount} {sem.courses.length}</span>
                  </div>
                  <div style={{ padding: '0.75rem' }} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sem.courses.map((c, ci) => (
                      <div key={ci} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 10, padding: '0.75rem' }} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-extrabold text-sm" style={{ color: th.primary }}>{c.code}</p>
                          <p className="text-xs" style={{ color: th.text }}>{c.name}</p>
                          <p className="text-xs" style={{ color: th.textMuted }}>{c.credits} {t.credits}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-extrabold"
                          style={{ background: `${courseStatusColor(c.status)}22`, color: courseStatusColor(c.status), border: `1px solid ${courseStatusColor(c.status)}44` }}>
                          {courseStatusLabel(c.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/student/registration', label: t.regLink },
            { href: '/student/grades',       label: t.gradesLink },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 12, padding: '0.625rem 1.25rem', fontWeight: 700, fontSize: 14, color: th.primary, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              className="hover:opacity-80 transition-opacity">
              {label}
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
