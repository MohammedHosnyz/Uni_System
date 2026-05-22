import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: true,
        program: {
          include: {
            department: { include: { faculty: true } },
          },
        },
        grades: {
          where: { status: 'pass' },
          include: { registration: { include: { courseOffering: { include: { course: { select: { credits: true } } } } } } },
        },
        registrations: { select: { id: true } },
      },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const completedCredits = student.grades.reduce(
      (s, g) => s + g.registration.courseOffering.course.credits, 0
    );

    return NextResponse.json({
      id: student.id,
      userId: student.userId,
      studentNumber: student.studentNumber,
      enrollmentYear: student.enrollmentYear,
      currentLevel: student.currentLevel,
      status: student.status,
      gpa: student.gpa ? Number(student.gpa) : null,
      completedCredits,
      totalRequired: student.program.totalCredits,
      courseCount: student.registrations.length,
      user: {
        firstName: student.user.firstName,
        lastName: student.user.lastName,
        email: student.user.email,
        phone: student.user.phone,
        nationalId: student.user.nationalId,
      },
      program: {
        nameAr: student.program.nameAr,
        nameEn: student.program.nameEn,
      },
      department: {
        nameAr: student.program.department.nameAr,
        nameEn: student.program.department.nameEn,
      },
      faculty: {
        nameAr: student.program.department.faculty.nameAr,
        nameEn: student.program.department.faculty.nameEn,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, phone } = await req.json();
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { phone },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
