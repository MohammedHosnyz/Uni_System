'use client';

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

export default function StaffProfile() {
  return (
    <StaffLayout userName="أ. أحمد محمد">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2 flex items-center gap-3">
              <MaterialIcon name="person" className="text-[36px] text-[#BB8E2C]" />
              الملف الشخصي
            </h1>
            <p className="text-[#62615F]">عرض وتعديل معلوماتك الشخصية</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <MaterialIcon name="person" className="text-[48px] text-[#BB8E2C]" />
                </div>
                <div className="text-[#121110]">
                  <h2 className="text-2xl font-bold mb-1">أ. أحمد محمد علي</h2>
                  <p className="text-lg opacity-90">موظف شؤون الطلاب</p>
                  <p className="text-sm opacity-80">رقم الموظف: EMP2024001</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">الاسم الأول</label>
                  <input
                    type="text"
                    value="أحمد"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">اسم العائلة</label>
                  <input
                    type="text"
                    value="محمد علي"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value="ahmed.mohamed@aun.edu.eg"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value="01012345678"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">القسم</label>
                  <input
                    type="text"
                    value="شؤون الطلاب"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg bg-[#F6F2E6]"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#121110] mb-2">تاريخ التعيين</label>
                  <input
                    type="text"
                    value="2020-09-01"
                    className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg bg-[#F6F2E6]"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                  حفظ التغييرات
                </button>
                <button className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#121110] rounded-lg font-semibold hover:bg-[#F6F2E6] transition-all">
                  إلغاء
                </button>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] p-8">
            <h3 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
              <MaterialIcon name="lock" className="text-[#BB8E2C]" />
              تغيير كلمة المرور
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">كلمة المرور الحالية</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#121110] mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8E2C]"
                />
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white rounded-lg font-semibold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                تحديث كلمة المرور
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
