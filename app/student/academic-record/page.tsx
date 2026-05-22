'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  MdSchool, MdBarChart, MdMenuBook, MdTrendingUp,
  MdPerson, MdEmail, MdBusiness, MdPrint,
} from 'react-icons/md';

const i18n = {
  ar: {
    title: 'السجل الأكاديمي', subtitle: 'المواد والنقاط والتقديرات',
    academicYear: 'السنة الأكاديمية', semester: 'الفصل',
    subjects: 'عدد المواد', gpa: 'المعدل التراكمي',
    studentData: 'بيانات الطالب', studentName: 'اسم الطالب',
    studentCode: 'رقم الطالب', email: 'البريد الإلكتروني',
    faculty: 'الكلية', dept: 'القسم', program: 'البرنامج',
    level: 'المستوى', enrollYear: 'سنة الالتحاق',
    completedCredits: 'الساعات المكتسبة', totalRequired: 'الساعات المطلوبة',
    subjectDetails: 'تفاصيل المواد', totalSubjects: 'إجمالي المواد',
    colNum: '#', colSemester: 'الفصل', colCode: 'الكود',
    colName: 'المادة', colCredits: 'الساعات',
    colTotal: 'الإجمالي', colGrade: 'التقدير', colPoints: 'النقاط',
    gpaLabel: 'المعدل التراكمي', highestLabel: 'أعلى نقاط',
    perfStats: 'إحصائيات الأداء', gradeDist: 'توزيع التقديرات',
    semInfo: 'معلومات الفصل', currentLevel: 'المستوى الحالي',
    note: 'ملاحظة', noteText: 'السجل الأكاديمي يعرض جميع المواد المسجلة والدرجات والتقديرات.',
    noData: 'لا توجد سجلات أكاديمية بعد', print: 'طباعة',
    inProgress: 'قيد الدراسة',
  },
  en: {
    title: 'Academic Record', subtitle: 'Subjects, points, and grades',
    academicYear: 'Academic Year', semester: 'Semester',
    subjects: 'Subjects', gpa: 'GPA',
    studentData: 'Student Data', studentName: 'Student Name',
    studentCode: 'Student ID', email: 'Email',
    faculty: 'Faculty', dept: 'Department', program: 'Program',
    level: 'Level', enrollYear: 'Enrollment Year',
    completedCredits: 'Earned Credits', totalRequired: 'Required Credits',
    subjectDetails: 'Subject Details', totalSubjects: 'Total Subjects',
    colNum: '#', colSemester: 'Semester', colCode: 'Code',
    colName: 'Course', colCredits: 'Credits',
    colTotal: 'Total', colGrade: 'Grade', colPoints: 'Points',
    gpaLabel: 'GPA', highestLabel: 'Highest Points',
    perfStats: 'Performance Stats', gradeDist: 'Grade Distribution',
    semInfo: 'Semester Info', currentLevel: 'Current Level',
    note: 'Note', noteText: 'The academic record shows all registered subjects, grades, and points.',
    noData: 'No academic records yet', print: 'Print',
    inProgress: 'In Progress',
  },
} as const;

interface RecordItem {
  id: number;
  courseCode: string; courseNameAr: string; courseNameEn: string;
  credits: number; semesterName: string; semesterYear: number;
  midtermGrade: number | null; finalGrade: number | null;
  assignmentGrade: number | null; totalGrade: number | null;
  letterGrade: string | null; gradePoint: number | null; status: string | null;
}
interface StudentInfo {
  email: string; studentNumber: string; currentLevel: number;
  enrollmentYear: number; gpa: number | null;
  completedCredits: number; totalRequired: number;
  programNameAr: string; programNameEn: string;
  deptNameAr: string; deptNameEn: string;
  facultyNameAr: string; facultyNameEn: string;
}
interface PageData { student: StudentInfo; records: RecordItem[] }

function gradeColor(letter: string | null, primary: string): string {
  if (!letter) return '#6b7280';
  if (['A+', 'A'].includes(letter)) return '#22c55e';
  if (['A-', 'B+'].includes(letter)) return '#3b82f6';
  if (['B', 'B-'].includes(letter)) return '#06b6d4';
  if (['C+', 'C', 'C-'].includes(letter)) return primary;
  if (['D+', 'D'].includes(letter)) return '#f97316';
  return '#ef4444';
}


const GRADE_COLORS: Record<string, string> = {
  'A+': '#22c55e', 'A':  '#16a34a',
  'A-': '#3b82f6', 'B+': '#2563eb',
  'B':  '#06b6d4', 'B-': '#0891b2',
  'C+': '#D4A843', 'C':  '#B8902E', 'C-': '#9A7A28',
  'D+': '#f97316', 'D':  '#ea580c',
  'F':  '#ef4444',
};

function GradeDistChart({ gradeCounts, primary, dark }: {
  gradeCounts: Record<string, number>;
  primary: string;
  dark: boolean;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || Object.keys(gradeCounts).length === 0) return;

    let chart: any;
    let ro: ResizeObserver;

    import('echarts').then(echarts => {
      if (!chartRef.current) return;
      chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

      const sorted = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
      const total  = sorted.reduce((s, [, v]) => s + v, 0);

      const data = sorted.map(([name, value]) => ({
        name,
        value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: GRADE_COLORS[name] ?? primary },
            { offset: 1, color: (GRADE_COLORS[name] ?? primary) + 'BB' },
          ]),
          borderRadius: 4,
          borderWidth: 2,
          borderColor: dark ? '#1E1A14' : '#FFFDF8',
        },
      }));

      chart.setOption({
        backgroundColor: 'transparent',
        animation: true,
        animationDuration: 900,
        animationEasing: 'cubicOut' as any,
        animationDelay: (idx: number) => idx * 60,

        tooltip: {
          trigger: 'item',
          backgroundColor: dark ? '#2A2520' : '#FFFDF8',
          borderColor: dark ? '#3A3228' : '#DCCDAE',
          borderWidth: 1,
          padding: [8, 12],
          textStyle: { color: dark ? '#F0E6D0' : '#2F2415', fontSize: 12, fontFamily: 'Cairo, sans-serif' },
          formatter: (p: any) =>
            `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${GRADE_COLORS[p.name] ?? primary};margin-inline-end:6px"></span>`
            + `<b>${p.name}</b>: ${p.value} مادة (${((p.value / total) * 100).toFixed(1)}%)`,
          extraCssText: 'box-shadow:0 4px 20px rgba(0,0,0,0.15);border-radius:10px;',
        },

        graphic: [{
          type: 'text',
          left: '30%',
          top: '43%',
          style: {
            text: String(total),
            textAlign: 'center',
            fill: dark ? '#F0E6D0' : '#2F2415',
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'Cairo, sans-serif',
          },
          z: 100,
        }, {
          type: 'text',
          left: '30%',
          top: '56%',
          style: {
            text: 'مادة',
            textAlign: 'center',
            fill: dark ? '#A89070' : '#7C6943',
            fontSize: 11,
            fontFamily: 'Cairo, sans-serif',
          },
          z: 100,
        }],

        legend: {
          orient: 'vertical',
          right: '2%',
          top: 'middle',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 10,
          textStyle: {
            color: dark ? '#A89070' : '#7C6943',
            fontSize: 11,
            fontFamily: 'Cairo, sans-serif',
            rich: {
              name:  { color: dark ? '#F0E6D0' : '#2F2415', fontWeight: 'bold', fontSize: 11, width: 26 },
              count: { color: dark ? '#A89070' : '#7C6943', fontSize: 10, width: 20, align: 'right' },
              pct:   { color: primary, fontSize: 10, width: 34, align: 'right' },
            },
          },
          formatter: (name: string) => {
            const count = gradeCounts[name] ?? 0;
            const pct   = ((count / total) * 100).toFixed(0);
            return `{name|${name}}  {count|${count}}  {pct|${pct}%}`;
          },
        },

        series: [{
          type: 'pie',
          radius: ['44%', '72%'],
          center: ['32%', '50%'],
          avoidLabelOverlap: true,
          padAngle: 2,
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 8,
            itemStyle: {
              shadowBlur: 16,
              shadowColor: 'rgba(0,0,0,0.25)',
            },
            label: {
              show: true,
              position: 'center',
              fontSize: 14,
              fontWeight: 'bold',
              color: dark ? '#F0E6D0' : '#2F2415',
              fontFamily: 'Cairo, sans-serif',
              formatter: (p: any) => `{a|${p.name}}\n{b|${p.value}}`,
              rich: {
                a: { fontSize: 13, fontWeight: 'bold', lineHeight: 20 },
                b: { fontSize: 18, fontWeight: 'bold', lineHeight: 24, color: primary },
              },
            },
          },
          data,
        }],
      });

      ro = new ResizeObserver(() => chart?.resize());
      ro.observe(chartRef.current!);
    });

    return () => { ro?.disconnect(); chart?.dispose(); };
  
  }, [gradeCounts, dark, primary]);

  if (Object.keys(gradeCounts).length === 0) return null;
  return <div ref={chartRef} style={{ width: '100%', height: 220 }} />;
}

export default function AcademicRecordPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';
  const th  = dark ? darkTheme : theme;

  const card     = dark ? darkTheme.surface    : theme.white;
  const bdr      = dark ? darkTheme.border     : theme.border;
  const bdrL     = dark ? darkTheme.borderLight : theme.border;
  const iconBg   = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface    : theme.primary;
  const heroText = dark ? darkTheme.text       : '#1A1612';

  const [pageData, setPageData]     = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/academic-record?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setPageData(d); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  const info    = pageData?.student;
  const records = pageData?.records ?? [];
  const gpa     = info?.gpa ?? null;

  const highest = useMemo(() => records.length ? Math.max(...records.map(r => r.gradePoint ?? 0)) : 0, [records]);
  const gradeCounts = useMemo(() => records.reduce<Record<string, number>>((acc, r) => {
    if (r.letterGrade) acc[r.letterGrade] = (acc[r.letterGrade] || 0) + 1;
    return acc;
  }, {}), [records]);

  if (loading || !user) return null;

  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  const Skeleton = () => (
    <div className="space-y-2 p-4">
      {[1,2,3,4].map(i => <div key={i} className="h-10 rounded animate-pulse" style={{ background: iconBg }} />)}
    </div>
  );

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-5 p-1">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ background: card, borderColor: bdr, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MdSchool size={22} style={{ color: heroText }} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: heroText }}>{t.title}</h1>
                    <p className="text-sm opacity-75" style={{ color: heroText }}>{t.subtitle}</p>
                  </div>
                </div>
                <button onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
                  style={{ background: 'rgba(0,0,0,0.18)', color: heroText, border: '1px solid rgba(0,0,0,0.12)' }}>
                  <MdPrint size={16} /> {t.print}
                </button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: t.subjects,          value: String(records.length) },
                  { label: t.completedCredits,  value: String(info?.completedCredits ?? 0) },
                  { label: t.totalRequired,     value: String(info?.totalRequired ?? 0) },
                  { label: t.gpa,               value: gpa ? gpa.toFixed(2) : '—', gold: true },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-xs mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-bold text-sm" style={{ color: r.gold ? th.primary : th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ background: card, borderColor: bdr }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MdPerson size={20} style={{ color: th.primary }} />
                <p className="font-bold" style={{ color: th.text }}>{t.studentData}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: t.studentName,      value: `${user.firstName} ${user.lastName}`,                                    icon: MdPerson },
                  { label: t.studentCode,      value: info?.studentNumber ?? user.studentNumber ?? '—',                        icon: MdSchool },
                  { label: t.email,            value: info?.email ?? user.email ?? '—',                                        icon: MdEmail },
                  { label: t.faculty,          value: loc === 'ar' ? (info?.facultyNameAr ?? '—') : (info?.facultyNameEn ?? '—'), icon: MdBusiness },
                  { label: t.dept,             value: loc === 'ar' ? (info?.deptNameAr ?? '—') : (info?.deptNameEn ?? '—'),    icon: MdBusiness },
                  { label: t.program,          value: loc === 'ar' ? (info?.programNameAr ?? '—') : (info?.programNameEn ?? '—'), icon: MdMenuBook },
                  { label: t.level,            value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}`, icon: MdBarChart },
                  { label: t.enrollYear,       value: String(info?.enrollmentYear ?? '—'),                                     icon: MdSchool },
                ].map(r => (
                  <div key={r.label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.75rem 1rem' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <r.icon size={14} style={{ color: th.primary }} />
                      <p className="text-xs" style={{ color: th.textMuted }}>{r.label}</p>
                    </div>
                    <p className="font-bold text-sm truncate" style={{ color: th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card style={{ background: card, borderColor: bdr }}>
            <div style={{ background: iconBg, padding: '0.875rem 1.25rem', borderBottom: `1px solid ${bdrL}` }}
              className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdMenuBook size={20} style={{ color: th.primary }} />
                <p className="font-bold" style={{ color: th.text }}>{t.subjectDetails}</p>
              </div>
              <span className="text-sm" style={{ color: th.textMuted }}>
                {t.totalSubjects}: <span className="font-bold" style={{ color: th.text }}>{records.length}</span>
              </span>
            </div>
            <CardContent className="p-0">
              {dataLoading ? <Skeleton /> : records.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: th.textMuted }}>{t.noData}</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: heroBg }}>
                        {[t.colNum, t.colSemester, t.colCode, t.colName, t.colCredits, t.colTotal, t.colGrade, t.colPoints].map(h => (
                          <TableHead key={h} className="text-xs font-bold h-9 px-3 whitespace-nowrap"
                            style={{ color: heroText, textAlign: 'start' }}>{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.map((r, i) => {
                        const gc = gradeColor(r.letterGrade, th.primary);
                        return (
                          <TableRow key={r.id} style={{ borderTop: `1px solid ${bdrL}`, background: i % 2 === 0 ? iconBg : card }}>
                            <TableCell className="px-3 py-3 text-sm" style={{ color: th.textMuted }}>{i + 1}</TableCell>
                            <TableCell className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: th.textMuted }}>{r.semesterName}</TableCell>
                            <TableCell className="px-3 py-3">
                              <span className="text-xs font-mono font-bold" style={{ color: th.primary }}>{r.courseCode}</span>
                            </TableCell>
                            <TableCell className="px-3 py-3">
                              <p className="text-sm font-semibold whitespace-nowrap" style={{ color: th.text }}>{loc === 'ar' ? r.courseNameAr : r.courseNameEn}</p>
                            </TableCell>
                            <TableCell className="px-3 py-3 text-sm text-center tabular-nums" style={{ color: th.text }}>{r.credits}</TableCell>
                            <TableCell className="px-3 py-3 text-sm font-bold text-center tabular-nums" style={{ color: th.text }}>
                              {r.totalGrade !== null ? r.totalGrade.toFixed(1) : '—'}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-center">
                              {r.letterGrade ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                                  style={{ background: `${gc}22`, color: gc, border: `1px solid ${gc}44` }}>
                                  {r.letterGrade}
                                </span>
                              ) : (
                                <span className="text-xs" style={{ color: th.textMuted }}>{t.inProgress}</span>
                              )}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-center">
                              {r.gradePoint !== null ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                                  style={{ background: `${gc}22`, color: gc, border: `1px solid ${gc}44` }}>
                                  {r.gradePoint.toFixed(2)}
                                </span>
                              ) : '—'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  
                  <div className="flex items-center justify-between px-4 py-3 text-sm"
                    style={{ background: iconBg, borderTop: `2px solid ${bdr}` }}>
                    <span style={{ color: th.textMuted }}>{t.gpaLabel}</span>
                    <span className="font-bold text-lg" style={{ color: th.primary }}>{gpa ? gpa.toFixed(2) : '—'}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">

          
          <motion.div variants={itemAnim}>
            <Card style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MdTrendingUp size={18} style={{ color: th.primary }} />
                  <p className="font-bold text-sm" style={{ color: th.text }}>{t.perfStats}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: t.gpaLabel,         value: gpa ? gpa.toFixed(2) : '—',          color: th.primary },
                    { label: t.subjects,          value: String(records.length),               color: th.text },
                    { label: t.completedCredits,  value: String(info?.completedCredits ?? 0),  color: th.text },
                    { label: t.highestLabel,      value: highest ? highest.toFixed(2) : '—',  color: '#22c55e' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span style={{ color: th.textMuted }}>{r.label}</span>
                      <span className="font-bold" style={{ color: r.color }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          
          <motion.div variants={itemAnim}>
            <Card style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MdBarChart size={18} style={{ color: th.primary }} />
                  <p className="font-bold text-sm" style={{ color: th.text }}>{t.gradeDist}</p>
                </div>
                {Object.keys(gradeCounts).length === 0 ? (
                  <p className="text-xs text-center py-4" style={{ color: th.textMuted }}>{t.noData}</p>
                ) : (
                  <GradeDistChart
                    gradeCounts={gradeCounts}
                    primary={th.primary}
                    dark={dark}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          
          <motion.div variants={itemAnim}>
            <Card style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MdSchool size={18} style={{ color: th.primary }} />
                  <p className="font-bold text-sm" style={{ color: th.text }}>{t.semInfo}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: t.currentLevel,     value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}`, color: th.primary },
                    { label: t.enrollYear,        value: String(info?.enrollmentYear ?? '—') },
                    { label: t.completedCredits,  value: `${info?.completedCredits ?? 0} / ${info?.totalRequired ?? 0}` },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span style={{ color: th.textMuted }}>{r.label}</span>
                      <span className="font-bold" style={{ color: r.color ?? th.text }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
