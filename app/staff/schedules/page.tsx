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

export default function SchedulesManagement() {
  const [selectedDay, setSelectedDay] = useState('sunday');

  const days = [
    { id: 'sunday', name: 'الأحد' },
    { id: 'monday', name: 'الإثنين' },
    { id: 'tuesday', name: 'الثلاثاء' },
    { id: 'wednesday', name: 'الأربعاء' },
    { id: 'thursday', name: 'الخميس' },
  ];

  const timeSlots = [
    '08:00 - 09:30',
    '09:45 - 11:15',
    '11:30 - 13:00',
    '13:15 - 14:45',
    '15:00 - 16:30',
  ];

  const scheduleData: any = {
    sunday: [
      { time: '08:00 - 09:30', course: 'CS101', instructor: 'د. أحمد محمد', room: 'A101', students: 45 },
      { time: '09:45 - 11:15', course: 'CS102', instructor: 'د. فاطمة علي', room: 'A102', students: 38 },
      { time: '11:30 - 13:00', course: 'MATH101', instructor: 'د. محمود حسن', room: 'B201', students: 50 },
    ],
    monday: [
      { time: '08:00 - 09:30', course: 'CS201', instructor: 'د. سارة أحمد', room: 'A103', students: 42 },
      { time: '13:15 - 14:45', course: 'CS202', instructor: 'د. خالد محمد', room: 'A104', students: 35 },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };

  const rooms = [
    { id: 'A101', name: 'قاعة A101', capacity: 50, type: 'محاضرات', status: 'متاح' },
    { id: 'A102', name: 'قاعة A102', capacity: 45, type: 'محاضرات', status: 'محجوز' },
    { id: 'A103', name: 'قاعة A103', capacity: 40, type: 'محاضرات', status: 'متاح' },
    { id: 'B201', name: 'معمل B201', capacity: 30, type: 'معامل', status: 'محجوز' },
    { id: 'B202', name: 'معمل B202', capacity: 30, type: 'معامل', status: 'صيانة' },
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
              <MaterialIcon name="calendar_month" className="text-[36px] text-[#BB8E2C]" />
              إدارة الجداول الدراسية
            </h1>
            <p className="text-[#62615F]">عرض وتعديل الجداول الدراسية وإدارة القاعات</p>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">إجمالي الجداول</p>
                  <p className="text-3xl font-bold text-[#121110]">45</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="calendar_today" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">القاعات المتاحة</p>
                  <p className="text-3xl font-bold text-[#121110]">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="meeting_room" className="text-[28px] text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">القاعات المحجوزة</p>
                  <p className="text-3xl font-bold text-[#121110]">8</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="event_available" className="text-[28px] text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">تعارضات</p>
                  <p className="text-3xl font-bold text-[#121110]">2</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="warning" className="text-[28px] text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#121110]">الجدول الأسبوعي</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2">
                    <MaterialIcon name="add" />
                    إضافة محاضرة
                  </button>
                </div>

                
                <div className="border-b border-[#E8DFD3] overflow-x-auto">
                  <div className="flex">
                    {days.map((day) => (
                      <button
                        key={day.id}
                        onClick={() => setSelectedDay(day.id)}
                        className={`flex-1 px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                          selectedDay === day.id
                            ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white'
                            : 'text-[#62615F] hover:bg-[#F6F2E6]'
                        }`}
                      >
                        {day.name}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div className="p-6">
                  {scheduleData[selectedDay].length === 0 ? (
                    <div className="text-center py-12">
                      <MaterialIcon name="event_busy" className="text-[64px] text-[#E8DFD3] mb-4" />
                      <p className="text-[#62615F]">لا توجد محاضرات في هذا اليوم</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {scheduleData[selectedDay].map((slot: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <MaterialIcon name="schedule" className="text-[#BB8E2C]" />
                                <span className="font-bold text-[#121110]">{slot.time}</span>
                              </div>
                              <h3 className="text-lg font-bold text-[#121110] mb-1">{slot.course}</h3>
                              <p className="text-sm text-[#62615F] mb-1">
                                <MaterialIcon name="person" className="text-[14px]" /> {slot.instructor}
                              </p>
                              <p className="text-sm text-[#62615F]">
                                <MaterialIcon name="meeting_room" className="text-[14px]" /> {slot.room} • {slot.students} طالب
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-white rounded-lg transition-colors" title="تعديل">
                                <MaterialIcon name="edit" className="text-blue-600" />
                              </button>
                              <button className="p-2 hover:bg-white rounded-lg transition-colors" title="حذف">
                                <MaterialIcon name="delete" className="text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3]">
                  <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                    <MaterialIcon name="meeting_room" className="text-[#BB8E2C]" />
                    إدارة القاعات
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className="p-4 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-[#121110] mb-1">{room.name}</h3>
                            <p className="text-xs text-[#62615F] mb-1">السعة: {room.capacity} طالب</p>
                            <p className="text-xs text-[#62615F]">النوع: {room.type}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              room.status === 'متاح'
                                ? 'bg-green-100 text-green-700'
                                : room.status === 'محجوز'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {room.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center justify-center gap-2">
                    <MaterialIcon name="add" />
                    إضافة قاعة جديدة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
