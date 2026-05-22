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
        program: {
          select: {
            totalCredits: true, nameAr: true, nameEn: true,
            department: { select: { nameAr: true, nameEn: true, faculty: { select: { nameAr: true, nameEn: true } } } },
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
      orderBy: { createdAt: 'desc' },
    });

    
    const inProgressRegs = await prisma.registration.findMany({
      where: { studentId: student.id, grade: null },
      include: {
        courseOffering: {
          include: {
            course: { select: { code: true, nameAr: true, nameEn: true, credits: true } },
            semester: { select: { name: true, year: true, season: true } },
          },
        },
      },
    });

    const completedCredits = grades
      .filter(g => g.status === 'pass')
      .reduce((s, g) => s + g.registration.courseOffering.course.credits, 0);

    const gpa = (() => {
      const passed = grades.filter(g => g.status === 'pass' && g.gradePoint);
      if (!passed.length) return null;
      const totalPoints = passed.reduce((s, g) => s + Number(g.gradePoint) * g.registration.courseOffering.course.credits, 0);
      const totalCredits = passed.reduce((s, g) => s + g.registration.courseOffering.course.credits, 0);
      return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null;
    })();

    return NextResponse.json({
      student: {
        currentLevel: student.currentLevel,
        gpa: student.gpa ?? gpa,
        completedCredits,
        totalRequired: student.program.totalCredits,
        programNameAr: student.program.nameAr,
        programNameEn: student.program.nameEn,
        deptNameAr: student.program.department.nameAr,
        deptNameEn: student.program.department.nameEn,
        facultyNameAr: student.program.department.faculty.nameAr,
        facultyNameEn: student.program.department.faculty.nameEn,
      },
      grades: grades.map(g => ({
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
      })),
      inProgress: inProgressRegs.map(r => ({
        id: r.id,
        courseCode: r.courseOffering.course.code,
        courseNameAr: r.courseOffering.course.nameAr,
        courseNameEn: r.courseOffering.course.nameEn,
        credits: r.courseOffering.course.credits,
        semesterName: r.courseOffering.semester.name,
        semesterYear: r.courseOffering.semester.year,
      })),
    });
  } catch (error) {
    console.error('student/grades error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
