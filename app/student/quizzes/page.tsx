'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HelpCircle, Clock, Award, CheckCircle, XCircle,
  ChevronRight, BookOpen, AlertCircle,
} from 'lucide-react';

const i18n = {
  ar: {
    title: 'الاختبارات القصيرة الإلكترونية',
    subtitle: 'التقييمات والاختبارات المتاحة ونتائجها التفصيلية',
    available: 'متاح للتقديم',
    completed: 'مكتمل ومصحح',
    minutes: 'دقيقة',
    marks: 'درجة',
    yourScore: 'درجتك الحاصل عليها:',
    startQuiz: 'بدء محاولة الاختبار',
    done: 'تم التسليم والإنهاء',
    timeLeft: 'الوقت المتبقي للمحاولة',
    answered: 'الأسئلة المجابة',
    submitQuiz: 'تسليم الإجابات وإنهاء الاختبار',
    submitNote: 'يرجى الإجابة على جميع الأسئلة أولاً',
    congrats: 'تهانينا! لقد اجتزت الاختبار بنجاح ✓',
    failed: 'للأسف، لم تتمكن من اجتياز درجة النجاح',
    yourGrade: 'درجتك الإجمالية',
    percentage: 'النسبة المئوية للمعدل',
    correct: 'عدد الإجابات الصحيحة',
    backToQuizzes: 'العودة لقائمة الاختبارات',
    reviewAnswers: 'مراجعة نموذج الإجابات والدرجات',
    correctAnswer: '(الإجابة النموذجية الصحيحة)',
    yourAnswer: '(إجابتك المسلمة)',
    noQuizzes: 'لا توجد اختبارات قصيرة متاحة حالياً لتخصصك الدراسي',
    statAvailable: 'اختبارات متاحة',
    statCompleted: 'اختبارات مكتملة',
    statTotal: 'إجمالي التقييمات',
    loading: 'جاري تحميل التقييمات...',
  },
  en: {
    title: 'Online Quizzes & Tests',
    subtitle: 'Your active quizzes, progress and detailed results',
    available: 'Available',
    completed: 'Completed',
    minutes: 'min',
    marks: 'marks',
    yourScore: 'Your earned score:',
    startQuiz: 'Start Quiz Attempt',
    done: 'Submitted',
    timeLeft: 'Time Left',
    answered: 'Questions Answered',
    submitQuiz: 'Submit Answers & Finish Quiz',
    submitNote: 'Please answer all questions first',
    congrats: 'Congratulations! You passed the quiz ✓',
    failed: 'Unfortunately, you did not reach the passing grade',
    yourGrade: 'Total Grade',
    percentage: 'Score Percentage',
    correct: 'Correct Answers',
    backToQuizzes: 'Return to Quizzes List',
    reviewAnswers: 'Review Detailed Answers Model',
    correctAnswer: '(Correct Answer Key)',
    yourAnswer: '(Your Submitted Choice)',
    noQuizzes: 'No quizzes available for your registered courses at this moment',
    statAvailable: 'Available Quizzes',
    statCompleted: 'Completed Quizzes',
    statTotal: 'Total Evaluations',
    loading: 'Loading evaluations...',
  },
} as const;

interface Question {
  id: number;
  question: string;
  questionEn?: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Quiz {
  id: number;
  title: string;
  titleEn?: string;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  status: 'available' | 'completed';
  score: number | null;
  submittedAt: string | null;
}

interface ResultDetail {
  questionId: number;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

type View = 'list' | 'taking' | 'results';

export default function QuizzesPage() {
  const { user, loading } = useAuth({ requiredRole: 'student' });
  const { locale } = useTranslations();
  const { dark } = useDarkMode();

  const loc = (locale as 'ar' | 'en') === 'en' ? 'en' : 'ar';
  const t   = i18n[loc];
  const dir = loc === 'ar' ? 'rtl' : 'ltr';

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
      .then(d => {
        setQuizzes(Array.isArray(d) ? d : []);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  }, [user?.id]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

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
    } catch {
      setResult(null);
    }
    setSubmitting(false);
    setView('results');
  }, [activeQuiz, answers, user?.id, submitting, fetchQuizzes]);

  useEffect(() => {
    if (view !== 'taking' || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(p => {
      if (p <= 1) {
        handleSubmit();
        return 0;
      }
      return p - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [view, timeLeft, handleSubmit]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setAnswers({});
    setTimeLeft(quiz.duration * 60);
    setView('taking');
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
        <div dir={dir} className="max-w-3xl mx-auto space-y-6 py-6 px-4 sm:px-6">
          
          <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-150 dark:border-stone-800 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-stone-850 dark:text-stone-100">
                  {loc === 'ar' ? activeQuiz.title : (activeQuiz.titleEn ?? activeQuiz.title)}
                </p>
                <p className="text-[10px] font-mono text-[#D97706] mt-0.5">{activeQuiz.courseCode}</p>
              </div>
              <div className="text-center shrink-0">
                <p className={`text-2xl font-bold font-mono ${urgent ? 'text-red-500 animate-pulse' : 'text-[#D97706]'}`}>{fmt(timeLeft)}</p>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold">{t.timeLeft}</p>
              </div>
            </div>
            <div className="mt-3.5 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-[#FABA19] transition-all duration-355"
                style={{ width: `${(answeredCount / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold mt-1.5">
              {t.answered}: {answeredCount} / {activeQuiz.questions.length}
            </p>
          </div>

          {activeQuiz.questions.map((q, idx) => (
            <Card key={q.id} className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 space-y-4">
              <p className="text-xs font-bold text-stone-850 dark:text-stone-100">
                {idx + 1}. {loc === 'ar' ? q.question : (q.questionEn ?? q.question)}
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const selected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                      className={`w-full px-4 py-3 rounded-xl text-start font-bold text-xs transition-all border ${
                        selected
                          ? 'bg-[#FABA19] border-[#FABA19] text-white'
                          : 'bg-stone-50/50 hover:bg-stone-50 border-stone-200 dark:bg-stone-850/30 dark:hover:bg-stone-800 dark:border-stone-800 text-stone-750 dark:text-stone-250'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-75 me-1.5">{opt}.</span>
                      {q[`option${opt}` as keyof Question] as string}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}

          <div className="sticky bottom-4 z-10 bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-150 dark:border-stone-800 shadow-lg">
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2.5 rounded-xl border-0 shadow-sm disabled:opacity-50 transition-colors"
            >
              {allAnswered ? t.submitQuiz : t.submitNote}
            </Button>
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
        <div dir={dir} className="max-w-3xl mx-auto space-y-6 py-6 px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-6 text-center space-y-4">
              <div className="flex justify-center">
                {passed ? (
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 flex items-center justify-center text-red-500">
                    <XCircle className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-base font-bold text-stone-850 dark:text-stone-100">{passed ? t.congrats : t.failed}</p>
                <p className="text-[10px] text-stone-450 dark:text-stone-500 font-semibold mt-0.5">
                  {loc === 'ar' ? activeQuiz.title : (activeQuiz.titleEn ?? activeQuiz.title)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.yourGrade,  value: `${result.score} / ${result.totalMarks}` },
                  { label: t.percentage, value: `${pct.toFixed(0)}%` },
                  { label: t.correct,    value: `${result.correct} / ${result.total}` },
                ].map((s, idx) => (
                  <div key={idx} className="bg-stone-50/50 dark:bg-stone-850/20 border border-stone-150 dark:border-stone-800 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-0.5">{s.label}</p>
                    <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{s.value}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => { setView('list'); setActiveQuiz(null); setResult(null); }}
                className="bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 px-8 rounded-xl shadow-sm border-0"
              >
                {t.backToQuizzes}
              </Button>
            </Card>
          </motion.div>

          <p className="font-bold text-sm text-stone-850 dark:text-stone-150 pb-2 border-b border-stone-100 dark:border-stone-850">
            {t.reviewAnswers}
          </p>

          <div className="space-y-4">
            {activeQuiz.questions.map((q, idx) => {
              const detail = result.detailed.find(d => d.questionId === q.id);
              const isCorrect = detail?.isCorrect ?? false;
              return (
                <Card
                  key={q.id}
                  className={`border shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-5 space-y-4 ${
                    isCorrect ? 'border-emerald-300 dark:border-emerald-800' : 'border-red-300 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs font-bold text-stone-850 dark:text-stone-100 leading-normal">
                      {idx + 1}. {loc === 'ar' ? q.question : (q.questionEn ?? q.question)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 ps-8">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const isUser  = detail?.selected === opt;
                      const isRight = detail?.correct === opt;
                      return (
                        <div
                          key={opt}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${
                            isRight
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                              : isUser
                              ? 'bg-red-500/10 border-red-500/20 text-red-500'
                              : 'bg-stone-50/50 border-stone-150 dark:bg-stone-850/10 dark:border-stone-800 text-stone-750 dark:text-stone-250'
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-75 me-1.5">{opt}.</span>
                          {q[`option${opt}` as keyof Question] as string}
                          {isRight && <span className="font-bold ms-2 text-[10px] bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">{t.correctAnswer}</span>}
                          {isUser && !isRight && <span className="font-bold ms-2 text-[10px] bg-red-100 dark:bg-red-950/40 px-1.5 py-0.5 rounded">{t.yourAnswer}</span>}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} role="student">
      <div dir={dir} className="max-w-7xl mx-auto space-y-6 py-6 px-4 sm:px-6">

        {/* Top Header Card */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1C1917] dark:text-stone-100">{t.title}</h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-0.5">{t.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50/30 dark:bg-stone-800/10 p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: t.statTotal,     value: quizzes.length,     color: 'text-[#D97706]' },
                  { label: t.statAvailable, value: availableCount,     color: 'text-emerald-600' },
                  { label: t.statCompleted, value: completedCount,     color: 'text-blue-600' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-3.5 space-y-0.5">
                    <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold">{s.label}</p>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quizzes List Cards */}
        {dataLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-stone-50 dark:bg-stone-800/40 rounded-2xl animate-pulse" />)}
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
            <AlertCircle className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            <p className="text-xs font-bold text-stone-450 dark:text-stone-550">{t.noQuizzes}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <motion.div key={quiz.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-sm bg-white dark:bg-stone-900 rounded-2xl overflow-hidden p-5 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-bold text-stone-850 dark:text-stone-100 leading-snug">
                        {loc === 'ar' ? quiz.title : (quiz.titleEn ?? quiz.title)}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 border ${
                        quiz.status === 'available'
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/40'
                          : 'text-stone-450 bg-stone-50 dark:bg-stone-850 dark:border-stone-800'
                      }`}>
                        {quiz.status === 'available' ? t.available : t.completed}
                      </span>
                    </div>

                    <p className="text-[10px] font-mono font-bold text-[#D97706]">{quiz.courseCode}</p>

                    <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-450 pt-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4 text-[#D97706]" />
                        <span>{quiz.duration} {t.minutes}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold">
                        <Award className="w-4 h-4 text-[#D97706]" />
                        <span>{quiz.totalMarks} {t.marks}</span>
                      </div>
                      {quiz.status === 'completed' && quiz.score !== null && (
                        <div className="flex items-center gap-2 font-bold text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>{t.yourScore} {quiz.score} / {quiz.totalMarks}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 dark:border-stone-850 mt-4">
                    {quiz.status === 'available' ? (
                      <Button
                        onClick={() => startQuiz(quiz)}
                        className="w-full bg-[#FABA19] hover:bg-[#e5a816] text-white font-bold text-xs py-2 rounded-xl border-0 shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        {t.startQuiz}
                        <ChevronRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-full bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-600 font-bold text-xs py-2 rounded-xl border border-stone-150 dark:border-stone-850 shadow-none cursor-not-allowed"
                      >
                        {t.done}
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
