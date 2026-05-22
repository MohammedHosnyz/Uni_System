import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId مطلوب' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      select: { id: true, currentLevel: true, programId: true },
    });
    if (!student) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    const activeSemester = await prisma.semester.findFirst({ where: { isActive: true } });

    
    const registrations = await prisma.registration.findMany({
      where: {
        studentId: student.id,
        courseOffering: {
          course: { level: student.currentLevel },
        },
      },
      include: {
        courseOffering: {
          include: {
            course: { select: { id: true, code: true, nameAr: true, nameEn: true, credits: true, level: true } },
            professor: { include: { user: { select: { firstName: true, lastName: true } } } },
            semester: { select: { name: true } },
          },
        },
        grade: {
          select: {
            midtermGrade: true,
            finalGrade: true,
            assignmentGrade: true,
            totalGrade: true,
            letterGrade: true,
            status: true,
          },
        },
      },
      orderBy: { registrationDate: 'asc' },
    });

    const courses = registrations.map(r => ({
      registrationId: r.id,
      courseId: r.courseOffering.course.id,
      code: r.courseOffering.course.code,
      nameAr: r.courseOffering.course.nameAr,
      nameEn: r.courseOffering.course.nameEn,
      credits: r.courseOffering.course.credits,
      level: r.courseOffering.course.level,
      semesterName: r.courseOffering.semester.name,
      professor: r.courseOffering.professor
        ? `${r.courseOffering.professor.user.firstName} ${r.courseOffering.professor.user.lastName}`
        : null,
      grade: r.grade ?? null,
    }));

    return NextResponse.json({
      semesterName: activeSemester?.name ?? null,
      currentLevel: student.currentLevel,
      courses,
    });
  } catch (error) {
    console.error('student/courses error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
