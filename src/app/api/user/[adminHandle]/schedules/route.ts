import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DayOfWeek } from '@prisma/client';

const daysOfWeekMap: { [key: string]: DayOfWeek } = {
    'MONDAY': DayOfWeek.MONDAY,
    'TUESDAY': DayOfWeek.TUESDAY,
    'WEDNESDAY': DayOfWeek.WEDNESDAY,
    'THURSDAY': DayOfWeek.THURSDAY,
    'FRIDAY': DayOfWeek.FRIDAY,
    'SATURDAY': DayOfWeek.SATURDAY,
  };
  
  const stringToDayOfWeek = (day: string | null): DayOfWeek | undefined => {
    if (!day) return undefined;
    return daysOfWeekMap[day.toUpperCase()];
  };
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const day = stringToDayOfWeek(searchParams.get('day')); 
  const serviceId = Number(searchParams.get('serviceId'))
  
  if (isNaN(serviceId) || !day) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  const schedules = await prisma.schedule.findMany({
    where: {
      serviceId,
      dayOfWeek: day,
    },
    include: {
      scheduleTimes: {
        include: {
          time: true,
        },
      },
    },
  });

  return NextResponse.json(schedules);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Obtener los IDs de las horas predefinidas
    const times = await prisma.time.findMany({
      select: { id: true },
    });
    const timeIds = times.map((time) => time.id);

    // Crear el nuevo Schedule y asociar todas las horas
    const schedule = await prisma.schedule.create({
      data: {
        serviceId: data.serviceId,
        dayOfWeek: data.dayOfWeek,
        scheduleTimes: {
          create: timeIds.map((timeId) => ({ timeId })),
        },
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Error creating schedule' }, { status: 500 });
  }
}
