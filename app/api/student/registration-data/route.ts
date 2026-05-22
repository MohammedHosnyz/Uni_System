import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ error: 'userId مطلوب' }, { status: 400 });

    const studentRecord = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      include: { program: { select: { totalCredits: true } } },
    });
    if (!studentRecord) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    const sid = studentRecord.id;

    const activeSemester = await prisma.semester.findFirst({ where: { isActive: true } });
    if (!activeSemester) return NextResponse.json({ error: 'لا يوجد فصل دراسي نشط' }, { status: 404 });

    
    const passedRegs = await prisma.registration.findMany({
      where: { studentId: sid, grade: { status: 'pass' } },
      include: { courseOffering: { include: { course: { select: { credits: true } } } } },
    });
    const completedCredits = passedRegs.reduce((s, r) => s + r.courseOffering.course.credits, 0);

    
    const currentRegs = await prisma.registration.findMany({
      where: { studentId: sid, semesterId: activeSemester.id },
      include: { courseOffering: { include: { course: { select: { credits: true } } } } },
    });
    const inProgressCredits = currentRegs.reduce((s, r) => s + r.courseOffering.course.credits, 0);

    
    const registeredOfferingIds = new Set(currentRegs.map(r => r.courseOfferingId));

    
    const offerings = await prisma.courseOffering.findMany({
      where: {
        semesterId: activeSemester.id,
        course: {
          programId: studentRecord.programId,
          level: studentRecord.currentLevel,
        },
      },
      include: {
        course: { select: { id: true, code: true, nameAr: true, nameEn: true, credits: true, level: true } },
        professor: { include: { user: { select: { firstName: true, lastName: true } } } },
      },
    });

    const courses = offerings.map(o => ({
      id: o.course.id,
      offeringId: o.id,
      code: o.course.code,
      nameAr: o.course.nameAr,
      nameEn: o.course.nameEn,
      credits: o.course.credits,
      alreadyRegistered: registeredOfferingIds.has(o.id),
      sections: [{
        id: o.id,
        professorName: o.professor
          ? `${o.professor.user.firstName} ${o.professor.user.lastName}`
          : '—',
        enrolledCount: o.enrolledCount,
        maxStudents: o.maxStudents,
      }],
    }));

    return NextResponse.json({
      semesterName: activeSemester.name,
      semesterId: activeSemester.id,
      registrationEnd: activeSemester.registrationEnd.toISOString(),
      completedCredits,
      inProgressCredits,
      totalRequired: studentRecord.program.totalCredits,
      courses,
    });
  } catch (error) {
    console.error('registration-data error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
