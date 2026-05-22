import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const stats = await prisma.student.groupBy({
      by: ['programId', 'status'],
      _count: true,
    });

    const programs = await prisma.program.findMany({
      include: { department: { include: { faculty: true } } },
    });

    const result = stats.map((stat) => {
      const program = programs.find((p) => p.id === stat.programId);
      return {
        programId: stat.programId,
        programName: program?.nameAr,
        departmentName: program?.department.nameAr,
        facultyName: program?.department.faculty.nameAr,
        status: stat.status,
        count: stat._count,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
