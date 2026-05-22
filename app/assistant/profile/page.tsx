'use client';

import { useState } from 'react';
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

export default function AssistantProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'cv' | 'password'>('info');
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((v) => !v);

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
              <h1 className="text-3xl font-bold text-[#121110] mb-2">الملف الشخصي</h1>
              <p className="text-[#62615F]">إدارة بياناتك الشخصية والأكاديمية</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#BB8E2C] to-[#D6AE45] rounded-full flex items-center justify-center mx-auto mb-4">
                      <MaterialIcon name="person" className="text-[48px] text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#121110]">أ. محمد أحمد علي</h3>
                    <p className="text-sm text-[#62615F]">معيد</p>
                    <p className="text-xs text-[#62615F] mt-1">قسم علوم الحاسب</p>
                  </div>

                  <nav className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('info');
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        activeTab === 'info'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                          : 'text-[#3A3937] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      <MaterialIcon name="badge" className="text-[20px]" />
                      <span>البيانات الشخصية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('contact');
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        activeTab === 'contact'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                          : 'text-[#3A3937] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      <MaterialIcon name="contact_mail" className="text-[20px]" />
                      <span>معلومات الاتصال</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('cv');
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        activeTab === 'cv'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                          : 'text-[#3A3937] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      <MaterialIcon name="description" className="text-[20px]" />
                      <span>السيرة الذاتية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('password');
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        activeTab === 'password'
                          ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                          : 'text-[#3A3937] hover:bg-[#F6F2E6]'
                      }`}
                    >
                      <MaterialIcon name="lock" className="text-[20px]" />
                      <span>تغيير كلمة المرور</span>
                    </button>
                  </nav>
                </div>
              </div>

              
              <div className="lg:col-span-3">
                
                {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                        <MaterialIcon name="badge" className="text-[24px] text-[#BB8E2C]" />
                        البيانات الشخصية
                      </h2>

                      <button
                        type="button"
                        onClick={toggleEdit}
                        className="px-4 py-2 bg-[#F6F2E6] rounded-xl font-bold text-[#3A3937] hover:bg-[#BB8E2C] hover:text-white transition-all"
                      >
                        <MaterialIcon name={isEditing ? 'close' : 'edit'} className="text-[18px] inline-block ml-1" />
                        {isEditing ? 'إلغاء' : 'تعديل'}
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">الاسم الكامل</label>
                          <input
                            type="text"
                            defaultValue="محمد أحمد علي"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">الرقم الوظيفي</label>
                          <input
                            type="text"
                            defaultValue="TA-2024-001"
                            disabled
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl bg-[#F6F2E6]"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">القسم</label>
                          <input
                            type="text"
                            defaultValue="علوم الحاسب"
                            disabled
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl bg-[#F6F2E6]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">التخصص</label>
                          <input
                            type="text"
                            defaultValue="هندسة البرمجيات"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">تاريخ الميلاد</label>
                          <input
                            type="date"
                            defaultValue="1995-05-15"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">الجنسية</label>
                          <input
                            type="text"
                            defaultValue="مصري"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4 pt-4">
                          <button
                            type="button"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                          >
                            حفظ التغييرات
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                
                {activeTab === 'contact' && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                        <MaterialIcon name="contact_mail" className="text-[24px] text-[#BB8E2C]" />
                        معلومات الاتصال
                      </h2>

                      <button
                        type="button"
                        onClick={toggleEdit}
                        className="px-4 py-2 bg-[#F6F2E6] rounded-xl font-bold text-[#3A3937] hover:bg-[#BB8E2C] hover:text-white transition-all"
                      >
                        <MaterialIcon name={isEditing ? 'close' : 'edit'} className="text-[18px] inline-block ml-1" />
                        {isEditing ? 'إلغاء' : 'تعديل'}
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">البريد الإلكتروني الجامعي</label>
                        <input
                          type="email"
                          defaultValue="mohamed.ahmed@aun.edu.eg"
                          disabled
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl bg-[#F6F2E6]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">البريد الإلكتروني الشخصي</label>
                        <input
                          type="email"
                          defaultValue="mohamed.ahmed@gmail.com"
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">رقم الهاتف</label>
                          <input
                            type="tel"
                            defaultValue="01012345678"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#3A3937] mb-2">رقم الهاتف البديل</label>
                          <input
                            type="tel"
                            defaultValue="01098765432"
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none disabled:bg-[#F6F2E6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">العنوان</label>
                        <textarea
                          rows={3}
                          defaultValue="أسيوط، مصر"
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none resize-none disabled:bg-[#F6F2E6]"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex gap-4 pt-4">
                          <button
                            type="button"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                          >
                            حفظ التغييرات
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                
                {activeTab === 'cv' && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                    <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                      <MaterialIcon name="description" className="text-[24px] text-[#BB8E2C]" />
                      السيرة الذاتية
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#121110] mb-3">المؤهلات العلمية</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-[#E8DFD3] rounded-xl">
                            <p className="font-bold text-[#121110]">بكالوريوس علوم الحاسب</p>
                            <p className="text-sm text-[#62615F]">جامعة أسيوط - 2020</p>
                            <p className="text-sm text-[#62615F]">التقدير: ممتاز مع مرتبة الشرف</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#121110] mb-3">الخبرات العملية</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-[#E8DFD3] rounded-xl">
                            <p className="font-bold text-[#121110]">معيد - قسم علوم الحاسب</p>
                            <p className="text-sm text-[#62615F]">جامعة أسيوط الأهلية - 2024 - حتى الآن</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#121110] mb-3">المهارات</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'Java', 'C++', 'JavaScript', 'React', 'Node.js', 'SQL'].map((skill) => (
                            <span
                              key={skill}
                              className="px-4 py-2 bg-[#F6F2E6] rounded-xl text-sm font-bold text-[#3A3937]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                        >
                          <MaterialIcon name="upload" className="text-[20px] inline-block ml-2" />
                          رفع السيرة الذاتية (PDF)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                
                {activeTab === 'password' && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8DFD3]">
                    <h2 className="text-xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                      <MaterialIcon name="lock" className="text-[24px] text-[#BB8E2C]" />
                      تغيير كلمة المرور
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">كلمة المرور الحالية</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#3A3937] mb-2">
                          تأكيد كلمة المرور الجديدة
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-xl focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                        />
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-sm text-yellow-800 flex items-start gap-2 font-semibold">
                          <MaterialIcon name="info" className="text-[20px]" />
                          <span>يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن أحرف كبيرة وصغيرة وأرقام</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                      >
                        تغيير كلمة المرور
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}
