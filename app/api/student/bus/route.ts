import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const db = prisma as any;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const [subscription, routes] = await Promise.all([
      db.busSubscription.findFirst({
        where: { studentId: student.id, status: 'active' },
        include: { route: true },
        orderBy: { createdAt: 'desc' },
      }),
      db.busRoute.findMany({ where: { isActive: true }, orderBy: { pricePerDay: 'asc' } }),
    ]);

    
    const enrichedRoutes = await Promise.all(
      routes.map(async (r: { id: number }) => {
        const count = await db.busSubscription.count({ where: { routeId: r.id, status: 'active' } });
        return { ...r, currentSubscribers: count };
      })
    );

    
    let remainingDays = 0;
    if (subscription) {
      const diff = new Date(subscription.endDate).getTime() - Date.now();
      remainingDays = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    return NextResponse.json({ subscription: subscription ? { ...subscription, remainingDays } : null, routes: enrichedRoutes });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, action, routeId } = await req.json();
    if (!userId || !action) return NextResponse.json({ error: 'userId and action required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    const activeSub = await db.busSubscription.findFirst({
      where: { studentId: student.id, status: 'active' },
    });

    if (action === 'renew') {
      if (!activeSub) return NextResponse.json({ error: 'no_active_subscription' }, { status: 400 });
      const newEnd = new Date(activeSub.endDate);
      newEnd.setMonth(newEnd.getMonth() + 1);
      await db.busSubscription.update({
        where: { id: activeSub.id },
        data: { endDate: newEnd },
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'cancel') {
      if (!activeSub) return NextResponse.json({ error: 'no_active_subscription' }, { status: 400 });
      await db.busSubscription.update({
        where: { id: activeSub.id },
        data: { status: 'cancelled' },
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'subscribe') {
      if (!routeId) return NextResponse.json({ error: 'routeId required' }, { status: 400 });
      if (activeSub) return NextResponse.json({ error: 'already_subscribed' }, { status: 400 });

      const route = await db.busRoute.findUnique({ where: { id: parseInt(routeId) } });
      if (!route) return NextResponse.json({ error: 'Route not found' }, { status: 404 });

      const count = await db.busSubscription.count({ where: { routeId: route.id, status: 'active' } });
      if (count >= route.capacity) return NextResponse.json({ error: 'route_full' }, { status: 400 });

      const startDate = new Date();
      const endDate   = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      const totalPaid = route.pricePerDay * 22; 

      await db.busSubscription.create({
        data: { studentId: student.id, routeId: route.id, startDate, endDate, totalPaid, status: 'active' },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
