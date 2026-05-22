'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cairo } from 'next/font/google';


import { useTranslations } from '@/lib/useTranslations';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface SupportTicket {
  id: string;
  title: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  date: string;
  lastUpdate: string;
}


function MaterialIcon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default function SupportPage() {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState<'submit' | 'tickets' | 'solutions'>(
    'submit'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachment: null as File | null,
  });

  const myTickets: SupportTicket[] = [
    {
      id: 'TKT-2024-001',
      title: 'مشكلة في تسجيل المقررات',
      category: 'تسجيل المقررات',
      status: 'in-progress',
      priority: 'high',
      date: '2024-01-15',
      lastUpdate: '2024-01-16 10:30 ص',
    },
    {
      id: 'TKT-2024-002',
      title: 'استفسار عن الجدول الدراسي',
      category: 'الجداول',
      status: 'resolved',
      priority: 'medium',
      date: '2024-01-10',
      lastUpdate: '2024-01-12 02:15 م',
    },
  ];

  const quickSolutions = [
    {
      icon: 'lock_reset',
      title: 'نسيت كلمة المرور',
      description: 'اضغط على "نسيت كلمة المرور" في صفحة تسجيل الدخول',
      link: '/login',
    },
    {
      icon: 'edit_document',
      title: 'مشكلة في التسجيل',
      description: 'تأكد من استيفاء الشروط الأكاديمية والمالية',
      link: '/help#registration',
    },
    {
      icon: 'credit_card',
      title: 'الدفع الإلكتروني',
      description: 'راجع دليل الدفع الإلكتروني والطرق المتاحة',
      link: '/help#payment',
    },
    {
      icon: 'bar_chart',
      title: 'عرض الدرجات',
      description: 'الدرجات متاحة بعد إعلانها رسمياً من الأستاذ',
      link: '/student/grades',
    },
    {
      icon: 'calendar_month',
      title: 'الجدول الدراسي',
      description: 'يمكنك عرض وطباعة جدولك من لوحة التحكم',
      link: '/student/schedule',
    },
    {
      icon: 'description',
      title: 'طلب وثيقة',
      description: 'قدم طلبك من قسم شؤون الطلاب',
      link: '/student/profile',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إرسال تذكرة الدعم بنجاح! سيتم الرد عليك قريباً.');
    setFormData({
      name: '',
      email: '',
      studentId: '',
      category: '',
      priority: 'medium',
      subject: '',
      description: '',
      attachment: null,
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  const tabIcon: Record<'submit' | 'tickets' | 'solutions', string> = {
    submit: 'add_circle',
    tickets: 'confirmation_number',
    solutions: 'lightbulb',
  };

  const statusIcon: Record<SupportTicket['status'], string> = {
    open: 'radio_button_unchecked',
    'in-progress': 'autorenew',
    resolved: 'task_alt',
    closed: 'done_all',
  };

  const priorityIcon: Record<SupportTicket['priority'], string> = {
    low: 'low_priority',
    medium: 'signal_cellular_alt',
    high: 'priority_high',
    urgent: 'warning',
  };

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col bg-[#FBFAF6]`} dir="rtl">
      
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      /><main className="flex-grow">
        <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                <MaterialIcon name="support_agent" className="text-[34px] text-[#121110]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.support.title}
              </h1>
              <p className="text-xl opacity-90">{t.support.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F6F2E6]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {(['submit', 'tickets', 'solutions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-[#121110]'
                        : 'bg-white text-[#3A3937] hover:bg-[#F6F2E6] border border-[#E8DFD3]'
                    }`}
                  >
                    <MaterialIcon
                      name={tabIcon[tab]}
                      className={activeTab === tab ? 'text-[22px]' : 'text-[22px] text-[#BB8E2C]'}
                    />
                    <span>
                      {tab === 'submit'
                        ? t.support.createTicket
                        : tab === 'tickets'
                        ? t.support.myTickets
                        : t.support.quickSolutions}
                    </span>
                  </button>
                ))}
              </div>

              
              {activeTab === 'submit' && (
                <div className="bg-white rounded-lg shadow-lg p-8 border border-[#E8DFD3]">
                  <h2 className="text-2xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                    <MaterialIcon name="add_circle" className="text-[26px] text-[#BB8E2C]" />
                    {t.support.createTicket}
                  </h2>

                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                          {t.contact.fullName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                          {t.contact.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                          {t.support.category} *
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                        >
                          <option value="">{t.contact.subjectPlaceholder}</option>
                          {t.support.categories.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                          {t.support.priority.medium}
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) =>
                            setFormData({ ...formData, priority: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                        >
                          <option value="low">{t.support.priority.low}</option>
                          <option value="medium">{t.support.priority.medium}</option>
                          <option value="high">{t.support.priority.high}</option>
                          <option value="urgent">{t.support.priority.urgent}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                        {t.contact.subject} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#3A3937] mb-2">
                        {t.support.description} *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-[#E8DFD3] rounded-lg focus:ring-2 focus:ring-[#BB8E2C] focus:border-transparent outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] hover:from-[#D6AE45] hover:to-[#FCCC03] text-[#121110] font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MaterialIcon name="send" className="text-[20px]" />
                      {t.support.submit}
                    </button>
                  </form>
                </div>
              )}

              
              {activeTab === 'tickets' && (
                <div className="space-y-4">
                  {myTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-lg shadow-lg p-6 border border-[#E8DFD3]">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#121110]">{ticket.title}</h3>
                          <p className="text-sm text-[#62615F] flex items-center gap-2">
                            <MaterialIcon name="tag" className="text-[18px] text-[#BB8E2C]" />
                            <span>#{ticket.id}</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              ticket.status
                            )} flex items-center gap-1`}
                          >
                            <MaterialIcon name={statusIcon[ticket.status]} className="text-[16px]" />
                            {t.support.status[ticket.status]}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                              ticket.priority
                            )} flex items-center gap-1`}
                          >
                            <MaterialIcon name={priorityIcon[ticket.priority]} className="text-[16px]" />
                            {t.support.priority[ticket.priority]}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-[#3A3937] space-y-2">
                        <p className="flex items-center gap-2">
                          <MaterialIcon name="category" className="text-[18px] text-[#BB8E2C]" />
                          <span>
                            {t.support.category}: {ticket.category}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <MaterialIcon name="schedule" className="text-[18px] text-[#BB8E2C]" />
                          <span>آخر تحديث: {ticket.lastUpdate}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              
              {activeTab === 'solutions' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickSolutions.map((solution, index) => (
                    <Link
                      key={index}
                      href={solution.link}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all border border-[#E8DFD3] group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-4 text-[#BB8E2C] group-hover:scale-105 transition-transform">
                        <MaterialIcon name={solution.icon} className="text-[28px]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#121110] mb-2 group-hover:text-[#BB8E2C] transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-[#62615F]">{solution.description}</p>
                      <div className="mt-4 text-sm text-[#BB8E2C] font-semibold flex items-center gap-1">
                        <span>انتقل</span>
                        <MaterialIcon name="arrow_left" className="text-[18px]" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              
              <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-[#E8DFD3]">
                <h3 className="text-2xl font-bold text-[#121110] mb-6 flex items-center gap-2">
                  <MaterialIcon name="contact_support" className="text-[26px] text-[#BB8E2C]" />
                  {t.support.contactTitle}
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-3 text-[#BB8E2C]">
                      <MaterialIcon name="call" className="text-[28px]" />
                    </div>
                    <h4 className="font-semibold text-[#121110] mb-1">{t.support.phone}</h4>
                    <p className="text-[#62615F]">088-2411111</p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-3 text-[#BB8E2C]">
                      <MaterialIcon name="mail" className="text-[28px]" />
                    </div>
                    <h4 className="font-semibold text-[#121110] mb-1">{t.support.email}</h4>
                    <p className="text-[#62615F]">support@aun.edu.eg</p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-3 text-[#BB8E2C]">
                      <MaterialIcon name="schedule" className="text-[28px]" />
                    </div>
                    <h4 className="font-semibold text-[#121110] mb-1">{t.support.hours}</h4>
                    <p className="text-[#62615F]">9 ص - 5 م</p>
                  </div>
                </div>
              </div>

              
              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/help" className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg hover:bg-[#F6F2E6]">
                  <span className="flex items-center gap-2">
                    <MaterialIcon name="help" className="text-[18px] text-[#BB8E2C]" />
                    مركز المساعدة
                  </span>
                </Link>
                <Link href="/contact" className="px-4 py-2 bg-white border border-[#E8DFD3] rounded-lg hover:bg-[#F6F2E6]">
                  <span className="flex items-center gap-2">
                    <MaterialIcon name="contact_mail" className="text-[18px] text-[#BB8E2C]" />
                    تواصل معنا
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}
