import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const faculties = await prisma.faculty.findMany({
      include: {
        departments: {
          include: {
            programs: true,
          },
        },
      },
      orderBy: { nameAr: 'asc' },
    });
    return NextResponse.json(faculties);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const faculty = await prisma.faculty.create({ data });
    return NextResponse.json(faculty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
