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

export default function RegistrationsManagement() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const registrations = [
    {
      id: 'REG001',
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      courses: ['CS101', 'CS102', 'MATH101'],
      semester: 'الفصل الأول 2024',
      date: '2024-02-10',
      status: 'pending',
    },
    {
      id: 'REG002',
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      courses: ['CS201', 'CS202', 'MATH201'],
      semester: 'الفصل الأول 2024',
      date: '2024-02-10',
      status: 'pending',
    },
    {
      id: 'REG003',
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      courses: ['CS301', 'CS302'],
      semester: 'الفصل الأول 2024',
      date: '2024-02-09',
      status: 'approved',
    },
  ];

  const filteredRegistrations = registrations.filter((reg) => reg.status === activeTab);

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
              <MaterialIcon name="how_to_reg" className="text-[36px] text-[#BB8E2C]" />
              إدارة التسجيل
            </h1>
            <p className="text-[#62615F]">مراجعة والموافقة على طلبات تسجيل المقررات</p>
          </div>

          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">قيد المراجعة</p>
                  <p className="text-3xl font-bold text-[#121110]">23</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="pending" className="text-[28px] text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">تمت الموافقة</p>
                  <p className="text-3xl font-bold text-[#121110]">156</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="check_circle" className="text-[28px] text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">مرفوضة</p>
                  <p className="text-3xl font-bold text-[#121110]">8</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="cancel" className="text-[28px] text-red-600" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="border-b border-[#E8DFD3]">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === 'pending'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  قيد المراجعة (2)
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === 'approved'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  تمت الموافقة (1)
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === 'rejected'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  مرفوضة (0)
                </button>
              </div>
            </div>

            
            <div className="p-6">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-12">
                  <MaterialIcon name="inbox" className="text-[64px] text-[#E8DFD3] mb-4" />
                  <p className="text-[#62615F]">لا توجد طلبات في هذه الفئة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#121110]">{registration.studentName}</h3>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#62615F]">
                              {registration.studentId}
                            </span>
                          </div>
                          <p className="text-sm text-[#62615F] mb-1">
                            <MaterialIcon name="calendar_today" className="text-[14px]" /> {registration.date}
                          </p>
                          <p className="text-sm text-[#62615F]">
                            <MaterialIcon name="school" className="text-[14px]" /> {registration.semester}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {registration.id}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-[#121110] mb-2">المقررات المطلوبة:</p>
                        <div className="flex flex-wrap gap-2">
                          {registration.courses.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 bg-white rounded-lg text-sm font-semibold text-[#BB8E2C] border border-[#E8DFD3]"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {activeTab === 'pending' && (
                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="check_circle" />
                            الموافقة
                          </button>
                          <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="cancel" />
                            الرفض
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                            <MaterialIcon name="visibility" />
                          </button>
                        </div>
                      )}

                      {activeTab === 'approved' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <MaterialIcon name="check_circle" />
                          <span className="text-sm font-semibold">تمت الموافقة على الطلب</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
