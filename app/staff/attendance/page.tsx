'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  CalendarCheck2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download, 
  Printer, 
  Eye, 
  Check, 
  X 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

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
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <CalendarCheck2 className="h-7 w-7 text-[#D97706]" />
              الحضور والغياب
            </h1>
            <p className="text-sm text-stone-500 font-medium">تسجيل ومتابعة حضور وغياب الطلاب اليومي والأسبوعي</p>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">التاريخ</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">البرنامج</label>
                <select className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold">
                  <option>جميع البرامج</option>
                  <option>علوم الحاسب</option>
                  <option>هندسة البرمجيات</option>
                  <option>نظم المعلومات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">السنة الدراسية</label>
                <select className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold">
                  <option>جميع السنوات</option>
                  <option>الأولى</option>
                  <option>الثانية</option>
                  <option>الثالثة</option>
                  <option>الرابعة</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">إجمالي الطلاب</p>
                  <p className="text-2xl font-bold text-[#1C1917]">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">حاضر</p>
                  <p className="text-2xl font-bold text-[#1C1917]">{stats.present}</p>
                  <p className="text-xs text-green-600 font-bold mt-1">
                    {Math.round((stats.present / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">غائب</p>
                  <p className="text-2xl font-bold text-[#1C1917]">{stats.absent}</p>
                  <p className="text-xs text-red-600 font-bold mt-1">
                    {Math.round((stats.absent / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">متأخر</p>
                  <p className="text-2xl font-bold text-[#1C1917]">{stats.late}</p>
                  <p className="text-xs text-orange-650 font-bold mt-1">
                    {Math.round((stats.late / stats.total) * 100)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-5 border-b border-stone-150 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1C1917]">سجل الحضور - {selectedDate}</h2>
              <div className="flex gap-2">
                <button className="px-3.5 py-1.5 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  تصدير
                </button>
                <button className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5">
                  <Printer className="h-3.5 w-3.5" />
                  طباعة
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50/70 border-b border-stone-150">
                  <tr>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الرقم الجامعي</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الاسم</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">البرنامج</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">السنة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">وقت الحضور</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150">
                  {attendanceRecords.map((record) => (
                    <tr key={record.studentId} className="hover:bg-stone-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#1C1917]">{record.studentId}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{record.studentName}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{record.program}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{record.year}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#D97706]">{record.time}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            record.status === 'present'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : record.status === 'absent'
                              ? 'bg-red-50 text-red-700 border border-red-100'
                              : 'bg-orange-50 text-orange-700 border border-orange-100'
                          }`}
                        >
                          {record.status === 'present' ? 'حاضر' : record.status === 'absent' ? 'غائب' : 'متأخر'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {record.status === 'absent' && (
                            <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-green-600 transition-colors" title="تسجيل حضور">
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          {record.status === 'present' && (
                            <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-red-650 transition-colors" title="تسجيل غياب">
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-[#D97706] transition-colors" title="عرض السجل كامل">
                            <Eye className="h-4 w-4" />
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
