import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function calculateLetterGrade(total: number): { letter: string; point: number } {
  if (total >= 97) return { letter: 'A+', point: 4.0 };
  if (total >= 93) return { letter: 'A', point: 4.0 };
  if (total >= 89) return { letter: 'A-', point: 3.7 };
  if (total >= 85) return { letter: 'B+', point: 3.3 };
  if (total >= 81) return { letter: 'B', point: 3.0 };
  if (total >= 77) return { letter: 'B-', point: 2.7 };
  if (total >= 73) return { letter: 'C+', point: 2.3 };
  if (total >= 69) return { letter: 'C', point: 2.0 };
  if (total >= 65) return { letter: 'C-', point: 1.7 };
  if (total >= 61) return { letter: 'D+', point: 1.3 };
  if (total >= 57) return { letter: 'D', point: 1.0 };
  return { letter: 'F', point: 0.0 };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    const where = studentId ? { studentId: parseInt(studentId) } : {};

    const grades = await prisma.grade.findMany({
      where,
      include: {
        student: { include: { user: true } },
        registration: {
          include: {
            courseOffering: { include: { course: true, semester: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { registrationId, studentId, midtermGrade, finalGrade, assignmentGrade } = data;

    const total = (midtermGrade || 0) + (finalGrade || 0) + (assignmentGrade || 0);
    const { letter, point } = calculateLetterGrade(total);
    const status = total >= 60 ? 'pass' : 'fail';

    const grade = await prisma.grade.create({
      data: {
        registrationId,
        studentId,
        midtermGrade,
        finalGrade,
        assignmentGrade,
        totalGrade: total,
        letterGrade: letter,
        gradePoint: point,
        status,
      },
      include: {
        registration: { include: { courseOffering: { include: { course: true } } } },
      },
    });

    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, midtermGrade, finalGrade, assignmentGrade } = data;

    const total = (midtermGrade || 0) + (finalGrade || 0) + (assignmentGrade || 0);
    const { letter, point } = calculateLetterGrade(total);
    const status = total >= 60 ? 'pass' : 'fail';

    const grade = await prisma.grade.update({
      where: { id },
      data: {
        midtermGrade,
        finalGrade,
        assignmentGrade,
        totalGrade: total,
        letterGrade: letter,
        gradePoint: point,
        status,
      },
    });

    return NextResponse.json(grade);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
