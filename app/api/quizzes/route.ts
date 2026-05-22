import { NextRequest, NextResponse } from 'next/server';


let quizzes: any[] = [
  {
    id: 1,
    title: 'اختبار الوحدة الأولى',
    course: 'CS101',
    duration: 60,
    totalMarks: 20,
    questionsCount: 3,
    status: 'published',
    createdAt: '2024-02-10',
    questions: [
      {
        id: 1,
        question: 'ما هي لغة البرمجة المستخدمة في تطوير تطبيقات الويب؟',
        optionA: 'Python',
        optionB: 'JavaScript',
        optionC: 'C++',
        optionD: 'Java',
        correctAnswer: 'B',
      },
      {
        id: 2,
        question: 'ما هو الغرض من استخدام المتغيرات في البرمجة؟',
        optionA: 'لتخزين البيانات',
        optionB: 'لطباعة النصوص',
        optionC: 'لإنشاء الدوال',
        optionD: 'لا شيء مما سبق',
        correctAnswer: 'A',
      },
      {
        id: 3,
        question: 'أي من التالي يعتبر نوع بيانات في البرمجة؟',
        optionA: 'String',
        optionB: 'Integer',
        optionC: 'Boolean',
        optionD: 'جميع ما سبق',
        correctAnswer: 'D',
      },
    ],
    submissions: [
      {
        studentId: '2021001',
        studentName: 'أحمد محمد علي',
        studentEmail: 'ahmed@example.com',
        submittedAt: '2024-02-11T10:30:00',
        timeTaken: 45, 
        score: 2,
        totalMarks: 3,
        answers: [
          { questionId: 1, selectedAnswer: 'B', isCorrect: true },
          { questionId: 2, selectedAnswer: 'B', isCorrect: false },
          { questionId: 3, selectedAnswer: 'D', isCorrect: true },
        ],
      },
      {
        studentId: '2021002',
        studentName: 'فاطمة حسن',
        studentEmail: 'fatima@example.com',
        submittedAt: '2024-02-11T11:15:00',
        timeTaken: 38,
        score: 3,
        totalMarks: 3,
        answers: [
          { questionId: 1, selectedAnswer: 'B', isCorrect: true },
          { questionId: 2, selectedAnswer: 'A', isCorrect: true },
          { questionId: 3, selectedAnswer: 'D', isCorrect: true },
        ],
      },
    ],
  },
];

let nextId = 2;


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const id = searchParams.get('id');

  
  if (id) {
    const quiz = quizzes.find((q) => q.id === parseInt(id));
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(quiz);
  }

  
  if (role === 'student') {
    
    const studentQuizzes = quizzes
      .filter((q) => q.status === 'published')
      .map((quiz) => ({
        ...quiz,
        questions: quiz.questions.map((q: any) => {
          const { correctAnswer, ...questionWithoutAnswer } = q;
          return questionWithoutAnswer;
        }),
      }));
    return NextResponse.json(studentQuizzes);
  }

  
  return NextResponse.json(quizzes);
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, course, duration, questions, status = 'draft' } = body;

    if (!title || !course || !duration || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    
    const hasAllAnswers = questions.every((q: any) => q.correctAnswer);
    if (!hasAllAnswers) {
      return NextResponse.json(
        { error: 'All questions must have correct answers' },
        { status: 400 }
      );
    }

    const newQuiz = {
      id: nextId++,
      title,
      course,
      duration,
      totalMarks: questions.length,
      questionsCount: questions.length,
      status,
      createdAt: new Date().toISOString().split('T')[0],
      questions,
      submissions: [],
    };

    quizzes.push(newQuiz);

    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}


export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, course, duration, questions, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Quiz ID is required' },
        { status: 400 }
      );
    }

    const quizIndex = quizzes.findIndex((q) => q.id === id);
    
    if (quizIndex === -1) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    
    quizzes[quizIndex] = {
      ...quizzes[quizIndex],
      title: title || quizzes[quizIndex].title,
      course: course || quizzes[quizIndex].course,
      duration: duration || quizzes[quizIndex].duration,
      questions: questions || quizzes[quizIndex].questions,
      status: status || quizzes[quizIndex].status,
      totalMarks: questions ? questions.length : quizzes[quizIndex].totalMarks,
      questionsCount: questions ? questions.length : quizzes[quizIndex].questionsCount,
    };

    return NextResponse.json(quizzes[quizIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update quiz' },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Quiz ID is required' },
        { status: 400 }
      );
    }

    const quizIndex = quizzes.findIndex((q) => q.id === parseInt(id));
    
    if (quizIndex === -1) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    quizzes.splice(quizIndex, 1);

    return NextResponse.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete quiz' },
      { status: 500 }
    );
  }
}



export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, answers, studentId, studentName, studentEmail, timeTaken } = body;

    if (!quizId || !answers) {
      return NextResponse.json(
        { error: 'Quiz ID and answers are required' },
        { status: 400 }
      );
    }

    const quiz = quizzes.find((q) => q.id === quizId);
    
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    
    let correctCount = 0;
    const detailedAnswers = quiz.questions.map((question: any) => {
      const studentAnswer = answers[question.id];
      const isCorrect = studentAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: question.id,
        selectedAnswer: studentAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const score = correctCount;
    const totalMarks = quiz.questions.length;

    
    const submission = {
      studentId: studentId || 'STUDENT_' + Date.now(),
      studentName: studentName || 'طالب',
      studentEmail: studentEmail || 'student@example.com',
      submittedAt: new Date().toISOString(),
      timeTaken: timeTaken || 0,
      score,
      totalMarks,
      answers: detailedAnswers,
    };

    if (!quiz.submissions) {
      quiz.submissions = [];
    }
    quiz.submissions.push(submission);

    return NextResponse.json({
      score,
      totalMarks,
      correctCount,
      totalQuestions: quiz.questions.length,
      percentage: (score / totalMarks) * 100,
      answers: detailedAnswers,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
