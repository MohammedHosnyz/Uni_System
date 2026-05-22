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

interface Student {
  id: number;
  name: string;
  code: string;
  grade: number | null;
}

export default function AssistantGradesPage() {
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [selectedType, setSelectedType] = useState<'quiz' | 'assignment' | 'lab'>('quiz');
  const [selectedAssessment, setSelectedAssessment] = useState('quiz1');

  const students: Student[] = [
    { id: 1, name: 'أحمد محمد علي', code: '202400001', grade: 18 },
    { id: 2, name: 'فاطمة حسن إبراهيم', code: '202400002', grade: 20 },
    { id: 3, name: 'محمود خالد أحمد', code: '202400003', grade: 15 },
    { id: 4, name: 'سارة عبدالله محمد', code: '202400004', grade: null },
    { id: 5, name: 'عمر حسين علي', code: '202400005', grade: 17 },
  ];

  const gradeDistribution = [
    { range: '18-20', count: 2, percentage: 40 },
    { range: '15-17', count: 2, percentage: 40 },
    { range: '12-14', count: 0, percentage: 0 },
    { range: '0-11', count: 0, percentage: 0 },
  ];

  const stats = {
    total: 5,
    graded: 4,
    pending: 1,
    average: 17.5,
    highest: 20,
    lowest: 15,
  };

  return (
    <AssistantLayout userName="أ. محمد أحمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">إدارة الدرجات</h1>
            <p className="text-[#62615F]">إدخال ومتابعة درجات الطلاب</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                >
                  <option value="CS101">CS101 - مقدمة في البرمجة</option>
                  <option value="CS201">CS201 - هياكل البيانات</option>
                  <option value="CS301">CS301 - قواعد البيانات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">نوع التقييم</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'quiz' | 'assignment' | 'lab')}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                >
                  <option value="quiz">كويز</option>
                  <option value="assignment">واجب</option>
                  <option value="lab">معمل</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">التقييم</label>
                <select
                  value={selectedAssessment}
                  onChange={(e) => setSelectedAssessment(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                >
                  <option value="quiz1">كويز 1</option>
                  <option value="quiz2">كويز 2</option>
                  <option value="quiz3">كويز 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                    <MaterialIcon name="grade" className="text-[24px] text-[#BB8E2C]" />
                    قائمة الطلاب
                  </h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                    <MaterialIcon name="save" className="text-[20px] inline-block ml-2" />
                    حفظ الدرجات
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F6F2E6]">
                      <tr>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">#</th>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الدرجة (من 20)</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id} className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors">
                          <td className="px-6 py-4 text-sm text-[#3A3937]">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-bold text-[#121110]">{student.name}</p>
                              <p className="text-xs text-[#62615F]">{student.code}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              defaultValue={student.grade || ''}
                              placeholder="0"
                              className="w-24 px-3 py-2 border border-[#E8DFD3] rounded-lg text-center focus:ring-2 focus:ring-[#BB8E2C] outline-none mx-auto block"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            {student.grade !== null ? (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                تم الإدخال
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                قيد الإدخال
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                <h3 className="text-lg font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="analytics" className="text-[20px] text-[#BB8E2C]" />
                  الإحصائيات
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                    <span className="text-sm text-[#3A3937]">إجمالي الطلاب</span>
                    <span className="text-lg font-bold text-[#121110]">{stats.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                    <span className="text-sm text-[#3A3937]">تم الإدخال</span>
                    <span className="text-lg font-bold text-green-600">{stats.graded}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                    <span className="text-sm text-[#3A3937]">قيد الإدخال</span>
                    <span className="text-lg font-bold text-yellow-600">{stats.pending}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg">
                    <span className="text-sm text-[#121110] font-bold">المتوسط</span>
                    <span className="text-lg font-bold text-[#121110]">{stats.average}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                    <span className="text-sm text-[#3A3937]">أعلى درجة</span>
                    <span className="text-lg font-bold text-[#121110]">{stats.highest}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                    <span className="text-sm text-[#3A3937]">أقل درجة</span>
                    <span className="text-lg font-bold text-[#121110]">{stats.lowest}</span>
                  </div>
                </div>
              </div>

              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                <h3 className="text-lg font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="bar_chart" className="text-[20px] text-[#BB8E2C]" />
                  توزيع الدرجات
                </h3>
                <div className="space-y-3">
                  {gradeDistribution.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#3A3937]">{item.range}</span>
                        <span className="text-sm text-[#62615F]">{item.count} طالب</span>
                      </div>
                      <div className="w-full bg-[#F6F2E6] rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}
