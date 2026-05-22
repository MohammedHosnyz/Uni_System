



export const facultyInfo = {
  nameAr: 'كلية الحاسبات والمعلومات',
  nameEn: 'Faculty of Computers and Information',
  vision: {
    ar: 'تسعى الكلية إلى تحقيق التميز والابتكار في التعليم والبحث العلمي وخدمة المجتمع محليًا وإقليميًا',
    en: 'The faculty seeks to achieve excellence and innovation in education, scientific research, and community service locally and regionally',
  },
  mission: [
    'تزويد الطلاب بالمعرفة والبحث العلمي في علوم الحاسب ونظم وتكنولوجيا المعلومات',
    'تطوير المناهج بما يواكب التطور العلمي واحتياجات سوق العمل',
    'تنمية مهارات التعلم الذاتي واستخدام التقنيات الحديثة',
    'دعم البحث العلمي وربطه بالعائد الاقتصادي والاجتماعي',
    'تعزيز القيم والأخلاقيات المهنية',
    'تقديم خدمات مجتمعية في مجالات الكلية',
  ],
  objectives: [
    'إعداد خريجين متخصصين في الحاسب والمعلومات قادرين على المنافسة محليًا وعالميًا',
    'إجراء البحوث والدراسات العلمية المتقدمة',
    'تقديم الاستشارات للمؤسسات التي تستخدم التكنولوجيا',
    'تدريب الكوادر الفنية في قطاعات الدولة',
    'نشر الوعي التكنولوجي في المجتمع',
    'عقد مؤتمرات علمية وتعاون دولي',
  ],
};

export const mockUsers = [
  {
    id: 1,
    email: 'admin@assiut.edu.eg',
    password: 'admin123',
    firstName: 'مدير',
    lastName: 'النظام',
    nationalId: null,
    role: { id: 1, name: 'admin' },
    student: null,
    professor: null,
  },
  {
    id: 2,
    email: 'professor@assiut.edu.eg',
    password: 'prof123',
    firstName: 'أحمد',
    lastName: 'محمد',
    nationalId: null,
    role: { id: 4, name: 'professor' },
    student: null,
    professor: {
      id: 1,
      employeeNumber: 'EMP001',
      title: 'أستاذ دكتور',
    },
  },
  {
    id: 3,
    email: 'staff@assiut.edu.eg',
    password: 'staff123',
    firstName: 'فاطمة',
    lastName: 'علي',
    nationalId: null,
    role: { id: 2, name: 'staff' },
    student: null,
    professor: null,
  },
];

export const mockStudents = [
  {
    id: 1,
    studentNumber: '2024001',
    user: {
      id: 4,
      email: 'student1@assiut.edu.eg',
      firstName: 'محمد',
      lastName: 'حسن',
      nationalId: '12345678901234',
      role: { id: 5, name: 'student' },
    },
    program: {
      id: 1,
      nameAr: 'بكالوريوس علوم الحاسب',
      nameEn: 'Bachelor of Computer Science',
      code: 'CS',
      department: {
        id: 1,
        nameAr: 'قسم علوم الحاسب',
        nameEn: 'Computer Science Department',
        code: 'CS',
        faculty: {
          id: 1,
          nameAr: 'كلية الحاسبات والمعلومات',
          nameEn: 'Faculty of Computers and Information',
          code: 'FCI',
        },
      },
    },
    currentLevel: 2, 
    gpa: 3.85,
    enrollmentYear: 2023,
    academicStatus: 'good_standing', 
    completedCredits: 32,
    registeredCredits: 15,
    remainingCredits: 97,
    minorProgram: null, 
  },
  {
    id: 2,
    studentNumber: '2024002',
    user: {
      id: 5,
      email: 'student2@assiut.edu.eg',
      firstName: 'سارة',
      lastName: 'أحمد',
      nationalId: '12345678901235',
      role: { id: 5, name: 'student' },
    },
    program: {
      id: 2,
      nameAr: 'بكالوريوس نظم المعلومات',
      nameEn: 'Bachelor of Information Systems',
      code: 'IS',
      department: {
        id: 2,
        nameAr: 'قسم نظم المعلومات',
        nameEn: 'Information Systems Department',
        code: 'IS',
        faculty: {
          id: 1,
          nameAr: 'كلية الحاسبات والمعلومات',
          nameEn: 'Faculty of Computers and Information',
          code: 'FCI',
        },
      },
    },
    currentLevel: 1, 
    gpa: 3.92,
    enrollmentYear: 2024,
    academicStatus: 'good_standing',
    completedCredits: 0,
    registeredCredits: 18,
    remainingCredits: 126,
    minorProgram: null,
  },
];


export const mockDepartments = [
  { id: 1, code: 'CS', nameAr: 'قسم علوم الحاسب', nameEn: 'Computer Science Department' },
  { id: 2, code: 'IS', nameAr: 'قسم نظم المعلومات', nameEn: 'Information Systems Department' },
  { id: 3, code: 'IT', nameAr: 'قسم تكنولوجيا المعلومات', nameEn: 'Information Technology Department' },
  { id: 4, code: 'MM', nameAr: 'قسم الوسائط المتعددة', nameEn: 'Multimedia Department' },
];


export const mockPrograms = [
  { id: 1, code: 'CS', nameAr: 'بكالوريوس علوم الحاسب', nameEn: 'Bachelor of Computer Science', departmentId: 1, totalCredits: 144 },
  { id: 2, code: 'IS', nameAr: 'بكالوريوس نظم المعلومات', nameEn: 'Bachelor of Information Systems', departmentId: 2, totalCredits: 144 },
  { id: 3, code: 'IT', nameAr: 'بكالوريوس تكنولوجيا المعلومات', nameEn: 'Bachelor of Information Technology', departmentId: 3, totalCredits: 144 },
  { id: 4, code: 'MM', nameAr: 'بكالوريوس الوسائط المتعددة', nameEn: 'Bachelor of Multimedia', departmentId: 4, totalCredits: 144 },
];


export const courseCategories = {
  generalRequirements: { credits: 18, nameAr: 'متطلبات عامة', nameEn: 'General Requirements' },
  facultyRequirements: { credits: 71, nameAr: 'متطلبات الكلية', nameEn: 'Faculty Requirements' },
  majorRequirements: { credits: 42, nameAr: 'متطلبات التخصص الرئيسي', nameEn: 'Major Requirements' },
  trainingAndProjects: { credits: 14, nameAr: 'التدريب والمشروعات', nameEn: 'Training & Projects' },
  minorRequirements: { credits: 15, nameAr: 'التخصص الفرعي (اختياري)', nameEn: 'Minor (Optional)' },
};


export const mockCourses = [
  
  {
    id: 1,
    code: 'CS101',
    nameAr: 'مقدمة في البرمجة',
    nameEn: 'Introduction to Programming',
    credits: 3,
    level: 1,
    category: 'faculty',
    courseType: 'mandatory',
    prerequisites: [],
    sections: [
      { id: 1, name: 'A', maxStudents: 25, enrolledCount: 23, professor: 'د. أحمد محمد' },
      { id: 2, name: 'B', maxStudents: 25, enrolledCount: 25, professor: 'د. فاطمة علي' },
    ],
  },
  {
    id: 2,
    code: 'MATH101',
    nameAr: 'التفاضل والتكامل',
    nameEn: 'Calculus I',
    credits: 3,
    level: 1,
    category: 'general',
    courseType: 'mandatory',
    prerequisites: [],
    sections: [
      { id: 3, name: 'A', maxStudents: 25, enrolledCount: 24, professor: 'د. علي محمود' },
    ],
  },
  {
    id: 3,
    code: 'ENG101',
    nameAr: 'اللغة الإنجليزية (1)',
    nameEn: 'English Language I',
    credits: 3,
    level: 1,
    category: 'general',
    courseType: 'mandatory',
    prerequisites: [],
    sections: [
      { id: 4, name: 'A', maxStudents: 25, enrolledCount: 22, professor: 'د. منى سعيد' },
    ],
  },
  
  
  {
    id: 4,
    code: 'CS201',
    nameAr: 'هياكل البيانات',
    nameEn: 'Data Structures',
    credits: 3,
    level: 2,
    category: 'faculty',
    courseType: 'mandatory',
    prerequisites: ['CS101'],
    sections: [
      { id: 5, name: 'A', maxStudents: 25, enrolledCount: 20, professor: 'د. محمد حسن' },
    ],
  },
  {
    id: 5,
    code: 'CS202',
    nameAr: 'قواعد البيانات',
    nameEn: 'Database Systems',
    credits: 3,
    level: 2,
    category: 'faculty',
    courseType: 'mandatory',
    prerequisites: ['CS101'],
    sections: [
      { id: 6, name: 'A', maxStudents: 25, enrolledCount: 18, professor: 'د. أحمد محمد' },
    ],
  },
  {
    id: 6,
    code: 'CS203',
    nameAr: 'الخوارزميات',
    nameEn: 'Algorithms',
    credits: 3,
    level: 2,
    category: 'major',
    courseType: 'mandatory',
    prerequisites: ['CS201'],
    sections: [
      { id: 7, name: 'A', maxStudents: 25, enrolledCount: 19, professor: 'د. سارة أحمد' },
    ],
  },
  
  
  {
    id: 7,
    code: 'CS301',
    nameAr: 'الذكاء الاصطناعي',
    nameEn: 'Artificial Intelligence',
    credits: 3,
    level: 3,
    category: 'major',
    courseType: 'mandatory',
    prerequisites: ['CS203'],
    sections: [
      { id: 8, name: 'A', maxStudents: 25, enrolledCount: 15, professor: 'د. خالد عمر' },
    ],
  },
  {
    id: 8,
    code: 'CS302',
    nameAr: 'التعلم الآلي',
    nameEn: 'Machine Learning',
    credits: 3,
    level: 3,
    category: 'major',
    courseType: 'elective',
    prerequisites: ['CS301'],
    sections: [
      { id: 9, name: 'A', maxStudents: 25, enrolledCount: 12, professor: 'د. نور الدين' },
    ],
  },
  
  
  {
    id: 9,
    code: 'CS401',
    nameAr: 'مشروع التخرج (1)',
    nameEn: 'Capstone Project I',
    credits: 3,
    level: 4,
    category: 'training',
    courseType: 'mandatory',
    prerequisites: ['72 credits completed'],
    sections: [
      { id: 10, name: 'A', maxStudents: 25, enrolledCount: 10, professor: 'د. أحمد محمد' },
    ],
  },
  {
    id: 10,
    code: 'CS402',
    nameAr: 'مشروع التخرج (2)',
    nameEn: 'Capstone Project II',
    credits: 3,
    level: 4,
    category: 'training',
    courseType: 'mandatory',
    prerequisites: ['CS401'],
    sections: [
      { id: 11, name: 'A', maxStudents: 25, enrolledCount: 8, professor: 'د. أحمد محمد' },
    ],
  },
  {
    id: 11,
    code: 'CS403',
    nameAr: 'التدريب الميداني',
    nameEn: 'Field Training',
    credits: 3,
    level: 4,
    category: 'training',
    courseType: 'mandatory',
    prerequisites: ['90 credits completed'],
    sections: [
      { id: 12, name: 'A', maxStudents: 30, enrolledCount: 15, professor: 'د. فاطمة علي' },
    ],
  },
  
  
  {
    id: 12,
    code: 'CS204',
    nameAr: 'نظم التشغيل',
    nameEn: 'Operating Systems',
    credits: 3,
    level: 2,
    category: 'faculty',
    courseType: 'mandatory',
    prerequisites: ['CS201'],
    sections: [
      { id: 13, name: 'A', maxStudents: 25, enrolledCount: 17, professor: 'د. فاطمة علي' },
    ],
  },
  {
    id: 13,
    code: 'MATH201',
    nameAr: 'الرياضيات المتقطعة',
    nameEn: 'Discrete Mathematics',
    credits: 3,
    level: 2,
    category: 'general',
    courseType: 'mandatory',
    prerequisites: ['MATH101'],
    sections: [
      { id: 14, name: 'A', maxStudents: 25, enrolledCount: 20, professor: 'د. علي محمود' },
    ],
  },
  {
    id: 14,
    code: 'CS303',
    nameAr: 'أمن المعلومات',
    nameEn: 'Information Security',
    credits: 3,
    level: 3,
    category: 'major',
    courseType: 'elective',
    prerequisites: ['CS202'],
    sections: [
      { id: 15, name: 'A', maxStudents: 25, enrolledCount: 14, professor: 'د. خالد عمر' },
    ],
  },
  {
    id: 15,
    code: 'CS304',
    nameAr: 'الحوسبة السحابية',
    nameEn: 'Cloud Computing',
    credits: 3,
    level: 3,
    category: 'major',
    courseType: 'elective',
    prerequisites: ['CS204'],
    sections: [
      { id: 16, name: 'A', maxStudents: 25, enrolledCount: 11, professor: 'د. نور الدين' },
    ],
  },
];


export const registrationRules = {
  minCreditsPerSemester: 12,
  maxCreditsPerSemester: 18,
  maxCreditsWithApproval: 21,
  minAttendancePercentage: 75,
  addDropPeriodWeeks: 1,
  withdrawalDeadlineWeeks: 8,
  minGpaForGraduation: 2.0,
  academicWarningGpa: 2.0,
  probationSemesters: 2,
};


export const mockRegistrations = [
  {
    id: 1,
    studentId: 1,
    courseId: 4,
    sectionId: 5,
    semester: 'Fall 2024',
    semesterId: 1,
    status: 'registered',
    registrationDate: '2024-09-05',
    attendancePercentage: 0,
  },
  {
    id: 2,
    studentId: 1,
    courseId: 5,
    sectionId: 6,
    semester: 'Fall 2024',
    semesterId: 1,
    status: 'registered',
    registrationDate: '2024-09-05',
    attendancePercentage: 0,
  },
  {
    id: 3,
    studentId: 1,
    courseId: 6,
    sectionId: 7,
    semester: 'Fall 2024',
    semesterId: 1,
    status: 'registered',
    registrationDate: '2024-09-05',
    attendancePercentage: 0,
  },
];


export const gradingScale = [
  { letterGrade: 'A+', minScore: 97, maxScore: 100, gradePoint: 4.0 },
  { letterGrade: 'A', minScore: 93, maxScore: 96, gradePoint: 4.0 },
  { letterGrade: 'A-', minScore: 90, maxScore: 92, gradePoint: 3.7 },
  { letterGrade: 'B+', minScore: 87, maxScore: 89, gradePoint: 3.3 },
  { letterGrade: 'B', minScore: 83, maxScore: 86, gradePoint: 3.0 },
  { letterGrade: 'B-', minScore: 80, maxScore: 82, gradePoint: 2.7 },
  { letterGrade: 'C+', minScore: 77, maxScore: 79, gradePoint: 2.3 },
  { letterGrade: 'C', minScore: 73, maxScore: 76, gradePoint: 2.0 },
  { letterGrade: 'C-', minScore: 70, maxScore: 72, gradePoint: 1.7 },
  { letterGrade: 'D+', minScore: 67, maxScore: 69, gradePoint: 1.3 },
  { letterGrade: 'D', minScore: 60, maxScore: 66, gradePoint: 1.0 },
  { letterGrade: 'F', minScore: 0, maxScore: 59, gradePoint: 0.0 },
];


export const mockGrades = [
  
  { studentId: 1, courseCode: 'CS101', courseName: 'مقدمة في البرمجة', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 95, midterm: 48, final: 47, semester: 'Fall 2023', status: 'completed' },
  { studentId: 1, courseCode: 'MATH101', courseName: 'التفاضل والتكامل', credits: 3, grade: 'A-', gradePoint: 3.7, totalScore: 91, midterm: 45, final: 46, semester: 'Fall 2023', status: 'completed' },
  { studentId: 1, courseCode: 'ENG101', courseName: 'اللغة الإنجليزية (1)', credits: 3, grade: 'B+', gradePoint: 3.3, totalScore: 88, midterm: 43, final: 45, semester: 'Fall 2023', status: 'completed' },
  { studentId: 1, courseCode: 'PHY101', courseName: 'الفيزياء العامة', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 94, midterm: 47, final: 47, semester: 'Fall 2023', status: 'completed' },
  
  
  { studentId: 1, courseCode: 'CS102', courseName: 'البرمجة الشيئية', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 96, midterm: 48, final: 48, semester: 'Spring 2024', status: 'completed' },
  { studentId: 1, courseCode: 'MATH102', courseName: 'الجبر الخطي', credits: 3, grade: 'B+', gradePoint: 3.3, totalScore: 87, midterm: 42, final: 45, semester: 'Spring 2024', status: 'completed' },
  { studentId: 1, courseCode: 'ENG102', courseName: 'اللغة الإنجليزية (2)', credits: 3, grade: 'A-', gradePoint: 3.7, totalScore: 90, midterm: 44, final: 46, semester: 'Spring 2024', status: 'completed' },
  { studentId: 1, courseCode: 'STAT101', courseName: 'الإحصاء والاحتمالات', credits: 3, grade: 'B', gradePoint: 3.0, totalScore: 84, midterm: 41, final: 43, semester: 'Spring 2024', status: 'completed' },
  
  
  { studentId: 1, courseCode: 'CS150', courseName: 'مهارات الحاسب', credits: 2, grade: 'A', gradePoint: 4.0, totalScore: 98, midterm: 49, final: 49, semester: 'Summer 2024', status: 'completed' },
  { studentId: 1, courseCode: 'ARAB101', courseName: 'اللغة العربية', credits: 2, grade: 'B+', gradePoint: 3.3, totalScore: 89, midterm: 44, final: 45, semester: 'Summer 2024', status: 'completed' },
  
  
  { studentId: 1, courseCode: 'CS201', courseName: 'هياكل البيانات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 1, courseCode: 'CS202', courseName: 'قواعد البيانات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 1, courseCode: 'CS203', courseName: 'الخوارزميات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 1, courseCode: 'CS204', courseName: 'نظم التشغيل', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 1, courseCode: 'MATH201', courseName: 'الرياضيات المتقطعة', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },

  
  { studentId: 7, courseCode: 'CS101', courseName: 'مقدمة في البرمجة', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 95, midterm: 48, final: 47, semester: 'Fall 2023', status: 'completed' },
  { studentId: 7, courseCode: 'MATH101', courseName: 'التفاضل والتكامل', credits: 3, grade: 'A-', gradePoint: 3.7, totalScore: 91, midterm: 45, final: 46, semester: 'Fall 2023', status: 'completed' },
  { studentId: 7, courseCode: 'ENG101', courseName: 'اللغة الإنجليزية (1)', credits: 3, grade: 'B+', gradePoint: 3.3, totalScore: 88, midterm: 43, final: 45, semester: 'Fall 2023', status: 'completed' },
  { studentId: 7, courseCode: 'PHY101', courseName: 'الفيزياء العامة', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 94, midterm: 47, final: 47, semester: 'Fall 2023', status: 'completed' },
  { studentId: 7, courseCode: 'CS102', courseName: 'البرمجة الشيئية', credits: 3, grade: 'A', gradePoint: 4.0, totalScore: 96, midterm: 48, final: 48, semester: 'Spring 2024', status: 'completed' },
  { studentId: 7, courseCode: 'MATH102', courseName: 'الجبر الخطي', credits: 3, grade: 'B+', gradePoint: 3.3, totalScore: 87, midterm: 42, final: 45, semester: 'Spring 2024', status: 'completed' },
  { studentId: 7, courseCode: 'ENG102', courseName: 'اللغة الإنجليزية (2)', credits: 3, grade: 'A-', gradePoint: 3.7, totalScore: 90, midterm: 44, final: 46, semester: 'Spring 2024', status: 'completed' },
  { studentId: 7, courseCode: 'STAT101', courseName: 'الإحصاء والاحتمالات', credits: 3, grade: 'B', gradePoint: 3.0, totalScore: 84, midterm: 41, final: 43, semester: 'Spring 2024', status: 'completed' },
  { studentId: 7, courseCode: 'CS150', courseName: 'مهارات الحاسب', credits: 2, grade: 'A', gradePoint: 4.0, totalScore: 98, midterm: 49, final: 49, semester: 'Summer 2024', status: 'completed' },
  { studentId: 7, courseCode: 'ARAB101', courseName: 'اللغة العربية', credits: 2, grade: 'B+', gradePoint: 3.3, totalScore: 89, midterm: 44, final: 45, semester: 'Summer 2024', status: 'completed' },
  { studentId: 7, courseCode: 'CS201', courseName: 'هياكل البيانات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 7, courseCode: 'CS202', courseName: 'قواعد البيانات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 7, courseCode: 'CS203', courseName: 'الخوارزميات', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 7, courseCode: 'CS204', courseName: 'نظم التشغيل', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
  { studentId: 7, courseCode: 'MATH201', courseName: 'الرياضيات المتقطعة', credits: 3, grade: '-', gradePoint: 0, totalScore: 0, midterm: 0, final: 0, semester: 'Fall 2024', status: 'in_progress' },
];


export const mockPayments = [
  {
    id: 1,
    studentId: 1,
    amount: 8500,
    paymentDate: '2023-09-01',
    semester: 'Fall 2023',
    semesterId: 1,
    type: 'tuition',
    paymentMethod: 'bank_transfer',
    status: 'paid',
    receiptNumber: 'REC-2023-F-001',
    notes: 'رسوم الفصل الدراسي الخريفي 2023',
  },
  {
    id: 2,
    studentId: 1,
    amount: 8500,
    paymentDate: '2024-02-01',
    semester: 'Spring 2024',
    semesterId: 2,
    type: 'tuition',
    paymentMethod: 'bank_transfer',
    status: 'paid',
    receiptNumber: 'REC-2024-S-001',
    notes: 'رسوم الفصل الدراسي الربيعي 2024',
  },
  {
    id: 3,
    studentId: 1,
    amount: 4000,
    paymentDate: '2024-06-01',
    semester: 'Summer 2024',
    semesterId: 3,
    type: 'tuition',
    paymentMethod: 'bank_transfer',
    status: 'paid',
    receiptNumber: 'REC-2024-SU-001',
    notes: 'رسوم الفصل الدراسي الصيفي 2024',
  },
  {
    id: 4,
    studentId: 1,
    amount: 8500,
    paymentDate: '2024-09-01',
    semester: 'Fall 2024',
    semesterId: 1,
    type: 'tuition',
    paymentMethod: 'bank_transfer',
    status: 'paid',
    receiptNumber: 'REC-2024-F-001',
    notes: 'رسوم الفصل الدراسي الخريفي 2024',
  },
  {
    id: 5,
    studentId: 1,
    amount: 500,
    paymentDate: '2024-09-01',
    semester: 'Fall 2024',
    semesterId: 1,
    type: 'registration',
    paymentMethod: 'cash',
    status: 'paid',
    receiptNumber: 'REC-2024-F-REG-001',
    notes: 'رسوم التسجيل',
  },
];


export const mockSemesters = [
  {
    id: 1,
    name: 'Fall 2024',
    nameAr: 'الفصل الدراسي الخريفي 2024',
    season: 'fall',
    year: 2024,
    weeks: 15,
    startDate: '2024-09-15',
    endDate: '2024-12-28',
    registrationStart: '2024-09-01',
    registrationEnd: '2024-09-20',
    addDropDeadline: '2024-09-27',
    withdrawalDeadline: '2024-11-15',
    isActive: true,
  },
  {
    id: 2,
    name: 'Spring 2025',
    nameAr: 'الفصل الدراسي الربيعي 2025',
    season: 'spring',
    year: 2025,
    weeks: 15,
    startDate: '2025-02-01',
    endDate: '2025-05-15',
    registrationStart: '2025-01-15',
    registrationEnd: '2025-02-05',
    addDropDeadline: '2025-02-12',
    withdrawalDeadline: '2025-04-01',
    isActive: false,
  },
  {
    id: 3,
    name: 'Summer 2025',
    nameAr: 'الفصل الدراسي الصيفي 2025',
    season: 'summer',
    year: 2025,
    weeks: 8,
    startDate: '2025-06-01',
    endDate: '2025-07-24',
    registrationStart: '2025-05-20',
    registrationEnd: '2025-06-05',
    addDropDeadline: '2025-06-08',
    withdrawalDeadline: '2025-07-01',
    isActive: false,
  },
];


export const mockSchedule = [
  { day: 0, time: '8:00-10:00', course: 'CS201', courseName: 'هياكل البيانات', section: 'A', room: 'A101', building: 'المبنى الرئيسي', type: 'lecture', professor: 'د. محمد حسن' },
  { day: 0, time: '10:00-12:00', course: 'CS202', courseName: 'قواعد البيانات', section: 'A', room: 'B201', building: 'المبنى الرئيسي', type: 'lecture', professor: 'د. أحمد محمد' },
  { day: 1, time: '8:00-10:00', course: 'CS203', courseName: 'الخوارزميات', section: 'A', room: 'A102', building: 'المبنى الرئيسي', type: 'lecture', professor: 'د. سارة أحمد' },
  { day: 1, time: '12:00-2:00', course: 'CS201', courseName: 'هياكل البيانات', section: 'A', room: 'LAB1', building: 'مبنى المعامل', type: 'lab', professor: 'م. خالد عمر' },
  { day: 2, time: '10:00-12:00', course: 'CS202', courseName: 'قواعد البيانات', section: 'A', room: 'LAB2', building: 'مبنى المعامل', type: 'lab', professor: 'م. نور الدين' },
  { day: 2, time: '2:00-4:00', course: 'CS204', courseName: 'نظم التشغيل', section: 'A', room: 'A103', building: 'المبنى الرئيسي', type: 'lecture', professor: 'د. فاطمة علي' },
  { day: 3, time: '8:00-10:00', course: 'MATH201', courseName: 'الرياضيات المتقطعة', section: 'A', room: 'B102', building: 'المبنى الرئيسي', type: 'lecture', professor: 'د. علي محمود' },
  { day: 3, time: '10:00-12:00', course: 'CS203', courseName: 'الخوارزميات', section: 'A', room: 'A104', building: 'المبنى الرئيسي', type: 'tutorial', professor: 'م. سارة أحمد' },
];


export const mockMidtermExams = [
  { course: 'CS201', courseName: 'هياكل البيانات', date: '2024-11-10', time: '9:00 صباحاً', duration: '2 ساعة', room: 'قاعة A', building: 'مبنى الامتحانات', section: 'A', weight: '25%' },
  { course: 'CS202', courseName: 'قواعد البيانات', date: '2024-11-12', time: '9:00 صباحاً', duration: '2 ساعة', room: 'قاعة B', building: 'مبنى الامتحانات', section: 'A', weight: '25%' },
  { course: 'CS203', courseName: 'الخوارزميات', date: '2024-11-14', time: '9:00 صباحاً', duration: '2 ساعة', room: 'قاعة A', building: 'مبنى الامتحانات', section: 'A', weight: '25%' },
  { course: 'CS204', courseName: 'نظم التشغيل', date: '2024-11-16', time: '9:00 صباحاً', duration: '2 ساعة', room: 'قاعة C', building: 'مبنى الامتحانات', section: 'A', weight: '25%' },
  { course: 'MATH201', courseName: 'الرياضيات المتقطعة', date: '2024-11-18', time: '9:00 صباحاً', duration: '2 ساعة', room: 'قاعة B', building: 'مبنى الامتحانات', section: 'A', weight: '25%' },
];

export const mockFinalExams = [
  { course: 'CS201', courseName: 'هياكل البيانات', date: '2024-12-22', time: '9:00 صباحاً', duration: '3 ساعات', room: 'قاعة A', building: 'مبنى الامتحانات', section: 'A', weight: '50%' },
  { course: 'CS202', courseName: 'قواعد البيانات', date: '2024-12-24', time: '9:00 صباحاً', duration: '3 ساعات', room: 'قاعة B', building: 'مبنى الامتحانات', section: 'A', weight: '50%' },
  { course: 'CS203', courseName: 'الخوارزميات', date: '2024-12-26', time: '9:00 صباحاً', duration: '3 ساعات', room: 'قاعة A', building: 'مبنى الامتحانات', section: 'A', weight: '50%' },
  { course: 'CS204', courseName: 'نظم التشغيل', date: '2024-12-28', time: '9:00 صباحاً', duration: '3 ساعات', room: 'قاعة C', building: 'مبنى الامتحانات', section: 'A', weight: '50%' },
  { course: 'MATH201', courseName: 'الرياضيات المتقطعة', date: '2024-12-30', time: '9:00 صباحاً', duration: '3 ساعات', room: 'قاعة B', building: 'مبنى الامتحانات', section: 'A', weight: '50%' },
];


export const academicLevels = [
  { level: 1, nameAr: 'المستوى الأول', nameEn: 'Freshman', minCredits: 0, maxCredits: 35 },
  { level: 2, nameAr: 'المستوى الثاني', nameEn: 'Sophomore', minCredits: 36, maxCredits: 71 },
  { level: 3, nameAr: 'المستوى الثالث', nameEn: 'Junior', minCredits: 72, maxCredits: 107 },
  { level: 4, nameAr: 'المستوى الرابع', nameEn: 'Senior', minCredits: 108, maxCredits: 144 },
];


export const studentGroups = {
  batch2024: {
    totalStudents: 100,
    sections: [
      { name: 'A', students: 25, department: 'CS' },
      { name: 'B', students: 25, department: 'CS' },
      { name: 'C', students: 25, department: 'IS' },
      { name: 'D', students: 25, department: 'IT' },
    ],
  },
  batch2023: {
    totalStudents: 95,
    sections: [
      { name: 'A', students: 24, department: 'CS' },
      { name: 'B', students: 23, department: 'CS' },
      { name: 'C', students: 24, department: 'IS' },
      { name: 'D', students: 24, department: 'IT' },
    ],
  },
};

export function findUserByEmail(email: string) {
  return mockUsers.find(u => u.email === email);
}

export function findStudentByNumber(studentNumber: string) {
  return mockStudents.find(s => s.studentNumber === studentNumber);
}

export function getStudentRegistrations(studentId: number) {
  return mockRegistrations
    .filter(r => r.studentId === studentId)
    .map(reg => {
      const course = mockCourses.find(c => c.id === reg.courseId);
      const section = course?.sections.find(s => s.id === reg.sectionId);
      return {
        ...reg,
        course,
        section,
      };
    });
}

export function getStudentGrades(studentId: number) {
  return mockGrades.filter(g => g.studentId === studentId);
}

export function getStudentPayments(studentId: number) {
  return mockPayments.filter(p => p.studentId === studentId);
}

export function getStudentSchedule(studentId: number) {
  const registrations = getStudentRegistrations(studentId);
  const courseCodes = registrations.map(r => r.course?.code);
  return mockSchedule.filter(s => courseCodes.includes(s.course));
}

export function getAvailableCourses(level: number) {
  return mockCourses.filter(c => c.level === level);
}

export function calculateCredits(studentId: number) {
  const grades = getStudentGrades(studentId);
  const completed = grades.filter(g => g.status === 'completed');
  const inProgress = grades.filter(g => g.status === 'in_progress');
  
  const completedCredits = completed.reduce((sum, g) => sum + g.credits, 0);
  const inProgressCredits = inProgress.reduce((sum, g) => sum + g.credits, 0);
  const totalCredits = completedCredits + inProgressCredits;
  const remainingCredits = 144 - totalCredits;
  
  return {
    completed: completedCredits,
    inProgress: inProgressCredits,
    total: totalCredits,
    remaining: remainingCredits,
    requiredForGraduation: 144,
  };
}

export function calculateGPA(studentId: number) {
  const grades = getStudentGrades(studentId);
  const completed = grades.filter(g => g.status === 'completed' && g.gradePoint > 0);
  
  if (completed.length === 0) return 0;
  
  const totalPoints = completed.reduce((sum, g) => sum + (g.gradePoint * g.credits), 0);
  const totalCredits = completed.reduce((sum, g) => sum + g.credits, 0);
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
}

export function getAcademicLevel(completedCredits: number) {
  const level = academicLevels.find(
    l => completedCredits >= l.minCredits && completedCredits <= l.maxCredits
  );
  return level || academicLevels[0];
}

export function canRegisterForCourse(studentId: number, courseCode: string) {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return { allowed: false, reason: 'الطالب غير موجود' };
  
  const course = mockCourses.find(c => c.code === courseCode);
  if (!course) return { allowed: false, reason: 'المقرر غير موجود' };
  
  
  if (course.prerequisites && course.prerequisites.length > 0) {
    const completedCourses = getStudentGrades(studentId)
      .filter(g => g.status === 'completed' && g.gradePoint >= 1.0)
      .map(g => g.courseCode);
    
    const missingPrereqs = course.prerequisites.filter(
      prereq => !completedCourses.includes(prereq)
    );
    
    if (missingPrereqs.length > 0) {
      return { 
        allowed: false, 
        reason: `يجب اجتياز المتطلبات السابقة: ${missingPrereqs.join(', ')}` 
      };
    }
  }
  
  
  const currentRegistrations = getStudentRegistrations(studentId);
  const currentCredits = currentRegistrations.reduce((sum, reg) => {
    return sum + (reg.course?.credits || 0);
  }, 0);
  
  if (currentCredits + course.credits > registrationRules.maxCreditsPerSemester) {
    return { 
      allowed: false, 
      reason: `تجاوز الحد الأقصى للساعات المعتمدة (${registrationRules.maxCreditsPerSemester})` 
    };
  }
  
  return { allowed: true, reason: '' };
}

export function getAcademicStatus(gpa: number) {
  if (gpa >= registrationRules.minGpaForGraduation) {
    return { status: 'good_standing', nameAr: 'وضع أكاديمي جيد', nameEn: 'Good Standing' };
  } else if (gpa >= 1.5) {
    return { status: 'warning', nameAr: 'إنذار أكاديمي', nameEn: 'Academic Warning' };
  } else {
    return { status: 'probation', nameAr: 'تحت المراقبة', nameEn: 'Academic Probation' };
  }
}

export function canGraduate(studentId: number) {
  const credits = calculateCredits(studentId);
  const gpa = parseFloat(calculateGPA(studentId).toString());
  
  const meetsCredits = credits.completed >= 144;
  const meetsGPA = gpa >= registrationRules.minGpaForGraduation;
  
  return {
    canGraduate: meetsCredits && meetsGPA,
    meetsCredits,
    meetsGPA,
    completedCredits: credits.completed,
    requiredCredits: 144,
    currentGPA: gpa,
    requiredGPA: registrationRules.minGpaForGraduation,
  };
}
