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

export default function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<'attendance' | 'grades' | 'statistics'>('statistics');

  const reportTypes = [
    { id: 'statistics', name: 'إحصائيات الطلاب', icon: 'bar_chart', color: 'bg-[#BB8E2C]' },
    { id: 'attendance', name: 'تقارير الحضور', icon: 'fact_check', color: 'bg-[#D6AE45]' },
    { id: 'grades', name: 'تقارير الدرجات', icon: 'grade', color: 'bg-[#FCCC03]' },
  ];

  const statistics = [
    { label: 'إجمالي الطلاب', value: '1,245', change: '+5%', trend: 'up' },
    { label: 'طلاب نشطون', value: '1,198', change: '+3%', trend: 'up' },
    { label: 'طلاب موقوفون', value: '47', change: '-2%', trend: 'down' },
    { label: 'معدل الحضور', value: '92%', change: '+1%', trend: 'up' },
  ];

  const programStats = [
    { program: 'علوم الحاسب', students: 520, percentage: 42 },
    { program: 'هندسة البرمجيات', students: 425, percentage: 34 },
    { program: 'نظم المعلومات', students: 300, percentage: 24 },
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
              <MaterialIcon name="assessment" className="text-[36px] text-[#BB8E2C]" />
              التقارير والإحصائيات
            </h1>
            <p className="text-[#62615F]">عرض وتحليل البيانات والتقارير</p>
          </div>

          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id as any)}
                className={`p-6 rounded-2xl border-2 transition-all text-right ${
                  selectedReport === report.id
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] border-[#BB8E2C] text-white shadow-lg'
                    : 'bg-white border-[#E8DFD3] hover:border-[#BB8E2C] hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${selectedReport === report.id ? 'bg-white/30' : report.color} rounded-xl flex items-center justify-center`}>
                    <MaterialIcon name={report.icon} className={`text-[32px] ${selectedReport === report.id ? 'text-white' : 'text-white'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${selectedReport === report.id ? 'text-white' : 'text-[#121110]'}`}>
                      {report.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          
          {selectedReport === 'statistics' && (
            <>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {statistics.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
                    <p className="text-sm text-[#62615F] mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#121110] mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <MaterialIcon 
                        name={stat.trend === 'up' ? 'trending_up' : 'trending_down'} 
                        className={`text-[18px] ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                      />
                      <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3] mb-8">
                <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                  <MaterialIcon name="pie_chart" className="text-[#BB8E2C]" />
                  توزيع الطلاب حسب البرنامج
                </h2>

                <div className="space-y-4">
                  {programStats.map((program, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#121110]">{program.program}</span>
                        <span className="text-sm font-bold text-[#BB8E2C]">{program.students} طالب ({program.percentage}%)</span>
                      </div>
                      <div className="w-full bg-[#F6F2E6] rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] h-3 rounded-full transition-all"
                          style={{ width: `${program.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                  <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                    <MaterialIcon name="school" className="text-[#BB8E2C]" />
                    توزيع الطلاب حسب السنة الدراسية
                  </h2>
                  <div className="space-y-3">
                    {[
                      { year: 'السنة الأولى', count: 380 },
                      { year: 'السنة الثانية', count: 340 },
                      { year: 'السنة الثالثة', count: 295 },
                      { year: 'السنة الرابعة', count: 230 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F6F2E6] rounded-lg">
                        <span className="text-sm font-semibold text-[#121110]">{item.year}</span>
                        <span className="text-sm font-bold text-[#BB8E2C]">{item.count} طالب</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                  <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                    <MaterialIcon name="wc" className="text-[#BB8E2C]" />
                    توزيع الطلاب حسب النوع
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#121110]">ذكور</span>
                        <span className="text-sm font-bold text-[#BB8E2C]">745 طالب (60%)</span>
                      </div>
                      <div className="w-full bg-[#F6F2E6] rounded-full h-3">
                        <div className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] h-3 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#121110]">إناث</span>
                        <span className="text-sm font-bold text-[#BB8E2C]">500 طالبة (40%)</span>
                      </div>
                      <div className="w-full bg-[#F6F2E6] rounded-full h-3">
                        <div className="bg-gradient-to-r from-[#D6AE45] to-[#FCCC03] h-3 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          
          {selectedReport === 'attendance' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#121110]">تقرير الحضور والغياب</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                  <MaterialIcon name="download" />
                  تصدير التقرير
                </button>
              </div>

              <div className="text-center py-12">
                <MaterialIcon name="fact_check" className="text-[64px] text-[#E8DFD3] mb-4" />
                <p className="text-[#62615F]">اختر الفترة الزمنية والبرنامج لعرض تقرير الحضور</p>
              </div>
            </div>
          )}

          
          {selectedReport === 'grades' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#121110]">تقرير الدرجات والنتائج</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                  <MaterialIcon name="download" />
                  تصدير التقرير
                </button>
              </div>

              <div className="text-center py-12">
                <MaterialIcon name="grade" className="text-[64px] text-[#E8DFD3] mb-4" />
                <p className="text-[#62615F]">اختر الفصل الدراسي والمقرر لعرض تقرير الدرجات</p>
              </div>
            </div>
          )}

          
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
            <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
              <MaterialIcon name="file_download" className="text-[#BB8E2C]" />
              تصدير التقارير
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-white transition-all group">
                <MaterialIcon name="picture_as_pdf" className="text-[32px] text-red-600 group-hover:text-white mb-2" />
                <p className="text-sm font-bold text-[#3A3937] group-hover:text-white">تصدير PDF</p>
              </button>
              <button className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-white transition-all group">
                <MaterialIcon name="table_chart" className="text-[32px] text-green-600 group-hover:text-white mb-2" />
                <p className="text-sm font-bold text-[#3A3937] group-hover:text-white">تصدير Excel</p>
              </button>
              <button className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-white transition-all group">
                <MaterialIcon name="print" className="text-[32px] text-blue-600 group-hover:text-white mb-2" />
                <p className="text-sm font-bold text-[#3A3937] group-hover:text-white">طباعة</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
