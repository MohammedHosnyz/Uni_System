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

    const [assignment, buildings, maintenance] = await Promise.all([
      db.housingAssignment.findFirst({
        where: { studentId: student.id, status: 'active' },
        include: {
          room: {
            include: {
              building: true,
              assignments: {
                where: { status: 'active' },
                include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
              },
            },
          },
        },
      }),
      db.housingBuilding.findMany({
        where: { isActive: true },
        include: { rooms: { include: { assignments: { where: { status: 'active' } } } } },
      }),
      db.maintenanceRequest.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    
    const enrichedBuildings = buildings.map((b: {
      rooms: { assignments: unknown[] }[];
      capacity: number;
      [key: string]: unknown;
    }) => {
      const occupied = b.rooms.reduce((sum: number, r: { assignments: unknown[] }) => sum + r.assignments.length, 0);
      return { ...b, occupied, rooms: undefined };
    });

    
    const roommates = assignment
      ? assignment.room.assignments
          .filter((a: { studentId: number }) => a.studentId !== student.id)
          .map((a: { student: { user: { firstName: string; lastName: string } } }) =>
            `${a.student.user.firstName} ${a.student.user.lastName}`)
      : [];

    const remainingFees = assignment
      ? Number(assignment.semFees) - Number(assignment.paidAmount)
      : 0;

    return NextResponse.json({
      assignment: assignment
        ? {
            building: assignment.room.building,
            room: assignment.room.roomNumber,
            floor: assignment.room.floor,
            checkIn: assignment.checkIn,
            checkOut: assignment.checkOut,
            semFees: Number(assignment.semFees),
            paidAmount: Number(assignment.paidAmount),
            remainingFees,
            status: assignment.status,
          }
        : null,
      roommates,
      buildings: enrichedBuildings,
      maintenance,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action } = body;
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { userId: parseInt(userId) } });
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    
    if (!action) {
      const { typeAr, typeEn, descAr, descEn } = body;
      if (!typeAr) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      const req2 = await db.maintenanceRequest.create({
        data: { studentId: student.id, typeAr, typeEn: typeEn ?? typeAr, descAr, descEn: descEn ?? descAr, status: 'pending' },
      });
      return NextResponse.json({ request: req2 }, { status: 201 });
    }

    
    if (action === 'book') {
      const { buildingId } = body;
      if (!buildingId) return NextResponse.json({ error: 'buildingId required' }, { status: 400 });

      
      const existing = await db.housingAssignment.findFirst({
        where: { studentId: student.id, status: 'active' },
      });
      if (existing) {
        await db.housingAssignment.update({ where: { id: existing.id }, data: { status: 'cancelled' } });
      }

      const bid = parseInt(buildingId);

      
      const building = await db.housingBuilding.findUnique({
        where: { id: bid },
        include: { rooms: { include: { assignments: { where: { status: 'active' } } } } },
      });
      if (!building) return NextResponse.json({ error: 'Building not found' }, { status: 404 });

      
      let freeRoom = building.rooms.find(
        (r: { capacity: number; assignments: unknown[] }) => r.assignments.length < r.capacity
      );

      if (!freeRoom) {
        
        const roomCount = await db.housingRoom.count({ where: { buildingId: bid } });
        const floor = Math.floor(roomCount / 10) + 1;
        const roomNum = String(floor * 100 + (roomCount % 10) + 1);
        freeRoom = await db.housingRoom.create({
          data: { buildingId: bid, roomNumber: roomNum, floor, capacity: 2 },
        });
      }

      const checkIn  = new Date();
      const checkOut = new Date();
      checkOut.setMonth(checkOut.getMonth() + 6);

      await db.housingAssignment.create({
        data: {
          studentId: student.id,
          roomId: freeRoom.id,
          checkIn, checkOut,
          semFees: building.pricePerSem,
          paidAmount: 0,
          status: 'active',
        },
      });
      return NextResponse.json({ success: true });
    }

    
    if (action === 'renew') {
      const existing = await db.housingAssignment.findFirst({
        where: { studentId: student.id, status: 'active' },
      });
      if (!existing) return NextResponse.json({ error: 'no_active_assignment' }, { status: 400 });
      const newCheckOut = new Date(existing.checkOut);
      newCheckOut.setMonth(newCheckOut.getMonth() + 6);
      await db.housingAssignment.update({ where: { id: existing.id }, data: { checkOut: newCheckOut } });
      return NextResponse.json({ success: true });
    }

    
    if (action === 'cancel') {
      const existing = await db.housingAssignment.findFirst({
        where: { studentId: student.id, status: 'active' },
      });
      if (!existing) return NextResponse.json({ error: 'no_active_assignment' }, { status: 400 });
      await db.housingAssignment.update({ where: { id: existing.id }, data: { status: 'cancelled' } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
