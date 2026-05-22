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

export default function InquiriesManagement() {
  const [activeTab, setActiveTab] = useState<'new' | 'inProgress' | 'resolved'>('new');

  const inquiries = [
    {
      id: 'INQ001',
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      subject: 'استفسار عن التسجيل',
      message: 'أريد معرفة موعد فتح التسجيل للفصل الدراسي القادم',
      date: '2024-02-10 10:30',
      status: 'new',
      priority: 'normal',
    },
    {
      id: 'INQ002',
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      subject: 'مشكلة في الدفع',
      message: 'لم يتم تسجيل الدفعة التي قمت بها أمس',
      date: '2024-02-10 09:15',
      status: 'inProgress',
      priority: 'high',
    },
    {
      id: 'INQ003',
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      subject: 'طلب شهادة',
      message: 'كيف يمكنني الحصول على شهادة قيد؟',
      date: '2024-02-09 14:20',
      status: 'resolved',
      priority: 'normal',
    },
  ];

  const filteredInquiries = inquiries.filter((inq) => inq.status === activeTab);

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
              <MaterialIcon name="contact_support" className="text-[36px] text-[#BB8E2C]" />
              إدارة الاستفسارات
            </h1>
            <p className="text-[#62615F]">الرد على استفسارات الطلاب وإدارة الطلبات</p>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">استفسارات جديدة</p>
                  <p className="text-3xl font-bold text-[#121110]">8</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="mark_email_unread" className="text-[28px] text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">قيد المعالجة</p>
                  <p className="text-3xl font-bold text-[#121110]">12</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="pending" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">تم الحل</p>
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
                  <p className="text-sm text-[#62615F] mb-1">متوسط وقت الرد</p>
                  <p className="text-3xl font-bold text-[#121110]">2.5</p>
                  <p className="text-xs text-[#62615F]">ساعة</p>
                </div>
                <div className="w-12 h-12 bg-[#D6AE45] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="schedule" className="text-[28px] text-white" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="p-6 border-b border-[#E8DFD3]">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'new'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  جديدة (1)
                </button>
                <button
                  onClick={() => setActiveTab('inProgress')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'inProgress'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  قيد المعالجة (1)
                </button>
                <button
                  onClick={() => setActiveTab('resolved')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'resolved'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  تم الحل (1)
                </button>
              </div>
            </div>

            <div className="p-6">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-12">
                  <MaterialIcon name="inbox" className="text-[64px] text-[#E8DFD3] mb-4" />
                  <p className="text-[#62615F]">لا توجد استفسارات في هذه الفئة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#121110]">{inquiry.studentName}</h3>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#62615F]">
                              {inquiry.studentId}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                inquiry.priority === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {inquiry.priority === 'high' ? 'عاجل' : 'عادي'}
                            </span>
                          </div>
                          <h4 className="text-md font-semibold text-[#121110] mb-2">{inquiry.subject}</h4>
                          <p className="text-sm text-[#62615F] mb-3">{inquiry.message}</p>
                          <p className="text-xs text-[#62615F] flex items-center gap-1">
                            <MaterialIcon name="schedule" className="text-[14px]" />
                            {inquiry.date}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {inquiry.id}
                        </span>
                      </div>

                      {activeTab === 'new' && (
                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="reply" />
                            الرد على الاستفسار
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="forward" />
                            تحويل لقسم آخر
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                            <MaterialIcon name="visibility" />
                          </button>
                        </div>
                      )}

                      {activeTab === 'inProgress' && (
                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="check_circle" />
                            تم الحل
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                            <MaterialIcon name="reply" />
                            إضافة رد
                          </button>
                        </div>
                      )}

                      {activeTab === 'resolved' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <MaterialIcon name="check_circle" />
                          <span className="text-sm font-semibold">تم حل الاستفسار</span>
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
