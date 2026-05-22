'use client';

import { useState } from 'react';
import Link from 'next/link';



function MaterialIcon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

export default function GradesPage() {
  const [studentCode, setStudentCode] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentCode.trim() && nationalId.trim()) {
      setShowResults(true);
    } else {
      alert('يرجى إدخال كود الطالب والرقم القومي');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const mockGrades = [
    { code: 'CS101', name: 'مقدمة في البرمجة', credits: 3, grade: 'A', points: 4.0, score: 95 },
    { code: 'MATH101', name: 'التفاضل والتكامل', credits: 3, grade: 'A-', points: 3.7, score: 91 },
    { code: 'ENG101', name: 'اللغة الإنجليزية', credits: 3, grade: 'B+', points: 3.3, score: 88 },
    { code: 'PHY101', name: 'الفيزياء العامة', credits: 3, grade: 'A', points: 4.0, score: 94 },
  ];

  const gpa = 3.75;

  
  const getGradeColor = (grade: string) => {
    
    if (grade.startsWith('A')) return 'bg-[#FBFAF6] text-[#121110] border border-[#D6AE45]';
    
    if (grade.startsWith('B')) return 'bg-[#F6F2E6] text-[#121110] border border-[#E8DFD3]';
    
    if (grade.startsWith('C')) return 'bg-white text-[#62615F] border border-[#E8DFD3]';
    
    return 'bg-white text-[#121110] border border-[#E8DFD3]';
  };

  if (!showResults) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBFAF6]" dir="rtl">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
        /><main className="flex-grow">
                    <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-extrabold mb-4">الاستعلام عن الدرجات</h1>
              <p className="text-xl opacity-90">أدخل كود الطالب والرقم القومي للاستعلام عن النتيجة</p>
            </div>
          </section>

          <section className="py-16 bg-[#F6F2E6]">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-[#E8DFD3]">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F6F2E6] border-2 border-[#E8DFD3] flex items-center justify-center">
                    <MaterialIcon name="grading" className="text-[#BB8E2C] text-[40px]" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#121110] mb-2">استعلام عن النتيجة</h2>
                  <p className="text-sm text-[#62615F] font-semibold">أدخل البيانات المطلوبة للاستعلام</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[#121110] font-extrabold mb-2">
                      كود الطالب <span className="text-[#BB8E2C]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62615F]">
                        <MaterialIcon name="badge" className="text-[20px]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                        className="w-full pr-12 pl-4 py-3 border-2 border-[#E8DFD3] rounded-xl bg-[#F6F2E6] focus:ring-2 focus:ring-[#D6AE45] focus:border-[#D6AE45] outline-none transition-all"
                        placeholder="مثال: 2024001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#121110] font-extrabold mb-2">
                      الرقم القومي <span className="text-[#BB8E2C]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62615F]">
                        <MaterialIcon name="fingerprint" className="text-[20px]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        className="w-full pr-12 pl-4 py-3 border-2 border-[#E8DFD3] rounded-xl bg-[#F6F2E6] focus:ring-2 focus:ring-[#D6AE45] focus:border-[#D6AE45] outline-none transition-all"
                        placeholder="أدخل الرقم القومي (14 رقم)"
                        maxLength={14}
                      />
                    </div>
                  </div>

                                    <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] hover:from-[#D6AE45] hover:to-[#FCCC03] text-[#121110] rounded-xl font-extrabold text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    عرض النتيجة
                  </button>
                </form>

                                <div className="mt-6 p-4 bg-[#F6F2E6] border-r-4 border-[#BB8E2C] rounded-xl">
                  <div className="flex items-start gap-3">
                    <MaterialIcon name="key" className="text-[#BB8E2C] text-[26px]" />
                    <div className="flex-1">
                      <p className="text-sm font-extrabold text-[#121110] mb-2">بيانات تجريبية للاختبار:</p>
                      <div className="bg-white p-3 rounded-lg border border-[#E8DFD3]">
                        <p className="text-sm text-[#3A3937]">
                          <span className="font-extrabold text-[#62615F]">كود الطالب:</span>{' '}
                          <span className="font-mono font-extrabold text-[#121110]">2024001</span>
                        </p>
                        <p className="text-sm text-[#3A3937] mt-1">
                          <span className="font-extrabold text-[#62615F]">الرقم القومي:</span>{' '}
                          <span className="font-mono font-extrabold text-[#121110]">12345678901234</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                                <div className="mt-6 p-4 bg-[#FBFAF6] border-r-4 border-[#D6AE45] rounded-xl">
                  <div className="flex items-start gap-3">
                    <MaterialIcon name="info" className="text-[#BB8E2C] text-[22px]" />
                    <div className="text-sm text-[#3A3937]">
                      <p className="font-extrabold mb-1">ملاحظة:</p>
                      <p className="font-semibold text-[#62615F]">
                        يجب إدخال كود الطالب والرقم القومي بشكل صحيح للحصول على النتيجة
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-[#121110] hover:text-[#BB8E2C] font-extrabold text-sm transition-colors">
                    تسجيل الدخول للنظام الكامل
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main></div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF6]" dir="rtl">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area,
          #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
          header,
          footer {
            display: none !important;
          }
        }
      `}</style><main className="flex-grow">
        <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16 no-print">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold mb-4">نتيجة الطالب</h1>
            <p className="text-lg opacity-90 font-semibold">كود الطالب: {studentCode}</p>
          </div>
        </section>

        <section className="py-12 bg-[#F6F2E6]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div id="printable-area" className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-[#E8DFD3]">
                                <div className="hidden print:block mb-8 text-center border-b-2 border-[#D6AE45] pb-6">
                  <h1 className="text-3xl font-extrabold text-[#121110] mb-2">كلية الحاسبات والمعلومات</h1>
                  <h2 className="text-xl font-extrabold text-[#121110] mb-1">جامعة أسيوط الأهلية</h2>
                  <p className="text-lg text-[#62615F]">كشف درجات الطالب</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] shadow-md hover:shadow-xl transition-all">
                    <MaterialIcon name="person" className="text-[#BB8E2C] text-[32px] mb-2" />
                    <div className="text-sm text-[#62615F] mb-1 font-semibold">اسم الطالب</div>
                    <div className="text-lg font-extrabold text-[#121110]">محمد أحمد علي</div>
                  </div>

                  <div className="text-center p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] shadow-md hover:shadow-xl transition-all">
                    <MaterialIcon name="badge" className="text-[#BB8E2C] text-[32px] mb-2" />
                    <div className="text-sm text-[#62615F] mb-1 font-semibold">كود الطالب</div>
                    <div className="text-lg font-extrabold text-[#121110]">{studentCode}</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] rounded-xl border border-[#D6AE45]/40 shadow-lg hover:shadow-xl transition-all print:bg-[#F6F2E6] print:text-[#121110] print:border print:border-[#E8DFD3]">
                    <MaterialIcon name="grade" className="text-[32px] mb-2 print:text-[#BB8E2C]" />
                    <div className="text-sm opacity-90 mb-1 font-semibold print:text-[#62615F] print:opacity-100">
                      المعدل التراكمي
                    </div>
                    <div className="text-3xl font-extrabold">{gpa.toFixed(2)}</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] print:bg-[#D6AE45]">
                      <tr>
                        <th className="px-6 py-4 text-right border border-white/30">كود المقرر</th>
                        <th className="px-6 py-4 text-right border border-white/30">اسم المقرر</th>
                        <th className="px-6 py-4 text-center border border-white/30">الساعات</th>
                        <th className="px-6 py-4 text-center border border-white/30">الدرجة</th>
                        <th className="px-6 py-4 text-center border border-white/30">التقدير</th>
                        <th className="px-6 py-4 text-center border border-white/30">النقاط</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#E8DFD3]">
                      {mockGrades.map((course, index) => (
                        <tr key={index} className="hover:bg-[#FBFAF6] transition-colors print:hover:bg-white">
                          <td className="px-6 py-4 font-extrabold text-[#121110] border border-[#E8DFD3]">{course.code}</td>
                          <td className="px-6 py-4 text-[#3A3937] border border-[#E8DFD3] font-semibold">{course.name}</td>
                          <td className="px-6 py-4 text-center text-[#3A3937] border border-[#E8DFD3] font-semibold">{course.credits}</td>
                          <td className="px-6 py-4 text-center font-extrabold text-[#121110] border border-[#E8DFD3]">
                            {course.score}
                          </td>
                          <td className="px-6 py-4 text-center border border-[#E8DFD3]">
                            <span
                              className={`px-3 py-1 rounded-full font-extrabold inline-flex items-center justify-center ${getGradeColor(
                                course.grade
                              )} print:bg-transparent print:text-[#121110] print:border-[#E8DFD3]`}
                            >
                              {course.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-extrabold text-[#3A3937] border border-[#E8DFD3]">
                            {course.points.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot className="bg-[#F6F2E6] border-t-2 border-[#D6AE45]">
                      <tr className="font-extrabold">
                        <td colSpan={2} className="px-6 py-4 text-[#3A3937] border border-[#E8DFD3]">
                          المجموع / المعدل
                        </td>
                        <td className="px-6 py-4 text-center text-[#121110] border border-[#E8DFD3]">
                          {mockGrades.reduce((sum, c) => sum + c.credits, 0)}
                        </td>
                        <td colSpan={2} className="px-6 py-4 text-center text-[#62615F] border border-[#E8DFD3]">
                          معدل الفصل
                        </td>
                        <td className="px-6 py-4 text-center text-[#121110] text-xl border border-[#E8DFD3]">
                          {gpa.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="hidden print:block mt-8 pt-6 border-t-2 border-[#E8DFD3] text-center text-sm text-[#62615F]">
                  <p>تاريخ الطباعة: {new Date().toLocaleDateString('ar-EG')}</p>
                  <p className="mt-2">هذا المستند صادر من نظام إدارة الطلاب - كلية الحاسبات والمعلومات</p>
                </div>
              </div>

              <div className="flex gap-4 no-print">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] hover:from-[#D6AE45] hover:to-[#FCCC03] text-[#121110] rounded-xl font-extrabold transition-all shadow-lg hover:shadow-xl"
                >
                  استعلام جديد
                </button>

                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-[#121110] hover:bg-black text-white rounded-xl font-extrabold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <MaterialIcon name="print" className="text-[20px] text-white" />
                  طباعة النتيجة
                </button>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}
