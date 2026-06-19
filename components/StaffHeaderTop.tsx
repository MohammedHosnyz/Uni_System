'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface StaffHeaderTopProps {
  onLogout?: () => void;
  userName?: string;
}

export default function StaffHeaderTop({ onLogout, userName = 'أ. أحمد محمد' }: StaffHeaderTopProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <header className={`${cairo.className} bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50`}>
      {/* Top Bar */}
      <div className="bg-[#1C1917] text-[#E7E5E4]">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-6">
              <a href="mailto:info@aun.edu.eg" className="hover:text-[#FABA19] transition-colors flex items-center gap-1">
                <span>📧</span> info@aun.edu.eg
              </a>
              <a href="tel:+20882411111" className="hover:text-[#FABA19] transition-colors flex items-center gap-1">
                <span>📞</span> 088-2411111
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#E7E5E4]/80">تابعنا</span>
              <a
                href="https://www.facebook.com/AssuitANU"
                className="hover:text-[#FABA19] transition-colors"
                target="_blank"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#FABA19] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/staff/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative w-14 h-14">
              <Image
                src="/logo.png"
                alt="Assiut National University Logo"
                fill
                className="object-contain rounded-full border border-[#FABA19] bg-[#FFFDF8] p-0.5 shadow-sm"
              />
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-[#1C1917]">جامعة أسيوط الأهلية</h1>
              <p className="text-xs text-[#FABA19] font-bold">كلية الحاسبات والمعلومات</p>
              <p className="text-[10px] text-stone-500 font-medium">نظام إدارة الموظفين</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] font-bold px-4 py-2 rounded-lg transition-all shadow-sm text-sm"
            >
              تسجيل الخروج
            </button>
          </nav>

          <button className="md:hidden text-[#1C1917]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
