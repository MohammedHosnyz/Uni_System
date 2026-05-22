'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TabButtonProps,
  StatCardProps,
  ProgressBarProps,
  ActivityItemProps,
  StudentRowProps,
  CourseCardProps,
  GradeCardProps,
  GradeDistributionProps,
  StatColor,
  ProgressColor,
  SessionUser
} from '../../../types';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/login');
      return;
    }
    Promise.resolve().then(() => setUser(parsedUser));
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold text-slate-900">AU</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white">لوحة التحكم</h1>
                <p className="text-xs text-amber-400 hidden sm:block">جامعة أسيوط الأهلية</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-left hidden sm:block">
                <p className="text-sm text-white font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm sm:text-base">{user.firstName[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-4 sm:mb-6 overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 p-1.5 sm:p-2 min-w-max">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              📊 <span className="hidden sm:inline">نظرة عامة</span><span className="sm:hidden">عامة</span>
            </TabButton>
            <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')}>
              🎓 <span className="hidden sm:inline">الطلاب</span><span className="sm:hidden">طلاب</span>
            </TabButton>
            <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>
              📚 <span className="hidden sm:inline">المواد</span><span className="sm:hidden">مواد</span>
            </TabButton>
            <TabButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>
              📅 <span className="hidden sm:inline">الجدول</span><span className="sm:hidden">جدول</span>
            </TabButton>
            <TabButton active={activeTab === 'grades'} onClick={() => setActiveTab('grades')}>
              📝 <span className="hidden sm:inline">الدرجات</span><span className="sm:hidden">درجات</span>
            </TabButton>
            <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>
              📈 <span className="hidden sm:inline">التقارير</span><span className="sm:hidden">تقارير</span>
            </TabButton>
          </div>
        </div>

        
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'courses' && <CoursesTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'grades' && <GradesTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
        active
          ? 'bg-amber-500 text-slate-900 shadow-md'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard title="إجمالي الطلاب" value="5,234" change="+12%" icon="🎓" color="blue" />
        <StatCard title="أعضاء هيئة التدريس" value="287" change="+5%" icon="👨‍🏫" color="green" />
        <StatCard title="المواد الدراسية" value="156" change="+8" icon="📚" color="purple" />
        <StatCard title="معدل النجاح" value="94.5%" change="+2.3%" icon="📊" color="amber" />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">توزيع الطلاب حسب الكليات</h3>
          <div className="space-y-3">
            <ProgressBar label="كلية الهندسة" value={45} color="blue" />
            <ProgressBar label="كلية الطب" value={30} color="red" />
            <ProgressBar label="كلية التجارة" value={15} color="green" />
            <ProgressBar label="كلية الآداب" value={10} color="purple" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">الأنشطة الأخيرة</h3>
          <div className="space-y-3">
            <ActivityItem icon="✅" text="تم تسجيل 45 طالب جديد" time="منذ ساعتين" />
            <ActivityItem icon="📝" text="تم رفع درجات مادة CS101" time="منذ 4 ساعات" />
            <ActivityItem icon="📅" text="تحديث الجدول الدراسي للفصل الحالي" time="منذ يوم" />
            <ActivityItem icon="💰" text="تم تسجيل 120 عملية دفع" time="منذ يومين" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">إدارة الطلاب</h2>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors text-sm w-full sm:w-auto">
            + إضافة طالب جديد
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="البحث عن طالب..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">الرقم الجامعي</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">الاسم</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">البرنامج</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">المستوى</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">المعدل</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">الحالة</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-slate-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <StudentRow id="2024001" name="أحمد محمد علي" program="علوم الحاسب" level="المستوى الثاني" gpa="3.85" status="نشط" />
              <StudentRow id="2024002" name="فاطمة حسن محمود" program="الهندسة الكهربائية" level="المستوى الأول" gpa="3.92" status="نشط" />
              <StudentRow id="2024003" name="محمد أحمد السيد" program="علوم الحاسب" level="المستوى الثالث" gpa="3.67" status="نشط" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CoursesTab() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">المواد الدراسية</h2>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors text-sm w-full sm:w-auto">
            + إضافة مادة جديدة
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <CourseCard code="CS101" name="مقدمة في البرمجة" credits={3} level={1} students={120} />
          <CourseCard code="CS102" name="هياكل البيانات" credits={3} level={2} students={95} />
          <CourseCard code="CS201" name="قواعد البيانات" credits={3} level={2} students={87} />
          <CourseCard code="CS301" name="الذكاء الاصطناعي" credits={4} level={3} students={65} />
          <CourseCard code="EE101" name="الدوائر الكهربائية" credits={3} level={1} students={110} />
          <CourseCard code="MATH101" name="التفاضل والتكامل" credits={4} level={1} students={150} />
        </div>
      </div>
    </div>
  );
}

function ScheduleTab() {
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  const times = ['8:00', '10:00', '12:00', '2:00', '4:00'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">الجدول الدراسي</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="border border-slate-300 bg-slate-100 p-2 sm:p-3 text-xs sm:text-sm font-semibold">الوقت</th>
              {days.map((day) => (
                <th key={day} className="border border-slate-300 bg-slate-100 p-2 sm:p-3 text-xs sm:text-sm font-semibold">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="border border-slate-300 bg-slate-50 p-2 sm:p-3 text-xs sm:text-sm font-medium text-center">
                  {time}
                </td>
                {days.map((day) => (
                  <td key={`${day}-${time}`} className="border border-slate-300 p-1 sm:p-2">
                    {Math.random() > 0.5 && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-1 sm:p-2 text-xs">
                        <div className="font-semibold text-blue-900">CS101</div>
                        <div className="text-blue-700 hidden sm:block">قاعة A101</div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GradesTab() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">إدارة الدرجات</h2>
      <div className="space-y-3 sm:space-y-4">
        <GradeCard student="أحمد محمد علي" course="CS101 - مقدمة في البرمجة" midterm={28} final={65} assignment={12} total={95} grade="A" />
        <GradeCard student="فاطمة حسن محمود" course="CS102 - هياكل البيانات" midterm={26} final={62} assignment={10} total={88} grade="B+" />
        <GradeCard student="محمد أحمد السيد" course="CS201 - قواعد البيانات" midterm={25} final={58} assignment={11} total={84} grade="B" />
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">توزيع التقديرات</h3>
          <div className="space-y-3">
            <GradeDistribution grade="A" count={450} percentage={25} />
            <GradeDistribution grade="B" count={720} percentage={40} />
            <GradeDistribution grade="C" count={450} percentage={25} />
            <GradeDistribution grade="D" count={180} percentage={10} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">إحصائيات الحضور</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">معدل الحضور العام</span>
              <span className="text-xl sm:text-2xl font-bold text-green-600">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">الطلاب المنتظمون</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">4,812</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">حالات الغياب</span>
              <span className="text-xl sm:text-2xl font-bold text-red-600">422</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const colors: Record<StatColor, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center text-lg sm:text-2xl`}>
          {icon}
        </div>
        <span className="text-green-600 text-xs sm:text-sm font-semibold">{change}</span>
      </div>
      <h3 className="text-slate-600 text-xs sm:text-sm mb-1 leading-tight">{title}</h3>
      <p className="text-xl sm:text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ProgressBar({ label, value, color }: ProgressBarProps) {
  const colors: Record<ProgressColor, string> = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-600 font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className={`${colors[color]} h-2 rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ActivityItem({ icon, text, time }: ActivityItemProps) {
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

function StudentRow({ id, name, program, level, gpa, status }: StudentRowProps) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3 text-sm text-slate-900">{id}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{name}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{program}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{level}</td>
      <td className="px-4 py-3 text-sm font-semibold text-green-600">{gpa}</td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{status}</span>
      </td>
      <td className="px-4 py-3">
        <button className="text-blue-600 hover:text-blue-800 text-sm">عرض</button>
      </td>
    </tr>
  );
}

function CourseCard({ code, name, credits, level, students }: CourseCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-slate-900">{code}</h4>
          <p className="text-sm text-slate-600 mt-1">{name}</p>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {credits} ساعات
        </span>
      </div>
      <div className="flex justify-between text-sm text-slate-600">
        <span>المستوى {level}</span>
        <span>{students} طالب</span>
      </div>
    </div>
  );
}

function GradeCard({ student, course, midterm, final, assignment, total, grade }: GradeCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 sm:p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="min-w-0 flex-1 ml-2">
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{student}</h4>
          <p className="text-xs sm:text-sm text-slate-600 truncate">{course}</p>
        </div>
        <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 font-bold rounded-lg text-sm flex-shrink-0">
          {grade}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <p className="text-slate-500">منتصف الفصل</p>
          <p className="font-semibold text-slate-900">{midterm}/30</p>
        </div>
        <div>
          <p className="text-slate-500">النهائي</p>
          <p className="font-semibold text-slate-900">{final}/70</p>
        </div>
        <div>
          <p className="text-slate-500">الأعمال</p>
          <p className="font-semibold text-slate-900">{assignment}/15</p>
        </div>
        <div>
          <p className="text-slate-500">المجموع</p>
          <p className="font-bold text-slate-900">{total}/100</p>
        </div>
      </div>
    </div>
  );
}

function GradeDistribution({ grade, count, percentage }: GradeDistributionProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700 font-semibold">تقدير {grade}</span>
        <span className="text-slate-600">{count} طالب ({percentage}%)</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}