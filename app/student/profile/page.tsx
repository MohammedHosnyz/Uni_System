'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  User, Mail, Phone, Calendar, Flag, CreditCard,
  MapPin, Home, Building2, BookOpen, GraduationCap, BarChart2,
  CheckCircle2, Lock, Shield, History, Save, Pencil,
  Smartphone, Eye, EyeOff, Monitor, BadgeCheck,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الملف الشخصي', edit: 'تعديل', save: 'حفظ التغييرات',
    saved: 'تم حفظ التغييرات بنجاح', passSaved: 'تم تحديث كلمة المرور',
    tabPersonal: 'المعلومات الشخصية', tabAcademic: 'المعلومات الأكاديمية', tabSecurity: 'الأمان',
    statGpa: 'المعدل التراكمي', statHours: 'الساعات المكتسبة', statCourses: 'المقررات', statYear: 'سنة الالتحاق',
    studentName: 'اسم الطالب', studentNum: 'رقم الطالب', faculty: 'الكلية', status: 'الحالة',
    active: 'نشط',
    basicData: 'البيانات الأساسية', firstName: 'الاسم الأول', lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني', phone: 'رقم الهاتف', birthDate: 'تاريخ الميلاد',
    nationality: 'الجنسية', nationalId: 'الرقم القومي', gender: 'النوع',
    addressInfo: 'معلومات العنوان', governorate: 'المحافظة', city: 'المدينة',
    address: 'العنوان بالتفصيل', postalCode: 'الرمز البريدي',
    emergency: 'جهة الاتصال في حالات الطوارئ', emergencyName: 'الاسم',
    relation: 'صلة القرابة', emergencyPhone: 'رقم الهاتف', emergencyEmail: 'البريد الإلكتروني',
    academicDetails: 'التفاصيل الأكاديمية', program: 'البرنامج', department: 'القسم',
    currentLevel: 'المستوى الحالي', enrollYear: 'سنة الالتحاق', academicStatus: 'الحالة الأكاديمية',
    performance: 'مؤشرات الأداء', outOf4: 'من 4.00', outOf160: 'من 160 ساعة',
    documents: 'المستندات الأكاديمية', uploaded: 'مرفوع',
    doc1: 'صورة البطاقة الشخصية', doc2: 'شهادة الثانوية العامة',
    doc3: 'شهادة الميلاد', doc4: 'صور شخصية',
    changePassword: 'تغيير كلمة المرور', currentPass: 'كلمة المرور الحالية',
    newPass: 'كلمة المرور الجديدة', confirmPass: 'تأكيد كلمة المرور الجديدة',
    updatePass: 'تحديث كلمة المرور',
    securitySettings: 'إعدادات الأمان',
    twoFactor: 'المصادقة الثنائية', twoFactorDesc: 'تفعيل المصادقة الثنائية لحماية إضافية',
    loginNotif: 'إشعارات تسجيل الدخول', loginNotifDesc: 'تلقي إشعار عند تسجيل الدخول من جهاز جديد',
    activityLog: 'حفظ سجل النشاط', activityLogDesc: 'الاحتفاظ بسجل لجميع أنشطة الحساب',
    loginHistory: 'سجل تسجيل الدخول',
    current: 'الحالي', minutesAgo: 'منذ 5 دقائق', hoursAgo: 'منذ ساعتين', daysAgo: 'منذ يومين',
    assiut: 'أسيوط، مصر', cairo: 'القاهرة، مصر',
    levelPrefix: 'المستوى',
    notAvailable: 'غير متاح',
    egp: 'جنيه',
  },
  en: {
    title: 'Profile', edit: 'Edit', save: 'Save Changes',
    saved: 'Changes saved successfully', passSaved: 'Password updated',
    tabPersonal: 'Personal Info', tabAcademic: 'Academic Info', tabSecurity: 'Security',
    statGpa: 'GPA', statHours: 'Earned Hours', statCourses: 'Courses', statYear: 'Enroll Year',
    studentName: 'Student Name', studentNum: 'Student ID', faculty: 'Faculty', status: 'Status',
    active: 'Active',
    basicData: 'Basic Data', firstName: 'First Name', lastName: 'Last Name',
    email: 'Email', phone: 'Phone', birthDate: 'Birth Date',
    nationality: 'Nationality', nationalId: 'National ID', gender: 'Gender',
    addressInfo: 'Address Info', governorate: 'Governorate', city: 'City',
    address: 'Full Address', postalCode: 'Postal Code',
    emergency: 'Emergency Contact', emergencyName: 'Name',
    relation: 'Relation', emergencyPhone: 'Phone', emergencyEmail: 'Email',
    academicDetails: 'Academic Details', program: 'Program', department: 'Department',
    currentLevel: 'Current Level', enrollYear: 'Enroll Year', academicStatus: 'Academic Status',
    performance: 'Performance Indicators', outOf4: 'out of 4.00', outOf160: 'out of 160 hrs',
    documents: 'Academic Documents', uploaded: 'Uploaded',
    doc1: 'National ID Copy', doc2: 'High School Certificate',
    doc3: 'Birth Certificate', doc4: 'Personal Photos',
    changePassword: 'Change Password', currentPass: 'Current Password',
    newPass: 'New Password', confirmPass: 'Confirm New Password',
    updatePass: 'Update Password',
    securitySettings: 'Security Settings',
    twoFactor: 'Two-Factor Auth', twoFactorDesc: 'Enable 2FA for extra protection',
    loginNotif: 'Login Notifications', loginNotifDesc: 'Get notified on new device login',
    activityLog: 'Activity Log', activityLogDesc: 'Keep a log of all account activity',
    loginHistory: 'Login History',
    current: 'Current', minutesAgo: '5 minutes ago', hoursAgo: '2 hours ago', daysAgo: '2 days ago',
    assiut: 'Assiut, Egypt', cairo: 'Cairo, Egypt',
    levelPrefix: 'Level',
    notAvailable: 'N/A',
    egp: 'EGP',
  },
} as const;

type Tab = 'personal' | 'academic' | 'security';

interface ProfileData {
  id: number; userId: number; studentNumber: string;
  enrollmentYear: number; currentLevel: number; status: string;
  gpa: number | null; completedCredits: number; totalRequired: number; courseCount: number;
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
  const th = dark ? darkTheme : theme;
  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';

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

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

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
      setSecToggles({ twoFactor: secJson?.twoFactor ?? false, loginNotif: secJson?.loginNotif ?? true, activityLog: secJson?.activityLog ?? true });
      setSecLoaded(true);
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

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
  if (fetching || !profile) return (
    <DashboardLayout user={user} role="student">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: th.primary, borderTopColor: 'transparent' }} />
      </div>
    </DashboardLayout>
  );

  const gpaVal = profile.gpa ?? 0;
  const gpaPct = Math.min((gpaVal / 4) * 100, 100);
  const hoursPct = profile.totalRequired > 0 ? Math.min((profile.completedCredits / profile.totalRequired) * 100, 100) : 0;

  const inputStyle = (disabled: boolean): React.CSSProperties => ({
    width: '100%', padding: '0.75rem 1rem',
    background: disabled ? iconBg : card,
    border: `1px solid ${disabled ? bdrL : bdr}`,
    borderRadius: 10, color: disabled ? th.textMuted : th.text,
    outline: 'none', fontSize: '0.875rem', fontWeight: 600,
  });

  const Field = ({ label, value, icon: Icon, disabled = true, type = 'text', span = false, onChange }: {
    label: string; value?: string; icon: React.ElementType; disabled?: boolean;
    type?: string; span?: boolean; onChange?: (v: string) => void;
  }) => (
    <div className={span ? 'md:col-span-2' : ''}>
      <label className="flex items-center gap-1.5 text-sm font-extrabold mb-2" style={{ color: th.textMuted }}>
        <Icon className="w-4 h-4" style={{ color: th.primary }} />{label}
      </label>
      <input type={type} value={value ?? ''} disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        style={inputStyle(disabled)} />
    </div>
  );

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.5rem' }}>
      <div className="flex items-center gap-3 mb-5">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon className="w-5 h-5" style={{ color: th.primary }} />
        </div>
        <p className="text-lg font-extrabold" style={{ color: th.text }}>{title}</p>
      </div>
      {children}
    </div>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6">

        
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl font-bold text-sm"
            style={{ background: th.primary, color: heroText }}>
            <CheckCircle2 className="w-5 h-5" />{toast}
          </div>
        )}

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: dark ? darkTheme.border : 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User className="w-7 h-7" style={{ color: heroText }} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: heroText }}>{t.title}</h1>
                    <p className="text-sm font-semibold opacity-75" style={{ color: heroText }}>{profile?.user?.firstName} {profile?.user?.lastName}</p>
                  </div>
                </div>
                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="px-5 py-2 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all"
                  style={{ background: dark ? darkTheme.surfaceAlt : 'rgba(0,0,0,0.18)', color: heroText, border: `1px solid ${dark ? darkTheme.border : 'rgba(0,0,0,0.15)'}`, cursor: 'pointer' }}>
                  {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  {isEditing ? t.save : t.edit}
                </button>
              </div>
            </div>
            <div style={{ background: iconBg, padding: '1rem 1.5rem' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: t.studentName, value: `${profile?.user?.firstName ?? ''} ${profile?.user?.lastName ?? ''}`.trim() },
                  { label: t.studentNum,  value: profile?.studentNumber ?? '—' },
                  { label: t.faculty,     value: loc === 'ar' ? profile?.faculty?.nameAr ?? '—' : profile?.faculty?.nameEn ?? '—' },
                  { label: t.status,      value: t.active },
                ].map(r => (
                  <div key={r.label} className="text-center">
                    <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-extrabold text-sm" style={{ color: th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BarChart2,    label: t.statGpa,    value: profile.gpa?.toFixed(2) ?? t.notAvailable },
            { icon: CheckCircle2, label: t.statHours,  value: String(profile.completedCredits) },
            { icon: BookOpen,     label: t.statCourses, value: String(profile.courseCount) },
            { icon: Calendar,     label: t.statYear,   value: String(profile.enrollmentYear) },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ transitionDelay: `${i * 60}ms` }}>
              <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: iconBg, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <Icon className="w-5 h-5" style={{ color: th.primary }} />
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{label}</p>
                <p className="text-2xl font-extrabold" style={{ color: th.text }}>{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '0.625rem' }} className="flex gap-2 flex-wrap">
          {([
            { key: 'personal' as Tab, label: t.tabPersonal,  icon: User },
            { key: 'academic' as Tab, label: t.tabAcademic,  icon: GraduationCap },
            { key: 'security' as Tab, label: t.tabSecurity,  icon: Lock },
          ]).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className="px-5 py-2 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all"
              style={{ background: tab === key ? th.primary : iconBg, color: tab === key ? '#1A1612' : th.textMuted, border: `1px solid ${tab === key ? th.primary : bdrL}`, cursor: 'pointer' }}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        
        {tab === 'personal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
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

        
        {tab === 'academic' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Section title={t.academicDetails} icon={GraduationCap}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: t.faculty,        value: loc === 'ar' ? profile?.faculty?.nameAr ?? '—'    : profile?.faculty?.nameEn ?? '—' },
                  { label: t.program,        value: loc === 'ar' ? profile?.program?.nameAr ?? '—'    : profile?.program?.nameEn ?? '—' },
                  { label: t.department,     value: loc === 'ar' ? profile?.department?.nameAr ?? '—' : profile?.department?.nameEn ?? '—' },
                  { label: t.currentLevel,   value: `${t.levelPrefix} ${profile?.currentLevel ?? '—'}` },
                  { label: t.enrollYear,     value: String(profile?.enrollmentYear ?? '—') },
                  { label: t.academicStatus, value: t.active },
                ].map(r => (
                  <div key={r.label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '1rem' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-extrabold" style={{ color: th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t.performance} icon={BarChart2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: t.statGpa,   value: gpaVal.toFixed(2), pct: gpaPct,  sub: t.outOf4 },
                  { label: t.statHours, value: String(profile.completedCredits), pct: hoursPct, sub: t.outOf160 },
                ].map(p => (
                  <div key={p.label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 14, padding: '1.25rem' }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-extrabold" style={{ color: th.text }}>{p.label}</p>
                      <p className="text-2xl font-extrabold" style={{ color: th.primary }}>{p.value}</p>
                    </div>
                    <div className="h-2.5 rounded-full mb-2" style={{ background: bdrL }}>
                      <div className="h-2.5 rounded-full" style={{ width: `${p.pct}%`, background: th.primary }} />
                    </div>
                    <p className="text-xs" style={{ color: th.textMuted }}>{p.sub}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t.documents} icon={BookOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[t.doc1, t.doc2, t.doc3, t.doc4].map((doc, i) => (
                  <div key={i} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem 1rem' }}
                    className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <BookOpen className="w-5 h-5" style={{ color: th.primary }} />
                      </div>
                      <p className="font-extrabold truncate" style={{ color: th.text }}>{doc}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-extrabold flex-shrink-0"
                      style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
                      {t.uploaded}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        
        {tab === 'security' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Section title={t.changePassword} icon={Lock}>
              <div className="max-w-2xl space-y-4">
                {[t.currentPass, t.newPass, t.confirmPass].map(label => (
                  <div key={label}>
                    <label className="flex items-center gap-1.5 text-sm font-extrabold mb-2" style={{ color: th.textMuted }}>
                      <Lock className="w-4 h-4" style={{ color: th.primary }} />{label}
                    </label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'}
                        style={{ ...inputStyle(false), paddingInlineEnd: '2.75rem' }} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute inset-y-0 flex items-center px-3"
                        style={{ [dir === 'rtl' ? 'left' : 'right']: 0, color: th.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}>
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => showToast(t.passSaved)}
                  className="w-full py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2"
                  style={{ background: th.primary, color: heroText, border: `1px solid ${th.primary}`, cursor: 'pointer' }}>
                  <Save className="w-4 h-4" />{t.updatePass}
                </button>
              </div>
            </Section>

            <Section title={t.securitySettings} icon={Shield}>
              <div className="space-y-3">
                {([
                  { key: 'twoFactor' as const,  icon: Smartphone,  title: t.twoFactor,   desc: t.twoFactorDesc },
                  { key: 'loginNotif' as const,  icon: BadgeCheck,  title: t.loginNotif,  desc: t.loginNotifDesc },
                  { key: 'activityLog' as const, icon: History,     title: t.activityLog, desc: t.activityLogDesc },
                ]).map(({ key, icon: Icon, title, desc }) => {
                  const on = secToggles[key];
                  return (
                    <div key={key} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 14, padding: '1rem 1.25rem' }}
                      className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: card, border: `1px solid ${bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon className="w-5 h-5" style={{ color: th.primary }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold" style={{ color: th.text }}>{title}</p>
                          <p className="text-sm" style={{ color: th.textMuted }}>{desc}</p>
                        </div>
                      </div>
                      <button onClick={async () => {
                          if (!user || !secLoaded) return;
                          const next = { ...secToggles, [key]: !secToggles[key] };
                          setSecToggles(next);
                          await fetch('/api/student/security-settings', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: user.id, ...next }),
                          });
                        }}
                        className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
                        style={{ background: on ? th.primary : bdrL, cursor: 'pointer', border: 'none' }}>
                        <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                          style={{ [dir === 'rtl' ? 'right' : 'left']: on ? '1.5rem' : '0.25rem' }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title={t.loginHistory} icon={History}>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-sm text-center py-6" style={{ color: th.textMuted }}>
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
                    <div key={h.id} style={{
                      background: h.isCurrent ? `${th.primary}11` : iconBg,
                      border: `1px solid ${h.isCurrent ? `${th.primary}44` : bdrL}`,
                      borderRadius: 14, padding: '1rem 1.25rem',
                    }} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: h.isCurrent ? `${th.primary}22` : iconBg, border: `1px solid ${h.isCurrent ? `${th.primary}44` : bdrL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Monitor className="w-5 h-5" style={{ color: h.isCurrent ? th.primary : th.textMuted }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold" style={{ color: th.text }}>{h.device}</p>
                          <p className="text-sm" style={{ color: th.textMuted }}>{h.location}{h.ipAddress ? ` • ${h.ipAddress}` : ''}</p>
                        </div>
                      </div>
                      <div className="text-center flex-shrink-0">
                        <p className="text-sm" style={{ color: th.textMuted }}>{timeAgo}</p>
                        {h.isCurrent && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-extrabold"
                            style={{ background: `${th.primary}22`, color: th.primary, border: `1px solid ${th.primary}44` }}>
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
