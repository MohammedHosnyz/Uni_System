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

interface Announcement {
  id: number;
  title: string;
  content: string;
  course: string;
  date: string;
  priority: 'normal' | 'urgent';
  views: number;
}

export default function AssistantAnnouncementsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<'all' | 'CS101' | 'CS201'>('all');

  const announcements: Announcement[] = useMemo(
    () => [
      {
        id: 1,
        title: 'تأجيل موعد الكويز الأول',
        content: 'تم تأجيل موعد الكويز الأول إلى يوم الأحد القادم الساعة 10 صباحاً',
        course: 'CS101',
        date: '2024-02-15',
        priority: 'urgent',
        views: 45,
      },
      {
        id: 2,
        title: 'إضافة ساعات مكتبية إضافية',
        content: 'تم إضافة ساعات مكتبية إضافية يوم الخميس من 2 إلى 4 مساءً',
        course: 'CS101',
        date: '2024-02-14',
        priority: 'normal',
        views: 38,
      },
      {
        id: 3,
        title: 'تسليم الواجب الثاني',
        content: 'آخر موعد لتسليم الواجب الثاني هو يوم الأربعاء القادم',
        course: 'CS201',
        date: '2024-02-13',
        priority: 'normal',
        views: 42,
      },
    ],
    []
  );

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(
      (announcement) => selectedCourse === 'all' || announcement.course === selectedCourse
    );
  }, [announcements, selectedCourse]);

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
              <h1 className="text-3xl font-bold text-[#121110] mb-2">الإعلانات</h1>
              <p className="text-[#62615F]">نشر وإدارة الإعلانات للطلاب</p>
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value as 'all' | 'CS101' | 'CS201')}
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                  >
                    <option value="all">جميع المقررات</option>
                    <option value="CS101">CS101 - مقدمة في البرمجة</option>
                    <option value="CS201">CS201 - هياكل البيانات</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                  >
                    <MaterialIcon name="add_circle" className="text-[20px] inline-block ml-2" />
                    إعلان جديد
                  </button>
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all ${
                    announcement.priority === 'urgent' ? 'border-red-500' : 'border-[#E8DFD3]'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {announcement.priority === 'urgent' && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                              <MaterialIcon name="priority_high" className="text-[16px]" />
                              عاجل
                            </span>
                          )}
                          <span className="px-3 py-1 bg-[#F6F2E6] text-[#3A3937] rounded-full text-xs font-bold">
                            {announcement.course}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[#121110] mb-2">{announcement.title}</h3>
                        <p className="text-[#3A3937] leading-relaxed">{announcement.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD3]">
                      <div className="flex items-center gap-4 text-sm text-[#62615F]">
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="calendar_today" className="text-[18px]" />
                          <span>{announcement.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="visibility" className="text-[18px]" />
                          <span>{announcement.views} مشاهدة</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="px-4 py-2 bg-[#F6F2E6] rounded-lg font-bold text-[#3A3937] hover:bg-[#BB8E2C] hover:text-white transition-all"
                        >
                          <MaterialIcon name="edit" className="text-[18px] inline-block ml-1" />
                          تعديل
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-all"
                        >
                          <MaterialIcon name="delete" className="text-[18px] inline-block ml-1" />
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAnnouncements.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] p-10 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#F6F2E6] flex items-center justify-center mb-4">
                    <MaterialIcon name="campaign" className="text-[32px] text-[#BB8E2C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#121110] mb-2">لا توجد إعلانات</h3>
                  <p className="text-[#62615F]">جرّب اختيار مقرر آخر أو أنشئ إعلان جديد.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        
        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                  <MaterialIcon name="campaign" className="text-[28px] text-[#BB8E2C]" />
                  نشر إعلان جديد
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-2xl font-bold text-[#121110] hover:text-black"
                  aria-label="إغلاق"
                  title="إغلاق"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر *</label>
                  <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none">
                    <option value="CS101">CS101 - مقدمة في البرمجة</option>
                    <option value="CS201">CS201 - هياكل البيانات</option>
                    <option value="all">جميع المقررات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">الأولوية *</label>
                  <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none">
                    <option value="normal">عادي</option>
                    <option value="urgent">عاجل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">عنوان الإعلان *</label>
                  <input
                    type="text"
                    placeholder="مثال: تأجيل موعد الكويز"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#3A3937] mb-2">محتوى الإعلان *</label>
                  <textarea
                    rows={6}
                    placeholder="اكتب محتوى الإعلان هنا..."
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <MaterialIcon name="info" className="text-[24px] text-yellow-700" />
                  <p className="text-sm text-yellow-800">
                    سيتم إرسال إشعار لجميع الطلاب المسجلين في المقرر المحدد
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                  >
                    نشر الإعلان
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AssistantLayout>
  );
}
