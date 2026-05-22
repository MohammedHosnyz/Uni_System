const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  iconColor?: string;
}

export default function DashboardCard({
  title,
  value,
  change,
  changeType,
  icon,
  iconColor = 'text-[#BB8E2C]',
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E8DFD3] group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#BB8E2C] group-hover:to-[#FCCC03] transition-all">
          <MaterialIcon name={icon} className={`text-[28px] ${iconColor} group-hover:text-white transition-colors`} />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
            changeType === 'increase'
              ? 'bg-[#10b981]/10 text-[#10b981]'
              : 'bg-[#ef4444]/10 text-[#ef4444]'
          }`}
        >
          <MaterialIcon
            name={changeType === 'increase' ? 'trending_up' : 'trending_down'}
            className="text-[16px]"
          />
          <span>{change}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#62615F] mb-1">{title}</h3>
        <p className="text-3xl font-extrabold text-[#121110]">{value}</p>
      </div>
    </div>
  );
}
