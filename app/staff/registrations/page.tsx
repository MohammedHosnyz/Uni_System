'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Inbox, 
  Calendar, 
  School, 
  Check, 
  X, 
  Eye 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

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
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <UserCheck className="h-7 w-7 text-[#D97706]" />
              إدارة التسجيل
            </h1>
            <p className="text-sm text-stone-500 font-medium">مراجعة والموافقة على طلبات تسجيل المقررات للطلاب</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">قيد المراجعة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">23</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">تمت الموافقة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">156</p>
                </div>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">مرفوضة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">8</p>
                </div>
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            
            {/* Tabs bar */}
            <div className="border-b border-stone-150">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'pending'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  قيد المراجعة (2)
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'approved'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  تمت الموافقة (1)
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'rejected'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  مرفوضة (0)
                </button>
              </div>
            </div>

            <div className="p-6">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-sm text-stone-500 font-medium">لا توجد طلبات في هذه الفئة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="p-5 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-bold text-[#1C1917]">{registration.studentName}</h3>
                            <span className="px-2.5 py-0.5 bg-white rounded-lg text-xs font-semibold text-stone-500 border border-stone-200">
                              {registration.studentId}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-[#D97706]" /> {registration.date}
                            </p>
                            <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                              <School className="h-3.5 w-3.5 text-[#D97706]" /> {registration.semester}
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 bg-amber-50 text-[#D97706] rounded-lg text-xs font-bold border border-amber-100">
                          {registration.id}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-bold text-stone-600 mb-2">المقررات المطلوبة:</p>
                        <div className="flex flex-wrap gap-2">
                          {registration.courses.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-stone-600 border border-stone-200"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {activeTab === 'pending' && (
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                            <Check className="h-4 w-4" />
                            الموافقة
                          </button>
                          <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                            <X className="h-4 w-4" />
                            الرفض
                          </button>
                          <button className="px-3 py-2 bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-700 rounded-xl transition-all" title="تفاصيل">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {activeTab === 'approved' && (
                        <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50/50 p-2.5 rounded-xl border border-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span>تمت الموافقة على الطلب</span>
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
