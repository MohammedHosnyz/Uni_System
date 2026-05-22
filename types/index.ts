import { ReactNode } from 'react';


export type StatColor = 'blue' | 'green' | 'purple' | 'amber' | 'red';
export type ProgressColor = 'blue' | 'red' | 'green' | 'purple';

export interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  color: StatColor;
  subtitle?: string;
}

export interface ProgressBarProps {
  label: string;
  value?: number;
  current?: number;
  total?: number;
  color: ProgressColor;
}

export interface ActivityItemProps {
  icon: string;
  text: string;
  time: string;
}

export interface StudentRowProps {
  id: string;
  name: string;
  program: string;
  level: string;
  gpa: string;
  status: string;
}

export interface CourseCardProps {
  code: string;
  name: string;
  credits: number;
  level: number;
  students: number;
}

export interface GradeCardProps {
  student: string;
  course: string;
  midterm: number;
  final: number;
  assignment: number;
  total: number;
  grade: string;
}

export interface GradeDistributionProps {
  grade: string;
  count: number;
  percentage: number;
}


export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  nationalId?: string;
  roleId: number;
  role: Role;
  isActive: boolean;
}

export interface SessionUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  studentNumber?: string;
  employeeNumber?: string;
  programName?: string;
  departmentName?: string;
  facultyName?: string;
  currentLevel?: number;
  section?: string; 
  department?: 'CS' | 'IS'; 
  level?: number;
  avatarUrl?: string;
  gender?: 'male' | 'female';
}

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface Student {
  id: number;
  userId: number;
  user: User;
  studentNumber: string;
  programId: number;
  program: Program;
  enrollmentYear: number;
  currentLevel: number;
  status: 'active' | 'suspended' | 'graduated' | 'withdrawn';
  gpa?: number;
  photoUrl?: string;
}

export interface Professor {
  id: number;
  userId: number;
  user: User;
  employeeNumber: string;
  title: string;
  specialization?: string;
  officeLocation?: string;
  officeHours?: string;
}

export interface Faculty {
  id: number;
  nameAr: string;
  nameEn: string;
  code: string;
  description?: string;
  departments?: Department[];
}

export interface Department {
  id: number;
  nameAr: string;
  nameEn: string;
  code: string;
  facultyId: number;
  faculty?: Faculty;
  programs?: Program[];
}

export interface Program {
  id: number;
  nameAr: string;
  nameEn: string;
  code: string;
  departmentId: number;
  department?: Department;
  durationYears: number;
  totalCredits: number;
  tuitionFee: number;
  courses?: Course[];
}

export interface Course {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  description?: string;
  credits: number;
  programId: number;
  program?: Program;
  level: number;
  courseType: 'mandatory' | 'elective';
  prerequisites?: CoursePrerequisite[];
}

export interface CoursePrerequisite {
  id: number;
  courseId: number;
  prerequisiteId: number;
  prerequisite: Course;
}

export interface Semester {
  id: number;
  name: string;
  year: number;
  season: 'fall' | 'spring' | 'summer';
  startDate: Date;
  endDate: Date;
  registrationStart: Date;
  registrationEnd: Date;
  isActive: boolean;
}

export interface Registration {
  id: number;
  studentId: number;
  student: Student;
  courseOfferingId: number;
  courseOffering: CourseOffering;
  semesterId: number;
  semester: Semester;
  status: 'registered' | 'dropped' | 'completed';
  registrationDate: Date;
  grade?: Grade;
  course?: Course; 
  section?: { name: string; professor: string }; 
}

export interface CourseOffering {
  id: number;
  courseId: number;
  course: Course;
  semesterId: number;
  semester: Semester;
  professorId?: number;
  professor?: Professor;
  maxStudents: number;
  enrolledCount: number;
}

export interface Grade {
  id: number;
  registrationId: number;
  studentId: number;
  midtermGrade?: number;
  finalGrade?: number;
  assignmentGrade?: number;
  totalGrade?: number;
  letterGrade?: string;
  gradePoint?: number;
  status?: 'pass' | 'fail' | 'completed' | 'in_progress';
  credits?: number; 
  courseCode?: string; 
  courseName?: string; 
  semester?: string; 
}

export interface Classroom {
  id: number;
  code: string;
  name: string;
  building: string;
  capacity: number;
  type: 'lecture_hall' | 'lab' | 'tutorial_room';
  facilities?: string;
}

export interface ScheduleEntry {
  id: number;
  courseOfferingId: number;
  courseOffering: CourseOffering;
  classroomId: number;
  classroom: Classroom;
  professorId?: number;
  professor?: Professor;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  sessionType: 'lecture' | 'lab' | 'tutorial';
}

export interface Payment {
  id: number;
  studentId: number;
  student: Student;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentType: 'tuition' | 'registration' | 'exam' | 'other';
  semesterYear?: string;
  receiptNumber: string;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  token: string;
  user: SessionUser;
}
