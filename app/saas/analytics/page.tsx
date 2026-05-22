'use client';

import DashboardLayout from '@/components/saas/DashboardLayout';
import ChartCard from '@/components/saas/ChartCard';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#121110] mb-2">Analytics</h1>
        <p className="text-[#62615F]">Detailed insights and performance metrics</p>
      </div>

      
      <div className="flex items-center gap-4 mb-8">
        <button className="px-4 py-2 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] font-bold rounded-xl shadow-md">
          Last 7 Days
        </button>
        <button className="px-4 py-2 bg-white text-[#121110] font-semibold rounded-xl border border-[#E8DFD3] hover:bg-[#F6F2E6] transition-all">
          Last 30 Days
        </button>
        <button className="px-4 py-2 bg-white text-[#121110] font-semibold rounded-xl border border-[#E8DFD3] hover:bg-[#F6F2E6] transition-all">
          Last 90 Days
        </button>
        <button className="px-4 py-2 bg-white text-[#121110] font-semibold rounded-xl border border-[#E8DFD3] hover:bg-[#F6F2E6] transition-all">
          Custom Range
        </button>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Page Views" subtitle="Total views over time" icon="visibility">
          <div className="h-64 flex items-center justify-center text-[#62615F]">
            <div className="text-center">
              <MaterialIcon name="show_chart" className="text-[80px] text-[#BB8E2C]/30 mb-4" />
              <p className="font-semibold">Chart visualization would go here</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="User Sessions" subtitle="Active sessions by hour" icon="schedule">
          <div className="h-64 flex items-center justify-center text-[#62615F]">
            <div className="text-center">
              <MaterialIcon name="timeline" className="text-[80px] text-[#14b8a6]/30 mb-4" />
              <p className="font-semibold">Chart visualization would go here</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Conversion Funnel" subtitle="User journey analysis" icon="filter_alt">
          <div className="h-64 flex items-center justify-center text-[#62615F]">
            <div className="text-center">
              <MaterialIcon name="funnel_chart" className="text-[80px] text-[#f59e0b]/30 mb-4" />
              <p className="font-semibold">Chart visualization would go here</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Traffic Sources" subtitle="Where your users come from" icon="public">
          <div className="h-64 flex items-center justify-center text-[#62615F]">
            <div className="text-center">
              <MaterialIcon name="pie_chart" className="text-[80px] text-[#10b981]/30 mb-4" />
              <p className="font-semibold">Chart visualization would go here</p>
            </div>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
