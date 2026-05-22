import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type QuizRow = { id: number; title: string; titleEn: string | null; courseOfferingId: number; duration: number; totalMarks: number; status: string };
type QuestionRow = { id: number; quizId: number; question: string; questionEn: string | null; optionA: string; optionB: string; optionC: string; optionD: string; correctAnswer: string };
type SubmissionRow = { id: number; quizId: number; studentId: number; score: number; totalMarks: number; answers: string; submittedAt: Date };
type CourseRow = { offeringId: number; code: string; nameAr: string; nameEn: string };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId مطلوب' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    const sid = student.id;

    
    const quizzes = await prisma.$queryRaw<QuizRow[]>`
      SELECT q.id, q.title, q.titleEn, q.courseOfferingId, q.duration, q.totalMarks, q.status
      FROM Quiz q
      INNER JOIN Registration r ON r.courseOfferingId = q.courseOfferingId AND r.studentId = ${sid}
      WHERE q.status = 'published'
    `;

    if (!quizzes.length) return NextResponse.json([]);

    const quizIds = quizzes.map((q: QuizRow) => q.id);
    const offeringIds = quizzes.map((q: QuizRow) => q.courseOfferingId);

    const [questions, submissions, courses] = await Promise.all([
      prisma.$queryRaw<QuestionRow[]>`
        SELECT id, quizId, question, questionEn, optionA, optionB, optionC, optionD
        FROM QuizQuestion
        WHERE quizId IN (${quizIds.join(',')})
      `,
      prisma.$queryRaw<SubmissionRow[]>`
        SELECT id, quizId, studentId, score, totalMarks, answers, submittedAt
        FROM QuizSubmission
        WHERE quizId IN (${quizIds.join(',')}) AND studentId = ${sid}
      `,
      prisma.$queryRaw<CourseRow[]>`
        SELECT co.id as offeringId, c.code, c.nameAr, c.nameEn
        FROM CourseOffering co
        INNER JOIN Course c ON c.id = co.courseId
        WHERE co.id IN (${offeringIds.join(',')})
      `,
    ]);

    return NextResponse.json(quizzes.map((q: QuizRow) => {
      const sub  = submissions.find((s: SubmissionRow) => s.quizId === q.id) ?? null;
      const course = courses.find((c: CourseRow) => c.offeringId === q.courseOfferingId);
      const qs   = questions.filter((qq: QuestionRow) => qq.quizId === q.id)
        .map(({ correctAnswer: _ca, ...rest }: QuestionRow) => rest); 

      return {
        id: q.id,
        title: q.title,
        titleEn: q.titleEn,
        courseCode: course?.code ?? '',
        courseNameAr: course?.nameAr ?? '',
        courseNameEn: course?.nameEn ?? '',
        duration: q.duration,
        totalMarks: q.totalMarks,
        status: sub ? 'completed' : 'available',
        score: sub?.score ?? null,
        submittedAt: sub?.submittedAt ?? null,
        questions: sub ? [] : qs,
      };
    }));
  } catch (error) {
    console.error('student/quizzes GET error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, quizId, answers } = await request.json();
    if (!userId || !quizId || !answers) return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    const sid = student.id;

    
    const existing = await prisma.$queryRaw<SubmissionRow[]>`
      SELECT id FROM QuizSubmission WHERE quizId = ${quizId} AND studentId = ${sid} LIMIT 1
    `;
    if (existing.length) return NextResponse.json({ error: 'تم تسليم الاختبار مسبقاً' }, { status: 400 });

    
    const quizRows = await prisma.$queryRaw<QuizRow[]>`SELECT id, totalMarks FROM Quiz WHERE id = ${quizId} LIMIT 1`;
    if (!quizRows.length) return NextResponse.json({ error: 'الاختبار غير موجود' }, { status: 404 });
    const quiz = quizRows[0];

    const questions = await prisma.$queryRaw<QuestionRow[]>`
      SELECT id, correctAnswer FROM QuizQuestion WHERE quizId = ${quizId}
    `;

    let correct = 0;
    const detailed = questions.map((q: QuestionRow) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correct++;
      return { questionId: q.id, selected, correct: q.correctAnswer, isCorrect };
    });

    const score = Math.round((correct / questions.length) * quiz.totalMarks);

    await prisma.$executeRaw`
      INSERT INTO QuizSubmission (quizId, studentId, score, totalMarks, answers, submittedAt)
      VALUES (${quizId}, ${sid}, ${score}, ${quiz.totalMarks}, ${JSON.stringify(detailed)}, NOW())
    `;

    return NextResponse.json({ score, totalMarks: quiz.totalMarks, correct, total: questions.length, detailed });
  } catch (error) {
    console.error('submit quiz error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
