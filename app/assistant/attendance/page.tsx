'use client';

import { useMemo, useState } from 'react';
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

interface Student {
  id: number;
  name: string;
  code: string;
  status: 'present' | 'absent' | 'late' | null;
  attendanceRate: number;
}

export default function AssistantAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [selectedDate, setSelectedDate] = useState('2024-02-14');
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'أحمد محمد علي', code: '202400001', status: null, attendanceRate: 95 },
    { id: 2, name: 'فاطمة حسن إبراهيم', code: '202400002', status: null, attendanceRate: 88 },
    { id: 3, name: 'محمود خالد أحمد', code: '202400003', status: null, attendanceRate: 92 },
    { id: 4, name: 'سارة عبدالله محمد', code: '202400004', status: null, attendanceRate: 85 },
    { id: 5, name: 'عمر يوسف حسن', code: '202400005', status: null, attendanceRate: 78 },
    { id: 6, name: 'نور الدين علي', code: '202400006', status: null, attendanceRate: 90 },
    { id: 7, name: 'مريم أحمد سعيد', code: '202400007', status: null, attendanceRate: 82 },
    { id: 8, name: 'يوسف محمد عبدالله', code: '202400008', status: null, attendanceRate: 94 },
  ]);

  const courses = useMemo(
    () => [
      { code: 'CS101', name: 'مقدمة في البرمجة - سكشن 1' },
      { code: 'CS201', name: 'هياكل البيانات - سكشن 2' },
      { code: 'CS301', name: 'قواعد البيانات - معمل 1' },
    ],
    []
  );

  const updateAttendance = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, status } : s)));
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'present' })));
  };

  const saveAttendance = () => {
    const unmarked = students.filter((s) => s.status === null).length;
    if (unmarked > 0) {
      alert(`يوجد ${unmarked} طالب لم يتم تسجيل حضورهم`);
      return;
    }
    alert('تم حفظ الحضور بنجاح!');
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const lateCount = students.filter((s) => s.status === 'late').length;

  const markedCount = presentCount + absentCount + lateCount;

  return (
    <AssistantLayout>
      <div className={`${cairo.className} min-h-screen flex flex-col bg-[#FBFAF6]`} dir="rtl">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
        />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#121110] mb-2">إدارة الحضور والغياب</h1>
              <p className="text-[#62615F]">تسجيل ومتابعة حضور الطلاب</p>
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white"
                  >
                    {courses.map((course) => (
                      <option key={course.code} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">التاريخ</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={markAllPresent}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center justify-center gap-2"
                  >
                    <MaterialIcon name="done_all" className="text-[20px]" />
                    تحديد الكل حاضر
                  </button>
                </div>
              </div>
            </div>

            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <StatCard icon="groups" title="إجمالي الطلاب" value={students.length.toString()} color="bg-[#BB8E2C]" />
              <StatCard icon="check_circle" title="حاضر" value={presentCount.toString()} color="bg-green-500" />
              <StatCard icon="cancel" title="غائب" value={absentCount.toString()} color="bg-red-500" />
              <StatCard icon="schedule" title="متأخر" value={lateCount.toString()} color="bg-yellow-500" />
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
              <div className="p-6 border-b border-[#E8DFD3]">
                <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="how_to_reg" className="text-[24px] text-[#BB8E2C]" />
                  قائمة الطلاب
                </h2>
                <p className="text-sm text-[#62615F] font-semibold mt-2">
                  المقرر: <span className="font-bold text-[#121110]">{selectedCourse}</span> — التاريخ:{' '}
                  <span className="font-bold text-[#121110]">{selectedDate}</span>
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F6F2E6]">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">#</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الرقم الجامعي</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">اسم الطالب</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">نسبة الحضور</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحالة</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={student.id}
                        className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#3A3937]">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#121110]">{student.code}</td>
                        <td className="px-6 py-4 text-sm text-[#3A3937] font-medium">{student.name}</td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendanceRate >= 90
                                    ? 'bg-green-500'
                                    : student.attendanceRate >= 75
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${student.attendanceRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-[#121110]">{student.attendanceRate}%</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateAttendance(student.id, 'present')}
                              className={`p-2 rounded-2xl transition-all border ${
                                student.status === 'present'
                                  ? 'bg-green-500 text-white border-green-500'
                                  : 'bg-gray-100 text-gray-400 border-gray-100 hover:bg-green-100 hover:text-green-700'
                              }`}
                              title="حاضر"
                            >
                              <MaterialIcon name="check_circle" className="text-[20px]" />
                            </button>

                            <button
                              type="button"
                              onClick={() => updateAttendance(student.id, 'late')}
                              className={`p-2 rounded-2xl transition-all border ${
                                student.status === 'late'
                                  ? 'bg-yellow-500 text-white border-yellow-500'
                                  : 'bg-gray-100 text-gray-400 border-gray-100 hover:bg-yellow-100 hover:text-yellow-700'
                              }`}
                              title="متأخر"
                            >
                              <MaterialIcon name="schedule" className="text-[20px]" />
                            </button>

                            <button
                              type="button"
                              onClick={() => updateAttendance(student.id, 'absent')}
                              className={`p-2 rounded-2xl transition-all border ${
                                student.status === 'absent'
                                  ? 'bg-red-500 text-white border-red-500'
                                  : 'bg-gray-100 text-gray-400 border-gray-100 hover:bg-red-100 hover:text-red-700'
                              }`}
                              title="غائب"
                            >
                              <MaterialIcon name="cancel" className="text-[20px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-[#E8DFD3] flex justify-between items-center gap-4 flex-wrap">
                <div className="text-sm text-[#62615F] font-semibold">
                  تم تسجيل حضور {markedCount} من {students.length} طالب
                </div>

                <button
                  type="button"
                  onClick={saveAttendance}
                  className="px-8 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2"
                >
                  <MaterialIcon name="save" className="text-[20px]" />
                  حفظ الحضور
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E8DFD3]">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
        <MaterialIcon name={icon} className="text-[28px]" />
      </div>
      <h3 className="text-sm font-semibold text-[#62615F] mb-1">{title}</h3>
      <p className="text-3xl font-bold text-[#121110]">{value}</p>
    </div>
  );
}
