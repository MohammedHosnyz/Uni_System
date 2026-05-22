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

interface Material {
  id: number;
  title: string;
  type: 'pdf' | 'ppt' | 'code' | 'video';
  course: string;
  uploadDate: string;
  size: string;
  downloads: number;
}

export default function AssistantMaterialsPage() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const materials: Material[] = [
    {
      id: 1,
      title: 'محاضرة 1 - مقدمة في البرمجة',
      type: 'pdf',
      course: 'CS101',
      uploadDate: '2024-02-10',
      size: '2.5 MB',
      downloads: 45,
    },
    {
      id: 2,
      title: 'شرح الحلقات التكرارية',
      type: 'video',
      course: 'CS101',
      uploadDate: '2024-02-12',
      size: '125 MB',
      downloads: 38,
    },
    {
      id: 3,
      title: 'أمثلة على المصفوفات',
      type: 'code',
      course: 'CS201',
      uploadDate: '2024-02-14',
      size: '15 KB',
      downloads: 42,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'ppt':
        return 'slideshow';
      case 'code':
        return 'code';
      case 'video':
        return 'play_circle';
      default:
        return 'description';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700';
      case 'ppt':
        return 'bg-orange-100 text-orange-700';
      case 'code':
        return 'bg-blue-100 text-blue-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesCourse = selectedCourse === 'all' || material.course === selectedCourse;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    return matchesCourse && matchesType;
  });

  return (
    <AssistantLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#121110] mb-2">المواد التعليمية</h1>
            <p className="text-[#62615F]">رفع وإدارة المواد التعليمية للطلاب</p>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#E8DFD3]">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                >
                  <option value="all">جميع المقررات</option>
                  <option value="CS101">CS101 - مقدمة في البرمجة</option>
                  <option value="CS201">CS201 - هياكل البيانات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">نوع المادة</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="pdf">PDF</option>
                  <option value="ppt">عروض تقديمية</option>
                  <option value="code">أكواد برمجية</option>
                  <option value="video">فيديوهات</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                >
                  <MaterialIcon name="upload" className="text-[20px] inline-block ml-2" />
                  رفع مادة جديدة
                </button>
              </div>
            </div>
          </div>

          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(material.type)}`}>
                      <MaterialIcon name={getTypeIcon(material.type)} className="text-[32px]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#121110] mb-1">{material.title}</h3>
                      <p className="text-sm text-[#62615F]">{material.course}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#62615F]">تاريخ الرفع</span>
                      <span className="text-[#3A3937] font-bold">{material.uploadDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#62615F]">الحجم</span>
                      <span className="text-[#3A3937] font-bold">{material.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#62615F]">التحميلات</span>
                      <span className="text-[#3A3937] font-bold">{material.downloads}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                      <MaterialIcon name="download" className="text-[18px] inline-block ml-1" />
                      تحميل
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg font-bold text-[#3A3937] hover:bg-[#F6F2E6] transition-colors">
                      <MaterialIcon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFD3]">
              <h2 className="text-2xl font-bold text-[#121110] flex items-center gap-2">
                <MaterialIcon name="upload" className="text-[28px] text-[#BB8E2C]" />
                رفع مادة تعليمية جديدة
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر *</label>
                <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none">
                  <option>CS101 - مقدمة في البرمجة</option>
                  <option>CS201 - هياكل البيانات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">عنوان المادة *</label>
                <input
                  type="text"
                  placeholder="مثال: محاضرة 1 - مقدمة في البرمجة"
                  className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">نوع المادة *</label>
                <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] outline-none">
                  <option value="pdf">PDF</option>
                  <option value="ppt">عرض تقديمي (PPT)</option>
                  <option value="code">كود برمجي</option>
                  <option value="video">فيديو</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3A3937] mb-2">رفع الملف *</label>
                <div className="border-2 border-dashed border-[#E8DFD3] rounded-lg p-8 text-center hover:border-[#BB8E2C] transition-colors cursor-pointer">
                  <MaterialIcon name="cloud_upload" className="text-[48px] text-[#BB8E2C] mb-2" />
                  <p className="text-sm text-[#3A3937] font-bold mb-1">اضغط لرفع الملف</p>
                  <p className="text-xs text-[#62615F]">PDF, PPT, ZIP, MP4 (حتى 500MB)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-lg font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all">
                  رفع المادة
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-lg font-bold hover:bg-[#F6F2E6] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AssistantLayout>
  );
}
