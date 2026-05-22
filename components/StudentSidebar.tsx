'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { href: '/student/dashboard', label: 'الرئيسية', icon: '🏠', exact: true },
  { href: '/student/profile', label: 'الملف الشخصي', icon: '👤' },
  { href: '#', label: 'الغياب', icon: '📅', disabled: true },
  { href: '#', label: 'الخدمات', icon: '🛠️', disabled: true },
  { href: '#', label: 'الإرشاد الأكاديمي', icon: '🎓', disabled: true },
  { href: '/student/payments', label: 'الرسوم الدراسية', icon: '💳' },
  { href: '/student/grades', label: 'الدرجات', icon: '📊' },
  { href: '#', label: 'الموقف من التجنيد', icon: '🎖️', disabled: true },
  { href: '#', label: 'النشاط الطلابي', icon: '🎯', disabled: true },
  { href: '#', label: 'الأتوبيس', icon: '🚌', disabled: true },
  { href: '#', label: 'المدن الجامعية', icon: '🏨', disabled: true },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`
        ${cairo.className}
        w-64
        shrink-0
        bg-gradient-to-b from-[#F3EFE7] via-[#ECE4D7] to-[#E0D6C7]
        border-l border-[#D0C4B4]
        shadow-md
        hidden lg:flex
        flex-col
      `}
    >
      <div className="px-5 py-6 border-b border-[#D9CFC1]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#BB8E2C] text-white flex items-center justify-center text-xl font-bold">
            A
          </div>
          <div>
            <p className="text-xs text-[#7A6A57]">نظام الطالب</p>
            <p className="font-bold text-sm text-[#2C2A28]">لوحة تحكم الطالب</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = item.disabled
              ? false
              : item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const baseClasses =
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all';

            const activeClasses =
              'bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] text-white shadow-sm shadow-[#00000033]';

            const inactiveClasses =
              'text-[#3F3A33] hover:bg-[#F8F2E9] hover:text-[#BB8E2C]';

            const disabledClasses =
              'text-[#A39A8E] cursor-not-allowed opacity-70';

            return (
              <li key={item.label}>
                {item.disabled ? (
                  <div className={`${baseClasses} ${disabledClasses}`}>
                    <span className="text-lg w-6 flex justify-center">
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`${baseClasses} ${
                      isActive ? activeClasses : inactiveClasses
                    }`}
                  >
                    <span className="text-lg w-6 flex justify-center">
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-6 rounded-full bg-[#FFD86B]" />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}


