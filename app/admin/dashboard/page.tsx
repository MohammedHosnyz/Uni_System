'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  Plus,
  Users,
  BookOpen,
  Edit,
  Trash2,
  CreditCard,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  FileText,
  BarChart3,
  GraduationCap,
  Clock,
  MapPin,
  Calendar,
  Search,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { SessionUser } from '../../../types';

// ─── Helper Components ───────────────────────────────────────────────────────

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
        active
          ? 'bg-[#FABA19] text-[#1C1917] shadow-sm'
          : 'text-stone-600 hover:text-[#FABA19] hover:bg-amber-50/50'
      }`}
    >
      {children}
    </button>
  );
}

// ─── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { titleAr: "إجمالي الطلاب", titleEn: "Total Students", value: "5,234", change: "+12%", icon: "🎓", color: "text-blue-600 bg-blue-50 border-blue-100" },
          { titleAr: "أعضاء هيئة التدريس", titleEn: "Faculty Staff", value: "287", change: "+5%", icon: "👨‍🏫", color: "text-green-600 bg-green-50 border-green-100" },
          { titleAr: "المواد الدراسية", titleEn: "Courses", value: "156", change: "+8", icon: "📚", color: "text-purple-600 bg-purple-50 border-purple-100" },
          { titleAr: "معدل النجاح", titleEn: "Pass Rate", value: "94.5%", change: "+2.3%", icon: "📊", color: "text-[#FABA19] bg-amber-50 border-amber-100" },
        ].map((s, idx) => (
          <Card key={idx} className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${s.color}`}>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs font-semibold gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {s.change}
                </Badge>
              </div>
              <p className="text-sm text-stone-500 font-medium">{t(s.titleAr, s.titleEn)}</p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold text-stone-800">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-2 border-b border-stone-50">
            <CardTitle className="text-base font-bold text-[#1C1917]">{t("توزيع الطلاب حسب الكليات", "Student Distribution by Faculty")}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {[
              { labelAr: "كلية الهندسة", labelEn: "Faculty of Engineering", value: 45, color: "blue" },
              { labelAr: "كلية الطب", labelEn: "Faculty of Medicine", value: 30, color: "red" },
              { labelAr: "كلية التجارة", labelEn: "Faculty of Business", value: 15, color: "green" },
              { labelAr: "كلية الآداب", labelEn: "Faculty of Arts", value: 10, color: "purple" },
            ].map((fac, idx) => (
              <div key={idx}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-stone-600 font-medium">{t(fac.labelAr, fac.labelEn)}</span>
                  <span className="font-semibold text-stone-800">{fac.value}%</span>
                </div>
                <Progress value={fac.value} className="h-2 bg-stone-100 [&>div]:bg-[#FABA19]" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-2 border-b border-stone-50">
            <CardTitle className="text-base font-bold text-[#1C1917]">{t("الأنشطة الأخيرة", "Recent Activities")}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {[
              { icon: "✅", textAr: "تم تسجيل 45 طالب جديد", textEn: "45 new students registered", timeAr: "منذ ساعتين", timeEn: "2 hours ago" },
              { icon: "📝", textAr: "تم رفع درجات مادة CS101", textEn: "CS101 course grades uploaded", timeAr: "منذ 4 ساعات", timeEn: "4 hours ago" },
              { icon: "📅", textAr: "تحديث الجدول الدراسي للفصل الحالي", textEn: "Current semester class schedule updated", timeAr: "منذ يوم", timeEn: "1 day ago" },
              { icon: "💰", textAr: "تم تسجيل 120 عملية دفع", textEn: "120 student payment transactions recorded", timeAr: "منذ يومين", timeEn: "2 days ago" },
            ].map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50/60 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#FABA19]">
                  <span className="text-lg">{act.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-700 text-sm font-medium leading-relaxed">{t(act.textAr, act.textEn)}</p>
                  <p className="text-stone-400 text-xs mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {t(act.timeAr, act.timeEn)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Users Tab ───────────────────────────────────────────────────────────────

const usersData = [
  { id: "001", nameAr: "أحمد محمد علي", nameEn: "Ahmed Mohamed Ali", email: "ahmed@uni.edu", roleAr: "طالب", roleEn: "Student", role: "student", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "002", nameAr: "د. فاطمة حسن", nameEn: "Dr. Fatima Hassan", email: "fatima@uni.edu", roleAr: "أستاذ", roleEn: "Professor", role: "professor", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "003", nameAr: "محمد أحمد", nameEn: "Mohamed Ahmed", email: "m.ahmed@uni.edu", roleAr: "مسؤول", roleEn: "Admin", role: "admin", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "004", nameAr: "سارة خالد", nameEn: "Sara Khaled", email: "sara@uni.edu", roleAr: "مالية", roleEn: "Finance", role: "finance", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "005", nameAr: "يوسف إبراهيم", nameEn: "Yousef Ibrahim", email: "yousef@uni.edu", roleAr: "طالب", roleEn: "Student", role: "student", statusAr: "معلق", statusEn: "Suspended", status: "suspended" },
  { id: "006", nameAr: "د. خالد عمر", nameEn: "Dr. Khaled Omar", email: "khaled@uni.edu", roleAr: "أستاذ", roleEn: "Professor", role: "professor", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "007", nameAr: "نورا حسن", nameEn: "Noura Hassan", email: "noura@uni.edu", roleAr: "طالب", roleEn: "Student", role: "student", statusAr: "نشط", statusEn: "Active", status: "active" },
  { id: "008", nameAr: "عمر سعيد", nameEn: "Omar Saeed", email: "omar@uni.edu", roleAr: "طالب", roleEn: "Student", role: "student", statusAr: "خريج", statusEn: "Graduated", status: "graduated" },
];

const roleColors: Record<string, string> = {
  student: "bg-blue-50 text-blue-700 border border-blue-100",
  professor: "bg-purple-50 text-purple-700 border border-purple-100",
  admin: "bg-amber-50 text-amber-700 border border-amber-100",
  finance: "bg-green-50 text-green-700 border border-green-100",
};

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700 border border-green-100",
  suspended: "bg-red-50 text-red-700 border border-red-100",
  graduated: "bg-stone-100 text-stone-600 border border-stone-200",
};

function UsersTab() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = usersData.filter(
    (u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.nameAr.includes(search) ||
        u.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        u.email.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            {t("إدارة المستخدمين", "User Management")}
          </h1>
          <p className="mt-1 text-stone-500">
            {t("إدارة حسابات وأدوار المستخدمين", "Manage user accounts and roles")}
          </p>
        </div>
        <Button className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816]">
          <Plus className="h-4 w-4" />
          {t("إضافة مستخدم", "Add User")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder={t("بحث...", "Search...")}
            className="ps-10 border-stone-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-40 h-10 px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FABA19] text-stone-700 font-medium"
        >
          <option value="all">{t("جميع الأدوار", "All Roles")}</option>
          <option value="student">{t("طالب", "Student")}</option>
          <option value="professor">{t("أستاذ", "Professor")}</option>
          <option value="admin">{t("مسؤول", "Admin")}</option>
          <option value="finance">{t("مالية", "Finance")}</option>
        </select>
      </div>

      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow>
                <TableHead className="font-semibold text-stone-700">{t("الاسم", "Name")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("البريد", "Email")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الدور", "Role")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الحالة", "Status")}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="hover:bg-stone-50/20">
                  <TableCell className="font-semibold text-stone-850">{t(user.nameAr, user.nameEn)}</TableCell>
                  <TableCell className="text-stone-500 font-medium">{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={roleColors[user.role]}>{t(user.roleAr, user.roleEn)}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={statusColors[user.status]}>{t(user.statusAr, user.statusEn)}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="font-medium text-stone-700">{t("تعديل", "Edit")}</DropdownMenuItem>
                        <DropdownMenuItem className="font-medium text-stone-700">{t("تغيير الدور", "Change Role")}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 font-medium">{t("تعليق", "Suspend")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Faculties Tab ───────────────────────────────────────────────────────────

const faculties = [
  { nameAr: "كلية الطب", nameEn: "Medicine", depts: 8, students: 2500, profs: 120, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "كلية الحاسبات", nameEn: "Computing", depts: 5, students: 2200, profs: 85, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "كلية التجارة", nameEn: "Business", depts: 7, students: 2000, profs: 90, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "كلية العلوم", nameEn: "Sciences", depts: 6, students: 1800, profs: 75, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "كلية الحقوق", nameEn: "Law", depts: 4, students: 1500, profs: 60, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "كلية الفنون", nameEn: "Arts & Design", depts: 5, students: 1000, profs: 45, statusAr: "نشط", statusEn: "Active" },
];

function FacultiesTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            {t("إدارة الكليات والأقسام", "Faculty & Department Management")}
          </h1>
          <p className="mt-1 text-stone-500">
            {t("إضافة وتعديل الكليات والأقسام العلمية", "Add and manage faculties and departments")}
          </p>
        </div>
        <Button className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816]">
          <Plus className="h-4 w-4" />
          {t("إضافة كلية", "Add Faculty")}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {faculties.map((fac) => (
          <Card key={fac.nameEn} className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800">{t(fac.nameAr, fac.nameEn)}</h3>
                    <Badge variant="secondary" className="mt-1 bg-green-50 text-green-700 border border-green-100">{t(fac.statusAr, fac.statusEn)}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-amber-600"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{fac.depts} {t("أقسام", "Depts")}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{fac.students.toLocaleString()} {t("طالب", "Students")}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{fac.profs} {t("أستاذ", "Profs")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Programs Tab ────────────────────────────────────────────────────────────

const programs = [
  { nameAr: "بكالوريوس الطب", nameEn: "MBBS", facultyAr: "الطب", facultyEn: "Medicine", credits: 240, students: 450, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "بكالوريوس علوم الحاسب", nameEn: "BSc CS", facultyAr: "الحاسبات", facultyEn: "Computing", credits: 140, students: 650, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "بكالوريوس الذكاء الاصطناعي", nameEn: "BSc AI", facultyAr: "الحاسبات", facultyEn: "Computing", credits: 138, students: 350, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "ماجستير علوم البيانات", nameEn: "MSc Data Science", facultyAr: "الحاسبات", facultyEn: "Computing", credits: 36, students: 45, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "بكالوريوس المحاسبة", nameEn: "BSc Accounting", facultyAr: "التجارة", facultyEn: "Business", credits: 136, students: 520, statusAr: "نشط", statusEn: "Active" },
  { nameAr: "بكالوريوس القانون", nameEn: "LLB", facultyAr: "الحقوق", facultyEn: "Law", credits: 144, students: 400, statusAr: "نشط", statusEn: "Active" },
];

function ProgramsTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">{t("إدارة البرامج والمقررات", "Programs & Courses")}</h1>
          <p className="mt-1 text-stone-500">{t("إضافة وتعديل البرامج والمقررات الأكاديمية", "Manage academic programs and courses")}</p>
        </div>
        <Button className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816]"><Plus className="h-4 w-4" />{t("إضافة برنامج", "Add Program")}</Button>
      </div>

      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-stone-50">
          <CardTitle className="flex items-center gap-2 text-base"><BookOpen className="h-5 w-5 text-[#FABA19]" />{t("البرامج الأكاديمية", "Academic Programs")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow>
                <TableHead className="font-semibold text-stone-700">{t("البرنامج", "Program")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("الكلية", "Faculty")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الساعات", "Credits")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الطلاب", "Students")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الحالة", "Status")}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((p) => (
                <TableRow key={p.nameEn} className="hover:bg-stone-50/20">
                  <TableCell className="font-semibold text-stone-850">{t(p.nameAr, p.nameEn)}</TableCell>
                  <TableCell className="text-stone-500 font-medium">{t(p.facultyAr, p.facultyEn)}</TableCell>
                  <TableCell className="text-center font-semibold text-stone-800">{p.credits}</TableCell>
                  <TableCell className="text-center font-semibold text-stone-800">{p.students}</TableCell>
                  <TableCell className="text-center"><Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-100">{t(p.statusAr, p.statusEn)}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-600"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="font-medium text-stone-700">{t("تعديل", "Edit")}</DropdownMenuItem>
                        <DropdownMenuItem className="font-medium text-stone-700">{t("المقررات", "Courses")}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 font-medium">{t("حذف", "Delete")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Schedules Tab ───────────────────────────────────────────────────────────

const scheduleEntries = [
  { courseAr: "حسب ٣٠١ - هياكل البيانات", courseEn: "CS 301 - Data Structures", profAr: "د. محمد سعيد", profEn: "Dr. M. Saeed", dayAr: "أحد/ثلاثاء", dayEn: "Sun/Tue", time: "08:00-09:30", roomAr: "ق١٢٠", roomEn: "R120", capacity: 60, enrolled: 42 },
  { courseAr: "حسب ٣٠٥ - قواعد البيانات", courseEn: "CS 305 - Databases", profAr: "د. فاطمة حسن", profEn: "Dr. F. Hassan", dayAr: "اثنين/أربعاء", dayEn: "Mon/Wed", time: "10:00-11:30", roomAr: "ق٢٠٥", roomEn: "R205", capacity: 50, enrolled: 42 },
  { courseAr: "ريض ٢٠٣ - رياضيات متقطعة", courseEn: "MATH 203 - Discrete Math", profAr: "د. أحمد كمال", profEn: "Dr. A. Kamal", dayAr: "أحد/ثلاثاء", dayEn: "Sun/Tue", time: "12:00-13:30", roomAr: "ق٣١٠", roomEn: "R310", capacity: 80, enrolled: 65 },
  { courseAr: "حسب ٣١٠ - شبكات حاسب", courseEn: "CS 310 - Networks", profAr: "د. خالد عمر", profEn: "Dr. K. Omar", dayAr: "اثنين/أربعاء", dayEn: "Mon/Wed", time: "14:00-15:30", roomAr: "م١٠١", roomEn: "L101", capacity: 30, enrolled: 28 },
  { courseAr: "حسب ٣٢٠ - هندسة البرمجيات", courseEn: "CS 320 - Software Eng.", profAr: "د. فاطمة حسن", profEn: "Dr. F. Hassan", dayAr: "أحد/ثلاثاء", dayEn: "Sun/Tue", time: "08:00-09:30", roomAr: "ق١٣٠", roomEn: "R130", capacity: 70, enrolled: 61 },
];

function SchedulesTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">{t("الجداول والقاعات", "Schedules & Classrooms")}</h1>
          <p className="mt-1 text-stone-500">{t("إدارة الجداول الدراسية وتوزيع القاعات", "Manage class schedules and room assignments")}</p>
        </div>
        <Button className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816]"><Plus className="h-4 w-4" />{t("إضافة جدول", "Add Schedule")}</Button>
      </div>

      <div className="flex gap-3">
        <select
          defaultValue="computing"
          className="w-48 h-10 px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FABA19] text-stone-700 font-medium"
        >
          <option value="computing">{t("كلية الحاسبات", "Computing")}</option>
          <option value="medicine">{t("كلية الطب", "Medicine")}</option>
          <option value="business">{t("كلية التجارة", "Business")}</option>
        </select>
      </div>

      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-stone-50">
          <CardTitle className="flex items-center gap-2 text-base"><Clock className="h-5 w-5 text-[#FABA19]" />{t("جدول المحاضرات", "Lecture Schedule")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow>
                <TableHead className="font-semibold text-stone-700">{t("المقرر", "Course")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("المحاضر", "Instructor")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("اليوم", "Day")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("الوقت", "Time")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("القاعة", "Room")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الإشغال", "Occupancy")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleEntries.map((entry, i) => (
                <TableRow key={i} className="hover:bg-stone-50/20">
                  <TableCell className="font-semibold text-stone-850">{t(entry.courseAr, entry.courseEn)}</TableCell>
                  <TableCell className="text-stone-500 font-medium">{t(entry.profAr, entry.profEn)}</TableCell>
                  <TableCell className="font-medium text-stone-600">{t(entry.dayAr, entry.dayEn)}</TableCell>
                  <TableCell><Badge variant="secondary" className="gap-1 bg-amber-50 text-amber-705 border border-amber-100"><Clock className="h-3 w-3" />{entry.time}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="gap-1 border-stone-200 font-medium text-stone-600"><MapPin className="h-3 w-3 text-stone-400" />{t(entry.roomAr, entry.roomEn)}</Badge></TableCell>
                  <TableCell className="text-center">
                    <span className={entry.enrolled / entry.capacity > 0.9 ? "text-red-600 font-semibold" : "text-stone-600 font-medium"}>
                      {entry.enrolled}/{entry.capacity}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Payments Tab ────────────────────────────────────────────────────────────

const recentPayments = [
  { studentAr: "أحمد محمد", studentEn: "Ahmed M.", amountAr: "١٢,٥٠٠", amountEn: "12,500", dateAr: "٧ فبراير", dateEn: "Feb 7", method: "Visa", statusAr: "مكتمل", statusEn: "Completed", status: "paid" },
  { studentAr: "فاطمة حسين", studentEn: "Fatima H.", amountAr: "١٢,٥٠٠", amountEn: "12,500", dateAr: "٦ فبراير", dateEn: "Feb 6", method: "Transfer", statusAr: "مكتمل", statusEn: "Completed", status: "paid" },
  { studentAr: "محمد خالد", studentEn: "Mohamed K.", amountAr: "٢٥,٠٠٠", amountEn: "25,000", dateAr: "٥ فبراير", dateEn: "Feb 5", method: "Visa", statusAr: "مكتمل", statusEn: "Completed", status: "paid" },
  { studentAr: "يوسف إبراهيم", studentEn: "Yousef I.", amountAr: "١٢,٥٠٠", amountEn: "12,500", dateAr: "٣ فبراير", dateEn: "Feb 3", method: "Cash", statusAr: "معلق", statusEn: "Pending", status: "pending" },
  { studentAr: "نورا حسن", studentEn: "Noura H.", amountAr: "١٢,٥٠٠", amountEn: "12,500", dateAr: "٢ فبراير", dateEn: "Feb 2", method: "Visa", statusAr: "مرفوض", statusEn: "Rejected", status: "rejected" },
];

function PaymentsTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">{t("إدارة المدفوعات", "Payment Management")}</h1>
          <p className="mt-1 text-stone-500">{t("متابعة وإدارة المدفوعات الطلابية", "Track and manage student payments")}</p>
        </div>
        <Button variant="outline" className="gap-1 border-stone-200 text-stone-650 hover:bg-stone-50"><Download className="h-4 w-4" />{t("تصدير تقرير", "Export Report")}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <p className="text-sm text-stone-500 font-medium">{t("إجمالي الإيرادات", "Total Revenue")}</p>
            <p className="mt-1 text-2xl font-bold text-stone-850">{t("١٨.٥M ج.م", "18.5M EGP")}</p>
            <p className="mt-1 text-xs text-green-600 flex items-center gap-1 font-semibold"><TrendingUp className="h-3 w-3" />+12%</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <p className="text-sm text-stone-500 font-medium">{t("المحصّل", "Collected")}</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{t("١٥.٢M", "15.2M")}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <p className="text-sm text-stone-500 font-medium">{t("المعلق", "Pending")}</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{t("٢.٨M", "2.8M")}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <p className="text-sm text-stone-500 font-medium">{t("المتأخر", "Overdue")}</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{t("٥٠٠K", "500K")}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-stone-500 font-medium">{t("نسبة التحصيل", "Collection Rate")}</span>
            <span className="font-semibold text-stone-800">82%</span>
          </div>
          <Progress value={82} className="h-3 bg-stone-100 [&>div]:bg-[#FABA19]" />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-stone-50">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-stone-800"><CreditCard className="h-5 w-5 text-[#FABA19]" />{t("آخر المدفوعات", "Recent Payments")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow>
                <TableHead className="font-semibold text-stone-700">{t("الطالب", "Student")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("المبلغ", "Amount")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("التاريخ", "Date")}</TableHead>
                <TableHead className="font-semibold text-stone-700">{t("الطريقة", "Method")}</TableHead>
                <TableHead className="text-center font-semibold text-stone-700">{t("الحالة", "Status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((p, i) => (
                <TableRow key={i} className="hover:bg-stone-50/20">
                  <TableCell className="font-semibold text-stone-850">{t(p.studentAr, p.studentEn)}</TableCell>
                  <TableCell className="font-semibold text-stone-800">{t(`${p.amountAr} ج.م`, `${p.amountEn} EGP`)}</TableCell>
                  <TableCell className="text-stone-500 font-medium">{t(p.dateAr, p.dateEn)}</TableCell>
                  <TableCell className="font-semibold text-stone-700">{p.method}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={
                      p.status === "paid" ? "bg-green-50 text-green-700 gap-1 border border-green-100" :
                        p.status === "pending" ? "bg-amber-50 text-amber-700 gap-1 border border-amber-100" :
                          "bg-red-50 text-red-700 gap-1 border border-red-100"
                    }>
                      {p.status === "paid" ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {t(p.statusAr, p.statusEn)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Semesters Tab ───────────────────────────────────────────────────────────

const semesters = [
  { nameAr: "الفصل الثاني ٢٠٢٥-٢٠٢٦", nameEn: "Spring 2025-2026", startAr: "١ فبراير", startEn: "Feb 1", endAr: "١٥ يونيو", endEn: "Jun 15", regStartAr: "١٥ يناير", regStartEn: "Jan 15", regEndAr: "٢٠ فبراير", regEndEn: "Feb 20", statusAr: "نشط", statusEn: "Active", status: "active" },
  { nameAr: "الفصل الأول ٢٠٢٥-٢٠٢٦", nameEn: "Fall 2025-2026", startAr: "١ سبتمبر", startEn: "Sep 1", endAr: "١٥ يناير", endEn: "Jan 15", regStartAr: "١ أغسطس", regStartEn: "Aug 1", regEndAr: "١٥ سبتمبر", regEndEn: "Sep 15", statusAr: "مكتمل", statusEn: "Completed", status: "completed" },
  { nameAr: "الفصل الصيفي ٢٠٢٥", nameEn: "Summer 2025", startAr: "١ يوليو", startEn: "Jul 1", endAr: "١٥ أغسطس", endEn: "Aug 15", regStartAr: "١٥ يونيو", regStartEn: "Jun 15", regEndAr: "٣٠ يونيو", regEndEn: "Jun 30", statusAr: "مكتمل", statusEn: "Completed", status: "completed" },
];

function SemestersTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">{t("إدارة الفصول الدراسية", "Semester Management")}</h1>
          <p className="mt-1 text-stone-500">{t("إدارة الفصول وفترات التسجيل", "Manage semesters and registration periods")}</p>
        </div>
        <Button className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816]"><Plus className="h-4 w-4" />{t("فصل جديد", "New Semester")}</Button>
      </div>

      <div className="space-y-4">
        {semesters.map((sem) => (
          <Card key={sem.nameEn} className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1917]">{t(sem.nameAr, sem.nameEn)}</h3>
                    <Badge variant="secondary" className={sem.status === "active" ? "bg-green-50 text-green-700 mt-1 border border-green-100" : "bg-stone-100 text-stone-600 mt-1"}>
                      {t(sem.statusAr, sem.statusEn)}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1 border-stone-200 text-stone-650 hover:bg-stone-50"><Edit className="h-3.5 w-3.5" />{t("تعديل", "Edit")}</Button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="rounded-lg bg-stone-50 p-3">
                  <p className="text-xs text-stone-400 font-medium">{t("بداية الفصل", "Semester Start")}</p>
                  <p className="mt-1 font-semibold text-stone-700">{t(sem.startAr, sem.startEn)}</p>
                </div>
                <div className="rounded-lg bg-stone-50 p-3">
                  <p className="text-xs text-stone-400 font-medium">{t("نهاية الفصل", "Semester End")}</p>
                  <p className="mt-1 font-semibold text-stone-700">{t(sem.endAr, sem.endEn)}</p>
                </div>
                <div className="rounded-lg bg-stone-50 p-3">
                  <p className="text-xs text-stone-400 font-medium">{t("فتح التسجيل", "Reg. Opens")}</p>
                  <p className="mt-1 font-semibold text-stone-700">{t(sem.regStartAr, sem.regStartEn)}</p>
                </div>
                <div className="rounded-lg bg-stone-50 p-3">
                  <p className="text-xs text-stone-400 font-medium">{t("إغلاق التسجيل", "Reg. Closes")}</p>
                  <p className="mt-1 font-semibold text-stone-700">{t(sem.regEndAr, sem.regEndEn)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Reports Tab ─────────────────────────────────────────────────────────────

const reports = [
  { titleAr: "تقرير الطلاب", titleEn: "Student Report", descAr: "إحصائيات شاملة عن الطلاب والتسجيل", descEn: "Comprehensive student and enrollment statistics" },
  { titleAr: "تقرير الأداء الأكاديمي", titleEn: "Academic Performance", descAr: "تحليل المعدلات والنتائج حسب الكلية", descEn: "GPA analysis and results by faculty" },
  { titleAr: "تقرير مالي", titleEn: "Financial Report", descAr: "إيرادات ومصروفات ونسبة التحصيل", descEn: "Revenue, expenses, and collection rates" },
  { titleAr: "تقرير التخرج", titleEn: "Graduation Report", descAr: "إحصائيات الخريجين ونسب التوظيف", descEn: "Graduate statistics and employment rates" },
  { titleAr: "تقرير المقررات", titleEn: "Course Report", descAr: "معدلات النجاح والرسوب حسب المقرر", descEn: "Pass/fail rates by course" },
  { titleAr: "تقرير اللوائح", titleEn: "Compliance Report", descAr: "متابعة الالتزام باللوائح الأكاديمية", descEn: "Academic regulation compliance tracking" },
];

function ReportsTab() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1917]">{t("التقارير والإحصائيات", "Reports & Analytics")}</h1>
        <p className="mt-1 text-stone-500">{t("تقارير شاملة وتحليلات إحصائية", "Comprehensive reports and statistical analysis")}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { labelAr: "نسبة النجاح", labelEn: "Pass Rate", value: "87%", color: "text-green-600" },
          { labelAr: "معدل الرضا", labelEn: "Satisfaction", value: "4.2/5", color: "text-blue-600" },
          { labelAr: "نسبة التوظيف", labelEn: "Employment", value: "95%", color: "text-purple-600" },
          { labelAr: "نمو الطلاب", labelEn: "Growth", value: "+8%", color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.labelEn} className="border-0 shadow-sm bg-white">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">{t(s.labelAr, s.labelEn)}</p>
                <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
              <TrendingUp className={`h-6 w-6 ${s.color} opacity-50`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Faculty Distribution */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="border-b border-stone-50">
          <CardTitle className="text-base font-bold text-[#1C1917]">{t("توزيع المعدلات حسب الكلية", "GPA Distribution by Faculty")}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {[
            { nameAr: "كلية الطب", nameEn: "Medicine", avg: "3.2", pct: 80 },
            { nameAr: "كلية الحاسبات", nameEn: "Computing", avg: "3.0", pct: 75 },
            { nameAr: "كلية التجارة", nameEn: "Business", avg: "2.8", pct: 70 },
            { nameAr: "كلية العلوم", nameEn: "Sciences", avg: "2.9", pct: 73 },
            { nameAr: "كلية الحقوق", nameEn: "Law", avg: "3.1", pct: 78 },
            { nameAr: "كلية الفنون", nameEn: "Arts", avg: "3.3", pct: 83 },
          ].map((f) => (
            <div key={f.nameEn}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-stone-600 font-medium">{t(f.nameAr, f.nameEn)}</span>
                <span className="font-semibold text-stone-800">{t(`المعدل: ${f.avg}`, `Avg GPA: ${f.avg}`)}</span>
              </div>
              <Progress value={f.pct} className="h-2 bg-stone-100 [&>div]:bg-[#FABA19]" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Report Downloads */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.titleEn} className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-800">{t(report.titleAr, report.titleEn)}</h3>
                  <p className="mt-1 text-xs text-stone-500 font-medium">{t(report.descAr, report.descEn)}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full gap-1 border-stone-200 text-stone-600 hover:bg-stone-50">
                <Download className="h-3.5 w-3.5" />
                {t("تحميل", "Download")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/login');
      return;
    }
    Promise.resolve().then(() => setUser(parsedUser));
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        {/* Top Bar */}
        <div className="bg-[#1C1917] text-[#E7E5E4] h-9">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="opacity-80">{t("مرحباً،", "Welcome,")} {user.firstName} {user.lastName}</span>
              <span className="opacity-30">|</span>
              <span className="text-[#FABA19] font-semibold">{t("مسؤول النظام", "System Admin")}</span>
            </div>
            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  router.push('/login');
                }}
                className="flex items-center gap-1 hover:text-[#FABA19] transition-colors font-semibold"
              >
                <LogOut className="h-3 w-3" />
                <span>{t("تسجيل الخروج", "Logout")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo & Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="object-contain rounded-full p-0.5 border border-[#FABA19] bg-[#FFFDF8]"
                />
              </div>
              <div className="leading-tight">
                <h1 className="text-base sm:text-lg font-bold text-[#1C1917]">{t("جامعة أسيوط الأهلية", "Assiut National University")}</h1>
                <p className="text-xs text-[#FABA19] font-bold">{t("كلية الحاسبات والمعلومات", "Faculty of Computers & Information")}</p>
                <p className="text-[10px] text-stone-500 font-medium">{t("لوحة تحكم مسؤول النظام", "Admin Control Panel")}</p>
              </div>
            </div>

            {/* Profile Avatar / Trigger */}
            <div className="flex items-center gap-3">
              <div className="text-left hidden md:block">
                <p className="text-xs text-stone-400 font-medium">{t("تم تسجيل الدخول كـ", "Logged in as")}</p>
                <p className="text-sm font-semibold text-stone-700">{user.firstName} {user.lastName}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#1C1917] border border-amber-100 flex items-center justify-center font-bold shadow-sm">
                {user.firstName[0]}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs Bar */}
        <Card className="border-0 shadow-sm mb-6 bg-white overflow-hidden">
          <CardContent className="p-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1">
              <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                📊 {t("نظرة عامة", "Overview")}
              </TabButton>
              <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
                👥 {t("إدارة المستخدمين", "Users")}
              </TabButton>
              <TabButton active={activeTab === 'faculties'} onClick={() => setActiveTab('faculties')}>
                🏢 {t("إدارة الكليات", "Faculties")}
              </TabButton>
              <TabButton active={activeTab === 'programs'} onClick={() => setActiveTab('programs')}>
                🎓 {t("البرامج والمقررات", "Programs")}
              </TabButton>
              <TabButton active={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')}>
                📅 {t("الجداول والقاعات", "Schedules")}
              </TabButton>
              <TabButton active={activeTab === 'payments'} onClick={() => setActiveTab('payments')}>
                💰 {t("إدارة المدفوعات", "Payments")}
              </TabButton>
              <TabButton active={activeTab === 'semesters'} onClick={() => setActiveTab('semesters')}>
                🗓️ {t("الفصول الدراسية", "Semesters")}
              </TabButton>
              <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>
                📈 {t("التقارير والإحصائيات", "Reports")}
              </TabButton>
            </div>
          </CardContent>
        </Card>

        {/* Tab Contents */}
        <div className="transition-all duration-300">
          {activeTab === 'overview'  && <OverviewTab />}
          {activeTab === 'users'     && <UsersTab />}
          {activeTab === 'faculties' && <FacultiesTab />}
          {activeTab === 'programs'  && <ProgramsTab />}
          {activeTab === 'schedules' && <SchedulesTab />}
          {activeTab === 'payments'  && <PaymentsTab />}
          {activeTab === 'semesters' && <SemestersTab />}
          {activeTab === 'reports'   && <ReportsTab />}
        </div>
      </main>
    </div>
  );
}