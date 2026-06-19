'use client';

import { Cairo } from 'next/font/google';
import StaffLayout from '@/components/StaffLayout';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Lock, 
  Shield 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function StaffProfile() {
  return (
    <StaffLayout userName="أ. أحمد محمد">
      <div className={`${cairo.className} py-6`}>
        <div className="max-w-4xl mx-auto px-1">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
              <User className="h-7 w-7 text-[#D97706]" />
              الملف الشخصي
            </h1>
            <p className="text-sm text-stone-500 font-medium">عرض وإدارة وتحديث بيانات الموظف الشخصية والأمان</p>
          </div>

          {/* Profile header card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden mb-6">
            <div className="bg-[#1C1917] p-8 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-[#D97706]" />
                </div>
                <div className="text-center sm:text-right">
                  <h2 className="text-xl font-bold text-white mb-1.5">أ. أحمد محمد علي</h2>
                  <p className="text-sm text-stone-400 font-semibold mb-1">موظف شؤون الطلاب</p>
                  <p className="text-xs text-amber-400 font-bold">رقم الموظف: EMP2024001</p>
                </div>
              </div>
            </div>

            {/* Profile fields */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">الاسم الأول</label>
                  <input
                    type="text"
                    defaultValue="أحمد"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">اسم العائلة</label>
                  <input
                    type="text"
                    defaultValue="محمد علي"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    defaultValue="ahmed.mohamed@aun.edu.eg"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    defaultValue="01012345678"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">القسم</label>
                  <input
                    type="text"
                    defaultValue="شؤون الطلاب"
                    className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 font-semibold cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">تاريخ التعيين</label>
                  <input
                    type="text"
                    defaultValue="2020-09-01"
                    className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 font-semibold cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-150 flex gap-2">
                <button className="px-5 py-2.5 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] rounded-xl font-bold text-xs transition-all shadow-sm">
                  حفظ التغييرات
                </button>
                <button className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all">
                  إلغاء
                </button>
              </div>
            </div>
          </div>

          {/* Change password card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h3 className="text-base font-bold text-[#1C1917] mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#D97706]" />
              تغيير كلمة المرور
            </h3>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">كلمة المرور الحالية</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917]"
                />
              </div>

              <button className="px-5 py-2.5 bg-stone-850 hover:bg-stone-900 text-white rounded-xl font-bold text-xs transition-all shadow-sm">
                تحديث كلمة المرور
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
