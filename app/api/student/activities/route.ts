import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const db = prisma as any;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const [activities, myRegs] = await Promise.all([
      db.activity.findMany({ orderBy: { date: 'asc' } }),
      db.activityRegistration.findMany({
        where: { studentId: student.id },
        include: { activity: true },
      }),
    ]);

    
    const regMap = new Map(myRegs.map((r: { activityId: number; status: string }) => [r.activityId, r.status]));

    const enriched = await Promise.all(
      activities.map(async (a: { id: number }) => {
        const count = await db.activityRegistration.count({ where: { activityId: a.id } });
        return { ...a, participantCount: count, myStatus: regMap.get(a.id) ?? null };
      })
    );

    
    const totalPoints = myRegs
      .filter((r: { status: string }) => r.status === 'attended')
      .reduce((sum: number, r: { activity: { points: number } }) => sum + (r.activity.points ?? 0), 0);

    return NextResponse.json({ activities: enriched, totalPoints });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const { userId, activityId } = await req.json();
    if (!userId || !activityId) return NextResponse.json({ error: 'userId and activityId required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const existing = await db.activityRegistration.findUnique({
      where: { activityId_studentId: { activityId, studentId: student.id } },
    });
    if (existing) return NextResponse.json({ error: 'Already registered' }, { status: 409 });

    const reg = await db.activityRegistration.create({
      data: { activityId, studentId: student.id, status: 'registered' },
    });

    return NextResponse.json({ registration: reg }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
