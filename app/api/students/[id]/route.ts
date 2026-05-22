import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        program: { include: { department: { include: { faculty: true } } } },
        registrations: {
          include: {
            courseOffering: { include: { course: true, semester: true } },
            grade: true,
          },
        },
        grades: true,
        payments: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await request.json();
    const { firstName, lastName, phone, currentLevel, status, programId } = data;

    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        currentLevel,
        status,
        programId,
        user: {
          update: {
            firstName,
            lastName,
            phone,
          },
        },
      },
      include: { user: true, program: true },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Update student error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء التحديث' }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'تم حذف الطالب بنجاح' });
  } catch (error) {
    console.error('Delete student error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
  }
}
