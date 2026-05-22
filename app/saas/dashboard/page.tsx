'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/saas/DashboardLayout';
import DashboardCard from '@/components/saas/DashboardCard';
import ChartCard from '@/components/saas/ChartCard';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#121110] mb-2">Dashboard</h1>
        <p className="text-[#62615F]">Welcome back! Here's what's happening with your projects.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value="$45,231"
          change="+20.1%"
          changeType="increase"
          icon="payments"
          iconColor="text-[#BB8E2C]"
        />
        <DashboardCard
          title="Active Users"
          value="2,345"
          change="+15.3%"
          changeType="increase"
          icon="group"
          iconColor="text-[#14b8a6]"
        />
        <DashboardCard
          title="New Orders"
          value="156"
          change="-5.2%"
          changeType="decrease"
          icon="shopping_cart"
          iconColor="text-[#f59e0b]"
        />
        <DashboardCard
          title="Conversion Rate"
          value="3.24%"
          change="+2.4%"
          changeType="increase"
          icon="trending_up"
          iconColor="text-[#10b981]"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue for the last 6 months"
          icon="bar_chart"
        >
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[65, 78, 85, 72, 90, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-[#BB8E2C] to-[#FCCC03] rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-[#62615F] font-medium">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="User Activity"
          subtitle="Active users over the past week"
          icon="timeline"
        >
          <div className="h-64 flex items-end justify-between gap-1 px-4">
            {[45, 52, 48, 65, 58, 72, 68].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-[#14b8a6] to-[#5eead4] rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-[#62615F] font-medium">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-[#E8DFD3] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center">
                  <MaterialIcon name="history" className="text-[24px] text-[#BB8E2C]" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#121110]">Recent Activity</h2>
                  <p className="text-sm text-[#62615F]">Latest updates from your team</p>
                </div>
              </div>
              <button className="text-[#BB8E2C] hover:text-[#D6AE45] font-semibold text-sm transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              <ActivityItem
                icon="person_add"
                iconBg="bg-[#F6F2E6]"
                iconColor="text-[#BB8E2C]"
                title="New user registered"
                description="John Doe joined your platform"
                time="2 minutes ago"
              />
              <ActivityItem
                icon="shopping_bag"
                iconBg="bg-[#F6F2E6]"
                iconColor="text-[#14b8a6]"
                title="New order received"
                description="Order #1234 from Sarah Johnson"
                time="15 minutes ago"
              />
              <ActivityItem
                icon="payments"
                iconBg="bg-[#F6F2E6]"
                iconColor="text-[#f59e0b]"
                title="Payment processed"
                description="$299.00 received from Michael Chen"
                time="1 hour ago"
              />
              <ActivityItem
                icon="bug_report"
                iconBg="bg-[#F6F2E6]"
                iconColor="text-[#ef4444]"
                title="Bug report submitted"
                description="Issue #456 reported by Emily Rodriguez"
                time="3 hours ago"
              />
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md border border-[#E8DFD3] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center">
                <MaterialIcon name="bolt" className="text-[24px] text-[#BB8E2C]" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#121110]">Quick Actions</h2>
                <p className="text-sm text-[#62615F]">Common tasks</p>
              </div>
            </div>

            <div className="space-y-3">
              <QuickActionButton icon="add" label="Create New Project" />
              <QuickActionButton icon="group_add" label="Invite Team Member" />
              <QuickActionButton icon="upload_file" label="Upload Document" />
              <QuickActionButton icon="settings" label="Manage Settings" />
              <QuickActionButton icon="help" label="Get Support" />
            </div>
          </div>

          
          <div className="bg-gradient-to-br from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] rounded-2xl shadow-md p-6 mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                <MaterialIcon name="person" className="text-[32px] text-[#BB8E2C]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#121110]">Alex Morgan</h3>
                <p className="text-sm text-[#121110]/80">Premium Member</p>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#121110]">Profile Completion</span>
                <span className="text-sm font-bold text-[#121110]">85%</span>
              </div>
              <div className="w-full bg-white/40 rounded-full h-2">
                <div className="bg-[#121110] h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ActivityItem({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  time,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#F6F2E6] transition-colors">
      <div className={`w-10 h-10 rounded-xl ${iconBg} border border-[#E8DFD3] flex items-center justify-center flex-shrink-0`}>
        <MaterialIcon name={icon} className={`text-[20px] ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#121110] text-sm mb-1">{title}</h4>
        <p className="text-sm text-[#62615F] truncate">{description}</p>
        <p className="text-xs text-[#62615F] mt-1">{time}</p>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F6F2E6] hover:bg-[#EEEDE4] border border-[#E8DFD3] transition-all hover:shadow-md group">
      <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD3] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#BB8E2C] group-hover:to-[#FCCC03] transition-all">
        <MaterialIcon name={icon} className="text-[20px] text-[#BB8E2C] group-hover:text-white transition-colors" />
      </div>
      <span className="font-semibold text-[#121110] text-sm">{label}</span>
    </button>
  );
}
