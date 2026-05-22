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
  email: string;
  phone: string;
  courses: string[];
  gpa: number;
  attendance: number;
}

export default function AssistantStudentsPage() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const students: Student[] = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      code: '202400001',
      email: 'ahmed@example.com',
      phone: '01012345678',
      courses: ['CS101', 'CS201'],
      gpa: 3.5,
      attendance: 90,
    },
    {
      id: 2,
      name: 'فاطمة حسن إبراهيم',
      code: '202400002',
      email: 'fatma@example.com',
      phone: '01098765432',
      courses: ['CS101'],
      gpa: 3.8,
      attendance: 95,
    },
    {
      id: 3,
      name: 'محمود خالد أحمد',
      code: '202400003',
      email: 'mahmoud@example.com',
      phone: '01123456789',
      courses: ['CS201'],
      gpa: 3.2,
      attendance: 85,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesCourse = selectedCourse === 'all' || student.courses.includes(selectedCourse);
    const matchesSearch =
      student.name.includes(searchQuery) ||
      student.code.includes(searchQuery) ||
      student.email.includes(searchQuery);
    return matchesCourse && matchesSearch;
  });

  return (
    <AssistantLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">التواصل مع الطلاب</h1>
            <p className="text-[#62615F]">إدارة بيانات الطلاب والتواصل معهم</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                >
                  <option value="all">جميع المقررات</option>
                  <option value="CS101">CS101 - مقدمة في البرمجة</option>
                  <option value="CS201">CS201 - هياكل البيانات</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#3A3937] mb-2">البحث</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو الكود أو البريد الإلكتروني..."
                    className="w-full px-4 py-3 pr-12 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                  />
                  <MaterialIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[24px] text-[#62615F]" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowNotificationModal(true)}
              disabled={selectedStudents.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MaterialIcon name="notifications" className="text-[20px] inline-block ml-2" />
              إرسال إشعار ({selectedStudents.length})
            </button>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F6F2E6]">
                  <tr>
                    <th className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents(filteredStudents.map((s) => s.id));
                          } else {
                            setSelectedStudents([]);
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">المقررات</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">المعدل</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحضور</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents([...selectedStudents, student.id]);
                            } else {
                              setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
                            }
                          }}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#121110]">{student.name}</p>
                          <p className="text-xs text-[#62615F]">{student.code}</p>
                          <p className="text-xs text-[#62615F] flex items-center gap-1 mt-1">
                            <MaterialIcon name="email" className="text-[14px]" />
                            {student.email}
                          </p>
                          <p className="text-xs text-[#62615F] flex items-center gap-1">
                            <MaterialIcon name="phone" className="text-[14px]" />
                            {student.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {student.courses.map((course) => (
                            <span key={course} className="px-2 py-1 bg-[#F6F2E6] rounded text-xs font-bold text-[#3A3937]">
                              {course}
                            </span>
                          ))}
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
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 bg-[#F6F2E6] rounded-lg hover:bg-[#BB8E2C] hover:text-white transition-all">
                            <MaterialIcon name="visibility" className="text-[20px]" />
                          </button>
                          <button className="p-2 bg-[#F6F2E6] rounded-lg hover:bg-[#BB8E2C] hover:text-white transition-all">
                            <MaterialIcon name="email" className="text-[20px]" />
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

      
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFD3]">
              <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                <MaterialIcon name="notifications" className="text-[28px] text-[#BB8E2C]" />
                إرسال إشعار
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">عنوان الإشعار</label>
                <input
                  type="text"
                  placeholder="مثال: تذكير بموعد الواجب"
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">الرسالة</label>
                <textarea
                  rows={6}
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                  إرسال
                </button>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AssistantLayout>
  );
}
