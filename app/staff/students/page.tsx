'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  const students = [
    { id: '2024001', name: 'أحمد محمد علي', program: 'هندسة البرمجيات', year: 'الأولى', gpa: 3.8, status: 'نشط' },
    { id: '2024002', name: 'فاطمة حسن محمود', program: 'علوم الحاسب', year: 'الثانية', gpa: 3.9, status: 'نشط' },
    { id: '2024003', name: 'محمود سعيد أحمد', program: 'نظم المعلومات', year: 'الثالثة', gpa: 3.5, status: 'نشط' },
    { id: '2024004', name: 'سارة أحمد علي', program: 'هندسة البرمجيات', year: 'الرابعة', gpa: 3.7, status: 'نشط' },
    { id: '2024005', name: 'خالد محمد حسن', program: 'علوم الحاسب', year: 'الأولى', gpa: 3.6, status: 'موقوف' },
  ];

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
                <Users className="h-7 w-7 text-[#D97706]" />
                إدارة الطلاب
              </h1>
              <p className="text-sm text-stone-500 font-medium">عرض وإدارة بيانات الطلاب والملفات الأكاديمية</p>
            </div>
            <button className="self-start sm:self-center px-4 py-2 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
              <Plus className="h-4 w-4" />
              إضافة طالب جديد
            </button>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-600 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم أو الرقم الجامعي..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">البرنامج</label>
                <select
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                >
                  <option value="all">جميع البرامج</option>
                  <option value="software">هندسة البرمجيات</option>
                  <option value="cs">علوم الحاسب</option>
                  <option value="is">نظم المعلومات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">السنة الدراسية</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                >
                  <option value="all">جميع السنوات</option>
                  <option value="1">الأولى</option>
                  <option value="2">الثانية</option>
                  <option value="3">الثالثة</option>
                  <option value="4">الرابعة</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-5 py-2 bg-[#1C1917] text-white hover:bg-stone-850 rounded-xl font-bold text-xs transition-all shadow-sm">
                تصفية النتائج
              </button>
              <button className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all">
                إعادة تعيين
              </button>
            </div>
          </div>

          {/* List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-150">
              <h2 className="text-base font-bold text-[#1C1917]">قائمة الطلاب ({students.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50/70 border-b border-stone-150">
                  <tr>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الرقم الجامعي</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الاسم</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">البرنامج</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">السنة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">المعدل (GPA)</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-stone-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#1C1917]">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{student.program}</td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{student.year}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#D97706]">{student.gpa}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            student.status === 'نشط'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : 'bg-red-50 text-red-700 border border-red-100'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-[#D97706] transition-colors" title="عرض التفاصيل">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-blue-600 transition-colors" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-red-600 transition-colors" title="حذف">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-stone-150 flex items-center justify-between">
              <p className="text-xs text-stone-500 font-medium">عرض 1-5 من 5 طلاب</p>
              <div className="flex gap-2">
                <button className="p-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="px-3.5 py-1.5 bg-[#FABA19] text-[#1C1917] rounded-xl text-xs font-bold">
                  1
                </button>
                <button className="p-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
