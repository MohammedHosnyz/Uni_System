import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseOfferingId = searchParams.get('courseOfferingId');
    const classroomId = searchParams.get('classroomId');

    const where: Record<string, unknown> = {};
    if (courseOfferingId) where.courseOfferingId = parseInt(courseOfferingId);
    if (classroomId) where.classroomId = parseInt(classroomId);

    const schedule = await prisma.scheduleEntry.findMany({
      where,
      include: {
        courseOffering: {
          include: {
            course: true,
            semester: true,
          },
        },
        classroom: true,
        professor: { include: { user: true } },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    
    const conflicts = await prisma.scheduleEntry.findMany({
      where: {
        AND: [
          {
            OR: [
              { classroomId: data.classroomId },
              { professorId: data.professorId },
            ],
          },
          { dayOfWeek: data.dayOfWeek },
          {
            OR: [
              {
                AND: [
                  { startTime: { lte: data.startTime } },
                  { endTime: { gt: data.startTime } },
                ],
              },
              {
                AND: [
                  { startTime: { lt: data.endTime } },
                  { endTime: { gte: data.endTime } },
                ],
              },
            ],
          },
        ],
      },
    });

    if (conflicts.length > 0) {
      return NextResponse.json(
        { error: 'يوجد تعارض في الجدول' },
        { status: 400 }
      );
    }

    const scheduleEntry = await prisma.scheduleEntry.create({
      data,
      include: {
        courseOffering: { include: { course: true } },
        classroom: true,
        professor: { include: { user: true } },
      },
    });

    return NextResponse.json(scheduleEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
