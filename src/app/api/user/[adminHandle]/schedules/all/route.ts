// app/api/schedules/all/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma"; 
import { DayOfWeek } from '@prisma/client';

export async function GET(request: Request, { params }: { params: { adminHandle: string } }) {
  const { searchParams } = new URL(request.url)
  const dayOfWeek = (searchParams.get('day')) as DayOfWeek; 
  const serviceId = Number(searchParams.get('serviceId'))
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  try {
    const schedules = await prisma.schedule.findMany({
      where: { serviceId, dayOfWeek },
      include: {
        scheduleTimes: {
          where: { 
            status: 'ACTIVE',
            isBooked: false,
           }, 
          include: {
            time: true,
          },
        },
      },
    });
    /* console.log('schedules:', schedules); */
    // Organizar los datos para el frontend
    const formattedSchedules = schedules
      .map((schedule) => ({
        scheduleId: schedule.id,
        times: schedule.scheduleTimes.map((scheduleTime) => ({
          timeId: scheduleTime.timeId, 
          time: scheduleTime.time.time,
        })),
      }));

    return NextResponse.json(formattedSchedules); 
  } catch (error) {
    console.error('Error fetching all schedules:', error);
    return NextResponse.json({ error: 'Error fetching all schedules' }, { status: 500 });
  }
}