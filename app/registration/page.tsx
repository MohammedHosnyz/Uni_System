'use client';

import { useState } from 'react';
import Link from 'next/link';



function MaterialIcon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default function RegistrationPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentCode, setStudentCode] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentCode === '202400001' && nationalId === '30012011234567') {
      setIsLoggedIn(true);
    } else {
      alert('الرقم الجامعي أو الرقم القومي غير صحيح');
    }
  };

  const availableCourses = [
    {
      code: 'CS401',
      name: 'الذكاء الاصطناعي',
      credits: 3,
      instructor: 'د. محمد أحمد',
      schedule: 'الأحد والثلاثاء 10:00-11:30',
      seats: 5,
      maxSeats: 30,
      prerequisites: ['CS301'],
    },
    {
      code: 'CS402',
      name: 'التعلم الآلي',
      credits: 3,
      instructor: 'د. فاطمة حسن',
      schedule: 'الاثنين والأربعاء 12:00-13:30',
      seats: 12,
      maxSeats: 30,
      prerequisites: ['CS301', 'MATH201'],
    },
    {
      code: 'CS403',
      name: 'أمن المعلومات',
      credits: 3,
      instructor: 'د. أحمد محمود',
      schedule: 'الأحد والثلاثاء 14:00-15:30',
      seats: 8,
      maxSeats: 25,
      prerequisites: ['CS302'],
    },
    {
      code: 'CS404',
      name: 'الحوسبة السحابية',
      credits: 3,
      instructor: 'د. سارة عبد الرحمن',
      schedule: 'الاثنين والأربعاء 10:00-11:30',
      seats: 15,
      maxSeats: 30,
      prerequisites: ['CS304'],
    },
    {
      code: 'CS405',
      name: 'تطبيقات الويب',
      credits: 3,
      instructor: 'د. خالد يوسف',
      schedule: 'الثلاثاء والخميس 12:00-13:30',
      seats: 3,
      maxSeats: 25,
      prerequisites: ['CS303'],
    },
  ];

  const toggleCourse = (courseCode: string) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== courseCode));
    } else {
      setSelectedCourses([...selectedCourses, courseCode]);
    }
  };

  const totalCredits = selectedCourses.reduce((sum, code) => {
    const course = availableCourses.find((c) => c.code === code);
    return sum + (course?.credits || 0);
  }, 0);

  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      alert('يرجى اختيار مقرر واحد على الأقل');
      return;
    }
    if (totalCredits < 12) {
      alert('الحد الأدنى للتسجيل هو 12 ساعة معتمدة');
      return;
    }
    if (totalCredits > 18) {
      alert('الحد الأقصى للتسجيل هو 18 ساعة معتمدة');
      return;
    }
    alert('تم تسجيل المقررات بنجاح!');
  };

  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBFAF6]" dir="rtl">
        
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
        /><main className="flex-grow">
          <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                  <MaterialIcon name="edit_calendar" className="text-[34px] text-[#121110]" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">تسجيل المقررات</h1>
                <p className="text-xl opacity-90">أدخل بياناتك لتسجيل المقررات الدراسية</p>
              </div>
            </div>
          </section>

          
          <section className="py-12 bg-[#F6F2E6]">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-bold text-[#121110] mb-6 text-center">
                  تسجيل الدخول لتسجيل المقررات
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-[#3A3937] font-semibold mb-2">
                      الرقم الجامعي *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent"
                      placeholder="202400001"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3A3937] font-semibold mb-2">
                      الرقم القومي *
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent"
                      placeholder="30012011234567"
                      maxLength={14}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] py-4 rounded-lg font-bold text-lg hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                  >
                    الدخول لتسجيل المقررات
                  </button>
                </form>

                <div className="mt-6 p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3]">
                  <p className="text-sm text-[#3A3937] text-center">
                    <strong>للتجربة:</strong>
                    <br />
                    الرقم الجامعي: 202400001
                    <br />
                    الرقم القومي: 30012011234567
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-[#BB8E2C] hover:underline font-semibold">
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
      /><main className="flex-grow">
        <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                <MaterialIcon name="edit_calendar" className="text-[34px] text-[#121110]" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">تسجيل المقررات</h1>
              <p className="text-xl opacity-90">الفصل الدراسي الأول 2024/2025</p>
              <p className="opacity-80 mt-2">
                الطالب: محمد أحمد علي | الرقم الجامعي: {studentCode}
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-[#F6F2E6]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                <MiniStat
                  value={String(totalCredits)}
                  label="ساعات مختارة"
                  icon="local_library"
                />
                <MiniStat value="12-18" label="الحد المسموح" icon="rule" />
                <MiniStat
                  value={String(selectedCourses.length)}
                  label="مقررات مختارة"
                  icon="checklist"
                />
                <MiniStat value="15 فبراير" label="آخر موعد" icon="event" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#FBFAF6]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-[#121110] mb-6">المقررات المتاحة للتسجيل</h2>

              <div className="space-y-4">
                {availableCourses.map((course) => {
                  const isSelected = selectedCourses.includes(course.code);
                  const isFull = course.seats === 0;

                  return (
                    <div
                      key={course.code}
                      className={`bg-white rounded-lg shadow-lg p-6 transition-all border border-[#E8DFD3] ${
                        isSelected ? 'ring-2 ring-[#BB8E2C]' : ''
                      } ${isFull ? 'opacity-60' : ''}`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleCourse(course.code)}
                              disabled={isFull}
                              className="w-5 h-5 text-[#BB8E2C] rounded focus:ring-[#BB8E2C]"
                            />

                            <div>
                              <h3 className="text-xl font-bold text-[#121110]">
                                {course.code} - {course.name}
                              </h3>

                              
                              <div className="flex flex-wrap gap-4 text-sm text-[#3A3937] mt-1">
                                <span className="inline-flex items-center gap-2">
                                  <MaterialIcon name="school" className="text-[18px] text-[#BB8E2C]" />
                                  {course.instructor}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                  <MaterialIcon name="calendar_month" className="text-[18px] text-[#BB8E2C]" />
                                  {course.schedule}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                  <MaterialIcon name="auto_stories" className="text-[18px] text-[#BB8E2C]" />
                                  {course.credits} ساعات
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mr-8">
                            <div className="text-sm text-[#3A3937] mb-2">
                              <strong>المتطلبات السابقة:</strong> {course.prerequisites.join(', ')}
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex-grow bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    course.seats < 5 ? 'bg-red-500' : 'bg-green-500'
                                  }`}
                                  style={{
                                    width: `${((course.maxSeats - course.seats) / course.maxSeats) * 100}%`,
                                  }}
                                />
                              </div>

                              <span
                                className={`text-sm font-semibold ${
                                  course.seats < 5 ? 'text-red-600' : 'text-green-600'
                                }`}
                              >
                                {course.seats} مقعد متبقي
                              </span>
                            </div>
                          </div>
                        </div>

                        {isFull && (
                          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-bold text-sm">
                            مكتمل
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-[#E8DFD3]">
                <h3 className="text-xl font-bold text-[#121110] mb-4">ملخص التسجيل</h3>

                {selectedCourses.length === 0 ? (
                  <p className="text-[#62615F]">لم تقم باختيار أي مقررات بعد</p>
                ) : (
                  <div>
                    <div className="space-y-2 mb-4">
                      {selectedCourses.map((code) => {
                        const course = availableCourses.find((c) => c.code === code);
                        return (
                          <div
                            key={code}
                            className="flex justify-between items-center p-3 bg-[#F6F2E6] rounded border border-[#E8DFD3]"
                          >
                            <span className="font-semibold text-[#121110]">
                              {course?.code} - {course?.name}
                            </span>
                            <span className="text-[#BB8E2C] font-bold">{course?.credits} ساعات</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg">
                      <span className="font-bold text-lg">إجمالي الساعات المعتمدة</span>
                      <span className="font-bold text-2xl">{totalCredits}</span>
                    </div>

                    {totalCredits < 12 && (
                      <div className="mt-4 p-4 bg-yellow-50 border-r-4 border-yellow-500 rounded">
                        <p className="text-yellow-800 inline-flex items-center gap-2">
                          <MaterialIcon name="warning" className="text-[20px]" />
                          الحد الأدنى للتسجيل هو 12 ساعة معتمدة
                        </p>
                      </div>
                    )}

                    {totalCredits > 18 && (
                      <div className="mt-4 p-4 bg-red-50 border-r-4 border-red-500 rounded">
                        <p className="text-red-800 inline-flex items-center gap-2">
                          <MaterialIcon name="error" className="text-[20px]" />
                          الحد الأقصى للتسجيل هو 18 ساعة معتمدة
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={selectedCourses.length === 0}
                  className="px-8 py-4 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold text-lg hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تأكيد التسجيل
                </button>

                <button
                  onClick={() => setSelectedCourses([])}
                  className="px-8 py-4 border-2 border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                >
                  إلغاء الاختيار
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-8 py-4 border-2 border-[#BB8E2C] text-[#BB8E2C] rounded-lg font-bold hover:bg-[#BB8E2C] hover:text-white transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F6F2E6]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-r-4 border-[#BB8E2C] rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-[#121110] mb-3">ملاحظات هامة:</h3>
                <ul className="list-disc list-inside space-y-2 text-[#3A3937]">
                  <li>يجب استيفاء المتطلبات السابقة لكل مقرر قبل التسجيل</li>
                  <li>الحد الأدنى للتسجيل 12 ساعة والحد الأقصى 18 ساعة معتمدة</li>
                  <li>يمكن إضافة أو حذف المقررات خلال الأسبوعين الأولين من الفصل</li>
                  <li>يجب سداد الرسوم الدراسية لتأكيد التسجيل</li>
                  <li>التسجيل يتم على أساس الأسبقية حسب المقاعد المتاحة</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}

function MiniStat({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="text-center p-4 bg-white rounded-lg border border-[#E8DFD3] shadow-md">
      <div className="mx-auto w-10 h-10 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center text-[#BB8E2C] mb-2">
        <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="text-2xl font-bold text-[#121110] mb-1">{value}</div>
      <div className="text-sm text-[#3A3937] font-semibold">{label}</div>
    </div>
  );
}
