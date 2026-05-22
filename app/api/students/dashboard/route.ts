import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'studentId مطلوب' }, { status: 400 });
    }

    const userId = parseInt(studentId);

    
    const studentRecord = await prisma.student.findUnique({ where: { userId } });
    if (!studentRecord) {
      return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
    }
    const sid = studentRecord.id;

    
    const jsDay = new Date().getDay();
    const dbDay = jsDay === 0 ? 7 : jsDay;

    
    const [student, todaySchedule, registrations, recentGrades, passedRegs] = await Promise.all([

      prisma.student.findUnique({
        where: { id: sid },
        select: {
          gpa: true,
          currentLevel: true,
          program: { select: { totalCredits: true } },
        },
      }),

      prisma.scheduleEntry.findMany({
        where: {
          dayOfWeek: dbDay,
          courseOffering: { registrations: { some: { studentId: sid } } },
        },
        include: {
          courseOffering: {
            include: {
              course: { select: { nameAr: true, nameEn: true, code: true } },
            },
          },
          classroom: { select: { code: true, name: true, building: true } },
          professor: { include: { user: { select: { firstName: true, lastName: true } } } },
        },
        orderBy: { startTime: 'asc' },
      }),

      prisma.registration.findMany({
        where: { studentId: sid, semester: { isActive: true } },
        include: {
          courseOffering: {
            include: {
              course: { select: { nameAr: true, nameEn: true, code: true, credits: true } },
              professor: { include: { user: { select: { firstName: true, lastName: true } } } },
            },
          },
          grade: { select: { totalGrade: true, letterGrade: true, status: true } },
        },
      }),

      prisma.grade.findMany({
        where: { studentId: sid },
        include: {
          registration: {
            include: {
              courseOffering: {
                include: {
                  course: { select: { nameAr: true, nameEn: true, code: true } },
                  semester: { select: { name: true } },
                },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 3,
      }),

      prisma.registration.findMany({
        where: { studentId: sid, grade: { status: 'pass' } },
        include: { courseOffering: { include: { course: { select: { credits: true } } } } },
      }),
    ]);

    
    const creditsDone = passedRegs.reduce(
      (sum: number, r: typeof passedRegs[number]) => sum + r.courseOffering.course.credits,
      0
    );

    
    type AttRow = { status: string; cnt: bigint };
    const attRows = await prisma.$queryRaw<AttRow[]>`
      SELECT status, COUNT(*) as cnt
      FROM Attendance
      WHERE studentId = ${sid}
      GROUP BY status
    `;
    const totalSessions   = attRows.reduce((s: number, g: AttRow) => s + Number(g.cnt), 0);
    const presentSessions = attRows.find((g: AttRow) => g.status === 'present') ? Number(attRows.find((g: AttRow) => g.status === 'present')!.cnt) : 0;
    const attendanceRate  = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : null;

    
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    const scheduleWithStatus = todaySchedule.map((entry: typeof todaySchedule[number]) => {
      const [sh, sm] = entry.startTime.split(':').map(Number);
      const [eh, em] = entry.endTime.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin   = eh * 60 + em;
      const status =
        nowMinutes > endMin    ? 'completed' :
        nowMinutes >= startMin ? 'current'   : 'upcoming';

      return {
        id: entry.id,
        startTime: entry.startTime,
        endTime: entry.endTime,
        sessionType: entry.sessionType,
        status,
        course: entry.courseOffering.course,
        classroom: entry.classroom,
        professor: entry.professor
          ? { name: `${entry.professor.user.firstName} ${entry.professor.user.lastName}`, title: entry.professor.title }
          : null,
      };
    });

    return NextResponse.json({
      gpa: student?.gpa ?? null,
      currentLevel: student?.currentLevel ?? 1,
      totalCredits: student?.program.totalCredits ?? 132,
      completedCredits: creditsDone,
      attendanceRate,
      registeredCoursesCount: registrations.length,
      todaySchedule: scheduleWithStatus,
      registrations: registrations.map((r: typeof registrations[number]) => ({
        id: r.id,
        course: r.courseOffering.course,
        professor: r.courseOffering.professor
          ? { name: `${r.courseOffering.professor.user.firstName} ${r.courseOffering.professor.user.lastName}` }
          : null,
        grade: r.grade ?? null,
      })),
      recentGrades: recentGrades.map((g: typeof recentGrades[number]) => ({
        id: g.id,
        courseCode: g.registration.courseOffering.course.code,
        courseNameAr: g.registration.courseOffering.course.nameAr,
        courseNameEn: g.registration.courseOffering.course.nameEn,
        semesterName: g.registration.courseOffering.semester.name,
        totalGrade: g.totalGrade,
        letterGrade: g.letterGrade,
        status: g.status,
        updatedAt: g.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
