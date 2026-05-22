'use client';

import { useState, useEffect } from 'react';
import { Cairo } from 'next/font/google';
import AssistantLayout from '@/components/AssistantLayout';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

function MaterialIcon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
}

interface Quiz {
  id: number;
  title: string;
  course: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function AssistantQuizzesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState(false);
  const [selectedQuizForView, setSelectedQuizForView] = useState<any>(null);
  const [selectedStudentSubmission, setSelectedStudentSubmission] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [duration, setDuration] = useState(60);
  const [currentStep, setCurrentStep] = useState<'upload' | 'review'>('upload');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);

  
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      const data = await response.json();
      
      
      if (Array.isArray(data)) {
        setQuizzes(data);
      } else {
        console.error('API did not return an array:', data);
        setQuizzes([]);
      }
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      setQuizzes([]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `السؤال,الخيار أ,الخيار ب,الخيار ج,الخيار د
ما هي لغة البرمجة المستخدمة في تطوير تطبيقات الويب؟,Python,JavaScript,C++,Java
ما هو الغرض من استخدام المتغيرات في البرمجة؟,لتخزين البيانات,لطباعة النصوص,لإنشاء الدوال,لا شيء مما سبق
أي من التالي يعتبر نوع بيانات في البرمجة؟,String,Integer,Boolean,جميع ما سبق`;

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'quiz_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter((line) => line.trim());
      
      const parsedQuestions: Question[] = lines.slice(1).map((line, index) => {
        const [question, optionA, optionB, optionC, optionD] = line.split(',').map((item) => item.trim());
        return {
          id: index + 1,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
        };
      });

      setQuestions(parsedQuestions);
      setCurrentStep('review');
    };
    reader.readAsText(file);
  };

  const updateCorrectAnswer = (questionId: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, correctAnswer: answer } : q))
    );
  };

  const saveQuiz = async () => {
    const unanswered = questions.filter((q) => !q.correctAnswer).length;
    if (unanswered > 0) {
      alert(`يرجى تحديد الإجابة الصحيحة لـ ${unanswered} سؤال`);
      return;
    }

    if (!quizTitle.trim()) {
      alert('يرجى إدخال عنوان الاختبار');
      return;
    }

    setLoading(true);
    try {
      const isEditing = editingQuizId !== null;
      const url = '/api/quizzes';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(isEditing && { id: editingQuizId }),
          title: quizTitle,
          course: selectedCourse,
          duration,
          questions,
          status: 'published',
        }),
      });

      if (response.ok) {
        alert(isEditing ? 'تم تحديث الاختبار بنجاح!' : 'تم حفظ الاختبار بنجاح!');
        setShowCreateModal(false);
        setCurrentStep('upload');
        setQuestions([]);
        setQuizTitle('');
        setEditingQuizId(null);
        fetchQuizzes(); 
      } else {
        const error = await response.json();
        alert(`فشل حفظ الاختبار: ${error.error}`);
      }
    } catch (error) {
      alert('حدث خطأ أثناء حفظ الاختبار');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const viewStudentDetails = (submission: any) => {
    setSelectedStudentSubmission(submission);
    setShowStudentDetailsModal(true);
  };

  const viewQuiz = async (quizId: number) => {
    try {
      const response = await fetch(`/api/quizzes?id=${quizId}`);
      if (response.ok) {
        const quiz = await response.json();
        setSelectedQuizForView(quiz);
        setShowViewModal(true);
      } else {
        alert('فشل تحميل الاختبار');
      }
    } catch (error) {
      alert('حدث خطأ أثناء تحميل الاختبار');
      console.error(error);
    }
  };

  const editQuiz = async (quizId: number) => {
    try {
      const response = await fetch(`/api/quizzes?id=${quizId}`);
      if (response.ok) {
        const quiz = await response.json();
        setEditingQuizId(quiz.id);
        setQuizTitle(quiz.title);
        setSelectedCourse(quiz.course);
        setDuration(quiz.duration);
        setQuestions(quiz.questions);
        setCurrentStep('review');
        setShowCreateModal(true);
      } else {
        alert('فشل تحميل الاختبار');
      }
    } catch (error) {
      alert('حدث خطأ أثناء تحميل الاختبار');
      console.error(error);
    }
  };

  const deleteQuiz = async (quizId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الاختبار؟')) {
      return;
    }

    try {
      const response = await fetch(`/api/quizzes?id=${quizId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('تم حذف الاختبار بنجاح');
        fetchQuizzes();
      } else {
        alert('فشل حذف الاختبار');
      }
    } catch (error) {
      alert('حدث خطأ أثناء حذف الاختبار');
      console.error(error);
    }
  };

  return (
    <AssistantLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">إدارة الاختبارات</h1>
            <p className="text-[#62615F]">إنشاء وإدارة الاختبارات الإلكترونية</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2"
            >
              <MaterialIcon name="add" className="text-[20px]" />
              إنشاء اختبار جديد
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#121110]">{quiz.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          quiz.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {quiz.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#62615F]">
                        <MaterialIcon name="menu_book" className="text-[18px] text-[#BB8E2C]" />
                        <span>{quiz.course}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#62615F]">
                        <MaterialIcon name="schedule" className="text-[18px] text-[#BB8E2C]" />
                        <span>{quiz.duration} دقيقة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#62615F]">
                        <MaterialIcon name="quiz" className="text-[18px] text-[#BB8E2C]" />
                        <span>{quiz.questionsCount} سؤال</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#62615F]">
                        <MaterialIcon name="grade" className="text-[18px] text-[#BB8E2C]" />
                        <span>{quiz.totalMarks} درجة</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => viewQuiz(quiz.id)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                      >
                        عرض
                      </button>
                      <button
                        onClick={() => editQuiz(quiz.id)}
                        className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg font-bold text-[#3A3937] hover:bg-[#F6F2E6] transition-colors"
                      >
                        <MaterialIcon name="edit" className="text-[18px]" />
                      </button>
                      <button
                        onClick={() => deleteQuiz(quiz.id)}
                        className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <MaterialIcon name="delete" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <MaterialIcon name="quiz" className="text-[64px] text-[#E8DFD3] mb-4" />
                <p className="text-[#62615F]">لا توجد اختبارات حالياً</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                <MaterialIcon name="quiz" className="text-[28px] text-[#BB8E2C]" />
                {editingQuizId ? 'تعديل الاختبار' : currentStep === 'upload' ? 'رفع ملف الأسئلة' : 'مراجعة وتحديد الإجابات'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setCurrentStep('upload');
                  setQuestions([]);
                  setEditingQuizId(null);
                }}
                className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors"
              >
                <MaterialIcon name="close" className="text-[24px]" />
              </button>
            </div>

            <div className="p-6">
              {currentStep === 'upload' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#3A3937] mb-2">عنوان الاختبار *</label>
                    <input
                      type="text"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="مثال: اختبار الوحدة الأولى"
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر *</label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                      >
                        <option value="CS101">CS101 - مقدمة في البرمجة</option>
                        <option value="CS201">CS201 - هياكل البيانات</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#3A3937] mb-2">المدة (دقيقة) *</label>
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-[#3A3937]">رفع ملف CSV *</label>
                      <button
                        onClick={downloadTemplate}
                        className="px-4 py-2 bg-[#BB8E2C] hover:bg-[#D6AE45] text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-sm"
                      >
                        <MaterialIcon name="download" className="text-[18px]" />
                        تحميل تمبلت
                      </button>
                    </div>
                    
                    <div className="bg-[#F6F2E6] rounded-lg p-3 mb-3 border border-[#E8DFD3]">
                      <p className="text-xs text-[#3A3937]">
                        <strong>التنسيق المطلوب:</strong> السؤال، الخيار أ، الخيار ب، الخيار ج، الخيار د
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-[#E8DFD3] rounded-lg p-8 text-center hover:border-[#BB8E2C] transition-colors">
                      <MaterialIcon name="upload_file" className="text-[48px] text-[#BB8E2C] mb-2" />
                      <p className="text-sm text-[#3A3937] font-bold mb-1">اضغط لرفع ملف CSV</p>
                      <p className="text-xs text-[#62615F] mb-4">
                        حمّل التمبلت أولاً لمعرفة التنسيق الصحيح
                      </p>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="csv-upload"
                      />
                      <label
                        htmlFor="csv-upload"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all cursor-pointer"
                      >
                        اختر ملف
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#F6F2E6] rounded-lg p-4 mb-6">
                    <p className="text-sm text-[#3A3937]">
                      <span className="font-bold">عدد الأسئلة:</span> {questions.length} سؤال
                    </p>
                    <p className="text-sm text-[#3A3937]">
                      <span className="font-bold">الأسئلة المكتملة:</span>{' '}
                      {questions.filter((q) => q.correctAnswer).length} / {questions.length}
                    </p>
                  </div>

                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-[#F6F2E6] rounded-lg p-6 border border-[#E8DFD3]">
                      <h4 className="font-bold text-[#121110] mb-4">
                        {index + 1}. {question.question}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-3">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => (
                          <button
                            key={option}
                            onClick={() => updateCorrectAnswer(question.id, option)}
                            className={`p-3 rounded-lg text-right transition-all border-2 ${
                              question.correctAnswer === option
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-white text-[#3A3937] border-[#E8DFD3] hover:border-[#BB8E2C]'
                            }`}
                          >
                            <span className="font-bold">{option}.</span>{' '}
                            {question[`option${option}` as keyof Question]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={saveQuiz}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                    >
                      حفظ الاختبار
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep('upload');
                        setQuestions([]);
                      }}
                      className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      
      {showViewModal && selectedQuizForView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                <MaterialIcon name="visibility" className="text-[28px] text-[#BB8E2C]" />
                عرض الاختبار
              </h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedQuizForView(null);
                }}
                className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors"
              >
                <MaterialIcon name="close" className="text-[24px]" />
              </button>
            </div>

            <div className="p-6">
              
              <div className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg p-6 mb-6 text-[#121110]">
                <h3 className="text-2xl font-bold mb-4">{selectedQuizForView.title}</h3>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="menu_book" className="text-[24px]" />
                    <div>
                      <p className="text-xs opacity-80">المقرر</p>
                      <p className="font-bold">{selectedQuizForView.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="schedule" className="text-[24px]" />
                    <div>
                      <p className="text-xs opacity-80">المدة</p>
                      <p className="font-bold">{selectedQuizForView.duration} دقيقة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="quiz" className="text-[24px]" />
                    <div>
                      <p className="text-xs opacity-80">عدد الأسئلة</p>
                      <p className="font-bold">{selectedQuizForView.questionsCount} سؤال</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="people" className="text-[24px]" />
                    <div>
                      <p className="text-xs opacity-80">عدد الطلاب</p>
                      <p className="font-bold">{selectedQuizForView.submissions?.length || 0} طالب</p>
                    </div>
                  </div>
                </div>
              </div>

              
              {selectedQuizForView.submissions && selectedQuizForView.submissions.length > 0 ? (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <MaterialIcon name="assignment_turned_in" className="text-[24px] text-[#BB8E2C]" />
                    نتائج الطلاب ({selectedQuizForView.submissions.length})
                  </h4>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedQuizForView.submissions.map((submission: any, index: number) => {
                      const percentage = ((submission.score / submission.totalMarks) * 100).toFixed(0);
                      const percentageNum = parseFloat(percentage);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => viewStudentDetails(submission)}
                          className="bg-white rounded-lg border-2 border-[#E8DFD3] p-4 hover:border-[#BB8E2C] hover:shadow-lg transition-all text-right"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-full flex items-center justify-center text-[#121110] font-bold text-lg flex-shrink-0">
                              {submission.studentName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-[#121110] truncate">{submission.studentName}</h5>
                              <p className="text-xs text-[#62615F]">{submission.studentId}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#E8DFD3]">
                            <div className="text-center">
                              <p className="text-xs text-[#62615F] mb-1">الدرجة</p>
                              <div className={`text-lg font-bold ${
                                percentageNum >= 80 ? 'text-green-600' : 
                                percentageNum >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {submission.score}/{submission.totalMarks}
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-[#62615F] mb-1">النسبة</p>
                              <div className={`text-lg font-bold ${
                                percentageNum >= 80 ? 'text-green-600' : 
                                percentageNum >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {percentage}%
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-[#62615F] mb-1">الوقت</p>
                              <div className="text-sm font-bold text-[#3A3937]">
                                {submission.timeTaken} د
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#BB8E2C] font-bold">
                            <span>عرض التفاصيل</span>
                            <MaterialIcon name="arrow_back" className="text-[16px]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-[#F6F2E6] rounded-lg p-8 text-center mb-6">
                  <MaterialIcon name="people_outline" className="text-[64px] text-[#E8DFD3] mb-2" />
                  <p className="text-[#62615F]">لم يقم أي طالب بحل هذا الاختبار بعد</p>
                </div>
              )}

              
              <div>
                <h4 className="text-xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="quiz" className="text-[24px] text-[#BB8E2C]" />
                  أسئلة الاختبار
                </h4>
                
                <div className="space-y-4">
                  {selectedQuizForView.questions.map((question: any, index: number) => (
                    <div key={question.id} className="bg-white rounded-lg p-6 border-2 border-[#E8DFD3]">
                      <h5 className="font-bold text-[#121110] mb-4 text-lg">
                        {index + 1}. {question.question}
                      </h5>

                      <div className="grid md:grid-cols-2 gap-3">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => (
                          <div
                            key={option}
                            className={`p-3 rounded-lg border-2 ${
                              question.correctAnswer === option
                                ? 'bg-green-50 border-green-500'
                                : 'bg-[#F6F2E6] border-[#E8DFD3]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#121110]">{option}.</span>
                              <span className="text-[#3A3937]">
                                {question[`option${option}`]}
                              </span>
                              {question.correctAnswer === option && (
                                <MaterialIcon name="check_circle" className="text-green-600 text-[20px] mr-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 mt-6 border-t border-[#E8DFD3]">
                <button
                  onClick={() => editQuiz(selectedQuizForView.id)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center justify-center gap-2"
                >
                  <MaterialIcon name="edit" className="text-[20px]" />
                  تعديل الاختبار
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedQuizForView(null);
                  }}
                  className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showStudentDetailsModal && selectedStudentSubmission && selectedQuizForView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                <MaterialIcon name="person" className="text-[28px] text-[#BB8E2C]" />
                تفاصيل نتيجة الطالب
              </h2>
              <button
                onClick={() => {
                  setShowStudentDetailsModal(false);
                  setSelectedStudentSubmission(null);
                }}
                className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors"
              >
                <MaterialIcon name="close" className="text-[24px]" />
              </button>
            </div>

            <div className="p-6">
              
              <div className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg p-6 mb-6 text-[#121110]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-2xl">
                    {selectedStudentSubmission.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedStudentSubmission.studentName}</h3>
                    <p className="text-sm opacity-90">الرقم الجامعي: {selectedStudentSubmission.studentId}</p>
                    <p className="text-xs opacity-80">{selectedStudentSubmission.studentEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#121110]/20">
                  <div className="text-center">
                    <MaterialIcon name="grade" className="text-[32px] mb-1" />
                    <p className="text-xs opacity-80 mb-1">الدرجة</p>
                    <p className="text-2xl font-bold">{selectedStudentSubmission.score}/{selectedStudentSubmission.totalMarks}</p>
                  </div>
                  <div className="text-center">
                    <MaterialIcon name="percent" className="text-[32px] mb-1" />
                    <p className="text-xs opacity-80 mb-1">النسبة المئوية</p>
                    <p className="text-2xl font-bold">
                      {((selectedStudentSubmission.score / selectedStudentSubmission.totalMarks) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <MaterialIcon name="schedule" className="text-[32px] mb-1" />
                    <p className="text-xs opacity-80 mb-1">الوقت المستغرق</p>
                    <p className="text-2xl font-bold">{selectedStudentSubmission.timeTaken} دقيقة</p>
                  </div>
                  <div className="text-center">
                    <MaterialIcon name="error" className="text-[32px] mb-1" />
                    <p className="text-xs opacity-80 mb-1">عدد الأخطاء</p>
                    <p className="text-2xl font-bold">
                      {selectedStudentSubmission.answers.filter((a: any) => !a.isCorrect).length}
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="bg-[#F6F2E6] rounded-lg p-4 mb-6 flex items-center gap-2 text-[#3A3937]">
                <MaterialIcon name="event" className="text-[24px] text-[#BB8E2C]" />
                <div>
                  <p className="text-xs text-[#62615F]">تاريخ ووقت التسليم</p>
                  <p className="font-bold">{new Date(selectedStudentSubmission.submittedAt).toLocaleString('ar-EG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>

              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-[#121110] mb-3 flex items-center gap-2">
                  <MaterialIcon name="analytics" className="text-[24px] text-[#BB8E2C]" />
                  تحليل الأداء
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                    <MaterialIcon name="check_circle" className="text-[40px] text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-green-700">
                      {selectedStudentSubmission.answers.filter((a: any) => a.isCorrect).length}
                    </p>
                    <p className="text-sm text-green-700">إجابات صحيحة</p>
                  </div>

                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
                    <MaterialIcon name="cancel" className="text-[40px] text-red-600 mb-2" />
                    <p className="text-2xl font-bold text-red-700">
                      {selectedStudentSubmission.answers.filter((a: any) => !a.isCorrect).length}
                    </p>
                    <p className="text-sm text-red-700">إجابات خاطئة</p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
                    <MaterialIcon name="speed" className="text-[40px] text-blue-600 mb-2" />
                    <p className="text-2xl font-bold text-blue-700">
                      {(selectedStudentSubmission.timeTaken / selectedStudentSubmission.answers.length).toFixed(1)}
                    </p>
                    <p className="text-sm text-blue-700">دقيقة/سؤال</p>
                  </div>
                </div>
              </div>

              
              <div>
                <h4 className="text-lg font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="quiz" className="text-[24px] text-[#BB8E2C]" />
                  إجابات الطالب التفصيلية
                </h4>

                <div className="space-y-4">
                  {selectedStudentSubmission.answers.map((answer: any, index: number) => {
                    const question = selectedQuizForView.questions.find((q: any) => q.id === answer.questionId);
                    if (!question) return null;

                    return (
                      <div key={answer.questionId} className={`rounded-lg border-2 overflow-hidden ${
                        answer.isCorrect ? 'border-green-300' : 'border-red-300'
                      }`}>
                        <div className={`p-4 ${answer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              <MaterialIcon 
                                name={answer.isCorrect ? 'check' : 'close'} 
                                className="text-white text-[20px]"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-[#121110] mb-2">
                                السؤال {index + 1}: {question.question}
                              </p>
                            </div>
                          </div>

                          <div className="mr-11 space-y-2">
                            <div className={`p-3 rounded-lg ${
                              answer.isCorrect ? 'bg-white border-2 border-green-400' : 'bg-white border-2 border-red-400'
                            }`}>
                              <p className="text-sm">
                                <span className="font-bold text-[#3A3937]">إجابة الطالب:</span>
                                <span className={`mr-2 ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                  {answer.selectedAnswer}. {question[`option${answer.selectedAnswer}`]}
                                </span>
                              </p>
                            </div>

                            {!answer.isCorrect && (
                              <div className="p-3 rounded-lg bg-green-100 border-2 border-green-400">
                                <p className="text-sm">
                                  <span className="font-bold text-green-800">الإجابة الصحيحة:</span>
                                  <span className="text-green-700 mr-2">
                                    {question.correctAnswer}. {question[`option${question.correctAnswer}`]}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-6 mt-6 border-t border-[#E8DFD3]">
                <button
                  onClick={() => {
                    setShowStudentDetailsModal(false);
                    setSelectedStudentSubmission(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AssistantLayout>
  );
}
