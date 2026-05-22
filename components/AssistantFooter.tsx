'use client';

import Link from 'next/link';

export default function AssistantFooter() {
  return (
    <footer
      className="
        bg-gradient-to-b 
        from-[#F3EFE7] 
        via-[#E9E3D8] 
        to-[#D6CDC5] 
        text-[#1A1A1A] 
        mt-auto 
        overflow-hidden
      "
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#fff,transparent)]"></div>

      <div className="container mx-auto px-4 py-14 relative z-10 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <FooterSection title="صفحات المعيد">
            <FooterLink href="/assistant/dashboard" text="لوحة التحكم" />
            <FooterLink href="/assistant/courses" text="المقررات" />
            <FooterLink href="/assistant/students" text="الطلاب" />
            <FooterLink href="/assistant/schedule" text="الجدول الدراسي" />
            <FooterLink href="/assistant/reports" text="التقارير" />
          </FooterSection>

          
          <FooterSection title="إجراءات سريعة">
            <FooterLink href="/assistant/attendance" text="تسجيل الحضور" />
            <FooterLink href="/assistant/grades" text="إدخال الدرجات" />
            <FooterLink href="/assistant/materials" text="المواد التعليمية" />
            <FooterLink href="/assistant/announcements" text="الإعلانات" />
            <FooterLink href="/assistant/assignments" text="الواجبات" />
          </FooterSection>

          
          <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00000022] rounded-xl p-2">
            <h3 className="text-xl font-bold mb-4 text-[#BB8E2C]">تواصل معنا</h3>

            <ul className="space-y-3 text-[#444]">
              <li className="flex items-start gap-2 animate-slideUp">
                <span></span> <span>أسيوط الجديدة، أسيوط، مصر</span>
              </li>

              <li className="flex items-center gap-2 animate-slideUp">
                <a href="tel:+20882411111" className="hover:text-[#BB8E2C] transition">088-2411111</a>
              </li>

              <li className="flex items-center gap-2 animate-slideUp">
                <a href="mailto:info@aun.edu.eg" className="hover:text-[#BB8E2C] transition">
                  info@aun.edu.eg
                </a>
              </li>

              
              <li className="flex items-center gap-4 mt-4 animate-fadeIn">
                <a
                  href="https://www.facebook.com/AssuitANU"
                  target="_blank"
                  className="hover:text-[#BB8E2C] transition transform hover:scale-125"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="bg-[#C9C0B6] border-t border-[#BEB5AA] relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#555]">
            <div className="flex items-center gap-4 animate-fadeIn">
              <span>© 2026 جامعة أسيوط الأهلية</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">جميع الحقوق محفوظة</span>
            </div>

            <div className="flex items-center gap-6 animate-slideUp">
              <FooterLink href="/sitemap" text="خريطة الموقع" />
              <FooterLink href="/privacy" text="سياسة الخصوصية" />
              <FooterLink href="/accessibility" text="إمكانية الوصول" />
              <FooterLink href="/contact" text="اتصل بنا" />
            </div>
          </div>

          
          <div className="text-center mt-4">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="
                text-[#666] 
                hover:text-[#B73535] 
                transition 
                text-sm 
                animate-fadeIn 
                hover:scale-110
              "
            >
              ↑ العودة للأعلى
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00000022] rounded-xl p-2">
      <h3 className="text-xl font-bold mb-4 text-[#BB8E2C]">{title}</h3>
      <ul className="space-y-2 text-[#444]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li className="transition transform hover:translate-x-1">
      <Link href={href} className="hover:text-[#BB8E2C] transition">
        {text}
      </Link>
    </li>
  );
}
