'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTranslations } from '@/lib/useTranslations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard, Printer, Download, Mail, GraduationCap,
  Phone, MapPin, Globe, Hash, User, CheckCircle2,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'البطاقة والهوية الجامعية الذكية',
    subtitle: 'الهوية الطلابية الرسمية وبطاقة إثبات القيد بالجامعة',
    university: 'جامعة أسيوط الأهلية',
    universityEn: 'Assiut National University',
    nameLabel: 'اسم الطالب الرباعي',
    idLabel: 'الرقم الأكاديمي الموحد',
    levelLabel: 'المستوى الدراسي',
    programLabel: 'البرنامج التعليمي',
    facultyLabel: 'الكلية / التخصص',
    issuedLabel: 'تاريخ إصدار الهوية',
    validLabel: 'تاريخ انتهاء الصلاحية',
    studentId: 'STUDENT ID',
    levelPrefix: 'المستوى',
    print: 'طباعة البطاقة الجامعية',
    download: 'تحميل كبطاقة رقمية PDF',
    sendEmail: 'إرسال نسخة للبريد الإلكتروني',
    emailConfirm: 'تم إرسال البطاقة الأكاديمية بنجاح لبريدك الإلكتروني المعتمد ✓',
    backTitle: 'شروط استخدام الهوية الجامعية',
    contactTitle: 'معلومات الدعم الفني والأمن',
    address: 'أسيوط الجديدة، مصر',
    phone: '088-2300100',
    website: 'www.aun.edu.eg',
    scanHint: 'امسح الرمز للتحقق من الصلاحية',
    cardProperty: 'هذه البطاقة وثيقة رسمية ملك جامعة أسيوط الأهلية',
    front: 'الوجه الأمامي للبطاقة',
    back: 'الوجه الخلفي للبطاقة',
  },
  en: {
    title: 'Smart University ID Card',
    subtitle: 'Official digital student identification and access card',
    university: 'Assiut National University',
    universityEn: 'جامعة أسيوط الأهلية',
    nameLabel: 'Full Student Name',
    idLabel: 'Unique Student ID',
    levelLabel: 'Academic Level',
    programLabel: 'Academic Program',
    facultyLabel: 'Faculty / College',
    issuedLabel: 'Date of Issue',
    validLabel: 'Date of Expiry',
    studentId: 'STUDENT ID',
    levelPrefix: 'Level',
    print: 'Print Physical Card',
    download: 'Download Digital PDF',
    sendEmail: 'Send to Registered Email',
    emailConfirm: 'Academic card details successfully sent to your email ✓',
    backTitle: 'Terms of Use & Verification',
    contactTitle: 'Campus Support & Security',
    address: 'New Assiut City, Egypt',
    phone: '088-2300100',
    website: 'www.aun.edu.eg',
    scanHint: 'Scan code to verify student status',
    cardProperty: 'This card remains the property of Assiut National University',
    front: 'ID Card Front Side',
    back: 'ID Card Back Side',
  },
} as const;

interface ProfileData {
  studentNumber: string;
  enrollmentYear: number;
  currentLevel: number;
  user: { firstName: string; lastName: string; email: string; phone: string | null };
  program: { nameAr: string; nameEn: string };
  department: { nameAr: string; nameEn: string };
  faculty: { nameAr: string; nameEn: string };
}

const Barcode = () => (
  <svg viewBox="0 0 130 36" className="w-full h-9">
    {[3,7,10,14,17,22,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125].map((x, i) => (
      <rect
        key={i}
        x={x}
        y={2}
        width={i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1}
        height={32}
        className="fill-white/90"
      />
    ))}
  </svg>
);

const QRCode = () => {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1],
    [0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0],
    [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
  ];
  const s = 5;
  return (
    <svg viewBox={`0 0 ${17*s} ${16*s}`} className="w-20 h-20">
      <rect width="100%" height="100%" className="fill-stone-100 dark:fill-stone-800" rx="4" />
      {cells.map((row, r) => row.map((cell, c) =>
        cell ? <rect key={`${r}-${c}`} x={c*s} y={r*s} width={s} height={s} className="fill-stone-850 dark:fill-stone-200" /> : null
      ))}
    </svg>
  );
};

export default function IDCardPage() {
  const { user, loading } = useAuth();
  const { dark: isDark } = useDarkMode();
  const { locale } = useTranslations();
  const t = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const cardAreaRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardAreaRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(cardAreaRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      const name = profile ? `${profile.user?.firstName ?? 'student'}_${profile.user?.lastName ?? ''}`.trim() : 'student';
      pdf.save(`ID_Card_${name}.pdf`);
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  const handleEmail = useCallback(() => {
    const name = profile ? `${profile.user?.firstName ?? ''} ${profile.user?.lastName ?? ''}`.trim() : '';
    const id   = profile?.studentNumber ?? '';
    const subject = encodeURIComponent(`البطاقة الجامعية - ${name}`);
    const body    = encodeURIComponent(
      `مرحباً،\n\nبيانات البطاقة الجامعية:\nالاسم: ${name}\nرقم الطالب: ${id}\nالكلية: ${profile?.faculty?.nameAr ?? ''}\nالبرنامج: ${profile?.program?.nameAr ?? ''}\n\nجامعة أسيوط الأهلية`
    );
    const email = profile?.user.email ?? '';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    showToast(t.emailConfirm);
  }, [profile, t.emailConfirm, showToast]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/profile?userId=${user.id}`)
      .then(r => r.json())
      .then(d => {
        setProfile(d);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user?.id]);

  if (loading || !user) return null;

  const issueDate = profile ? `${profile.enrollmentYear}/09/01` : '—';
  const validDate = profile ? `${profile.enrollmentYear + 4}/06/30` : '—';
  const fullName  = profile ? `${profile.user?.firstName ?? ''} ${profile.user?.lastName ?? ''}`.trim() || '—' : '—';

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {toastMsg && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-bold text-xs bg-[#FABA19] text-white">
            <CheckCircle2 className="w-4.5 h-4.5" />
            {toastMsg}
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">{t.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3 flex-wrap p-4 bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-2xl shadow-sm">
          {[
            { icon: Printer, label: t.print,     action: handlePrint,     primary: true },
            { icon: Download, label: t.download,  action: handleDownload,  primary: false },
            { icon: Mail,     label: t.sendEmail, action: handleEmail,     primary: false },
          ].map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <Button
                key={idx}
                onClick={btn.action}
                className={`text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-1.5 ${
                  btn.primary
                    ? 'bg-[#FABA19] hover:bg-[#e5a816] text-white border-0'
                    : 'bg-stone-50 hover:bg-stone-150 dark:bg-stone-850 dark:hover:bg-stone-800 text-[#D97706] border border-stone-200 dark:border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {btn.label}
              </Button>
            );
          })}
        </div>

        {/* ID Cards Layout Wrapper */}
        <div ref={cardAreaRef} className="flex gap-8 flex-wrap justify-center py-6 px-4 bg-stone-50/30 dark:bg-stone-850/5 border border-stone-150 dark:border-stone-800 rounded-2xl">
          
          {/* Front Side */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-stone-450 dark:text-stone-500">{t.front}</span>
            <div className="w-[340px] h-[215px] rounded-2xl overflow-hidden shadow-md relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between shrink-0">
              
              {/* Gold Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2.5 flex items-center justify-between text-white shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div className="text-center flex-1 px-2 min-w-0">
                  <p className="font-bold text-[10px] truncate">{t.university}</p>
                  <p className="text-[7.5px] text-white/80 font-mono truncate">{t.universityEn}</p>
                </div>
                <div className="bg-white/25 border border-white/40 rounded px-1.5 py-0.5 text-[7px] font-bold tracking-wider shrink-0">
                  {t.studentId}
                </div>
              </div>

              {/* Body Details */}
              <div className="flex px-4 py-3 gap-3.5 flex-1 min-h-0 items-center">
                <div className="w-16 h-20 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center gap-1 shrink-0 text-[#D97706]">
                  <User className="w-8 h-8" />
                  <span className="text-[6.5px] text-stone-400 dark:text-stone-500 font-bold text-center leading-tight">PHOTO</span>
                </div>

                <div className="flex-1 space-y-1.5 min-w-0 text-start">
                  <div>
                    <span className="block text-[6.5px] text-stone-400 dark:text-stone-500 font-bold">{t.nameLabel}</span>
                    <span className="block text-[10.5px] font-bold text-stone-800 dark:text-stone-150 leading-tight truncate">
                      {fetching ? '...' : fullName}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <span className="block text-[6.5px] text-stone-400 dark:text-stone-500 font-bold">{t.idLabel}</span>
                      <span className="block text-[9px] font-bold text-[#D97706] font-mono leading-none mt-0.5">
                        {fetching ? '...' : (profile?.studentNumber ?? '—')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[6.5px] text-stone-400 dark:text-stone-500 font-bold">{t.levelLabel}</span>
                      <span className="block text-[9px] font-bold text-stone-800 dark:text-stone-200 leading-none mt-0.5">
                        {fetching ? '...' : `${t.levelPrefix} ${profile?.currentLevel ?? '—'}`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[6.5px] text-stone-400 dark:text-stone-500 font-bold">{t.facultyLabel}</span>
                    <span className="block text-[8.5px] font-bold text-stone-800 dark:text-stone-200 leading-tight truncate">
                      {fetching ? '...' : (profile?.faculty?.nameAr ?? '—')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[6.5px] text-stone-400 dark:text-stone-500 font-bold">{t.programLabel}</span>
                    <span className="block text-[8px] font-semibold text-stone-600 dark:text-stone-400 leading-tight truncate">
                      {fetching ? '...' : (profile?.program?.nameAr ?? '—')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Dates */}
              <div className="px-4 pb-12 flex justify-between text-[7px] text-stone-400 dark:text-stone-500 shrink-0 font-semibold">
                <div>{t.issuedLabel}: <span className="font-bold text-stone-700 dark:text-stone-300">{issueDate}</span></div>
                <div>{t.validLabel}: <span className="font-bold text-[#D97706]">{validDate}</span></div>
              </div>

              {/* Barcode Footer Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 h-11 flex items-center justify-center shrink-0">
                <Barcode />
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-stone-450 dark:text-stone-500">{t.back}</span>
            <div className="w-[340px] h-[215px] rounded-2xl overflow-hidden shadow-md relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between shrink-0">
              
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 shrink-0" />

              {/* Body Details Back */}
              <div className="flex px-4 py-3 gap-4 flex-1 items-center justify-between text-start">
                
                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <p className="text-[8.5px] font-bold text-[#D97706] flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3" />
                      {t.contactTitle}
                    </p>
                    <div className="space-y-1 font-semibold text-stone-450 dark:text-stone-500 text-[7px]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                        <span className="truncate">{t.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                        <span>{t.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                        <span className="font-mono">{t.website}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Section */}
                <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-24">
                  <QRCode />
                  <span className="text-[6.5px] text-stone-400 dark:text-stone-500 font-bold text-center mt-0.5">{t.scanHint}</span>
                  <div className="bg-stone-50 dark:bg-stone-850 border border-stone-150 dark:border-stone-800 rounded px-1.5 py-0.5 flex items-center gap-1 shrink-0">
                    <Hash className="w-2.5 h-2.5 text-[#D97706]" />
                    <span className="text-[7.5px] font-bold text-[#D97706] font-mono leading-none">
                      {profile?.studentNumber ?? '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2.5 h-9 flex items-center justify-center shrink-0">
                <span className="text-white text-[8px] font-bold tracking-wide">{t.cardProperty}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
