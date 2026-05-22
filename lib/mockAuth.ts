
import { hash } from 'bcryptjs';

export interface MockUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nationalId?: string;
  role: string;
  studentNumber?: string;
  currentLevel?: number;
  programName?: string;
  departmentName?: string;
  facultyName?: string;
  section?: string; 
  department?: 'CS' | 'IS';
  gpa?: string;
}



const hashedPasswords = {
  admin123: '$2b$12$R2pW3J3ZppyG15EHOy5Pk.7SuOlGAgon2.GEUf7ggtCUG2Rx7VXpe',
  prof123: '$2b$12$OIK0DKKtO9l3Tlzb8vcqZesn7.GL.kHUHUxWgxWFCYRE2hRh07C32',
  staff123: '$2b$12$aJ2SJHAmJ9tWoj.VdoDNzuts0FLmGTzs84Aa8OTGMoVRUPNPJZf.e',
  student123: '$2b$12$9zND/sLpF87uhfKzZZIxXOtmDAKojnOC0/AHDBDcUUqfc1xvuvdjm',
};

export const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'admin@aun.edu.eg',
    password: hashedPasswords.admin123,
    firstName: 'Admin',
    lastName: 'User',
    nationalId: '12345678901235',
    role: 'admin',
  },
  {
    id: 2,
    email: 'prof@aun.edu.eg',
    password: hashedPasswords.prof123,
    firstName: 'Ahmed',
    lastName: 'Ali',
    nationalId: '12345678901236',
    role: 'professor',
  },
  {
    id: 3,
    email: 'staff@aun.edu.eg',
    password: hashedPasswords.staff123,
    firstName: 'أحمد',
    lastName: 'محمد',
    nationalId: '12345678901237',
    role: 'admin',
  },
  {
    id: 8,
    email: 'assistant@aun.edu.eg',
    password: hashedPasswords.student123,
    firstName: 'محمد',
    lastName: 'أحمد',
    nationalId: '12345678901241',
    role: 'assistant',
  },
  {
    id: 4,
    email: 'student@aun.edu.eg',
    password: hashedPasswords.student123, 
    firstName: 'Mohamed',
    lastName: 'Sayed',
    nationalId: '12345678901234',
    role: 'student',
    studentNumber: '2024001',
    currentLevel: 1,
    programName: 'علوم الحاسب',
    departmentName: 'علوم الحاسب',
    facultyName: 'كلية الحاسبات والمعلومات',
    section: 'A', 
    department: 'CS', 
  },
  {
    id: 5,
    email: 'student2@aun.edu.eg',
    password: hashedPasswords.student123,
    firstName: 'Ahmed',
    lastName: 'Hassan',
    nationalId: '12345678901238',
    role: 'student',
    studentNumber: '2024002',
    currentLevel: 2,
    programName: 'علوم الحاسب',
    departmentName: 'علوم الحاسب',
    facultyName: 'كلية الحاسبات والمعلومات',
    section: 'B',
    department: 'CS',
  },
  {
    id: 6,
    email: 'student3@aun.edu.eg',
    password: hashedPasswords.student123,
    firstName: 'Fatma',
    lastName: 'Ali',
    nationalId: '12345678901239',
    role: 'student',
    studentNumber: '2024003',
    currentLevel: 1,
    programName: 'نظم المعلومات',
    departmentName: 'نظم المعلومات',
    facultyName: 'كلية الحاسبات والمعلومات',
    section: 'A',
    department: 'IS',
  },
  {
    id: 7,
    email: 'Rammah@gmail.com',
    password: hashedPasswords.student123,
    firstName: 'محمد',
    lastName: 'خالد',
    nationalId: '12345678901240',
    role: 'student',
    studentNumber: '2024004',
    currentLevel: 1,
    programName: 'علوم الحاسب',
    departmentName: 'علوم الحاسب',
    facultyName: 'كلية الحاسبات والمعلومات',
    section: 'A',
    department: 'CS',
    gpa: '3.9',
  },
];

export function findUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function findStudentByNumber(studentNumber: string): MockUser | undefined {
  return mockUsers.find(user => user.studentNumber === studentNumber);
}
