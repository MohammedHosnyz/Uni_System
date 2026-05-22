import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId مطلوب' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: { select: { email: true, firstName: true, lastName: true } },
        program: {
          select: {
            nameAr: true, nameEn: true, totalCredits: true,
            department: {
              select: {
                nameAr: true, nameEn: true,
                faculty: { select: { nameAr: true, nameEn: true } },
              },
            },
          },
        },
      },
    });
    if (!student) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    const grades = await prisma.grade.findMany({
      where: { studentId: student.id },
      include: {
        registration: {
          include: {
            courseOffering: {
              include: {
                course: { select: { code: true, nameAr: true, nameEn: true, credits: true } },
                semester: { select: { name: true, year: true, season: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const records = grades.map(g => ({
      id: g.id,
      courseCode: g.registration.courseOffering.course.code,
      courseNameAr: g.registration.courseOffering.course.nameAr,
      courseNameEn: g.registration.courseOffering.course.nameEn,
      credits: g.registration.courseOffering.course.credits,
      semesterName: g.registration.courseOffering.semester.name,
      semesterYear: g.registration.courseOffering.semester.year,
      midtermGrade: g.midtermGrade ? Number(g.midtermGrade) : null,
      finalGrade: g.finalGrade ? Number(g.finalGrade) : null,
      assignmentGrade: g.assignmentGrade ? Number(g.assignmentGrade) : null,
      totalGrade: g.totalGrade ? Number(g.totalGrade) : null,
      letterGrade: g.letterGrade,
      gradePoint: g.gradePoint ? Number(g.gradePoint) : null,
      status: g.status,
    }));

    
    const passed = records.filter(r => r.gradePoint !== null && r.status === 'pass');
    const gpa = passed.length
      ? (passed.reduce((s, r) => s + r.gradePoint! * r.credits, 0) /
         passed.reduce((s, r) => s + r.credits, 0)).toFixed(2)
      : null;

    const completedCredits = passed.reduce((s, r) => s + r.credits, 0);

    return NextResponse.json({
      student: {
        email: student.user.email,
        studentNumber: student.studentNumber,
        currentLevel: student.currentLevel,
        enrollmentYear: student.enrollmentYear,
        gpa: student.gpa ? Number(student.gpa) : (gpa ? parseFloat(gpa) : null),
        completedCredits,
        totalRequired: student.program.totalCredits,
        programNameAr: student.program.nameAr,
        programNameEn: student.program.nameEn,
        deptNameAr: student.program.department.nameAr,
        deptNameEn: student.program.department.nameEn,
        facultyNameAr: student.program.department.faculty.nameAr,
        facultyNameEn: student.program.department.faculty.nameEn,
      },
      records,
    });
  } catch (error) {
    console.error('academic-record error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
