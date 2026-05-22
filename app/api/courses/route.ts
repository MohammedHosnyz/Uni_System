import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get('programId');
    const level = searchParams.get('level');

    const where: Record<string, unknown> = {};
    if (programId) where.programId = parseInt(programId);
    if (level) where.level = parseInt(level);

    const courses = await prisma.course.findMany({
      where,
      include: {
        program: { include: { department: true } },
        prerequisites: { include: { prerequisite: true } },
        offerings: { include: { semester: true, professor: { include: { user: true } } } },
      },
      orderBy: { code: 'asc' },
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { prerequisites, ...courseData } = data;

    const course = await prisma.course.create({
      data: {
        ...courseData,
        prerequisites: prerequisites
          ? {
              create: prerequisites.map((prereqId: number) => ({
                prerequisiteId: prereqId,
              })),
            }
          : undefined,
      },
      include: { prerequisites: true },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
