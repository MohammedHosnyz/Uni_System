'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User, Mail, Phone, Calendar, Flag, CreditCard,
  MapPin, Home, Building2, BookOpen, GraduationCap, BarChart2,
  CheckCircle2, Lock, Shield, History, Save, Pencil,
  Smartphone, Eye, EyeOff, Monitor, BadgeCheck,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الملف الشخصي للطالب',
    edit: 'تعديل البيانات',
    save: 'حفظ التعديلات',
    saved: 'تم حفظ تعديلات الملف الشخصي بنجاح ✓',
    passSaved: 'تم تحديث كلمة المرور الشخصية بنجاح ✓',
    tabPersonal: 'البيانات الشخصية',
    tabAcademic: 'السجل الأكاديمي',
    tabSecurity: 'أمان الحساب',
    statGpa: 'المعدل التراكمي',
    statHours: 'الساعات المكتسبة',
    statCourses: 'المقررات الدراسية',
    statYear: 'سنة الالتحاق',
    studentName: 'اسم الطالب',
    studentNum: 'رقم الطالب',
    faculty: 'الكلية',
    status: 'حالة القيد',
    active: 'نشط وأكاديمي',
    basicData: 'البيانات الأساسية للطالب',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة واللقب',
    email: 'البريد الإلكتروني الجامعي',
    phone: 'رقم الهاتف المحمول',
    birthDate: 'تاريخ الميلاد',
    nationality: 'الجنسية',
    nationalId: 'الرقم القومي / جواز السفر',
    gender: 'الجنس',
    addressInfo: 'بيانات السكن والاتصال',
    governorate: 'المحافظة',
    city: 'المركز / المدينة',
    address: 'العنوان التفصيلي الحالي',
    postalCode: 'الرمز البريدي',
    emergency: 'بيانات الاتصال في الطوارئ',
    emergencyName: 'اسم الشخص للطوارئ',
    relation: 'صلة القرابة للطالب',
    emergencyPhone: 'رقم هاتف الطوارئ',
    emergencyEmail: 'البريد الإلكتروني للاتصال',
    academicDetails: 'تفاصيل القيد الأكاديمي',
    program: 'البرنامج الدراسي المتخصص',
    department: 'القسم الأكاديمي المسؤول',
    currentLevel: 'المستوى الأكاديمي الحالي',
    enrollYear: 'سنة التسجيل بالجامعة',
    academicStatus: 'الوضع الأكاديمي الحالي',
    performance: 'مؤشرات الأداء الأكاديمي',
    outOf4: 'الحد الأقصى للنقاط 4.00',
    outOf160: 'ساعة من متطلبات التخرج',
    documents: 'المستندات الرسمية المرفوعة',
    uploaded: 'تم التحقق منه',
    doc1: 'صورة بطاقة الرقم القومي',
    doc2: 'شهادة إتمام الثانوية العامة',
    doc3: 'شهادة الميلاد الكمبيوتر',
    doc4: 'الصور الشخصية للطالب',
    changePassword: 'تغيير كلمة المرور الخاصة بك',
    currentPass: 'كلمة المرور الحالية للتأكيد',
    newPass: 'كلمة المرور الجديدة المقترحة',
    confirmPass: 'تأكيد كلمة المرور الجديدة',
    updatePass: 'تحديث كلمة المرور الآن',
    securitySettings: 'خيارات الحماية والأمان المتقدمة',
    twoFactor: 'المصادقة الثنائية (2FA)',
    twoFactorDesc: 'حماية إضافية لحسابك عن طريق إرسال رمز حماية لهاتفك',
    loginNotif: 'إشعارات الأجهزة الجديدة',
    loginNotifDesc: 'تنبيهك عبر البريد عند تسجيل الدخول من جهاز غير معروف',
    activityLog: 'سجل العمليات والنشاط',
    activityLogDesc: 'تسجيل وتتبع جميع الحركات والأحداث التي تتم على حسابك',
    loginHistory: 'سجل الجلسات النشطة والأجهزة',
    current: 'الجلسة الحالية',
    minutesAgo: 'منذ دقائق',
    hoursAgo: 'منذ ساعات',
    daysAgo: 'منذ أيام',
    assiut: 'أسيوط، جمهورية مصر العربية',
    cairo: 'القاهرة، جمهورية مصر العربية',
    levelPrefix: 'المستوى الدراسي',
    notAvailable: 'غير متوفر',
    egp: 'جنيه مصري',
  },
  en: {
    title: 'Student Profile',
    edit: 'Edit Details',
    save: 'Save Profile Changes',
    saved: 'Profile details updated successfully ✓',
    passSaved: 'Password changed successfully ✓',
    tabPersonal: 'Personal Data',
    tabAcademic: 'Academic Record',
    tabSecurity: 'Account Security',
    statGpa: 'Cumulative GPA',
    statHours: 'Earned Hours',
    statCourses: 'Registered Courses',
    statYear: 'Enrollment Year',
    studentName: 'Student Name',
    studentNum: 'Student ID',
    faculty: 'Faculty',
    status: 'Status',
    active: 'Active Student',
    basicData: 'Basic Personal Info',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'University Email Address',
    phone: 'Mobile Number',
    birthDate: 'Birth Date',
    nationality: 'Nationality',
    nationalId: 'National ID / Passport',
    gender: 'Gender',
    addressInfo: 'Address & Residence Data',
    governorate: 'Governorate',
    city: 'City / Region',
    address: 'Detailed Current Address',
    postalCode: 'Postal Code',
    emergency: 'Emergency Contact Info',
    emergencyName: 'Contact Name',
    relation: 'Relationship to Student',
    emergencyPhone: 'Emergency Phone Number',
    emergencyEmail: 'Emergency Email Address',
    academicDetails: 'Academic Registration Details',
    program: 'Specialized Program',
    department: 'Academic Department',
    currentLevel: 'Current Academic Level',
    enrollYear: 'Enrollment Academic Year',
    academicStatus: 'Current Status',
    performance: 'Academic Performance Indicators',
    outOf4: 'Scale limits up to 4.00 points',
    outOf160: 'hours completed towards graduation requirements',
    documents: 'Uploaded Official Documents',
    uploaded: 'Verified Upload',
    doc1: 'National ID Card Copy',
    doc2: 'High School Transcript Certificate',
    doc3: 'Official Birth Certificate Copy',
    doc4: 'Personal Student Photo',
    changePassword: 'Change Account Password',
    currentPass: 'Current Account Password',
    newPass: 'Proposed New Password',
    confirmPass: 'Confirm New Password',
    updatePass: 'Update Account Password',
    securitySettings: 'Advanced Account Protection Settings',
    twoFactor: 'Two-Factor Authentication (2FA)',
    twoFactorDesc: 'Add extra protection by requiring a security code on your mobile',
    loginNotif: 'New Login Alerts',
    loginNotifDesc: 'Notify me via email when my account is accessed from a new browser',
    activityLog: 'Audit Activity Log',
    activityLogDesc: 'Log all transactions and actions performed within your account sessions',
    loginHistory: 'Device Sessions & History',
    current: 'Current Session',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    assiut: 'Assiut, Egypt',
    cairo: 'Cairo, Egypt',
    levelPrefix: 'Academic Level',
    notAvailable: 'N/A',
    egp: 'EGP',
  },
} as const;

type Tab = 'personal' | 'academic' | 'security';

interface ProfileData {
  id: number;
  userId: number;
  studentNumber: string;
  enrollmentYear: number;
  currentLevel: number;
  status: string;
  gpa: number | null;
  completedCredits: number;
  totalRequired: number;
  courseCount: number;
  user: { firstName: string; lastName: string; email: string; phone: string | null; nationalId: string | null };
  program: { nameAr: string; nameEn: string };
  department: { nameAr: string; nameEn: string };
  faculty: { nameAr: string; nameEn: string };
}

export default function ProfilePage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

  const [tab, setTab] = useState<Tab>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [phone, setPhone] = useState('');
  const [toast, setToast] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [secToggles, setSecToggles] = useState({ twoFactor: false, loginNotif: true, activityLog: true });
  const [secLoaded, setSecLoaded] = useState(false);
  const [sessions, setSessions] = useState<{ id: number; device: string; location: string; ipAddress: string | null; isCurrent: boolean; createdAt: string }[]>([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    try {
      const [profileRes, sessionsRes, secRes] = await Promise.all([
        fetch(`/api/student/profile?userId=${user.id}`),
        fetch(`/api/student/login-sessions?userId=${user.id}`),
        fetch(`/api/student/security-settings?userId=${user.id}`),
      ]);
      const profileJson = await profileRes.json();
      const sessionsJson = await sessionsRes.json();
      const secJson = await secRes.json();
      setProfile(profileJson);
      setPhone(profileJson?.user?.phone ?? '');
      setSessions(sessionsJson?.sessions ?? []);
      setSecToggles({
        twoFactor: secJson?.twoFactor ?? false,
        loginNotif: secJson?.loginNotif ?? true,
        activityLog: secJson?.activityLog ?? true,
      });
      setSecLoaded(true);
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async () => {
    if (!user || !profile) return;
    await fetch('/api/student/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, phone }),
    });
    setIsEditing(false);
    showToast(t.saved);
    fetchProfile();
  };

  if (loading || !user) return null;

  if (fetching || !profile) {
    return (
      <DashboardLayout user={user} role="student">
        <div className="flex items-center justify-center h-64 bg-stone-50/10">
          <div className="w-8 h-8 rounded-full border-2 border-[#FABA19] border-t-transparent animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const gpaVal = profile.gpa ?? 0;
  const gpaPct = Math.min((gpaVal / 4) * 100, 100);
  const hoursPct = profile.totalRequired > 0 ? Math.min((profile.completedCredits / profile.totalRequired) * 100, 100) : 0;

  const Field = ({ label, value, icon: Icon, disabled = true, type = 'text', span = false, onChange }: {
    label: string;
    value?: string;
    icon: React.ElementType;
    disabled?: boolean;
    type?: string;
    span?: boolean;
    onChange?: (v: string) => void;
  }) => (
    <div className={span ? 'md:col-span-2' : ''}>
      <label className="flex items-center gap-1.5 text-xs font-bold text-stone-400 dark:text-stone-500 mb-2">
        <Icon className="w-4 h-4 text-[#D97706]" />
        {label}
      </label>
      <input
        type={type}
        value={value ?? ''}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors outline-none ${
          disabled
            ? 'bg-stone-50/50 dark:bg-stone-850/40 border-stone-150 dark:border-stone-800 text-stone-450 dark:text-stone-500'
            : 'bg-white dark:bg-stone-900 border-amber-300 dark:border-amber-700 text-stone-800 dark:text-stone-105'
        }`}
      />
    </div>
  );

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706]">
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-stone-850 dark:text-stone-150">{title}</p>
      </div>
      {children}
    </Card>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-bold text-xs bg-[#FABA19] text-white">
            <CheckCircle2 className="w-4.5 h-4.5" />
            {toast}
          </div>
        )}

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{profile?.user?.firstName} {profile?.user?.lastName}</p>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 font-bold text-xs px-4 py-2 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-2"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  {isEditing ? t.save : t.edit}
                </Button>
              </div>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-start">
                {[
                  { label: t.studentName, value: `${profile?.user?.firstName ?? ''} ${profile?.user?.lastName ?? ''}`.trim() },
                  { label: t.studentNum,  value: profile?.studentNumber ?? '—' },
                  { label: t.faculty,     value: loc === 'ar' ? profile?.faculty?.nameAr ?? '—' : profile?.faculty?.nameEn ?? '—' },
                  { label: t.status,      value: t.active, highlight: true },
                ].map((r, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{r.label}</p>
                    <p className={`text-xs font-bold ${r.highlight ? 'text-[#D97706]' : 'text-stone-750 dark:text-stone-250'}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Academic Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BarChart2,    label: t.statGpa,    value: profile.gpa?.toFixed(2) ?? t.notAvailable, colorClass: 'text-[#D97706] bg-amber-50 border-amber-100 dark:bg-amber-955/20 dark:border-amber-900/30' },
            { icon: CheckCircle2, label: t.statHours,  value: String(profile.completedCredits), colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30' },
            { icon: BookOpen,     label: t.statCourses, value: String(profile.courseCount), colorClass: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-955/20 dark:border-blue-900/30' },
            { icon: Calendar,     label: t.statYear,   value: String(profile.enrollmentYear), colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30' },
          ].map(({ icon: Icon, label, value, colorClass }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold mb-1">{label}</p>
                  <p className="text-xl font-bold text-stone-850 dark:text-stone-100">{value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 flex-wrap p-4 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm">
          {[
            { key: 'personal' as Tab, label: t.tabPersonal,  icon: User },
            { key: 'academic' as Tab, label: t.tabAcademic,  icon: GraduationCap },
            { key: 'security' as Tab, label: t.tabSecurity,  icon: Lock },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                tab === key
                  ? 'bg-[#FABA19] text-white border-[#FABA19]'
                  : 'bg-stone-50/50 hover:bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/40 dark:hover:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Personal Details Tab Content */}
        {tab === 'personal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Section title={t.basicData} icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.firstName}   value={profile?.user?.firstName ?? ''}         icon={User}       disabled />
                <Field label={t.lastName}    value={profile?.user?.lastName ?? ''}          icon={User}       disabled />
                <Field label={t.email}       value={profile?.user?.email ?? ''}             icon={Mail}       disabled type="email" />
                <Field label={t.phone}       value={phone}                                  icon={Phone}      disabled={!isEditing} onChange={setPhone} />
                <Field label={t.nationalId}  value={profile?.user?.nationalId ?? t.notAvailable} icon={CreditCard} disabled />
                <Field label={t.nationality} value={loc === 'ar' ? 'مصري' : 'Egyptian'}    icon={Flag}       disabled />
                <Field label={t.gender}      value={loc === 'ar' ? 'ذكر' : 'Male'}         icon={User}       disabled />
                <Field label={t.birthDate}   value="2000-01-01"                             icon={Calendar}   disabled type="date" />
              </div>
            </Section>

            <Section title={t.addressInfo} icon={MapPin}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.governorate} value={loc === 'ar' ? 'أسيوط' : 'Assiut'}                              icon={Building2} disabled />
                <Field label={t.city}        value={loc === 'ar' ? 'أسيوط' : 'Assiut'}                              icon={MapPin}    disabled />
                <Field label={t.address}     value={loc === 'ar' ? 'شارع الجامعة، أسيوط' : 'University St, Assiut'} icon={Home}      disabled span />
                <Field label={t.postalCode}  value="71515"                                                           icon={MapPin}    disabled />
              </div>
            </Section>

            <Section title={t.emergency} icon={Phone}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.emergencyName}  value={loc === 'ar' ? 'ولي الأمر' : 'Guardian'} icon={User}  disabled />
                <Field label={t.relation}        value={loc === 'ar' ? 'والد' : 'Father'}        icon={User}  disabled />
                <Field label={t.emergencyPhone}  value="01098765432"                             icon={Phone} disabled />
                <Field label={t.emergencyEmail}  value="parent@example.com"                      icon={Mail}  disabled type="email" />
              </div>
            </Section>
          </motion.div>
        )}

        {/* Academic Details Tab Content */}
        {tab === 'academic' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Section title={t.academicDetails} icon={GraduationCap}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t.faculty,        value: loc === 'ar' ? profile?.faculty?.nameAr ?? '—'    : profile?.faculty?.nameEn ?? '—' },
                  { label: t.program,        value: loc === 'ar' ? profile?.program?.nameAr ?? '—'    : profile?.program?.nameEn ?? '—' },
                  { label: t.department,     value: loc === 'ar' ? profile?.department?.nameAr ?? '—' : profile?.department?.nameEn ?? '—' },
                  { label: t.currentLevel,   value: `${t.levelPrefix} ${profile?.currentLevel ?? '—'}` },
                  { label: t.enrollYear,     value: String(profile?.enrollmentYear ?? '—') },
                  { label: t.academicStatus, value: t.active, highlight: true },
                ].map((r, idx) => (
                  <div key={idx} className="bg-stone-50/50 dark:bg-stone-850/40 border border-stone-150 dark:border-stone-800 rounded-xl p-3.5 space-y-1">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{r.label}</p>
                    <p className={`text-xs font-bold ${r.highlight ? 'text-[#D97706]' : 'text-stone-800 dark:text-stone-250'}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t.performance} icon={BarChart2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: t.statGpa,   value: gpaVal.toFixed(2), pct: gpaPct,  sub: t.outOf4 },
                  { label: t.statHours, value: String(profile.completedCredits), pct: hoursPct, sub: t.outOf160 },
                ].map((p, idx) => (
                  <div key={idx} className="bg-stone-50/30 dark:bg-stone-850/20 border border-stone-100 dark:border-stone-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-150">{p.label}</p>
                      <p className="text-xl font-extrabold text-[#D97706]">{p.value}</p>
                    </div>
                    <div className="h-1.5 rounded-full mb-2 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-1.5 rounded-full bg-[#FABA19]" style={{ width: `${p.pct}%` }} />
                    </div>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">{p.sub}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t.documents} icon={BookOpen}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[t.doc1, t.doc2, t.doc3, t.doc4].map((doc, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/30 dark:bg-stone-800/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706] shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-stone-800 dark:text-stone-150 truncate">{doc}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/40 shrink-0">
                      {t.uploaded}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* Security / Password Tab Content */}
        {tab === 'security' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Section title={t.changePassword} icon={Lock}>
              <div className="max-w-2xl space-y-4">
                {[t.currentPass, t.newPass, t.confirmPass].map(label => (
                  <div key={label}>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-stone-450 dark:text-stone-500 mb-2">
                      <Lock className="w-4 h-4 text-[#D97706]" />
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        className="w-full px-4 py-2.5 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-150 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className={`absolute inset-y-0 flex items-center px-3 text-stone-400 hover:text-[#D97706]`}
                        style={{ [dir === 'rtl' ? 'left' : 'right']: 0 }}
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => showToast(t.passSaved)}
                  className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm border-0 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {t.updatePass}
                </Button>
              </div>
            </Section>

            <Section title={t.securitySettings} icon={Shield}>
              <div className="space-y-3">
                {[
                  { key: 'twoFactor' as const,  icon: Smartphone,  title: t.twoFactor,   desc: t.twoFactorDesc },
                  { key: 'loginNotif' as const,  icon: BadgeCheck,  title: t.loginNotif,  desc: t.loginNotifDesc },
                  { key: 'activityLog' as const, icon: History,     title: t.activityLog, desc: t.activityLogDesc },
                ].map(({ key, icon: Icon, title, desc }) => {
                  const on = secToggles[key];
                  return (
                    <div key={key} className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/20 dark:bg-stone-800/25 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-[#D97706] shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-850 dark:text-stone-200">{title}</p>
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">{desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          if (!user || !secLoaded) return;
                          const next = { ...secToggles, [key]: !secToggles[key] };
                          setSecToggles(next);
                          await fetch('/api/student/security-settings', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: user.id, ...next }),
                          });
                        }}
                        className={`relative w-10 h-5 rounded-full transition-colors ${on ? 'bg-[#FABA19]' : 'bg-stone-200 dark:bg-stone-800'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                          on
                            ? dir === 'rtl' ? 'right-0.5' : 'left-[22px]'
                            : dir === 'rtl' ? 'right-[22px]' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title={t.loginHistory} icon={History}>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-xs text-center py-6 text-stone-450 dark:text-stone-500 font-semibold">
                    {loc === 'ar' ? 'لا يوجد سجل تسجيل دخول بعد' : 'No login history yet'}
                  </p>
                ) : sessions.map((h) => {
                  const timeAgo = (() => {
                    const diff = Date.now() - new Date(h.createdAt).getTime();
                    const mins = Math.floor(diff / 60000);
                    const hours = Math.floor(diff / 3600000);
                    const days = Math.floor(diff / 86400000);
                    if (mins < 60) return loc === 'ar' ? `منذ ${mins} دقيقة` : `${mins} min ago`;
                    if (hours < 24) return loc === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
                    return loc === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
                  })();
                  return (
                    <div
                      key={h.id}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                        h.isCurrent
                          ? 'bg-amber-500/5 border-amber-500/20'
                          : 'bg-stone-50/20 dark:bg-stone-800/20 border-stone-100 dark:border-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-850 flex items-center justify-center shrink-0">
                          <Monitor className={`w-5 h-5 ${h.isCurrent ? 'text-[#D97706]' : 'text-stone-450'}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-850 dark:text-stone-200">{h.device}</p>
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">{h.location}{h.ipAddress ? ` • ${h.ipAddress}` : ''}</p>
                        </div>
                      </div>
                      <div className="text-end shrink-0">
                        <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold">{timeAgo}</p>
                        {h.isCurrent && (
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#D97706] bg-amber-500/10">
                            {t.current}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}
