import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const semesterId = searchParams.get('semesterId');

    const where: Record<string, unknown> = {};
    if (studentId) where.studentId = parseInt(studentId);
    if (semesterId) where.semesterId = parseInt(semesterId);

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        student: { include: { user: true } },
        courseOffering: {
          include: {
            course: true,
            professor: { include: { user: true } },
            semester: true,
          },
        },
        grade: true,
      },
      orderBy: { registrationDate: 'desc' },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { courseOfferingId, semesterId } = data;

    
    let studentId: number = data.studentId;
    if (!studentId && data.studentUserId) {
      const rec = await prisma.student.findUnique({ where: { userId: parseInt(data.studentUserId) } });
      if (!rec) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
      studentId = rec.id;
    }

    const existing = await prisma.registration.findUnique({
      where: {
        studentId_courseOfferingId: { studentId, courseOfferingId },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'الطالب مسجل بالفعل في هذه المادة' },
        { status: 400 }
      );
    }

    
    const offering = await prisma.courseOffering.findUnique({
      where: { id: courseOfferingId },
    });

    if (offering && offering.enrolledCount >= offering.maxStudents) {
      return NextResponse.json(
        { error: 'المادة ممتلئة' },
        { status: 400 }
      );
    }

    
    const registration = await prisma.registration.create({
      data: { studentId, courseOfferingId, semesterId },
      include: {
        courseOffering: { include: { course: true } },
      },
    });

    await prisma.courseOffering.update({
      where: { id: courseOfferingId },
      data: { enrolledCount: { increment: 1 } },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
