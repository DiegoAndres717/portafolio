import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { adminHandle: string } }
) {
  const { adminHandle } = params;
  
  const appointments = await prisma.appointment.findMany({
    where: {
      service: {
        admin: {
          handle: adminHandle,
        },
      },
    },
    include: {
      service: true,
      time: true,
    },
  });

  // Aplanar la estructura de datos
  const formattedAppointments = appointments.map((appointment) => ({
    id: appointment.id,
    serviceName: appointment.service.name,
    time: appointment.time.time,
    date: appointment.serviceDate,
    email: appointment.email,
    comment: appointment.comment,
    name: appointment.name,
  }));

  return NextResponse.json(formattedAppointments);
}

export async function POST(request: Request) {
  try {
    const { serviceId, scheduleId, timeId, email, comment, date, dayOfWeek, name } =
      await request.json();
    // 1. Obtener el ScheduleTime
    const scheduleTime = await prisma.scheduleTime.findUnique({
      where: {
        scheduleId: scheduleId,
        id: timeId,
      },
      include: {
        schedule: {
          include: {
            appointments: true,
          },
        },
      },
    });

    const existDate = scheduleTime?.schedule.appointments.map((appointment) => {
      return appointment.serviceDate.toLocaleDateString("en-CO", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    });

    if (
      scheduleTime?.isBooked === true &&
      existDate?.includes(date) &&
      scheduleTime.schedule.dayOfWeek === dayOfWeek
    ) {
      return NextResponse.json(
        { message: "Horario y fecha no disponible" },
        { status: 404 }
      );
    }

    if (!scheduleTime) {
      return NextResponse.json({ message: "time not found" }, { status: 404 });
    }
    // 2. Intentar actualizar el ScheduleTime con bloqueo optimista
    const updatedScheduleTime = await prisma.scheduleTime.update({
      where: {
        id: scheduleTime.id,
        updatedAt: scheduleTime.updatedAt,
      },
      data: { isBooked: true },
    });

    if (!updatedScheduleTime) {
      return NextResponse.json(
        { error: "Appointment slot is no longer available" },
        { status: 409 }
      );
    }
    // 3. Crear la cita
    const appointment = await prisma.appointment.create({
      data: {
        serviceId,
        scheduleId,
        timeId,
        email,
        comment,
        serviceDate: new Date(date),
        name,
      },
    });

    return NextResponse.json(
      { message: "Appointment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la cita:", error);
    return NextResponse.json(
      { error: "Error creating appointment" },
      { status: 500 }
    );
  }
}
