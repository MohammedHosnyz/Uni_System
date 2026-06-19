'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  HelpCircle, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Inbox, 
  CornerDownLeft, 
  Forward, 
  Eye, 
  Check, 
  MessageSquare 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function InquiriesManagement() {
  const [activeTab, setActiveTab] = useState<'new' | 'inProgress' | 'resolved'>('new');

  const inquiries = [
    {
      id: 'INQ001',
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      subject: 'استفسار عن التسجيل',
      message: 'أريد معرفة موعد فتح التسجيل للفصل الدراسي القادم وكيفية سداد الرسوم عبر الموقع',
      date: '2024-02-10 10:30',
      status: 'new',
      priority: 'normal',
    },
    {
      id: 'INQ002',
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      subject: 'مشكلة في الدفع',
      message: 'لم يتم تسجيل الدفعة التي قمت بها أمس عبر فوري في حسابي حتى الآن',
      date: '2024-02-10 09:15',
      status: 'inProgress',
      priority: 'high',
    },
    {
      id: 'INQ003',
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      subject: 'طلب شهادة',
      message: 'كيف يمكنني الحصول على شهادة قيد باللغة الإنجليزية للتقديم على المنحة؟',
      date: '2024-02-09 14:20',
      status: 'resolved',
      priority: 'normal',
    },
  ];

  const filteredInquiries = inquiries.filter((inq) => inq.status === activeTab);

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <HelpCircle className="h-7 w-7 text-[#D97706]" />
              إدارة الاستفسارات والطلبات
            </h1>
            <p className="text-sm text-stone-500 font-medium">متابعة استفسارات الطلاب الأكاديمية والتقنية والرد عليها</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">استفسارات جديدة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">8</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">قيد المعالجة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">12</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">تم الحل</p>
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
                  <p className="text-xs text-stone-500 font-bold mb-1">متوسط وقت الرد</p>
                  <p className="text-2xl font-bold text-[#1C1917]">2.5</p>
                  <p className="text-[10px] text-stone-400 font-bold">ساعة</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>
          </div>

          {/* List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            
            {/* Tab Bar */}
            <div className="border-b border-stone-150">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'new'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  جديدة (1)
                </button>
                <button
                  onClick={() => setActiveTab('inProgress')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'inProgress'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  قيد المعالجة (1)
                </button>
                <button
                  onClick={() => setActiveTab('resolved')}
                  className={`flex-1 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                    activeTab === 'resolved'
                      ? 'border-[#FABA19] text-[#D97706] bg-amber-50/10'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/50'
                  }`}
                >
                  تم الحل (1)
                </button>
              </div>
            </div>

            <div className="p-5">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 font-medium">لا توجد استفسارات في هذه الفئة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-5 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                            <h3 className="text-base font-bold text-[#1C1917]">{inquiry.studentName}</h3>
                            <span className="px-2 py-0.5 bg-white rounded-lg text-[10px] font-bold text-stone-500 border border-stone-200">
                              {inquiry.studentId}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                inquiry.priority === 'high'
                                  ? 'bg-red-50 text-red-700 border border-red-100'
                                  : 'bg-blue-50 text-blue-700 border border-blue-100'
                              }`}
                            >
                              {inquiry.priority === 'high' ? 'عاجل' : 'عادي'}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-stone-700 mb-1.5">{inquiry.subject}</h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-medium mb-3">{inquiry.message}</p>
                          
                          <p className="text-[11px] text-stone-500 font-semibold flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-stone-400" />
                            {inquiry.date}
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-755 rounded-lg text-xs font-bold border border-blue-100">
                          {inquiry.id}
                        </span>
                      </div>

                      {activeTab === 'new' && (
                        <div className="flex gap-2 pt-3 border-t border-stone-150/60">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                            <CornerDownLeft className="h-4 w-4" />
                            الرد على الاستفسار
                          </button>
                          <button className="flex-1 px-4 py-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">
                            <Forward className="h-4 w-4 text-stone-400" />
                            تحويل لقسم آخر
                          </button>
                          <button className="px-3 py-2 bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 rounded-xl transition-all" title="تفاصيل">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {activeTab === 'inProgress' && (
                        <div className="flex gap-2 pt-3 border-t border-stone-150/60">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                            <Check className="h-4 w-4" />
                            تم الحل
                          </button>
                          <button className="flex-1 px-4 py-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">
                            <MessageSquare className="h-4 w-4 text-[#D97706]" />
                            إضافة رد
                          </button>
                        </div>
                      )}

                      {activeTab === 'resolved' && (
                        <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50/50 p-2.5 rounded-xl border border-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span>تم حل الاستفسار</span>
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
