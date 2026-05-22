'use client';

import { Cairo } from 'next/font/google';
import AssistantLayout from '@/components/AssistantLayout';

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

export default function AssistantDashboard() {
  const courses = [
    { code: 'CS101', name: 'مقدمة في البرمجة', students: 45, section: 'سكشن 1' },
    { code: 'CS201', name: 'هياكل البيانات', students: 38, section: 'سكشن 2' },
    { code: 'CS301', name: 'قواعد البيانات', students: 42, section: 'معمل 1' },
  ];

  const upcomingTasks = [
    { title: 'تصحيح واجب CS101', date: '2024-02-15', type: 'assignment', priority: 'high' },
    { title: 'سكشن CS201', date: '2024-02-14', type: 'session', priority: 'medium' },
    { title: 'رفع درجات الكويز', date: '2024-02-16', type: 'grades', priority: 'high' },
    { title: 'معمل CS301', date: '2024-02-14', type: 'lab', priority: 'low' },
  ];

  return (
    <AssistantLayout userName="أ. محمد أحمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-2xl p-8 mb-8 text-[#121110]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">مرحباً، أ. محمد أحمد</h1>
                <p className="text-lg opacity-90">لديك 3 مقررات و 4 مهام قادمة هذا الأسبوع</p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                  <MaterialIcon name="person" className="text-[48px]" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon="menu_book"
              title="المقررات"
              value="3"
              subtitle="مقررات نشطة"
              color="bg-[#BB8E2C]"
            />
            <StatCard
              icon="groups"
              title="الطلاب"
              value="125"
              subtitle="إجمالي الطلاب"
              color="bg-[#D6AE45]"
            />
            <StatCard
              icon="assignment"
              title="الواجبات"
              value="8"
              subtitle="قيد التصحيح"
              color="bg-[#FCCC03]"
            />
            <StatCard
              icon="event"
              title="المهام"
              value="4"
              subtitle="هذا الأسبوع"
              color="bg-[#BB8E2C]"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="menu_book" className="text-[28px] text-[#BB8E2C]" />
                  المقررات المسندة
                </h2>
              </div>

              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#121110]">{course.code}</h3>
                        <p className="text-sm text-[#3A3937]">{course.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#BB8E2C]">{course.section}</p>
                        <p className="text-xs text-[#62615F]">{course.students} طالب</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-3 py-2 bg-white border border-[#E8DFD3] rounded-lg text-xs font-bold text-[#3A3937] hover:bg-[#F6F2E6] transition-colors">
                        عرض التفاصيل
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] rounded-lg text-xs font-bold text-[#121110] hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                        تسجيل الحضور
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="task_alt" className="text-[28px] text-[#BB8E2C]" />
                  المهام القادمة
                </h2>
              </div>

              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MaterialIcon
                            name={
                              task.type === 'assignment'
                                ? 'assignment'
                                : task.type === 'session'
                                ? 'school'
                                : task.type === 'lab'
                                ? 'science'
                                : 'grade'
                            }
                            className="text-[18px] text-[#BB8E2C]"
                          />
                          <h3 className="font-bold text-[#121110] text-sm">{task.title}</h3>
                        </div>
                        <p className="text-xs text-[#62615F] flex items-center gap-1">
                          <MaterialIcon name="calendar_today" className="text-[14px]" />
                          {task.date}
                        </p>
                      </div>
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
            <div className="grid md:grid-cols-4 gap-4">
              <QuickActionButton icon="how_to_reg" label="تسجيل حضور" />
              <QuickActionButton icon="assignment" label="إنشاء واجب" />
              <QuickActionButton icon="grade" label="إدخال درجات" />
              <QuickActionButton icon="campaign" label="إرسال إعلان" />
            </div>
          </div>
        </div>
      </div>
    </AssistantLayout>
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
    <button className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-[#121110] transition-all group">
      <MaterialIcon name={icon} className="text-[32px] text-[#BB8E2C] group-hover:text-[#121110] mb-2" />
      <p className="text-sm font-bold text-[#3A3937] group-hover:text-[#121110]">{label}</p>
    </button>
  );
}
