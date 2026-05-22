'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { SessionUser } from '../../../../../types';

const MaterialIcon = ({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) => (
  <span
    className={`material-symbols-outlined align-middle leading-none ${className}`}
    aria-hidden="true"
  >
    {name}
  </span>
);

export default function CourseGradesPage() {
  const router = useRouter();
  const params = useParams();
  const courseCode = params.courseCode as string;
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'student') {
      router.push('/login');
      return;
    }
    setUser(parsedUser);
  }, [router]);

  if (!user) return null;

  
  const courseData = {
    code: courseCode,
    name: 'هندسة البرمجيات',
    professor: 'د. أحمد محمد',
  };

  
  const attendance = [
    { week: 'الأسبوع 1', attended: true, date: '2024-09-01' },
    { week: 'الأسبوع 2', attended: true, date: '2024-09-08' },
    { week: 'الأسبوع 3', attended: true, date: '2024-09-15' },
    { week: 'الأسبوع 4', attended: false, date: '2024-09-22' },
    { week: 'الأسبوع 5', attended: true, date: '2024-09-29' },
    { week: 'الأسبوع 6', attended: true, date: '2024-10-06' },
    { week: 'الأسبوع 7', attended: true, date: '2024-10-13' },
    { week: 'الأسبوع 8', attended: true, date: '2024-10-20' },
  ];

  
  const sectionActivities = [
    { name: 'كويز 1', score: 4, total: 5, date: '2024-09-15', type: 'quiz' },
    { name: 'تسليم 1', score: 5, total: 5, date: '2024-09-20', type: 'submission' },
    { name: 'كويز 2', score: 4, total: 5, date: '2024-09-25', type: 'quiz' },
    { name: 'تسليم 2', score: 4, total: 5, date: '2024-10-01', type: 'submission' },
  ];

  
  const exams = [
    { name: 'امتحان منتصف الفصل (Midterm)', score: 22, total: 25, date: '2024-10-25', topics: ['الفصل 1-5'] },
    { name: 'الامتحان النهائي (Final)', score: null, total: 50, date: 'قيد الانتظار', topics: ['جميع الفصول'] },
  ];

  const attendedCount = attendance.filter(a => a.attended).length;
  const attendanceScore = (attendedCount / attendance.length) * 5; 
  const sectionTotal = sectionActivities.reduce((sum, g) => sum + g.score, 0); 
  const yearWorkTotal = attendanceScore + sectionTotal; 
  const examTotal = exams.reduce((sum, e) => sum + (e.score || 0), 0); 
  
  const currentTotal = yearWorkTotal + examTotal;
  const maxTotal = 100; 
  const percentage = (currentTotal / maxTotal) * 100;

  return (
    <DashboardLayout user={user} role="student">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,700,1,0"
      />

      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center gap-4">
          <Link
            href="/student/courses"
            className="w-12 h-12 bg-white border-2 border-[#E8DFD3] hover:border-[#BB8E2C] rounded-xl flex items-center justify-center transition-all group"
          >
            <MaterialIcon name="arrow_forward" className="text-[24px] text-[#BB8E2C] group-hover:translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">درجات المادة</h1>
            <p className="text-[#777]">{courseData.code} - {courseData.name}</p>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-[#BB8E2C] to-[#9A7324] rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{courseData.code}</h2>
              <p className="text-white/90 mb-1">{courseData.name}</p>
              <p className="text-white/80 text-sm">أستاذ المادة: {courseData.professor}</p>
            </div>
            <div className="text-center bg-white/20 rounded-xl px-8 py-4 backdrop-blur-sm">
              <div className="text-5xl font-bold mb-1">{percentage.toFixed(1)}%</div>
              <div className="text-sm text-white/90">النسبة المئوية</div>
              <div className="mt-2 text-xl font-bold text-[#FFCC00]">{currentTotal.toFixed(1)} / {maxTotal}</div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl border-2 border-[#E8DFD3] overflow-hidden">
          <div className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2C] text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MaterialIcon name="fact_check" className="text-[28px]" />
                الحضور والغياب
              </h3>
              <div className="text-right">
                <span className="text-2xl font-bold">{attendanceScore.toFixed(1)}</span>
                <span className="text-white/90"> / 5</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {attendance.map((att, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center transition-all border-2 ${
                    att.attended
                      ? 'bg-green-50 border-green-300 hover:bg-green-100'
                      : 'bg-red-50 border-red-300 hover:bg-red-100'
                  }`}
                >
                  <MaterialIcon 
                    name={att.attended ? 'check_circle' : 'cancel'} 
                    className={`text-[32px] block mx-auto mb-2 ${att.attended ? 'text-green-600' : 'text-red-600'}`}
                  />
                  <p className={`font-bold mb-1 ${att.attended ? 'text-green-700' : 'text-red-700'}`}>
                    {att.week}
                  </p>
                  <p className="text-xs text-[#777]">{att.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-xl border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#777]">
                  حضرت <span className="font-bold text-[#2D7A3E]">{attendedCount}</span> من <span className="font-bold">{attendance.length}</span> أسبوع
                </span>
                <span className="text-xl font-bold text-[#2D7A3E]">{attendanceScore.toFixed(1)} / 5</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl border-2 border-[#E8DFD3] overflow-hidden">
          <div className="bg-gradient-to-r from-[#BB8E2C] to-[#9A7324] text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MaterialIcon name="assignment_turned_in" className="text-[28px]" />
                أعمال السنة (كويزات - تسليمات - واجبات)
              </h3>
              <div className="text-right">
                <span className="text-2xl font-bold">{sectionTotal}</span>
                <span className="text-white/90"> / 20</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {sectionActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <span className={`w-12 h-12 ${
                      activity.type === 'quiz' 
                        ? 'bg-gradient-to-br from-[#BB8E2C] to-[#9A7324]' 
                        : 'bg-gradient-to-br from-[#D4A017] to-[#b98a12]'
                    } text-white rounded-xl flex items-center justify-center shadow-md`}>
                      <MaterialIcon 
                        name={activity.type === 'quiz' ? 'quiz' : 'upload_file'} 
                        className="text-[24px]" 
                      />
                    </span>
                    <div>
                      <p className="font-bold text-[#1A1A1A] flex items-center gap-2">
                        {activity.name}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.type === 'quiz' 
                            ? 'bg-[#FFF8E7] text-[#9A7324]' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {activity.type === 'quiz' ? 'كويز' : 'تسليم'}
                        </span>
                      </p>
                      <p className="text-xs text-[#999] mt-1">{activity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-[#1A1A1A]">
                      {activity.score} / {activity.total}
                    </span>
                    <div className="w-32 bg-[#E8DFD3] rounded-full h-3 overflow-hidden">
                      <div
                        className={`${
                          activity.type === 'quiz'
                            ? 'bg-gradient-to-r from-[#BB8E2C] to-[#9A7324]'
                            : 'bg-gradient-to-r from-[#D4A017] to-[#b98a12]'
                        } h-3 rounded-full transition-all`}
                        style={{ width: `${(activity.score / activity.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-xl border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#777]">إجمالي أعمال السنة:</span>
                <span className="text-xl font-bold text-[#BB8E2C]">{sectionTotal} / 20</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD3]">
                <span className="text-sm font-bold text-[#1A1A1A]">المجموع الكلي (حضور + أعمال):</span>
                <span className="text-2xl font-bold text-[#BB8E2C]">{yearWorkTotal.toFixed(1)} / 25</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl border-2 border-[#E8DFD3] overflow-hidden">
          <div className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2C] text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MaterialIcon name="quiz" className="text-[28px]" />
                الامتحانات
              </h3>
              <div className="text-right">
                <span className="text-2xl font-bold">{examTotal}</span>
                <span className="text-white/90"> / 70</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {exams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 bg-gradient-to-br from-[#2D7A3E] to-[#1F5A2C] text-white rounded-xl flex items-center justify-center shadow-md">
                      <MaterialIcon name="event_note" className="text-[24px]" />
                    </span>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{exam.name}</p>
                      <p className="text-sm text-[#777]">المواضيع: {exam.topics.join(', ')}</p>
                      <p className="text-xs text-[#999] mt-1">{exam.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {exam.score === null ? (
                      <span className="text-sm text-amber-600 font-semibold inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg border border-amber-300">
                        <MaterialIcon name="hourglass_top" className="text-[20px]" />
                        قيد التقييم
                      </span>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-[#1A1A1A]">
                          {exam.score} / {exam.total}
                        </span>
                        <div className="w-32 bg-[#E8DFD3] rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#2D7A3E] to-[#1F5A2C] h-3 rounded-full transition-all"
                            style={{ width: `${(exam.score / exam.total) * 100}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-[#BB8E2C] to-[#9A7324] rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MaterialIcon name="summarize" className="text-[32px]" />
            الملخص النهائي
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <MaterialIcon name="fact_check" className="text-[20px]" />
                  الحضور
                </span>
                <span className="font-bold">{attendanceScore.toFixed(1)} / 5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <MaterialIcon name="assignment_turned_in" className="text-[20px]" />
                  أعمال السنة
                </span>
                <span className="font-bold">{sectionTotal} / 20</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg backdrop-blur-sm border-2 border-white/30">
                <span className="flex items-center gap-2 font-bold">
                  <MaterialIcon name="calculate" className="text-[20px]" />
                  إجمالي أعمال السنة
                </span>
                <span className="font-bold text-xl">{yearWorkTotal.toFixed(1)} / 25</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <MaterialIcon name="quiz" className="text-[20px]" />
                  امتحان منتصف الفصل
                </span>
                <span className="font-bold">{exams[0].score} / 25</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <MaterialIcon name="event_note" className="text-[20px]" />
                  الامتحان النهائي
                </span>
                <span className="font-bold">{exams[1].score || '---'} / 50</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center bg-white/20 rounded-2xl px-12 py-8 backdrop-blur-sm border-2 border-white/30">
                <p className="text-sm text-white/90 mb-2">الإجمالي الكلي</p>
                <p className="text-6xl font-bold mb-2">{currentTotal.toFixed(1)}</p>
                <p className="text-xl text-white/90 mb-4">من {maxTotal}</p>
                <div className="text-4xl font-bold text-[#FFCC00]">{percentage.toFixed(1)}%</div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <p className="text-xs text-white/80 mb-1">التوزيع:</p>
                  <p className="text-sm text-white/90">25 (أعمال) + 25 (ميد) + 50 (فاينل)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
