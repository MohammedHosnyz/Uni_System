import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();


function letterGrade(total: number) {
  if (total >= 90) return { letter: 'A+', gp: 4.0 };
  if (total >= 85) return { letter: 'A',  gp: 3.7 };
  if (total >= 80) return { letter: 'A-', gp: 3.3 };
  if (total >= 75) return { letter: 'B+', gp: 3.0 };
  if (total >= 70) return { letter: 'B',  gp: 2.7 };
  if (total >= 65) return { letter: 'B-', gp: 2.3 };
  if (total >= 60) return { letter: 'C+', gp: 2.0 };
  if (total >= 55) return { letter: 'C',  gp: 1.7 };
  return { letter: 'F', gp: 0.0 };
}

async function main() {
  
  const adminRole     = await prisma.role.upsert({ where: { name: 'admin' },     update: {}, create: { name: 'admin',     description: 'Administrator' } });
  const staffRole     = await prisma.role.upsert({ where: { name: 'staff' },     update: {}, create: { name: 'staff',     description: 'Staff Member' } });
  const professorRole = await prisma.role.upsert({ where: { name: 'professor' }, update: {}, create: { name: 'professor', description: 'Professor' } });
  const studentRole   = await prisma.role.upsert({ where: { name: 'student' },   update: {}, create: { name: 'student',   description: 'Student' } });
  const assistantRole = await prisma.role.upsert({ where: { name: 'assistant' }, update: {}, create: { name: 'assistant', description: 'Teaching Assistant' } });

  
  await prisma.user.upsert({ where: { email: 'admin@aun.edu.eg' },     update: {}, create: { email: 'admin@aun.edu.eg',     password: await hash('admin123', 12),     firstName: 'Admin', lastName: 'User',   nationalId: '12345678901234', roleId: adminRole.id } });
  await prisma.user.upsert({ where: { email: 'staff@aun.edu.eg' },     update: {}, create: { email: 'staff@aun.edu.eg',     password: await hash('staff123', 12),     firstName: 'Staff', lastName: 'Member', nationalId: '12345678901235', roleId: staffRole.id } });
  await prisma.user.upsert({ where: { email: 'assistant@aun.edu.eg' }, update: {}, create: { email: 'assistant@aun.edu.eg', password: await hash('assistant123', 12), firstName: 'Sara',  lastName: 'Hassan', nationalId: '12345678901238', roleId: assistantRole.id } });

  
  await prisma.faculty.upsert({ where: { code: 'MED' }, update: {}, create: { nameAr: 'كلية الطب',                      nameEn: 'Faculty of Medicine',                  code: 'MED' } });
  await prisma.faculty.upsert({ where: { code: 'ENG' }, update: {}, create: { nameAr: 'كلية الهندسة',                   nameEn: 'Faculty of Engineering',               code: 'ENG' } });
  const fciFaculty = await prisma.faculty.upsert({ where: { code: 'FCI' }, update: {}, create: { nameAr: 'كلية الحاسبات والمعلومات', nameEn: 'Faculty of Computers and Information', code: 'FCI' } });

  
  const csDept = await prisma.department.upsert({ where: { code: 'CS' }, update: {}, create: { nameAr: 'علوم الحاسب',    nameEn: 'Computer Science',    code: 'CS', facultyId: fciFaculty.id } });
  await prisma.department.upsert({               where: { code: 'IS' }, update: {}, create: { nameAr: 'نظم المعلومات', nameEn: 'Information Systems', code: 'IS', facultyId: fciFaculty.id } });

  
  const csProgram = await prisma.program.upsert({
    where: { code: 'CS' }, update: {},
    create: { nameAr: 'علوم الحاسب', nameEn: 'Computer Science', code: 'CS', departmentId: csDept.id, durationYears: 4, totalCredits: 144, tuitionFee: 25000 },
  });

  
  const allCourses = [
    
    { code: 'CS101', nameAr: 'مقدمة في علوم الحاسب',    nameEn: 'Introduction to Computer Science', credits: 3, level: 1 },
    { code: 'CS102', nameAr: 'برمجة 1',                  nameEn: 'Programming 1',                    credits: 4, level: 1 },
    { code: 'CS103', nameAr: 'رياضيات للحاسب',           nameEn: 'Mathematics for Computing',        credits: 3, level: 1 },
    { code: 'CS104', nameAr: 'منطق رقمي',                nameEn: 'Digital Logic',                    credits: 3, level: 1 },
    { code: 'CS105', nameAr: 'مهارات التواصل',           nameEn: 'Communication Skills',             credits: 2, level: 1 },
    { code: 'CS106', nameAr: 'مقدمة في الخوارزميات',    nameEn: 'Introduction to Algorithms',       credits: 3, level: 1 },
    
    { code: 'CS201', nameAr: 'هياكل البيانات',           nameEn: 'Data Structures',                  credits: 4, level: 2 },
    { code: 'CS202', nameAr: 'برمجة 2',                  nameEn: 'Programming 2',                    credits: 4, level: 2 },
    { code: 'CS203', nameAr: 'قواعد البيانات',           nameEn: 'Database Systems',                 credits: 3, level: 2 },
    { code: 'CS204', nameAr: 'نظم التشغيل',              nameEn: 'Operating Systems',                credits: 3, level: 2 },
    { code: 'CS205', nameAr: 'شبكات الحاسب',             nameEn: 'Computer Networks',                credits: 3, level: 2 },
    { code: 'CS206', nameAr: 'الاحتمالات والإحصاء',     nameEn: 'Probability & Statistics',         credits: 3, level: 2 },
    
    { code: 'CS301', nameAr: 'هندسة البرمجيات',          nameEn: 'Software Engineering',             credits: 3, level: 3 },
    { code: 'CS302', nameAr: 'الذكاء الاصطناعي',         nameEn: 'Artificial Intelligence',          credits: 3, level: 3 },
    { code: 'CS303', nameAr: 'أمن المعلومات',            nameEn: 'Information Security',             credits: 3, level: 3 },
    { code: 'CS304', nameAr: 'تطوير تطبيقات الويب',     nameEn: 'Web Application Development',      credits: 3, level: 3 },
    { code: 'CS305', nameAr: 'معالجة الصور',             nameEn: 'Image Processing',                 credits: 3, level: 3 },
    
    { code: 'CS401', nameAr: 'مشروع التخرج 1',           nameEn: 'Graduation Project 1',             credits: 3, level: 4 },
    { code: 'CS402', nameAr: 'مشروع التخرج 2',           nameEn: 'Graduation Project 2',             credits: 3, level: 4 },
    { code: 'CS403', nameAr: 'الحوسبة السحابية',         nameEn: 'Cloud Computing',                  credits: 3, level: 4 },
    { code: 'CS404', nameAr: 'تعلم الآلة',               nameEn: 'Machine Learning',                 credits: 3, level: 4 },
    { code: 'CS405', nameAr: 'أخلاقيات الحاسب',         nameEn: 'Computer Ethics',                  credits: 2, level: 4 },
  ];
  const courseMap: Record<string, number> = {};
  for (const c of allCourses) {
    const rec = await prisma.course.upsert({ where: { code: c.code }, update: {}, create: { ...c, courseType: 'core', programId: csProgram.id } });
    courseMap[c.code] = rec.id;
  }

  
  
  const sem1 = await prisma.semester.upsert({ where: { id: 1 }, update: {}, create: { name: 'الفصل الأول 2021/2022',  year: 2021, season: 'fall',   startDate: new Date('2021-09-21'), endDate: new Date('2022-01-15'), registrationStart: new Date('2021-08-01'), registrationEnd: new Date('2021-09-30'), isActive: false } });
  const sem2 = await prisma.semester.upsert({ where: { id: 2 }, update: {}, create: { name: 'الفصل الثاني 2021/2022', year: 2022, season: 'spring', startDate: new Date('2022-02-10'), endDate: new Date('2022-06-20'), registrationStart: new Date('2022-01-15'), registrationEnd: new Date('2022-02-15'), isActive: false } });
  
  const sem3 = await prisma.semester.upsert({ where: { id: 3 }, update: {}, create: { name: 'الفصل الأول 2022/2023',  year: 2022, season: 'fall',   startDate: new Date('2022-09-21'), endDate: new Date('2023-01-15'), registrationStart: new Date('2022-08-01'), registrationEnd: new Date('2022-09-30'), isActive: false } });
  const sem4 = await prisma.semester.upsert({ where: { id: 4 }, update: {}, create: { name: 'الفصل الثاني 2022/2023', year: 2023, season: 'spring', startDate: new Date('2023-02-10'), endDate: new Date('2023-06-20'), registrationStart: new Date('2023-01-15'), registrationEnd: new Date('2023-02-15'), isActive: false } });
  
  const sem5 = await prisma.semester.upsert({ where: { id: 5 }, update: {}, create: { name: 'الفصل الأول 2023/2024',  year: 2023, season: 'fall',   startDate: new Date('2023-09-21'), endDate: new Date('2024-01-15'), registrationStart: new Date('2023-08-01'), registrationEnd: new Date('2023-09-30'), isActive: false } });
  const sem6 = await prisma.semester.upsert({ where: { id: 6 }, update: {}, create: { name: 'الفصل الثاني 2023/2024', year: 2024, season: 'spring', startDate: new Date('2024-02-10'), endDate: new Date('2024-06-20'), registrationStart: new Date('2024-01-15'), registrationEnd: new Date('2024-02-15'), isActive: false } });
  
  const sem7 = await prisma.semester.upsert({ where: { id: 7 }, update: {}, create: { name: 'الفصل الأول 2024/2025',  year: 2024, season: 'fall',   startDate: new Date('2024-09-21'), endDate: new Date('2025-01-15'), registrationStart: new Date('2024-08-01'), registrationEnd: new Date('2024-09-30'), isActive: true  } });
  const sem8 = await prisma.semester.upsert({ where: { id: 8 }, update: {}, create: { name: 'الفصل الثاني 2024/2025', year: 2025, season: 'spring', startDate: new Date('2025-02-10'), endDate: new Date('2025-06-20'), registrationStart: new Date('2025-01-15'), registrationEnd: new Date('2025-02-15'), isActive: false } });

  
  const profData = [
    { email: 'prof.ahmed@aun.edu.eg',  firstName: 'أحمد',  lastName: 'علي',     nationalId: '30001010101010', empNum: 'PROF001', title: 'أ.د.' },
    { email: 'prof.sara@aun.edu.eg',   firstName: 'سارة',  lastName: 'محمود',   nationalId: '30001010101011', empNum: 'PROF002', title: 'د.'   },
    { email: 'prof.omar@aun.edu.eg',   firstName: 'عمر',   lastName: 'حسن',     nationalId: '30001010101012', empNum: 'PROF003', title: 'د.'   },
    { email: 'prof.nour@aun.edu.eg',   firstName: 'نور',   lastName: 'إبراهيم', nationalId: '30001010101013', empNum: 'PROF004', title: 'أ.د.' },
    { email: 'prof.khaled@aun.edu.eg', firstName: 'خالد',  lastName: 'عبدالله', nationalId: '30001010101014', empNum: 'PROF005', title: 'د.'   },
  ];
  const profIds: number[] = [];
  for (const p of profData) {
    const u = await prisma.user.upsert({ where: { email: p.email }, update: {}, create: { email: p.email, password: await hash('prof123', 12), firstName: p.firstName, lastName: p.lastName, nationalId: p.nationalId, roleId: professorRole.id } });
    const prof = await prisma.professor.upsert({ where: { employeeNumber: p.empNum }, update: {}, create: { userId: u.id, employeeNumber: p.empNum, title: p.title, specialization: 'Computer Science', officeLocation: `مبنى A - مكتب ${profIds.length + 101}` } });
    profIds.push(prof.id);
  }

  
  
  
  const groups = ['أ', 'ب', 'ج', 'د', 'ه'];
  const lectureRooms: Record<string, number> = {};
  const sectionRooms: Record<string, number> = {};

  for (let num = 1; num <= 9; num++) {
    for (const grp of groups) {
      const code = `LEC-${num}${grp}`;
      const rec = await prisma.classroom.upsert({
        where: { code },
        update: {},
        create: { code, name: `محاضرة ${num}${grp}`, building: `مبنى ${num <= 3 ? 'A' : num <= 6 ? 'B' : 'C'}`, capacity: 80, type: 'lecture' },
      });
      lectureRooms[`${num}${grp}`] = rec.id;
    }
  }
  for (let num = 1; num <= 4; num++) {
    for (const grp of groups) {
      const code = `SEC-${num}${grp}`;
      const rec = await prisma.classroom.upsert({
        where: { code },
        update: {},
        create: { code, name: `سكشن ${num}${grp}`, building: `مبنى ${num <= 2 ? 'D' : 'E'}`, capacity: 30, type: 'section' },
      });
      sectionRooms[`${num}${grp}`] = rec.id;
    }
  }

  
  
  const semCourseMap: { sem: typeof sem1; codes: string[] }[] = [
    { sem: sem1, codes: ['CS101','CS102','CS103','CS104','CS105'] },
    { sem: sem2, codes: ['CS101','CS102','CS103','CS104','CS105','CS106'] },
    { sem: sem3, codes: ['CS201','CS202','CS203','CS204','CS205'] },
    { sem: sem4, codes: ['CS201','CS202','CS203','CS204','CS205','CS206'] },
    { sem: sem5, codes: ['CS301','CS302','CS303','CS304','CS305'] },
    { sem: sem6, codes: ['CS301','CS302','CS303','CS304','CS305'] },
    { sem: sem7, codes: ['CS401','CS402','CS403','CS404','CS405'] },
  ];

  
  const offeringMap: Record<number, Record<string, number>> = {};
  for (const { sem, codes } of semCourseMap) {
    offeringMap[sem.id] = {};
    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      const existing = await prisma.courseOffering.findUnique({ where: { courseId_semesterId: { courseId: courseMap[code], semesterId: sem.id } } });
      const rec = existing ?? await prisma.courseOffering.create({ data: { courseId: courseMap[code], semesterId: sem.id, professorId: profIds[i % profIds.length], maxStudents: 80, enrolledCount: 60 } });
      offeringMap[sem.id][code] = rec.id;
    }
  }

  
  
  
  const sem7Courses = semCourseMap.find(s => s.sem.id === sem7.id)!.codes;
  const days = [0, 1, 2, 3, 4]; 
  const lectureSlots = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '12:00', end: '14:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
  ];
  const sectionSlots = [
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '13:00', end: '14:00' },
  ];

  await prisma.attendance.deleteMany({ where: { scheduleEntry: { courseOffering: { semesterId: sem7.id } } } });
  await prisma.scheduleEntry.deleteMany({ where: { courseOffering: { semesterId: sem7.id } } });

  const scheduleIds: number[] = [];
  for (let i = 0; i < sem7Courses.length; i++) {
    const code = sem7Courses[i];
    const offeringId = offeringMap[sem7.id][code];
    const grp = groups[i % groups.length]; 
    const lecNum = (i % 9) + 1;            
    const secNum = (i % 4) + 1;            

    
    const lecRec = await prisma.scheduleEntry.create({
      data: {
        courseOfferingId: offeringId,
        classroomId: lectureRooms[`${lecNum}${grp}`],
        professorId: profIds[i % profIds.length],
        dayOfWeek: days[i % days.length],
        startTime: lectureSlots[i % lectureSlots.length].start,
        endTime:   lectureSlots[i % lectureSlots.length].end,
        sessionType: 'lecture',
      },
    });
    scheduleIds.push(lecRec.id);

    
    const secRec = await prisma.scheduleEntry.create({
      data: {
        courseOfferingId: offeringId,
        classroomId: sectionRooms[`${secNum}${grp}`],
        professorId: profIds[(i + 1) % profIds.length],
        dayOfWeek: days[(i + 2) % days.length],
        startTime: sectionSlots[i % sectionSlots.length].start,
        endTime:   sectionSlots[i % sectionSlots.length].end,
        sessionType: 'section',
      },
    });
    scheduleIds.push(secRec.id);
  }

  
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@aun.edu.eg' },
    update: {},
    create: { email: 'student@aun.edu.eg', password: await hash('student123', 12), firstName: 'محمد', lastName: 'سيد', nationalId: '12345678901237', roleId: studentRole.id, phone: '01012345678' },
  });
  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: { currentLevel: 4, gpa: 3.45, status: 'active' },
    create: { userId: studentUser.id, studentNumber: '2021001', programId: csProgram.id, enrollmentYear: 2021, currentLevel: 4, gpa: 3.45, status: 'active' },
  });

  
  
  const semGrades: Record<number, Record<string, [number, number, number]>> = {
    [sem1.id]: { CS101: [22,44,20], CS102: [20,40,18], CS103: [23,46,22], CS104: [21,42,19], CS105: [24,48,23] },
    [sem2.id]: { CS101: [21,43,21], CS102: [22,45,20], CS103: [20,41,19], CS104: [23,46,22], CS105: [24,47,23], CS106: [19,39,18] },
    [sem3.id]: { CS201: [21,43,20], CS202: [19,38,17], CS203: [22,45,21], CS204: [20,41,19], CS205: [23,46,22] },
    [sem4.id]: { CS201: [22,44,21], CS202: [20,40,19], CS203: [23,46,22], CS204: [21,42,20], CS205: [24,47,23], CS206: [20,41,19] },
    [sem5.id]: { CS301: [22,44,21], CS302: [21,43,20], CS303: [23,46,22], CS304: [20,41,19], CS305: [22,45,21] },
    [sem6.id]: { CS301: [23,46,22], CS302: [22,44,21], CS303: [21,43,20], CS304: [23,46,22], CS305: [24,47,23] },
  };

  for (const [semIdStr, grades] of Object.entries(semGrades)) {
    const semId = parseInt(semIdStr);
    for (const [code, [mid, fin, asgn]] of Object.entries(grades)) {
      const offeringId = offeringMap[semId]?.[code];
      if (!offeringId) continue;
      const total = mid + fin + asgn;
      const { letter, gp } = letterGrade(total);
      const existing = await prisma.registration.findUnique({ where: { studentId_courseOfferingId: { studentId: student.id, courseOfferingId: offeringId } } });
      const reg = existing ?? await prisma.registration.create({ data: { studentId: student.id, courseOfferingId: offeringId, semesterId: semId, status: 'completed' } });
      const existingGrade = await prisma.grade.findUnique({ where: { registrationId: reg.id } });
      if (!existingGrade) {
        await prisma.grade.create({ data: { registrationId: reg.id, studentId: student.id, midtermGrade: mid, finalGrade: fin, assignmentGrade: asgn, totalGrade: total, letterGrade: letter, gradePoint: gp, status: letter === 'F' ? 'fail' : 'pass' } });
      }
    }
  }

  
  for (const code of sem7Courses) {
    const offeringId = offeringMap[sem7.id][code];
    const existing = await prisma.registration.findUnique({ where: { studentId_courseOfferingId: { studentId: student.id, courseOfferingId: offeringId } } });
    if (!existing) {
      await prisma.registration.create({ data: { studentId: student.id, courseOfferingId: offeringId, semesterId: sem7.id, status: 'registered' } });
    }
  }

  
  const attendanceDates = [
    new Date('2024-09-22'), new Date('2024-09-24'), new Date('2024-09-29'),
    new Date('2024-10-01'), new Date('2024-10-06'), new Date('2024-10-08'),
    new Date('2024-10-13'), new Date('2024-10-15'), new Date('2024-10-20'),
    new Date('2024-10-22'), new Date('2024-10-27'), new Date('2024-10-29'),
  ];
  const attendanceStatuses = ['present','present','present','present','absent','present','present','present','late','present','present','present'];
  for (let si = 0; si < Math.min(scheduleIds.length, 4); si++) {
    for (let di = 0; di < attendanceDates.length; di++) {
      const exists = await prisma.attendance.findUnique({ where: { studentId_scheduleEntryId_date: { studentId: student.id, scheduleEntryId: scheduleIds[si], date: attendanceDates[di] } } });
      if (!exists) {
        await prisma.attendance.create({ data: { studentId: student.id, scheduleEntryId: scheduleIds[si], date: attendanceDates[di], status: attendanceStatuses[di] } });
      }
    }
  }

  
  const examDates: Record<string, { mid: string; fin: string }> = {
    CS401: { mid: '2024-11-10', fin: '2025-01-05' },
    CS402: { mid: '2024-11-11', fin: '2025-01-06' },
    CS403: { mid: '2024-11-12', fin: '2025-01-07' },
    CS404: { mid: '2024-11-13', fin: '2025-01-08' },
    CS405: { mid: '2024-11-14', fin: '2025-01-09' },
  };
  for (let i = 0; i < sem7Courses.length; i++) {
    const code = sem7Courses[i];
    const offeringId = offeringMap[sem7.id][code];
    const grp = groups[i % groups.length];
    const lecNum = (i % 9) + 1;
    const clsId = lectureRooms[`${lecNum}${grp}`];
    for (const [type, dateStr] of [['midterm', examDates[code].mid], ['final', examDates[code].fin]] as [string, string][]) {
      const exists = await prisma.examSchedule.findFirst({ where: { courseOfferingId: offeringId, examType: type } });
      if (!exists) {
        await prisma.examSchedule.create({ data: { courseOfferingId: offeringId, classroomId: clsId, examType: type, examDate: new Date(dateStr), startTime: '09:00', endTime: type === 'midterm' ? '11:00' : '12:00', duration: type === 'midterm' ? 120 : 180 } });
      }
    }
  }

  
  const payments = [
    { amount: 25000, date: '2021-09-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الأول 2021/2022',  receipt: 'REC-2021-001' },
    { amount: 25000, date: '2022-02-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الثاني 2021/2022', receipt: 'REC-2022-001' },
    { amount: 25000, date: '2022-09-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الأول 2022/2023',  receipt: 'REC-2022-002' },
    { amount: 25000, date: '2023-02-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الثاني 2022/2023', receipt: 'REC-2023-001' },
    { amount: 25000, date: '2023-09-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الأول 2023/2024',  receipt: 'REC-2023-002' },
    { amount: 25000, date: '2024-02-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الثاني 2023/2024', receipt: 'REC-2024-001' },
    { amount: 25000, date: '2024-09-01', method: 'bank_transfer', type: 'tuition', semester: 'الفصل الأول 2024/2025',  receipt: 'REC-2024-002' },
    { amount: 500,   date: '2024-09-05', method: 'cash',          type: 'activity', semester: null,                    receipt: 'REC-2024-003' },
    { amount: 1200,  date: '2024-09-10', method: 'cash',          type: 'housing',  semester: 'الفصل الأول 2024/2025', receipt: 'REC-2024-004' },
  ];
  for (const p of payments) {
    const exists = await prisma.payment.findUnique({ where: { receiptNumber: p.receipt } });
    if (!exists) {
      await prisma.payment.create({ data: { studentId: student.id, amount: p.amount, paymentDate: new Date(p.date), paymentMethod: p.method, paymentType: p.type, semesterYear: p.semester ?? undefined, receiptNumber: p.receipt, status: 'completed' } });
    }
  }

  
  let quiz1 = await prisma.quiz.findFirst({ where: { courseOfferingId: offeringMap[sem7.id]['CS401'] } });
  if (!quiz1) quiz1 = await prisma.quiz.create({ data: { title: 'كويز 1 - مشروع التخرج', titleEn: 'Quiz 1 - Graduation Project', courseOfferingId: offeringMap[sem7.id]['CS401'], duration: 30, totalMarks: 10, status: 'published' } });
  const existingQ1 = await prisma.quizQuestion.findFirst({ where: { quizId: quiz1.id } });
  if (!existingQ1) {
    await prisma.quizQuestion.createMany({ data: [
      { quizId: quiz1.id, question: 'ما هي مراحل دورة حياة البرمجيات؟', questionEn: 'What are SDLC phases?', optionA: 'التحليل والتصميم والتنفيذ والاختبار', optionB: 'البرمجة فقط', optionC: 'التصميم فقط', optionD: 'الاختبار فقط', correctAnswer: 'A' },
      { quizId: quiz1.id, question: 'ما هو الـ Agile؟', questionEn: 'What is Agile?', optionA: 'لغة برمجة', optionB: 'منهجية تطوير برمجيات', optionC: 'قاعدة بيانات', optionD: 'نظام تشغيل', correctAnswer: 'B' },
    ]});
  }
  const existingSub = await prisma.quizSubmission.findUnique({ where: { quizId_studentId: { quizId: quiz1.id, studentId: student.id } } });
  if (!existingSub) {
    await prisma.quizSubmission.create({ data: { quizId: quiz1.id, studentId: student.id, score: 9, totalMarks: 10, answers: JSON.stringify({ 1: 'A', 2: 'B' }) } });
  }

  let quiz2 = await prisma.quiz.findFirst({ where: { courseOfferingId: offeringMap[sem7.id]['CS403'] } });
  if (!quiz2) quiz2 = await prisma.quiz.create({ data: { title: 'كويز 1 - الحوسبة السحابية', titleEn: 'Quiz 1 - Cloud Computing', courseOfferingId: offeringMap[sem7.id]['CS403'], duration: 20, totalMarks: 10, status: 'published' } });
  const existingQ2 = await prisma.quizQuestion.findFirst({ where: { quizId: quiz2.id } });
  if (!existingQ2) {
    await prisma.quizQuestion.createMany({ data: [
      { quizId: quiz2.id, question: 'ما هو الـ IaaS؟', questionEn: 'What is IaaS?', optionA: 'بنية تحتية كخدمة', optionB: 'برمجيات كخدمة', optionC: 'منصة كخدمة', optionD: 'شبكة كخدمة', correctAnswer: 'A' },
      { quizId: quiz2.id, question: 'ما هو الـ SaaS؟', questionEn: 'What is SaaS?', optionA: 'بنية تحتية كخدمة', optionB: 'برمجيات كخدمة', optionC: 'منصة كخدمة', optionD: 'تخزين كخدمة', correctAnswer: 'B' },
    ]});
  }

  
  const existingMilitary = await prisma.militaryStatus.findUnique({ where: { studentId: student.id } });
  if (!existingMilitary) {
    await prisma.militaryStatus.create({ data: { studentId: student.id, status: 'deferred', defermentNumber: 'DEF-2024-001', issueDate: new Date('2024-09-01'), expiryDate: new Date('2025-09-01'), militaryOffice: 'مكتب التجنيد - أسيوط', notes: 'تأجيل بسبب الدراسة الجامعية' } });
  }
  await prisma.militaryDocument.deleteMany({ where: { studentId: student.id } });
  await prisma.militaryDocument.createMany({ data: [
    { studentId: student.id, nameAr: 'شهادة التأجيل', nameEn: 'Deferment Certificate', docType: 'PDF', docDate: new Date('2024-09-01'), status: 'available' },
    { studentId: student.id, nameAr: 'بطاقة الهوية العسكرية', nameEn: 'Military ID', docType: 'PDF', docDate: new Date('2024-09-01'), status: 'available' },
  ]});
  await prisma.militaryTimeline.deleteMany({ where: { studentId: student.id } });
  await prisma.militaryTimeline.createMany({ data: [
    { studentId: student.id, eventAr: 'تسجيل في الجامعة', eventEn: 'University Enrollment', eventDate: new Date('2021-09-21'), status: 'done' },
    { studentId: student.id, eventAr: 'تقديم طلب التأجيل الأول', eventEn: 'First Deferment Application', eventDate: new Date('2022-08-15'), status: 'done' },
    { studentId: student.id, eventAr: 'تجديد التأجيل', eventEn: 'Deferment Renewal', eventDate: new Date('2023-08-15'), status: 'done' },
    { studentId: student.id, eventAr: 'الحصول على شهادة التأجيل الحالية', eventEn: 'Current Deferment Certificate', eventDate: new Date('2024-09-01'), status: 'done' },
    { studentId: student.id, eventAr: 'تجديد التأجيل القادم', eventEn: 'Next Deferment Renewal', eventDate: new Date('2025-08-01'), status: 'pending' },
  ]});

  
  const building1 = await prisma.housingBuilding.upsert({ where: { id: 1 }, update: {}, create: { nameAr: 'مبنى الطلاب A', nameEn: 'Students Building A', typeAr: 'مبنى ذكور', typeEn: 'Male Dormitory', capacity: 200, pricePerSem: 1200, facilitiesAr: '["واي فاي","مطبخ مشترك","غرفة دراسة","أمن 24 ساعة"]', facilitiesEn: '["WiFi","Shared Kitchen","Study Room","24h Security"]', isActive: true } });
  const room1 = await prisma.housingRoom.upsert({ where: { buildingId_roomNumber: { buildingId: building1.id, roomNumber: '101' } }, update: {}, create: { buildingId: building1.id, roomNumber: '101', floor: 1, capacity: 2 } });
  const existingHousing = await prisma.housingAssignment.findFirst({ where: { studentId: student.id } });
  if (!existingHousing) {
    await prisma.housingAssignment.create({ data: { studentId: student.id, roomId: room1.id, checkIn: new Date('2024-09-21'), checkOut: new Date('2025-01-15'), semFees: 1200, paidAmount: 1200, status: 'active' } });
  }
  await prisma.maintenanceRequest.deleteMany({ where: { studentId: student.id } });
  await prisma.maintenanceRequest.create({ data: { studentId: student.id, typeAr: 'صيانة كهربائية', typeEn: 'Electrical Maintenance', descAr: 'مشكلة في الإضاءة بالغرفة', descEn: 'Lighting issue in room', status: 'completed' } });

  
  const busRoute = await prisma.busRoute.upsert({ where: { id: 1 }, update: {}, create: { nameAr: 'خط أسيوط - الجامعة', nameEn: 'Assiut - University Line', departureTime: '07:00', arrivalTime: '07:45', returnDepTime: '16:00', returnArrTime: '16:45', pricePerDay: 10, capacity: 50, stopsAr: '["ميدان أسيوط","شارع الجامعة","بوابة الجامعة"]', stopsEn: '["Assiut Square","University St","University Gate"]', isActive: true } });
  const existingBus = await prisma.busSubscription.findFirst({ where: { studentId: student.id } });
  if (!existingBus) {
    await prisma.busSubscription.create({ data: { studentId: student.id, routeId: busRoute.id, startDate: new Date('2024-09-21'), endDate: new Date('2025-01-15'), totalPaid: 500, status: 'active' } });
  }

  
  const actList = [
    { titleAr: 'بطولة كرة القدم', titleEn: 'Football Tournament', catAr: 'رياضة', catEn: 'Sports', date: '2024-11-15', timeAr: '3:00 م', timeEn: '3:00 PM', locAr: 'الملعب الرئيسي', locEn: 'Main Stadium', pts: 20 },
    { titleAr: 'ورشة الحوسبة السحابية', titleEn: 'Cloud Computing Workshop', catAr: 'أكاديمي', catEn: 'Academic', date: '2024-11-20', timeAr: '10:00 ص', timeEn: '10:00 AM', locAr: 'مختبر الحاسب', locEn: 'Computer Lab', pts: 15 },
    { titleAr: 'يوم التطوع', titleEn: 'Volunteer Day', catAr: 'تطوعي', catEn: 'Volunteer', date: '2024-12-01', timeAr: '9:00 ص', timeEn: '9:00 AM', locAr: 'مبنى الإدارة', locEn: 'Admin Building', pts: 25 },
  ];
  for (const a of actList) {
    const act = await prisma.activity.create({ data: { titleAr: a.titleAr, titleEn: a.titleEn, categoryAr: a.catAr, categoryEn: a.catEn, date: new Date(a.date), timeAr: a.timeAr, timeEn: a.timeEn, locationAr: a.locAr, locationEn: a.locEn, maxParticipants: 50, points: a.pts, status: 'available' } });
    const existingReg = await prisma.activityRegistration.findUnique({ where: { activityId_studentId: { activityId: act.id, studentId: student.id } } });
    if (!existingReg) {
      await prisma.activityRegistration.create({ data: { activityId: act.id, studentId: student.id, status: 'registered' } });
    }
  }

  
  await prisma.serviceRequest.deleteMany({ where: { studentId: student.id } });
  await prisma.serviceRequest.createMany({ data: [
    { studentId: student.id, serviceKey: 'transcript', status: 'completed', notes: 'تم إصدار كشف الدرجات' },
    { studentId: student.id, serviceKey: 'enrollment_certificate', status: 'pending', notes: 'قيد المعالجة' },
  ]});

  
  await prisma.loginSession.deleteMany({ where: { userId: studentUser.id } });
  await prisma.loginSession.createMany({ data: [
    { userId: studentUser.id, device: 'Chrome - Windows', location: 'أسيوط، مصر', ipAddress: '197.32.10.1', isCurrent: true },
    { userId: studentUser.id, device: 'Safari - iPhone',  location: 'القاهرة، مصر', ipAddress: '197.32.10.2', isCurrent: false },
  ]});

  
  const existingSecurity = await prisma.securitySettings.findUnique({ where: { userId: studentUser.id } });
  if (!existingSecurity) {
    await prisma.securitySettings.create({ data: { userId: studentUser.id, twoFactor: false, loginNotif: true, activityLog: true } });
  }

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
