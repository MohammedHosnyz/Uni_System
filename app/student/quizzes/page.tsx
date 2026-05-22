'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MdQuiz, MdSchedule, MdEmojiEvents, MdCheckCircle, MdCancel,
  MdChevronLeft, MdMenuBook, MdWarning,
} from 'react-icons/md';

const i18n = {
  ar: {
    title: 'الاختبارات الإلكترونية', subtitle: 'اختباراتك المتاحة ونتائجك',
    available: 'متاح', completed: 'مكتمل',
    minutes: 'دقيقة', marks: 'درجة',
    yourScore: 'درجتك:', startQuiz: 'ابدأ الاختبار', done: 'تم الاكتمال',
    timeLeft: 'الوقت المتبقي', answered: 'تم الإجابة',
    submitQuiz: 'تسليم الاختبار', submitNote: 'أجب على جميع الأسئلة أولاً',
    congrats: 'مبروك! نجحت', failed: 'للأسف، لم تنجح',
    yourGrade: 'درجتك', percentage: 'النسبة المئوية', correct: 'الإجابات الصحيحة',
    backToQuizzes: 'العودة للاختبارات', reviewAnswers: 'مراجعة الإجابات',
    correctAnswer: '(الإجابة الصحيحة)', yourAnswer: '(إجابتك)',
    noQuizzes: 'لا توجد اختبارات متاحة حالياً',
    statAvailable: 'متاحة', statCompleted: 'مكتملة', statTotal: 'إجمالي',
    loading: 'جاري التحميل...',
  },
  en: {
    title: 'Online Quizzes', subtitle: 'Your available quizzes and results',
    available: 'Available', completed: 'Completed',
    minutes: 'min', marks: 'marks',
    yourScore: 'Your score:', startQuiz: 'Start Quiz', done: 'Completed',
    timeLeft: 'Time Left', answered: 'Answered',
    submitQuiz: 'Submit Quiz', submitNote: 'Answer all questions first',
    congrats: 'Congratulations! You passed', failed: 'Sorry, you did not pass',
    yourGrade: 'Your Grade', percentage: 'Percentage', correct: 'Correct Answers',
    backToQuizzes: 'Back to Quizzes', reviewAnswers: 'Review Answers',
    correctAnswer: '(Correct answer)', yourAnswer: '(Your answer)',
    noQuizzes: 'No quizzes available right now',
    statAvailable: 'Available', statCompleted: 'Completed', statTotal: 'Total',
    loading: 'Loading...',
  },
} as const;

interface Question {
  id: number; question: string; questionEn?: string;
  optionA: string; optionB: string; optionC: string; optionD: string;
}
interface Quiz {
  id: number; title: string; titleEn?: string;
  courseCode: string; courseNameAr: string; courseNameEn: string;
  duration: number; totalMarks: number;
  questions: Question[];
  status: 'available' | 'completed';
  score: number | null;
  submittedAt: string | null;
}
interface ResultDetail {
  questionId: number; selected: string; correct: string; isCorrect: boolean;
}

type View = 'list' | 'taking' | 'results';

export default function QuizzesPage() {
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

  const [quizzes, setQuizzes]       = useState<Quiz[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [view, setView]             = useState<View>('list');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers]       = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft]     = useState(0);
  const [result, setResult]         = useState<{ score: number; totalMarks: number; correct: number; total: number; detailed: ResultDetail[] } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuizzes = useCallback(() => {
    if (!user?.id) return;
    fetch(`/api/student/quizzes?userId=${user.id}`)
      .then(r => r.json())
      .then(d => { setQuizzes(Array.isArray(d) ? d : []); setDataLoading(false); })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  useEffect(() => { fetchQuizzes(); }, [fetchQuizzes]);

  const handleSubmit = useCallback(async () => {
    if (!activeQuiz || !user?.id || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/student/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, quizId: activeQuiz.id, answers }),
      });
      const data = await res.json();
      setResult(data);
      fetchQuizzes();
    } catch { setResult(null); }
    setSubmitting(false);
    setView('results');
  }, [activeQuiz, answers, user?.id, submitting, fetchQuizzes]);

  useEffect(() => {
    if (view !== 'taking' || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(p => { if (p <= 1) { handleSubmit(); return 0; } return p - 1; }), 1000);
    return () => clearInterval(id);
  }, [view, timeLeft, handleSubmit]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz); setAnswers({}); setTimeLeft(quiz.duration * 60); setView('taking');
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (loading || !user) return null;

  const availableCount = quizzes.filter(q => q.status === 'available').length;
  const completedCount = quizzes.filter(q => q.status === 'completed').length;

  
  if (view === 'taking' && activeQuiz) {
    const answeredCount = Object.keys(answers).length;
    const allAnswered   = answeredCount === activeQuiz.questions.length;
    const urgent        = timeLeft < 300;
    return (
      <DashboardLayout user={user} role="student">
        <div dir={dir} className="max-w-3xl mx-auto space-y-4 p-1">
          
          <div className="sticky top-0 z-10 rounded-xl p-4"
            style={{ background: card, border: `1px solid ${bdr}` }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold" style={{ color: th.text }}>{loc === 'ar' ? activeQuiz.title : (activeQuiz.titleEn ?? activeQuiz.title)}</p>
                <p className="text-sm" style={{ color: th.textMuted }}>{activeQuiz.courseCode}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold tabular-nums" style={{ color: urgent ? '#ef4444' : th.primary }}>{fmt(timeLeft)}</p>
                <p className="text-xs" style={{ color: th.textMuted }}>{t.timeLeft}</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full" style={{ background: bdrL }}>
              <div className="h-1.5 rounded-full transition-all"
                style={{ width: `${(answeredCount / activeQuiz.questions.length) * 100}%`, background: th.primary }} />
            </div>
            <p className="text-xs mt-1" style={{ color: th.textMuted }}>{t.answered}: {answeredCount} / {activeQuiz.questions.length}</p>
          </div>

          
          {activeQuiz.questions.map((q, idx) => (
            <Card key={q.id} style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-4">
                <p className="font-bold mb-4" style={{ color: th.text }}>
                  {idx + 1}. {loc === 'ar' ? q.question : (q.questionEn ?? q.question)}
                </p>
                <div className="space-y-2">
                  {(['A', 'B', 'C', 'D'] as const).map(opt => {
                    const selected = answers[q.id] === opt;
                    return (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                        className="w-full p-3 rounded-xl text-start font-semibold text-sm transition-all"
                        style={{
                          background: selected ? th.primary : iconBg,
                          color: selected ? '#1A1612' : th.text,
                          border: `2px solid ${selected ? th.primary : bdrL}`,
                        }}>
                        <span className="font-bold">{opt}.</span> {q[`option${opt}` as keyof Question] as string}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          
          <div className="sticky bottom-0 rounded-xl p-4" style={{ background: card, border: `1px solid ${bdr}` }}>
            <button onClick={handleSubmit} disabled={!allAnswered || submitting}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: allAnswered ? th.primary : bdrL, color: allAnswered ? '#1A1612' : th.textMuted, cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
              {allAnswered ? t.submitQuiz : t.submitNote}
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  
  if (view === 'results' && activeQuiz && result) {
    const pct    = (result.score / result.totalMarks) * 100;
    const passed = pct >= 60;
    return (
      <DashboardLayout user={user} role="student">
        <div dir={dir} className="max-w-3xl mx-auto space-y-4 p-1">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card style={{ background: card, borderColor: bdr }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {passed
                    ? <MdCheckCircle size={72} style={{ color: '#22c55e' }} />
                    : <MdCancel size={72} style={{ color: '#ef4444' }} />}
                </div>
                <p className="text-xl font-bold mb-1" style={{ color: th.text }}>{passed ? t.congrats : t.failed}</p>
                <p className="text-sm mb-6" style={{ color: th.textMuted }}>{loc === 'ar' ? activeQuiz.title : (activeQuiz.titleEn ?? activeQuiz.title)}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: t.yourGrade,  value: `${result.score} / ${result.totalMarks}` },
                    { label: t.percentage, value: `${pct.toFixed(0)}%` },
                    { label: t.correct,    value: `${result.correct} / ${result.total}` },
                  ].map(s => (
                    <div key={s.label} style={{ background: iconBg, border: `1px solid ${bdrL}`, borderRadius: 12, padding: '0.875rem' }}>
                      <p className="text-xs mb-1" style={{ color: th.textMuted }}>{s.label}</p>
                      <p className="text-xl font-bold" style={{ color: th.text }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setView('list'); setActiveQuiz(null); setResult(null); }}
                  className="px-8 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: th.primary, color: '#1A1612' }}>
                  {t.backToQuizzes}
                </button>
              </CardContent>
            </Card>
          </motion.div>

          
          <p className="font-bold text-lg" style={{ color: th.text }}>{t.reviewAnswers}</p>
          {activeQuiz.questions.map((q, idx) => {
            const detail = result.detailed.find(d => d.questionId === q.id);
            const isCorrect = detail?.isCorrect ?? false;
            return (
              <Card key={q.id} style={{ background: card, border: `2px solid ${isCorrect ? '#22c55e' : '#ef4444'}` }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect
                      ? <MdCheckCircle size={20} className="shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                      : <MdCancel size={20} className="shrink-0 mt-0.5" style={{ color: '#ef4444' }} />}
                    <p className="font-bold" style={{ color: th.text }}>
                      {idx + 1}. {loc === 'ar' ? q.question : (q.questionEn ?? q.question)}
                    </p>
                  </div>
                  <div className="space-y-2 ps-7">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const isUser  = detail?.selected === opt;
                      const isRight = detail?.correct === opt;
                      return (
                        <div key={opt} className="p-2.5 rounded-xl text-sm"
                          style={{
                            background: isRight ? (dark ? '#1A2A1A' : '#F0FFF4') : isUser ? (dark ? '#2A1A1A' : '#FFF5F5') : iconBg,
                            border: `1px solid ${isRight ? '#22c55e' : isUser ? '#ef4444' : bdrL}`,
                            color: th.text,
                          }}>
                          <span className="font-bold">{opt}.</span> {q[`option${opt}` as keyof Question] as string}
                          {isRight && <span className="font-bold ms-2" style={{ color: '#22c55e' }}>{t.correctAnswer}</span>}
                          {isUser && !isRight && <span className="font-bold ms-2" style={{ color: '#ef4444' }}>{t.yourAnswer}</span>}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DashboardLayout>
    );
  }

  
  const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const itemAnim = { hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 130 } } };

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-5 p-1">

        
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ background: card, borderColor: bdr, overflow: 'hidden' }}>
            <div style={{ background: heroBg, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MdQuiz size={22} style={{ color: heroText }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: heroText }}>{t.title}</h1>
                  <p className="text-sm opacity-75" style={{ color: heroText }}>{t.subtitle}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-3 gap-4">
          {[
            { icon: <MdQuiz size={24} />,        label: t.statTotal,     value: quizzes.length },
            { icon: <MdMenuBook size={24} />,     label: t.statAvailable, value: availableCount },
            { icon: <MdEmojiEvents size={24} />,  label: t.statCompleted, value: completedCount },
          ].map((s, i) => (
            <motion.div key={i} variants={itemAnim}>
              <Card style={{ background: card, borderColor: bdr }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: iconBg, border: `1px solid ${bdrL}`, color: th.primary }}>
                    {s.icon}
                  </div>
                  <p className="text-xs mb-1" style={{ color: th.textMuted }}>{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: th.text }}>{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        
        {dataLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-xl animate-pulse" style={{ background: iconBg }} />)}
          </div>
        ) : quizzes.length === 0 ? (
          <Card style={{ background: card, borderColor: bdr }}>
            <CardContent className="p-12 text-center">
              <MdWarning size={48} className="mx-auto mb-3" style={{ color: th.textMuted }} />
              <p className="font-bold" style={{ color: th.textMuted }}>{t.noQuizzes}</p>
            </CardContent>
          </Card>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map(quiz => (
              <motion.div key={quiz.id} variants={itemAnim}>
                <Card style={{ background: card, borderColor: bdr, overflow: 'hidden' }}>
                  <div style={{ height: 3, background: quiz.status === 'available' ? th.primary : bdrL }} />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-bold text-sm leading-snug flex-1 me-2" style={{ color: th.text }}>
                        {loc === 'ar' ? quiz.title : (quiz.titleEn ?? quiz.title)}
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold shrink-0"
                        style={{
                          background: quiz.status === 'available' ? (dark ? '#1A2A1A' : '#F0FFF4') : iconBg,
                          color: quiz.status === 'available' ? '#22c55e' : th.textMuted,
                          border: `1px solid ${quiz.status === 'available' ? '#22c55e44' : bdrL}`,
                        }}>
                        {quiz.status === 'available' ? t.available : t.completed}
                      </span>
                    </div>

                    <p className="text-xs font-mono mb-3" style={{ color: th.primary }}>{quiz.courseCode}</p>

                    <div className="space-y-1.5 mb-4 text-sm">
                      <div className="flex items-center gap-2" style={{ color: th.textMuted }}>
                        <MdSchedule size={16} style={{ color: th.primary }} />
                        {quiz.duration} {t.minutes}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: th.textMuted }}>
                        <MdEmojiEvents size={16} style={{ color: th.primary }} />
                        {quiz.totalMarks} {t.marks}
                      </div>
                      {quiz.status === 'completed' && quiz.score !== null && (
                        <div className="flex items-center gap-2 font-bold" style={{ color: '#22c55e' }}>
                          <MdCheckCircle size={16} />
                          {t.yourScore} {quiz.score} / {quiz.totalMarks}
                        </div>
                      )}
                    </div>

                    {quiz.status === 'available' ? (
                      <button onClick={() => startQuiz(quiz)}
                        className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ background: th.primary, color: '#1A1612' }}>
                        {t.startQuiz}
                        <MdChevronLeft size={18} style={{ transform: dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    ) : (
                      <button disabled className="w-full py-2.5 rounded-xl font-bold text-sm"
                        style={{ background: iconBg, color: th.textMuted, border: `1px solid ${bdrL}`, cursor: 'not-allowed' }}>
                        {t.done}
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
