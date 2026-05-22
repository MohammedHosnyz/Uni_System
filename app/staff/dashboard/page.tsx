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
    { icon: 'groups', title: 'إجمالي الطلاب', value: '1,245', subtitle: 'طالب نشط', color: 'bg-[#BB8E2C]' },
    { icon: 'how_to_reg', title: 'طلبات التسجيل', value: '23', subtitle: 'قيد المراجعة', color: 'bg-[#D6AE45]' },
    { icon: 'calendar_month', title: 'الجداول', value: '45', subtitle: 'جدول دراسي', color: 'bg-[#FCCC03]' },
    { icon: 'payments', title: 'المدفوعات', value: '156', subtitle: 'معاملة اليوم', color: 'bg-[#BB8E2C]' },
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

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] rounded-2xl p-8 mb-8 text-[#121110]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">مرحباً، أ. أحمد محمد</h1>
                <p className="text-lg opacity-90">لديك 23 طلب قيد المراجعة و 8 استفسارات جديدة</p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                  <MaterialIcon name="badge" className="text-[48px]" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="history" className="text-[28px] text-[#BB8E2C]" />
                  النشاطات الأخيرة
                </h2>
              </div>

              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
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
                            className="text-[18px] text-[#BB8E2C]"
                          />
                          <h3 className="font-bold text-[#121110] text-sm">{activity.title}</h3>
                        </div>
                        <p className="text-xs text-[#62615F] mb-1">{activity.student}</p>
                        <p className="text-xs text-[#62615F] flex items-center gap-1">
                          <MaterialIcon name="schedule" className="text-[14px]" />
                          {activity.time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activity.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : activity.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
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

            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="task_alt" className="text-[28px] text-[#BB8E2C]" />
                  المهام المعلقة
                </h2>
              </div>

              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#121110] text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-[#62615F]">{task.count} عنصر</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {task.priority === 'high' ? 'عاجل' : task.priority === 'medium' ? 'متوسط' : 'عادي'}
                        </span>
                        <MaterialIcon name="arrow_forward" className="text-[#BB8E2C]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
            <h2 className="text-2xl font-bold text-[#121110] mb-6 flex items-center gap-2">
              <MaterialIcon name="bolt" className="text-[28px] text-[#BB8E2C]" />
              إجراءات سريعة
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
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
    <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3] hover:shadow-lg transition-all">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 text-white`}>
        <MaterialIcon name={icon} className="text-[28px]" />
      </div>
      <h3 className="text-sm font-semibold text-[#62615F] mb-1">{title}</h3>
      <p className="text-3xl font-bold text-[#121110] mb-1">{value}</p>
      <p className="text-xs text-[#62615F]">{subtitle}</p>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-white transition-all group">
      <MaterialIcon name={icon} className="text-[32px] text-[#BB8E2C] group-hover:text-white mb-2" />
      <p className="text-sm font-bold text-[#3A3937] group-hover:text-white">{label}</p>
    </button>
  );
}
