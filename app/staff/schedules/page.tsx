'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  Calendar, 
  DoorOpen, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  User, 
  MapPin, 
  Users, 
  CalendarDays 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function SchedulesManagement() {
  const [selectedDay, setSelectedDay] = useState('sunday');

  const days = [
    { id: 'sunday', name: 'الأحد' },
    { id: 'monday', name: 'الإثنين' },
    { id: 'tuesday', name: 'الثلاثاء' },
    { id: 'wednesday', name: 'الأربعاء' },
    { id: 'thursday', name: 'الخميس' },
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
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <Calendar className="h-7 w-7 text-[#D97706]" />
              إدارة الجداول الدراسية
            </h1>
            <p className="text-sm text-stone-500 font-medium">عرض وتعديل الجداول الدراسية الأسبوعية وإدارة القاعات الدراسية</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">إجمالي الجداول</p>
                  <p className="text-2xl font-bold text-[#1C1917]">45</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">القاعات المتاحة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">12</p>
                </div>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <DoorOpen className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">القاعات المحجوزة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">8</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <DoorOpen className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">تعارضات</p>
                  <p className="text-2xl font-bold text-[#1C1917]">2</p>
                </div>
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Weekly Schedule column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-5 border-b border-stone-150 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#1C1917]">الجدول الأسبوعي</h2>
                  <button className="px-3.5 py-1.5 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" />
                    إضافة محاضرة
                  </button>
                </div>

                {/* Day selector */}
                <div className="border-b border-stone-150 overflow-x-auto bg-stone-50/50">
                  <div className="flex">
                    {days.map((day) => (
                      <button
                        key={day.id}
                        onClick={() => setSelectedDay(day.id)}
                        className={`flex-1 px-4 py-3 font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
                          selectedDay === day.id
                            ? 'border-[#FABA19] text-[#D97706] bg-amber-50/15'
                            : 'border-transparent text-stone-500 hover:text-stone-700'
                        }`}
                      >
                        {day.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schedule list */}
                <div className="p-6">
                  {scheduleData[selectedDay].length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm text-stone-500 font-medium">لا توجد محاضرات في هذا اليوم</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {scheduleData[selectedDay].map((slot: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 mb-2">
                                <Clock className="h-4 w-4 text-[#D97706]" />
                                <span className="font-bold text-[#1C1917] text-xs">{slot.time}</span>
                              </div>
                              <h3 className="text-base font-bold text-[#1C1917] mb-2">{slot.course}</h3>
                              
                              <div className="space-y-1">
                                <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-stone-400" /> {slot.instructor}
                                </p>
                                <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 text-stone-400" /> {slot.room} • {slot.students} طالب
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-1">
                              <button className="p-1.5 hover:bg-white rounded-lg text-stone-500 hover:text-blue-600 border border-transparent hover:border-stone-200 transition-all" title="تعديل">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1.5 hover:bg-white rounded-lg text-stone-500 hover:text-red-600 border border-transparent hover:border-stone-200 transition-all" title="حذف">
                                <Trash2 className="h-4 w-4" />
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

            {/* Room Management column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-5 border-b border-stone-150">
                  <h2 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                    <DoorOpen className="h-5 w-5 text-[#D97706]" />
                    إدارة القاعات
                  </h2>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className="p-4 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-[#1C1917] text-sm mb-1.5">{room.name}</h3>
                            <p className="text-xs text-stone-500 font-medium mb-1">السعة: {room.capacity} طالب</p>
                            <p className="text-xs text-stone-500 font-medium">النوع: {room.type}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              room.status === 'متاح'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : room.status === 'محجوز'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : 'bg-red-50 text-red-700 border border-red-100'
                            }`}
                          >
                            {room.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">
                    <Plus className="h-4 w-4" />
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
