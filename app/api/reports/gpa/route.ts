import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'معرف الطالب مطلوب' }, { status: 400 });
    }

    const grades = await prisma.grade.findMany({
      where: {
        studentId: parseInt(studentId),
        status: 'pass',
      },
      include: {
        registration: {
          include: {
            courseOffering: { include: { course: true } },
          },
        },
      },
    });

    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((grade) => {
      const credits = grade.registration.courseOffering.course.credits;
      const gradePoint = parseFloat(grade.gradePoint?.toString() || '0');
      totalPoints += gradePoint * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    
    await prisma.student.update({
      where: { id: parseInt(studentId) },
      data: { gpa: parseFloat(gpa) },
    });

    return NextResponse.json({
      studentId: parseInt(studentId),
      gpa,
      totalCredits,
      coursesCompleted: grades.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
