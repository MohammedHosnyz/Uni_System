'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  GraduationCap, 
  Download, 
  FileSpreadsheet, 
  Printer, 
  PieChart, 
  School, 
  Users 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<'attendance' | 'grades' | 'statistics'>('statistics');

  const reportTypes = [
    { id: 'statistics', name: 'إحصائيات الطلاب', icon: BarChart3 },
    { id: 'attendance', name: 'تقارير الحضور', icon: Calendar },
    { id: 'grades', name: 'تقارير الدرجات', icon: GraduationCap },
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
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-[#D97706]" />
              التقارير والإحصائيات
            </h1>
            <p className="text-sm text-stone-500 font-medium">عرض وتحليل تقارير الأداء الأكاديمي وإحصائيات الطلاب</p>
          </div>

          {/* Report Selector Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReport === report.id;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id as any)}
                  className={`p-5 rounded-2xl border transition-all text-right flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                      : 'bg-white border-stone-200 hover:border-[#FABA19] hover:shadow-sm'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isSelected ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-[#FABA19]' : 'text-[#D97706]'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{report.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats content */}
          {selectedReport === 'statistics' && (
            <>
              {/* Numerical stats grid */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {statistics.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 border border-stone-200">
                    <p className="text-xs font-bold text-stone-500 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#1C1917] mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                      )}
                      <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-700' : 'text-red-700'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bars / Program Stats */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 mb-6">
                <h2 className="text-base font-bold text-[#1C1917] mb-6 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#D97706]" />
                  توزيع الطلاب حسب البرنامج
                </h2>

                <div className="space-y-5">
                  {programStats.map((program, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#1C1917]">{program.program}</span>
                        <span className="text-xs font-bold text-stone-500">{program.students} طالب ({program.percentage}%)</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2">
                        <div
                          className="bg-[#FABA19] h-2 rounded-full transition-all"
                          style={{ width: `${program.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender and Year charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h2 className="text-base font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                    <School className="h-5 w-5 text-[#D97706]" />
                    توزيع الطلاب حسب السنة الدراسية
                  </h2>
                  <div className="space-y-3">
                    {[
                      { year: 'السنة الأولى', count: 380 },
                      { year: 'السنة الثانية', count: 340 },
                      { year: 'السنة الثالثة', count: 295 },
                      { year: 'السنة الرابعة', count: 230 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl">
                        <span className="text-sm font-semibold text-[#1C1917]">{item.year}</span>
                        <span className="text-xs font-bold text-stone-600">{item.count} طالب</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h2 className="text-base font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#D97706]" />
                    توزيع الطلاب حسب النوع
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#1C1917]">ذكور</span>
                        <span className="text-xs font-bold text-stone-500">745 طالب (60%)</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2">
                        <div className="bg-[#FABA19] h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#1C1917]">إناث</span>
                        <span className="text-xs font-bold text-stone-500">500 طالبة (40%)</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2">
                        <div className="bg-[#e5a816] h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedReport === 'attendance' && (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center">
              <Calendar className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h2 className="text-base font-bold text-[#1C1917] mb-2">تقرير الحضور والغياب</h2>
              <p className="text-sm text-stone-500 max-w-md mx-auto mb-5 font-medium">اختر الفترة الزمنية والبرنامج لعرض وتصدير تقرير الحضور</p>
              <button className="px-4 py-2 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 mx-auto">
                <Download className="h-4 w-4" />
                تصدير التقرير
              </button>
            </div>
          )}

          {selectedReport === 'grades' && (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center">
              <GraduationCap className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h2 className="text-base font-bold text-[#1C1917] mb-2">تقرير الدرجات والنتائج</h2>
              <p className="text-sm text-stone-500 max-w-md mx-auto mb-5 font-medium">اختر الفصل الدراسي والمقرر لعرض وتصدير تقرير الدرجات والتقديرات</p>
              <button className="px-4 py-2 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 mx-auto">
                <Download className="h-4 w-4" />
                تصدير التقرير
              </button>
            </div>
          )}

          {/* Export Action Card */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="text-base font-bold text-[#1C1917] mb-5 flex items-center gap-2">
              <Download className="h-5 w-5 text-[#D97706]" />
              تصدير التقارير العامة
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="p-4 bg-stone-50 border border-stone-200 hover:border-[#FABA19] rounded-xl transition-all flex flex-col items-center justify-center group">
                <Download className="h-8 w-8 text-red-500 mb-2 transition-transform duration-200 group-hover:scale-105" />
                <p className="text-xs font-bold text-stone-700">تصدير PDF</p>
              </button>
              <button className="p-4 bg-stone-50 border border-stone-200 hover:border-[#FABA19] rounded-xl transition-all flex flex-col items-center justify-center group">
                <FileSpreadsheet className="h-8 w-8 text-green-600 mb-2 transition-transform duration-200 group-hover:scale-105" />
                <p className="text-xs font-bold text-stone-700">تصدير Excel</p>
              </button>
              <button className="p-4 bg-stone-50 border border-stone-200 hover:border-[#FABA19] rounded-xl transition-all flex flex-col items-center justify-center group">
                <Printer className="h-8 w-8 text-blue-600 mb-2 transition-transform duration-200 group-hover:scale-105" />
                <p className="text-xs font-bold text-stone-700">طباعة</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
