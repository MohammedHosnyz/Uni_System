'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Folder, 
  ArrowLeft, 
  Plus, 
  Inbox, 
  Info, 
  Calendar, 
  Check, 
  Printer, 
  Eye, 
  Download 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

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
    { name: 'شهادة قيد', icon: FileText, count: 45 },
    { name: 'إفادة تخرج', icon: FileText, count: 23 },
    { name: 'كشف درجات', icon: FileText, count: 67 },
    { name: 'شهادة حسن سير وسلوك', icon: FileText, count: 12 },
  ];

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <FileText className="h-7 w-7 text-[#D97706]" />
              الوثائق والشهادات
            </h1>
            <p className="text-sm text-stone-500 font-medium">عرض وإصدار وثائق الطلاب والشهادات والإفادات الرسمية</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">طلبات اليوم</p>
                  <p className="text-2xl font-bold text-[#1C1917]">28</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">قيد المعالجة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">12</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">مكتملة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">16</p>
                </div>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">هذا الشهر</p>
                  <p className="text-2xl font-bold text-[#1C1917]">342</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Sidebar Folder list */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 border border-stone-200">
                <h2 className="text-base font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                  <Folder className="h-5 w-5 text-[#D97706]" />
                  أنواع الوثائق
                </h2>

                <div className="space-y-3">
                  {documentTypes.map((doc, index) => {
                    const DocIcon = doc.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center">
                              <DocIcon className="h-4 w-4 text-[#D97706]" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-700">{doc.name}</p>
                              <p className="text-[10px] text-stone-500 font-semibold">{doc.count} طلب</p>
                            </div>
                          </div>
                          <ArrowLeft className="h-4 w-4 text-stone-400 transition-transform group-hover:-translate-x-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full mt-5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">
                  <Plus className="h-4 w-4" />
                  إصدار وثيقة جديدة
                </button>
              </div>
            </div>

            {/* Requests list */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-stone-150 flex items-center justify-between">
                  <div className="flex gap-1.5 p-1 bg-stone-100/80 rounded-xl">
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                        activeTab === 'pending'
                          ? 'bg-white text-[#D97706] shadow-sm'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      قيد المعالجة (2)
                    </button>
                    <button
                      onClick={() => setActiveTab('completed')}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                        activeTab === 'completed'
                          ? 'bg-white text-[#D97706] shadow-sm'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      مكتملة (1)
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <Inbox className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-xs text-stone-500 font-medium">لا توجد طلبات في هذه الفئة</p>
                    </div>
                  ) : (
                    <div className="space-y-4.5">
                      {filteredRequests.map((request) => (
                        <div
                          key={request.id}
                          className="p-5 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3.5 mb-2.5">
                                <h3 className="text-base font-bold text-[#1C1917]">{request.studentName}</h3>
                                <span className="px-2 py-0.5 bg-white rounded-lg text-[10px] font-bold text-stone-500 border border-stone-200">
                                  {request.studentId}
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                <p className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                                  <FileText className="h-3.5 w-3.5 text-stone-400" /> {request.type}
                                </p>
                                <p className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                                  <Info className="h-3.5 w-3.5 text-stone-400" /> الغرض: {request.purpose}
                                </p>
                                <p className="text-xs text-stone-650 font-medium flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-stone-400" /> {request.date}
                                </p>
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                              {request.id}
                            </span>
                          </div>

                          {activeTab === 'pending' && (
                            <div className="flex gap-2">
                              <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                                <Check className="h-4 w-4" />
                                إصدار الوثيقة
                              </button>
                              <button className="flex-1 px-4 py-2 bg-stone-850 hover:bg-stone-900 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                                <Printer className="h-4 w-4" />
                                طباعة
                              </button>
                              <button className="px-3.5 py-2 bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 rounded-xl transition-all" title="معاينة">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {activeTab === 'completed' && (
                            <div className="flex gap-2">
                              <button className="flex-1 px-4 py-2 bg-stone-850 hover:bg-stone-900 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                                <Printer className="h-4 w-4" />
                                إعادة طباعة
                              </button>
                              <button className="flex-1 px-4 py-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">
                                <Download className="h-4 w-4 text-[#D97706]" />
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
