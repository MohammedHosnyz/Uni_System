'use client';

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

export default function StaffDashboard() {
  const stats = [
    { icon: 'groups', title: 'إجمالي الطلاب', value: '1,245', subtitle: 'طالب نشط', color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { icon: 'how_to_reg', title: 'طلبات التسجيل', value: '23', subtitle: 'قيد المراجعة', color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { icon: 'calendar_month', title: 'الجداول', value: '45', subtitle: 'جدول دراسي', color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { icon: 'payments', title: 'المدفوعات', value: '156', subtitle: 'معاملة اليوم', color: 'text-green-600 bg-green-50 border-green-100' },
  ];

  const recentActivities = [
    { type: 'registration', title: 'طلب تسجيل جديد', student: 'أحمد محمد علي', time: 'منذ 5 دقائق', status: 'pending' },
    { type: 'payment', title: 'دفعة جديدة', student: 'فاطمة حسن', time: 'منذ 15 دقيقة', status: 'completed' },
    { type: 'inquiry', title: 'استفسار جديد', student: 'محمود سعيد', time: 'منذ 30 دقيقة', status: 'pending' },
    { type: 'document', title: 'طلب شهادة', student: 'سارة أحمد', time: 'منذ ساعة', status: 'processing' },
  ];

  const pendingTasks = [
    { title: 'مراجعة طلبات التسجيل', count: 23, priority: 'high' },
    { title: 'إصدار الشهادات', count: 12, priority: 'medium' },
    { title: 'الرد على الاستفسارات', count: 8, priority: 'high' },
    { title: 'تحديث الجداول', count: 5, priority: 'low' },
  ];

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Welcome Banner */}
          <div className="bg-[#1C1917] text-white rounded-2xl p-8 mb-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">مرحباً، أ. أحمد محمد</h1>
              <p className="text-sm sm:text-base text-stone-300">لديك 23 طلب قيد المراجعة و 8 استفسارات جديدة</p>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1C1917] flex items-center gap-2">
                  <MaterialIcon name="history" className="text-[22px] text-[#FABA19]" />
                  النشاطات الأخيرة
                </h2>
              </div>

              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-50/50 rounded-xl border border-stone-100 hover:bg-stone-50 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <MaterialIcon
                            name={
                              activity.type === 'registration'
                                ? 'how_to_reg'
                                : activity.type === 'payment'
                                ? 'payments'
                                : activity.type === 'inquiry'
                                ? 'contact_support'
                                : 'description'
                            }
                            className="text-[18px] text-[#FABA19]"
                          />
                          <h3 className="font-bold text-[#1C1917] text-sm">{activity.title}</h3>
                        </div>
                        <p className="text-xs text-stone-500 mb-1 font-medium">{activity.student}</p>
                        <p className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                          <MaterialIcon name="schedule" className="text-[14px]" />
                          {activity.time}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          activity.status === 'completed'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : activity.status === 'processing'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}
                      >
                        {activity.status === 'completed'
                          ? 'مكتمل'
                          : activity.status === 'processing'
                          ? 'قيد المعالجة'
                          : 'جديد'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1C1917] flex items-center gap-2">
                  <MaterialIcon name="task_alt" className="text-[22px] text-[#FABA19]" />
                  المهام المعلقة
                </h2>
              </div>

              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-50/50 rounded-xl border border-stone-100 hover:bg-stone-50 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#1C1917] text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-stone-500 font-medium">{task.count} عنصر</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            task.priority === 'high'
                              ? 'bg-red-50 text-red-700 border border-red-100'
                              : task.priority === 'medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-green-50 text-green-700 border border-green-100'
                          }`}
                        >
                          {task.priority === 'high' ? 'عاجل' : task.priority === 'medium' ? 'متوسط' : 'عادي'}
                        </span>
                        <MaterialIcon name="arrow_forward" className="text-[#FABA19]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-stone-200">
            <h2 className="text-lg font-bold text-[#1C1917] mb-6 flex items-center gap-2">
              <MaterialIcon name="bolt" className="text-[22px] text-[#FABA19]" />
              إجراءات سريعة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <QuickActionButton icon="person_add" label="إضافة طالب" />
              <QuickActionButton icon="how_to_reg" label="مراجعة التسجيل" />
              <QuickActionButton icon="calendar_add_on" label="إنشاء جدول" />
              <QuickActionButton icon="description" label="إصدار شهادة" />
              <QuickActionButton icon="campaign" label="إرسال إعلان" />
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${color}`}>
        <MaterialIcon name={icon} className="text-[24px]" />
      </div>
      <h3 className="text-xs font-semibold text-stone-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#1C1917] mb-1">{value}</p>
      <p className="text-xs text-stone-400 font-medium">{subtitle}</p>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#FABA19] hover:bg-amber-50/10 transition-all group flex flex-col items-center justify-center shadow-sm hover:shadow-md">
      <MaterialIcon name={icon} className="text-[28px] text-[#FABA19] mb-2 transition-transform duration-200 group-hover:scale-105" />
      <p className="text-xs font-bold text-stone-700">{label}</p>
    </button>
  );
}
