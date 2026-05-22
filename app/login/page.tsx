'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import { setAuthData } from '@/lib/authClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  LogIn
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'تسجيل الدخول',
    subtitle: 'أدخل بياناتك للوصول إلى النظام',
    typeStudent: 'طالب',
    typeStaff: 'موظف / دكتور',
    accountType: 'نوع الحساب:',
    staffAdmin: 'موظف',
    staffAssistant: 'معيد',
    staffProfessor: 'دكتور',
    emailLabel: 'الحساب الأكاديمي',
    emailPlaceholderStudent: 'student@aun.edu.eg',
    emailPlaceholderStaff: 'staff@aun.edu.eg',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: '••••••••',
    divider: 'التسجيل التقليدي',
    microsoft: 'تسجيل الدخول بحساب Microsoft',
    microsoftSub: '(@aun.edu.eg)',
    forgotPassword: 'نسيت كلمة المرور؟',
    loginProblem: 'مشكلة في الدخول؟',
    submit: 'تسجيل الدخول',
    submitting: 'جاري تسجيل الدخول...',
    backHome: 'الصفحة الرئيسية',
    help: 'المساعدة',
    copyright: 'جميع الحقوق محفوظة',
    quickLogin: 'دخول سريع (تجريبي)',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور'
  },
  en: {
    title: 'Login',
    subtitle: 'Enter your credentials to access the system',
    typeStudent: 'Student',
    typeStaff: 'Staff / Doctor',
    accountType: 'Account Type:',
    staffAdmin: 'Staff',
    staffAssistant: 'Assistant',
    staffProfessor: 'Professor',
    emailLabel: 'Academic Account',
    emailPlaceholderStudent: 'student@aun.edu.eg',
    emailPlaceholderStaff: 'staff@aun.edu.eg',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    divider: 'Traditional Login',
    microsoft: 'Login with Microsoft Account',
    microsoftSub: '(@aun.edu.eg)',
    forgotPassword: 'Forgot password?',
    loginProblem: 'Login problem?',
    submit: 'Login',
    submitting: 'Logging in...',
    backHome: 'Home Page',
    help: 'Help',
    copyright: 'All rights reserved',
    quickLogin: 'Quick Login (Demo)',
    showPassword: 'Show password',
    hidePassword: 'Hide password'
  },
} as const;

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useTranslations();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const isRtl = locale !== 'en';

  const [loginType, setLoginType] = useState<'student' | 'staff'>('student');
  const [staffType, setStaffType] = useState<'admin' | 'professor' | 'assistant'>('admin');
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
          loginType,
          staffType: loginType === 'staff' ? staffType : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'فشل تسجيل الدخول'); setLoading(false); return; }
      setAuthData(data.token, data.user);
      const role = data.user.role;
      const paths: Record<string, string> = {
        admin: '/admin/dashboard', professor: '/professor/dashboard',
        staff: '/staff/dashboard', assistant: '/assistant/dashboard', student: '/student/dashboard', finance: '/finance/dashboard'
      };
      router.replace(paths[role] ?? '/dashboard');
    } catch {
      setError('حدث خطأ في الاتصال بالخادم');
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: string, email: string) => {
    // Quick Demo Login Handler
    const demoUser = {
      id: 0,
      role,
      email,
      firstName: email.split('@')[0],
      lastName: '',
    } as const;
    setAuthData('demo-token', demoUser);
    const paths: Record<string, string> = {
      admin: '/admin/dashboard', professor: '/professor/dashboard',
      staff: '/staff/dashboard', assistant: '/assistant/dashboard', student: '/student/dashboard', finance: '/finance/dashboard'
    };
    router.replace(paths[role] ?? '/dashboard');
  };

  const handleMicrosoftLogin = () => {
    window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/api/auth/microsoft/callback')}&scope=openid%20profile%20email&state=${loginType}_${staffType}&prompt=select_account`;
  };

  const staffTypes = [
    { key: 'admin' as const,     label: tx.staffAdmin },
    { key: 'assistant' as const, label: tx.staffAssistant },
    { key: 'professor' as const, label: tx.staffProfessor },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-stone-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white">
            
            {/* Header */}
            <div className="px-6 py-7 text-center bg-stone-900 border-b-4 border-[#FABA19]">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center p-2 bg-white border-2 border-stone-800 shadow-inner">
                <Image src="/logo.png" alt="ANU Logo" width={64} height={64} className="object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold mb-1 text-white">{tx.title}</h1>
              <p className="text-sm font-semibold text-white/80">{tx.subtitle}</p>
            </div>

            <CardContent className="p-7 space-y-5">

              {/* Role Toggle */}
              <div className="flex gap-2 rounded-2xl p-1.5 bg-stone-50 border border-stone-200">
                {(['student', 'staff'] as const).map((type) => (
                  <button key={type} type="button" onClick={() => setLoginType(type)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
                    style={loginType === type
                      ? { background: '#FABA19', color: 'white', boxShadow: '0 2px 8px rgba(250, 186, 25, 0.3)' }
                      : { background: 'transparent', color: '#78716c' }}>
                    {type === 'student' ? tx.typeStudent : tx.typeStaff}
                  </button>
                ))}
              </div>

              {/* Staff Type Selector */}
              {loginType === 'staff' && (
                <div>
                  <label className="block text-sm font-bold mb-3 text-stone-800">{tx.accountType}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {staffTypes.map(({ key, label }) => (
                      <button key={key} type="button" onClick={() => setStaffType(key)}
                        className="py-3 rounded-xl font-bold text-sm transition-all border"
                        style={staffType === key
                          ? { background: '#FABA19', color: 'white', borderColor: '#FABA19' }
                          : { background: '#f5f5f4', color: '#78716c', borderColor: '#e7e5e4' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl flex items-center gap-3 text-sm font-bold bg-red-50 text-red-600 border border-red-200">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 font-bold bg-white text-stone-500">{tx.divider}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-800">{tx.emailLabel}</label>
                  <Input type="email" required
                    placeholder={loginType === 'student' ? tx.emailPlaceholderStudent : tx.emailPlaceholderStaff}
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    className="h-11 rounded-xl bg-stone-50 border-stone-200 text-stone-800 focus-visible:ring-[#FABA19]"
                    dir="ltr" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-800">{tx.passwordLabel}</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'} required
                      placeholder={tx.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-11 rounded-xl bg-stone-50 border-stone-200 text-stone-800 focus-visible:ring-[#FABA19] pe-11"
                      dir="ltr" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? tx.hidePassword : tx.showPassword}
                      className="absolute inset-y-0 end-3 flex items-center transition-colors text-stone-400 hover:text-stone-600">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Microsoft Login */}
                <button type="button" onClick={handleMicrosoftLogin}
                  className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all hover:bg-stone-100 bg-stone-50 text-stone-800 border border-stone-200">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23" fill="none" aria-hidden="true">
                    <path d="M11 0H0v11h11V0z" fill="#f25022" />
                    <path d="M23 0H12v11h11V0z" fill="#00a4ef" />
                    <path d="M11 12H0v11h11V12z" fill="#7fba00" />
                    <path d="M23 12H12v11h11V12z" fill="#ffb900" />
                  </svg>
                  <span>{tx.microsoft}</span>
                  <span className="text-xs text-stone-500">{tx.microsoftSub}</span>
                </button>

                {/* Links */}
                <div className="flex items-center justify-between text-sm">
                  <button type="button" className="font-bold text-[#FABA19] hover:text-[#e5a816] transition-colors">
                    {tx.forgotPassword}
                  </button>
                  <Link href="/contact" className="font-semibold text-stone-500 hover:text-stone-700 transition-colors">
                    {tx.loginProblem}
                  </Link>
                </div>

                {/* Submit */}
                <Button type="submit" disabled={loading} className="w-full h-12 font-bold rounded-xl gap-2 transition-all bg-[#FABA19] hover:bg-[#e5a816] text-white shadow-md">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {tx.submitting}
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      {tx.submit}
                    </>
                  )}
                </Button>
              </form>

              {/* Demo shortcuts */}
              <div className="mt-6 border-t border-stone-200 pt-4">
                <p className="mb-3 text-center text-xs font-bold text-stone-400">
                  {tx.quickLogin}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { labelAr: "طالب", labelEn: "Student", email: "student@aun.edu.eg", role: "student" },
                    { labelAr: "أستاذ", labelEn: "Professor", email: "prof@aun.edu.eg", role: "professor" },
                    { labelAr: "مسؤول", labelEn: "Admin", email: "admin@aun.edu.eg", role: "admin" },
                    { labelAr: "مالية", labelEn: "Finance", email: "finance@aun.edu.eg", role: "finance" },
                  ].map((demo) => (
                    <Button
                      key={demo.email}
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-[#FABA19] hover:border-[#FABA19] transition-colors"
                      onClick={() => handleDemoLogin(demo.role, demo.email)}
                    >
                      {isRtl ? demo.labelAr : demo.labelEn}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              <div className="pt-4 flex items-center justify-between text-sm border-t border-stone-200">
                <Link href="/" className="font-bold flex items-center gap-1.5 text-stone-800 hover:text-[#FABA19] transition-colors">
                  {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                  {tx.backHome}
                </Link>
                <Link href="/help" className="font-semibold text-stone-500 hover:text-stone-700 transition-colors">
                  {tx.help}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="h-px flex-1 bg-stone-200" />
                <p className="text-xs font-semibold px-3 whitespace-nowrap text-stone-400">
                  <span className="font-bold text-[#FABA19]"> 2026</span>
                 &nbsp; {tx.copyright}
                </p>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
