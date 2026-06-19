'use client';

import { useState } from 'react';
import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  Megaphone, 
  Users, 
  Calendar, 
  Eye, 
  Plus, 
  Bell, 
  Edit, 
  Send, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  X 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

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
      content: 'ندعوكم لحضور ورشة عمل عن تطبيقات الذكاء الاصطناعي في علوم الحاسب والتكنولوجيا الحديثة',
      target: 'جميع الطلاب',
      priority: 'normal',
      date: '2024-02-08',
      status: 'draft',
      views: 0,
    },
  ];

  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-7xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
                <Megaphone className="h-7 w-7 text-[#D97706]" />
                إدارة الإعلانات
              </h1>
              <p className="text-sm text-stone-500 font-medium">إنشاء وإدارة الإعلانات العامة وتوجيه الإشعارات للفئات المستهدفة</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="self-start sm:self-center px-4 py-2 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              إنشاء إعلان جديد
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">إجمالي الإعلانات</p>
                  <p className="text-2xl font-bold text-[#1C1917]">156</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">منشورة</p>
                  <p className="text-2xl font-bold text-[#1C1917]">142</p>
                </div>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">مسودات</p>
                  <p className="text-2xl font-bold text-[#1C1917]">14</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-bold mb-1">إجمالي المشاهدات</p>
                  <p className="text-2xl font-bold text-[#1C1917]">12.5K</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  <Eye className="h-5 w-5 text-[#D97706]" />
                </div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-150">
              <h2 className="text-base font-bold text-[#1C1917]">الإعلانات الأخيرة</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-5 bg-stone-50/30 rounded-xl border border-stone-150 hover:bg-stone-50/60 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <h3 className="text-base font-bold text-[#1C1917]">{announcement.title}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              announcement.priority === 'urgent'
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : announcement.priority === 'high'
                                ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                            }`}
                          >
                            {announcement.priority === 'urgent'
                              ? 'عاجل'
                              : announcement.priority === 'high'
                              ? 'مهم'
                              : 'عادي'}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              announcement.status === 'published'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-stone-100 text-stone-600 border border-stone-200'
                            }`}
                          >
                            {announcement.status === 'published' ? 'منشور' : 'مسودة'}
                          </span>
                        </div>
                        <p className="text-sm text-stone-650 font-medium mb-3 leading-relaxed">{announcement.content}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-stone-400" />
                            {announcement.target}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-stone-400" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5 text-stone-400" />
                            {announcement.views} مشاهدة
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-150">
                      <button className="flex-1 min-w-[100px] px-3.5 py-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                        <Edit className="h-3.5 w-3.5" />
                        تعديل
                      </button>
                      {announcement.status === 'draft' && (
                        <button className="flex-1 min-w-[100px] px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                          <Send className="h-3.5 w-3.5" />
                          نشر
                        </button>
                      )}
                      <button className="flex-1 min-w-[100px] px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                        <Bell className="h-3.5 w-3.5 text-[#D97706]" />
                        إرسال إشعار
                      </button>
                      <button className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-650 border border-red-100 rounded-xl transition-all" title="حذف">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Create Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden border border-stone-200">
                <div className="px-6 py-5 border-b border-stone-150 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#1C1917]">إنشاء إعلان جديد</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-2">عنوان الإعلان</label>
                    <input
                      type="text"
                      placeholder="أدخل عنوان الإعلان"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-2">المحتوى</label>
                    <textarea
                      rows={4}
                      placeholder="أدخل محتوى الإعلان بالتفصيل..."
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-medium"
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-2">الفئة المستهدفة</label>
                      <select className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold">
                        <option>جميع الطلاب</option>
                        <option>السنة الأولى</option>
                        <option>السنة الثانية</option>
                        <option>السنة الثالثة</option>
                        <option>السنة الرابعة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-2">الأولوية</label>
                      <select className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold">
                        <option>عادي</option>
                        <option>مهم</option>
                        <option>عاجل</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 bg-stone-50 border border-stone-150 rounded-xl">
                    <input type="checkbox" id="sendNotification" className="w-4 h-4 rounded text-[#FABA19] focus:ring-[#FABA19]" />
                    <label htmlFor="sendNotification" className="text-xs font-bold text-stone-700">
                      إرسال إشعار فوري وتنبيه للطلاب
                    </label>
                  </div>

                  <div className="flex gap-2.5 pt-4 border-t border-stone-150">
                    <button className="flex-1 px-5 py-2.5 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold text-xs transition-all shadow-sm">
                      نشر الإعلان
                    </button>
                    <button className="flex-1 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all">
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
