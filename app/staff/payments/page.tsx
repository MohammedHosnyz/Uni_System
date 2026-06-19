'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Printer, 
  Eye, 
  Check, 
  Search 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function PaymentsManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const payments = [
    {
      id: 'PAY001',
      studentId: '2024001',
      studentName: 'أحمد محمد علي',
      amount: 25000,
      type: 'رسوم دراسية',
      semester: 'الفصل الأول 2024',
      date: '2024-02-10',
      status: 'completed',
      method: 'بطاقة ائتمان',
    },
    {
      id: 'PAY002',
      studentId: '2024002',
      studentName: 'فاطمة حسن محمود',
      amount: 15000,
      type: 'رسوم معامل',
      semester: 'الفصل الأول 2024',
      date: '2024-02-10',
      status: 'pending',
      method: 'تحويل بنكي',
    },
    {
      id: 'PAY003',
      studentId: '2024003',
      studentName: 'محمود سعيد أحمد',
      amount: 25000,
      type: 'رسوم دراسية',
      semester: 'الفصل الأول 2024',
      date: '2024-02-09',
      status: 'completed',
      method: 'نقدي',
    },
  ];

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter((p) => p.status === activeTab);

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
                <CreditCard className="h-7 w-7 text-[#D97706]" />
                إدارة الدفعات والرسوم
              </h1>
              <p className="text-sm text-stone-500 font-medium">متابعة المدفوعات والرسوم الدراسية وإصدار الإيصالات الرسمية</p>
            </div>
            <button className="self-start sm:self-center px-4 py-2 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
              <Plus className="h-4 w-4" />
              تسجيل دفعة جديدة
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">إجمالي اليوم</p>
                  <p className="text-2xl font-bold text-[#1C1917]">156</p>
                  <p className="text-xs text-[#D97706] font-bold mt-1">3,900,000 ج.م</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">قيد الانتظار</p>
                  <p className="text-2xl font-bold text-[#1C1917]">23</p>
                  <p className="text-xs text-blue-600 font-bold mt-1">575,000 ج.م</p>
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
                  <p className="text-2xl font-bold text-[#1C1917]">133</p>
                  <p className="text-xs text-green-600 font-bold mt-1">3,325,000 ج.م</p>
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
                  <p className="text-2xl font-bold text-[#1C1917]">1,245</p>
                  <p className="text-xs text-[#D97706] font-bold mt-1">31,125,000 ج.م</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>
          </div>

          {/* List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            
            {/* Tabs & Top bar */}
            <div className="p-5 border-b border-stone-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-1.5 p-1 bg-stone-100/80 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'all'
                      ? 'bg-white text-[#D97706] shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  الكل ({payments.length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'pending'
                      ? 'bg-white text-[#D97706] shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  قيد الانتظار (1)
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'completed'
                      ? 'bg-white text-[#D97706] shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  مكتملة (2)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50/70 border-b border-stone-150">
                  <tr>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">رقم الدفعة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الطالب</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">النوع</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">المبلغ</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">طريقة الدفع</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">التاريخ</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3.5 text-right text-xs font-bold text-stone-600 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-stone-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#1C1917]">{payment.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-[#1C1917]">{payment.studentName}</p>
                          <p className="text-xs text-stone-500 font-medium">{payment.studentId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{payment.type}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#D97706]">
                        {payment.amount.toLocaleString()} ج.م
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700 font-medium">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-stone-500 font-medium">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            payment.status === 'completed'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}
                        >
                          {payment.status === 'completed' ? 'مكتملة' : 'قيد الانتظار'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-[#D97706] transition-colors" title="طباعة إيصال">
                            <Printer className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-blue-600 transition-colors" title="عرض التفاصيل">
                            <Eye className="h-4 w-4" />
                          </button>
                          {payment.status === 'pending' && (
                            <button className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-green-600 transition-colors" title="تأكيد الدفع">
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination / Total count summary */}
            <div className="px-6 py-4 border-t border-stone-150 flex items-center justify-between">
              <p className="text-xs text-stone-500 font-medium">عرض 1-{filteredPayments.length} من {filteredPayments.length} دفعة</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-50 transition-colors">
                  السابق
                </button>
                <button className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-50 transition-colors">
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
