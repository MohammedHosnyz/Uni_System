'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import {
  MdSchool, MdSchedule, MdPrint, MdMenuBook, MdTrendingUp, MdCheckCircle,
} from 'react-icons/md';

const i18n = {
  ar: {
    title: 'كشف الدرجات', print: 'طباعة',
    studentName: 'اسم الطالب', studentNum: 'رقم الطالب',
    faculty: 'الكلية', dept: 'القسم', level: 'المستوى',
    gpa: 'المعدل التراكمي', earnedHours: 'الساعات المكتسبة',
    filterAll: 'الكل', filterDone: 'المكتملة', filterCurrent: 'الحالية',
    colNum: '#', colSemester: 'الفصل', colCode: 'الكود', colName: 'المادة',
    colCredits: 'الساعات', colMid: 'المنتصف', colFinal: 'النهائي',
    colAssign: 'الواجبات', colTotal: 'الإجمالي', colGrade: 'التقدير',
    inProgress: 'قيد الدراسة', pending: '—',
    sumDone: 'المكتملة', sumCurrent: 'الحالية', sumRemaining: 'المتبقي',
    noData: 'لا توجد درجات',
  },
  en: {
    title: 'Grade Report', print: 'Print',
    studentName: 'Student Name', studentNum: 'Student ID',
    faculty: 'Faculty', dept: 'Department', level: 'Level',
    gpa: 'GPA', earnedHours: 'Earned Credits',
    filterAll: 'All', filterDone: 'Completed', filterCurrent: 'In Progress',
    colNum: '#', colSemester: 'Semester', colCode: 'Code', colName: 'Course',
    colCredits: 'Credits', colMid: 'Midterm', colFinal: 'Final',
    colAssign: 'Assignments', colTotal: 'Total', colGrade: 'Grade',
    inProgress: 'In Progress', pending: '—',
    sumDone: 'Completed', sumCurrent: 'In Progress', sumRemaining: 'Remaining',
    noData: 'No grades found',
  },
} as const;

type View = 'all' | 'completed' | 'current';

interface GradeItem {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  semesterName: string;
  semesterYear: number;
  midtermGrade: number | null;
  finalGrade: number | null;
  assignmentGrade: number | null;
  totalGrade: number | null;
  letterGrade: string | null;
  gradePoint: number | null;
  status: string | null;
}
interface InProgressItem {
  id: number;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  credits: number;
  semesterName: string;
  semesterYear: number;
}
interface StudentInfo {
  currentLevel: number;
  gpa: string | null;
  completedCredits: number;
  totalRequired: number;
  programNameAr: string;
  programNameEn: string;
  deptNameAr: string;
  deptNameEn: string;
  facultyNameAr: string;
  facultyNameEn: string;
}
interface PageData {
  student: StudentInfo;
  grades: GradeItem[];
  inProgress: InProgressItem[];
}

function gradeColor(letter: string | null, primary: string): string {
  if (!letter) return '#6b7280';
  if (['A+', 'A'].includes(letter)) return '#22c55e';
  if (['A-', 'B+'].includes(letter)) return '#3b82f6';
  if (['B', 'B-'].includes(letter)) return '#06b6d4';
  if (['C+', 'C', 'C-'].includes(letter)) return primary;
  if (['D+', 'D'].includes(letter)) return '#f97316';
  return '#ef4444';
}

export default function GradesPage() {
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

  const [view, setView] = useState<View>('all');
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/student/grades?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setPageData(d); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  if (loading || !user) return null;

  const info       = pageData?.student;
  const allGrades  = pageData?.grades ?? [];
  const inProgress = pageData?.inProgress ?? [];
  const completed  = allGrades.filter(g => g.status === 'pass' || g.status === 'fail');
  const remaining  = (info?.totalRequired ?? 0) - (info?.completedCredits ?? 0);

  const display: Array<GradeItem | (InProgressItem & { _inProgress: true })> =
    view === 'completed' ? completed :
    view === 'current'   ? inProgress.map(r => ({ ...r, _inProgress: true as const })) :
    [...allGrades, ...inProgress.map(r => ({ ...r, _inProgress: true as const }))];

  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const itemAnim = { hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const Skeleton = () => (
    <div className="space-y-2 p-4">
      {[1,2,3,4,5].map(i => <div key={i} className="h-10 rounded animate-pulse" style={{ background: iconBg }} />)}
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
                    <p className="text-sm opacity-75" style={{ color: heroText }}>{user.firstName} {user.lastName}</p>
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
                  { label: t.studentName, value: `${user.firstName} ${user.lastName}` },
                  { label: t.studentNum,  value: user.studentNumber ?? '—' },
                  { label: t.faculty,     value: loc === 'ar' ? (info?.facultyNameAr ?? '—') : (info?.facultyNameEn ?? '—') },
                  { label: t.dept,        value: loc === 'ar' ? (info?.deptNameAr ?? '—') : (info?.deptNameEn ?? '—') },
                  { label: t.level,       value: `${loc === 'ar' ? 'المستوى' : 'Level'} ${info?.currentLevel ?? user.currentLevel ?? 1}` },
                  { label: loc === 'ar' ? 'البرنامج' : 'Program', value: loc === 'ar' ? (info?.programNameAr ?? '—') : (info?.programNameEn ?? '—') },
                  { label: t.gpa,         value: info?.gpa ?? '—', gold: true },
                  { label: t.earnedHours, value: String(info?.completedCredits ?? 0), green: true },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-xs mb-1" style={{ color: th.textMuted }}>{r.label}</p>
                    <p className="font-bold text-sm" style={{ color: r.gold ? th.primary : r.green ? th.primary : th.text }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
        <div className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-xl"
          style={{ background: card, border: `1px solid ${bdr}` }}>
          <div className="flex items-center gap-2">
            <MdMenuBook size={18} style={{ color: th.primary }} />
            <span className="text-sm font-semibold" style={{ color: th.textMuted }}>
              {loc === 'ar' ? 'السنة الأكاديمية والفصل الدراسي' : 'Academic Year & Semester'}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {([['all', t.filterAll], ['completed', t.filterDone], ['current', t.filterCurrent]] as [View, string][]).map(([v, label]) => (
              <button key={v} onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-lg font-bold text-sm transition-all"
                style={{ background: view === v ? th.primary : iconBg, color: view === v ? '#1A1612' : th.textMuted, border: `1px solid ${view === v ? th.primary : bdrL}` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card style={{ background: card, borderColor: bdr }}>
            <CardContent className="p-0">
              {dataLoading ? <Skeleton /> : display.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: th.textMuted }}>{t.noData}</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: heroBg }}>
                        {[t.colNum, t.colSemester, t.colCode, t.colName, t.colCredits,
                          t.colMid, t.colFinal, t.colAssign, t.colTotal, t.colGrade].map(h => (
                          <TableHead key={h} className="text-xs font-bold h-9 px-3 whitespace-nowrap"
                            style={{ color: heroText, textAlign: 'start' }}>{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <motion.tbody variants={stagger} animate="visible">
                      {display.map((row, i) => {
                        const isIP = '_inProgress' in row;
                        const g = isIP ? null : row as GradeItem;
                        const ip = isIP ? row as InProgressItem & { _inProgress: true } : null;
                        const code = isIP ? ip!.courseCode : g!.courseCode;
                        const nameAr = isIP ? ip!.courseNameAr : g!.courseNameAr;
                        const nameEn = isIP ? ip!.courseNameEn : g!.courseNameEn;
                        const credits = isIP ? ip!.credits : g!.credits;
                        const sem = isIP ? ip!.semesterName : g!.semesterName;

                        return (
                          <motion.tr key={`${isIP ? 'ip' : 'g'}-${row.id}`}
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.03 }}
                            style={{ borderTop: `1px solid ${bdrL}`, background: i % 2 === 0 ? iconBg : card }}>
                            <TableCell className="px-3 py-3 text-sm" style={{ color: th.textMuted }}>{i + 1}</TableCell>
                            <TableCell className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: th.textMuted }}>{sem}</TableCell>
                            <TableCell className="px-3 py-3">
                              <span className="text-xs font-mono font-bold" style={{ color: th.primary }}>{code}</span>
                            </TableCell>
                            <TableCell className="px-3 py-3">
                              <p className="text-sm font-semibold whitespace-nowrap" style={{ color: th.text }}>{loc === 'ar' ? nameAr : nameEn}</p>
                            </TableCell>
                            <TableCell className="px-3 py-3 text-sm tabular-nums text-center" style={{ color: th.text }}>{credits}</TableCell>
                            <TableCell className="px-3 py-3 text-sm tabular-nums text-center" style={{ color: th.text }}>
                              {g?.midtermGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-sm tabular-nums text-center" style={{ color: th.text }}>
                              {g?.finalGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-sm tabular-nums text-center" style={{ color: th.text }}>
                              {g?.assignmentGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-sm font-bold tabular-nums text-center" style={{ color: th.text }}>
                              {g?.totalGrade ?? t.pending}
                            </TableCell>
                            <TableCell className="px-3 py-3 text-center">
                              {isIP ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: th.primary }}>
                                  <MdSchedule size={14} /> {t.inProgress}
                                </span>
                              ) : (
                                <span className="text-sm font-bold"
                                  style={{ color: gradeColor(g!.letterGrade, th.primary) }}>
                                  {g!.letterGrade ?? t.pending}
                                </span>
                              )}
                            </TableCell>
                          </motion.tr>
                        );
                      })}
                    </motion.tbody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <MdCheckCircle size={24} />, label: t.sumDone,     value: completed.length,  color: th.primary },
            { icon: <MdSchedule size={24} />,    label: t.sumCurrent,  value: inProgress.length, color: th.primary },
            { icon: <MdTrendingUp size={24} />,  label: t.sumRemaining, value: remaining,         color: th.primary },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <Card style={{ background: card, borderColor: bdr }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: iconBg, border: `1px solid ${bdrL}`, color: s.color }}>
                    {s.icon}
                  </div>
                  <p className="text-xs mb-1" style={{ color: th.textMuted }}>{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
