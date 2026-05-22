import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';


const db = prisma as any;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    
    const settings = await db.securitySettings.upsert({
      where: { userId: parseInt(userId) },
      update: {},
      create: { userId: parseInt(userId) },
    });

    return NextResponse.json({
      twoFactor: settings.twoFactor,
      loginNotif: settings.loginNotif,
      activityLog: settings.activityLog,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, twoFactor, loginNotif, activityLog } = await req.json();
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const settings = await db.securitySettings.upsert({
      where: { userId: parseInt(userId) },
      update: { twoFactor, loginNotif, activityLog },
      create: { userId: parseInt(userId), twoFactor, loginNotif, activityLog },
    });

    return NextResponse.json({
      twoFactor: settings.twoFactor,
      loginNotif: settings.loginNotif,
      activityLog: settings.activityLog,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
