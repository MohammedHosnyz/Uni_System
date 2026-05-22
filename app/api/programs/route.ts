import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');

    const where = departmentId ? { departmentId: parseInt(departmentId) } : {};
    const programs = await prisma.program.findMany({
      where,
      include: {
        department: { include: { faculty: true } },
        courses: true,
      },
      orderBy: { nameAr: 'asc' },
    });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const program = await prisma.program.create({ data });
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
