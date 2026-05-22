'use client';

import Link from 'next/link';
import { Cairo } from 'next/font/google';
import { useTranslations } from '@/lib/useTranslations';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface DashboardFooterProps {
  userRole: 'admin' | 'student' | 'professor' | 'staff';
}

export default function DashboardFooter({ userRole }: DashboardFooterProps) {
  const { t } = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`
        ${cairo.className}
        bg-gradient-to-b 
        from-[#F3EFE7] 
        via-[#E9E3D8] 
        to-[#D6CDC5] 
        text-[#1A1A1A] 
        mt-auto 
        overflow-hidden
      `}
    >
      
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#fff,transparent)]"></div>

      
      <div className="container mx-auto px-4 py-14 relative z-10 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          
          <FooterSection title="النظام الأكاديمي">
            <FooterLink href={`/${userRole}/dashboard`} text="لوحة التحكم" />
            <FooterLink href={`/${userRole}/profile`} text="الملف الشخصي" />
            <FooterLink href={`/${userRole}/settings`} text="الإعدادات" />
          </FooterSection>

          
          <FooterSection title="روابط سريعة">
            {userRole === 'student' && (
              <>
                <FooterLink href="/student/registration" text="تسجيل المواد" />
                <FooterLink href="/student/grades" text="كشف الدرجات" />
                <FooterLink href="/student/schedule" text="الجدول الدراسي" />
              </>
            )}
            {userRole === 'professor' && (
              <>
                <FooterLink href="/professor/courses" text="موادي" />
                <FooterLink href="/professor/students" text="الطلاب" />
                <FooterLink href="/professor/grades" text="إدخال الدرجات" />
              </>
            )}
            {userRole === 'admin' && (
              <>
                <FooterLink href="/admin/users" text="إدارة المستخدمين" />
                <FooterLink href="/admin/courses" text="إدارة المواد" />
                <FooterLink href="/admin/reports" text="التقارير" />
              </>
            )}
            {userRole === 'staff' && (
              <>
                <FooterLink href="/staff/students" text="الطلاب" />
                <FooterLink href="/staff/registrations" text="التسجيلات" />
                <FooterLink href="/staff/reports" text="التقارير" />
              </>
            )}
          </FooterSection>

          
          <FooterSection title="الدعم والمساعدة">
            <FooterLink href="/help" text="مركز المساعدة" />
            <FooterLink href="/support" text="الدعم الفني" />
            <FooterLink href="/contact" text="اتصل بنا" />
          </FooterSection>

          
          <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00000022] rounded-xl p-2">
            <h3 className="text-xl font-bold mb-4 text-[#B73535]">تواصل معنا</h3>
            <ul className="space-y-3 text-[#444]">
              <li className="flex items-start gap-2 animate-slideUp">
                <span>📍</span>
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2 animate-slideUp">
                <span>📞</span>
                <a href="tel:+20882411111" className="hover:text-[#D4A017] transition">
                  088-2411111
                </a>
              </li>
              <li className="flex items-center gap-2 animate-slideUp">
                <span>📧</span>
                <a href="mailto:info@aun.edu.eg" className="hover:text-[#D4A017] transition">
                  info@aun.edu.eg
                </a>
              </li>

              
              <li className="flex items-center gap-4 mt-4 animate-fadeIn">
                {['fb', 'tw', 'ig'].map((_, i) => (
                  <a
                    key={i}
                    href="#"
                    className="
                      hover:text-[#D4A017] 
                      transition transform hover:scale-125 hover:rotate-3
                    "
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" opacity="0.15"></circle>
                      <path d="M12 2C6.48 2..." />
                    </svg>
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="bg-[#C9C0B6] border-t border-[#BEB5AA] relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#555]">
            <div className="flex items-center gap-4 animate-fadeIn">
              <span>{t.footer.copyright}</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">{t.footer.allRightsReserved}</span>
            </div>

            <div className="flex items-center gap-6 animate-slideUp">
              <FooterLink href="/sitemap" text={t.footer.bottomLinks.sitemap} />
              <FooterLink href="/privacy" text={t.footer.bottomLinks.privacy} />
              <FooterLink href="/terms" text={t.footer.bottomLinks.terms} />
              <FooterLink href="/accessibility" text={t.footer.bottomLinks.accessibility} />
              <FooterLink href="/contact" text={t.footer.bottomLinks.contact} />
            </div>
          </div>

          
          <div className="text-center mt-4">
            <button
              onClick={scrollToTop}
              className="
                text-[#666] 
                hover:text-[#B73535] 
                transition 
                text-sm 
                animate-fadeIn 
                hover:scale-110
              "
            >
              {t.footer.backToTop}
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
      <h3 className="text-xl font-bold mb-4 text-[#B73535]">{title}</h3>
      <ul className="space-y-2 text-[#444]">{children}</ul>
    </div>
  );
}


function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li className="transition transform hover:translate-x-1">
      <Link href={href} className="hover:text-[#D4A017] transition">
        {text}
      </Link>
    </li>
  );
}
