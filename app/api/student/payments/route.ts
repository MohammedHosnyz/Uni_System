import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { userId: parseInt(userId) },
      include: { program: { select: { tuitionFee: true, nameAr: true, nameEn: true } } },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const payments = await prisma.payment.findMany({
      where: { studentId: student.id },
      orderBy: { paymentDate: 'desc' },
    });

    const totalPaid = payments.reduce((s, p) => s + Number(p.amount), 0);
    const tuitionPerSem = Number(student.program.tuitionFee);
    
    const totalRequired = tuitionPerSem * 8;
    const remaining = Math.max(0, totalRequired - totalPaid);

    return NextResponse.json({
      payments: payments.map(p => ({
        id: p.id,
        amount: Number(p.amount),
        paymentDate: p.paymentDate,
        paymentMethod: p.paymentMethod,
        paymentType: p.paymentType,
        semesterYear: p.semesterYear,
        receiptNumber: p.receiptNumber,
        status: p.status,
        notes: p.notes,
      })),
      summary: {
        totalPaid,
        tuitionPerSem,
        totalRequired,
        remaining,
        count: payments.length,
        programNameAr: student.program.nameAr,
        programNameEn: student.program.nameEn,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, paymentMethod, paymentType, semesterYear, notes } = await req.json();
    if (!userId || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const receiptNumber = `REC-${Date.now()}-${student.id}`;

    const payment = await prisma.payment.create({
      data: {
        studentId: student.id,
        amount,
        paymentMethod,
        paymentType: paymentType ?? 'tuition',
        semesterYear: semesterYear ?? null,
        receiptNumber,
        status: 'completed',
        notes: notes ?? null,
      },
    });

    return NextResponse.json({ success: true, payment: { ...payment, amount: Number(payment.amount) } }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
