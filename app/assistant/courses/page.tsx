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

interface Course {
  id: number;
  code: string;
  name: string;
  section: string;
  students: number;
  schedule: string;
  room: string;
  professor: string;
  materials: number;
  assignments: number;
}

export default function AssistantCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      code: 'CS101',
      name: 'مقدمة في البرمجة',
      section: 'سكشن 1',
      students: 45,
      schedule: 'الأحد والثلاثاء 10:00-11:30',
      room: 'معمل 201',
      professor: 'د. أحمد محمد',
      materials: 12,
      assignments: 5,
    },
    {
      id: 2,
      code: 'CS201',
      name: 'هياكل البيانات',
      section: 'سكشن 2',
      students: 38,
      schedule: 'الاثنين والأربعاء 12:00-13:30',
      room: 'قاعة 305',
      professor: 'د. فاطمة علي',
      materials: 15,
      assignments: 6,
    },
    {
      id: 3,
      code: 'CS301',
      name: 'قواعد البيانات',
      section: 'معمل 1',
      students: 42,
      schedule: 'الثلاثاء والخميس 14:00-15:30',
      room: 'معمل 103',
      professor: 'د. محمود خالد',
      materials: 18,
      assignments: 7,
    },
  ];

  const materials = [
    { title: 'محاضرة 1 - مقدمة', type: 'pdf', date: '2024-02-01', size: '2.5 MB' },
    { title: 'كود المحاضرة 2', type: 'code', date: '2024-02-05', size: '15 KB' },
    { title: 'شرح الواجب الأول', type: 'video', date: '2024-02-08', size: '45 MB' },
    { title: 'ملخص الوحدة الأولى', type: 'pdf', date: '2024-02-10', size: '1.8 MB' },
  ];

  return (
    <AssistantLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">إدارة المقررات</h1>
            <p className="text-[#62615F]">عرض وإدارة المقررات المسندة إليك</p>
          </div>

          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] p-6 text-[#121110]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                      <MaterialIcon name="menu_book" className="text-[28px]" />
                    </div>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm font-bold">
                      {course.section}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{course.code}</h3>
                  <p className="text-sm opacity-90">{course.name}</p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MaterialIcon name="groups" className="text-[18px] text-[#BB8E2C]" />
                    <span className="text-[#3A3937]">{course.students} طالب</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MaterialIcon name="schedule" className="text-[18px] text-[#BB8E2C]" />
                    <span className="text-[#3A3937]">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MaterialIcon name="location_on" className="text-[18px] text-[#BB8E2C]" />
                    <span className="text-[#3A3937]">{course.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MaterialIcon name="person" className="text-[18px] text-[#BB8E2C]" />
                    <span className="text-[#3A3937]">{course.professor}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD3] flex gap-2">
                    <div className="flex-1 text-center p-2 bg-[#F6F2E6] rounded-lg">
                      <p className="text-xs text-[#62615F]">المواد</p>
                      <p className="text-lg font-bold text-[#121110]">{course.materials}</p>
                    </div>
                    <div className="flex-1 text-center p-2 bg-[#F6F2E6] rounded-lg">
                      <p className="text-xs text-[#62615F]">الواجبات</p>
                      <p className="text-lg font-bold text-[#121110]">{course.assignments}</p>
                    </div>
                  </div>

                  <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="sticky top-0 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedCourse.code} - {selectedCourse.name}</h2>
                <p className="text-sm opacity-90">{selectedCourse.section}</p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
              >
                <MaterialIcon name="close" className="text-[24px]" />
              </button>
            </div>

            
            <div className="p-6 space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="info" className="text-[24px] text-[#BB8E2C]" />
                  معلومات المقرر
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoBox label="عدد الطلاب" value={`${selectedCourse.students} طالب`} icon="groups" />
                  <InfoBox label="الجدول" value={selectedCourse.schedule} icon="schedule" />
                  <InfoBox label="القاعة" value={selectedCourse.room} icon="location_on" />
                  <InfoBox label="الأستاذ" value={selectedCourse.professor} icon="person" />
                </div>
              </div>

              
              <div>
                <h3 className="text-xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="folder" className="text-[24px] text-[#BB8E2C]" />
                  المواد التعليمية
                </h3>
                <div className="space-y-2">
                  {materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <MaterialIcon
                            name={
                              material.type === 'pdf'
                                ? 'picture_as_pdf'
                                : material.type === 'video'
                                ? 'play_circle'
                                : 'code'
                            }
                            className="text-[24px] text-[#BB8E2C]"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#121110] text-sm">{material.title}</p>
                          <p className="text-xs text-[#62615F]">{material.date} • {material.size}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg text-sm font-bold text-[#3A3937] hover:bg-[#F6F2E6] transition-colors">
                        تحميل
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all flex items-center justify-center gap-2">
                  <MaterialIcon name="add" className="text-[20px]" />
                  رفع مادة جديدة
                </button>
              </div>

              
              <div>
                <h3 className="text-xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                  <MaterialIcon name="bolt" className="text-[24px] text-[#BB8E2C]" />
                  إجراءات سريعة
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <ActionButton icon="how_to_reg" label="تسجيل الحضور" />
                  <ActionButton icon="assignment" label="إنشاء واجب" />
                  <ActionButton icon="grade" label="إدخال درجات" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AssistantLayout>
  );
}

function InfoBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="p-4 bg-[#F6F2E6] border border-[#E8DFD3] rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <MaterialIcon name={icon} className="text-[18px] text-[#BB8E2C]" />
        <span className="text-xs font-bold text-[#62615F]">{label}</span>
      </div>
      <p className="text-sm font-bold text-[#121110]">{value}</p>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="p-4 bg-[#F6F2E6] rounded-lg border border-[#E8DFD3] hover:bg-gradient-to-r hover:from-[#BB8E2C] hover:to-[#D6AE45] hover:text-[#121110] transition-all group text-center">
      <MaterialIcon name={icon} className="text-[28px] text-[#BB8E2C] group-hover:text-[#121110] mb-2" />
      <p className="text-sm font-bold text-[#3A3937] group-hover:text-[#121110]">{label}</p>
    </button>
  );
}
