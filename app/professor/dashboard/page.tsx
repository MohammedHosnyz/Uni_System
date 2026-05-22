'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { SessionUser, StatCardProps } from '../../../types';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  href: string;
}

interface CourseCardProps {
  code: string;
  name: string;
  students: number;
  level: string;
  pendingGrades: number;
}

interface ScheduleItemProps {
  time: string;
  course: string;
  room: string;
  type: string;
}

interface TaskItemProps {
  icon: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

export default function ProfessorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [stats] = useState({
    totalCourses: 4,
    totalStudents: 320,
    pendingGrades: 45,
    officeHours: '10:00 - 12:00',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'professor' && parsedUser.role !== 'assistant') {
      router.push('/login');
      return;
    }
    
    Promise.resolve().then(() => setUser(parsedUser));
  }, [router]);

  if (!user) return null;

  return (
    <DashboardLayout user={user} role="professor">
      <div className="space-y-6">
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">مرحباً، د. {user.firstName} {user.lastName}</h1>
          <p className="text-purple-100">عضو هيئة التدريس - جامعة أسيوط الأهلية</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="المواد التي أدرسها"
            value={stats.totalCourses}
            icon="📚"
            color="blue"
          />
          <StatCard
            title="إجمالي الطلاب"
            value={stats.totalStudents}
            icon="🎓"
            color="green"
          />
          <StatCard
            title="درجات معلقة"
            value={stats.pendingGrades}
            icon="📝"
            color="amber"
          />
          <StatCard
            title="الساعات المكتبية"
            value={stats.officeHours}
            icon="🕐"
            color="purple"
          />
        </div>

        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">الإجراءات السريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton icon="📝" label="إدخال الدرجات" href="/professor/grades" />
            <QuickActionButton icon="📊" label="تقارير الطلاب" href="/professor/reports" />
            <QuickActionButton icon="📅" label="جدولي" href="/professor/schedule" />
            <QuickActionButton icon="📢" label="الإعلانات" href="/professor/announcements" />
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">المواد التي أدرسها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseCard
              code="CS101"
              name="مقدمة في البرمجة"
              students={85}
              level="المستوى الأول"
              pendingGrades={15}
            />
            <CourseCard
              code="CS201"
              name="قواعد البيانات"
              students={72}
              level="المستوى الثاني"
              pendingGrades={20}
            />
            <CourseCard
              code="CS301"
              name="الذكاء الاصطناعي"
              students={58}
              level="المستوى الثالث"
              pendingGrades={10}
            />
            <CourseCard
              code="CS401"
              name="مشروع التخرج"
              students={25}
              level="المستوى الرابع"
              pendingGrades={0}
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">جدول اليوم</h3>
            <div className="space-y-3">
              <ScheduleItem
                time="8:00 - 10:00"
                course="CS101 - مقدمة في البرمجة"
                room="قاعة A101"
                type="محاضرة"
              />
              <ScheduleItem
                time="10:00 - 12:00"
                course="ساعات مكتبية"
                room="مكتب 305"
                type="ساعات مكتبية"
              />
              <ScheduleItem
                time="2:00 - 4:00"
                course="CS201 - قواعد البيانات"
                room="معمل B201"
                type="معمل"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">المهام المعلقة</h3>
            <div className="space-y-3">
              <TaskItem
                icon="📝"
                text="إدخال درجات CS101 - الامتحان النصفي"
                priority="high"
                deadline="غداً"
              />
              <TaskItem
                icon="📊"
                text="مراجعة مشاريع CS401"
                priority="medium"
                deadline="خلال 3 أيام"
              />
              <TaskItem
                icon="📢"
                text="نشر إعلان عن موعد الامتحان"
                priority="low"
                deadline="خلال أسبوع"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">الأنشطة الأخيرة</h3>
          <div className="space-y-3">
            <ActivityItem
              icon="✅"
              text="تم رفع درجات CS301 - الامتحان النهائي"
              time="منذ ساعتين"
            />
            <ActivityItem
              icon="📢"
              text="تم نشر إعلان جديد في CS201"
              time="منذ 5 ساعات"
            />
            <ActivityItem
              icon="📝"
              text="تم تحديث محتوى المحاضرة الخامسة"
              time="منذ يوم"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-slate-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function QuickActionButton({ icon, label }: QuickActionButtonProps) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
      <span className="text-3xl">{icon}</span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </button>
  );
}

function CourseCard({ code, name, students, level, pendingGrades }: CourseCardProps) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-slate-900">{code}</h4>
          <p className="text-sm text-slate-600">{name}</p>
        </div>
        {pendingGrades > 0 && (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-semibold">
            {pendingGrades} معلق
          </span>
        )}
      </div>
      <div className="flex justify-between text-sm text-slate-600">
        <span>{students} طالب</span>
        <span>{level}</span>
      </div>
    </div>
  );
}

function ScheduleItem({ time, course, room, type }: ScheduleItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <div className="text-purple-600 font-bold text-sm whitespace-nowrap">{time}</div>
      <div className="flex-1">
        <p className="text-slate-900 font-medium text-sm">{course}</p>
        <p className="text-slate-600 text-xs">{room} • {type}</p>
      </div>
    </div>
  );
}

function TaskItem({ icon, text, priority, deadline }: TaskItemProps) {
  const colors: Record<string, string> = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-amber-50 border-amber-200',
    low: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${colors[priority]}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="text-slate-700 text-sm font-medium">{text}</p>
        <p className="text-slate-500 text-xs mt-1">الموعد النهائي: {deadline}</p>
      </div>
    </div>
  );
}

function ActivityItem({ icon, text, time }: { icon: string; text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="text-slate-700 text-sm">{text}</p>
        <p className="text-slate-500 text-xs mt-1">{time}</p>
      </div>
    </div>
  );
}