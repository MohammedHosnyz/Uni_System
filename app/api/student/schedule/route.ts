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
      select: { id: true, name: true, year: true, season: true },
    });
    if (!semester) return NextResponse.json({ sessions: [], semester: null });

    
    const registrations = await prisma.registration.findMany({
      where: {
        studentId: student.id,
        semesterId: semester.id,
        status: { in: ['registered', 'completed'] },
      },
      include: {
        courseOffering: {
          include: {
            course: { select: { code: true, nameAr: true, nameEn: true, courseType: true } },
            professor: { include: { user: { select: { firstName: true, lastName: true } } } },
            scheduleEntries: {
              include: {
                classroom: { select: { code: true, name: true, building: true } },
                professor: { include: { user: { select: { firstName: true, lastName: true } } } },
              },
            },
          },
        },
      },
    });

    const sessions = registrations.flatMap((reg) =>
      reg.courseOffering.scheduleEntries.map((entry) => {
        const prof = entry.professor ?? reg.courseOffering.professor;
        return {
          id: entry.id,
          dayOfWeek: entry.dayOfWeek,
          startTime: entry.startTime,
          endTime: entry.endTime,
          timeRange: `${entry.startTime}-${entry.endTime}`,
          sessionType: entry.sessionType,
          courseCode: reg.courseOffering.course.code,
          courseNameAr: reg.courseOffering.course.nameAr,
          courseNameEn: reg.courseOffering.course.nameEn,
          room: entry.classroom
            ? `${entry.classroom.building} - ${entry.classroom.code}`
            : '—',
          professorName: prof
            ? `${prof.user.firstName} ${prof.user.lastName}`
            : null,
        };
      })
    );

    
    sessions.sort((a, b) =>
      a.dayOfWeek !== b.dayOfWeek
        ? a.dayOfWeek - b.dayOfWeek
        : a.startTime.localeCompare(b.startTime)
    );

    return NextResponse.json({ sessions, semester });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
