import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const db = prisma as any;


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        program: { select: { nameAr: true, nameEn: true, code: true } },
      },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const requests = await db.serviceRequest.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      student: {
        name: `${student.user.firstName} ${student.user.lastName}`,
        email: student.user.email,
        studentNumber: student.studentNumber,
        program: student.program,
        gpa: student.gpa ? Number(student.gpa) : null,
        currentLevel: student.currentLevel,
      },
      requests,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const { userId, serviceKey, notes } = await req.json();
    if (!userId || !serviceKey) return NextResponse.json({ error: 'userId and serviceKey required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const request = await db.serviceRequest.create({
      data: { studentId: student.id, serviceKey, notes: notes || null },
    });

    return NextResponse.json({ request }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
