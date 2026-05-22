'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTranslations } from '@/lib/useTranslations';
import { theme, darkTheme } from '@/lib/theme';
import { CreditCard, Printer, Download, Mail, GraduationCap, Phone, MapPin, Globe, Shield, Hash, User, CheckCircle2 } from 'lucide-react';

const i18n = {
  ar: {
    title: 'البطاقة الجامعية', subtitle: 'بطاقة هوية الطالب الرسمية',
    university: 'جامعة أسيوط الأهلية', universityEn: 'Assiut National University',
    nameLabel: 'الاسم الكامل', idLabel: 'رقم الطالب', levelLabel: 'المستوى',
    programLabel: 'البرنامج', facultyLabel: 'الكلية',
    issuedLabel: 'تاريخ الإصدار', validLabel: 'صالح حتى', studentId: 'STUDENT ID',
    levelPrefix: 'المستوى',
    print: 'طباعة', download: 'تحميل PDF', sendEmail: 'إرسال بالبريد',
    printConfirm: 'جارٍ تحضير البطاقة للطباعة...', downloadConfirm: 'جارٍ تحضير ملف PDF...',
    emailConfirm: 'تم إرسال البطاقة على بريدك الإلكتروني',
    backTitle: 'شروط الاستخدام', contactTitle: 'معلومات الاتصال',
    rule1: 'هذه البطاقة ملك جامعة أسيوط الأهلية ويجب إعادتها عند الطلب',
    rule2: 'يجب إبراز هذه البطاقة عند دخول الجامعة والامتحانات',
    rule3: 'في حالة الفقد يجب الإبلاغ فوراً وسيتم إصدار بدل فاقد برسوم',
    rule4: 'البطاقة شخصية ولا يجوز استخدامها من قبل شخص آخر',
    address: 'أسيوط، مصر', phone: '088-1234567',
    website: 'www.aun.edu.eg',
    scanHint: 'امسح للتحقق', cardProperty: 'هذه البطاقة ملك جامعة أسيوط الأهلية',
    importantTitle: 'معلومات هامة',
    imp1: 'احتفظ بالبطاقة في مكان آمن', imp2: 'يجب تجديد البطاقة سنوياً',
    imp3: 'رسوم بدل الفاقد: 100 جنيه', imp4: 'مدة إصدار بدل الفاقد: 3-5 أيام',
    front: 'الوجه الأمامي', back: 'الوجه الخلفي',
  },
  en: {
    title: 'University ID Card', subtitle: 'Official Student Identity Card',
    university: 'Assiut National University', universityEn: 'جامعة أسيوط الأهلية',
    nameLabel: 'Full Name', idLabel: 'Student ID', levelLabel: 'Level',
    programLabel: 'Program', facultyLabel: 'Faculty',
    issuedLabel: 'Issue Date', validLabel: 'Valid Until', studentId: 'STUDENT ID',
    levelPrefix: 'Level',
    print: 'Print', download: 'Download PDF', sendEmail: 'Send by Email',
    printConfirm: 'Preparing card for printing...', downloadConfirm: 'Preparing PDF file...',
    emailConfirm: 'Card sent to your email',
    backTitle: 'Terms of Use', contactTitle: 'Contact Information',
    rule1: 'This card is the property of Assiut National University and must be returned on request',
    rule2: 'This card must be presented when entering the university and during exams',
    rule3: 'In case of loss, report immediately — a replacement will be issued for a fee',
    rule4: 'This card is personal and may not be used by another person',
    address: 'Assiut, Egypt', phone: '088-1234567',
    website: 'www.aun.edu.eg',
    scanHint: 'Scan to verify', cardProperty: 'Property of Assiut National University',
    importantTitle: 'Important Information',
    imp1: 'Keep the card in a safe place', imp2: 'Card must be renewed annually',
    imp3: 'Replacement fee: 100 EGP', imp4: 'Replacement issuance: 3-5 days',
    front: 'Front Side', back: 'Back Side',
  },
} as const;

interface ProfileData {
  studentNumber: string; enrollmentYear: number; currentLevel: number;
  user: { firstName: string; lastName: string; email: string; phone: string | null };
  program: { nameAr: string; nameEn: string };
  department: { nameAr: string; nameEn: string };
  faculty: { nameAr: string; nameEn: string };
}


const Barcode = ({ light }: { light: boolean }) => (
  <svg viewBox="0 0 130 36" style={{ width: '100%', height: 36 }}>
    {[3,7,10,14,17,22,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125].map((x, i) => (
      <rect key={i} x={x} y={2} width={i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1} height={32}
        fill={light ? 'rgba(255,255,255,0.9)' : '#2F2415'} />
    ))}
  </svg>
);


const QRCode = ({ light, bg }: { light: boolean; bg: string }) => {
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
  const fg = light ? 'rgba(255,255,255,0.95)' : '#2F2415';
  return (
    <svg viewBox={`0 0 ${17*s} ${16*s}`} style={{ width: 80, height: 80 }}>
      <rect width="100%" height="100%" fill={bg} rx="4" />
      {cells.map((row, r) => row.map((cell, c) =>
        cell ? <rect key={`${r}-${c}`} x={c*s} y={r*s} width={s} height={s} fill={fg} /> : null
      ))}
    </svg>
  );
};


export default function IDCardPage() {
  const { user, loading } = useAuth();
  const { dark: isDark } = useDarkMode();
  const { locale } = useTranslations();
  const th = isDark ? darkTheme : theme;
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
    showToast(t.downloadConfirm);
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
  }, [profile, t.downloadConfirm, showToast]);

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
      .then(d => { setProfile(d); setFetching(false); })
      .catch(() => setFetching(false));
  }, [user?.id]);


  if (loading || !user) return null;

  // Derive display values safely AFTER auth guard — profile.user may be undefined if API errored
  const issueDate = profile ? `${profile.enrollmentYear}/09/01` : '—';
  const validDate = profile ? `${profile.enrollmentYear + 4}/06/30` : '—';
  const fullName  = profile ? `${profile.user?.firstName ?? ''} ${profile.user?.lastName ?? ''}`.trim() || '—' : '—';

  const heroText  = isDark ? '#1A1612' : '#fff';
  const cardBg    = isDark ? '#1E1A14' : '#FFFDF8';
  const iconBg    = isDark ? '#2A2520' : '#F3EBDD';
  const goldGrad  = `linear-gradient(135deg, ${th.primary} 0%, ${isDark ? '#C9A030' : '#B8902E'} 100%)`;
  const cardShadow = isDark
    ? '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)'
    : '0 8px 32px rgba(47,36,21,0.18), 0 2px 8px rgba(47,36,21,0.10)';

  const CARD_W = 340;
  const CARD_H = 215;


  
  const FrontCard = () => (
    <div style={{
      width: CARD_W, height: CARD_H, borderRadius: 16, overflow: 'hidden',
      boxShadow: cardShadow, flexShrink: 0, position: 'relative',
      background: cardBg, border: `1px solid ${th.border}`,
    }}>
      
      <div style={{ background: goldGrad, padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <GraduationCap size={18} color="#fff" />
        </div>
        <div style={{ textAlign: 'center', flex: 1, padding: '0 8px' }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 11, letterSpacing: 0.3 }}>{t.university}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 8.5, marginTop: 1 }}>{t.universityEn}</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 6, padding: '2px 7px', color: '#fff', fontSize: 7.5, fontWeight: 700, letterSpacing: 1, flexShrink: 0,
        }}>{t.studentId}</div>
      </div>

      
      <div style={{ display: 'flex', padding: '12px 14px 0', gap: 12, height: 'calc(100% - 58px - 44px)' }}>
        
        <div style={{
          width: 64, height: 80, borderRadius: 8, flexShrink: 0,
          background: iconBg, border: `2px solid ${th.primary}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <User size={28} color={th.primary} />
          <div style={{ fontSize: 7, color: th.textMuted, textAlign: 'center', lineHeight: 1.2 }}>صورة<br/>الطالب</div>
        </div>

        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>
            <div style={{ fontSize: 7.5, color: th.textMuted, marginBottom: 1 }}>{t.nameLabel}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: th.text, lineHeight: 1.2 }}>
              {fetching ? '...' : fullName}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div>
              <div style={{ fontSize: 7.5, color: th.textMuted, marginBottom: 1 }}>{t.idLabel}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: th.primary, letterSpacing: 0.5 }}>
                {fetching ? '...' : (profile?.studentNumber ?? '—')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 7.5, color: th.textMuted, marginBottom: 1 }}>{t.levelLabel}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: th.text }}>
                {fetching ? '...' : `${t.levelPrefix} ${profile?.currentLevel ?? '—'}`}
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, color: th.textMuted, marginBottom: 1 }}>{t.facultyLabel}</div>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: th.text, lineHeight: 1.3 }}>
              {fetching ? '...' : (profile?.faculty?.nameAr ?? '—')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, color: th.textMuted, marginBottom: 1 }}>{t.programLabel}</div>
            <div style={{ fontSize: 9, color: th.text, lineHeight: 1.3 }}>
              {fetching ? '...' : (profile?.program?.nameAr ?? '—')}
            </div>
          </div>
        </div>
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 14px 0' }}>
        <div>
          <span style={{ fontSize: 7.5, color: th.textMuted }}>{t.issuedLabel}: </span>
          <span style={{ fontSize: 8, fontWeight: 600, color: th.text }}>{issueDate}</span>
        </div>
        <div>
          <span style={{ fontSize: 7.5, color: th.textMuted }}>{t.validLabel}: </span>
          <span style={{ fontSize: 8, fontWeight: 600, color: th.primary }}>{validDate}</span>
        </div>
      </div>

      
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: goldGrad, padding: '4px 14px 5px', height: 44,
        display: 'flex', alignItems: 'center',
      }}>
        <Barcode light={true} />
      </div>
    </div>
  );

  
  const BackCard = () => (
    <div style={{
      width: CARD_W, height: CARD_H, borderRadius: 16, overflow: 'hidden',
      boxShadow: cardShadow, flexShrink: 0, position: 'relative',
      background: cardBg, border: `1px solid ${th.border}`,
    }}>
      
      <div style={{ background: goldGrad, height: 8 }} />

      
      <div style={{ display: 'flex', height: 'calc(100% - 8px - 32px)', padding: '10px 14px', gap: 12 }}>
        
        <div style={{ flex: 1 }}>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: th.primary, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Phone size={10} color={th.primary} />{t.contactTitle}
            </div>
            {[
              { icon: <MapPin size={8} color={th.textMuted} />, val: t.address },
              { icon: <Phone size={8} color={th.textMuted} />, val: t.phone },
              { icon: <Globe size={8} color={th.textMuted} />, val: t.website },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                {item.icon}
                <span style={{ fontSize: 7.5, color: th.textMuted }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 8, width: 96, flexShrink: 0,
        }}>
          <QRCode light={false} bg={iconBg} />
          <div style={{ fontSize: 7, color: th.textMuted, textAlign: 'center' }}>{t.scanHint}</div>
          <div style={{
            background: iconBg, border: `1px solid ${th.border}`,
            borderRadius: 6, padding: '3px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Hash size={8} color={th.primary} />
            <span style={{ fontSize: 8, fontWeight: 700, color: th.primary, letterSpacing: 0.5 }}>
              {profile?.studentNumber ?? '—'}
            </span>
          </div>
        </div>
      </div>

      
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: goldGrad, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontSize: 8, fontWeight: 600, letterSpacing: 0.5 }}>{t.cardProperty}</span>
      </div>
    </div>
  );

  
  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} style={{ minHeight: '100vh', background: th.background, padding: '0 0 40px' }}>

        
        {toastMsg && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl font-bold text-sm"
            style={{ background: th.primary, color: heroText }}>
            <CheckCircle2 className="w-5 h-5" />{toastMsg}
          </div>
        )}

        
        <div style={{
          background: `linear-gradient(135deg, ${th.primary}22 0%, ${th.primary}08 100%)`,
          borderBottom: `1px solid ${th.border}`,
          padding: '28px 24px 20px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `${th.primary}22`, border: `1.5px solid ${th.primary}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CreditCard size={24} color={th.primary} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: th.text }}>{t.title}</h1>
              <p style={{ margin: 0, fontSize: 13, color: th.textMuted }}>{t.subtitle}</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

          
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { icon: <Printer size={15} />, label: t.print,     action: handlePrint },
              { icon: <Download size={15} />, label: t.download,  action: handleDownload },
              { icon: <Mail size={15} />,     label: t.sendEmail, action: handleEmail },
            ].map((btn, i) => (
              <button key={i}
                onClick={btn.action}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px', borderRadius: 10, cursor: 'pointer',
                  background: i === 0 ? th.primary : 'transparent',
                  color: i === 0 ? '#fff' : th.primary,
                  border: `1.5px solid ${th.primary}`,
                  fontSize: 13, fontWeight: 600, transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          
          <div ref={cardAreaRef} className="print-cards-only" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: th.textMuted }}>{t.front}</div>
              <FrontCard />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: th.textMuted }}>{t.back}</div>
              <BackCard />
            </div>
          </div>

          
          <div style={{ background: cardBg, border: `1px solid ${th.border}`, borderRadius: 14, overflow: 'hidden' }}>
            
            
            
        
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
