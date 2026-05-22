'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined text-[20px] leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

interface AssistantHeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function AssistantHeader({ userName = 'أ. محمد أحمد', onLogout }: AssistantHeaderProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <header className={`${cairo.className} bg-white shadow-md sticky top-0 z-50`} dir="rtl">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      />

      <div className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110]">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="mailto:info@aun.edu.eg" className="hover:text-white transition-colors flex items-center gap-2">
                <MaterialIcon name="mail" />
                <span>info@aun.edu.eg</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#121110]/90">مرحباً، {userName}</span>

              <button onClick={handleLogout} className="hover:text-white transition-colors flex items-center gap-2">
                <span>تسجيل الخروج</span>
                <MaterialIcon name="logout" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Link href="/assistant/dashboard" className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain rounded-full border-4 border-[#FCCC03] bg-white p-1"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">جامعة أسيوط الأهلية</h1>
            <p className="text-xs text-[#BB8E2C] font-semibold">كلية الحاسبات والمعلومات - بوابة المعيد</p>
          </div>
        </Link>
      </div>

      <div className="bg-[#FAF7F2] border-t border-[#E8DFD3]">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/assistant/dashboard"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="space_dashboard" className="text-[#BB8E2C]" />
              <span>لوحة التحكم</span>
            </Link>
            <Link
              href="/assistant/courses"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="menu_book" className="text-[#BB8E2C]" />
              <span>المقررات</span>
            </Link>
            <Link
              href="/assistant/attendance"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="how_to_reg" className="text-[#BB8E2C]" />
              <span>الحضور</span>
            </Link>
            <Link
              href="/assistant/assignments"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="assignment" className="text-[#BB8E2C]" />
              <span>الواجبات</span>
            </Link>
            <Link
              href="/assistant/grades"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="grade" className="text-[#BB8E2C]" />
              <span>الدرجات</span>
            </Link>
            <Link
              href="/assistant/schedule"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="calendar_month" className="text-[#BB8E2C]" />
              <span>الجدول</span>
            </Link>
            <Link
              href="/assistant/students"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="group" className="text-[#BB8E2C]" />
              <span>الطلاب</span>
            </Link>
            <Link
              href="/assistant/materials"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="folder" className="text-[#BB8E2C]" />
              <span>المواد</span>
            </Link>
            <Link
              href="/assistant/announcements"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="campaign" className="text-[#BB8E2C]" />
              <span>الإعلانات</span>
            </Link>
            <Link
              href="/assistant/reports"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="analytics" className="text-[#BB8E2C]" />
              <span>التقارير</span>
            </Link>

            <span className="text-[#E8DFD3] px-1">|</span>

            <Link
              href="/assistant/profile"
              className="flex items-center gap-2 hover:text-[#BB8E2C] font-semibold px-3 py-2 rounded-lg hover:bg-white whitespace-nowrap"
            >
              <MaterialIcon name="account_circle" className="text-[#BB8E2C]" />
              <span>الملف الشخصي</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
