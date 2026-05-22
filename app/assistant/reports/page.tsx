'use client';

import { useState } from 'react';
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

export default function AssistantReportsPage() {
  const [selectedReport, setSelectedReport] = useState<'performance' | 'attendance' | 'assignments' | 'grades'>(
    'performance'
  );
  const [selectedCourse, setSelectedCourse] = useState('CS101');

  const performanceData = [
    { name: 'أحمد محمد علي', code: '202400001', gpa: 3.5, attendance: 90, assignments: 8, quizzes: 85 },
    { name: 'فاطمة حسن إبراهيم', code: '202400002', gpa: 3.8, attendance: 95, assignments: 10, quizzes: 92 },
    { name: 'محمود خالد أحمد', code: '202400003', gpa: 3.2, attendance: 85, assignments: 7, quizzes: 78 },
  ];

  const attendanceStats = {
    total: 45,
    present: 38,
    absent: 5,
    late: 2,
    percentage: 84,
  };

  const assignmentStats = {
    total: 3,
    submitted: 42,
    pending: 3,
    late: 5,
    onTime: 37,
  };

  const gradeDistribution = [
    { range: 'A (90-100)', count: 12, percentage: 27 },
    { range: 'B (80-89)', count: 18, percentage: 40 },
    { range: 'C (70-79)', count: 10, percentage: 22 },
    { range: 'D (60-69)', count: 5, percentage: 11 },
  ];

  return (
    <AssistantLayout userName="أ. محمد أحمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">التقارير والإحصائيات</h1>
            <p className="text-[#62615F]">عرض تقارير شاملة عن أداء الطلاب</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                >
                  <option value="CS101">CS101 - مقدمة في البرمجة</option>
                  <option value="CS201">CS201 - هياكل البيانات</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                  <MaterialIcon name="download" className="text-[20px] inline-block ml-2" />
                  تصدير التقرير (PDF)
                </button>
              </div>
            </div>
          </div>

          
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedReport('performance')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedReport === 'performance'
                  ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                  : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
              }`}
            >
              <MaterialIcon name="trending_up" className="text-[20px] inline-block ml-2" />
              أداء الطلاب
            </button>
            <button
              onClick={() => setSelectedReport('attendance')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedReport === 'attendance'
                  ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                  : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
              }`}
            >
              <MaterialIcon name="how_to_reg" className="text-[20px] inline-block ml-2" />
              الحضور والغياب
            </button>
            <button
              onClick={() => setSelectedReport('assignments')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedReport === 'assignments'
                  ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                  : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
              }`}
            >
              <MaterialIcon name="assignment" className="text-[20px] inline-block ml-2" />
              الواجبات
            </button>
            <button
              onClick={() => setSelectedReport('grades')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedReport === 'grades'
                  ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                  : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
              }`}
            >
              <MaterialIcon name="grade" className="text-[20px] inline-block ml-2" />
              توزيع الدرجات
            </button>
          </div>

          
          {selectedReport === 'performance' && (
            <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
              <div className="p-6 border-b border-[#E8DFD3]">
                <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="trending_up" className="text-[24px] text-[#BB8E2C]" />
                  تقرير أداء الطلاب
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F6F2E6]">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">المعدل</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحضور</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الواجبات</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الكويزات</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">التقييم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((student) => (
                      <tr key={student.code} className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-[#121110]">{student.name}</p>
                            <p className="text-xs text-[#62615F]">{student.code}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-bold text-[#121110]">{student.gpa}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              student.attendance >= 90
                                ? 'bg-green-100 text-green-700'
                                : student.attendance >= 75
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-[#121110]">{student.assignments}/10</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-[#121110]">{student.quizzes}%</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              student.gpa >= 3.5
                                ? 'bg-green-100 text-green-700'
                                : student.gpa >= 3.0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {student.gpa >= 3.5 ? 'ممتاز' : student.gpa >= 3.0 ? 'جيد' : 'مقبول'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          
          {selectedReport === 'attendance' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                  <MaterialIcon name="how_to_reg" className="text-[24px] text-[#BB8E2C]" />
                  إحصائيات الحضور
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-[#F6F2E6] rounded-lg flex items-center justify-between">
                    <span className="text-sm text-[#3A3937]">إجمالي الطلاب</span>
                    <span className="text-2xl font-bold text-[#121110]">{attendanceStats.total}</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-green-700">حاضر</span>
                    <span className="text-2xl font-bold text-green-700">{attendanceStats.present}</span>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-red-700">غائب</span>
                    <span className="text-2xl font-bold text-red-700">{attendanceStats.absent}</span>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-yellow-700">متأخر</span>
                    <span className="text-2xl font-bold text-yellow-700">{attendanceStats.late}</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg flex items-center justify-between">
                    <span className="text-sm text-[#121110] font-bold">نسبة الحضور</span>
                    <span className="text-2xl font-bold text-[#121110]">{attendanceStats.percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                <h3 className="text-lg font-bold text-[#121110] mb-4">الطلاب المتغيبون</h3>
                <div className="space-y-3">
                  {performanceData
                    .filter((s) => s.attendance < 90)
                    .map((student) => (
                      <div key={student.code} className="p-4 border border-[#E8DFD3] rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#121110]">{student.name}</p>
                            <p className="text-xs text-[#62615F]">{student.code}</p>
                          </div>
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                            {student.attendance}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          
          {selectedReport === 'assignments' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                <MaterialIcon name="assignment" className="text-[24px] text-[#BB8E2C]" />
                تقرير الواجبات المسلمة
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-[#F6F2E6] rounded-lg text-center">
                  <p className="text-sm text-[#62615F] mb-2">إجمالي الواجبات</p>
                  <p className="text-3xl font-bold text-[#121110]">{assignmentStats.total}</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-green-700 mb-2">تم التسليم</p>
                  <p className="text-3xl font-bold text-green-700">{assignmentStats.submitted}</p>
                </div>
                <div className="p-6 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-yellow-700 mb-2">قيد الانتظار</p>
                  <p className="text-3xl font-bold text-yellow-700">{assignmentStats.pending}</p>
                </div>
                <div className="p-6 bg-red-50 rounded-lg text-center">
                  <p className="text-sm text-red-700 mb-2">متأخر</p>
                  <p className="text-3xl font-bold text-red-700">{assignmentStats.late}</p>
                </div>
              </div>

              <div className="p-6 bg-[#F6F2E6] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#3A3937]">نسبة التسليم في الموعد</span>
                  <span className="text-sm text-[#62615F]">
                    {assignmentStats.onTime} من {assignmentStats.submitted}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-full"
                    style={{ width: `${(assignmentStats.onTime / assignmentStats.submitted) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          
          {selectedReport === 'grades' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                <MaterialIcon name="bar_chart" className="text-[24px] text-[#BB8E2C]" />
                توزيع الدرجات
              </h2>

              <div className="space-y-6">
                {gradeDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#3A3937]">{item.range}</span>
                      <span className="text-sm text-[#62615F]">
                        {item.count} طالب ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#F6F2E6] rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-full flex items-center justify-center text-xs font-bold text-[#121110]"
                        style={{ width: `${item.percentage}%` }}
                      >
                        {item.percentage > 15 && `${item.percentage}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AssistantLayout>
  );
}
