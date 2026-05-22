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

export default function DocumentsManagement() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const documentRequests = [
    {
      id: 'DOC001',
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      type: 'شهادة قيد',
      purpose: 'للبنك',
      date: '2024-02-10',
      status: 'pending',
    },
    {
      id: 'DOC002',
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      type: 'إفادة تخرج',
      purpose: 'للتوظيف',
      date: '2024-02-10',
      status: 'pending',
    },
    {
      id: 'DOC003',
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      type: 'كشف درجات',
      purpose: 'للمنحة',
      date: '2024-02-09',
      status: 'completed',
    },
  ];

  const filteredRequests = documentRequests.filter((req) => req.status === activeTab);

  const documentTypes = [
    { name: 'شهادة قيد', icon: 'badge', count: 45 },
    { name: 'إفادة تخرج', icon: 'school', count: 23 },
    { name: 'كشف درجات', icon: 'grade', count: 67 },
    { name: 'شهادة حسن سير وسلوك', icon: 'verified', count: 12 },
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
              <MaterialIcon name="description" className="text-[36px] text-[#BB8E2C]" />
              الوثائق والشهادات
            </h1>
            <p className="text-[#62615F]">إصدار وطباعة الوثائق الرسمية</p>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">طلبات اليوم</p>
                  <p className="text-3xl font-bold text-[#121110]">28</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="description" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">قيد المعالجة</p>
                  <p className="text-3xl font-bold text-[#121110]">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="pending" className="text-[28px] text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">مكتملة</p>
                  <p className="text-3xl font-bold text-[#121110]">16</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="check_circle" className="text-[28px] text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">هذا الشهر</p>
                  <p className="text-3xl font-bold text-[#121110]">342</p>
                </div>
                <div className="w-12 h-12 bg-[#D6AE45] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="trending_up" className="text-[28px] text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                  <MaterialIcon name="folder" className="text-[#BB8E2C]" />
                  أنواع الوثائق
                </h2>

                <div className="space-y-3">
                  {documentTypes.map((doc, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg flex items-center justify-center">
                            <MaterialIcon name={doc.icon} className="text-white text-[20px]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#121110]">{doc.name}</p>
                            <p className="text-xs text-[#62615F]">{doc.count} طلب</p>
                          </div>
                        </div>
                        <MaterialIcon name="arrow_forward" className="text-[#BB8E2C]" />
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center justify-center gap-2">
                  <MaterialIcon name="add" />
                  إصدار وثيقة جديدة
                </button>
              </div>
            </div>

            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        activeTab === 'pending'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                          : 'text-[#62615F] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      قيد المعالجة (2)
                    </button>
                    <button
                      onClick={() => setActiveTab('completed')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        activeTab === 'completed'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                          : 'text-[#62615F] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      مكتملة (1)
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <MaterialIcon name="inbox" className="text-[64px] text-[#E8DFD3] mb-4" />
                      <p className="text-[#62615F]">لا توجد طلبات في هذه الفئة</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRequests.map((request) => (
                        <div
                          key={request.id}
                          className="p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-[#121110]">{request.studentName}</h3>
                                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#62615F]">
                                  {request.studentId}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-[#62615F]">
                                  <MaterialIcon name="description" className="text-[14px]" /> {request.type}
                                </p>
                                <p className="text-sm text-[#62615F]">
                                  <MaterialIcon name="info" className="text-[14px]" /> الغرض: {request.purpose}
                                </p>
                                <p className="text-sm text-[#62615F]">
                                  <MaterialIcon name="calendar_today" className="text-[14px]" /> {request.date}
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                              {request.id}
                            </span>
                          </div>

                          {activeTab === 'pending' && (
                            <div className="flex gap-3">
                              <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                <MaterialIcon name="check_circle" />
                                إصدار الوثيقة
                              </button>
                              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                <MaterialIcon name="print" />
                                طباعة
                              </button>
                              <button className="px-4 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                                <MaterialIcon name="visibility" />
                              </button>
                            </div>
                          )}

                          {activeTab === 'completed' && (
                            <div className="flex gap-3">
                              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                <MaterialIcon name="print" />
                                إعادة طباعة
                              </button>
                              <button className="flex-1 px-4 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all flex items-center justify-center gap-2">
                                <MaterialIcon name="download" />
                                تحميل PDF
                              </button>
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
        </div>
      </div>
    </StaffLayout>
  );
}
