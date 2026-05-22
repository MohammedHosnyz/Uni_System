'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';

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

export default function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState('2024-02-10');

  const attendanceRecords = [
    {
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      program: 'علوم الحاسب',
      year: 'الأولى',
      status: 'present',
      time: '08:15',
    },
    {
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      program: 'هندسة البرمجيات',
      year: 'الثانية',
      status: 'absent',
      time: '-',
    },
    {
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      program: 'نظم المعلومات',
      year: 'الثالثة',
      status: 'late',
      time: '08:45',
    },
    {
      studentId: '2024004',
      studentName: 'سارة أحمد علي',
      program: 'علوم الحاسب',
      year: 'الأولى',
      status: 'present',
      time: '08:10',
    },
  ];

  const stats = {
    present: attendanceRecords.filter((r) => r.status === 'present').length,
    absent: attendanceRecords.filter((r) => r.status === 'absent').length,
    late: attendanceRecords.filter((r) => r.status === 'late').length,
    total: attendanceRecords.length,
  };

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2 flex items-center gap-3">
              <MaterialIcon name="fact_check" className="text-[36px] text-[#BB8E2C]" />
              الحضور والغياب
            </h1>
            <p className="text-[#62615F]">تسجيل ومتابعة حضور وغياب الطلاب</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3] mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">التاريخ</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">البرنامج</label>
                <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]">
                  <option>جميع البرامج</option>
                  <option>علوم الحاسب</option>
                  <option>هندسة البرمجيات</option>
                  <option>نظم المعلومات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">السنة الدراسية</label>
                <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]">
                  <option>جميع السنوات</option>
                  <option>الأولى</option>
                  <option>الثانية</option>
                  <option>الثالثة</option>
                  <option>الرابعة</option>
                </select>
              </div>
            </div>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">إجمالي الطلاب</p>
                  <p className="text-3xl font-bold text-[#121110]">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="groups" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">حاضر</p>
                  <p className="text-3xl font-bold text-[#121110]">{stats.present}</p>
                  <p className="text-xs text-green-600 font-semibold mt-1">
                    {Math.round((stats.present / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="check_circle" className="text-[28px] text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">غائب</p>
                  <p className="text-3xl font-bold text-[#121110]">{stats.absent}</p>
                  <p className="text-xs text-red-600 font-semibold mt-1">
                    {Math.round((stats.absent / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="cancel" className="text-[28px] text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">متأخر</p>
                  <p className="text-3xl font-bold text-[#121110]">{stats.late}</p>
                  <p className="text-xs text-orange-600 font-semibold mt-1">
                    {Math.round((stats.late / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="schedule" className="text-[28px] text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#121110]">سجل الحضور - {selectedDate}</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                  <MaterialIcon name="download" />
                  تصدير
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  <MaterialIcon name="print" />
                  طباعة
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F6F2E6]">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الرقم الجامعي</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الاسم</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">البرنامج</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">السنة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">وقت الحضور</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD3]">
                  {attendanceRecords.map((record) => (
                    <tr key={record.studentId} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#121110]">{record.studentId}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{record.studentName}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{record.program}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{record.year}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#BB8E2C]">{record.time}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-700'
                              : record.status === 'absent'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {record.status === 'present' ? 'حاضر' : record.status === 'absent' ? 'غائب' : 'متأخر'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {record.status === 'absent' && (
                            <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="تسجيل حضور">
                              <MaterialIcon name="check_circle" className="text-green-600" />
                            </button>
                          )}
                          {record.status === 'present' && (
                            <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="تسجيل غياب">
                              <MaterialIcon name="cancel" className="text-red-600" />
                            </button>
                          )}
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="عرض السجل">
                            <MaterialIcon name="visibility" className="text-[#BB8E2C]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
