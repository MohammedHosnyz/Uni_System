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
        user: { select: { firstName: true, lastName: true } },
        program: { select: { nameAr: true, nameEn: true } },
      },
    });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const [militaryStatus, documents, timeline] = await Promise.all([
      db.militaryStatus.findUnique({ where: { studentId: student.id } }),
      db.militaryDocument.findMany({ where: { studentId: student.id }, orderBy: { docDate: 'desc' } }),
      db.militaryTimeline.findMany({ where: { studentId: student.id }, orderBy: { eventDate: 'asc' } }),
    ]);

    return NextResponse.json({
      student: {
        name: `${student.user.firstName} ${student.user.lastName}`,
        studentNumber: student.studentNumber,
        program: student.program,
      },
      militaryStatus,
      documents,
      timeline,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, action, notes } = await req.json();
    if (!userId || !action) return NextResponse.json({ error: 'userId and action required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    if (action === 'request_cert') {
      
      const doc = await db.militaryDocument.create({
        data: {
          studentId: student.id,
          nameAr: 'شهادة تأجيل — طلب جديد',
          nameEn: 'Deferment Certificate — New Request',
          docType: 'PDF',
          docDate: new Date(),
          status: 'pending',
        },
      });
      
      await db.militaryTimeline.create({
        data: {
          studentId: student.id,
          eventAr: 'تم تقديم طلب شهادة تأجيل جديدة',
          eventEn: 'New deferment certificate request submitted',
          eventDate: new Date(),
          status: 'done',
        },
      });
      return NextResponse.json({ success: true, doc });
    }

    if (action === 'renew') {
      
      const current = await db.militaryStatus.findUnique({ where: { studentId: student.id } });
      const baseDate = current?.expiryDate ? new Date(current.expiryDate) : new Date();
      const newExpiry = new Date(baseDate);
      newExpiry.setFullYear(newExpiry.getFullYear() + 1);

      await db.militaryStatus.update({
        where: { studentId: student.id },
        data: { expiryDate: newExpiry, notes: notes ?? current?.notes },
      });
      await db.militaryTimeline.create({
        data: {
          studentId: student.id,
          eventAr: `تم تجديد التأجيل حتى ${newExpiry.toLocaleDateString('ar-EG')}`,
          eventEn: `Deferment renewed until ${newExpiry.toLocaleDateString('en-US')}`,
          eventDate: new Date(),
          status: 'done',
        },
      });
      return NextResponse.json({ success: true, newExpiry });
    }

    if (action === 'contact') {
      
      await db.militaryTimeline.create({
        data: {
          studentId: student.id,
          eventAr: `تم إرسال طلب تواصل مع مكتب التجنيد${notes ? ': ' + notes : ''}`,
          eventEn: `Contact request sent to military office${notes ? ': ' + notes : ''}`,
          eventDate: new Date(),
          status: 'done',
        },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
