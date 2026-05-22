'use client';

import DashboardLayout from '@/components/saas/DashboardLayout';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#121110] mb-2">Projects</h1>
          <p className="text-[#62615F]">Manage and track all your projects</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] font-bold rounded-xl shadow-md hover:shadow-xl transition-all">
          <MaterialIcon name="add" className="text-[24px]" />
          <span>New Project</span>
        </button>
      </div>

      
      <div className="flex items-center gap-4 mb-8 border-b border-[#E8DFD3]">
        <button className="px-4 py-3 font-bold text-[#121110] border-b-2 border-[#BB8E2C]">
          All Projects
        </button>
        <button className="px-4 py-3 font-semibold text-[#62615F] hover:text-[#121110] transition-colors">
          Active
        </button>
        <button className="px-4 py-3 font-semibold text-[#62615F] hover:text-[#121110] transition-colors">
          Completed
        </button>
        <button className="px-4 py-3 font-semibold text-[#62615F] hover:text-[#121110] transition-colors">
          Archived
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="Website Redesign"
          description="Complete overhaul of company website with modern design"
          status="In Progress"
          statusColor="bg-[#14b8a6]"
          progress={65}
          team={5}
          tasks={12}
          dueDate="Dec 15, 2024"
        />
        <ProjectCard
          title="Mobile App Development"
          description="Native iOS and Android app for customer engagement"
          status="In Progress"
          statusColor="bg-[#14b8a6]"
          progress={40}
          team={8}
          tasks={24}
          dueDate="Jan 30, 2025"
        />
        <ProjectCard
          title="Marketing Campaign"
          description="Q4 marketing campaign across all channels"
          status="Planning"
          statusColor="bg-[#f59e0b]"
          progress={15}
          team={4}
          tasks={8}
          dueDate="Nov 1, 2024"
        />
        <ProjectCard
          title="API Integration"
          description="Third-party API integration for payment processing"
          status="In Progress"
          statusColor="bg-[#14b8a6]"
          progress={80}
          team={3}
          tasks={6}
          dueDate="Oct 20, 2024"
        />
        <ProjectCard
          title="Database Migration"
          description="Migrate from MySQL to PostgreSQL for better performance"
          status="Completed"
          statusColor="bg-[#10b981]"
          progress={100}
          team={2}
          tasks={10}
          dueDate="Sep 30, 2024"
        />
        <ProjectCard
          title="Security Audit"
          description="Comprehensive security review and penetration testing"
          status="Planning"
          statusColor="bg-[#f59e0b]"
          progress={5}
          team={3}
          tasks={15}
          dueDate="Dec 1, 2024"
        />
      </div>
    </DashboardLayout>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  progress: number;
  team: number;
  tasks: number;
  dueDate: string;
}

function ProjectCard({ title, description, status, statusColor, progress, team, tasks, dueDate }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E8DFD3] group">
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#BB8E2C] group-hover:to-[#FCCC03] transition-all">
          <MaterialIcon name="folder" className="text-[28px] text-[#BB8E2C] group-hover:text-white transition-colors" />
        </div>
        <span className={`${statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {status}
        </span>
      </div>

      
      <h3 className="text-lg font-extrabold text-[#121110] mb-2">{title}</h3>
      <p className="text-sm text-[#62615F] mb-4 line-clamp-2">{description}</p>

      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#62615F]">Progress</span>
          <span className="text-xs font-bold text-[#121110]">{progress}%</span>
        </div>
        <div className="w-full bg-[#F6F2E6] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#BB8E2C] to-[#FCCC03] h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD3]">
        <div className="flex items-center gap-4 text-xs text-[#62615F]">
          <div className="flex items-center gap-1">
            <MaterialIcon name="group" className="text-[16px]" />
            <span>{team}</span>
          </div>
          <div className="flex items-center gap-1">
            <MaterialIcon name="task" className="text-[16px]" />
            <span>{tasks}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#62615F]">
          <MaterialIcon name="calendar_today" className="text-[16px]" />
          <span>{dueDate}</span>
        </div>
      </div>
    </div>
  );
}
