import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      select: { id: true },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    
    const semester = await prisma.semester.findFirst({
      where: { isActive: true },
      select: { id: true, name: true, year: true },
    });
    if (!semester) return NextResponse.json({ exams: [], semester: null });

    
    const registrations = await prisma.registration.findMany({
      where: { studentId: student.id, semesterId: semester.id },
      select: { courseOfferingId: true },
    });
    const offeringIds = registrations.map(r => r.courseOfferingId);

    
    const exams = await prisma.examSchedule.findMany({
      where: { courseOfferingId: { in: offeringIds } },
      include: {
        courseOffering: {
          include: {
            course: { select: { code: true, nameAr: true, nameEn: true, credits: true } },
          },
        },
        classroom: { select: { code: true, name: true, building: true } },
      },
      orderBy: [{ examDate: 'asc' }, { startTime: 'asc' }],
    });

    const today = new Date(); today.setHours(0, 0, 0, 0);

    const result = exams.map(e => {
      const examDay = new Date(e.examDate); examDay.setHours(0, 0, 0, 0);
      const diff = Math.ceil((examDay.getTime() - today.getTime()) / 86400000);
      const status = diff === 0 ? 'today' : diff > 0 ? 'upcoming' : 'completed';
      return {
        id: e.id,
        courseCode: e.courseOffering.course.code,
        courseNameAr: e.courseOffering.course.nameAr,
        courseNameEn: e.courseOffering.course.nameEn,
        credits: e.courseOffering.course.credits,
        examType: e.examType,
        examDate: e.examDate.toISOString().slice(0, 10),
        startTime: e.startTime,
        endTime: e.endTime,
        duration: e.duration,
        room: `${e.classroom.building} - ${e.classroom.name}`,
        status,
        daysLeft: Math.max(0, diff),
      };
    });

    return NextResponse.json({ exams: result, semester });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
