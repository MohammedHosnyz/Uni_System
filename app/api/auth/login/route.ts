import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import { findUserByEmail, findStudentByNumber } from '@/lib/mockAuth';
import { prisma } from '@/lib/prisma';
import type { PrismaClient } from '@prisma/client';

const db: PrismaClient = prisma;

function parseDevice(ua: string): string {
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android Phone';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Macintosh/i.test(ua)) return 'Mac';
  if (/Linux/i.test(ua)) return 'Linux PC';
  return 'Unknown Device';
}

interface LoginRequestBody {
  identifier: string;
  password: string;
  loginType: 'student' | 'staff';
  staffType?: 'admin' | 'professor' | 'assistant';
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();
    const { identifier, password, loginType, staffType } = body;

    let user = null;
    let roleId = 4; 

    if (loginType === 'student') {
      let dbUser: any = null;
      try {
        dbUser = await prisma.user.findUnique({
          where: { email: identifier },
          include: {
            role: true,
            student: {
              include: {
                program: { include: { department: { include: { faculty: true } } } },
              },
            },
          },
        });
      } catch (dbErr) {
        console.warn('Database connection failed, falling back to mock auth data:', dbErr);
      }

      if (dbUser && dbUser.student) {
        const isValid = await verifyPassword(password, dbUser.password);
        if (!isValid) {
          return NextResponse.json({ error: 'بيانات الدخول غير صحيحة' }, { status: 401 });
        }
        const s = dbUser.student;
        user = {
          id: dbUser.id,
          email: dbUser.email,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          role: 'student',
          studentNumber: s.studentNumber,
          currentLevel: s.currentLevel,
          programName: s.program.nameAr,
          departmentName: s.program.department.nameAr,
          facultyName: s.program.department.faculty.nameAr,
          gpa: s.gpa ? String(s.gpa) : '0.00',
        };
        roleId = 4;
      } else {
        
        let student = findUserByEmail(identifier);
        if (!student) student = findStudentByNumber(identifier);

        if (!student) {
          return NextResponse.json({ error: 'بيانات الدخول غير صحيحة' }, { status: 401 });
        }
        if (student.role !== 'student') {
          return NextResponse.json({ error: 'هذا الحساب ليس حساب طالب' }, { status: 403 });
        }
        const isValid = await verifyPassword(password, student.password);
        if (!isValid) {
          return NextResponse.json({ error: 'بيانات الدخول غير صحيحة' }, { status: 401 });
        }
        user = {
          id: student.id,
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          role: student.role,
          studentNumber: student.studentNumber,
          currentLevel: student.currentLevel,
          programName: student.programName,
          departmentName: student.departmentName,
          facultyName: student.facultyName,
          gpa: student.gpa || '3.9',
        };
        roleId = 4;
      }
    } else {
      
      const dbUser = findUserByEmail(identifier);

      if (!dbUser) {
        return NextResponse.json(
          { error: 'بيانات الدخول غير صحيحة' },
          { status: 401 }
        );
      }

      
      if (dbUser.role === 'student') {
        return NextResponse.json(
          { error: 'هذا حساب طالب، يرجى اختيار "طالب" من الأعلى' },
          { status: 403 }
        );
      }

      const isValid = await verifyPassword(password, dbUser.password);
      if (!isValid) {
        return NextResponse.json(
          { error: 'بيانات الدخول غير صحيحة' },
          { status: 401 }
        );
      }

      
      
      const isStaffRole = dbUser.role === 'admin' || dbUser.role === 'staff';
      
      if (staffType === 'admin' && !isStaffRole) {
        const roleNames: Record<string, string> = {
          professor: 'دكتور',
          assistant: 'معيد'
        };
        
        return NextResponse.json(
          { error: `هذا الحساب مسجل كـ "${roleNames[dbUser.role] || dbUser.role}"، لا يمكنك تسجيل الدخول كـ "موظف"` },
          { status: 403 }
        );
      } else if (staffType && staffType !== 'admin' && staffType !== dbUser.role) {
        const roleNames: Record<string, string> = {
          admin: 'موظف',
          staff: 'موظف',
          professor: 'دكتور',
          assistant: 'معيد'
        };
        
        return NextResponse.json(
          { error: `هذا الحساب مسجل كـ "${roleNames[dbUser.role] || dbUser.role}"، لا يمكنك تسجيل الدخول كـ "${roleNames[staffType] || staffType}"` },
          { status: 403 }
        );
      }

      user = {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        role: dbUser.role === 'admin' || dbUser.role === 'staff' ? 'staff' : dbUser.role, 
      };

      
      if (dbUser.role === 'admin' || dbUser.role === 'staff') roleId = 5; 
      else if (dbUser.role === 'professor') roleId = 2;
      else if (dbUser.role === 'assistant') roleId = 3;
    }
    
    const token = generateToken(user.id, roleId);

    
    const response = NextResponse.json({ user, token });

    response.cookies.set('token', token, {
      path: '/',
      maxAge: 7 * 24 * 60 * 60, 
      sameSite: 'lax',
      
      httpOnly: false,
    });

    
    try {
      const ua = request.headers.get('user-agent') ?? '';
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        ?? request.headers.get('x-real-ip')
        ?? 'Unknown';
      const device = parseDevice(ua);

      
      const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
      if (dbUser) {
        
        await db.loginSession.updateMany({
          where: { userId: dbUser.id },
          data: { isCurrent: false },
        });
        await db.loginSession.create({
          data: { userId: dbUser.id, device, location: 'مصر', ipAddress: ip, isCurrent: true },
        });
        
        const sessions = await db.loginSession.findMany({
          where: { userId: dbUser.id },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        });
        if (sessions.length > 10) {
          const toDelete = sessions.slice(10).map((s: { id: number }) => s.id);
          await db.loginSession.deleteMany({ where: { id: { in: toDelete } } });
        }
      }
    } catch (sessionErr) {
      console.warn('Session record failed (non-fatal):', sessionErr);
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}
