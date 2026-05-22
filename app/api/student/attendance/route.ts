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
      select: { id: true, name: true },
    });
    if (!semester) return NextResponse.json({ courses: [], semester: null });

    
    const registrations = await prisma.registration.findMany({
      where: { studentId: student.id, semesterId: semester.id },
      include: {
        courseOffering: {
          include: {
            course: { select: { code: true, nameAr: true, nameEn: true, credits: true } },
            scheduleEntries: {
              include: {
                attendances: {
                  where: { studentId: student.id },
                  orderBy: { date: 'asc' },
                },
              },
              orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
            },
          },
        },
      },
    });

    const courses = registrations.map(reg => {
      const course = reg.courseOffering.course;

      
      const sessions: {
        date: string;
        dayOfWeek: number;
        startTime: string;
        sessionType: string;
        status: 'present' | 'absent' | 'excused' | 'no-record';
      }[] = [];

      for (const entry of reg.courseOffering.scheduleEntries) {
        for (const att of entry.attendances) {
          sessions.push({
            date: att.date.toISOString().slice(0, 10),
            dayOfWeek: entry.dayOfWeek,
            startTime: entry.startTime,
            sessionType: entry.sessionType,
            status: att.status as 'present' | 'absent' | 'excused',
          });
        }
      }

      
      sessions.sort((a, b) => a.date.localeCompare(b.date));

      const total    = sessions.length;
      const present  = sessions.filter(s => s.status === 'present').length;
      const excused  = sessions.filter(s => s.status === 'excused').length;
      const absent   = sessions.filter(s => s.status === 'absent').length;
      const rate     = total > 0 ? Math.round(((present + excused) / total) * 100) : 100;

      return {
        courseCode: course.code,
        courseNameAr: course.nameAr,
        courseNameEn: course.nameEn,
        credits: course.credits,
        total, present, excused, absent, rate,
        sessions,
      };
    });

    
    const totalAll   = courses.reduce((s, c) => s + c.total, 0);
    const presentAll = courses.reduce((s, c) => s + c.present + c.excused, 0);
    const absentAll  = courses.reduce((s, c) => s + c.absent, 0);
    const overallRate = totalAll > 0 ? Math.round((presentAll / totalAll) * 100) : 100;

    return NextResponse.json({
      courses,
      stats: { total: totalAll, present: presentAll, absent: absentAll, rate: overallRate },
      semester,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
