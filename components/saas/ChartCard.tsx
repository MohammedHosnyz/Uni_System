import { ReactNode } from 'react';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

interface ChartCardProps {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, icon, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E8DFD3] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center">
            <MaterialIcon name={icon} className="text-[24px] text-[#BB8E2C]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#121110]">{title}</h3>
            <p className="text-sm text-[#62615F]">{subtitle}</p>
          </div>
        </div>
        <button className="text-[#62615F] hover:text-[#BB8E2C] transition-colors">
          <MaterialIcon name="more_vert" className="text-[24px]" />
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
}
