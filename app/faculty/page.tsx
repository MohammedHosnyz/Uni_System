'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';


import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

const BASE_IMG = 'https://b.aun.edu.eg/fci/sites/default/files/users/';

const facultyMembers = [
  {
    id: 1,
    name: 'أ.د.حسني محمد إبراهيم حسين',
    title: 'أستاذ',
    department: 'قسم تكنولوجيا المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/hosni-mohammed-ibrahim-hussein',
    image: BASE_IMG + '4233.png',
    email: '',
    phone: '',
    office: '',
    specialization: ['تكنولوجيا المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 2,
    name: 'أ.د.يوسف بسيونى مهدى أحمد',
    title: 'أستاذ',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/yousef-bassyouni-mahdy-ahmed',
    image: BASE_IMG + '4234.gif',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 3,
    name: 'أ.د.تيسير حسن عبدالحميد سليمان',
    title: 'أستاذ',
    department: 'قسم نظم المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/taiseer-hassan-abdel-hamid-sulaiman',
    image: BASE_IMG + '4237.PNG',
    email: '',
    phone: '',
    office: '',
    specialization: ['نظم المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 4,
    name: 'أ.د.مرغنى حسن محمد محمد',
    title: 'أستاذ',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/marghany-hassan-mohamed-mohamed',
    image: BASE_IMG + '4236.gif',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 5,
    name: 'أ.د.خالد فتحى حسين صالح',
    title: 'أستاذ',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/khaled-fathy-hussein-saleh',
    image: BASE_IMG + 'WhatsApp%20Image%202024-08-01%20at%203.29.56%20PM.jpeg',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 6,
    name: 'أ.د.عبدالرحمن حيدر عبدالرحمن أحمد',
    title: 'أستاذ',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/abdel-rahman-hedar-abdel-rahman-ahmed',
    image: BASE_IMG + '4239.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 7,
    name: 'أ.د.عادل أبوالمجد سويسى محمد',
    title: 'أستاذ',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/adel-abo-el-magd-sewesy-mohamed',
    image: BASE_IMG + '4235.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 8,
    name: 'أ.د. نجوى محمد عمر',
    title: 'أستاذ',
    department: 'قسم تكنولوجيا المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/nagwa-mohamed-omar',
    image: BASE_IMG + 'img_0.png',
    email: '',
    phone: '',
    office: '',
    specialization: ['تكنولوجيا المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 9,
    name: 'أ.م.د. أحمد إبراهيم طلوبه محمد',
    title: 'أستاذ مساعد',
    department: 'قسم نظم المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/ahmed-ibrahim-taloba-mohamed',
    image: BASE_IMG + '4250.png',
    email: '',
    phone: '',
    office: '',
    specialization: ['نظم المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 10,
    name: 'أ.م.د عماد حمدى أحمد مبروك',
    title: 'أستاذ مساعد',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/ar/emad-hamdy-ahmed-mabrouk',
    image: BASE_IMG + '413.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 11,
    name: 'د. محمد محمد عبدالسميع أحمد',
    title: 'مدرس',
    department: 'قسم علوم الحاسب',
    profileUrl: 'https://b.aun.edu.eg/fci/ar/mohammed-m-abdelsamea',
    image: '',
    email: '',
    phone: '',
    office: '',
    specialization: ['علوم الحاسب'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 12,
    name: 'د. إبراهيم العوضى عبدالحميد السمان',
    title: 'مدرس',
    department: 'قسم نظم المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/ibrahim-e-elsemman',
    image: BASE_IMG + '436.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['نظم المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 13,
    name: 'أ.م.د. اسلام على تاج الدين فتح الله تاج الدين',
    title: 'أستاذ مساعد',
    department: 'قسم تكنولوجيا المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/islam-ali-taj-eddin-fathalla-taj-eddin',
    image: BASE_IMG + 'Dr.%20Islam%20A.T.F.%20Taj-Eddin_0.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['تكنولوجيا المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 14,
    name: 'د. طارق محمد عبدالقادر إبراهيم',
    title: 'مدرس',
    department: 'قسم تكنولوجيا المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/tarik-mohamed-abdel-kader-ibrahim',
    image: BASE_IMG + '398.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['تكنولوجيا المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
  {
    id: 15,
    name: 'د. أحمد أبو بكر محمد محمد',
    title: 'مدرس',
    department: 'قسم تكنولوجيا المعلومات',
    profileUrl: 'https://b.aun.edu.eg/fci/ahmed-abo-bakr-mohamed-mohamed',
    image: BASE_IMG + '4775.jpg',
    email: '',
    phone: '',
    office: '',
    specialization: ['تكنولوجيا المعلومات'],
    education: [],
    publications: [],
    courses: [],
  },
];


function getRankLabel(title: string) {
  if (title === 'أستاذ') return { label: 'أستاذ', color: '#7C3AED' };
  if (title === 'أستاذ مساعد') return { label: 'أستاذ مساعد', color: '#2563EB' };
  return { label: 'مدرس', color: '#059669' };
}

const i18n = {
  ar: {
    title: 'أعضاء هيئة التدريس',
    subtitle: 'تعرف على نخبة من أعضاء هيئة التدريس المتميزين في كلية الحاسبات والمعلومات - جامعة أسيوط',
    filterAll: 'الكل',
    departments: ['الكل', 'قسم علوم الحاسب', 'قسم نظم المعلومات', 'قسم تكنولوجيا المعلومات', 'قسم الوسائط المتعددة'],
    viewProfile: 'عرض الملف الشخصي',
    contactInfo: 'معلومات الاتصال',
    specialization: 'مجالات التخصص',
    education: 'المؤهلات العلمية',
    publications: 'الأبحاث المنشورة',
    courses: 'المقررات التي يدرسها',
    totalCount: 'إجمالي أعضاء هيئة التدريس',
    labels: {
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      office: 'المكتب',
      department: 'القسم',
    },
  },
  en: {
    title: 'Faculty Members',
    subtitle: 'Meet our distinguished faculty members at the Faculty of Computers and Information - Assiut University',
    filterAll: 'All',
    departments: ['All', 'Computer Science', 'Information Systems', 'Information Technology', 'Multimedia'],
    viewProfile: 'View Profile',
    contactInfo: 'Contact Information',
    specialization: 'Specialization Areas',
    education: 'Academic Qualifications',
    publications: 'Published Research',
    courses: 'Courses Taught',
    totalCount: 'Total Faculty Members',
    labels: {
      email: 'Email',
      phone: 'Phone',
      office: 'Office',
      department: 'Department',
    },
  },
};

type Member = typeof facultyMembers[0];

export default function FacultyPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedDept, setSelectedDept] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const tx  = locale === 'en' ? i18n.en : i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t    = dark ? darkTheme : theme;
  const bg1  = dark ? darkTheme.background  : theme.background;
  const bg2  = dark ? darkTheme.surface     : theme.surface;
  const card = dark ? darkTheme.surface     : theme.white;
  const bdr  = dark ? darkTheme.border      : theme.border;
  const bdrL = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text    : theme.text;

  const deptMap: Record<number, string> = {
    1: 'قسم علوم الحاسب',
    2: 'قسم نظم المعلومات',
    3: 'قسم تكنولوجيا المعلومات',
    4: 'قسم الوسائط المتعددة',
  };

  const filtered = facultyMembers.filter(m => {
    const deptMatch = selectedDept === 0 || m.department === deptMap[selectedDept];
    const searchMatch = searchQuery === '' || m.name.includes(searchQuery) || m.department.includes(searchQuery);
    return deptMatch && searchMatch;
  });

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col transition-colors duration-300`}
      style={{ background: bg1 }} dir={dir}><section className="py-20 px-4" style={{ background: heroBg }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: heroText }}>{tx.title}</h1>
          <p className="text-xl max-w-3xl mx-auto font-semibold mb-6" style={{ color: heroText, opacity: 0.85 }}>{tx.subtitle}</p>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.15)', color: heroText }}>
            <span>👨‍🏫</span>
            <span>{facultyMembers.length} {tx.totalCount}</span>
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="ابحث باسم عضو هيئة التدريس..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border text-sm font-semibold outline-none"
              style={{ background: card, borderColor: bdr, color: t.text }}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {tx.departments.map((dept, i) => (
              <button key={dept} onClick={() => setSelectedDept(i)}
                className="px-6 py-3 rounded-lg font-bold transition-all border"
                style={{
                  background: selectedDept === i ? t.primary : card,
                  color: selectedDept === i ? heroText : t.text,
                  borderColor: selectedDept === i ? t.primary : bdr,
                }}>
                {dept}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(member => {
              const rank = getRankLabel(member.title);
              return (
              <div key={member.id} className="rounded-2xl border overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                style={{ background: card, borderColor: bdr }} onClick={() => setSelectedMember(member)}>
                <div className="p-6 text-center relative" style={{ background: heroBg }}>
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: rank.color }}>
                    {rank.label}
                  </span>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4"
                    style={{ borderColor: bdrL, background: iconBg }}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl"
                        style={{ background: iconBg }}>👤</div>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold mb-1 leading-snug" style={{ color: heroText }}>{member.name}</h3>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span style={{ color: t.primary }} className="font-bold shrink-0">🏛</span>
                    <span className="font-semibold" style={{ color: t.textMuted }}>{member.department}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg font-extrabold transition-all hover:opacity-90 text-sm"
                      style={{ background: t.primary, color: heroText }}>
                      {tx.viewProfile}
                    </button>
                    <a href={member.profileUrl} target="_blank" rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg border font-bold text-sm transition-all hover:opacity-80"
                      style={{ borderColor: bdr, color: t.textMuted }}
                      onClick={e => e.stopPropagation()}>
                      🔗
                    </a>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}>
          <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ background: card }} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 p-6 flex items-center justify-between rounded-t-2xl"
              style={{ background: heroBg }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4"
                  style={{ borderColor: bdrL, background: iconBg }}>
                  {selectedMember.image ? (
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold leading-snug" style={{ color: heroText }}>{selectedMember.name}</h2>
                  <p className="text-sm font-semibold mt-1" style={{ color: heroText, opacity: 0.85 }}>
                    {selectedMember.title}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: heroText, opacity: 0.7 }}>
                    {selectedMember.department}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:opacity-80 text-xl font-bold"
                style={{ background: iconBg, borderColor: bdrL, color: t.text }} aria-label="close">
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl border" style={{ background: bg2, borderColor: bdr }}>
                <span className="text-xs font-bold block mb-1" style={{ color: t.textMuted }}>القسم</span>
                <p className="text-sm font-bold" style={{ color: t.text }}>{selectedMember.department}</p>
              </div>

              <a href={selectedMember.profileUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-extrabold transition-all hover:opacity-90"
                style={{ background: t.primary, color: heroText }}>
                <span>🔗</span>
                <span>عرض الملف الكامل على موقع الكلية</span>
              </a>
            </div>
          </div>
        </div>
      )}</div>
  );
}
