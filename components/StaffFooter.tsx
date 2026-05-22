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
    <footer className={`${cairo.className} bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] mt-auto`}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain rounded-full border-2 border-white bg-white p-1"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">جامعة أسيوط الأهلية</h3>
                <p className="text-sm text-[#121110]/80">كلية الحاسبات والمعلومات</p>
              </div>
            </div>
            <p className="text-[#121110]/90 text-sm leading-relaxed">
              نظام إدارة الموظفين الإلكتروني - جامعة أسيوط الاهلية
              <br />
              منصة شاملة لإدارة الشؤون الإدارية والأكاديمية
            </p>
          </div>

          
          <div>
            <h4 className="font-semibold mb-3 text-[#121110]">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/staff/students" className="hover:text-white transition-colors">إدارة الطلاب</Link></li>
              <li><Link href="/staff/registrations" className="hover:text-white transition-colors">إدارة التسجيل</Link></li>
              <li><Link href="/staff/schedules" className="hover:text-white transition-colors">إدارة الجداول</Link></li>
              <li><Link href="/staff/reports" className="hover:text-white transition-colors">التقارير</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold mb-3 text-[#121110]">تواصل معنا</h4>
            <ul className="space-y-2 text-sm">
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

        
        <div className="border-t border-[#121110]/20 mt-6 pt-4 text-center">
          <p className="text-[#121110]/80 text-sm">
            © 2026 جامعة أسيوط الاهلية - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
