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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2 flex items-center gap-3">
              <MaterialIcon name="payments" className="text-[36px] text-[#BB8E2C]" />
              إدارة الدفعات
            </h1>
            <p className="text-[#62615F]">متابعة المدفوعات وإصدار الإيصالات</p>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">إجمالي اليوم</p>
                  <p className="text-3xl font-bold text-[#121110]">156</p>
                  <p className="text-xs text-[#BB8E2C] font-semibold mt-1">3,900,000 جنيه</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="payments" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">قيد الانتظار</p>
                  <p className="text-3xl font-bold text-[#121110]">23</p>
                  <p className="text-xs text-blue-600 font-semibold mt-1">575,000 جنيه</p>
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
                  <p className="text-3xl font-bold text-[#121110]">133</p>
                  <p className="text-xs text-green-600 font-semibold mt-1">3,325,000 جنيه</p>
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
                  <p className="text-3xl font-bold text-[#121110]">1,245</p>
                  <p className="text-xs text-[#BB8E2C] font-semibold mt-1">31,125,000 جنيه</p>
                </div>
                <div className="w-12 h-12 bg-[#D6AE45] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="trending_up" className="text-[28px] text-white" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  الكل ({payments.length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'pending'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  قيد الانتظار (1)
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'completed'
                      ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                      : 'text-[#62615F] hover:bg-[#F6F2E6]'
                  }`}
                >
                  مكتملة (2)
                </button>
              </div>

              <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                <MaterialIcon name="add" />
                تسجيل دفعة جديدة
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F6F2E6]">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">رقم الدفعة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">النوع</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">المبلغ</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">طريقة الدفع</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">التاريخ</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD3]">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#121110]">{payment.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-[#121110]">{payment.studentName}</p>
                          <p className="text-xs text-[#62615F]">{payment.studentId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{payment.type}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#BB8E2C]">
                        {payment.amount.toLocaleString()} جنيه
                      </td>
                      <td className="px-6 py-4 text-sm text-[#3A3937]">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-[#62615F]">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            payment.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {payment.status === 'completed' ? 'مكتملة' : 'قيد الانتظار'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="طباعة إيصال">
                            <MaterialIcon name="print" className="text-[#BB8E2C]" />
                          </button>
                          <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="عرض التفاصيل">
                            <MaterialIcon name="visibility" className="text-blue-600" />
                          </button>
                          {payment.status === 'pending' && (
                            <button className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors" title="تأكيد الدفع">
                              <MaterialIcon name="check_circle" className="text-green-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="p-6 border-t border-[#E8DFD3] flex items-center justify-between">
              <p className="text-sm text-[#62615F]">عرض 1-{filteredPayments.length} من {filteredPayments.length} دفعة</p>
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
