'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

export default function StaffFooter() {
  return (
    <footer className={`${cairo.className} bg-[#1C1917] text-[#E7E5E4] mt-auto border-t border-stone-850`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain rounded-full border border-[#FABA19] bg-[#FFFDF8] p-0.5"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">جامعة أسيوط الأهلية</h3>
                <p className="text-xs text-[#FABA19] font-bold">كلية الحاسبات والمعلومات</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              نظام إدارة الموظفين الإلكتروني - جامعة أسيوط الأهلية
              <br />
              منصة شاملة لإدارة الشؤون الإدارية والأكاديمية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/staff/students" className="hover:text-[#FABA19] transition-colors">إدارة الطلاب</Link></li>
              <li><Link href="/staff/registrations" className="hover:text-[#FABA19] transition-colors">إدارة التسجيل</Link></li>
              <li><Link href="/staff/schedules" className="hover:text-[#FABA19] transition-colors">إدارة الجداول</Link></li>
              <li><Link href="/staff/reports" className="hover:text-[#FABA19] transition-colors">التقارير</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-3 text-white">تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>info@aun.edu.eg</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>088-2411111</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>أسيوط، مصر</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-6 pt-4 text-center">
          <p className="text-stone-500 text-sm">
            © 2026 جامعة أسيوط الأهلية - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
