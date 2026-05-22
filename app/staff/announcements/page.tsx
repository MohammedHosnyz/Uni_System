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

export default function AnnouncementsManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const announcements = [
    {
      id: 'ANN001',
      title: 'بدء التسجيل للفصل الدراسي الثاني',
      content: 'يبدأ التسجيل للفصل الدراسي الثاني يوم الأحد الموافق 15 فبراير 2024',
      target: 'جميع الطلاب',
      priority: 'high',
      date: '2024-02-10',
      status: 'published',
      views: 1245,
    },
    {
      id: 'ANN002',
      title: 'تأجيل امتحان مقرر CS301',
      content: 'تم تأجيل امتحان مقرر قواعد البيانات CS301 إلى يوم الخميس',
      target: 'السنة الثالثة',
      priority: 'urgent',
      date: '2024-02-09',
      status: 'published',
      views: 856,
    },
    {
      id: 'ANN003',
      title: 'ورشة عمل عن الذكاء الاصطناعي',
      content: 'ندعوكم لحضور ورشة عمل عن تطبيقات الذكاء الاصطناعي',
      target: 'جميع الطلاب',
      priority: 'normal',
      date: '2024-02-08',
      status: 'draft',
      views: 0,
    },
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
              <MaterialIcon name="campaign" className="text-[36px] text-[#BB8E2C]" />
              إدارة الإعلانات
            </h1>
            <p className="text-[#62615F]">إنشاء وإدارة الإعلانات وإرسال الإشعارات</p>
          </div>

          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">إجمالي الإعلانات</p>
                  <p className="text-3xl font-bold text-[#121110]">156</p>
                </div>
                <div className="w-12 h-12 bg-[#BB8E2C] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="campaign" className="text-[28px] text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">منشورة</p>
                  <p className="text-3xl font-bold text-[#121110]">142</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="check_circle" className="text-[28px] text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">مسودات</p>
                  <p className="text-3xl font-bold text-[#121110]">14</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MaterialIcon name="draft" className="text-[28px] text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8DFD3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#62615F] mb-1">إجمالي المشاهدات</p>
                  <p className="text-3xl font-bold text-[#121110]">12.5K</p>
                </div>
                <div className="w-12 h-12 bg-[#D6AE45] rounded-xl flex items-center justify-center">
                  <MaterialIcon name="visibility" className="text-[28px] text-white" />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
            <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#121110]">الإعلانات الأخيرة</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center gap-2"
              >
                <MaterialIcon name="add" />
                إنشاء إعلان جديد
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-6 bg-[#F6F2E6] rounded-xl border border-[#E8DFD3] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#121110]">{announcement.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              announcement.priority === 'urgent'
                                ? 'bg-red-100 text-red-700'
                                : announcement.priority === 'high'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {announcement.priority === 'urgent'
                              ? 'عاجل'
                              : announcement.priority === 'high'
                              ? 'مهم'
                              : 'عادي'}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              announcement.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {announcement.status === 'published' ? 'منشور' : 'مسودة'}
                          </span>
                        </div>
                        <p className="text-sm text-[#62615F] mb-3">{announcement.content}</p>
                        <div className="flex items-center gap-4 text-xs text-[#62615F]">
                          <span className="flex items-center gap-1">
                            <MaterialIcon name="group" className="text-[14px]" />
                            {announcement.target}
                          </span>
                          <span className="flex items-center gap-1">
                            <MaterialIcon name="calendar_today" className="text-[14px]" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MaterialIcon name="visibility" className="text-[14px]" />
                            {announcement.views} مشاهدة
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all flex items-center justify-center gap-2">
                        <MaterialIcon name="edit" />
                        تعديل
                      </button>
                      {announcement.status === 'draft' && (
                        <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                          <MaterialIcon name="publish" />
                          نشر
                        </button>
                      )}
                      <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                        <MaterialIcon name="notifications" />
                        إرسال إشعار
                      </button>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                        <MaterialIcon name="delete" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#121110]">إنشاء إعلان جديد</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-[#F6F2E6] rounded-lg transition-colors"
                  >
                    <MaterialIcon name="close" className="text-[#62615F]" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#121110] mb-2">عنوان الإعلان</label>
                    <input
                      type="text"
                      placeholder="أدخل عنوان الإعلان"
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121110] mb-2">المحتوى</label>
                    <textarea
                      rows={5}
                      placeholder="أدخل محتوى الإعلان"
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#121110] mb-2">الفئة المستهدفة</label>
                      <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]">
                        <option>جميع الطلاب</option>
                        <option>السنة الأولى</option>
                        <option>السنة الثانية</option>
                        <option>السنة الثالثة</option>
                        <option>السنة الرابعة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#121110] mb-2">الأولوية</label>
                      <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]">
                        <option>عادي</option>
                        <option>مهم</option>
                        <option>عاجل</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[#F6F2E6] rounded-lg">
                    <input type="checkbox" id="sendNotification" className="w-5 h-5" />
                    <label htmlFor="sendNotification" className="text-sm font-semibold text-[#121110]">
                      إرسال إشعار فوري للطلاب
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                      نشر الإعلان
                    </button>
                    <button className="flex-1 px-6 py-3 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                      حفظ كمسودة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StaffLayout>
  );
}
