import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get('programId');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (programId) where.programId = parseInt(programId);
    if (status) where.status = status;

    const students = await prisma.student.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true } },
        program: { include: { department: { include: { faculty: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      email, password, firstName, lastName, phone, nationalId,
      studentNumber, programId, enrollmentYear, currentLevel
    } = data;

    const studentRole = await prisma.role.findUnique({ where: { name: 'student' } });
    if (!studentRole) {
      return NextResponse.json({ error: 'دور الطالب غير موجود' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        studentNumber,
        enrollmentYear,
        currentLevel: currentLevel || 1,
        program: {
          connect: { id: programId }
        },
        user: {
          create: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            nationalId,
            roleId: studentRole.id,
          },
        },
      },
      include: {
        user: true,
        program: { include: { department: { include: { faculty: true } } } },
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Create student error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة الطالب' }, { status: 500 });
  }
}
