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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2 flex items-center gap-3">
              <MaterialIcon name="groups" className="text-[36px] text-[#BB8E2C]" />
              إدارة الطلاب
            </h1>
            <p className="text-[#62615F]">عرض وإدارة بيانات الطلاب</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3] mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#121110] mb-2">البحث</label>
                <div className="relative">
                  <MaterialIcon name="search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BB8E2C]" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم أو الرقم الجامعي..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">البرنامج</label>
                <select
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                >
                  <option value="all">جميع البرامج</option>
                  <option value="software">هندسة البرمجيات</option>
                  <option value="cs">علوم الحاسب</option>
                  <option value="is">نظم المعلومات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">السنة الدراسية</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                >
                  <option value="all">جميع السنوات</option>
                  <option value="1">الأولى</option>
                  <option value="2">الثانية</option>
                  <option value="3">الثالثة</option>
                  <option value="4">الرابعة</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                بحث
              </button>
              <button className="px-6 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                إعادة تعيين
              </button>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#121110]">قائمة الطلاب ({students.length})</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                <MaterialIcon name="person_add" />
                إضافة طالب جديد
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F6F2E6]">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الرقم الجامعي</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الاسم</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">البرنامج</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">السنة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">المعدل</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD3]">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#121110]">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{student.program}</td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{student.year}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#BB8E2C]">{student.gpa}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            student.status === 'نشط'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="عرض التفاصيل">
                            <MaterialIcon name="visibility" className="text-[#BB8E2C]" />
                          </button>
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="تعديل">
                            <MaterialIcon name="edit" className="text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="حذف">
                            <MaterialIcon name="delete" className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="p-6 border-t border-[#E8DFD3] flex items-center justify-between">
              <p className="text-sm text-[#62615F]">عرض 1-5 من 5 طلاب</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-[#E8DFD3] rounded-lg text-sm font-semibold text-[#62615F] hover:bg-[#F6F2E6] transition-colors">
                  السابق
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg text-sm font-semibold">
                  1
                </button>
                <button className="px-4 py-2 border border-[#E8DFD3] rounded-lg text-sm font-semibold text-[#62615F] hover:bg-[#F6F2E6] transition-colors">
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
