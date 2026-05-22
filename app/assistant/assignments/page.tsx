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

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  totalSubmissions: number;
  graded: number;
  pending: number;
  status: 'active' | 'closed' | 'upcoming';
}

interface Submission {
  id: number;
  studentName: string;
  studentCode: string;
  submittedDate: string;
  grade: number | null;
  status: 'submitted' | 'graded' | 'late';
  file: string;
}

export default function AssistantAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'review'>('list');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const assignments: Assignment[] = useMemo(
    () => [
      {
        id: 1,
        title: 'واجب 1 - أساسيات البرمجة',
        course: 'CS101',
        dueDate: '2024-02-20',
        totalSubmissions: 45,
        graded: 30,
        pending: 15,
        status: 'active',
      },
      {
        id: 2,
        title: 'واجب 2 - الحلقات والشروط',
        course: 'CS101',
        dueDate: '2024-02-25',
        totalSubmissions: 0,
        graded: 0,
        pending: 0,
        status: 'upcoming',
      },
      {
        id: 3,
        title: 'واجب 1 - المصفوفات',
        course: 'CS201',
        dueDate: '2024-02-18',
        totalSubmissions: 38,
        graded: 38,
        pending: 0,
        status: 'closed',
      },
    ],
    []
  );

  const submissions: Submission[] = useMemo(
    () => [
      {
        id: 1,
        studentName: 'أحمد محمد علي',
        studentCode: '202400001',
        submittedDate: '2024-02-15 10:30',
        grade: 18,
        status: 'graded',
        file: 'assignment1_202400001.pdf',
      },
      {
        id: 2,
        studentName: 'فاطمة حسن إبراهيم',
        studentCode: '202400002',
        submittedDate: '2024-02-16 14:20',
        grade: null,
        status: 'submitted',
        file: 'assignment1_202400002.pdf',
      },
      {
        id: 3,
        studentName: 'محمود خالد أحمد',
        studentCode: '202400003',
        submittedDate: '2024-02-21 09:15',
        grade: null,
        status: 'late',
        file: 'assignment1_202400003.pdf',
      },
    ],
    []
  );

  const selectedTitle = selectedAssignment?.title ?? 'واجب 1: أساسيات البرمجة';

  const statusPill = (status: Assignment['status']) => {
    
    if (status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'upcoming') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <AssistantLayout>
      <div className={`${cairo.className} min-h-screen flex flex-col bg-[#FBFAF6]`} dir="rtl">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
        />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#121110] mb-2">إدارة الواجبات والتكليفات</h1>
              <p className="text-[#62615F]">إنشاء وإدارة ومتابعة الواجبات</p>
            </div>

            
            <div className="flex gap-3 mb-8 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'list'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] shadow-md'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="list" className="text-[20px] inline-block ml-2" />
                قائمة الواجبات
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'create'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] shadow-md'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="add_circle" className="text-[20px] inline-block ml-2" />
                إنشاء واجب جديد
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('review')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === 'review'
                    ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] shadow-md'
                    : 'bg-white text-[#3A3937] border border-[#E8DFD3] hover:bg-[#F6F2E6]'
                }`}
              >
                <MaterialIcon name="rate_review" className="text-[20px] inline-block ml-2" />
                مراجعة التسليمات
              </button>
            </div>

            
            {activeTab === 'list' && (
              <div className="grid lg:grid-cols-2 gap-6">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#121110] mb-1">{assignment.title}</h3>
                          <p className="text-sm text-[#62615F]">{assignment.course}</p>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusPill(assignment.status)}`}>
                          {assignment.status === 'active'
                            ? 'نشط'
                            : assignment.status === 'upcoming'
                            ? 'قادم'
                            : 'مغلق'}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MaterialIcon name="event" className="text-[18px] text-[#BB8E2C]" />
                          <span className="text-[#3A3937]">آخر موعد: {assignment.dueDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <MaterialIcon name="upload_file" className="text-[18px] text-[#BB8E2C]" />
                          <span className="text-[#3A3937]">{assignment.totalSubmissions} تسليم من 45 طالب</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-[#F6F2E6] rounded-2xl text-center border border-[#E8DFD3]">
                          <p className="text-xs text-[#62615F] mb-1 font-semibold">تم التصحيح</p>
                          <p className="text-2xl font-extrabold text-[#121110]">{assignment.graded}</p>
                        </div>

                        <div className="p-3 bg-[#F6F2E6] rounded-2xl text-center border border-[#E8DFD3]">
                          <p className="text-xs text-[#62615F] mb-1 font-semibold">قيد المراجعة</p>
                          <p className="text-2xl font-extrabold text-[#121110]">{assignment.pending}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedAssignment(assignment)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                        >
                          عرض التفاصيل
                        </button>

                        <button
                          type="button"
                          className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-2xl font-bold text-[#3A3937] hover:bg-[#F6F2E6] transition-colors"
                        >
                          <MaterialIcon name="edit" className="text-[20px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
            {activeTab === 'create' && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E8DFD3] max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                  <MaterialIcon name="add_circle" className="text-[28px] text-[#BB8E2C]" />
                  إنشاء واجب جديد
                </h2>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#3A3937] mb-2">المقرر *</label>
                    <select className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white">
                      <option>CS101 - مقدمة في البرمجة</option>
                      <option>CS201 - هياكل البيانات</option>
                      <option>CS301 - قواعد البيانات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#3A3937] mb-2">عنوان الواجب *</label>
                    <input
                      type="text"
                      placeholder="مثال: واجب 1 - أساسيات البرمجة"
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#3A3937] mb-2">الوصف *</label>
                    <textarea
                      rows={4}
                      placeholder="اكتب وصف تفصيلي للواجب..."
                      className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none resize-none bg-white"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#3A3937] mb-2">آخر موعد للتسليم *</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#3A3937] mb-2">الدرجة الكاملة *</label>
                      <input
                        type="number"
                        placeholder="20"
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-2xl focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#3A3937] mb-2">رفع ملف الواجب</label>
                    <div className="border-2 border-dashed border-[#E8DFD3] rounded-2xl p-8 text-center hover:border-[#BB8E2C] transition-colors cursor-pointer bg-[#FBFAF6]">
                      <MaterialIcon name="cloud_upload" className="text-[48px] text-[#BB8E2C] mb-2" />
                      <p className="text-sm text-[#3A3937] font-bold mb-1">اضغط لرفع الملف</p>
                      <p className="text-xs text-[#62615F] font-semibold">PDF, DOC, DOCX (حتى 10MB)</p>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <button
                      type="submit"
                      className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl font-bold hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                    >
                      إنشاء الواجب
                    </button>

                    <button
                      type="button"
                      className="flex-1 min-w-[200px] px-6 py-3 bg-white border border-[#E8DFD3] text-[#3A3937] rounded-2xl font-bold hover:bg-[#F6F2E6] transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            )}

            
            {activeTab === 'review' && (
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8DFD3] overflow-hidden">
                <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between gap-4 flex-wrap">
                  <h2 className="text-xl font-bold text-[#121110] flex items-center gap-2">
                    <MaterialIcon name="rate_review" className="text-[24px] text-[#BB8E2C]" />
                    مراجعة التسليمات - {selectedTitle}
                  </h2>

                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 bg-[#F6F2E6] hover:bg-[#E8DFD3] text-[#121110] rounded-2xl font-bold transition-all border border-[#E8DFD3]"
                  >
                    رجوع للقائمة
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F6F2E6]">
                      <tr>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">الطالب</th>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#121110]">تاريخ التسليم</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الحالة</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الدرجة</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#121110]">الإجراءات</th>
                      </tr>
                    </thead>

                    <tbody>
                      {submissions.map((submission) => (
                        <tr
                          key={submission.id}
                          className="border-b border-[#E8DFD3] hover:bg-[#F6F2E6] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-bold text-[#121110]">{submission.studentName}</p>
                              <p className="text-xs text-[#62615F] font-semibold">{submission.studentCode}</p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-[#3A3937] font-medium">
                            {submission.submittedDate}
                          </td>

                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                submission.status === 'graded'
                                  ? 'bg-green-100 text-green-700'
                                  : submission.status === 'late'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {submission.status === 'graded'
                                ? 'تم التصحيح'
                                : submission.status === 'late'
                                ? 'متأخر'
                                : 'قيد المراجعة'}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-center">
                            {submission.grade !== null ? (
                              <span className="text-lg font-bold text-[#121110]">{submission.grade}/20</span>
                            ) : (
                              <input
                                type="number"
                                placeholder="0"
                                className="w-20 px-3 py-2 border border-[#E8DFD3] rounded-2xl text-center focus:ring-2 focus:ring-[#BB8E2C] outline-none bg-white"
                              />
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                className="p-2 bg-[#F6F2E6] rounded-2xl hover:bg-[#BB8E2C] hover:text-white transition-all border border-[#E8DFD3]"
                                title="تحميل"
                              >
                                <MaterialIcon name="download" className="text-[20px]" />
                              </button>

                              <button
                                type="button"
                                className="p-2 bg-[#F6F2E6] rounded-2xl hover:bg-[#BB8E2C] hover:text-white transition-all border border-[#E8DFD3]"
                                title="عرض"
                              >
                                <MaterialIcon name="visibility" className="text-[20px]" />
                              </button>

                              <button
                                type="button"
                                className="p-2 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110] rounded-2xl hover:from-[#D6AE45] hover:to-[#FCCC03] transition-all"
                                title="حفظ"
                              >
                                <MaterialIcon name="save" className="text-[20px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}
