import Link from 'next/link';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function SaaSDemoLink() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/saas"
        className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
      >
        <MaterialIcon name="rocket_launch" className="text-[24px]" />
        <div className="text-left">
          <div className="text-sm font-extrabold">View SaaS Demo</div>
          <div className="text-xs opacity-80">Premium Landing & Dashboard</div>
        </div>
      </Link>
    </div>
  );
}
