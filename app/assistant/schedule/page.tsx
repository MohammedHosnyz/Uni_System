'use client';

import { useMemo, useState } from 'react';
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

interface ScheduleSlot {
  day: string;
  time: string;
  course: string;
  type: 'section' | 'lab';
  room: string;
  students: number;
}

interface OfficeHour {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  available: boolean;
}

interface Appointment {
  id: number;
  studentName: string;
  studentCode: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export default function AssistantSchedulePage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'office' | 'appointments'>('schedule');

  const weekDays = useMemo(() => ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'], []);
  const timeSlots = useMemo(() => ['8:00', '10:00', '12:00', '2:00', '4:00'], []);

  const schedule: ScheduleSlot[] = [
    { day: 'السبت', time: '10:00', course: 'CS101 - سكشن 1', type: 'section', room: 'A201', students: 45 },
    { day: 'الأحد', time: '12:00', course: 'CS101 - معمل 1', type: 'lab', room: 'Lab 3', students: 30 },
    { day: 'الاثنين', time: '10:00', course: 'CS201 - سكشن 2', type: 'section', room: 'B105', students: 40 },
    { day: 'الأربعاء', time: '2:00', course: 'CS201 - معمل 2', type: 'lab', room: 'Lab 5', students: 35 },
  ];

  const officeHours: OfficeHour[] = [
    { id: 1, day: 'الأحد', startTime: '10:00', endTime: '12:00', location: 'مكتب 305', available: true },
    { id: 2, day: 'الثلاثاء', startTime: '2:00', endTime: '4:00', location: 'مكتب 305', available: true },
    { id: 3, day: 'الخميس', startTime: '12:00', endTime: '2:00', location: 'مكتب 305', available: false },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      studentName: 'أحمد محمد علي',
      studentCode: '202400001',
      date: '2024-02-15',
      time: '10:30',
      reason: 'استفسار عن الواجب',
      status: 'confirmed',
    },
    {
      id: 2,
      studentName: 'فاطمة حسن إبراهيم',
      studentCode: '202400002',
      date: '2024-02-16',
      time: '11:00',
      reason: 'مراجعة الدرجات',
      status: 'pending',
    },
  ];

  const statusBadge = (status: Appointment['status']) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  const statusLabel = (status: Appointment['status']) => {
    if (status === 'confirmed') return 'مؤكد';
    if (status === 'pending') return 'قيد الانتظار';
    return 'مكتمل';
  };

  return (
    <AssistantLayout userName="أ. محمد أحمد">
      <div className={`${cairo.className} min-h-screen flex flex-col bg-[#FBFAF6]`} dir="rtl">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
        />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#121110] mb-2">الجدول والمواعيد</h1>
              <p className="text-[#62615F]">إدارة جدول السكاشن والساعات المكتبية</p>
            </div>

            
            <div className="flex gap-3 mb-8 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="calendar_month" className="text-[20px] inline-block ml-2" />
                الجدول الأسبوعي
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('office')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'office'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="schedule" className="text-[20px] inline-block ml-2" />
                ساعات المكتب
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'appointments'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="event_available" className="text-[20px] inline-block ml-2" />
                الحجوزات
              </button>
            </div>

            
            {activeTab === 'schedule' && (
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3]">
                  <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                    <MaterialIcon name="calendar_month" className="text-[24px] text-[#BB8E2C]" />
                    الجدول الأسبوعي للسكاشن والمعامل
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F6F2E6]">
                      <tr>
                        <th className="px-4 py-4 text-center text-sm font-bold text-[#121110] border-l border-[#E8DFD3]">
                          الوقت
                        </th>
                        {weekDays.map((day) => (
                          <th key={day} className="px-4 py-4 text-center text-sm font-bold text-[#121110]">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time} className="border-b border-[#E8DFD3]">
                          <td className="px-4 py-6 text-center font-bold text-[#3A3937] bg-[#F6F2E6] border-l border-[#E8DFD3] whitespace-nowrap">
                            {time}
                          </td>

                          {weekDays.map((day) => {
                            const slot = schedule.find((s) => s.day === day && s.time === time);

                            return (
                              <td key={`${day}-${time}`} className="px-2 py-2 align-top">
                                {slot ? (
                                  <div
                                    className={`p-3 rounded-2xl border ${
                                      slot.type === 'section'
                                        ? 'bg-gradient-to-br from-[#BB8E2C]/15 to-[#D6AE45]/15 border-[#BB8E2C]/30 border-r-4 border-r-[#BB8E2C]'
                                        : 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 border-r-4 border-r-blue-500'
                                    }`}
                                  >
                                    <p className="text-sm font-bold text-[#121110] mb-1">{slot.course}</p>
                                    <p className="text-xs text-[#62615F] flex items-center gap-1">
                                      <MaterialIcon name="location_on" className="text-[14px]" />
                                      {slot.room}
                                    </p>
                                    <p className="text-xs text-[#62615F] flex items-center gap-1 mt-1">
                                      <MaterialIcon name="group" className="text-[14px]" />
                                      {slot.students} طالب
                                    </p>
                                  </div>
                                ) : (
                                  <div className="h-full min-h-[90px]" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-[#F6F2E6] flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-[#BB8E2C]/15 to-[#D6AE45]/15 border-r-4 border-[#BB8E2C] rounded" />
                    <span className="text-sm text-[#3A3937] font-semibold">سكشن</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-50 border-r-4 border-blue-500 rounded" />
                    <span className="text-sm text-[#3A3937] font-semibold">معمل</span>
                  </div>
                </div>
              </div>
            )}

            
            {activeTab === 'office' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                  <div className="p-6 border-b border-[#E8DFD3]">
                    <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                      <MaterialIcon name="schedule" className="text-[24px] text-[#BB8E2C]" />
                      ساعات المكتب
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {officeHours.map((hour) => (
                      <div
                        key={hour.id}
                        className="p-4 border border-[#E8DFD3] rounded-2xl hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-[#121110]">{hour.day}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              hour.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {hour.available ? 'متاح' : 'محجوز'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-[#3A3937]">
                            <MaterialIcon name="schedule" className="text-[18px] text-[#BB8E2C]" />
                            <span className="font-semibold">
                              {hour.startTime} - {hour.endTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#3A3937]">
                            <MaterialIcon name="location_on" className="text-[18px] text-[#BB8E2C]" />
                            <span className="font-semibold">{hour.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-[#E8DFD3]">
                    <button
                      type="button"
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                    >
                      <MaterialIcon name="add" className="text-[20px] inline-block ml-2" />
                      إضافة ساعة مكتبية
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                  <h3 className="text-lg font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <MaterialIcon name="info" className="text-[20px] text-[#BB8E2C]" />
                    معلومات الساعات المكتبية
                  </h3>

                  <div className="space-y-4 text-[#3A3937]">
                    <p className="text-sm leading-relaxed font-medium">
                      الساعات المكتبية هي أوقات محددة يكون فيها المعيد متاحاً لاستقبال الطلاب للإجابة على استفساراتهم
                      ومساعدتهم في المقررات الدراسية.
                    </p>

                    <div className="p-4 bg-[#F6F2E6] rounded-2xl border border-[#E8DFD3]">
                      <h4 className="font-bold text-[#121110] mb-2">إرشادات:</h4>
                      <ul className="text-sm space-y-2 list-disc list-inside font-medium">
                        <li>يجب تحديد ساعات مكتبية لا تقل عن 4 ساعات أسبوعياً</li>
                        <li>يفضل توزيع الساعات على أيام مختلفة</li>
                        <li>يمكن للطلاب حجز موعد مسبق خلال هذه الساعات</li>
                        <li>يجب الالتزام بالمواعيد المحددة</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3]">
                  <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                    <MaterialIcon name="event_available" className="text-[24px] text-[#BB8E2C]" />
                    حجوزات الطلاب
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F6F2E6]">
                      <tr>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">التاريخ</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الوقت</th>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">السبب</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحالة</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الإجراءات</th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-bold text-[#121110]">{appointment.studentName}</p>
                              <p className="text-xs text-[#62615F]">{appointment.studentCode}</p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-center text-sm text-[#3A3937] font-medium">
                            {appointment.date}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-[#3A3937] font-medium">
                            {appointment.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#3A3937] font-medium">{appointment.reason}</td>

                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge(appointment.status)}`}>
                              {statusLabel(appointment.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                className="p-2 bg-green-100 text-green-700 rounded-2xl hover:bg-green-200 transition-all"
                                title="تأكيد"
                              >
                                <MaterialIcon name="check" className="text-[20px]" />
                              </button>

                              <button
                                type="button"
                                className="p-2 bg-red-100 text-red-700 rounded-2xl hover:bg-red-200 transition-all"
                                title="رفض"
                              >
                                <MaterialIcon name="close" className="text-[20px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}
