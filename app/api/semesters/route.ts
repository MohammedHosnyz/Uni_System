import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const semesters = await prisma.semester.findMany({
      include: {
        courseOfferings: {
          include: {
            course: true,
            professor: { include: { user: true } },
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });
    return NextResponse.json(semesters);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const semester = await prisma.semester.create({ data });
    return NextResponse.json(semester, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
